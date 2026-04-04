# COC QuickSelect

Resident-facing internal clinical decision-support website for outpatient IM residency clinic use.

## Run locally
No build step is required.

1. Open a terminal in the repository root.
2. Start a simple local server with:
   `py -m http.server 8000`
3. Open `http://127.0.0.1:8000` in your browser.

If `py` is not available in the current terminal session, use:
`& "$env:LocalAppData\Programs\Python\Python313\python.exe" -m http.server 8000`

If `python` or `py` still does not resolve after installation, open a new terminal window so PATH refreshes.

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
