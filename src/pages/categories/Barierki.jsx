import React from "react";
import CategoryContactCta from "../../components/CategoryContactCta";
import CategoryGallery from "../../components/CategoryGallery";
import CategoryNavigation from "../../components/CategoryNavigation";

export default function Barierki() {
  return (
    <section className="portfolio-wrap">
      <div className="site-container">
        <CategoryNavigation activeCategoryKey="barierki" />
        <header className="category-intro">
          <h1 className="portfolio-title">Barierki metalowe</h1>
          <p className="portfolio-meta">
            Barierki zabezpieczają wejścia, podesty i schody. Konstrukcja,
            rozstaw elementów oraz wykończenie są dobierane do funkcji miejsca i
            otoczenia.
          </p>
          <p className="portfolio-meta">
            Wykonujemy barierki metalowe do schodów, wejść i podestów, o
            prostym lub bardziej dekoracyjnym układzie. Punktem wyjścia mogą być
            wymiary, zdjęcia miejsca albo gotowy projekt.
          </p>
        </header>
        <div>
          <CategoryGallery categoryKey="barierki" />
        </div>
        <CategoryContactCta />
      </div>
    </section>
  );
}
