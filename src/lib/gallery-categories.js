export const categoryDefinitions = [
  {
    key: "architektura-ogrodowa",
    label: "Architektura ogrodowa",
    path: "/portfolio/architektura-ogrodowa/",
    title: "Architektura ogrodowa ze stali | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Projektujemy i wykonujemy stalową architekturę ogrodową: paleniska, dekoracje i elementy do ogrodu. Biecz, Gorlice, Jasło i okolice.",
  },
  {
    key: "balkony-francuskie",
    label: "Balkony francuskie",
    path: "/portfolio/balkony-francuskie/",
    title: "Balkony francuskie | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Wykonujemy balkony francuskie dopasowane do okien i elewacji budynku. Zapytaj o realizację w Bieczu, Gorlicach, Jaśle i okolicy.",
  },
  {
    key: "balustrady",
    label: "Balustrady",
    path: "/portfolio/balustrady/",
    title: "Balustrady schodowe | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Wykonujemy balustrady schodowe i wewnętrzne z metalową konstrukcją i drewnianą poręczą. Realizacje w Bieczu, Gorlicach, Jaśle i okolicy.",
  },
  {
    key: "barierki",
    label: "Barierki",
    path: "/portfolio/barierki/",
    title: "Barierki metalowe | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Wykonujemy barierki metalowe do wejść, podestów i schodów. Zapytaj o realizację oraz montaż w Bieczu, Gorlicach, Jaśle i okolicy.",
  },
  {
    key: "bramy",
    label: "Bramy",
    path: "/portfolio/bramy/",
    title: "Bramy metalowe | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Wykonujemy bramy metalowe dopasowane do wjazdu i stylu posesji. Zapytaj o realizację oraz montaż w Bieczu, Gorlicach, Jaśle i okolicy.",
  },
  {
    key: "ogrodzenia",
    label: "Ogrodzenia",
    path: "/portfolio/ogrodzenia/",
    title: "Ogrodzenia metalowe | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Wykonujemy ogrodzenia metalowe: przęsła, furtki i dekoracyjne elementy. Zapytaj o wykonanie oraz montaż w Bieczu, Gorlicach, Jaśle i okolicy.",
  },
  {
    key: "cnc",
    label: "Cięcie blach CNC",
    path: "/portfolio/cnc/",
    title: "Cięcie blach CNC i dekoracje | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Precyzyjne cięcie blach CNC na zamówienie: dekoracyjne panele, napisy, wzory i detale metalowe. Obsługujemy Biecz, Gorlice, Jasło i okolice.",
  },
  {
    key: "konstrukcje-stalowe",
    label: "Konstrukcje stalowe",
    path: "/portfolio/konstrukcje-stalowe/",
    title: "Konstrukcje stalowe | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Wykonujemy konstrukcje stalowe dopasowane do funkcji, wymiarów i warunków inwestycji. Realizacje w Bieczu, Gorlicach, Jaśle i okolicy.",
  },
  {
    key: "meble-loft",
    label: "Meble loft",
    path: "/portfolio/meble-loft/",
    title: "Meble loft | Biecz, Gorlice, Jasło | Rofamet",
    description:
      "Tworzymy meble loft: stoły, stelaże, łóżka i inne elementy z metalu oraz drewna. Realizacje dla klientów z Biecza, Gorlic, Jasła i okolicy.",
  },
];

export const defaultCategory = "konstrukcje-stalowe";

export function getCategoryLabel(categoryKey) {
  return (
    categoryDefinitions.find((option) => option.key === categoryKey)?.label ??
    categoryKey ??
    defaultCategory
  );
}

export function getCategoryByPath(pathname) {
  return (
    categoryDefinitions.find((category) => category.path === pathname) ?? null
  );
}
