# AI Capacity × Judgement — Learning Studio

A student-facing Grades 6–10 (MYP 1–5) formative e-learning website. Two connected curricula: **AI Capacity** (understanding, working with, and creating with AI) and **AI Judgement** (agency, truth, trust, ethics and consequences).

**Live website:** https://edtechevans.github.io/AIcapacityjudgement/

## v20 — Investigate, test, create and transfer (November 2026)

The curriculum has been rebuilt where comparative benchmarking revealed gaps, while preserving all **30 modules, six strands and five learning stages**. Every module now includes an original, evidence-oriented inquiry brief with an investigation method, authentic work sample and transfer question. Five modules gain interactive, offline laboratories: **G7 A1** (training data and shortcuts), **G8 B2** (algorithmic feeds and missing voices), **G9 A1** (performance evaluation and failure cases), **G9 B1** (AI companionship, privacy and boundaries) and **G10 A3** (design choices and accountability). The accompanying teaching explanations and formative questions have been rewritten to match what students observe.

In the five laboratories, students compare **at least two different conditions** before completing the guided practice check. Results are fictional and clearly identified as teaching models; no network AI model or student-data service is involved. Four capstone-style modules now include explicit project phases and evidence requirements. Lesson notes exports contain their investigation question, method and evidence expectations.

The aim is a materially stronger educational experience—not a claim of externally certified mastery or a proven 10/10 student outcome. See [Curriculum Rebuild v20](docs/CURRICULUM_REBUILD_V20.md), the [Teacher Labs Guide](docs/TEACHER_LABS_GUIDE.md) and [Curriculum Assessment Guide](docs/CURRICULUM_ASSESSMENT.md).

## v19 — Choose your grade, then learn within your grade (November 2026)

The landing page now asks **one question: which grade are you in?** Students select Grade 6–10 and immediately enter the six-module experience for that grade. There is no alias-entry step. The Home page, course library, progress view and learning links stay within the chosen grade, with no everyday grade-switching controls.

Public-preview users can explicitly return to the picker from **Profile → Change grade (preview only)**. Other-grade URLs redirect to the chosen grade. Progress backups export and import only the active grade and cannot silently change the selected grade; earlier local learning histories are preserved when users intentionally switch grades. Shared lesson links still work after choosing the matching grade.

**Security distinction:** This is an educational *preview*, not authenticated grade-based authorisation; all grade JavaScript remains publicly downloadable. The [SharePoint grade-access plan](docs/SHAREPOINT_GRADE_ACCESS.md) explains the future Entra ID sign-in, authoritative school grade mapping and server-side access enforcement needed before students can be restricted to their own assigned grade and have protected learning records.

## v18 — Responsive formative feedback and learner choice (November 2026)

Students can now choose among **Work it out**, **Use a clue**, and **Go further** during each of the 30 Grade 6–10 practice activities. The support path connects the lesson's authored hint, success criterion and worked example; stretch offers an optional, authentic deeper challenge and a transfer cue. Incorrect choices lead to item-specific corrective feedback, and an unsuccessful attempt suggests (but never forces) support. A successful selected-response check suggests extension.

This is **transparent, rule-based, teacher-authored coaching**, not AI grading or automated evaluation of student writing. Learners are never assigned fixed ability labels; free-text remains within the current browser tab and is not saved with progress. Completion continues to require application and reflection. See [Adaptive Feedback Design](docs/ADAPTIVE_FEEDBACK_DESIGN.md) and the [engineering release gates](docs/ENGINEERING_LEARNING_QUALITY_PLAN.md).

New Node regression checks exercise wrong-answer recovery in all 30 modules; a Playwright test validates the learner-choice UI. Cross-browser CI has been configured, but source-level implementation and simulated journeys do not replace verified CI runs, a formal accessibility review or classroom trials.

## Learning depth — expert-informed instructional upgrade (November 2026)

Every Grades 6–10 learning module now includes **clear success criteria, a worked-example noticing prompt, targeted optional support, a stretch challenge and a transfer task**. The 30 individually authored learning scaffolds are maintained in [`content/learning-scaffolds.js`](content/learning-scaffolds.js).

The learning sequence remains **Learn → Model → Practise → Apply → Reflect**. Importantly, **submitting an application no longer marks the module complete**: students must now reflect on changed understanding and a future use before recording completion. Writing, discussion and sketching are supported; free text remains private to the open browser tab and can be copied or downloaded. The system records completed *practice*, never verified mastery.

