import React, { useEffect, useState } from 'react'
import Head from './components/Head'
import Home, { frontmatter as homeFrontmatter } from './pages/Home'
import Portfolio, { frontmatter as portfolioFrontmatter } from './pages/Portfolio'
import logoMark from '../assets/raw/favicon.svg'
import './styles/globals.css'

function normalizePath(p) {
  try {
    const url = new URL(p, location.origin)
    const path = (url.pathname || '/').replace(/\/\/+$/, '') || '/'
    return path
  } catch (e) {
    return '/'
  }
}

export default function App(){
  const initialRoute = normalizePath(window.location.pathname)
  const [route, setRoute] = useState(initialRoute)
  const [frontmatter, setFrontmatter] = useState({})
  const [isHeaderTransparent, setIsHeaderTransparent] = useState(false)

  // update frontmatter when route changes
  useEffect(() => {
    if (route === '/') setFrontmatter(homeFrontmatter || {})
    else if (route === '/portfolio') setFrontmatter(portfolioFrontmatter || {})
    else setFrontmatter({})
  }, [route])

  // handle back/forward browser buttons
  useEffect(() => {
    const onPop = () => setRoute(normalizePath(window.location.pathname))
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
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

  // Intercept internal link clicks and navigate via History API (SPA navigation)
  useEffect(() => {
    function onDocClick(e) {
      const a = e.target.closest && e.target.closest('a')
      if (!a) return
      const href = a.getAttribute('href')
      if (!href) return
      const target = a.getAttribute('target')
      const download = a.getAttribute('download')
      if (target && target !== '_self') return
      if (download) return
      if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return
      try {
        const url = new URL(href, location.href)
        if (url.origin !== location.origin) return
        // Only handle same-origin path navigation
        e.preventDefault()
        const newPath = normalizePath(url.pathname + url.search + url.hash)
        if (newPath !== route) {
          history.pushState({}, '', url.pathname + url.search + url.hash)
          setRoute(newPath)
        } else {
          // same path: ensure state updates if needed
          setRoute(newPath)
        }
      } catch (err) {
        // ignore invalid URLs
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [route])

  return (
    <main className="site-shell">
      <Head frontmatter={frontmatter} />
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
            <a href="/portfolio">Realizacje</a>
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
