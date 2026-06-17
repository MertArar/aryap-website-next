"use client";

import Link from "next/link";
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type Transition,
  type Variants,
} from "framer-motion";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiCompass,
  FiMaximize2,
  FiPenTool,
  FiTool,
  type IconType,
} from "react-icons/fi";

type SolutionItem = {
  id: string;
  title: string;
  eyebrow: string;
  icon: IconType;
  intro: string;
  description: string;
  details: string[];
  result: string;
};

type AutoFitHeroTitleProps = {
  children: ReactNode;
};

const solutions: SolutionItem[] = [
  {
    id: "ozel-uretim",
    title: "Özel Üretim",
    eyebrow: "Mekâna ve ölçüye göre",
    icon: FiTool,
    intro:
      "Standart ölçülere bağlı kalmadan, projenin ihtiyacına göre özel üretim çözümleri geliştiriyoruz.",
    description:
      "Özel üretim sürecinde mekân ölçüsü, kullanım ihtiyacı, malzeme karakteri ve uygulama detayları birlikte değerlendirilir. Mobilya, panel, kaplama, kapı, pervaz ve tamamlayıcı ahşap elemanlar; projenin kendi diliyle uyumlu olacak şekilde üretilir.",
    details: [
      "Özel ölçü mobilya üretimi",
      "Ahşap panel ve yüzey kaplama",
      "Kapı, pervaz ve tamamlayıcı üretimler",
      "Proje bazlı teknik üretim planı",
    ],
    result:
      "Sonuç; mekâna tam oturan, kullanım ihtiyacını karşılayan ve uzun ömürlü bir üretim dili olur.",
  },
  {
    id: "mobilya-tasarimi",
    title: "Mobilya Tasarımı",
    eyebrow: "Estetik ve fonksiyon dengesi",
    icon: FiPenTool,
    intro:
      "Mobilyayı yalnızca bir ürün değil, mekânın kullanım biçimini belirleyen ana parçalardan biri olarak ele alıyoruz.",
    description:
      "Mobilya tasarımı sürecinde depolama ihtiyacı, ergonomi, malzeme seçimi, yüzey dili ve mekânın genel atmosferi birlikte düşünülür. Yaşam alanları, mutfak, banyo, ofis ve ticari mekânlara özel tasarım kararları geliştirilir.",
    details: [
      "TV ünitesi, dolap ve raf sistemleri",
      "Mutfak ve banyo mobilyaları",
      "Ofis ve ticari alan mobilyaları",
      "Renk, malzeme ve yüzey danışmanlığı",
    ],
    result:
      "Her mobilya, bulunduğu alanın karakterini tamamlayan işlevsel ve estetik bir unsur olarak tasarlanır.",
  },
  {
    id: "ic-mimari",
    title: "İç Mimari",
    eyebrow: "Mekân kimliği ve bütünlük",
    icon: FiMaximize2,
    intro:
      "İç mimari yaklaşımımızda yüzey, mobilya, ışık, malzeme ve kullanım senaryosu aynı bütünün parçalarıdır.",
    description:
      "İç mekânlarda yalnızca tekil ürünler değil, bütün bir atmosfer kurgulanır. Duvar yüzeylerinden özel üretim mobilyalara, dekoratif detaylardan malzeme geçişlerine kadar mekânın kimliğini oluşturan unsurlar birlikte planlanır.",
    details: [
      "Yaşam alanı kurgu ve tasarımı",
      "Duvar paneli ve dekoratif yüzeyler",
      "Mekâna özel renk ve malzeme dili",
      "Uygulama ve montaj süreci takibi",
    ],
    result:
      "Amaç; kullanışlı, dengeli, sakin ve karakter sahibi bir mekân deneyimi oluşturmaktır.",
  },
];

const processSteps = [
  {
    title: "Keşif",
    text: "Mekânın ölçüsü, kullanım ihtiyacı ve üretim beklentisi yerinde değerlendirilir.",
  },
  {
    title: "Tasarım",
    text: "Malzeme, yüzey, renk ve detay kararları projenin karakterine göre netleştirilir.",
  },
  {
    title: "Üretim",
    text: "Atölye süreci teknik plana uygun, kontrollü ve temiz bir üretim akışıyla yürütülür.",
  },
  {
    title: "Uygulama",
    text: "Montaj, yerinde kontrol ve son dokunuşlar tamamlanarak proje teslim edilir.",
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

const mainTransition: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

const sectionTransition: Transition = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1],
};

const accordionTransition: Transition = {
  duration: 0.34,
  ease: [0.16, 1, 0.3, 1],
};

