import React, { useEffect, useState } from 'react'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import logoMark from '../assets/raw/favicon.svg'
import './styles/globals.css'

function normalizePath(pathname = '/') {
  if (pathname === '/portfolio' || pathname === '/portfolio/') return '/portfolio/'
  return '/'
}

export default function App({ route = '/' }) {
  const normalizedRoute = normalizePath(route)
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(false)

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
    <main className="site-shell">
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
