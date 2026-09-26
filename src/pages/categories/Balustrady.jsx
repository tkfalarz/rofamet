import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function Balustrady() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="balustrady" />
        <header className="category-intro">
          <h1 className="portfolio-title">Balustrady schodowe i wewnętrzne</h1>
          <p className="portfolio-meta">
            Balustrady łączą bezpieczeństwo z charakterem wnętrza. Metalowa
            konstrukcja może współgrać z drewnianą poręczą, a układ wypełnienia
            jest dopasowywany do schodów i przestrzeni.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="balustrady" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
