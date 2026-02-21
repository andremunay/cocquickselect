# COC QuickSelect

Resident-facing internal clinical decision-support website for outpatient IM residency clinic use.

## Deploy on GitHub Pages
1. Push this repository to GitHub.
2. In **Settings → Pages**, set source to **Deploy from a branch**.
3. Select `main` (or your chosen branch) and root `/`.
4. Save and open the Pages URL.

No build step is required.

## Measurement plan (QI)
Use placeholders in `qi.html`:
- Referral rates: baseline vs post with editable dates.
- Resident confidence survey: editable URL and prompt placeholders.
- Site usage: GitHub repository traffic guidance (no storage, no analytics code).

## Notes
- Clinical source-of-truth content is in `assets/content.js`.
- Shared page logic and filtering are in `assets/app.js`.
