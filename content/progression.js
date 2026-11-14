/* AI Capacity × Judgement · v25: pedagogical spiral and integrated transfer.
 * Author-designed map. Not an official accreditation or psychometrically validated progression.
 * Loaded after all grade modules and before the learning application.
 */
const SCOPE_SEQUENCE={
 6:{
  stage:"Notice & explain",concept:"Every AI system has inputs, a process, outputs and limits that affect what can legitimately be inferred.",
  step:"Recognise what AI is doing, and keep hold of your own thinking.",
  challenge:{
   title:"Design a trustworthy garden information card",
   question:"How could we help younger learners care for a school garden without publishing a convincing mistake?",
   task:"Compare a fixed-rule reminder and an AI-generated suggestion; check two factual claims against teacher-provided references, then create an accessible garden card in your own words. Decide where technology helps and where a teacher, observation or non-AI approach is better.",
   evidence:"A labelled input–process–output explanation, two source checks, an original card, a privacy decision and one improvement after feedback.",
   feedback:"Ask a younger learner which instruction they can actually follow. Check whether they can explain it without the AI output.",
   transfer:"Would the same approach work for safety information about pets? State what would need new verification.",
   criteria:["Identify the system's task and one limitation.","Verify claims independently and protect private information.","Create and improve an original response for its audience."]
  },
  strands:{
   A1:["Explain fixed rules, sensing and learned-pattern systems using inputs and outputs.","A fluent or clever response proves a computer understands or has checked the facts."],
   A2:["Compare prompts using purpose, audience and an independent correctness check.","A longer prompt automatically produces a more trustworthy response."],
   A3:["Sketch a human-originated idea before using and evaluating AI suggestions.","Using AI ideas automatically makes the final creative work independent."],
   B1:["Identify which learning step should remain the student's own practice.","Completing the answer means the intended skill was learned."],
   B2:["Verify a specific factual claim against an appropriate independent source.","Confident wording is evidence that a claim is true."],
   B3:["Remove personal information and obtain consent before sharing examples.","Removing a name always makes a person's information anonymous."]
  }
 },
 7:{
  stage:"Compare & verify",concept:"Training examples and test conditions shape what a model can appear to do.",
  step:"Use simple controlled tests and source trails before trusting an output.",
  challenge:{
   title:"Audit a school club information assistant",
   question:"When does a helpful recommendation exclude somebody or repeat inaccurate information?",
   task:"Test a transparent toy classifier with balanced and unbalanced examples. Review a fictional school club announcement containing a source error and an unapproved voice clip. Produce a corrected accessible announcement without using private data.",
   evidence:"A controlled comparison table, a traceable source check, an ownership and permission decision, and a revised original announcement.",
   feedback:"Ask a peer to introduce an unseen case that your original data did not cover; revise your claim about reliability.",
   transfer:"How could you evaluate a sports or library recommendation system with different learners?",
   criteria:["Compare the same test cases under different training examples.","Trace information and creative contributions to their sources.","Revise a communication after an independent challenge."]
  },
  strands:{
   A1:["Compare labelled training and held-out test examples, including a misleading shortcut.","A model that works on its training examples will be accurate for everyone."],
   A2:["Iterate an interaction while verifying citations and explaining what changed.","A fabricated citation becomes reliable when repeated by another chatbot."],
   A3:["Use AI or non-AI suggestions to revise an original artefact with audience feedback.","Accepting a polished suggestion is the same as original design."],
   B1:["Choose hints, dialogue or independence according to the skill being practised.","Getting the correct result proves the thinking was the student's own."],
   B2:["Trace corroborating sources to independent origins and identify missing evidence.","Several sites repeating one original post count as independent confirmation."],
   B3:["Apply consent, voice and image permissions, attribution and privacy before publication.","Anything online can be reused without permission or acknowledgement."]
  }
 },
 8:{
  stage:"Represent & design",concept:"AI does not encounter the world directly: selected features, modalities and ranking goals shape its outputs.",
  step:"Investigate what information is included or omitted, then design for actual users.",
  challenge:{
   title:"Redesign an inclusive school information feed",
   question:"What happens when a system optimises for attention rather than the information people need?",
   task:"Compare two simplified representations of the same cases and two ranking objectives. Design a school information feed for multilingual readers and those using assistive technology; evaluate accuracy, agency, representation and resource use against a non-AI route.",
   evidence:"A representation comparison, two ranking results, user-defined success criteria, an accessible prototype and a documented test-driven revision.",
   feedback:"Have another learner challenge whose voice the ranking hides and test your design with a different language or access need.",
   transfer:"How would your approach change for a public museum's visitor information across multiple languages and access needs?",
   criteria:["Explain how selected features or ranking objectives change outputs.","Compare perspectives and a non-AI alternative using consistent criteria.","Create and test an accessible, user-controlled response."]
  },
  strands:{
   A1:["Compare colour, shape, text and multimodal representations; identify missing features.","A model sees or understands everything a human can see in an image."],
   A2:["Architect a bounded workflow with a source check and a human release decision.","Multiple automated steps remove the need to check accuracy."],
   A3:["Prototype for a defined user's language, access and information needs.","A polished interface alone is proof that every intended learner can use it independently."],
   B1:["Evaluate how delegation can strengthen or weaken independent problem solving.","The quickest completion always produces the deepest learning."],
   B2:["Investigate how engagement and evidence ranking criteria influence what is visible.","A feed is a neutral reflection of all available information."],
   B3:["Evaluate accessibility, inclusion, data reuse and proportionate resource consumption.","An AI feature has no social or environmental cost if it is convenient."]
  }
 },
 9:{
  stage:"Challenge & evaluate",concept:"A system can succeed on average while failing in important unseen situations.",
  step:"Test the consequences of errors, persuasive interaction and manipulated media.",
  challenge:{
   title:"Investigate a disputed community alert",
   question:"How should people respond when an apparently credible, AI-assisted public message may be wrong?",
   task:"Audit the provenance of a fictional voice or video notice, compare a tool on familiar and accessibility-related edge cases, assess the consequences of false claims and design an inclusive, human-approved correction process.",
   evidence:"An independently verified provenance chain, a reproducible test log of failure cases, a stakeholder impact analysis and a carefully qualified communication plan.",
   feedback:"Invite a peer to challenge your evidence chain or introduce a hard-to-serve user case, then revise the deployment decision.",
   transfer:"What should change when the message concerns a school cancellation, medical instruction or local service?",
   criteria:["Distinguish authentic source evidence from synthetic realism.","Test consequential failure cases and name affected people.","Defend a safe response with transparent uncertainty and oversight."]
  },
  strands:{
   A1:["Evaluate reliability under changed conditions and distinguish errors from averages.","A perfect result on familiar cases proves dependable real-world performance."],
   A2:["Compare workflow accuracy, checking time and recovery after failures.","An automated draft is faster even after correction and verification costs."],
   A3:["Analyse representational harm and iterate a design with authentic feedback.","A technically attractive generated artefact cannot reinforce stereotypes."],
   B1:["Critically examine anthropomorphism and emotional dependence without disclosing personal experience.","A conversational system that sounds caring has human feelings or relationships."],
   B2:["Audit synthetic-media provenance, independent corroboration and uncertainty.","Realistic voices or many reposts authenticate an event."],
   B3:["Analyse who bears errors, privacy risks, copyright concerns and resource burdens.","Higher overall efficiency automatically makes a system responsible."]
  }
 },
 10:{
  stage:"Transfer & defend",concept:"A proposal is credible only when its outcomes, alternatives and limitations can be defended.",
  step:"Apply technical understanding and human judgement to unfamiliar decisions.",
  challenge:{
   title:"Conduct an independent adoption review",
   question:"Should a school adopt an AI-supported learning service, adopt a bounded alternative or not deploy it?",
   task:"Define stakeholders and intended outcomes, compare AI and non-AI approaches on identical criteria, investigate technical reliability and accessibility failure cases, weigh privacy and resource consequences, and defend conditions for adoption or rejection.",
   evidence:"An independently sourced evaluation report, transparent comparison matrix, tested revision and oral defence to a review panel.",
   feedback:"Give the panel one new failure or affected-person perspective and ask the student to revise or uphold the recommendation.",
   transfer:"Apply the same method to an unfamiliar community or university service without copying a past conclusion.",
   criteria:["Use reproducible tests and qualified evidence, not vendor promises.","Defend AI use or non-use against stakeholder and learning criteria.","Set accountable safeguards, monitoring and a stop condition."]
  },
  strands:{
   A1:["Distinguish benchmark evidence from intended-use performance and explain failure costs.","A single high accuracy figure answers whether a service is safe for deployment."],
   A2:["Defend a tool-selection workflow through baseline quality, effort and verification.","AI is the superior method simply because it is available."],
   A3:["Create and defend an authentic accessible solution with testing and revision.","A prototype's appearance demonstrates benefits to its intended users."],
   B1:["Give an independently defended rationale for use, bounded use or non-use.","Using less AI is automatically a sign of lower competence."],
   B2:["Synthesize conflicting evidence, infer cautiously and communicate uncertainty.","Research disagreement means either that one source is lying or all evidence is worthless."],
   B3:["Design consent, privacy, fairness, human appeal, oversight and proportionate impacts.","High efficiency removes the need for appeal or an accountable person."]
  }
 },
 11:{
  stage:"Investigate & architect",concept:"Complex AI services are engineered systems, not isolated model outputs.",
  step:"Create repeatable tests, trace sources and design a system with human control.",
  challenge:{
   title:"Architect an accountable community information service",
   question:"What would we need to establish before a system could responsibly help the community?",
   task:"Draw the complete input–model–retrieval–tool–human system, compare shifted and accessibility-related evaluations, audit source provenance, prototype an acceptable non-AI alternative and design permissions, failure recovery and meaningful appeal.",
   evidence:"An architecture diagram, independent system/model card, test trace, source dependency map and an accountable design dossier.",
   feedback:"Invite critical review by someone focused on language, access or data protection; revise the architecture and explain why.",
   transfer:"Design the investigation for a different service that uses unfamiliar data and a more consequential decision.",
   criteria:["Explain the components and relevant uncertainties of a complete system.","Produce reproducible evaluation and independent source evidence.","Architect constrained human oversight, recovery and non-use options."]
  },
  strands:{
   A1:["Map model, retrieval, inputs and human decisions; evaluate distribution shift.","One benchmark validates every component and the whole service."],
   A2:["Design bounded, recoverable, evidence-gated human–AI workflows.","Several automated agents will independently correct one another's errors."],
   A3:["Translate stakeholder needs into a tested architecture and prototype.","An original prototype can be validated solely by its designer."],
   B1:["Defend intellectual ownership, transparent help and unaided competence.","Sophisticated final work necessarily proves the learner understood it."],
   B2:["Map provenance, source independence, sample limits and warranted claims.","Five reports with copied evidence mean five replications."],
   B3:["Evaluate distributional impacts, trade-offs, voice and operational redress.","Selecting one mathematical fairness metric resolves all ethical conflicts."]
  }
 },
 12:{
  stage:"Create & steward",concept:"Original impact requires independent evidence and continuing responsibility.",
  step:"Design, test, defend and govern a solution—or make a defensible decision not to deploy one.",
  challenge:{
   title:"Defend a Capacity × Judgement impact portfolio",
   question:"What actual difference did your original solution make, and who can hold you accountable for its consequences?",
   task:"Work with an approved stakeholder or teacher-authored brief, compare AI/non-AI choices, design and evaluate a prototype or policy, document an incident and accessible remedy, gather feedback, revise and deliver a genuinely defended conclusion.",
   evidence:"An original artefact or policy, stakeholder consent and feedback records in approved storage, reproducible test results, revision history and an oral defence with impact limitations.",
   feedback:"Ask an intended user and an independent reviewer to challenge your impact claim, then document what changed or remains uncertain.",
   transfer:"Explain how the solution and its governance would change in a different community, culture or future technology context.",
   criteria:["Demonstrate independently authored work and a valid theory of change.","Evaluate and revise real benefits, limitations and failure cases.","Defend continuing accountability, meaningful correction and informed non-use."]
  },
  strands:{
   A1:["Evaluate unfamiliar multimodal/agentic systems under realistic permissions and tests.","A frontier demonstration proves safe general-purpose autonomy."],
   A2:["Stress-test orchestration, observability, tool permissions and human release decisions.","More autonomy or fewer checkpoints always improve quality."],
   A3:["Lead a defensible impact portfolio with authentic stakeholders, evidence and revision.","An innovative prototype proves measurable impact simply by existing."],
   B1:["Articulate adaptive personal and professional boundaries for AI assistance.","Responsible future work means automating every possible intellectual step."],
   B2:["Defend a revised interpretation of conflicting methods and outcomes.","A persuasive claim is strong even if its methods or causal inference are weak."],
   B3:["Rehearse incident response, transparent explanation, appeal, remedy and restart conditions.","An organisation can preserve trust by quietly concealing a harmful error."]
  }
 }
};
const SPIRAL_LABELS={A1:"Understand systems",A2:"Work with AI",A3:"Create and design",B1:"Protect agency",B2:"Establish truth",B3:"Take responsibility"};
const PROGRESSION_CONTENT={
 "6-A1":{index:1,add:" A camera or microphone first captures signals; software converts information into a representation the program can process. A model may match patterns, but an input or confident prediction alone does not reveal what it has learned or understood. A fixed rule can also respond intelligently without being a trained model."},
 "7-A1":{index:1,add:" Separate training examples from unseen test cases: repeating the same samples is not a fair evaluation. A classifier may learn an irrelevant shortcut such as lighting or background instead of the feature people intended. You can observe this with a transparent toy rule and a comparison set."},
 "8-A1":{index:1,add:" An AI model receives representations rather than the complete human experience of an image or speech. Colour, shape, text, audio and visual features emphasise different information; what is missing or hidden can make an answer unjustified. Compare representations of identical examples in the offline laboratory before describing what a system knows."},
 "9-A1":{index:1,add:" Performance claims also depend on the data representation, evaluation conditions and error consequences. Retrieval can supply source material to a generative model, but it does not itself prove the source is trustworthy or that every statement is grounded. Distinguish model behaviour from the decisions of the entire product."},
 "10-A1":{index:2,add:" Report the denominator, false positive and false negative errors, relevant subgroups and what the test could not establish. Compare a meaningful non-AI baseline and give a specific condition for stopping, monitoring or declining a pilot. An average score is not a substitute for stakeholder evidence."},
 "11-A1":{index:0,add:" Inspect where the system transforms text, audio or visual inputs into features and how retrieval, permissions and human decisions interact with model output. A model card and system diagram should communicate separate failure surfaces, rather than hiding them behind a single accuracy figure."},
 "12-A1":{index:0,add:" Future systems can mix modalities, external retrieval, planning-like model behaviour and tools that take actions. For each element, record what was independently demonstrated, what permissions it needs and how an operator can stop or reverse an unwanted action."},
 "7-B3":{index:1,add:" Copyright, licensing, attribution, likeness and voice consent are separate questions. An image or voice available publicly is not automatically free to remix or publish. Check the rules of an approved tool and the permissions granted by the creator and people represented."},
 "8-B3":{index:2,add:" Responsible design compares actual benefits with accessibility, language inclusion, privacy, energy and material resource use. Avoid invented environmental cost figures; identify where electricity, devices, infrastructure and human labour appear and seek independent, context-specific evidence."},
 "9-B3":{index:1,add:" Consider whose work supports the product, whose cultural content is reused, which groups bear errors and whether the service increases resource demand. These impacts need evidence and stakeholder perspectives rather than generic claims that all AI systems are either harmful or harmless."},
 "10-B3":{index:2,add:" A governance charter should specify measurable checks for rights, copyright and data permissions alongside accessible human appeal, incident reporting and environmental or operational trade-offs. Explain who can halt deployment and what evidence is required to restart."},
 "11-B3":{index:2,add:" Evaluate sustainability proportionately across the whole service, including computation, devices, labour, alternative non-AI processes and long-term maintenance. There is no justified universal carbon figure for 'an AI query'; substantiate any quantified comparison with a relevant source."},
 "12-B3":{index:2,add:" Accountable stewardship includes reporting meaningful operational and resource burdens, respecting rights of creators and affected communities, and updating governance after incidents. Public trust requires correction mechanisms that a person can actually access."}
};
for(const [id,patch] of Object.entries(PROGRESSION_CONTENT)){
 const knowledge=KNOWLEDGE[id];
 if(!knowledge||!Array.isArray(knowledge.core)||knowledge.core.length!==3)throw Error("Cannot deepen missing three-part lesson "+id);
 knowledge.core[patch.index]+=patch.add;
}
for(const [grade,level] of Object.entries(SCOPE_SEQUENCE)){
 for(const [strand,details] of Object.entries(level.strands)){
  const id=grade+"-"+strand,lesson=LESSON_BY_ID[id];
  if(!lesson)throw Error("Missing progression module "+id);
  lesson.progression={move:details[0],misconception:details[1],concept:level.concept,phase:level.stage};
 }
}
