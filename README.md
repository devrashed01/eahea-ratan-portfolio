# Eahea Ratan — Portfolio

Personal portfolio of Eahea Ratan, Senior Frontend Engineer (React · TypeScript · Next.js).

## What makes it different

- **Career terrain (hero):** a WebGL contribution graph with ten rows of years (2017 → 2026) and 52 weeks each. Bars rise toward the cursor and a "deploy sweep" rolls across. Built with one `InstancedMesh`, so it stays smooth. Falls back to a CSS grid when WebGL is unavailable or reduced motion is on.
- **Live product demos:** a scripted mini WorkPilot that writes a standup from recorded activity, and a working AgentBoy pill.
- **Fit check:** hiring managers pick their role's requirements and get concrete evidence for each one.
- **Career as `git log`:** a scroll-driven playhead runs through commits, with `HEAD → main` on the current role.
- **Recruiter mode:** press `R`, or link straight to `/?recruiter`. It's a dense, printable one-page brief.
- **⌘K command palette**, live Dhaka / Stockholm / London / New York clocks, smooth scroll (Lenis), and grain overlay.

## Edit content

Everything lives in `src/content/site.ts`.

`public/Eahea-Ratan-CV.pdf` is generated from Recruiter mode. To regenerate it:

```bash
npm run build && npx vite preview --port 4317 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer \
  --print-to-pdf=public/Eahea-Ratan-CV.pdf "http://localhost:4317/?recruiter"
```

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/ (deploy to Vercel / Netlify / GitHub Pages)
npm run lint
```

Stack: Vite, React 19, TypeScript, Tailwind CSS v4, three.js / React Three Fiber, Framer Motion, Lenis.
