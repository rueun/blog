import type { MDXComponents } from 'mdx/types'
import { Pre } from './Pre'
import { Callout } from './Callout'
import { Steps, Step } from './Steps'
import { Mermaid } from './Mermaid'

// Unwrap rehype-pretty-code's figure wrapper
function Figure({ 'data-rehype-pretty-code-figure': isPrettyCode, children, ...props }: any) {
  if (isPrettyCode !== undefined) return <>{children}</>
  return <figure {...props}>{children}</figure>
}

export const mdxComponents: MDXComponents = {
  // Override HTML elements
  pre: Pre as any,
  figure: Figure,

  // Custom components available in .mdx files
  Callout,
  Steps,
  Step,
  Mermaid,
}
