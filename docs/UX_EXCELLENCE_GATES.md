# UX Excellence: Release Gates and Student Validation
**Edition:** November 2026 — AI Capacity × Judgement Learning Studio

## What “10/10 UX” means here

A 10/10 is **not a self-awarded visual score**. The website should be demonstrably understandable, inclusive, reliable and effective for students from Grade 6 through Grade 10.

Use this scorecard as the evidence-based release standard.

| Dimension | Proposed release gate | How to verify |
| --- | --- | --- |
| **Immediate orientation** | At least 9 of 10 students can identify their grade, learning pathways and the next action without help | Moderated task observation |
| **Successful first lesson** | At least 9 of 10 students can enter the appropriate lesson and work through the teaching sequence without adult navigation prompts | Moderated Grade 6–10 pilot |
| **Authentic learning** | At least 8 of 10 students can explain one new concept and apply a reasoned AI-use **or non-use** decision to a fresh scenario | A short, independently explained transfer task |
| **Work preservation** | Every student can download or copy application work; refresh/exit warns if unsaved edits remain | Real-browser interaction tests and moderated pilot |
| **Mobile usability** | No horizontal overflow or obstructed primary controls at widths 320, 375, 768 and 1440 px | Browser automation and manual device inspection |
| **Keyboard navigation** | Grade selection, menus, skip link, lesson stages, challenges and profile work without a pointer | Real-browser keyboard checks |
| **Serious accessibility barriers** | Zero serious/critical automated axe findings on representative pages, plus manual assistive-technology checks | Axe, VoiceOver/NVDA and zoom checks |
| **Navigation predictability** | A shared lesson link survives first-time entry; browser Back, grade switching and course filtering behave as expected | Browser and regression tests |
| **Privacy clarity** | Students understand the alias is not a login, and that course progress is local, writing is not automatically saved and downloads are private | Student teach-back and copy review |
| **Reliability** | All 30 modules pass the learn/model/practise/apply/reflect regression journey | GitHub Actions node test suite |

## What was improved in this release

1. **Mobile-first navigation:** a compact short wordmark on narrow devices and reading-size controls inside the mobile menu.
2. **Keyboard skip link:** a route-safe focus action that does not replace the application's lesson URL hash.
3. **Deep-link onboarding:** students opening a shared module see its title and keep that destination through grade confirmation.
4. **Portable application work:** students can copy or download the full learning notes as a plain-text file, without cloud uploads or browser storage of drafts.
5. **Exit warning:** the browser can warn when written work is still unsaved; copying/downloading marks the current draft as exported.
6. **Automated browser testing:** Playwright checks key journeys, screen widths and accessibility in headless Chromium.

## Ten-student pilot

Recruit **two students per grade (G6, G7, G8, G9, G10)**. Include a range of prior familiarity, devices and reading preferences.

Ask each student to:
1. Open the site and explain what Capacity and Judgement mean in their own words.
2. Find and start the correct grade module without instructions.
3. Read a new idea, explain it, and complete the worked example and practice with feedback.
4. Apply the learning to a relevant subject challenge, choosing AI support or purposeful non-use.
5. Save a personal copy of their work without exposing private details.
6. Navigate away, return, and resume learning.
7. Describe what progress is measured and what it **does not** establish.

Collect observed success/failure, first-click destination, significant hesitation, confusion about account/privacy and one improvement requested. Compare Grade 6 and Grade 10 experiences rather than assuming one interface is equally suitable.

## Not yet equivalent to school production

This is a **local-progress static learning studio**, not a secure learning management system. It does not verify identity, collect written assignments on a server, authenticate school users, synchronise progress across devices or provide teacher-assessed mastery. School-wide adoption would need an identity, privacy, accessibility, content-governance and evidence-submission review.

A browser automation result is useful evidence, but is not a manual visual QA report and cannot replace a moderated student pilot.