Previously completed modules in a strand can also cue a brief, optional recall exercise when students work on the next grade's version. Spoken/visual projects can be described with shorter notes, keeping rigour in the learning criteria rather than typing volume.

See the full [Learning Experience Review](docs/LEARNING_EXPERIENCE_REVIEW.md) for six specialist lenses, the pedagogical rationale and the student-validation plan. This is an **expert-informed audit**, not a claim that external specialists or students have endorsed the product.

## UX excellence — responsive and accessibility validation (November 2026)

The latest learner experience includes usability improvements and **real browser quality checks**:

- Shared lesson URLs retain the intended module through first-time grade selection and entry.
- Mobile navigation adapts at 320px and includes the comfortable-reading option.
- The Skip to main content control safely focuses the page without affecting lesson URLs.
- Students can copy or download **application notes** as a private text file. Editing notes marks them as unsaved, so browsers can warn before refresh or exit; free-text remains outside the stored progress record.
- Mobile lesson stages give swipe guidance, keep the current stage visible and avoid duplicating a disabled Next button on the first teaching screen.
- Accessibility fixes include legible footer text, visible-content-based accessible names for lesson cards, navigation and the learner journey panel.
- [Cross-device browser suite](tests/e2e/learner.spec.mjs): real Chromium tests at 320px, 375px, 768px and 1440px, with keyboard navigation, deep links, full authentic lesson, download, accessibility checks and visual screenshots.
- [UX Excellence Gates](docs/UX_EXCELLENCE_GATES.md): proposed measurable acceptance criteria and a ten-student pilot to validate an exceptional learning experience.

The resource remains a **formative prototype**, not an authenticated or teacher-assessed learning management system. Browser checks complement—but do not replace—manual accessibility review and student observation.

## November 2026 — Student journey and cross-page UX refinement (v14)

The latest release strengthens the full experience, not just the homepage:

- The entire **Your Journey** card is now a genuine accessible link to the correct first, unfinished or review lesson.
- The hero says **“Learn what AI can do, when it helps, and how to use it thoughtfully in real situations.”**
- **My Learning** shows Capacity and Judgement practice progress **even without** the optional six-question starting check-in.
- Course recommendations distinguish starting, resuming and reviewing, with content-derived counts.
- Lesson progress reflects **stages completed**, and focus moves to the next stage or feedback for clearer keyboard and screen-reader navigation.
- The **About** page explains the two pathways and learning sequence before presenting the quadrant as an optional conversation tool.
- Profile clearing now requires explicit confirmation; the backup import control and feedback messages have been refined.
- Responsive styling supports the new content and the two-step privacy confirmation.

See the [cross-page UX audit and validation notes](docs/UX_AUDIT_2026-11-14.md). The automated suite exercises all 30 learning modules and each main page, but the public static prototype still needs a live visual/accessibility audit and moderated student testing before claiming production-grade readiness.

## The Intersection — a refreshed identity (November 2026)

The Learning Studio now has a **complete, original visual identity**. Its symbol represents two distinct pathways—AI Capacity (aqua) and AI Judgement (coral)—meeting at a considered choice. The identity avoids generic AI imagery while remaining recognisable from a 16px favicon to a presentation-size social graphic.

