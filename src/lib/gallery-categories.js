export const categoryDefinitions = [
  {
    key: 'architektura-ogrodowa',
    label: 'Architektura ogrodowa',
    path: '/portfolio/architektura-ogrodowa/',
    title: 'Architektura ogrodowa — Rofamet | Biecz i Gorlice',
    description: 'Stalowa architektura ogrodowa dopasowana do przestrzeni wokół domu. Zobacz realizacje Rofamet i zapytaj o projekt w Bieczu lub Gorlicach.',
    content: 'Stalowe elementy architektury ogrodowej pomagają uporządkować przestrzeń wokół domu i nadać jej indywidualny charakter. Forma, proporcje oraz detal są dobierane do otoczenia i planowanego zastosowania. Każdy projekt może łączyć funkcję użytkową z wyrazistym, trwałym wykończeniem.'
  },
  {
    key: 'balkony-francuskie',
    label: 'Balkony francuskie',
    path: '/portfolio/balkony-francuskie/',
    title: 'Balkony francuskie — Rofamet | Biecz i Gorlice',
    description: 'Balkony francuskie dopasowane do okien i elewacji budynku. Poznaj realizacje Rofamet oraz możliwości wykonania w Bieczu i Gorlicach.',
    content: 'Balkony francuskie zabezpieczają otwory okienne i stanowią ważny detal elewacji. Ich forma może być oszczędna albo bardziej dekoracyjna, zależnie od charakteru budynku. Projekt jest dopasowywany do proporcji okna, układu fasady oraz oczekiwanego efektu wizualnego.'
  },
  {
    key: 'balustrady',
    label: 'Balustrady',
    path: '/portfolio/balustrady/',
    title: 'Balustrady — Rofamet | Biecz i Gorlice',
    description: 'Balustrady do schodów i wnętrz łączące metalową konstrukcję z drewnianym wykończeniem. Zobacz realizacje Rofamet z Biecza i Gorlic.',
    content: 'Balustrady schodowe łączą bezpieczeństwo z charakterem wnętrza. Metalowa konstrukcja może współgrać z drewnianym wykończeniem, tworząc spójny detal przy schodach i na antresoli. Liczą się proporcje, rytm wypełnienia oraz dopasowanie formy do pozostałych materiałów we wnętrzu.'
  },
  {
    key: 'barierki',
    label: 'Barierki',
    path: '/portfolio/barierki/',
    title: 'Barierki — Rofamet | Biecz i Gorlice',
    description: 'Barierki do wejść, podestów i schodów, dopasowane do konkretnej przestrzeni. Zobacz realizacje Rofamet z Biecza i Gorlic.',
    content: 'Barierki wyznaczają i zabezpieczają przestrzeń przy wejściach, podestach oraz schodach. Ich układ powinien odpowiadać funkcji miejsca, a jednocześnie dobrze komponować się z otoczeniem. Konstrukcja, rozstaw elementów i wykończenie są dobierane indywidualnie do konkretnej realizacji.'
  },
  {
    key: 'bramy',
    label: 'Bramy',
    path: '/portfolio/bramy/',
    title: 'Bramy — Rofamet | Biecz i Gorlice',
    description: 'Bramy dopasowane do posesji, wjazdu i charakteru budynku. Zobacz realizacje Rofamet z Biecza i Gorlic.',
    content: 'Bramy porządkują strefę wjazdu i stanowią wyraźny element całej posesji. Ich forma może być prosta lub dekoracyjna, zależnie od charakteru budynku i oczekiwanego efektu. Odpowiednie proporcje, podziały oraz detale pozwalają połączyć funkcję użytkową z dopracowanym wyglądem.'
  },
  {
    key: 'ogrodzenia',
    label: 'Ogrodzenia',
    path: '/portfolio/ogrodzenia/',
    title: 'Ogrodzenia — Rofamet | Biecz i Gorlice',
    description: 'Ogrodzenia dopasowane do posesji i jej otoczenia. Zobacz realizacje Rofamet z Biecza i Gorlic.',
    content: 'Ogrodzenie wyznacza granice posesji i wpływa na jej wygląd od strony ulicy. Metalowe przęsła mogą tworzyć nowoczesną, prostą formę lub bardziej dekoracyjne uzupełnienie zabudowy. Układ, wysokość i detal powinny współgrać z budynkiem oraz charakterem otoczenia.'
  },
  {
    key: 'cnc',
    label: 'Cięcie blach CNC',
    path: '/portfolio/cnc/',
    title: 'Cięcie blach CNC — Rofamet | Biecz i Gorlice',
    description: 'Cięcie blach CNC do wzorów, detali i metalowych elementów użytkowych. Sprawdź realizacje Rofamet z Biecza i Gorlic.',
    content: 'Cięcie blach CNC pozwala precyzyjnie tworzyć wzory, detale i elementy użytkowe z metalu. Sprawdza się przy realizacjach dekoracyjnych oraz częściach większych projektów, gdzie liczy się powtarzalność formy. Punktem wyjścia może być gotowy projekt lub wspólnie ustalony motyw.'
  },
  {
    key: 'konstrukcje-stalowe',
    label: 'Konstrukcje stalowe',
    path: '/portfolio/konstrukcje-stalowe/',
    title: 'Konstrukcje stalowe — Rofamet | Biecz i Gorlice',
    description: 'Konstrukcje stalowe projektowane pod konkretne zastosowanie i warunki przestrzenne. Zobacz realizacje Rofamet z Biecza i Gorlic.',
    content: 'Konstrukcje stalowe są projektowane pod konkretne zastosowanie, wymiary i warunki przestrzenne. Ich forma zależy od funkcji, którą mają pełnić, oraz od sposobu połączenia z pozostałymi elementami inwestycji. Starannie przygotowany układ przekłada się na spójny, trwały efekt końcowy.'
  },
  {
    key: 'meble-loft',
    label: 'Meble loft',
    path: '/portfolio/meble-loft/',
    title: 'Meble loft — Rofamet | Biecz i Gorlice',
    description: 'Meble loft z metalową konstrukcją, tworzone z myślą o indywidualnym wnętrzu. Zobacz realizacje Rofamet z Biecza i Gorlic.',
    content: 'Meble loft wykorzystują metalową konstrukcję jako wyrazisty element wyposażenia wnętrza. Mogą łączyć ją z drewnem lub innymi materiałami, tworząc funkcjonalne meble o indywidualnej formie. Układ, proporcje i wykończenie są dopasowywane do przestrzeni oraz planowanego sposobu użytkowania.'
  }
]

export const defaultCategory = 'konstrukcje-stalowe'

export function getCategoryLabel(categoryKey) {
  return (
    categoryDefinitions.find((option) => option.key === categoryKey)?.label ??
    categoryKey ??
    defaultCategory
  );
}

export function getCategoryByPath(pathname) {
  return categoryDefinitions.find(category => category.path === pathname) ?? null
}
