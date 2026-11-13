# AI Capacity × Judgement — Learning Studio

An interactive, responsive Grades 6–10 learning experience with **two complementary curricula**: Capacity (understanding, working and creating with AI) and Judgement (agency, trust and ethics).

## Current version

- Grade selector for G6, G7, G8, G9, G10 (MYP 1–5).
- 30 structured lessons, six per grade, organized into two pathways and six strands.
- Lessons contain learning objectives, guided activity, applied scenario, a model response to compare and a learning evidence prompt.
- Learner dashboard, progress indicators and locally saved lesson completion.
- Optional reflection text saved only in the current browser.
- Responsive interface matching the original cream, navy, coral, blue, peach, sage and lilac quadrant visual style.
- Clear human-first approach and an AI Capacity × Judgement quadrant explanation.

## Preview / deployment

This site is plain HTML, CSS and JavaScript with no build requirement. Open `index.html` in a browser for a quick preview, or enable **Settings → Pages → Deploy from a branch → main / root** in the repository and visit:

`https://edtechevans.github.io/AIcapacityjudgement/`

Note: the URL only works once GitHub Pages has been enabled and the deployment has succeeded. This repository does not automatically configure GitHub Pages.

## IMPORTANT: Student login & safety

This is an early curriculum MVP, **not a production school LMS**.

- Preview mode allows a local display name (not an authenticated login). Completion and reflection drafts are saved in localStorage on that browser, so they do not sync across devices.
- Use a generic display name. Do not enter student personal data, assessment results or private information.
- Optional Entra ID sign-in hooks are provided in `auth-config.js`; school administrators must register a compliant SPA app, configure the client ID and allowed redirect URI, and approve access before this is activated.
- Even after Entra sign-in, this static website **does not have secure student records or cloud progress syncing**. A server-side API, identity verification, authorization/RBAC, persistence, data retention rules and privacy assessment must be added before real student deployment.
- Never use localStorage or a static public repository for sensitive student information.
- Course activities must use approved, age-appropriate tools, or teacher-supplied transcripts, and follow school safeguarding/privacy rules.

## Next build steps

1. Replace local preview with school SSO and a backend with student enrolments and secure progress storage.
2. Add teacher/admin course editor, versioned content and moderation workflow.
3. Add meaningful formative assessment and rubrics for six strands (A1–A3, B1–B3).
4. Map lessons to existing MYP units, ATL, TLF and school academic integrity expectations.
5. Accessibility audit, browser testing, classroom usability pilot, and policy approval.

## Curriculum licensing

© 2026 Tim Evans. CC BY-NC-SA 4.0. Where third-party source material is used, its original license continues to apply.
