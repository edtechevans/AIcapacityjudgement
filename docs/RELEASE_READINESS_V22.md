# Capacity × Judgement v22 — Release Readiness and Human Validation

**Date:** 14 November 2026  
**Scope:** Grades 6–10, 30 modules, six original offline laboratories.  
**Status:** Implementation committed. Scripted lesson-journey checks passed. Human study, formal accessibility review and independent GitHub Actions results remain unverified. This is not an endorsement by external AI education experts.

## Changes delivered

1. **Instructional alignment:** All 30 worked examples rewritten to address the central scenario and its intended evidence.
2. **Exploratory practice:** Six laboratories, including a Grade 6 fixed-rule-versus-AI investigation. Later grades can change training examples, feature weights, ranking goals, evaluation consequences and design constraints.
3. **Assessment evidence:** 30 unseen transfer tasks and a four-dimension teacher rubric distinguishing mechanism, evidence, judgement and creation/transfer. Written responses are not automatically assessed.
4. **Inclusion:** Accessible labelled buttons, minimum-size targets, captions, in-tab observations, offline equivalents, visual examples and new automated accessibility gates. Manual WCAG 2.2 AA testing remains essential.
5. **Classroom practicality:** Per-grade time ranges, multi-session capstones, preparation notes and teacher-facing evaluation guidance.
6. **Learner validation:** A school-run, anonymised pilot protocol with ten students and five staff reviewers, acceptance thresholds and a deliberate iteration cycle.

The lesson header now reports **journey stages**, not a percentage of learning achieved.

## Manual accessibility and usability review checklist

- [ ] Grade-selection controls, stage navigation, lab controls, teacher guides and reflections work with keyboard and VoiceOver/NVDA.
- [ ] Validate on school-managed Windows/Edge, Mac/Safari, iPad/VoiceOver and narrow Android or iPhone screens.
- [ ] Verify 200% browser zoom, larger text, high contrast, reduced motion and no global horizontal scrolling.
- [ ] Ensure result tables have meaningful accessible headings and are understood without reliance on colour.
- [ ] Confirm the fictional Grade 9 chatbot case uses third-person scenarios, does not request personal disclosures and offers appropriate human-support boundaries.
- [ ] Verify lab interactions function without internet access or an approved external generative AI account.
- [ ] Confirm local progress never contains student-authored free text, private notes or personal chatbot content.
- [ ] Confirm lesson completion and lab results are not presented as independently assessed proficiency.
- [ ] Confirm SharePoint future grade restrictions remain explicitly unimplemented until server-side school authorisation exists.

## Student and teacher pilot

Invite **two students from each Grade 6–10 (10 total)** and **at least one teacher per grade**. Include learners with diverse language, confidence and accessibility needs. Use school-approved consent, safeguarding and recording procedures. Do not gather personally identifying data in the public website.

**Learner tasks:** Independently select their grade, start one module, predict an experimental outcome, change two conditions, describe the observed mechanism and limitations, make a justified AI-use or non-use decision, attempt an unfamiliar transfer task, produce an authentic work sample and explain a revision.

**Teacher review:** Independently rate a pair of anonymised work samples per grade against mechanism, evidence, judgement and creation/transfer. Moderate disagreements and revise the rubric. Record actual duration, preparation time and any inclusion barriers.

**Suggested thresholds (future release gates, not measured outcomes):**
- Nine of ten learners find their grade and enter a lesson independently.
- Eight of ten can explain a lab outcome with reference to a changed condition and a limitation.
- Eight of ten justify an AI-use/non-use choice in a new context and show an evidence-linked revision.
- No serious or critical accessibility barriers or privacy disclosures.
- Teachers can facilitate the investigation with or without a live AI tool.

A ten-student pilot is formative design feedback, not a statistically representative impact evaluation.

## Automated checks

The repository contains Node content contracts, 30-module learning journeys, six-lab progression tests and Playwright regression tests for Chromium, Firefox and WebKit smoke coverage. The additional accessibility suite uses axe-core, keyboard navigation and 200% font size. **Tests being committed does not mean a CI run is green.** Review current GitHub Actions failures and visual artefacts before claiming release readiness.

## School deployment boundary

The static GitHub demo retains all content publicly accessible. The future SharePoint site must use approved Microsoft Entra authentication, authoritative grade mapping, server-verified grade permissions, appropriate privacy controls and teacher/student role boundaries. The preview's grade selector is not security. See SHAREPOINT_GRADE_ACCESS.md.
