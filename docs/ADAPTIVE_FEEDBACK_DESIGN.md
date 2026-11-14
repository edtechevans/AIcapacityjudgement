# Adaptive Feedback & Learner-Choice Pathways — v18

**Release:** 14 November 2026  
**Scope:** All 30 Capacity × Judgement modules, Grades 6–10.

## Learning design

This release introduces **teacher-authored, response-sensitive formative feedback** and **optional, lightweight adaptive learning choices**. It does not use an external AI model, analyze or store written explanations, predict learner ability, or award mastery.

### What students experience

1. **Work it out.** Students begin independently and can attempt the challenge without hints.
2. **Use a clue.** Students can reveal the module's authored support, the first success criterion and a noticing question, then revisit the worked model without losing their selections.
3. **Go further.** Students can voluntarily apply the concept to an authored stretch challenge and a transfer task in a different context.
4. **Learn from an error.** A wrong attempt makes support the suggested choice. The prompt explains what to rethink:
   - **Classification:** identifies the particular mismatched examples and shows each associated explanation.
   - **Sequencing:** identifies the first problematic position and prompts reasoning about dependencies.
   - **Decision, evidence, prompt:** presents feedback for the *selected alternative*, plus module-specific support.
5. **Keep ownership.** After a correct selected-response check, the suggested next step becomes stretch. Students can still choose independent practice or a hint. An attempt remains an informative signal, not a label or placement.

The same core objectives and opportunities remain accessible regardless of starting grade, quiz history or route preference.

## Assessment boundaries

- Selected options and classifications are machine-checked against teacher-authored activity keys.
- **Typed reasons are not semantically assessed.** A minimum-length check invites explanation but is not a quality judgement.
- The app records existing local progress checkpoints and a count of valid attempts. It **does not store typed reasons, feedback text, preferred routes or identified misconceptions** in progress records.
- Student-selected support and extension are not extra high-stakes tests.
- Completing a practice check **does not mark a module complete**; authentic application and subsequent reflection remain separate checkpoints.
- The app cannot verify external artefacts, peer feedback, achievement or transfer. Teacher judgement and a moderated learner pilot remain necessary.

## Verification included in source control

- `tests/quality.test.mjs` checks incorrect-answer recovery, support routing, model review, stretch and private free-text handling, including a deliberate mistake and recovery in **all 30 modules**.
- `tests/e2e/learner.spec.mjs` checks the experience in a real Chromium browser across configured viewports.
- The browser suite also includes Firefox and WebKit cross-engine smoke checks.
- Both Node and browser tests are configured in GitHub Actions. A successful local simulation is **not** proof of passing GitHub CI or a formal accessibility audit.

## What a second development phase would require

**Richer qualitative feedback:** Construct grade-level teacher-reviewed rubrics and evaluate correctness on sample student reasoning with permission and privacy protections. Do not present a language model's judgement as established mastery.

**More sophisticated adaptation:** Use small, transparent learning signals to offer differentiated examples and return routes. Validate recommendations against real learner work; avoid labelling students by snapshot results.

**School-ready evidence collection:** Requires an approved authenticated platform, server-side authorisation, retention and safeguarding controls, and a privacy impact assessment. The public preview is not a student gradebook.

## Student validation

Use `docs/STUDENT_PILOT_GUIDE.md` with two students per grade. Watch whether learners find the hint, whether wrong-response feedback improves the next attempt, whether extension encourages independent transfer and whether they understand that a passed quiz is not a verified competency. Record observations in school-approved systems, not in the public site.
