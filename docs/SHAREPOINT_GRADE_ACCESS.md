# Grade-specific access: current preview and future SharePoint deployment

**Design decision, 14 November 2026 — v19**

## The current learner experience

The public GitHub Pages preview begins with a single decision: **Choose your grade (6–10).** One click opens that grade's six-module Capacity × Judgement experience. There is no display-name entry step and no internal dashboard or course-library grade switcher.

- The student sees a Grade-specific course library, Home, My Learning snapshot, five lesson stages, and the learner profile.
- Every listed course, recommendation and progress count is specific to the selected grade.
- A shared lesson link works when the student chooses that same grade. Choosing another grade opens only that other grade's own courses.
- Once a grade is selected, out-of-grade lesson and course URLs redirect to the selected grade's course library. Direct in-app openings are likewise guarded.
- A learner can intentionally return to the public preview picker from **Profile → Change grade (preview only)**. This controls presentation, not authorisation.
- Local progress backups export **only the active grade**. A backup with a different grade is rejected without changing the selected grade. Import does not overwrite another grade's local checkpoints.
- Returning on the same browser resumes the chosen grade. Existing local learners are migrated automatically.

**Important: these are UI controls, not security.** This is an unauthenticated static site. All published grade data can be inspected by anyone, browser storage is editable, and a user can return to the preview picker or access publicly served JavaScript. Do **not** use these controls as a safeguard for private student records or restricted grade resources.

## Future AISG / SharePoint architecture

### 1. Identity and authoritative grade mapping

- Use approved **Microsoft Entra ID** authentication through a school-managed SharePoint/SPFx or approved web application. Sign-in must establish the user's actual school identity; the current local display alias is not an identity.
- Resolve the student's current grade on the **server** from an approved authoritative school directory/SIS mapping. An unsigned query string, browser preference, local storage key, JavaScript object, or self-selected grade is not evidence of entitlement.
- If a student's grade is unknown, outdated, or conflicts with the directory, fail closed and provide a contact/help route; do not expose a free grade chooser.
- Allow administrators to correct the grade mapping. Re-evaluate assignments when students progress to a new grade and at each authenticated session.

### 2. Real access enforcement

- Authorise **every** request for grade-specific data and any student submission against the authenticated identity and server-verified entitlement. Validate ownership independently for any student record or assignment.
- Store grade content only in protected, security-trimmed SharePoint libraries/lists or a backend serving resources after an authorisation check. **Do not ship all grades' curricula in a single public JavaScript bundle** if the content needs access restrictions.
- Return an actual unauthorised/forbidden response for cross-grade API/content requests. Merely hiding grade buttons or redirecting hash URLs is not security.
- Consider separate protected Grade 6–12 content bundles or authorised per-grade API responses, with a centrally managed shared interface and versioned curriculum schemas.
- Keep teachers' wider permissions explicit and role-based. Avoid granting student accounts access to other students' progress or educator-only materials.

### 3. Learner experience once authenticated

`Entra school sign-in → verify grade and role on server → open assigned grade's Home → access only authorised grade modules`.

There should be **no student-facing grade picker and no Change grade button** in the authenticated build. When the student advances to the next year, the grade changes after the authoritative record is updated. Teachers may have appropriately scoped multi-grade access depending on their school role.

### 4. Student progress and privacy

- Store authenticated learning progress in an approved server-side service with proper isolation, least-privilege permissions, retention and deletion policies, school privacy review, and change audit trails.
- Treat activity responses, student-authored work, grades and teacher feedback as protected data. Existing public-preview progress is not trusted evidence and should not automatically become assessed mastery.
- Design support for device changes, learning continuity, accessibility and a secure teacher workflow without collecting unnecessary student information.
- Request a school-approved privacy and safeguarding review before enabling real student accounts, assignment submission, automated qualitative feedback or third-party AI processing.

### 5. Implementation boundary / transition checklist

1. Verify Entra ID integration, tenancy, school account types, session expiry and logout.
2. Define the signed-in grade and school-role contract between SharePoint and the application.
3. Build server-side middleware/services that validate identity and grade for **each** protected request.
4. Split or retrieve curriculum by authorised grade; remove public all-grade scripts when restricting access.
5. Bind saved progress to the verified student subject ID, not alias or local storage.
6. Disable the preview picker and client-side backups unless specifically approved for the authenticated deployment.
7. Test: G6 cannot fetch G7–10 resources via direct URL, API, query, cache, import, network inspection or guessed IDs; a changed local variable or forged grade claim does not change server access.
8. Test teacher exceptions, grade changes, revoked accounts, shared devices, error states, accessibility, and student privacy.

## Code markers

- `app.js` uses an explicit `gradeChosen` preview state, grade-specific routing, and local backup scoping.
- `auth-config.js` includes `deployment: "preview"`. Changing it to `"sharepoint"` hides the preview grade-change control **only**; it does not authenticate or authorise anyone.
- `tests/quality.test.mjs` checks one-click entry, cross-grade URL protection, local backup behaviour and explicit preview switching.
- `tests/e2e/learner.spec.mjs` checks the grade-only browser experience.

**Release standard:** do not describe the current preview as secured by grade. Proper grade entitlement is a future, independently reviewed SharePoint and school identity integration.

## DP extension

The G11/12 public preview deliberately uses the same self-selected grade model as the earlier grades. Future production SharePoint deployment must obtain grade entitlement from approved school identity/SIS sources. A student with a Grade 11 or 12 account should automatically see DP1 or DP2 and only authorised grade resources; changing a client-side grade, hash route or browser storage cannot grant access to another grade. Student capstones and stakeholder feedback must remain in approved, access-controlled storage with explicit teacher permissions, not in the public preview or public GitHub assets.
