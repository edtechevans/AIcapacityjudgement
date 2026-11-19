/* AI Capacity × Judgement — Educator Learning V2
 * Read → understand → interact → transfer. No written responses, uploads or submissions.
 */
(function(){
"use strict";
const COURSES=[
 {id:"literacy",title:"AI Literacy & Professional Judgement",subtitle:"Understand the technology. Question its outputs. Make responsible decisions.",minutes:75,modules:[
  {title:"What AI Actually Does",focus:"Distinguish plausible generation from verified knowledge."},
  {title:"Prompts, Context & Verification",focus:"Use purposeful prompts while keeping verification visible."},
  {title:"Bias, Representation & Fairness",focus:"Recognise omissions, stereotypes and unequal effects."},
  {title:"Privacy, Consent & Safeguarding",focus:"Apply data minimisation, approval and professional boundaries."},
  {title:"Capacity × Judgement in Practice",focus:"Decide whether AI should be used, not simply whether it can be used."},
  {title:"Professional Decision Challenge",focus:"Combine purpose, evidence, privacy, fairness and accountability."}
 ]},
 {id:"pedagogy",title:"AI Pedagogy, Assessment & Learning Design",subtitle:"Protect the thinking. Redesign meaningful learning. Make judgement visible.",minutes:80,modules:[
  {title:"Learning Before Tools",focus:"Start with the learning intention, not the AI capability."},
  {title:"Scaffolding Without Substitution",focus:"Reduce barriers without removing the thinking learners need to develop."},
  {title:"Assessment in an AI World",focus:"Gather credible evidence of process, understanding and transfer."},
  {title:"Feedback, Agency & Metacognition",focus:"Use AI-supported feedback without replacing student judgement."},
  {title:"Equity, Access & Responsible Classroom Norms",focus:"Design expectations that remain fair across uneven access and needs."},
  {title:"Redesign Studio: A Defensible Lesson",focus:"Bring purpose, agency, evidence, equity and safeguards together."}
 ]}
];
const READINGS=[
 ["Generative AI produces outputs from learned patterns. A response can be fluent, detailed and convincing without being verified.","Models can invent references, miss context or reproduce errors. Important claims need independent checking before they become teaching material.","The educator remains accountable for what enters the learning environment. Capacity is using the tool; judgement is deciding what deserves trust."],
 ["A useful prompt makes the purpose, audience, constraints and desired form clear. Better context often improves relevance.","Prompt quality does not turn a model into an authority. Verification remains necessary, especially when facts, citations or consequential advice are involved.","Do not improve a prompt by adding identifiable or sensitive student information to an unapproved service."],
 ["AI outputs can reproduce patterns of bias, omission and stereotyping found in data, design choices and the context of use.","Fairness is not achieved by simply asking for 'neutral' output. Educators should inspect who is represented, who is missing and who may be affected differently.","Representation can be improved by using varied trustworthy sources, questioning assumptions and making limitations visible to learners."],
 ["Student data does not become safe to share because an AI tool is convenient. School approval, confidentiality, safeguarding and privacy obligations still apply.","Use the minimum data necessary for the task. Avoid identifiable or sensitive information in unapproved services and prefer de-identified examples when appropriate.","A useful output never cancels professional responsibility for consent, access, retention or the consequences of disclosure."],
 ["Capacity asks what AI can help us do. Judgement asks whether that use serves the learning goal, protects people and produces evidence we can trust.","Efficiency can be valuable, but speed can also remove a meaningful moment of thinking, feedback or professional attention.","The strongest decisions make the trade-off visible: purpose, benefit, risk, evidence and who remains accountable."],
 ["A responsible AI decision begins with the educational purpose, not a tool's novelty, popularity or marketing claim.","Evaluate evidence, privacy, fairness, age suitability, transparency, school policy and human oversight before adoption.","A defensible outcome may be to use AI with safeguards, choose a different approach, run a limited approved trial, or deliberately not use AI."],
 ["Start with what learners should understand, practise or be able to transfer. Only then decide what role technology should play.","If AI performs the exact cognitive work the task was designed to develop, the activity may produce a polished product while reducing learning.","Useful AI support can challenge, scaffold, compare or provide feedback while leaving the learner responsible for the important decisions."],
 ["A scaffold reduces barriers while preserving the intellectual goal. Substitution completes the target thinking for the learner.","Question stems, examples, vocabulary support and feedback can increase access. Automatically generating the finished response can remove agency and practice.","The test is not whether AI was used, but whether the learner still performs and demonstrates the intended thinking."],
 ["A finished product is only one source of evidence. In an AI-rich environment, assessment should also make process, reasoning and transfer visible.","Drafts, checkpoints, explanation, critique, comparison and short independent performances can provide stronger evidence of understanding.","AI-detection scores should not be treated as conclusive proof of authorship or misconduct. Assessment validity requires better evidence, not stronger suspicion."],
 ["Feedback only improves learning when the learner interprets it, makes a decision and acts. More feedback is not automatically better feedback.","AI can generate suggestions quickly, but learners should evaluate which suggestions are accurate, useful and aligned with the goal.","A strong routine is: inspect the feedback, accept or reject with a reason, revise, then check whether the change actually improved the work."],
 ["AI access is uneven. Students may differ in subscriptions, connectivity, language, accessibility needs, confidence and prior experience.","Clear norms should define permitted uses, attribution, privacy and what students must still demonstrate independently.","Fair learning design provides approved accessible routes and does not reward access to a premium tool as though it were deeper understanding."],
 ["A defensible lesson identifies the target thinking, decides where AI can support without replacing it, and gathers evidence that the learner can still perform the goal.","Good redesign makes expectations transparent: permitted use, independent checkpoints, verification, accessibility and what counts as evidence.","The objective is not to police every output. It is to design learning where meaningful understanding remains visible even when powerful tools are available."]
];
const INTERACTIONS=[
 {kind:"single",prompt:"An AI assistant gives a polished explanation of a new research finding. What is the strongest next move?",options:[["Use it because the explanation is detailed",0,"Detail can increase confidence without increasing truth."],["Check important claims against primary or authoritative sources and separate evidence from inference",1,"This preserves the usefulness of the explanation while testing whether it deserves trust."],["Reject every AI explanation without reading it",0,"Critical use is different from automatic rejection."]]},
 {kind:"multi",prompt:"Which actions improve a prompt without weakening professional judgement?",options:[["State the learning goal and intended audience",1,"Purpose and audience can improve relevance."],["Add identifiable student records for more personalised output",0,"Personalisation does not justify exposing sensitive information."],["Ask the model to flag uncertainty or assumptions",1,"Making uncertainty visible can improve checking."],["Verify consequential claims after receiving the response",1,"A better prompt does not remove the need to verify."]]},
 {kind:"classify",prompt:"Classify each response to biased AI-generated career examples.",categories:["Strengthens fairness","Needs a rethink"],items:[["Compare the examples with diverse trustworthy sources",0,"Independent examples can reveal omissions and stereotypes."],["Assume the system is neutral because it is automated",1,"Automation does not guarantee neutrality."],["Ask whose experiences or identities are missing",0,"Representation requires noticing omission as well as explicit bias."],["Keep the examples unchanged because rewriting them would be subjective",1,"Leaving a biased pattern unexamined is also a choice."]]},
 {kind:"order",prompt:"Put the privacy decision process in the most defensible order.",steps:["Clarify the educational purpose","Check whether the tool is school-approved for the intended data","Minimise or de-identify the information shared","Review access, output and retention before acting on the result"]},
 {kind:"multi",prompt:"AI can draft feedback for thirty students. Which safeguards protect professional judgement?",options:[["Use only approved tools and appropriate data",1,"Approval and data boundaries come before convenience."],["Treat the draft as final because it saves time",0,"The educator remains accountable for accuracy, tone and fit."],["Check the feedback against actual learner evidence",1,"Feedback should reflect the learner, not a generic pattern."],["Review fairness, tone and next steps before sharing",1,"Human review is part of responsible use."]]},
 {kind:"order",prompt:"A colleague recommends a free AI marking tool. Put the evaluation process in order.",steps:["Clarify the assessment purpose and what evidence the tool would use","Check privacy, approval, validity and known limitations","Run a low-risk approved evaluation using non-sensitive or synthetic material","Compare results with human judgement and decide whether use is defensible"]},
 {kind:"single",prompt:"Students are learning to construct arguments. AI can generate a complete argument instantly. Which design best protects the learning?",options:[["Let AI write the final argument and ask students to improve the wording",0,"Editing wording does not necessarily demonstrate argument construction."],["Have students generate and defend claims first, then use AI to challenge reasoning or provide counterexamples",1,"AI supports the thinking without taking ownership of the target skill."],["Ban every digital tool regardless of the task",0,"The goal is purposeful design, not blanket prohibition."]]},
 {kind:"classify",prompt:"Which supports are scaffolds, and which risk substituting for the target learning?",categories:["Scaffold","Substitution risk"],items:[["Provide question stems that help a learner frame an inquiry",0,"The learner still chooses and develops the inquiry."],["Generate the full inquiry project for submission",1,"The target decisions and construction have been outsourced."],["Offer two contrasting examples for comparison",0,"Comparison can support understanding while preserving judgement."],["Select the learner's final question, evidence and conclusion",1,"The system has taken over the core intellectual work."]]},
 {kind:"multi",prompt:"Which evidence sources can strengthen assessment validity in an AI-rich environment?",options:[["A final polished product only",0,"A final product may not reveal who performed the target thinking."],["Drafts and decision checkpoints",1,"Process evidence can show development and choices."],["A short oral explanation or defence",1,"Explanation can reveal understanding that surface polish cannot."],["An AI-detector percentage used as proof",0,"Detector scores should not be treated as conclusive authorship evidence."],["A new independent transfer task",1,"Transfer is strong evidence that the learner can use the understanding again."]]},
 {kind:"order",prompt:"Put this feedback routine in a learning-focused order.",steps:["Read the feedback and identify the goal it relates to","Decide which suggestions are accurate and useful","Accept, reject or adapt suggestions deliberately","Revise and check whether the change improved the work"]},
 {kind:"multi",prompt:"Which design decisions improve equity and access?",options:[["Provide approved alternatives that meet the same learning outcomes",1,"Equivalent routes reduce dependence on a particular tool."],["Reward students who can access premium tools with higher marks for polish",0,"Tool access should not masquerade as understanding."],["Make acceptable AI use and attribution expectations explicit",1,"Clarity reduces hidden advantages and confusion."],["Consider language and accessibility needs when choosing tools",1,"Access includes usability, not just availability."]]},
 {kind:"classify",prompt:"Classify each feature of a redesigned lesson.",categories:["Protects meaningful learning","Weakens evidence of learning"],items:[["Independent checkpoint before AI support",0,"A checkpoint can reveal what the learner can do without substitution."],["Assess only the final AI-polished presentation",1,"Surface quality alone is weak evidence of understanding."],["Require verification of important AI-generated claims",0,"Verification turns tool use into an evidence practice."],["Leave permitted AI use undefined",1,"Ambiguity undermines fairness and consistent expectations."],["Include a transfer task in a new context",0,"Transfer helps show whether the understanding travels."]]}
];
const KEY="aicj-educator-progress-v3";
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let progress={};try{progress=JSON.parse(localStorage.getItem(KEY)||"{}")||{}}catch(_){progress={}}
let selected=null;
function save(){try{localStorage.setItem(KEY,JSON.stringify(progress))}catch(_){}}
function record(id){return progress[id]||(progress[id]={completed:false,attempts:0,single:null,multi:{},classify:{},order:[],feedback:null});}
function moduleIndex(cid,i){return (cid==="literacy"?0:6)+i}
function completed(c){return c.modules.filter((_,i)=>record(c.id+"-"+i).completed).length}
function moduleCard(c,m,i){const id=c.id+"-"+i,r=record(id);return '<button type="button" class="educator-module-card" data-educator-open="'+esc(id)+'"><span class="educator-number">'+String(i+1).padStart(2,"0")+'</span><span class="educator-module-copy"><strong>'+esc(m.title)+'</strong><small>'+esc(m.focus)+'</small></span><span class="educator-status">'+(r.completed?"✓ Completed":r.attempts?"Continue":"Start →")+'</span></button>'}
function courseCard(c){const n=completed(c);return '<section class="educator-course-card"><div class="eyebrow">Educator course · Approximately '+c.minutes+' minutes</div><h2>'+esc(c.title)+'</h2><p>'+esc(c.subtitle)+'</p><div class="educator-course-progress"><span>'+n+' of 6 modules complete</span><div class="educator-meter"><span style="width:'+(n/6*100)+'%"></span></div></div><div class="educator-module-list">'+c.modules.map((m,i)=>moduleCard(c,m,i)).join("")+'</div></section>'}
function interactionReady(x,r){
 if(x.kind==="single")return r.single!==null;
 if(x.kind==="multi")return Object.values(r.multi||{}).some(Boolean);
 if(x.kind==="classify")return x.items.every((_,i)=>r.classify?.[i]!==undefined);
 if(x.kind==="order")return r.order?.length===x.steps.length;
 return false;
}
function interactionPassed(x,r){
 if(x.kind==="single")return x.options[r.single]?.[1]===1;
 if(x.kind==="multi")return x.options.every((o,i)=>!!r.multi?.[i]===!!o[1]);
 if(x.kind==="classify")return x.items.every((o,i)=>r.classify?.[i]===o[1]);
 if(x.kind==="order")return x.steps.every((_,i)=>r.order?.[i]===i);
 return false;
}
function interactionHtml(x,r){
 if(x.kind==="order"&&!(r.order||[]).length)r.order=x.steps.length===4?[2,0,3,1]:x.steps.map((_,i)=>i).reverse();
 let body="";
 if(x.kind==="single")body='<div class="educator-choices">'+x.options.map((o,i)=>'<button type="button" class="educator-choice '+(r.single===i?"selected":"")+'" aria-pressed="'+(r.single===i)+'" data-edu-single="'+i+'">'+String.fromCharCode(65+i)+'. '+esc(o[0])+'</button>').join("")+'</div>';
 if(x.kind==="multi")body='<div class="v2-multi-list">'+x.options.map((o,i)=>'<label class="v2-multi-option"><input type="checkbox" data-edu-multi="'+i+'" '+(r.multi?.[i]?"checked":"")+'><span>'+esc(o[0])+'</span></label>').join("")+'</div><p class="small muted">Select every response you believe is defensible, then check your understanding.</p>';
 if(x.kind==="classify")body='<div class="sort-list">'+x.items.map((o,i)=>'<div class="sort-item"><div class="item-number">'+(i+1)+'</div><div class="sort-question"><p id="edu-classify-label-'+i+'">'+esc(o[0])+'</p><select aria-labelledby="edu-classify-label-'+i+'" data-edu-classify="'+i+'"><option value="">Choose…</option>'+x.categories.map((c,n)=>'<option value="'+n+'" '+(r.classify?.[i]===n?"selected":"")+'>'+esc(c)+'</option>').join("")+'</select></div></div>').join("")+'</div>';
 if(x.kind==="order")body='<p class="small muted">Use the arrow buttons to reorder the steps. No dragging is required.</p><ol class="sequence-list">'+r.order.map((pos,i)=>'<li class="sequence-item"><span class="sequence-number">'+(i+1)+'</span><span class="sequence-text">'+esc(x.steps[pos])+'</span><div class="move-actions"><button class="move-btn" data-edu-move="'+i+'" data-dir="-1" '+(i===0?"disabled":"")+' aria-label="Move '+esc(x.steps[pos])+' up">↑</button><button class="move-btn" data-edu-move="'+i+'" data-dir="1" '+(i===r.order.length-1?"disabled":"")+' aria-label="Move '+esc(x.steps[pos])+' down">↓</button></div></li>').join("")+'</ol>';
 const fb=r.feedback?'<div class="educator-feedback '+(r.feedback.passed?"feedback-good":"feedback-retry")+'" role="status"><strong>'+(r.feedback.passed?"Understanding checked":"Review and try again")+'</strong><p>'+esc(r.feedback.message)+'</p>'+(r.feedback.details?.length?'<ul>'+r.feedback.details.map(d=>'<li>'+esc(d)+'</li>').join("")+'</ul>':"")+'</div>':"";
 return body+fb+'<button type="button" class="btn" data-edu-check="1" '+(!interactionReady(x,r)?"disabled":"")+'>Check my understanding →</button>';
}
function moduleView(){
 const [cid,raw]=selected.split("-"),i=+raw,c=COURSES.find(x=>x.id===cid),m=c?.modules[i],idx=moduleIndex(cid,i),reading=READINGS[idx],x=INTERACTIONS[idx],r=record(selected);
 if(!m||!x)return overview();
 return '<main id="main-content" class="page max section educator-page"><button type="button" class="back" data-educator-back="1">← All educator courses</button><div class="eyebrow">'+esc(c.title)+' · Module '+(i+1)+' of 6</div><h1 id="main-title" tabindex="-1">'+esc(m.title)+'</h1>'+
 '<div class="educator-intro"><strong>Learning focus</strong><p>'+esc(m.focus)+'</p></div>'+
 '<section class="educator-task educator-reading"><div class="eyebrow">01 · Read & understand</div><h2>The key idea</h2>'+reading.map(x=>'<p>'+esc(x)+'</p>').join("")+'</section>'+
 '<section class="educator-task"><div class="eyebrow">02 · Check & apply</div><h2>'+esc(x.prompt)+'</h2>'+interactionHtml(x,r)+'</section>'+
 (r.completed?'<section class="educator-finish"><strong>✓ Module completed</strong><p>You can revisit the reading and challenge at any time.</p>'+(i<5?'<button type="button" class="btn btn-small" data-educator-open="'+cid+"-"+(i+1)+'">Next module →</button>':'<button type="button" class="btn btn-small" data-educator-back="1">View both courses →</button>')+'</section>':"")+
 '</main>';
}
function overview(){const total=COURSES.reduce((n,c)=>n+completed(c),0);return '<main id="main-content" class="page max section educator-page"><div class="eyebrow">Professional learning · Capacity × Judgement V2</div><h1 id="main-title" tabindex="-1">Educator learning</h1><p class="educator-lead">Two connected courses built around concise explanations, authentic professional situations and varied knowledge checks. No written responses, uploads or submissions are required.</p><p class="privacy-note">This public preview does not provide educator-only security. A school-managed SharePoint deployment must enforce educator access to protected content.</p><div class="educator-course-grid">'+COURSES.map(courseCard).join("")+'</div><section class="educator-finish"><h2>Your professional learning pathway</h2><p>Complete twelve modules using single-choice, multi-select, classification and sequencing interactions.</p><strong>'+total+' / 12 modules completed</strong><p class="small muted">Completion records successful knowledge checks, not a validated assessment of professional competence.</p></section></main>'}
function refresh(){if(typeof window.refreshEducators==="function")window.refreshEducators()}
function check(){
 if(!selected)return;const [cid,raw]=selected.split("-"),idx=moduleIndex(cid,+raw),x=INTERACTIONS[idx],r=record(selected);if(!interactionReady(x,r))return;
 const passed=interactionPassed(x,r),details=[];
 if(x.kind==="single")details.push(x.options[r.single][2]);
 if(x.kind==="multi")x.options.forEach((o,i)=>{if(!!r.multi?.[i]!==!!o[1])details.push(o[2])});
 if(x.kind==="classify")x.items.forEach((o,i)=>{if(r.classify?.[i]!==o[1])details.push("Item "+(i+1)+": "+o[2])});
 if(x.kind==="order"&&!passed)details.push("Think about what must be decided before information is shared or a high-stakes result is acted upon.");
 r.attempts=(r.attempts||0)+1;r.feedback={passed,message:passed?"Your choices align with the module principle.":details[0]||"Some choices need another look.",details:passed?[]:details};
 if(passed)r.completed=true;save();refresh();
}
window.renderEducators=function(){return selected?moduleView():overview()};
window.educatorOpenOverview=function(){selected=null};
document.addEventListener("click",function(e){
 const t=e.target.closest("[data-educator-open],[data-educator-back],[data-edu-single],[data-edu-check],[data-edu-move]");if(!t)return;e.preventDefault();
 if(t.dataset.educatorBack!==undefined)selected=null;
 else if(t.dataset.educatorOpen)selected=t.dataset.educatorOpen;
 else if(t.dataset.eduSingle!==undefined){const r=record(selected);r.single=+t.dataset.eduSingle;r.feedback=null;}
 else if(t.dataset.eduCheck!==undefined){check();return}
 else if(t.dataset.eduMove!==undefined){const r=record(selected),i=+t.dataset.eduMove,j=i+(+t.dataset.dir);if(j>=0&&j<r.order.length){const q=r.order[i];r.order[i]=r.order[j];r.order[j]=q;r.feedback=null;}}
 save();refresh();
});
document.addEventListener("change",function(e){
 const t=e.target;if(!selected)return;const r=record(selected);
 if(t.dataset?.eduMulti!==undefined){r.multi[+t.dataset.eduMulti]=!!t.checked;r.feedback=null;save();refresh();return}
 if(t.dataset?.eduClassify!==undefined){r.classify[+t.dataset.eduClassify]=t.value===""?undefined:+t.value;r.feedback=null;save();refresh();return}
});
})();