export default function ProfileFooter() {
  return (
    <footer className="mt-auto">
      <div className="h-px bg-border" />
      <div className="max-w-[720px] mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[11px] text-text-muted tracking-wide">
          © {new Date().getFullYear()} Eunjeong Shin
        </p>
        <div className="flex items-center gap-5">
          <a href="mailto:rueun0302@gmail.com" className="text-[11px] text-text-muted hover:text-text-primary transition-colors tracking-wide">Email</a>
          <a href="https://github.com/rueun" target="_blank" rel="noopener noreferrer" className="text-[11px] text-text-muted hover:text-text-primary transition-colors tracking-wide">GitHub</a>
          <a href="/" className="text-[11px] text-text-muted hover:text-text-primary transition-colors tracking-wide">Blog</a>
        </div>
      </div>
    </footer>
  )
}
