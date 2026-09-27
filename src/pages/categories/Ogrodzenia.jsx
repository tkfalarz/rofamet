import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function Ogrodzenia() {
  return (
    <CategoryPage
      categoryKey="ogrodzenia"
      title="Ogrodzenia metalowe"
      description="Ogrodzenia metalowe wyznaczają granice posesji i wpływają na wygląd całej nieruchomości. Wykonujemy przęsła z prostym lub dekoracyjnym wypełnieniem, aby całość współgrała z architekturą budynku i istniejącą zabudową."
    />
  );
}

function CategoryPage({ categoryKey, title, description }) {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey={categoryKey} />
        <header className="category-intro">
          <h1 className="portfolio-title">{title}</h1>
          <p className="portfolio-meta">{description}</p>
          <p className="portfolio-meta">W zależności od ustaleń realizacja może obejmować także przęsła ogrodzeniowe, furtki oraz elementy strefy wjazdu. Obsługujemy klientów z Biecza, Gorlic, Jasła i okolic, oferując wykonanie oraz montaż ogrodzeń metalowych. Gotowe elementy możemy również przygotować do wysyłki na terenie Polski.</p>
        </header>
        <div>
          <CategoryGallery categoryKey={categoryKey} />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
