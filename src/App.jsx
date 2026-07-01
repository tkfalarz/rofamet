import React, { useEffect, useState } from 'react'
import Head from './components/Head'
import Home, { frontmatter as homeFrontmatter } from './pages/Home'
import Portfolio, { frontmatter as portfolioFrontmatter } from './pages/Portfolio'
import logoMark from '../assets/raw/favicon.svg'
import './styles/globals.css'

function normalizePath(hash) {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  const path = raw || '/'
  return path.replace(/\/\/+$/, '') || '/'
}

export default function App(){
  const initialRoute = normalizePath(window.location.hash)
  const [route, setRoute] = useState(initialRoute)
  const [frontmatter, setFrontmatter] = useState({})
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(false)

  // update frontmatter when route changes
  useEffect(() => {
    if (route === '/') setFrontmatter(homeFrontmatter || {})
    else if (route === '/portfolio') setFrontmatter(portfolioFrontmatter || {})
    else setFrontmatter({})
  }, [route])

  // handle browser hash changes for SPA navigation
  useEffect(() => {
    const onHashChange = () => setRoute(normalizePath(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // header transparency when over hero (transparent) and solid after scroll
  useEffect(() => {
    const hasHero = route === '/' || route === '/portfolio'
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
  }, [route])

  return (
    <main className="site-shell">
      <Head frontmatter={frontmatter} />
      <header className={`site-header ${isHeaderTransparent ? 'header-transparent' : 'header-solid'}`}>
        <div className="header-inner">
          <a href="#/" className="brand-mark" aria-label="Rofamet - strona główna">
            <span className="brand-badge" aria-hidden="true">
              <img className="brand-badge-image" src={logoMark} alt="" />
            </span>
            <span className="brand-copy">
              <span className="brand-name">Rofamet</span>
              <span className="brand-tagline">Konstrukcje stalowe i bramy</span>
            </span>
          </a>

          <nav className="site-nav" aria-label="Główna nawigacja">
            <a href="#/">Start</a>
            <a href="#/portfolio">Realizacje</a>
            <a className="nav-cta" href="mailto:robertos242@onet.pl">Kontakt</a>
          </nav>
        </div>
      </header>

      {route === '/' ? (
        <Home />
      ) : route === '/portfolio' ? (
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
