import React from 'react'

export function Steps({ children }: { children: React.ReactNode }) {
  let counter = 0
  return (
    <div className="my-6 flex flex-col relative before:absolute before:left-5 before:top-3 before:bottom-3 before:w-px before:bg-[#30363d]">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child
        counter++
        return React.cloneElement(child as React.ReactElement<StepProps>, { _n: counter })
      })}
    </div>
  )
}

interface StepProps {
  title: string
  children: React.ReactNode
  _n?: number
}

export function Step({ title, children, _n }: StepProps) {
  return (
    <div className="flex gap-4 pb-6 last:pb-0">
      <div className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center text-sm font-bold shrink-0 z-10 relative">
        {_n}
      </div>
      <div className="flex-1 pt-1.5">
        <p className="font-bold text-[#e6edf3] mb-2 text-sm">{title}</p>
        <div className="text-sm text-[#8b949e]">{children}</div>
      </div>
    </div>
  )
}
