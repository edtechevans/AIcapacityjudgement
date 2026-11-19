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
 const window={location,history:{pushState(a,b,p){location.hash=p},replaceState(a,b,p){location.hash=p}},addEventListener(k,fn){listeners[k]=fn},scrollTo(){},renderEducators(){return '<main id="main-content"><h1 id="main-title">Educator learning</h1></main>'},educatorOpenOverview(){}};
 const localStorage={getItem:k=>store[k]??null,setItem(k,v){store[k]=v},removeItem:k=>delete store[k]};
 const navigator={clipboard:{writeText:async()=>{}}};const URL={createObjectURL(){return "blob:test"},revokeObjectURL(){}};
 const ctx=createContext({window,document,localStorage,Date,console,Blob,URL,navigator,setTimeout:(fn)=>fn()});content(ctx);runInContext(read("app.js"),ctx,{filename:"app.js"});
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
test("educator pedagogy includes authentic assessment redesign and four interaction types",()=>{
 const e=read("content/educators.js");
 for(const kind of ["single","multi","classify","order"])assert.ok(e.includes('kind:"'+kind+'"'));
 for(const phrase of ["Where did the thinking disappear?","Scaffold or substitute?","Make learning evidence visible","Equity is part of validity","Redesign studio"])assert.ok(e.includes(phrase));
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
test("public curriculum and educator learning remain available before grade selection",async()=>{const h=app();await h.click({action:"educators"});assert.equal(h.hash,"#/educators");assert.match(h.html,/Educator learning/);await h.click({action:"curriculum"});assert.equal(h.hash,"#/curriculum")});
test("progress backup stores checkpoints rather than response content",()=>{const appJs=read("app.js");assert.ok(appJs.includes('format:"AI-CJ-local-progress"'));assert.ok(!appJs.includes("LEARNING NOTES"));assert.ok(!appJs.includes("downloadPlan"))});
test("V2.2 uses one consolidated interface system and loads learning assets in order",()=>{
 const html=read("index.html"),v=html.indexOf("content/v21-interactions.js"),edu=html.indexOf("content/educators.js"),appPos=html.indexOf('src="./app.js');
 assert.ok(v>=0&&edu>v&&appPos>edu);
 assert.match(html,/ui\/v22-system\.css/);assert.match(html,/v22-20261119/);
 assert.ok(!html.includes("ui/future.css"));assert.ok(!html.includes("ui/identity.css"));assert.ok(!html.includes("ui/educators.css"));
 const css=read("ui/v22-system.css"),appJs=read("app.js");
 for(const token of ["intersection-visual","pathway-map","learning-rail","v21-feedback-grid","prefers-reduced-motion"])assert.ok(css.includes(token),"Missing V2.2 design component "+token);
 for(const fn of ["intersectionVisual","pathwayMap"])assert.ok(appJs.includes("function "+fn),"Missing V2.2 UI helper "+fn);
});
