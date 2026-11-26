// Holds all supplied statistics and reference metadata; this module never fetches data.
export const DATA = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  headline: { population: 284.4, gdp: 22139, gdpUSD: 1.40, gdpPerCapita: 78.6, gdpPerCapitaUSD: 4980, growth: 5.03, inflation: 1.57, unemployment: 4.91, poverty: 9.03, povertyPeople: 25.2, ipm: 75.02, provinces: 38, landArea: 1904569, islands: 'more than 17,000' },
  series: {
    gdpGrowth: [5.02, -2.07, 3.70, 5.31, 5.05, 5.03],
    gdpCurrentPrices: [15833, 15443, 16977, 19588, 20892, 22139],
    gdpPerCapita: [59.1, 56.9, 62.2, 71.0, 75.0, 78.6],
    inflationDecember: [2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
    unemploymentAugust: [5.23, 7.07, 6.49, 5.86, 5.32, 4.91],
    povertyMarch: [9.41, 9.78, 10.14, 9.54, 9.36, 9.03],
    giniMarch: [0.380, 0.381, 0.384, 0.381, 0.388, 0.379],
    ipm: [71.92, 71.94, 72.29, 72.91, 74.39, 75.02]
  },
  population: {
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    millions: [270.20, 272.68, 275.77, 278.69, 281.60, 284.44],
    urbanShare: 58.6, density: 149, javaShare: 55.9, sexRatio: 102.7, medianAge: 30.4,
    lifeExpectancy: 74.2, fertility: 2.1, householdSize: 3.9,
    ages: [
      ['0–4',7.9,51.2],['5–9',8.1,51.1],['10–14',8.4,51.0],['15–19',8.3,50.9],
      ['20–24',8.4,50.8],['25–29',8.3,50.7],['30–34',8.0,50.6],['35–39',7.6,50.5],
      ['40–44',7.1,50.4],['45–49',6.4,50.2],['50–54',5.6,50.0],['55–59',4.7,49.6],
      ['60–64',3.8,49.0],['65–69',2.9,48.2],['70–74',2.0,47.2],['75+',2.5,44.5]
    ].map(([label, value, maleShare]) => ({ label, value, maleShare }))
  },
  economy: {
    sectors: [
      ['Manufacturing',19.0],['Mining and quarrying',10.5],['Agriculture, forestry and fishing',12.6],
      ['Wholesale and retail trade',13.1],['Construction',10.4],['Transportation and storage',6.1],
      ['Financial services',4.1],['Information and communication',4.0],['Public administration',3.2],['All other sectors',17.0]
    ].map(([label,value]) => ({label,value})),
    monthlyInflation: [2.57,2.75,3.05,3.00,2.84,2.51,2.13,1.95,1.84,1.71,1.55,1.57]
  },
  trade: {
    exports: 264.70, imports: 233.66, balance: 31.04,
    monthlyExports: [20.5,19.3,22.4,19.6,22.3,20.9,22.2,22.3,23.0,24.4,24.0,23.8],
    monthlyImports: [18.9,18.4,17.9,19.4,19.6,19.8,21.7,20.9,18.9,21.9,19.8,16.5],
    groups: [['Mineral fuels incl. coal',55],['Palm oil and other animal/vegetable fats',28],['Iron and steel',27],['Electrical machinery',15],['Vehicles and parts',11],['Rubber and rubber goods',9]].map(([label,value])=>({label,value})),
    destinations: [['China',62.4],['United States',26.5],['Japan',20.8],['India',20.4],['Singapore',13.7],['Malaysia',12.5],['Philippines',11.0],['South Korea',10.5]],
    origins: [['China',72.1],['Singapore',21.5],['Japan',15.0],['United States',12.1],['Malaysia',11.8],['Thailand',9.9],['Australia',9.4],['India',7.6]]
  },
  society: { literacy: 96.8, meanSchooling: 8.85, expectedSchooling: 13.21, stunting: 21.5, infantMortality: 16, internet: 79.5 },
  months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
  regionGroups: ['Sumatra','Java','Bali and Nusa Tenggara','Kalimantan','Sulawesi','Maluku and Papua'],
  provinces: [
    ['Aceh',5.55,'Banda Aceh',0],['North Sumatra',15.59,'Medan',0],['West Sumatra',5.84,'Padang',0],
    ['Riau',6.73,'Pekanbaru',0],['Riau Islands',2.18,'Tanjung Pinang',0],['Jambi',3.72,'Jambi',0],
    ['South Sumatra',8.84,'Palembang',0],['Bengkulu',2.11,'Bengkulu',0],['Lampung',9.42,'Bandar Lampung',0],['Bangka Belitung Islands',1.53,'Pangkal Pinang',0],
    ['Jakarta',10.56,'Jakarta',1],['West Java',50.27,'Bandung',1],['Banten',12.43,'Serang',1],
    ['Central Java',38.28,'Semarang',1],['DI Yogyakarta',3.76,'Yogyakarta',1],['East Java',41.81,'Surabaya',1],
    ['Bali',4.29,'Denpasar',2],['West Nusa Tenggara',5.65,'Mataram',2],['East Nusa Tenggara',5.66,'Kupang',2],
    ['West Kalimantan',5.87,'Pontianak',3],['Central Kalimantan',2.81,'Palangka Raya',3],['South Kalimantan',4.27,'Banjarbaru',3],['East Kalimantan',3.96,'Samarinda',3],['North Kalimantan',0.72,'Tanjung Selor',3],
    ['North Sulawesi',2.70,'Manado',4],['Gorontalo',1.23,'Gorontalo',4],['Central Sulawesi',3.12,'Palu',4],['South Sulawesi',9.46,'Makassar',4],['Southeast Sulawesi',2.79,'Kendari',4],['West Sulawesi',1.51,'Mamuju',4],
    ['Maluku',1.95,'Ambon',5],['North Maluku',1.37,'Sofifi',5],['Papua',1.06,'Jayapura',5],['West Papua',0.56,'Manokwari',5],['Southwest Papua',0.61,'Sorong',5],['South Papua',0.52,'Salor (Merauke)',5],['Central Papua',1.35,'Nabire',5],['Highland Papua',1.39,'Wamena',5]
  ].map(([name,population,capital,group])=>({name,population,capital,group})),
  sources: ['BPS — Statistics Indonesia','World Bank World Development Indicators','National nutrition survey','Industry internet survey']
};
