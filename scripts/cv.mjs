// Prints Recruiter mode to public/Eahea-Ratan-CV.pdf: build, serve, print with headless Chrome.
import { execFileSync, spawn } from 'node:child_process'

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const PORT = 4318

execFileSync('npm', ['run', 'build'], { stdio: 'inherit' })
const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'ignore' })
await new Promise((r) => setTimeout(r, 2500))
try {
  execFileSync(CHROME, [
    '--headless=new',
    '--no-pdf-header-footer',
    '--virtual-time-budget=5000',
    '--print-to-pdf=public/Eahea-Ratan-CV.pdf',
    `http://localhost:${PORT}/?recruiter`,
  ], { stdio: 'ignore' })
  console.log('Wrote public/Eahea-Ratan-CV.pdf')
} finally {
  server.kill()
}
// Rebuild so dist/ carries the fresh PDF.
execFileSync('npm', ['run', 'build'], { stdio: 'inherit' })
