const words = ['React', 'TypeScript', 'Next.js', 'SwiftUI', 'TanStack Query', 'WebGL', 'Node.js', 'Accessibility', 'Core Web Vitals', 'Design systems', 'AI tooling', 'Go']

export function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="relative overflow-hidden border-y border-line py-6" aria-hidden>
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-10 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-4xl text-mute italic md:text-5xl">
            {w}
            <span className="text-xl text-signal not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
