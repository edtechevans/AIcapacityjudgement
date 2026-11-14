/* A transparent G8 representation lab: deterministic feature rules only.
 * This deliberately does not train or invoke a machine-learning model.
 */
LEARNING_LABS["8-A1"]={
 kind:"representation",title:"What did the system actually notice?",
 introduction:"Four fictional leaf photos have known health labels. Compare what a simple labeler concludes from colour alone, visible leaf texture, or texture partly hidden. Nothing is uploaded: these are written descriptions with deterministic rules.",
 question:"How does selecting or hiding a feature change the output, even when the actual case has not changed?",
 modes:[["colour","Colour only"],["texture","Texture visible"],["occluded","Texture partly hidden"]],
 explanation:"This is a rule-based classroom demonstration of how representations preserve or omit information, not a trained vision model or a medical/plant-health tool. 'Correct' is only relative to the four invented reference labels. Real images, multimodal systems and model perception involve much more complexity.",
 reflection:"Which cases looked healthy from colour alone but had misleading labels? When should a system say it has insufficient information rather than confidently guessing?"
};
const REPRESENTATION_CASES=[
 {name:"Green, smooth leaf",colour:"green",texture:"smooth",reference:"Healthy",covered:false},
 {name:"Yellow, spotted leaf",colour:"yellow",texture:"spotted",reference:"Stressed",covered:false},
 {name:"Green, spotted leaf",colour:"green",texture:"spotted",reference:"Stressed",covered:true},
 {name:"Yellow, smooth leaf",colour:"yellow",texture:"smooth",reference:"Healthy",covered:true}
];
function labRepresentation(mode){
 if(!["colour","texture","occluded"].includes(mode))throw Error("Invalid representation condition");
 let matches=0,unknown=0;
 const rows=REPRESENTATION_CASES.map(x=>{
  const available=mode!=="occluded"||!x.covered;
  const predicted=mode==="colour"?(x.colour==="green"?"Healthy":"Stressed"):available?(x.texture==="smooth"?"Healthy":"Stressed"):"Insufficient information";
  const correct=predicted===x.reference;
  if(correct)matches++;
  if(!available)unknown++;
  return {name:x.name,observed:mode==="colour"?x.colour:available?x.texture:"texture hidden",reference:x.reference,predicted,correct,unknown:!available};
 });
 return {rows,matches,unknown,total:rows.length,mode};
}
