import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {runInContext,createContext} from "node:vm";
const root=join(import.meta.dirname,"..");
const read=p=>readFileSync(join(root,p),"utf8");
const contentFiles=["curriculum.js","learning-data.js",...[6,7,8,9,10].map(x=>"content/grade"+x+".js"),"content/learning-scaffolds.js","content/investigations.js","content/labs.js","content/performance.js","content/senior-curriculum.js","content/senior-projects.js","content/senior-labs.js","content/representation-lab.js","content/progression.js","content/v21-interactions.js","content/public-curriculum.js"];
function content(context){for(const f of contentFiles)runInContext(read(f),context,{filename:f});return runInContext("({LESSONS,GRADES,STRANDS,TRACKS,LESSON_BY_ID,ACTIVITIES,DIAGNOSTICS,KNOWLEDGE,LEARNING_SCAFFOLDS,LEARNING_LABS,V21_APPLY,V21_TRANSFER,V21_SYNTHESIS,V21_GRADE_DEMAND})",context)}
const DATA=content(createContext({}));
function app(seed={},hash=""){
 const hooks={},el={innerHTML:""},store={...seed},location={hash},listeners={};
 const focusable={focus(){},tabIndex:0};
 const document={documentElement:{dataset:{}},title:"",querySelector(q){if(q==="#app")return el;if(q==="#guest-name"||q==="#profile-name")return {value:"Learner"};if(q==="#main-content"||q.includes("feedback")||q.endsWith(":checked")||q.startsWith("[data-"))return focusable;return null},addEventListener(k,fn){hooks[k]=fn},body:{appendChild(){}},createElement(){return {click(){},remove(){}}}};
 const window={location,history:{pushState(a,b,p){location.hash=p},replaceState(a,b,p){location.hash=p}},addEventListener(k,fn){listeners[k]=fn},scrollTo(){},renderEducators(){return '<main id="main-content"><h1 id="main-title">My Learning</h1></main>'},educatorOpenOverview(){},renderTeacherGuides(){return '<main id="main-content"><h1 id="main-title">Teaching Guides</h1></main>'},teacherGuidesReset(){}};
 const localStorage={getItem:k=>store[k]??null,setItem(k,v){store[k]=v},removeItem:k=>delete store[k]};
 const navigator={clipboard:{writeText:async()=>{}}};const URL={createObjectURL(){return "blob:test"},revokeObjectURL(){}};
 const ctx=createContext({window,document,localStorage,Date,console,Blob,URL,navigator,setTimeout:(fn)=>fn()});content(ctx);runInContext(read("content/student-mode.js"),ctx,{filename:"content/student-mode.js"});runInContext(read("app.js"),ctx,{filename:"app.js"});
 return {get html(){return el.innerHTML},get hash(){return location.hash},get storage(){return store},click:async ds=>hooks.click({target:{dataset:ds,tagName:"BUTTON",closest(){return this}}}),change:t=>hooks.change({target:t}),back:hash=>{location.hash=hash;listeners.popstate?.()}};
}
async function exploreLab(h,id){const lab=DATA.LEARNING_LABS[id];if(!lab)return;for(const [mode] of lab.modes.slice(0,2))await h.click({action:"lab-mode",mode});}
async function completePractice(h,l){
 const a=DATA.ACTIVITIES[l.id];await exploreLab(h,l.id);
 if(a.kind==="sort")a.items.forEach((item,i)=>h.change({dataset:{sort:String(i)},value:String(item[1])}));
 else if(a.kind==="sequence"){const order=a.start.slice();for(let n=0;n<a.steps.length;n++){let j=order.indexOf(n);while(j>n){await h.click({action:"move",index:String(j),dir:"-1"});const q=order[j];order[j]=order[j-1];order[j-1]=q;j--;}}}
 else h.change({name:"activity-choice",value:String(a.correct)});
 await h.click({action:"check"});
}
async function completeApplication(h,l){
 const a=DATA.V21_APPLY[l.id];
 if(a.kind==="single")h.change({name:"apply-choice",value:String(a.options.findIndex(x=>x[1]===1))});
 else if(a.kind==="multi")a.options.forEach((x,i)=>{if(x[1]===1)h.change({dataset:{applyMulti:String(i)},checked:true})});
 else if(a.kind==="sort")a.items.forEach((x,i)=>h.change({dataset:{applySort:String(i)},value:String(x[1])}));
 else if(a.kind==="sequence"){const order=[1,3,0,2];for(let n=0;n<a.steps.length;n++){let j=order.indexOf(n);while(j>n){await h.click({action:"apply-move",index:String(j),dir:"-1"});const q=order[j];order[j]=order[j-1];order[j-1]=q;j--;}}}
 await h.click({action:"check-application"});await h.click({action:"go-transfer"});
}
async function finish(h,l){
 const k=DATA.KNOWLEDGE[l.id];await h.click({lesson:l.id});await h.click({action:"concept-next"});await h.click({action:"concept-next"});
 h.change({name:"knowledge-choice",value:String(k.check[2])});await h.click({action:"knowledge-check"});await h.click({action:"next"});await h.click({action:"model-reveal"});await h.click({action:"next"});
 await completePractice(h,l);await h.click({action:"next"});await completeApplication(h,l);
 const t=DATA.V21_TRANSFER[l.id];h.change({name:"transfer-choice",value:String(t.options.findIndex(x=>x[1]===1))});await h.click({action:"check-transfer"});
 const syn=DATA.V21_SYNTHESIS[l.id];if(syn){h.change({name:"synthesis-choice",value:String(syn.options.findIndex(x=>x[1]===1))});await h.click({action:"check-synthesis"});}
 assert.equal(JSON.parse(h.storage["aicj-studio-v2"]).records[l.id].completed,true,l.id+" should complete after transfer"+(syn?" and synthesis":""));
}
test("curriculum contains 42 complete modules across seven recommended grades",()=>{
 assert.equal(DATA.LESSONS.length,42);assert.equal(Object.keys(DATA.KNOWLEDGE).length,42);
 for(const grade of [6,7,8,9,10,11,12]){assert.equal(DATA.LESSONS.filter(l=>l.grade===grade).length,6);assert.equal(DATA.DIAGNOSTICS[grade].length,6)}
 for(const l of DATA.LESSONS){const k=DATA.KNOWLEDGE[l.id];assert.ok(k&&DATA.ACTIVITIES[l.id],"Missing "+l.id);assert.equal(k.core.length,3);assert.equal(k.contexts.length,2)}
});
test("V2.1 contains no lesson or educator free-text response fields",()=>{
 const appJs=read("app.js"),educators=read("content/educators.js");
 assert.equal((appJs.match(/<textarea/gi)||[]).length,0);assert.equal((educators.match(/<textarea/gi)||[]).length,0);
 assert.ok(!appJs.includes("practice-reason"));assert.ok(!appJs.includes("data-plan-field"));assert.ok(!appJs.includes("data-reflect-field"));assert.ok(!educators.match(/type=["']text["']/i));
});
test("all 42 Apply and all 42 Transfer experiences are module-specific",()=>{
 assert.equal(Object.keys(DATA.V21_APPLY).length,42);assert.equal(Object.keys(DATA.V21_TRANSFER).length,42);
 assert.equal(new Set(Object.values(DATA.V21_APPLY).map(x=>x.prompt)).size,42,"Every Apply prompt must be unique");
 assert.equal(new Set(Object.values(DATA.V21_TRANSFER).map(x=>x.context)).size,42,"Every Transfer context must be unique");
 for(const l of DATA.LESSONS){assert.match(DATA.V21_APPLY[l.id].prompt,new RegExp("Grade "+l.grade));assert.ok(DATA.V21_TRANSFER[l.id].prompt.includes(l.title));}
});
test("each grade gets varied Apply interactions and explicit grade-calibrated demand",()=>{
 for(const grade of [6,7,8,9,10,11,12]){
  const lessons=DATA.LESSONS.filter(x=>x.grade===grade),kinds=new Set(lessons.map(x=>DATA.V21_APPLY[x.id].kind));
  assert.ok(kinds.size>=3,"Grade "+grade+" needs at least three Apply interaction families");
  assert.ok(DATA.V21_GRADE_DEMAND[grade].verb.length>8);
 }
});
test("cumulative synthesis appears after the third and sixth modules in every grade",()=>{
 assert.equal(Object.keys(DATA.V21_SYNTHESIS).length,14);
 for(const grade of [6,7,8,9,10,11,12])for(const strand of ["A3","B3"])assert.ok(DATA.V21_SYNTHESIS[grade+"-"+strand],grade+"-"+strand+" needs synthesis");
});
test("V2.1 keeps ordering keyboard-operable and supports four structured interaction families",()=>{
 const v=read("content/v21-interactions.js"),appJs=read("app.js");
 for(const kind of ["single","multi","sort","sequence"])assert.ok(v.includes('"'+kind+'"'));
 assert.ok(appJs.includes('data-action="apply-move"'));assert.ok(!appJs.includes("draggable=true"));
});
test("four-hour educator pathway preserves deep learning and interactive decision formats",()=>{
 const e=read("content/educators.js"),d=read("content/educator-v4-data.js");
 for(const kind of ["single","multi","classify","order"])assert.ok(d.includes('kind:"'+kind+'"'));
 for(const phrase of ["Understand the Capacity","Personalisation for All","Creativity and Authenticity","Collaborative Capacity","Agency and Intellectual Ownership","Evidence Before Intervention","Assessment, Feedback and Trust","From Judgement to Taking Action"])assert.ok(d.includes(phrase),phrase);
 for(const phrase of ["Engagement for All","Tier 1","student","evidence"])assert.ok(d.includes(phrase),phrase);
 assert.ok(e.includes("STAGES"),"Educator runtime should support five stages");
 assert.ok(e.includes("moduleDone"),"Educator completion must reflect stage checks");
 assert.ok(!d.match(/<textarea/gi),"Educator content must never require a text field");
});
test("all 42 student modules complete end-to-end with selected responses only",async()=>{
 for(const l of DATA.LESSONS){const h=app();await h.click({action:"pick-grade",pick:String(l.grade)});await finish(h,l)}
});
test("wrong transfer answer cannot complete a module",async()=>{
 const l=DATA.LESSON_BY_ID["6-B2"],h=app();await h.click({action:"pick-grade",pick:"6"});const k=DATA.KNOWLEDGE[l.id];
 await h.click({lesson:l.id});await h.click({action:"concept-next"});await h.click({action:"concept-next"});h.change({name:"knowledge-choice",value:String(k.check[2])});await h.click({action:"knowledge-check"});await h.click({action:"next"});await h.click({action:"model-reveal"});await h.click({action:"next"});await completePractice(h,l);await h.click({action:"next"});await completeApplication(h,l);
 h.change({name:"transfer-choice",value:"1"});await h.click({action:"check-transfer"});
 assert.notEqual(JSON.parse(h.storage["aicj-studio-v2"]).records[l.id].completed,true);assert.match(h.html,/Reconsider the principle/);
});
test("A3 and B3 cannot complete until cumulative synthesis is passed",async()=>{
 const l=DATA.LESSON_BY_ID["8-A3"],h=app();await h.click({action:"pick-grade",pick:"8"});const k=DATA.KNOWLEDGE[l.id];
 await h.click({lesson:l.id});await h.click({action:"concept-next"});await h.click({action:"concept-next"});h.change({name:"knowledge-choice",value:String(k.check[2])});await h.click({action:"knowledge-check"});await h.click({action:"next"});await h.click({action:"model-reveal"});await h.click({action:"next"});await completePractice(h,l);await h.click({action:"next"});await completeApplication(h,l);
 h.change({name:"transfer-choice",value:"0"});await h.click({action:"check-transfer"});assert.notEqual(JSON.parse(h.storage["aicj-studio-v2"]).records[l.id].completed,true);
 h.change({name:"synthesis-choice",value:"0"});await h.click({action:"check-synthesis"});assert.equal(JSON.parse(h.storage["aicj-studio-v2"]).records[l.id].completed,true);
});
test("public curriculum and educator learning remain available before grade selection",async()=>{const h=app();await h.click({action:"educators"});assert.equal(h.hash,"#/educators");assert.match(h.html,/My Learning/);await h.click({action:"curriculum"});assert.equal(h.hash,"#/curriculum")});
test("progress backup stores checkpoints rather than response content",()=>{const appJs=read("app.js");assert.ok(appJs.includes('format:"AI-CJ-local-progress"'));assert.ok(!appJs.includes("LEARNING NOTES"));assert.ok(!appJs.includes("downloadPlan"))});
test("V2.1 assets load before the application",()=>{const html=read("index.html"),v=html.indexOf("content/v21-interactions.js"),edu=html.indexOf("content/educators.js"),appPos=html.indexOf('src="./app.js');assert.ok(v>=0&&edu>v&&appPos>edu);assert.match(html,/content\/v21-interactions\.js\?v=[\w-]+/)});


test("educator V4.1 has eight accessible 30-minute modules and 56 distinct practice decisions",()=>{
 const context=createContext({window:{}});
 runInContext(read("content/educator-v4-data.js"),context,{filename:"content/educator-v4-data.js"});
 const data=context.window.EDUCATOR_V4;
 assert.equal(data.version,"4.1");
 assert.deepEqual(Array.from(data.courses,c=>c.modules.length),[4,4]);
 assert.equal(data.courses.reduce((n,c)=>n+c.minutes,0),240);
 const modules=Array.from(data.courses).flatMap(c=>Array.from(c.modules));
 assert.equal(new Set(modules.map(m=>m.title)).size,8);
 const counts=[0,0,0],patterns=new Set(),multis=new Set();let total=0;
 for(const module of modules){
  assert.equal(module.minutes,30);
  assert.equal(module.glossary.length,3,"Plain-English glossary missing in "+module.id);
  assert.ok(module.ideas.every(x=>x[1].length>90),"Substantive teaching missing in "+module.id);
  const tasks=[module.tasks.learn,module.tasks.model,...Array.from(module.tasks.practice),module.tasks.apply,module.tasks.followup,module.tasks.transfer];
  assert.equal(tasks.length,7,module.id+" must have a follow-up decision");
  total+=tasks.length;
  for(const task of tasks){
   assert.ok(["single","multi","classify","order"].includes(task.kind),module.id+" interaction family");
   assert.ok(task.prompt.length>25,module.id+" prompt is too thin");
   if(task.kind==="single"){
    assert.equal(task.options.length,3);
    assert.equal(task.options.filter(o=>o[1]===1).length,1);
    assert.ok(task.options.every(o=>o[2]?.length>25),"Each answer needs explanatory feedback");
    counts[task.options.findIndex(o=>o[1]===1)]++;
   }
   if(task.kind==="multi"){
    const key=task.options.filter(o=>o[1]===1).length;
    assert.ok(key>=2&&key<task.options.length,"Multi-select needs plausible alternatives");
    multis.add(key+"/"+task.options.length);
   }
   if(task.kind==="classify"){
    assert.ok(task.items.every(o=>o[1]===0||o[1]===1));
    patterns.add(Array.from(task.items,x=>x[1]).join(""));
   }
   if(task.kind==="order")assert.equal(task.steps.length,4);
  }
 }
 assert.equal(total,56);
 assert.deepEqual(counts,[11,11,11],"Single-choice answer positions must be balanced");
 assert.ok(patterns.size>=5,"Classification answer positions must vary");
 assert.ok(multis.size>=3,"Select-all questions must not share a predictable answer count");
});
test("educator V4.1 has plain-language support and never asks for writing",()=>{
 const runtime=read("content/educators.js"),data=read("content/educator-v4-data.js");
 assert.ok(runtime.includes("educator-glossary"));
 assert.ok(runtime.includes("educator-new-evidence"));
 assert.ok(runtime.includes("aicj-educator-progress-v41"));
 assert.ok(!runtime.match(/<textarea/gi));
 assert.ok(!data.match(/<textarea/gi));
 const context=createContext({window:{}});
 runInContext(data,context);
 const modules=Array.from(context.window.EDUCATOR_V4.courses).flatMap(c=>Array.from(c.modules));
 const teaching=modules.map(m=>m.ideas.map(x=>x[1]).join(" ")).join(" ");
 for(const word of ["epistemic trust","construct-irrelevant","triangulate"]){
  assert.ok(!teaching.includes(word),"An unexplained jargon phrase remains in teaching: "+word);
 }
 assert.ok(teaching.includes("Multi-Tiered System of Supports"));
 assert.ok(teaching.includes("Universal Design for Learning"));
});

test("Grade 6 student-only entry loads from a direct link and returns from a module",async()=>{
 const h=app({},"#/student");
 assert.match(h.html,/<h1 id="main-title" tabindex="-1">My Learning<\/h1>/);
 assert.equal((h.html.match(/class="student-work-card /g)||[]).length,6);
 assert.ok(!h.html.includes('class="topbar"'),"Student page must omit the general navigation");
 await h.click({lesson:"6-A1"});
 assert.match(h.html,/<article class="lesson-panel">/);
 await h.click({action:"courses"});
 assert.match(h.html,/<h1 id="main-title" tabindex="-1">My Learning<\/h1>/);
 assert.equal(h.hash,"#/student");
});
test("teacher Student View preview returns without saving temporary progress",async()=>{
 const h=app();
 await h.click({action:"pick-grade",pick:"8"});
 const before=h.storage["aicj-studio-v2"];
 await h.click({action:"student-preview"});
 assert.match(h.html,/Grade 6 · Preview/);
 assert.match(h.html,/My Learning/);
 await h.click({action:"student-exit"});
 assert.equal(h.storage["aicj-studio-v2"],before);
 assert.match(h.html,/Grade 8/);
});

test("five consistent primary navigation links appear on every teacher-facing page",async()=>{
 const expected=["home","curriculum","teacher-guides","educators","about"];
 const h=app();
 await h.click({action:"pick-grade",pick:"6"});
 for(const page of ["home","courses","snapshot","stages","curriculum","teacher-guides","educators","about"]){
  await h.click({action:page});
  const match=h.html.match(/<nav class="top-actions" aria-label="Primary navigation">([\s\S]*?)<\/nav>/);
  assert.ok(match,"Missing desktop navigation on "+page);
  const actions=Array.from(match[1].matchAll(/class="navlink [^"]*" data-action="([^"]+)"/g),m=>m[1]);
  assert.deepEqual(actions,expected,"Inconsistent desktop navigation on "+page);
  assert.ok(match[1].match(/data-action="educators"[^>]*>My Learning<\/button>/),"Teacher learning label missing on "+page);
  assert.ok(!match[1].includes('class="avatar"'),"Profile avatar should not clutter navigation");
  const mobile=h.html.match(/<nav class="mobile-menu-links" aria-label="Mobile navigation">([\s\S]*?)<\/nav>/);
  assert.ok(mobile,"Missing mobile navigation on "+page);
  const mobileActions=Array.from(mobile[1].matchAll(/data-action="([^"]+)"/g),m=>m[1]).filter(x=>x!=="reading");
  assert.deepEqual(mobileActions,expected,"Inconsistent mobile navigation on "+page);
  assert.ok(mobile[1].match(/data-action="educators"[^>]*>My Learning<\/button>/),"Mobile teacher learning label missing on "+page);
 }
 await h.click({action:"home"});
 assert.match(h.html,/data-action="courses">All modules in this stage/);
 assert.match(h.html,/data-action="snapshot">My learning progress/);
 assert.match(h.html,/data-action="explore-stages">Explore stages/);
});

test("floating Student View grade picker previews every grade and restores teacher state",async()=>{
 for(const grade of [6,7,8,9,10,11,12]){
  const h=app();
  await h.click({action:"pick-grade",pick:"8"});
  const before=h.storage["aicj-studio-v2"];
  assert.ok(h.html.includes('data-action="student-preview-menu"'));
  await h.click({action:"student-preview-menu"});
  for(const option of [6,7,8,9,10,11,12])assert.ok(h.html.includes('data-student-grade="'+option+'"'));
  await h.click({action:"student-preview",studentGrade:String(grade)});
  assert.equal(h.hash,grade===6?"#/student":"#/student/"+grade);
  assert.ok(h.html.includes("Grade "+grade+" · Preview"));
  assert.ok(h.html.includes('data-lesson="'+grade+'-A1"'));
  assert.equal((h.html.match(/class="student-work-card /g)||[]).length,6);
  await h.click({lesson:grade+"-A1"});
  assert.ok(h.html.includes("Grade "+grade+" · My Learning"));
  await h.click({action:"courses"});
  assert.ok(h.html.includes('id="main-title" tabindex="-1">My Learning</h1>'));
  await h.click({action:"student-exit"});
  assert.equal(h.hash,"#/grade/8");
  assert.equal(h.storage["aicj-studio-v2"],before);
 }
});

test("Grade 6 through 12 student direct routes show only the requested grade",()=>{
 for(const grade of [6,7,8,9,10,11,12]){
  const h=app({},"#/student/"+grade);
  assert.ok(h.html.includes("Grade "+grade));
  assert.ok(h.html.includes('data-lesson="'+grade+'-B3"'));
  assert.equal((h.html.match(/class="student-work-card /g)||[]).length,6);
  assert.ok(!h.html.includes('class="topbar"'));
 }
});


test("student My Learning groups A1–A3 in Capacity and B1–B3 in Judgement for all grades",()=>{
 for(const grade of [6,7,8,9,10,11,12]){
  const h=app({},"#/student/"+grade);
  const left=h.html.indexOf('class="student-pathway-column student-pathway-capacity"');
  const right=h.html.indexOf('class="student-pathway-column student-pathway-judgement"');
  assert.ok(left>=0&&right>left,"Both ordered pathway columns required for Grade "+grade);
  assert.match(h.html,/student-pathway-heading"><h3>AI Capacity<\/h3>/);
  assert.match(h.html,/student-pathway-heading"><h3>AI Judgement<\/h3>/);
  let lastLeft=left,lastRight=right;
  for(let strand=1;strand<=3;strand++){
   const a=h.html.indexOf('data-lesson="'+grade+'-A'+strand+'"',left);
   const b=h.html.indexOf('data-lesson="'+grade+'-B'+strand+'"',right);
   assert.ok(a>lastLeft&&a<right,"A"+strand+" belongs in left column of Grade "+grade);
   assert.ok(b>lastRight,"B"+strand+" belongs in right column of Grade "+grade);
   lastLeft=a;lastRight=b;
  }
  assert.ok(h.html.includes('class="student-work-grid student-pathway-columns"'));
 }
});
test("completed student modules stay in their Capacity or Judgement column",()=>{
 const key="aicj-studio-v2";
 const records={"9-A1":{completed:true,lastStage:4},"9-B2":{completed:true,lastStage:4}};
 const h=app({[key]:JSON.stringify({grade:9,recommendedGrade:9,gradeChosen:true,name:"Learner",records})},"#/student/9");
 const todo=h.html.slice(h.html.indexOf('id="student-work-title"'),h.html.indexOf('<details class="student-completed">'));
 assert.ok(!todo.includes('data-lesson="9-A1"'));
 assert.ok(!todo.includes('data-lesson="9-B2"'));
 assert.ok(todo.includes('data-lesson="9-A2"'));
 assert.ok(todo.includes('data-lesson="9-B1"'));
 const done=h.html.slice(h.html.indexOf('<details class="student-completed">'));
 const left=done.indexOf('class="student-pathway-column student-pathway-capacity"');
 const right=done.indexOf('class="student-pathway-column student-pathway-judgement"');
 assert.ok(left>=0&&right>left);
 const a=done.indexOf('data-lesson="9-A1"',left);
 const b=done.indexOf('data-lesson="9-B2"',right);
 assert.ok(a>left&&a<right&&b>right,"Completed modules remain in their correct columns");
});
