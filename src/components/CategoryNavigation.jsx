import React from 'react'

import { categoryDefinitions } from '../lib/gallery-categories'

export default function CategoryNavigation({ activeCategoryKey = null }) {
  return (
    <nav className="portfolio-filters" aria-label="Kategorie realizacji">
      <a className={`portfolio-filter${activeCategoryKey ? '' : ' is-active'}`} href="/portfolio/" aria-current={activeCategoryKey ? undefined : 'page'}>
        Wszystkie
      </a>
      {categoryDefinitions.map(category => (
        <a
          key={category.key}
          className={`portfolio-filter${activeCategoryKey === category.key ? ' is-active' : ''}`}
          href={category.path}
          aria-current={activeCategoryKey === category.key ? 'page' : undefined}
        >
          {category.label}
        </a>
      ))}
    </nav>
  )
}