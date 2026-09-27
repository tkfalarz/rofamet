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
          <p className="portfolio-meta">
            Stalowe balkony francuskie sprawdzają się zarówno w nowych
            budynkach, jak i przy modernizacji istniejących obiektów. Ustalamy
            rozmiar, kształt oraz wygląd zabezpieczenia okiennego odpowiednio
            do miejsca montażu. Gotowe balkony francuskie możemy przygotować do
            wysyłki, zależnie od rodzaju i wielkości zamówienia.
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
