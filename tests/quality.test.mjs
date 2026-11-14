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
 await h.click({action:"apply-next"});
 for(const key of ["purpose","decision","evidence"])h.input({dataset:{planField:key},value:notes[key]});
 await h.click({action:"apply-next"});
 for(const key of ["work","revision"])h.input({dataset:{planField:key},value:notes[key]});
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

test("local progress import validates records and does not invent mastery",async()=>{
 const h=app();await h.click({action:"guest"});await h.click({action:"profile"});
 const backup={
   schemaVersion:3,format:"AI-CJ-local-progress",grade:8,
   records:{"8-A1":{knowledgePassed:false,practicePassed:true,modelSeen:false,applied:true,completed:true,lastStage:4,attempts:2}},
   diagnostics:{},legacyDone:{}
 };
 const json=JSON.stringify(backup);
 h.change({id:"import-progress",files:[{size:json.length,text:async()=>json}]});
 await new Promise(resolve=>setImmediate(resolve));
 const stored=JSON.parse(h.storage["aicj-studio-v2"]);
 assert.equal(stored.grade,8);
 assert.equal(stored.records["8-A1"].completed,false,"invalid completed flags are not trusted");
 assert.match(h.html,/progress has been imported/);
});
test("earlier local completion is retained as exploration, not mastery",async()=>{
 const older={name:"Explorer",grade:7,records:{"7-A1":{completed:true}},diagnostics:{},legacyDone:{}};
 const h=app({"aicj-studio-v2":JSON.stringify(older)});
 await h.click({action:"courses"});
 assert.match(h.html,/Previously explored/);
 const stored=JSON.parse(h.storage["aicj-studio-v2"]);
 assert.equal(stored.records["7-A1"].completed,false);
});

test("brand assets, favicons, app icons and social metadata stay in sync",()=>{
 const html=read("index.html");
 const app=read("app.js");
 const manifest=JSON.parse(read("site.webmanifest"));
 const fsPaths=[
   "favicon.svg","assets/brand/mark.svg","assets/brand/mark-transparent.svg",
   "assets/brand/lockup.svg","assets/brand/mask-icon.svg",
   "assets/brand/favicon-16.png","assets/brand/favicon-32.png",
   "assets/brand/apple-touch-icon.png","assets/brand/icon-192.png",
   "assets/brand/icon-512.png","assets/brand/icon-maskable-512.png",
   "assets/brand/social-preview.svg","assets/brand/social-preview.png",
   "ui/identity.css","brand.html","docs/BRAND_SYSTEM.md"
 ];
 for(const name of fsPaths)assert.ok(read(name).length>100,"Missing branding asset: "+name);
 const png=(name,w,h)=>{
   const file=readFileSync(join(root,name));
   assert.equal(file.subarray(1,4).toString(),"PNG");
   assert.equal(file.readUInt32BE(16),w);
   assert.equal(file.readUInt32BE(20),h);
 };
 png("assets/brand/favicon-16.png",16,16);
 png("assets/brand/favicon-32.png",32,32);
 png("assets/brand/apple-touch-icon.png",180,180);
 png("assets/brand/icon-192.png",192,192);
 png("assets/brand/icon-512.png",512,512);
 png("assets/brand/icon-maskable-512.png",512,512);
 png("assets/brand/social-preview.png",1200,630);
 assert.ok(html.includes('rel="manifest"'));
 assert.ok(html.includes('ui/identity.css'));
 assert.ok(html.includes('og:image'));
 assert.ok(app.includes('BRAND_MARK'));
 assert.ok(!app.includes('C<span>×</span>J'));
 for(const icon of manifest.icons)assert.ok(read(icon.src.replace(/^\.\//,"")).length>100);
});
test("accessible core text colour pairings remain above WCAG AA normal-text contrast",()=>{
 const L=hex=>{
   const v=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
   return .2126*v[0]+.7152*v[1]+.0722*v[2];
 };
 const contrast=(a,b)=>{const x=L(a),y=L(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
 const pairs=[
   ["#142339","#FFFFFF"],["#52657B","#F7F9FC"],
   ["#176C69","#E1F5F2"],["#AB473B","#FFF0EA"],
   ["#FFFFFF","#AB473B"],["#69E9D8","#142339"]
 ];
 for(const [a,b] of pairs)assert.ok(contrast(a,b)>=4.5,"Contrast failure "+a+" on "+b);
});

test("new learners see an invitation, not a zero-progress score",async()=>{
 const h=app();
 await h.click({action:"guest"});
 await h.click({action:"home"});
 assert.match(h.html,/Start your first lesson/);
 assert.match(h.html,/progress-orbit--empty/);
 assert.match(h.html,/Start here/);
 assert.doesNotMatch(h.html,/<strong>0<span> \/ 6<\/span><\/strong>/);
 assert.match(h.html,/Progress is practice—not a grade/);
 await h.click({lesson:"6-A1"});
 await h.click({action:"home"});
 assert.match(h.html,/Start your first lesson/,"Opening a lesson is not yet meaningful progress");
 assert.doesNotMatch(h.html,/Resume your lesson/);
});
test("resume appears after meaningful learning, before module completion",async()=>{
 const h=app();
 await h.click({action:"guest"});
 await h.click({lesson:"6-A1"});
 await h.click({action:"concept-next"});
 await h.click({action:"concept-next"});
 h.change({name:"knowledge-choice",value:"0"});
 await h.click({action:"knowledge-check"});
 await h.click({action:"next"});
 await h.click({action:"home"});
 assert.match(h.html,/Resume your lesson/);
 assert.match(h.html,/Keep going/);
 assert.match(h.html,/progress-orbit--empty/);
});
test("completed learning displays real progress and the next-lesson action",async()=>{
 const record={knowledgePassed:true,modelSeen:true,practicePassed:true,applied:true,completed:true,lastStage:4,lastOpenedAt:1000,attempts:1};
 const seed={"aicj-studio-v2":JSON.stringify({name:"Learner",grade:6,track:"all",records:{"6-A1":record},diagnostics:{},legacyDone:{}})};
 const h=app(seed);
 await h.click({action:"home"});
 assert.match(h.html,/Start your next lesson/);
 assert.match(h.html,/1<span> \/ 6<\/span>/);
 assert.doesNotMatch(h.html,/progress-orbit--empty/);
 const all={};for(const l of DATA.LESSONS.filter(l=>l.grade===6))all[l.id]={...record};
 const allDone=app({"aicj-studio-v2":JSON.stringify({name:"Learner",grade:6,track:"all",records:all,diagnostics:{},legacyDone:{}})});
 await allDone.click({action:"home"});
 assert.match(allDone.html,/Revisit a module/);
 assert.match(allDone.html,/6<span> \/ 6<\/span>/);
});
test("hero refinement shortens vertical spacing without harming mobile layout",()=>{
 const css=read("ui/identity.css");
 assert.match(css,/padding-block:clamp\(28px,2\.7vw,42px\)/);
 assert.match(css,/\.dashboard-hero h1\{\s*font-weight:600/);
 assert.match(css,/\.dashboard-path-header h2\{\s*font-weight:600/);
 assert.match(css,/\.dashboard-hero:before\{opacity:\.035\}/);
 assert.match(css,/@media\(max-width:720px\)\{\.dashboard-hero\{padding-block:30px\}\}/);
});
