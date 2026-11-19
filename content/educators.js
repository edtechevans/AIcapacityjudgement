/* AI Capacity × Judgement — educator pathway V4.
 * 4h total: 4 Capacity + 4 Judgement modules, each 30 min.
 * Five instructional stages, six selected-response tasks per module; no writing.
 * Public preview progress is local to this browser, not a competence credential.
 */
(function(){
"use strict";
const DATA=window.EDUCATOR_V4;
if(!DATA){window.renderEducators=()=>'<main id="main-content"><h1 id="main-title">Educator learning</h1><p>Educator course data is unavailable. Please reload the page.</p></main>';return;}
const COURSES=DATA.courses,STAGES=DATA.stages,LABELS=DATA.stageLabels;
const KEY="aicj-educator-progress-v4";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let progress={};try{const p=JSON.parse(localStorage.getItem(KEY)||"{}");progress=p&&typeof p==="object"&&!Array.isArray(p)?p:{}}catch(_){progress={}}
let selected=null;
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch(_){}}
function moduleData(id){for(const course of COURSES)for(let i=0;i<course.modules.length;i++)if(course.modules[i].id===id)return {course,module:course.modules[i],index:i};return null}
function record(id){if(!progress[id]||typeof progress[id]!=="object")progress[id]={stage:0,tasks:{}};if(!progress[id].tasks||typeof progress[id].tasks!=="object")progress[id].tasks={};return progress[id];}
function stageTasks(m,stage){if(stage==="practise")return m.tasks.practice.map((task,i)=>({key:"p"+i,task}));return [{key:stage,task:m.tasks[stage]}];}
function taskRecord(r,key,task){let v=r.tasks[key];if(!v||typeof v!=="object")v=r.tasks[key]={single:null,multi:{},classify:{},order:[],passed:false,attempts:0,feedback:null};if(!v.multi||typeof v.multi!=="object")v.multi={};if(!v.classify||typeof v.classify!=="object")v.classify={};if(!Array.isArray(v.order))v.order=[];if(task.kind==="order"&&v.order.length!==task.steps.length)v.order=task.steps.map((_,i)=>i).reverse();return v}
function stageDone(m,r,stage){return stageTasks(m,stage).every(({key,task})=>taskRecord(r,key,task).passed===true)}
function moduleDone(m,r){return STAGES.every(stage=>stageDone(m,r,stage))}
function canVisit(m,r,i){return STAGES.slice(0,i).every(stage=>stageDone(m,r,stage))}
function completed(c){return c.modules.filter(m=>moduleDone(m,record(m.id))).length}
function moduleCard(c,m,i){const r=record(m.id),done=moduleDone(m,r),count=STAGES.filter(stage=>stageDone(m,r,stage)).length;return '<button type="button" class="educator-module-card" data-educator-open="'+esc(m.id)+'"><span class="educator-number">'+String(i+1).padStart(2,"0")+'</span><span class="educator-module-copy"><strong>'+esc(m.title)+'</strong><small>'+esc(m.focus)+'</small><small class="educator-module-time">30 minutes · '+count+'/5 stages complete</small></span><span class="educator-status">'+(done?"✓ Completed":count?"Continue →":"Start →")+'</span></button>'}
function courseCard(c){const n=completed(c);return '<section class="educator-course-card '+(c.id==="judgement"?"educator-judgement":"educator-capacity")+'"><div class="eyebrow">'+(c.id==="capacity"?"Pathway 01":"Pathway 02")+' · 2 hours</div><h2>'+esc(c.title)+'</h2><p>'+esc(c.subtitle)+'</p><div class="educator-course-progress"><span>'+n+' of 4 modules complete</span><div class="educator-meter" role="progressbar" aria-label="'+esc(c.title)+' completion" aria-valuemin="0" aria-valuemax="4" aria-valuenow="'+n+'"><span style="width:'+(n/4*100)+'%"></span></div></div><div class="educator-module-list">'+c.modules.map((m,i)=>moduleCard(c,m,i)).join("")+'</div></section>'}
function overview(){const total=COURSES.reduce((n,c)=>n+completed(c),0);return '<main id="main-content" class="page max section educator-page"><div class="eyebrow">Professional learning · Capacity × Judgement</div><h1 id="main-title" tabindex="-1">Educator learning</h1><p class="educator-lead">Four hours. Eight focused modules. Two equally important questions: <strong>What can AI help us do?</strong> And <strong>when does doing so improve learning?</strong></p><div class="educator-pathway-summary"><span>8 modules</span><span>30 minutes each</span><span>4 hours total</span><span>No written responses</span></div><p class="educator-philosophy">Grounded in AISG’s <strong>Engagement for All</strong> and Transformative Learning Framework, the pathway uses authentic decisions, inclusive design and evidence-informed practice. The framework is a lens for learning—not a checklist.</p><div class="educator-course-grid">'+COURSES.map(courseCard).join("")+'</div><section class="educator-finish"><h2>Your pathway</h2><p>Each module moves through Learn → Model → Practise → Apply → Transfer. Knowledge checks use choice, classification and accessible sequencing, with feedback and opportunities to retry.</p><strong>'+total+' / 8 modules completed</strong><p class="small muted">Completion records successful formative checkpoints, not validated professional competence. This public preview stores progress only in this browser, with no staff reporting or authenticated access. Earlier pilot completions are not transferred because the course content has changed.</p></section></main>'}
function taskReady(task,v){
 if(task.kind==="single")return Number.isInteger(v.single)&&v.single>=0&&v.single<task.options.length;
 if(task.kind==="multi")return task.options.some((_,i)=>v.multi[i]===true);
 if(task.kind==="classify")return task.items.every((_,i)=>Number.isInteger(v.classify[i]));
 if(task.kind==="order")return v.order.length===task.steps.length;
 return false;
}
function taskPassed(task,v){
 if(task.kind==="single")return task.options[v.single]?.[1]===1;
 if(task.kind==="multi")return task.options.every((o,i)=>(v.multi[i]===true)===(o[1]===1));
 if(task.kind==="classify")return task.items.every((o,i)=>v.classify[i]===o[1]);
 if(task.kind==="order")return task.steps.every((_,i)=>v.order[i]===i);
 return false;
}
function taskFeedback(task,v){
 const details=[];
 if(task.kind==="single"&&v.single!==null)details.push(task.options[v.single]?.[2]||"Consider the target learning and evidence.");
 if(task.kind==="multi")task.options.forEach((o,i)=>{if((v.multi[i]===true)!==(o[1]===1))details.push(o[2]);});
 if(task.kind==="classify")task.items.forEach((o,i)=>{if(v.classify[i]!==o[1])details.push("Item "+(i+1)+": "+o[2]);});
 if(task.kind==="order"&&!taskPassed(task,v))details.push("Consider which decisions and safeguards must come before action, and how evidence will be reviewed afterwards.");
 return details;
}
function taskHtml(task,key,r,index){
 const v=taskRecord(r,key,task),id="edu-"+key;
 let body="";
 if(task.kind==="single")body='<div class="educator-choices" role="group" aria-label="Choose the strongest response">'+task.options.map((o,i)=>'<button type="button" class="educator-choice '+(v.single===i?"selected":"")+'" aria-pressed="'+(v.single===i)+'" data-edu-single="'+i+'" data-edu-task="'+key+'">'+String.fromCharCode(65+i)+'. '+esc(o[0])+'</button>').join("")+'</div>';
 if(task.kind==="multi")body='<div class="v2-multi-list educator-multi-list">'+task.options.map((o,i)=>'<label class="v2-multi-option"><input type="checkbox" data-edu-multi="'+i+'" data-edu-task="'+key+'" '+(v.multi[i]?"checked":"")+'><span>'+esc(o[0])+'</span></label>').join("")+'</div><p class="small muted">Select all the defensible responses.</p>';
 if(task.kind==="classify")body='<div class="sort-list">'+task.items.map((o,i)=>'<div class="sort-item"><div class="item-number">'+(i+1)+'</div><div class="sort-question"><p id="'+id+'-label-'+i+'">'+esc(o[0])+'</p><select aria-labelledby="'+id+'-label-'+i+'" data-edu-classify="'+i+'" data-edu-task="'+key+'"><option value="">Choose a category…</option>'+task.categories.map((c,n)=>'<option value="'+n+'" '+(v.classify[i]===n?"selected":"")+'>'+esc(c)+'</option>').join("")+'</select></div></div>').join("")+'</div>';
 if(task.kind==="order")body='<p class="small muted">Use the arrow buttons to place the steps in order. Dragging is not needed.</p><ol class="sequence-list">'+v.order.map((pos,i)=>'<li class="sequence-item"><span class="sequence-number">'+(i+1)+'</span><span class="sequence-text">'+esc(task.steps[pos])+'</span><div class="move-actions"><button type="button" class="move-btn" data-edu-move="'+i+'" data-dir="-1" data-edu-task="'+key+'" '+(i===0?"disabled":"")+' aria-label="Move '+esc(task.steps[pos])+' up">↑</button><button type="button" class="move-btn" data-edu-move="'+i+'" data-dir="1" data-edu-task="'+key+'" '+(i===v.order.length-1?"disabled":"")+' aria-label="Move '+esc(task.steps[pos])+' down">↓</button></div></li>').join("")+'</ol>';
 const fb=v.feedback?'<div class="educator-feedback '+(v.feedback.passed?"feedback-good":"feedback-retry")+'" role="status" aria-live="polite"><strong>'+(v.feedback.passed?"Understanding checked":"Review and try again")+'</strong><p>'+esc(v.feedback.passed?(task.takeaway||"Your decision reflects the learning principle."):(v.feedback.details?.[0]||"Reconsider the evidence and trade-offs."))+'</p>'+(v.feedback.passed?"":v.feedback.details?.length>1?'<ul>'+v.feedback.details.slice(1).map(d=>'<li>'+esc(d)+'</li>').join("")+'</ul>':"")+'</div>':"";
 return '<section class="educator-check" aria-labelledby="'+id+'-title"><div class="eyebrow">Decision '+index+'</div><h3 id="'+id+'-title">'+esc(task.prompt)+'</h3>'+body+fb+'<button type="button" class="btn btn-small educator-check-button" data-edu-check="'+key+'" '+(!taskReady(task,v)?"disabled":"")+'>'+(v.passed?"Check again":"Check decision")+' →</button></section>';
}
function contentHtml(m,r,stage){
 if(stage==="learn")return '<p class="educator-stage-intro">Build the conceptual foundation. Identify what AI makes possible—and the judgement needed before acting on it.</p><div class="educator-ideas">'+m.ideas.map((idea,i)=>'<article class="educator-idea"><span class="educator-idea-num">0'+(i+1)+'</span><h3>'+esc(idea[0])+'</h3><p>'+esc(idea[1])+'</p></article>').join("")+'</div>'+taskHtml(m.tasks.learn,"learn",r,1);
 if(stage==="model")return '<p class="educator-stage-intro">Compare two approaches before making your own decision. Look for what remains with the learner and what deserves evidence.</p><div class="educator-case"><strong>Professional situation</strong><p>'+esc(m.model.scenario)+'</p></div><div class="educator-example-grid"><div class="educator-example weaker"><strong>Weaker approach</strong><p>'+esc(m.model.weak)+'</p></div><div class="educator-example stronger"><strong>Stronger approach</strong><p>'+esc(m.model.strong)+'</p></div></div><p class="educator-rationale"><strong>Why it matters:</strong> '+esc(m.model.why)+'</p>'+taskHtml(m.tasks.model,"model",r,1);
 if(stage==="practise")return '<p class="educator-stage-intro">Two complementary challenges. Examine the trade-offs, then test the principle using a different decision format.</p>'+m.tasks.practice.map((t,i)=>taskHtml(t,"p"+i,r,i+1)).join("");
 if(stage==="apply")return '<p class="educator-stage-intro">Use the principle to make a defensible decision in a realistic educational setting, including safeguards and likely consequences.</p>'+taskHtml(m.tasks.apply,"apply",r,1);
 return '<p class="educator-stage-intro">Transfer the principle to an unfamiliar subject or school context. A strong decision still protects purpose, evidence and learner agency.</p>'+taskHtml(m.tasks.transfer,"transfer",r,1);
}
function moduleView(){
 const match=moduleData(selected);if(!match)return overview();
 const {module:m,course:c,index}=match,r=record(m.id);let stageIndex=Number.isInteger(r.stage)?r.stage:0;stageIndex=Math.max(0,Math.min(STAGES.length-1,stageIndex));if(!canVisit(m,r,stageIndex))stageIndex=STAGES.findIndex(s=>!stageDone(m,r,s));if(stageIndex<0)stageIndex=4;r.stage=stageIndex;
 const stage=STAGES[stageIndex],done=stageDone(m,r,stage),finished=moduleDone(m,r),next=STAGES[stageIndex+1],nextModule=c.modules[index+1];
 const nav=STAGES.map((s,i)=>{const completed=stageDone(m,r,s),enabled=canVisit(m,r,i);return '<button type="button" class="educator-stage-pill '+(i===stageIndex?"current":"")+' '+(completed?"done":"")+'" data-edu-stage="'+i+'" '+(enabled?"":"disabled")+' aria-current="'+(i===stageIndex?"step":"false")+'"><span>'+String(i+1).padStart(2,"0")+'</span>'+LABELS[i]+(completed?' <span aria-label="completed">✓</span>':"")+'</button>'}).join("");
 return '<main id="main-content" class="page max section educator-page"><button type="button" class="back" data-educator-back="1">← All educator modules</button><div class="eyebrow">'+esc(c.title)+' · Module '+(index+1)+' of 4 · 30 minutes</div><h1 id="main-title" tabindex="-1">'+esc(m.title)+'</h1><p class="educator-question">'+esc(m.question)+'</p><div class="educator-intro"><strong>Learning focus</strong><p>'+esc(m.focus)+'</p></div><nav class="educator-stages" aria-label="Module learning stages">'+nav+'</nav><section class="educator-task educator-stage-body"><div class="eyebrow">'+String(stageIndex+1).padStart(2,"0")+' · '+LABELS[stageIndex]+'</div><h2>'+({learn:"Understand the idea",model:"Compare the choices",practise:"Practise professional decisions",apply:"Apply to a real teaching challenge",transfer:"Use it in a new context"}[stage])+'</h2>'+contentHtml(m,r,stage)+'</section>'+
 (done&&next?'<div class="educator-stage-next"><p>Stage complete. Continue when ready.</p><button type="button" class="btn" data-edu-next="1">Continue to '+LABELS[stageIndex+1]+' →</button></div>':"")+
 (finished?'<section class="educator-finish" role="status"><strong>✓ Module completed</strong><p>You completed all five formative stages. This records practice and decisions, not certified mastery.</p>'+(nextModule?'<button type="button" class="btn btn-small" data-educator-open="'+esc(nextModule.id)+'">Next module →</button>':'<button type="button" class="btn btn-small" data-educator-back="1">View both pathways →</button>')+'</section>':"")+
 (stage==="transfer"&&!finished?'<p class="small muted">A module is complete after its Learn, Model, Practise, Apply and Transfer checks have all been successfully completed.</p>':"")+
 '</main>';
}
function rerender(selector){if(typeof window.refreshEducators==="function")window.refreshEducators();if(selector){const target=document.querySelector(selector);if(target&&typeof target.focus==="function")try{target.focus({preventScroll:true})}catch(_){target.focus()}}}
function attempt(key){
 if(!selected)return;const match=moduleData(selected);if(!match)return;
 const {module:m}=match,r=record(selected),stage=STAGES[r.stage]||"learn";
 const entry=stageTasks(m,stage).find(x=>x.key===key);if(!entry)return;
 const v=taskRecord(r,key,entry.task);if(!taskReady(entry.task,v))return;
 const passed=taskPassed(entry.task,v),details=passed?[]:taskFeedback(entry.task,v);
 v.attempts=(v.attempts||0)+1;v.passed=passed;v.feedback={passed,details};save();rerender('[data-edu-check="'+key+'"]');
}
function resetAnswer(key){const r=record(selected);if(r.tasks[key]){r.tasks[key].passed=false;r.tasks[key].feedback=null}}
window.renderEducators=function(){return selected?moduleView():overview()};
window.educatorOpenOverview=function(){selected=null};
document.addEventListener("click",function(e){
 const t=e.target.closest("[data-educator-open],[data-educator-back],[data-edu-stage],[data-edu-next],[data-edu-single],[data-edu-check],[data-edu-move]");if(!t)return;
 e.preventDefault();
 if(t.dataset.educatorBack!==undefined){selected=null;save();rerender('[data-educator-open]');return;}
 if(t.dataset.educatorOpen){selected=t.dataset.educatorOpen;save();rerender("#main-title");return;}
 if(!selected)return;const match=moduleData(selected);if(!match)return;
 const {module:m}=match,r=record(selected);
 if(t.dataset.eduStage!==undefined){const n=Number(t.dataset.eduStage);if(Number.isInteger(n)&&n>=0&&n<5&&canVisit(m,r,n)){r.stage=n;save();rerender("#main-title")}return;}
 if(t.dataset.eduNext!==undefined){const next=r.stage+1;if(next<5&&stageDone(m,r,STAGES[r.stage])){r.stage=next;save();rerender("#main-title")}return;}
 if(t.dataset.eduCheck!==undefined){attempt(t.dataset.eduCheck);return;}
 const key=t.dataset.eduTask;if(!key)return;const stage=STAGES[r.stage],entry=stageTasks(m,stage).find(x=>x.key===key);if(!entry)return;const v=taskRecord(r,key,entry.task);
 if(t.dataset.eduSingle!==undefined){v.single=+t.dataset.eduSingle;resetAnswer(key);save();rerender('[data-edu-single="'+t.dataset.eduSingle+'"][data-edu-task="'+key+'"]');return;}
 if(t.dataset.eduMove!==undefined){const i=+t.dataset.eduMove,j=i+(+t.dataset.dir);if(j>=0&&j<v.order.length){const q=v.order[i];v.order[i]=v.order[j];v.order[j]=q;resetAnswer(key);save();rerender('[data-edu-move="'+Math.max(0,Math.min(v.order.length-1,j))+'"][data-dir="'+t.dataset.dir+'"][data-edu-task="'+key+'"]')}return;}
});
document.addEventListener("change",function(e){
 const t=e.target;if(!selected)return;
 const key=t.dataset?.eduTask;if(!key)return;const match=moduleData(selected);if(!match)return;const r=record(selected);
 const entry=stageTasks(match.module,STAGES[r.stage]).find(x=>x.key===key);if(!entry)return;const v=taskRecord(r,key,entry.task);
 if(t.dataset.eduMulti!==undefined){v.multi[+t.dataset.eduMulti]=!!t.checked;resetAnswer(key);save();rerender('[data-edu-multi="'+t.dataset.eduMulti+'"][data-edu-task="'+key+'"]');return;}
 if(t.dataset.eduClassify!==undefined){if(t.value==="")delete v.classify[+t.dataset.eduClassify];else v.classify[+t.dataset.eduClassify]=+t.value;resetAnswer(key);save();rerender('[data-edu-classify="'+t.dataset.eduClassify+'"][data-edu-task="'+key+'"]');return;}
});
})();