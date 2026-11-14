/* AI Capacity x Judgement — student learning studio v2.
 * Static-first formative learning. No student accounts or server-side gradebook.
 * Local storage contains only an optional display alias, selections and progress.
 * Free-text learning responses remain in memory and are not saved or transmitted.
 */
(function(){
"use strict";
const KEY="aicj-studio-v2";
const OLD_KEY="aicj-studio-v1";
const $=(selector)=>document.querySelector(selector);
const STORAGE_SCHEMA=3;
const esc=(value)=>String(value??"").replace(/[&<>"']/g,(c)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function saved(key){try{return JSON.parse(localStorage.getItem(key))||{}}catch(_){return {}}}
const legacy=saved(OLD_KEY);
const previously=saved(KEY);
const defaults={name:"",grade:6,gradeChosen:false,track:"all",records:{},diagnostics:{},legacyDone:legacy.done||{},reading:"standard",page:"welcome",lessonId:""};
const state=Object.assign({},defaults,previously);
// Existing learners keep their previously selected grade.
state.gradeChosen=typeof previously.gradeChosen==="boolean"?previously.gradeChosen:!!previously.name;
state.records=state.records||{};
state.diagnostics=state.diagnostics||{};
state.legacyDone=state.legacyDone||{};
// Preserve prior activity as exploration, not as a claim of completing a deeper course.
let migratedLegacy=false;
Object.entries(state.records).forEach(([id,r])=>{if(r&&r.completed&&!r.knowledgePassed){state.legacyDone[id]=true;r.completed=false;r.reflected=false;migratedLegacy=true;}});
state.grade=Object.prototype.hasOwnProperty.call(GRADES,String(state.grade))?+state.grade:+Object.keys(GRADES)[0];
state.track=["all","capacity","judgement"].includes(state.track)?state.track:"all";
state.reading=["standard","comfortable"].includes(state.reading)?state.reading:"standard";
state.page=state.gradeChosen?"home":"welcome";
let practice={};
let diagnosticRun=null;
let notice="";
let confirmClear=false;
let pendingSharedLesson="";
function showNotice(message){notice=message;const el=$("#global-announcer");if(el){el.textContent=message;el.classList?.add("is-visible");}}
function persist(){try{const data={schemaVersion:STORAGE_SCHEMA,name:state.name,grade:state.grade,gradeChosen:state.gradeChosen,track:state.track,reading:state.reading,records:state.records,diagnostics:state.diagnostics,legacyDone:state.legacyDone};localStorage.setItem(KEY,JSON.stringify(data))}catch(_){notice="Progress cannot be saved in this browser. Avoid private or restricted browsing modes.";}}
if(migratedLegacy)persist();
function count(grade){const a=LESSONS.filter(l=>l.grade===+grade);return {done:a.filter(l=>state.records[l.id]?.completed).length,total:a.length}}
function summary(grade){const k=count(grade);return Math.round(k.done/k.total*100)}
function currentLesson(){return LESSON_BY_ID[state.lessonId]}
function getRecord(id){if(!state.records[id])state.records[id]={attempts:0,practicePassed:false,reflected:false,completed:false,lastStage:0};return state.records[id]}
function stageName(record){if(!record)return "Not started";if(record.completed)return "Completed";if(record.applied)return "Ready to reflect";if(record.practicePassed)return "Ready to apply";if(record.knowledgePassed&&record.modelSeen)return "Practising";if(record.knowledgePassed)return "Exploring examples";if(record.lastOpenedAt)return "Ready to begin";return "Not started";}
function hasLearningCheckpoint(record){return !!(record&&(record.knowledgePassed||record.modelSeen||record.practicePassed||(record.lastStage||0)>=1));}
function resumeLesson(grade){return LESSONS.filter(l=>{const record=state.records[l.id];return l.grade===+grade&&record&&!record.completed&&hasLearningCheckpoint(record);}).sort((a,b)=>(state.records[b.id].lastOpenedAt||0)-(state.records[a.id].lastOpenedAt||0))[0]||null;}
function checkpoint(id,stage){const record=getRecord(id);record.lastStage=Math.max(record.lastStage||0,stage);record.lastOpenedAt=Date.now();persist();}
function gradeLane(grade,track){const n=pathInfo(grade,track);const pct=Math.round(n.done/n.total*100);return '<div class="lane lane-'+track+'"><div class="lane-top"><span>'+trackLabel(track)+'</span><strong>'+n.done+' / '+n.total+'</strong></div>'+progressBar(pct,trackLabel(track)+' modules practised')+'</div>';}
function getPractice(id){if(!practice[id]){const act=ACTIVITIES[id];const r=state.records[id]||{};const maxStage=r.completed||r.applied?4:r.practicePassed?3:r.knowledgePassed?(r.modelSeen?2:1):0;const savedStage=Number.isInteger(r.lastStage)?r.lastStage:0;practice[id]={stage:Math.max(0,Math.min(savedStage,maxStage)),selected:null,sort:{},order:act&&act.kind==="sequence"?act.start.slice():[],checked:false,feedback:null,reflection:"",topicIndex:r.knowledgePassed?2:0,maxTopic:r.knowledgePassed?2:0,knowledgeAnswer:null,knowledgeFeedback:null,modelSeen:!!r.modelSeen,reason:"",coachMode:"independent",labMode:null,labModesSeen:[],labTuning:{},labObservation:"",seniorMilestones:{},knowledgeMisses:0,context:0,format:"written",fields:{purpose:"",decision:"",evidence:"",work:"",revision:""},applyStep:0,confirmed:false,notesDirty:false,modelPrediction:"",reflectionMode:"written",reflection:{learning:"",transfer:""},reflectionConfirmed:false};}return practice[id]}
function pathInfo(grade,track){const a=LESSONS.filter(l=>l.grade===+grade && l.track===track);return {done:a.filter(l=>state.records[l.id]?.completed).length,total:a.length}}
function score(grade){const d=state.diagnostics[grade];if(!d||!d.completed)return null;const correct={};d.answers.forEach((answer,i)=>{correct[DIAGNOSTICS[grade][i][0]]=answer===DIAGNOSTICS[grade][i][3]});const cap=["A1","A2","A3"].filter(s=>correct[s]).length;const jud=["B1","B2","B3"].filter(s=>correct[s]).length;return {correct,capacity:cap,judgement:jud};}
function recs(grade){const s=score(grade);return ["capacity","judgement"].map(track=>{
 const options=LESSONS.filter(l=>l.grade===grade && l.track===track).map(l=>{
 const r=state.records[l.id];const tried=r?.practicePassed;const done=r?.completed;
 const needs=s?!s.correct[l.strand]:true;
 const needsSupport=(r?.attempts||0)>=2&&!tried;
 const priority=(done?10:0)+(tried?3:0)+(needs?0:1)-(needsSupport?2:0);
 return {lesson:l,priority,reason:done?"Revisit to apply your learning in a new context":needsSupport?"Return to this lesson with a different support choice. Earlier attempts are information, not a grade.":s?(needs?"Your starting snapshot suggests practice here could help.":"Build on what you already noticed in your starting snapshot."):"A useful starting point in this pathway."};
 }).sort((a,b)=>a.priority-b.priority);
 return options[0];
});}
function pickNext(grade,track="all"){const options=recs(grade).filter(x=>track==="all"||x.lesson.track===track);const incomplete=options.filter(x=>!state.records[x.lesson.id]?.completed);if(!incomplete.length)return options[0];return incomplete.sort((a,b)=>{const da=pathInfo(grade,a.lesson.track).done,db=pathInfo(grade,b.lesson.track).done;if(da!==db)return da-db;const s=score(grade);if(s){const sa=a.lesson.track==="capacity"?s.capacity:s.judgement,sb=b.lesson.track==="capacity"?s.capacity:s.judgement;return sa-sb;}return 0;})[0];}
const progressBar=(percent,label="Modules practised")=>'<div class="progress-line" role="progressbar" aria-label="'+esc(label)+'" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:'+percent+'%"></div></div>';
function trackLabel(track){return track==="capacity"?"AI Capacity":"AI Judgement"}
const BRAND_MARK='<img src="./assets/brand/mark.svg" alt="" class="brand-emblem" width="48" height="48" decoding="async">';
function mobileMenu(){
 const item=(action,label)=>'<button type="button" data-action="'+action+'" '+(state.page===action?'aria-current="page"':'')+'>'+label+'</button>';
 return '<details class="mobile-menu"><summary aria-label="Open navigation menu">☰</summary><nav class="mobile-menu-links" aria-label="Mobile navigation">'+
 item("home","Home")+item("courses","My courses")+item("snapshot","My learning")+item("about","The idea")+item("profile","My profile")+
 '<button type="button" data-action="reading" aria-pressed="'+(state.reading==="comfortable")+'">'+(state.reading==="comfortable"?"Standard reading size":"Larger reading size")+'</button></nav></details>';
}
function nav(){const comfort='<button class="comfort-toggle" data-action="reading" aria-pressed="'+(state.reading==="comfortable")+'" title="Toggle comfortable reading size" aria-label="'+(state.reading==="comfortable"?"Use standard text size":"Use larger text for reading")+'">Aa</button>';const item=(page,label)=>'<button class="navlink '+(state.page===page?"active":"")+'" data-action="'+page+'" '+(state.page===page?'aria-current="page"':'')+'>'+label+'</button>';return '<header class="topbar"><a href="'+(state.gradeChosen?"#/home":"#/welcome")+'" class="brand" data-action="'+(state.gradeChosen?"home":"enter")+'">'+BRAND_MARK+'<span class="brand-wordmark"><strong>AI Capacity <i>×</i> Judgement</strong><small>Learning Studio</small></span><span class="brand-wordmark-short">AI C<span>×</span>J</span><span class="sr-only">Home</span></a><nav class="top-actions" aria-label="Primary navigation">'+(state.gradeChosen?item("home","Home")+item("courses","My courses")+item("snapshot","My learning")+item("about","The idea")+comfort+'<button class="avatar" data-action="profile" aria-label="Open learner profile">'+esc(state.name[0]||"L").toUpperCase()+'</button>':'<button class="btn btn-small" data-action="enter">Choose grade →</button>')+'</nav>'+(state.gradeChosen?mobileMenu():"")+'</header>';}
function foot(){return '<footer class="footer"><div class="row">'+BRAND_MARK+'<span class="footer-signature"><strong>AI Capacity × Judgement</strong><small>Growing capacity. Practising judgement.</small></span></div><span class="license">© 2026 Tim Evans · CC BY-NC-SA 4.0</span></footer>';}
function linkLesson(l,why){const record=state.records[l.id]||{},started=hasLearningCheckpoint(record),previously=!!state.legacyDone[l.id]&&!record.completed&&!started,stage=previously?"Previously explored":stageName(record),st=STRANDS.find(s=>s.id===l.strand),action=record.completed?"Revisit":started?"Continue":"Explore";return '<button type="button" class="lesson-card track-'+l.track+'" data-lesson="'+l.id+'"><div class="lesson-tag"><span>'+esc(st.id)+' · '+esc(st.name)+'</span><span class="lesson-status '+(record.completed?"complete":previously?"legacy":started?"in-progress":"")+'">'+(record.completed?"✓ ":"")+stage+'</span></div><h3>'+esc(l.title)+'</h3><p>'+esc(l.objective)+'</p>'+(why?'<p class="recommend-reason">'+esc(why)+'</p>':"")+'<div class="end"><span>'+trackLabel(l.track)+'</span><span aria-hidden="true">'+action+' module ↗</span></div></button>';}

function seniorStudioBanner(){
 if(state.grade<11)return "";
 const final=state.grade===12,project=final?"12-A3":"11-A3";
 const stages=final?["Define the need","Investigate alternatives","Prototype and test","Revise from evidence","Defend impact"]:["Frame the research","Evaluate evidence","Design a response","Test and revise","Defend conclusions"];
 const record=state.records[project]||{},label=record.completed?"Revisit your project":record.knowledgePassed?"Continue your investigation":"Begin your independent project";
 return '<section class="senior-studio" aria-label="Diploma inquiry and design studio">'+
 '<div class="senior-studio-heading"><div><div class="eyebrow">DIPLOMA PROGRAMME · DP'+(state.grade-10)+' · GRADE '+state.grade+'</div>'+
 '<h2>'+esc(GRADES[state.grade].headline)+': your inquiry studio</h2>'+
 '<p>'+esc(GRADES[state.grade].subtitle)+' Investigate independently, make defensible choices and gather evidence of genuine work.</p></div>'+
 '<button class="btn btn-outline" data-lesson="'+project+'">'+label+' →</button></div>'+
 '<div class="senior-milestone-strip" aria-label="Suggested inquiry stages">'+stages.map((name,i)=>'<span class="senior-milestone-chip"><small>'+(i+1)+'</small>'+esc(name)+'</span>').join("")+'</div>'+
 '<details class="senior-bridge"><summary>New to AI Capacity × Judgement? Start with the foundations</summary>'+
 '<p>You do not need to complete earlier grades. Begin by considering how AI can fail, how claims are verified and when human judgement or non-use matters. The six-question check-in can suggest where to focus, while lessons offer hints and offline alternatives.</p>'+
 '<button class="btn btn-outline btn-small" data-action="diagnostic">Try the Grade '+state.grade+' starting snapshot →</button></details>'+
 '<p class="small muted">An interdisciplinary learning resource, not an IB-endorsed course or credential. Authentic project evidence requires educator and stakeholder review.</p></section>';
}
function seniorPortfolioHtml(l,w){
 if(l.grade<11||!CAPSTONE_GUIDES[l.id])return "";
 const guide=CAPSTONE_GUIDES[l.id],checks=w.seniorMilestones||{},total=guide.phases.length,marked=guide.phases.filter((x,i)=>checks[i]).length;
 return '<section class="senior-portfolio" aria-label="Independent evidence portfolio">'+
 '<div class="eyebrow">Studio portfolio · Milestone evidence</div><h3>Build a defensible record</h3>'+
 '<p>Mark a phase when you have work a teacher or stakeholder can review. These private planning reminders are <strong>not assessed mastery</strong>. They can be exported with your notes.</p>'+
 '<p class="senior-portfolio-progress" role="status">'+marked+' of '+total+' planning milestones marked · human review still required</p>'+
 '<div class="senior-portfolio-checklist">'+guide.phases.map((phase,i)=>'<label class="senior-portfolio-check"><input type="checkbox" data-senior-milestone="'+i+'" '+(checks[i]?"checked":"")+'><span><strong>Phase '+(i+1)+'</strong>'+esc(phase)+'</span></label>').join("")+'</div>'+
 '<p class="small muted">Keep real work and stakeholder feedback in approved school storage, not this public preview.</p></section>';
}
function home(){
 const g=GRADES[state.grade],n=count(state.grade),pct=summary(state.grade),resume=resumeLesson(state.grade),suggest=pickNext(state.grade);
 const chosen=resume||suggest.lesson,record=state.records[chosen.id]||{},taken=score(state.grade),review=!!record.completed;
 const actionLabel=review?"Revisit a module":resume?"Resume your lesson":n.done===0?"Start your first lesson":"Start your next lesson";
 const nextStatus=review?"Ready to revisit":resume?stageName(record):"Ready to explore";
 const progressDisplay=n.done===0?
  '<div class="progress-orbit progress-orbit--empty"><div class="orbit-inner"><span class="orbit-start-icon" aria-hidden="true">↗</span><span class="orbit-start-text">'+(resume?"Keep going":"Start here")+'</span></div></div>':
  '<div class="progress-orbit" style="--progress:'+pct+'%"><div class="orbit-inner"><strong>'+n.done+'<span> / '+n.total+'</span></strong><small>Modules<br>practised</small></div></div>';
 return '<main id="main-content" class="page dashboard-home">'+
 '<section class="dashboard-hero max"><div class="dashboard-copy"><div class="eyebrow">Your learning studio · Grade '+state.grade+'</div>'+
 '<h1 id="main-title" tabindex="-1">Build your <em>capacity.</em><br>Sharpen your <em>judgement.</em></h1>'+
 '<p class="hero-lead">Learn what AI can do, when it helps, and how to use it thoughtfully in real situations.</p>'+
 '<div class="hero-buttons"><button class="btn" data-lesson="'+chosen.id+'">'+actionLabel+' →</button><button class="btn btn-outline" data-action="courses">All Grade '+state.grade+' modules</button></div>'+
 '</div><a class="dashboard-meter dashboard-meter--action" href="#/lesson/'+chosen.id+'" data-lesson="'+chosen.id+'"><span class="sr-only">'+esc(actionLabel+": "+chosen.title)+'. </span><div class="eyebrow">YOUR JOURNEY</div>'+
 progressDisplay+
 '<p>Progress is practice—not a grade.</p><span class="dashboard-meter-action">'+(resume?'Continue learning':review?'Review the module':'Open the lesson')+' <span aria-hidden="true">↗</span></span></a></section>'+
 seniorStudioBanner()+'<section class="dashboard-main max" aria-label="Your next steps"><div class="dashboard-path-header"><div><div class="eyebrow">Keep moving forward</div><h2>One meaningful step at a time.</h2></div><div class="dashboard-switch dashboard-grade-locked"><span>Learning in</span><strong>Grade '+state.grade+'</strong></div></div>'+
 '<div class="dashboard-next-grid"><article class="dashboard-next-card"><span class="eyebrow">'+(resume?"Continue your learning":review?"Revisit and transfer":"Suggested next module")+' · '+trackLabel(chosen.track)+'</span>'+
 '<div class="next-stage-indicator"><span class="pulse-dot" aria-hidden="true"></span>'+esc(nextStatus)+'</div>'+
 '<h3>'+esc(chosen.title)+'</h3><p>'+esc(chosen.objective)+'</p>'+
 '<button class="btn" data-lesson="'+chosen.id+'">'+actionLabel+' →</button></article>'+
 '<article class="dashboard-snapshot-card"><span class="eyebrow">Your decisions, your direction</span>'+
 '<h3>'+(taken?"Explore your starting evidence":"Find a useful starting point")+'</h3>'+
 '<p>'+(taken?"See where practising Capacity and Judgement may help. This isn't a permanent label.":"Six low-stakes questions can suggest next steps in Capacity and Judgement. No grades or labels.")+'</p>'+
 '<button class="btn btn-outline" data-action="'+(taken?"snapshot":"diagnostic")+'">'+(taken?"View my learning snapshot":"Try a short check-in")+' →</button></article></div>'+
 '<div class="dashboard-path-header pathway-heading"><div><div class="eyebrow">Two connected pathways</div><h2>Develop both, in different ways.</h2></div><button class="btn btn-text" data-action="about">How it works ↗</button></div>'+
 '<div class="dashboard-lanes"><button class="dashboard-lane capacity-lane" data-action="track" data-track="capacity"><span class="lane-tag">PATHWAY 01 <span aria-hidden="true">◇</span></span><h3>AI Capacity</h3><p>Understand, work with and create using AI.</p>'+gradeLane(state.grade,"capacity")+'<span class="lane-link">Explore Capacity →</span></button>'+
 '<button class="dashboard-lane judgement-lane" data-action="track" data-track="judgement"><span class="lane-tag">PATHWAY 02 <span aria-hidden="true">✳</span></span><h3>AI Judgement</h3><p>Question, evaluate and decide when AI belongs.</p>'+gradeLane(state.grade,"judgement")+'<span class="lane-link">Explore Judgement →</span></button></div></section>'+
 '<section class="dashboard-footer-note max"><p><strong>Learning is more than completion.</strong> Use what you discover in your subjects, create something worthwhile, and ask whose feedback could help you improve.</p></section></main>';
}
function trackCards(){return '<div class="track-grid">'+Object.entries(TRACKS).map(([track,t])=>'<div class="track-card '+t.color+'"><div class="track-label">Pathway '+(track==="capacity"?"01":"02")+'</div><h2>'+esc(t.name)+'</h2><p>'+esc(t.tagline)+'</p><button class="btn btn-small" data-action="track" data-track="'+track+'">Explore '+(track==="capacity"?"capacity":"judgement")+' →</button></div>').join("")+'</div>';}
function courses(){const g=GRADES[state.grade],k=count(state.grade),s=score(state.grade),resuming=resumeLesson(state.grade),best=resuming&&(state.track==="all"||state.track===resuming.track)?{lesson:resuming,reason:"Resume from your most recent learning stage."}:pickNext(state.grade,state.track),review=!!state.records[best.lesson.id]?.completed,isResuming=!!(resuming&&best.lesson.id===resuming.id),all=LESSONS.filter(l=>l.grade===state.grade&&(state.track==="all"||l.track===state.track)),total=LESSONS.filter(l=>l.grade===state.grade).length;return '<main id="main-content" class="course-page max page"><section class="course-intro"><div class="course-heading-row"><div><div class="eyebrow">My courses · '+(state.grade>=11?'DP'+(state.grade-10):'MYP '+(state.grade-5))+'</div><h1 id="main-title" tabindex="-1" class="course-title">Grade '+state.grade+': '+esc(g.headline)+'</h1><p>'+esc(g.focus)+'</p></div><div class="course-progress"><strong>'+k.done+' <small>/ '+total+'</small></strong><span>Modules practised</span>'+progressBar(summary(state.grade))+'</div></div><div class="course-grade-scope"><span aria-hidden="true">◈</span> Grade '+state.grade+' learning · Your six modules</div></section>'+seniorStudioBanner()+'<nav class="course-switcher" aria-label="Module pathways">'+[["all","All modules",total],["capacity","AI Capacity",LESSONS.filter(l=>l.grade===state.grade&&l.track==="capacity").length],["judgement","AI Judgement",LESSONS.filter(l=>l.grade===state.grade&&l.track==="judgement").length]].map(x=>'<button data-action="track" data-track="'+x[0]+'" class="course-filter '+(state.track===x[0]?"selected":"")+'" aria-pressed="'+(state.track===x[0])+'">'+x[1]+' <span>'+x[2]+'</span></button>').join("")+'</nav><section class="course-featured" aria-labelledby="featured-heading"><div class="featured-copy"><span class="eyebrow">'+(isResuming?"Pick up where you left off":review?"A skill worth revisiting":"A good place to begin")+' · '+trackLabel(best.lesson.track)+'</span><h2 id="featured-heading">'+esc(best.lesson.title)+'</h2><p>'+esc(best.lesson.objective)+'</p><p class="small featured-why">'+esc(best.reason)+'</p><button class="btn" data-lesson="'+best.lesson.id+'">'+(isResuming?"Resume this lesson":review?"Revisit lesson":"Start this lesson")+' →</button></div><aside class="featured-snapshot"><div class="eyebrow">Your learning check-in</div><h3>'+(s?"Your next focus is ready.":"Find your starting point.")+'</h3><p>'+(s?"See your separate Capacity and Judgement insights and how your recommendations are chosen.":"Try six short questions across both pathways. No grades, no labels—just a starting point.")+'</p><button class="btn btn-outline btn-small" data-action="'+(s?"snapshot":"diagnostic")+'">'+(s?"See my snapshot":"Try a check-in")+' →</button></aside></section><section class="course-library" aria-labelledby="all-lessons-heading"><div class="section-top compact"><div><div class="eyebrow">Your learning library</div><h2 id="all-lessons-heading" class="smaller-heading">'+(state.track==="all"?"All "+total+" modules":trackLabel(state.track))+'</h2></div><span class="small muted">'+all.filter(l=>state.records[l.id]?.completed).length+' of '+all.length+' practised</span></div>'+["capacity","judgement"].filter(track=>state.track==="all"||state.track===track).map(track=>'<div class="strand-heading">'+(track==="capacity"?"01 · AI Capacity":"02 · AI Judgement")+' <span class="strand-count">'+pathInfo(state.grade,track).done+' / 3 practised</span></div><div class="lesson-grid">'+all.filter(l=>l.track===track).map(l=>linkLesson(l)).join("")+'</div>').join("")+'</section><div class="course-privacy"><span class="privacy-icon" aria-hidden="true">⌁</span> Preview mode: your progress stays in this browser. Reflections are not saved or shared.</div></main>';}
function beginDiagnostic(){diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)};goto("diagnostic")}
function diagnostic(){if(!diagnosticRun||diagnosticRun.grade!==state.grade){diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)}}const d=diagnosticRun,idx=d.index,q=DIAGNOSTICS[d.grade][idx],strand=STRANDS.find(s=>s.id===q[0]);return '<main id="main-content" class="lesson-layout page"><button class="back" data-action="courses">← Back to courses</button><div class="lesson-panel"><div class="eyebrow">Grade '+d.grade+' · Starting snapshot</div><h1 id="main-title" tabindex="-1">Find your next focus.</h1><p class="lead">Six short questions, one for each strand. This is a low-stakes starting point, not a score of your intelligence or a permanent position.</p><div class="check-progress"><span>Question '+(idx+1)+' of 6</span><span>'+trackLabel(strand.track)+'</span></div><div class="step-meter" role="progressbar" aria-label="Check-in question progress" aria-valuemin="0" aria-valuemax="6" aria-valuenow="'+(idx+1)+'"><div style="width:'+((idx+1)/6*100)+'%"></div></div><fieldset class="challenge-box"><legend id="diagnostic-question" tabindex="-1">'+esc(q[1])+'</legend><p class="small muted">Choose the response you think is strongest.</p><div class="option-list">'+q[2].map((option,i)=>'<label class="option '+(d.answers[idx]===i?"chosen":"")+'"><input type="radio" name="diagnostic-choice" value="'+i+'" '+(d.answers[idx]===i?"checked":"")+'><span class="option-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(option)+'</span></label>').join("")+'</div></fieldset><div class="step-controls"><button class="btn btn-outline" data-action="diag-prev" '+(idx===0?"disabled":"")+'>← Previous</button><button class="btn" data-action="diag-next" '+(d.answers[idx]===null?"disabled":"")+'>'+(idx===5?"See my learning snapshot →":"Continue →")+'</button></div><p class="privacy-note">Only your choices and the resulting practice suggestions are saved to this browser. You can retake the snapshot whenever you want.</p></div></main>';}
function quadrant(){
 const areas=[
 ["low-high","Build practical capacity","Use thoughtful decisions as a springboard to experiment and create."],
 ["high-high","Transfer into new challenges","Combine capability and discernment in situations that matter."],
 ["low-low","Explore the foundations","Learn how AI works, practise with examples and ask curious questions."],
 ["high-low","Pause, question and verify","Pair technical fluency with evidence, purpose and consequences."]
 ];
 return '<div class="quadrant-map" role="group" aria-label="Four possible learning moves across AI Capacity and AI Judgement"><div class="quad-axis-top">Growing judgement ↑</div><div class="quadrant">'+areas.map(([id,name,desc])=>'<div class="quad quad-'+id+'"><h3>'+esc(name)+'</h3><p>'+esc(desc)+'</p></div>').join("")+'</div><div class="quad-bottom">← Building capacity <span>Growing capacity →</span></div></div>';
}
function reviewAnswers(grade){const d=state.diagnostics[grade];if(!d||!d.completed)return "";return '<details class="answer-review"><summary>Review my six starting decisions and feedback</summary><ol>'+DIAGNOSTICS[grade].map((q,i)=>'<li><strong>'+esc(q[1])+'</strong><p class="small">Your choice: '+esc(q[2][d.answers[i]])+'</p><p class="small '+(d.answers[i]===q[3]?"complete":"")+'">Most defensible choice: '+esc(q[2][q[3]])+'</p><p class="small muted">'+esc(q[4])+'</p></li>').join("")+'</ol></details>';}
function snapshot(){
 const results=score(state.grade),total=count(state.grade),recommended=recs(state.grade);
 const checkIn=results?
 '<section class="learning-evidence" aria-label="Optional starting check-in evidence"><div class="section-top compact"><div><div class="eyebrow">A snapshot, not a grade</div><h2>Your six starting choices</h2></div><button class="btn btn-outline btn-small" data-action="retake">Retake check-in</button></div>'+
 '<p class="small muted">Three questions in each pathway offer a starting clue. They do not measure your overall ability or determine where you belong.</p>'+
 '<div class="learning-evidence-grid"><div class="info-card"><h3>AI Capacity</h3><p class="learning-sample-number">'+results.capacity+' <span>of 3 starting choices</span></p><p class="small muted">Responses that aligned with the modelled approach.</p></div><div class="info-card"><h3>AI Judgement</h3><p class="learning-sample-number">'+results.judgement+' <span>of 3 starting choices</span></p><p class="small muted">Responses that aligned with the modelled approach.</p></div></div>'+
 '<div class="info-card learning-strands"><h3>Six strands, six starting clues</h3><div class="strand-results">'+STRANDS.map(st=>'<div><span>'+st.id+' · '+esc(st.name)+'</span><strong class="'+(results.correct[st.id]?"complete":"")+'">'+(state.records[state.grade+"-"+st.id]?.practicePassed?"✓ Practice check passed":results.correct[st.id]?"✓ Encouraging starting answer":"↗ Worth revisiting")+'</strong></div>').join("")+'</div></div>'+
 reviewAnswers(state.grade)+'</section>'+
 '<section class="snapshot-map"><div class="section-top compact"><div><div class="eyebrow">A lens for reflection</div><h2>Many ways to grow</h2></div></div>'+quadrant()+'<p class="quad-disclaimer">The quadrant is a conversation tool, not a placement system. Stronger evidence comes from explaining decisions, trying real tasks and applying what you learn in another context.</p></section>':
 '<section class="learning-checkin-panel"><div><div class="eyebrow">Optional starting check-in</div><h2>Curious where to focus next?</h2><p>Six low-stakes questions can suggest skills to practise. You can start any lesson without taking the check-in, and its results are never a grade.</p></div><button class="btn" data-action="diagnostic">Try six questions →</button></section>';
 return '<main id="main-content" class="max section page learning-page">'+
 '<div class="eyebrow">Grade '+state.grade+' · My learning</div><h1 id="main-title" tabindex="-1">Your learning is taking shape.</h1>'+
 '<p class="hero-lead learning-intro">You grow by understanding, trying things, questioning your choices and improving your work. These markers show practice, not grades.</p>'+
 '<section class="learning-progress-section" aria-label="Module progress"><div class="section-top compact"><div><div class="eyebrow">Your two pathways</div><h2>Progress at a glance</h2></div><span class="learning-total">'+total.done+' of '+total.total+' modules practised</span></div>'+
 '<div class="learning-progress-grid">'+["capacity","judgement"].map(track=>'<article class="learning-progress-card learning-progress-'+track+'"><div class="eyebrow">'+(track==="capacity"?"Pathway 01":"Pathway 02")+'</div><h3>'+trackLabel(track)+'</h3><p>'+(track==="capacity"?"Understand, experiment and create with AI.":"Question, verify and make thoughtful choices.")+'</p>'+gradeLane(state.grade,track)+'<button class="btn btn-outline btn-small" data-action="track" data-track="'+track+'">Explore '+trackLabel(track)+' →</button></article>').join("")+'</div></section>'+
 checkIn+
 '<section class="learning-next-section"><div class="section-top compact"><div><div class="eyebrow">Keep developing</div><h2>What could you try next?</h2></div></div><div class="lesson-grid">'+recommended.map(x=>linkLesson(x.lesson,x.reason)).join("")+'</div></section>'+
 '<div class="learning-return"><button class="btn btn-outline" data-action="courses">See all Grade '+state.grade+' modules →</button></div></main>';
}
function activityDescription(a){return a.intro||""}
function lessonSteps(){return ["Learn","Model","Practise","Apply","Reflect"];}
function coachingOptions(l,w,r){
 const guide=LEARNING_SCAFFOLDS[l.id];
 const needsSupport=!!(w.feedback&&!w.feedback.passed)||(r.attempts||0)>=2&&!r.practicePassed;
 const suggested=needsSupport?"support":r.practicePassed?"stretch":"independent";
 const messages={support:"A smaller step may help: use a clue, then try the challenge again.",stretch:"You passed the selected-response check. Try applying the idea in a harder situation.",independent:"Start by making your own decision. You can request support at any time."};
 const choices=[["independent","Work it out"],["support","Use a clue"],["stretch","Go further"]];
 const selector='<div class="learning-coach-choices" role="group" aria-label="Choose your learning pathway">'+choices.map(([mode,label])=>'<button type="button" class="learning-coach-choice '+(w.coachMode===mode?"is-active":"")+'" data-action="coach-route" data-route="'+mode+'" aria-pressed="'+(w.coachMode===mode)+'">'+label+(suggested===mode?'<span class="learning-coach-suggested">Suggested</span>':"")+'</button>').join("")+'</div>';
 let panel='<p class="small muted">Make your first attempt without a clue, or choose a different path. These options do not change your score or lock you into a level.</p>';
 if(w.coachMode==="support"){
  panel='<div class="learning-coach-panel" id="coach-panel" tabindex="-1"><h4>A smaller step</h4><p>'+esc(guide.support)+'</p><p><strong>Check your thinking against this goal:</strong> '+esc(guide.criteria[0])+'</p><p><strong>Ask yourself:</strong> '+esc(guide.notice)+'</p><button type="button" class="btn btn-outline btn-small" data-action="coach-revisit">Look at the worked example again</button></div>';
 }else if(w.coachMode==="stretch"){
  panel='<div class="learning-coach-panel learning-coach-panel--stretch" id="coach-panel" tabindex="-1"><h4>Try a deeper challenge</h4><p>'+esc(guide.stretch)+'</p><p><strong>Make a connection elsewhere:</strong> '+esc(guide.transfer)+'</p><p class="small muted">Try this independently, with a peer or in a school-approved workspace. It is optional and is not automatically assessed.</p></div>';
 }
 return '<section class="learning-coach" aria-label="Choose learning support"><div class="learning-coach-top"><h3>Choose your next learning step</h3><p class="small" id="coach-recommendation">'+esc(messages[suggested])+'</p></div>'+selector+panel+'</section>';
}

function labSettingChoices(key,label,values,current){
 return '<div class="lab-control"><p class="lab-control-label">'+esc(label)+'</p><div class="lab-control-buttons" role="group" aria-label="'+esc(label)+'">'+values.map(([value,title])=>
 '<button type="button" class="lab-adjust-choice '+(current===value?"selected":"")+'" data-action="lab-adjust" data-setting="'+key+'" data-value="'+value+'" aria-pressed="'+(current===value)+'">'+esc(title)+'</button>').join("")+'</div></div>';
}
function labTuningHtml(l,w){
 const lab=LEARNING_LABS[l.id];if(!lab||!w.labMode)return "";
 const mode=w.labMode;
 const settings=w.labTuning?.[mode]||{};
 let controls="";
 if(lab.kind==="discriminate"){
  controls=labSettingChoices("changed","Change the input, then compare the response",[[0,"First input"],[1,"Change the input"]],settings.changed??0);
 }else if(lab.kind==="classifier"){
  const initial=mode==="balanced"?1:0;
  controls=labSettingChoices("oakShade","Add an oak example in dim light",[[0,"Leave out"],[1,"Include"]],settings.oakShade??initial)+
   labSettingChoices("mapleBright","Add a maple example in bright light",[[0,"Leave out"],[1,"Include"]],settings.mapleBright??initial)+
   labSettingChoices("lightingWeight","How strongly does the toy model use lighting?",[[0,"Ignore lighting"],[1,"Normal"],[2,"Twice as much"],[3,"Three times"]],settings.lightingWeight??2);
 }else if(lab.kind==="feed"&&mode==="evidence"){
  controls=labSettingChoices("evidenceWeight","How much should verified evidence count, relative to representation?",[[20,"20% evidence"],[50,"50% evidence"],[65,"65% evidence"],[90,"90% evidence"]],settings.evidenceWeight??65);
 }else if(lab.kind==="evaluation"){
  controls=labSettingChoices("errorCost","How should we account for the consequences of different failures?",[[0,"Count every failure equally"],[1,"Consider higher-stakes harm"]],settings.errorCost??0);
 }else if(lab.kind==="decision"){
  controls=labSettingChoices("priority","Which constraint matters most to this school community?",[["inclusion","Inclusive access"],["privacy","Information privacy"],["speed","Time to deliver"]],settings.priority??"inclusion");
 }
 if(["benchmark","provenance","workflow","governance"].includes(lab.kind))controls=seniorLabTuning(lab.kind,settings,mode,labSettingChoices);
 return controls?'<div class="lab-tuning" aria-label="Adjust the investigation"><h4>Change the conditions</h4><p class="small muted">These are your choices. Change one control at a time, predict what might happen and compare.</p>'+controls+'</div>':"";
}
function learningLabHtml(l,w){
 const lab=LEARNING_LABS[l.id];if(!lab)return "";
 const seen=w.labModesSeen||[],mode=w.labMode,settings=w.labTuning?.[mode]||{};
 const choices='<div class="lab-choices" role="group" aria-label="Choose the laboratory condition">'+lab.modes.map(([id,label])=>
 '<button type="button" class="lab-choice '+(mode===id?"selected":"")+'" data-action="lab-mode" data-mode="'+id+'" aria-pressed="'+(mode===id)+'">'+esc(label)+'</button>').join("")+'</div>';
 let result="";
 if(mode){
  if(lab.kind==="discriminate"){
   const example=labGrade6(mode,settings.changed===1);
   const symbols={timer:"01 · Fixed rule",classifier:"02 · Pattern labeler",unknown:"03 · Not enough evidence"};
   result='<div class="lab-grade6"><div class="lab-grade6-symbol" aria-hidden="true">'+(mode==="timer"?"◷":mode==="classifier"?"◎":"?")+'</div><div><strong>'+esc(symbols[mode])+'</strong><p>'+esc(example.output)+'</p><p class="lab-interpretation"><strong>What does that show?</strong> '+esc(example.interpretation)+'</p></div></div>';
  }else if(lab.kind==="classifier"){
   const defaults=mode==="balanced"?1:0;
   const extras=[settings.oakShade??defaults,settings.mapleBright??defaults].map((v,i)=>v?i:-1).filter(x=>x>=0);
   const weight=settings.lightingWeight??2;
   const info=labClassify(mode,{extraExamples:extras,lightingWeight:weight});
   result='<p><strong>'+info.trainingCount+' training examples · '+info.correct+' of '+info.total+' test cases matched</strong></p>'+
    '<p class="small muted">This toy nearest-example model gives lighting '+weight+' times the influence of leaf shape. Change it to discover which examples are sensitive to the shortcut.</p>'+
    '<div class="lab-table-wrap" role="region" aria-label="Scrollable classifier results" tabindex="0"><table class="lab-results-table"><caption>Unseen fictional photos: predicted labels against known labels</caption><thead><tr><th scope="col">Test case</th><th scope="col">Known</th><th scope="col">Predicted</th><th scope="col">Result</th></tr></thead><tbody>'+
    info.rows.map(x=>'<tr><th scope="row">'+esc(x.name)+'</th><td>'+esc(x.expected)+'</td><td>'+esc(x.predicted)+'</td><td class="'+(x.correct?"lab-correct":"lab-incorrect")+'">'+(x.correct?"Match":"Mismatch")+'</td></tr>').join("")+'</tbody></table></div>';
   if(seen.includes("skewed")&&seen.includes("balanced")){
    const a=labClassify("skewed"),b=labClassify("balanced");
    result+='<p class="lab-comparison"><strong>Compare the starting conditions:</strong> Limited data: '+a.correct+'/'+a.total+' correct. More varied data: '+b.correct+'/'+b.total+' correct (default lighting weight). Your adjustments can change those numbers. These four toy cases cannot predict real-world accuracy.</p>';
   }
  }else if(lab.kind==="feed"){
   const weight=settings.evidenceWeight??65;
   result='<div class="lab-ranking"><p class="small muted">Ranking uses '+(mode==="attention"?"the fictional attention score.":weight+'% evidence quality and '+(100-weight)+'% representation quality. Both are deliberately invented scores.')+'</p>'+
    '<ol class="lab-feed-list">'+labRankFeed(mode,{evidenceWeight:weight}).map(x=>'<li><div><strong>'+esc(x.title)+'</strong><small>'+esc(x.voice)+'</small></div><span class="lab-score">Score '+x.score+'</span></li>').join("")+'</ol></div>';
   if(seen.includes("attention")&&seen.includes("evidence"))result+='<p class="lab-comparison"><strong>Compare the feeds:</strong> The same five posts appear in a different order. The system goal, not simply the existence of content, shapes what someone sees first.</p>';
  }else if(lab.kind==="evaluation"){
   const report=labEvaluate(mode,settings.errorCost===1);
   result='<p><strong>'+report.passed+' of '+report.total+' invented test cases passed</strong>. This is a tiny classroom sample, not a performance guarantee.</p>'+
    '<ul class="lab-case-list">'+report.cases.map(x=>'<li><span>'+esc(x.name)+'</span><strong class="'+(x.passed?"lab-correct":"lab-incorrect")+'">'+(x.passed?"Met case":"Failed case")+'</strong></li>').join("")+'</ul>'+
    '<p class="small muted">For discussion: '+report.failures.length+' failed cases; '+report.weightedRisk+' fictional concern points under this weighting. These are not medical, safety or model-performance measurements.</p>';
   if(seen.includes("easy")&&seen.includes("mixed"))result+='<p class="lab-comparison"><strong>Compare tests:</strong> The familiar-only test was 4/4; the broader fictional test was 5/8. Which headline would be misleading if shared without scope?</p>';
  }else if(lab.kind==="relationship"){
   const item=LAB_RELATIONSHIP_FEEDBACK[mode];
   result='<h4>'+esc(item.title)+'</h4><p>'+esc(item.message)+'</p><p><strong>Next step:</strong> '+esc(item.next)+'</p><p class="small muted">This is about a fictional chatbot. Do not share private personal experiences here.</p>';
  }else if(lab.kind==="decision"){
   const item=LAB_DESIGN_CHOICES[mode],priority=settings.priority??"inclusion";
   result='<h4>'+esc(item.title)+'</h4><dl class="lab-tradeoffs"><dt>Potential benefit</dt><dd>'+esc(item.strength)+'</dd><dt>Potential limitation</dt><dd>'+esc(item.risk)+'</dd><dt>How to strengthen it</dt><dd>'+esc(item.step)+'</dd></dl>'+
   '<p class="lab-interpretation"><strong>Under your priority:</strong> '+esc(LAB_DESIGN_PRIORITIES[priority])+'</p>';
  }
  if(["benchmark","provenance","workflow","governance"].includes(lab.kind))result=seniorLabRender(lab.kind,mode,settings,seen,esc);
  result='<div class="lab-result" id="lab-result" tabindex="-1" role="status" aria-label="Laboratory observation">'+result+'</div>';
 }
 return '<section class="learning-lab" aria-label="Interactive investigation"><div class="lab-eyebrow">Investigate · Interactive laboratory</div><h3>'+esc(lab.title)+'</h3><p>'+esc(lab.introduction)+'</p>'+
 '<p class="lab-question"><strong>Investigate:</strong> '+esc(lab.question)+'</p>'+choices+labTuningHtml(l,w)+
 (result||'<p class="small muted lab-start-hint">Choose one tool or condition. Make a prediction, then try another and compare what changes.</p>')+
 '<p class="lab-progress" role="status">'+(seen.length>=2?'Both conditions explored. You can now attempt the guided challenge below.':seen.length+' of 2 conditions explored · Explore two different choices before checking the guided challenge.')+'</p>'+
 '<div class="lab-observation-field"><label for="lab-observation"><strong>What changed, and why might that matter?</strong></label><textarea id="lab-observation" data-lab-observation="true" rows="2" maxlength="900" placeholder="I predicted… I observed… This does or does not show…">'+esc(w.labObservation||"")+'</textarea><p class="small muted">Optional learning notes; writing remains in this tab and is not graded, saved or transmitted.</p></div>'+
 '<details class="learning-support lab-offline"><summary>Try the investigation without a live AI tool</summary><p>'+esc(classroomPlan(l).offline)+'</p></details>'+ 
 '<div class="lab-guidance"><p><strong>What this model cannot show:</strong> '+esc(lab.explanation)+'</p>'+
 '<p><strong>Make sense of it:</strong> '+esc(lab.reflection)+'</p></div>'+
 '<p class="small muted">Your laboratory choices and written observations are temporary; they are not student grades or saved records.</p></section>';
}
function inquiryBriefHtml(l){
 const brief=INQUIRY_BRIEFS[l.id];if(!brief)return "";
 return '<section class="inquiry-brief" aria-label="Authentic investigation"><div class="eyebrow">Investigate and create</div><h3>'+esc(brief.title)+'</h3>'+
 '<p class="inquiry-driving-question">'+esc(brief.question)+'</p>'+
 '<div class="inquiry-grid"><div><strong>What to investigate</strong><p>'+esc(brief.try)+'</p></div>'+
 '<div><strong>What evidence to show</strong><p>'+esc(brief.evidence)+'</p></div></div>'+
 '<p class="inquiry-transfer"><strong>Transfer it:</strong> '+esc(brief.transfer)+'</p>'+
 '<p class="small muted">Use teacher-provided sources or approved tools; you can work without a live AI service.</p></section>';
}
function capstoneGuideHtml(l){
 const guide=CAPSTONE_GUIDES[l.id];if(!guide)return "";
 return '<details class="capstone-guide" open><summary>Project guide · '+esc(guide.name)+'</summary><div>'+
 '<h4>Design, test and revise</h4><ol>'+guide.phases.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ol>'+
 '<h4>Evidence to bring to a conference</h4><ul>'+guide.evidence.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>'+
 '<p><strong>Question for review:</strong> '+esc(guide.review)+'</p>'+
 '<p class="small muted">Your project is reviewed by a teacher or audience using real work, not automatically graded by this website.</p></div></details>';
}
function classroomSupportHtml(l){
 const p=classroomPlan(l);
 return '<details class="classroom-support"><summary>Facilitator resources · '+esc(p.time)+'</summary><div class="classroom-support-inner"><h4>Prepare</h4><p>'+esc(p.prepare)+'</p><h4>Suggested sequence</h4><p>'+esc(p.setup)+'</p><h4>Without a live AI account</h4><p>'+esc(p.offline)+'</p><h4>Include every learner</h4><p>Accept speech, drawings, paper tables and home languages; support reading and accessibility. Focus on reasoning rather than speed.</p><p class="small muted">Timing is a classroom estimate, not an assessed student outcome.</p></div></details>';
}
function evidenceGuideHtml(l){
 const p=classroomPlan(l);
 return '<details class="performance-evidence"><summary>What meaningful evidence could look like</summary><div class="performance-evidence-inner"><p><strong>Age-appropriate outcome:</strong> '+esc(p.response)+'</p><p><strong>Required evidence:</strong> '+esc(INQUIRY_BRIEFS[l.id].evidence)+'</p><div class="rubric-table-wrap" role="region" aria-label="Scrollable teacher-review rubric" tabindex="0"><table class="rubric-table"><caption>Teacher-reviewed learning evidence — not automatically scored</caption><thead><tr><th scope="col">Dimension</th><th scope="col">Developing</th><th scope="col">Applying</th><th scope="col">Transferring</th></tr></thead><tbody>'+Object.values(TEACHER_RUBRIC).map(c=>'<tr><th scope="row">'+esc(c.name)+'</th><td>'+esc(c.developing)+'</td><td>'+esc(c.applying)+'</td><td>'+esc(c.transferring)+'</td></tr>').join("")+'</tbody></table></div><p class="small muted">This is a descriptive teacher-review guide. The site cannot assess written reasoning or verify a real-world artefact.</p></div></details>';
}
function transferChallengeHtml(l){
 const p=classroomPlan(l);
 return '<section class="unseen-transfer" aria-label="Unseen transfer challenge"><div class="eyebrow">Transfer · A new situation</div><h3>Can you use this somewhere unfamiliar?</h3><p>'+esc(p.transfer)+'</p><p><strong>Show your thinking:</strong> Explain how you would gather evidence, make a responsible choice and revise or test your conclusion.</p><p class="small muted">Try independently before asking for support. A teacher or peer can review your work using school-approved tools; this website cannot judge its quality.</p></section>';
}
function activityHtml(l,w){const a=ACTIVITIES[l.id];if(!a)return '<p>Activity unavailable.</p>';let body='<div class="eyebrow">Interactive challenge · '+esc(a.kind==="sort"?"Classify":a.kind==="sequence"?"Build a workflow":a.kind==="prompt"?"Compare prompts":a.kind==="evidence"?"Check the evidence":"Make a decision")+'</div><h2>'+esc(a.title)+'</h2><p>'+esc(activityDescription(a))+'</p>';
if(a.kind==="sort")body+='<div class="sort-list">'+a.items.map((item,i)=>'<div class="sort-item"><div class="item-number">'+(i+1)+'</div><div class="sort-question"><p>'+esc(item[0])+'</p><label class="small" for="sort-'+i+'">Your classification</label><select id="sort-'+i+'" data-sort="'+i+'"><option value="">Choose a category…</option>'+a.categories.map((x,n)=>'<option value="'+n+'" '+(w.sort[i]===n?"selected":"")+'>'+esc(x)+'</option>').join("")+'</select>'+(w.checked?'<div class="item-feedback '+(w.sort[i]===item[1]?"right":"try-again")+'">'+(w.sort[i]===item[1]?"✓ ":"↗ ")+esc(item[2])+'</div>':"")+'</div></div>').join("")+'</div>';
if(["prompt","decision","evidence"].includes(a.kind))body+='<div class="option-list">'+a.options.map((item,i)=>'<label class="option '+(w.selected===i?"chosen":"")+'"><input type="radio" name="activity-choice" value="'+i+'" '+(w.selected===i?"checked":"")+'><span class="option-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(item[0])+'</span></label>').join("")+'</div>'+(w.checked&&a.kind==="prompt"&&w.selected!==null?'<div class="example-output"><strong>Illustrative response</strong><p>'+esc(a.options[w.selected][1])+'</p></div>':"");
if(["prompt","decision","evidence"].includes(a.kind))body+='<label for="practice-reason" class="input-label" style="margin-top:19px">Why do you think this is the strongest choice?</label><textarea id="practice-reason" rows="3" maxlength="1200" placeholder="I would choose this because…">'+esc(w.reason||"")+'</textarea><p class="small muted">Explain your reasoning in a sentence or two (at least 25 characters). This is a thinking exercise, not automatically graded writing.</p>';
if(a.kind==="sequence")body+='<p class="small muted" style="margin-bottom:13px">Move each step using the arrow buttons, then check your sequence. Other real-world processes may be iterative.</p><ol class="sequence-list">'+w.order.map((pos,i)=>'<li class="sequence-item"><span class="sequence-number">'+(i+1)+'</span><span class="sequence-text">'+esc(a.steps[pos])+'</span><div class="move-actions"><button class="move-btn" data-action="move" data-index="'+i+'" data-dir="-1" aria-label="Move '+esc(a.steps[pos])+' up" '+(i===0?"disabled":"")+'>↑</button><button class="move-btn" data-action="move" data-index="'+i+'" data-dir="1" aria-label="Move '+esc(a.steps[pos])+' down" '+(i===w.order.length-1?"disabled":"")+'>↓</button></div></li>').join("")+'</ol>';
if(w.feedback)body+='<div id="activity-feedback" class="feedback '+(w.feedback.passed?"feedback-good":"feedback-retry")+'" role="status" tabindex="-1"><strong>'+(w.feedback.passed?"Challenge passed. Your reasoning is not automatically graded.":"Useful attempt. Review what needs changing.")+'</strong><p>'+esc(w.feedback.message)+'</p>'+(w.feedback.details?.length?'<ul class="feedback-details">'+w.feedback.details.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul>':"")+(w.feedback.nextStep?'<p class="feedback-next"><strong>Try this next:</strong> '+esc(w.feedback.nextStep)+'</p>':"")+(a.tip?'<p class="small">'+esc(a.tip)+'</p>':"")+'</div>';
if(!getRecord(l.id).practicePassed||w.retrying)body+='<button class="btn" data-action="check" style="margin-top:20px" '+(LEARNING_LABS[l.id]&&(w.labModesSeen||[]).length<2?'disabled aria-describedby="lab-prerequisite"':"")+'>Check my thinking →</button>'+(LEARNING_LABS[l.id]&&(w.labModesSeen||[]).length<2?'<p class="small muted" id="lab-prerequisite">Compare two laboratory conditions above before checking this answer.</p>':"");else body+='<div class="mastery-note">✓ Challenge passed. You can move on to apply your thinking, or practise again.</div><button class="btn btn-outline btn-small" data-action="retry" style="margin-top:15px">Try challenge again</button>';
return body;}
function lesson(){const l=currentLesson();if(!l)return courses();const k=KNOWLEDGE[l.id],w=getPractice(l.id),r=getRecord(l.id),stage=Math.min(4,Number(w.stage)||0);if(!k)return '<main id="main-content" class="lesson-layout"><h1>Lesson not available</h1><button class="btn" data-action="courses">Return to courses</button></main>';
const guide=LEARNING_SCAFFOLDS[l.id];
const previous=LESSON_BY_ID[(l.grade-1)+"-"+l.strand],previousPractised=!!(previous&&state.records[previous.id]?.completed);
const example=k.example,ct=k.contexts||[],labels=lessonSteps();const activeContext=ct[w.context]||ct[0];const nextSuggested=recs(l.grade).map(x=>x.lesson).find(x=>x.id!==l.id&&!state.records[x.id]?.completed)||LESSONS.find(x=>x.grade===l.grade&&x.id!==l.id&&!state.records[x.id]?.completed);let body="";
if(stage===0){
 const index=Math.min(2,w.topicIndex||0),part=k.core[index];
 body='<div class="lesson-eyebrow"><span class="eyebrow">Build your understanding</span><span class="lesson-subprogress">Idea '+(index+1)+' of 3</span></div>'+
 '<h2 id="stage-title" tabindex="-1">'+esc(["Start with the idea","Explore what it means","Use what you know"][index])+'</h2>'+
 '<p class="lesson-essence">'+esc(k.essential||l.principle)+'</p>'+
 '<div class="knowledge-panel"><div class="knowledge-number">0'+(index+1)+'</div><p>'+esc(part)+'</p></div>'+
 (index===0&&previousPractised?'<details class="learning-support prior-learning"><summary>Connect with what you learned before</summary><p>In your earlier module, you explored: <strong>'+esc(previous.principle)+'</strong></p><p>Without looking it up, what do you remember—and how could it help with today’s challenge?</p></details>':"")+
 (index===0&&guide?'<section class="lesson-success-criteria" aria-label="Learning intentions"><div class="eyebrow">What success looks like</div><h3>By the end, I can…</h3><ul>'+guide.criteria.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul><p class="small muted">These are things to practise and demonstrate, not grades.</p></section>':"")+
 (index===0?classroomSupportHtml(l):"")+
 '<div class="learning-aid"><button class="btn btn-outline btn-small" data-action="listen">Listen to this idea</button><span class="small muted">Optional device read-aloud; no recording</span></div>'+
 '<div class="concept-pips" aria-label="Teaching sections">'+k.core.map((c,i)=>'<button class="concept-pip '+(i===index?"selected":"")+'" data-action="concept" data-index="'+i+'" '+(i>Math.max(index,w.maxTopic||0)?"disabled":"")+' aria-current="'+(i===index?"step":"false")+'">Idea '+(i+1)+'</button>').join("")+'</div>'+
 (index===2?
   '<div class="knowledge-glossary"><div class="eyebrow">Words worth knowing</div><div class="glossary-grid">'+k.glossary.map(([term,meaning])=>'<div><strong>'+esc(term)+'</strong><p>'+esc(meaning)+'</p></div>').join("")+'</div></div>'+
   '<fieldset class="challenge-box knowledge-check"><legend>Check your understanding</legend><p class="small muted">'+esc(k.check[0])+'</p><div class="option-list">'+k.check[1].map((choice,i)=>'<label class="option '+(w.knowledgeAnswer===i?"chosen":"")+'"><input type="radio" name="knowledge-choice" value="'+i+'" '+(w.knowledgeAnswer===i?"checked":"")+'><span class="option-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(choice)+'</span></label>').join("")+'</div></fieldset>'+
   (w.knowledgeFeedback?'<div id="knowledge-feedback" tabindex="-1" class="feedback '+(w.knowledgeFeedback.passed?"feedback-good":"feedback-retry")+'" role="status"><strong>'+esc(w.knowledgeFeedback.passed?"You have the core idea.":"Review the explanation and try again.")+'</strong><p>'+esc(k.check[3]||l.principle)+'</p>'+(w.knowledgeFeedback.passed?"":'<p class="feedback-next"><strong>Try this next:</strong> '+esc(guide.support)+'</p><p class="feedback-next"><strong>Notice:</strong> '+esc(guide.notice)+'</p>'+(w.knowledgeMisses>=2?'<button type="button" class="btn btn-outline btn-small" data-action="concept" data-index="0">Revisit the first idea</button>':""))+'</div>':"")+
   (r.knowledgePassed?'<p class="mastery-note">✓ Understanding check passed. Next, examine a worked example.</p>':'<button class="btn" data-action="knowledge-check" '+(w.knowledgeAnswer===null?"disabled":"")+' style="margin-top:18px">Check my understanding →</button>')
  : '<div class="teaching-next"><button class="btn" data-action="concept-next">Continue reading →</button><span class="small muted">Learn the ideas before attempting a challenge.</span></div>');
}
if(stage===1){
 body='<div class="eyebrow">See how the thinking works</div><h2 id="stage-title" tabindex="-1">Compare two approaches.</h2>'+
 '<p>Imagine this situation. Before reading the worked response, think about what you would do and what might go wrong.</p>'+
 '<div class="thinking-prompt"><strong>Look for the difference</strong><p>'+esc(guide.notice)+'</p></div>'+
 '<div class="case-situation"><strong>The situation</strong><p>'+esc(l.scenario)+'</p></div>'+
 '<div class="worked-contrast"><div class="weak-example"><span class="worked-label">A weaker approach</span><p>'+esc(example[0])+'</p></div>'+
 (w.modelSeen?'<div id="worked-model" class="strong-example" tabindex="-1"><span class="worked-label">A more thoughtful approach</span><p>'+esc(example[1])+'</p></div>':'<div class="model-hidden"><p>What would you change? Think first, then reveal another way.</p><button class="btn btn-outline" data-action="model-reveal">Reveal a stronger approach →</button></div>')+'</div>'+
 (w.modelSeen?'<div class="learning-principle"><div class="principle-symbol">✳</div><div><strong>Why this matters</strong><p>'+esc(l.principle)+'</p></div></div><div class="learning-discuss"><strong>Discuss or reflect</strong><p>How did the second approach change the purpose, the evidence or the thinking? What would you add?</p><details class="learning-support"><summary>Want a deeper challenge?</summary><p>'+esc(guide.stretch)+'</p></details></div>':'<p class="small muted">The stronger example will appear when you choose to reveal it.</p>');
}
if(stage===2){
  body='<div class="eyebrow">Guided practice</div><h2 id="stage-title" tabindex="-1">Try the idea yourself.</h2><p class="small muted">Use what you have learned to make a decision. Mistakes are part of the learning: feedback will help you improve.</p>'+coachingOptions(l,w,r)+learningLabHtml(l,w)+activityHtml(l,w);
 }
 if(stage===3){
 const step=Math.min(2,w.applyStep||0);
 const fs=w.fields||{purpose:"",decision:"",evidence:"",work:"",revision:""};
 const minNotes=w.format==="written"?35:18;
 const planned=["purpose","decision","evidence"].every(x=>(fs[x]||"").trim().length>=minNotes);
 const enough=planned&&["work","revision"].every(x=>(fs[x]||"").trim().length>=minNotes);
 const progressNames=["Choose your challenge","Plan your approach","Create, test & improve"];
 const header='<div class="eyebrow">Apply what you know</div><h2 id="stage-title" tabindex="-1">Make your learning matter.</h2>'+
 '<p>Use what you learned to respond to a meaningful problem. Work with an approved tool, teacher-provided examples or a non-AI alternative as appropriate.</p>'+
 '<div class="application-success"><strong>What good work will show</strong><ul>'+guide.criteria.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul><p class="small muted">You decide the tool and format. Use the criteria to improve your work—not to earn a score here.</p></div>'+
 '<nav class="apply-steps" aria-label="Your application journey">'+progressNames.map((name,i)=>'<div class="apply-step '+(step===i?"current":i<step?"passed":"")+'" '+(i===step?'aria-current="step"':"")+'><span>'+(i<step?"✓":i+1)+'</span>'+esc(name)+'</div>').join("")+'</nav>'+(step===0?inquiryBriefHtml(l)+capstoneGuideHtml(l)+seniorPortfolioHtml(l,w)+evidenceGuideHtml(l):'');
 let section="";
 if(step===0){
  const options=ct.map(([title,task],i)=>'<button class="context-card '+(w.context===i?"selected":"")+'" data-action="context-choice" data-index="'+i+'" aria-pressed="'+(w.context===i)+'"><span class="context-num">'+(i+1)+'</span><strong>'+esc(title)+'</strong><span>'+esc(task)+'</span></button>').join("");
  section='<h3 id="apply-heading" tabindex="-1" class="apply-heading">What would you like to work on?</h3><div class="context-grid">'+options+'</div>'+
  '<div class="context-brief"><strong>Your chosen challenge</strong><p>'+esc(activeContext[1])+'</p><p class="small muted">'+esc(l.activity)+'</p></div>'+
  '<div class="eyebrow" style="margin-top:24px">How would you like to express your work?</div><div class="mode-list">'+[["written","Write an explanation"],["visual","Sketch or storyboard"],["talk","Discuss or present"]].map(([id,label])=>'<button class="mode-option '+(w.format===id?"selected":"")+'" data-action="format-choice" data-format="'+id+'" aria-pressed="'+(w.format===id)+'">'+esc(label)+'</button>').join("")+'</div>'+
  '<p class="small muted">You may use paper, approved applications or a discussion with someone else. You are still responsible for the work and the decisions.</p><div class="transfer-cue"><strong>Use it beyond this lesson</strong><p>'+esc(guide.transfer)+'</p></div>';
 }
 if(step===1){
  section='<h3 id="apply-heading" tabindex="-1" class="apply-heading">Think it through before you create.</h3><p class="small muted">'+(w.format==="written"?"Write at least a full sentence for each response.":"Brief notes are enough to describe your spoken or visual work.")+' The form checks length, not quality.</p><details class="learning-support"><summary>Need a planning scaffold?</summary><p>'+esc(guide.support)+'</p></details>'+
  '<div class="project-notes"><label for="plan-purpose"><strong>1. What will you do, and who will benefit?</strong><span>Describe the problem, your goal and your audience.</span></label><textarea id="plan-purpose" data-plan-field="purpose" maxlength="2000" rows="3" placeholder="My goal is… The people who need this are…">'+esc(fs.purpose||"")+'</textarea>'+
  '<label for="plan-decision"><strong>2. Where does AI belong—or not belong?</strong><span>Explain your decision using something you learned.</span></label><textarea id="plan-decision" data-plan-field="decision" maxlength="2000" rows="3" placeholder="I would… because… I would avoid…">'+esc(fs.decision||"")+'</textarea>'+
  '<label for="plan-evidence"><strong>3. How will you check, listen and improve?</strong><span>Plan how you will gather evidence, test and seek feedback.</span></label><textarea id="plan-evidence" data-plan-field="evidence" maxlength="2000" rows="3" placeholder="I will test… Ask… Revise…">'+esc(fs.evidence||"")+'</textarea></div>';
 }
 if(step===2){
  section='<h3 id="apply-heading" tabindex="-1" class="apply-heading">Make, test and improve.</h3><p>Create a real work sample: a text, sketch, storyboard, experiment or presentation. Work may be created outside this site; describe what you tried and what changed.</p>'+
  '<div class="project-notes"><label for="plan-work"><strong>4. What did you actually create or try?</strong><span>Explain what your work sample included and how it responded to the need.</span></label><textarea id="plan-work" data-plan-field="work" maxlength="2000" rows="3" placeholder="I created or tried… Here is what it included…">'+esc(fs.work||"")+'</textarea>'+
  '<label for="plan-revision"><strong>5. What did testing or feedback change?</strong><span>Describe feedback or a self-check and one revision made or planned.</span></label><textarea id="plan-revision" data-plan-field="revision" maxlength="2000" rows="3" placeholder="My test or feedback showed… I revised or would revise…">'+esc(fs.revision||"")+'</textarea></div>'+
  '<div class="project-criteria"><strong>Before finishing, check that you:</strong><ul><li>Understand the idea well enough to explain it.</li><li>Made a reasoned AI-use or non-use decision.</li><li>Identified evidence or someone who can give feedback.</li><li>Made or tried something and can explain a revision.</li></ul></div>'+
  '<label class="confirm-line"><input type="checkbox" id="project-confirm" '+(w.confirmed?"checked":"")+'> I have actually made or tried something, reflected on feedback, and understand this site does not grade my work.</label>';
 }
 body=header+section+'<div class="application-actions">'+
 (step>0?'<button class="btn btn-outline" data-action="apply-prev">← Previous</button>':"")+
 '<button class="btn btn-outline" data-action="copy-plan">Copy my notes</button>'+
 '<button class="btn btn-outline" data-action="download-notes">Download my notes</button>'+
 (step<2?'<button class="btn" data-action="apply-next" '+(step===1&&!planned?"disabled":"")+'>Continue →</button>':
 '<button class="btn" data-action="record" '+(!r.practicePassed||!enough||!w.confirmed?"disabled":"")+'>Record my application →</button>')+
 '</div><p class="privacy-note">Your notes are not saved by this website. Copy or download them before refreshing or closing the tab. Keep files private and avoid personal or sensitive data.</p>';
}
if(stage===4){
 if(r.completed){
  body='<div class="eyebrow">Review and move forward</div><h2 id="stage-title" tabindex="-1">What will you do differently?</h2><div class="completion-mark" aria-hidden="true">✓</div>'+
  '<p>You studied the ideas, examined a worked example, practised the skill, applied it to a challenge and reflected on where to use it next.</p>'+
  '<div class="completed-evidence"><div><strong>Understanding</strong><span>✓ Core idea checked</span></div><div><strong>Practice</strong><span>✓ Guided challenge passed</span></div><div><strong>Application</strong><span>✓ Work recorded</span></div><div><strong>Reflection</strong><span>✓ Next-step thinking completed</span></div></div>'+
  '<div class="review-question"><strong>Keep transferring this learning</strong><p>'+esc(guide.transfer)+'</p><p>Try this in a new class or real situation. Seek feedback from someone affected, then explain what changed.</p><p class="small muted">The studio records completed practice, not a judgement of mastery or a teacher-assessed result.</p></div>'+
 (Object.values(w.fields||{}).some(v=>String(v).trim())||Object.values(w.reflection||{}).some(v=>String(v).trim())?
 '<div class="reflection-save"><strong>Keep a copy of your learning</strong><p>Your work and reflection are still open in this tab but are not saved with progress. Copy or download them before leaving this lesson.</p><div class="application-actions"><button class="btn btn-outline" data-action="copy-plan">Copy my notes</button><button class="btn btn-outline" data-action="download-notes">Download my notes</button></div></div>':
 '<p class="small muted">Your earlier notes are not stored by this site. You can revisit the ideas and practise the skill again.</p>')+
  '<div class="hero-buttons">'+(nextSuggested?'<button class="btn" data-lesson="'+nextSuggested.id+'">Next: '+esc(nextSuggested.title)+' →</button>':'<button class="btn" data-action="courses">Explore more courses →</button>')+'<button class="btn btn-outline" data-action="snapshot">Review my learning →</button></div>';
 }else{
  const reflect=w.reflection||{learning:"",transfer:""};
  const written=w.reflectionMode==="written";
  const reflectionReady=w.reflectionConfirmed&&(!written||["learning","transfer"].every(x=>(reflect[x]||"").trim().length>=25));
  body='<div class="eyebrow">Make your learning stick</div><h2 id="stage-title" tabindex="-1">Pause, reflect and transfer.</h2>'+
  '<p>You have applied the skill. Before recording this module as practised, explain what changed in your thinking and where you will use it next. There is no score for your reflection.</p>'+transferChallengeHtml(l)+
  '<div class="reflection-prompt"><strong>1. What did you learn or change?</strong><p>Look back at your work, a misconception you corrected, feedback you received or a decision you reconsidered. What is your evidence?</p><p class="reflection-evidence-question"><strong>Connect with your investigation:</strong> '+esc(INQUIRY_BRIEFS[l.id]?.evidence||l.evidence)+'</p></div>'+
  '<div class="reflection-prompt"><strong>2. Where could this help next?</strong><p>'+esc(guide.transfer)+'</p></div>'+
  '<fieldset class="reflection-modes"><legend>How would you like to reflect?</legend><div class="mode-list">'+
  [["written","Write it here"],["spoken","Discuss or explain aloud"],["visual","Sketch or show it"]].map(([id,label])=>'<label class="reflection-mode-option '+(w.reflectionMode===id?"selected":"")+'"><input type="radio" name="reflection-mode" value="'+id+'" '+(w.reflectionMode===id?"checked":"")+'><span>'+esc(label)+'</span></label>').join("")+
  '</div></fieldset>'+
  (written?
  '<div class="project-notes reflection-notes"><label for="reflection-learning"><strong>What changed in your thinking, and what shows that?</strong><span>Explain an improvement or a misconception you overcame.</span></label><textarea id="reflection-learning" data-reflect-field="learning" maxlength="2000" rows="3" placeholder="At first I thought… I tried… Now I think… because…">'+esc(reflect.learning||"")+'</textarea>'+
  '<label for="reflection-transfer"><strong>What will you do differently in a new situation?</strong><span>Make your next step specific and explain why.</span></label><textarea id="reflection-transfer" data-reflect-field="transfer" maxlength="2000" rows="3" placeholder="Next time in… I will… because…">'+esc(reflect.transfer||"")+'</textarea>'+
  '<p class="small muted">A sentence or two for each response is enough. Your writing stays in this tab; copy or download it to keep it.</p></div>':
  '<div class="reflection-offline"><strong>Take your thinking somewhere you can share it.</strong><p>Answer both questions aloud with a partner, teacher or yourself, or sketch your explanation on paper. Include one real piece of evidence and one next step. The studio does not record speech or images.</p></div>')+
  '<label class="confirm-line reflection-confirm"><input type="checkbox" id="reflection-confirm" '+(w.reflectionConfirmed?"checked":"")+'> I have reflected on what changed and how to apply it elsewhere. I understand this is not teacher-assessed.</label>'+
  '<div class="application-actions"><button class="btn btn-outline" data-action="copy-plan">Copy my notes</button><button class="btn btn-outline" data-action="download-notes">Download my notes</button><button class="btn" data-action="finish-reflection" '+(!reflectionReady?"disabled":"")+'>Finish and record my learning →</button></div>'+
  '<p class="privacy-note">Your written reflection is never uploaded or saved in progress records. This studio only stores the completion checkpoint locally.</p>';
 }
}
const canContinue=stage===0?!!r.knowledgePassed:stage===1?!!w.modelSeen:stage===2?!!r.practicePassed:stage===3?!!r.applied:false;
return '<main id="main-content" class="lesson-layout page"><button class="back" data-action="courses">← Grade '+l.grade+' courses</button><article class="lesson-panel"><div class="breadcrumb">'+trackLabel(l.track)+' <span aria-hidden="true">/</span> '+esc(l.strand)+' <span aria-hidden="true">/</span> Grade '+l.grade+'</div><div class="eyebrow">Learning module · '+esc(l.title)+'</div><h1 id="main-title" tabindex="-1">'+esc(l.title)+'</h1><p class="lead">'+esc(l.objective)+'</p><div class="lesson-progress-heading"><span>Stage '+(stage+1)+' of 5 · '+labels[stage]+'</span><span>'+'Journey steps '+(stage===4&&r.completed?5:stage)+' of 5</span></div><div class="step-meter" role="progressbar" aria-label="Journey stages reached, not assessed mastery" aria-valuenow="'+(stage===4&&r.completed?5:stage)+'" aria-valuemin="0" aria-valuemax="5"><div style="width:'+(stage===4&&r.completed?100:stage/5*100)+'%"></div></div><nav class="step-track" aria-label="Lesson stages">'+labels.map((x,i)=>{const locked=(i===1&&!r.knowledgePassed)||(i===2&&!w.modelSeen)||(i===3&&!r.practicePassed)||(i===4&&!r.applied);return '<button class="step-dot '+(i===stage?"active":i<stage?"done":"")+'" data-action="stage" data-stage="'+i+'" '+(locked?"disabled":"")+' '+(i===stage?'aria-current="step"':"")+'><span class="step-number">'+(i<stage?"✓":i+1)+'</span><span>'+x+'</span></button>'}).join("")+'</nav><p class="step-scroll-hint" aria-hidden="true">Swipe to see all five stages →</p><section class="step-content" aria-label="Current learning stage">'+body+'</section><div class="step-controls">'+(stage>0?'<button class="btn btn-outline" data-action="prev">← Previous stage</button>':'<button class="btn btn-outline" data-action="courses">Exit lesson</button>')+(stage===0&&!canContinue?'<span class="small muted continue-hint">Read all three ideas and pass the short check to continue.</span>':stage<3?'<div class="continue-stack"><button class="btn" data-action="next" '+(!canContinue?"disabled":"")+'>Continue →</button>'+(!canContinue?'<span class="small muted">'+(stage===0?"Read all three ideas and pass the short check.":stage===1?"Reveal and consider the worked example.":"Complete the practice activity to continue.")+'</span>':"")+'</div>':stage===3?'<button class="btn btn-outline" data-action="courses">Return to courses</button>':'<button class="btn btn-outline" data-action="courses">Back to courses</button>')+'</div><div class="privacy-note">Learning preview · Your free-text drafts are not transmitted or saved. Only your lesson progress is recorded on this device.</div></article></main>';}

function about(){
 const journey=[["01","Learn","Build understanding through clear explanations, examples and useful vocabulary."],["02","Model","Compare approaches and notice what makes a decision more thoughtful."],["03","Practise","Try an interactive challenge, use feedback and improve your reasoning."],["04","Apply","Choose a meaningful problem, create or test something and seek feedback."],["05","Reflect","Explain what you learned and how you could use it somewhere new."]];
 return '<main id="main-content" class="max section page about-page"><div class="about-brand-lockup">'+BRAND_MARK+'<div class="eyebrow">The idea behind the Learning Studio</div></div>'+
 '<h1 id="main-title" tabindex="-1">AI skills need <span class="about-accent">thoughtful choices.</span></h1>'+
 '<p class="hero-lead">Learning how to work with AI and knowing when, why—or whether—to use it are different skills. Here, you develop both.</p>'+
 '<div class="two-col about-pathways"><section class="info-card pathway-info pathway-capacity"><div class="eyebrow">Pathway 01</div><h2>AI Capacity</h2><p>Learn what AI does, test how well it works, improve your instructions and create useful things.</p><button class="btn btn-outline btn-small" data-action="track" data-track="capacity">Explore Capacity →</button></section><section class="info-card pathway-info pathway-judgement"><div class="eyebrow">Pathway 02</div><h2>AI Judgement</h2><p>Question claims, protect your learning, consider people affected and decide when AI does—or does not—belong.</p><button class="btn btn-outline btn-small" data-action="track" data-track="judgement">Explore Judgement →</button></section></div>'+
 '<section class="about-journey"><div class="eyebrow">How learning works</div><h2>Learn first. Then make something meaningful.</h2><p>No one should be expected to pass a quiz before they have been taught. Every module provides ideas and a worked example before practice.</p><ol class="about-stage-grid">'+journey.map(([number,label,desc])=>'<li><span class="about-stage-number">'+number+'</span><strong>'+label+'</strong><p>'+desc+'</p></li>').join("")+'</ol></section>'+
 '<section class="snapshot-map about-quadrant"><div class="eyebrow">Room to grow</div><h2>Different learning needs, not fixed labels.</h2><p>You may be confident using AI in one situation and still need to question its role in another. These are possibilities for your next step—not categories of students.</p>'+quadrant()+'</section>'+
 '<div class="app-banner"><div><h2>Ready to explore?</h2><p>Choose a Grade 6–12 course and start with a learning experience that matters to you.</p></div><button class="btn" data-action="courses">Explore my courses →</button></div></main>';
}
function profile(){const d=state.diagnostics[state.grade],n=count(state.grade);return '<main id="main-content" class="max page"><section class="profile-panel"><div class="eyebrow">Local learner profile</div><h1 id="main-title" tabindex="-1" class="course-title">Your learning, in your hands.</h1><p class="small muted">This prototype has no school accounts or central student records. Only learning progress and check-in choices are stored on this browser; project notes are never uploaded or saved here.</p><div class="field"><label for="profile-name">Display alias (avoid full names)</label><input id="profile-name" maxlength="40" autocomplete="off" value="'+esc(state.name)+'"></div><div class="profile-summary"><div><span class="eyebrow">Your current grade</span><strong>Grade '+state.grade+'</strong><small>'+esc(GRADES[state.grade].headline)+'</small></div><div><span class="eyebrow">Learning explored</span><strong>'+n.done+' / '+n.total+'</strong><small>Modules practised, not mastery grades</small></div></div>'+gradeLane(state.grade,"capacity")+gradeLane(state.grade,"judgement")+
 '<div class="profile-section grade-scope-profile"><h2>One grade at a time</h2><p>Your learning library is currently set to <strong>Grade '+state.grade+'</strong>. Other grades are not shown here.</p>'+
 (window.AUTH_CONFIG?.deployment==="sharepoint"?'<p class="small muted">In a school deployment, grade access must be assigned and enforced by the school sign-in and content service.</p>':'<button type="button" class="btn btn-outline btn-small" data-action="switch-grade">Change grade (preview only) →</button>')+
 '</div>'+
 '<div class="profile-section"><h2>Reading comfort</h2><p>Choose a larger reading size for the teaching sections. Your preference stays on this device.</p><button class="btn btn-outline btn-small" data-action="reading">'+(state.reading==="comfortable"?"Use standard text size":"Use more spacious text")+' →</button></div>'+
 '<div class="profile-section"><h2>Keep a copy of your progress</h2><p>You can download a small JSON backup containing your module checkpoints and check-in selections, then import it on another device. It does not include your alias or written work. Keep the backup private.</p><div class="backup-actions"><button class="btn btn-outline" data-action="export-progress">Download my progress</button><div class="import-control"><input type="file" class="import-input" id="import-progress" accept=".json,application/json" aria-label="Choose a learning progress backup to import"><label class="import-label" for="import-progress">Choose a backup to import</label></div></div><p class="small muted">Importing replaces the saved progress for your current grade only. A backup is not a secure student account or verified assessment record.</p></div>'+
 '<div class="profile-section"><h2>Privacy on shared devices</h2><p>Finished on a shared computer? You can clear the display alias, saved learning progress and check-in choices from this browser.</p>'+(confirmClear?
'<div id="clear-warning" class="profile-clear-confirm" role="group" aria-label="Confirm clearing local progress" tabindex="-1"><strong>Clear all progress on this device?</strong><p>This cannot be undone unless you already downloaded a backup. Your learning progress and starting snapshot choices on this browser will be erased.</p><div class="profile-confirm-actions"><button class="btn btn-outline" data-action="cancel-clear">Keep my progress</button><button class="btn btn-danger" data-action="confirm-clear">Yes, clear this device</button></div></div>':
'<button class="btn btn-small btn-outline" data-action="logout">Review clearing my local profile</button>')+'</div>'+
 (notice?'<div class="profile-feedback" role="status">'+esc(notice)+'</div>':"")+
 '<div class="hero-buttons"><button class="btn" data-action="saveprofile">Save alias</button><button class="btn btn-outline" data-action="courses">Return to courses</button></div></section></main>';}
function planText(l,w){
 const context=KNOWLEDGE[l.id]?.contexts?.[w.context]||["Chosen challenge",""];
 const f=w.fields||{},brief=INQUIRY_BRIEFS[l.id],capstone=CAPSTONE_GUIDES[l.id],headers=[
  ["My goal and audience","purpose"],["My AI-use or non-use decision","decision"],
  ["How I will check evidence and seek feedback","evidence"],
  ["What I actually created or tried","work"],["What I tested or revised","revision"]
 ];
 return ["AI CAPACITY × JUDGEMENT — LEARNING NOTES",
  "Grade "+l.grade+" · "+l.title+" · "+trackLabel(l.track),
  "My chosen challenge:",context[0],context[1],
  "INVESTIGATION QUESTION:",brief?.question||"",
  "METHOD TO TRY:",brief?.try||"",
  "WHAT EVIDENCE TO SHOW:",brief?.evidence||"",
  "UNSEEN TRANSFER TASK:",UNSEEN_TRANSFER[l.id]||"",
  "TEACHER REVIEW EXPECTATION:",GRADE_RESPONSE_EXPECTATIONS[l.grade],
  ...(capstone?["MY PORTFOLIO MILESTONES:",...capstone.phases.map((phase,i)=>(w.seniorMilestones?.[i]?"[marked] ":"[pending] ")+phase)]:[]),
  ...(capstone?["CAPSTONE EVIDENCE CHECKLIST:",...capstone.evidence.map(item=>"- "+item)]:[]),
  "How I chose to share my work:",{written:"Written explanation",visual:"Sketch or storyboard",talk:"Discussion or presentation"}[w.format]||"Written explanation",
  ...headers.flatMap(([title,key])=>[title+":",f[key]||"(Not yet written)"]),
  "REFLECTION — "+({written:"Written notes",spoken:"Spoken explanation",visual:"Visual explanation"}[w.reflectionMode]||"Written notes"),
  "What changed in my thinking:",w.reflection?.learning||(w.reflectionMode==="written"?"(Not yet written)":"(Completed outside the studio)"),
  "Where I will apply this next:",w.reflection?.transfer||(w.reflectionMode==="written"?"(Not yet written)":"(Completed outside the studio)"),
  "NEXT STEP\nShare your work and seek feedback through a school-approved process. Your notes have not been uploaded to this website."
 ].join("\n\n");
}
function downloadPlan(){
 const l=currentLesson();if(!l)return;
 const w=getPractice(l.id);
 try{
  const blob=new Blob([planText(l,w)],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download="AI-CJ-"+l.id+"-learning-notes.txt";
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  w.notesDirty=false;
  showNotice("Notes downloaded. Keep the file private and save it somewhere you can find it.");
 }catch(_){showNotice("Downloading was unavailable. Try copying your notes instead.");}
}
function exportProgress(){
 try{
  const scopedRecords=Object.fromEntries(Object.entries(state.records).filter(([id])=>LESSON_BY_ID[id]?.grade===state.grade));
  const scopedLegacy=Object.fromEntries(Object.entries(state.legacyDone).filter(([id])=>LESSON_BY_ID[id]?.grade===state.grade));
  const scopedDiagnostics=state.diagnostics[state.grade]?{[state.grade]:state.diagnostics[state.grade]}:{};
  const payload={schemaVersion:STORAGE_SCHEMA,format:"AI-CJ-local-progress",exportedAt:new Date().toISOString(),grade:state.grade,records:scopedRecords,diagnostics:scopedDiagnostics,legacyDone:scopedLegacy};
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="AI-CJ-learning-progress.json";
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  notice="Progress file downloaded. Keep it private.";render();
 }catch(_){notice="This browser could not download the progress file.";render();}
}
async function importProgress(file){
 if(!file||file.size>250000){notice="Choose a progress JSON file smaller than 250 KB.";render();return;}
 try{
  const data=JSON.parse(await file.text());
  if(data.format!=="AI-CJ-local-progress"||data.schemaVersion!==STORAGE_SCHEMA||typeof data.records!=="object"||data.records===null||!GRADES[data.grade])throw Error("Unsupported backup format");
  if(+data.grade!==state.grade){notice="This backup belongs to Grade "+data.grade+". You are currently in Grade "+state.grade+". Change your preview grade first to import it.";render();return;}
  if(window.confirm&&!window.confirm("Import this backup and replace the progress saved in this browser?"))return;
  const cleanRecords={};
  for(const [id,r] of Object.entries(data.records)){
   if(!LESSON_BY_ID[id]||LESSON_BY_ID[id].grade!==state.grade||!r||typeof r!=="object")continue;
   const knowledgePassed=!!r.knowledgePassed,practicePassed=!!r.practicePassed,modelSeen=!!r.modelSeen,applied=!!r.applied;
   cleanRecords[id]={
    knowledgePassed,practicePassed,modelSeen,applied,
    completed:!!r.completed&&knowledgePassed&&practicePassed&&applied,
    reflected:!!r.reflected,
    attempts:Math.min(1000,Math.max(0,Math.trunc(+r.attempts||0))),
    lastStage:Math.min(4,Math.max(0,Math.trunc(+r.lastStage||0))),
    lastOpenedAt:Math.min(Date.now(),Math.max(0,Math.trunc(+r.lastOpenedAt||0)))
   };
  }
  const cleanDiagnostics={};
  for(const grade of [state.grade]){
   const d=data.diagnostics?.[grade];
   if(d?.completed&&Array.isArray(d.answers)&&d.answers.length===6&&d.answers.every(n=>Number.isInteger(n)&&n>=0&&n<=2)){cleanDiagnostics[grade]={answers:d.answers.slice(),completed:true};}
  }
  const otherRecords=Object.fromEntries(Object.entries(state.records).filter(([id])=>LESSON_BY_ID[id]?.grade!==state.grade));
  const otherDiagnostics=Object.fromEntries(Object.entries(state.diagnostics).filter(([grade])=>+grade!==state.grade));
  const otherLegacy=Object.fromEntries(Object.entries(state.legacyDone).filter(([id])=>LESSON_BY_ID[id]?.grade!==state.grade));
  state.records={...otherRecords,...cleanRecords};state.diagnostics={...otherDiagnostics,...cleanDiagnostics};state.legacyDone=otherLegacy;practice={};persist();goto("profile");
  notice="Your progress has been imported for this browser. No student work was uploaded.";render();
 }catch(_){notice="We couldn't read that progress file. Your existing progress is unchanged.";render();}
}

function welcome(){
 const linked=pendingSharedLesson&&LESSON_BY_ID[pendingSharedLesson];
 return '<main id="main-content" class="welcome-panel grade-entry page">'+
 '<div class="welcome-brand">'+BRAND_MARK+'<span>THE LEARNING STUDIO</span></div>'+
 '<div class="eyebrow">AI Capacity × Judgement</div>'+
 '<h1 id="main-title" tabindex="-1">Your grade. Your learning.</h1>'+
 '<p class="grade-entry-intro">Choose your grade to explore AI Capacity and AI Judgement through learning designed for you.</p>'+
 (linked?'<p class="welcome-deeplink" role="status">A Grade '+linked.grade+' lesson was shared with you: <strong>'+esc(linked.title)+'</strong>. Choose Grade '+linked.grade+' to open it.</p>':"")+
 '<div class="grade-entry-grid" role="group" aria-label="Choose your grade">'+Object.entries(GRADES).map(([g,details])=>
 '<button type="button" class="grade-entry-card" data-action="pick-grade" data-pick="'+g+'" aria-label="Enter Grade '+g+': '+esc(details.headline)+'">'+
 '<span class="grade-entry-number">Grade <strong>'+g+'</strong></span>'+
 '<strong class="grade-entry-title">'+esc(details.headline)+'</strong>'+
 '<span class="grade-entry-description">'+esc(details.subtitle)+'</span>'+
 '<span class="grade-entry-arrow">Explore Grade '+g+' <span aria-hidden="true">↗</span></span></button>').join("")+'</div>'+
 '<p class="grade-entry-footnote">One grade at a time · Six modules per grade · Two connected pathways</p>'+
 '<p class="privacy-note grade-entry-privacy">Public preview: your selection is saved only in this browser. School login and verified grade access are not yet enabled.</p>'+
 '</main>';
}
function render(focus,targetId="main-title"){if(document.documentElement?.dataset)document.documentElement.dataset.reading=state.reading;$("#app").innerHTML='<div class="site"><button type="button" class="skip-link" data-action="skip-main">Skip to main content</button>'+nav()+(state.page==="welcome"?welcome():state.page==="home"?home():state.page==="courses"?courses():state.page==="diagnostic"?diagnostic():state.page==="snapshot"?snapshot():state.page==="lesson"?lesson():state.page==="about"?about():profile())+foot()+'<div id="global-announcer" class="site-toast '+(notice?"is-visible":"")+'" role="status" aria-live="polite">'+esc(notice)+'</div></div>';
const track=$(".step-track");
if(track?.querySelector){
  const active=track.querySelector(".step-dot.active");
  if(active&&track.scrollWidth>track.clientWidth){
    const left=active.offsetLeft-track.offsetLeft-(track.clientWidth-active.clientWidth)/2;
    track.scrollLeft=Math.max(0,left);
  }
}
const mainElement=$("#main-content");if(mainElement)mainElement.tabIndex=-1;const pageTitle=state.page==="lesson"?(currentLesson()?.title||"Lesson"):state.page==="courses"?"Grade "+state.grade+" courses":state.page==="snapshot"?"My learning":state.page==="diagnostic"?"Starting snapshot":state.page==="profile"?"My profile":state.page==="about"?"About the approach":state.page==="home"?"Home":"Learning Studio";document.title=pageTitle+" · AI Capacity × Judgement";if(focus){const main=$("#"+targetId)||$("#main-title");if(main)main.focus({preventScroll:true})}}
function routePath(page){if(page==="courses")return "/grade/"+state.grade+(state.track!=="all"?"/"+state.track:"");if(page==="snapshot")return "/grade/"+state.grade+"/snapshot";if(page==="diagnostic")return "/grade/"+state.grade+"/check-in";if(page==="lesson")return "/lesson/"+state.lessonId;return "/"+(page==="welcome"?"welcome":page);}
function writeRoute(replace){const url="#"+routePath(state.page);if(!window.location||window.location.hash===url)return;if(window.history&&typeof window.history.pushState==="function"){window.history[replace?"replaceState":"pushState"]({},"",url);}else{window.location.hash=url;}}
function readRoute(){
 const hash=window.location?.hash||"";
 if(!state.gradeChosen||!hash.startsWith("#/"))return false;
 const path=hash.slice(1);
 const allowed=v=>Object.prototype.hasOwnProperty.call(GRADES,String(v));
 // Preview navigation barrier only: an authenticated SharePoint deployment must
 // enforce grade entitlements at the server, not by trusting this JavaScript.
 const outsideGrade=g=>{
  if(+g===state.grade)return false;
  state.page="courses";state.track="all";state.lessonId="";
  notice="You are in the Grade "+state.grade+" learning space. Use your profile to return to the preview grade selector.";
  writeRoute(true);return true;
 };
 let m=path.match(/^\/grade\/(\d+)\/(capacity|judgement)$/);
 if(m&&allowed(m[1])){if(outsideGrade(m[1]))return true;state.track=m[2];state.page="courses";return true;}
 m=path.match(/^\/grade\/(\d+)\/(snapshot|check-in)$/);
 if(m&&allowed(m[1])){if(outsideGrade(m[1]))return true;state.page=m[2]==="snapshot"?"snapshot":"diagnostic";return true;}
 m=path.match(/^\/grade\/(\d+)$/);
 if(m&&allowed(m[1])){if(outsideGrade(m[1]))return true;state.track="all";state.page="courses";return true;}
 m=path.match(/^\/lesson\/(\d+)-([A-Z]\d+)$/);
 if(m&&allowed(m[1])&&LESSON_BY_ID[m[1]+"-"+m[2]]){
  if(outsideGrade(m[1]))return true;
  state.lessonId=m[1]+"-"+m[2];state.page="lesson";
  getPractice(state.lessonId);checkpoint(state.lessonId,getPractice(state.lessonId).stage);
  return true;
 }
 if(path==="/welcome"){state.page="courses";state.track="all";writeRoute(true);return true;}
 if(["/home","/about","/profile"].includes(path)){state.page=path.slice(1);return true;}
 return false;
}
function goto(page,opts={}){if(!state.gradeChosen&&page!=="welcome")page="welcome";if(window.speechSynthesis?.speaking)window.speechSynthesis.cancel();if(page!=="profile")confirmClear=false;state.page=page;notice="";if(!opts.fromHistory)writeRoute(!!opts.replace);render(true,opts.focusStage?"stage-title":"main-title");if(window.scrollTo)window.scrollTo({top:0,behavior:"auto"});}
function gradeTo(g){
 if(!Object.prototype.hasOwnProperty.call(GRADES,String(g)))return;
 if(state.gradeChosen&&state.grade!==+g){showNotice("You are viewing Grade "+state.grade+". Use Change grade in your profile to return to the preview selector.");return;}
 state.grade=+g;state.gradeChosen=true;state.name=state.name||"Learner";state.track="all";
 const shared=pendingSharedLesson&&LESSON_BY_ID[pendingSharedLesson]?.grade===state.grade?pendingSharedLesson:"";
 pendingSharedLesson="";persist();
 if(shared)openLesson(shared);else goto("courses",{replace:true});
}
function openLesson(id){if(!state.gradeChosen||!LESSON_BY_ID[id]||LESSON_BY_ID[id].grade!==state.grade){showNotice("Choose your grade first. Lessons outside your current grade are not available in this preview.");return;}if(state.page!=="courses")state.track="all";state.lessonId=id;getPractice(id);checkpoint(id,getPractice(id).stage||0);goto("lesson");}
function checkActivity(){
 const l=currentLesson(),a=ACTIVITIES[l.id],w=getPractice(l.id),r=getRecord(l.id),guide=LEARNING_SCAFFOLDS[l.id];
 if(LEARNING_LABS[l.id]&&(w.labModesSeen||[]).length<2&&!r.practicePassed){showNotice("Explore two laboratory conditions and compare the evidence before checking the guided challenge.");return;}
 let passed=false,feedback="",details=[],nextStep="";
 if(a.kind==="sort"){
  const selected=a.items.map((item,i)=>w.sort[i]);
  if(selected.some(x=>x===undefined)){w.feedback={passed:false,message:"Choose a category for every example before checking."};w.checked=false;render();return;}
  const missed=a.items.map((item,i)=>selected[i]===item[1]?null:{item,index:i}).filter(Boolean);
  passed=missed.length===0;
  feedback=passed?"All examples matched the intended classifications. Explain why the categories fit.":(a.items.length-missed.length)+" of "+a.items.length+" classifications match. Focus on the examples below, then try again.";
  details=missed.map(({item,index})=>"Example "+(index+1)+": "+item[2]);
 }else if(a.kind==="sequence"){
  passed=a.steps.every((step,i)=>w.order[i]===i);
  if(passed){feedback="This is a useful sequence. Real design processes often loop back after feedback.";}
  else{
   const first=w.order.findIndex((item,i)=>item!==i);
   feedback="The sequence needs another look. Consider what must happen before the step currently in position "+(first+1)+".";
   details=["Currently at that position: "+a.steps[w.order[first]]+". Decide which step it depends on."];
  }
 }else{
  if(w.selected===null){w.feedback={passed:false,message:"Choose an option first."};render();return;}
  if((w.reason||"").trim().length<25){w.feedback={passed:false,message:"Explain why you chose this option before checking. Your explanation is not automatically graded."};render();return;}
  passed=w.selected===a.correct;
  feedback=a.options[w.selected][a.kind==="prompt"?2:1];
  if(passed)feedback+=" The choice matches this activity's intended response; your written explanation has not been assessed.";
 }
 nextStep=passed?guide.stretch:guide.support;
 w.checked=true;w.feedback={passed,message:feedback,nextStep,details};
 r.attempts=(r.attempts||0)+1;
 if(passed){r.practicePassed=true;w.retrying=false;}
 persist();render();
 const feedbackEl=$("#activity-feedback");if(feedbackEl)feedbackEl.focus({preventScroll:true});
}
function recordReflection(){const l=currentLesson(),w=getPractice(l.id),r=getRecord(l.id);const fields=w.fields||{};const minNotes=w.format==="written"?35:18;const sufficient=["purpose","decision","evidence","work","revision"].every(key=>(fields[key]||"").trim().length>=minNotes);if(!r.knowledgePassed||!w.modelSeen||!r.practicePassed||!sufficient||!w.confirmed){showNotice("Complete the learning sequence and explain your application first.");return;}r.applied=true;r.reflected=false;r.completed=false;w.stage=4;checkpoint(l.id,4);goto("lesson",{focusStage:true});}
function reflectionReady(w){return !!(w.reflectionConfirmed&&(w.reflectionMode!=="written"||["learning","transfer"].every(x=>(w.reflection?.[x]||"").trim().length>=25)));}
function finishReflection(){const l=currentLesson(),w=getPractice(l.id),r=getRecord(l.id);if(!r.applied||!r.practicePassed||!reflectionReady(w)){showNotice("Complete both reflection questions, or explain them in your chosen format, before finishing.");return;}r.reflected=true;r.completed=true;w.stage=4;checkpoint(l.id,4);goto("lesson",{focusStage:true});}
function updateReflectionButton(){const w=getPractice(state.lessonId),button=$('[data-action="finish-reflection"]');if(button)button.disabled=!reflectionReady(w);}
document.addEventListener("click",async(e)=>{
const t=e.target.closest("[data-action],[data-grade],[data-lesson]");if(!t)return;if(t.tagName==="A"&&typeof e.preventDefault==="function")e.preventDefault();
if(t.dataset.grade){gradeTo(t.dataset.grade);return;}
if(t.dataset.lesson){openLesson(t.dataset.lesson);return;}
const action=t.dataset.action;
if(action==="skip-main"){const main=$("#main-content");if(main?.focus)main.focus({preventScroll:true});return}
if(["home","courses","about","snapshot","profile"].includes(action)){goto(action);return}
if(action==="enter"){goto("welcome");return}
if(action==="pick-grade"){gradeTo(t.dataset.pick);return}
// Backward-compatible action for older local tests; no extra welcome step is displayed.
if(action==="guest"){if(!state.gradeChosen)gradeTo(state.grade);return}
if(action==="switch-grade"){if(window.AUTH_CONFIG?.deployment==="sharepoint"){showNotice("Your grade is assigned by your school.");return;}state.gradeChosen=false;state.track="all";state.lessonId="";pendingSharedLesson="";persist();goto("welcome",{replace:true});return}
if(action==="export-progress"){exportProgress();return}
if(action==="reading"){state.reading=state.reading==="comfortable"?"standard":"comfortable";persist();render();return}
if(action==="track"){state.track=t.dataset.track;persist();goto("courses");return}
if(action==="diagnostic"||action==="retake"){beginDiagnostic();return}
if(action==="diag-prev"){if(diagnosticRun&&diagnosticRun.index>0){diagnosticRun.index--;render(true,"diagnostic-question")}return}
if(action==="diag-next"){if(!diagnosticRun)return;let idx=diagnosticRun.index;if(diagnosticRun.answers[idx]===null)return;if(idx<5){diagnosticRun.index++;render(true,"diagnostic-question")}else{state.diagnostics[state.grade]={answers:diagnosticRun.answers.slice(),completed:true,updated:new Date().toISOString()};diagnosticRun=null;persist();goto("snapshot")}return}
if(action==="listen"){const speech=window.speechSynthesis,Utterance=window.SpeechSynthesisUtterance;if(!speech||!Utterance){notice="Read-aloud is not available in this browser.";const ann=document.querySelector("#global-announcer");if(ann)ann.textContent=notice;return;}const w=getPractice(state.lessonId),k=KNOWLEDGE[state.lessonId],text=k.core[Math.min(2,w.topicIndex||0)];speech.cancel();const u=new Utterance(text);u.lang="en";u.rate=0.93;speech.speak(u);return}
if(action==="concept-next"){const w=getPractice(state.lessonId);w.topicIndex=Math.min(2,(w.topicIndex||0)+1);w.maxTopic=Math.max(w.maxTopic||0,w.topicIndex);render(true,"stage-title");return}
if(action==="concept"){const w=getPractice(state.lessonId),n=+t.dataset.index;if(n>=0&&n<=2&&n<=(w.maxTopic||0))w.topicIndex=n;render(true);return}
if(action==="knowledge-check"){const l=currentLesson(),w=getPractice(l.id),r=getRecord(l.id),k=KNOWLEDGE[l.id];if(w.topicIndex!==2||w.knowledgeAnswer===null)return;const passed=w.knowledgeAnswer===k.check[2];w.knowledgeFeedback={passed};if(passed){r.knowledgePassed=true;checkpoint(l.id,0);}else{w.knowledgeMisses=(w.knowledgeMisses||0)+1;persist();}render(true,"knowledge-feedback");return}
if(action==="model-reveal"){const w=getPractice(state.lessonId);w.modelSeen=true;getRecord(state.lessonId).modelSeen=true;checkpoint(state.lessonId,1);render(true,"worked-model");return}
if(action==="apply-prev"){const w=getPractice(state.lessonId);w.applyStep=Math.max(0,(w.applyStep||0)-1);render(true,"apply-heading");return}
if(action==="apply-next"){const w=getPractice(state.lessonId);const fields=w.fields||{};if(w.applyStep===1&& !["purpose","decision","evidence"].every(k=>(fields[k]||"").trim().length>=(w.format==="written"?35:18)))return;w.applyStep=Math.min(2,(w.applyStep||0)+1);render(true,"apply-heading");return}
if(action==="context-choice"){const w=getPractice(state.lessonId),n=+t.dataset.index;if(n===0||n===1)w.context=n;render();const selected=$(`[data-action="context-choice"][data-index="${n}"]`);if(selected?.focus)selected.focus({preventScroll:true});return}
if(action==="format-choice"){const w=getPractice(state.lessonId);if(["written","visual","talk"].includes(t.dataset.format))w.format=t.dataset.format;render();const chosen=$(`[data-action="format-choice"][data-format="${w.format}"]`);if(chosen?.focus)chosen.focus({preventScroll:true});return}
if(action==="copy-plan"){
 const l=currentLesson(),w=getPractice(l.id),text=planText(l,w);
 if(typeof navigator!=="undefined"&&navigator.clipboard?.writeText){
  navigator.clipboard.writeText(text).then(()=>{w.notesDirty=false;showNotice("Notes copied. Paste them into a school-approved place to keep them.");})
   .catch(()=>showNotice("Copy was unavailable. Download your notes instead."));
 }else showNotice("Copy is unavailable in this browser. Download your notes instead.");
 return;
}
if(action==="download-notes"){downloadPlan();return}
if(action==="stage"){const l=currentLesson(),w=getPractice(l.id),step=+t.dataset.stage,r=getRecord(l.id);if((step===1&&!r.knowledgePassed)||(step===2&&!w.modelSeen)||(step===3&&!r.practicePassed)||(step===4&&!r.applied))return;w.stage=Math.min(4,Math.max(0,step));checkpoint(l.id,w.stage);goto("lesson",{focusStage:true});return}
if(action==="prev"){const w=getPractice(state.lessonId);w.stage=Math.max(0,(w.stage||0)-1);checkpoint(state.lessonId,w.stage);goto("lesson",{focusStage:true});return}
if(action==="next"){const w=getPractice(state.lessonId),r=getRecord(state.lessonId);if((w.stage===0&&!r.knowledgePassed)||(w.stage===1&&!w.modelSeen)||(w.stage===2&&!r.practicePassed))return;w.stage=Math.min(3,(w.stage||0)+1);checkpoint(state.lessonId,w.stage);goto("lesson",{focusStage:true});return}
if(action==="reveal-example"){const w=getPractice(state.lessonId);w.exampleOpen=!w.exampleOpen;render();return}
if(action==="check"){checkActivity();return}
 if(action==="lab-adjust"){
  const l=currentLesson(),w=getPractice(l.id),lab=LEARNING_LABS[l.id];
  if(!lab||!w.labMode)return;
  const allowed={discriminate:["changed"],classifier:["oakShade","mapleBright","lightingWeight"],feed:["evidenceWeight"],evaluation:["errorCost"],decision:["priority"],benchmark:["threshold","severity"],provenance:["standard"],workflow:["incident"],governance:["access"]};
  const key=t.dataset.setting,raw=t.dataset.value;
  if(!allowed[lab.kind]?.includes(key))return;
  const choices={changed:[0,1],oakShade:[0,1],mapleBright:[0,1],lightingWeight:[0,1,2,3],evidenceWeight:[20,50,65,90],errorCost:[0,1],priority:["inclusion","privacy","speed"],threshold:[50,65,80],severity:[1,3,5],standard:["headlines","independent"],incident:["missing","outage","privacy"],access:["standard","language","assistive"]};
  const value=["priority","standard","incident","access"].includes(key)?raw:Number(raw);
  if(!choices[key]?.includes(value))return;
  w.labTuning=w.labTuning||{};w.labTuning[w.labMode]=w.labTuning[w.labMode]||{};
  w.labTuning[w.labMode][key]=value;
  render();const result=$("#lab-result");if(result?.focus)result.focus({preventScroll:true});return;
 }
 if(action==="lab-mode"){
  const l=currentLesson();if(!l||!LEARNING_LABS[l.id])return;
  const lab=LEARNING_LABS[l.id],mode=t.dataset.mode;
  if(!lab.modes.some(x=>x[0]===mode))return;
  const w=getPractice(l.id);w.labMode=mode;
  if(!w.labModesSeen.includes(mode))w.labModesSeen.push(mode);
  render();
  const result=$("#lab-result");if(result?.focus)result.focus({preventScroll:true});
  return;
 }
 if(action==="coach-route"){const w=getPractice(state.lessonId),route=t.dataset.route;if(["independent","support","stretch"].includes(route)){w.coachMode=route;render();const panel=$("#coach-panel");if(panel?.focus)panel.focus({preventScroll:true});}return}
 if(action==="coach-revisit"){const id=state.lessonId;if(!getRecord(id).knowledgePassed)return;const w=getPractice(id);w.stage=1;checkpoint(id,1);goto("lesson",{focusStage:true});return}
if(action==="retry"){const w=getPractice(state.lessonId);w.checked=false;w.feedback=null;w.retrying=true;render();return}
if(action==="move"){const w=getPractice(state.lessonId),i=+t.dataset.index,j=i+(+t.dataset.dir);if(j<0||j>=w.order.length)return;const temp=w.order[i];w.order[i]=w.order[j];w.order[j]=temp;w.checked=false;w.feedback=null;render();return}
if(action==="record"){recordReflection();return}
if(action==="finish-reflection"){finishReflection();return}
if(action==="saveprofile"){state.name=($("#profile-name")?.value||"Learner").trim().slice(0,40)||"Learner";persist();goto("profile");showNotice("Your display alias was saved on this device.");return}
if(action==="logout"){confirmClear=true;render();const warning=$("#clear-warning");if(warning?.focus)warning.focus();return}
if(action==="cancel-clear"){confirmClear=false;render();return}
if(action==="confirm-clear"){try{localStorage.removeItem(KEY);localStorage.removeItem(OLD_KEY)}catch(_){}Object.assign(state,{name:"",grade:6,gradeChosen:false,track:"all",reading:"standard",records:{},diagnostics:{},legacyDone:{},page:"welcome",lessonId:""});practice={};confirmClear=false;document.documentElement.dataset.reading="standard";diagnosticRun=null;goto("welcome");return}
});
document.addEventListener("change",(e)=>{
const t=e.target;
if(t.name==="diagnostic-choice"&&diagnosticRun){diagnosticRun.answers[diagnosticRun.index]=+t.value;render();const chosen=$('input[name="diagnostic-choice"]:checked');if(chosen?.focus)chosen.focus();return}
if(t.name==="knowledge-choice"){const w=getPractice(state.lessonId);w.knowledgeAnswer=+t.value;w.knowledgeFeedback=null;render();const selected=$('input[name="knowledge-choice"]:checked');if(selected?.focus)selected.focus();return}
if(t.name==="activity-choice"){const w=getPractice(state.lessonId);w.selected=+t.value;w.checked=false;w.feedback=null;render();const selected=$('input[name="activity-choice"]:checked');if(selected?.focus)selected.focus();return}
if(t.id==="import-progress"){const file=t.files?.[0];if(file)importProgress(file);return}

if(t.dataset?.sort!==undefined){const w=getPractice(state.lessonId),i=+t.dataset.sort;w.sort[i]=t.value===""?undefined:+t.value;w.checked=false;w.feedback=null;render();const choice=$("#sort-"+i);if(choice?.focus)choice.focus({preventScroll:true});return}
if(t.dataset?.seniorMilestone!==undefined){const l=currentLesson(),w=getPractice(l.id),i=Number(t.dataset.seniorMilestone),guide=CAPSTONE_GUIDES[l.id];if(!guide||!Number.isInteger(i)||i<0||i>=guide.phases.length)return;w.seniorMilestones[i]=!!t.checked;render();const next=$('[data-senior-milestone="'+i+'"]');if(next?.focus)next.focus({preventScroll:true});return;}
if(t.id==="project-confirm"){const w=getPractice(state.lessonId);w.confirmed=!!t.checked;updateProjectButton();return}
if(t.name==="reflection-mode"){const w=getPractice(state.lessonId);if(["written","spoken","visual"].includes(t.value))w.reflectionMode=t.value;render(true,"stage-title");return}
if(t.id==="reflection-confirm"){const w=getPractice(state.lessonId);w.reflectionConfirmed=!!t.checked;updateReflectionButton();return}
});
function updateProjectButton(){const w=getPractice(state.lessonId),f=w.fields||{},minNotes=w.format==="written"?35:18;const next=$('[data-action="apply-next"]');if(next&&w.applyStep===1)next.disabled=!["purpose","decision","evidence"].every(k=>(f[k]||"").trim().length>=minNotes);const b=$('[data-action="record"]');if(b)b.disabled=!(getRecord(state.lessonId).knowledgePassed&&getRecord(state.lessonId).practicePassed&&w.modelSeen&&w.confirmed&&["purpose","decision","evidence","work","revision"].every(k=>(f[k]||"").trim().length>=minNotes));}
document.addEventListener("input",(e)=>{
const t=e.target;
if(t.id==="practice-reason"){getPractice(state.lessonId).reason=t.value.slice(0,1200);return} if(t.dataset?.labObservation){getPractice(state.lessonId).labObservation=t.value.slice(0,900);return}
if(t.dataset?.planField){const w=getPractice(state.lessonId);if(!w.fields)w.fields={};w.fields[t.dataset.planField]=t.value.slice(0,2000);w.notesDirty=true;updateProjectButton();return}
if(t.dataset?.reflectField){const w=getPractice(state.lessonId);if(!w.reflection)w.reflection={};w.reflection[t.dataset.reflectField]=t.value.slice(0,2000);w.notesDirty=true;updateReflectionButton();return}
});
function syncHistory(){if(!state.gradeChosen){state.page="welcome";render(true);return;}if(readRoute()){persist();if(state.page==="diagnostic"&&!diagnosticRun)diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)};render(true);if(window.scrollTo)window.scrollTo(0,0);}}
window.addEventListener("beforeunload",e=>{
 if(Object.values(practice).some(w=>w?.notesDirty)){
  e.preventDefault();e.returnValue="";
 }
});
window.addEventListener("popstate",syncHistory);
window.addEventListener("hashchange",syncHistory);
if(state.gradeChosen){if(!readRoute()||state.page==="welcome")state.page="home";}else{const initialHash=window.location?.hash||"";
const shared=initialHash.match(/^#\/lesson\/(\d+)-([A-Z]\d+)$/);
if(shared&&LESSON_BY_ID[shared[1]+"-"+shared[2]]){pendingSharedLesson=shared[1]+"-"+shared[2];state.grade=+shared[1];}
else{const requested=initialHash.match(/^#\/(?:grade\/|lesson\/)(\d+)/);if(requested&&GRADES[requested[1]])state.grade=+requested[1];}
state.page="welcome";}
if(state.page==="diagnostic"&&!diagnosticRun)diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)};
render();
})();
