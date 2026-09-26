import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function BalkonyFrancuskie() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="balkony-francuskie" />
        <header className="category-intro">
          <h1 className="portfolio-title">Balkony francuskie</h1>
          <p className="portfolio-meta">
            Balkony francuskie zabezpieczają otwory okienne i stanowią ważny
            detal elewacji. Ich proporcje i forma są dopasowywane do konkretnego
            okna oraz architektury budynku.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="balkony-francuskie" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
