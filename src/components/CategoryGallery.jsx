import React, { useEffect, useMemo, useState } from 'react'

import manifest from '../../assets/generated/manifest.json'
import { defaultCategory, getCategoryLabel } from '../lib/gallery-categories'
import { portfolioMetadata } from '../lib/portfolio-metadata'
import { withBase } from '../lib/site-paths'

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
      const metadata = portfolioMetadata[filename]
      const categoryLabel = getCategoryLabel(category)

      return {
        id: filename,
        src,
        previewSrc,
        srcset,
        category,
        categoryLabel,
        title: metadata?.title ?? `Realizacja: ${categoryLabel}`,
        alt: metadata?.alt ?? `Realizacja Rofamet: ${categoryLabel.toLowerCase()}`,
        caption: metadata?.caption ?? `Realizacja w kategorii ${categoryLabel}.`
      }
    })
}

export default function CategoryGallery({ categoryKey = null }) {
  const items = useMemo(() => makeItemsFromManifest(manifest), [])
  const filteredItems = useMemo(
    () => categoryKey ? items.filter(item => item.category === categoryKey) : items,
    [categoryKey, items]
  )
  const [activeIndex, setActiveIndex] = useState(null)
  const activeItem = activeIndex === null ? null : filteredItems[activeIndex] ?? null

  useEffect(() => {
    if (activeIndex === null) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event) {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex(index => (index + 1) % filteredItems.length)
      if (event.key === 'ArrowLeft') setActiveIndex(index => (index - 1 + filteredItems.length) % filteredItems.length)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex, filteredItems.length])

  return (
    <>
      {filteredItems.length > 0 ? (
        <div className="portfolio-grid">
          {filteredItems.map((item, index) => (
            <article key={item.id} className="card group">
              <button
                type="button"
                className="card-trigger"
                onClick={() => setActiveIndex(index)}
                aria-label={`Otwórz zdjęcie: ${item.title}`}
              >
                <div className="card-media">
                  <picture>
                    <source type="image/webp" srcSet={item.srcset} sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                    <img src={item.previewSrc} alt={item.alt} loading="lazy" decoding="async" />
                  </picture>
                </div>
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="portfolio-empty">Brak realizacji w tej kategorii.</div>
      )}

      {activeItem ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Powiększony widok zdjęcia ${activeItem.title}`}
          onClick={() => setActiveIndex(null)}
        >
          <div className="lightbox-shell" onClick={event => event.stopPropagation()}>
            <div className="lightbox-toolbar">
              <p className="lightbox-counter">{String(activeIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}</p>
              <button type="button" className="lightbox-close" onClick={() => setActiveIndex(null)} aria-label="Zamknij galerię">Zamknij</button>
            </div>

            <div className="lightbox-stage">
              <button type="button" className="lightbox-nav lightbox-nav-prev" onClick={() => setActiveIndex(index => (index - 1 + filteredItems.length) % filteredItems.length)} aria-label="Poprzednie zdjęcie">‹</button>
              <figure className="lightbox-figure">
                <picture>
                  <source type="image/webp" srcSet={activeItem.srcset} sizes="100vw" />
                  <img className="lightbox-image" src={activeItem.src} alt={activeItem.alt} decoding="async" />
                </picture>
              </figure>
              <button type="button" className="lightbox-nav lightbox-nav-next" onClick={() => setActiveIndex(index => (index + 1) % filteredItems.length)} aria-label="Następne zdjęcie">›</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}