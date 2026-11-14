import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {createContext,runInContext} from "node:vm";

const root=join(import.meta.dirname,"..");
const read=path=>readFileSync(join(root,path),"utf8");
const context=createContext({});
for(const path of ["curriculum.js","learning-data.js",...Array.from({length:5},(_,i)=>"content/grade"+(i+6)+".js"),"content/learning-scaffolds.js"]){
  runInContext(read(path),context,{filename:path});
}
const {LESSONS,STRANDS,GRADES,KNOWLEDGE,ACTIVITIES,LEARNING_SCAFFOLDS}=runInContext("({LESSONS,STRANDS,GRADES,KNOWLEDGE,ACTIVITIES,LEARNING_SCAFFOLDS})",context);
const nonEmpty=(value,label)=>assert.ok(typeof value==="string"&&value.trim().length>=8,label+" must be meaningful text");

test("curriculum IDs form a complete, unique and balanced G6-G10 matrix",()=>{
  assert.equal(LESSONS.length,30);
  assert.equal(new Set(LESSONS.map(x=>x.id)).size,30,"Duplicate lesson ID");
  assert.equal(STRANDS.length,6);
  for(const grade of Object.keys(GRADES).map(Number)){
    const actual=LESSONS.filter(x=>x.grade===grade);
    assert.equal(actual.length,6,"Six lessons required in grade "+grade);
    for(const strand of STRANDS){
      assert.equal(actual.filter(x=>x.id===grade+"-"+strand.id).length,1,"Missing/duplicate "+grade+"-"+strand.id);
    }
    assert.equal(actual.filter(x=>x.id.includes("-A")).length,3);
    assert.equal(actual.filter(x=>x.id.includes("-B")).length,3);
  }
  const lessonIds=new Set(LESSONS.map(x=>x.id));
  for(const [label,data] of Object.entries({KNOWLEDGE,ACTIVITIES,LEARNING_SCAFFOLDS})){
    assert.deepEqual(Object.keys(data).filter(id=>!lessonIds.has(id)),[],"Orphan "+label+" content");
  }
});

test("every lesson has actionable instructional scaffolding, distinct criteria and transfer",()=>{
  for(const lesson of LESSONS){
    const id=lesson.id,scaffold=LEARNING_SCAFFOLDS[id],knowledge=KNOWLEDGE[id];
    assert.ok(scaffold,"Missing scaffold: "+id);
    assert.ok(knowledge,"Missing teaching: "+id);
    for(const field of ["notice","support","stretch","transfer"])nonEmpty(scaffold[field],id+"."+field);
    assert.ok(Array.isArray(scaffold.criteria),id+" criteria absent");
    assert.equal(scaffold.criteria.length,3,id+" needs three success criteria");
    for(const [index,value] of scaffold.criteria.entries())nonEmpty(value,id+" criterion "+index);
    assert.equal(new Set(scaffold.criteria.map(s=>s.trim().toLowerCase())).size,3,id+" duplicated criteria");
    assert.ok(Array.isArray(knowledge.core)&&knowledge.core.length===3,id+" needs three explanations");
    for(const [index,paragraph] of knowledge.core.entries())nonEmpty(paragraph,id+" explanation "+index);
  }
});

test("every activity has a checkable interaction, explanatory feedback and teacher-safe examples",()=>{
  const allowed=new Set(["sort","sequence","prompt","decision","evidence"]);
  for(const lesson of LESSONS){
    const id=lesson.id,activity=ACTIVITIES[id];
    assert.ok(activity,"Missing activity: "+id);
    assert.ok(allowed.has(activity.kind),id+" unknown interaction kind");
    nonEmpty(activity.title,id+".title");
    nonEmpty(activity.intro,id+".intro");
    nonEmpty(activity.tip,id+".tip");
    if(activity.kind==="sort"){
      assert.ok(activity.categories.length>=2&&activity.items.length>=3,id+" needs sorting examples");
      for(const [prompt,answer,reason] of activity.items){
        nonEmpty(prompt,id+" sort prompt");nonEmpty(reason,id+" sort feedback");
        assert.ok(Number.isInteger(answer)&&answer>=0&&answer<activity.categories.length,id+" invalid category");
      }
    }else if(activity.kind==="sequence"){
      assert.ok(activity.steps.length>=3,id+" insufficient workflow steps");
      assert.deepEqual([...activity.start].sort((a,b)=>a-b),activity.steps.map((_,i)=>i),id+" invalid sequence permutation");
    }else{
      assert.ok(activity.options.length>=2,id+" insufficient alternatives");
      assert.ok(Number.isInteger(activity.correct)&&activity.correct>=0&&activity.correct<activity.options.length,id+" invalid correct answer");
      for(const option of activity.options){
        nonEmpty(option[0],id+" option text");
        nonEmpty(option[1],id+" feedback text");
      }
    }
  }
});

test("public preview does not silently gain network-based student tracking or assessment claims",()=>{
  const html=read("index.html"),app=read("app.js");
  assert.match(html,/noscript/);
  assert.doesNotMatch(html,/<script[^>]+(?:https?:)?\/\//i,"Review third-party runtime scripts before adding them");
  assert.doesNotMatch(app,/\b(?:fetch|sendBeacon)\s*\(/,"Network calls need an explicit privacy and safeguarding review");
  assert.doesNotMatch(app,/\b(?:XMLHttpRequest|WebSocket|EventSource)\b/,"Network services require a privacy review");
  assert.doesNotMatch(app,/\b(?:eval|new Function)\s*\(/,"Avoid dynamic code evaluation");
});

test("release documentation preserves the distinction between practice and assessed mastery",()=>{
  const docs=[read("README.md"),read("docs/LEARNING_EXPERIENCE_REVIEW.md"),read("docs/STUDENT_PILOT_GUIDE.md")].join("\n");
  assert.match(docs,/not (?:a |automatically )?(?:validated |verified |certified )?mastery|not.*mastery/i);
  assert.match(docs,/student pilot|ten-student pilot/i);
  assert.match(docs,/privacy/i);
});
