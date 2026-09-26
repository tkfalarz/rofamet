import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function MebleLoft() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="meble-loft" />
        <header className="category-intro">
          <h1 className="portfolio-title">Meble loft</h1>
          <p className="portfolio-meta">
            Meble loft wykorzystują metalową konstrukcję jako wyrazisty element
            wnętrza. Mogą łączyć stal z drewnem, tworząc funkcjonalne meble
            dopasowane do przestrzeni i sposobu użytkowania.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="meble-loft" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}