const AutoFitHeroTitle = memo(({ children }: AutoFitHeroTitleProps) => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  const fitText = useCallback(() => {
    const box = boxRef.current;
    const text = textRef.current;

    if (!box || !text) return;

    const boxWidth = box.clientWidth;
    const boxHeight = box.clientHeight;

    if (!boxWidth || !boxHeight) return;

    const maxFontSize = Math.min(Math.max(boxWidth * 0.115, 40), 72);
    const minFontSize = 12;

    text.style.fontSize = `${maxFontSize}px`;
    text.style.lineHeight = "1.02";
    text.style.whiteSpace = "normal";
    text.style.wordBreak = "normal";
    text.style.overflowWrap = "normal";
    text.style.hyphens = "none";

    let low = minFontSize;
    let high = maxFontSize;
    let best = minFontSize;

    for (let i = 0; i < 42; i += 1) {
      const mid = (low + high) / 2;

      text.style.fontSize = `${mid}px`;

      const fitsWidth = text.scrollWidth <= boxWidth + 1;
      const fitsHeight = text.scrollHeight <= boxHeight + 1;

      if (fitsWidth && fitsHeight) {
        best = mid;
        low = mid;
      } else {
        high = mid;
      }
    }

    text.style.fontSize = `${best}px`;
  }, []);

  useLayoutEffect(() => {
    let frameId: number | null = null;
    let isMounted = true;

    const runFit = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      frameId = window.requestAnimationFrame(() => {
        if (isMounted) fitText();
      });
    };

    runFit();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) runFit();
      });
    }

    const resizeObserver = new ResizeObserver(runFit);

    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }

    window.addEventListener("resize", runFit);
    window.addEventListener("orientationchange", runFit);

    return () => {
      isMounted = false;

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      resizeObserver.disconnect();
      window.removeEventListener("resize", runFit);
      window.removeEventListener("orientationchange", runFit);
    };
  }, [fitText, children]);

  return (
    <div
      ref={boxRef}
      className="h-[clamp(8.5rem,22vh,17rem)] w-full max-w-5xl min-w-0 overflow-visible"
    >
      <h1
        ref={textRef}
        className="max-w-5xl font-light leading-[1.02] tracking-[-0.06em] text-white"
        style={{
          fontSize: "72px",
          wordBreak: "normal",
          overflowWrap: "normal",
          hyphens: "none",
          whiteSpace: "normal",
        }}
      >
        {children}
      </h1>
    </div>
  );
});

AutoFitHeroTitle.displayName = "AutoFitHeroTitle";

