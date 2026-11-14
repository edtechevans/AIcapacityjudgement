import test from "node:test";
import assert from "node:assert/strict";
import {analyse,parseCsv} from "../scripts/analyse-learning-study.mjs";

const fields=["anonymous_id","grade","group","timepoint","form","rater","mechanism","evidence","judgement","transfer"];
function makeRow(id,grade,group,timepoint,form,score,rater="T1"){
 return {anonymous_id:id,grade:String(grade),group,timepoint,form,rater,
  mechanism:String(score),evidence:String(score),judgement:String(score),transfer:String(score)};
}
function fictionalSample(n=8){
 const records=[];
 for(const group of ["studio","comparison"])for(let i=0;i<n;i++){
  const id=(group==="studio"?"S":"C")+String(i+100);
  records.push(makeRow(id,6+i%5,group,"pre","A",1));
  records.push(makeRow(id,6+i%5,group,"post","B",group==="studio"?2:1));
  records.push(makeRow(id,6+i%5,group,"delayed","T2",group==="studio"?2:1));
 }
 return records;
}
test("CSV parsing handles quoted fields and blank lines without corrupting numeric rubric scores",()=>{
 const header=fields.join(",");
 const body='P001,7,studio,pre,A,R1,1,2,3,0';
 const rows=parseCsv(header+"\r\n"+body+"\n\n");
 assert.equal(rows.length,1);
 assert.equal(rows[0].anonymous_id,"P001");
 assert.equal(rows[0].evidence,"2");
 const quoted=parseCsv(header+"\n"+body.replace("P001",'"P001"')+"\n");
 assert.equal(quoted[0].anonymous_id,"P001");
});
test("a deliberately synthetic illustrative studio change is calculated only as aggregates",()=>{
 const data=fictionalSample();
 const report=analyse(data);
 assert.equal(report.studio.n,8);
 assert.equal(report.comparison.n,8);
 assert.equal(report.studio.baselineMean,4);
 assert.equal(report.studio.postMean,8);
 assert.equal(report.studio.meanChange,4);
 assert.equal(report.comparison.meanChange,0);
 assert.equal(report.studioVsComparison.differenceInMeanChange,4);
 assert.ok(report.studioVsComparison.bootstrap95PctCI.every(Number.isFinite));
 assert.equal(report.delayed.delayedMinusPost,0);
 const json=JSON.stringify(report);
 assert.ok(!json.includes("S100")&&!json.includes("C100")&&!json.includes("T1"),"No IDs or assessor codes in public output");
 assert.match(report.studyStatus,/NOT PROOF/);
});
test("small grade-level groups are suppressed even when overall groups have enough matches",()=>{
 const report=analyse(fictionalSample(8));
 assert.equal(report.byGrade[6].studio.suppressed,true);
 assert.equal(report.byGrade[7].comparison.suppressed,true);
});
test("unpaired learners do not count as matched outcomes",()=>{
 const rows=fictionalSample(5);
 rows.splice(rows.findIndex(r=>r.anonymous_id==="S100"&&r.timepoint==="post"),1);
 const result=analyse(rows);
 assert.equal(result.studio.suppressed,true);
 assert.equal(result.dataQuality.missingPreOrPost,1);
});
test("two independent raters are averaged but a learner is counted once",()=>{
 const rows=fictionalSample(5);
 rows.push(makeRow("S100",6,"studio","pre","A",3,"T2"));
 const result=analyse(rows);
 assert.equal(result.dataQuality.doubleRatedSamples,1);
 assert.equal(result.studio.n,5);
 assert.ok(result.studio.baselineMean>4);
});
test("invalid grades, nonanonymous codes and bad scores are rejected without logging student IDs",()=>{
 const records=fictionalSample(5);
 records[0].mechanism="4";
 assert.throws(()=>analyse(records),/mechanism must be an integer/);
 records[0].mechanism="1";records[0].anonymous_id="A Person Name";
 assert.throws(()=>analyse(records),/nonidentifying alphanumeric/);
});
test("same form pre and post is flagged as a protocol issue, not silently ignored",()=>{
 const records=fictionalSample(5);
 for(const row of records)if(row.timepoint==="post")row.form="A";
 const summary=analyse(records);
 assert.equal(summary.dataQuality.pairedFormsRepeated,10);
});
test("an empty data template cannot generate improvement claims",()=>{
 const csv=fields.join(",")+"\n";
 const rows=parseCsv(csv);
 assert.equal(rows.length,0);
 const report=analyse(rows);
 assert.equal(report.studio.suppressed,true);
 assert.equal(report.studioVsComparison.suppressed,true);
});
