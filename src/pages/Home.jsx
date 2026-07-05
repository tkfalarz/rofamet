import React from 'react'

import manifest from '../../assets/generated/manifest.json'
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
  title: 'Rofamet — Strona główna',
  description: 'Rofamet — konstrukcje stalowe, bramy i ogrodzenia. Projekt, produkcja oraz montaż — realizacje dla klientów indywidualnych i firm.',
  og_image: asset('assets/generated/og/home.png'),
  hero: homeHero
}

export default function Home() {
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
            />
          </picture>
        </div>

        <div className="hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Warsztat. Projekt. Montaż.</p>
            <h1 className="hero-title">Stalowe realizacje, które porządkują przestrzeń.</h1>
            <p className="hero-description">{frontmatter.description}</p>
            <div className="hero-actions">
              <a href="#/portfolio" className="btn-primary">Zobacz realizacje</a>
              <a href="mailto:robertos242@onet.pl" className="btn-secondary">Napisz do nas</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-band">
        <div className="site-container section-grid">
          <article className="panel">
            <p className="panel-kicker">Portfolio</p>
            <h2 className="panel-title">Realizacje dopasowane do domu, firmy i inwestycji.</h2>
            <p className="panel-body">Zobacz wybrane bramy, ogrodzenia i stalowe konstrukcje przygotowane z naciskiem na trwałość, detal i sprawny montaż.</p>
            <a href="#/portfolio" className="panel-link">Przejdź do portfolio</a>
          </article>

          <article className="panel">
            <p className="panel-kicker">Zakres prac</p>
            <h2 className="panel-title">Od projektu po gotowy montaż.</h2>
            <p className="panel-body">Projektowanie, produkcja, malowanie proszkowe i montaż prowadzimy jako jeden proces, dzięki czemu realizacja jest spójna i przewidywalna.</p>
          </article>

          <article className="panel">
            <p className="panel-kicker">Kontakt</p>
            <h2 className="panel-title">Porozmawiajmy o Twojej realizacji.</h2>
            <p className="panel-body">Telefon: <strong>+48 513 642 695</strong><br />E-mail: <a href="mailto:robertos242@onet.pl" className="panel-link">robertos242@onet.pl</a></p>
          </article>
        </div>
      </section>
    </>
  )
}
