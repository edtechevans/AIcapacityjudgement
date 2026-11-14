import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {createContext,runInContext} from "node:vm";

const root=join(import.meta.dirname,"..");
const paths=[
 "curriculum.js","learning-data.js",...[6,7,8,9,10].map(g=>"content/grade"+g+".js"),
 "content/learning-scaffolds.js","content/investigations.js","content/labs.js","content/performance.js",
 "content/senior-curriculum.js","content/senior-projects.js","content/senior-labs.js","content/representation-lab.js","content/progression.js"
];
const ctx=createContext({});
for(const path of paths)runInContext(readFileSync(join(root,path),"utf8"),ctx,{filename:path});
const d=runInContext("({LESSONS,GRADES,STRANDS,KNOWLEDGE,ACTIVITIES,LEARNING_SCAFFOLDS,INQUIRY_BRIEFS,CAPSTONE_GUIDES,LEARNING_LABS,UNSEEN_TRANSFER,DIAGNOSTICS,classroomPlan,seniorBenchmark,seniorProvenance,seniorWorkflow,seniorGovernance})",ctx);

test("G6-12 comprises exactly 42 unique lessons in six consistent strands",()=>{
 assert.equal(d.LESSONS.length,42);
 assert.equal(Object.keys(d.GRADES).length,7);
 assert.equal(new Set(d.LESSONS.map(x=>x.id)).size,42);
 for(const grade of [6,7,8,9,10,11,12]){
  const units=d.LESSONS.filter(x=>x.grade===grade);
  assert.equal(units.length,6,"Grade "+grade+" must have six strand modules");
  assert.equal(new Set(units.map(x=>x.strand)).size,6);
  assert.equal(units.filter(x=>x.track==="capacity").length,3);
  assert.equal(units.filter(x=>x.track==="judgement").length,3);
  assert.equal(d.DIAGNOSTICS[grade].length,6);
 }
 assert.equal(d.GRADES[11].headline,"Investigate & Architect");
 assert.equal(d.GRADES[12].headline,"Create & Steward");
});

test("twelve fully-authored DP modules contain independent explanations, checks, glossary, activities and scaffolds",()=>{
 for(const grade of [11,12]){
  for(const strand of ["A1","A2","A3","B1","B2","B3"]){
   const id=grade+"-"+strand,lesson=d.LESSONS.find(x=>x.id===id),k=d.KNOWLEDGE[id],a=d.ACTIVITIES[id],g=d.LEARNING_SCAFFOLDS[id];
   assert.ok(lesson&&k&&a&&g,"Missing "+id);
   assert.equal(k.core.length,3);
   assert.ok(k.core.every(x=>x.length>170),id+" explanations must be substantive");
   assert.ok(k.example[0].length>=30&&k.example[1].length>=100,id+" must show a meaningful worked-example contrast");
   assert.ok(k.check.length===3&&k.check[1].length===3&&Number.isInteger(k.check[2]),id+" check is incomplete");
   assert.ok(k.contexts.length>=2&&k.glossary.length>=2,id+" needs dual authentic contexts and vocabulary");
   assert.equal(g.criteria.length,3);
   assert.ok(["sort","sequence","prompt","evidence","decision"].includes(a.kind));
   assert.ok(a.title.length>15&&a.intro.length>50&&a.tip.length>40,id+" formative work too short");
  }
 }
});

test("twelve senior inquiry and transfer briefs provide original evidence-based work",()=>{
 for(const grade of [11,12])for(const lesson of d.LESSONS.filter(x=>x.grade===grade)){
  const a=d.INQUIRY_BRIEFS[lesson.id],transfer=d.UNSEEN_TRANSFER[lesson.id],plan=d.classroomPlan(lesson);
  assert.ok(a&&transfer&&plan);
  for(const key of ["title","question","try","evidence","transfer"])assert.ok(a[key].length>25,lesson.id+" "+key);
  assert.ok(transfer.length>125,lesson.id+" needs challenging independent transfer");
  assert.notEqual(transfer,a.transfer);
  assert.match(plan.time,/minutes|sessions|studio blocks/);
  assert.ok(plan.prepare.length>100&&plan.response.length>100);
 }
});

