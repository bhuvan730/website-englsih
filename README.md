# Forgotten Foods of India

A responsive React and Vite digital book built from the supplied 218-page PDF. It includes eight chapter routes, 32 individual food entries, a searchable gallery, regional browsing, references, and the original project team credits.

## Run locally

1. Install Node.js 18 or newer and run `npm install` in this folder.
2. Run `npm run dev`. The pre-dev step extracts the PDF's original images into a temporary asset folder that Vite serves locally.
3. To make a production bundle with all image assets included, run `npm run build`.

The extractor uses `C:\Users\LENOVO\Downloads\Group-No-16_Gastronomic_studies.pdf` by default. Set `FORGOTTEN_FOODS_PDF` to another PDF path if needed. Python must have `pypdf` installed; `requirements.txt` lists the dependency. `FORGOTTEN_FOODS_PYTHON` can point to a specific Python executable.

The PDF's text is stored as structured JSON in `src/data/`. Image files are extracted at launch so the exact source photography, cover, and regional artwork are used; they are never replaced with stock or generated images. A production build copies the extracted files into `dist/`.

## Routes

- `/` — home and regional map
- `/chapter/:id` — chapter reading pages
- `/food/:id` — individual food entries
- `/gallery` — searchable and filterable image gallery
- `/about` — project team and instructor
- `/references` — source notes transcribed from the PDF

The site uses React Router, Tailwind CSS, and Lucide React. Styling is in `src/styles.css` with responsive breakpoints and a persistent dark mode toggle.
