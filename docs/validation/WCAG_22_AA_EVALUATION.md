# WCAG 2.2 Level AA Conformance Evaluation — Evaluation Record

**Product:** Capacity × Judgement Learning Studio (public GitHub Pages preview)  
**Conformance target:** WCAG 2.2, Level A and AA  
**Evaluation methodology:** W3C WAI WCAG-EM 2.0  
**Report status:** **NOT ASSESSED / NOT CERTIFIED**  
**Evaluation date:** To be completed by the evaluator  
**Version / commit / URL:** Record tested commit SHA, deployment URL and site build  
**Evaluator / organisation:** Unassigned  
**Browsers and assistive technologies:** Unverified  
**Conformance statement:** **None may be issued until all applicable success criteria and complete user processes have been assessed and issues resolved.**

Reference: https://www.w3.org/TR/WCAG22/  
Methodology: https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/  
WCAG-EM report generator: https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/

## Evaluation scope and complete processes

Public site: https://edtechevans.github.io/AIcapacityjudgement/

Scope includes all Grades 6–10, Grade selection, Home, Courses, lessons in all five stages, diagnostics, interactive six laboratories, Apply projects, reflection, learning snapshot, profile, exports/imports, navigation, notifications, error/empty states and teacher resources. The future SharePoint authenticated environment is **out of scope** and requires a new audit (including Accessible Authentication, student-grade permissions and role-based views).

For structured coverage sample:
1. Welcome → Grade 6 Home → Courses → Grade 6 A1 complete lesson and visual lab.
2. Grade 7 A1 model training; change examples and feature weights and review results table.
3. Grade 8 B2 algorithmic ranking; change objective and weighting; interpret source variety.
4. Grade 9 A1 evidence and edge-case testing; Grade 9 B1 chatbot boundary scenario.
5. Grade 10 A3 independent capstone, project creation steps, supported expression formats and unseen transfer.
6. All shared flows: diagnostics, wrong answers, help/stretch, export, import failure, progress reset confirmation, keyboard skip, mobile navigation, read-aloud and local-only privacy note.

The evaluator must inspect representative page types **and complete processes** rather than only the first screen or a single static hash route. Record technologies used and anything that is not accessibility-supported.

## Required environments

- Keyboard alone (no pointer), desktop Chrome and Firefox on Windows
- NVDA (Windows/Chrome or Firefox) plus Safari/VoiceOver on macOS
- VoiceOver on iOS/iPadOS with touch and an Android TalkBack pathway when available
- 200% and 400% browser zoom, 320 CSS-pixel reflow at expected 400% zoom and increased text spacing
- Reduced motion, high contrast, keyboard focus with sticky navigation
- English locale and any supplied language alternatives; audio/read-aloud settings
- No live AI service to confirm equivalent offline paths

## Evidence convention

For each criterion record **Pass / Fail / Not Applicable / Not Tested**, the affected routes, observed behaviour, assistive technology/browser, screenshot or trace, the defect ID and verification date. "Automated axe clean" does **not** imply Pass for a criterion requiring human evaluation.

