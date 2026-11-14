/* Grade-appropriate instructional scaffolds for all 30 AI Capacity × Judgement modules.
   Facilitates retrieval, worked-example comparison, feedback, transfer, and inclusive choice.
   All tasks are indicative. Real learning evidence is teacher/peer assessed, not auto-graded here. */
const LEARNING_SCAFFOLDS = {
  "6-A1": {
    "notice": "Which part of the confident explanation is evidence, and which part is only wording?",
    "support": "Try: ‘The tool can ___, but it cannot reliably ___. I would check ___’.",
    "stretch": "Compare an AI image recogniser and a timer. Explain what evidence would change your classification.",
    "transfer": "In science, choose one technology and explain how you would test an important claim.",
    "criteria": [
      "Distinguish learned patterns from fixed rules.",
      "Explain a capability and two realistic limitations.",
      "Name an independent way to verify a claim."
    ]
  },
  "6-A2": {
    "notice": "What is missing from the vague prompt: task, audience, success criteria or verification?",
    "support": "Try: ‘Explain ___ to ___ in ___ form; include ___ and flag what you cannot verify’.",
    "stretch": "Write two different prompts for the same goal. Predict which output a younger student could actually use.",
    "transfer": "In language learning, improve a prompt so it helps you practise rather than write your assignment.",
    "criteria": [
      "State the audience and learning goal.",
      "Revise an instruction and explain why.",
      "Check whether the response serves its purpose."
    ]
  },
  "6-A3": {
    "notice": "Which suggestion is genuinely yours to develop, and which simply sounds exciting?",
    "support": "First sketch your own idea; then use suggestions to compare, combine or challenge it.",
    "stretch": "Make a deliberately non-AI version of your idea and compare who it helps.",
    "transfer": "In Design, test one waste-reduction idea with a real audience.",
    "criteria": [
      "Identify a need before generating ideas.",
      "Show what you chose or changed yourself.",
      "Use a sketch or test to justify a choice."
    ]
  },
  "6-B1": {
    "notice": "If AI gives you a finished answer, which thinking skill might you miss practising?",
    "support": "Try asking for a hint, question or feedback instead of the final work.",
    "stretch": "Design an example where AI helps learning in one lesson but harms it in another.",
    "transfer": "In mathematics, decide when a hint helps without replacing your own reasoning.",
    "criteria": [
      "Name the skill the student needs to practise.",
      "Choose support without surrendering the task.",
      "Explain when non-use better supports learning."
    ]
  },
  "6-B2": {
    "notice": "What evidence would you need before repeating the precise number in the example?",
    "support": "Underline the claim. Identify its source, date and what that source actually measured.",
    "stretch": "Find two independently collected sources and explain any disagreement.",
    "transfer": "In science or geography, build a three-claim fact-check log.",
    "criteria": [
      "Separate claims from convincing language.",
      "Identify relevant independent evidence.",
      "Correct a claim and explain the verification."
    ]
  },
  "6-B3": {
    "notice": "Who might be affected if a classmate's details are uploaded without permission?",
    "support": "Replace names, images or personal details with fictional examples; ask before sharing anyone's work.",
    "stretch": "Explain what to do when a task seems useful but an approved tool or consent is missing.",
    "transfer": "In a class poster, redesign a prompt to protect other people's privacy.",
    "criteria": [
      "Recognise personal and sensitive information.",
      "Choose a safer alternative or request permission.",
      "Explain consequences for other people."
    ]
  },
  "7-A1": {
    "notice": "How does the training set shape the pretend classifier's mistakes?",
    "support": "Start with two groups of example cards. Change one group, then test with a new card.",
    "stretch": "Design an unfair dataset and explain how to improve representativeness.",
    "transfer": "In science, examine how a prediction could fail on new examples.",
    "criteria": [
      "Explain the role of training examples.",
      "Test the model with unseen cases.",
      "Describe a limitation or representation problem."
    ]
  },
  "7-A2": {
    "notice": "Which suggested reference could be located and checked outside the AI response?",
    "support": "Begin with a research question. Mark every claim as verified, uncertain or unsupported.",
    "stretch": "Compare an AI-suggested research path with one built using library sources.",
    "transfer": "In Individuals & Societies, verify a claim with a traceable source.",
    "criteria": [
      "Refine a clear inquiry question.",
      "Verify sources rather than trusting a citation list.",
      "Explain what to do with unsupported information."
    ]
  },
  "7-A3": {
    "notice": "Which revision improves the reader's understanding without changing the author's meaning?",
    "support": "Keep a two-column log: ‘feedback received’ and ‘why I accepted or declined it’.",
    "stretch": "Get feedback from a person and an AI example; compare where they disagree.",
    "transfer": "In Language & Literature, revise a paragraph while preserving your voice.",
    "criteria": [
      "Begin with your own draft or design.",
      "Evaluate feedback against a clear purpose.",
      "Explain revisions and ownership."
    ]
  },
  "7-B1": {
    "notice": "Would the same tool use be appropriate if the goal were practice rather than presentation?",
    "support": "Ask: What am I meant to learn? What must I do myself? What help is allowed?",
    "stretch": "Make a decision tree for a homework task with uncertain boundaries.",
    "transfer": "In learning a language, decide when translation supports or replaces practice.",
    "criteria": [
      "Identify the learning goal.",
      "Distinguish hints, critique and substitution.",
      "Defend a use or non-use decision."
    ]
  },
  "7-B2": {
    "notice": "Are the repeated sources independent, or do they all copy the same original claim?",
    "support": "Use a source log: author, purpose, date, evidence and what remains uncertain.",
    "stretch": "Trace a historical claim backwards to its earliest available evidence.",
    "transfer": "In history, compare an AI interpretation with a primary source.",
    "criteria": [
      "Check whether sources are independent.",
      "Use multiple verification techniques.",
      "Explain and correct an omission or error."
    ]
  },
  "7-B3": {
    "notice": "Does using a classmate's image for a good purpose make uploading it acceptable?",
    "support": "Use a permission-first checklist: ownership, consent, school rules and attribution.",
    "stretch": "Compare two AI-use acknowledgements and explain which is transparent enough.",
    "transfer": "In visual arts, prepare a consent-conscious image plan and attribution.",
    "criteria": [
      "Identify who owns or appears in the source.",
      "Seek consent and protect privacy.",
      "Credit AI contributions honestly."
    ]
  },
  "8-A1": {
    "notice": "What does disagreement between models reveal—and what does it not prove?",
    "support": "Control the question and evaluation criteria, then compare outputs side by side.",
    "stretch": "Change one input at a time; distinguish variability from factual error.",
    "transfer": "In science, compare two model explanations against independent evidence.",
    "criteria": [
      "Describe the system's task and conditions.",
      "Identify repeatable errors and differences.",
      "Draw a qualified conclusion from testing."
    ]
  },
  "8-A2": {
    "notice": "At what exact point does a person need to check the generated output?",
    "support": "Draw human → AI support → independent check → revision, then label who owns each decision.",
    "stretch": "Identify a case where adding AI creates more risk or work than it saves.",
    "transfer": "In geography, map a verified research workflow about a local issue.",
    "criteria": [
      "Begin with a defined inquiry and criteria.",
      "Assign tasks thoughtfully between people and tools.",
      "Include verification and revision checkpoints."
    ]
  },
  "8-A3": {
    "notice": "Does the polished prototype solve the actual need identified by the users?",
    "support": "Interview one potential user, sketch two approaches, then test the simplest.",
    "stretch": "Test whether your solution excludes anyone or assumes every user has the same needs.",
    "transfer": "In Design, revise a community information prototype based on feedback.",
    "criteria": [
      "Define a user need and useful outcome.",
      "Compare AI and non-AI approaches.",
      "Use feedback to make a visible improvement."
    ]
  },
  "8-B1": {
    "notice": "Which part of the task is the student meant to learn through doing?",
    "support": "Say: ‘I would use AI for ___ but keep ___ as my own practice because ___’.",
    "stretch": "Defend a deliberate non-use decision even when an AI tool could finish faster.",
    "transfer": "In mathematics, distinguish practice from tool-supported checking.",
    "criteria": [
      "Explain the purpose of the task.",
      "Justify use, limited use or non-use.",
      "Consider the impact on independent learning."
    ]
  },
  "8-B2": {
    "notice": "Whose experiences are missing from this apparently neutral account?",
    "support": "Compare descriptions with voices from people represented, not only summaries about them.",
    "stretch": "Identify how changing sources changes the claims made about a community.",
    "transfer": "In Individuals & Societies, revise a one-sided historical explanation.",
    "criteria": [
      "Identify a missing or stereotyped perspective.",
      "Use relevant voices and credible evidence.",
      "Explain how representation changes the result."
    ]
  },
  "8-B3": {
    "notice": "Who benefits from efficiency, and who bears the risk if the decision is wrong?",
    "support": "Map stakeholder → possible benefit → possible harm → safeguard → who can appeal.",
    "stretch": "Imagine the least powerful person affected and test whether they can challenge a mistake.",
    "transfer": "In school leadership, assess an AI-supported administrative decision.",
    "criteria": [
      "Name affected groups beyond the main user.",
      "Weigh fairness as well as efficiency.",
      "Propose human oversight and an appeal route."
    ]
  },
  "9-A1": {
    "notice": "Are the test cases varied enough to support the confident reliability claim?",
    "support": "Use a small test matrix: condition, expected result, output, issue and uncertainty.",
    "stretch": "Design difficult edge cases to expose a failure that average results might hide.",
    "transfer": "In a digital system review, write a reproducible test report with limitations.",
    "criteria": [
      "Define and vary test conditions.",
      "Report failures and uncertainty honestly.",
      "Distinguish small-sample results from broad claims."
    ]
  },
  "9-A2": {
    "notice": "Does the faster workflow actually save time once errors and verification are included?",
    "support": "Compare outcomes using accuracy, review time, transparency and the learning goal.",
    "stretch": "Change the weight of one criterion and see if your preferred workflow changes.",
    "transfer": "In a data investigation, defend a workflow using a comparison table.",
    "criteria": [
      "Agree on criteria before testing.",
      "Compare AI and non-AI routes fairly.",
      "Explain trade-offs and the final choice."
    ]
  },
  "9-A3": {
    "notice": "Does the output help the intended audience, or simply look polished?",
    "support": "Use a test: what must the audience understand, access, question or act upon?",
    "stretch": "Audit a generated media design for stereotypes, accessibility and meaningful participation.",
    "transfer": "In a public-awareness project, document revisions after audience testing.",
    "criteria": [
      "Define an authentic audience.",
      "Evaluate clarity, inclusion and evidence.",
      "Document human decisions and revisions."
    ]
  },
  "9-B1": {
    "notice": "Which parts of the AI-use diary show growing dependence rather than useful support?",
    "support": "Colour-code the diary: support, substitution, uncertainty; explain one difficult case.",
    "stretch": "Develop a plan for retaining independent skills when help is always available.",
    "transfer": "During essay planning, set explicit boundaries for AI assistance.",
    "criteria": [
      "Identify signs of dependence.",
      "Protect a skill that needs independent practice.",
      "Propose realistic boundaries and monitor them."
    ]
  },
  "9-B2": {
    "notice": "Which part of the video claim is observable, and which part is inferred?",
    "support": "Trace the origin, date, independent corroboration and signs of altered context.",
    "stretch": "Construct a verification checklist that works even when a synthetic video looks convincing.",
    "transfer": "In media studies, assess whether a viral claim is safe to share.",
    "criteria": [
      "Separate appearance from authenticity.",
      "Investigate origin and independent evidence.",
      "Communicate remaining uncertainty."
    ]
  },
  "9-B3": {
    "notice": "Whose costs or harms are being hidden behind the word 'convenient'?",
    "support": "Use a balanced table: benefits, harms, affected groups, uncertainties and safeguards.",
    "stretch": "Evaluate a trade-off when data on environmental or social impacts are incomplete.",
    "transfer": "In Individuals & Societies, recommend safeguards for a contested application.",
    "criteria": [
      "Compare benefits across different groups.",
      "Discuss evidence and unknowns honestly.",
      "Recommend proportionate safeguards."
    ]
  },
  "10-A1": {
    "notice": "What evidence would make a new AI system's accuracy claim credible and testable?",
    "support": "Write a test protocol: claims, conditions, counterexamples, metrics and limitations.",
    "stretch": "Propose a falsifiable claim and explain the weakest evidence that would support it.",
    "transfer": "In an unfamiliar subject, brief younger students about a system's strengths and limits.",
    "criteria": [
      "Explain a new system without marketing claims.",
      "Design meaningful tests and counterexamples.",
      "Communicate constraints to a non-expert."
    ]
  },
  "10-A2": {
    "notice": "Which workflow would you choose if AI increased revision work or obscured reasoning?",
    "support": "Build two complete workflows, including verification effort and decision checkpoints.",
    "stretch": "Defend a different workflow when success criteria or constraints change.",
    "transfer": "In a personal project, justify a tool choice using a small evaluation.",
    "criteria": [
      "Define criteria and compare approaches.",
      "Account for checking and revising costs.",
      "Defend why the final method fits the goal."
    ]
  },
  "10-A3": {
    "notice": "What evidence shows that your solution works for real people, beyond the demo?",
    "support": "Run a user test, document a failure and show an improvement you made.",
    "stretch": "Transfer the solution to a new audience and explain what must change.",
    "transfer": "In a community project, present a prototype plus test evidence and limitations.",
    "criteria": [
      "Address a real need with an authentic output.",
      "Test inclusivity and practical usefulness.",
      "Transfer lessons and acknowledge limitations."
    ]
  },
  "10-B1": {
    "notice": "Can you explain both your AI-use and non-use decisions without appealing to convenience?",
    "support": "Keep a decision log with goal, tool choice, evidence, risk and reflection.",
    "stretch": "Defend an unpopular but principled decision in a short peer conference.",
    "transfer": "In your Personal Project, explain a deliberate choice not to automate a key step.",
    "criteria": [
      "Make transparent, independent decisions.",
      "Defend decisions against reasonable alternatives.",
      "Show evidence of agency and learning."
    ]
  },
  "10-B2": {
    "notice": "Which statements are established facts, which are inferences and which remain contested?",
    "support": "Use a claim–evidence–certainty table; distinguish missing evidence from conflicting evidence.",
    "stretch": "Explain how your conclusion changes when a credible new source disagrees.",
    "transfer": "In a contemporary-issues inquiry, write a qualified evidence-based argument.",
    "criteria": [
      "Separate evidence, inference and opinion.",
      "Represent uncertainty proportionately.",
      "Update conclusions when new evidence appears."
    ]
  },
  "10-B3": {
    "notice": "How can people question, appeal or repair harm from the proposed AI system?",
    "support": "Design safeguards for consent, transparency, accountability, bias review and redress.",
    "stretch": "Invite a stakeholder to challenge your charter and revise the weakest safeguard.",
    "transfer": "In a school/community proposal, defend oversight and an appeal process.",
    "criteria": [
      "Consult affected people and identify risks.",
      "Design actionable governance safeguards.",
      "Revise the proposal in response to critique."
    ]
  }
};
