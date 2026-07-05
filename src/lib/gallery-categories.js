export const categoryDefinitions = [
  { key: "architektura-ogrodowa", label: "Architektura ogrodowa" },
  { key: "balkony-francuskie", label: "Balkony francuskie" },
  {
    key: "balustrady-barierki-porecze",
    label: "Balustrady, barierki, poręcze wewnętrzne i zewnętrzne",
  },
  { key: "bramy-ogrodzenia", label: "Bramy i ogrodzenia" },
  { key: "cnc", label: "Cięcie CNC" },
  { key: "konstrukcje-stalowe", label: "Konstrukcje stalowe" },
  { key: "meble-loft", label: "Meble loft" },
];

export const filterOptions = [
  { key: "all", label: "Wszystkie" },
  ...categoryDefinitions,
];
export const defaultCategory = "konstrukcje-stalowe";

export function getCategoryLabel(categoryKey) {
  return (
    categoryDefinitions.find((option) => option.key === categoryKey)?.label ??
    categoryKey ??
    defaultCategory
  );
}
