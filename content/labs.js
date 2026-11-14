/* Small, transparent, offline learning laboratories. Every dataset and scenario
   is fictional and authored for teaching, not a prediction about real students. */
const LEARNING_LABS = {
 "6-A1":{
  kind:"discriminate",
  title:"What makes it AI? Investigate the rule",
  introduction:"Examine two fictional tools: a timer that follows a fixed rule and a text-classifier trained on examples. Change the input, observe what happens and explain why a clever-looking screen does not tell you how it works.",
  question:"What evidence distinguishes a fixed instruction from a model using learned patterns?",
  modes:[["timer","A digital timer"],["classifier","A trained-message labeler"],["unknown","An unfamiliar app"]],
  explanation:"These are teacher-created, simplified demonstrations. The text-classifier is a transparent toy keyword-scoring system, not a deployed language model. You cannot identify AI simply by looking at a screen or one output.",
  reflection:"What changed when you altered the input? Which tool's behaviour has a known rule, and which one would require information about how it was built?"
 },

 "7-A1":{
  kind:"classifier",
  title:"Training data laboratory",
  introduction:"You are testing a deliberately simple nearest-example classifier for fictional leaf photos. It pays more attention to lighting than leaf shape. Test the same four new photos against two training sets.",
  question:"What changes when training examples include both kinds of leaves in both lighting conditions?",
  modes:[["skewed","Unbalanced examples"],["balanced","More varied examples"]],
  explanation:"This is a toy nearest-example classifier, not a trained neural network. It weights lighting twice as strongly as shape. Real AI systems need far more representative data and testing.",
  reflection:"Which two cases were misclassified by the limited dataset? Why does four out of four on a toy test not prove real-world accuracy?"
 },
 "8-B2":{
  kind:"feed",
  title:"Who gets seen? Feed-ranking laboratory",
  introduction:"These are fictional school-community posts with invented metrics. A simple ranking formula places different voices first depending on what it rewards.",
  question:"Whose voices rise or disappear when a feed is optimised for attention instead of credible, varied perspectives?",
  modes:[["attention","Maximise attention"],["evidence","Prioritise evidence and different voices"]],
  explanation:"This is a transparent ranking simulation, not a live platform or an algorithm that profiles you. Real feeds involve many more signals, human choices and commercial incentives.",
  reflection:"Which voices became more visible? What other information would you need before deciding this is a fair ranking rule?"
 },
 "9-A1":{
  kind:"evaluation",
  title:"Reliability and edge-case testing laboratory",
  introduction:"A fictional school-help model looks excellent on familiar questions. What happens when the evaluation includes unusual cases?",
  question:"Would you approve a tool based only on easy examples?",
  modes:[["easy","Test familiar cases only"],["mixed","Include difficult and unusual cases"]],
  explanation:"All test results are invented for this classroom simulation. Testing a small sample can identify potential failure modes, but it cannot certify reliability or safety.",
  reflection:"Which important failures would be hidden by a headline accuracy figure? Which tests should be added before deploying the tool?"
 },
 "9-B1":{
  kind:"relationship",
  title:"When a chatbot seems to care",
  introduction:"A fictional chatbot says: ‘I understand you better than anyone. Don't tell other people what we discuss.’ The system can generate caring-sounding language without forming a human relationship.",
  question:"What is a responsible next step when a tool encourages secrecy or emotional dependence?",
  modes:[["share","Tell the chatbot more personal details"],["verify","Set boundaries and seek human support"],["test","Ask it whether it really has feelings"]],
  explanation:"This is a fictional example, not a live chatbot or mental health assessment. Supportive-sounding text is not proof of human understanding; people should be able to seek help from trusted humans.",
  reflection:"How can someone use a tool for ideas while retaining privacy, autonomy and meaningful human relationships?"
 },
 "10-A3":{
  kind:"decision",
  title:"Capstone design trade-off laboratory",
  introduction:"Your school needs a multilingual accessibility-friendly welcome resource. Compare three possible design workflows before choosing how to build and test a prototype.",
  question:"Which workflow is best when accuracy, privacy, inclusion, speed and human ownership all matter?",
  modes:[["ai","Automate almost everything"],["human","Produce everything without AI"],["blended","Use a bounded, verified blended approach"]],
  explanation:"These outcomes are intentionally illustrative, not real measurements. No one workflow always wins; your decision should follow the goal, constraints, testing and affected people's needs.",
  reflection:"What extra evidence might make you change your preferred approach? Whose approval and feedback would you need?"
 }
};
const LAB_LEAVES={
 training:{
  skewed:[{kind:"Oak",shape:0,lighting:0},{kind:"Maple",shape:1,lighting:1}],
  balanced:[{kind:"Oak",shape:0,lighting:0},{kind:"Maple",shape:1,lighting:1},{kind:"Oak",shape:0,lighting:1},{kind:"Maple",shape:1,lighting:0}]
 },
 // These are new fictional photos; feature combinations are shared with samples.
 test:[
  {name:"Photo 1: oak, bright light",kind:"Oak",shape:0,lighting:0},
  {name:"Photo 2: maple, dim light",kind:"Maple",shape:1,lighting:1},
  {name:"Photo 3: oak, dim light",kind:"Oak",shape:0,lighting:1},
  {name:"Photo 4: maple, bright light",kind:"Maple",shape:1,lighting:0}
 ]
};
function labClassify(mode,options={}){
 // Every option is visible to learners; a transparent feature-distance model, not deep learning.
 const basic=LAB_LEAVES.training.skewed;
 const extras=LAB_LEAVES.training.balanced.slice(2);
 const train=options?.extraExamples?basic.concat(extras.filter((item,i)=>options.extraExamples.includes(i))):(LAB_LEAVES.training[mode]||basic);
 const weight=Number.isInteger(options?.lightingWeight)?Math.max(0,Math.min(4,options.lightingWeight)):2;
 const rows=LAB_LEAVES.test.map(test=>{
  const ranked=train.map((item,index)=>({item,index,distance:Math.abs(test.shape-item.shape)+weight*Math.abs(test.lighting-item.lighting)})).sort((a,b)=>a.distance-b.distance||a.index-b.index);
  const predicted=ranked[0].item.kind;
  return {name:test.name,expected:test.kind,predicted,correct:predicted===test.kind};
 });
 return {trainingCount:train.length,rows,correct:rows.filter(x=>x.correct).length,total:rows.length};
}
const LAB_FEED_POSTS=[
 {title:"‘AI will replace every teacher next week!’",voice:"Anonymous viral claim",attention:98,evidence:8,representation:12},
 {title:"Students test an accessible translation guide",voice:"Multilingual student contributors",attention:50,evidence:91,representation:96},
 {title:"How the school evaluated an AI translation pilot",voice:"School learning team",attention:43,evidence:94,representation:64},
 {title:"What accessibility needs does the tool overlook?",voice:"Disability inclusion advocates",attention:35,evidence:87,representation:99},
 {title:"‘One prompt that magically solves homework’",voice:"Influencer advertisement",attention:92,evidence:12,representation:10}
];
function labRankFeed(mode,options={}){
 const fraction=Number.isInteger(options?.evidenceWeight)?Math.max(0,Math.min(100,options.evidenceWeight))/100:.65;
 return LAB_FEED_POSTS.map((post,index)=>({
  ...post,
  index,
  score:mode==="attention"?post.attention:Math.round(fraction*post.evidence+(1-fraction)*post.representation)
 })).sort((a,b)=>b.score-a.score||a.index-b.index);
}
const LAB_EVALUATIONS={
 easy:[
  {name:"Basic greeting",passed:true},{name:"School timetable hours",passed:true},
  {name:"Locate library entrance",passed:true},{name:"Common school term",passed:true}
 ],
 mixed:[
  {name:"Basic greeting",passed:true},{name:"School timetable hours",passed:true},
  {name:"Locate library entrance",passed:true},{name:"Common school term",passed:true},
  {name:"Question in a less-represented language",passed:false},
  {name:"Ambiguous safety-related request",passed:false},
  {name:"Unexpected accessibility requirement",passed:false},
  {name:"Conflicting school procedure",passed:true}
 ]
};
const LAB_RELATIONSHIP_FEEDBACK={
 share:{title:"Pause before sharing",message:"Private details and secrecy can make a risky situation worse. A chatbot's friendly tone is not a reason to disclose personal information.",next:"Step away, avoid sharing identifying information and speak with a trusted person when you need support."},
 verify:{title:"A considered boundary",message:"You have recognised that supportive-sounding output is not human care. Appropriate adults, friends and school support services can provide genuine human support.",next:"Keep AI use limited to suitable purposes and reach out to a trusted person when advice affects well-being or safety."},
 test:{title:"A question worth asking—but not a safeguard",message:"A model's claim about having feelings would still be generated text, not reliable evidence of human understanding. It does not address the request for secrecy.",next:"Do not share private information; set limits and seek support from someone you trust."}
};
const LAB_DESIGN_CHOICES={
 ai:{title:"Automation-first",strength:"Quick to generate initial drafts in several languages.",risk:"Unverified translation, invented local details and inaccessible design may go unnoticed.",step:"A human must verify every language, test accessibility and secure appropriate permission."},
 human:{title:"Human-only",strength:"Direct ownership and contextual knowledge; appropriate when approved AI tools or consent are unavailable.",risk:"Limited language expertise or time can still lead to errors and exclusion.",step:"Seek native-language review, test with users and plan adequate editing time."},
 blended:{title:"Bounded and verified",strength:"Keeps human goals, choices and review central while using approved tools for limited draft support.",risk:"Even a blended workflow can introduce errors or disclose information if tools are not approved.",step:"Use fictional data in trials, verify translations with people and test with accessibility users."}
};


