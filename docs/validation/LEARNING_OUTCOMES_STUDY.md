# AISG Capacity × Judgement — Evaluation of Student Learning

**Version:** Study protocol v1, 14 November 2026  
**Purpose:** Determine whether Grades 6–10 students develop AI understanding, evidence-based reasoning, responsible judgement and independent transfer—not whether they can click through the course.  
**Status:** **Study instruments and analysis preparation only. No students have been assessed, no scores collected and no evidence of improvement is claimed.**

## 1. Two distinct phases

### A. Feasibility, usability and safeguarding pilot

Use **10 students: two from each Grade 6–10**, with school approval and varied language, accessibility and prior experience. Run a 45–60-minute observation session on an appropriate module, with longer follow-up for capstones. Measure confusion, usability barriers, emotional safety, tool suitability and whether the student can explain an unfamiliar transfer example.

**Do not use this small exploratory pilot as statistical evidence of improved learning outcomes.**

### B. Learning outcomes evaluation

Invite school leaders, division heads, teachers, learning support and the safeguarding/data-protection lead to review the plan. Obtain the school's necessary approval, caregiver consent/assent where required and a plan for secure retention/deletion. Collect only anonymised scores in **school-approved storage**; never place individual student data, assessment responses or identity maps in a public GitHub repository.

**Preferred design:** Within each grade, randomise consenting classes or students (where ethically and operationally permitted) to immediate Capacity × Judgement instruction versus a waitlist/comparison sequence. Both groups receive fair access to instruction, with the waitlist group receiving it after evaluation. If randomisation is infeasible, use a documented matched comparison group and adjust claims accordingly. Before launch, agree a sample size/power approach with a school assessment/research partner; do not assume 10 students or a nominal 80% success threshold can prove impact.

**Suggested schedule (school-approved):**
- **T0:** independent parallel-form baseline *before* intervention
- **Intervention:** a clearly recorded set of modules and classroom investigations, with educator implementation log
- **T1:** parallel-form post assessment within the same school period
- **T2:** unfamiliar delayed transfer task about 3–4 weeks later, where practical
- If a comparison group exists, assess at the same timepoints under comparable conditions.

Make test administration independent of module completion, keep time and aids consistent, and document any accommodations or deviations without exposing sensitive student details.

## 2. Outcome definition

A grade-appropriate **unseen performance task** is independently assessed on four dimensions using the same 0–3 rubric:

| Dimension | 0 — Not yet shown | 1 — Emerging | 2 — Applied | 3 — Transfer with critical insight |
| --- | --- | --- | --- | --- |
| **Mechanism** | No interpretable explanation | Names a familiar feature, sometimes inaccurately | Explains a relevant mechanism with a concrete example | Applies the mechanism to predict a new case and names what it cannot establish |
| **Evidence** | No test/source reasoning | Gives an unsupported claim or untested example | Specifies a fair test, evidence check or comparison, with observed limits | Proposes discriminating tests, alternative explanations and calibrated uncertainty |
| **Judgement** | No purposeful decision | Chooses mainly on convenience/appeal | Justifies use, limited use or non-use with context, alternatives, affected people | Defends trade-offs, considers excluded voices and would revise when evidence changes |
| **Creation & transfer** | No coherent task response | Repeats a worked strategy without new application | Designs an applicable response and a feedback/revision step | Transfers independently to a novel situation, includes user testing and revises a defensible design |

**Composite primary score: 0–12** (sum of four domains). This is an assessment for the study, not the website's completion status, and it is not a clinical or psychometric diagnosis.

The primary outcome is the **paired change in teacher-reviewed composite score between T0 and T1**; the more robust comparative estimate is the difference in change between intervention and comparison groups. Secondary outcomes are delayed transfer T2, domain-level change, and quality of independently produced artefacts.

## 3. Parallel forms and task equivalence

