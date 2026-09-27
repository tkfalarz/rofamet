import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function Bramy() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="bramy" />
        <header className="category-intro">
          <h1 className="portfolio-title">Bramy metalowe</h1>
          <p className="portfolio-meta">
            Bramy porządkują strefę wjazdu i stanowią wyraźny element posesji.
            Wykonujemy konstrukcje o prostej lub dekoracyjnej formie, dopasowane
            do charakteru budynku.
          </p>
          <p className="portfolio-meta">
            Przy ustalaniu realizacji liczą się wymiary wjazdu, układ posesji i
            wygląd pozostałych elementów ogrodzenia. Wykonujemy bramy metalowe
            dla klientów z Biecza, Gorlic, Jasła i okolic, z możliwością montażu.
            W przypadku gotowych elementów sposób transportu i wysyłki ustalamy
            indywidualnie.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="bramy" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
