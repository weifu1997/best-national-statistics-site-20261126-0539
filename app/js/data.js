// China in Numbers — the figures the site shows.
//
// Every number here comes from an official release of the National Bureau of
// Statistics of China (NBS) unless a line names another publisher. The two
// workhorses are the Statistical Communiqué on National Economic and Social
// Development (published each February for the year just ended) and the
// Seventh National Population Census (reference time 1 Nov 2020, released
// May 2021). Series are the figures as published in each year's communiqué.

window.CN_DATA = {
  // Headline cards for the home page. Source: NBS, 2024 Statistical Communiqué.
  headline: [
    { value: '1,408.28', unit: 'million', label: 'Population, end of 2024', note: 'Down 1.39 million on the year; births 9.54M, deaths 10.93M.' },
    { value: '¥134.91', unit: 'trillion', label: 'Gross domestic product, 2024', note: 'Up 5.0% in real terms; ¥95,749 per person.' },
    { value: '¥41,314', unit: 'per person', label: 'Disposable income, 2024', note: 'Up 5.1% in real terms; the median was ¥34,707.' },
    { value: '67.00', unit: 'percent', label: 'Urbanisation rate, end of 2024', note: '943.50 million urban residents, up 0.84 points on the year.' },
  ],

  // Decade series, 2015-2024, for the switchable home chart.
  series: {
    years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
    gdpGrowth: { // real GDP growth, %, as published in each year's communiqué
      label: 'Real GDP growth', unit: '%',
      values: [6.9, 6.7, 6.9, 6.6, 6.1, 2.3, 8.1, 3.0, 5.2, 5.0],
    },
    births: { // births, millions of people
      label: 'Births', unit: 'million',
      values: [16.55, 17.86, 17.23, 15.23, 14.65, 12.02, 10.62, 9.56, 9.02, 9.54],
    },
    income: { // per-capita disposable income, yuan
      label: 'Disposable income per person', unit: '¥',
      values: [21966, 23821, 25974, 28228, 30733, 32189, 35128, 36883, 39218, 41314],
    },
    population: { // year-end population, millions
      label: 'Year-end population', unit: 'million',
      values: [1374.62, 1382.71, 1390.08, 1395.38, 1400.05, 1412.12, 1412.60, 1411.75, 1409.67, 1408.28],
    },
  },

  // Population at each national census (mainland, millions). NBS census releases.
  censusTotals: [
    { year: 1982, total: 1008.18 },
    { year: 1990, total: 1133.68 },
    { year: 2000, total: 1265.83 },
    { year: 2010, total: 1339.72 },
    { year: 2020, total: 1411.78 },
  ],

  // Age structure at the last two censuses, % of the population. NBS census releases.
  censusAge: {
    2010: [
      { group: 'Aged 0-14', share: 16.60 },
      { group: 'Aged 15-59', share: 70.14 },
      { group: 'Aged 60 and over', share: 13.26 },
    ],
    2020: [
      { group: 'Aged 0-14', share: 17.95 },
      { group: 'Aged 15-59', share: 63.35 },
      { group: 'Aged 60 and over', share: 18.70 },
    ],
  },

  // The 2024 population snapshot. Source: NBS, 2024 Statistical Communiqué.
  population2024: [
    { label: 'Births in 2024', value: '9.54 million', note: 'Birth rate 6.77 per thousand, up from 9.02 million births in 2023.' },
    { label: 'Deaths in 2024', value: '10.93 million', note: 'Death rate 7.76 per thousand; natural growth −0.99 per thousand.' },
    { label: 'Working age (16-59)', value: '857.98 million', note: '60.9% of the population.' },
    { label: 'Aged 60 and over', value: '310.31 million', note: '22.0% of the population; 220.23 million are 65 and over (15.6%).' },
    { label: 'Men / women', value: '719.09M / 689.19M', note: 'Sex ratio 104.34 women = 100.' },
    { label: 'Average household size, 2020 census', value: '2.62 people', note: 'Down from 3.10 in 2010; 494.16 million family households.' },
  ],

  // GDP by sector, 2024. Source: NBS, 2024 Statistical Communiqué.
  gdpSectors: [
    { sector: 'Services', value: 765583, share: 56.7, growth: 5.0 },
    { sector: 'Industry & construction', value: 492087, share: 36.5, growth: 5.3 },
    { sector: 'Agriculture', value: 91414, share: 6.8, growth: 3.5 },
  ],
  gdpQuarters2024: [ // real GDP growth by quarter of 2024, %, year on year
    { quarter: 'Q1', growth: 5.3 },
    { quarter: 'Q2', growth: 4.7 },
    { quarter: 'Q3', growth: 4.6 },
    { quarter: 'Q4', growth: 5.4 },
  ],

  // The twelve largest provincial economies, GDP 2024 in ¥100 million and real
  // growth. Sources: the provinces' own 2024 statistical communiqués.
  provinces: [
    { name: 'Guangdong', gdp: 141634, growth: 3.8 },
    { name: 'Jiangsu', gdp: 137008, growth: 5.5 },
    { name: 'Shandong', gdp: 98566, growth: 5.7 },
    { name: 'Zhejiang', gdp: 90031, growth: 5.5 },
    { name: 'Sichuan', gdp: 64697, growth: 5.7 },
    { name: 'Henan', gdp: 63590, growth: 5.1 },
    { name: 'Hubei', gdp: 60013, growth: 5.8 },
    { name: 'Fujian', gdp: 57761, growth: 5.5 },
    { name: 'Shanghai', gdp: 53927, growth: 5.0 },
    { name: 'Hunan', gdp: 53231, growth: 4.8 },
    { name: 'Anhui', gdp: 50625, growth: 5.8 },
    { name: 'Beijing', gdp: 49843, growth: 5.2 },
  ],

  // Economy cards. Source: NBS, 2024 Statistical Communiqué.
  economyCards: [
    { label: 'Retail sales of consumer goods', value: '¥48.79 trillion', note: 'Up 3.5%. Online retail was ¥15.52 trillion, and physical goods bought online made up 26.8% of all retail sales.' },
    { label: 'Goods trade with the world', value: '¥43.85 trillion', note: 'Up 5.0%: exports ¥25.45 trillion (+7.1%), imports ¥18.39 trillion (+2.3%). Trade with Belt and Road partners was 50.3% of the total.' },
    { label: 'Fixed-asset investment', value: '¥51.44 trillion', note: 'Up 3.2%. Manufacturing investment rose 9.2% while real-estate development investment fell 10.6%.' },
    { label: 'Consumer prices (CPI)', value: '+0.2%', note: 'Core CPI, excluding food and energy, rose 0.5%. Producer prices (PPI) fell 2.2%.' },
    { label: 'Urban surveyed unemployment', value: '5.1% average', note: '734.39 million people were in work; 299.73 million of them were rural migrant workers.' },
    { label: 'Grain harvest', value: '706.5 million tonnes', note: 'Up 1.6% — the first harvest above 700 million tonnes.' },
  ],

  // Disposable income by fifth of the population, 2024, yuan per person.
  // Source: NBS, 2024 Statistical Communiqué.
  incomeFifths: [
    { group: 'Lowest fifth', income: 9542 },
    { group: 'Lower-middle fifth', income: 21608 },
    { group: 'Middle fifth', income: 33925 },
    { group: 'Upper-middle fifth', income: 53359 },
    { group: 'Highest fifth', income: 98809 },
  ],

  // Society cards. Sources named on each card.
  societyCards: [
    { label: 'Urban vs rural income, 2024', value: '¥54,188 / ¥23,119', note: 'Per-capita disposable income of urban and rural residents; rural incomes grew faster (6.3% vs 4.4% in real terms). NBS, 2024 Statistical Communiqué.' },
    { label: 'Engel coefficient, 2024', value: '29.8%', note: 'Food, tobacco and alcohol as a share of household spending. Per-capita consumption spending was ¥28,227, of which services were 46.1%. NBS, 2024 Statistical Communiqué.' },
    { label: 'Life expectancy, 2024', value: '79.0 years', note: 'Average life expectancy at birth, up from 78.6 years in 2023. National Health Commission.' },
    { label: 'University education, 2020 census', value: '218.36 million people', note: '15,467 of every 100,000 people held a university degree, up from 8,930 in 2010. The illiteracy rate fell to 2.67%. NBS, Seventh National Population Census.' },
    { label: 'Marriages registered, 2024', value: '6.11 million couples', note: 'Marriage registrations fell 20.5% on 2023. Ministry of Civil Affairs.' },
    { label: 'Average weekly working hours, 2024', value: '49.0 hours', note: 'Average for employees of enterprises in the urban survey. NBS, 2024 Statistical Communiqué.' },
  ],

  sources: [
    'National Bureau of Statistics, Statistical Communiqué on National Economic and Social Development 2024 (released February 2025), and the communiqués of 2015-2023 for the decade series.',
    'National Bureau of Statistics, Main Data of the Seventh National Population Census (released May 2021) and of the Sixth Census (2010).',
    'Provincial bureaus of statistics, 2024 statistical communiqués (provincial GDP table).',
    'National Health Commission (life expectancy); Ministry of Civil Affairs (marriage registrations).',
  ],
};
