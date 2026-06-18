import NextImage from "next/image";
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  type DragHandlers,
} from "framer-motion";

import TurkeyMap from "@/assets/turkey.svg";
import mapHeroImg from "@/assets/hero4.webp";
import { cities, type ProjectLocation } from "@/hooks/aboutData";

type FocusPercent = {
  x: number;
  y: number;
};

type DragConstraints = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

const MAP_ZOOM_SCALE = 1.75;

const percentToNumber = (value: string) => Number(String(value).replace("%", ""));

const getZoomTranslate = (value: string) => {
  const percent = percentToNumber(value);
  return `${(50 - percent) * MAP_ZOOM_SCALE}%`;
};

const domesticProjectInfo = [
  {
    title: "Konut ve Villa Projeleri",
    text: "Özel yaşam alanlarında mutfak, kapı, pervaz, gömme dolap, ahşap yüzey ve iç mekân tamamlayıcılarını projeye özel ölçü ve malzeme diliyle üretiyoruz.",
  },
  {
    title: "Ticari Alanlar",
    text: "Ofis, mağaza, otel ve kurumsal yapılarda kullanım yoğunluğunu, dayanıklılığı ve mekân kimliğini birlikte değerlendiren çözümler geliştiriyoruz.",
  },
  {
    title: "Yerinde Uygulama",
    text: "Üretim sonrası montaj ve uygulama süreçlerini planlı şekilde yöneterek her detayın sahada doğru, temiz ve uzun ömürlü biçimde tamamlanmasını sağlıyoruz.",
  },
];

