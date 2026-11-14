/* Capacity × Judgement · senior curriculum, G11–12 / DP1–DP2.
 * Authored, fictional learning content. Inherits six strands and five stages;
 * adds increasingly independent, defensible, student-owned inquiry.
 */
Object.assign(GRADES,{
  11:{headline:"Investigate & Architect",subtitle:"Understand complexity. Design with evidence.",
    focus:"Investigate unfamiliar AI systems, evaluate competing methods and design solutions that can withstand scrutiny.",
    challenge:"A credible system should survive questions its designer did not anticipate."},
  12:{headline:"Create & Steward",subtitle:"Create with purpose. Take responsibility.",
    focus:"Develop original, accountable solutions, defend decisions before an audience and investigate long-term impact.",
    challenge:"What responsibility do you carry for what you help bring into the world?"}
});
const SENIOR_MODULES={
 "11-A1":{
  title:"Beyond the Model",
  objective:"Investigate unfamiliar AI architectures, retrieval, evaluation and how system design affects reliability.",
  activity:"Evaluate a fictional admissions-support classifier against familiar, shifted and accessibility-related cases. Change the assessment threshold and the cost of different errors; document scope, limitations and safe deployment boundaries.",
  scenario:"A vendor presents excellent accuracy from one benchmark. Does it show the model can support a different school population?",
  answer:"No. Inspect the tasks, ground truth, distribution shifts, false exclusions, uncertainty and consequential errors before even considering a trial.",
  principle:"A system's performance is conditional on its design, data, context and independently evaluated limits.",
  evidence:"Produce a model evaluation card with test design, observed trade-offs, scope limits and a defensible recommendation.",
  core:[
   "AI systems can combine model inference, retrieval, tools, data preparation and human decisions. A language model that generates plausible text is different from a retrieval component that selects a source, and neither guarantees that a claim has been independently verified. Start with a system diagram: inputs, components, outputs, controls and people who make decisions.",
   "Evaluation must be designed around the actual use. Define the target population, independent reference labels, appropriate baselines and what kinds of errors matter. Accuracy can obscure false exclusions or group differences, while distribution shift means a model tested on one context can perform differently elsewhere. A small simulation illustrates trade-offs but cannot estimate a real population's risk.",
   "Investigators should distinguish demonstration, controlled evaluation and deployment evidence. Build adversarial cases, record the denominator, analyse important failure modes and recommend an oversight or non-use condition. If you cannot inspect the training data or vendor claims, explain what can be established independently and what remains unknown."
  ],
  example:["The dashboard says 94% accuracy, so our school can deploy it to allocate opportunities.",
   "I will map the system's decision pathway, compare its predictions with independent reference cases, test different populations, report false exclusions and explain why the results do not yet support deployment."],
  check:["What would most seriously weaken a claimed evaluation result?",["An independent held-out test of intended-use cases.","A report that ignores distribution shifts and consequential false exclusions.","A comparison against a non-AI baseline."],1],
  contexts:[["DP science and technology investigation","Draft a model evaluation card for a synthetic laboratory assistant, separating measured performance from untested settings."],["School review panel","Evaluate a fictional resource-allocation classifier and propose evidence needed before any accountable pilot."]],
  glossary:[["Distribution shift","When the situations presented to a system differ materially from those used to train or evaluate it."],["False negative","A case that meets a defined reference condition but is rejected or missed by the classifier."]],
  scaffold:["Which part of the result comes from the model, which from the data, and which from human design?","Draw an input-to-decision diagram and test two clearly labelled fictional cases before generalising.","Design a held-out test with a different reference population, then defend the error cost and baseline.","Apply model-card thinking to a new assistive technology.",["Diagram the components and their human decision points.","Report evaluation results and failure costs with the denominator.","Define a justified stop, review or non-use condition."]],
  activityData:{kind:"evidence",title:"Challenge the headline metric",intro:"A vendor's score looks excellent on routine cases. What evaluation is most defensible?",options:[
   ["Approve immediately; the advertised percentage exceeds the school's target.","A vendor percentage is incomplete without representative use-case evaluation and costs of error."],
   ["Create held-out tests with distribution shifts, independent labels, error costs and a non-AI baseline.","This distinguishes what was observed from what remains uncertain before considering deployment."],
   ["Change the threshold until overall accuracy looks highest, and suppress the subgroup breakdown.","Optimising a headline can conceal consequential errors and unequal outcomes."]],correct:1,tip:"An honest model card needs scope, test cases, limitations, failure consequences and conditions for use."},
  diag:["A system performs well on familiar cases but fails accessibility requests. What follows?",["The familiar result proves reliability for everyone.","Only the accessible cases matter.","Its intended-use evaluation and failure analysis must expand."],2,"Test relevant conditions, not a single convenient sample."]
 },
 "11-A2":{
  title:"Designing Intelligent Workflows",
  objective:"Architect human–AI workflows with reliable verification, scope restrictions and recovery when tools fail.",
  activity:"Compare non-AI, AI-first and bounded workflows for a multilingual research brief. Track sources, total revision effort, permissions and what a human must verify before publication.",
  scenario:"An AI-powered research chain completes six steps quickly but creates an unsupported citation. Is automation an improvement?",
  answer:"Only if the whole workflow—including independent checks and recovery—meets the task, evidence, privacy and quality requirements.",
  principle:"A workflow is intelligent only when its goals, evidence, safeguards and failure recovery are defensible.",
  evidence:"Submit a workflow diagram, controlled comparison, evaluation criteria and a tested recovery route.",
  core:[
   "AI-assisted workflows are systems of decisions, not just sequences of prompts. Define a task contract: inputs, data permissions, intended audience, sources, tool actions and outputs. Keep human responsibility explicit at consequential decisions and use approved accounts or fictional materials for trials.",
   "Agent-like workflows can amplify an early mistake when every later step treats generated text as verified evidence. Identify fragile hand-offs, when retrieval supports a claim, which actions require confirmation and how to stop a chain safely. Compare the total work of AI-assisted and non-AI approaches, including checking and correction.",
   "A robust architecture includes logs of decisions, a way to reproduce an output, limits on tool access, tests for plausible failures and a rollback or human route. Design for an unexpected error and communicate what the system cannot guarantee rather than promising effortless automation."
  ],
  example:["All six automated stages completed, so the output must be reliable.",
   "I will trace the source at each step, gate unverified claims, compare total effort against a human-led alternative and rehearse recovery when a citation or tool action fails."],
  check:["Which plan makes an AI research workflow more reliable?",["Publish automatically after all stages run.","Set evidence checks, tool permissions, stop rules and human decision ownership.","Use more agents so no one has to verify the output."],1],
  contexts:[["DP Extended Essay research planning","Sketch an acceptable research-support workflow that preserves independent inquiry, source verification and transparent AI acknowledgement."],["Multilingual community publishing","Compare three publication routes for a fictional translated community notice, including checking and revision costs."]],
  glossary:[["Human checkpoint","A point where a qualified person reviews evidence and retains authority before a consequential step."],["Recovery path","A tested way to detect, halt, correct or safely reverse an unsuccessful process."]],
  scaffold:["Where would one hallucinated citation travel next?","Annotate a three-step draft workflow with a check, stop rule and named human decision.","Test a permission failure or unreliable source; design a way to recover without hiding the error.","Transfer a trusted workflow design to collaborative science research.",["Define input, permission, verification and output contracts.","Evaluate a workflow against an independent baseline.","Rehearse failure recovery and defend human authority."]],
  activityData:{kind:"sequence",title:"Architect a responsible research chain",intro:"Arrange the steps for a reliable AI-assisted inquiry, then justify where the process may loop back.",steps:[
   "Define the research question and what remains original student work",
   "Check permitted tools, sensitive data and source-access limits",
   "Generate or retrieve tentative leads and verify original evidence",
   "Ask a human to evaluate uncertainty, revise and approve conclusions",
   "Record decisions, attribution and an appropriate failure-recovery route"
  ],start:[2,0,4,1,3],tip:"The sequence is a starting architecture; real inquiry must revisit earlier steps when evidence contradicts assumptions."},
  diag:["An automated pipeline invents a reference but keeps running. Which design is strongest?",["Independent source checkpoints and a safe stop route.","More automatic stages.","No documentation."],0,"Verification should interrupt propagation of an unsupported claim."]
 },
 "11-A3":{
  title:"From Problem to System",
  objective:"Translate stakeholder needs into a technically and socially testable design proposal.",
  activity:"Investigate a school/community accessibility challenge, compare three approaches and prototype a response with success measures, usability tests and responsible data handling.",
  scenario:"Your prototype works in the designer's language but not for the people it was built to serve. Has it succeeded?",
  answer:"Not yet. Test with the intended users or a teacher-authored alternative brief, revise, and explain the gap between attractive output and actual usefulness.",
  principle:"A legitimate design begins with stakeholder needs and survives evidence-driven iteration.",
  evidence:"Produce a stakeholder brief, tested prototype, accessibility review and transparent revision record.",
  core:[
   "Architecting a solution starts before choosing a model. Understand the problem through appropriate stakeholder consultation, identify constraints and decide whether AI addresses a genuine need. Seek consent and permission when working with people or information, and use teacher-provided personas when direct consultation is unsuitable.",
   "Compare human-led, AI-supported and blended designs against the same outcome criteria. Include data protection, access needs, language representation, operational support and how someone will correct a mistake. Prototype the smallest version that can meaningfully test an assumption rather than producing a polished but unexamined product.",
   "Evaluate the prototype against observable success criteria. Gather user feedback or structured simulated feedback, document unanticipated barriers and change the design. A defensible system proposal includes the limitations and maintenance responsibilities that would exist after a showcase."
  ],
  example:["The generated prototype is attractive, so everyone will find it useful.",
   "I will agree success criteria with the intended audience, test access and accuracy in more than one context, document a barrier and revise the prototype before defending its value."],
  check:["Which evidence best supports an inclusive system design?",["A high-quality promotional video.","A feature list that contains the word accessibility.","Observed user tests, documented revisions and a credible non-AI alternative."],2],
  contexts:[["Student-designed multilingual school guide","Design and test a low-risk guide with language access and accessible navigation, using fictional examples and informed feedback."],["Community service design commission","Produce a prototype for a partner's problem, compare technology and non-technology options and document who bears maintenance costs."]],
  glossary:[["Acceptance criteria","Observable conditions against which a design's usefulness is judged."],["Stakeholder","A person or community affected by a system's use or consequences."]],
  scaffold:["Whose problem is being solved and who had an opportunity to define it?","Describe one user, one barrier, a measurable target and an offline alternative.","Use counterexample testing with a different language or accessibility need before defending your prototype.","Adapt the design process to a CAS-related community need without substituting for CAS requirements.",["Document user needs and ethically gathered feedback.","Compare AI and non-AI options under the same criteria.","Show a tested change and acknowledge remaining responsibilities."]],
  activityData:{kind:"sort",title:"What counts as design evidence?",intro:"Classify claims about a prototype as demonstrated evidence, an assumption or a risk needing action.",categories:["Observed evidence","Untested assumption","Safeguard needed"],items:[
   ["A consented user completed the route in a structured usability test.",0,"A documented user test is evidence about the tested conditions, not all possible users."],
   ["The colour palette looks polished, so newcomers will understand it.",1,"Visual polish does not demonstrate comprehension or inclusive access."],
   ["The draft uses authentic personal records in an unapproved tool.",2,"Private data must not enter an unapproved development workflow."],
   ["A second language group reported a confusing label and the prototype was revised.",0,"Feedback followed by a documented change is evidence of iteration."]],tip:"Do not confuse design intentions, attractive screens and observations from real or teacher-simulated testing."},
  diag:["An AI prototype looks attractive but one target user cannot access it. What matters most?",["Faster publishing.","A verified redesign with the affected user's needs.","More animations."],1,"Authentic usefulness is demonstrated through evaluation and revision."]
 },
 "11-B1":{
  title:"The Architecture of Choice",
  objective:"Explain the consequences of delegating intellectual decisions and design boundaries that preserve personal agency.",
  activity:"Compare independent-first, assistant-first and blended strategies across knowledge creation, problem-solving and authorship. Test which learning evidence remains attributable to the student.",
  scenario:"A student can present an excellent AI-produced argument but cannot defend any of its evidence. What has been learned?",
  answer:"The presentation alone is not evidence of independent understanding. Introduce tasks, explanation and verification that the student can genuinely defend.",
  principle:"Human agency is visible in the choices, reasoning and accountability a learner retains.",
  evidence:"Create an agency protocol and decision log with defended examples of AI use, limited use and non-use.",
  core:[
   "AI can amplify capability without automatically strengthening learning. Automation bias occurs when people defer to an apparently authoritative output despite contrary evidence. Overreliance can also reduce opportunities to practise memory, reasoning, writing or disciplinary judgement.",
   "The appropriate role of an assistant depends on the actual goal. Drafting a first argument, verifying a source, getting feedback and delegating an administrative step place different demands on the learner. Evaluate when independent-first work, scaffolded hints or a bounded tool contribution best protects agency.",
   "Construct an explicit decision protocol: state the skill to be learned, identify acceptable support, retain ownership of interpretations and verify consequential claims. Demonstrate you can defend a position without an assistant and revise it when warranted by evidence."
  ],
  example:["The result is sophisticated, so its author must understand the argument.",
   "I will ask the student to explain evidence independently, identify genuine contributions and use approved AI assistance only when it strengthens rather than replaces the intended thinking."],
  check:["Which observation best demonstrates genuine intellectual independence?",["The student generated the most words.","The student can defend their method, evidence, uncertainty and deliberate use or non-use decisions.","The student used multiple AI tools."],1],
  contexts:[["Theory of Knowledge discussion","Examine whether persuasive machine output is knowledge and prepare an evidence-backed position you can defend."],["DP subject investigation","Write an independent-first tool-use protocol for research, drafts and verification that respects subject-specific assessment rules."]],
  glossary:[["Automation bias","A tendency to over-trust automated advice even when other evidence suggests caution."],["Agency","The practical ability to make informed choices and act on them."]],
  scaffold:["What could the student still explain if the AI tool disappeared?","Separate idea generation, first draft, evidence verification and final judgement by responsibility.","Run a short unaided defence of a contested claim; compare it with a tool-supported explanation.","Transfer the protocol into university application writing or a DP subject task.",["Differentiate genuine support from substitution of thinking.","Defend one deliberate non-use or limited-use decision.","Show independent evidence and a response to challenge."]],
  activityData:{kind:"decision",title:"Which support preserves the learner?",intro:"A student is preparing an evidence-based argument for a DP subject. Which plan shows agency?",options:[
   ["Delegate the thesis and evidence to a model; rehearse its paragraphs word for word.","Polished recitation is not evidence of independent research or subject mastery."],
   ["Write a claim from independently reviewed sources, seek limited critique and then defend the revised reasoning unaided.","Support remains bounded; the learner retains evidence, interpretation and responsibility."],
   ["Ask a model to invent the references, then cite them as original research.","Invented sourcing is not responsible scholarship."]],correct:1,tip:"The goal is defensible learning, not maximum tool use or complete prohibition."},
  diag:["A polished AI-supported essay cannot be defended by its student. What is missing?",["More formatting.","Independent understanding and evidence ownership.","Longer prompts."],1,"Authorship and agency must be supported by demonstrable independent reasoning."]
 },
 "11-B2":{
  title:"Evidence, Knowledge & Uncertainty",
  objective:"Audit source provenance, independent corroboration and the limits of apparently strong research claims.",
  activity:"Examine a fictional citation network, distinguish original evidence from republishing, assess uncertainty and defend whether a contested finding is sufficiently supported.",
  scenario:"Five reports repeat an AI research claim, but all ultimately copy one unverifiable source. Is that broad agreement?",
  answer:"No. Trace the chain, verify original evidence and identify the amount of genuinely independent support before describing confidence.",
  principle:"Credibility depends on traceable methods and independent evidence, not the number of repeating summaries.",
  evidence:"Deliver a provenance map, evidence-quality table, calibrated conclusion and next test.",
  core:[
   "Research claims can appear well supported when several webpages, reports or AI answers all repeat one unverified source. A provenance investigation traces each claim back to the earliest accessible primary data, methods and authorship, distinguishing a new independent test from a repetition.",
   "Evidence quality is not binary. A primary source may still have a small sample, ambiguous measurement or incentive to present results positively; an independent replication can strengthen a claim while leaving uncertainty. Compare the same statement under a copied-source network and a network with multiple independent studies.",
   "A defensible knowledge claim distinguishes what was observed, what was inferred and what remains unknown. Describe the circumstances under which your conclusion might change. This is particularly important when generative tools present bibliographies with plausible but fabricated details."
  ],
  example:["Five web pages repeat the same statistic, so it has been verified five times.",
   "I will trace each page to the original data, separate copies from independent checks and publish a qualified conclusion that describes sample limits and what could overturn it."],
  check:["Which finding adds the strongest independent support to a contested research claim?",["A copy of the first article with a different headline.","A chatbot repeating the same result.","A separately collected study with transparent methods and relevant results."],2],
  contexts:[["Extended Essay methodology review","Audit a fictional source map, reject fabricated citations and create a traceable evidence log."],["TOK knowledge dispute","Develop a calibrated position when sources appear to disagree or to echo one another."]],
  glossary:[["Provenance","The documented origin and chain through which evidence or a claim is created and shared."],["Independent corroboration","Confirmation obtained through a meaningfully separate source or method, not repeated copying."]],
  scaffold:["Which sources have genuinely different origins, and which claims simply repeat earlier reporting?","Draw arrows from each headline to the earliest available data; mark unresolved provenance.","Test what happens to confidence if an apparent independent report is actually copied.","Audit provenance in an unfamiliar science or history claim.",["Trace claims to original evidence and methods.","Separate source quantity from independent corroboration.","Defend uncertainty and propose a discriminating investigation."]],
  activityData:{kind:"evidence",title:"Is this genuine corroboration?",intro:"Three websites repeat a numerical claim from one unverified original post. A fourth shares separately collected evidence. Which description is accurate?",options:[
   ["The three copies count as three independent confirmations.","Shared provenance means repetitions are not independent corroborations."],
   ["The original post and every AI summary are equally reliable because they use the same words.","Matching wording does not establish evidence or method quality."],
   ["The three copies form one evidence chain; the independent study can add support if its method is relevant and credible.","Traceable, independent evidence strengthens a claim without erasing uncertainty."]],correct:2,tip:"Source-trace first; evaluate method and independence rather than simply counting agreeing headlines."},
  diag:["Three articles cite the same original claim. How many independent checks have been shown?",["None beyond the original unless separate methods are demonstrated.","Three because there are three websites.","Every mention is an independent check."],0,"Count independent investigations, not repetitions."]
 },
 "11-B3":{
  title:"Systems, Power & Fairness",
  objective:"Evaluate whose interests are prioritised by AI systems and propose enforceable accountability.",
  activity:"Map affected groups in a fictional school decision system, evaluate disparities, consult stakeholder perspectives and propose safeguards, appeals and a transparent review criterion.",
  scenario:"A school resource tool improves average efficiency but repeatedly misses students with less-common support needs. Is it equitable?",
  answer:"Not without examining distributional consequences, user needs, error remedies and the authority to contest or override decisions.",
  principle:"Responsible systems account for power, inclusion, contestability and consequences—not efficiency alone.",
  evidence:"Prepare an impact assessment with stakeholders, contested trade-offs, a review route and safeguards that can be tested.",
  core:[
   "Technical design decisions distribute opportunities and burdens. Data choices, target metrics, access pathways and people who can overturn a decision all affect power and fairness. Ask who defines success, whose data are absent, who can understand the model and who bears the cost when it fails.",
   "Different fairness indicators can conflict, especially when populations, base rates and error consequences differ. A numerical parity target is not by itself an ethically adequate policy; affected people need meaningful consultation, accessible explanations and a way to contest harmful outcomes.",
   "Draft operational safeguards with clear responsibility and measurable review points. Evaluate privacy, energy and labour effects using evidence rather than convenient invented percentages. Defend a conditional recommendation, including when the system should not be introduced."
  ],
  example:["The average accuracy increased, so the impact on smaller groups is irrelevant.",
   "I will compare error consequences for affected groups, consult relevant users, require explanations and review routes, and recommend the system only under evidence-based, accountable conditions."],
  check:["Which governance design is most accountable?",["A system with an appeal and correction mechanism, representative testing and named owners.","An opaque ranking system with impressive average scores.","A process that always assumes its recommendations are right."],0],
  contexts:[["Community digital-rights panel","Evaluate a fictional housing application tool and recommend safeguards before a limited trial."],["School inclusion review","Analyse access errors in a hypothetical school scheduling system and draft an accessible review and appeal process."]],
  glossary:[["Contestability","People's practical ability to question, challenge and seek correction of a decision."],["Distributional impact","How benefits, errors and burdens fall across different people or groups."]],
  scaffold:["Who benefits, who is absent and who can challenge the decision?","Map one stakeholder, one likely error and the specific person who can correct it.","Compare two fairness goals and explain why they might conflict under real constraints.","Apply an impact assessment to AI in a different public service.",["Map stakeholder power and distributional risk.","Explain evidence needed for fair, accountable deployment.","Specify a practical review and remedy pathway."]],
  activityData:{kind:"sort",title:"Which safeguard is doing the work?",intro:"Classify parts of a proposed AI-supported decision process.",categories:["Accountable safeguard","Evidence needed","Unsafe proposed practice"],items:[
   ["People can see an explanation and request a timely human review.",0,"Contestability requires a real route to review and correction."],
   ["The supplier claims its system has no group disparities but provides no breakdown.",1,"A fairness claim needs defined and independently testable evidence."],
   ["Automatic adverse decisions are final and cannot be challenged.",2,"No-review consequential decisions prevent meaningful redress."],
   ["Representatives of affected groups help define the pilot's review criteria.",0,"Consultation can improve how risk and success are defined."]],tip:"Translate ethical intentions into governance processes that someone can actually use."},
  diag:["A system repeatedly disadvantages a small group despite a high average score. What now?",["Dismiss the small group.","Test distributional harm and provide a meaningful route to appeal.","Lower transparency."],1,"Averages cannot replace analysis of affected groups and actual safeguards."]
 },
 "12-A1":{
  title:"AI at the Frontier",
  objective:"Evaluate unfamiliar multimodal, agentic and emerging AI claims using testable evidence and technical humility.",
  activity:"Assess a fictional new agent's demonstration, benchmark and tool permissions; build a capability and risk evaluation card rather than relying on marketing.",
  scenario:"An agent completes an impressive demonstration, then fails on unfamiliar inputs and requests access to personal records. Is it ready?",
  answer:"Not on that evidence. Separate capability claims, permissions, realistic tasks, uncertainty and accountable human testing before proposing use.",
  principle:"Future-ready AI literacy is the ability to evaluate unfamiliar systems without confusing novelty with proven value.",
  evidence:"Produce a frontier evaluation brief with test cases, confidence limits, access restrictions and a reasoned deployment decision.",
  core:[
   "Emerging AI systems may combine speech, images, text, retrieval, memory and actions. The same product can demonstrate strong performance on one benchmark and behave poorly in unfamiliar settings. Learn to map what each component does instead of treating a product as a single intelligent actor.",
   "An impressive video or vendor benchmark is not a complete system evaluation. Define a realistic task, a non-AI baseline, relevant failures, tool permissions and what the system could do if it made a mistake. Do not infer autonomy, intention or human understanding from fluent behaviour.",
   "Build a repeatable methodology that remains useful after current products change. Test claims, record uncertainty, protect personal information, consider future revision and decide what evidence would justify a bounded trial—or non-use."
  ],
  example:["The agent solved one difficult puzzle, so we should let it access every school system.",
   "I will isolate the demonstrated skill, test independent unfamiliar cases, restrict permissions, identify costly failures and compare a human-led approach before recommending any deployment."],
  check:["What is the best first step when evaluating a new AI agent?",["Provide unrestricted access so it can reveal its potential.","Accept its promotional demonstration as representative.","Map its components, realistic tasks, permissions, limitations and independent tests."],2],
  contexts:[["Future technology review board","Evaluate a fictional AI research assistant and propose limited permissions and independent tests."],["University transition workshop","Write a critical product review that avoids both uncritical enthusiasm and unsupported predictions."]],
  glossary:[["Multimodal system","A system that can process or produce information across forms such as text, audio and images."],["Tool permission","A defined limit on which actions or resources a software system may access."]],
  scaffold:["What was actually demonstrated, and which important condition was not tested?","Make three columns: claimed, observed and still unknown.","Design an unseen permission-error scenario and a stop rule that protects personal data.","Use the evaluation method on a future technology not named in this module.",["Distinguish component capabilities from promotional claims.","Design realistic tests and bounded permissions.","Communicate uncertainties and a reasoned adoption decision."]],
  activityData:{kind:"evidence",title:"Investigate the frontier claim",intro:"A fictional agent can search documents and send emails in a demo. What evidence makes a school pilot responsible?",options:[
   ["Unrestricted permission demonstrates confidence in the technology.","Excessive permissions expose people and resources to unnecessary risk."],
   ["A controlled test with explicit permissions, independent results, stop rules and a human approver.","Test realistic performance while restricting consequential actions and preserving accountability."],
   ["One flawless scripted demonstration without any failure-case testing.","A scripted success is not evidence of dependable operation across unfamiliar conditions."]],correct:1,tip:"The design of the test and the safety of tool access matter more than an impressive demonstration."},
  diag:["An agent succeeds in one scripted demonstration. What can we conclude?",["It is ready for unsupervised deployment.","Only that it performed the demonstrated task in those conditions.","It has human intent."],1,"Performance needs scope, independent tests and permissions."]
 },
 "12-A2":{
  title:"Orchestrate, Verify, Govern",
  objective:"Stress-test multi-step AI workflows, evaluate failure recovery and preserve human accountability.",
  activity:"Use a fictional workflow simulator to compare a fast autonomous chain, a bounded verified approach and a human-led alternative. Introduce unsupported evidence or a failed tool action and defend the recovery design.",
  scenario:"An autonomous publication workflow saves hours, then accidentally sends an unverified public alert. What should the team redesign?",
  answer:"Require pre-publication verification and permissions, safe stop rules, audit trails, a human sign-off and a correction protocol with transparent accountability.",
  principle:"Reliable orchestration is measured by the quality of outcomes and recovery, not the number of autonomous steps.",
  evidence:"Submit a workflow architecture with test traces, failure handling, permissions and an independent quality comparison.",
  core:[
   "As AI tools become more agent-like, their actions may affect calendars, files, messages and people. Design an explicit sequence of allowed inputs, data permissions, tool capabilities and human authority. A workflow that produces fluent text but performs an unverified action is not well governed.",
   "Stress-testing is different from a demonstration. Introduce a broken retrieval step, conflicting information, tool outage or incorrect approval assumption. Compare an unrestricted autonomous chain, a bounded verified workflow and a human-led baseline on accuracy, recovery cost, privacy and inclusive access.",
   "A credible operating design records decisions, explains why a human must approve high-impact actions, allows the workflow to stop safely and supports correction when incidents occur. Demonstrate how you would measure failure recovery and which conditions should block deployment."
  ],
  example:["If all steps ran automatically, the system has already succeeded.",
   "I will test tool failures and unsupported claims, bound permissions, introduce independent verification before publication and assign a human who can stop, correct and explain the outcome."],
  check:["What makes a consequential AI workflow defensible?",["Audit trails, scoped permissions, verified evidence, stop rules and a human approver.","More autonomous steps with no oversight.","Hiding recovery steps to create a seamless experience."],0],
  contexts:[["Multilingual school communications","Architect a low-risk, fictional newsletter workflow and rehearse failure handling before publication."],["Community emergency information","Design a reviewed alert process with a safe stop when a source cannot be verified."]],
  glossary:[["Audit trail","A record of actions, evidence and responsibility that enables later review."],["Fail-safe","A design that moves to a safer state when an important component fails."]],
  scaffold:["Which stage could cause harm if an unverified result triggers an action?","Mark evidence, approval and tool-access points on a three-stage workflow.","Introduce a tool outage and compare recovery latency, error risk and human workload.","Apply the stress-testing method to another complex student project.",["Define and test permissions and human checkpoints.","Demonstrate recovery from one realistic failure.","Compare overall quality with non-AI alternatives."]],
  activityData:{kind:"sequence",title:"Stress-test before publishing",intro:"Arrange an accountable pipeline before an important community notice is sent.",steps:[
   "Define the audience, success conditions and permitted data",
   "Retrieve and independently confirm a source before drafting",
   "Produce a limited draft and log its origin and tool actions",
   "Obtain a human review for accuracy, access and permission",
   "Publish only after approval and prepare a correction route"
  ],start:[2,0,4,1,3],tip:"In practice, a failed verification should stop the pipeline and route it back to a human. The sequence is not automatic certification."},
  diag:["An agent sends an unverified public notice. What design change matters?",["More automatic sending.","An independent source checkpoint and accountable approval before publication.","Removing audit logs."],1,"High-impact actions must depend on verified evidence and a human approval route."]
 },
 "12-A3":{
  title:"The Impact Project",
  objective:"Lead an independently designed, evidence-backed solution for an authentic stakeholder or community need.",
  activity:"Define an authentic problem, conduct appropriate stakeholder research, compare AI-assisted and non-AI approaches, create a prototype, stress-test edge cases, revise and defend outcomes to an audience.",
  scenario:"A prototype wins applause but cannot demonstrate measurable benefit for its intended users. Is it complete?",
  answer:"No. Measure benefits against pre-agreed criteria, gather appropriately consented feedback, revise or reject assumptions and defend limitations before claiming impact.",
  principle:"Impact is not the novelty of a tool but a responsibly evidenced change for people and a defensible decision.",
  evidence:"Present an original impact portfolio containing stakeholder brief, alternatives, working artefact, tests, revisions, risk review and oral defence.",
  core:[
   "An authentic impact project starts with a problem that people recognise and a question you can investigate. Identify stakeholders, secure appropriate access and consent, and define success in terms of what changes for users. Decide whether this is best addressed through an AI-supported solution, a human-led approach or no technical intervention.",
   "Build a transparent portfolio of design decisions. Compare methods on the same criteria; prototype the minimum testable response; examine privacy, translation, accessibility, fairness and unanticipated failure cases. Document actual results, expert or user feedback and revisions rather than relying on claims that an attractive artefact must work.",
   "Your final defence should distinguish what has been demonstrated from what is only proposed. Explain the evidence, limitations, stakeholder impacts, accountability and next test. A recommendation not to deploy AI may be a sophisticated and successful outcome when supported by reasoned inquiry."
  ],
  example:["The demo was impressive, so the project has achieved positive impact.",
   "I will measure against stakeholder-defined criteria, compare alternatives, document usability and failure tests, revise what did not work and defend the limitations of my evidence."],
  check:["Which portfolio provides the strongest evidence of responsible impact?",["A visually polished prototype without user tests.","Many AI-generated features and a persuasive trailer.","An original problem brief, comparison, tested artefact, revision log and accountable public defence."],2],
  contexts:[["Community access commission","Prototype a multilingual or accessible information resource using approved fictional data, with stakeholder feedback or a teacher-authored brief."],["Independent inquiry and design studio","Develop a research-informed creative, technical or policy response for a genuine audience, with a defensible AI-use or non-use choice."]],
  glossary:[["Theory of change","An explanation of how proposed actions are expected to produce a desired outcome and what evidence would test it."],["Impact evaluation","A structured examination of whether intended benefits were observed under defined conditions."]],
  scaffold:["Whose need is addressed, and what specific difference could your evidence demonstrate?","Start with one stakeholder need, one alternative and a measurable acceptance condition.","Invite another perspective to challenge the prototype and design a test that could disconfirm your claim.","Transfer your evaluation method to a post-school research or community challenge.",["Define a defensible stakeholder need and success measure.","Test and revise an original response with traceable evidence.","Present and defend impact, uncertainty and responsibilities."]],
  activityData:{kind:"sort",title:"What belongs in an impact portfolio?",intro:"Distinguish demonstrated outcomes from assumptions and safeguards needed before publishing a student project.",categories:["Demonstrated evidence","Still an assumption","Required safeguard"],items:[
   ["Three appropriately consulted users completed the accessible information task and provided feedback.",0,"Observed feedback provides evidence for the specific test and participants."],
   ["The design looks modern, so it will improve every family's access.",1,"Appearance does not prove universal usefulness or benefit."],
   ["The prototype contains actual student records in an unapproved service.",2,"Real private records must not be placed in unapproved tools or this public demo."],
   ["A second test found a translation error, prompting a documented revision.",0,"Evidence-linked revision strengthens the account of actual learning and design."]],tip:"Distinguish a documented test from the claim that a system benefits all users."},
  diag:["A prototype is polished but nobody has tested whether it helps its users. What next?",["Present it as proven success.","Collect authentic feedback, test success criteria and revise.","Add more AI features."],1,"Impact needs evidence tied to people and outcomes."]
 },
 "12-B1":{
  title:"Human Intelligence in an AI World",
  objective:"Defend intellectual independence, purpose, identity and long-term agency in a changing world.",
  activity:"Reflect on career, research and creative scenarios; design a personal protocol for when to automate, when to seek feedback and when to retain fully human control.",
  scenario:"A future employer expects AI use in every task. Is maximising automation always the most professionally responsible response?",
  answer:"No. Choose in relation to purpose, human capability, evidence, consent and responsibility; demonstrate where non-use and independent judgement matter.",
  principle:"Future readiness includes deliberate boundaries and the ability to defend them under pressure.",
  evidence:"Create and orally defend a personal capacity-and-judgement charter with examples, counterarguments and revision triggers.",
  core:[
   "AI can change the distribution of tasks in occupations without eliminating all forms of human expertise. Distinguish automating repetitive work from outsourcing judgement about evidence, relationships and ethics. Career readiness involves adaptable learning habits, not a prediction about which jobs a system will replace.",
   "Intellectual independence is something students must demonstrate. Consider where you want to practise a skill, when an accessible assistant helps and when a tool might obscure ownership, originality or responsibility. Discuss identity and creativity without assuming there is one universally correct pattern of technology use.",
   "Develop a personal charter that can withstand challenge: how you will protect private information, verify important work, disclose contributions and decide on non-use. Test the charter against unfamiliar pressure or conflicting incentives, then revise it thoughtfully."
  ],
  example:["A professional who uses the most AI has automatically made the best decision.",
   "I will judge each task by outcomes, affected people, personal learning and independent responsibility, and explain why using less AI can be the best informed choice."],
  check:["What demonstrates future-ready human agency?",["A defended approach that changes with evidence, goals and affected people.","Using an AI assistant in every possible task.","Refusing to consider any new technology."],0],
  contexts:[["University research integrity","Defend what should remain independently authored and how approved AI assistance might be acknowledged."],["Career and personal agency conference","Design a decision charter for complex roles involving people, responsibility and technical change."]],
  glossary:[["Intellectual independence","The ability to develop, evaluate and defend reasoning without substituting another system's output for understanding."],["Automation pressure","Social or organisational incentives to delegate tasks even when doing so may be unsuitable."]],
  scaffold:["What reasoning, evidence and decision could you still defend if the system were taken away?","List one independently developed judgement, one appropriate support and one principled non-use.","Have a peer challenge your charter under an unexpected professional constraint.","Use the charter to evaluate an unfamiliar university or workplace decision.",["Explain purpose-based delegation and human responsibilities.","Defend boundaries with examples and counterarguments.","Revise a personal charter after a new scenario."]],
  activityData:{kind:"decision",title:"Defend agency under pressure",intro:"A group must decide whether to automate reflective feedback to younger students. Which approach respects learning and affected people?",options:[
   ["Automate all personal feedback without oversight because it saves time.","The time benefit does not replace personal context, consent and accountable care."],
   ["First ask what learning and relationship the feedback serves, then decide what limited support is appropriate and keep human responsibility.","The decision begins with human purpose and makes support proportionate to the situation."],
   ["Refuse to evaluate alternatives because every tool is inherently unacceptable.","Thoughtful non-use needs reasons and evidence, not an automatic blanket rule."]],correct:1,tip:"A decision can involve use, limited use or non-use; the strength lies in its justification and defence."},
  diag:["An employer wants maximum automation. Which response demonstrates mature judgement?",["Automate everything regardless of context.","Explain task-specific limits, alternatives and human responsibility.","Avoid learning the technology."],1,"Accountability and purpose determine responsible use."]
 },
 "12-B2":{
  title:"Defending What We Know",
  objective:"Synthesize contested evidence, calibrate uncertainty and defend conclusions under informed challenge.",
  activity:"Examine fictional disagreement between research studies, test competing interpretations, distinguish method differences from contradictory findings and revise a public argument.",
  scenario:"Two reputable studies report different outcomes for AI-assisted learning. Must one be dishonest?",
  answer:"Not necessarily. Examine population, measures, study design, confounders, uncertainty and how each claim is framed before deciding what the evidence supports.",
  principle:"Strong knowledge claims remain open to revision and precise about what their evidence can establish.",
  evidence:"Develop an evidence ledger, a calibrated written argument, an oral defence and a revision after challenge.",
  core:[
   "Evidence can disagree because studies ask different questions, use different measures or include different populations. Before choosing a persuasive result, compare samples, research designs, outcomes and uncertainty. Causation is a higher standard than a simple pre/post improvement or correlation.",
   "An honest synthesis considers multiple interpretations and what new observation would discriminate between them. AI-generated summaries may omit caveats or invent citations; trace source claims to their original methods. Express confidence proportionately rather than treating all disagreement as equally strong or hopelessly uncertain.",
   "Defend a conclusion in a structured conference: present the claim, evidence, counterargument and a condition that would change your position. Revise the conclusion if a credible challenge reveals a flaw. The aim is intellectual honesty and readiness to update, not winning a debate."
  ],
  example:["Two studies disagree, so I should choose whichever supports my preference.",
   "I will compare what each study actually tested, check uncertainty and limitations, make a qualified claim and show the observation that could change my conclusion."],
  check:["How should a responsible researcher respond to apparently conflicting results?",["Compare samples, methods, uncertainty and plausible explanations before making a qualified claim.","Choose the study with the biggest headline.","State that evidence can never support any conclusion."],0],
  contexts:[["DP Theory of Knowledge defence","Use a contested knowledge claim to compare evidence, perspectives and what counts as justification."],["Extended Essay research conference","Explain methodological differences between fictional studies and defend a transparent evidence-led conclusion."]],
  glossary:[["Confounding","A variable that may distort the apparent relationship between an action and an outcome."],["Calibration","Matching expressed confidence to the strength and limits of available evidence."]],
  scaffold:["What did each source actually measure, and which inference goes beyond it?","Create a table: population, measure, finding, limitation and alternative explanation.","Design an additional comparison that would resolve one contested interpretation.","Apply the method to a scientific or social issue you have not studied before.",["Distinguish observations, explanations and causal claims.","Defend a qualified position with counterevidence.","Revise responsibly when new evidence changes the assessment."]],
  activityData:{kind:"sort",title:"How strong is the claim?",intro:"Classify interpretations of two hypothetical studies as evidence, a possible explanation or an unsupported leap.",categories:["Reported evidence","Plausible explanation","Unsupported conclusion"],items:[
   ["Study A observed increased task completion among its sampled learners.",0,"A sample result is evidence about the sampled group and measured outcome."],
   ["Study B included a different age range, which may contribute to different results.",1,"Differences in populations are a plausible hypothesis requiring examination."],
   ["These two studies prove AI helps every student learn in every subject.",2,"Neither a sample nor two selected studies justify a universal causal claim."],
   ["The measured outcome and design of each study are specified in its methods.",0,"Methods are part of the evidence needed to interpret the claim."]],tip:"Ask whether a sentence describes an observation, a testable interpretation or an inference beyond the evidence."},
  diag:["Two credible studies disagree. What should the conclusion do?",["Ignore the inconvenient one.","Explain methods, limits, uncertainty and possible reasons for different results.","Claim no evidence is useful."],1,"Calibrate claims to what the research actually examined."]
 },
 "12-B3":{
  title:"Stewardship & Accountability",
  objective:"Design, stress-test and defend governance that protects people when AI systems make mistakes.",
  activity:"Use a fictional incident-response laboratory to test notification, independent review, appeal, correction and decision authority across an AI-supported community service.",
  scenario:"A public-service AI tool makes a consequential mistake, and the operator wants to hide it until after launch. What does stewardship require?",
  answer:"Identify the harm, pause unsafe operation, inform affected people appropriately, enable review and remedy, document root causes and revise governance before resuming.",
  principle:"Stewardship is demonstrable through transparent accountability, meaningful redress and sustained responsibility.",
  evidence:"Submit a governance charter, stakeholder consultation, incident-response trace, appeal design and a defended stop-or-deploy decision.",
  core:[
   "Governance is a system of responsibilities rather than a collection of slogans. Define the task, affected people, approved data use, human decision authority, monitoring, transparency and ways to contest an outcome. No policy can make a tool infallible; the goal is to prevent, detect and correct consequential mistakes.",
   "Incident response exposes weak governance. A system may issue an incorrect allocation, make a harmful recommendation or disclose confidential information. Evaluate when to pause, whom to notify, which evidence to preserve, who conducts independent review and how someone affected can obtain correction without facing unreasonable barriers.",
   "A credible charter links principles to testable procedures, responsibilities, time-bound review and a plan to revise decisions. Consult relevant users and examine the fairness of remedies, not just average accuracy. Be able to defend a refusal to deploy when unresolved risks are disproportionate."
  ],
  example:["Hiding the error will protect trust until the software has been quietly updated.",
   "I will pause potentially harmful operations, document the facts, inform affected people through appropriate channels, enable independent review and appeal, and require a tested correction before any restart."],
  check:["What is the most defensible initial response to a serious AI-supported decision error?",["Continue automatically while hiding the issue.","Remove the audit trail so no one is blamed.","Protect those affected, pause unsafe actions, preserve evidence and start accountable review."],2],
  contexts:[["Student governance and school policy group","Write an accountable charter for a fictional AI-supported service, including an accessible incident-report route."],["Community oversight committee","Rehearse a consequential error, assign roles and defend the process for notification, remedy and retesting."]],
  glossary:[["Redress","A practical route through which someone can seek correction, review or remedy for harm."],["Incident response","A defined process for limiting harm, understanding what failed and restoring accountable service."]],
  scaffold:["Who is harmed, who has authority to stop the system and who can ask for correction?","Start with a timeline: detect, protect, document, notify, review, remedy and retest.","Stress-test an appeal that comes from someone needing additional language or accessibility support.","Adapt the charter to a different public or school service.",["Assign testable responsibilities and response stages.","Demonstrate a humane, accessible redress route.","Defend whether restart is justified by evidence and consultation."]],
  activityData:{kind:"sequence",title:"Respond to a consequential system error",intro:"Arrange an accountable incident response to a fictional automated allocation mistake.",steps:[
   "Detect the error and pause actions that could continue the harm",
   "Protect affected people and preserve an accurate evidence record",
   "Notify through appropriate channels and open accessible human review",
   "Investigate root causes and make a genuine correction or remedy",
   "Retest safeguards, consult stakeholders and authorise a justified restart"
  ],start:[2,4,0,3,1],tip:"Incident severity changes urgency and practical steps, but privacy, truthful communication and correction remain central."},
  diag:["A consequential AI error is discovered. Which response is responsible?",["Pause harm, document the issue, notify appropriately and provide review/remedy.","Hide it to avoid criticism.","Deploy the same model without tests."],0,"Accountability needs transparent response and a practical route to correction."]
 }
};
const SENIOR_GRADE_ORDER=[11,12];
for(const grade of SENIOR_GRADE_ORDER){
 for(const strand of STRANDS){
  const id=grade+"-"+strand.id,unit=SENIOR_MODULES[id];
  if(!unit)throw Error("Missing senior learning module "+id);
  const track=strand.id.startsWith("A")?"capacity":"judgement";
  const raw=[grade,strand.id,unit.title,unit.objective,unit.activity,unit.scenario,unit.answer,unit.principle,unit.evidence];
  RAW.push(raw);
  const lesson={id,grade,strand:strand.id,track,title:unit.title,objective:unit.objective,activity:unit.activity,scenario:unit.scenario,answer:unit.answer,principle:unit.principle,evidence:unit.evidence,
   minutes:grade===11?60:80,steps:[{label:"Discover",detail:unit.objective},{label:"Try it",detail:unit.activity},{label:"Think it through",detail:unit.scenario},{label:"Show your thinking",detail:unit.evidence}]};
  LESSONS.push(lesson);LESSON_BY_ID[id]=lesson;
  KNOWLEDGE[id]={core:unit.core,example:unit.example,check:unit.check,contexts:unit.contexts,glossary:unit.glossary};
  ACTIVITIES[id]=unit.activityData;
  LEARNING_SCAFFOLDS[id]={notice:unit.scaffold[0],support:unit.scaffold[1],stretch:unit.scaffold[2],transfer:unit.scaffold[3],criteria:unit.scaffold[4]};
 }
 DIAGNOSTICS[grade]=STRANDS.map(strand=>{const entry=SENIOR_MODULES[grade+"-"+strand.id].diag;return [strand.id,entry[0],entry[1],entry[2],entry[3]];});
}
