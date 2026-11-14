import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {join} from "node:path";
import {runInContext,createContext} from "node:vm";
const root=join(import.meta.dirname,"..");
const read=p=>readFileSync(join(root,p),"utf8");
const contentFiles=["curriculum.js","learning-data.js",...[6,7,8,9,10].map(x=>"content/grade"+x+".js")];
function content(context){for(const f of contentFiles)runInContext(read(f),context,{filename:f});return runInContext("({LESSONS,GRADES,STRANDS,TRACKS,LESSON_BY_ID,ACTIVITIES,DIAGNOSTICS,KNOWLEDGE})",context)}
const DATA=content(createContext({}));
function app(seed={},hash=""){
 const hooks={},el={innerHTML:""},store={...seed},location={hash},listeners={};
 const document={documentElement:{dataset:{}},title:"",querySelector(q){if(q==="#app")return el;if(q==="#guest-name"||q==="#profile-name")return {value:"Learner"};if(q==="#main-title"||q==="#activity-feedback"||q.endsWith(":checked")||q.startsWith("[data-pick="))return {focus(){}};if(q==='[data-action="record"]')return {disabled:false};return null},addEventListener(k,fn){hooks[k]=fn}};
 const window={location,history:{pushState(a,b,p){location.hash=p},replaceState(a,b,p){location.hash=p}},addEventListener(k,fn){listeners[k]=fn},scrollTo(){}};
 const localStorage={getItem:k=>store[k]??null,setItem(k,v){store[k]=v},removeItem:k=>delete store[k]};
 const ctx=createContext({window,document,localStorage,Date,console});content(ctx);runInContext(read("app.js"),ctx,{filename:"app.js"});
 return {get html(){return el.innerHTML},get hash(){return location.hash},get storage(){return store},get reading(){return document.documentElement.dataset.reading},click:async ds=>hooks.click({target:{dataset:ds,tagName:"BUTTON",closest(){return this}}}),change:t=>hooks.change({target:t}),input:t=>hooks.input({target:t}),back:hash=>{location.hash=hash;listeners.popstate?.()}};
}
const notes={purpose:"I want to help students understand an authentic problem and explain who might benefit.",decision:"I will use approved AI tools only where they help and check the evidence against alternatives.",evidence:"I will ask a potential user for feedback, examine the results and decide what needs improving.",work:"I created a first storyboard explaining the task and how a student would approach the problem.",revision:"I tested my first version, found a confusing explanation and revised it for the audience."};
async function finish(h,l){
 const k=DATA.KNOWLEDGE[l.id],a=DATA.ACTIVITIES[l.id];
 await h.click({lesson:l.id});await h.click({action:"concept-next"});await h.click({action:"concept-next"});
 h.change({name:"knowledge-choice",value:String(k.check[2])});await h.click({action:"knowledge-check"});await h.click({action:"next"});await h.click({action:"model-reveal"});await h.click({action:"next"});
 if(a.kind==="sort")a.items.forEach((item,i)=>h.change({dataset:{sort:String(i)},value:String(item[1])}));
 else if(a.kind==="sequence"){const order=a.start.slice();for(let n=0;n<a.steps.length;n++){let j=order.indexOf(n);while(j>n){await h.click({action:"move",index:String(j),dir:"-1"});const tmp=order[j];order[j]=order[j-1];order[j-1]=tmp;j--}}}
 else{h.change({name:"activity-choice",value:String(a.correct)});h.input({id:"practice-reason",value:"This is the strongest response because it serves the learning goal and considers credible evidence."})}
 await h.click({action:"check"});assert.match(h.html,/Challenge passed/);
 await h.click({action:"next"});
 for(const [key,value] of Object.entries(notes))h.input({dataset:{planField:key},value});
 h.change({id:"project-confirm",checked:true,dataset:{}});
 await h.click({action:"record"});assert.match(h.html,/Stage 5 of 5 · Reflect/);
}
test("every grade has full teaching, challenge and diagnostic data",()=>{
 assert.equal(DATA.LESSONS.length,30);assert.equal(Object.keys(DATA.KNOWLEDGE).length,30);
 for(const grade of [6,7,8,9,10]){assert.equal(DATA.LESSONS.filter(l=>l.grade===grade).length,6);assert.equal(DATA.DIAGNOSTICS[grade].length,6)}
 for(const l of DATA.LESSONS){const k=DATA.KNOWLEDGE[l.id];assert.ok(k&&DATA.ACTIVITIES[l.id],"Missing module: "+l.id);assert.equal(k.core.length,3);assert.equal(k.contexts.length,2);assert.equal(k.glossary.length,2)}
});
test("static site has no font network dependency and has a noscript fallback",()=>{
 assert.ok(read("index.html").includes("./ui/future.css"));
 assert.ok(read("index.html").includes("<noscript>"));
 assert.ok(!read("styles.css").includes("fonts.googleapis.com"));
});
test("student selects a grade and sees a dual-pathway dashboard",async()=>{
 const h=app();await h.click({action:"pick-grade",pick:"8"});await h.click({action:"guest"});
 assert.equal(h.hash,"#/grade/8");await h.click({action:"home"});
 assert.match(h.html,/dashboard-hero/);assert.match(h.html,/AI Capacity/);assert.match(h.html,/AI Judgement/);
});
test("instruction is required, and a completed checkpoint survives reload",async()=>{
 const h=app();await h.click({action:"guest"});await h.click({lesson:"6-A1"});
 await h.click({action:"next"});assert.match(h.html,/Stage 1 of 5/);
 await h.click({action:"concept-next"});await h.click({action:"concept-next"});
 h.change({name:"knowledge-choice",value:"0"});await h.click({action:"knowledge-check"});await h.click({action:"next"});
 await h.click({action:"model-reveal"});await h.click({action:"next"});
 assert.match(h.html,/Stage 3 of 5/);
 assert.match(app(h.storage,"#/lesson/6-A1").html,/Stage 3 of 5/);
});
test("all 30 courses still work end-to-end without saving student writing",async()=>{
 const h=app();await h.click({action:"guest"});
 for(const l of DATA.LESSONS)await finish(h,l);
 const stored=JSON.parse(h.storage["aicj-studio-v2"]);
 assert.equal(Object.values(stored.records).filter(v=>v.completed).length,30);
 assert.ok(!JSON.stringify(stored).includes(notes.work));
});
test("comfortable reading preference persists",async()=>{
 const h=app();await h.click({action:"guest"});await h.click({action:"reading"});
 assert.equal(h.reading,"comfortable");
 assert.equal(JSON.parse(h.storage["aicj-studio-v2"]).reading,"comfortable");
});