| WCAG 2.2 criterion | Level | Main manual audit evidence | Result |
| --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Image alt text, logo, instructional images, icon-only controls | Not tested |
| 1.2.1–1.2.3 Audio/Video alternatives | A | Applicable if recordings/video are added; inspect read-aloud | Not tested |
| 1.2.4–1.2.5 Captions/Audio description | AA | Applicable to any synced media | Not tested |
| 1.3.1 Info and Relationships | A | Semantic headers, labels, table/caption structure, error/status relationships | Not tested |
| 1.3.2 Meaningful Sequence | A | DOM and screen-reader reading order, responsive reflow | Not tested |
| 1.3.3 Sensory Characteristics | A | Instructions do not rely only on position/colour/shape | Not tested |
| 1.3.4 Orientation | AA | Portrait/landscape available without forced orientation | Not tested |
| 1.3.5 Identify Input Purpose | AA | Any applicable personal-info inputs support programmatic purpose | Not tested |
| 1.4.1 Use of Color | A | Correct/wrong, strands and ranking outcomes work without colour | Not tested |
| 1.4.2 Audio Control | A | Device read-aloud can be stopped/controlled if automatically playing | Not tested |
| 1.4.3 Contrast (Minimum) | AA | 4.5:1 normal, 3:1 large text including interactive states | Not tested |
| 1.4.4 Resize Text | AA | 200% zoom/readability and no clipped content | Not tested |
| 1.4.5 Images of Text | AA | Learning text is actual text where possible | Not tested |
| 1.4.10 Reflow | AA | 320 CSS-pixel reflow, exceptions only where permitted for 2D content | Not tested |
| 1.4.11 Non-text Contrast | AA | Focus, input boundaries, badges and controls at required contrast | Not tested |
| 1.4.12 Text Spacing | AA | Increased line height, letter/word spacing, paragraph spacing | Not tested |
| 1.4.13 Content on Hover or Focus | AA | Dismissible, hoverable, persistent popovers where present | Not tested |
| 2.1.1 Keyboard | A | All lessons, lab choices, note export/import and navigation with keyboard | Not tested |
| 2.1.2 No Keyboard Trap | A | Can exit accordions, feedback and all interactive controls | Not tested |
| 2.1.4 Character Key Shortcuts | A | No unexpected single-character shortcuts | Not tested |
| 2.2.1 Timing Adjustable | A | No time pressure or time-limited educational controls | Not tested |
| 2.2.2 Pause, Stop, Hide | A | Auto-changing/animated content when applicable | Not tested |
| 2.3.1 Three Flashes or Below Threshold | A | No flashing visual content above threshold | Not tested |
| 2.4.1 Bypass Blocks | A | Skip navigation works after route changes | Not tested |
| 2.4.2 Page Titled | A | Page titles and dynamic lesson context are meaningful | Not tested |
| 2.4.3 Focus Order | A | Focus follows logical lesson sequence after DOM rerender | Not tested |
| 2.4.4 Link Purpose | A | Meaningful controls and document/download links | Not tested |
| 2.4.5 Multiple Ways | AA | Grade routes, lesson navigation and Home/Courses paths | Not tested |
| 2.4.6 Headings and Labels | AA | Lab, rubrics and form heading hierarchy, meaningful labels | Not tested |
| 2.4.7 Focus Visible | AA | High-visibility focus for primary buttons and custom controls | Not tested |
| 2.4.11 Focus Not Obscured (Minimum) | AA | Sticky nav does not cover focus after jump or DOM updates | Not tested |
| 2.5.1 Pointer Gestures | A | No multipoint/path-based gestures required | Not tested |
| 2.5.2 Pointer Cancellation | A | Buttons activate on completed click/tap, not pointer-down | Not tested |
| 2.5.3 Label in Name | A | Visible control labels align with accessible names | Not tested |
| 2.5.4 Motion Actuation | A | No device shaking/tilting required | Not tested |
| 2.5.7 Dragging Movements | AA | Reorder controls accessible without drag | Not tested |
| 2.5.8 Target Size (Minimum) | AA | Touch targets at least 24×24 CSS px or valid spacing exception | Not tested |
| 3.1.1 Language of Page | A | HTML language attribute matches written content | Not tested |
| 3.1.2 Language of Parts | AA | Pronunciation and locale for mixed-language passages | Not tested |
| 3.2.1 On Focus | A | Focus does not unexpectedly navigate or mutate grades | Not tested |
| 3.2.2 On Input | A | Form controls do not unexpectedly change context | Not tested |
| 3.2.3 Consistent Navigation | AA | Shared routes and nav controls remain predictable | Not tested |
| 3.2.4 Consistent Identification | AA | Common buttons/actions use consistent names | Not tested |
| 3.2.6 Consistent Help | A | Help paths or support guidance, when present, are in a consistent location | Not tested |
| 3.3.1 Error Identification | A | Incorrect answers, imports and form errors are announced and described | Not tested |
| 3.3.2 Labels or Instructions | A | Explicit requirements and labels for each student response | Not tested |
| 3.3.3 Error Suggestion | AA | Give actionable recovery guidance, not only "wrong" | Not tested |
| 3.3.4 Error Prevention (Legal/Financial/Data) | AA | Determine applicability to student data controls and reset/import | Not tested |
| 3.3.7 Redundant Entry | A | Determine applicability to repeated student-entered information | Not tested |
| 3.3.8 Accessible Authentication (Minimum) | AA | Public preview has no authentication; reassess for SharePoint | Not tested |
| 4.1.2 Name, Role, Value | A | Custom interactive controls expose roles, states and updates | Not tested |
| 4.1.3 Status Messages | AA | Feedback, training outputs, saved checkpoints and errors announced | Not tested |

**Notes:** 3.2.6 and 3.3.7 are Level A; 3.3.8 is Level AA. Do not treat unknown applicability as a pass. WCAG 2.2 removes the obsolete 4.1.1 Parsing criterion.

## Automated evidence (not certification)

- GitHub Actions Playwright project matrix: desktop Chromium, tablet/phone/small-phone Chromium, desktop Firefox and WebKit smoke.
- axe-core checks for WCAG 2/2.1/2.2 Level A and AA tags on key routes and six lab states. Any matched violation now fails CI regardless of severity.
- Keyboard checks for focus and activation, mobile horizontal overflow and enlarged text.
- Capture the *exact green run URL and commit SHA*. Never substitute a source-code simulation for an executed browser test.
- Automated tests do not validate reading order quality, meaningful alt text, actual screen-reader announcements, cultural clarity or cognitive accessibility in full.

## Findings log

| ID | Criterion | URL/flow | Environment | Evidence | Severity | Owner | Status | Retest |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A11Y-001 | 2.1.1 Keyboard (scrollable region focus) | Grade 7 A1 classifier, narrow mobile width | GitHub Actions Chromium phone and small phone | [Failed run 43564341021](https://github.com/edtechevans/AIcapacityjudgement/actions/runs/43564341021), axe `scrollable-region-focusable` on `.lab-table-wrap` | Serious | Development | Code corrected in commit `80ca8230`; manual and browser retest pending | Await latest passing run |

## Qualified evaluator sign-off — only after evaluation

- Evaluation date and exact release commit:
- Evaluator name, role and qualifications:
- Scope and any excluded content:
- Tools and assistive technology versions:
- Applicable criteria tested:
- Known failures, remediations and retest evidence:
- **Conformance statement** (if fully supported): 
- Review/approval signature:

**Current conclusion: there is no basis to assert formal WCAG 2.2 AA conformance.** This file is an audit-ready procedure and blank report, not a signed evaluation or certification.