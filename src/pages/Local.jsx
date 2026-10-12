import React from 'react'
import { GOOGLE_DIRECTIONS_URL, GOOGLE_MAPS_URL, GOOGLE_MAP_EMBED_URL, localBusinessJsonLd } from '../lib/seo'

export default function Local() {
  return (
    <div className="site-container local-page">
      <nav className="local-breadcrumb" aria-label="Ścieżka nawigacji">
        <a href="/">Start</a><span aria-hidden="true"> / </span><span aria-current="page">Lokalizacja</span>
      </nav>

      <section className="local-intro" aria-labelledby="local-title">
        <div>
          <p className="section-kicker">Rofamet · Korczyna, Biecz</p>
          <h1 id="local-title" className="portfolio-title">Bramy i konstrukcje stalowe — Biecz, Gorlice, Jasło</h1>
          <p className="local-lead">Bramy, ogrodzenia, balustrady i konstrukcje stalowe — produkcja i montaż w Bieczu, Gorlicach, Jaśle i okolicy.</p>
          <div className="local-actions">
            <a className="btn-primary" href="tel:+48513642695">Zadzwoń: {localBusinessJsonLd.telephone}</a>
            <a className="btn-secondary portfolio-cta-email" href={GOOGLE_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">Wyznacz trasę</a>
          </div>
        </div>
        <aside className="panel" aria-labelledby="local-address-title">
          <p className="panel-kicker">Adres firmy</p>
          <h2 id="local-address-title" className="panel-title">Rofamet</h2>
          <address className="panel-body local-address">
            Korczyna 286<br />38-340 Biecz<br />
            <a href="tel:+48513642695">{localBusinessJsonLd.telephone}</a><br />
            <a href="mailto:rofamet@op.pl">{localBusinessJsonLd.email}</a>
          </address>
        </aside>
      </section>

      <section className="local-section" aria-labelledby="local-map-title">
        <h2 id="local-map-title" className="home-section-title">Znajdź Rofamet</h2>
        <iframe
          className="local-map"
          title="Mapa Google — Rofamet, Korczyna 286, 38-340 Biecz"
          src={GOOGLE_MAP_EMBED_URL}
          width="1180"
          height="420"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <a className="local-service-link" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">Profil Rofamet w Google Maps</a>
      </section>

      <section className="local-section panel local-reviews" aria-labelledby="local-reviews-title">
        <h2 id="local-reviews-title" className="panel-title">Opinie w Google</h2>
        <p className="local-rating" aria-label="Ocena 5,0 na 5 na podstawie 3 opinii widocznych obecnie w profilu Google">
          <span aria-hidden="true">★★★★★</span> <strong>5,0/5</strong> <span>· 3 opinie w profilu Google</span>
        </p>
        <a className="local-service-link" href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">Zobacz profil i opinie →</a>
      </section>
    </div>
  )
}