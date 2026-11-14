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
const defaults={name:"",grade:6,track:"all",records:{},diagnostics:{},legacyDone:legacy.done||{},reading:"standard",page:"welcome",lessonId:""};
const state=Object.assign({},defaults,previously);
state.records=state.records||{};
state.diagnostics=state.diagnostics||{};
state.legacyDone=state.legacyDone||{};
// Preserve prior activity as exploration, not as a claim of completing a deeper course.
Object.entries(state.records).forEach(([id,r])=>{if(r&&r.completed&&!r.knowledgePassed){state.legacyDone[id]=true;r.completed=false;r.reflected=false;}});
state.grade=Object.prototype.hasOwnProperty.call(GRADES,String(state.grade))?+state.grade:+Object.keys(GRADES)[0];
state.track=["all","capacity","judgement"].includes(state.track)?state.track:"all";
state.reading=["standard","comfortable"].includes(state.reading)?state.reading:"standard";
state.page=state.name?"home":"welcome";
let practice={};
let diagnosticRun=null;
let notice="";
function persist(){try{const data={schemaVersion:STORAGE_SCHEMA,name:state.name,grade:state.grade,track:state.track,reading:state.reading,records:state.records,diagnostics:state.diagnostics,legacyDone:state.legacyDone};localStorage.setItem(KEY,JSON.stringify(data))}catch(_){notice="Progress cannot be saved in this browser. Avoid private or restricted browsing modes.";}}
function count(grade){const a=LESSONS.filter(l=>l.grade===+grade);return {done:a.filter(l=>state.records[l.id]?.completed).length,total:a.length}}
function summary(grade){const k=count(grade);return Math.round(k.done/k.total*100)}
function currentLesson(){return LESSON_BY_ID[state.lessonId]}
function getRecord(id){if(!state.records[id])state.records[id]={attempts:0,practicePassed:false,reflected:false,completed:false,lastStage:0};return state.records[id]}
function stageName(record){if(!record)return "Not started";if(record.completed)return "Completed";if(record.practicePassed)return "Ready to apply";if(record.knowledgePassed&&record.modelSeen)return "Practising";if(record.knowledgePassed)return "Exploring examples";if(record.lastOpenedAt)return "Learning";return "Not started";}
function resumeLesson(grade){return LESSONS.filter(l=>l.grade===+grade&&!state.records[l.id]?.completed&&state.records[l.id]?.lastOpenedAt).sort((a,b)=>(state.records[b.id].lastOpenedAt||0)-(state.records[a.id].lastOpenedAt||0))[0]||null;}
function checkpoint(id,stage){const record=getRecord(id);record.lastStage=Math.max(record.lastStage||0,stage);record.lastOpenedAt=Date.now();persist();}
function gradeLane(grade,track){const n=pathInfo(grade,track);const pct=Math.round(n.done/n.total*100);return '<div class="lane lane-'+track+'"><div class="lane-top"><span>'+trackLabel(track)+'</span><strong>'+n.done+' / '+n.total+'</strong></div>'+progressBar(pct,trackLabel(track)+' modules practised')+'</div>';}
function getPractice(id){if(!practice[id]){const act=ACTIVITIES[id];const r=state.records[id]||{};const maxStage=r.completed?4:r.practicePassed?3:r.knowledgePassed?(r.modelSeen?2:1):0;const savedStage=Number.isInteger(r.lastStage)?r.lastStage:0;practice[id]={stage:Math.max(0,Math.min(savedStage,maxStage)),selected:null,sort:{},order:act&&act.kind==="sequence"?act.start.slice():[],checked:false,feedback:null,reflection:"",topicIndex:r.knowledgePassed?2:0,maxTopic:r.knowledgePassed?2:0,knowledgeAnswer:null,knowledgeFeedback:null,modelSeen:!!r.modelSeen,reason:"",context:0,format:"written",fields:{purpose:"",decision:"",evidence:"",work:"",revision:""},applyStep:0,confirmed:false};}return practice[id]}
function pathInfo(grade,track){const a=LESSONS.filter(l=>l.grade===+grade && l.track===track);return {done:a.filter(l=>state.records[l.id]?.completed).length,total:a.length}}
function score(grade){const d=state.diagnostics[grade];if(!d||!d.completed)return null;const correct={};d.answers.forEach((answer,i)=>{correct[DIAGNOSTICS[grade][i][0]]=answer===DIAGNOSTICS[grade][i][3]});const cap=["A1","A2","A3"].filter(s=>correct[s]).length;const jud=["B1","B2","B3"].filter(s=>correct[s]).length;return {correct,capacity:cap,judgement:jud};}
function recs(grade){const s=score(grade);return ["capacity","judgement"].map(track=>{
 const options=LESSONS.filter(l=>l.grade===grade && l.track===track).map(l=>{
 const r=state.records[l.id];const tried=r?.practicePassed;const done=r?.completed;
 const needs=s?!s.correct[l.strand]:true;
 const priority=(done?10:0)+(tried?3:0)+(needs?0:1);
 return {lesson:l,priority,reason:done?"Revisit to apply your learning in a new context":s?(needs?"Your starting snapshot suggests practice here could help.":"Build on what you already noticed in your starting snapshot."):"A useful starting point in this pathway."};
 }).sort((a,b)=>a.priority-b.priority);
 return options[0];
});}
function pickNext(grade,track="all"){const options=recs(grade).filter(x=>track==="all"||x.lesson.track===track);const incomplete=options.filter(x=>!state.records[x.lesson.id]?.completed);if(!incomplete.length)return options[0];return incomplete.sort((a,b)=>{const da=pathInfo(grade,a.lesson.track).done,db=pathInfo(grade,b.lesson.track).done;if(da!==db)return da-db;const s=score(grade);if(s){const sa=a.lesson.track==="capacity"?s.capacity:s.judgement,sb=b.lesson.track==="capacity"?s.capacity:s.judgement;return sa-sb;}return 0;})[0];}
const progressBar=(percent,label="Modules practised")=>'<div class="progress-line" role="progressbar" aria-label="'+esc(label)+'" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:'+percent+'%"></div></div>';
function trackLabel(track){return track==="capacity"?"AI Capacity":"AI Judgement"}
function mobileMenu(){return '<details class="mobile-menu"><summary aria-label="Open navigation menu">☰</summary><div class="mobile-menu-links"><button data-action="home">Home</button><button data-action="courses">My courses</button><button data-action="snapshot">My learning</button><button data-action="about">The idea</button><button data-action="profile">My profile</button></div></details>';}
function nav(){const comfort='<button class="comfort-toggle" data-action="reading" aria-pressed="'+(state.reading==="comfortable")+'" title="Toggle comfortable reading size" aria-label="'+(state.reading==="comfortable"?"Use standard text size":"Use larger text for reading")+'">Aa</button>';const item=(page,label)=>'<button class="navlink '+(state.page===page?"active":"")+'" data-action="'+page+'" '+(state.page===page?'aria-current="page"':'')+'>'+label+'</button>';return '<header class="topbar"><a href="#/home" class="brand" data-action="home" aria-label="AI Capacity and Judgement home"><span class="brand-mark">C<span>×</span>J</span><span>AI Capacity × Judgement<small>Learning Studio</small></span></a><nav class="top-actions" aria-label="Primary navigation">'+(state.name?item("home","Home")+item("courses","My courses")+item("snapshot","My learning")+item("about","The idea")+comfort+'<button class="avatar" data-action="profile" aria-label="Open learner profile">'+esc(state.name[0]||"L").toUpperCase()+'</button>':'<button class="btn btn-small" data-action="enter">Get started →</button>')+'</nav>'+(state.name?mobileMenu():"")+'</header>';}
function foot(){return '<footer class="footer"><div class="row"><span class="brand-mark">C<span>×</span>J</span><span>Growing capacity. Practising judgement.</span></div><span class="license">© 2026 Tim Evans · CC BY-NC-SA 4.0</span></footer>';}
function grades(){return '<div class="grade-grid">'+Object.entries(GRADES).map(([g,x])=>'<button class="grade-card '+(+g===state.grade?"selected":"")+'" data-grade="'+g+'" aria-label="Open Grade '+g+' courses"><b>'+g+'</b><strong>'+esc(x.headline)+'</strong><span>'+esc(x.subtitle)+'</span></button>').join("")+'</div>';}
function linkLesson(l,why){const record=state.records[l.id]||{},started=!!record.lastOpenedAt,stage=stageName(record),st=STRANDS.find(s=>s.id===l.strand),action=record.completed?"Revisit":started?"Continue":"Explore";return '<button type="button" class="lesson-card track-'+l.track+'" data-lesson="'+l.id+'" aria-label="'+action+' '+esc(l.title)+', Grade '+l.grade+', '+trackLabel(l.track)+', '+stage+'"><div class="lesson-tag"><span>'+esc(st.id)+' · '+esc(st.name)+'</span><span class="lesson-status '+(record.completed?"complete":started?"in-progress":"")+'">'+(record.completed?"✓ ":"")+stage+'</span></div><h3>'+esc(l.title)+'</h3><p>'+esc(l.objective)+'</p>'+(why?'<p class="recommend-reason">'+esc(why)+'</p>':"")+'<div class="end"><span>'+trackLabel(l.track)+'</span><span aria-hidden="true">'+action+' module ↗</span></div></button>';}
function home(){
 const g=GRADES[state.grade],n=count(state.grade),pct=summary(state.grade),resume=resumeLesson(state.grade),suggest=pickNext(state.grade);
 const chosen=resume||suggest.lesson,record=state.records[chosen.id]||{},taken=score(state.grade),review=!!record.completed;
 const actionLabel=review?"Revisit a module":resume?"Resume your lesson":"Start learning";
 return '<main id="main-content" class="page dashboard-home">'+
 '<section class="dashboard-hero max"><div class="dashboard-copy"><div class="eyebrow">Your learning studio · Grade '+state.grade+'</div>'+
 '<h1 id="main-title" tabindex="-1">Build what you <em>can do.</em><br>Know when it <em>matters.</em></h1>'+
 '<p class="hero-lead">Explore AI through ideas, decisions and real challenges. Learn first, then practise, create and reflect.</p>'+
 '<div class="hero-buttons"><button class="btn" data-lesson="'+chosen.id+'">'+actionLabel+' →</button><button class="btn btn-outline" data-action="courses">All Grade '+state.grade+' modules</button></div>'+
 '</div><aside class="dashboard-meter" aria-label="Learning overview"><div class="eyebrow">YOUR JOURNEY</div>'+
 '<div class="progress-orbit" style="--progress:'+pct+'%"><div class="orbit-inner"><strong>'+n.done+'<span> / '+n.total+'</span></strong><small>Modules<br>practised</small></div></div>'+
 '<p>Progress is practice—not a grade.</p></aside></section>'+
 '<section class="dashboard-main max" aria-label="Your next steps"><div class="dashboard-path-header"><div><div class="eyebrow">Keep moving forward</div><h2>One meaningful step at a time.</h2></div><div class="dashboard-switch"><span>Learning in</span><select aria-label="Choose grade" id="dashboard-grade">'+Object.keys(GRADES).map(x=>'<option value="'+x+'" '+(+x===state.grade?"selected":"")+'>Grade '+x+'</option>').join("")+'</select></div></div>'+
 '<div class="dashboard-next-grid"><article class="dashboard-next-card"><span class="eyebrow">'+(resume?"Continue your learning":review?"Revisit and transfer":"Suggested next module")+' · '+trackLabel(chosen.track)+'</span>'+
 '<div class="next-stage-indicator"><span class="pulse-dot" aria-hidden="true"></span>'+esc(stageName(record))+'</div>'+
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
function courses(){const g=GRADES[state.grade],k=count(state.grade),s=score(state.grade),resuming=resumeLesson(state.grade),best=resuming&&(state.track==="all"||state.track===resuming.track)?{lesson:resuming,reason:"Resume from your most recent learning stage."}:pickNext(state.grade,state.track),review=!!state.records[best.lesson.id]?.completed,all=LESSONS.filter(l=>l.grade===state.grade&&(state.track==="all"||l.track===state.track));return '<main id="main-content" class="course-page max page"><section class="course-intro"><div class="course-heading-row"><div><div class="eyebrow">My courses · MYP '+(state.grade-5)+'</div><h1 id="main-title" tabindex="-1" class="course-title">Grade '+state.grade+': '+esc(g.headline)+'</h1><p>'+esc(g.focus)+'</p></div><div class="course-progress"><strong>'+k.done+' <small>/ 6</small></strong><span>Modules practised</span>'+progressBar(summary(state.grade))+'</div></div><div class="course-grade-nav"><span>Change grade</span><div class="grade-mini">'+Object.keys(GRADES).map(x=>'<button class="grade-chip '+(state.grade===+x?"current":"")+'" aria-pressed="'+(state.grade===+x)+'" data-grade="'+x+'">'+x+'</button>').join("")+'</div></div></section><nav class="course-switcher" aria-label="Module pathways">'+[["all","All modules","6"],["capacity","AI Capacity","3"],["judgement","AI Judgement","3"]].map(x=>'<button data-action="track" data-track="'+x[0]+'" class="course-filter '+(state.track===x[0]?"selected":"")+'" aria-pressed="'+(state.track===x[0])+'">'+x[1]+' <span>'+x[2]+'</span></button>').join("")+'</nav><section class="course-featured" aria-labelledby="featured-heading"><div class="featured-copy"><span class="eyebrow">'+(review?"A skill worth revisiting":"A good place to begin")+' · '+trackLabel(best.lesson.track)+'</span><h2 id="featured-heading">'+esc(best.lesson.title)+'</h2><p>'+esc(best.lesson.objective)+'</p><p class="small featured-why">'+esc(best.reason)+'</p><button class="btn" data-lesson="'+best.lesson.id+'">'+(review?"Revisit lesson":"Open this lesson")+' →</button></div><aside class="featured-snapshot"><div class="eyebrow">Personalised learning</div><h3>'+(s?"Your next focus is ready.":"Find your starting point.")+'</h3><p>'+(s?"See your separate Capacity and Judgement insights and how your recommendations are chosen.":"Try six short questions across both pathways. No grades, no labels—just a starting point.")+'</p><button class="btn btn-outline btn-small" data-action="'+(s?"snapshot":"diagnostic")+'">'+(s?"See my snapshot":"Try a check-in")+' →</button></aside></section><section class="course-library" aria-labelledby="all-lessons-heading"><div class="section-top compact"><div><div class="eyebrow">Your learning library</div><h2 id="all-lessons-heading" class="smaller-heading">'+(state.track==="all"?"All six modules":trackLabel(state.track))+'</h2></div><span class="small muted">'+all.filter(l=>state.records[l.id]?.completed).length+' of '+all.length+' practised</span></div>'+["capacity","judgement"].filter(track=>state.track==="all"||state.track===track).map(track=>'<div class="strand-heading">'+(track==="capacity"?"01 · AI Capacity":"02 · AI Judgement")+' <span class="strand-count">'+pathInfo(state.grade,track).done+' / 3 practised</span></div><div class="lesson-grid">'+all.filter(l=>l.track===track).map(l=>linkLesson(l)).join("")+'</div>').join("")+'</section><div class="course-privacy"><span class="privacy-icon" aria-hidden="true">⌁</span> Preview mode: your progress stays in this browser. Reflections are not saved or shared.</div></main>';}
function beginDiagnostic(){diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)};goto("diagnostic")}
function diagnostic(){if(!diagnosticRun||diagnosticRun.grade!==state.grade){diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)}}const d=diagnosticRun,idx=d.index,q=DIAGNOSTICS[d.grade][idx],strand=STRANDS.find(s=>s.id===q[0]);return '<main id="main-content" class="lesson-layout page"><button class="back" data-action="courses">← Back to courses</button><div class="lesson-panel"><div class="eyebrow">Grade '+d.grade+' · Starting snapshot</div><h1 id="main-title" tabindex="-1">Find your next focus.</h1><p class="lead">Six short questions, one for each strand. This is a low-stakes starting point, not a score of your intelligence or a permanent position.</p><div class="check-progress"><span>Question '+(idx+1)+' of 6</span><span>'+trackLabel(strand.track)+'</span></div><div class="step-meter"><div style="width:'+((idx+1)/6*100)+'%"></div></div><fieldset class="challenge-box"><legend>'+esc(q[1])+'</legend><p class="small muted">Choose the response you think is strongest.</p><div class="option-list">'+q[2].map((option,i)=>'<label class="option '+(d.answers[idx]===i?"chosen":"")+'"><input type="radio" name="diagnostic-choice" value="'+i+'" '+(d.answers[idx]===i?"checked":"")+'><span class="option-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(option)+'</span></label>').join("")+'</div></fieldset><div class="step-controls"><button class="btn btn-outline" data-action="diag-prev" '+(idx===0?"disabled":"")+'>← Previous</button><button class="btn" data-action="diag-next" '+(d.answers[idx]===null?"disabled":"")+'>'+(idx===5?"See my learning snapshot →":"Continue →")+'</button></div><p class="privacy-note">Only your choices and the resulting practice suggestions are saved to this browser. You can retake the snapshot whenever you want.</p></div></main>';}
function quadrant(s){const active=(!s?"":s.capacity>=2?(s.judgement>=2?"high-high":"high-low"):(s.judgement>=2?"low-high":"low-low"));return '<div class="quadrant-map" role="group" aria-label="Capacity by Judgement developmental positions"><div class="quad-axis-top">Higher judgement ↑</div><div class="quadrant">'+[
 ["low-high","Discerning but Developing","Stronger judgement evidence; build practical fluency."],
 ["high-high","Discerning & Capable","Both pathways show encouraging evidence. Keep challenging yourself."],
 ["low-low","Emerging","Develop both practical skills and sound decisions."],
 ["high-low","Capable but Unreflective","Strengthen reflection, verification and consequences."]
 ].map(([id,n,desc])=>'<div class="quad '+(active===id?"quad-active":"")+'"><h3>'+esc(n)+'</h3><p>'+esc(desc)+'</p>'+(active===id?'<span class="quad-here">Current snapshot area</span>':"")+'</div>').join("")+'</div><div class="quad-bottom">← Lower capacity <span>Higher capacity →</span></div></div>';}
function reviewAnswers(grade){const d=state.diagnostics[grade];if(!d||!d.completed)return "";return '<details class="answer-review"><summary>Review my six starting decisions and feedback</summary><ol>'+DIAGNOSTICS[grade].map((q,i)=>'<li><strong>'+esc(q[1])+'</strong><p class="small">Your choice: '+esc(q[2][d.answers[i]])+'</p><p class="small '+(d.answers[i]===q[3]?"complete":"")+'">Most defensible choice: '+esc(q[2][q[3]])+'</p><p class="small muted">'+esc(q[4])+'</p></li>').join("")+'</ol></details>';}
function snapshot(){const s=score(state.grade);if(!s)return '<main id="main-content" class="max section page"><div class="eyebrow">Your learning</div><h1 id="main-title" tabindex="-1">Find your starting point.</h1><p class="muted" style="margin:16px 0">There is no snapshot for this grade yet. Your courses remain available either way.</p><button class="btn" data-action="diagnostic">Try six questions →</button><button class="btn btn-outline" data-action="courses" style="margin-left:8px">Explore courses</button></main>';const r=recs(state.grade);return '<main id="main-content" class="max section page"><div class="eyebrow">Grade '+state.grade+' · Learning snapshot</div><h1 id="main-title" tabindex="-1">Where could you go next?</h1><p class="hero-lead snapshot-intro">A small amount of evidence can suggest a useful next step, not define who you are. This snapshot reflects six decisions at one point in time and can change as you learn.</p><div class="two-col snapshot-top"><div class="info-card"><div class="eyebrow">Two separate pathways</div><div class="score-row"><div><span>AI Capacity</span><strong>'+s.capacity+' / 3</strong>'+progressBar(Math.round(s.capacity/3*100),"Capacity check-in responses")+'</div><div><span>AI Judgement</span><strong>'+s.judgement+' / 3</strong>'+progressBar(Math.round(s.judgement/3*100),"Judgement check-in responses")+'</div></div><p class="small muted">These are starting-question results, not curriculum grades or validated ability measures.</p><button class="btn btn-outline btn-small" data-action="retake" style="margin-top:15px">Try another snapshot</button></div><div class="info-card"><div class="eyebrow">What your answers showed</div><h3>Six strands, six starting clues.</h3><div class="strand-results">'+Object.values(STRANDS).map(st=>'<div><span>'+st.id+' · '+esc(st.name)+'</span><strong class="'+(s.correct[st.id]?"complete":"")+'">'+(state.records[state.grade+"-"+st.id]?.practicePassed?"✓ Practice check passed":s.correct[st.id]?"✓ Encouraging starting answer":"↗ Worth revisiting")+'</strong></div>').join("")+'</div></div></div><section class="snapshot-map"><div class="section-top compact"><div><div class="eyebrow">A lens for reflection</div><h2 class="smaller-heading">The Capacity × Judgement quadrant</h2></div></div>'+quadrant(null)+'<p class="quad-disclaimer">We do not place you in a quadrant using six short questions. Your choices and completed practice identify possible next steps; stronger evidence comes from trying new tasks in different contexts.</p></section><section class="section-narrow">'+reviewAnswers(state.grade)+'<div class="section-top compact"><div><div class="eyebrow">Learning recommendations</div><h2 class="smaller-heading">What might help you next?</h2></div></div><div class="lesson-grid">'+r.map(x=>linkLesson(x.lesson,x.reason)).join("")+'</div></section><button class="btn btn-outline" data-action="courses" style="margin-top:22px">See all Grade '+state.grade+' modules →</button></main>';}
function activityDescription(a){return a.intro||""}
function lessonSteps(){return ["Learn","Model","Practise","Apply","Reflect"];}
function activityHtml(l,w){const a=ACTIVITIES[l.id];if(!a)return '<p>Activity unavailable.</p>';let body='<div class="eyebrow">Interactive challenge · '+esc(a.kind==="sort"?"Classify":a.kind==="sequence"?"Build a workflow":a.kind==="prompt"?"Compare prompts":a.kind==="evidence"?"Check the evidence":"Make a decision")+'</div><h2>'+esc(a.title)+'</h2><p>'+esc(activityDescription(a))+'</p>';
if(a.kind==="sort")body+='<div class="sort-list">'+a.items.map((item,i)=>'<div class="sort-item"><div class="item-number">'+(i+1)+'</div><div class="sort-question"><p>'+esc(item[0])+'</p><label class="small" for="sort-'+i+'">Your classification</label><select id="sort-'+i+'" data-sort="'+i+'"><option value="">Choose a category…</option>'+a.categories.map((x,n)=>'<option value="'+n+'" '+(w.sort[i]===n?"selected":"")+'>'+esc(x)+'</option>').join("")+'</select>'+(w.checked?'<div class="item-feedback '+(w.sort[i]===item[1]?"right":"try-again")+'">'+(w.sort[i]===item[1]?"✓ ":"↗ ")+esc(item[2])+'</div>':"")+'</div></div>').join("")+'</div>';
if(["prompt","decision","evidence"].includes(a.kind))body+='<div class="option-list">'+a.options.map((item,i)=>'<label class="option '+(w.selected===i?"chosen":"")+'"><input type="radio" name="activity-choice" value="'+i+'" '+(w.selected===i?"checked":"")+'><span class="option-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(item[0])+'</span></label>').join("")+'</div>'+(w.checked&&a.kind==="prompt"&&w.selected!==null?'<div class="example-output"><strong>Illustrative response</strong><p>'+esc(a.options[w.selected][1])+'</p></div>':"");
if(["prompt","decision","evidence"].includes(a.kind))body+='<label for="practice-reason" class="input-label" style="margin-top:19px">Why do you think this is the strongest choice?</label><textarea id="practice-reason" rows="3" maxlength="1200" placeholder="I would choose this because…">'+esc(w.reason||"")+'</textarea><p class="small muted">Explain your reasoning in a sentence or two (at least 25 characters). This is a thinking exercise, not automatically graded writing.</p>';
if(a.kind==="sequence")body+='<p class="small muted" style="margin-bottom:13px">Move each step using the arrow buttons, then check your sequence. Other real-world processes may be iterative.</p><ol class="sequence-list">'+w.order.map((pos,i)=>'<li class="sequence-item"><span class="sequence-number">'+(i+1)+'</span><span class="sequence-text">'+esc(a.steps[pos])+'</span><div class="move-actions"><button class="move-btn" data-action="move" data-index="'+i+'" data-dir="-1" aria-label="Move '+esc(a.steps[pos])+' up" '+(i===0?"disabled":"")+'>↑</button><button class="move-btn" data-action="move" data-index="'+i+'" data-dir="1" aria-label="Move '+esc(a.steps[pos])+' down" '+(i===w.order.length-1?"disabled":"")+'>↓</button></div></li>').join("")+'</ol>';
if(w.feedback)body+='<div id="activity-feedback" class="feedback '+(w.feedback.passed?"feedback-good":"feedback-retry")+'" role="status" tabindex="-1"><strong>'+(w.feedback.passed?"Well reasoned. You have passed this check.":"Good attempt. Review the feedback and try again.")+'</strong><p>'+esc(w.feedback.message)+'</p>'+(a.tip?'<p class="small">'+esc(a.tip)+'</p>':"")+'</div>';
if(!getRecord(l.id).practicePassed||w.retrying)body+='<button class="btn" data-action="check" style="margin-top:20px">Check my thinking →</button>';else body+='<div class="mastery-note">✓ Challenge passed. You can move on to apply your thinking, or practise again.</div><button class="btn btn-outline btn-small" data-action="retry" style="margin-top:15px">Try challenge again</button>';
return body;}
function lesson(){const l=currentLesson();if(!l)return courses();const k=KNOWLEDGE[l.id],w=getPractice(l.id),r=getRecord(l.id),stage=Math.min(4,Number(w.stage)||0);if(!k)return '<main id="main-content" class="lesson-layout"><h1>Lesson not available</h1><button class="btn" data-action="courses">Return to courses</button></main>';
const example=k.example,ct=k.contexts||[],labels=lessonSteps();const activeContext=ct[w.context]||ct[0];const nextSuggested=recs(l.grade).map(x=>x.lesson).find(x=>x.id!==l.id&&!state.records[x.id]?.completed)||LESSONS.find(x=>x.grade===l.grade&&x.id!==l.id&&!state.records[x.id]?.completed);let body="";
if(stage===0){
 const index=Math.min(2,w.topicIndex||0),part=k.core[index];
 body='<div class="lesson-eyebrow"><span class="eyebrow">Build your understanding</span><span class="lesson-subprogress">Idea '+(index+1)+' of 3</span></div>'+
 '<h2>'+esc(["Start with the idea","Explore what it means","Use what you know"][index])+'</h2>'+
 '<p class="lesson-essence">'+esc(k.essential||l.principle)+'</p>'+
 '<div class="knowledge-panel"><div class="knowledge-number">0'+(index+1)+'</div><p>'+esc(part)+'</p></div><div class="learning-aid"><button class="btn btn-outline btn-small" data-action="listen">Listen to this idea</button><span class="small muted">Optional device read-aloud; no recording</span></div>'+
 '<div class="concept-pips" aria-label="Teaching sections">'+k.core.map((c,i)=>'<button class="concept-pip '+(i===index?"selected":"")+'" data-action="concept" data-index="'+i+'" '+(i>Math.max(index,w.maxTopic||0)?"disabled":"")+' aria-current="'+(i===index?"step":"false")+'">Idea '+(i+1)+'</button>').join("")+'</div>'+
 (index===2?
   '<div class="knowledge-glossary"><div class="eyebrow">Words worth knowing</div><div class="glossary-grid">'+k.glossary.map(([term,meaning])=>'<div><strong>'+esc(term)+'</strong><p>'+esc(meaning)+'</p></div>').join("")+'</div></div>'+
   '<fieldset class="challenge-box knowledge-check"><legend>Check your understanding</legend><p class="small muted">'+esc(k.check[0])+'</p><div class="option-list">'+k.check[1].map((choice,i)=>'<label class="option '+(w.knowledgeAnswer===i?"chosen":"")+'"><input type="radio" name="knowledge-choice" value="'+i+'" '+(w.knowledgeAnswer===i?"checked":"")+'><span class="option-letter">'+String.fromCharCode(65+i)+'</span><span>'+esc(choice)+'</span></label>').join("")+'</div></fieldset>'+
   (w.knowledgeFeedback?'<div class="feedback '+(w.knowledgeFeedback.passed?"feedback-good":"feedback-retry")+'" role="status"><strong>'+esc(w.knowledgeFeedback.passed?"You have the core idea.":"Review the explanation and try again.")+'</strong><p>'+esc(k.check[3]||l.principle)+'</p></div>':"")+
   (r.knowledgePassed?'<p class="mastery-note">✓ Understanding check passed. Next, examine a worked example.</p>':'<button class="btn" data-action="knowledge-check" '+(w.knowledgeAnswer===null?"disabled":"")+' style="margin-top:18px">Check my understanding →</button>')
  : '<div class="teaching-next"><button class="btn" data-action="concept-next">Continue reading →</button><span class="small muted">Learn the ideas before attempting a challenge.</span></div>');
}
if(stage===1){
 body='<div class="eyebrow">See how the thinking works</div><h2>Compare two approaches.</h2>'+
 '<p>Imagine this situation. Before reading the worked response, think about what you would do and what might go wrong.</p>'+
 '<div class="case-situation"><strong>The situation</strong><p>'+esc(l.scenario)+'</p></div>'+
 '<div class="worked-contrast"><div class="weak-example"><span class="worked-label">A weaker approach</span><p>'+esc(example[0])+'</p></div>'+
 (w.modelSeen?'<div class="strong-example"><span class="worked-label">A more thoughtful approach</span><p>'+esc(example[1])+'</p></div>':'<div class="model-hidden"><p>What would you change? Think first, then reveal another way.</p><button class="btn btn-outline" data-action="model-reveal">Reveal a stronger approach →</button></div>')+'</div>'+
 (w.modelSeen?'<div class="learning-principle"><div class="principle-symbol">✳</div><div><strong>Why this matters</strong><p>'+esc(l.principle)+'</p></div></div><div class="learning-discuss"><strong>Discuss or reflect</strong><p>How did the second approach change the purpose, the evidence or the thinking? What would you add?</p></div>':'<p class="small muted">The stronger example will appear when you choose to reveal it.</p>');
}
if(stage===2){
 body='<div class="eyebrow">Guided practice</div><h2>Try the idea yourself.</h2><p class="small muted">Use what you have learned to make a decision. Mistakes are part of the learning: feedback will help you improve.</p>'+activityHtml(l,w);
}
if(stage===3){
 const step=Math.min(2,w.applyStep||0);
 const fs=w.fields||{purpose:"",decision:"",evidence:"",work:"",revision:""};
 const planned=["purpose","decision","evidence"].every(x=>(fs[x]||"").trim().length>=35);
 const enough=planned&&["work","revision"].every(x=>(fs[x]||"").trim().length>=35);
 const progressNames=["Choose your challenge","Plan your approach","Create, test & improve"];
 const header='<div class="eyebrow">Apply what you know</div><h2>Make your learning matter.</h2>'+
 '<p>Use what you learned to respond to a meaningful problem. Work with an approved tool, teacher-provided examples or a non-AI alternative as appropriate.</p>'+
 '<nav class="apply-steps" aria-label="Your application journey">'+progressNames.map((name,i)=>'<div class="apply-step '+(step===i?"current":i<step?"passed":"")+'" '+(i===step?'aria-current="step"':"")+'><span>'+(i<step?"✓":i+1)+'</span>'+esc(name)+'</div>').join("")+'</nav>';
 let section="";
 if(step===0){
  const options=ct.map(([title,task],i)=>'<button class="context-card '+(w.context===i?"selected":"")+'" data-action="context-choice" data-index="'+i+'" aria-pressed="'+(w.context===i)+'"><span class="context-num">'+(i+1)+'</span><strong>'+esc(title)+'</strong><span>'+esc(task)+'</span></button>').join("");
  section='<h3 class="apply-heading">What would you like to work on?</h3><div class="context-grid">'+options+'</div>'+
  '<div class="context-brief"><strong>Your chosen challenge</strong><p>'+esc(activeContext[1])+'</p><p class="small muted">'+esc(l.activity)+'</p></div>'+
  '<div class="eyebrow" style="margin-top:24px">How would you like to express your work?</div><div class="mode-list">'+[["written","Write an explanation"],["visual","Sketch or storyboard"],["talk","Discuss or present"]].map(([id,label])=>'<button class="mode-option '+(w.format===id?"selected":"")+'" data-action="format-choice" data-format="'+id+'" aria-pressed="'+(w.format===id)+'">'+esc(label)+'</button>').join("")+'</div>'+
  '<p class="small muted">You may use paper, approved applications or a discussion with someone else. You are still responsible for the work and the decisions.</p>';
 }
 if(step===1){
  section='<h3 class="apply-heading">Think it through before you create.</h3><p class="small muted">Describe your purpose and the evidence you will use. Each answer needs at least 35 characters.</p>'+
  '<div class="project-notes"><label for="plan-purpose"><strong>1. What will you do, and who will benefit?</strong><span>Describe the problem, your goal and your audience.</span></label><textarea id="plan-purpose" data-plan-field="purpose" maxlength="2000" rows="3" placeholder="My goal is… The people who need this are…">'+esc(fs.purpose||"")+'</textarea>'+
  '<label for="plan-decision"><strong>2. Where does AI belong—or not belong?</strong><span>Explain your decision using something you learned.</span></label><textarea id="plan-decision" data-plan-field="decision" maxlength="2000" rows="3" placeholder="I would… because… I would avoid…">'+esc(fs.decision||"")+'</textarea>'+
  '<label for="plan-evidence"><strong>3. How will you check, listen and improve?</strong><span>Plan how you will gather evidence, test and seek feedback.</span></label><textarea id="plan-evidence" data-plan-field="evidence" maxlength="2000" rows="3" placeholder="I will test… Ask… Revise…">'+esc(fs.evidence||"")+'</textarea></div>';
 }
 if(step===2){
  section='<h3 class="apply-heading">Make, test and improve.</h3><p>Create a real work sample: a text, sketch, storyboard, experiment or presentation. Work may be created outside this site; describe what you tried and what changed.</p>'+
  '<div class="project-notes"><label for="plan-work"><strong>4. What did you actually create or try?</strong><span>Explain what your work sample included and how it responded to the need.</span></label><textarea id="plan-work" data-plan-field="work" maxlength="2000" rows="3" placeholder="I created or tried… Here is what it included…">'+esc(fs.work||"")+'</textarea>'+
  '<label for="plan-revision"><strong>5. What did testing or feedback change?</strong><span>Describe feedback or a self-check and one revision made or planned.</span></label><textarea id="plan-revision" data-plan-field="revision" maxlength="2000" rows="3" placeholder="My test or feedback showed… I revised or would revise…">'+esc(fs.revision||"")+'</textarea></div>'+
  '<div class="project-criteria"><strong>Before finishing, check that you:</strong><ul><li>Understand the idea well enough to explain it.</li><li>Made a reasoned AI-use or non-use decision.</li><li>Identified evidence or someone who can give feedback.</li><li>Made or tried something and can explain a revision.</li></ul></div>'+
  '<label class="confirm-line"><input type="checkbox" id="project-confirm" '+(w.confirmed?"checked":"")+'> I have actually made or tried something, reflected on feedback, and understand this site does not grade my work.</label>';
 }
 body=header+section+'<div class="application-actions">'+
 (step>0?'<button class="btn btn-outline" data-action="apply-prev">← Previous</button>':"")+
 '<button class="btn btn-outline" data-action="copy-plan">Copy my notes</button>'+
 (step<2?'<button class="btn" data-action="apply-next" '+(step===1&&!planned?"disabled":"")+'>Continue →</button>':
 '<button class="btn" data-action="record" '+(!r.practicePassed||!enough||!w.confirmed?"disabled":"")+'>Record my application →</button>')+
 '</div><p class="privacy-note">Written notes stay in this open tab only. Copy them before leaving, refreshing or closing the tab. Do not include personal or sensitive data.</p>';
}
if(stage===4){
 body='<div class="eyebrow">Review and move forward</div><h2>What will you do differently?</h2><div class="completion-mark" aria-hidden="true">✓</div>'+
 '<p>You studied three ideas, compared a worked example, passed a guided challenge and recorded a plan for applying the skill.</p>'+
 '<div class="completed-evidence"><div><strong>Understanding</strong><span>✓ Core idea checked</span></div><div><strong>Practice</strong><span>✓ Interactive challenge passed</span></div><div><strong>Application</strong><span>✓ Authentic plan recorded</span></div></div>'+
 '<div class="review-question"><strong>Take it further</strong><p>'+esc(k.essential)+'</p><p>Now consider: <em>What new situation could you apply this idea to, and whose feedback would help improve your approach?</em></p><p class="small muted">Your next step is to test your plan, collect feedback and revise. The platform records practice, not teacher-assessed mastery.</p></div>'+
 '<div class="hero-buttons">'+(nextSuggested?'<button class="btn" data-lesson="'+nextSuggested.id+'">Next: '+esc(nextSuggested.title)+' →</button>':'<button class="btn" data-action="courses">Explore more courses →</button>')+'<button class="btn btn-outline" data-action="snapshot">Review my learning →</button></div>';
}
const canContinue=stage===0?!!r.knowledgePassed:stage===1?!!w.modelSeen:stage===2?!!r.practicePassed:stage===3?!!r.applied:false;
return '<main id="main-content" class="lesson-layout page"><button class="back" data-action="courses">← Grade '+l.grade+' courses</button><article class="lesson-panel"><div class="breadcrumb">'+trackLabel(l.track)+' <span aria-hidden="true">/</span> '+esc(l.strand)+' <span aria-hidden="true">/</span> Grade '+l.grade+'</div><div class="eyebrow">Learning module · '+esc(l.title)+'</div><h1 id="main-title" tabindex="-1">'+esc(l.title)+'</h1><p class="lead">'+esc(l.objective)+'</p><div class="lesson-progress-heading"><span>Stage '+(stage+1)+' of 5 · '+labels[stage]+'</span><span>'+Math.round((stage+1)/5*100)+'%</span></div><div class="step-meter" role="progressbar" aria-label="Learning sequence progress" aria-valuenow="'+(stage+1)+'" aria-valuemin="0" aria-valuemax="5"><div style="width:'+((stage+1)/5*100)+'%"></div></div><nav class="step-track" aria-label="Lesson stages">'+labels.map((x,i)=>{const locked=(i===1&&!r.knowledgePassed)||(i===2&&!w.modelSeen)||(i===3&&!r.practicePassed)||(i===4&&!r.applied);return '<button class="step-dot '+(i===stage?"active":i<stage?"done":"")+'" data-action="stage" data-stage="'+i+'" '+(locked?"disabled":"")+' '+(i===stage?'aria-current="step"':"")+'><span class="step-number">'+(i<stage?"✓":i+1)+'</span><span>'+x+'</span></button>'}).join("")+'</nav><section class="step-content" aria-label="Current learning stage">'+body+'</section><div class="step-controls">'+(stage>0?'<button class="btn btn-outline" data-action="prev">← Previous stage</button>':'<button class="btn btn-outline" data-action="courses">Exit lesson</button>')+(stage<3?'<div class="continue-stack"><button class="btn" data-action="next" '+(!canContinue?"disabled":"")+'>Continue →</button>'+(!canContinue?'<span class="small muted">'+(stage===0?"Read all three ideas and pass the short check.":stage===1?"Reveal and consider the worked example.":"Complete the practice activity to continue.")+'</span>':"")+'</div>':stage===3?'<button class="btn btn-outline" data-action="courses">Return to courses</button>':'<button class="btn btn-outline" data-action="courses">Back to courses</button>')+'</div><div class="privacy-note">Learning preview · Your free-text drafts are not transmitted or saved. Only your lesson progress is recorded on this device.</div></article></main>';}

function about(){return '<main id="main-content" class="max section page"><div class="eyebrow">Why this approach?</div><h1 id="main-title" tabindex="-1">AI Capacity <span style="color:var(--red)">×</span> Judgement</h1><p class="hero-lead">Knowing how to use AI and knowing whether, when and why to use it are related but different forms of learning.</p><div class="snapshot-map">'+quadrant(null)+'<p class="quad-disclaimer">These positions guide conversation about learning needs. No one is permanently in one box; context, experience and purpose change what we can do.</p></div><div class="two-col"><div class="info-card"><div class="eyebrow">Curriculum A</div><h3>Build Capacity</h3><p>Understand AI, work with it and create thoughtfully. Practical skills, experiments and problem-solving.</p></div><div class="info-card"><div class="eyebrow">Curriculum B</div><h3>Grow Judgement</h3><p>Question evidence, preserve agency, respect others and evaluate consequences. Choosing not to use AI can be an excellent decision.</p></div></div><div class="app-banner"><div><h2>Learning for Grades 6–10</h2><p>Explore six strands through guided practice and authentic decisions.</p></div><button class="btn" data-action="courses">Explore courses →</button></div></main>';}
function profile(){const d=state.diagnostics[state.grade],n=count(state.grade);return '<main id="main-content" class="max page"><section class="profile-panel"><div class="eyebrow">Local learner profile</div><h1 id="main-title" tabindex="-1" class="course-title">Your learning, in your hands.</h1><p class="small muted">This prototype has no school accounts or central student records. Only learning progress and check-in choices are stored on this browser; project notes are never uploaded or saved here.</p><div class="field"><label for="profile-name">Display alias (avoid full names)</label><input id="profile-name" maxlength="40" autocomplete="off" value="'+esc(state.name)+'"></div><div class="profile-summary"><div><span class="eyebrow">Your current grade</span><strong>Grade '+state.grade+'</strong><small>'+esc(GRADES[state.grade].headline)+'</small></div><div><span class="eyebrow">Learning explored</span><strong>'+n.done+' / '+n.total+'</strong><small>Modules practised, not mastery grades</small></div></div>'+gradeLane(state.grade,"capacity")+gradeLane(state.grade,"judgement")+
 '<div class="profile-section"><h2>Reading comfort</h2><p>Choose a larger reading size for the teaching sections. Your preference stays on this device.</p><button class="btn btn-outline btn-small" data-action="reading">'+(state.reading==="comfortable"?"Use standard text size":"Use more spacious text")+' →</button></div>'+
 '<div class="profile-section"><h2>Keep a copy of your progress</h2><p>You can download a small JSON backup containing your module checkpoints and check-in selections, then import it on another device. It does not include your alias or written work. Keep the backup private.</p><div class="backup-actions"><button class="btn btn-outline" data-action="export-progress">Download my progress</button><label class="import-label" for="import-progress">Import progress file</label><input type="file" id="import-progress" accept=".json,application/json" aria-label="Import a previously downloaded learning progress file"></div><p class="small muted">Importing replaces this browser’s saved progress. A backup is not a secure student account or verified assessment record.</p></div>'+
 '<div class="profile-section"><h2>Privacy on shared devices</h2><p>Use the clear option when finished on a shared computer. This removes locally saved check-in answers and progress from this browser.</p><button class="btn btn-small btn-outline" data-action="logout">Clear this browser’s learner profile</button></div>'+
 (notice?'<div class="profile-feedback" role="status">'+esc(notice)+'</div>':"")+
 '<div class="hero-buttons"><button class="btn" data-action="saveprofile">Save alias</button><button class="btn btn-outline" data-action="courses">Return to courses</button></div></section></main>';}
function exportProgress(){
 try{
  const payload={schemaVersion:STORAGE_SCHEMA,format:"AI-CJ-local-progress",exportedAt:new Date().toISOString(),grade:state.grade,records:state.records,diagnostics:state.diagnostics,legacyDone:state.legacyDone};
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
  if(window.confirm&&!window.confirm("Import this backup and replace the progress saved in this browser?"))return;
  const cleanRecords={};
  for(const [id,r] of Object.entries(data.records)){
   if(!LESSON_BY_ID[id]||!r||typeof r!=="object")continue;
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
  for(const grade of [6,7,8,9,10]){
   const d=data.diagnostics?.[grade];
   if(d?.completed&&Array.isArray(d.answers)&&d.answers.length===6&&d.answers.every(n=>Number.isInteger(n)&&n>=0&&n<=2)){cleanDiagnostics[grade]={answers:d.answers.slice(),completed:true};}
  }
  state.records=cleanRecords;state.diagnostics=cleanDiagnostics;state.grade=+data.grade;state.legacyDone={};practice={};persist();goto("profile");
  notice="Your progress has been imported for this browser. No student work was uploaded.";render();
 }catch(_){notice="We couldn't read that progress file. Your existing progress is unchanged.";render();}
}

function welcome(){return '<main id="main-content" class="welcome-panel page"><div class="brand-mark" style="font-size:2rem">C<span>×</span>J</div><div class="eyebrow" style="margin-top:18px">AI Capacity × Judgement · Learning Studio</div><h1 id="main-title" tabindex="-1">Think bigger.<br>Choose wisely.</h1><p>Build skills to use AI well, and the judgement to know when, why and whether to use it.</p><div class="auth-selection"><div class="eyebrow">Step 1 · Choose your grade</div><div class="welcome-grades" role="group" aria-label="Choose your grade">'+Object.keys(GRADES).map(g=>'<button class="welcome-grade '+(state.grade===+g?"selected":"")+'" data-action="pick-grade" data-pick="'+g+'" aria-pressed="'+(state.grade===+g)+'">Grade '+g+'</button>').join("")+'</div><p class="welcome-stage">Grade '+state.grade+' · '+esc(GRADES[state.grade].headline)+'</p><div class="field"><label for="guest-name">Step 2 · Display alias <span class="muted">(optional)</span></label><input maxlength="40" id="guest-name" placeholder="Learner" autocomplete="off" aria-describedby="alias-help"><p id="alias-help" class="field-help">Use a nickname, not your full name. This is a local preview, not a school login.</p></div><button class="btn" data-action="guest" style="width:100%">Explore Grade '+state.grade+' courses →</button><p class="privacy-note">No school account · Progress stays on this device · No cloud sync</p></div></main>';}
function render(focus){if(document.documentElement?.dataset)document.documentElement.dataset.reading=state.reading;$("#app").innerHTML='<div class="site"><a href="#main-content" class="skip-link">Skip to main content</a>'+nav()+(state.page==="welcome"?welcome():state.page==="home"?home():state.page==="courses"?courses():state.page==="diagnostic"?diagnostic():state.page==="snapshot"?snapshot():state.page==="lesson"?lesson():state.page==="about"?about():profile())+foot()+'<div id="global-announcer" class="sr-only" aria-live="polite">'+esc(notice)+'</div></div>';const pageTitle=state.page==="lesson"?(currentLesson()?.title||"Lesson"):state.page==="courses"?"Grade "+state.grade+" courses":state.page==="snapshot"?"My learning":state.page==="diagnostic"?"Starting snapshot":state.page==="profile"?"My profile":state.page==="about"?"About the approach":state.page==="home"?"Home":"Learning Studio";document.title=pageTitle+" · AI Capacity × Judgement";if(focus){const main=$("#main-title");if(main)main.focus({preventScroll:true})}}
function routePath(page){if(page==="courses")return "/grade/"+state.grade+(state.track!=="all"?"/"+state.track:"");if(page==="snapshot")return "/grade/"+state.grade+"/snapshot";if(page==="diagnostic")return "/grade/"+state.grade+"/check-in";if(page==="lesson")return "/lesson/"+state.lessonId;return "/"+(page==="welcome"?"welcome":page);}
function writeRoute(replace){const url="#"+routePath(state.page);if(!window.location||window.location.hash===url)return;if(window.history&&typeof window.history.pushState==="function"){window.history[replace?"replaceState":"pushState"]({},"",url);}else{window.location.hash=url;}}
function readRoute(){
 const hash=window.location?.hash||"";
 if(!hash.startsWith("#/"))return false;
 const path=hash.slice(1);
 const allowed=(v)=>Object.prototype.hasOwnProperty.call(GRADES,String(v));
 let m=path.match(/^\/grade\/(\d+)\/(capacity|judgement)$/);
 if(m&&allowed(m[1])){state.grade=+m[1];state.track=m[2];state.page="courses";return true;}
 m=path.match(/^\/grade\/(\d+)\/(snapshot|check-in)$/);
 if(m&&allowed(m[1])){state.grade=+m[1];state.page=m[2]==="snapshot"?"snapshot":"diagnostic";return true;}
 m=path.match(/^\/grade\/(\d+)$/);
 if(m&&allowed(m[1])){state.grade=+m[1];state.track="all";state.page="courses";return true;}
 m=path.match(/^\/lesson\/(\d+)-([A-Z]\d+)$/);
 if(m&&allowed(m[1])&&LESSON_BY_ID[m[1]+"-"+m[2]]){
  state.lessonId=m[1]+"-"+m[2];state.grade=+m[1];state.page="lesson";
  getPractice(state.lessonId);if(state.name)checkpoint(state.lessonId,getPractice(state.lessonId).stage);
  return true;
 }
 if(["/home","/about","/profile","/welcome"].includes(path)){state.page=path.slice(1);return true;}
 return false;
}
function goto(page,opts={}){if(window.speechSynthesis?.speaking)window.speechSynthesis.cancel();state.page=page;notice="";if(!opts.fromHistory)writeRoute(!!opts.replace);render(true);if(window.scrollTo)window.scrollTo({top:0,behavior:"instant"});}
function gradeTo(g){if(!GRADES[g])return;state.grade=+g;state.track="all";persist();goto("courses");}
function openLesson(id){if(!LESSON_BY_ID[id])return;state.lessonId=id;getPractice(id);checkpoint(id,getPractice(id).stage||0);goto("lesson");}
function checkActivity(){const l=currentLesson(),a=ACTIVITIES[l.id],w=getPractice(l.id),r=getRecord(l.id);let passed=false,feedback="";
if(a.kind==="sort"){
const selected=a.items.map((x,i)=>w.sort[i]);if(selected.some(x=>x===undefined)){w.feedback={passed:false,message:"Choose a category for every example before checking."};w.checked=false;render();return;}
const n=selected.filter((x,i)=>x===a.items[i][1]).length;passed=n===a.items.length;feedback=n+" of "+a.items.length+" classifications matched the reasoning. Review each explanation above.";
}else if(a.kind==="sequence"){
passed=a.steps.every((x,i)=>w.order[i]===i);feedback=passed?"This is a useful sequence. Real design processes often loop back after feedback.":"Try beginning with the needs or problem, then move toward testing and improvement.";
}else{
if(w.selected===null){w.feedback={passed:false,message:"Choose an option first."};render();return;}
if((w.reason||"").trim().length<25){w.feedback={passed:false,message:"Write a sentence explaining why you made this choice before checking it."};render();return;}
passed=w.selected===a.correct;feedback=a.options[w.selected][a.kind==="prompt"?2:1];
}
w.checked=true;w.feedback={passed,message:feedback};r.attempts=(r.attempts||0)+1;if(passed){r.practicePassed=true;w.retrying=false;}persist();render();const feedbackEl=$("#activity-feedback");if(feedbackEl)feedbackEl.focus({preventScroll:true});
}
function recordReflection(){const l=currentLesson(),w=getPractice(l.id),r=getRecord(l.id);const fields=w.fields||{};const sufficient=["purpose","decision","evidence","work","revision"].every(key=>(fields[key]||"").trim().length>=35);if(!r.knowledgePassed||!w.modelSeen||!r.practicePassed||!sufficient||!w.confirmed){notice="Complete the learning sequence and explain your plan before recording it.";render();return;}r.applied=true;r.reflected=true;r.completed=true;w.stage=4;checkpoint(l.id,4);goto("lesson");}
document.addEventListener("click",async(e)=>{
const t=e.target.closest("[data-action],[data-grade],[data-lesson]");if(!t)return;if(t.tagName==="A"&&typeof e.preventDefault==="function")e.preventDefault();
if(t.dataset.grade){gradeTo(t.dataset.grade);return;}
if(t.dataset.lesson){openLesson(t.dataset.lesson);return;}
const action=t.dataset.action;
if(["home","courses","about","snapshot","profile"].includes(action)){goto(action);return}
if(action==="enter"){goto("welcome");return}
if(action==="pick-grade"){if(!GRADES[t.dataset.pick])return;state.grade=+t.dataset.pick;if(window.location?.hash?.startsWith("#/")&&window.history?.replaceState)window.history.replaceState({},"","#/welcome");render();const button=document.querySelector('[data-pick="'+state.grade+'"]');if(button&&button.focus)button.focus();return}
if(action==="guest"){state.name=($("#guest-name")?.value||"Learner").trim().slice(0,40)||"Learner";persist();const initialHash=window.location?.hash||"";if(initialHash.startsWith("#/")&&initialHash!=="#/welcome"&&readRoute()){goto(state.page,{fromHistory:true});}else{goto("courses");}return}
if(action==="export-progress"){exportProgress();return}
if(action==="reading"){state.reading=state.reading==="comfortable"?"standard":"comfortable";persist();render();return}
if(action==="track"){state.track=t.dataset.track;persist();goto("courses");return}
if(action==="diagnostic"||action==="retake"){beginDiagnostic();return}
if(action==="diag-prev"){if(diagnosticRun&&diagnosticRun.index>0){diagnosticRun.index--;render(true)}return}
if(action==="diag-next"){if(!diagnosticRun)return;let idx=diagnosticRun.index;if(diagnosticRun.answers[idx]===null)return;if(idx<5){diagnosticRun.index++;render(true)}else{state.diagnostics[state.grade]={answers:diagnosticRun.answers.slice(),completed:true,updated:new Date().toISOString()};diagnosticRun=null;persist();goto("snapshot")}return}
if(action==="listen"){const speech=window.speechSynthesis,Utterance=window.SpeechSynthesisUtterance;if(!speech||!Utterance){notice="Read-aloud is not available in this browser.";const ann=document.querySelector("#global-announcer");if(ann)ann.textContent=notice;return;}const w=getPractice(state.lessonId),k=KNOWLEDGE[state.lessonId],text=k.core[Math.min(2,w.topicIndex||0)];speech.cancel();const u=new Utterance(text);u.lang="en";u.rate=0.93;speech.speak(u);return}
if(action==="concept-next"){const w=getPractice(state.lessonId);w.topicIndex=Math.min(2,(w.topicIndex||0)+1);w.maxTopic=Math.max(w.maxTopic||0,w.topicIndex);render(true);return}
if(action==="concept"){const w=getPractice(state.lessonId),n=+t.dataset.index;if(n>=0&&n<=2&&n<=(w.maxTopic||0))w.topicIndex=n;render(true);return}
if(action==="knowledge-check"){const l=currentLesson(),w=getPractice(l.id),r=getRecord(l.id),k=KNOWLEDGE[l.id];if(w.topicIndex!==2||w.knowledgeAnswer===null)return;const passed=w.knowledgeAnswer===k.check[2];w.knowledgeFeedback={passed};if(passed){r.knowledgePassed=true;checkpoint(l.id,0);}else persist();render();return}
if(action==="model-reveal"){const w=getPractice(state.lessonId);w.modelSeen=true;getRecord(state.lessonId).modelSeen=true;checkpoint(state.lessonId,1);render(true);return}
if(action==="apply-prev"){const w=getPractice(state.lessonId);w.applyStep=Math.max(0,(w.applyStep||0)-1);render(true);return}
if(action==="apply-next"){const w=getPractice(state.lessonId);const fields=w.fields||{};if(w.applyStep===1&& !["purpose","decision","evidence"].every(k=>(fields[k]||"").trim().length>=35))return;w.applyStep=Math.min(2,(w.applyStep||0)+1);render(true);return}
if(action==="context-choice"){const w=getPractice(state.lessonId),n=+t.dataset.index;if(n===0||n===1)w.context=n;render();return}
if(action==="format-choice"){const w=getPractice(state.lessonId);if(["written","visual","talk"].includes(t.dataset.format))w.format=t.dataset.format;render();return}
if(action==="copy-plan"){const l=currentLesson(),w=getPractice(l.id),c=KNOWLEDGE[l.id].contexts[w.context],f=w.fields;const plan=[l.title,c[0],c[1],"My goal and audience:",f.purpose||"","My AI-use decision:",f.decision||"","My evidence plan:",f.evidence||"","My work sample:",f.work||"","My test and revision:",f.revision||""].join("\n\n");if(typeof navigator!=="undefined"&&navigator.clipboard?.writeText){navigator.clipboard.writeText(plan).then(()=>{notice="Your learning plan was copied.";const a=document.querySelector("#global-announcer");if(a)a.textContent=notice}).catch(()=>{notice="Copy was unavailable. You can select your text from the fields.";render();});}else{notice="Copy was unavailable in this preview browser.";render();}return}
if(action==="stage"){const l=currentLesson(),w=getPractice(l.id),step=+t.dataset.stage,r=getRecord(l.id);if((step===1&&!r.knowledgePassed)||(step===2&&!w.modelSeen)||(step===3&&!r.practicePassed)||(step===4&&!r.applied))return;w.stage=Math.min(4,Math.max(0,step));checkpoint(l.id,w.stage);goto("lesson");return}
if(action==="prev"){const w=getPractice(state.lessonId);w.stage=Math.max(0,(w.stage||0)-1);checkpoint(state.lessonId,w.stage);goto("lesson");return}
if(action==="next"){const w=getPractice(state.lessonId),r=getRecord(state.lessonId);if((w.stage===0&&!r.knowledgePassed)||(w.stage===1&&!w.modelSeen)||(w.stage===2&&!r.practicePassed))return;w.stage=Math.min(3,(w.stage||0)+1);checkpoint(state.lessonId,w.stage);goto("lesson");return}
if(action==="reveal-example"){const w=getPractice(state.lessonId);w.exampleOpen=!w.exampleOpen;render();return}
if(action==="check"){checkActivity();return}
if(action==="retry"){const w=getPractice(state.lessonId);w.checked=false;w.feedback=null;w.retrying=true;render();return}
if(action==="move"){const w=getPractice(state.lessonId),i=+t.dataset.index,j=i+(+t.dataset.dir);if(j<0||j>=w.order.length)return;const temp=w.order[i];w.order[i]=w.order[j];w.order[j]=temp;w.checked=false;w.feedback=null;render();return}
if(action==="record"){recordReflection();return}
if(action==="saveprofile"){state.name=($("#profile-name")?.value||"Learner").trim().slice(0,40)||"Learner";persist();goto("profile");return}
if(action==="logout"){try{localStorage.removeItem(KEY);localStorage.removeItem(OLD_KEY)}catch(_){}Object.assign(state,{name:"",grade:6,track:"all",reading:"standard",records:{},diagnostics:{},legacyDone:{},page:"welcome",lessonId:""});practice={};document.documentElement.dataset.reading="standard";diagnosticRun=null;goto("welcome");return}
});
document.addEventListener("change",(e)=>{
const t=e.target;
if(t.name==="diagnostic-choice"&&diagnosticRun){diagnosticRun.answers[diagnosticRun.index]=+t.value;render();const chosen=$('input[name="diagnostic-choice"]:checked');if(chosen?.focus)chosen.focus();return}
if(t.name==="knowledge-choice"){const w=getPractice(state.lessonId);w.knowledgeAnswer=+t.value;w.knowledgeFeedback=null;render();const selected=$('input[name="knowledge-choice"]:checked');if(selected?.focus)selected.focus();return}
if(t.name==="activity-choice"){const w=getPractice(state.lessonId);w.selected=+t.value;w.checked=false;w.feedback=null;render();const selected=$('input[name="activity-choice"]:checked');if(selected?.focus)selected.focus();return}
if(t.id==="import-progress"){const file=t.files?.[0];if(file)importProgress(file);return}
if(t.id==="dashboard-grade"){gradeTo(+t.value);return}
if(t.dataset?.sort!==undefined){const w=getPractice(state.lessonId);w.sort[+t.dataset.sort]=t.value===""?undefined:+t.value;w.checked=false;w.feedback=null;return}
if(t.id==="project-confirm"){const w=getPractice(state.lessonId);w.confirmed=!!t.checked;updateProjectButton();return}
});
function updateProjectButton(){const w=getPractice(state.lessonId),f=w.fields||{};const next=$('[data-action="apply-next"]');if(next&&w.applyStep===1)next.disabled=!["purpose","decision","evidence"].every(k=>(f[k]||"").trim().length>=35);const b=$('[data-action="record"]');if(b)b.disabled=!(getRecord(state.lessonId).knowledgePassed&&getRecord(state.lessonId).practicePassed&&w.modelSeen&&w.confirmed&&["purpose","decision","evidence","work","revision"].every(k=>(f[k]||"").trim().length>=35));}
document.addEventListener("input",(e)=>{
const t=e.target;
if(t.id==="practice-reason"){getPractice(state.lessonId).reason=t.value.slice(0,1200);return}
if(t.dataset?.planField){const w=getPractice(state.lessonId);if(!w.fields)w.fields={};w.fields[t.dataset.planField]=t.value.slice(0,2000);updateProjectButton();return}
});
function syncHistory(){if(!state.name){state.page="welcome";render(true);return;}if(readRoute()){persist();if(state.page==="diagnostic"&&!diagnosticRun)diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)};render(true);if(window.scrollTo)window.scrollTo(0,0);}}
document.addEventListener("keydown",e=>{if(e.key==="Enter"&&e.target.id==="guest-name"){e.preventDefault();const button=document.querySelector('[data-action="guest"]');if(button&&button.click)button.click();}});
window.addEventListener("popstate",syncHistory);
window.addEventListener("hashchange",syncHistory);
if(state.name){if(!readRoute()||state.page==="welcome")state.page="home";}else{const requested=(window.location?.hash||"").match(/^#\/(?:grade\/|lesson\/)(\d+)/);if(requested&&GRADES[requested[1]])state.grade=+requested[1];state.page="welcome";}
if(state.page==="diagnostic"&&!diagnosticRun)diagnosticRun={grade:state.grade,index:0,answers:Array(6).fill(null)};
render();
})();
