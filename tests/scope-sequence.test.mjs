import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {createContext,runInContext} from "node:vm";
const root=join(import.meta.dirname,"..");
const source=["curriculum.js","learning-data.js",...[6,7,8,9,10].map(g=>"content/grade"+g+".js"),
 "content/learning-scaffolds.js","content/investigations.js","content/labs.js","content/performance.js",
 "content/senior-curriculum.js","content/senior-projects.js","content/senior-labs.js",
 "content/representation-lab.js","content/progression.js"];
const ctx=createContext({});
for(const path of source)runInContext(readFileSync(join(root,path),"utf8"),ctx,{filename:path});
const d=runInContext("({LESSONS,KNOWLEDGE,GRADES,SCOPE_SEQUENCE,SPIRAL_LABELS,PROGRESSION_CONTENT,LEARNING_LABS,labRepresentation})",ctx);

test("seven-grade scope sequence is a coherent, complete 42-competency progression",()=>{
 assert.equal(Object.keys(d.SCOPE_SEQUENCE).length,7);
 assert.equal(d.LESSONS.length,42);
 assert.equal(Object.keys(d.SPIRAL_LABELS).length,6);
 for(const grade of [6,7,8,9,10,11,12]){
  const level=d.SCOPE_SEQUENCE[grade],lessons=d.LESSONS.filter(l=>l.grade===grade);
  assert.ok(level&&level.stage&&level.concept&&level.step,"No grade identity "+grade);
  assert.ok(level.concept.length>55,"Core concept lacks detail "+grade);
  assert.equal(lessons.length,6);
  for(const strand of ["A1","A2","A3","B1","B2","B3"]){
   const lesson=lessons.find(l=>l.strand===strand),item=level.strands[strand];
   assert.ok(lesson&&item,grade+"-"+strand);
   assert.ok(item[0].length>=50,"Observable new move too vague "+lesson.id);
   assert.ok(item[1].length>=50,"Misconception probe too vague "+lesson.id);
   assert.equal(lesson.progression.move,item[0]);
   assert.equal(lesson.progression.misconception,item[1]);
  }
 }
 assert.equal(new Set(d.LESSONS.map(l=>l.progression.move)).size,42,"Progression should not duplicate the same task");
 assert.equal(new Set(d.LESSONS.map(l=>l.progression.misconception)).size,42,"Misconceptions should be contextual");
});
test("each grade has an authentic, distinctive cross-pathway performance assessment",()=>{
 const titles=new Set();
 for(const grade of [6,7,8,9,10,11,12]){
  const m=d.SCOPE_SEQUENCE[grade].challenge;
  assert.ok(m.title.length>20);assert.ok(!titles.has(m.title));titles.add(m.title);
  for(const key of ["question","task","evidence","feedback","transfer"])assert.ok(m[key].length>=75,grade+"."+key+" needs meaningful instructional substance");
  assert.equal(m.criteria.length,3);
  for(const criterion of m.criteria)assert.ok(criterion.length>45,grade+" success criterion not observable enough");
  assert.match(m.task,/AI|tool|system|technology|model|non-AI/i);
  assert.match(m.evidence,/evidence|source|label|comparison|trace|test|original|artefact|report|revision|prototype|log|defence/i);
 }
});
test("technical spine explicitly deepens perception, data, representation, evaluation and systems",()=>{
 for(const grade of [6,7,8,9,10,11,12]){
  const id=grade+"-A1",core=d.KNOWLEDGE[id].core.join(" ");
  assert.ok(core.length>=670,id+" lacks substantive mechanism teaching");
 }
 assert.match(d.KNOWLEDGE["6-A1"].core.join(" "),/camera|microphone|signal/i);
 assert.match(d.KNOWLEDGE["7-A1"].core.join(" "),/training|test cases|shortcut/i);
 assert.match(d.KNOWLEDGE["8-A1"].core.join(" "),/representations|features|audio/i);
 assert.match(d.KNOWLEDGE["9-A1"].core.join(" "),/Retrieval can supply source/i);
 assert.match(d.KNOWLEDGE["10-A1"].core.join(" "),/false positive|false negative/i);
 assert.match(d.KNOWLEDGE["11-A1"].core.join(" "),/human decisions|model card/i);
 assert.match(d.KNOWLEDGE["12-A1"].core.join(" "),/multimodal|tool/i);
});
test("responsible progression includes consent, creative rights, sustainability and tangible remedy",()=>{
 for(const grade of [7,8,9,10,11,12]){
  const id=grade+"-B3",text=d.KNOWLEDGE[id].core.join(" ");
  assert.ok(/privacy|permission|consent|copyright|licens|appeal|redress|fairness|rights/i.test(text),id+" lacks actionable responsibility");
 }
 assert.match(d.KNOWLEDGE["7-B3"].core.join(" "),/Copyright|licensing/i);
 assert.match(d.KNOWLEDGE["8-B3"].core.join(" "),/energy|material resource/i);
 assert.match(d.KNOWLEDGE["11-B3"].core.join(" "),/sustainability|computation/i);
 assert.match(d.KNOWLEDGE["12-B3"].core.join(" "),/creators|resource burdens/i);
});
test("new G8 experiment demonstrates missing information without claiming a trained model",()=>{
 const colour=d.labRepresentation("colour"),texture=d.labRepresentation("texture"),occluded=d.labRepresentation("occluded");
 assert.equal(colour.matches,2);
 assert.equal(texture.matches,4);
 assert.equal(occluded.unknown,2);
 assert.equal(occluded.rows.filter(x=>x.predicted==="Insufficient information").length,2);
 assert.equal(colour.total,4);
 assert.equal(d.LEARNING_LABS["8-A1"].kind,"representation");
 assert.match(d.LEARNING_LABS["8-A1"].explanation,/rule-based|not a trained/i);
 assert.equal(Object.keys(d.LEARNING_LABS).length,11);
});
test("new spiral and labs load before the app; user work remains offline",()=>{
 const html=readFileSync(join(root,"index.html"),"utf8");
 const scripts=["content/representation-lab.js","content/progression.js","app.js"];
 const positions=scripts.map(x=>html.indexOf('src="./'+x));
 assert.ok(positions.every(x=>x>=0));
 assert.ok(positions[0]<positions[1]&&positions[1]<positions[2]);
 const src=source.slice(-2).map(x=>readFileSync(join(root,x),"utf8")).join("\n");
 assert.doesNotMatch(src,/\bfetch\s*\(|\bsendBeacon\s*\(|Authorization:\s*Bearer/i);
 assert.doesNotMatch(src,/email addresses|individual student score|student full name/i);
});
