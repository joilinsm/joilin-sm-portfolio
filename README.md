# JOILIN S M — Portfolio

A Germany-focused academic and professional portfolio built with Next.js,
TypeScript, Tailwind CSS, Framer Motion, and Lucide icons.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production checks:

```bash
npm run lint
npm run typecheck
npm run build
```

Document audit:

```bash
npm run validate:documents
```

This checks every `/documents/...` URL in `portfolioData` against the physical
files under `public/documents/` and reports missing or invalid references.

## Edit portfolio content

All personal content is stored in:

```text
src/data/portfolio.ts
```

Edit this file to change the name, biography, education, experience, skills,
projects, credentials, languages, contact details, or social links. UI
components should not need to be changed.

### CV

1. Place the PDF at `public/documents/joilin-cv.pdf`.
2. Set `profile.documents.cvAvailable` to `true` in
   `src/data/portfolio.ts`.

The path can also be changed in that same object.

### Projects, experience, and credentials

- Add projects to `projects`; cards, filters, sitemap entries, and case-study
  pages are generated automatically.
- Add internships or employment to `experience`.
- Add verified entries to `certifications` and `achievements`.
- Add standalone language documents to `certificateFiles`; reuse an existing
  certification in a language card through `certificationIds`.
- Add subjects to `education[0].coursework`.
- Add transcript rows to `academicRecords`.

Do not remove required object fields. Empty optional strings and arrays are
handled gracefully by the interface.

### Contact form

The form posts to `POST /api/contact` and is delivered with Resend to
`joilinsm@gmail.com`. Configure server-side environment variables in
`.env.local` using the names in `.env.example`. Never put `RESEND_API_KEY` in a
`NEXT_PUBLIC_` variable.

## Before deployment

Replace every value beginning with `[ADD ...]` in
`src/data/portfolio.ts`, especially:

- university and locations
- email, phone, LinkedIn, and GitHub
- canonical production URL
- internship companies and verified experience details
- project dates and evidence

Then run `npm run lint` and `npm run build`.
