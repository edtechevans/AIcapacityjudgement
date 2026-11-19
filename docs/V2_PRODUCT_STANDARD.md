# AI Capacity × Judgement V2.0 — Product Standard

**Release direction:** 19 November 2026

V2.0 treats AI Capacity × Judgement as a learning product rather than a digital curriculum document. Every design decision should strengthen meaningful learning, intellectual engagement, instructional quality, accessibility, trustworthiness and evidence.

## Six demanding criteria

1. **Learning impact** — learners should use ideas in unfamiliar contexts, not only recognise wording they have just read.
2. **Intellectual engagement** — interactions require comparison, classification, sequencing, evaluation, trade-offs or defensible decisions rather than obvious recall.
3. **Instructional quality** — teaching precedes testing; distractors represent plausible misconceptions; feedback explains why a choice is stronger or weaker.
4. **Accessibility** — no lesson requires typing, handwriting, speech, audio, dragging or a mouse. Ordering uses keyboard-operable move controls. Selected-response tasks have visible labels and feedback.
5. **Trustworthiness** — claims about AI are appropriately qualified; privacy, fairness, evidence and human accountability remain visible; completion is not presented as validated mastery.
6. **Evidence** — the product records completion of knowledge, practice, application and transfer checkpoints while clearly distinguishing those checkpoints from teacher-assessed competence.

## V2 learning architecture

Every student module follows:

**Learn → Model → Practise → Apply → Transfer**

- **Learn:** three concise teaching ideas, vocabulary and a selected-response understanding check.
- **Model:** compare a weaker and stronger approach before revealing the worked response.
- **Practise:** existing interactive activities and laboratories using classification, prompt comparison, sequencing, evidence checks and decisions.
- **Apply:** a new-context structured challenge. Interaction type varies by strand: single-choice, multi-select, classification or ordering.
- **Transfer:** an unfamiliar scenario tests whether the underlying principle travels beyond the original example.

No stage requires a free-text response.

## Educator architecture

Two educator courses use the same principles but professional scenarios:

- **AI Literacy & Professional Judgement**
- **AI Pedagogy, Assessment & Learning Design**

Across twelve modules the checks include single-choice, multi-select, classification and ordering. No written reflection, upload or submission is required.

## Assessment language

The application must distinguish:
- **completed checkpoint** — the learner passed the selected-response interaction;
- **practised module** — the learner completed the five-stage sequence;
- **mastery / competence** — not claimed by this site without external, valid evidence.

## Accessibility release gate

Automated testing is necessary but insufficient. Before describing a release as WCAG 2.2 AA conformant, complete the manual evaluation record in `docs/validation/WCAG_22_AA_EVALUATION.md` using keyboard, screen reader, reflow/zoom, touch and text-spacing tests.

## SharePoint / security boundary

The public GitHub Pages deployment is a preview and cannot make educator content private. Educator-only access, authenticated progress and OU/role enforcement must be implemented in the protected SharePoint/Entra deployment. Do not infer security from a hidden tab or route.

## Non-negotiable V2 regression rules

- No lesson or educator course may introduce `<textarea>` or a required text input.
- New interaction patterns must remain keyboard operable without dragging.
- Incorrect choices must provide useful explanatory feedback and permit retry.
- Transfer must use a different situation from the teaching example.
- All 42 student modules and 12 educator modules must remain reachable.
- Progress data must store checkpoints, not written learner content.
