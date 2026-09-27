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
  description: 'Wykonujemy bramy, ogrodzenia, balustrady, balkony francuskie i konstrukcje stalowe. Montaż realizujemy w Bieczu, Gorlicach, Jaśle i okolicy, a gotowe elementy oferujemy również z wysyłką.',
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
              <a href="/portfolio/" className="btn-primary">Zobacz nasze realizacje</a>
              <a href="mailto:rofamet@op.pl" className="btn-secondary">Napisz do nas</a>
            </div>
          </div>
        </div>
      </section>

      <section className="home-content-band">
        <div className="site-container home-content-grid">
          <div className="home-content-main">
            <p className="section-kicker">Rofamet</p>
            <h2 className="home-section-title">Solidne rozwiązania stalowe dla domu, firmy i posesji.</h2>
            <p>Szukasz solidnych i estetycznych rozwiązań wykonanych ze stali? Rofamet zajmuje się produkcją <a href="/portfolio/bramy/">bram</a>, <a href="/portfolio/ogrodzenia/">ogrodzeń</a>, <a href="/portfolio/balustrady/">balustrad</a>, <a href="/portfolio/balkony-francuskie/">balkonów francuskich</a> oraz <a href="/portfolio/konstrukcje-stalowe/">konstrukcji stalowych</a>. Wykonujemy elementy dopasowane do potrzeb klienta, zwracając uwagę na ich trwałość, funkcjonalność i wygląd.</p>
          </div>

          <aside className="home-content-aside">
            <p className="section-kicker">Oferta</p>
            <h2 className="home-section-title">Stalowe elementy dopasowane do zastosowania.</h2>
            <ul className="home-service-links">
              {homeCategories.slice(0, 6).map(category => (
                <li key={category.key}><a href={category.path}>{category.label}</a></li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="site-container home-service-details">
          <article className="home-content-note">
            <h2 className="home-section-title">Bramy i ogrodzenia stalowe</h2>
            <p>Nasze <a href="/portfolio/bramy/">bramy</a> i <a href="/portfolio/ogrodzenia/">ogrodzenia stalowe</a> mogą być wykonane w różnych rozmiarach i formach, dzięki czemu można je dopasować do charakteru posesji. Podczas realizacji zwracamy uwagę na dokładność wykonania oraz dopasowanie poszczególnych elementów do istniejącej zabudowy.</p>
          </article>
          <article className="home-content-note">
            <h2 className="home-section-title">Balustrady i balkony francuskie</h2>
            <p>W naszej ofercie znajdują się również <a href="/portfolio/balustrady/">balustrady stalowe</a> oraz <a href="/portfolio/balkony-francuskie/">balkony francuskie</a>. To rozwiązania zarówno dla nowych budynków, jak i podczas modernizacji istniejących obiektów, dopasowane rozmiarem, kształtem i wyglądem do konkretnego miejsca.</p>
          </article>
          <article className="home-content-note">
            <h2 className="home-section-title">Konstrukcje stalowe dla domu i firmy</h2>
            <p>Zajmujemy się także wykonywaniem <a href="/portfolio/konstrukcje-stalowe/">konstrukcji stalowych</a> według ustaleń z klientem. Znajdują one zastosowanie przy budynkach mieszkalnych, gospodarczych, firmach oraz innych obiektach wymagających trwałych elementów stalowych.</p>
          </article>
        </div>

        <div className="site-container home-content-row">
          <article className="home-content-note">
            <p className="section-kicker">Biecz, Gorlice, Jasło</p>
            <h2 className="home-section-title">Bramy, ogrodzenia i balustrady z montażem</h2>
            <p>Swoje usługi kierujemy przede wszystkim do klientów z Biecza, Gorlic, Jasła i okolic. Oferujemy montaż bram, ogrodzeń, balustrad oraz innych wykonanych przez nas elementów, dzięki czemu klient może zlecić zarówno przygotowanie konstrukcji, jak i jej montaż w miejscu docelowym.</p>
          </article>
          <article className="home-content-note">
            <p className="section-kicker">Współpraca</p>
            <h2 className="home-section-title">Od pomysłu do gotowego elementu</h2>
            <p>Realizujemy zamówienia dla klientów indywidualnych i firm. Możesz przedstawić swój pomysł, przesłać wymiary, zdjęcia lub projekt, a wspólnie ustalimy przeznaczenie, wygląd i najważniejsze szczegóły realizacji.</p>
            <a href="mailto:rofamet@op.pl" className="btn-primary home-inline-cta">Napisz do nas</a>
          </article>
        </div>

        <div className="site-container home-shipping-note">
          <p className="section-kicker">Zamówienia z wysyłką</p>
          <h2 className="home-section-title">Gotowe elementy stalowe wysyłamy na terenie Polski.</h2>
          <p>Nie ograniczamy się wyłącznie do realizacji lokalnych. W zależności od rodzaju i wielkości zamówienia indywidualnie ustalamy przygotowanie oraz transport gotowych elementów stalowych.</p>
        </div>
      </section>

      <section className="section-band">
        <div className="site-container section-grid">
          <article className="panel portfolio-panel">
            <p className="panel-kicker">Portfolio</p>
            <h2 className="panel-title">Realizacje dopasowane do Twojego domu, firmy i inwestycji.</h2>
            <p className="panel-body">Zobacz wybrane bramy, ogrodzenia i stalowe konstrukcje przygotowane przez nas z naciskiem na trwałość, detal i sprawny montaż.</p>
            <a href="/portfolio/" className="btn-primary portfolio-link">Przejdź do portfolio</a>
          </article>

          <article className="panel">
            <p className="panel-kicker">Zakres prac</p>
            <h2 className="panel-title">Obszary naszej specjalizacji</h2>
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
            Siedziba: <strong>Korczyna</strong><br />
            Telefon / WhatsApp: <strong><a href="tel:+48513642695">+48 513 642 695</a></strong><br />
            E-mail: <a href="mailto:rofamet@op.pl" className="panel-link">rofamet@op.pl</a>
            </p>
            <a href="https://maps.app.goo.gl/JwjqJC5aRfDt9JQPA" className="btn-primary contact-map-link" target="_blank" rel="noreferrer">Jak dojechać?</a>
          </article>
        </div>
      </section>
    </>
  )
}
