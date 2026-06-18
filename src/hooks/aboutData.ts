export type ProjectLocation = {
  name: string;
  x: string;
  y: string;
  zoomX: string;
  zoomY: string;
  projects: string[];
};

export type CompanyFeature = {
  number: string;
  title: string;
  text: string;
};

export const companyFeatures: CompanyFeature[] = [
  {
    number: "1990",
    title: "Kuruluş",
    text: "Ahşap üretimi ve iç mekân uygulamalarında ustalıkla başlayan yolculuk.",
  },
  {
    number: "35+",
    title: "Yıl Deneyim",
    text: "Malzeme, ölçü, işçilik ve teslim süreçlerinde biriken güçlü saha bilgisi.",
  },
  {
    number: "1000+",
    title: "Proje",
    text: "Konut, villa, ofis, otel ve özel yaşam alanlarında tamamlanan üretimler.",
  },
];

export const europeCities: ProjectLocation[] = [
  {
    name: "Almanya",
    x: "39%",
    y: "59%",
    zoomX: "39%",
    zoomY: "59%",
    projects: [
      "Özel iç mekân ahşap uygulamaları",
      "Mobilya üretim ve montaj desteği",
      "Kurumsal alan yüzey çözümleri",
    ],
  },
  {
    name: "İtalya",
    x: "41%",
    y: "79%",
    zoomX: "41%",
    zoomY: "79%",
    projects: [
      "Özel iç mekân ahşap uygulamaları",
      "Mobilya üretim ve montaj desteği",
      "Kurumsal alan yüzey çözümleri",
    ],
  },
  {
    name: "Hollanda",
    x: "33%",
    y: "57%",
    zoomX: "33%",
    zoomY: "57%",
    projects: [
      "Özel iç mekân ahşap uygulamaları",
      "Mobilya üretim ve montaj desteği",
      "Kurumsal alan yüzey çözümleri",
    ],
  },
  {
    name: "Fransa",
    x: "28.5%",
    y: "70%",
    zoomX: "30%",
    zoomY: "66%",
    projects: [
      "Butik yaşam alanı uygulamaları",
      "Ahşap kaplama ve detay üretimi",
      "Özel ölçü mobilya çözümleri",
    ],
  },
  {
    name: "İngiltere",
    x: "25%",
    y: "54%",
    zoomX: "25%",
    zoomY: "56%",
    projects: [
      "Butik yaşam alanı uygulamaları",
      "Ahşap kaplama ve detay üretimi",
      "Özel ölçü mobilya çözümleri",
    ],
  },
  {
    name: "Karadağ",
    x: "51%",
    y: "81%",
    zoomX: "51%",
    zoomY: "80%",
    projects: [
      "Villa iç mekân üretimi",
      "Ahşap boya ve yüzey işlemleri",
      "Dekoratif panel uygulamaları",
    ],
  },
  {
    name: "Macaristan",
    x: "51%",
    y: "69%",
    zoomX: "51%",
    zoomY: "70%",
    projects: [
      "Villa iç mekân üretimi",
      "Ahşap boya ve yüzey işlemleri",
      "Dekoratif panel uygulamaları",
    ],
  },
  {
    name: "İsveç",
    x: "43%",
    y: "44%",
    zoomX: "43%",
    zoomY: "44%",
    projects: [
      "Kompakt mekân mobilya çözümleri",
      "Özel üretim ahşap detaylar",
      "İç mekân tamamlayıcı uygulamalar",
    ],
  },
  {
    name: "Türkiye",
    x: "72%",
    y: "85%",
    zoomX: "72%",
    zoomY: "85%",
    projects: [
      "İç mekân kaplama çözümleri",
      "Ahşap yüzey yenileme",
      "Mobilya üretim desteği",
    ],
  },
  {
    name: "Azerbaycan",
    x: "92%",
    y: "69%",
    zoomX: "92%",
    zoomY: "69%",
    projects: [
      "İç mekân kaplama çözümleri",
      "Ahşap yüzey yenileme",
      "Mobilya üretim desteği",
    ],
  },
  {
    name: "Rusya",
    x: "72%",
    y: "45%",
    zoomX: "72%",
    zoomY: "45%",
    projects: [
      "İç mekân kaplama çözümleri",
      "Ahşap yüzey yenileme",
      "Mobilya üretim desteği",
    ],
  },
];

export const cities: ProjectLocation[] = [
  {
    name: "İstanbul",
    x: "18%",
    y: "22%",
    zoomX: "18%",
    zoomY: "34%",
    projects: [
      "Villa iç mekân ahşap uygulaması",
      "Özel ölçü mutfak üretimi",
      "Ahşap kapı ve pervaz uygulaması",
    ],
  },
  {
    name: "Ankara",
    x: "36%",
    y: "41%",
    zoomX: "36%",
    zoomY: "45%",
    projects: [
      "Ofis mobilya üretimi",
      "CNC dekoratif panel uygulaması",
      "Toplantı odası ahşap kaplama",
    ],
  },
  {
    name: "İzmir",
    x: "7%",
    y: "58%",
    zoomX: "7%",
    zoomY: "53%",
    projects: [
      "Butik otel mobilya üretimi",
      "Ahşap boya ve yüzey yenileme",
      "Özel dolap sistemleri",
    ],
  },
  {
    name: "Konya",
    x: "34%",
    y: "68%",
    zoomX: "35%",
    zoomY: "60%",
    projects: [
      "Konut iç mekân üretimi",
      "PVC kaplama uygulaması",
      "Pervaz üretimi ve montaj",
    ],
  },
  {
    name: "Antalya",
    x: "25%",
    y: "77%",
    zoomX: "26%",
    zoomY: "66%",
    projects: [
      "Villa mobilya uygulaması",
      "Ahşap yüzey boya işlemi",
      "Özel tasarım kapı üretimi",
    ],
  },
  {
    name: "Fethiye",
    x: "15%",
    y: "79%",
    zoomX: "15%",
    zoomY: "67%",
    projects: [
      "Villa mobilya uygulaması",
      "Ahşap yüzey boya işlemi",
      "Özel tasarım kapı üretimi",
    ],
  },
  {
    name: "Bodrum",
    x: "10%",
    y: "74%",
    zoomX: "10%",
    zoomY: "63%",
    projects: [
      "Villa mobilya uygulaması",
      "Ahşap yüzey boya işlemi",
      "Özel tasarım kapı üretimi",
    ],
  },
  {
    name: "Kayseri",
    x: "52%",
    y: "58%",
    zoomX: "52%",
    zoomY: "55%",
    projects: [
      "Villa mobilya uygulaması",
      "Ahşap yüzey boya işlemi",
      "Özel tasarım kapı üretimi",
    ],
  },
  {
    name: "Gaziantep",
    x: "60%",
    y: "79%",
    zoomX: "54%",
    zoomY: "65%",
    projects: [
      "Villa mobilya uygulaması",
      "Ahşap yüzey boya işlemi",
      "Özel tasarım kapı üretimi",
    ],
  },
  {
    name: "Anamur",
    x: "38%",
    y: "89%",
    zoomX: "40%",
    zoomY: "65%",
    projects: [
      "Villa mobilya uygulaması",
      "Ahşap yüzey boya işlemi",
      "Özel tasarım kapı üretimi",
    ],
  },
];