/* Public curriculum showcase. The overview is available before grade selection.
 * This is descriptive programme content, never student performance or identity data.
 */
function publicCurriculum({grade=8,strand="A1",escape,gradeChosen=false,assignedGrade=null}){
 const esc=escape,grades=Object.keys(SCOPE_SEQUENCE).map(Number),level=SCOPE_SEQUENCE[grade],info=GRADES[grade];
 if(!level)throw Error("Invalid public curriculum grade");
 const gmodules=LESSONS.filter(l=>l.grade===grade),selectedStrand=STRANDS.find(s=>s.id===strand)||STRANDS[0];
 const yearCards=grades.map(g=>'<button id="curriculum-grade-'+g+'" type="button" class="curriculum-year-tab '+(g===grade?'is-active':'')+'" data-action="curriculum-grade" data-cur-grade="'+g+'" aria-pressed="'+(g===grade)+'"><span>Grade</span><strong>'+g+'</strong><small>'+esc(SCOPE_SEQUENCE[g].stage)+'</small></button>').join("");
 const strandCards=STRANDS.map(s=>'<button type="button" id="curriculum-strand-'+s.id+'" class="curriculum-strand-tab '+(s.id===selectedStrand.id?'is-active':'')+'" data-action="curriculum-strand" data-cur-strand="'+s.id+'" aria-pressed="'+(s.id===selectedStrand.id)+'"><span class="curriculum-strand-code">'+s.id+'</span>'+esc(s.name)+'</button>').join("");
 const moduleCards=(track)=>gmodules.filter(l=>l.track===track).map(l=>{
  const descriptor=STRANDS.find(x=>x.id===l.strand),lab=LEARNING_LABS[l.id];
  return '<article class="catalogue-module catalogue-module--'+track+'"><div class="catalogue-module-top"><span class="catalogue-module-code">'+l.strand+' · '+esc(descriptor.name)+'</span>'+
  (lab?'<span class="catalogue-lab">Interactive investigation</span>':'')+'</div><h4>'+esc(l.title)+'</h4>'+
  '<p class="catalogue-module-objective">'+esc(l.objective)+'</p><div class="catalogue-module-move"><span>New learning</span><p>'+esc(l.progression.move)+'</p></div>'+
  '<details><summary>Evidence and misconception</summary><p><strong>Evidence:</strong> '+esc(l.evidence)+'</p><p><strong>Misconception to challenge:</strong> '+esc(l.progression.misconception)+'</p></details></article>';
 }).join("");
 const mission=level.challenge;
 const progression=grades.map(g=>'<li class="curriculum-progression-step '+(g===grade?'is-current':'')+'"><div class="curriculum-progression-marker">G'+g+'</div><div><strong>'+esc(GRADES[g].headline)+'</strong><p>'+esc(SCOPE_SEQUENCE[g].strands[selectedStrand.id][0])+'</p>'+
 (g===grade?'<span class="curriculum-progression-current">Selected grade</span>':'')+'</div></li>').join("");
 return '<main id="main-content" class="curriculum-page page">'+
 '<section class="curriculum-hero max"><div class="curriculum-hero-copy"><div class="eyebrow">Our curriculum · Grades 6–12</div>'+
 '<h1 id="main-title" tabindex="-1">Seven years.<br><em>Two pathways.</em><br>One learning journey.</h1>'+
 '<p>Explore how students move from understanding what AI can and cannot do to investigating systems, defending decisions and creating with responsibility. Discover the modules, the progression and the evidence of meaningful learning.</p>'+
 '<div class="curriculum-hero-actions"><button class="btn" type="button" data-action="curriculum-jump">Explore the curriculum ↓</button>'+
 '<button class="btn btn-outline" type="button" data-action="copy-curriculum">Copy page link</button></div>'+
 '<p class="curriculum-hero-foot">Public overview. No grade selection or student login required.</p></div>'+
 '<div class="curriculum-hero-pathways" aria-label="Two connected learning pathways">'+
 '<div class="curriculum-pathway curriculum-pathway--capacity"><span>01 · AI CAPACITY</span><strong>What can I understand, do and create?</strong><p>Understanding AI · Working with AI · Creating with AI</p></div>'+
 '<div class="curriculum-pathway curriculum-pathway--judgement"><span>02 · AI JUDGEMENT</span><strong>When, why and whether should I use it?</strong><p>Purpose and agency · Truth and trust · Ethics and consequences</p></div>'+
 '<p class="curriculum-pathway-note"><strong>Both matter.</strong> Capacity enables possibility; judgement makes the choices purposeful, informed and accountable.</p></div></section>'+
 '<section class="curriculum-counts max" aria-label="Curriculum at a glance">'+
 '<div><strong>'+grades.length+'</strong><span>Grades, 6 through 12</span></div><div><strong>'+LESSONS.length+'</strong><span>Learning modules</span></div>'+
 '<div><strong>'+STRANDS.length+'</strong><span>Connected strands</span></div><div><strong>'+Object.keys(LEARNING_LABS).length+'</strong><span>Offline investigations</span></div></section>'+
 '<section id="curriculum-explorer" class="curriculum-atlas max" aria-labelledby="curriculum-explorer-heading"><div class="curriculum-section-intro">'+
 '<div class="eyebrow">01 / Curriculum by grade</div><h2 id="curriculum-explorer-heading">Choose a grade. See what learning looks like.</h2>'+
 '<p>Every grade develops the same six strands, with increasing intellectual challenge. Select a year to explore its core ideas, six modules and culminating performance task.</p></div>'+
 '<div class="curriculum-year-nav" role="group" aria-label="Choose a grade to inspect">'+yearCards+'</div>'+
 '<div class="curriculum-selected-year" id="curriculum-selected-year"><div class="curriculum-year-heading"><div><div class="curriculum-year-kicker">'+(grade>=11?'DIPLOMA-AGE LEARNING · DP'+(grade-10):'MIDDLE YEARS LEARNING · GRADE '+grade)+'</div>'+
 '<h3>Grade '+grade+' <span>· '+esc(info.headline)+'</span></h3><p>'+esc(info.focus)+'</p></div><div class="curriculum-year-big" aria-hidden="true">'+grade+'</div></div>'+
 '<div class="curriculum-concept-strip"><div><span>CORE IDEA</span><p>'+esc(level.concept)+'</p></div><div><span>THE NEXT STEP</span><p>'+esc(level.step)+'</p></div></div>'+
 '<div class="curriculum-modules-layout"><section aria-labelledby="curriculum-capacity-heading"><div class="curriculum-lane-heading curriculum-lane-heading--capacity"><span>PATHWAY 01</span><h4 id="curriculum-capacity-heading">AI Capacity</h4></div>'+
 '<div class="catalogue-module-list">'+moduleCards("capacity")+'</div></section>'+
 '<section aria-labelledby="curriculum-judgement-heading"><div class="curriculum-lane-heading curriculum-lane-heading--judgement"><span>PATHWAY 02</span><h4 id="curriculum-judgement-heading">AI Judgement</h4></div>'+
 '<div class="catalogue-module-list">'+moduleCards("judgement")+'</div></section></div>'+
 '<section class="curriculum-annual-challenge" aria-label="Integrated annual performance challenge"><div class="eyebrow">Connecting both pathways · Grade '+grade+'</div>'+
 '<h4>'+esc(mission.title)+'</h4><p class="curriculum-annual-question">'+esc(mission.question)+'</p>'+
 '<div class="curriculum-annual-columns"><div><h5>The challenge</h5><p>'+esc(mission.task)+'</p><h5>Evidence students create</h5><p>'+esc(mission.evidence)+'</p></div>'+
 '<div><h5>Success criteria</h5><ul>'+mission.criteria.map(t=>'<li>'+esc(t)+'</li>').join("")+'</ul><h5>Critique and transfer</h5><p>'+esc(mission.feedback)+'</p><p><em>Transfer:</em> '+esc(mission.transfer)+'</p></div></div></section>'+
 '<div class="curriculum-year-cta"><p>Viewing a grade here does not alter the learner profile or access permissions.</p>'+
 '<button type="button" class="btn btn-outline" data-action="curriculum-open-grade" data-cur-grade="'+grade+'">'+(gradeChosen&&grade!==assignedGrade?'Your current learning grade is '+assignedGrade:'Explore Grade '+grade+' lessons →')+'</button></div></div></section>'+
 '<section class="curriculum-spiral" aria-labelledby="curriculum-spiral-heading"><div class="max"><div class="curriculum-section-intro"><div class="eyebrow">02 / Vertical progression</div>'+
 '<h2 id="curriculum-spiral-heading">How does the learning grow over seven years?</h2><p>Follow a strand from Grade 6 to Grade 12. The focus shifts from noticing and explaining to investigating, creating, defending and stewarding responsible systems.</p></div>'+
 '<div class="curriculum-strand-choices" role="group" aria-label="Choose a progression strand">'+strandCards+'</div>'+
 '<section class="curriculum-spiral-detail" aria-labelledby="curriculum-selected-strand"><div class="curriculum-spiral-heading"><div><span>'+ (selectedStrand.track==="capacity"?"CAPACITY":"JUDGEMENT")+' · '+selectedStrand.id+'</span>'+
 '<h3 id="curriculum-selected-strand">'+esc(selectedStrand.name)+'</h3><p>'+esc(selectedStrand.description)+'</p></div><div class="curriculum-spiral-count">7 stages</div></div>'+
 '<ol class="curriculum-progression-list">'+progression+'</ol></section></div></section>'+
 '<section class="curriculum-outcomes max" aria-labelledby="curriculum-outcomes-heading"><div class="curriculum-section-intro"><div class="eyebrow">03 / Evidence of learning</div>'+
 '<h2 id="curriculum-outcomes-heading">More than completing a module.</h2><p>Students should explain, investigate, decide and create. Progression is demonstrated through more independent work and more demanding transfer—not just finishing activities.</p></div>'+
 '<div class="curriculum-evidence-grid">'+
 '<article><span aria-hidden="true">01</span><h3>Explain the mechanism</h3><p>Understand what information a system uses, how it behaves, what it does not know and which conditions could change its output.</p></article>'+
 '<article><span aria-hidden="true">02</span><h3>Investigate evidence</h3><p>Check original sources, design fair tests, find meaningful limitations and communicate uncertainty.</p></article>'+
 '<article><span aria-hidden="true">03</span><h3>Exercise judgement</h3><p>Defend decisions to use, limit or not use AI by considering learning goals, people, rights and consequences.</p></article>'+
 '<article><span aria-hidden="true">04</span><h3>Create and transfer</h3><p>Produce original work, test it, respond to critique and apply understanding in an unfamiliar setting.</p></article></div>'+
 '<p class="curriculum-integrity-note"><strong>A note about evidence:</strong> Website activity is formative practice, not verified mastery. Complex artefacts and claims of impact require human assessment. This original curriculum is informed by established AI-literacy ideas; it is not an officially endorsed IB course and improved learning outcomes have not yet been established through a student study.</p>'+
 '<div class="curriculum-final-cta"><div><div class="eyebrow">Explore the learning</div><h2>From overview to experience.</h2><p>Choose a grade to try the student journey, or share this overview with your learning community.</p></div>'+
 '<div><button class="btn" type="button" data-action="'+(gradeChosen?'courses':'enter')+'">'+(gradeChosen?'My courses':'Choose your grade')+' →</button>'+
 '<button class="btn btn-outline" type="button" data-action="copy-curriculum">Copy curriculum link</button></div></div></section></main>';
}
