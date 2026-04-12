# Deployment Plan

1. Confirm the project ownership model.
   - Use an organization-owned GitHub account or organization for the repository.
   - Use organization-owned Cloudflare and Render accounts, not a personal residency account.
   - Record who has admin access and who will maintain the project after handoff.

2. Confirm the production architecture.
   - Use Cloudflare Registrar for `theoutpatientinternist.org`.
   - Use Cloudflare DNS for domain management.
   - Use Render for the web app.
   - Use Render Postgres for storing QI and survey data.
   - Continue avoiding patient data in the application and database.

3. Register the domain through Cloudflare Registrar.
   - Register `theoutpatientinternist.org`.
   - Enable DNSSEC if Cloudflare does not enable it automatically for the zone.
   - Confirm domain renewal settings and billing ownership.

4. Prepare the repository for the next app phase.
   - Review the current static GitHub Pages structure.
   - Decide whether to keep the app as a simple static frontend plus backend API or migrate to a full-stack framework.
   - Add the backend and database code needed to collect and store QI and survey submissions.
   - Keep secrets and database credentials out of the repository.

5. Design the QI and survey data model.
   - Define the exact fields that need to be collected.
   - Confirm that no patient-identifying data or protected health information will be collected.
   - Create database tables for survey responses and any required metadata.
   - Add timestamps and basic audit fields where useful.

6. Create the Render Postgres database.
   - Create a managed Postgres database in Render.
   - Save the internal database connection string for the Render app.
   - Save any local development connection details separately and securely.
   - Configure backups and retention according to the project needs.

7. Create the Render web service.
   - Connect Render to the GitHub repository.
   - Configure the build command and start command for the chosen app structure.
   - Add required environment variables, including the database connection string.
   - Deploy the first preview or staging version.

8. Implement the QI and survey submission flow.
   - Add the frontend form or forms for QI and survey data.
   - Add backend routes to validate and store submissions.
   - Add server-side validation for required fields and allowed values.
   - Add user-friendly success and error states.
   - Avoid logging sensitive form payloads.

9. Add access control if needed.
   - Decide whether the survey and QI tools should be public or restricted.
   - If restricted, add simple passwordless sign-in or Google-based sign-in.
   - Confirm that access control is tied to organization-owned configuration, not a personal account.

10. Configure the custom domain in Render.
    - Add `theoutpatientinternist.org` as a custom domain for the Render web service.
    - Add `www.theoutpatientinternist.org` if the site should support the `www` address.
    - Copy Render's required DNS records into Cloudflare.
    - Wait for DNS propagation.
    - Confirm Render has issued automatic TLS certificates.

11. Configure Cloudflare DNS behavior.
    - Keep DNS records simple and documented.
    - Confirm whether Cloudflare proxying should be enabled or whether records should be DNS-only for Render.
    - Add redirects if the preferred canonical domain should be either apex or `www`.

12. Test the production deployment.
    - Verify the site loads over HTTPS.
    - Submit test QI and survey responses.
    - Confirm the responses are written to Render Postgres.
    - Confirm invalid submissions are rejected.
    - Confirm no patient data is requested, stored, or logged.
    - Test on desktop and mobile browsers.

13. Set up basic operational monitoring.
    - Review Render deploy logs and runtime logs.
    - Configure alerting or notification ownership if needed.
    - Document where to check database status, app status, and deployment history.

14. Prepare handoff documentation.
    - Document Cloudflare ownership and DNS settings.
    - Document Render services, environment variables, and database location.
    - Document how to deploy changes.
    - Document how to export or review QI and survey data.
    - Document what data must not be collected.

15. Launch.
    - Confirm the latest production deploy is healthy.
    - Confirm the custom domain resolves correctly.
    - Confirm the TLS certificate is active.
    - Confirm test submissions work end to end.
    - Share `https://theoutpatientinternist.org` with the project team.

