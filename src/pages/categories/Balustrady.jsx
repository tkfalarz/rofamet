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
          <p className="portfolio-meta">
            Wykonujemy balustrady stalowe do nowych budynków oraz
            modernizowanych wnętrz. Rozmiar, kształt i wygląd ustalamy na
            podstawie miejsca, projektu lub przesłanych zdjęć i wymiarów dla
            klientów z Biecza, Gorlic, Jasła i okolic. Gotowe elementy możemy
            przygotować do wysyłki, jeśli realizacja nie wymaga naszego montażu.
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
