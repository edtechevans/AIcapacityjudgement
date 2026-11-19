/* AI Capacity × Judgement — four-hour educator pathway, 20 November 2026.
 * Eight original 30-minute modules, grounded in AISG's Engagement for All and
 * the Transformative Learning Framework; MTSS and UDL where pedagogically useful.
 * All case details are fictional. No student data or typed responses.
 */
(function(){
"use strict";
const S=(prompt,options,takeaway)=>({kind:"single",prompt,options,takeaway});
const M=(prompt,options,takeaway)=>({kind:"multi",prompt,options,takeaway});
const C=(prompt,categories,items,takeaway)=>({kind:"classify",prompt,categories,items,takeaway});
const O=(prompt,steps,takeaway)=>({kind:"order",prompt,steps,takeaway});
const L=(id,title,focus,question,ideas,model,tasks,alignment)=>({id,title,focus,question,minutes:30,ideas,model,tasks,alignment});
const capacity=[
 L("c1","Understand the Capacity: What AI Can—and Cannot—Do",
 "Understand AI capability, uncertainty, verification and responsible non-use.",
 "How does a fluent answer become trustworthy enough to influence learning?",
 [
 ["Capacity is not comprehension","A generative system predicts plausible outputs using statistical patterns learned from data and instructions. It can classify, translate, propose, summarise and generate. Fluency does not mean it has checked a source, understood a student or verified a claim."],
 ["Evaluate the whole workflow","A useful teacher workflow distinguishes drafting, retrieval, checking, decision and publication. Ask what evidence an output is based on, whether the source can be inspected, which information may be missing, and whose judgement remains necessary."],
 ["Know when not to use AI","Low-stakes brainstorming is different from safeguarding, student identification, disciplinary findings or decisions about support. Some work should stay with an educator, an approved specialist or a trusted primary source. No prompt can remove those boundaries."]
 ],
 {scenario:"A teacher requests a short explanation of a recent scientific finding for tomorrow's class. The answer is polished and includes two plausible-looking citations.",
 weak:"Copy the explanation and citations into the lesson because they sound convincing.",
 strong:"Use the response as a draft; open the cited research independently, verify the claim and context, and revise or discard unsupported details.",
 why:"AI capacity can speed preparation, but reliable learning materials require evidence and professional review."},
 {learn:S("Which statement best describes a language model's confident answer?",[
 ["Confidence in the wording is evidence that sources were checked.",0,"Fluent language is not the same as verified evidence."],
 ["The answer may be useful, but important claims need independent verification.",1,"This separates generative capability from epistemic trust."],
 ["All AI-generated explanations should be rejected regardless of use.",0,"Responsible practice uses context, evidence and proportionate caution."]
 ],"Distinguish generating an answer from knowing whether the answer is true."),
 model:S("The citations in the modelled science example are inaccessible. What is the strongest action?",[
 ["Keep the explanation but remove the references.",0,"Removing citations does not independently establish the explanation."],
 ["Search for inspectable primary sources; revise or omit claims without adequate support.",1,"A source check protects the integrity of the learning."],
 ["Ask the same AI tool to confirm that its citations are real.",0,"Self-confirmation is not independent evidence."]
 ],"Verification requires evidence external to the original output."),
 practice:[
 M("A geography teacher asks AI for a comparison of flood risks. Which safeguards are defensible?",[
 ["Check location-specific claims against current authoritative information.",1,"Context and date matter for risk claims."],
 ["Ask the system to separate assumptions from sourced evidence.",1,"Explicit uncertainty makes review easier."],
 ["Treat a precise-looking map or number as verified.",0,"Apparent precision can conceal invented data."],
 ["Keep identifiable student location information out of an unapproved service.",1,"Useful context does not justify a privacy breach."]
 ],"A strong AI workflow combines task clarity, source checking and data minimisation."),
 C("Classify the proposed AI tasks before a history lesson.",["Appropriate with review","Avoid or escalate"],[
 ["Create three alternative discussion starters using public historical events.",0,"Drafting low-risk prompts can be efficient when the teacher reviews accuracy and framing."],
 ["Determine whether an individual student's disclosure signals a safeguarding risk.",1,"A safeguarding decision requires appropriate human procedures and expertise."],
 ["Draft a simplified summary of a public source that the teacher can verify.",0,"The source is inspectable and the educator can check fidelity."],
 ["Upload confidential student case notes to a public chatbot for a prediction.",1,"Sensitive records and consequential predictions are out of bounds."]
 ],"Classify based on evidence, data sensitivity and consequences, not novelty.")
 ],
 apply:O("Sequence a responsible AI-assisted source summary for an MYP inquiry.",[
 "Define the learning goal and what information is actually needed.",
 "Request a draft using non-sensitive information and inspectable source material.",
 "Verify factual claims and perspectives independently.",
 "Revise or discard inaccuracies and decide what students should investigate themselves."
 ],"Purpose → bounded generation → independent verification → pedagogical decision."),
 transfer:S("An AI tool proposes a confident interpretation of an unfamiliar DP mathematics problem, but its steps contradict a worked solution. What should the educator do?",[
 ["Use the AI solution because its reasoning is detailed.",0,"Detailed reasoning may still be wrong."],
 ["Investigate the discrepancy with independent mathematical checking before using either explanation.",1,"Verification must match the discipline and claim."],
 ["Average the two answers to avoid bias.",0,"Averaging incompatible answers is not a method of validation."]
 ],"The same principle transfers from factual citations to mathematical reasoning.")
 },"Authenticity 3.4; Agency 2.3"),
 L("c2","Personalisation for All: Removing Barriers, Maintaining Challenge",
 "Use AI and UDL to widen access while retaining rigorous common learning goals.",
 "Can we remove a barrier without removing the intellectual work?",
 [
 ["Start with the learner, not the label","Personalisation responds to strengths, language, identities, interests, aspirations and needs. Universal Design for Learning offers multiple routes to access and expression without assuming every learner needs a separate curriculum."],
 ["Protect the intended thinking","A vocabulary bank, captioned explanation, audio pathway or graphic organiser may remove a barrier. A completed argument or lab conclusion may remove the learning. The distinction depends on what the student is supposed to learn."],
 ["Use MTSS as a response cycle","Tier 1 begins with strong accessible universal instruction. When evidence suggests additional support is needed, teams select and monitor targeted approaches; more intensive supports require coordinated human decisions. One task score does not assign a tier."]
 ],
 {scenario:"An MYP student understands ecosystems orally and visually but struggles to express causal reasoning in the language of instruction.",
 weak:"Ask AI to write the complete explanation for submission.",
 strong:"Offer translated key terms, sentence starters and a visual food-web scaffold while the student chooses evidence and builds the causal explanation.",
 why:"The barrier is linguistic expression, not necessarily conceptual understanding. The scaffold supports access while preserving reasoning."},
 {learn:S("Which design best maintains a common ambitious learning goal?",[
 ["Give every learner an identical format regardless of barriers.",0,"Uniform format is not the same as equitable opportunity."],
 ["Provide accessible pathways while retaining the same target understanding and evidence criteria.",1,"Access can vary without reducing the intellectual target."],
 ["Use AI to complete the difficult thinking for students who need support.",0,"Removing the target thinking is substitution, not a scaffold."]
 ],"Rigour and access should reinforce rather than compete with each other."),
 model:S("In the ecosystem example, what must the student still do?",[
 ["Choose relevant ecological evidence and explain causal relationships.",1,"The learner still demonstrates target reasoning."],
 ["Copy the explanation supplied by AI and improve its presentation.",0,"Copying does not demonstrate causal understanding."],
 ["Use only the teacher's preferred language even when it is a construct-irrelevant barrier.",0,"The expression route should not obscure the intended learning."]
 ],"Choose scaffolds by what learning must remain visible."),
 practice:[
 C("Identify which supports remove barriers and which replace the learning.",["Scaffold: target thinking remains","Substitution: target thinking removed"],[
 ["Allow speech-to-text for an original student explanation.",0,"The communication route changes, not the reasoning."],
 ["Generate the student's complete evidence-based conclusion.",1,"The tool has performed the target reasoning."],
 ["Offer a glossary and two contrasting worked examples.",0,"The learner still constructs a response."],
 ["Automatically choose all evidence and claims for the student.",1,"Core intellectual decisions are no longer the student's."]
 ],"A scaffold preserves the learning objective even when access pathways change."),
 M("An inclusive Tier 1 inquiry includes multilingual and neurodiverse learners. Which design moves help?",[
 ["Offer predictable steps and optional visual/audio access.",1,"Predictability and multimodal access support more learners."],
 ["Use the same high-level inquiry question with flexible means of demonstrating understanding.",1,"A common goal can have multiple expression routes."],
 ["Assume the same diagnosis explains every student's participation.",0,"Individual variability cannot be reduced to a label."],
 ["Collect brief formative evidence before deciding who needs additional support.",1,"Responsive design is based on what learners demonstrate."]
 ],"Universal access first; additional support should be responsive to evidence.")
 ],
 apply:O("Place the support-design moves in a defensible order.",[
 "Define the essential concept and intellectual demand.",
 "Identify likely access barriers using learner information and task analysis.",
 "Design accessible Tier 1 routes that protect the goal.",
 "Check learner responses and adjust or consult for targeted support when indicated."
 ],"Design for variability, notice actual responses, then improve."),
 transfer:S("A student can explain a geometry concept accurately with a model but scores poorly on a long reading-heavy test. What is the strongest next move?",[
 ["Automatically assign an intervention tier from the test score.",0,"One assessment is insufficient and may conflate language with mathematical understanding."],
 ["Check whether reading demand is essential to the target, offer another valid expression route, and gather more evidence.",1,"The educator tests the barrier hypothesis without lowering the goal."],
 ["Ask AI to complete future assessments on the student's behalf.",0,"This prevents valid evidence of learning."]
 ],"Access and assessment validity intersect when tasks carry unnecessary barriers.")
 },"Personalisation 1.1, 1.4, 1.6; Agency 2.2; MTSS Tier 1"),
 L("c3","Creativity and Authenticity: Designing Beyond the Prompt",
 "Create authentic work where AI extends inquiry, originality and purpose.",
 "Is AI expanding students' possibilities—or simply producing an attractive artefact?",
 [
 ["Authenticity is about the work","An authentic task draws on real questions, disciplinary practices, audiences or consequences. A polished AI-produced poster may look authentic while the student has made few meaningful decisions."],
 ["Creativity requires ownership","AI can generate options and counterexamples, but learners need to frame the problem, evaluate ideas, make trade-offs, test prototypes and contribute something original. Purposeful risk-taking is more valuable than instant polish."],
 ["Move beyond outputs to transfer","Ask where students will use disciplinary evidence, how they will know their work matters, whose perspectives are represented and how an audience could respond. Link creation to inquiry and opportunities for action."]
 ],
 {scenario:"Students plan a campaign to reduce single-use plastic near school. AI can instantly produce a logo, slogans and a complete slide deck.",
 weak:"Ask each group to submit the best-looking AI-generated campaign.",
 strong:"Students investigate local waste patterns, interview stakeholders, choose an audience, test claims and use AI for alternative formats or critique while keeping decisions and evidence their own.",
 why:"Real-world purpose, original student thinking and meaningful audience response distinguish authenticity from polished production."},
 {learn:S("Which feature most strongly signals an authentic learning experience?",[
 ["An AI-generated design looks professionally finished.",0,"Appearance does not establish authentic inquiry or purpose."],
 ["Students investigate a genuine problem and make accountable choices for a real audience.",1,"Authenticity depends on purpose, process, evidence and contribution."],
 ["Students use the newest generative image features.",0,"Tool novelty is not evidence of deeper learning."]
 ],"Begin with questions, practices and consequences beyond the classroom."),
 model:S("What is missing when students submit only the AI-created plastic-reduction slides?",[
 ["A sufficient quantity of design variations.",0,"More visual options do not solve the learning gap."],
 ["Evidence of investigation, choice, testing and student contribution.",1,"These are the intellectual and authentic elements."],
 ["A more sophisticated presentation template.",0,"Polish is not a substitute for understanding."]
 ],"The process and purpose must be visible, not only the product."),
 practice:[
 M("Which features strengthen a DP environmental systems inquiry using AI?",[
 ["Student-defined research questions informed by local context.",1,"Question formation is a central intellectual contribution."],
 ["Transparent source checks and uncertainty in AI-assisted synthesis.",1,"Inquiry needs defensible evidence."],
 ["Automatic production of findings before students examine data.",0,"This removes investigative reasoning."],
 ["Testing recommendations with relevant stakeholders where appropriate.",1,"Audience and impact create real-world connection."]
 ],"AI should extend inquiry and critique, not predetermine conclusions."),
 C("Classify the role of AI in four creative learning moves.",["Extends student creativity","Replaces core creative work"],[
 ["Generates counterexamples students critique before designing their own solution.",0,"Learners evaluate and create the final response."],
 ["Selects the entire concept, audience and final product with no student decisions.",1,"Core creative choices are outsourced."],
 ["Suggests alternative accessibility formats for students' original message.",0,"The audience can access the student's idea more effectively."],
 ["Generates the final artwork while students only choose a font.",1,"A superficial edit does not evidence original thinking."]
 ],"Originality lies in student decisions and contribution, not in the mere presence of output.")
 ],
 apply:O("Sequence an authentic, AI-supported inquiry project.",[
 "Identify a meaningful question, community context and intended audience.",
 "Gather credible evidence and diverse perspectives.",
 "Use AI selectively to challenge, prototype or improve accessibility while retaining student decisions.",
 "Test the work with the audience and reflect on evidence of impact."
 ],"The authentic purpose should shape the use of AI, not emerge as an afterthought."),
 transfer:S("In an MYP language acquisition unit, students create multilingual guides for new families. Which design is stronger?",[
 ["Have AI translate a generic guide and award marks for visual polish.",0,"A generic output hides choices, cultural context and language learning."],
 ["Students interview new families, select useful information, compare translations critically, and test the guide with its audience.",1,"Students do meaningful multilingual inquiry and purposeful creation."],
 ["Avoid involving the community because AI can generate all required content.",0,"The authentic audience and lived experience are central."]
 ],"Authenticity transfers across disciplines when purpose, evidence and audience remain real.")
 },"Authenticity 3.1, 3.4, 3.7; Creativity 4.1-4.3; Taking Action 5.2"),
 L("c4","Collaborative Capacity: Better Workflows, Shared Learning",
 "Use AI to strengthen professional and student collaboration without eroding trust.",
 "Which steps can be accelerated, and which must stay human?",
 [
 ["Separate workflow tasks from responsibilities","AI can draft agendas, suggest scaffolds and compare alternatives, but teachers still define goals, make contextual decisions, safeguard information and communicate with learners."],
 ["Technology should strengthen relationships","Collaboration is more than dividing labour. Meaningful shared work builds dialogue, mutual accountability, empathy and opportunities to learn from difference. Avoid systems that merely split AI-generated sections among group members."],
 ["Use evidence in collaborative planning","A team may investigate patterns in de-identified evidence, generate support hypotheses and check responses over time. In an MTSS-style process, the team—not the model—decides what to try, monitor, change or escalate."]
 ],
 {scenario:"A grade-level team wants a shared plan for students struggling to use feedback. Someone suggests pasting individual student records into an open chatbot to 'identify the weak students'.",
 weak:"Upload the records to get a rapid ranking and an automatic intervention assignment.",
 strong:"Review permitted, de-identified patterns together, agree on a clear skill target, design a Tier 1 feedback routine, and monitor students' response before considering additional support.",
 why:"Collective capacity improves when AI assists preparation and analysis while human teams protect relationships and own consequential decisions."},
 {learn:S("What most clearly distinguishes collaborative learning from parallel AI production?",[
 ["Everyone produces an AI-generated section independently.",0,"Work division is not necessarily purposeful collaboration."],
 ["Learners negotiate decisions, learn from perspectives and contribute to shared understanding.",1,"Shared reasoning and equitable contribution matter."],
 ["The group submits the longest possible final artefact.",0,"Volume is not an indicator of collaboration."]
 ],"AI should enhance shared thinking, not erase it."),
 model:S("What is the key flaw in the proposed upload-and-rank workflow?",[
 ["It might take longer than using a spreadsheet.",0,"The central concerns are privacy, inference and accountable decisions."],
 ["It exposes student records and delegates consequential judgements without sufficient evidence.",1,"Professional responsibility and safeguarding must remain with the team."],
 ["The chatbot might use an unattractive visual format.",0,"Presentation quality is not the relevant risk."]
 ],"Responsible professional collaboration protects information and human authority."),
 practice:[
 C("Who should own each step in a collaborative planning cycle?",["AI may assist with review","Human team must decide"],[
 ["Draft generic question stems for an approved formative check.",0,"This is a low-risk drafting task with professional review."],
 ["Decide whether an individual student should receive intensive support.",1,"Tiering and support decisions require qualified human judgement and contextual evidence."],
 ["Generate different anonymised ways to present a shared plan.",0,"Formatting and alternatives can help people collaborate."],
 ["Confirm the intervention goal and review date with accountable colleagues.",1,"People retain responsibility for shared decisions."]
 ],"Distinguish assistance from accountable decision-making."),
 M("What helps ensure a shared AI-supported project genuinely strengthens collaboration?",[
 ["Roles require participants to listen, negotiate and critique ideas.",1,"Dialogue supports collective learning."],
 ["Groups compare perspectives including those initially overlooked.",1,"Difference can enrich the solution."],
 ["The most confident speaker makes every decision for efficiency.",0,"Speed without equitable voice can weaken collaboration."],
 ["The team checks who has contributed and what each learner understands.",1,"Equitable contribution and individual learning both matter."]
 ],"Collaboration includes shared purpose, equitable participation and trust.")
 ],
 apply:O("Sequence a responsible team-supported lesson-design workflow.",[
 "Agree on learner needs, shared goals and non-negotiable privacy boundaries.",
 "Use an approved AI tool, if helpful, to draft accessible options with non-sensitive inputs.",
 "Critique options together for rigour, cultural responsiveness and feasibility.",
 "Trial a selected approach, gather learner evidence and revisit the design as a team."
 ],"Shared professional reasoning should frame and follow AI use."),
 transfer:S("Students in two countries plan a joint virtual exhibition using AI translation. What best protects collaborative learning?",[
 ["Have AI translate and combine all products without students communicating.",0,"This removes authentic exchange and mutual understanding."],
 ["Students negotiate meaning and cultural context, check translations together and retain shared ownership.",1,"Technology supports communication while relationships remain central."],
 ["Allow the students with the strongest language proficiency to make every choice.",0,"This undermines equitable contribution."]
 ],"Technology's value depends on the quality of human connection it supports.")
 },"Collaboration 6.1, 6.3, 6.4, 6.6; MTSS collaborative problem-solving")
];
const judgement=[
 L("j1","Agency and Intellectual Ownership: Who Does the Thinking?",
 "Make defensible AI-use decisions that preserve learner ownership.",
 "Does this support deepen thinking—or make the evidence of thinking disappear?",
 [
 ["The target thinking is non-negotiable","First identify the reasoning, interpretation, skill or judgement the learner must demonstrate. AI support becomes harmful when it completes precisely that intellectual work, even if the resulting output looks stronger."],
 ["Agency is more than choice of tool","Students need meaningful voice in learning direction, processes and expression, together with reflection on decisions. Deciding between three AI-written answers is not the same as constructing and defending an original position."],
 ["Scaffolding invites independence","Productive struggle should be supported, not romanticised. A good scaffold offers cues, counterexamples, questions or access routes, then fades as independence grows. The educator decides when support preserves or replaces learning."]
 ],
 {scenario:"Students must build a historical argument using primary sources. Some propose asking AI for a full thesis, evidence and reasoning, then editing the prose.",
 weak:"Permit fully generated reasoning because students still improve the writing style.",
 strong:"Require an initial student claim and source analysis; permit AI-generated counterarguments or critique, followed by an independent defence and revision.",
 why:"The learning target is source interpretation and argument construction. Edits to generated prose do not evidence those skills."},
 {learn:S("When does an AI scaffold become substitution?",[
 ["When it provides alternative vocabulary or formats.",0,"Access support need not remove intellectual work."],
 ["When it completes the reasoning or choices the learner was meant to develop.",1,"The defining issue is who performs the target thinking."],
 ["Whenever a learner uses any digital tool.",0,"Tool use alone does not determine agency."]
 ],"Define target thinking before judging a tool's role."),
 model:S("What should remain visibly student-owned in the history task?",[
 ["The thesis, selection of source evidence and defence of reasoning.",1,"These are the learning outcomes."],
 ["Only the font, title and formatting.",0,"Presentation decisions cannot substitute for historical reasoning."],
 ["Only which AI prompt produces the longest response.",0,"Prompt selection does not evidence argument construction."]
 ],"Own the decisions that the task is designed to teach."),
 practice:[
 C("Classify whether each AI-use design keeps learner ownership.",["Agency protected","Core thinking outsourced"],[
 ["Students make a claim before AI proposes counterexamples they evaluate.",0,"The student constructs the argument and evaluates challenge."],
 ["AI chooses the claims and evidence; students polish grammar.",1,"The target work has already been done."],
 ["Students independently explain what changed after comparing two critiques.",0,"Metacognition is visible."],
 ["AI determines the final position and students sign their names.",1,"Student voice and judgement are absent."]
 ],"Agency can be observed in decisions, explanations and revisions."),
 M("A student is stuck on a complex mathematical proof. Which responses preserve learning?",[
 ["Offer a carefully chosen hint rather than the whole solution.",1,"A hint can move learning forward without finishing it."],
 ["Provide a simpler analogous example for comparison.",1,"An analogy can clarify a strategy while preserving transfer."],
 ["Immediately provide the complete proof to copy.",0,"Copying prevents evidence of proof construction."],
 ["Ask the student to explain the next step independently after a scaffold.",1,"Independent reasoning reveals what the learner can now do."]
 ],"Targeted assistance should move learners toward independent competence.")
 ],
 apply:S("An MYP Design teacher wants to permit AI for a prototype challenge. Which policy is most defensible?",[
 ["AI may generate the final concept and decisions if students can describe the result.",0,"Describing a finished outcome is weaker than producing the intended design reasoning."],
 ["Students define criteria, evaluate iterations and justify decisions; AI may offer options for critique.",1,"The design process remains student-owned."],
 ["AI is banned, even for accessibility support, without considering goals.",0,"Responsible non-use must also follow contextual reasoning."]
 ],"Make the boundaries of human intellectual ownership explicit."),
 transfer:S("A DP literature student asks AI to interpret an unfamiliar poem before reading it. What best protects interpretive agency?",[
 ["Require an initial personal close reading, then use AI as a contrasting interpretation to scrutinise.",1,"Comparison comes after the student's interpretive work."],
 ["Use the AI interpretation as the student's opening argument.",0,"That reverses the intended ownership."],
 ["Grade the fluency of the AI-produced response.",0,"Fluency is not evidence of literary analysis."]
 ],"The principle of ownership transfers from history to literature.")
 },"Agency 2.1-2.3, 2.6, 2.9; Personalisation 1.3"),
 L("j2","Evidence Before Intervention: MTSS, Inclusion and Belonging",
 "Use proportionate evidence-informed decisions without automated labels.",
 "What do we need to notice before deciding how to support a learner?",
 [
 ["One indicator is not a learner","Scores, attendance, participation and observations offer partial evidence. They are influenced by context, opportunity and measurement. Avoid deficit assumptions, especially when language, identity and access can shape performance."],
 ["MTSS is an ongoing response cycle","Begin with strong accessible Tier 1 instruction and evidence of how it is working. When warranted, coordinate targeted Tier 2 support and progress monitoring; more intensive Tier 3 support requires individual planning and qualified professional involvement. Tiers describe levels of support, not student identities."],
 ["Belonging and cultural responsiveness matter","Ask what opportunities the learner has had to demonstrate strengths, how relationships and classroom conditions affect participation, and whose perspective is missing. AI may organise de-identified patterns but cannot diagnose, tier or decide on referrals."]
 ],
 {scenario:"A multilingual MYP learner scores poorly on one timed English reading-intensive science test, yet explains scientific concepts accurately using diagrams and oral discussion.",
 weak:"Use AI to label the learner as low ability and recommend Tier 2 immediately.",
 strong:"Examine whether the test introduced an unnecessary language barrier, strengthen Tier 1 access, gather multiple demonstrations of science understanding and monitor the response.",
 why:"The data may be showing a measurement barrier. Good decisions distinguish the target science understanding from unrelated language demand."},
 {learn:S("Which MTSS statement is most accurate?",[
 ["A single low score automatically places a student in Tier 2.",0,"Support decisions depend on converging evidence, context and response over time."],
 ["MTSS uses quality instruction, additional support and ongoing review, with people accountable for decisions.",1,"It is a system of instruction and responsiveness, not a fixed label."],
 ["AI should decide which students are Tier 3 from uploaded records.",0,"Consequential decisions require qualified teams, protections and contextual evidence."]
 ],"Tiers describe the intensity of support, not a permanent student identity."),
 model:S("What should the team question first in the science assessment scenario?",[
 ["Whether the reading demand measured science knowledge or an unrelated language barrier.",1,"Assessment demands must align with the intended construct."],
 ["Whether AI can generate a diagnosis more quickly.",0,"A diagnosis is neither justified nor appropriate here."],
 ["Whether students should be prevented from using diagrams.",0,"A diagram may be valid evidence of conceptual understanding."]
 ],"Do not confuse a barrier to demonstration with a barrier to learning."),
 practice:[
 C("Decide how to interpret each fictional learner signal.",["Investigate as evidence","Unwarranted conclusion"],[
 ["Participation is lower during an unfamiliar language-heavy task.",0,"It is a clue that needs contextual investigation."],
 ["A low engagement score proves a student does not care about school.",1,"A score cannot establish motivation or identity."],
 ["Several brief formative checks show improvement after vocabulary access.",0,"Response to support is relevant evidence."],
 ["AI flags an 'at-risk personality' from a student's written work.",1,"A speculative personality label is unsupported and potentially harmful."]
 ],"Observe patterns and responses rather than labelling students."),
 O("Sequence an appropriate MTSS-informed instructional response.",[
 "Define the target learning and collect multiple relevant evidence sources.",
 "Check Tier 1 opportunities, instructional fidelity and possible access barriers.",
 "Select and document a proportionate support with responsible colleagues when indicated.",
 "Monitor learner response and adjust, continue or escalate through approved procedures."
 ],"Notice → hypothesise → support → monitor → improve.")
 ],
 apply:M("A grade team sees declining assignment completion and belonging scores for a fictional cohort. Which next moves are justified?",[
 ["Check task design, workload, relationships and student perspectives before inferring causes.",1,"Different data sources can reveal different barriers."],
 ["Review whether universal supports are accessible and implemented consistently.",1,"Tier 1 quality is the starting point."],
 ["Automatically assign every student a risk tier based on a dashboard score.",0,"This exceeds what aggregate indicators can justify."],
 ["Define a small support change and monitor participation and learning evidence over time.",1,"A practical cycle tests rather than assumes."]
 ],"Strengthen universal provision, then adjust targeted support from evidence."),
 transfer:S("A student has high achievement but a sharp drop in reported belonging. What is the best professional response?",[
 ["Ignore the result because academic attainment is strong.",0,"Academic strength does not eliminate social-emotional needs."],
 ["Seek contextual, respectful evidence and appropriate conversation, checking relationships and safety while following school procedures.",1,"Belonging deserves attention without a premature label."],
 ["Ask a public AI service to infer the student's mental health condition.",0,"The data cannot support such diagnosis and raises privacy risks."]
 ],"Interpret whole-learner evidence carefully, even when academic metrics appear strong.")
 },"Personalisation 1.1, 1.5-1.6; Agency 2.3; Collaboration 6.6; MTSS"),
 L("j3","Assessment, Feedback and Trust: What Can We Actually Know?",
 "Protect the validity of assessment and use feedback that strengthens student decisions.",
 "What evidence justifies our claims about student understanding?",
 [
 ["Validity comes before policing","A polished final artefact may contain little evidence of the student's own thinking. Start by specifying the learning claim, then gather process, reasoning and unfamiliar transfer evidence appropriate to the subject."],
 ["Feedback must be acted upon","AI can generate many suggestions but students learn when they interpret, accept, reject and use feedback. The educator must check accuracy, tone, fairness and appropriateness. Feedback quantity is not feedback quality."],
 ["Trust is designed, not detected","Set transparent permitted-use boundaries, valid independent checkpoints and equitable access routes. AI detection scores are not definitive proof of misconduct. Protect privacy and avoid automatically grading consequential work from unreviewed AI outputs."]
 ],
 {scenario:"A DP student submits a sophisticated investigation report. The school cannot tell whether the student can independently explain its assumptions and evaluate the evidence.",
 weak:"Use a detector score to declare the report authentic or inauthentic.",
 strong:"Use a transparent process log, targeted questions about the analysis and a short independent new-context performance aligned with the assessed skills.",
 why:"The question is what the student understands and can transfer, not whether an algorithm feels suspicious about writing style."},
 {learn:S("Which approach makes the strongest assessment claim in an AI-rich environment?",[
 ["Use the final product alone as conclusive evidence.",0,"Product quality may not show independent understanding."],
 ["Combine outcome-aligned process and independent transfer evidence, with clear use expectations.",1,"The evidence matches the claim."],
 ["Rely on AI detection as the final decision-maker.",0,"Detection is too uncertain for a conclusive finding."]
 ],"Assess what learners can actually explain, do and transfer."),
 model:S("Why is a short independent transfer check stronger than a detection score in the report case?",[
 ["It directly samples the reasoning and understanding the assessment aims to measure.",1,"Validity improves when evidence aligns with the claim."],
 ["It guarantees every earlier sentence was written unaided.",0,"No such guarantee is possible or necessary for the learning claim."],
 ["It saves the educator from reviewing evidence.",0,"Human interpretation remains essential."]
 ],"Measure the construct, not stylistic suspicion."),
 practice:[
 C("Judge the strength of evidence for an inquiry learning claim.",["Directly supports the claim","Insufficient by itself"],[
 ["Student independently explains an assumption and defends a methodological choice.",0,"This provides direct evidence of reasoning."],
 ["A visually polished AI-generated report without process evidence.",1,"Polish does not establish student understanding."],
 ["A new-context task in which the student applies the method unaided.",0,"Transfer is valuable independent evidence."],
 ["An automated detector reports a 93% likelihood of AI authorship.",1,"A detection estimate is not direct evidence of conceptual mastery or misconduct."]
 ],"Use multiple aligned sources rather than one proxy."),
 M("Which AI feedback practices are most likely to deepen learning?",[
 ["Students compare suggestions with success criteria before choosing revisions.",1,"Evaluation keeps judgement with the learner."],
 ["The system silently rewrites weak paragraphs for students.",0,"This removes the student's revision process."],
 ["Students explain or select why one suggestion is not appropriate.",1,"Rejecting feedback can show understanding."],
 ["The teacher reviews consequential AI suggestions for accuracy and fairness.",1,"Professional oversight protects trust."]
 ],"Feedback is a learning process, not merely a delivered product.")
 ],
 apply:O("Sequence an assessment redesign for an AI-supported MYP project.",[
 "Identify the exact understanding and thinking to be assessed.",
 "Identify where permitted AI could support or hide evidence of that target.",
 "Introduce equitable process, explanation and independent-transfer checkpoints.",
 "Communicate boundaries and review the combined evidence using professional judgement."
 ],"Design the assessment around evidence, then decide what role AI may play."),
 transfer:S("A student produces correct statistics with AI but cannot interpret confidence intervals in a new example. What conclusion is warranted?",[
 ["The final product proves full mastery.",0,"Correct output does not demonstrate independent interpretation."],
 ["The evidence suggests further teaching and assessment of interpretation are needed.",1,"The independent transfer gap is informative."],
 ["The student necessarily committed misconduct.",0,"A learning gap alone is not a misconduct finding."]
 ],"Valid assessment distinguishes tool-produced correctness from transferable learning.")
 },"Authenticity 3.4; Agency 2.3; Creativity 4.2; Collaboration 6.4"),
 L("j4","From Judgement to Taking Action: A Transformative Learning Decision Lab",
 "Synthesize AI capability and professional judgement in a realistic school decision.",
 "What should we change, preserve or refuse—and how will we know if it helps?",
 [
 ["Design with Engagement for All in view","Begin from the students' intended experience: what they will encounter, decide, create and contribute. Select only relevant learning lenses—personalisation, agency, authenticity, creativity, collaboration and taking action—rather than ticking every box."],
 ["Notice evidence, not impressions","A teacher's sense that a lesson felt productive is not enough. Notice student talk, choices, work, relationships and action; check whether accessibility and cultural responsiveness shaped who could participate and demonstrate learning."],
 ["Reflect, improve and remain accountable","Choose bounded AI assistance only where benefits outweigh risks. Make learning, inclusion and safeguards visible, then review the evidence and select the next design move. Responsible non-use is an equally legitimate professional decision."]
 ],
 {scenario:"A team proposes an AI-supported community air-quality inquiry. Students have varied language proficiency and access needs. The tool could generate a complete project report instantly, but the learning goal is to investigate evidence and propose meaningful action.",
 weak:"Publish the AI report, award a grade for its polish and call the task transformative.",
 strong:"Students frame the inquiry, examine trustworthy data and local perspectives, build their own claims, use approved AI support for access or critique, and communicate a justified recommendation to an authentic audience.",
 why:"Capacity helps with preparation and access; judgement protects evidence, ownership, belonging and purposeful action."},
 {learn:S("Which principle best summarises the Capacity × Judgement relationship?",[
 ["If AI can generate the output, using it is automatically preferable.",0,"Capability alone cannot establish pedagogical benefit."],
 ["Use AI when it strengthens the intended learning and protects people, evidence and agency; otherwise limit or refuse it.",1,"Purpose and accountable judgement determine use."],
 ["Never use AI when students are learning independently.",0,"Support and non-use both need contextual justification."]
 ],"More capacity does not automatically create more transformative learning."),
 model:S("In the air-quality inquiry, which activity makes the greatest difference to authenticity?",[
 ["Students test claims against local evidence and communicate to a genuine audience.",1,"Investigation and consequence make the task meaningful."],
 ["AI produces as many attractive posters as possible.",0,"Quantity and polish are not the intended learning."],
 ["The teacher delegates grading to a public chatbot.",0,"This undermines validity and privacy."]
 ],"Make inquiry, authentic purpose and student contribution visible."),
 practice:[
 M("The team is deciding whether to use AI in the project. Which questions must it address?",[
 ["Which thinking and decisions must learners retain?",1,"Agency and assessment validity depend on intellectual ownership."],
 ["Which access barriers can we remove without lowering challenge?",1,"Personalisation must preserve rigor."],
 ["How impressive will the generated report look?",0,"Appearance is not evidence of learning."],
 ["What risks, approvals, sources and accountability apply?",1,"Trustworthy practice includes safeguarding and verification."],
 ["What student evidence will show whether the design worked?",1,"Evidence supports reflection and improvement."]
 ],"Plan for learning, access, evidence and responsibility together."),
 C("Classify proposed team decisions before implementation.",["Defensible design move","Requires redesign"],[
 ["Use an approved AI tool to offer vocabulary access while students analyse evidence.",0,"Access is widened and reasoning remains student-owned."],
 ["Upload identifiable wellbeing records to a public model for project grouping.",1,"Privacy and unsupported grouping are unacceptable."],
 ["Invite stakeholders to critique student recommendations.",0,"Authentic feedback and connection strengthen the project."],
 ["Let AI assign intervention tiers from one engagement survey.",1,"MTSS decisions cannot be automated from one indicator."]
 ],"Protect relationships and student agency alongside new capabilities.")
 ],
 apply:O("Build an accountable AI-supported learning design in the strongest sequence.",[
 "Define intended learning, student ownership and authentic purpose.",
 "Select inclusive support pathways and permissible AI assistance with safeguards.",
 "Gather student evidence through inquiry, decisions, work and relationships.",
 "Review impact and make the next design adjustment with accountable colleagues."
 ],"Design → Notice → Reflect → Improve."),
 transfer:S("A different team wants AI to write feedback and decide support tiers for all students after one quiz. Which decision best transfers the course principles?",[
 ["Automate everything because the data is numerical.",0,"Numbers do not remove validity, privacy or contextual concerns."],
 ["Use reviewed AI drafting where permitted, triangulate learner evidence, preserve human support decisions and monitor responses.",1,"This preserves purpose, evidence, inclusion and accountability."],
 ["Stop offering any feedback because AI introduces uncertainty.",0,"Thoughtful feedback remains essential, whether or not AI is used."]
 ],"Judgement is demonstrated by a bounded, evidence-informed decision in a new context.")
 },"Taking Action 5.1, 5.2, 5.4-5.5; Being, Connecting and Doing")
];
window.EDUCATOR_V4={
 version:"4.0",
 courses:[
 {id:"capacity",title:"AI Capacity",subtitle:"Understand the technology. Expand access, creativity and shared learning without confusing output with understanding.",minutes:120,modules:capacity},
 {id:"judgement",title:"AI Judgement",subtitle:"Protect student thinking. Use evidence, professional responsibility and purposeful action to make better decisions.",minutes:120,modules:judgement}
 ],
 stages:["learn","model","practise","apply","transfer"],
 stageLabels:["Learn","Model","Practise","Apply","Transfer"]
};
})();