test("Grade 11 model evaluation reveals distribution shift and consequential false exclusions",()=>{
 const familiar=d.seniorBenchmark("routine",{threshold:65,severity:3});
 const shifted=d.seniorBenchmark("shifted",{threshold:65,severity:3});
 assert.equal(familiar.denominator,4);assert.equal(shifted.denominator,4);
 assert.equal(familiar.missed,0);assert.equal(shifted.missed,1);
 const high=d.seniorBenchmark("shifted",{threshold:80,severity:5});
 assert.ok(high.missed>shifted.missed);
 assert.ok(high.cost>shifted.cost);
 assert.ok(high.rows.some(x=>x.kind==="false exclusion"));
});

test("Grade 11 provenance lab distinguishes copied sources from independent evidence",()=>{
 const echo=d.seniorProvenance("echo",{standard:"independent"});
 const verified=d.seniorProvenance("independent",{standard:"independent"});
 assert.equal(echo.headlineCount,5);assert.equal(echo.independent,0);
 assert.equal(verified.independent,3);
 const misleading=d.seniorProvenance("echo",{standard:"headlines"});
 assert.equal(misleading.counted,5);
 assert.equal(echo.counted,0);
});

test("Grade 12 workflow stress tests include failure types and human authority",()=>{
 for(const incident of ["missing","outage","privacy"]){
  const autonomous=d.seniorWorkflow("autonomous",{incident});
  const bounded=d.seniorWorkflow("bounded",{incident});
  const human=d.seniorWorkflow("human",{incident});
  assert.notEqual(autonomous.decision,bounded.decision);
  assert.notEqual(bounded.decision,human.decision);
  assert.equal(bounded.incident,incident);
  assert.ok(bounded.control.length>8);
 }
});

test("Grade 12 incident response evaluates practical redress and varied access needs",()=>{
 const hidden=d.seniorGovernance("conceal",{access:"language"});
 const reviewed=d.seniorGovernance("review",{access:"assistive"});
 const repaired=d.seniorGovernance("redress",{access:"assistive"});
 assert.equal(hidden.response.safe,false);
 assert.equal(hidden.needsImprovement,true);
 assert.equal(reviewed.needsImprovement,true);
 assert.equal(repaired.needsImprovement,false);
 assert.match(repaired.response.appeal,/accessible appeal/);
});

test("senior projects have authentic human-checked evidence and realistic multi-session pacing",()=>{
 for(const id of ["11-A3","11-B3","12-A3","12-B3"]){
  const cap=d.CAPSTONE_GUIDES[id];
  assert.ok(cap, id+" capstone absent");
  assert.ok(cap.phases.length>=4, id+" needs project phases");
  assert.ok(cap.evidence.length>=4,id+" needs actual evidence");
  assert.ok(cap.review.length>70,id+" review should invite genuine challenge");
 }
 assert.ok(d.CAPSTONE_GUIDES["12-A3"].phases.length>=6);
 assert.match(d.classroomPlan(d.LESSONS.find(x=>x.id==="12-A3")).time,/6–8 weekly studio blocks/);
});

test("browser entry loads all senior resources before app; no senior lesson needs external AI or private data",()=>{
 const html=readFileSync(join(root,"index.html"),"utf8");
 const positions=["curriculum.js","learning-data.js","content/performance.js","content/senior-curriculum.js","content/senior-projects.js","content/senior-labs.js","content/representation-lab.js","content/progression.js","app.js"].map(x=>html.indexOf('src="./'+x));
 assert.ok(positions.every(x=>x>=0));
 assert.ok(positions.every((x,i)=>i===0||x>positions[i-1]),"Script order must preserve dependencies");
 const senior=paths.filter(x=>x.includes("senior-")).map(x=>readFileSync(join(root,x),"utf8")).join("\n");
 assert.doesNotMatch(senior,/\b(?:fetch|sendBeacon)\s*\(/);
 assert.doesNotMatch(senior,/googleapis\.com|openai\.com\/v1|Authorization:\s*Bearer/i);
});
