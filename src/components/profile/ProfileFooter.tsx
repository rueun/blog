export default function ProfileFooter() {
  return (
    <footer className="mt-auto">
      <div className="h-px bg-border" />
      <div className="max-w-[920px] mx-auto px-6 py-10 flex items-center justify-center">
        <p className="text-[12px] text-text-muted tracking-wide font-mono">
          © {new Date().getFullYear()} 신은정 · Built with Next.js & Framer Motion
        </p>
      </div>
    </footer>
  )
}
