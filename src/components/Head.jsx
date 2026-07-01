import React, { useEffect } from 'react'

export default function Head({ frontmatter }) {
  useEffect(() => {
    const title = frontmatter?.title || 'Rofamet'
    document.title = title

    function upsertMeta(attrName, attrKey, content) {
      const selector = attrName === 'property' ? `meta[property="${attrKey}"]` : `meta[name="${attrKey}"]`
      let el = document.head.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        if (attrName === 'property') el.setAttribute('property', attrKey)
        else el.setAttribute('name', attrKey)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content || '')
    }

    upsertMeta('name', 'description', frontmatter?.description || 'Rofamet — konstrukcje stalowe i bramy przemysłowe')
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', frontmatter?.description || '')
    upsertMeta('property', 'og:image', frontmatter?.og_image || '/assets/generated/og/home.png')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('property', 'og:locale', 'pl_PL')

    const ldId = 'site-jsonld'
    let ld = document.getElementById(ldId)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Rofamet",
      "url": "https://rofamet.pl",
      "telephone": "+48-000-000-000",
      "email": "info@rofamet.pl",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ul. Example 1",
        "addressLocality": "Miasto",
        "postalCode": "00-000",
        "addressCountry": "PL"
      }
    }
    if (!ld) {
      ld = document.createElement('script')
      ld.id = ldId
      ld.type = 'application/ld+json'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(jsonLd)
  }, [frontmatter])

  return null
}
