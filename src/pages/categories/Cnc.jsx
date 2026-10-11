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
          <h2 className="category-intro-title">CNC — co to jest?</h2>
          <p className="portfolio-meta">
            CNC (ang. Computerized Numerical Control) to komputerowe sterowanie
            numeryczne maszyną. Podczas wycinania blachy w technologii CNC
            maszyna odwzorowuje kształty z projektu, co pozwala precyzyjnie
            wycinać wzory w blasze i innych elementach metalowych.
          </p>
          <h2 className="category-intro-title">
            Co można wyciąć z blachy CNC?
          </h2>
          <p className="portfolio-meta">
            Oferujemy cięcie blach stalowych z wykorzystaniem CNC oraz
            wycinanie wzorów i kształtów z blachy. Wykonujemy dekoracyjne
            panele, napisy i detale metalowe, które mogą być samodzielnymi
            elementami lub częścią większej realizacji. Podstawą może być gotowy
            projekt albo motyw ustalony wspólnie.
          </p>
          <h2 className="category-intro-title">
            Jak zamówić wycinanie blachy CNC?
          </h2>
          <p className="portfolio-meta">
            Aby otrzymać wycenę, prześlij projekt, wymiary lub zdjęcie
            planowanego elementu. Gotowe detale możemy przygotować do wysyłki
            na terenie Polski.
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
