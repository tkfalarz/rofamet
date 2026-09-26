import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function ArchitekturaOgrodowa() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="architektura-ogrodowa" />
        <header className="category-intro">
          <h1 className="portfolio-title">Stalowa architektura ogrodowa</h1>
          <p className="portfolio-meta">
            Stalowe elementy architektury ogrodowej pomagają uporządkować
            przestrzeń wokół domu i nadać jej indywidualny charakter. Każdy
            projekt może łączyć funkcję użytkową z trwałym wykończeniem.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="architektura-ogrodowa" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
