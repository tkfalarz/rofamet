import React, { useEffect, useMemo, useState } from 'react'

import manifest from '../../assets/generated/manifest.json'

export const frontmatter = {
  title: 'Portfolio — Rofamet',
  description: 'Wybrane realizacje: bramy, furtki i ogrodzenia stalowe — przykłady wykonawstwa i montażu.',
  og_image: 'assets/generated/og/portfolio.png',
  hero: {
    src: 'assets/generated/photo-2026-06-12-16-01-41-1920.webp',
    srcset:
      'assets/generated/photo-2026-06-12-16-01-41-320.webp 320w, assets/generated/photo-2026-06-12-16-01-41-640.webp 640w, assets/generated/photo-2026-06-12-16-01-41-1280.webp 1280w, assets/generated/photo-2026-06-12-16-01-41-1920.webp 1920w',
    sizes: '(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px',
    alt_pl: 'Brama stalowa — przykład realizacji'
  }
}

function makeItemsFromManifest(m) {
  return Object.entries(m).map(([filename, variants]) => {
    const srcset = variants.map(v => `${v.webp} ${v.width}w`).join(', ')
    const src = variants[variants.length - 1].webp
    const previewSrc = variants[Math.max(variants.length - 2, 0)].webp
    const title = filename.replace(/\.[^.]+$/, '').replace(/PHOTO-\d+-/,'').replace(/[-_]/g, ' ')
    return { id: filename, title, src, previewSrc, srcset, variants }
  })
}

export default function Portfolio() {
  const items = useMemo(() => makeItemsFromManifest(manifest), [])
  const [activeIndex, setActiveIndex] = useState(null)
  const activeItem = activeIndex === null ? null : items[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        return
      }

      if (event.key === 'ArrowRight') {
        setActiveIndex(currentIndex => (currentIndex + 1) % items.length)
      }

      if (event.key === 'ArrowLeft') {
        setActiveIndex(currentIndex => (currentIndex - 1 + items.length) % items.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, items.length])

  function openLightbox(index) {
    setActiveIndex(index)
  }

  function closeLightbox() {
    setActiveIndex(null)
  }

  function showPrevious() {
    setActiveIndex(currentIndex => (currentIndex - 1 + items.length) % items.length)
  }

  function showNext() {
    setActiveIndex(currentIndex => (currentIndex + 1) % items.length)
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
            <h1 className="page-hero-title">Portfolio stalowych konstrukcji i bram.</h1>
            <p className="page-hero-text">Przegląd przykładowych montaży i wykonawstwa. Układ pozostaje prosty, zdjęcia są na pierwszym planie, a siatka jest równa i czytelna.</p>
          </div>
        </div>
      </section>

      <section className="portfolio-wrap">
        <div className="site-container">
          <div className="portfolio-header">
            <div>
              <p className="panel-kicker">Galeria</p>
              <h2 className="portfolio-title">Nasze realizacje</h2>
            </div>
            <p className="portfolio-meta">Kwadratowe kadry, spokojne opisy i mocny nacisk na samą realizację. To odpowiada wybranemu przez Ciebie industrialnemu kierunkowi.</p>
          </div>

          <div className="portfolio-grid">
          {items.map((item, index) => (
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
                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-copy">Krótki opis projektu — stalowa konstrukcja i montaż. Kliknij, aby otworzyć większy widok.</p>
                </div>
              </button>
            </article>
          ))}
          </div>
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
              <p className="lightbox-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</p>
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
                <figcaption className="lightbox-caption">
                  <strong>{activeItem.title}</strong>
                  <span>Użyj strzałek na klawiaturze lub przycisków, aby przełączać zdjęcia.</span>
                </figcaption>
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
