/* Curriculum investigations for all 30 Grade 6–10 modules.
   Teacher-authored prompts; no external AI service, student data collection,
   implied mastery, or need for a commercial AI account. */
const INQUIRY_BRIEFS = {
  "6-A1":{
    title:"Find the invisible rule",question:"When does a computer follow fixed steps, and when does it use learned patterns?",
    try:"Compare a countdown timer, a photo recogniser and a word predictor. Describe the input, the rule or learned pattern, and the output for each.",
    evidence:"Use one example to explain what the system can do and a question it cannot reliably answer.",
    transfer:"Find a tool used in science or sport and identify what evidence would demonstrate its capabilities."
  },
  "6-A2":{
    title:"Make a fair prompt comparison",question:"Does changing one part of a prompt make an explanation more useful?",
    try:"Use three teacher-created responses to the same science question. Change only the audience, format or verification request; keep your success criteria constant.",
    evidence:"Record which changed instruction improved understanding, and what still needs fact-checking.",
    transfer:"Revise an instruction to support your own language-learning practice rather than replace it."
  },
  "6-A3":{
    title:"Ideas that remain yours",question:"Does using AI suggestions improve an original design—or take it away from its creator?",
    try:"Sketch two waste-reduction ideas before reviewing a teacher-provided AI brainstorm. Adapt or reject suggestions and explain the choice.",
    evidence:"Show a before-and-after sketch with one independently made design decision and a way to test it.",
    transfer:"Test your idea with someone who would actually use it."
  },
  "6-B1":{
    title:"Protect the thinking",question:"What learning disappears if a tool completes the task for you?",
    try:"Compare getting a finished paragraph, a question, a hint and critique of your own draft. Identify which step preserves the skill being practised.",
    evidence:"Make a two-column learning plan: what I must practise, and what a tool may help with.",
    transfer:"Apply the plan to a maths or writing task and decide when not using AI is better."
  },
  "6-B2":{
    title:"Trace a surprising claim",question:"What makes a claim trustworthy beyond sounding confident?",
    try:"Mark three factual claims in a fictional AI-generated animal fact sheet. Find the evidence needed to verify each claim, using teacher-provided references.",
    evidence:"Record the original claim, the source, a correction or uncertainty, and what evidence is still missing.",
    transfer:"Fact-check a scientific claim before passing it on."
  },
  "6-B3":{
    title:"Make the prompt safer",question:"Could a useful request also put someone else's information at risk?",
    try:"Rewrite three example prompts so they no longer reveal names, faces, locations or private circumstances. Decide which tasks require permission.",
    evidence:"Explain what you removed, what you kept and who you would ask if uncertain.",
    transfer:"Create a privacy-respecting instruction for a class poster."
  },
  "7-A1":{
    title:"Train, test and question a toy classifier",question:"Can the choice of training examples change a model's results on unseen cases?",
    try:"Run the interactive leaf-classifier laboratory. Test a skewed training set, switch to balanced examples and compare results using the same unseen test set.",
    evidence:"Report correct predictions out of four, name the cases that changed and explain why the result is not a universal accuracy claim.",
    transfer:"Ask who or what might be absent from a real-world training dataset."
  },
  "7-A2":{
    title:"Build an inquiry evidence chain",question:"How can AI suggest a direction without inventing your sources?",
    try:"Compare two suggested research questions and a source list. Check whether each citation exists and actually supports the claim.",
    evidence:"Keep a traceable question–source–claim–verification table with unsupported claims labelled.",
    transfer:"Use the method for an Individuals & Societies investigation."
  },
  "7-A3":{
    title:"Revise without losing your voice",question:"Which feedback improves an authentic message without replacing the author's intention?",
    try:"Draft a short message for a real audience. Compare an independent critique with a teacher-provided AI critique; accept, revise or reject suggestions.",
    evidence:"Show your original, revised version and three decisions about feedback.",
    transfer:"Ask an actual reader what changed in their understanding."
  },
  "7-B1":{
    title:"Build a learning-use decision tree",question:"When is feedback helpful but a finished answer a shortcut?",
    try:"Apply a decision tree to studying, problem-solving and drafting. For each, describe the skill that is meant to grow.",
    evidence:"Justify one AI-use choice, one limited-use choice and one non-use choice.",
    transfer:"Use the tree before beginning your next independent assignment."
  },
  "7-B2":{
    title:"The source independence test",question:"Do five identical headlines count as five independent confirmations?",
    try:"Trace a claim through a fictional chain of republished articles to the original document. Compare what each source adds or omits.",
    evidence:"Draw a source map and indicate which reports are independent and which repeat an earlier claim.",
    transfer:"Apply lateral reading to a historical event or current issue."
  },
  "7-B3":{
    title:"Consent and credit studio",question:"Can we use a creative asset just because it is easy to find or generate?",
    try:"Plan a multimedia story using licensed, original and AI-supported materials. Examine a fictional portrait, source attribution and permission requirements.",
    evidence:"Write a clear AI-use acknowledgement and a consent checklist.",
    transfer:"Review the credits and permissions on a group project."
  },
  "8-A1":{
    title:"Control your model comparison",question:"How do we tell a demonstrated difference from an unsupported claim of superiority?",
    try:"Compare three teacher-supplied outputs with the same question and rubric. Change one testing condition, note response variation and inspect errors.",
    evidence:"Produce a test table with tasks, criteria, observed failures and the limits of your comparison.",
    transfer:"Use the same approach when comparing digital tools in another subject."
  },
  "8-A2":{
    title:"Design a human-led workflow",question:"Where should human evidence, judgement and responsibility enter an AI-supported process?",
    try:"Map a local research task twice: with a tool and without one. Add checkpoints for data sources, affected people and the final decision.",
    evidence:"Use test criteria to identify which workflow is more dependable, not just faster.",
    transfer:"Share your workflow with someone who would need to use it."
  },
  "8-A3":{
    title:"Test an inclusive prototype",question:"Does a polished solution solve the problem for its intended users?",
    try:"Interview or use a teacher-written user profile. Prototype a community information resource, check readability and accessibility, then revise.",
    evidence:"Show one user need, a testing observation, a revision and a justified AI-use or non-use choice.",
    transfer:"Test your prototype with a second user whose needs are different."
  },
  "8-B1":{
    title:"When less technology helps more",question:"Could adding AI undermine the exact skill a learner needs to practise?",
    try:"Compare mental calculation, translation practice and project planning. For each, test an independent-first approach against an AI-first approach.",
    evidence:"Use a goal–benefit–risk–alternative table and justify when to use, limit or avoid AI.",
    transfer:"Apply the decision to a task you are doing this week."
  },
  "8-B2":{
    title:"Who is missing from the feed?",question:"How does a ranking system's goal influence which voices we encounter?",
    try:"Run the interactive feed-ranking laboratory. Compare engagement-first and evidence-and-diversity-first ranking of fictional school news items.",
    evidence:"Record which voices rise or disappear, the ranking goal, and a change that would improve representation.",
    transfer:"Review the sources and perspectives included in a real research result or feed."
  },
  "8-B3":{
    title:"Map who benefits and who bears the risk",question:"Is efficiency enough to justify a school decision system?",
    try:"Examine a fictional school scheduling assistant. Identify affected groups, errors, appeal routes and who can overrule an automated recommendation.",
    evidence:"Create a stakeholder map and propose an oversight safeguard with a measurable test.",
    transfer:"Ask whose perspective is missing from another school process."
  },
  "9-A1":{
    title:"Test the edge cases",question:"What can four test cases tell us—and what can they not tell us—about reliability?",
    try:"Design common and unusual test cases for a fictional school-support classifier. Separate accuracy, harmful errors and uncertainty.",
    evidence:"Create a mini evaluation card listing scope, error types, test results, known gaps and what needs further testing.",
    transfer:"Challenge a product's accuracy claim using the limits of its evidence."
  },
  "9-A2":{
    title:"Compare total cost, not just speed",question:"Does the fastest first draft lead to the best completed work?",
    try:"Compare a hypothetical AI-assisted and non-AI data interpretation workflow. Include checking time, revision effort, source quality and impact.",
    evidence:"Define fair criteria before comparing methods and justify the result despite trade-offs.",
    transfer:"Use your criteria before automating a process in another subject."
  },
  "9-A3":{
    title:"Audit the representation",question:"Could a creative AI-supported product misrepresent the audience it hopes to serve?",
    try:"Prototype an awareness message. Inspect portrayal, readability, image rights and cultural representation using feedback from a relevant audience.",
    evidence:"Produce a version history and a short accessibility and representation review.",
    transfer:"Use the same audit on a visual product you did not create."
  },
  "9-B1":{
    title:"Where does a helpful chatbot cross a boundary?",question:"When does seemingly supportive language risk encouraging secrecy or dependence?",
    try:"Use the interactive fictional chatbot-boundary case. Compare choices, note how a system can simulate empathy and decide when to seek human support.",
    evidence:"Create three practical boundaries for AI advice and a plan for getting help from an appropriate person.",
    transfer:"Apply the boundaries to a different digital relationship or recommendation."
  },
  "9-B2":{
    title:"Investigate a synthetic media claim",question:"What evidence establishes the origin of a convincing image, audio clip or video?",
    try:"Review a fictional viral clip's timeline, context and source trail. Compare its visual realism with independently checkable provenance.",
    evidence:"Publish a short verification report stating what is known, uncertain and unsupported.",
    transfer:"Pause before sharing a sensational claim and explain the verification decision."
  },
  "9-B3":{
    title:"The human cost of automation",question:"Who benefits when an AI system saves time, and who may do additional work or face new risks?",
    try:"Examine a fictional employer using AI to screen applications. Consider affected workers, applicants, energy demand and a route to appeal.",
    evidence:"Write a stakeholder impact brief with at least two benefits, two harms and three safeguards.",
    transfer:"Investigate an AI-related change in a profession or public service."
  },
  "10-A1":{
    title:"Write a transparent model evaluation card",question:"What evidence would persuade you that an AI tool is fit for a particular use?",
    try:"Evaluate an unfamiliar fictional model: intended users, data, scenarios, representative tests, errors and limitations.",
    evidence:"Publish a model card that clearly separates observed performance from untested claims.",
    transfer:"Apply your evaluation card to another technology without relying on marketing language."
  },
  "10-A2":{
    title:"Defend a tool choice under constraints",question:"What would make a non-AI, AI-assisted or blended workflow the most responsible choice?",
    try:"Test two workflows against the same quality criteria. Add verification cost, data privacy, accessibility and a failure recovery plan.",
    evidence:"Present a decision memo with explicit alternatives, trade-offs, revised assumptions and a checkpoint.",
    transfer:"Use this approach for an independent project with real constraints."
  },
  "10-A3":{
    title:"Build an evidence-backed solution",question:"Can your solution solve a real need, withstand testing and remain accountable?",
    try:"Use the capstone project brief: define a stakeholder and need, compare AI and non-AI approaches, prototype, test an edge case and revise.",
    evidence:"Prepare a product or prototype plus test log, stakeholder feedback, risk/benefit analysis and defended design decision.",
    transfer:"Present to an authentic audience and explain what you would improve after deployment."
  },
  "10-B1":{
    title:"Defend purposeful non-use",question:"Can you demonstrate technical capability while choosing not to automate something?",
    try:"Keep a decision log during a real project. Record what you considered, what you delegated, what you refused and what you verified.",
    evidence:"Defend one difficult decision with evidence and explain the effect on your own learning.",
    transfer:"Respond to a peer challenge to your decision without relying on convenience alone."
  },
  "10-B2":{
    title:"Argue with calibrated uncertainty",question:"How should conclusions change when credible sources disagree?",
    try:"Construct a claim–evidence–certainty matrix from conflicting fictional reports. Distinguish measurement error, missing evidence and genuinely different interpretations.",
    evidence:"Write a qualified conclusion, show your evidence trail and explain what could change your view.",
    transfer:"Apply the method to an unfamiliar contemporary issue."
  },
  "10-B3":{
    title:"Write governance that can be tested",question:"What should happen when an AI system produces a harmful or contested decision?",
    try:"Create a school AI-use charter, consult at least two affected roles and test it with a fictional failure case. Design review, appeal and correction routes.",
    evidence:"Submit an accountable policy with named responsibilities, evaluation criteria and a revision based on objections.",
    transfer:"Use stakeholder feedback to strengthen safeguards in another system."
  }
};

