import React, { useEffect, useMemo, useState } from 'react'

import manifest from '../../assets/generated/manifest.json'
import { defaultCategory, filterOptions, getCategoryLabel } from '../lib/gallery-categories'
import { withBase } from '../lib/site-paths'

const asset = value => withBase(value)

function buildResponsiveImageData(imageEntry) {
  const variants = Array.isArray(imageEntry) ? imageEntry : imageEntry?.variants ?? []
  const srcset = variants.map(variant => `${withBase(variant.webp)} ${variant.width}w`).join(', ')
  const src = withBase(variants[variants.length - 1]?.webp ?? '')

  return { src, srcset }
}

function makeItemsFromManifest(manifestData) {
  return Object.entries(manifestData)
    .filter(([, imageEntry]) => imageEntry?.kind === 'portfolio')
    .map(([filename, imageEntry]) => {
      const category = imageEntry?.category ?? defaultCategory
      const { src, srcset } = buildResponsiveImageData(imageEntry)
      const previewSrc = withBase((imageEntry?.variants ?? [])[Math.max((imageEntry?.variants ?? []).length - 2, 0)]?.webp ?? '')

      return {
        id: filename,
        src,
        previewSrc,
        srcset,
        category,
        categoryLabel: getCategoryLabel(category)
      }
    })
}

function getHeroFromManifest(manifestData) {
  const portfolioHeroEntry = manifestData['portfolio-hero.jpg']
  const mainHeroEntry = manifestData['main-hero.jpg']
  const heroEntry = portfolioHeroEntry ?? mainHeroEntry

  if (heroEntry) {
    const { src, srcset } = buildResponsiveImageData(heroEntry)

    return {
      src,
      srcset,
      sizes: '(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px',
      alt_pl: 'Przykładowa realizacja z portfolio'
    }
  }

  return {
    src: asset('assets/generated/og/portfolio.png'),
    srcset: '',
    sizes: '(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px',
    alt_pl: 'Portfolio realizacji'
  }
}

export const frontmatter = {
  title: 'Portfolio — Rofamet',
  description: 'Przegląd moich realizacji: bram, furtki i ogrodzeń stalowych — przykłady projektowania, produkcji i montażu.',
  og_image: asset('assets/generated/og/portfolio.png'),
  hero: getHeroFromManifest(manifest)
}

export default function Portfolio() {
  const items = useMemo(() => makeItemsFromManifest(manifest), [])
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeIndex, setActiveIndex] = useState(null)
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return items
    }

    return items.filter(item => item.category === activeCategory)
  }, [activeCategory, items])
  const activeItem = activeIndex === null ? null : filteredItems[activeIndex] ?? null

  useEffect(() => {
    setActiveIndex(null)
  }, [activeCategory])

  useEffect(() => {
    if (activeIndex === null) return undefined
    if (filteredItems.length === 0) {
      setActiveIndex(null)
      return undefined
    }

    if (activeIndex >= filteredItems.length) {
      setActiveIndex(0)
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex(currentIndex => (currentIndex + 1) % filteredItems.length)
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex(currentIndex => (currentIndex - 1 + filteredItems.length) % filteredItems.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, filteredItems.length])

  function openLightbox(index) {
    setActiveIndex(index)
  }

  function closeLightbox() {
    setActiveIndex(null)
  }

  function showPrevious() {
    setActiveIndex(currentIndex => (currentIndex - 1 + filteredItems.length) % filteredItems.length)
  }

  function showNext() {
    setActiveIndex(currentIndex => (currentIndex + 1) % filteredItems.length)
  }

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-media">
          <picture>
            <source type="image/webp" srcSet={frontmatter.hero.srcset} sizes={frontmatter.hero.sizes} />
            <img src={frontmatter.hero.src} alt={frontmatter.hero.alt_pl} />
          </picture>
        </div>

        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <p className="eyebrow">Wybrane realizacje</p>
            <h1 className="page-hero-title">Moje realizacje stalowych konstrukcji i bram.</h1>
            <p className="page-hero-text">Przegląd moich przykładowych montaży i wykonawstwa. Układ pozostaje prosty, zdjęcia są na pierwszym planie, a siatka jest równa i czytelna.</p>
          </div>
        </div>
      </section>

      <section className="portfolio-wrap">
        <div className="site-container">
          <div className="portfolio-header">
            <div>
              <p className="panel-kicker">Galeria</p>
              <h2 className="portfolio-title">Moje realizacje</h2>
            </div>
            <p className="portfolio-meta">Przeglądaj realizacje według kategorii i wybieraj te, które najlepiej odpowiadają Twoim potrzebom.</p>
          </div>

          <div className="portfolio-filters" role="tablist" aria-label="Filtry realizacji">
            {filterOptions.map(option => (
              <button
                key={option.key}
                type="button"
                className={`portfolio-filter${activeCategory === option.key ? ' is-active' : ''}`}
                onClick={() => setActiveCategory(option.key)}
                aria-pressed={activeCategory === option.key}
              >
                {option.label}
              </button>
            ))}
          </div>

          {filteredItems.length > 0 ? (
            <div className="portfolio-grid">
              {filteredItems.map((item, index) => (
                <article key={item.id} className="card group">
                  <button
                    type="button"
                    className="card-trigger"
                    onClick={() => openLightbox(index)}
                    aria-label={`Otwórz zdjęcie: ${item.title}`}
                  >
                    <div className="card-media">
                      <picture>
                        <source type="image/webp" srcSet={item.srcset} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                        <img src={item.previewSrc} alt={item.title} loading="lazy" decoding="async" />
                      </picture>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="portfolio-empty">Brak realizacji w tej kategorii.</div>
          )}
        </div>
      </section>

      {activeItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Powiększony widok zdjęcia ${activeItem.title}`}
          onClick={closeLightbox}
        >
          <div className="lightbox-shell" onClick={event => event.stopPropagation()}>
            <div className="lightbox-toolbar">
              <p className="lightbox-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}</p>
              <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Zamknij galerię">Zamknij</button>
            </div>

            <div className="lightbox-stage">
              <button type="button" className="lightbox-nav lightbox-nav-prev" onClick={showPrevious} aria-label="Poprzednie zdjęcie">
                ‹
              </button>

              <figure className="lightbox-figure">
                <picture>
                  <source type="image/webp" srcSet={activeItem.srcset} sizes="100vw" />
                  <img className="lightbox-image" src={activeItem.src} alt={activeItem.title} decoding="async" />
                </picture>
              </figure>

              <button type="button" className="lightbox-nav lightbox-nav-next" onClick={showNext} aria-label="Następne zdjęcie">
                ›
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
