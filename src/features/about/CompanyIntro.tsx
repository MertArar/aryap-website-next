import React, { memo } from "react";
import { m, useReducedMotion } from "framer-motion";

import { companyFeatures } from "@/hooks/aboutData";

const storyBlocks = [
  {
    title: "Köklerimiz",
    text: "Aryap, 1990 yılında ahşabın doğasını iyi bilen, ölçüyü ve işçiliği merkeze alan bir üretim anlayışıyla kuruldu. İlk günden itibaren yalnızca ürün üretmeye değil, mekânın karakterini tamamlayan detaylar oluşturmaya odaklandı.",
  },
  {
    title: "Üretim Anlayışımız",
    text: "Bugün iç mekân, mobilya, ahşap kaplama, özel üretim ve uygulama süreçlerinde estetik ile fonksiyonu aynı çizgide buluşturan kurumsal çözümler geliştiriyoruz. Her proje; malzeme seçimi, teknik ölçülendirme, yüzey işlemleri ve uygulama detaylarıyla bütüncül biçimde ele alınır.",
  },
  {
    title: "Mekâna Yaklaşımımız",
    text: "Bizim için iyi üretim, yalnızca sağlam ve temiz bir sonuç elde etmek değildir. Mekânın diliyle uyum kuran, kullanıcının ihtiyacını doğru okuyan ve zaman içinde değerini koruyan işler üretmek temel önceliğimizdir.",
  },
  {
    title: "Detay ve Süreklilik",
    text: "Her projede yalnızca teslim edilecek bir ürün değil; uzun ömürlü, sakin, dengeli ve zamansız bir yaşam alanı düşünülür. Malzeme seçiminden üretim planlamasına, montajdan son kontrole kadar her aşama aynı titizlikle yürütülür.",
  },
];

const CompanyIntro = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative px-6 py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="relative grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
              <span className="h-px w-10 bg-[#9b8364]" />
              Kurumsal Hikaye
            </span>

            <h2 className="max-w-4xl text-5xl font-light leading-[1.02] tracking-[-0.055em] text-[#0f2535] md:text-7xl">
              1990’dan bu yana{" "}
              <span className="font-serif italic text-[#9b8364]">
                ahşaba karakter
              </span>{" "}
              kazandırıyoruz.
            </h2>
          </aside>

          <div className="max-w-2xl space-y-20">
            {storyBlocks.map((block, index) => (
              <article
                key={block.title}
                className="border-l border-[#e5ded4] pl-7"
              >
                <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#9b8364]">
                  0{index + 1}
                </span>

                <h3 className="mt-5 text-3xl font-light leading-tight tracking-[-0.04em] text-[#0f2535] md:text-4xl">
                  {block.title}
                </h3>

                <p className="mt-5 text-base leading-8 text-[#4b5b66] md:text-lg">
                  {block.text}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-32 grid gap-6 md:grid-cols-3">
          {companyFeatures.map((item, index) => (
            <m.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 70,
                scale: 0.94,
                filter: "blur(14px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-80px" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.9,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
              className="group relative min-h-[320px] overflow-hidden border border-[#e5ded4] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#9b8364]/60"
            >
              <span className="absolute right-6 top-4 text-[90px] font-light leading-none tracking-[-0.08em] text-[#f0ebe4] transition-colors duration-500 group-hover:text-[#e1d5c4]">
                {item.number}
              </span>

              <div className="relative z-10 flex h-full flex-col justify-end">
                <div className="mb-8 h-px w-20 bg-[#9b8364] transition-all duration-500 group-hover:w-32" />

                <h3 className="text-3xl font-light tracking-[-0.04em] text-[#0f2535]">
                  {item.title}
                </h3>

                <p className="mt-5 text-sm leading-7 text-[#4b5b66] md:text-base">
                  {item.text}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(CompanyIntro);