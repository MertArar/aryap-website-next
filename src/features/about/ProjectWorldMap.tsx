import NextImage from "next/image";
import Link from "next/link";
import React, { memo, useCallback, useRef, useState } from "react";
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import EuropeMap from "@/assets/europe.svg";
import mapHeroImg from "@/assets/hero4.webp";
import { europeCities, type ProjectLocation } from "@/hooks/aboutData";

type FocusPercent = {
  x: number;
  y: number;
};

const percentToNumber = (value: string) => Number(String(value).replace("%", ""));

const exportHighlights = [
  {
    title: "Üretimden Sevkiyata",
    text: "İhracat süreçlerinde yalnızca üretimi değil; paketleme, koruma, sevkiyat hazırlığı ve teslim standardını da bütüncül biçimde ele alıyoruz.",
  },
  {
    title: "Standartları Korumak",
    text: "Malzeme kalitesi, yüzey bitişi, ölçü hassasiyeti ve uygulama temizliğiyle farklı pazarlarda aynı kalite çizgisini korumayı hedefliyoruz.",
  },
  {
    title: "Projeye Özel Çözümler",
    text: "Her ülkenin mekân dili, kullanım alışkanlığı ve teknik beklentisine göre özel mobilya, ahşap kaplama ve iç mekân üretimleri geliştiriyoruz.",
  },
];

