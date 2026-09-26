import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import ArchitekturaOgrodowa from './pages/categories/ArchitekturaOgrodowa'
import BalkonyFrancuskie from './pages/categories/BalkonyFrancuskie'
import Balustrady from './pages/categories/Balustrady'
import Barierki from './pages/categories/Barierki'
import Bramy from './pages/categories/Bramy'
import Cnc from './pages/categories/Cnc'
import KonstrukcjeStalowe from './pages/categories/KonstrukcjeStalowe'
import MebleLoft from './pages/categories/MebleLoft'
import Ogrodzenia from './pages/categories/Ogrodzenia'
import logoMark from '../assets/raw/favicon.svg'
import { getCategoryByPath } from './lib/gallery-categories'
import './styles/globals.css'

function normalizePath(pathname = '/') {
  if (pathname === '/') return '/'
  return pathname.endsWith('/') ? pathname : `${pathname}/`
}

const categoryPages = {
  'architektura-ogrodowa': ArchitekturaOgrodowa,
  'balkony-francuskie': BalkonyFrancuskie,
  balustrady: Balustrady,
  barierki: Barierki,
  bramy: Bramy,
  cnc: Cnc,
  'konstrukcje-stalowe': KonstrukcjeStalowe,
  'meble-loft': MebleLoft,
  ogrodzenia: Ogrodzenia
}

export default function App({ route = '/' }) {
  const normalizedRoute = normalizePath(route)
  const category = getCategoryByPath(normalizedRoute)
  const CategoryPage = category ? categoryPages[category.key] : null
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(
    normalizedRoute === '/' || normalizedRoute === '/portfolio/'
  )

  // header transparency when over hero (transparent) and solid after scroll
  useEffect(() => {
    const hasHero = normalizedRoute === '/' || normalizedRoute === '/portfolio/'
    function updateHeader() {
      if (!hasHero) {
        setIsHeaderTransparent(false)
        return
      }
      setIsHeaderTransparent(window.scrollY < 60)
    }
    updateHeader()
    window.addEventListener('scroll', updateHeader)
    return () => window.removeEventListener('scroll', updateHeader)
  }, [normalizedRoute])

  return (
    <main className={`site-shell${CategoryPage ? " category-page-shell" : ""}`}>
      <header className={`site-header ${isHeaderTransparent ? 'header-transparent' : 'header-solid'}`}>
        <div className="header-inner">
          <a href="/" className="brand-mark" aria-label="Rofamet - strona główna">
            <span className="brand-badge" aria-hidden="true">
              <img className="brand-badge-image" src={logoMark} alt="" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">Rofamet</span>
              <span className="brand-tagline">Konstrukcje stalowe i bramy</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Główna nawigacja">
            <a href="/">Start</a>
            <a href="/portfolio/">Realizacje</a>
            <a className="nav-cta" href="/#contact-tile">Kontakt</a>
          </nav>
        </div>
      </header>

      {normalizedRoute === '/' ? (
        <Home />
      ) : normalizedRoute === '/portfolio/' ? (
        <Portfolio />
      ) : CategoryPage ? (
        <CategoryPage />
      ) : (
        <section className="not-found">
          <p className="panel-kicker">404</p>
          <h2 className="portfolio-title">Strona nie znaleziona</h2>
          <p className="portfolio-meta">Sprawdź dostępne realizacje albo wróć na stronę główną.</p>
        </section>
      )}
    </main>
  )
}
