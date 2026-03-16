type CalloutType = 'info' | 'tip' | 'warning' | 'error'

const config: Record<CalloutType, { color: string; icon: string; label: string }> = {
  info:    { color: '#22d3ee', icon: 'ℹ️',  label: 'Info' },
  tip:     { color: '#10b981', icon: '💡',  label: 'Tip' },
  warning: { color: '#f59e0b', icon: '⚠️',  label: 'Warning' },
  error:   { color: '#ef4444', icon: '🚨',  label: 'Error' },
}

interface Props {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}

export function Callout({ type = 'info', title, children }: Props) {
  const { color, icon, label } = config[type]

  return (
    <div
      className="rounded-r-xl my-5 p-4 border-l-4"
      style={{ borderColor: color, background: `${color}10` }}
    >
      <div
        className="font-mono text-xs font-bold mb-2 flex items-center gap-1.5"
        style={{ color }}
      >
        <span>{icon}</span>
        <span>{title ?? label}</span>
      </div>
      <div className="text-sm text-[#8b949e] [&>p]:m-0">{children}</div>
    </div>
  )
}
