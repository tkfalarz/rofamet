import React from 'react'

import manifest from '../../assets/generated/manifest.json'
import { categoryDefinitions } from '../lib/gallery-categories'
import { withBase } from '../lib/site-paths'

const asset = value => withBase(value)

function buildResponsiveImageData(imageEntry) {
  const variants = Array.isArray(imageEntry) ? imageEntry : imageEntry?.variants ?? []
  const srcset = variants.map(variant => `${withBase(variant.webp)} ${variant.width}w`).join(', ')
  const src = withBase(variants[variants.length - 1]?.webp ?? '')

  return { src, srcset }
}

const mainHeroEntry = manifest['main-hero.jpg']
const homeHero = mainHeroEntry
  ? {
      ...buildResponsiveImageData(mainHeroEntry),
      sizes: '(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px',
      alt_pl: 'Brama stalowa'
    }
  : {
      src: asset('assets/raw/main-hero.jpg'),
      srcset: asset('assets/raw/main-hero.jpg'),
      sizes: '(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px',
      alt_pl: 'Brama stalowa'
    }

export const frontmatter = {
  description: 'Wykonuję bramy, ogrodzenia, balustrady, balkony francuskie i konstrukcje stalowe. Montaż realizuję w Bieczu, Gorlicach i powiecie gorlickim.',
  hero: homeHero
}

const homeCategoryKeys = [
  'balkony-francuskie',
  'balustrady',
  'barierki',
  'architektura-ogrodowa',
  'bramy',
  'ogrodzenia',
  'konstrukcje-stalowe',
  'cnc',
  'meble-loft'
]

const homeCategories = homeCategoryKeys
  .map(key => categoryDefinitions.find(category => category.key === key))
  .filter(Boolean)

export default function Home({ highlightContact = false }) {
  return (
    <>
      <section className="hero-frame">
        <div className="hero-media">
          <picture>
            <source
              type="image/webp"
              srcSet={frontmatter.hero.srcset}
              sizes={frontmatter.hero.sizes}
            />
            <img
              src={frontmatter.hero.src}
              alt={frontmatter.hero.alt_pl}
              fetchPriority="high"
              loading="eager"
            />
          </picture>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Warsztat. Projekt. Montaż.</p>
            <h1 className="hero-title">Stalowe realizacje, które porządkują przestrzeń.</h1>
            <p className="hero-description">{frontmatter.description}</p>
            <div className="hero-actions">
              <a href="/portfolio/" className="btn-primary">Zobacz moje realizacje</a>
              <a href="mailto:rofamet@op.pl" className="btn-secondary">Napisz do mnie</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="site-container section-grid">
          <article className="panel">
            <p className="panel-kicker">Portfolio</p>
            <h2 className="panel-title">Realizacje dopasowane do Twojego domu, firmy i inwestycji.</h2>
            <p className="panel-body">Zobacz wybrane bramy, ogrodzenia i stalowe konstrukcje przygotowane przeze mnie z naciskiem na trwałość, detal i sprawny montaż.</p>
            <a href="/portfolio/" className="panel-link">Przejdź do portfolio</a>
          </article>

          <article className="panel">
            <p className="panel-kicker">Zakres prac</p>
            <h2 className="panel-title">Obszary mojej specjalizacji</h2>
            <ul className="panel-list">
              {homeCategories.map(category => (
                <li key={category.key}><a href={category.path}>{category.label}</a></li>
              ))}
            </ul>
          </article>

          <article id="contact-tile" className={`panel contact-panel ${highlightContact ? 'contact-panel-highlight' : ''}`}>
            <p className="panel-kicker">Kontakt</p>
            <h2 className="panel-title">Porozmawiajmy o Twojej realizacji.</h2>
            <p className="panel-body">
            Lokalizacja: <strong>Biecz</strong><br />
            Telefon: <strong><a href="tel:+48513642695">+48 513 642 695</a></strong><br />
            E-mail: <a href="mailto:rofamet@op.pl" className="panel-link">rofamet@op.pl</a>
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
