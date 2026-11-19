# Educator learning pathway — deployment note (19 November 2026)

## Courses
- AI Literacy & Professional Judgement (six interactive modules; ~60 minutes)
- AI Pedagogy, Assessment & Learning Design (six interactive modules; ~65 minutes)

The new **Educators** navigation tab is available at `#/educators`, including without a student grade selection. Each module presents three short concept explanations, a professional scenario, a multiple-choice knowledge check, and immediate explanatory feedback. A module completes when the educator selects the most defensible response; there are no written reflections, text fields, uploads or submissions. Progress is held only in browser localStorage under `aicj-educator-progress-v2`; previously completed checkpoints can be carried forward without migrating any prior written reflections.

## Security / SharePoint boundary
This GitHub repository and GitHub Pages deployment are public. **No materials within this repository are confidential or access-controlled.** The Educators label is a navigation convention, not authentication or educator authorisation. SharePoint OU-group controls will only protect content if the entire educator resource is actually delivered from a protected SharePoint library or authenticated endpoint. Linking or embedding this public site behind a SharePoint page does not make its assets private. Do not store sensitive examples, identifiable student records, or staff assessments in this public source. Before requiring educator-only access, move educator-specific content out of public hosting and enforce Entra-group access on every protected resource request.

## Progress boundary
Local browser storage is not cross-device, authenticated, or administrator-readable, and clearing browser storage will erase progress. This pilot does **not** implement automatic synchronisation with SharePoint or staff completion reporting. Use an approved server-side store with authenticated user IDs, access controls and retention policies before reporting completion to leadership.

## Scope
Student lessons, routes and grade selection are retained. Educator learning is a separate content pathway that does not change the 42 student modules. The scenario answer key communicates a defensible recommendation; it is not a psychometric measurement of educator judgement. Staff can discuss alternative defensible approaches with a facilitator.
