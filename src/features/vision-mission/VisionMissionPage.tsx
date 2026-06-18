"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import visionCta from "@/assets/visioncta.png";

type ValueItem = {
  title: string;
  text: string;
};

const values: ValueItem[] = [
  {
    title: "Kaliteli Üretim",
    text: "Her projede doğru malzeme, temiz işçilik ve uzun ömürlü kullanım anlayışıyla hareket ederiz.",
  },
  {
    title: "Güvenilir Süreç",
    text: "Planlamadan teslimata kadar her aşamada düzenli, kontrollü ve şeffaf bir çalışma süreci yürütürüz.",
  },
  {
    title: "İşlevsel Tasarım",
    text: "Mekânın ihtiyacını doğru okuyarak estetik ve kullanım kolaylığını aynı çizgide buluştururuz.",
  },
  {
    title: "Sürdürülebilir Yaklaşım",
    text: "Zamana karşı değerini koruyan, sade ve kalıcı çözümler üretmeye önem veririz.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function VisionMissionPage() {
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("heroHeaderChange", {
        detail: { darkHeader: true },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("heroHeaderChange", {
          detail: { darkHeader: false },
        })
      );
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FAFDFF] text-[#0f2535]">
      <style jsx global>{`
        .aryap-vision-hero-bg {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center 112%;
        }

        @media (min-width: 640px) {
          .aryap-vision-hero-bg {
            background-position: center 132%;
          }
        }

        @media (min-width: 1024px) {
          .aryap-vision-hero-bg {
            background-position: center 172%;
            background-attachment: fixed;
          }
        }

        .aryap-values-row {
          display: grid;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .aryap-values-row {
            grid-template-columns: minmax(0, 0.35fr) minmax(0, 0.65fr);
            align-items: flex-start;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10">
        {/* PARALLAX BACKGROUND IMAGE */}
        <div
          className="aryap-vision-hero-bg absolute inset-0"
          style={{ backgroundImage: `url(${visionCta.src})` }}
        />

        {/* SOFT OVERLAY */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(250, 253, 255, 0.72)" }}
        />

        {/* BOTTOM BLEND */}
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-[#FAFDFF]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#0f2535]/50">
              Vizyon & Misyon
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Üretim anlayışımızı belirleyen temel yaklaşım.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#0f2535]/60 sm:text-lg">
              Aryap olarak ahşap üretimi, iç mekân uygulamaları ve özel tasarım
              çözümlerinde kalite, güven ve süreklilik prensipleriyle hareket
              ediyoruz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VISION / MISSION */}
      <section className="px-6 pb-24 sm:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="relative grid grid-cols-1 gap-14 border-t border-[#0f2535]/10 pt-16 lg:grid-cols-2 lg:gap-0">
            <div className="absolute bottom-2 left-1/2 top-2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#0f2535]/15 to-transparent lg:block" />

            {/* VISION */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="lg:pr-16"
            >
              <p className="mb-8 text-md uppercase tracking-[0.3em] text-[#0f2535]/45">
                Vizyon
              </p>

              <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#0f2535] sm:text-4xl lg:text-5xl">
                Ahşap üretiminde estetik, işlev ve kaliteyi bir araya getiren
                güvenilir bir marka olmak.
              </h2>

              <p className="mt-8 max-w-xl text-base leading-8 text-[#0f2535]/60 sm:text-lg">
                Vizyonumuz; ahşabın doğal değerini koruyan, mekânların
                karakterini güçlendiren ve uzun yıllar kullanılabilecek
                çözümler üretmektir. Her projede yalnızca bugünün ihtiyacına
                değil, gelecekte de değerini koruyacak bir üretim anlayışına
                odaklanırız.
              </p>
            </motion.div>

            {/* MISSION */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-t border-[#0f2535]/10 pt-14 lg:border-t-0 lg:pl-16 lg:pt-0"
            >
              <p className="mb-8 text-md uppercase tracking-[0.3em] text-[#0f2535]/45">
                Misyon
              </p>

              <h2 className="max-w-xl text-3xl font-medium leading-tight tracking-[-0.04em] text-[#0f2535] sm:text-4xl lg:text-5xl">
                Doğru planlama, kaliteli üretim ve temiz uygulama süreçleriyle
                müşterilerimize kalıcı çözümler sunmak.
              </h2>

              <p className="mt-8 max-w-xl text-base leading-8 text-[#0f2535]/60 sm:text-lg">
                Misyonumuz; mobilya, ahşap kaplama, iç mekân uygulamaları ve
                özel üretim alanlarında ölçülü, işlevsel ve güvenilir işler
                ortaya koymaktır. Malzeme seçiminden üretime, montajdan son
                kontrole kadar her aşamada titiz bir çalışma anlayışı benimseriz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[linear-gradient(to_bottom,#FAFDFF_0%,#FAFDFF_8%,#ffffff_32%,#ffffff_100%)] px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-16 max-w-3xl"
          >
            <span className="mb-7 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
              <span className="h-px w-10 bg-[#9b8364]" />
              Değerlerimiz
            </span>

            <h2 className="text-4xl font-light leading-tight tracking-[-0.045em] text-[#0f2535] md:text-6xl">
              Çalışma biçimimizi belirleyen temel prensipler.
            </h2>
          </motion.div>

          <div className="border-t border-[#e5ded4]">
            {values.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="aryap-values-row border-b border-[#e5ded4] py-9 md:py-11"
              >
                <div className="flex items-center gap-5">
                  <span className="text-xs font-medium tracking-[0.28em] text-[#9b8364]">
                    0{index + 1}
                  </span>

                  <h3 className="text-2xl font-light tracking-[-0.035em] text-[#0f2535] md:text-3xl">
                    {item.title}
                  </h3>
                </div>

                <p className="max-w-2xl text-base leading-8 text-[#4b5b66]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}