import { getAllPostMetas } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function GET() {
  const posts = getAllPostMetas()
  const { title, description, siteUrl, author, email } = siteConfig

  const latestDate = posts.length > 0 && posts[0].date
    ? new Date(posts[0].date).toISOString()
    : new Date().toISOString()

  const entries = posts
    .map((post) => {
      const link = `${siteUrl}/posts/${post.slug}`
      const updated = post.date
        ? new Date(post.date).toISOString()
        : new Date().toISOString()
      const summary = post.description ?? post.summary ?? ''
      const categories = (post.categories ?? [])
        .map((cat) => `      <category term="${escapeXml(cat)}"/>`)
        .join('\n')

      return `  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${link}" rel="alternate"/>
    <id>${link}</id>
    <updated>${updated}</updated>
    <summary>${escapeXml(summary)}</summary>
    <author>
      <name>${escapeXml(author)}</name>
    </author>
${categories}
  </entry>`
    })
    .join('\n')

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(title)}</title>
  <subtitle>${escapeXml(description)}</subtitle>
  <link href="${siteUrl}" rel="alternate"/>
  <link href="${siteUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${siteUrl}/</id>
  <updated>${latestDate}</updated>
  <author>
    <name>${escapeXml(author)}</name>
    <email>${escapeXml(email)}</email>
  </author>
${entries}
</feed>`

  return new Response(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
