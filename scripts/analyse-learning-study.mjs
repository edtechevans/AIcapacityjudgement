/**
 * Capacity x Judgement: offline, de-identified study analysis.
 *
 * Usage: node scripts/analyse-learning-study.mjs /approved/path/anonymous_scores.csv
 * No network calls. No reports written to disk. No individual learner rows/IDs printed.
 * Requires school privacy review before even aggregate reports are shared.
 */
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {pathToFileURL} from "node:url";

const DIMENSIONS=["mechanism","evidence","judgement","transfer"];
const FIELDS=["anonymous_id","grade","group","timepoint","form","rater",...DIMENSIONS];

export function parseCsv(text){
 const rows=[],row=[];let part="",quoted=false;
 for(let i=0;i<text.length;i++){
  const c=text[i];
  if(quoted){
   if(c==='"'&&text[i+1]==='"'){part+='"';i++}
   else if(c==='"')quoted=false;
   else part+=c;
  }else if(c==='"'&&part.length===0)quoted=true;
  else if(c===","){row.push(part);part=""}
  else if(c==="\n"||c==="\r"){
   if(c==="\r"&&text[i+1]==="\n")i++;
   row.push(part);part="";
   if(row.some(x=>x.trim()!==""))rows.push(row.splice(0));
   else row.length=0;
  }else part+=c;
 }
 if(quoted)throw Error("Malformed CSV: unclosed quoted value");
 if(part!==""||row.length){row.push(part);if(row.some(x=>x.trim()!==""))rows.push(row);}
 if(!rows.length)throw Error("CSV has no header");
 const header=rows.shift().map(x=>x.trim().replace(/^\uFEFF/,""));
 if(header.length!==FIELDS.length||FIELDS.some((k,i)=>header[i]!==k))throw Error("CSV columns must match the published score template exactly");
 return rows.map((values,i)=>{
  if(values.length!==FIELDS.length)throw Error("CSV row "+(i+2)+" has an incorrect number of columns");
  return Object.fromEntries(header.map((key,j)=>[key,values[j].trim()]));
 });
}
function scoreRow(row,index){
 const fail=reason=>{throw Error("Invalid row "+(index+2)+": "+reason)};
 if(!/^[A-Za-z0-9_-]{3,64}$/.test(row.anonymous_id))fail("use only nonidentifying alphanumeric study codes (3-64 chars)");
 const grade=Number(row.grade);
 if(!Number.isInteger(grade)||grade<6||grade>12)fail("grade must be 6-12");
 if(!["studio","comparison"].includes(row.group))fail("group must be studio or comparison");
 if(!["pre","post","delayed"].includes(row.timepoint))fail("timepoint must be pre, post or delayed");
 if(!["A","B","T2"].includes(row.form))fail("form must be A, B or T2");
 if(row.timepoint==="delayed"&&row.form!=="T2")fail("delayed work must use form T2");
 if(row.timepoint!=="delayed"&&row.form==="T2")fail("T2 must not be used for baseline or post");
 if(!/^[A-Za-z0-9_-]{1,32}$/.test(row.rater))fail("rater must be a nonidentifying staff code");
 const scores={};
 for(const dim of DIMENSIONS){
  if(!/^[0-3]$/.test(row[dim]))fail(dim+" must be an integer from 0 to 3");
  scores[dim]=Number(row[dim]);
 }
 return {id:row.anonymous_id,grade,group:row.group,time:row.timepoint,form:row.form,rater:row.rater,scores};
}
function mean(values){return values.reduce((a,b)=>a+b,0)/values.length}
function round(n){return Math.round(n*100)/100}
function bootstrapCI(values,seed=5191){
 if(values.length<5)return null;
 let x=seed>>>0;
 function random(){x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296}
 const distribution=[];
 for(let sample=0;sample<2500;sample++){
  let total=0;for(let j=0;j<values.length;j++)total+=values[Math.floor(random()*values.length)];
  distribution.push(total/values.length);
 }
 distribution.sort((a,b)=>a-b);
 return [round(distribution[Math.floor(distribution.length*.025)]),round(distribution[Math.floor(distribution.length*.975)])];
}
function describePairs(pairs){
 if(pairs.length<5)return {suppressed:true,nBelowDisclosureThreshold:true};
 const pre=pairs.map(p=>p.pre.total),post=pairs.map(p=>p.post.total);
 const changes=pairs.map(p=>p.post.total-p.pre.total);
 const domains=Object.fromEntries(DIMENSIONS.map(dim=>[dim,round(mean(pairs.map(p=>p.post.scores[dim]-p.pre.scores[dim])))]));
 return {n:pairs.length,baselineMean:round(mean(pre)),postMean:round(mean(post)),meanChange:round(mean(changes)),
  meanChange95PctBootstrapCI:bootstrapCI(changes),domainMeanChange:domains,
  warning:"Exploratory change, not causal evidence without a defensible comparison design."};
}
export function analyse(rows,{disclosureMin=5}={}){
 if(!Number.isInteger(disclosureMin)||disclosureMin<5)throw Error("Minimum privacy threshold must be at least 5");
 const entries=rows.map(scoreRow);
 const grouped=new Map();const assignment=new Map();
 for(const entry of entries){
  const assignmentKey=entry.id;
  const earlier=assignment.get(assignmentKey);
  if(earlier&&(earlier.grade!==entry.grade||earlier.group!==entry.group))
   throw Error("One anonymous ID was assigned to conflicting grade/group records");
  assignment.set(assignmentKey,{grade:entry.grade,group:entry.group});
  const key=[entry.id,entry.grade,entry.group,entry.time].join("|");
  const existing=grouped.get(key)||[];
  if(existing.some(r=>r.rater===entry.rater))throw Error("Duplicate rating by the same assessor for a sample/timepoint");
  if(existing.length&&existing[0].form!==entry.form)throw Error("Inconsistent form across raters for the same timepoint");
  existing.push(entry);grouped.set(key,existing);
 }
 const samples=new Map();let itemsWithTwoRaters=0,exact=0,compared=0,largeDisagreements=0;
 for(const [key,raters] of grouped){
  const base=raters[0],scores=Object.fromEntries(DIMENSIONS.map(dim=>[dim,mean(raters.map(r=>r.scores[dim]))]));
  const total=DIMENSIONS.reduce((sum,dim)=>sum+scores[dim],0);
  if(raters.length>1){
   itemsWithTwoRaters++;
   for(const dim of DIMENSIONS){
    for(let i=0;i<raters.length;i++)for(let j=i+1;j<raters.length;j++){
     compared++;const delta=Math.abs(raters[i].scores[dim]-raters[j].scores[dim]);
     if(delta===0)exact++;if(delta>1)largeDisagreements++;
    }
   }
  }
  samples.set(key,{id:base.id,grade:base.grade,group:base.group,time:base.time,form:base.form,scores,total});
 }
 const studentSamples=new Map();
 for(const result of samples.values()){
  const key=result.id+"|"+result.grade+"|"+result.group;
  const record=studentSamples.get(key)||{id:result.id,grade:result.grade,group:result.group};
  record[result.time]=result;studentSamples.set(key,record);
 }
 const matched=[...studentSamples.values()].filter(s=>s.pre&&s.post);
 const formReuse=matched.filter(s=>s.pre.form===s.post.form).length;
 const byGroup=group=>matched.filter(s=>s.group===group);
 const primary=matched.filter(s=>s.group==="studio");
 const comparison=matched.filter(s=>s.group==="comparison");
 function scoped(pairs){
  // Keep even caller-provided privacy thresholds from exposing small samples.
  if(pairs.length<disclosureMin)return {suppressed:true,nBelowDisclosureThreshold:true};
  return describePairs(pairs);
 }
 const byGrade={};
 for(const grade of [6,7,8,9,10,11,12]){
  byGrade[grade]={studio:scoped(primary.filter(s=>s.grade===grade)),
   comparison:scoped(comparison.filter(s=>s.grade===grade))};
 }
 let comparative={suppressed:true,reason:"Fewer than five matched learners in one or both groups"};
 if(primary.length>=disclosureMin&&comparison.length>=disclosureMin){
  const studio=primary.map(s=>s.post.total-s.pre.total);
  const control=comparison.map(s=>s.post.total-s.pre.total);
  const diff=mean(studio)-mean(control);
  // Deterministic independent-group bootstrap with separate seeds.
  let x=4385;function rng(){x=(Math.imul(x,1664525)+1013904223)>>>0;return x/4294967296}
  const sims=[];
  for(let k=0;k<2500;k++){
   let a=0,b=0;
   for(let j=0;j<studio.length;j++)a+=studio[Math.floor(rng()*studio.length)];
   for(let j=0;j<control.length;j++)b+=control[Math.floor(rng()*control.length)];
   sims.push(a/studio.length-b/control.length);
  }
  sims.sort((a,b)=>a-b);
  comparative={studioMatchedN:primary.length,comparisonMatchedN:comparison.length,
   differenceInMeanChange:round(diff),bootstrap95PctCI:[round(sims[Math.floor(sims.length*.025)]),round(sims[Math.floor(sims.length*.975)])],
   interpretation:"Difference in observed change. Causal language requires documented randomisation, equivalent assessment and adequate sample."};
 }
 const delayed=matched.filter(s=>s.delayed);
 const retention=delayed.length>=disclosureMin?{
  matchedN:delayed.length,
  postMean:round(mean(delayed.map(x=>x.post.total))),
  delayedMean:round(mean(delayed.map(x=>x.delayed.total))),
  delayedMinusPost:round(mean(delayed.map(x=>x.delayed.total-x.post.total))),
  caution:"Delayed results alone do not establish durable transfer to real tasks."
 }:{suppressed:true};
 const summary={
  studyStatus:"AGGREGATE ANALYSIS OF PROVIDED SCORES; NOT PROOF OF CAUSAL IMPACT",
  scoring:"Four independently reviewed dimensions at 0-3; total 0-12; multiple raters averaged",
  disclosureRule:"No grade/group statistics reported for fewer than "+disclosureMin+" matched learners",
  dataQuality:{anonymousParticipants:studentSamples.size,matchedPrePost:matched.length,
   missingPreOrPost:studentSamples.size-matched.length,pairedFormsRepeated:formReuse,
   doubleRatedSamples:itemsWithTwoRaters,
   exactRaterAgreementPercent:compared>=disclosureMin*4?round(100*exact/compared):null,
   scorePairsDifferingByMoreThanOneBand:compared>=disclosureMin*4?largeDisagreements:null},
  studio:scoped(primary),comparison:scoped(comparison),
  studioVsComparison:comparative,byGrade,delayed:retention,
  limitations:["Assessments must be piloted for equivalence; large scores are not automatically valid measures.",
   "Small or uncontrolled cohorts cannot establish the platform caused learning gains.",
   "Individual IDs, student responses, assessor codes and scores are intentionally omitted."]
 };
 return summary;
}
function main(){
 const file=process.argv[2];
 if(!file){process.stderr.write("Usage: node scripts/analyse-learning-study.mjs /approved/path/anonymised_scores.csv\n");process.exitCode=2;return;}
 try{
  const rows=parseCsv(readFileSync(resolve(file),"utf8"));
  if(rows.length===0)throw Error("No assessment records; collect actual school-approved data before analysis");
  const report=analyse(rows);
  process.stdout.write(JSON.stringify(report,null,2)+"\n");
 }catch(error){
  // Avoid printing user-controlled CSV values, paths, names or learner identifiers.
  process.stderr.write("Study analysis could not complete: "+error.message.replace(/[/\\][^\s]+/g,"[redacted path]")+"\n");
  process.exitCode=1;
 }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main();