const ProjectMap = () => {
  const mapFrameRef = useRef<HTMLDivElement | null>(null);
  const mapCanvasRef = useRef<HTMLDivElement | null>(null);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  const shouldReduceMotion = useReducedMotion();

  const [selectedCity, setSelectedCity] = useState<ProjectLocation | null>(
    null
  );
  const [focusedCity, setFocusedCity] = useState<ProjectLocation | null>(null);
  const [dragConstraints, setDragConstraints] = useState<DragConstraints>({
    left: -450,
    right: 450,
    top: -350,
    bottom: 350,
  });

  const calculateDragConstraints = useCallback(() => {
    const frame = mapFrameRef.current;
    const canvas = mapCanvasRef.current;

    if (!frame || !canvas) return;

    const frameRect = frame.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    const scaledWidth = canvasRect.width * MAP_ZOOM_SCALE;
    const scaledHeight = canvasRect.height * MAP_ZOOM_SCALE;

    const overflowX = Math.max((scaledWidth - frameRect.width) / 2, 120);
    const overflowY = Math.max((scaledHeight - frameRect.height) / 2, 90);

    setDragConstraints({
      left: -overflowX,
      right: overflowX,
      top: -overflowY,
      bottom: overflowY,
    });
  }, []);

  const getCurrentFocusPercent = useCallback((): FocusPercent | null => {
    if (!focusedCity || !mapCanvasRef.current) return null;

    const rect = mapCanvasRef.current.getBoundingClientRect();

    const currentX =
      percentToNumber(focusedCity.zoomX) -
      (dragX.get() / (rect.width * MAP_ZOOM_SCALE)) * 100;

    const currentY =
      percentToNumber(focusedCity.zoomY) -
      (dragY.get() / (rect.height * MAP_ZOOM_SCALE)) * 100;

    return { x: currentX, y: currentY };
  }, [dragX, dragY, focusedCity]);

  const handleCityClick = useCallback(
    (city: ProjectLocation) => {
      if (!focusedCity) {
        setSelectedCity(city);
        setFocusedCity(city);
        dragX.set(0);
        dragY.set(0);
        window.requestAnimationFrame(calculateDragConstraints);
        return;
      }

      const currentFocus = getCurrentFocusPercent();

      if (!currentFocus) {
        setSelectedCity(city);
        setFocusedCity(city);
        dragX.set(0);
        dragY.set(0);
        window.requestAnimationFrame(calculateDragConstraints);
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
        window.requestAnimationFrame(calculateDragConstraints);
      }
    },
    [
      calculateDragConstraints,
      dragX,
      dragY,
      focusedCity,
      getCurrentFocusPercent,
    ]
  );

  const resetMap = useCallback(() => {
    setSelectedCity(null);
    setFocusedCity(null);
    dragX.set(0);
    dragY.set(0);
  }, [dragX, dragY]);

  useEffect(() => {
    calculateDragConstraints();

    const frame = mapFrameRef.current;
    const canvas = mapCanvasRef.current;

    if (!frame || !canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      calculateDragConstraints();
    });

    resizeObserver.observe(frame);
    resizeObserver.observe(canvas);

    window.addEventListener("resize", calculateDragConstraints);
    window.addEventListener("orientationchange", calculateDragConstraints);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateDragConstraints);
      window.removeEventListener("orientationchange", calculateDragConstraints);
    };
  }, [calculateDragConstraints]);

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
            Hakkımızda
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
            Türkiye’nin farklı şehirlerinde{" "}
            <span className="font-serif italic text-[#d8c7ad]">
              kalıcı işler
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
            tamamladığımız işleri şehir bazlı inceleyebilirsiniz.
          </m.p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div className="relative self-start">
          <div
            ref={mapFrameRef}
            className="relative flex min-h-[300px] items-center justify-center overflow-hidden md:min-h-[500px] lg:min-h-[560px]"
          >
            <m.div
              animate={{
                scale: focusedCity ? MAP_ZOOM_SCALE : 1,
                x: focusedCity ? getZoomTranslate(focusedCity.zoomX) : "0%",
                y: focusedCity ? getZoomTranslate(focusedCity.zoomY) : "0%",
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
              className="relative w-full origin-center"
            >
              <m.div
                ref={mapCanvasRef}
                drag={!!focusedCity}
                style={{ x: dragX, y: dragY }}
                dragMomentum={false}
                dragElastic={0.04}
                dragConstraints={dragConstraints}
                onDragStart={
                  calculateDragConstraints as unknown as DragHandlers["onDragStart"]
                }
                className={`relative w-full ${
                  focusedCity
                    ? "cursor-grab touch-none active:cursor-grabbing"
                    : ""
                }`}
              >
                <NextImage
                  src={TurkeyMap}
                  alt="Türkiye haritası"
                  className="block h-auto w-full select-none opacity-100"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  priority={false}
                  draggable={false}
                />

                {cities.map((city) => {
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
                      aria-label={`${city.name} projelerini göster`}
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
                        className={`absolute left-1/2 top-7 hidden -translate-x-1/2 whitespace-nowrap bg-[#0f2535] px-3 py-1 text-xs font-medium text-white transition-all duration-300 md:block ${
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

            {focusedCity && (
              <button
                type="button"
                onClick={resetMap}
                className="absolute bottom-6 left-6 z-30 cursor-pointer border border-[#0f2535]/20 bg-white px-5 py-3 text-xs font-medium uppercase tracking-[0.25em] text-[#0f2535] transition-all duration-300 hover:bg-[#0f2535] hover:text-white"
              >
                Haritaya Dön
              </button>
            )}
          </div>
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
                {selectedCity ? "Seçili Şehir" : "Proje Haritası"}
              </span>

              <h2 className="text-4xl font-light tracking-[-0.04em] md:text-5xl">
                {selectedCity
                  ? selectedCity.name
                  : "Şehir seçerek yapılan işleri inceleyin."}
              </h2>

              <p className="mt-6 text-base leading-8 text-[#4b5b66]">
                {selectedCity
                  ? "Bu şehirde tamamlanan örnek iş başlıkları:"
                  : "Harita üzerindeki mavi noktalara tıkladığınızda seçilen şehre yakınlaşılır ve o şehirde yapılan örnek işler burada listelenir."}
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
              Yurt İçi Projeler
            </span>

            <h2 className="max-w-3xl text-4xl font-light leading-[1.06] tracking-[-0.045em] text-[#0f2535] md:text-6xl">
              Türkiye genelinde{" "}
              <span className="font-serif italic text-[#9b8364]">
                ölçülü, temiz
              </span>{" "}
              ve kalıcı uygulamalar.
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
              Yurt içinde yürüttüğümüz projelerde her şehrin mimari dokusunu,
              kullanım alışkanlıklarını ve mekânın ihtiyaçlarını dikkate alarak
              üretim yapıyoruz. Standart bir kalıp yerine; ölçü, malzeme, yüzey,
              renk ve uygulama detaylarını projenin karakterine göre
              şekillendiriyoruz.
            </p>

            <p className="mt-6 text-base leading-8 text-[#4b5b66] md:text-lg">
              Konuttan ticari yapılara, özel villalardan kurumsal alanlara kadar
              geniş bir uygulama sahasında; planlama, imalat, montaj ve son
              kontrol süreçlerini aynı kalite çizgisinde tamamlıyoruz.
            </p>
          </m.div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {domesticProjectInfo.map((item, index) => (
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
    </section>
  );
};

export default memo(ProjectMap);