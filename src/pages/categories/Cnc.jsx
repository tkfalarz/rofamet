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
          <p className="portfolio-meta">
            Wykonujemy wycinanie wzorów z blachy, dekoracyjne panele, napisy i
            detale metalowe, które mogą stanowić samodzielny element lub część
            większej realizacji. Do wyceny przydadzą się wymiary, zdjęcia albo
            projekt. Gotowe elementy po cięciu CNC możemy przygotować do
            wysyłki na terenie Polski.
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
