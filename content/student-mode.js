/* Focused student-facing Grade 6 view. No navigation to other parts of the site.
   Account-based entitlements and central progress reporting require the future school SSO integration. */
(function(){
"use strict";
const html=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const names={capacity:"AI Capacity",judgement:"AI Judgement"};
function header(brand,preview){
 return '<header class="student-header"><div class="student-header-brand">'+brand+'<span>My Learning</span></div><div class="student-header-actions"><span class="student-grade-pill">Grade 6'+(preview?' · Preview':'')+'</span>'+(preview?'<button class="student-preview-exit" type="button" data-action="student-exit">Exit preview ×</button>':'')+'</div></header>';
}
function card(l,records){
 const r=records[l.id]||{},started=!!(r.knowledgePassed||r.modelSeen||r.practicePassed||(r.lastStage||0)>=1),completed=!!r.completed;
 const status=completed?"✓ Completed":started?"In progress":"Not started";
 return '<button type="button" class="student-work-card '+(completed?"student-work-complete":"")+'" data-pathway="'+l.track+'" data-lesson="'+html(l.id)+'"><span class="student-work-code">'+html(l.strand)+'</span><span class="student-work-detail"><span class="student-work-track">'+names[l.track]+'</span><strong>'+html(l.title)+'</strong><span class="student-work-objective">'+html(l.objective)+'</span><span class="student-work-end"><span>'+status+'</span><span>'+(completed?"Review only":started?"Continue":"Open")+' ↗</span></span></span></button>';
}
function home(lessons,records,preview){
 const modules=lessons.filter(l=>l.grade===6).slice().sort((a,b)=>a.id.localeCompare(b.id));
 const done=modules.filter(l=>records[l.id]?.completed).length;
 const inProgress=modules.filter(l=>{const r=records[l.id];return r&&!r.completed&&(r.knowledgePassed||r.modelSeen||r.practicePassed||(r.lastStage||0)>=1)}).sort((a,b)=>(records[b.id].lastOpenedAt||0)-(records[a.id].lastOpenedAt||0))[0];
 const outstanding=modules.filter(l=>!records[l.id]?.completed),completed=modules.filter(l=>records[l.id]?.completed);
 const next=inProgress||outstanding[0]||null,nextRecord=next?records[next.id]:null;
 const percent=modules.length?Math.round(100*done/modules.length):0;
 const nextAction=nextRecord?.completed?"Revisit lesson":inProgress?"Continue lesson":"Start lesson";
 return '<main id="main-content" class="student-main">'+
 '<div class="student-view-head"><div><p class="student-kicker">Grade 6 · Explore & Question</p><h1 id="main-title" tabindex="-1">My Learning</h1><p>Everything you need for your Grade 6 AI learning is in one place. Your teacher will tell you which module to work on.</p></div>'+
 '<div class="student-view-count"><strong>'+done+' / '+modules.length+'</strong><span>Modules completed</span><div class="progress-line" role="progressbar" aria-label="Grade 6 modules completed" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:'+percent+'%"></div></div></div></div>'+
 (next?'<section class="student-next" aria-label="Next learning action"><div><p class="student-kicker">Your next step · '+names[next.track]+'</p><h2>'+html(next.title)+'</h2><p>'+html(next.objective)+'</p><span class="student-next-status">'+(inProgress?"Pick up where you left off":"Ready when your teacher is")+'</span></div><button type="button" class="student-next-button" data-lesson="'+html(next.id)+'">'+nextAction+' <span aria-hidden="true">→</span></button></section>':'<section class="student-next student-finished" aria-label="All modules completed"><div><p class="student-kicker">Your learning is up to date</p><h2>You've completed all six modules.</h2><p>Great work. There is nothing to repeat. Your teacher will guide you through what comes next.</p></div><span class="student-finished-check" aria-hidden="true">✓</span></section>')+
 '<section aria-labelledby="student-work-title"><div class="student-work-heading"><div><h2 id="student-work-title">To do</h2><p>Choose the module your teacher has asked you to complete.</p></div><span class="student-work-label">'+outstanding.length+' remaining</span></div>'+
 (outstanding.length?'<div class="student-work-grid">'+outstanding.map(l=>card(l,records)).join('')+'</div>':'<p class="student-all-done">All Grade 6 modules completed. No unfinished work to display.</p>')+'</section>'+
 (completed.length?'<details class="student-completed"><summary><span>✓ Completed <strong>'+completed.length+' / '+modules.length+'</strong></span><span class="student-completed-toggle">View finished modules ▾</span></summary><div class="student-work-grid">'+completed.map(l=>card(l,records)).join('')+'</div><p class="student-review-note">Finished modules are kept here for reference. You do not need to complete them again.</p></details>':'')+
 '<p class="student-view-note">'+(preview?"Teacher preview: this Grade 6 example uses temporary progress and cannot change your normal dashboard.":"Progress is currently saved in this browser only. School sign-in, teacher assignments and central progress reporting are not connected to the public preview.")+'</p></main>';
}
window.StudentModeUI={header,home};
})();
