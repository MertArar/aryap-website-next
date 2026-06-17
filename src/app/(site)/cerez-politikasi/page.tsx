import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası | Aryap Ahşap & Tasarım",
  description:
    "Aryap Ahşap & Tasarım çerez politikası ve kişisel verilerin çerezler aracılığıyla işlenmesine ilişkin bilgilendirme metni.",
};

type PolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: {
    title: string;
    paragraphs: string[];
  }[];
};

const policySections: PolicySection[] = [
  {
    id: "amac-ve-kapsam",
    title: "1. Amaç ve Kapsam",
    paragraphs: [
      "İşbu Çerez Politikası, ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LİMİTED ŞİRKETİ (“Şirket”, “ARYAP” veya “Veri Sorumlusu”) tarafından işletilen internet sitesinin kullanımı sırasında çerezler ve benzeri teknolojiler aracılığıyla işlenen kişisel verilere ilişkin olarak ziyaretçileri bilgilendirmek amacıyla hazırlanmıştır.",
      "Bu politika; internet sitesinin güvenli, verimli ve kullanıcı dostu şekilde çalışmasını sağlamak, kullanıcı tercihlerini hatırlamak, site performansını ölçmek, ziyaretçi deneyimini geliştirmek ve kullanıcının açık rızasının bulunduğu hâllerde pazarlama, reklam ve analiz faaliyetleri yürütmek amacıyla kullanılan çerezlere ilişkin açıklamaları içermektedir.",
      "Çerezler aracılığıyla kişisel verilerin işlenmesinde başta 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) olmak üzere ilgili mevzuat hükümleri, Kişisel Verileri Koruma Kurumu kararları ve güncel rehberleri dikkate alınmaktadır.",
    ],
  },
  {
    id: "cerez-nedir",
    title: "2. Çerez Nedir?",
    paragraphs: [
      "Çerezler, internet sitesini ziyaret ettiğinizde tarayıcınız veya cihazınız aracılığıyla bilgisayarınıza, telefonunuza, tabletinize ya da kullandığınız diğer cihaza kaydedilen küçük metin dosyalarıdır. Çerezler sayesinde internet sitesi belirli bilgileri hatırlayabilir, site güvenliği sağlanabilir, kullanıcı tercihleri korunabilir ve site kullanımına ilişkin istatistiksel bilgiler elde edilebilir.",
      "Çerezler; oturum çerezleri, kalıcı çerezler, birinci taraf çerezleri, üçüncü taraf çerezleri, zorunlu çerezler, işlevsel çerezler, performans/analitik çerezleri ve reklam/pazarlama çerezleri gibi farklı türlerde olabilir.",
    ],
  },
  {
    id: "kullanilan-cerez-turleri",
    title: "3. Kullanılan Çerez Türleri",
    subsections: [
      {
        title: "3.1. Zorunlu Çerezler",
        paragraphs: [
          "Zorunlu çerezler, internet sitesinin güvenli ve düzgün şekilde çalışması için gerekli olan çerezlerdir. Bu çerezler olmadan internet sitesinin bazı temel fonksiyonları kullanılamayabilir. Oturum yönetimi, güvenlik, ağ trafiğinin düzenlenmesi, çerez tercihinin hatırlanması ve form güvenliğinin sağlanması bu kapsamdadır.",
          "Zorunlu çerezler, internet sitesinin çalışması için gerekli olduğundan açık rızaya tabi değildir. Bu çerezler bakımından kişisel veriler, KVKK’nın 5. maddesinde yer alan ilgili veri işleme şartlarına dayanılarak işlenmektedir.",
        ],
      },
      {
        title: "3.2. İşlevsel Çerezler",
        paragraphs: [
          "İşlevsel çerezler, internet sitesinde yaptığınız tercihlerin hatırlanması ve daha kişiselleştirilmiş bir kullanım deneyimi sunulması amacıyla kullanılan çerezlerdir. Dil seçimi, bölge tercihi, görüntüleme tercihleri veya daha önce seçilmiş kullanıcı ayarlarının hatırlanması bu kapsama girebilir.",
          "İşlevsel çerezler, zorunlu çerezler dışında kalan bir işlevsellik sağladığı ölçüde açık rızanıza bağlı olarak çalıştırılır.",
        ],
      },
      {
        title: "3.3. Performans ve Analitik Çerezleri",
        paragraphs: [
          "Performans ve analitik çerezleri, internet sitesinin nasıl kullanıldığını anlamak, ziyaretçi sayısını ölçmek, en çok ziyaret edilen sayfaları tespit etmek, teknik hataları analiz etmek ve site performansını geliştirmek amacıyla kullanılabilir.",
          "Bu çerezler aracılığıyla toplanan veriler, ziyaretçi deneyimini iyileştirmek ve internet sitesinin daha verimli çalışmasını sağlamak için değerlendirilir. Performans ve analitik çerezleri, zorunlu çerez niteliğinde olmadığı sürece açık rızanıza bağlı olarak çalıştırılır.",
        ],
      },
      {
        title: "3.4. Reklam ve Pazarlama Çerezleri",
        paragraphs: [
          "Reklam ve pazarlama çerezleri, ilgi alanlarınıza uygun içerik veya reklam sunulması, reklam kampanyalarının etkinliğinin ölçülmesi, yeniden hedefleme faaliyetlerinin yürütülmesi ve pazarlama süreçlerinin geliştirilmesi amacıyla kullanılabilir.",
          "Bu çerezler, açık rızanız olmaksızın çalıştırılmaz. Reklam ve pazarlama çerezlerini kabul etmemeniz, internet sitesinin temel fonksiyonlarını kullanmanıza engel olmaz.",
        ],
      },
    ],
  },
  {
    id: "cerezlerin-kullanim-amaclari",
    title: "4. Çerezlerin Kullanım Amaçları",
    paragraphs: ["İnternet sitemizde çerezler aşağıdaki amaçlarla kullanılabilir:"],
    bullets: [
      "İnternet sitesinin güvenli şekilde çalışmasını sağlamak,",
      "Oturum güvenliğini ve site bütünlüğünü korumak,",
      "Çerez tercihlerinizi kaydetmek,",
      "İletişim formlarının güvenli şekilde gönderilmesini sağlamak,",
      "Site trafiğini ve performansını ölçmek,",
      "Kullanıcı deneyimini geliştirmek,",
      "Tercihlerinizi hatırlamak,",
      "Açık rızanızın bulunması hâlinde analiz, reklam ve pazarlama faaliyetleri yürütmek,",
      "Hukuki yükümlülüklerin yerine getirilmesi ve olası uyuşmazlıkluki yükümlülüklerin yerine getirilmesi ve olası uyuşmazlıklarda delil oluşturulması amacıyla kayıtları saklamak.",
    ],
  },
  {
    id: "hukuki-sebepler",
    title: "5. Kişisel Verilerin İşlenme Hukuki Sebepleri",
    paragraphs: [
      "Çerezler aracılığıyla kişisel verileriniz, çerezin türüne ve kullanım amacına göre aşağıdaki hukuki sebeplere dayanılarak işlenebilir:",
    ],
    bullets: [
      "İnternet sitesinin güvenli ve düzgün çalışması için gerekli olan zorunlu çerezler bakımından, veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi, bir hakkın tesisi, kullanılması veya korunması ya da temel hak ve özgürlüklerinize zarar vermemek kaydıyla veri sorumlusunun meşru menfaati için veri işlemenin zorunlu olması,",
      "Talep ettiğiniz hizmetlerin sunulması için gerekli teknik işlemler bakımından, sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması,",
      "İşlevsel, performans/analitik, reklam ve pazarlama çerezleri bakımından, açık rızanızın bulunması.",
    ],
  },
  {
    id: "ucuncu-taraf-cerezler",
    title: "7. Üçüncü Taraf Çerezler",
    paragraphs: [
      "İnternet sitesinde, açık rızanızın bulunması hâlinde üçüncü taraf hizmet sağlayıcılarına ait çerezler kullanılabilir. Bu sağlayıcılar; analiz, performans ölçümü, reklam, pazarlama, harita, video, güvenlik veya benzeri teknik hizmetler sunabilir.",
      "Üçüncü taraf çerezlerin kullanılması hâlinde, ilgili üçüncü taraflar çerezler aracılığıyla belirli kişisel verilere erişebilir. Bu tür çerezler açık rızanıza bağlı olarak çalıştırılır ve çerez tercih paneli üzerinden yönetilebilir.",
      "Üçüncü taraf sağlayıcıların kendi gizlilik ve çerez politikaları ayrıca uygulanabilir. Bu nedenle, ilgili hizmet sağlayıcıların güncel gizlilik ve çerez politikalarını incelemeniz önerilir.",
    ],
  },
  {
    id: "verilerin-aktarilmasi",
    title: "8. Kişisel Verilerin Aktarılması",
    paragraphs: [
      "Çerezler aracılığıyla elde edilen kişisel verileriniz, işbu politikada belirtilen amaçlarla sınırlı olmak üzere;",
    ],
    bullets: [
      "Şirketin hizmet aldığı yazılım, bilişim, barındırma, güvenlik ve teknik destek sağlayıcılarına,",
      "Yetkili kamu kurum ve kuruluşlarına,",
      "Hukuken yetkili özel kişi veya kuruluşlara,",
      "Açık rızanızın bulunması hâlinde analiz, reklam ve pazarlama hizmeti sunan üçüncü taraf hizmet sağlayıcılarına",
    ],
  },
  {
    id: "tercihlerin-yonetilmesi",
    title: "9. Çerez Tercihlerinin Yönetilmesi",
    paragraphs: [
      "İnternet sitemizi ilk ziyaretinizde, zorunlu çerezler dışında kalan çerezler için tercihlerinizi belirleyebileceğiniz bir çerez yönetim paneli sunulur. Bu panel üzerinden çerez kategorilerini kabul edebilir, reddedebilir veya daha sonra tercihlerinizi değiştirebilirsiniz.",
      "Zorunlu çerezler, internet sitesinin çalışması için gerekli olduğundan devre dışı bırakılamaz. Ancak işlevsel, performans/analitik ve reklam/pazarlama çerezleri bakımından tercihlerinizi dilediğiniz zaman değiştirebilirsiniz.",
      "Çerez tercihlerinizi ayrıca kullandığınız tarayıcının ayarları üzerinden de yönetebilirsiniz. Tarayıcı ayarları aracılığıyla çerezleri silebilir, engelleyebilir veya belirli internet siteleri için çerez kullanımını sınırlandırabilirsiniz. Tarayıcı üzerinden çerezlerin tamamen engellenmesi hâlinde internet sitesinin bazı bölümleri beklendiği şekilde çalışmayabilir.",
    ],
  },
  {
    id: "acik-rizanin-geri-alinmasi",
    title: "10. Açık Rızanın Geri Alınması",
    paragraphs: [
      "Açık rızaya dayalı çerezler bakımından verdiğiniz rızayı dilediğiniz zaman geri alabilirsiniz. Rızanın geri alınması ileriye etkili sonuç doğurur. Rızanızı geri almanız hâlinde, ilgili çerezler aracılığıyla yürütülen veri işleme faaliyetleri durdurulur.",
      "Rızanızı geri almak veya tercihlerinizi değiştirmek için internet sitesinde yer alan “Çerez Tercihleri” bağlantısını kullanabilirsiniz.",
    ],
  },
  {
    id: "ilgili-kisinin-haklari",
    title: "11. İlgili Kişinin Hakları",
    paragraphs: [
      "KVKK’nın 11. maddesi uyarınca kişisel verilerinize ilişkin olarak aşağıdaki haklara sahipsiniz:",
    ],
    bullets: [
      "Kişisel verilerinizin işlenip işlenmediğini öğrenme,",
      "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,",
      "Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,",
      "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,",
      "Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,",
      "KVKK’da öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,",
      "Düzeltme, silme veya yok etme işlemlerinin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme,",
      "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,",
      "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.",
    ],
  },
  {
    id: "politikanin-guncellenmesi",
    title: "12. Politikanın Güncellenmesi",
    paragraphs: [
      "Şirket, işbu Çerez Politikası’nı mevzuat değişiklikleri, Kişisel Verileri Koruma Kurumu kararları, teknik gereklilikler veya internet sitesinde kullanılan çerezlerin değişmesi hâlinde güncelleyebilir.",
      "Güncel politika internet sitesinde yayımlandığı tarihten itibaren geçerli olur. Politikanın güncellenme tarihi metnin başında belirtilir.",
    ],
  },
];

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f8] text-[#171717]">
      <section className="relative overflow-hidden bg-[#0d0d0d] px-6 pb-24 pt-36 md:px-10 lg:px-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-160px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#d8c7ad]/20 blur-[120px]" />
          <div className="absolute bottom-[-220px] right-[-160px] h-[460px] w-[460px] rounded-full bg-white/10 blur-[140px]" />
          <div className="absolute left-[52%] top-[12%] hidden h-px w-[42%] bg-white/[0.08] lg:block" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
            ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET LİMİTED
            ŞİRKETİ
          </span>

          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Çerez Politikası
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
            İnternet sitesinde kullanılan çerezler ve benzeri teknolojiler
            hakkında bilgilendirme metni.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 lg:px-20 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit rounded-[28px] border border-black/10 bg-white p-6 shadow-sm lg:sticky lg:top-28">
            <h2 className="text-lg font-semibold text-[#111]">İçindekiler</h2>

            <nav className="mt-6 max-h-[62vh] space-y-2 overflow-y-auto pr-2">
              {policySections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block rounded-xl px-3 py-2 text-sm leading-6 text-black/55 transition duration-300 hover:bg-black/[0.04] hover:text-black"
                >
                  {section.title}
                </a>
              ))}

              <a
                href="#kullanilan-cerezlere-iliskin-tablo"
                className="block rounded-xl px-3 py-2 text-sm leading-6 text-black/55 transition duration-300 hover:bg-black/[0.04] hover:text-black"
              >
                6. Kullanılan Çerezlere İlişkin Tablo
              </a>

              <a
                href="#iletisim"
                className="block rounded-xl px-3 py-2 text-sm leading-6 text-black/55 transition duration-300 hover:bg-black/[0.04] hover:text-black"
              >
                13. İletişim
              </a>
            </nav>
          </aside>

          <div className="rounded-[32px] border border-black/10 bg-white p-6 shadow-sm md:p-10 lg:p-12">
            <div className="border-b border-black/10 pb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-black/35">
                Son Güncellenme Tarihi
              </p>

              <h2 className="mt-4 text-2xl font-semibold leading-tight text-[#111] md:text-4xl">
                Çerez Politikası
              </h2>

              <div className="mt-7 grid gap-4 text-base leading-8 text-black/65 md:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                    Son Güncellenme Tarihi
                  </p>
                  <p className="mt-2 text-black/70">17.06.2026</p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                    Veri Sorumlusu
                  </p>
                  <p className="mt-2 text-black/70">
                    ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET
                    LİMİTED ŞİRKETİ
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                    Adres
                  </p>
                  <p className="mt-2 text-black/70">
                    Fevzi Çakmak Mah. Milenyum Cad. ASPAK Sanayi Sitesi D:2 No:73 Karatay / Konya
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                    E-posta
                  </p>
                  <p className="mt-2 text-black/70">
                    <a
                      href="mailto:kvkk@alanadi.com"
                      className="transition-colors duration-300 hover:text-black"
                    >
                      kvkk@alanadi.com
                    </a>{" "}
                    /{" "}
                    <a
                      href="mailto:info@alanadi.com"
                      className="transition-colors duration-300 hover:text-black"
                    >
                      info@alanadi.com
                    </a>
                  </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-[#f8f8f8] p-5 md:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                    Web Sitesi
                  </p>
                  <p className="mt-2 text-black/70">
                    <a
                      href="http://www.aryapahsap.com"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors duration-300 hover:text-black"
                    >
                      www.aryapahsap.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-14">
              {policySections.map((section) => (
                <article
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32"
                >
                  <h3 className="mb-6 text-xl font-semibold leading-snug text-[#111] md:text-2xl">
                    {section.title}
                  </h3>

                  <div className="space-y-5">
                    {section.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-black/65"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.bullets && (
                      <ul className="space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-base leading-8 text-black/65"
                          >
                            <span className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/35" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.subsections?.map((subsection) => (
                      <div
                        key={subsection.title}
                        className="rounded-[24px] border border-black/10 bg-[#fafafa] p-5 md:p-6"
                      >
                        <h4 className="text-lg font-semibold text-[#111]">
                          {subsection.title}
                        </h4>

                        <div className="mt-4 space-y-5">
                          {subsection.paragraphs.map((paragraph) => (
                            <p
                              key={paragraph}
                              className="text-base leading-8 text-black/65"
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}

              <article
                id="kullanilan-cerezlere-iliskin-tablo"
                className="scroll-mt-32"
              >
                <h3 className="mb-6 text-xl font-semibold leading-snug text-[#111] md:text-2xl">
                  6. Kullanılan Çerezlere İlişkin Tablo
                </h3>

                <div className="space-y-5">
                  <p className="text-base leading-8 text-black/65">
                    Aşağıdaki tablo, internet sitesinde kullanılan çerezlere
                    ilişkin genel bilgilendirme amacı taşımaktadır. Siteye
                    entegre edilen teknik servisler, analiz araçları, reklam
                    araçları veya üçüncü taraf yazılımlar değiştikçe tablo
                    güncellenir.
                  </p>

                  <div className="overflow-hidden rounded-[24px] border border-black/10">
                    <div className="overflow-x-auto">
                      <table className="min-w-[900px] divide-y divide-black/10 text-left">
                        <thead className="bg-[#111] text-white">
                          <tr>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Çerez Türü
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Kullanım Amacı
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Hukuki Sebep
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Saklama Süresi
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Rıza Durumu
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-black/10 bg-white text-sm leading-7 text-black/65">
                          <tr>
                            <td className="px-5 py-4 font-medium text-black/75">
                              Zorunlu Çerezler
                            </td>
                            <td className="px-5 py-4">
                              Sitenin çalışması, güvenlik, oturum yönetimi,
                              çerez tercihinin saklanması
                            </td>
                            <td className="px-5 py-4">
                              KVKK m.5/2 kapsamındaki ilgili işleme şartları
                            </td>
                            <td className="px-5 py-4">
                              Oturum süresi veya teknik gerekliliğe göre sınırlı
                              süre
                            </td>
                            <td className="px-5 py-4">Açık rıza aranmaz</td>
                          </tr>

                          <tr>
                            <td className="px-5 py-4 font-medium text-black/75">
                              İşlevsel Çerezler
                            </td>
                            <td className="px-5 py-4">
                              Dil, bölge, görünüm ve kullanıcı tercihlerinin
                              hatırlanması
                            </td>
                            <td className="px-5 py-4">Açık rıza</td>
                            <td className="px-5 py-4">
                              Tercihin niteliğine göre sınırlı süre
                            </td>
                            <td className="px-5 py-4">Açık rızaya tabidir</td>
                          </tr>

                          <tr>
                            <td className="px-5 py-4 font-medium text-black/75">
                              Performans/Analitik Çerezleri
                            </td>
                            <td className="px-5 py-4">
                              Site kullanımının ölçülmesi, ziyaretçi
                              istatistikleri, performans iyileştirme
                            </td>
                            <td className="px-5 py-4">Açık rıza</td>
                            <td className="px-5 py-4">
                              İlgili sağlayıcının teknik süresiyle sınırlı
                            </td>
                            <td className="px-5 py-4">Açık rızaya tabidir</td>
                          </tr>

                          <tr>
                            <td className="px-5 py-4 font-medium text-black/75">
                              Reklam/Pazarlama Çerezleri
                            </td>
                            <td className="px-5 py-4">
                              İlgi alanına yönelik reklam, kampanya ölçümü,
                              yeniden hedefleme
                            </td>
                            <td className="px-5 py-4">Açık rıza</td>
                            <td className="px-5 py-4">
                              İlgili sağlayıcının teknik süresiyle sınırlı
                            </td>
                            <td className="px-5 py-4">Açık rızaya tabidir</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p className="text-base leading-8 text-black/65">
                    Teknik ekip tarafından kullanılacak gerçek çerez adları,
                    sağlayıcıları, süreleri ve amaçları aşağıdaki tabloya ayrıca
                    eklenmelidir:
                  </p>

                  <div className="overflow-hidden rounded-[24px] border border-black/10">
                    <div className="overflow-x-auto">
                      <table className="min-w-[760px] divide-y divide-black/10 text-left">
                        <thead className="bg-[#f5f5f5] text-[#111]">
                          <tr>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Çerez Adı
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Sağlayıcı
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Çerez Türü
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Kullanım Amacı
                            </th>
                            <th className="px-5 py-4 text-sm font-semibold">
                              Saklama Süresi
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-black/10 bg-white text-sm leading-7 text-black/65">
                          <tr>
                            <td className="px-5 py-4">[cookie_name]</td>
                            <td className="px-5 py-4">
                              [Birinci taraf / üçüncü taraf sağlayıcı]
                            </td>
                            <td className="px-5 py-4">
                              [Zorunlu / İşlevsel / Analitik / Pazarlama]
                            </td>
                            <td className="px-5 py-4">[Açıklama]</td>
                            <td className="px-5 py-4">[Süre]</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p className="text-base leading-8 text-black/65">
                    Yurt dışına kişisel veri aktarımı gerektiren üçüncü taraf
                    çerezlerin kullanılması hâlinde, ilgili aktarım KVKK’nın
                    yurt dışına aktarım hükümlerine ve Kişisel Verileri Koruma
                    Kurumu düzenlemelerine uygun şekilde gerçekleştirilir.
                    Gerekli hukuki aktarım mekanizması sağlanmadan veya açık
                    rızanız alınmadan yurt dışına aktarım yapılmaz.
                  </p>

                  <p className="text-base leading-8 text-black/65">
                    Bu haklarınızı kullanmak için başvurularınızı [Fevzi Çakmak Mah. Milenyum Cad. ASPAK Sanayi Sitesi D:2 No:73 Karatay / Konya], [aryapahsap@gmail.com] veya internet sitesinde yayımlanan
                    “İlgili Kişi Başvuru Formu” aracılığıyla Şirketimize
                    iletebilirsiniz. Başvurularınız, talebin niteliğine göre en
                    kısa sürede ve en geç otuz gün içinde sonuçlandırılır.
                  </p>
                </div>
              </article>

              <article id="iletisim" className="scroll-mt-32">
                <h3 className="mb-6 text-xl font-semibold leading-snug text-[#111] md:text-2xl">
                  13. İletişim
                </h3>

                <div className="space-y-5">
                  <p className="text-base leading-8 text-black/65">
                    Çerez Politikası ve kişisel verilerinizin işlenmesine
                    ilişkin sorularınız için aşağıdaki iletişim kanallarından
                    Şirketimize ulaşabilirsiniz:
                  </p>

                  <div className="rounded-[28px] bg-[#f5f5f5] p-6 md:p-8">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                          Şirket Unvanı
                        </p>
                        <p className="mt-3 text-base leading-7 text-black/70">
                          ARYAP HIRDAVAT MOBİLYA İNŞAAT YAZILIM SANAYİİ TİCARET
                          LİMİTED ŞİRKETİ
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                          Adres
                        </p>
                        <p className="mt-3 text-base leading-7 text-black/70">
                          Fevzi Çakmak Mah. Milenyum Cad. ASPAK Sanayi Sitesi D:2 No:73 Karatay / Konya
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                          E-posta
                        </p>
                        <p className="mt-3 text-base leading-7 text-black/70">
                          <a
                            href="mailto:aryapahsap@gmail.com"
                            className="transition-colors duration-300 hover:text-black"
                          >
                            aryapahsap@gmail.com
                          </a>{" "}
                          /{" "}
                          <a
                            href="mailto:aryapahsap@gmail.com"
                            className="transition-colors duration-300 hover:text-black"
                          >
                            aryapahsap@gmail.com
                          </a>
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                          Telefon
                        </p>
                        <p className="mt-3 text-base leading-7 text-black/70">
                          +90 532 671 13 18
                        </p>
                      </div>

                      <div className="rounded-2xl border border-black/10 bg-white p-5 md:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-black/35">
                          Web Sitesi
                        </p>
                        <p className="mt-3 text-base leading-7 text-black/70">
                          <a
                            href="http://www.aryapahsap.com"
                            target="_blank"
                            rel="noreferrer"
                            className="transition-colors duration-300 hover:text-black"
                          >
                            www.aryapahsap.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 rounded-full bg-[#111] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-[#9b8364]"
              >
                <span>Ana Sayfaya Dön</span>
                <span className="transition duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}