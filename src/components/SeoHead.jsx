import { useEffect } from 'react'

export default function SeoHead({ title, description, pair }) {
  useEffect(() => {
    document.title = title

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', description)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      author: {
        '@type': 'Organization',
        name: 'Supplement Checker'
      },
      about: pair.supplements.map(s => ({
        '@type': 'Drug',
        name: s
      }))
    }

    let script = document.querySelector('#seo-jsonld')
    if (!script) {
      script = document.createElement('script')
      script.id = 'seo-jsonld'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)

    return () => {
      if (script) script.remove()
    }
  }, [title, description, pair])

  return null
}