const CAPSTONE_GUIDES = {
 "8-A3":{
   name:"Inclusive design dossier",
   phases:["Define an authentic user need and who was consulted.","Compare a non-AI, AI-assisted and blended design route.","Prototype the chosen resource and test readability and accessibility.","Collect feedback from a user or a teacher-provided persona, revise, and explain what changed."],
   evidence:["User need and success criteria","Before-and-after prototype","Testing log and feedback","Justified tool choice and limitations"],
   review:"Can someone other than the designer use it successfully? What evidence demonstrates that?"
 },
 "9-A3":{
   name:"Responsible media production file",
   phases:["Identify the audience, claim and intended social impact.","Draft a human-first message and document any AI contribution.","Check image provenance, factual claims, portrayal and accessibility.","Revise based on critique and create an honest attribution note."],
   evidence:["Original and revised product","Fact-check and representation audit","Attribution and consent plan","Audience feedback"],
   review:"Would a person represented in this work regard it as fair and accurate?"
 },
 "10-A3":{
   name:"Authentic AI decision and design capstone",
   phases:["Understand a real need through a stakeholder conversation or teacher-provided user brief.","Compare AI-supported, non-AI and blended approaches against agreed criteria.","Build a testable prototype, including accessibility, privacy and an unusual failure case.","Gather feedback, revise and defend your choices in a short conference or presentation."],
   evidence:["Problem brief and stakeholder needs","Alternatives and decision record","Prototype and reproducible test log","Feedback, revisions and remaining limitations","Evidence-based explanation of who benefits and who carries risk"],
   review:"Can your solution be evaluated by someone else, including the decision not to use AI?"
 },
 "10-B3":{
   name:"Responsible AI governance charter",
   phases:["Choose a realistic school or community decision involving AI.","Map affected groups, benefits, foreseeable harms and missing perspectives.","Draft responsibilities, transparency, consent, appeal and correction safeguards.","Stress-test a failure scenario, consult stakeholders and revise the charter."],
   evidence:["Stakeholder impact map","Versioned governance charter","A concrete failure-case test","Revision and accountability log"],
   review:"Can a person affected by a wrong decision understand it, challenge it and obtain correction?"
 }
};
