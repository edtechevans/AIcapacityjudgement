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
 "content/learning-scaffolds.js","content/investigations.js","content/labs.js"
];
for(const path of paths)runInContext(readFileSync(join(root,path),"utf8"),context,{filename:path});
const data=runInContext("({LESSONS,INQUIRY_BRIEFS,CAPSTONE_GUIDES,LEARNING_LABS,LAB_EVALUATIONS,LAB_FEED_POSTS,labClassify,labRankFeed})",context);
const {LESSONS,INQUIRY_BRIEFS,CAPSTONE_GUIDES,LEARNING_LABS}=data;

test("all 30 modules now contain original, actionable and age-appropriate inquiry tasks",()=>{
 const lessonIds=LESSONS.map(l=>l.id);
 assert.equal(LESSONS.length,30);
 assert.equal(Object.keys(INQUIRY_BRIEFS).length,30);
 assert.equal(new Set(lessonIds).size,30);
 assert.equal(new Set(lessonIds.map(id=>INQUIRY_BRIEFS[id]?.title)).size,30,"Investigations should be distinct");
 for(const id of lessonIds){
  const task=INQUIRY_BRIEFS[id];
  assert.ok(task,"Missing authentic inquiry for "+id);
  for(const field of ["title","question","try","evidence","transfer"]){
   assert.ok(typeof task[field]==="string"&&task[field].trim().length>=25, id+"."+field+" needs an actionable instruction");
  }
  assert.ok(!/\b(?:upload (?:your|student)|enter your full name|sign in to)\b/i.test(task.try),"Do not require private data in public preview: "+id);
 }
});

test("labs cover data, algorithmic influence, evaluation, companion boundaries and ethical design",()=>{
 const required={
  "7-A1":"classifier",
  "8-B2":"feed",
  "9-A1":"evaluation",
  "9-B1":"relationship",
  "10-A3":"decision"
 };
 assert.deepEqual(Object.keys(LEARNING_LABS).sort(),Object.keys(required).sort());
 for(const [id,kind] of Object.entries(required)){
  const lab=LEARNING_LABS[id];
  assert.equal(lab.kind,kind,id+" wrong lab type");
  assert.ok(lab.modes.length>=2,"A lab needs conditions or genuine choices: "+id);
  assert.equal(new Set(lab.modes.map(m=>m[0])).size,lab.modes.length);
  for(const field of ["title","introduction","question","explanation","reflection"])assert.ok(lab[field].length>=25,id+" missing "+field);
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
 for(const id of ["8-A3","9-A3","10-A3","10-B3"]){
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
