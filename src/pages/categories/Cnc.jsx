import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function Cnc() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="cnc" />
        <header className="category-intro">
          <h1 className="portfolio-title">Cięcie blach CNC</h1>
          <p className="portfolio-meta">
            Cięcie blach CNC pozwala tworzyć precyzyjne wzory, dekoracje i
            elementy użytkowe ze stali. Punktem wyjścia może być gotowy projekt
            albo wspólnie ustalony motyw.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="cnc" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
