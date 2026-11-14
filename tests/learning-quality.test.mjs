import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {createContext,runInContext} from "node:vm";

const root=join(import.meta.dirname,"..");
const context=createContext({});
const paths=[
 "curriculum.js","learning-data.js",
 ...[6,7,8,9,10].map(g=>"content/grade"+g+".js"),
 "content/learning-scaffolds.js","content/investigations.js","content/labs.js","content/performance.js","content/senior-curriculum.js","content/senior-projects.js","content/senior-labs.js","content/representation-lab.js","content/progression.js"
];
for(const path of paths)runInContext(readFileSync(join(root,path),"utf8"),context,{filename:path});
const data=runInContext("({LESSONS,INQUIRY_BRIEFS,CAPSTONE_GUIDES,LEARNING_LABS,LAB_EVALUATIONS,LAB_FEED_POSTS,UNSEEN_TRANSFER,TEACHER_RUBRIC,CLASSROOM_PACING,classroomPlan,labGrade6,labEvaluate,labClassify,labRankFeed})",context);
const {LESSONS,INQUIRY_BRIEFS,CAPSTONE_GUIDES,LEARNING_LABS}=data;

test("all 42 modules now contain original, actionable and age-appropriate inquiry tasks",()=>{
 const lessonIds=LESSONS.map(l=>l.id);
 assert.equal(LESSONS.length,42);
 assert.equal(Object.keys(INQUIRY_BRIEFS).length,42);
 assert.equal(new Set(lessonIds).size,42);
 assert.equal(new Set(lessonIds.map(id=>INQUIRY_BRIEFS[id]?.title)).size,42,"Investigations should be distinct");
 for(const id of lessonIds){
  const task=INQUIRY_BRIEFS[id];
  assert.ok(task,"Missing authentic inquiry for "+id);
  for(const field of ["title","question","try","evidence","transfer"]){
   assert.ok(typeof task[field]==="string"&&task[field].trim().length>=(field==="title"?10:25), id+"."+field+" needs an actionable instruction");
  }
  assert.ok(!/\b(?:upload (?:your|student)|enter your full name|sign in to)\b/i.test(task.try),"Do not require private data in public preview: "+id);
 }
});

test("labs cover data, algorithmic influence, evaluation, companion boundaries and ethical design",()=>{
 const required={
  "6-A1":"discriminate",
  "7-A1":"classifier",
   "8-A1":"representation",
  "8-B2":"feed",
  "9-A1":"evaluation",
  "9-B1":"relationship",
  "10-A3":"decision",
   "11-A1":"benchmark","11-B2":"provenance","12-A2":"workflow","12-B3":"governance"
 };
 assert.deepEqual(Object.keys(LEARNING_LABS).sort(),Object.keys(required).sort());
 for(const [id,kind] of Object.entries(required)){
  const lab=LEARNING_LABS[id];
  assert.equal(lab.kind,kind,id+" wrong lab type");
  assert.ok(lab.modes.length>=2,"A lab needs conditions or genuine choices: "+id);
  assert.equal(new Set(lab.modes.map(m=>m[0])).size,lab.modes.length);
  for(const field of ["title","introduction","question","explanation","reflection"])assert.ok(lab[field].length>=(field==="title"?12:25),id+" missing "+field);
 }
});

test("training-data lab runs a real deterministic nearest-example rule and demonstrates an artefactual shortcut",()=>{
 const a=data.labClassify("skewed"),b=data.labClassify("balanced");
 assert.equal(a.trainingCount,2);
 assert.equal(b.trainingCount,4);
 assert.equal(a.total,4);
 assert.equal(b.total,4);
 assert.equal(a.correct,2);
 assert.equal(b.correct,4);
 assert.equal(a.rows.filter(x=>!x.correct).length,2);
 assert.ok(a.rows.some(x=>x.name.includes("dim light")&&!x.correct));
});

test("feed ranking actually changes with the objective, without external data",()=>{
 const attention=data.labRankFeed("attention"),quality=data.labRankFeed("evidence");
 assert.equal(attention.length,5);
 assert.equal(quality.length,5);
 assert.equal(attention[0].voice,"Anonymous viral claim");
 assert.equal(quality[0].voice,"Multilingual student contributors");
 assert.notEqual(attention[0].title,quality[0].title);
 assert.equal(new Set(attention.map(x=>x.title)).size,5);
 assert.equal(new Set(quality.map(x=>x.title)).size,5);
});

test("reliability lab shows how sampling choices change the interpretation",()=>{
 const easy=data.LAB_EVALUATIONS.easy,mixed=data.LAB_EVALUATIONS.mixed;
 assert.equal(easy.filter(x=>x.passed).length,4);
 assert.equal(mixed.filter(x=>x.passed).length,5);
 assert.equal(mixed.length,8);
 assert.ok(mixed.some(x=>!x.passed&&/language|accessibility/.test(x.name)));
});

test("capstones provide concrete production, testing and conference evidence",()=>{
 for(const id of ["8-A3","9-A3","10-A3","10-B3","11-A3","11-B3","12-A3","12-B3"]){
  const guide=CAPSTONE_GUIDES[id];
  assert.ok(guide,id+" missing capstone guide");
  assert.ok(guide.phases.length>=4,id+" insufficient phases");
  assert.ok(guide.evidence.length>=4,id+" insufficient evidence");
  for(const phase of guide.phases)assert.ok(phase.length>40,id+" phase too vague");
  for(const item of guide.evidence)assert.ok(item.length>=10,id+" evidence too vague");
 }
});

