# Educator learning pathway — V4.1 accessible-language update (20 November 2026)

## Live pathway
**Website:** https://edtechevans.github.io/AIcapacityjudgement/#/educators

**Duration:** 4 hours total, eight 30-minute modules. Both pathways carry equal weight:
- **AI Capacity** — C1 Understand the Capacity; C2 Personalisation for All; C3 Creativity and Authenticity; C4 Collaborative Capacity.
- **AI Judgement** — J1 Agency and Intellectual Ownership; J2 Evidence Before Intervention (MTSS, Inclusion and Belonging); J3 Assessment, Feedback and Trust; J4 From Judgement to Taking Action.

This replaces the two earlier six-module educator pilots. The 42 student modules and their routes remain unchanged.

## Learning architecture
Each educator module presents five sequential stages — **Learn → Model → Practise → Apply → Transfer** — with three substantive teaching ideas, a weaker/stronger professional worked model, two structured practice tasks, an application task and a new-context transfer challenge. Seven interactive decisions per module, including a follow-up after new evidence, mean **56 checkpoints** in total.

Interactions include single-choice, select-more-than-one, classification and keyboard-operable ordering, with immediate explanatory feedback and retry. **No learner typing, writing, uploads, speech or drag-only action is required.** The 30-minute duration is a planning estimate, not a forced timer or measured completion time. The ten-teacher middle-school pilot will test actual duration.

Curriculum language and decisions draw on AISG's Transformative Learning Framework (Engagement for All; Being/Connecting/Doing; Personalisation, Agency, Authenticity, Creativity, Collaboration and Taking Action) and the official 38 learning engagement indicators. The TLF is used as a **lens rather than a checklist**. UDL and MTSS concepts appear where relevant, including universal quality instruction, responsive evidence and accountable tiered support decisions. Case scenarios are fictional and contain no private student information.

## Progress and assessment
The restructured course uses a new browser-local progress key (aicj-educator-progress-v41) to avoid crediting the old pilot's simpler checkpoints as completion of newly substantial modules. Progress is held only in the current browser; clearing browser data may delete it. No authenticated progress synchronisation, staff reporting or server-side storage is implemented.

A completed module means all six formative decisions across its five stages passed. It is **not a validated certificate of educator competence or psychometric evaluation of judgement**. Alternative defensible responses can be discussed professionally even when a task identifies the strongest response for its scenario.

## Security / SharePoint boundary
The site and repository remain public. The Educators navigation label does not enforce authentication or access permissions. Do not put identifiable student information or private staff records into scenarios or connected AI tools. Protected educator-only access and completion reporting require a separately implemented, school-approved SharePoint/Entra solution with authenticated per-resource controls.


## V4.1 improvements before the teacher pilot
- Rewrote the teaching explanations, scenarios, instructions and key terms in more accessible English for non-native English speakers. Each module now includes a plain-language, keyboard-accessible glossary for key terms, including UDL and MTSS.
- Replaced simplistic single-answer distractors with closer professional trade-offs. Across **33** single-choice checks, the strongest answer is balanced evenly across A, B and C (**11 each**). Eight classification activities now use six different answer patterns; multiple-selection tasks vary the number of correct options.
- Added a second **Apply** decision after new information arrives, so educators must reconsider a first choice. This adds one purposeful task per module without padding the course with passive reading.
- Replaced specialist Diploma Programme situations and unnecessary jargon with varied middle-school subject contexts, including Language & Literature, Science, Design, Mathematics, Humanities, and PE.
- Clarified progression: Capacity focuses on capability, access, creativity and teamwork; Judgement moves to student ownership, evidence-informed support, assessment and purposeful action.
- The pathway still targets **4 hours**, with **around 30 minutes per module**; actual timing and readability must be confirmed with educators, not inferred from word count. No completion statistics, ratings or learning gains from real teachers have been gathered.

## Validation
Quality regression checks and cross-browser Playwright tests are in the GitHub Actions workflows. Completion of CI does not establish validated learning outcomes or formal accessibility conformance; manual assistive-technology testing and educator pilots remain necessary. See tests/e2e/educators.spec.mjs, tests/quality.test.mjs and docs/EDUCATOR_REBUILD_TLF_MTSS_V3.md for design decisions and test coverage.
