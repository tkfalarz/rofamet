import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function Ogrodzenia() {
  return (
    <CategoryPage
      categoryKey="ogrodzenia"
      title="Ogrodzenia metalowe"
      description="Ogrodzenia metalowe dopasowane do posesji i jej otoczenia. Wykonujemy przęsła z prostym lub dekoracyjnym wypełnieniem, aby całość współgrała z architekturą budynku."
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
        </header>
        <div>
          <CategoryGallery categoryKey={categoryKey} />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
