import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function KonstrukcjeStalowe() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="konstrukcje-stalowe" />
        <header className="category-intro">
          <h1 className="portfolio-title">Konstrukcje stalowe</h1>
          <p className="portfolio-meta">
            Konstrukcje stalowe wykonujemy pod konkretne zastosowanie, wymiary i
            warunki przestrzenne. Forma zależy od funkcji oraz sposobu
            połączenia z pozostałymi elementami inwestycji.
          </p>
          <p className="portfolio-meta">
            Realizujemy konstrukcje stalowe dla budynków mieszkalnych,
            gospodarczych, firm oraz innych obiektów wymagających trwałych
            elementów ze stali. Zakres prac ustalamy z klientami z Biecza,
            Gorlic, Jasła i okolic.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="konstrukcje-stalowe" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
