/* Focused student-facing Grade 6 view. No navigation to other parts of the site.
   Account-based entitlements and central progress reporting require the future school SSO integration. */
(function(){
"use strict";
const html=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const names={capacity:"AI Capacity",judgement:"AI Judgement"};
function header(brand,preview){
 return '<header class="student-header"><div class="student-header-brand">'+brand+'<span>My Learning</span></div><div class="student-header-actions"><span class="student-grade-pill">Grade 6'+(preview?' · Preview':'')+'</span>'+(preview?'<button class="student-preview-exit" type="button" data-action="student-exit">Exit preview ×</button>':'')+'</div></header>';
}
function home(lessons,records,preview){
 const modules=lessons.filter(l=>l.grade===6).slice().sort((a,b)=>a.id.localeCompare(b.id));
 const done=modules.filter(l=>records[l.id]?.completed).length;
 const inProgress=modules.filter(l=>{const r=records[l.id];return r&&!r.completed&&(r.knowledgePassed||r.modelSeen||r.practicePassed||(r.lastStage||0)>=1)}).sort((a,b)=>(records[b.id].lastOpenedAt||0)-(records[a.id].lastOpenedAt||0))[0];
 const next=inProgress||modules.find(l=>!records[l.id]?.completed)||modules[0],nextRecord=next?records[next.id]:null;
 const percent=modules.length?Math.round(100*done/modules.length):0;
 const nextAction=nextRecord?.completed?"Revisit lesson":inProgress?"Continue lesson":"Start lesson";
 return '<main id="main-content" class="student-main">'+
 '<div class="student-view-head"><div><p class="student-kicker">Grade 6 · Explore & Question</p><h1 id="main-title" tabindex="-1">My Learning</h1><p>Everything you need for your Grade 6 AI learning is in one place. Your teacher will tell you which module to work on.</p></div>'+
 '<div class="student-view-count"><strong>'+done+' / '+modules.length+'</strong><span>Modules completed</span><div class="progress-line" role="progressbar" aria-label="Grade 6 modules completed" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:'+percent+'%"></div></div></div></div>'+
 (next?'<section class="student-next" aria-label="Next learning action"><div><p class="student-kicker">Your next step · '+names[next.track]+'</p><h2>'+html(next.title)+'</h2><p>'+html(next.objective)+'</p><span class="student-next-status">'+(inProgress?"Pick up where you left off":done===modules.length?"All six modules completed":"Ready when your teacher is")+'</span></div><button type="button" class="student-next-button" data-lesson="'+html(next.id)+'">'+nextAction+' <span aria-hidden="true">→</span></button></section>':'')+
 '<section aria-labelledby="student-work-title"><div class="student-work-heading"><div><h2 id="student-work-title">Your Grade 6 modules</h2><p>Choose the activity your teacher has asked you to complete.</p></div><span class="student-work-label">3 Capacity · 3 Judgement</span></div>'+
 '<div class="student-work-grid">'+modules.map(l=>{
 const r=records[l.id]||{},started=!!(r.knowledgePassed||r.modelSeen||r.practicePassed||(r.lastStage||0)>=1),completed=!!r.completed;
 const status=completed?"Completed":started?"In progress":"Not started";
 return '<button type="button" class="student-work-card" data-pathway="'+l.track+'" data-lesson="'+html(l.id)+'"><span class="student-work-code">'+html(l.strand)+'</span><span class="student-work-detail"><span class="student-work-track">'+names[l.track]+'</span><strong>'+html(l.title)+'</strong><span class="student-work-objective">'+html(l.objective)+'</span><span class="student-work-end"><span>'+(completed?"✓ ":"")+status+'</span><span>'+(completed?"Review":started?"Continue":"Open")+' ↗</span></span></span></button>';
 }).join('')+'</div></section>'+
 '<p class="student-view-note">'+(preview?"Teacher preview: this Grade 6 example uses temporary progress and cannot change your normal dashboard.":"Progress is currently saved in this browser only. School sign-in, teacher assignments and central progress reporting are not connected to the public preview.")+'</p></main>';
}
window.StudentModeUI={header,home};
})();
