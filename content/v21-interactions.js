/* AI Capacity × Judgement V2.1 — module-specific application, transfer and synthesis.
 * Requires curriculum, senior curriculum, investigations and progression to be loaded first.
 * No free-text responses are required.
 */
const V21_GRADE_DEMAND={
  6:{verb:"notice and compare",evidence:"one clear independent check",decision:"keep your own thinking visible",label:"Notice"},
  7:{verb:"test and verify",evidence:"more than one case or source",decision:"explain why the evidence changes your choice",label:"Verify"},
  8:{verb:"analyse and design",evidence:"a comparison of alternatives and perspectives",decision:"make the trade-off visible",label:"Design"},
  9:{verb:"evaluate and challenge",evidence:"edge cases, limitations and consequences",decision:"challenge the strongest assumption",label:"Challenge"},
 10:{verb:"transfer and defend",evidence:"agreed criteria, evidence and limitations",decision:"justify the approach against an alternative",label:"Defend"},
 11:{verb:"investigate and architect",evidence:"provenance, boundaries and failure conditions",decision:"set conditions and controls before use",label:"Architect"},
 12:{verb:"stress-test and steward",evidence:"failure, redress, accountability and wider impact",decision:"assign responsibility and a route to correction",label:"Steward"}
};
const V21_TRANSFER_CONTEXTS={
 "6-A1":"A museum kiosk confidently labels an unfamiliar object it has never seen before.",
 "6-A2":"A younger student asks an AI tutor to explain fractions in language they can understand.",
 "6-A3":"A class is choosing ideas for reducing wasted food at lunchtime.",
 "6-B1":"A student is practising spelling before a quiz and an AI tool offers to complete the exercise.",
 "6-B2":"A sports fact shared by an AI assistant includes an exact statistic but no source.",
 "6-B3":"A photo-editing tool asks for a classmate's image and full name to create a poster.",
 "7-A1":"A plant recogniser works well indoors but fails on the same plants outside after rain.",
 "7-A2":"A research assistant suggests five sources for a local-history inquiry, but two links do not exist.",
 "7-A3":"An AI rewrite makes a climate-action message smoother but removes the student's original point.",
 "7-B1":"A student learning algebra asks AI for hints on one problem and full answers on the next five.",
 "7-B2":"Several websites repeat the same dramatic historical claim using nearly identical wording.",
 "7-B3":"A class wants to use an AI-generated portrait based on a real student's photograph.",
 "8-A1":"Two multimodal tools describe the same short video differently and both sound confident.",
 "8-A2":"A community research workflow uses AI to summarise interviews before anyone checks the transcript.",
 "8-A3":"A multilingual welcome resource looks impressive but confuses newly arrived families.",
 "8-B1":"Students are practising mental estimation and a tool can calculate every answer instantly.",
 "8-B2":"A recommendation feed promotes different voices when its ranking objective changes.",
 "8-B3":"A school scheduling system is faster overall but repeatedly disadvantages one small group.",
 "9-A1":"A vendor shows excellent results on routine cases but provides no evidence from unusual conditions.",
 "9-A2":"An AI-supported data workflow is faster at first but creates extra checking and correction work.",
 "9-A3":"A generated campaign image is visually strong but reinforces a stereotype about the audience.",
 "9-B1":"A caring-sounding chatbot asks a student to keep personal conversations secret.",
 "9-B2":"A realistic video clip appears to show a public figure making a surprising statement.",
 "9-B3":"An automated hiring screen saves time but wrongly rejects qualified applicants from one group.",
 "10-A1":"A new AI product promises near-perfect performance without publishing independent evaluation.",
 "10-A2":"A team must choose between an AI-assisted workflow and a slower method with clearer evidence.",
 "10-A3":"A polished multilingual service fails when users rely on screen readers or uncommon languages.",
 "10-B1":"A project team deliberately chooses not to use AI during one important stage.",
 "10-B2":"Two credible sources disagree about a complex issue and neither fully resolves the uncertainty.",
 "10-B3":"A school AI proposal is efficient but gives users no practical way to challenge a harmful error.",
 "11-A1":"A model performs strongly on familiar benchmark cases but degrades after the population shifts.",
 "11-A2":"An Extended Essay research workflow mixes verified sources with model-generated references.",
 "11-A3":"A design team is choosing which parts of an evidence dashboard should be automated and which should stay human-led.",
 "11-B1":"A student can produce an excellent AI-supported essay but cannot independently defend its central claim.",
 "11-B2":"Five news reports appear independent, but all trace back to the same unverified original source.",
 "11-B3":"A resource-allocation system has measurable benefits but unclear environmental cost and weak appeal routes.",
 "12-A1":"A multimodal assistant combines images, text and tools, but one tool call silently fails.",
 "12-A2":"An automated workflow continues operating after a privacy incident removes access to a key data source.",
 "12-A3":"A community service uses several AI tools and needs clear human authority when the tools disagree.",
 "12-B1":"A university-bound learner must decide which AI support preserves independent inquiry and authorship.",
 "12-B2":"A research assistant synthesises frontier evidence where credible studies disagree and uncertainty is high.",
 "12-B3":"An AI-supported public service causes a consequential error and affected people need explanation, appeal and remedy."
};
const V21_STRANDS=["A1","A2","A3","B1","B2","B3"];
const V21_SIGNATURES={
 A1:"Spot the weak evidence",A2:"Which step should the human keep?",A3:"What changed when AI entered the workflow?",
 B1:"Where did the thinking disappear?",B2:"Spot the weak evidence",B3:"Who carries the risk?"
};
function v21Progression(l){
 const item=SCOPE_SEQUENCE?.[l.grade]?.strands?.[l.strand];
 return {move:l.progression?.move||item?.[0]||l.objective,misconception:l.progression?.misconception||item?.[1]||"A polished output proves the approach is sound."};
}
function v21Kind(l){
 const si=V21_STRANDS.indexOf(l.strand),rotation=["single","multi","sort","sequence"];
 return rotation[(l.grade+si*2)%rotation.length];
}
function v21Apply(l){
 const g=V21_GRADE_DEMAND[l.grade]||V21_GRADE_DEMAND[10],p=v21Progression(l),kind=v21Kind(l);
 const common={kind,signature:V21_SIGNATURES[l.strand],prompt:'In "'+l.title+'", '+l.scenario+' What would best demonstrate Grade '+l.grade+' '+g.verb+'?',principle:l.principle,move:p.move,misconception:p.misconception};
 if(kind==="single")return {...common,options:[
  ["Use the learning goal and evidence to make a conditional decision: "+p.move,1,"You kept the decision tied to the module's actual progression move rather than to surface quality."],
  ["Follow this tempting assumption: "+p.misconception,0,"This is the misconception the module is designed to challenge."],
  ["Choose the fastest or most polished outcome and treat that as sufficient evidence.",0,"Speed and polish can matter, but neither proves learning, reliability or responsible use."]
 ]};
 if(kind==="multi")return {...common,options:[
  ["Use this move: "+p.move,1,"This is the module-specific progression move."],
  ["Look for "+g.evidence+".",1,"The evidence expectation rises with the grade-level demand."],
  ["Apply the principle: "+l.principle,1,"A sound decision should remain anchored in the module principle."],
  ["Act as if this were true: "+p.misconception,0,"That choice reproduces the misconception rather than challenging it."]
 ]};
 if(kind==="sort")return {...common,categories:["Strengthens the decision","Weakens the evidence or agency"],items:[
  ["Use the progression move: "+p.move,0,"This makes the target thinking visible."],
  ["Treat this misconception as a shortcut: "+p.misconception,1,"The shortcut hides exactly the thinking this module is meant to develop."],
  ["Check the decision using "+g.evidence+".",0,"The evidence matches the sophistication expected at this stage."],
  ["Let the most confident or polished output settle the decision.",1,"Confidence and presentation are not substitutes for evidence or judgement."]
 ]};
 return {...common,steps:[
  "Clarify the purpose of "+l.title.toLowerCase()+" and what must remain human-led",
  "Use the module move: "+p.move,
  "Test the result using "+g.evidence,
  "Make a decision that "+g.decision+" and state the important limitation"
 ],tip:"A defensible workflow preserves purpose, evidence and human responsibility."};
}
function v21Transfer(l){
 const g=V21_GRADE_DEMAND[l.grade]||V21_GRADE_DEMAND[10],p=v21Progression(l),context=V21_TRANSFER_CONTEXTS[l.id]||("A new situation requires the same principle as "+l.title+".");
 return {signature:"Transfer challenge",context,prompt:context+" Which response best transfers what you learned in "+l.title+"?",options:[
  ["Apply "+g.verb+" by using this move: "+p.move+" Then check the decision with "+g.evidence+".",1,"This carries the underlying principle into a different context and matches the grade-level demand."],
  ["Use the tool or output if it seems confident, efficient or polished enough.",0,"Surface quality does not show that the underlying principle has transferred."],
  ["Avoid making a decision until the technology can guarantee a perfect result.",0,"Responsible judgement works with evidence, uncertainty and conditions rather than demanding impossible certainty."]
 ],feedback:{noticed:"You recognised the same underlying issue in a different setting.",matters:l.principle,elsewhere:"Look for another situation where you would need to "+g.decision+"."}};
}
function v21Synthesis(l){
 if(!["A3","B3"].includes(l.strand))return null;
 const g=V21_GRADE_DEMAND[l.grade]||V21_GRADE_DEMAND[10],capacity=l.strand==="A3";
 return {
  signature:"Capacity × Judgement Challenge",
  prompt:(capacity?"You have now worked across Understanding AI, Working with AI and Creating with AI.":"You have now completed all six Capacity × Judgement strands for this grade. This is the full integration challenge.")+" Which response best combines the learning at Grade "+l.grade+"?",
  options:capacity?[
   ["Understand the system and its limits, choose a purposeful workflow, then create and test something while keeping human decisions visible.",1,"Capacity is strongest when understanding, workflow and creation reinforce one another."],
   ["Use whichever tool produces the most impressive output, then explain the process afterwards.",0,"This starts with output rather than understanding, purpose and testing."],
   ["Learn technical facts about AI but avoid applying them to real design decisions.",0,"Capacity includes using understanding to make and test meaningful things."]
  ]:[
   ["Understand what the system can and cannot do, choose a purposeful workflow, verify what deserves trust, then consider who is affected, what safeguards are needed and who remains accountable.",1,"This integrates Capacity with Judgement: capability, workflow and creation remain connected to purpose, evidence and consequences."],
   ["If the system works technically and the information is accurate, questions about learning, agency, fairness or redress no longer matter.",0,"Technical capacity and factual accuracy are important, but neither is sufficient for responsible use."],
   ["Use the most capable tool first, then decide on purpose, evidence and safeguards after seeing the output.",0,"Capacity should not lead judgement; purpose and safeguards belong in the decision from the beginning."]
  ],
  feedback:{noticed:"You connected learning across three strands instead of treating each module as isolated.",matters:"Capacity and judgement become more useful when ideas combine across situations.",elsewhere:"Use the same synthesis when a future task crosses technical, learning and ethical boundaries."}
 };
}
const V21_APPLY=Object.fromEntries(LESSONS.map(l=>[l.id,v21Apply(l)]));
const V21_TRANSFER=Object.fromEntries(LESSONS.map(l=>[l.id,v21Transfer(l)]));
const V21_SYNTHESIS=Object.fromEntries(LESSONS.filter(l=>["A3","B3"].includes(l.strand)).map(l=>[l.id,v21Synthesis(l)]));
