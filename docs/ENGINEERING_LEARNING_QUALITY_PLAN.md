# Engineering and learning quality plan — November 2026

## Phase 1 learning-engine implementation (v18, 14 November 2026)

Implemented across all 30 modules: student-selected independent, supported and extension routes; error-specific feedback for classifications, sequences and selected alternatives; targeted hints and worked-model revisitation; adaptive *suggestions* after incorrect attempts and correct responses; and a strengthened distinction between checked answers and unassessed written reasoning.

Implementation is purely client-side using existing teacher-authored learning scaffolds. No learner text, feedback or route choice is stored or transmitted. There is no model-based scoring, fixed learner classification or authenticated student tracking. See [Adaptive Feedback Design](ADAPTIVE_FEEDBACK_DESIGN.md).

Added repeatable unit and browser regressions, including deliberately incorrect answers and successful retries across the 30-module matrix. Completion of a technical simulation is not a verified CI pass or evidence of student learning. The remaining roadmap below covers genuinely richer rubric feedback and school-approved architecture.

## What changed in this development pass

- Added `tests/engineering.test.mjs`: curriculum integrity, 30 unique lesson identifiers, required instructional scaffolds, valid interaction data, explanatory answer feedback, and static-preview privacy guardrails.
- Wired the new suite into `.github/workflows/quality.yml` alongside existing end-to-end curriculum regression tests.
- Added `tests/e2e/cross-browser.spec.mjs`: smoke tests for orientation, navigation, direct lesson links, reload, horizontal overflow and the absence of third-party requests.
- Extended browser automation to Chromium, Firefox and WebKit. Existing Chromium screen sizes and detailed lesson tests remain in place.

## Release gates

1. **All automated tests green:** Both Node suites and every Playwright project must pass on the release SHA. Inspect failure traces instead of treating a retry as a clean pass.
2. **No critical usability barriers:** Test on actual iPad, iPhone/Android and school-managed laptops, including 200% zoom and keyboard-only use.
3. **Independent accessibility verification:** WCAG 2.2 AA manual review with VoiceOver and NVDA, including cognitive load and language demands, beyond automated axe checks.
4. **Content and learning integrity:** A G6–10 teacher checks authenticity, accuracy, reading demand, scaffolding, and meaningful AI/non-AI decisions in a sample from each strand.
5. **Learner-evidence validation:** Observe at least ten students, two from each grade, using the existing pilot guide; assess unseen transfer tasks rather than relying on completion.
6. **Security and privacy:** Review any new persistence, analytics, APIs or identity service before deploying. No identifiable learner information should be stored in the public preview.
7. **Performance:** Run Lighthouse/Core Web Vitals on representative school-managed hardware, compare mobile and desktop baselines, and resolve significant regressions.
8. **Maintainability:** Validate that a new module can be authored through the documented content contracts, with its own questions, scaffolds and feedback, without touching core routing.

## Architecture decisions before further development

The current site intentionally operates as a GitHub Pages static application with local-only progress. This is suitable for exploration but cannot reliably validate identity, verify written responses, grade learning or securely receive student submissions.

### Feedback engine (future)
- Start with **teacher-authored, rubric-linked hints** and ask students to revise their reasoning after reading feedback.
- Pilot richer response-sensitive feedback in a separate environment using only synthetic examples.
- Have educators rate feedback for correctness, helpfulness, harmful suggestions and grade appropriateness.
- Do not label automated language feedback as teacher assessment or certified mastery.
- Any external AI model requires privacy, age-appropriateness, school approval and safeguards.

### Adaptive learning (future)
- Base recommendations on specific demonstrated misconceptions and successful activities, not a permanent student label.
- Offer support and challenge as **choices**, not locked tracks.
- Record no additional personal data in the public preview.
- Test that every recommended branch has a meaningful route back to the common learning goal.

### Curriculum authoring (future)
- Prefer a content schema with validation of module metadata, teaching sequence, accessible examples, feedback, success criteria, and age-appropriate transfer.
- Add peer review and editorial approval before publication.
- Version both curriculum content and any saved progress schema so older checkpoints remain interpretable.

### Teacher evidence, school accounts and student work (future)
- Requires an approved identity provider, server-side authorisation, secure storage, retention/deletion policies, consent and safeguarding review, access auditing and threat modelling.
- The public preview must not be retrofitted into a production-grade gradebook simply by exposing local progress in a teacher dashboard.

## Practical human review roles

- **Principal software engineer:** maintainability, architecture, deployment, and expansion testing.
- **Learning engineer / cognitive-science-informed designer:** adaptive scaffolds, misconceptions, transfer and feedback.
- **Accessibility specialist:** WCAG 2.2 AA plus practical assistive-technology review.
- **Senior QA engineer:** exploratory, adversarial, cross-browser and resilience testing.
- **School assessment specialist:** validity of evidence, rubrics and the distinction between participation and demonstrated understanding.
- **Security/privacy lead:** school-approved data architecture and a privacy impact assessment.

These roles are proposed review perspectives, **not** a claim that external consultants reviewed the product.

## Known limits of verification

Automated tests establish certain technical behaviours, not learner outcomes. GitHub Actions execution status must be inspected separately after commits. A code review cannot substitute for student feedback, formal accessibility certification, a penetration test or approval of an authenticated student-data service.