- **[Live brand showcase](https://edtechevans.github.io/AIcapacityjudgement/brand.html):** logos, palette, app icons, sharing card and download links.
- **[Brand system guidelines](docs/BRAND_SYSTEM.md):** rationale, colour contrast, typography, logo usage, accessibility rules and maintenance steps.
- **[Design tokens](ui/identity.css):** the sitewide brand palette, applied after the base and responsive layout styles.
- **[Scalable source assets](assets/brand/):** primary mark, inverse mark, horizontal lockup, favicon and social preview (SVG).
- **[Automated raster exports](scripts/build_brand_assets.py):** 16/32px browser favicons, 180px Apple icon, 192/512px app icons, maskable icon and 1200×630 social card (PNG).
- **[Manifest](site.webmanifest):** home-screen branding and install metadata. Online access is still required; no offline mode is promised.
- **[Quality tests](tests/quality.test.mjs):** asset existence, expected PNG dimensions, metadata and contrast assertions alongside the 30-module learning checks.

The product name and learning philosophy remain unchanged. The new design is independent; it does not assert school or institutional endorsement.

## November 2026 — Future-ready learner experience

The interface has been reviewed and refined as a cohesive, scalable student workspace:

- **Learner dashboard:** Shows the last unfinished module, a separate Capacity and Judgement learning overview, and a clear path to the next meaningful activity.
- **New visual system:** A documented light-touch design layer, consistent navy/coral/pastel branding, responsive typography and layout, and no external font dependency.
- **Responsive lessons:** Accessible stage navigation, less cramped controls on narrow screens, and a larger-text option for reading.
- **Easier authentic application:** Choose a challenge → Plan → Create and review, while retaining full teaching, practice and application requirements.
- **Resilient progress:** Minimal learning checkpoints survive reload; JSON backups can be exported and imported between devices. Free-text drafts are **never** included in saved progress or backups.
- **Future grade expansion:** Navigation validates grade and lesson routes against existing curriculum content rather than fixed grade patterns.
- **Automated quality checks:** [Learning Studio quality workflow](.github/workflows/quality.yml) exercises the entire 30-module learner journey on future code changes.

The [Future-Readiness UI/UX Review](docs/FUTURE_READY_UI_REVIEW.md) contains the assessment, release decisions and remaining accessibility/production risks. The website is still a **public prototype**, not an authenticated school learning platform.

## November 2026 — Deeper, explanation-first learning

All **30 modules** across G6–10 now teach substantive content **before** assessment. Each module has:

1. **Learn:** Three sequential concept explanations, optional local read-aloud, key vocabulary and a short retrieval check with corrective feedback.
2. **Model:** A relevant situation and a comparison between a weaker approach and a more considered response, with an explanation of the reasoning.
3. **Practise:** An interactive classification, evidence, decision, prompt or sequencing activity, with feedback; selection-based tasks require students to explain their choices.
4. **Apply:** Two authentic contexts to choose from, a choice of written, visual or discussion format, and a guided five-part work record (purpose, AI-use decision, evidence plan, created/tested work sample, and feedback/revision).
5. **Reflect:** Summarise what was learned, what was tested and what to try in a new context.

The resulting learning experiences create space for **choice, original work, feedback from others, reflection, and transfer**. Students may use approved AI tools or teacher-provided examples; the platform does not connect to an external AI model.

Site completion is a **formative record of participation and self-confirmed application**, not evidence that a teacher has validated the quality of the student's work. Text drafts are not saved or uploaded. Previously completed v2 lessons are displayed as prior exploration, not automatically reclassified as completed under the deeper sequence.

A ready-to-use [ten-student pilot guide](docs/STUDENT_PILOT_GUIDE.md) explains how to observe learning, collect feedback appropriately and test transfer across Grades 6–10. The [Curriculum and Assessment Guide](docs/CURRICULUM_ASSESSMENT.md) describes separate progressions and authentic evidence for both curricula. No human student study is claimed as completed.

## UI/UX refinement (13 November 2026)

The student-facing experience has been reviewed and redesigned for faster access to learning and clearer navigation:

- New student entry is a **single Grade 6–10 choice**, directly opening that grade's course library. A local alias can be changed later in the learner profile; it is never required at entry.
- The course page uses compact **grade chips**, Capacity/Judgement filters, a featured next module and a less crowded library.
- The lesson player displays **five learning stages** and prevents advancing from the interactive practice step until its check is passed.
- Successful practice leads to a clearer next action, including an unfinished module or a review task when a grade is complete.
- URL routes support grade and pathway filters, **direct lesson links**, browser back/forward and reload.
- Accessibility refinements include focus treatment, clearer contrast and larger touch targets.
- Clearing the preview learner profile now also clears legacy local records.

The detailed source-level assessment and remaining validation criteria are in [UI/UX Review (13 November 2026)](docs/UI_UX_REVIEW_2026-11-13.md). This is not a formal accessibility certification or live classroom usability study.

## Phase 1 — Interactive learning engine

All **30 modules** have original interactive formative challenges, organized into six strands:

| Capacity | Judgement |
| --- | --- |
| A1 · Understanding AI | B1 · Purpose & Agency |
| A2 · Working with AI | B2 · Truth & Trust |
| A3 · Creating with AI | B3 · Ethics & Consequences |

Activities use five accessible interaction patterns:
- Classify examples using standard select controls and per-item explanations.
- Compare prompts using simulated examples (explicitly *not* live AI output).
- Sequence human-centred workflows using keyboard-accessible up/down buttons.
- Choose between contextual decisions and inspect feedback.
- Evaluate the strength and relevance of evidence.

The five-stage lesson sequence is described above. **Completion is not a mastery grade or teacher assessment.** Written responses are not AI-graded, cannot prove the quality of students’ work, and are **not saved or uploaded**.

## Phase 2 — Two-dimensional formative personalisation

- Each grade has an **optional six-item starting snapshot**: one item per strand.
- Results show *Capacity* and *Judgement* **separately**. There is no single AI literacy score.
- A lightly highlighted Capacity × Judgement quadrant is a **temporary illustration**, not a fixed label or validated psychometric result.
- The snapshot offers a starting suggestion from each pathway; existing lesson-practice evidence and completion inform what is recommended next.
- Students can review the reasoning behind all six items and retake the snapshot.
- Separate strand-level indicators show an encouraging first response, an opportunity to revisit, or a passed practice check.

A small set of quiz questions cannot establish proficiency. The results are only actionable **formative signals**; no automated academic placement or high-stakes decision should rely on them.

## For staff and curriculum designers

This is the first interactive curriculum pilot, not a formal MYP subject curriculum or school-assessed gradebook. Use with lesson planning, explicit teacher guidance, approved tools, meaningful subject connections and school academic-integrity expectations.

Some activities require external research or creation tasks. The online platform supplies the structured challenge and formative feedback but **does not yet** collect student artifacts, evaluate long-form work, or enable teacher marking. Those are possible follow-on developments.

The current scope is six introductory modules per grade. It should be expanded based on lesson observation and student learning evidence, not the number of modules alone.

## Deployment

A build step is not needed. GitHub Pages should be set to **main / root** in Settings → Pages. The repository contains:
- \`index.html\` — startup, scripts and accessible fallback
- \`styles.css\` — brand, responsive layout, focus, interactive controls
- \`curriculum.js\` — curriculum map and outcomes for G6–G10
- \`learning-data.js\` — **30 interactive activities and 30 diagnostic items**
- \`app.js\` — learner UI, challenge checking, recommendations, completion
- \`auth-config.js\` — reserved for future approved school SSO integration
- \`.nojekyll\` — static publishing marker

After changing the scripts, update the version query parameters in \`index.html\` to avoid stale browser caches.

## Student privacy and limitations

**This is a public, static preview — not a production school learning management system.**

- A student enters by **choosing a grade**. A local display alias is optional in Profile. There is currently **no genuine school login** or verified grade entitlement.
- Quiz choices, completion status and a display alias are saved in \`localStorage\` on the user's device, not in a central student record. Progress does not sync between devices.
- Free-text explanation is held in memory while the tab remains open. It is **not sent to a server or saved to localStorage**.
- All quiz items and answers are present in public JavaScript; **do not use the items for secure or high-stakes testing**.
- Avoid entering identifying, confidential, medical or other sensitive student information. Clear the local profile on shared devices.
- Activities do not send learner content to an AI service. Any optional real-world AI experimentation must use approved age-appropriate, school-sanctioned tools and follow relevant privacy, consent and academic-integrity rules.
- Before deploying to actual students, add school authentication, appropriate authorisation, secure server-side records, retention/deletion rules, safeguarding review and a complete privacy impact assessment.

Previous v1 browser progress is preserved as \`legacyDone\` and displayed as "Previously explored", **not** converted to the new evidence-based "Practised" status.

## QA and next steps

Engineering review should cover all five activity types, reflection gating, saved progress, diagnostic retake, keyboard navigation, mobile view, screen-reader focus and real-device testing.

Recommended next school-facing steps:
1. Pilot Grade 6 A1, Grade 8 A3 and Grade 10 B1 with students and teachers; record misconceptions and usability issues.
2. Tighten activity quality using authentic disciplinary evidence and user-testing results.
3. Develop richer rubrics, teacher feedback and subject-unit integration maps.
4. Add secure SSO and teacher views only after privacy and safeguarding review.
5. Conduct a formal WCAG 2.2 AA review before operational use.

## Attribution

Concept and curriculum: © 2026 Tim Evans. **CC BY-NC-SA 4.0** — https://creativecommons.org/licenses/by-nc-sa/4.0/. Third-party content keeps its own licence.
