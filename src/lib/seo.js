import { categoryDefinitions } from './gallery-categories.js'

export const SITE_URL = 'https://rofamet.pl'

const commonMetadata = {
  locale: 'pl_PL',
  image: '/assets/generated/og/home.png'
}

export const pageMetadata = {
  '/': {
    title: 'Bramy, ogrodzenia, balustrady | Rofamet - Biecz, Gorlice, Jasło',
    description: 'Wykonuję bramy, ogrodzenia, balustrady, balkony francuskie i konstrukcje stalowe. Montaż realizuję w Bieczu, Gorlicach, Jaśle i okolicy.',
    ...commonMetadata
  },
  '/portfolio/': {
    title: 'Portfolio realizacji stalowych | Rofamet - Biecz, Gorlice, Jasło',
    description: 'Zobacz realizacje: bramy, ogrodzenia, balustrady, konstrukcje stalowe i cięcie blach CNC. Montaż realizuję w Bieczu, Gorlicach oraz Jaśle.',
    ...commonMetadata,
    image: '/assets/generated/og/portfolio.png'
  },
  ...Object.fromEntries(categoryDefinitions.map(category => [category.path, {
    title: category.title,
    description: category.description,
    ...commonMetadata,
    image: '/assets/generated/og/portfolio.png'
  }]))
}

export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Rofamet',
  url: SITE_URL,
  telephone: '+48 513 642 695',
  email: 'rofamet@op.pl',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Korczyna',
    addressCountry: 'PL'
  },
  areaServed: [
    { '@type': 'City', name: 'Biecz' },
    { '@type': 'City', name: 'Gorlice' },
    { '@type': 'City', name: 'Jasło' },
    { '@type': 'AdministrativeArea', name: 'powiat gorlicki' }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Usługi Rofamet',
    itemListElement: [
      'Bramy i ogrodzenia',
      'Balustrady i balkony francuskie',
      'Konstrukcje stalowe',
      'Cięcie blach CNC'
    ].map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } }))
  }
}

export const webSiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Rofamet',
  url: SITE_URL
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function buildHead(route) {
  const metadata = pageMetadata[route] ?? pageMetadata['/']
  const canonicalUrl = new URL(route, SITE_URL).href
  const imageUrl = new URL(metadata.image, SITE_URL).href
  const jsonLd = JSON.stringify(localBusinessJsonLd).replaceAll('<', '\\u003c')
  const webSiteJsonLdMarkup = JSON.stringify(webSiteJsonLd).replaceAll('<', '\\u003c')
  const heroPreload = route === '/'
    ? '<link rel="preload" as="image" href="/assets/generated/main-hero-1280.webp" imagesrcset="/assets/generated/main-hero-320.webp 320w, /assets/generated/main-hero-640.webp 640w, /assets/generated/main-hero-1280.webp 1280w, /assets/generated/main-hero-1920.webp 1920w" imagesizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px" fetchpriority="high">'
    : ''

  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}">`,
    '<meta name="robots" content="index, follow">',
    `<link rel="canonical" href="${canonicalUrl}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:locale" content="${metadata.locale}">`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}">`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}">`,
    `<meta property="og:url" content="${canonicalUrl}">`,
    `<meta property="og:image" content="${imageUrl}">`,
    heroPreload,
    `<script type="application/ld+json">${jsonLd}</script>`,
    `<script type="application/ld+json">${webSiteJsonLdMarkup}</script>`
  ].filter(Boolean).join('\n    ')
}