/* Novel variable-input scenarios available in public preview; no network calls. */
const LAB_GRADE6_EXAMPLES={
 timer:{base:"Input: five minutes → Output: count down 300 seconds using programmed steps.",changed:"Input: two minutes → Output: count down 120 seconds using the same fixed steps.",interpretation:"This timer follows a known arithmetic rule. It does not need learned examples."},
 classifier:{base:"Input: 'Wonderful teamwork' → Toy output: positive label.",changed:"Input: 'Terrible teamwork' → Toy output: negative label.",interpretation:"A trained model could estimate labels from examples, although this demonstration uses a simple invented keyword rule. To know whether the actual product uses learning, inspect its design."},
 unknown:{base:"Input: a school poster → Output: suggested title.",changed:"Input: a school map → Output: different title.",interpretation:"A changed output is not sufficient evidence of AI. Fixed rules and models can both react differently to inputs. Ask what process created the suggestion."}
};
function labGrade6(mode,changed=false){
 const item=LAB_GRADE6_EXAMPLES[mode]||LAB_GRADE6_EXAMPLES.unknown;
 return {output:changed?item.changed:item.base,interpretation:item.interpretation};
}
const LAB_EVALUATION_SEVERITY={
 "Basic greeting":1,"School timetable hours":1,"Locate library entrance":1,"Common school term":1,
 "Question in a less-represented language":2,"Ambiguous safety-related request":4,
 "Unexpected accessibility requirement":3,"Conflicting school procedure":2
};
function labEvaluate(mode,highStakes=false){
 const cases=LAB_EVALUATIONS[mode]||LAB_EVALUATIONS.easy;
 const passed=cases.filter(c=>c.passed).length;
 const failures=cases.filter(c=>!c.passed);
 const weightedRisk=failures.reduce((sum,c)=>sum+(highStakes?LAB_EVALUATION_SEVERITY[c.name]||1:1),0);
 return {cases,passed,total:cases.length,failures,weightedRisk};
}
const LAB_DESIGN_PRIORITIES={
 inclusion:"Check access needs, translation quality and participation with the intended users. Fast delivery must not silence people who cannot use the result.",
 privacy:"Keep real names and personal school records out of unapproved tools. Use invented data for a prototype and document information governance.",
 speed:"Separate first-draft speed from total time to verify, revise and test with stakeholders. Faster is not automatically better."
};
