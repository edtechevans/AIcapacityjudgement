# Future-Readiness UI/UX Review — AI Capacity × Judgement
**Review date:** 14 November 2026  
**Scope:** Student-facing G6–10 static learning studio (source-level architecture, responsive UI, progression, accessibility, data resilience, and design consistency).

## Design position

A future-facing school learning environment should feel clear, optimistic and dependable—not like a technology demonstration. The experience should support human choices, authentic creation, and deep learning. The visual approach uses a restrained warm-paper foundation, dark navy, coral accents, complementary pastel pathways, and clear editorial typography.

The interface is designed to answer these questions within seconds:
1. Where am I in my learning?
2. What matters next?
3. What can I choose?
4. How do I know if I am making progress?
5. Can I stop and come back without losing the course sequence?

## Findings and implemented changes

| Priority | Finding | Implementation |
| --- | --- | --- |
| High | Returning students first saw a marketing-style hero, not their own next learning task | Redesigned Home as a learner workspace with a highlighted next/resume module, two pathway indicators, quick grade selection and a non-grade module completion ring |
| High | The single large CSS file had accumulated many overrides and an external Google Fonts import | Added a documented future-ready design layer in `ui/future.css`, with shared semantic variables, type scale, card system and mobile breakpoints; removed remote font dependency |
| High | After a browser refresh, learners lost their lesson position even if their passed checkpoints survived | Added minimal, versioned local learning checkpoints and stage-based resume. Written drafts continue to stay in memory only |
| High | Five large application response fields were intimidating, especially for younger students | Redesigned Apply as Choose → Plan → Create & Review; retains substantive planning, work sample and feedback/revision requirements |
| High | Students could not move their progress to another browser without a school account | Added explicit local JSON export/import, with schema validation, record sanitisation, overwrite confirmation and no written work or display alias in the backup |
| High | Future grade expansion would require modifying fixed routing patterns | Moved route validation to curriculum-defined grade keys and known lesson IDs |
| Medium | Reader comfort and density were inflexible | Added an accessible larger-text toggle and responsive reading styles, saved locally |
| Medium | Mobile navigation crowded small screens and 5-stage progress labels | Abbreviated compact header branding and added horizontally scrollable lesson stages on narrow screens |
| Medium | Source changes were not automatically checked for regressions | Added dependency-free Node tests and a GitHub Actions workflow covering content contracts, navigation, checkpoints and all 30 learning modules |
| Medium | Decorative visual effects could distract or reduce performance | Kept ambient gradients CSS-only, honoured reduced-motion and reduced-data preferences, and avoided external UI libraries |

## Architectural constraints and future extension

The current site remains a **static GitHub Pages application**. It is a strong exploration and formative learning resource, not a school-grade LMS.

The next major platform phase should introduce:
- An approved student identity provider and **server-side** authorisation, rather than treating a display alias as a login.
- Protected student records, secure teacher feedback, data retention policies and appropriate consent/guardianship safeguards.
- Curriculum content versioning, authoring workflows and moderation.
- A real assessment model that distinguishes checked practice, submitted work, peer or teacher feedback and demonstrated mastery.
- Browser automation and real-device accessibility tests to complement the existing non-browser CI checks.

Local progress data and exported backups **can be modified by users**; they are never a validated student grade or official evidence record. Text drafts are not persisted and should be copied into a school-approved tool if students want to retain them.

The two initial curricula remain distinct. Diagnostic results continue to serve as low-stakes formative suggestions rather than placements or psychometric scores.

## Visual and accessibility QA still needed

The implementation uses visible keyboard focus states, skip links, responsive layout, reduced motion, readable labels, semantically labelled progress, and local text-size controls. A formal **WCAG 2.2 AA** audit has not yet been performed.

Before broad student deployment, manually test at 320, 375, 768, 1024 and 1440 px; keyboard-only navigation; VoiceOver/NVDA; zoom up to 200%; high-contrast settings; text-to-speech; Safari, Chromium and mobile browser behaviour. Check that the student can recover from browser refresh and accurately understands what is and is not saved.

## Recommended live student validation

In a ten-student pilot (two from each of G6–10), observe the path from joining → choosing a course → learning a new concept → practising after feedback → creating an example → returning to an unfinished lesson. Ask students to explain an idea in a new context and identify where the interface made the learning easier or harder.

See [STUDENT_PILOT_GUIDE.md](STUDENT_PILOT_GUIDE.md) for the observation protocol and [CURRICULUM_ASSESSMENT.md](CURRICULUM_ASSESSMENT.md) for evidence expectations.

## Release verification

A dedicated GitHub Actions quality workflow runs on changes to site content and styles. It checks module completeness, teaching-before-testing, navigation and saved progression, and exercises the entire set of 30 learning modules. GitHub Pages deployment status is verified separately.

No external font, animation framework, third-party UI library or data API is required for core learning.
