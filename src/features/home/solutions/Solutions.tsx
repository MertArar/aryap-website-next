"use client";

import NextImage, { type StaticImageData } from "next/image";
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Transition,
  type Variants,
} from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

import img1 from "@/assets/hero1.webp";
import img2 from "@/assets/hero2.webp";
import img3 from "@/assets/hero3.webp";
import img4 from "@/assets/hero4.webp";
import img5 from "@/assets/hero5.webp";
import img6 from "@/assets/hero7.webp";

type SolutionItem = {
  title: string;
  text: string;
  image: StaticImageData;
};

type WindowWithIdleCallback = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout?: number }
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

const solutions: SolutionItem[] = [
  {
    title: "İç Mekan Tasarımı",
    text: "Yaşam alanlarınıza estetik, denge ve zamansız bir karakter kazandırıyoruz.",
    image: img1,
  },
  {
    title: "Mutfak",
    text: "Fonksiyonel, şık ve uzun ömürlü mutfak çözümleri tasarlıyoruz.",
    image: img2,
  },
  {
    title: "Banyo",
    text: "Sade, ferah ve modern banyo alanları için özel uygulamalar sunuyoruz.",
    image: img3,
  },
  {
    title: "Ahşap Kapı",
    text: "Mekânın ruhunu tamamlayan kaliteli ve zarif kapı çözümleri üretiyoruz.",
    image: img4,
  },
  {
    title: "Dekorasyon",
    text: "Doku, renk, ışık ve obje dengesini rafine bir bütünlükle ele alıyoruz.",
    image: img5,
  },
  {
    title: "İş Yerleri",
    text: "Marka kimliğini güçlendiren prestijli ve fonksiyonel ticari alanlar oluşturuyoruz.",
    image: img6,
  },
];

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

const introVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const scrollIndicatorVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 18,
  },
  show: {
    opacity: 1,
    x: 0,
  },
};

const sectionTransition: Transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

const cardTransition: Transition = {
  duration: 0.82,
  ease: [0.16, 1, 0.3, 1],
};

const contentTransition: Transition = {
  duration: 0.68,
  ease: [0.22, 1, 0.36, 1],
};

const imageTransition: Transition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1],
};

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatches = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatches();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatches);
    } else {
      mediaQuery.addListener(updateMatches);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateMatches);
      } else {
        mediaQuery.removeListener(updateMatches);
      }
    };
  }, [query]);

  return matches;
};