const ProjectWorldMap = () => {
  const mapFrameRef = useRef<HTMLDivElement | null>(null);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const shouldReduceMotion = useReducedMotion();

  const [selectedCity, setSelectedCity] = useState<ProjectLocation | null>(
    null
  );
  const [focusedCity, setFocusedCity] = useState<ProjectLocation | null>(null);

  const getCurrentFocusPercent = useCallback((): FocusPercent | null => {
    if (!focusedCity || !mapFrameRef.current) return null;

    const rect = mapFrameRef.current.getBoundingClientRect();
    const scale = 1.75;

    const currentX =
      percentToNumber(focusedCity.zoomX) -
      (dragX.get() / (rect.width * scale)) * 100;

    const currentY =
      percentToNumber(focusedCity.zoomY) -
      (dragY.get() / (rect.height * scale)) * 100;

    return { x: currentX, y: currentY };
  }, [dragX, dragY, focusedCity]);

  const handleCityClick = useCallback(
    (city: ProjectLocation) => {
      if (!focusedCity) {
        setSelectedCity(city);
        setFocusedCity(city);
        dragX.set(0);
        dragY.set(0);
        return;
      }

      const currentFocus = getCurrentFocusPercent();

      if (!currentFocus) {
        setSelectedCity(city);
        setFocusedCity(city);
        dragX.set(0);
        dragY.set(0);
        return;
      }

      const cityX = percentToNumber(city.zoomX);
      const cityY = percentToNumber(city.zoomY);

      const distance = Math.sqrt(
        Math.pow(cityX - currentFocus.x, 2) +
          Math.pow(cityY - currentFocus.y, 2)
      );

      const isNearby = distance < 18;

      setSelectedCity(city);

      if (!isNearby) {
        setFocusedCity(city);
        dragX.set(0);
        dragY.set(0);
      }
    },
    [dragX, dragY, focusedCity, getCurrentFocusPercent]
  );

  const resetMap = useCallback(() => {
    setSelectedCity(null);
    setFocusedCity(null);
    dragX.set(0);
    dragY.set(0);
  }, [dragX, dragY]);

  return (
    <section className="pb-28 lg:pb-36">
      <section className="relative mb-20 overflow-hidden px-6 py-24 text-white lg:px-10 lg:py-28">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url("${mapHeroImg.src}")` }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.6))]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <m.span
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7 }}
            className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#d8c7ad]"
          >
            <span className="h-px w-10 bg-[#d8c7ad]" />
            Global Projeler
          </m.span>

          <m.h1
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.1 }
            }
            className="max-w-5xl text-5xl font-light leading-[1.02] tracking-[-0.05em] text-white md:text-7xl"
          >
            Avrupa’nın farklı noktalarında{" "}
            <span className="font-serif italic text-[#d8c7ad]">
              nitelikli işler
            </span>{" "}
            üretiyoruz.
          </m.h1>

          <m.p
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.2 }
            }
            className="mt-8 max-w-2xl text-base leading-8 text-white/72 md:text-lg"
          >
            Ahşap üretimi, iç mekân uygulamaları ve özel mobilya çözümlerinde
            yurt dışı projelerimizi ülke bazlı inceleyebilirsiniz.
          </m.p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div className="relative">
          <div
            ref={mapFrameRef}
            className="relative h-[360px] overflow-hidden md:h-[560px]"
          >
            <m.div
              animate={{
                scale: focusedCity ? 1.75 : 1,
                x: focusedCity ? `calc(50% - ${focusedCity.zoomX})` : "0%",
                y: focusedCity ? `calc(50% - ${focusedCity.zoomY})` : "0%",
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
              className="relative h-full w-full origin-center"
            >
              <m.div
                drag={!!focusedCity}
                style={{ x: dragX, y: dragY }}
                dragMomentum={false}
                dragElastic={0.04}
                dragConstraints={{
                  left: -450,
                  right: 450,
                  top: -350,
                  bottom: 350,
                }}
                className={`relative h-full w-full ${
                  focusedCity
                    ? "cursor-grab touch-none active:cursor-grabbing"
                    : ""
                }`}
              >
                <NextImage
                  src={EuropeMap}
                  alt="Avrupa haritası"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="select-none object-contain opacity-100"
                  draggable={false}
                />

                {europeCities.map((city) => {
                  const isSelected = selectedCity?.name === city.name;

                  return (
                    <button
                      key={city.name}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCityClick(city);
                      }}
                      style={{
                        left: city.x,
                        top: city.y,
                      }}
                      className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                    >
                      <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#02acfa]/20 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />

                      <span
                        className={`relative block h-4 w-4 cursor-pointer rounded-full border-2 border-white transition-all duration-300 ${
                          isSelected
                            ? "scale-125 bg-[#9b8364]"
                            : "bg-[#1E4E6E]"
                        }`}
                      />

                      <span
                        className={`absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap bg-[#0f2535] px-3 py-1 text-xs font-medium text-white transition-all duration-300 ${
                          isSelected
                            ? "translate-y-1 opacity-100"
                            : "opacity-0 group-hover:translate-y-1 group-hover:opacity-100"
                        }`}
                      >
                        {city.name}
                      </span>
                    </button>
                  );
                })}
              </m.div>
            </m.div>
          </div>

          {focusedCity && (
            <button
              type="button"
              onClick={resetMap}
              className="absolute bottom-6 left-6 cursor-pointer border border-[#0f2535]/20 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.25em] text-[#0f2535] transition-all duration-300 hover:bg-[#0f2535] hover:text-white"
            >
              Haritaya Dön
            </button>
          )}
        </div>

        <div className="bg-white p-8 md:p-10">
          <AnimatePresence mode="wait">
            <m.div
              key={selectedCity ? selectedCity.name : "empty"}
              initial={{ opacity: 0, y: 25, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45 }}
              className="w-full"
            >
              <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-[#9b8364]">
                <span className="h-px w-10 bg-[#9b8364]" />
                {selectedCity ? "Seçili Bölge" : "Avrupa Haritası"}
              </span>

              <h2 className="text-4xl font-light tracking-[-0.04em] md:text-5xl">
                {selectedCity
                  ? selectedCity.name
                  : "Ülke seçerek yapılan işleri inceleyin."}
              </h2>

              <p className="mt-6 text-base leading-8 text-[#4b5b66]">
                {selectedCity
                  ? "Bu bölgede tamamlanan örnek iş başlıkları:"
                  : "Harita üzerindeki mavi noktalara tıkladığınızda seçilen bölgeye yakınlaşılır ve o bölgede yapılan örnek işler burada listelenir."}
              </p>

              {selectedCity && (
                <div className="mt-8 grid gap-4">
                  {selectedCity.projects.map((project, index) => (
                    <m.div
                      key={project}
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0 }
                          : { duration: 0.45, delay: index * 0.08 }
                      }
                      className="border-l-2 border-[#9b8364] bg-[#f8f6f1] px-5 py-4"
                    >
                      <span className="text-xs font-medium text-[#9b8364]">
                        0{index + 1}
                      </span>

                      <p className="mt-2 text-base leading-7 text-[#0f2535]">
                        {project}
                      </p>
                    </m.div>
                  ))}
                </div>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      <section className="mx-auto mt-28 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 border-t border-[#e5ded4] pt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <m.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.75 }}
          >
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
              <span className="h-px w-10 bg-[#9b8364]" />
              İhracatlarımız
            </span>

            <h2 className="max-w-3xl text-4xl font-light leading-[1.06] tracking-[-0.045em] text-[#0f2535] md:text-6xl">
              Uluslararası ölçekte{" "}
              <span className="font-serif italic text-[#9b8364]">
                katma değer
              </span>{" "}
              üreten projeler.
            </h2>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.08 }
            }
            className="max-w-3xl"
          >
            <p className="text-base leading-8 text-[#4b5b66] md:text-lg">
              Yurt dışı çalışmalarımızda ahşap üretimi, iç mekân uygulamaları
              ve özel ölçü mobilya çözümlerini proje ihtiyacına göre
              planlıyoruz. Her ülkede mekânın kullanım biçimini, mimari dilini
              ve uygulama beklentilerini dikkate alıyoruz.
            </p>

            <p className="mt-6 text-base leading-8 text-[#4b5b66] md:text-lg">
              Üretimden paketlemeye, sevkiyattan teslim sürecine kadar tüm
              aşamaları aynı kalite anlayışıyla yönetiyoruz. Amacımız, farklı
              pazarlarda temiz işçilik, doğru malzeme ve uzun ömürlü sonuçlarla
              güven veren projeler üretmek.
            </p>
          </m.div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {exportHighlights.map((item, index) => (
            <m.article
              key={item.title}
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.96,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.75,
                      delay: index * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }
              }
              className="group border border-[#e5ded4] bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#9b8364]/60"
            >
              <span className="text-xs font-medium uppercase tracking-[0.32em] text-[#9b8364]">
                0{index + 1}
              </span>

              <h3 className="mt-8 text-3xl font-light tracking-[-0.04em] text-[#0f2535]">
                {item.title}
              </h3>

              <p className="mt-5 text-sm leading-7 text-[#4b5b66] md:text-base">
                {item.text}
              </p>

              <div className="mt-10 h-px w-16 bg-[#9b8364] transition-all duration-500 group-hover:w-28" />
            </m.article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl border-t border-[#e5ded4] px-6 pb-4 pt-14 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
              <span className="h-px w-10 bg-[#9b8364]" />
              İletişim
            </span>

            <h2 className="max-w-3xl text-4xl font-light leading-[1.06] tracking-[-0.045em] text-[#0f2535] md:text-6xl">
              Bizi daha yakından
              <br />
              tanımak ister misiniz?
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#4b5b66] md:text-lg">
              Projelerimiz, üretim süreçlerimiz ve iş birlikleri hakkında daha
              fazla bilgi almak için bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <Link href="/contact">
            <button
              type="button"
              className="group relative inline-flex cursor-pointer items-center justify-end gap-4 pb-3 text-xs uppercase tracking-[0.24em] text-[#0f2535] transition-all duration-300"
            >
              <span className="relative overflow-hidden">
                <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                  Bize Ulaşın
                </span>

                <span className="absolute left-0 top-full block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                  İletişim
                </span>
              </span>

              <span className="relative flex items-center">
                <span className="h-px w-10 bg-[#0f2535]/35 transition-all duration-500 group-hover:w-16 group-hover:bg-[#0f2535]" />

                <span className="ml-3 flex h-7 w-7 items-center justify-center border border-[#0f2535]/25 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#0f2535]">
                  <FiArrowUpRight className="text-sm transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </span>

              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0f2535] transition-transform duration-500 group-hover:scale-x-100" />
            </button>
          </Link>
        </div>
      </section>
    </section>
  );
};

export default memo(ProjectWorldMap);