Use the original forms in [PARALLEL_ASSESSMENT_FORMS.md](PARALLEL_ASSESSMENT_FORMS.md). Each grade has form A and form B, matched on mechanism, evidence evaluation, AI-use/non-use judgement and application. Counterbalance:
- Half each group take **A at baseline and B at post**.
- Half take **B at baseline and A at post**.
- Use a separate unfamiliar T2 transfer scenario, not the post prompt repeated.
- Pilot readability, difficulty, cultural relevance and language scaffolds before interpreting group differences.

Do not expose the specific post prompts during teaching. Teachers should not train pupils to memorise assessment answers.

## 4. Rater calibration and bias controls

- At least two educators score anonymised, shuffled work samples **independently**, blind to grade group and assessment timepoint where practical; grade may be visible for age-appropriate judgement.
- Use a small bank of anonymised exemplar responses to establish level anchors; discuss substantial disagreements, record any adjudication rules before observing results.
- Report inter-rater agreement and the percentage of items differing by more than one score band. If agreement is poor, revise the rubric and rescore before interpreting learning outcomes.
- Record accommodations and assess the demonstrated reasoning rather than English fluency, typing speed or artistic polish. Accept speech, sketches, translated responses and other equivalent forms.
- Never treat locally recorded website completion or self-confirmed application as a teacher-assessed outcome.

## 5. Recording data safely

A **blank CSV template** is at [learning_study_scores_template.csv](learning_study_scores_template.csv), with fields:
- anonymous_id (random, generated/maintained only in approved school systems)
- grade (6–10)
- group (studio or comparison)
- timepoint (pre, post or delayed)
- form (A, B or T2)
- rater (non-identifying staff code)
- mechanism, evidence, judgement, transfer (integer 0–3)

A student may have two rows for the same timepoint if two raters independently score the same artefact; the analysis averages raters rather than duplicate-counting students. **Do not put any real rows or identity mappings in GitHub**.

Use the offline, standard-library-only script [../../scripts/analyse-learning-study.mjs](../../scripts/analyse-learning-study.mjs) on an approved school-managed computer. It prints **aggregate values only**, suppresses subgroup statistics for fewer than five matched learners and does not send data to the network. Example:

```sh
node scripts/analyse-learning-study.mjs /path/in/approved/school/storage/anonymous_scores.csv
```

Only publish aggregate reporting once school data governance and disclosure thresholds are approved; avoid quoting identifiable student work.

## 6. How claims must be worded

- **Current state:** "We have built and tested learning activities; improvement in student outcomes has not yet been demonstrated."
- **After a small uncontrolled pre/post:** "In this small class sample, assessed scores increased by X/12 on average; we cannot attribute the change to the website alone."
- **After credible comparison and adequate sample:** "Compared with the documented comparison condition, the evaluated cohort showed a difference of X points (with uncertainty interval Y–Z) on the unseen task; applicability is limited to these grades, activities and setting."
- **Without a real delayed assessment:** do not claim durable learning or transfer.
- **Without controls:** do not claim a causal effect or "the platform improved learning" solely on pre/post differences.

## 7. Decision criteria for improvement

Do not set an arbitrary universal "10/10" or require all learners to show the same amount of progress. Review individual access barriers privately, use safe aggregate domain scores, and revise:
1. lessons whose students can repeat examples but cannot explain the underlying mechanism;
2. labs where students observe a result but cannot identify why it changed;
3. assessments that reward confident answers over evidence and uncertainty;
4. learning that does not transfer to new subjects or authentic tasks;
5. activities inaccessible or culturally inappropriate for some participants.

## 8. Reporting checklist

- [ ] School approval, consent and privacy assessment recorded.
- [ ] Assessment forms piloted for grade-level readability and equivalence.
- [ ] Intervention and comparison or limitations documented.
- [ ] Baseline, post and delayed data collected in approved systems.
- [ ] Raters blinded and agreement reviewed.
- [ ] Missing/attrition rates reported.
- [ ] Effects and intervals calculated by grade and overall, respecting privacy thresholds.
- [ ] Interpretation includes confounding, selection bias and generalisability limitations.
- [ ] Revision cycle and re-test schedule approved.

**No learning study has been executed at the time of this document.**