const Solutions = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const activeRef = useRef(0);
  const previousImageTimerRef = useRef<number | null>(null);
  const mobileFilterButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [active, setActive] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(
    null
  );

  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const motionSectionTransition = shouldReduceMotion
    ? { duration: 0 }
    : sectionTransition;

  const motionCardTransition = shouldReduceMotion
    ? { duration: 0 }
    : cardTransition;

  const motionContentTransition = shouldReduceMotion
    ? { duration: 0 }
    : contentTransition;

  const motionImageTransition = shouldReduceMotion
    ? { duration: 0 }
    : imageTransition;

  const changeActive = useCallback((index: number) => {
    if (index === activeRef.current) return;

    if (previousImageTimerRef.current) {
      window.clearTimeout(previousImageTimerRef.current);
    }

    setPreviousImageIndex(activeRef.current);

    activeRef.current = index;
    setActive(index);

    previousImageTimerRef.current = window.setTimeout(() => {
      setPreviousImageIndex(null);
    }, 950);
  }, []);

  useEffect(() => {
    if (isDesktop) return;

    const activeButton = mobileFilterButtonRefs.current[active];

    if (!activeButton) return;

    activeButton.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [active, isDesktop, shouldReduceMotion]);

  useEffect(() => {
    const preloadImages = () => {
      solutions.forEach((item, index) => {
        if (index === 0) return;

        const image = new window.Image();
        image.decoding = "async";
        image.src = item.image.src;
      });
    };

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const idleWindow = window as WindowWithIdleCallback;

    if (idleWindow.requestIdleCallback) {
      idleId = idleWindow.requestIdleCallback(preloadImages, {
        timeout: 2200,
      });
    } else {
      timeoutId = window.setTimeout(preloadImages, 1200);
    }

    return () => {
      if (idleId && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (previousImageTimerRef.current) {
        window.clearTimeout(previousImageTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const updateActiveByScroll = () => {
      const section = sectionRef.current;

      if (!section) {
        scrollFrameRef.current = null;
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = Math.max(sectionHeight - windowHeight, 1);
      const progress = clamp(-rect.top / scrollableDistance, 0, 1);

      const nextIndex = Math.min(
        Math.floor(progress * solutions.length),
        solutions.length - 1
      );

      changeActive(nextIndex);

      scrollFrameRef.current = null;
    };

    const handleScroll = () => {
      if (scrollFrameRef.current) return;

      scrollFrameRef.current =
        window.requestAnimationFrame(updateActiveByScroll);
    };

    updateActiveByScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, [changeActive, isDesktop]);

  const goToSolution = useCallback(
    (index: number) => {
      changeActive(index);
    },
    [changeActive]
  );

  const goToPreviousSolution = useCallback(() => {
    goToSolution(active === 0 ? solutions.length - 1 : active - 1);
  }, [active, goToSolution]);

  const goToNextSolution = useCallback(() => {
    goToSolution(active === solutions.length - 1 ? 0 : active + 1);
  }, [active, goToSolution]);

  const activeSolution = solutions[active];
  const previousImage =
    previousImageIndex !== null ? solutions[previousImageIndex] : null;

  const desktopSectionStyle = {
    "--solutions-height": `${solutions.length * 100}svh`,
  } as CSSProperties;

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative hidden bg-[#FAFDFF] text-[#0f2535] lg:block lg:h-[var(--solutions-height)]"
        style={desktopSectionStyle}
      >
        <div className="sticky top-0 flex min-h-[100svh] w-full items-center overflow-hidden py-[clamp(1.5rem,4vh,4.5rem)]">
          <m.div
            variants={scrollIndicatorVariants}
            initial="hidden"
            whileInView="show"
            transition={motionSectionTransition}
            viewport={{ once: true }}
            className="pointer-events-none absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-5 2xl:flex"
          >
            <span className="rotate-90 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.45em] text-[#0f2535]/45">
              Scroll
            </span>

            <div className="relative mt-14 h-28 w-px overflow-hidden bg-[#0f2535]/15">
              <span className="solution-scroll-line absolute left-0 top-0 h-12 w-px bg-[#0f2535]" />
            </div>

            <div className="relative h-3 w-3">
              <span className="solution-pulse absolute inset-0 rounded-full border border-[#0f2535]/45" />
              <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0f2535]" />
            </div>
          </m.div>

          <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 xl:px-10">
            <div className="mb-[clamp(1.25rem,3.2vh,3rem)] flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <m.div
                variants={introVariants}
                initial="hidden"
                whileInView="show"
                transition={motionSectionTransition}
                viewport={{ once: true, amount: 0.35 }}
              >
                <span className="mb-[clamp(0.9rem,2vh,1.25rem)] inline-flex items-center gap-3 text-[clamp(0.65rem,1vw,0.75rem)] font-medium uppercase tracking-[0.28em] text-[#9b8364] sm:tracking-[0.35em]">
                  <span className="h-px w-8 bg-[#9b8364] sm:w-10" />
                  Çözümler
                </span>

                <h2 className="max-w-3xl text-[clamp(1.9rem,4vw,3.75rem)] font-light leading-[1.08] tracking-[-0.04em]">
                  Mekânınıza değer katan özel üretim ve tasarım çözümleri.
                </h2>
              </m.div>
            </div>

            <div className="grid grid-cols-1 gap-[clamp(1.5rem,3vw,3rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center xl:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[clamp(300px,40vh,420px)]">
                {solutions.map((item, index) => {
                  const isActive = active === index;
                  const offset = index - active;
                  const behindIndex = Math.max(offset, 0);

                  return (
                    <m.div
                      key={item.title}
                      animate={{
                        y: isActive ? 0 : behindIndex * 24,
                        x: isActive ? 0 : behindIndex * 7,
                        scale: isActive ? 1 : 1 - behindIndex * 0.026,
                        opacity: offset < 0 ? 0 : 1 - behindIndex * 0.08,
                      }}
                      style={{
                        zIndex: isActive ? 50 : 40 - behindIndex,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      transition={motionCardTransition}
                      className="absolute left-0 top-0 w-full"
                    >
                      <div
                        className={`relative min-h-[clamp(280px,36vh,390px)] overflow-hidden rounded-[clamp(1.4rem,3vw,2.2rem)] border p-[clamp(1.35rem,2.4vw,2.5rem)] shadow-2xl transition-[background-color,border-color,box-shadow] duration-500 ${
                          isActive
                            ? "border-[#0f2535]/10 bg-white shadow-[#0f2535]/15"
                            : "border-[#e3d8c8] bg-white/70 shadow-[#0f2535]/5"
                        }`}
                      >
                        <div className="relative z-10">
                          <span
                            className={`mb-[clamp(1.2rem,3vh,2rem)] block text-xs tracking-[0.4em] transition-colors duration-500 ${
                              isActive ? "text-[#9b8364]" : "text-[#b6a588]"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <div className="flex items-start justify-between gap-6">
                            <h3
                              className={`max-w-md text-[clamp(1.6rem,2.7vw,2.5rem)] font-light leading-tight tracking-[-0.04em] transition-colors duration-500 ${
                                isActive
                                  ? "text-[#0f2535]"
                                  : "text-[#0f2535]/55"
                              }`}
                            >
                              {item.title}
                            </h3>

                            <BsArrowRight
                              className={`mt-2 shrink-0 text-[clamp(1.25rem,2vw,1.5rem)] transition-[color,transform] duration-500 ${
                                isActive
                                  ? "-rotate-45 text-[#9b8364]"
                                  : "rotate-0 text-[#9b8364]/40"
                              }`}
                            />
                          </div>

                          <m.div
                            initial={false}
                            animate={{
                              height: isActive ? "auto" : 0,
                              opacity: isActive ? 1 : 0,
                              y: isActive ? 0 : 18,
                            }}
                            transition={motionContentTransition}
                            className="overflow-hidden"
                          >
                            <p className="mt-[clamp(1.25rem,3vh,2rem)] max-w-xl text-[clamp(0.9rem,1.1vw,1rem)] leading-[1.9] text-[#5c6a73]">
                              {item.text}
                            </p>

                            <div className="mt-[clamp(1.4rem,3.5vh,2.25rem)] flex items-center gap-4">
                              <div className="h-px flex-1 bg-gradient-to-r from-[#9b8364]/45 via-[#d8c7ad]/40 to-transparent" />
                              <span className="text-xs uppercase tracking-[0.3em] text-[#9b8364]">
                                Aryap
                              </span>
                            </div>
                          </m.div>
                        </div>

                        <div
                          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="absolute -bottom-28 -right-24 h-[320px] w-[320px] rounded-full bg-[#d8c7ad]/30 blur-3xl" />
                        </div>
                      </div>
                    </m.div>
                  );
                })}
              </div>

              <div className="relative">
                <div className="flex items-center gap-[clamp(1rem,2vw,1.5rem)]">
                  <div className="relative min-h-[clamp(360px,56vh,540px)] flex-1 overflow-hidden rounded-[clamp(1.6rem,3vw,2.5rem)] bg-[#0f2535] shadow-2xl shadow-[#0f2535]/20">
                    {previousImage && (
                      <m.div
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.04 }}
                        transition={motionImageTransition}
                        className="absolute inset-0"
                      >
                        <NextImage
                          src={previousImage.image}
                          alt=""
                          fill
                          sizes="(min-width: 1280px) 660px, (min-width: 1024px) 52vw, 100vw"
                          quality={82}
                          className="object-cover"
                          aria-hidden="true"
                        />
                      </m.div>
                    )}

                    <m.div
                      key={activeSolution.title}
                      initial={
                        shouldReduceMotion
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 1.06 }
                      }
                      animate={{ opacity: 1, scale: 1 }}
                      transition={motionImageTransition}
                      className="absolute inset-0"
                    >
                      <NextImage
                        src={activeSolution.image}
                        alt={activeSolution.title}
                        fill
                        priority={active === 0}
                        sizes="(min-width: 1280px) 660px, (min-width: 1024px) 52vw, 100vw"
                        quality={84}
                        placeholder="blur"
                        className="object-cover"
                      />
                    </m.div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f2535]/85 via-[#0f2535]/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-[clamp(1.5rem,3vw,2.5rem)]">
                      <span className="mb-4 block text-[clamp(0.65rem,1vw,0.75rem)] uppercase tracking-[0.35em] text-[#d8c7ad]">
                        Selected Service
                      </span>

                      <h3 className="max-w-xl text-[clamp(1.6rem,2.8vw,2.5rem)] font-light leading-tight text-white">
                        {activeSolution.title}
                      </h3>

                      <p className="mt-[clamp(1rem,2vh,1.25rem)] max-w-lg text-[clamp(0.85rem,1.1vw,1rem)] leading-7 text-white/75">
                        {activeSolution.text}
                      </p>
                    </div>
                  </div>

                  <div className="hidden flex-col items-center gap-4 xl:flex">
                    {solutions.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => goToSolution(index)}
                        aria-label={`Go to solution ${index + 1}`}
                        className={`h-3 w-3 cursor-pointer rounded-full transition-[background-color,transform] duration-500 ${
                          active === index
                            ? "scale-125 bg-[#0f2535]"
                            : "bg-[#cdbfaa] hover:bg-[#9b8364]"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 hidden justify-center gap-3 lg:flex xl:hidden">
                  {solutions.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToSolution(index)}
                      aria-label={`Go to solution ${index + 1}`}
                      className={`h-3 w-3 cursor-pointer rounded-full transition-[background-color,transform] duration-500 ${
                        active === index
                          ? "scale-125 bg-[#0f2535]"
                          : "bg-[#cdbfaa] hover:bg-[#9b8364]"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>
          {`
            @keyframes solutionScrollLine {
              from {
                transform: translateY(-100%);
              }
              to {
                transform: translateY(130%);
              }
            }

            @keyframes solutionPulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.6;
              }
              50% {
                transform: scale(1.9);
                opacity: 0;
              }
            }

            .solution-scroll-line {
              animation: solutionScrollLine 1.65s cubic-bezier(0.65, 0, 0.35, 1) infinite;
            }

            .solution-pulse {
              animation: solutionPulse 1.8s ease-in-out infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .solution-scroll-line,
              .solution-pulse {
                animation: none !important;
              }
            }
          `}
        </style>
      </section>

      <section className="relative overflow-hidden bg-[#FAFDFF] px-5 py-24 text-[#0f2535] sm:px-6 md:py-28 lg:hidden">
        <div className="mx-auto w-full max-w-3xl">
          <m.div
            variants={introVariants}
            initial="hidden"
            whileInView="show"
            transition={motionSectionTransition}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="mb-4 inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[#9b8364] sm:tracking-[0.35em]">
              <span className="h-px w-8 bg-[#9b8364]" />
              Çözümler
            </span>

            <h2 className="max-w-2xl text-[clamp(2rem,8vw,3.5rem)] font-light leading-[1.08] tracking-[-0.04em]">
              Mekânınıza değer katan özel üretim ve tasarım çözümleri.
            </h2>
          </m.div>

          <div className="mt-8 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex min-w-max gap-3 px-[calc((100vw-100%)/2)]">
              {solutions.map((item, index) => (
                <button
                  key={item.title}
                  ref={(element) => {
                    mobileFilterButtonRefs.current[index] = element;
                  }}
                  type="button"
                  onClick={() => goToSolution(index)}
                  className={`rounded-full border px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition-[background-color,border-color,color,transform] duration-300 ${
                    active === index
                      ? "scale-[1.02] border-[#0f2535] bg-[#0f2535] text-white"
                      : "border-[#d8c7ad] bg-white text-[#0f2535]/65"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-[#0f2535] shadow-2xl shadow-[#0f2535]/20 sm:min-h-[620px] md:min-h-[680px]">
              {previousImage && (
                <m.div
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.04 }}
                  transition={motionImageTransition}
                  className="absolute inset-0"
                >
                  <NextImage
                    src={previousImage.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 720px, calc(100vw - 40px)"
                    quality={80}
                    className="object-cover"
                    aria-hidden="true"
                  />
                </m.div>
              )}

              <m.div
                key={`mobile-image-${activeSolution.title}`}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 1.06 }
                }
                animate={{ opacity: 1, scale: 1 }}
                transition={motionImageTransition}
                className="absolute inset-0"
              >
                <NextImage
                  src={activeSolution.image}
                  alt={activeSolution.title}
                  fill
                  priority={active === 0}
                  sizes="(min-width: 768px) 720px, calc(100vw - 40px)"
                  quality={82}
                  placeholder="blur"
                  className="object-cover"
                />
              </m.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#07131d]/92 via-[#07131d]/35 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                <m.div
                  key={`mobile-overlay-${activeSolution.title}`}
                  initial={
                    shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={motionContentTransition}
                >
                  <span className="mb-5 block text-xs font-medium uppercase tracking-[0.35em] text-[#d8c7ad]">
                    {String(active + 1).padStart(2, "0")} /{" "}
                    {String(solutions.length).padStart(2, "0")}
                  </span>

                  <div className="flex items-end justify-between gap-6">
                    <h3 className="max-w-[520px] text-[clamp(2rem,9vw,4rem)] font-light leading-[1.02] tracking-[-0.05em] text-white">
                      {activeSolution.title}
                    </h3>

                    <BsArrowRight className="mb-2 shrink-0 -rotate-45 text-3xl text-[#d8c7ad]" />
                  </div>

                  <p className="mt-6 max-w-xl text-base leading-8 text-white/78 sm:text-lg">
                    {activeSolution.text}
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#d8c7ad]/65 via-white/25 to-transparent" />
                    <span className="text-xs uppercase tracking-[0.3em] text-[#d8c7ad]">
                      Aryap
                    </span>
                  </div>
                </m.div>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={goToPreviousSolution}
              className="rounded-full border border-[#d8c7ad] bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f2535] transition-colors duration-300 hover:border-[#0f2535]"
            >
              Önceki
            </button>

            <div className="flex items-center gap-2">
              {solutions.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSolution(index)}
                  aria-label={`Go to solution ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    active === index
                      ? "w-8 bg-[#0f2535]"
                      : "w-2.5 bg-[#cdbfaa]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNextSolution}
              className="rounded-full border border-[#0f2535] bg-[#0f2535] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-[#9b8364] hover:bg-[#9b8364]"
            >
              Sonraki
            </button>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default memo(Solutions);