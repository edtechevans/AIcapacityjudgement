/* Classroom-quality planning and unseen transfer tasks for the 30-module
   public preview. Student work is never sent to a server or auto-scored. */
const UNSEEN_TRANSFER = {
 "6-A1":"A library kiosk suggests books when students type a genre. Without knowing how it was made, which evidence would help you decide whether it follows programmed rules or learned patterns? Test two inputs and name what remains uncertain.",
 "6-A2":"A Grade 3 learner is confused about fractions. Design two different instructions for a learning assistant, predict what each may help with, compare a teacher-provided result and identify what must be verified.",
 "6-A3":"The school is losing playground equipment. Design two ways to address the problem, one using technology and one without it. Which should be tested first, and whose feedback matters?",
 "6-B1":"You are learning to draw a graph in maths. A tool offers to draw it for you. Design a plan that preserves the exact graphing skill you need to practise.",
 "6-B2":"A class group chat claims a rare bird was seen locally. Explain what you would check before sharing and how you would communicate uncertainty if the original source cannot be found.",
 "6-B3":"A friend asks for a birthday invitation featuring classmates' faces and home addresses. Design a version that keeps the purpose while protecting privacy and consent.",
 "7-A1":"A sports activity classifier learned only from sunny-day examples. Design a fair unseen test for rainy conditions and explain how you would identify a misleading shortcut in its training data.",
 "7-A2":"A study guide lists impressive citations about a historical protest, but one citation's year is inconsistent. Describe a traceable plan for checking every reference and revising the guide.",
 "7-A3":"An assistant edits a letter requesting better accessibility but removes the students' strongest concerns. Explain which changes you would reject, what you would revise and how you would test the new version with its audience.",
 "7-B1":"A learner wants to practise speaking a second language, but a tool offers complete translated dialogues. Design a support routine that develops the learner's own speaking ability.",
 "7-B2":"Three news outlets repeat a startling health statistic, all citing the same social post. Draw a source chain and explain what independent verification would require.",
 "7-B3":"A student creates a school podcast with a friend's voice sample and an AI-generated music clip. Explain the permissions, source acknowledgements and safer alternatives needed before release.",
 "8-A1":"A new summarisation tool appears better on a single short article but worse on an unfamiliar language. Design fair comparison criteria, gather additional test cases and report what you can actually conclude.",
 "8-A2":"A school translation workflow saves drafting time but produces errors in emergency instructions. Map a safer workflow including human checks, access needs and who is accountable for release.",
 "8-A3":"A school map app works for confident readers but not for new multilingual students. Decide how to gather feedback, redesign one feature and test whether the change helps.",
 "8-B1":"Students are learning to estimate measurements in science. Decide where automated calculations would strengthen the investigation and where they might weaken the intended learning.",
 "8-B2":"A search page for a community event shows only popular opinions. Propose a ranking change, explain what voices would become visible and identify a potential weakness in your new criteria.",
 "8-B3":"A school scheduling system is accurate for most students but repeatedly misses an accessibility need. Map stakeholders, an appeal route, and the evidence required before deployment.",
 "9-A1":"A chatbot performs perfectly on familiar English questions but fails during a high-stakes unfamiliar request. Write an evaluation-card excerpt: intended use, edge cases, error consequences and what cannot yet be claimed.",
 "9-A2":"An AI-assisted data project is faster to draft but requires hours correcting invented figures. Build an end-to-end comparison that could persuade a sceptical audience to choose or reject the tool.",
 "9-A3":"An AI-generated public-service poster saves work but misrepresents a minority language group. Design an evidence-based review with feedback, consent, accessibility and revision.",
 "9-B1":"A fictional game companion tells a player to stop talking to friends about their problems. Write a third-person guide identifying the boundary, privacy risks and appropriate human-support options without revealing your own experiences.",
 "9-B2":"A manipulated audio message appears to announce a school closure. Design a source-verification and communication plan that limits harm while uncertainty remains.",
 "9-B3":"A firm introduces AI scheduling that reduces costs but increases unpredictable shifts for some workers. Produce a conditional recommendation addressing workers, fairness, resource demand and a way to challenge decisions.",
 "10-A1":"A vendor supplies only aggregate performance figures for an AI accessibility tool. Specify the missing subgroup tests, failure thresholds and comparative non-AI baseline needed for an informed trial decision.",
 "10-A2":"A team wants to automate admissions enquiries. Compare human-only, AI-assisted and blended responses against privacy, accuracy, inclusion, cost and human accountability; defend one conditional choice.",
 "10-A3":"A proposed multilingual school guide helps most families but fails for newcomers using assistive technology. Create a revision-and-evaluation plan with stakeholders, alternative workflows and an evidence-based release decision.",
 "10-B1":"A peer argues that declining an AI feature proves low technical competence. Defend a specific non-use decision using learning goals, affected people, alternatives and what you would test next.",
 "10-B2":"Two independent studies disagree about a new educational technology. Present a calibrated conclusion that distinguishes sample differences, measurement choices and genuinely unresolved uncertainty.",
 "10-B3":"A school pilot makes an incorrect automated recommendation for a vulnerable student. Stress-test an accountable governance charter with notification, explanation, appeal, correction and oversight."
};
const CLASSROOM_PACING={
 6:{time:"40–55 minutes",prepare:"Read the scenario, prepare two contrasting examples and bring a paper sorting or sketching alternative.",setup:"A teacher-led explanation, pairs, a short practical trial and reflection."},
 7:{time:"50–65 minutes",prepare:"Prepare reliable comparison sources, consent-safe fictional datasets and an evidence recording table.",setup:"Prediction, controlled experiment, evidence discussion and peer critique."},
 8:{time:"55–75 minutes",prepare:"Gather contrasting perspectives, transparent criteria and a teacher-written user brief.",setup:"Small-group investigation, criteria-driven comparison, prototype and revision."},
 9:{time:"65–90 minutes",prepare:"Check case-study sensitivity; prepare fictional stakeholder briefs and an offline evidence set.",setup:"Investigate a contested case, evaluate uncertainty, discuss safeguards and justify a position."},
 10:{time:"70–95 minutes",prepare:"Prepare independent source materials, stakeholder roles, a rubric and an evaluation protocol.",setup:"Inquiry, comparative analysis, design or governance decision, test and defence."}
};
const MULTI_SESSION_PACING={
 "8-A3":"2 × 60-minute sessions",
 "9-A3":"2–3 × 60-minute sessions",
 "10-A3":"4 × 70-minute sessions plus feedback conference",
 "10-B3":"3 × 60-minute sessions"
};
const OFFLINE_LAB_ALTERNATIVES={
 "6-A1":"Use three illustrated process cards (fixed-rule timer, fictional trained labeler, unknown app). Change an input on each card and justify what the output does—and does not—prove.",
 "7-A1":"Use labelled leaf-feature cards and a distance table. First train with two examples, then add two missing lighting conditions and retest the same four cards.",
 "8-B2":"Print five fictional posts with attention, evidence and representation scores. Rank them under two explicit scoring rules, then negotiate a third rule with classmates.",
 "9-A1":"Use a printed table of familiar and difficult test cases. Compute both denominators and discuss why the consequences of errors are not equal.",
 "9-B1":"Use third-person fictional chatbot dialogue cards with a choice of safe responses; do not ask students to share personal information.",
 "10-A3":"Use printed stakeholder descriptions, human-only/AI-assisted workflow cards and a prototype storyboard with a test and revision log."
};
const GRADE_RESPONSE_EXPECTATIONS={
 6:"A labelled sketch, example or short explanation that separates an observation from a guess, gives one reason and identifies a way to check.",
 7:"A table or explanation comparing conditions with explicit evidence, a limitation and an independent action.",
 8:"A reasoned decision using criteria, contrasting perspectives, a small prototype or revision and a clear test.",
 9:"A reasoned evaluation with uncertainty, stakeholders, risks, alternative choices and a justified safeguard.",
 10:"A defensible assessment or product with reproducible tests, real or teacher-provided stakeholder evidence, revision and accountable decision-making."
};
const TEACHER_RUBRIC={
 mechanism:{name:"Understand and explain",developing:"Describes a familiar result without explaining why it happens.",applying:"Explains the underlying rule, mechanism or design choice with a relevant example.",transferring:"Uses the explanation to predict a new case and identifies where it may not hold."},
 evidence:{name:"Investigate and use evidence",developing:"Gives an example or preference but little testable support.",applying:"Compares alternatives using observations, relevant sources or appropriate tests.",transferring:"Designs a new test, distinguishes observation from inference and calibrates uncertainty."},
 judgement:{name:"Make a responsible decision",developing:"States AI use or non-use mainly on convenience or popularity.",applying:"Justifies the choice using the goal, learning, people affected and alternatives.",transferring:"Defends trade-offs, includes excluded perspectives and revises the decision when evidence changes."},
 creation:{name:"Create, reflect and transfer",developing:"Completes a familiar task with support and describes the output.",applying:"Makes or tests work for an identified purpose and explains feedback or revision.",transferring:"Improves an authentic response and applies the method independently to an unfamiliar situation."}
};
function classroomPlan(l){
 const base=CLASSROOM_PACING[l.grade];
 return {
  ...base,
  time:MULTI_SESSION_PACING[l.id]||base.time,
  offline:OFFLINE_LAB_ALTERNATIVES[l.id]||"Use printed fictional examples, a paper evidence table, peer dialogue and an original sketch or written solution; no live AI account is necessary.",
  response:GRADE_RESPONSE_EXPECTATIONS[l.grade],
  transfer:UNSEEN_TRANSFER[l.id],
  extension:LEARNING_SCAFFOLDS[l.id].stretch
 };
}