test("new investigations are included before the app and do not add external scripts",()=>{
 const html=readFileSync(join(root,"index.html"),"utf8");
 const source=html.indexOf("content/investigations.js");
 const labs=html.indexOf("content/labs.js");
 const app=html.indexOf('src="./app.js');
 assert.ok(source>=0&&labs>source&&app>labs,"Load investigations, then labs, before the app");
 const combined=paths.filter(x=>x.endsWith(".js")).map(path=>readFileSync(join(root,path),"utf8")).join("\n");
 assert.doesNotMatch(combined,/\b(?:fetch|sendBeacon)\s*\(/,"Investigations remain offline");
});


test("all 42 modules have distinct, genuinely unfamiliar transfer tasks and realistic classroom plans",()=>{
 const ids=LESSONS.map(l=>l.id);
 assert.equal(Object.keys(data.UNSEEN_TRANSFER).sort().join("|"),Array.from(ids).sort().join("|"));
 assert.equal(Object.keys(data.TEACHER_RUBRIC).length,4);
 for(const l of LESSONS){
  const task=data.UNSEEN_TRANSFER[l.id];
  assert.ok(task.length>75,l.id+" transfer needs a new context and meaningful reasoning");
  assert.notEqual(task,INQUIRY_BRIEFS[l.id].transfer,l.id+" needs an unfamiliar task rather than repeated practice");
  const guide=data.classroomPlan(l);
  assert.match(guide.time,/minutes|sessions/,l.id+" needs realistic time guidance");
  assert.ok(guide.offline.length>=60,l.id+" must have a useful non-AI equivalent");
  assert.ok(guide.prepare.length>=40,l.id+" needs teacher preparation");
  assert.ok(guide.response.length>=40,l.id+" needs an age-relative outcome");
 }
 for(const criterion of Object.values(data.TEACHER_RUBRIC)){
  for(const band of ["developing","applying","transferring"])assert.ok(criterion[band].length>45,band+" is too vague");
 }
});

test("every worked example addresses the lesson's central scenario with explicit evidence or a clear decision",()=>{
 const context=createContext({});
 for(const path of paths)runInContext(readFileSync(join(root,path),"utf8"),context,{filename:path});
 const knowledge=runInContext("KNOWLEDGE",context);
 for(const l of LESSONS){
  const ex=knowledge[l.id].example;
  assert.equal(ex.length,2,l.id+" needs contrasting examples");
  assert.ok(ex[0].length>=30&&ex[1].length>=100,l.id+" examples need instructional substance");
  assert.notEqual(ex[0],ex[1],l.id+" examples should contrast");
 }
 const issues=["8-B2","9-B1","6-A1"];
 const scenarioLinks={
  "8-B2":/rank|feed|post/i,
  "9-B1":/chatbot|caring|secret/i,
  "6-A1":/confident|understanding|discovery/i
 };
 for(const id of issues)assert.match(knowledge[id].example.join(" "),scenarioLinks[id],id+" must model its actual scenario");
});

test("Grade 6 lab distinguishes fixed rules from evidence of learned patterns without overclaiming",()=>{
 assert.equal(data.labGrade6("timer",false).output.includes("300 seconds"),true);
 assert.equal(data.labGrade6("timer",true).output.includes("120 seconds"),true);
 assert.match(data.labGrade6("unknown",true).interpretation,/not sufficient evidence/);
});

test("classifier features and training examples genuinely change the deterministic predictions",()=>{
 const limited=data.labClassify("skewed");
 assert.equal(limited.correct,2);
 const expanded=data.labClassify("skewed",{extraExamples:[0,1],lightingWeight:2});
 assert.equal(expanded.trainingCount,4);
 assert.equal(expanded.correct,4);
 const onlyOne=data.labClassify("skewed",{extraExamples:[0],lightingWeight:2});
 assert.equal(onlyOne.trainingCount,3);
 assert.ok(onlyOne.correct>=limited.correct&&onlyOne.correct<=4);
 const noLighting=data.labClassify("skewed",{extraExamples:[],lightingWeight:0});
 assert.equal(noLighting.rows.length,4);
 assert.notDeepEqual(noLighting.rows.map(x=>x.predicted),limited.rows.map(x=>x.predicted));
});

test("changing feed ranking weights and evaluation stakes changes output without data collection",()=>{
 const attention=data.labRankFeed("attention");
 const evidenceHeavy=data.labRankFeed("evidence",{evidenceWeight:90});
 const representationHeavy=data.labRankFeed("evidence",{evidenceWeight:20});
 assert.notEqual(attention[0].voice,evidenceHeavy[0].voice);
 assert.notEqual(evidenceHeavy[0].voice,representationHeavy[0].voice);
 const equal=data.labEvaluate("mixed",false),weighted=data.labEvaluate("mixed",true);
 assert.equal(equal.passed,weighted.passed);
 assert.equal(equal.total,8);
 assert.ok(weighted.weightedRisk>equal.weightedRisk,"High-stakes error weighting should change interpretation");
});

test("public page loads performance tasks before the learning app",()=>{
 const html=readFileSync(join(root,"index.html"),"utf8");
 const part=html.indexOf("content/performance.js"),app=html.indexOf('src="./app.js');
 assert.ok(part>=0&&app>part,"Rubrics and transfer tasks must be loaded before app.js");
});
