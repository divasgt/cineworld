export default function PageBg() {
  // from https://patterncraft.fun
  

  // style for parent div: min-h-screen bg-black fixed -z-1 top-0 right-0 bottom-0 left-0
  return (
  <div className="min-h-screen bg-black fixed -z-1 top-0 right-0 bottom-0 left-0">
    {/* Cosmic Nebula */}
    <div
      className="absolute inset-0 z-0"
      style={{
        background: `
          radial-gradient(ellipse 110% 70% at 25% 80%, rgba(147, 51, 234, 0.12), transparent 55%),
          radial-gradient(ellipse 130% 60% at 75% 15%, rgba(59, 130, 246, 0.10), transparent 65%),
          radial-gradient(ellipse 80% 90% at 20% 30%, rgba(236, 72, 153, 0.14), transparent 50%),
          radial-gradient(ellipse 100% 40% at 60% 70%, rgba(16, 185, 129, 0.08), transparent 45%),
          #000000
        `,
      }}
    />
    {/* Your Content/Components */}
    </div>
  )
}