const SolutionsPage = () => {
  const searchParams = useSearchParams();
  const [activeId, setActiveId] = useState<string | null>(solutions[0].id);
  const marqueeRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const heroTransition = shouldReduceMotion ? { duration: 0 } : mainTransition;
  const motionSectionTransition = shouldReduceMotion
    ? { duration: 0 }
    : sectionTransition;
  const motionAccordionTransition = shouldReduceMotion
    ? { duration: 0 }
    : accordionTransition;

  const toggleAccordion = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  useEffect(() => {
    const selectedService = searchParams.get("service");
    const isValidService = solutions.some(
      (solution) => solution.id === selectedService
    );

    if (selectedService && isValidService) {
      setActiveId(selectedService);

      if (window.location.hash === "#hizmet-alanlari") {
        window.setTimeout(() => {
          document.getElementById("hizmet-alanlari")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 80);
      }

      return;
    }

    if (!selectedService) {
      setActiveId(solutions[0].id);
    }
  }, [searchParams]);

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-white text-[#0f2535] [overflow-x:clip]">
        <section className="relative overflow-hidden bg-[#0d0d0d] px-6 pb-20 pt-36 text-white sm:px-8 lg:px-10 lg:pb-24 lg:pt-40">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(118deg,#0d0d0d_0%,#111a20_52%,#0d0d0d_100%)]" />
            <div className="absolute left-[-16%] top-[-36%] h-[520px] w-[520px] rounded-full bg-[#9b8364]/20 blur-[150px]" />
            <div className="absolute right-[-22%] top-[8%] h-[620px] w-[620px] rounded-full bg-[#1E4E6E]/16 blur-[170px]" />
            <div className="absolute bottom-[-42%] left-[28%] h-[520px] w-[520px] rounded-full bg-white/[0.045] blur-[160px]" />

            <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
            <div className="absolute left-[8%] top-[34%] hidden h-px w-[84%] bg-white/[0.055] lg:block" />
            <div className="absolute left-[64%] top-0 hidden h-full w-px bg-white/[0.055] lg:block" />
          </div>

          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <m.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                transition={heroTransition}
              >
                <span className="mb-7 inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.36em] text-[#d8c7ad]">
                  <span className="h-px w-12 bg-[#d8c7ad]" />
                  Çözümler
                </span>

                <AutoFitHeroTitle>
                  Mekânın ihtiyacına göre{" "}
                  <span className="font-serif italic text-[#d8c7ad]">
                    tasarım
                  </span>{" "}
                  ve üretim.
                </AutoFitHeroTitle>

                <p className="mt-7 max-w-2xl text-sm leading-7 text-white/66 md:text-base md:leading-8">
                  Özel üretim, mobilya tasarımı ve iç mimari çözümleri; ölçü,
                  malzeme, kullanım ve uygulama detaylarıyla birlikte ele
                  alınır.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/contact"
                    className="group inline-flex w-fit items-center gap-4 rounded-full bg-white px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f2535] transition-all duration-500 hover:bg-[#d8c7ad]"
                  >
                    Teklif Al
                    <FiArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/projects"
                    className="group inline-flex w-fit items-center gap-4 rounded-full border border-white/18 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-[#0f2535]"
                  >
                    Projeleri İncele
                    <FiArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, x: 45, filter: "blur(12px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.85,
                        delay: 0.12,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="hidden lg:block"
              >
                <div className="ml-auto max-w-md border-l border-white/12 pl-10">
                  <FiCompass className="text-3xl text-[#d8c7ad]" />

                  <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.34em] text-[#d8c7ad]">
                    Çalışma Prensibi
                  </p>

                  <p className="mt-5 text-2xl font-light leading-[1.22] tracking-[-0.045em] text-white">
                    Tasarım kararı, üretim detayı ve uygulama süreci aynı
                    çizgide ilerler.
                  </p>

                  <div className="mt-8 space-y-4">
                    {solutions.map((solution) => (
                      <div
                        key={solution.id}
                        className="flex items-center justify-between border-t border-white/12 pt-4"
                      >
                        <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/54">
                          {solution.title}
                        </span>

                        <span className="h-px w-12 bg-[#d8c7ad]/60" />
                      </div>
                    ))}
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        <section
          ref={marqueeRef}
          className="relative overflow-hidden bg-[#FAFDFF] py-8"
        >
          <m.div
            style={{ x: shouldReduceMotion ? "0%" : marqueeX }}
            className="pointer-events-none flex w-max select-none whitespace-nowrap text-[clamp(3rem,8vw,8rem)] font-light leading-none tracking-[-0.08em] text-[#0f2535]/[0.07]"
          >
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} className="pr-12">
                Özel Üretim · Mobilya Tasarımı · İç Mimari ·
              </span>
            ))}
          </m.div>
        </section>

        <section
          id="hizmet-alanlari"
          className="relative scroll-mt-28 bg-gradient-to-b from-[#FAFDFF] via-[#F2F5F7] to-white px-6 py-20 sm:px-8 lg:px-10 lg:py-28"
        >
          <div className="mx-auto max-w-7xl">
            <div className="relative grid items-start gap-16 lg:grid-cols-[0.9fr_1.1fr]">
              <aside className="lg:sticky lg:top-28 lg:h-fit lg:self-start">
                <m.div
                  initial={{ opacity: 0, x: -38, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={motionSectionTransition}
                >
                  <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                    <span className="h-px w-10 bg-[#9b8364]" />
                    Hizmet Alanları
                  </span>

                  <h2 className="max-w-4xl text-5xl font-light leading-[1.02] tracking-[-0.055em] text-[#0f2535] md:text-7xl">
                    İhtiyaca göre{" "}
                    <span className="font-serif italic text-[#9b8364]">
                      şekillenen
                    </span>{" "}
                    çözümler.
                  </h2>

                  <p className="mt-7 max-w-md text-sm leading-7 text-[#4b5b66] md:text-base md:leading-8">
                    Her hizmet alanı farklı bir ihtiyaca cevap verir. Tasarım,
                    üretim ve uygulama kararları proje özelinde birlikte
                    değerlendirilir.
                  </p>
                </m.div>
              </aside>

              <m.div
                initial={{ opacity: 0, x: 38, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.75,
                        delay: 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="max-w-2xl"
              >
                <div className="border-t border-[#ded6c8]">
                  {solutions.map((solution) => {
                    const Icon = solution.icon;
                    const isActive = activeId === solution.id;

                    return (
                      <article
                        key={solution.id}
                        className="border-b border-[#ded6c8]"
                      >
                        <button
                          type="button"
                          onClick={() => toggleAccordion(solution.id)}
                          className="group flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left focus:outline-none focus-visible:outline-none"
                        >
                          <div className="flex items-start gap-4">
                            <span
                              className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-500 ${
                                isActive
                                  ? "bg-[#0f2535] text-white"
                                  : "bg-white text-[#0f2535]/45 group-hover:bg-[#0f2535] group-hover:text-white"
                              }`}
                            >
                              <Icon className="text-sm" />
                            </span>

                            <div>
                              <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#9b8364]">
                                {solution.eyebrow}
                              </p>

                              <h3
                                className={`mt-2 text-2xl font-light leading-[1.08] tracking-[-0.05em] transition-colors duration-500 md:text-4xl ${
                                  isActive
                                    ? "text-[#0f2535]"
                                    : "text-[#0f2535]/60 group-hover:text-[#0f2535]"
                                }`}
                              >
                                {solution.title}
                              </h3>

                              <p className="mt-3 max-w-xl text-sm leading-7 text-[#4b5b66]/78">
                                {solution.intro}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-0 bg-white outline-none transition-all duration-500 ${
                              isActive
                                ? "rotate-180 text-[#1E4E6E]"
                                : "text-[#0f2535] group-hover:text-[#1E4E6E]"
                            }`}
                          >
                            <FiChevronDown className="text-lg" />
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <m.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={motionAccordionTransition}
                              className="overflow-hidden"
                            >
                              <div className="pb-6 pl-0 md:pl-13">
                                <p className="max-w-xl text-sm leading-7 text-[#4b5b66]">
                                  {solution.description}
                                </p>

                                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                                  {solution.details.map((detail) => (
                                    <div
                                      key={detail}
                                      className="flex items-start gap-3 border-t border-[#ded6c8] pt-4"
                                    >
                                      <FiCheck className="mt-1 shrink-0 text-[#9b8364]" />

                                      <p className="text-sm leading-7 text-[#4b5b66]">
                                        {detail}
                                      </p>
                                    </div>
                                  ))}
                                </div>

                                <p className="mt-5 border-t border-[#ded6c8] pt-5 text-sm leading-7 text-[#0f2535]/58">
                                  {solution.result}
                                </p>
                              </div>
                            </m.div>
                          )}
                        </AnimatePresence>
                      </article>
                    );
                  })}
                </div>
              </m.div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F2F5F7] to-[#FAFDFF] px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 max-w-3xl">
              <m.p
                initial={{ opacity: 0, y: 22, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.65,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="text-xs font-medium uppercase tracking-[0.34em] text-[#9b8364]"
              >
                Çalışma Akışı
              </m.p>

              <m.h2
                initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-120px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.75,
                        delay: 0.06,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="mt-4 text-4xl font-light leading-[1.04] tracking-[-0.055em] text-[#0f2535] md:text-6xl"
              >
                Fikirden uygulamaya temiz ve kontrollü bir süreç.
              </m.h2>
            </div>

            <m.div
              initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={motionSectionTransition}
              className="border-t border-[#ded6c8]"
            >
              {processSteps.map((item, index) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.55,
                          delay: index * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  className="group relative grid gap-6 border-b border-[#ded6c8] py-8 md:grid-cols-[140px_0.7fr_1.3fr] md:items-start lg:py-10"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#9b8364]/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="h-px w-10 bg-[#9b8364]/45 transition-all duration-500 group-hover:w-16 group-hover:bg-[#9b8364]" />
                  </div>

                  <h3 className="text-3xl font-light leading-[1.05] tracking-[-0.045em] text-[#0f2535] transition-colors duration-500 group-hover:text-[#9b8364] md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="max-w-2xl text-sm leading-7 text-[#4b5b66] md:text-base md:leading-8">
                    {item.text}
                  </p>

                  <div className="pointer-events-none absolute bottom-[-1px] left-0 h-px w-0 bg-[#9b8364] transition-all duration-700 group-hover:w-full" />
                </m.div>
              ))}
            </m.div>
          </div>
        </section>

        <section className="bg-[#FAFDFF] px-6 pb-20 pt-14 sm:px-8 lg:px-10 lg:pb-28 lg:pt-20">
          <div className="mx-auto max-w-7xl border-t border-[#ded6c8] pt-12">
            <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
              <div>
                <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                  <span className="h-px w-10 bg-[#9b8364]" />
                  Projeniz İçin
                </span>

                <h2 className="max-w-3xl text-4xl font-light leading-[1.06] tracking-[-0.045em] text-[#0f2535] md:text-6xl">
                  Mekânınıza özel çözümü
                  <br />
                  birlikte geliştirelim.
                </h2>
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
          </div>
        </section>
      </main>
    </LazyMotion>
  );
};

export default memo(SolutionsPage);