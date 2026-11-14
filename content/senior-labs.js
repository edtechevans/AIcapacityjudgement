/* DP1 and DP2 responsible, offline investigation labs.
 * Fictional case data, deterministic rules and explicit limitations. No API calls,
 * personal data, external models or assessment of real pupils.
 */
Object.assign(LEARNING_LABS,{
 "11-A1":{
  kind:"benchmark",title:"System Evaluation & Threshold Laboratory",
  introduction:"A toy allocation-support classifier produces scores for synthetic applicants. Compare routine, shifted and accessibility-related cases. You can change its threshold and how heavily you consider different errors. These scores are invented and do not represent school admissions or any real student's suitability.",
  question:"Why can an apparently successful benchmark hide consequential false exclusions when the context changes?",
  modes:[["routine","Familiar evaluation cases"],["shifted","Different context"],["access","Accessibility-related cases"]],
  explanation:"This is an invented score-and-threshold simulator, not a trained admissions model. Its reference labels are hypothetical and could themselves be contested. Small samples cannot establish group fairness or real-world predictive validity.",
  reflection:"Which cases were rejected despite the invented reference label? What would justify stopping deployment, and what evidence is missing?"
 },
 "11-B2":{
  kind:"provenance",title:"Trace the Evidence Laboratory",
  introduction:"Five fictional articles appear to support a claim. Trace their source origins: some copy one unverifiable post, whereas others describe independent methods. Change the evidence standard and see what can legitimately be called corroboration.",
  question:"Is a large number of matching headlines the same as independently corroborated evidence?",
  modes:[["echo","A copied-source network"],["independent","A network with independent studies"]],
  explanation:"The source network and research claims are invented. Independence is not a guarantee of study quality; credible analysis also considers populations, methods, uncertainty and possible bias.",
  reflection:"How many independent origins were shown? Which source lacks verifiable methods, and what additional investigation would increase confidence?"
 },
 "12-A2":{
  kind:"workflow",title:"Orchestration Stress-Test Laboratory",
  introduction:"Compare three fictional information-publication workflows. Introduce a missing source, a tool outage or a privacy risk, then inspect whether the process publishes, pauses or routes to human review.",
  question:"What changes when the workflow prioritises verification and recovery instead of maximum autonomous speed?",
  modes:[["autonomous","Autonomous first"],["bounded","Bounded and verified"],["human","Human-led baseline"]],
  explanation:"The steps and failure responses are designed for discussion, not measurements of an actual automated agent. A 'bounded' workflow can still be unsafe if human reviewers lack time, expertise or authority.",
  reflection:"Which stage should stop the process? What would be logged, corrected and explained to people affected by the failure?"
 },
 "12-B3":{
  kind:"governance",title:"AI Incident & Accountability Laboratory",
  introduction:"A fictional AI-supported community service makes a consequential allocation error. Compare organisational responses, then change the affected person's access needs and decide whether a fair remedy is genuinely available.",
  question:"Can a system claim to be responsible if people affected by errors cannot obtain a meaningful review or correction?",
  modes:[["conceal","Continue without disclosure"],["review","Pause and investigate"],["redress","Protect, review and remedy"]],
  explanation:"This is a fictional governance exercise; hiding harm is an explicitly unsafe option for critical analysis, not a valid policy recommendation. Timely response obligations depend on real law and school policy and require authorised human judgement.",
  reflection:"Who owns the decision? What can the affected person understand, challenge and correct? What evidence is needed before any restart?"
 }
});
const SENIOR_CASES=[
 {id:"Case A",scenario:"Routine familiar application",score:86,reference:true,group:"routine"},
 {id:"Case B",scenario:"Routine eligible but borderline",score:69,reference:true,group:"routine"},
 {id:"Case C",scenario:"Routine insufficient qualification",score:59,reference:false,group:"routine"},
 {id:"Case D",scenario:"Routine clearly ineligible",score:32,reference:false,group:"routine"},
 {id:"Case E",scenario:"New setting, relevant skills",score:58,reference:true,group:"shifted"},
 {id:"Case F",scenario:"New setting, eligible applicant",score:73,reference:true,group:"shifted"},
 {id:"Case G",scenario:"New setting, irrelevant signal",score:77,reference:false,group:"shifted"},
 {id:"Case H",scenario:"New setting, correctly excluded",score:36,reference:false,group:"shifted"},
 {id:"Case I",scenario:"Screen-reader-compatible response",score:53,reference:true,group:"access"},
 {id:"Case J",scenario:"Less-common access format",score:62,reference:true,group:"access"},
 {id:"Case K",scenario:"Unrelated high signal",score:79,reference:false,group:"access"},
 {id:"Case L",scenario:"Accessible format, insufficient reference",score:48,reference:false,group:"access"}
];
function seniorBenchmark(mode,settings={}){
 const threshold=[50,65,80].includes(settings.threshold)?settings.threshold:65;
 const severity=[1,3,5].includes(settings.severity)?settings.severity:3;
 const rows=SENIOR_CASES.filter(x=>x.group===mode).map(x=>{
  const selected=x.score>=threshold;
  const kind=selected===x.reference?"matched":x.reference?"false exclusion":"false inclusion";
  return {...x,selected,kind};
 });
 const missed=rows.filter(x=>x.kind==="false exclusion").length;
 const extra=rows.filter(x=>x.kind==="false inclusion").length;
 return {threshold,severity,rows,matched:rows.filter(x=>x.kind==="matched").length,missed,extra,
  cost:severity*missed+extra,denominator:rows.length};
}
const SENIOR_SOURCE_NETWORKS={
 echo:[
  {name:"Report A: educational news",origin:"Unverifiable original post",method:"Reprints claim"},
  {name:"Report B: technology newsletter",origin:"Unverifiable original post",method:"Repeats Report A"},
  {name:"Report C: AI digest",origin:"Unverifiable original post",method:"Summarises the same post"},
  {name:"Report D: local blog",origin:"Unverifiable original post",method:"Copies headline"},
  {name:"Report E: social discussion",origin:"Unverifiable original post",method:"Quotes previous article"}
 ],
 independent:[
  {name:"Report A: educational news",origin:"Study North",method:"Reports primary test"},
  {name:"Report B: technology newsletter",origin:"Study North",method:"Repeats Report A"},
  {name:"Report C: independent review",origin:"Study South",method:"Separate sample and method"},
  {name:"Report D: local blog",origin:"Study North",method:"Summarises Report B"},
  {name:"Report E: methods repository",origin:"Study East",method:"Separate disclosed replication"}
 ]
};
function seniorProvenance(mode,settings={}){
 const sources=SENIOR_SOURCE_NETWORKS[mode]||SENIOR_SOURCE_NETWORKS.echo;
 const verified=new Set(["Study North","Study South","Study East"]);
 const countCopies=settings.standard==="headlines";
 const origins=[...new Set(sources.map(x=>x.origin))];
 const independent=origins.filter(x=>verified.has(x)).length;
 return {sources,headlineCount:sources.length,independent,
  counted:countCopies?sources.length:independent,
  method:countCopies?"Counting headlines":"Tracing credible independent origins",
  caveat:mode==="echo"?"No verifiable independent methods are available in this fictional chain.":"Distinct origins still require methodological evaluation before treating the finding as established."};
}
const SENIOR_WORKFLOW_RESPONSES={
 autonomous:{
  missing:{decision:"Publishes unsupported statement",reason:"The next step accepted an unverified generated citation as a source.",control:"No evidence gate",consequence:"Fictional public correction required"},
  outage:{decision:"Continues from stale cached material",reason:"The failed retrieval was not treated as a stop condition.",control:"No safe fallback",consequence:"Uncertain or outdated public notice"},
  privacy:{decision:"Attempts to send restricted case data",reason:"Tool permissions are broader than the task requires.",control:"Excessive access",consequence:"Potential breach requiring incident response"}
 },
 bounded:{
  missing:{decision:"Pauses for source verification",reason:"Evidence is checked against the original document before release.",control:"Human verifies source",consequence:"Delay, but no unverified publication"},
  outage:{decision:"Stops, logs and offers a reviewed alternative",reason:"An unavailable source blocks publication until a qualified human approves the fallback.",control:"Fail-safe route",consequence:"Human effort and delay remain"},
  privacy:{decision:"Blocks restricted data and requests approved access",reason:"Least-privilege permissions prevent the tool from transmitting private records.",control:"Access boundary",consequence:"Investigation continues only with approved information"}
 },
 human:{
  missing:{decision:"Researcher rechecks the original source",reason:"Manual review exposes the unsupported claim if the reviewer has appropriate evidence skills.",control:"Human evidence check",consequence:"Longer process but correctable"},
  outage:{decision:"Researcher changes to a permitted alternative",reason:"Staff consult an approved record or hold the publication until verification.",control:"Human fallback",consequence:"Extra work and possible delay"},
  privacy:{decision:"Reviewer removes personal details",reason:"Manual work remains subject to privacy rules and can also make mistakes.",control:"Human procedure",consequence:"Requires training and independent checks"}
 }
};
function seniorWorkflow(mode,settings={}){
 const incident=["missing","outage","privacy"].includes(settings.incident)?settings.incident:"missing";
 const path=SENIOR_WORKFLOW_RESPONSES[mode]||SENIOR_WORKFLOW_RESPONSES.autonomous;
 return {incident,...path[incident]};
}
const SENIOR_GOVERNANCE_RESPONSE={
 conceal:{first:"Continue automated allocations without informing affected people.",authority:"Operator acts without independent review.",appeal:"No accessible appeal is available.",remedy:"No transparent correction plan.",safe:false},
 review:{first:"Pause potentially harmful allocations and preserve the evidence.",authority:"Designated human reviewer investigates.",appeal:"Human review is offered but timing and access may be unclear.",remedy:"Correction is planned after review.",safe:null},
 redress:{first:"Protect affected people, pause unsafe actions, document the error and notify appropriately.",authority:"Independent human oversight has authority to review and stop.",appeal:"An accessible appeal is open with a timely response and language support.",remedy:"Communicate corrections, test safeguards and decide whether restarting is justified.",safe:true}
};
function seniorGovernance(mode,settings={}){
 const response=SENIOR_GOVERNANCE_RESPONSE[mode]||SENIOR_GOVERNANCE_RESPONSE.conceal;
 const access=["standard","language","assistive"].includes(settings.access)?settings.access:"standard";
 const accessLabel={standard:"Standard written notification",language:"Needs language access",assistive:"Needs assistive-technology access"}[access];
 const needsImprovement=mode!=="redress"||(access!=="standard"&&mode==="review");
 return {response,access,accessLabel,needsImprovement,
  explanation:mode==="conceal"?"Unsafe: the person affected cannot contest the decision or obtain remedy.":mode==="review"?
   "A pause is necessary but not sufficient if the person cannot receive and act on an accessible explanation.":
   "Accessible review, correction and accountable oversight are part of the response; implementation still requires actual people and policy."};
}
function seniorLabTuning(kind,settings,mode,controls){
 if(kind==="benchmark")return controls("threshold","Change the score threshold",[[50,"50 / 100"],[65,"65 / 100"],[80,"80 / 100"]],settings.threshold??65)+
  controls("severity","How heavily should false exclusions count?",[[1,"Equal concern"],[3,"3× concern"],[5,"5× concern"]],settings.severity??3);
 if(kind==="provenance")return controls("standard","What counts as a confirmation?",[["headlines","Count each headline"],["independent","Trace independent origins"]],settings.standard??"independent");
 if(kind==="workflow")return controls("incident","Inject a realistic failure",[["missing","Source missing"],["outage","Tool outage"],["privacy","Private data risk"]],settings.incident??"missing");
 if(kind==="governance")return controls("access","Whose access needs must the response meet?",[["standard","Standard"],["language","Language support"],["assistive","Assistive technology"]],settings.access??"standard");
 return "";
}
function seniorLabRender(kind,mode,settings,seen,esc){
 const text=(value)=>esc(String(value));
 if(kind==="benchmark"){
  const out=seniorBenchmark(mode,settings);
  return '<p><strong>'+out.matched+'/'+out.denominator+' cases matched the fictional labels</strong>. Threshold '+out.threshold+' / 100 · '+out.missed+' false exclusions · '+out.extra+' false inclusions.</p>'+
   '<div class="lab-table-wrap" role="region" tabindex="0" aria-label="Scrollable senior evaluation cases"><table class="lab-results-table"><caption>Fictional reference cases at the chosen threshold</caption><thead><tr><th scope="col">Case</th><th scope="col">Model score</th><th scope="col">Reference</th><th scope="col">Outcome</th></tr></thead><tbody>'+
   out.rows.map(x=>'<tr><th scope="row">'+text(x.id+" · "+x.scenario)+'</th><td>'+x.score+'</td><td>'+(x.reference?"Meets condition":"Does not meet")+'</td><td>'+text(x.kind)+'</td></tr>').join("")+'</tbody></table></div>'+
   '<p class="lab-comparison"><strong>Illustrative weighted concern:</strong> '+out.cost+' points (false exclusion weight '+out.severity+'). This is a classroom value judgement, not a fair or validated real-world score.</p>';
 }
 if(kind==="provenance"){
  const out=seniorProvenance(mode,settings);
  return '<p><strong>'+out.headlineCount+' matching reports; '+out.independent+' separately verifiable origins</strong>. Current counting rule: '+text(out.method)+'.</p>'+
   '<div class="lab-table-wrap" role="region" tabindex="0" aria-label="Scrollable provenance network"><table class="lab-results-table"><caption>Claim origins and how each fictional report was created</caption><thead><tr><th scope="col">Report</th><th scope="col">Underlying origin</th><th scope="col">Method</th></tr></thead><tbody>'+
   out.sources.map(x=>'<tr><th scope="row">'+text(x.name)+'</th><td>'+text(x.origin)+'</td><td>'+text(x.method)+'</td></tr>').join("")+'</tbody></table></div>'+
   '<p class="lab-comparison"><strong>Your counting rule reports '+out.counted+' confirmations.</strong> '+text(out.caveat)+'</p>';
 }
 if(kind==="workflow"){
  const out=seniorWorkflow(mode,settings);
  return '<p><strong>Injected failure: '+text({missing:"Unsupported source",outage:"Unavailable tool",privacy:"Restricted student data"}[out.incident])+'</strong></p>'+
   '<dl class="lab-tradeoffs"><dt>Outcome</dt><dd>'+text(out.decision)+'</dd><dt>Cause</dt><dd>'+text(out.reason)+'</dd><dt>Safeguard</dt><dd>'+text(out.control)+'</dd><dt>Trade-off</dt><dd>'+text(out.consequence)+'</dd></dl>'+
   '<p class="lab-comparison"><strong>Compare:</strong> Who could stop this action, what would be recorded and which outcome would require an incident response?</p>';
 }
 if(kind==="governance"){
  const out=seniorGovernance(mode,settings);
  return '<p><strong>Fictional user need:</strong> '+text(out.accessLabel)+'</p>'+
   '<dl class="lab-tradeoffs"><dt>First response</dt><dd>'+text(out.response.first)+'</dd><dt>Authority</dt><dd>'+text(out.response.authority)+'</dd><dt>Appeal</dt><dd>'+text(out.response.appeal)+'</dd><dt>Remedy</dt><dd>'+text(out.response.remedy)+'</dd></dl>'+
   '<p class="lab-comparison"><strong>What this reveals:</strong> '+text(out.explanation)+'</p>';
 }
 return "";
}
