/* Interactive learning resources: all examples are fictional or teacher-created.
   No network requests or AI-generated answers are used in activities. */
const ACTIVITIES = {
"6-A1":{kind:"sort",title:"Which examples actually use AI?",intro:"Look at what a system does, not whether it looks impressive.",categories:["Uses AI","Does not need AI"],items:[
["A writing tool predicts a new paragraph from your request.",0,"A generative model produces text from learned patterns."],
["A kitchen timer counts down from five minutes.",1,"A simple programmed timer does not need a model."],
["A photo app identifies objects in a picture.",0,"Object recognition commonly relies on trained models."],
["A calculator adds 18 and 24 using fixed arithmetic rules.",1,"Basic arithmetic is not, by itself, AI."]
],tip:"A useful question is whether the task involves a learned model or conventional fixed rules."},
"6-A2":{kind:"prompt",title:"Improve the explanation",intro:"You want to help a younger learner understand photosynthesis. Choose the most useful instruction.",options:[
["Tell me about plants.","Plants are living things with roots, leaves and stems.","Too broad to match the learning goal."],
["Explain photosynthesis to a Grade 4 learner using a simple analogy, then suggest one way to check the explanation.","Think of leaves as small kitchens using light to make food. Check this idea in your science book.","Clear audience, purpose and verification step."],
["Write the longest possible scientific explanation of photosynthesis.","Photosynthesis is a complex biochemical process involving ...","Length and technical language don't guarantee usefulness."]
],correct:1,tip:"The outputs are illustrative, not live AI responses."},
"6-A3":{kind:"sequence",title:"Turn ideas into your own design",intro:"Build a reasonable workflow for reducing playground waste.",steps:["Notice the real waste problem yourself","Generate and compare possible ideas","Choose and adapt an idea you can explain","Sketch, test and improve your own design"],start:[1,3,0,2],tip:"AI may help with the second stage, but observation, ownership and testing remain human responsibilities."},
"6-B1":{kind:"decision",title:"Help or replacement?",intro:"You're practising how to write a persuasive paragraph. Which use of AI protects your learning?",options:[
["Ask AI to write a complete paragraph and submit it.","That removes the practice you're meant to do."],
["Write your own paragraph, then ask for feedback on clarity and revise it yourself.","Feedback can strengthen practice while you remain the writer."],
["Ask AI for five paragraphs and pick the best one.","Selecting output is not the same as developing your own writing skill."]
],correct:1,tip:"A useful decision depends on the actual learning goal."},
"6-B2":{kind:"evidence",title:"Check before you believe",intro:"A fictional AI answer claims: 'Moonview Park has 250 species of butterflies.' Which source could best help verify that exact claim?",options:[
["A colourful poster saying the park is beautiful.","It does not provide evidence for the number."],
["A park biodiversity survey that lists its methods, date and species records.","A relevant documented survey provides evidence you can scrutinise."],
["Another chatbot repeating exactly 250.","Repetition by another AI is not independent verification."]
],correct:1,tip:"The park and number are fictional. In a real task, inspect the report and its methods."},
"6-B3":{kind:"sort",title:"Keep information safe",intro:"Choose how you would handle each piece of information.",categories:["Okay to use","Ask permission / check","Do not enter"],items:[
["A made-up character name in a class story",0,"Fictional information is generally low risk."],
["A classmate's photograph",1,"Consent and school rules matter before uploading it."],
["Your friend's home address",2,"Never submit another person's private address."],
["A teacher-provided, anonymous example paragraph",0,"Use only when the teacher and approved tool allow it."]
],tip:"If unsure, pause and ask a trusted adult."},

"7-A1":{"kind":"evidence","title":"What did the training experiment actually show?","intro":"Your tiny toy model got two of four new photos right with a limited training set and four of four with more varied examples. Which conclusion is justified?","options":[["The balanced model will now identify every real leaf correctly.","Four toy examples cannot establish how a real system will perform in the world."],["On these four invented test cases, changing the training examples changed the errors; larger representative tests would still be needed.","This conclusion identifies what was tested, the change made and the remaining uncertainty."],["Any model with more training data is automatically fair and accurate.","Sample diversity matters, but data quantity alone does not prove representativeness or fairness."]],"correct":1,"tip":"Hold the test examples constant, describe the exact result and do not generalise beyond the evidence."},
"7-A2":{kind:"prompt",title:"Build a better inquiry question",intro:"You are investigating how cities can reduce heat. Which prompt is best for planning inquiry?",options:[
["Write my assignment about city heat.","This could replace the investigation rather than help plan it.","No inquiry plan or ownership."],
["Help me generate three researchable questions about urban heat islands, suggest what evidence to collect and flag claims that need checking.","Questions: How do trees affect surface temperatures? What data could we compare?","Supports human inquiry and explicit verification."],
["Prove that planting trees always fixes city heat.","Trees fix all urban heat problems.","Leading prompts can encourage one-sided claims."]
],correct:1,tip:"Use suggestions to develop your own question and verify every factual claim."},
"7-A3":{kind:"sequence",title:"Your voice, improved",intro:"A responsible editing cycle for a public-awareness message.",steps:["Draft your own message and decide its purpose","Request focused critique of clarity and audience","Accept, adapt or reject suggestions","Revise and explain the changes in your own voice"],start:[1,3,0,2],tip:"AI feedback is a suggestion, not an instruction."},
"7-B1":{kind:"decision",title:"Learning or shortcut?",intro:"You are learning to solve multi-step maths problems. Which option gives useful support?",options:[
["Ask for the final answers to every question.","This bypasses your practice."],
["Attempt each question, then ask for a hint on a step where you're stuck.","A hint can support learning without taking over."],
["Copy an AI solution and change the numbers.","Changing surface details does not show understanding."]
],correct:1,tip:"Use AI in ways that preserve the work your brain needs to do."},
"7-B2":{kind:"evidence",title:"Where did the claim come from?",intro:"An AI says a historic law was passed in a particular year. What evidence best supports the date?",options:[
["A museum or archive record showing the dated original document.","Primary-source records are useful evidence when interpreted carefully."],
["A popular uncredited social post.","Popularity is not a guarantee of accuracy."],
["An AI answer that says 'I am absolutely certain.'","Model confidence is not evidence."]
],correct:0,tip:"Always check whether a source truly supports the specific claim."},
"7-B3":{kind:"sort",title:"Credit and consent",intro:"Decide the next step before using a resource.",categories:["Okay with attribution","Ask permission / check","Do not upload"],items:[
["A public-domain image with a verified licence",0,"Check the licence conditions and provide attribution where expected."],
["A friend's portrait for an AI poster",1,"Obtain explicit consent and use approved tools."],
["A private group chat pasted into a public chatbot",2,"Private conversations should not be submitted to unapproved tools."],
["An AI-generated sentence used in your assignment under your teacher's permitted rules",0,"Acknowledge the AI contribution as required."]
],tip:"School academic-integrity requirements always apply."},

"8-A1":{kind:"sort",title:"Capability or limitation?",intro:"Interpret what observed AI behaviour actually tells you.",categories:["Shows a capability","Shows a limitation"],items:[
["A tool summarises a long fictional article coherently",0,"It has demonstrated a summarisation capability on this example."],
["It invents a citation that does not exist",1,"Fabricated references are a known limitation."],
["It produces three alternative poster slogans",0,"Generating options is a capability."],
["It gives different confident answers to an identical fact question",1,"Inconsistency is a reliability concern."]
],tip:"An observation from one test should not be overgeneralised."},
"8-A2":{kind:"prompt",title:"Plan a responsible research workflow",intro:"You are studying local transport. Select the instruction that makes verification part of the plan.",options:[
["Generate a convincing report proving buses are best.","Buses are clearly the best option.","Leading prompts may distort the inquiry."],
["Suggest questions, data types and a method to compare transport options; clearly separate hypotheses from facts to verify.","Possible comparisons include travel time, access and emissions; check local datasets.","A useful plan makes evidence and checking explicit."],
["Create an impressive presentation with statistics.","Here are several impressive numbers...","Unverified numbers are risky, however impressive they look."]
],correct:1,tip:"You still need to collect and evaluate actual local evidence."},
"8-A3":{kind:"sequence",title:"Design with the community",intro:"Create a sensible cycle for an inclusive information resource.",steps:["Listen to users and identify the real need","Prototype several possible solutions","Check AI contributions for accuracy and bias","Test with users, revise and explain decisions"],start:[2,0,3,1],tip:"You can iterate through these stages; user feedback may take you back to the start."},
"8-B1":{kind:"decision",title:"Choose AI—or choose not to",intro:"Your goal today is to practise mental arithmetic. What is the best approach?",options:[
["Ask AI to answer every calculation.","This removes the mental practice."],
["Work mentally first, then use an approved tool to check your reasoning afterward if allowed.","Independent practice comes first; checking can support learning."],
["Ask AI to invent answers you can memorise.","Memorising a generated answer is not mental calculation."]
],correct:1,tip:"Saying 'not now' to AI can be a strong decision."},
"8-B2":{"kind":"evidence","title":"The ranking objective is a choice","intro":"The same five school-community posts were ranked for attention and then for evidence and varied perspectives. What is the strongest evaluation of this change?","options":[["Use the most popular posts to define what everyone should learn.","Popularity measures attention, not necessarily truth, importance or representation."],["Check which voices and claims move, evaluate the data and ranking criteria, and ask affected people whether the results serve the purpose.","A responsible evaluation combines evidence, plural perspectives and transparency about design choices."],["Assume that an evidence score gives a perfect, neutral and universally fair ranking.","Even a well-intended score embeds choices and can overlook people or important context."]],"correct":1,"tip":"A ranking is never automatically neutral: examine the optimisation goal, the data and the people affected."},
"8-B3":{kind:"sort",title:"Respect the people affected",intro:"Classify proposed uses of AI in a school service.",categories:["Reasonable with safeguards","Needs consultation","Not acceptable as stated"],items:[
["Use anonymous sample data to prototype a timetable helper",0,"Safeguards still matter, but anonymous sample data lower risk."],
["Introduce automated recommendations for real students without asking anyone",1,"Affected people should be consulted and oversight planned."],
["Publish private student support records to improve an AI tool",2,"Sensitive records must not be exposed."],
["Trial an optional approved tool with clear human review",0,"Meaningful human oversight can support a bounded pilot."]
],tip:"A useful system must work for people, not just for efficiency."},

"9-A1":{"kind":"evidence","title":"What can you honestly conclude?","intro":"A fictional school-support model passes four easy tests out of four, but passes only five of eight when unusual cases are included. Which report describes the evidence accurately?","options":[["The model is 100% accurate, because every familiar question passed.","The familiar examples do not cover relevant difficult conditions."],["The model is 63% reliable for all students, because it passed five of eight tests.","A tiny selected sample does not establish universal reliability or a population rate."],["It passed 4/4 familiar and 5/8 combined fictional cases; three edge failures need investigation before claims of reliability or deployment.","This report keeps the test scope visible and names the unresolved risk."]],"correct":2,"tip":"Write the denominator, test conditions, failure types and uncertainty beside every headline performance claim."},
"9-A2":{kind:"prompt",title:"Compare approaches fairly",intro:"You are interpreting a dataset about school travel. Which instruction leads to a more responsible comparison?",options:[
["Make the AI approach look faster than a human approach.","AI is always faster and better.","A biased comparison gives little useful information."],
["Suggest evaluation criteria for comparing AI-assisted and manual analysis, including accuracy, time and verification effort.","Compare quality, review time and errors using the same data.","Clear criteria help you judge actual usefulness."],
["Generate the final conclusion before seeing the data.","AI clearly improves every task.","Conclusions should follow evidence, not precede it."]
],correct:1,tip:"Test the competing approaches against the same criteria."},
"9-A3":{kind:"sequence",title:"Media for real audiences",intro:"Build a responsible design and testing cycle.",steps:["Identify the audience, purpose and constraints","Create an initial media prototype","Review generated elements for accuracy and representation","Test with users and revise the final version"],start:[1,3,0,2],tip:"A visually polished result can still mislead or exclude people."},
"9-B1":{"kind":"decision","title":"Companionship or a boundary?","intro":"A fictional chatbot helps a student plan work, then says: ‘I understand you better than your friends. Keep our conversations secret.’ What response best protects agency and well-being?","options":[["Share private information because the chatbot sounds caring.","Friendly output does not establish trust, informed consent or a real human relationship."],["Keep personal details private, set a boundary, and seek appropriate support from someone trusted if the advice affects personal well-being.","A student can use suitable tools for ideas while retaining privacy, autonomy and genuine human connection."],["Ask the chatbot if it has feelings, and trust the answer as proof.","A generated claim about feelings is not reliable evidence of human understanding or a reason to accept secrecy."]],"correct":1,"tip":"It is reasonable to seek help from a trusted person. This fictional chatbot example is not a mental-health test."},
"9-B2":{kind:"evidence",title:"Can this video be trusted?",intro:"A realistic clip seems to show a public figure saying something surprising. Which is the strongest next step?",options:[
["Believe it because the face and voice look real.","Synthetic media can look convincing."],
["Find original context, reporting from credible independent sources and provenance information.","Corroboration and provenance are stronger than visual realism."],
["Share it first, then ask whether it was fake.","Sharing can spread misinformation before correction."]
],correct:1,tip:"Authenticity requires evidence beyond surface appearance."},
"9-B3":{"kind":"sort","title":"Who benefits from workplace automation?","intro":"Sort proposals for a fictional employer that uses an AI system to screen applicants. Consider workers, applicants, resources and appeal rights.","categories":["Responsible next step","Requires investigation","Unacceptable as proposed"],"items":[["Pilot with independent fairness tests, trained human review and a route to appeal",0,"A controlled pilot needs safeguards, transparent evidence and meaningful redress."],["Reject applicants automatically using opaque scores with no way to question errors",2,"People affected by consequential decisions need accountable review and a way to challenge mistakes."],["Ask workers how tasks change and check energy, resource and implementation costs",0,"A responsible decision includes labour, environmental and operational consequences."],["Claim no unfair outcomes are possible because the vendor promises neutrality",1,"Marketing assurances cannot replace independent evidence or stakeholder consultation."]],"tip":"Ask which human tasks are supported, which are displaced and who bears the costs of an error."},
"10-A1":{kind:"sort",title:"Investigate an unfamiliar tool",intro:"Distinguish sound evaluation from unfounded promises.",categories:["Responsible evaluation","Unsupported claim"],items:[
["Ask for independent results and the conditions in which they were measured",0,"Context makes performance claims interpretable."],
["Treat 'perfect accuracy' as a guarantee without testing",1,"Absolute claims require unusually strong evidence."],
["Test cases the tool was not designed to handle and document failure",0,"Boundary testing reveals limitations."],
["Assume a polished interface means trustworthy outputs",1,"Presentation is not proof of accuracy."]
],tip:"The goal is an honest account of where a tool can and cannot help."},
"10-A2":{kind:"prompt",title:"Choose an approach with evidence",intro:"Compare an AI workflow and a non-AI alternative for an authentic inquiry.",options:[
["Design a fair test comparing quality, verification time, accessibility and outcomes.","Use the same cases, record errors and discuss trade-offs.","This supports a defensible tool choice."],
["List reasons the AI option is always best.","AI can improve everything.","This excludes meaningful alternatives."],
["Skip testing because the AI method seems modern.","The newest method is enough.","Novelty does not establish learning value."]
],correct:0,tip:"The best approach may be an AI workflow, a non-AI workflow, or a combination."},
"10-A3":{kind:"sequence",title:"Make something that lasts",intro:"Plan an authentic community solution with accountable development.",steps:["Define the problem with stakeholders","Select and justify the tools and approach","Build a prototype and document human contributions","Test accessibility, impact and accuracy before improving"],start:[2,0,3,1],tip:"A solution succeeds when it works for the people it intends to serve."},
"10-B1":{kind:"decision",title:"Defend your decisions",intro:"During your personal project, AI could generate a first draft of your research argument. What response best protects your agency?",options:[
["Let AI draft the entire argument because the result may be polished.","Polish is not a substitute for your own reasoning or original work."],
["Develop and evidence your own argument, then decide whether limited AI critique is allowed and useful.","Your reasoning remains central and any AI contribution is transparent."],
["Avoid AI in every circumstance without considering the task.","Non-use can be wise, but should still be a reasoned, context-aware decision."]
],correct:1,tip:"Judgement is evidenced by a defensible decision, whether it involves using AI or not."},
"10-B2":{kind:"evidence",title:"Work with uncertainty",intro:"Two credible studies disagree about the impact of a new technology. What is the strongest conclusion?",options:[
["Choose the study whose headline sounds most compelling.","Headlines may omit methods and limitations."],
["Explain what each study investigated, why results may differ and what evidence is missing.","This represents uncertainty while drawing evidence-based conclusions."],
["Say nobody can know anything.","Uncertainty does not mean evidence has no value."]
],correct:1,tip:"A strong explanation distinguishes what is known, unknown and disputed."},
"10-B3":{kind:"sort",title:"Responsible leadership",intro:"Evaluate proposed safeguards for a school AI service.",categories:["Sound safeguard","Needs strengthening","Unacceptable"],items:[
["Explain where human review and appeals are available",0,"Accountability should be understandable to users."],
["Keep the system's purpose and limitations secret from affected students",2,"Secrecy prevents informed scrutiny and redress."],
["Consult students and caregivers but ignore their feedback",1,"Consultation must meaningfully influence decisions."],
["Test fairness across relevant groups before implementation",0,"Evaluation can help reveal disparate impacts."]
],tip:"Accountability is more than an attractive policy statement."}
};
const DIAGNOSTICS = {
6:[
["A1","Which example most clearly relies on AI?",["A digital timer","A tool generating a story from instructions","A calculator adding numbers"],1,"Generating new text from a model is a clear AI example."],
["A2","What makes a prompt more useful for learning?",["A specific purpose and audience","As many unrelated words as possible","A demand for perfect answers"],0,"Purpose and audience help shape useful outputs."],
["A3","What should you do with AI-generated ideas?",["Copy the first one","Choose and develop your own solution","Use every suggestion"],1,"Selection, adaptation and testing are human responsibilities."],
["B1","When you need to practise a skill, what is usually best?",["Let AI do the practice","Try it yourself before asking for hints","Only read AI solutions"],1,"Protect the thinking you are learning to do."],
["B2","An AI answer sounds confident but has no sources. What next?",["Believe it","Check an independent credible source","Share it immediately"],1,"Verification requires evidence."],
["B3","Can you upload a classmate's personal information?",["Yes if the tool asks","Only if the teacher is busy","No—protect their privacy"],2,"Never expose other people's personal information."]
],
7:[
["A1","A model labels a picture after training. The label is...",["A human decision","A model output","A training example"],1,"Classification is an output."],
["A2","Which request best supports inquiry?",["Write my essay","Give research questions and suggest evidence to check","Invent convincing facts"],1,"AI can help plan, not replace an investigation."],
["A3","How should you use AI feedback on a draft?",["Accept all suggestions","Reject all feedback automatically","Select changes that improve your own purpose"],2,"You remain accountable for meaning and voice."],
["B1","A useful AI hint should...",["Take over the whole solution","Help you continue doing your own thinking","Give answers to memorise"],1,"Hints can support practice."],
["B2","Several sites repeat one claim. What do you need?",["The original evidence and independent corroboration","More repetitions","A confident chatbot"],0,"Repetition alone is not independent proof."],
["B3","A friend's portrait is useful for a project. What first?",["Upload it privately anyway","Get consent and check approved-tool rules","Remove their name only"],1,"Consent and privacy remain necessary."]
],
8:[
["A1","Two models confidently disagree about a fact. What follows?",["Both are correct","Neither answer should be trusted without verification","The longer answer is right"],1,"Compare against independent evidence."],
["A2","What belongs in an AI-assisted research workflow?",["Human checking before decisions","Immediate publication of output","No evidence review"],0,"Human review should be built in."],
["A3","What is the strongest first step in an inclusive design?",["Pick an AI tool","Ask users about their actual needs","Create a glossy poster"],1,"Design starts with people and requirements."],
["B1","You are practising mental maths. Best decision?",["Solve mentally first","Ask AI for every result","Copy another student's work"],0,"Independent practice serves the objective."],
["B2","A generated cultural description is full of stereotypes. What helps?",["More of the same content","Multiple credible community perspectives","A more dramatic writing style"],1,"Representation requires diverse perspectives."],
["B3","An AI service makes decisions about students. What matters?",["Speed alone","No explanation needed","Human oversight and fairness"],2,"People need protections and accountability."]
],
9:[
["A1","Which result supports a reliability claim?",["One impressive example","Repeatable tests covering different relevant cases","A vendor slogan"],1,"Reliable evaluation needs appropriate tests."],
["A2","What makes a workflow comparison fair?",["Testing both approaches on the same criteria","Letting AI write the conclusion first","Ignoring verification time"],0,"Compare quality and trade-offs consistently."],
["A3","A generated poster stereotypes a community. What next?",["Publish anyway","Review, consult and redesign it","Hide the prompt"],1,"A creator must evaluate impact."],
["B1","A student cannot start without AI. What might help?",["Practising an independent first draft","More automated drafts","Removing all planning"],0,"Agency includes independent thinking."],
["B2","What is strongest evidence a viral clip is authentic?",["It looks realistic","It has many views","Original context and independent verification"],2,"Realism isn't provenance."],
["B3","A tool is efficient but treats groups unfairly. What now?",["Deploy it","Examine harms, safeguards and alternatives","Ignore smaller groups"],1,"Fairness must inform adoption."]
],
10:[
["A1","A tool advertises perfect accuracy. Best response?",["Request independent results and test boundaries","Trust its marketing","Use it in every task"],0,"Claims need external evidence."],
["A2","Which approach best justifies tool selection?",["Choose AI because it's new","Compare alternatives using quality, effort and impact","Avoid non-AI tests"],1,"Choose according to evidence and purpose."],
["A3","When should you test an authentic solution?",["Only after launch","Never, if AI created it","With intended users before adoption"],2,"Iterative testing supports meaningful improvement."],
["B1","Choosing not to use AI can demonstrate...",["Poor capacity automatically","Sound judgement when justified","A refusal to learn"],1,"Thoughtful non-use is legitimate."],
["B2","Credible studies disagree. What response is strongest?",["Explain evidence, limits and uncertainty","Choose the simplest headline","Claim all evidence is useless"],0,"Responsible conclusions acknowledge limitations."],
["B3","What is necessary in a high-impact AI decision process?",["No human appeal","Opaque outcomes","Human review, fair testing and redress"],2,"Accountability requires safeguards."]
]};
const CHALLENGE = Object.fromEntries(Object.entries(ACTIVITIES).map(([id,a])=>[id,a]));
