# UI/UX Review — AI Capacity × Judgement Learning Studio
**Date:** 13 November 2026  
**Scope:** Student onboarding, grade and course navigation, lesson flow, formative feedback, responsive layout, keyboard experience, accessibility and privacy copy.  
**Method:** Source-level design and implementation review, automated interaction tests and inspection of available live-page text. This is **not** a formal WCAG audit or a moderated student usability study.

## Summary

The design system—cream, navy, muted coral and complementary quadrant colours—was a strong foundation. The highest-impact issues were not visual branding but **time-to-learning**, clutter before lessons, unclear progression and unreliable in-page navigation. The new release prioritises those problems without altering the Capacity × Judgement curriculum structure.

## Findings, severity and changes

| Priority | Finding | Implemented change |
|---|---|---|
| High | New students arrived at a generic landing page with Grade 6 preselected and no explicit grade selection at entry. | Onboarding starts with a clear Grade 6–10 picker, then a local display alias and direct entry to that grade's courses. |
| High | The course page placed controls, introductions and repeated recommendations before the main learning library. | Replaced the tall sidebar with compact grade chips and pathway filters; added one featured lesson beside the optional starting snapshot; brought the full module library up. |
| High | Browser back/forward and direct lesson URLs could lose navigation context. | Added URL-based routes for grade, pathway, lesson, snapshot and profile. Browser back/forward, reloading a lesson and shared deep links resolve to the appropriate view. |
| High | The lesson player allowed students to reach the transfer step before passing its practice check, then block completion later. | Progression to Apply is now gated until the interactive check is passed. A clear message explains the requirement. |
| High | A button said “Save progress and return” even though unsent written reflections are not saved. | Changed the action to “Return to courses” and explicitly indicates that unsent drafts are not persisted. |
| Medium | Lesson steps were difficult to scan on small screens. | Added a step number, named stage, numeric progress indicator, accessible progressbar, clearer navigation and more consistent feedback. |
| Medium | Learning completion had an abrupt end with no direct next learning opportunity. | Added a recommended next unfinished module, with a review pathway when the grade is finished. |
| Medium | Grade level and pathway navigation lacked persistent context. | Added active states, grade chips, pathway filter counts, appropriate labels and a mobile menu only for signed-in local previews. |
| Medium | Several text colours and metadata sizes were difficult to read. | Strengthened text contrast, increased critical labels, refined cards and increased target sizes for filters and grade controls. |
| Medium | An older local progress key could survive clearing a preview learner profile. | Clearing the local profile now removes current and legacy local records. |

## Changes to the user journey

**First visit:** Select grade → Optional nickname → Open grade courses → Recommended module or check-in → Interactive challenge → Reflection → Next module.

**Returning visit:** Home / My courses → Previously selected grade and locally saved module status → Continue or revisit. Each module retains a direct address, such as `#/lesson/8-B1`.

**Formative learning:** The practice check must pass before the learner advances to Apply. Recorded completion remains a **practice indicator**, not an automated mastery score. The starting snapshot remains optional and does not permanently label students.

## Brand / accessibility decisions

- Retained the navy, warm cream, muted red and pastel quadrant palette.
- Added clearer page hierarchy and compact content with more legible text and controls.
- Improved keyboard focus visibility, link and button labelling, progress semantics and step controls.
- Mobile course filters and grade selectors have larger touch targets; small screens show a two-column grade picker and a one-column course library.
- These improvements should be **validated with a formal WCAG 2.2 AA assessment and real-device testing**, not treated as proof of compliance.

## Regression test plan

- New learner selects G6–10, enters the selected course and changes grade.
- Filters show All / Capacity / Judgement with correct routes and lesson counts.
- Direct `#/lesson/<grade>-<strand>` links reopen on refresh; back/forward retains navigation.
- A lesson cannot advance from Practise to Apply before the interactive check passes.
- All 30 interactions can be completed, a reflection can be recorded, and finished modules indicate completion locally.
- Check-in results and grade-specific recommendations remain available.
- Profile clearing removes local and legacy records.
- Desktop and mobile visual QA is still required across real browsers.

## What remains outside this release

The site is still a **public static prototype**. There is no secure school login, no central progress sync, no teacher dashboard and no moderated assessment of students' writing. These require a school-approved identity provider, secure data storage, access rules, privacy review and safeguarding decisions before operational use with minors. The current feedback is formative and based on predetermined examples rather than live AI outputs.

## Recommended classroom usability validation

Observe **3–5 students each from Grades 6, 8 and 10** attempting to join, choose a course, complete a challenge, return to the library and find their next module. Note completion without adult support, points of hesitation, reading accessibility, interpretation of feedback and understanding of Capacity versus Judgement. Make further changes from actual usage evidence, not just aesthetic preference.
