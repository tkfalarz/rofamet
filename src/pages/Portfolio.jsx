import React from "react";

import manifest from "../../assets/generated/manifest.json";
import CategoryContactCta from "../components/CategoryContactCta";
import CategoryGallery from "../components/CategoryGallery";
import CategoryNavigation from "../components/CategoryNavigation";
import { withBase } from "../lib/site-paths";

const asset = (value) => withBase(value);

function buildResponsiveImageData(imageEntry) {
  const variants = Array.isArray(imageEntry)
    ? imageEntry
    : (imageEntry?.variants ?? []);
  const srcset = variants
    .map((variant) => `${withBase(variant.webp)} ${variant.width}w`)
    .join(", ");
  const src = withBase(variants[variants.length - 1]?.webp ?? "");

  return { src, srcset };
}

function getHeroFromManifest(manifestData) {
  const portfolioHeroEntry = manifestData["portfolio-hero.jpg"];
  const mainHeroEntry = manifestData["main-hero.jpg"];
  const heroEntry = portfolioHeroEntry ?? mainHeroEntry;

  if (heroEntry) {
    const { src, srcset } = buildResponsiveImageData(heroEntry);

    return {
      src,
      srcset,
      sizes: "(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px",
      alt_pl: "Przykładowa realizacja z portfolio",
    };
  }

  return {
    src: asset("assets/generated/og/portfolio.png"),
    srcset: "",
    sizes: "(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px",
    alt_pl: "Portfolio realizacji",
  };
}

export const frontmatter = {
  hero: getHeroFromManifest(manifest),
};

export default function Portfolio() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-media">
          <picture>
            <source
              type="image/webp"
              srcSet={frontmatter.hero.srcset}
              sizes={frontmatter.hero.sizes}
            />
            <img src={frontmatter.hero.src} alt={frontmatter.hero.alt_pl} />
          </picture>
        </div>

        <div className="page-hero-inner">
          <div className="page-hero-copy">
            <p className="eyebrow">Galeria naszych prac</p>
            <h1 className="page-hero-title">
              Realizacje dopasowane do&nbsp;Twoich&nbsp;wizji
            </h1>
          </div>
        </div>
      </section>

      <section className="portfolio-wrap">
        <div className="site-container">
          <CategoryNavigation />

          <div className="category-intro">
            <h2 className="portfolio-title">Wszystkie realizacje</h2>
          </div>

          <CategoryGallery />
          <CategoryContactCta />
        </div>
      </section>
    </>
  );
}
