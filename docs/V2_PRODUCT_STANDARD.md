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


## V2.1 progression standard

V2.1 adds a stricter content-quality requirement: **Apply and Transfer must be module-specific, not merely strand-specific.** Across the 42 student modules, prompts should draw on the module scenario, progression move, misconception, principle and grade-level demand. Each grade should use at least three interaction families across its six modules.

Cognitive demand should visibly rise across the seven recommended grades:
- Grade 6 — notice and compare
- Grade 7 — test and verify
- Grade 8 — analyse and design
- Grade 9 — evaluate and challenge
- Grade 10 — transfer and defend
- Grade 11 — investigate and architect
- Grade 12 — stress-test and steward

A3 should consolidate the three Capacity strands. B3 should function as the grade's full **Capacity × Judgement integration challenge**. Feedback should coach rather than merely score, using the pattern **What you noticed → What matters → Try this elsewhere**.

Signature interactions may recur as recognisable learning routines—such as **Spot the weak evidence**, **Where did the thinking disappear?**, **Which step should the human keep?**, **Who carries the risk?**, and **What changed when AI entered the workflow?**—but the underlying scenario, evidence and decision must remain specific to the module and developmental stage.
