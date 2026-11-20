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
 "Understand what AI can help with, how to check its answers, and when not to use it.",
 "When is an AI answer reliable enough to use in a lesson?",
 [
 ["Capacity is not comprehension","AI tools learn patterns from examples and use them to produce text, images and ideas. They can help us draft, translate and summarise. An answer can sound certain even when it is wrong or missing important facts."],
 ["Evaluate the whole workflow","Separate four steps: ask AI for a draft, check the facts, make a teaching decision and share only the result you trust. Can you see the original source? Is anything missing? Which decisions must you make yourself?"],
 ["Know when not to use AI","AI may help with lesson ideas, but should not decide issues such as student safety, discipline or learning support. Use your school's approved process and trained staff for decisions that affect students. A better prompt does not remove these duties."]
 ],
 {scenario:"A teacher requests a short explanation of a recent scientific finding for tomorrow's class. The answer is polished and includes two references that look real.",
 weak:"Copy the explanation and citations into the lesson because they sound convincing.",
 strong:"Use the response as a draft; open the cited research independently, verify the claim and context, and revise or discard unsupported details.",
 why:"AI capacity can speed preparation, but reliable learning materials require evidence and professional review."},
 {learn:S("Which statement best describes a language model's confident answer?",[
 ["Confidence in the wording is evidence that sources were checked.",0,"Fluent language is not the same as verified evidence."],
 ["The answer may be useful, but important claims need independent verification.",1,"This separates generative capability from trust in whether a claim is supported."],
 ["All AI-generated explanations should be rejected regardless of use.",0,"Responsible practice uses context, evidence and proportionate caution."]
 ],"Distinguish generating an answer from knowing whether the answer is true."),
 model:S("The teacher cannot open the references in the science example. What should they do?",[
 ["Keep the explanation but remove the references.",0,"Removing citations does not independently establish the explanation."],
 ["Search for inspectable primary sources; revise or omit claims without adequate support.",1,"A source check protects the integrity of the learning."],
 ["Ask the same AI tool to confirm that its citations are real.",0,"Self-confirmation is not independent evidence."]
 ],"Verification requires evidence external to the original output."),
 practice:[
 M("A geography teacher uses AI to compare flood risks. Which checks should they make?",[
 ["Check location-specific claims against current authoritative information.",1,"Context and date matter for risk claims."],
 ["Ask the system to separate assumptions from sourced evidence.",1,"Explicit uncertainty makes review easier."],
 ["Treat a precise-looking map or number as verified.",0,"Apparent precision can conceal invented data."],
 ["Keep identifiable student location information out of an unapproved service.",1,"Useful context does not justify a privacy breach."]
 ],"A strong AI workflow combines task clarity, source checking and data minimisation."),
 C("Classify the proposed AI tasks before a history lesson.",["Appropriate with review","Avoid or escalate"],[
 ["Create three alternative discussion starters using public historical events.",0,"Drafting low-risk prompts can be efficient when the teacher reviews accuracy and framing."],
 ["Determine whether an individual student's disclosure signals a safeguarding risk.",1,"A safeguarding decision requires appropriate human procedures and expertise."],
 ["Draft a simplified summary of a public source that the teacher can verify.",0,"The source is inspectable and the educator can check whether support was used as intended."],
 ["Upload confidential student case notes to a public chatbot for a prediction.",1,"Sensitive records and consequential predictions are out of bounds."]
 ],"Classify based on evidence, data sensitivity and consequences, not novelty.")
 ],
 apply:O("Put the steps for an AI-supported middle-school inquiry summary in order.",[
 "Define the learning goal and what information is actually needed.",
 "Request a draft using non-sensitive information and inspectable source material.",
 "Verify factual claims and perspectives independently.",
 "Revise or discard inaccuracies and decide what students should investigate themselves."
 ],"Purpose → bounded generation → independent verification → pedagogical decision."),
 transfer:S("An AI tool proposes a confident solution to an unfamiliar Grade 8 mathematics problem, but its steps contradict a worked solution. What should the educator do?",[
 ["Use the AI solution because its reasoning is detailed.",0,"Detailed reasoning may still be wrong."],
 ["Investigate the discrepancy with independent mathematical checking before using either explanation.",1,"Verification must match the discipline and claim."],
 ["Average the two answers to avoid bias.",0,"Averaging incompatible answers is not a method of validation."]
 ],"The same principle transfers from factual citations to mathematical reasoning.")
 },"Authenticity 3.4; Agency 2.3"),
 L("c2","Personalisation for All: Removing Barriers, Maintaining Challenge",
 "Use AI and inclusive teaching to make learning accessible without lowering the challenge.",
 "Can we remove a barrier without removing the intellectual work?",
 [
 ["Start with the learner, not the label","Personalisation starts with students' strengths, languages, interests and needs. Universal Design for Learning (UDL) means offering different ways to access ideas and show understanding. Students can work towards the same learning goal using different supports."],
 ["Protect the intended thinking","A word bank, captions, audio version or picture organiser can make a task easier to access. But if AI writes the student's argument or conclusion, it may take away the thinking the task was meant to develop."],
 ["Use MTSS as a response cycle","In a Multi-Tiered System of Supports (MTSS), Tier 1 is strong teaching and access for everyone. Some students need extra focused help (Tier 2). A smaller number may need more intensive individual help (Tier 3). Teams use several sources of evidence and check progress. One score does not decide a student's support level."]
 ],
 {scenario:"A Grade 7 student can explain food webs using pictures or speech, but finds it hard to write about causes and effects in English.",
 weak:"Ask AI to write the complete explanation for submission.",
 strong:"Offer translated key words, sentence starters and a picture of the food web. The student still chooses the evidence and explains what causes what.",
 why:"English writing may be the barrier, not understanding the science. The supports help students show their own thinking."},
 {learn:S("Which plan keeps the same strong learning goal for every student?",[
 ["Give every learner an identical format regardless of barriers.",0,"Uniform format is not the same as equitable opportunity."],
 ["Provide accessible pathways while retaining the same target understanding and evidence criteria.",1,"Access can vary without reducing the intellectual target."],
 ["Use AI to complete the difficult thinking for students who need support.",0,"Removing the target thinking is substitution, not a scaffold."]
 ],"Rigour and access should reinforce rather than compete with each other."),
 model:S("In the ecosystem example, what must the student still do?",[
 ["Choose relevant ecological evidence and explain causal relationships.",1,"The learner still demonstrates target reasoning."],
 ["Copy the explanation supplied by AI and improve its presentation.",0,"Copying does not demonstrate causal understanding."],
 ["Use only the teacher's preferred language even when it is a unrelated to the learning goal barrier.",0,"The expression route should not obscure the intended learning."]
 ],"Choose scaffolds by what learning must remain visible."),
 practice:[
 C("Identify which supports remove barriers and which replace the learning.",["Scaffold: target thinking remains","Substitution: target thinking removed"],[
 ["Allow speech-to-text for an original student explanation.",0,"The communication route changes, not the reasoning."],
 ["Generate the student's complete evidence-based conclusion.",1,"The tool has performed the target reasoning."],
 ["Offer a glossary and two contrasting worked examples.",0,"The learner still constructs a response."],
 ["Automatically choose all evidence and claims for the student.",1,"Core intellectual decisions are no longer the student's."]
 ],"A scaffold preserves the learning objective even when access pathways change."),
 M("A class has students who speak different languages and learn in different ways. Which teaching choices help everyone take part?",[
 ["Offer predictable steps and optional visual/audio access.",1,"Predictability and multimodal access support more learners."],
 ["Use the same high-level inquiry question with flexible means of demonstrating understanding.",1,"A common goal can have multiple expression routes."],
 ["Assume the same diagnosis explains every student's participation.",0,"Individual variability cannot be reduced to a label."],
 ["Collect brief formative evidence before deciding who needs additional support.",1,"Responsive design is based on what learners demonstrate."]
 ],"Universal access first; additional support should be responsive to evidence.")
 ],
 apply:O("Put the steps for choosing learning support in a sensible order.",[
 "Define the essential concept and intellectual demand.",
 "Identify likely access barriers using learner information and task analysis.",
 "Design accessible Tier 1 routes that protect the goal.",
 "Check learner responses and adjust or consult for targeted support when indicated."
 ],"Design for variability, notice actual responses, then improve."),
 transfer:S("A student can explain geometry with a model but gets a low score on a test with long English instructions. What should the teacher do next?",[
 ["Automatically assign an intervention tier from the test score.",0,"One assessment is insufficient and may conflate language with mathematical understanding."],
 ["Check whether reading demand is essential to the target, offer another valid expression route, and gather more evidence.",1,"The educator tests the barrier hypothesis without lowering the goal."],
 ["Ask AI to complete future assessments on the student's behalf.",0,"This prevents valid evidence of learning."]
 ],"Access and assessment validity intersect when tasks carry unnecessary barriers.")
 },"Personalisation 1.1, 1.4, 1.6; Agency 2.2; MTSS Tier 1"),
 L("c3","Creativity and Authenticity: Designing Beyond the Prompt",
 "Plan meaningful learning in which AI supports new ideas, research and original work.",
 "Is AI helping students create and investigate, or just making the final product look better?",
 [
 ["Authenticity is about the work","Real-world learning starts with a question, problem or audience that matters outside the classroom. A beautiful AI-made poster may hide the fact that students did little research or made few decisions."],
 ["Creativity requires ownership","AI can offer ideas and different points of view. Students still need to choose the problem, compare ideas, test their work and create something of their own. Trying an uncertain idea and learning from it can matter more than an instant polished answer."],
 ["Move beyond outputs to transfer","Ask: Who will use this work? What evidence supports it? Whose views are included or missing? How might an audience respond? Students should use what they learn to make or improve something meaningful."]
 ],
 {scenario:"Students plan a campaign to reduce single-use plastic near school. AI can instantly produce a logo, slogans and a complete slide deck.",
 weak:"Ask each group to submit the best-looking AI-generated campaign.",
 strong:"Students study local waste, talk with people affected, choose who will hear their campaign, check their claims and use AI only for ideas or feedback. Students make the important decisions.",
 why:"Real people, student ideas and useful feedback make this authentic learning—not just a polished product."},
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
 M("Which features strengthen a Grade 8 science inquiry using AI?",[
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
 "Use AI to help teams work together while keeping trust and shared decisions.",
 "Which steps can be accelerated, and which must stay human?",
 [
 ["Separate workflow tasks from responsibilities","AI can help write a meeting plan, suggest learning supports or compare options. Teachers must still set the goal, check the suggestions, protect private information and make decisions with colleagues."],
 ["Technology should strengthen relationships","Working together is more than dividing a task into sections. Students need to listen, share ideas, disagree respectfully and make decisions together. AI should not replace those conversations."],
 ["Use evidence in collaborative planning","Teams can use approved tools to organise information that does not identify students. They can discuss possible barriers, agree on a support and check if it helps. In MTSS, people—not an AI model—decide what support to try or change."]
 ],
 {scenario:"A Grade 7 team wants to help students use feedback more effectively. One teacher suggests adding student records to a public AI tool to rank who needs support.",
 weak:"Upload the records and let AI choose who needs extra support.",
 strong:"Review permitted, anonymous patterns together, agree on a clear skill target, design a Tier 1 feedback routine, and monitor students' response before considering additional support.",
 why:"AI can help teachers plan together, but the team must protect student information and make decisions that affect students."},
 {learn:S("Which example shows students learning together rather than only combining AI-generated work?",[
 ["Everyone produces an AI-generated section independently.",0,"Work division is not necessarily purposeful collaboration."],
 ["Learners negotiate decisions, learn from perspectives and contribute to shared understanding.",1,"Shared reasoning and equitable contribution matter."],
 ["The group submits the longest possible final piece of work.",0,"Volume is not an indicator of collaboration."]
 ],"AI should enhance shared thinking, not erase it."),
 model:S("What is the key flaw in the proposed upload-and-rank workflow?",[
 ["It might take longer than using a spreadsheet.",0,"The central concerns are privacy, an idea based on evidence and accountable decisions."],
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
 "Choose AI uses that keep students in charge of important learning decisions.",
 "Is the student still doing the thinking the task is meant to teach?",
 [
 ["The target thinking is non-negotiable","First decide what students must explain, decide or create themselves. AI becomes a problem when it completes those parts for them, even if the final work looks impressive."],
 ["Agency is more than choice of tool","Student agency means having a real say in learning and taking responsibility for choices. Choosing one of three AI-written answers is not the same as building and defending your own idea."],
 ["Scaffolding invites independence","Challenge helps learning when students have enough support to keep going. A scaffold is a temporary support, such as a hint, example or guiding question. As students grow more confident, reduce the support so they can work independently."]
 ],
 {scenario:"Students must build a historical argument using primary sources. Some propose asking AI for a full thesis, evidence and reasoning, then editing the prose.",
 weak:"Permit fully generated reasoning because students still improve the writing style.",
 strong:"Students first build a claim from sources. They may then use AI to suggest another view, before explaining and improving their own argument.",
 why:"The goal is to understand sources and build an argument. Editing AI-written sentences does not show those skills."},
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
 M("A Grade 8 student is stuck explaining why a geometry pattern always works. Which supports keep the thinking with the student?",[
 ["Offer a carefully chosen hint rather than the whole solution.",1,"A hint can move learning forward without finishing it."],
 ["Provide a simpler analogous example for comparison.",1,"An analogy can clarify a strategy while preserving transfer."],
 ["Immediately provide the complete proof to copy.",0,"Copying prevents evidence of proof construction."],
 ["Ask the student to explain the next step independently after a scaffold.",1,"Independent reasoning reveals what the learner can now do."]
 ],"Targeted assistance should move learners toward independent competence.")
 ],
 apply:S("A Grade 8 Design teacher wants to allow AI during a prototype project. Which plan best protects learning?",[
 ["AI may generate the final concept and decisions if students can describe the result.",0,"Describing a finished outcome is weaker than producing the intended design reasoning."],
 ["Students define criteria, evaluate iterations and justify decisions; AI may offer options for critique.",1,"The design process remains student-owned."],
 ["AI is banned, even for accessibility support, without considering goals.",0,"Responsible non-use must also follow contextual reasoning."]
 ],"Make the boundaries of human intellectual ownership explicit."),
 transfer:S("A Grade 8 student asks AI to explain a new poem before reading it. What best protects the student's own interpretation?",[
 ["Require an initial personal close reading, then use AI as a contrasting interpretation to scrutinise.",1,"Comparison comes after the student's interpretive work."],
 ["Use the AI interpretation as the student's opening argument.",0,"That reverses the intended ownership."],
 ["Grade the fluency of the AI-produced response.",0,"Fluency is not evidence of literary analysis."]
 ],"The principle of ownership transfers from history to literature.")
 },"Agency 2.1-2.3, 2.6, 2.9; Personalisation 1.3"),
 L("j2","Evidence Before Intervention: MTSS, Inclusion and Belonging",
 "Use a range of evidence to choose support, without letting AI label students.",
 "What do we need to notice before deciding how to support a learner?",
 [
 ["One indicator is not a learner","A test score, attendance record or classroom observation tells only part of the story. Language, task design, relationships and access can affect what we see. Look for students' strengths as well as areas where they need help."],
 ["MTSS is an ongoing response cycle","Start by checking whether Tier 1 teaching is accessible and working. If students need more help, a team may plan Tier 2 small-group support and check progress. Tier 3 involves more intensive, individual support planned by qualified staff. These tiers describe the help provided—not a fixed label for a child."],
 ["Belonging and cultural responsiveness matter","Ask how students have been able to show what they know. Consider relationships, classroom expectations and perspectives you may not have heard. AI can help organise approved, anonymous information, but it must not diagnose students or decide who needs a referral."]
 ],
 {scenario:"A Grade 8 student who is learning English scores poorly on a timed science test with lots of reading. However, they explain the science well with diagrams and discussion.",
 weak:"Use the test score to put the student in a Tier 2 group straight away.",
 strong:"Check whether the English reading made the test harder than the science goal. Offer clearer ways to show understanding, collect more evidence and check progress.",
 why:"The low score may reflect a language barrier rather than weak science understanding. The team needs more evidence."},
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
 "Check Tier 1 opportunities, instructional whether support was used as intended and possible access barriers.",
 "Select and document a proportionate support with responsible colleagues when indicated.",
 "Monitor learner response and adjust, continue or escalate through approved procedures."
 ],"Notice → hypothesise → support → monitor → improve.")
 ],
 apply:M("A year-level team sees fewer assignments completed and lower belonging survey results. What should they do next?",[
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
 "Gather trustworthy evidence of learning and give feedback students can use.",
 "What evidence shows what students truly understand and can do?",
 [
 ["Validity comes before policing","A polished final product does not always show what a student understands. First decide which skills you want to assess. Then look for evidence in the student's process, explanations and ability to use the learning in a new situation."],
 ["Feedback must be acted upon","AI can suggest changes quickly. Students learn when they decide which feedback to use and why. Teachers still need to check that feedback is accurate, fair and helpful."],
 ["Trust is designed, not detected","Tell students clearly what AI help is allowed. Include small checks where they explain or demonstrate learning independently. AI-detection tools can be wrong and should not be treated as proof of cheating. Protect student data and review important assessment decisions yourself."]
 ],
 {scenario:"A Grade 9 science student submits an excellent investigation report. The teacher is unsure whether the student can explain their choices and check the evidence without AI.",
 weak:"Use a detector score to declare the report authentic or inauthentic.",
 strong:"Check drafts and notes, ask focused questions about the investigation, and give a short new task the student completes independently.",
 why:"The question is what the student understands and can do in a new situation—not what an AI detector guesses from writing style."},
 {learn:S("Which assessment gives the strongest evidence of student learning when AI is available?",[
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
 transfer:S("A Grade 8 student uses AI to make a correct graph but cannot explain the scale in a different graph. What should the teacher conclude?",[
 ["The final product proves full mastery.",0,"Correct output does not demonstrate independent interpretation."],
 ["The evidence suggests further teaching and assessment of interpretation are needed.",1,"The independent transfer gap is informative."],
 ["The student necessarily committed misconduct.",0,"A learning gap alone is not a misconduct finding."]
 ],"Valid assessment distinguishes tool-produced correctness from transferable learning.")
 },"Authenticity 3.4; Agency 2.3; Creativity 4.2; Collaboration 6.4"),
 L("j4","From Judgement to Taking Action: A Transformative Learning Decision Lab",
 "Bring together what AI can do and what responsible educators should decide.",
 "What should we change, preserve or refuse—and how will we know if it helps?",
 [
 ["Design with Engagement for All in view","Start with what students should experience, decide, create and contribute. Use the relevant learning ideas—personalisation, agency, authenticity, creativity, collaboration and taking action—to improve the task. They are guides, not boxes to tick."],
 ["Notice evidence, not impressions","A lesson may feel successful without helping everyone learn. Look at what students say, choose, make and do together. Ask who could take part, whose views were included and what learning evidence is visible."],
 ["Reflect, improve and remain accountable","Use AI only where it adds real value and you can manage the risks. Check whether the plan includes everyone and protects learning. Review the evidence, decide what to improve, and remember that not using AI can be the right choice."]
 ],
 {scenario:"A Grade 8 team plans a local air-quality project. Students have different language and learning needs. AI could write a full report quickly, but the goal is for students to study evidence and recommend useful action.",
 weak:"Publish the AI report, award a grade for its polish and call the task transformative.",
 strong:"Students choose a question, check local data and views, build their own ideas, use approved AI only for support or feedback, and share recommendations with people who can use them.",
 why:"AI can make work easier. Teachers still need to protect good evidence, student voice, inclusion and meaningful action."},
 {learn:S("Which principle best summarises the Capacity × Judgement relationship?",[
 ["If AI can generate the output, using it is automatically preferable.",0,"Capability alone cannot establish pedagogical benefit."],
 ["Use AI when it strengthens the intended learning and protects people, evidence and agency; otherwise limit or refuse it.",1,"Purpose and accountable judgement determine use."],
 ["Never use AI when students are learning independently.",0,"Support and non-use both need contextual justification."]
 ],"More capacity does not automatically create more transformative learning."),
 model:S("In the air-quality inquiry, which activity makes the greatest difference to authenticity?",[
 ["Students test claims against local evidence and communicate to real people who may use the work.",1,"Investigation and consequence make the task meaningful."],
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
 transfer:S("A Grade 8 PE teacher wants AI to create personal exercise plans based on one fitness test. Which approach is most responsible?",[
 ["Automate everything because the data is numerical.",0,"Numbers do not remove validity, privacy or contextual concerns."],
 ["Use reviewed AI drafting where permitted, use more than one source of evidence about student learning, preserve human support decisions and monitor responses.",1,"This preserves purpose, evidence, inclusion and accountability."],
 ["Stop offering any feedback because AI introduces uncertainty.",0,"Thoughtful feedback remains essential, whether or not AI is used."]
 ],"Judgement is demonstrated by a bounded, evidence-informed decision in a new context.")
 },"Taking Action 5.1, 5.2, 5.4-5.5; Being, Connecting and Doing")
];

/* V4.1: plain-language, nuanced professional judgements for a multilingual
 * middle-school pilot. The strongest answer must be defensible, not just obvious.
 */
const revisedSingles={
 c1:{
  learn:[
   ["Use the explanation as a draft, but only check facts if a student questions them.",0,"Checking after students challenge a claim may be too late, especially if the claim affects learning."],
   ["Treat it as a useful starting point and check important claims using sources you can open.",1,"AI can help you start, while evidence and the teacher decide what can be trusted."],
   ["Ask a second AI tool for the same explanation and use it if they agree.",0,"Two similar answers are not independent proof that a claim is true."]
  ],
  model:[
   ["Ask AI to suggest replacement citations, then share the lesson if the new list looks convincing.",0,"New-looking citations still need to be opened and checked."],
   ["Find original, accessible sources and rewrite or remove claims that cannot be supported.",1,"This tests the claim rather than trusting a convincing format."],
   ["Keep the explanation but label it 'AI draft' so students know it may contain errors.",0,"A warning alone does not make an incorrect teaching explanation safe to use."]
  ],
  transfer:[
   ["Ask the model to explain its steps more clearly, then use its result as a worked example.",0,"A clearer explanation can still repeat the same error."],
   ["Check the disputed steps with a different method and use only reasoning that holds up.",1,"Independent mathematical checking resolves the disagreement."],
   ["Show both answers and ask students which one seems more convincing before checking.",0,"Students can debate both, but appearance cannot replace mathematical proof."]
  ]
 },
 c2:{
  learn:[
   ["Offer a separate, easier learning goal whenever a student struggles with the task's format.",0,"Reducing the learning goal may hide a barrier that could be removed instead."],
   ["Keep one strong learning goal, with different ways to access information and show understanding.",1,"This supports varied learners while keeping the core challenge."],
   ["Use the same format for everyone, adding extra time where needed.",0,"Extra time can help, but it does not remove all language or access barriers."]
  ],
  model:[
   ["Use a word bank and diagrams, then ask the student to select evidence and explain the science.",1,"The support changes access, while the student still develops the explanation."],
   ["Give the student an AI-written explanation to annotate so the science content is correct.",0,"Annotation may help learning, but it does not yet show independent explanation."],
   ["Allow a verbal response, but use AI to choose which evidence the student should cite.",0,"Changing the response format helps; outsourcing evidence selection removes key reasoning."]
  ],
  transfer:[
   ["Offer a reading guide and repeat the same test until the score improves.",0,"This may help reading but still confuses the reading demand with the geometry goal."],
   ["Check the task's reading load, offer another valid way to show geometry thinking, and collect more evidence.",1,"This tests whether the low score reflects mathematics or a language barrier."],
   ["Use a simpler geometry question so the student can show success quickly.",0,"The goal is to make the intended geometry learning visible, not lower the challenge."]
  ]
 },
 c3:{
  learn:[
   ["Give students a real-world-looking product with a simulated audience generated by AI.",0,"It may look authentic, but students need a meaningful question and evidence of contribution."],
   ["Have students investigate a real question, use sound evidence and make decisions for a meaningful audience.",1,"Authentic purpose and student decisions give the work value beyond its appearance."],
   ["Allow students to choose the best AI-made product and display it around school.",0,"Choice of presentation is weaker than original investigation and creation."]
  ],
  model:[
   ["Add a more detailed rubric so students can earn marks for an attractive finished campaign.",0,"A rubric can guide quality, but it does not create missing investigation or ownership."],
   ["Collect local evidence, consider stakeholder views and show where students made and tested their decisions.",1,"This makes the work useful and the learning visible."],
   ["Ask AI to generate three versions so students can choose one that best fits the audience.",0,"Comparing options can be a scaffold, but it does not replace research and real contribution."]
  ],
  transfer:[
   ["Let the tool translate the school's standard guide, then ask students to choose a layout.",0,"This leaves limited room for students to learn from families or make language decisions."],
   ["Have students learn what new families need, compare translations critically and test their guide with users.",1,"Student inquiry, language choices and feedback make the work authentic."],
   ["Have each student translate one section independently and combine the sections without a user review.",0,"Dividing the task saves time but does not ensure the guide meets families' needs."]
  ]
 },
 c4:{
  learn:[
   ["Give each group member a separate AI-generated section and combine them at the end.",0,"Dividing a product does not guarantee shared learning or discussion."],
   ["Ask students to listen, challenge ideas respectfully and make key choices together.",1,"Shared reasoning and equitable voice are central to collaboration."],
   ["Let the student who knows AI best make the final choices after hearing the group.",0,"This may be efficient, but does not give the whole group responsibility."]
  ],
  model:[
   ["Use the public AI service only after removing students' names from the files.",0,"Removing names alone may not protect identities, and the system would still be deciding support."],
   ["Use approved anonymous summaries, agree on a learning goal as a team and review student progress yourselves.",1,"The team protects privacy and stays responsible for support decisions."],
   ["Use the AI ranking as one source alongside a teacher's observation, then assign support groups.",0,"A ranking from a tool that is not approved or tested for this purpose is not reliable evidence."]
  ],
  transfer:[
   ["Let AI translate the messages, then have one teacher review for grammar.",0,"Grammar checks alone do not ensure students learn from one another's perspectives."],
   ["Have students discuss meanings, check translations together and decide how both cultures are represented.",1,"Translation supports real exchange while students own the collaboration."],
   ["Use a shared rubric to grade the final products without requiring cross-school discussion.",0,"A common rubric can help, but the task would miss its collaborative purpose."]
  ]
 },
 j1:{
  learn:[
   ["Whenever AI gives hints, students are no longer thinking for themselves.",0,"Hints can preserve thinking when students still make the key decisions."],
   ["When AI completes the thinking students were meant to learn and demonstrate.",1,"Support becomes replacement when it does the target intellectual work."],
   ["Only when students copy AI wording without naming the tool.",0,"Attribution matters, but a fully attributed AI answer can still replace learning."]
  ],
  model:[
   ["Students choose a thesis from three AI suggestions and improve its wording.",0,"The thesis and reasoning remain mostly AI-selected."],
   ["Students select and interpret sources, build the claim and defend their choices.",1,"These are the skills the history task is meant to develop."],
   ["Students write a claim and let AI select all the supporting sources.",0,"Writing the claim alone does not show source selection and evaluation."]
  ],
  apply:[
   ["Let AI suggest several possible designs and require students to explain which is best.",0,"Comparison helps, but students must also set criteria, test and improve their own work."],
   ["Have students define design criteria, test ideas and explain decisions, using AI only for critique or options.",1,"The learning remains in the design choices and improvement cycle."],
   ["Allow AI for every step, but grade only the students' final spoken explanations.",0,"An explanation matters, but it may not show that students can make the design decisions themselves."]
  ],
  transfer:[
   ["Ask AI for two interpretations, then let students choose which one sounds most convincing.",0,"This may support comparison but skips the student's initial reading and evidence."],
   ["Ask students to make a first interpretation using the poem, then compare and question an AI suggestion.",1,"The student's close reading comes first; AI becomes a source of challenge."],
   ["Give students an AI interpretation with missing lines to complete before reading the poem.",0,"A gap-fill activity can focus attention but still frames the interpretation for students."]
  ]
 },
 j2:{
  learn:[
   ["Use a low score to begin extra support, then check whether the difficulty continues.",0,"It is useful to respond quickly, but first check context and whether Tier 1 access was adequate."],
   ["Review several sources, check classroom teaching and adjust supports while monitoring progress.",1,"MTSS is a cycle of teaching, evidence, response and review."],
   ["Wait for the next formal testing window before responding to a student's needs.",0,"Waiting for a formal test can delay helpful instruction; brief classroom checks are useful."]
  ],
  model:[
   ["Offer more reading practice first, since the low score came from a reading-heavy test.",0,"Reading may need support, but the team must check what science understanding the test measured."],
   ["Check whether language blocked the student from showing science knowledge and gather other evidence.",1,"A barrier in the test format may explain the score more than the concept."],
   ["Reduce the science complexity of future tasks so the learner can work more confidently.",0,"Confidence matters, but lowering the goal is not the first response to a language barrier."]
  ],
  transfer:[
   ["Look at other data later; strong grades suggest the student is likely doing fine.",0,"Achievement does not tell us how connected or safe a student feels."],
   ["Listen to the student, check relationships and school context, and follow appropriate support procedures.",1,"This takes belonging seriously without guessing a diagnosis."],
   ["Ask the student to complete a second rating scale before anyone speaks to them.",0,"Another scale may add information, but it should not replace timely, respectful conversation."]
  ]
 },
 j3:{
  learn:[
   ["Assess the final product using clearer marking criteria and teacher judgement.",0,"A rubric helps, but the product alone may still hide who did the thinking."],
   ["Use clear criteria with evidence of student decisions, explanations and independent use in a new task.",1,"Different aligned evidence gives a stronger picture of understanding."],
   ["Use a detector score alongside the finished product to check whether it is genuinely the student's work.",0,"Detection is unreliable and does not directly measure the learning goal."]
  ],
  model:[
   ["Because the student must use the learning on a new example without AI completing the work.",1,"Independent application provides evidence of understanding."],
   ["Because it confirms that every sentence in the original report was written by the student.",0,"It cannot prove authorship of earlier work."],
   ["Because teachers can skip checking drafts if the final independent task goes well.",0,"One task can strengthen evidence, but it should be considered alongside other evidence."]
  ],
  transfer:[
   ["Record the correct final product as success and offer extra practice only if the next test is also weak.",0,"The new example already shows an important gap in independent understanding."],
   ["Teach and check how to read a graph scale again, using the new example as evidence.",1,"This responds to the learning gap the independent task revealed."],
   ["Change the mark based on whether AI was used, even without clear task expectations.",0,"Assessment should follow communicated criteria and evidence, not unsupported assumptions."]
  ]
 },
 j4:{
  learn:[
   ["Use AI when it saves teacher time, provided students still submit an individual product.",0,"Efficiency can help, but an individual product does not always show learning or safety."],
   ["Use AI when it supports the learning goal, protects people and leaves important student decisions visible.",1,"Learning value and responsibility determine the choice."],
   ["Use AI in the early stages of every task, then remove it before final assessment.",0,"A fixed rule may ignore tasks where AI adds no value or removes needed thinking."]
  ],
  model:[
   ["Have students explain the AI-generated final report so they can speak confidently to an audience.",0,"Explanation helps, but students still need to investigate, use evidence and make decisions."],
   ["Have students study local data, test claims and share a student-owned proposal with a real audience.",1,"The work joins inquiry, evidence, agency and purposeful action."],
   ["Use a simulated community response to avoid the time needed for local feedback.",0,"A simulation can help prepare, but it does not replace learning from genuine stakeholders."]
  ],
  transfer:[
   ["Use AI to create a plan for every student and approve it if the fitness scores look sensible.",0,"One score is not enough to design a safe, personal exercise plan."],
   ["Start with safe learning goals, offer student choices, use approved ideas only when helpful, and check individual needs through school guidance and other evidence.",1,"Students need safe choices and teacher judgement, not a plan based on one score."],
   ["Give every student the same workout instead of checking their needs.",0,"Avoiding AI does not remove the need for safe, inclusive teaching."]
  ]
 }
};
for(const m of [...capacity,...judgement]){
 const overrides=revisedSingles[m.id];
 for(const stage of ["learn","model","apply","transfer"]){
  if(overrides[stage]&&m.tasks[stage]?.kind==="single")m.tasks[stage].options=overrides[stage];
 }
}


/* Accessible definitions appear only when educators ask for them. */
const plainWords={
 c1:[["AI output","Text, an image or another result made by an AI tool."],["Check a claim","Find trustworthy evidence you can open and compare with the claim."],["Source","The original place a claim or idea comes from."]],
 c2:[["UDL","Universal Design for Learning: plan different ways to access and show learning."],["MTSS","Multi-Tiered System of Supports: plan, check and adjust teaching and extra help using evidence."],["Scaffold","A temporary support such as a hint, picture or word bank that leaves the thinking with the student."]],
 c3:[["Authentic audience","Real people who may use, respond to or benefit from student work."],["Inquiry","Investigating a question by finding and checking evidence."],["Prototype","An early version that students test and improve."]],
 c4:[["Workflow","The steps a group follows to complete a task."],["Anonymous information","Information that does not identify an individual student."],["Shared decision","A choice made through discussion and responsibility, not by one person or tool alone."]],
 j1:[["Agency","Having a meaningful say in learning and taking ownership of choices."],["Scaffold","A temporary hint, example or support that helps students do their own thinking."],["Independent work","What a student can explain or do without a tool completing it for them."]],
 j2:[["MTSS","Multi-Tiered System of Supports: a cycle of teaching, added support and reviewing progress."],["Tier 1 / 2 / 3","Tier 1: strong teaching for all. Tier 2: extra focused support. Tier 3: more intensive individual support."],["Belonging","Feeling welcomed, included and connected at school."]],
 j3:[["Valid assessment","An assessment that really measures the skill or understanding it is meant to measure."],["Feedback","Information that helps students decide what to improve next."],["Transfer","Using what you have learned in a different situation."]],
 j4:[["Engagement for All","A commitment to learning that includes, challenges and supports every student."],["Taking action","Using learning to make a useful difference."],["Evidence of learning","What students say, choose, make and do that shows their understanding."]]
};
const followups={
 c1:S("New information: two official sources give different numbers for the same local issue. What should the teacher do next?",[
 ["Use the newer number because it is more recent, then add a footnote.",0,"The sources may measure different things; date alone does not settle the difference."],
 ["Compare dates, definitions and methods, explain the difference, and choose evidence that fits the lesson goal.",1,"Understanding why numbers differ gives students a more trustworthy account."],
 ["Ask AI to combine the two figures into one number that avoids disagreement.",0,"A combined number without a valid method can hide the problem."]
 ],"Good judgement includes showing uncertainty when sources disagree."),
 c2:S("New information: after several lessons with accessible Tier 1 supports, three learners still struggle with the same science skill. What next?",[
 ["Plan extra focused teaching, agree on a short progress check and review the response with the support team.",1,"Additional help is based on evidence and reviewed for impact."],
 ["Give those students the same easier science objective for the rest of the unit.",0,"A lower target is not automatically the right response to continued difficulty."],
 ["Send every student with a low score to the same fixed support group.",0,"Support should respond to the specific skill and context, not one label."]
 ],"MTSS adds support in response to evidence; it does not label students permanently."),
 c3:S("New information: community members say the students' plastic-reduction idea is hard to carry out. Which next step is best?",[
 ["Use AI to rewrite the plan to match the community response and submit the final version.",0,"Students miss the chance to evaluate feedback and revise their own thinking."],
 ["Have students compare feedback with their evidence, test another idea and explain the revised choice.",1,"Students learn from authentic feedback and make the next decision."],
 ["Keep the first plan because students already completed the main learning activity.",0,"Authentic work grows when student ideas meet real constraints."]
 ],"Meaningful action includes responding to real-world feedback."),
 c4:S("New information: a shared lesson plan works for most students, but quieter multilingual learners are contributing less. What should the team change?",[
 ["Give more speaking time to the most confident students so the group can finish.",0,"This may speed work but further limits voice and shared learning."],
 ["Add different ways to prepare and share ideas, then check each learner's contribution.",1,"Accessible group roles and evidence of participation make collaboration more equitable."],
 ["Use AI to assign students permanent roles based on English test scores.",0,"A score is not enough to define how someone should contribute."]
 ],"Team workflows should respond to who is and is not taking part."),
 j1:S("New information: student prototypes look strong, but most design criteria came from AI. What would best improve evidence of agency?",[
 ["Ask learners to explain why they kept or changed each criterion and test at least one criterion they developed themselves.",1,"Students can demonstrate ownership through decisions, testing and revision."],
 ["Give more marks for fluent explanations of the final product.",0,"Fluency alone may not show who chose the design criteria."],
 ["Reduce the task to choosing the best AI-generated design.",0,"This further limits student control of the design process."]
 ],"Agency becomes visible when students make and defend meaningful choices."),
 j2:S("New information: after three weeks, one small group's participation improves but another group's does not. What is the most useful next step?",[
 ["Keep both groups on the same support plan until the next formal exam.",0,"Waiting may miss the chance to adjust a support that is not helping."],
 ["Check whether each support was delivered as planned, review learner evidence and adjust the second group's approach.",1,"A response cycle tests what worked and what needs to change."],
 ["Move the second group automatically to a more intensive tier based on limited progress.",0,"More intensive support requires wider evidence and the right professional process."]
 ],"Notice differences in response, then make careful changes."),
 j3:S("New information: students can explain their project choices in class but struggle to apply the idea in a fresh example. What does this suggest?",[
 ["The final project is still enough evidence because they can explain their choices.",0,"Explaining a past choice does not always show they can apply the idea elsewhere."],
 ["Add teaching and checks that target using the idea in a new context before claiming secure understanding.",1,"The independent transfer gap gives the teacher a useful next step."],
 ["Require another polished final product, this time without any AI tools.",0,"A new product may still fail to show transfer unless the task measures it directly."]
 ],"Use evidence of transfer to guide further instruction."),
 j4:S("New information: the air-quality project produces strong proposals, but multilingual students rarely speak in the final group discussion. Which improvement best fits Engagement for All?",[
 ["Keep the presentation format because the proposals are academically strong.",0,"A strong product alone does not show who had a voice."],
 ["Offer preparation time and different ways to contribute while keeping evidence and student decisions central.",1,"Access, voice and the learning goal can be strengthened together."],
 ["Have AI speak on behalf of students who use English less confidently.",0,"This may hide the perspectives the task was designed to include."]
 ],"Taking action should make meaningful participation possible for more students.")
};
const multiOverrides={
 c1:[
  ["Check important flood-risk claims with current local or official sources.",1,"Local risks and dates need independent checking."],
  ["Ask AI to mark which of its numbers are verified and use only those.",0,"An AI label is not independent verification."],
  ["Compare results from two AI chats and accept figures on which they agree.",0,"Two models may repeat the same mistake or source."],
  ["Keep individual students' home locations out of an unapproved tool.",1,"Privacy boundaries still apply to teacher planning."]
 ],
 c2:[
  ["Provide optional diagrams, audio and word banks for key ideas.",1,"Several entry points can remove access barriers."],
  ["Keep the core learning goal while allowing more than one way to show understanding.",1,"Different formats do not require lower expectations."],
  ["Offer the easiest possible task only to students on a language-support list.",0,"A label should not automatically lower learning goals."],
  ["Use quick classroom checks to see whether extra support is needed.",1,"Actual response to teaching helps guide the next step."],
  ["Use last year's test bands as permanent groups for every topic.",0,"Needs vary by subject, skill and time."]
 ],
 c3:[
  ["Let students choose and refine a research question about their local environment.",1,"Question choice helps students own the inquiry."],
  ["Check AI summaries against data and sources students can inspect.",1,"An AI summary is not evidence by itself."],
  ["Ask AI to write the likely conclusion before students analyse evidence.",0,"This risks making the inquiry confirm a ready-made claim."],
  ["Invite people affected by the issue to question the students' proposals.",1,"Authentic feedback makes the work more meaningful."],
  ["Let AI rank the proposed solutions without explaining its criteria.",0,"Unclear criteria remove student evaluation of trade-offs."]
 ],
 c4:[
  ["Ask everyone to offer and question ideas before the group chooses a direction.",1,"Shared thinking requires equitable discussion."],
  ["Invite perspectives from students who may see the problem differently.",1,"Different experiences can improve the solution."],
  ["Let the fastest group member make the final choice after collecting AI drafts.",0,"Contribution is not the same as shared decision-making."],
  ["Check both group progress and what each student has learned.",1,"Both shared outcomes and individual understanding matter."],
  ["Use AI to merge contributions without asking the group to review the changes.",0,"A polished merge can hide lost voices or meaning."]
 ],
 j1:[
  ["Give a short hint, then ask the student to explain the next step.",1,"The student makes the next mathematical decision."],
  ["Provide the full explanation first and ask the student to copy it with notes.",0,"This can help study, but it does not demonstrate independent proof-building."],
  ["Use a shorter related example, then return to the original problem.",1,"An example can guide without completing the target problem."],
  ["Let AI fill missing steps, with students checking only whether they look right.",0,"Recognising a plausible step is weaker than building the reasoning."]
 ],
 j2:[
  ["Check task design, student views and classroom relationships before deciding what caused the change.",1,"Several explanations may fit the first data point."],
  ["Look at whether universal teaching and access supports were used as planned.",1,"Tier 1 quality must be considered."],
  ["Use the dashboard's risk group as a starting tier assignment, then ask teachers to approve it.",0,"A dashboard label alone cannot justify a tier assignment."],
  ["Make a small change, set a review date and monitor learning and belonging.",1,"A measured trial helps teams learn what works."],
  ["Assume the cohort average explains the needs of each individual student.",0,"Group patterns cannot replace individual context."]
 ],
 j3:[
  ["Students compare AI suggestions with success criteria and choose what to change.",1,"Students make the feedback decision."],
  ["AI rewrites the weak sections first so students can see a high-quality final answer.",0,"This may reduce opportunities to practise revision."],
  ["Students accept or reject a suggestion and explain the choice through a selected criterion.",1,"Evaluating feedback can strengthen learning."],
  ["The teacher checks feedback only when the AI reports low confidence.",0,"Important feedback still needs human review for fit and fairness."]
 ],
 j4:[
  ["Decide which thinking and decisions must remain with students.",1,"Ownership needs to be defined before choosing tools."],
  ["Identify access barriers and offer supports that keep the learning goal strong.",1,"Inclusive design preserves challenge."],
  ["Let AI produce a polished model project that students can copy if needed.",0,"Copying the model can hide student thinking."],
  ["Check approvals, privacy, sources and who is responsible.",1,"Safeguards remain necessary."],
  ["Plan evidence of what students say, choose, create and do.",1,"Evidence helps the teacher decide what improved."],
  ["Ask AI to suggest intervention tiers from quiz scores, then review only unusual cases.",0,"Support decisions need human judgement and multiple sources of evidence."]
 ]
};
const classOrder={
 c1:[0,1,3,2],c2:[1,0,2,3],c3:[1,3,0,2],c4:[0,2,1,3],
 j1:[1,0,3,2],j2:[0,1,2,3],j3:[0,3,1,2],j4:[3,0,2,1]
};
/* Rebalance single-answer locations without changing which response is best.
 * Target answer positions are balanced across the complete 8-module course.
 * Fixed seeded order prevents patterns and avoids shifting choices on reload.
 */
let singleList=[];
for(const m of [...capacity,...judgement]){
 m.glossary=plainWords[m.id];
 m.tasks.followup=followups[m.id];
 for(const stage of ["learn","model","apply","followup","transfer"]){
  if(m.tasks[stage]?.kind==="single")singleList.push(m.tasks[stage]);
 }
 const classifiers=m.tasks.practice.filter(t=>t.kind==="classify");
 for(const c of classifiers)c.items=classOrder[m.id].map(i=>c.items[i]);
 const multis=[...m.tasks.practice,m.tasks.apply].filter(t=>t.kind==="multi");
 for(const q of multis)q.options=multiOverrides[m.id];
}
let seed=20261120;
const random=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return (seed>>>0)/4294967296};
const mix=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a};
const targets=mix(Array.from({length:singleList.length},(_,i)=>i%3));
singleList.forEach((t,i)=>{
 let n=0;
 while(t.options.findIndex(o=>o[1]===1)!==targets[i]&&n++<4)t.options.push(t.options.shift());
});
for(const m of [...capacity,...judgement]){
 for(const q of [...m.tasks.practice,m.tasks.apply])if(q.kind==="multi")mix(q.options);
}

window.EDUCATOR_V4={
 version:"4.1",
 courses:[
 {id:"capacity",title:"AI Capacity",subtitle:"Explore what AI can do for teachers and students, while checking its limits and keeping learning at the centre.",minutes:120,modules:capacity},
 {id:"judgement",title:"AI Judgement",subtitle:"Protect student thinking. Use evidence, professional responsibility and purposeful action to make better decisions.",minutes:120,modules:judgement}
 ],
 stages:["learn","model","practise","apply","transfer"],
 stageLabels:["Learn","Model","Practise","Apply","Transfer"]
};
})();