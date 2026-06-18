"use client";

import NextImage, { type StaticImageData } from "next/image";
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
import {
  LazyMotion,
  domAnimation,
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Transition,
} from "framer-motion";

import heroImg from "@/assets/hero4.webp";
import aboutImg from "@/assets/hero5.webp";

import woodCutImg from "@/assets/m1.webp";
import cncImg from "@/assets/cnc.webp";
import pvcImg from "@/assets/pvc.webp";
import pervazImg from "@/assets/woodmachine.webp";
import paintImg from "@/assets/painting.webp";

import visionImg from "@/assets/hero6.webp";
import missionImg from "@/assets/hero2.webp";

type StatItem = {
  value: number | string;
  suffix: string;
  title: string;
};

type ProductionItem = {
  title: string;
  text: string;
  image: StaticImageData;
};

type VisionMissionItem = {
  title: string;
  image: StaticImageData;
  text: string;
};

type CountUpProps = {
  value: number | string;
  suffix?: string;
};

type AutoFitHeroTitleProps = {
  children: ReactNode;
};

type PremiumLinkButtonProps = {
  children: ReactNode;
  dark?: boolean;
  href?: string;
};

const stats: StatItem[] = [
  { value: 35, suffix: "+", title: "Yıl Deneyim" },
  { value: 1000, suffix: "+", title: "Proje" },
  { value: 20, suffix: "+", title: "Çalışan" },
  { value: "∞", suffix: "", title: "Memnuniyet" },
];

const productionItems: ProductionItem[] = [
  {
    title: "Ahşap Kesim",
    text: "Üretim süreci, projeye uygun ölçülendirme ve temiz kesim aşamasıyla başlar. Malzeme kaybını azaltan, doğru formu önceleyen kontrollü bir hazırlık yapılır.",
    image: woodCutImg,
  },
  {
    title: "CNC Lazer Üretim",
    text: "Detaylı desen, kanal, yüzey işleme ve özel kesim ihtiyaçları CNC lazer sistemleriyle hassas biçimde uygulanır.",
    image: cncImg,
  },
  {
    title: "PVC Kaplama",
    text: "Yüzey dayanıklılığını artırmak, renk ve doku bütünlüğünü korumak için PVC kaplama işlemleri uygulanır.",
    image: pvcImg,
  },
  {
    title: "Pervaz Üretimi",
    text: "Kapı, mobilya ve iç mekân uygulamalarına uygun pervazlar projeye özel ölçü ve formlarla üretilir.",
    image: pervazImg,
  },
  {
    title: "Ahşap Boya",
    text: "Son aşamada yüzeyler koruyucu ve estetik boya işlemlerinden geçirilir. Doğal ahşap karakteri korunurken güçlü bir bitiş elde edilir.",
    image: paintImg,
  },
];

const productionFeatures = [
  "Teknik ölçülendirme",
  "Aşamalı kalite kontrol",
  "Temiz ve uzun ömürlü teslim",
];

const visionMissionItems: VisionMissionItem[] = [
  {
    title: "Vizyonumuz",
    image: visionImg,
    text: "Ahşap, mobilya ve iç mekân üretiminde güvenilir işçilik, kaliteli malzeme ve sade tasarım anlayışıyla tercih edilen, uzun vadeli değer üreten bir marka olmak.",
  },
  {
    title: "Misyonumuz",
    image: missionImg,
    text: "Her projede doğru planlama, hassas üretim ve temiz uygulama ilkeleriyle çalışmak; müşterilerimize estetik, fonksiyonel ve uzun ömürlü çözümler sunmak.",
  },
];

const defaultTransition: Transition = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1],
};

const CountUp = memo(({ value, suffix = "" }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || typeof value !== "number") return;

    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    const duration = 1400;
    const startTime = performance.now();
    let frameId: number | null = null;

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isInView, shouldReduceMotion, value]);

  return (
    <span ref={ref}>
      {typeof value === "number" ? count : value}
      {suffix}
    </span>
  );
});

CountUp.displayName = "CountUp";

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

    const maxFontSize = Math.min(Math.max(boxWidth * 0.145, 48), 96);
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
      className="h-[clamp(13rem,34vh,27rem)] w-full max-w-4xl min-w-0 overflow-visible"
    >
      <h1
        ref={textRef}
        className="max-w-4xl font-light leading-[1.02] tracking-[-0.05em] text-white"
        style={{
          fontSize: "96px",
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

const PremiumLinkButton = memo(
  ({ children, dark = false, href = "/company" }: PremiumLinkButtonProps) => {
    return (
      <Link
        href={href}
        className={`group relative inline-flex w-fit items-center overflow-hidden border px-7 py-4 text-xs font-medium uppercase tracking-[0.28em] transition-all duration-500 ${
          dark
            ? "border-white/25 text-white hover:border-[#9b8364]"
            : "border-[#d8c7ad] text-[#0f2535] hover:border-[#0f2535]"
        }`}
      >
        <span
          className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
            dark ? "bg-[#9b8364]" : "bg-[#0f2535]"
          }`}
        />

        <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
          {children}
        </span>

        <span className="relative z-10 ml-4 h-px w-8 bg-current transition-all duration-500 group-hover:w-12" />
      </Link>
    );
  }
);

PremiumLinkButton.displayName = "PremiumLinkButton";

const CompanyPage = () => {
  const pageRef = useRef<HTMLElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const productionRef = useRef<HTMLElement | null>(null);
  const missionRef = useRef<HTMLElement | null>(null);

  const shouldReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 120]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.08]);

  const heroContentY = useTransform(heroProgress, [0, 1], [0, -160]);
  const heroContentOpacity = useTransform(heroProgress, [0, 0.55], [1, 0]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [0.55, 0.88]);
  const heroBlur = useTransform(heroProgress, [0, 1], [
    "blur(0px)",
    "blur(8px)",
  ]);
  const heroClip = useTransform(
    heroProgress,
    [0, 1],
    ["inset(0% 0% 0% 0%)", "inset(8% 8% 8% 8%)"]
  );

  const aboutLeftX = useTransform(aboutProgress, [0.72, 1], [0, -180]);
  const aboutRightX = useTransform(aboutProgress, [0.72, 1], [0, 180]);
  const aboutSideOpacity = useTransform(
    aboutProgress,
    [0, 0.7, 1],
    [1, 1, 0]
  );

  const safeHeroY = shouldReduceMotion ? 0 : heroY;
  const safeHeroScale = shouldReduceMotion ? 1 : heroScale;
  const safeHeroContentY = shouldReduceMotion ? 0 : heroContentY;
  const safeHeroContentOpacity = shouldReduceMotion ? 1 : heroContentOpacity;
  const safeHeroOverlayOpacity = shouldReduceMotion
    ? 0.65
    : heroOverlayOpacity;
  const safeHeroBlur = shouldReduceMotion ? "blur(0px)" : heroBlur;
  const safeHeroClip = shouldReduceMotion
    ? "inset(0% 0% 0% 0%)"
    : heroClip;

  const safeAboutLeftX = shouldReduceMotion ? 0 : aboutLeftX;
  const safeAboutRightX = shouldReduceMotion ? 0 : aboutRightX;
  const safeAboutSideOpacity = shouldReduceMotion ? 1 : aboutSideOpacity;

  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : defaultTransition;

  useEffect(() => {
    const handleScroll = () => {
      const productionTop =
        productionRef.current?.getBoundingClientRect().top ??
        Number.POSITIVE_INFINITY;

      const missionTop =
        missionRef.current?.getBoundingClientRect().top ??
        Number.POSITIVE_INFINITY;

      if (missionTop <= window.innerHeight * 0.55) {
        setTheme("light");
      } else if (productionTop <= window.innerHeight * 0.55) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <main
        ref={pageRef}
        className={`min-h-screen overflow-hidden transition-colors duration-700 ease-in-out ${
          theme === "dark"
            ? "bg-[#0d0d0d] text-white"
            : "bg-white text-[#0f2535]"
        }`}
      >
        <section
          ref={heroRef}
          className="relative min-h-screen w-full overflow-hidden"
        >
          <m.div
            style={{
              y: safeHeroY,
              scale: safeHeroScale,
              filter: safeHeroBlur,
              clipPath: safeHeroClip,
            }}
            className="absolute inset-0"
          >
            <NextImage
              src={heroImg}
              alt="Company hero"
              fill
              priority
              sizes="100vw"
              quality={88}
              placeholder="blur"
              className="object-cover"
            />
          </m.div>

          <m.div
            style={{ opacity: safeHeroOverlayOpacity }}
            className="absolute inset-0 bg-black"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />

          <m.div
            style={{
              y: safeHeroContentY,
              opacity: safeHeroContentOpacity,
            }}
            className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 pt-24 lg:px-10"
          >
            <m.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.9, ease: "easeOut" }
              }
              className="max-w-4xl"
            >
              <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#d8c7ad]">
                <span className="h-px w-10 bg-[#d8c7ad]" />
                Kurumsal
              </span>

              <AutoFitHeroTitle>
                Ahşabı mekâna{" "}
                <span className="font-serif italic text-[#d8c7ad]">
                  değer
                </span>{" "}
                katan bir üretim diline dönüştürüyoruz.
              </AutoFitHeroTitle>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
                İç mekân, mobilya ve ahşap üretim süreçlerinde ölçü, malzeme,
                işçilik ve estetik bütünlüğü aynı çizgide buluşturan kurumsal
                çözümler sunuyoruz.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center border border-white bg-white px-8 py-4 text-sm font-medium text-[#0f2535] transition-all duration-300 hover:bg-transparent hover:text-white"
                >
                  Şirketi Tanı
                </a>

                <a
                  href="#production"
                  className="inline-flex items-center justify-center border border-white/35 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-[#9b8364] hover:text-[#9b8364]"
                >
                  Üretim Süreci
                </a>
              </div>
            </m.div>
          </m.div>
        </section>

        <section
          ref={aboutRef}
          id="about"
          className="relative mx-auto mt-32 w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-36"
        >
          <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <m.div
              style={{
                x: safeAboutLeftX,
                opacity: safeAboutSideOpacity,
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={motionTransition}
            >
              <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                <span className="h-px w-10 bg-[#9b8364]" />
                Hakkımızda
              </span>

              <h2 className="max-w-4xl text-4xl font-light leading-[1.08] tracking-[-0.04em] text-[#0f2535] md:text-6xl">
                Üretim tecrübesini,{" "}
                <span className="font-serif italic text-[#9b8364]">
                  mekânın ihtiyacını
                </span>{" "}
                anlayan bir bakışla birleştiriyoruz.
              </h2>
            </m.div>

            <m.p
              style={{
                x: safeAboutRightX,
                opacity: safeAboutSideOpacity,
              }}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.1 }
              }
              className="text-base leading-8 text-[#4b5b66] md:text-lg"
            >
              Ahşap üretimi, mobilya çözümleri ve iç mekân uygulamalarında her
              projeyi yalnızca imalat olarak değil; ölçü, malzeme, kullanım,
              estetik ve teslim standardı üzerinden ele alıyoruz.
            </m.p>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <m.div
              style={{
                x: safeAboutLeftX,
                opacity: safeAboutSideOpacity,
              }}
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8 }}
              className="group relative h-[460px] overflow-hidden lg:h-[620px]"
            >
              <NextImage
                src={aboutImg}
                alt="About company"
                fill
                sizes="(min-width: 1024px) 48vw, 100vw"
                quality={86}
                placeholder="blur"
                className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent transition-all duration-700 group-hover:from-[#0f2535]/85 group-hover:via-[#0f2535]/25" />

              <div className="absolute inset-0 border border-transparent transition-all duration-700 group-hover:border-[#d8c7ad]/60" />

              <div className="absolute bottom-0 left-0 p-8 text-white transition-transform duration-700 group-hover:-translate-y-4 md:p-10">
                <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#d8c7ad]">
                  Craft / Detail / Production
                </span>

                <h3 className="mt-4 max-w-md text-3xl font-light leading-tight tracking-[-0.03em] text-white md:text-5xl">
                  Detayda ölçü, sonuçta güven.
                </h3>

                <Link
                  href="/company/about"
                  className="mt-8 inline-flex items-center overflow-hidden border border-[#d8c7ad]/70 bg-white/10 px-6 py-3 text-xs font-medium uppercase tracking-[0.28em] text-white backdrop-blur-sm transition-all duration-500 hover:border-[#d8c7ad] hover:bg-[#d8c7ad] hover:text-[#0f2535]"
                >
                  <span>Daha Fazla</span>
                  <span className="ml-4 h-px w-8 bg-current transition-all duration-500 hover:w-12" />
                </Link>
              </div>
            </m.div>

            <m.div
              style={{
                x: safeAboutRightX,
                opacity: safeAboutSideOpacity,
              }}
              className="grid content-between gap-8"
            >
              <div className="grid grid-cols-2 border-t border-[#e5ded4]">
                {stats.map((stat, index) => (
                  <m.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.6, delay: index * 0.08 }
                    }
                    className="border-b border-[#e5ded4] py-8 odd:border-r odd:border-[#e5ded4] md:p-8"
                  >
                    <div className="text-5xl font-light tracking-[-0.06em] text-[#0f2535] md:text-6xl">
                      <CountUp value={stat.value} suffix={stat.suffix} />
                    </div>

                    <p className="mt-4 text-xs font-medium uppercase tracking-[0.28em] text-[#9b8364]">
                      {stat.title}
                    </p>
                  </m.div>
                ))}
              </div>

              <m.div
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={motionTransition}
                className="border-l-2 border-[#9b8364] pl-7"
              >
                <h3 className="text-2xl font-light leading-tight tracking-[-0.03em] text-[#0f2535] md:text-4xl">
                  Planlı üretim, temiz uygulama, uzun ömürlü sonuç.
                </h3>

                <p className="mt-5 text-base leading-8 text-[#4b5b66] md:text-lg">
                  Proje başlangıcından teslim sürecine kadar her aşama takip
                  edilebilir şekilde ilerler. Bu yaklaşım, hem teknik kaliteyi
                  hem de görsel bütünlüğü aynı çizgide tutar.
                </p>
              </m.div>
            </m.div>
          </div>
        </section>

        <section
          ref={productionRef}
          id="production"
          className="relative mt-56 px-6 py-28 text-white lg:px-10 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-24 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                  <span className="h-px w-10 bg-[#9b8364]" />
                  Üretim
                </span>

                <h2 className="text-4xl font-light leading-[1.08] tracking-[-0.04em] text-white md:text-6xl">
                  Hammaddeden son yüzeye uzanan{" "}
                  <span className="font-serif italic text-[#9b8364]">
                    kontrollü
                  </span>{" "}
                  üretim akışı.
                </h2>
              </div>

              <div className="lg:pt-14">
                <p className="max-w-3xl text-base leading-8 text-white/60 md:text-lg">
                  Her üretim aşaması, önceki adımın hassasiyeti üzerine kurulur.
                  Kesimden CNC işlemeye, kaplamadan boya uygulamasına kadar bütün
                  süreçler teknik kontrol, malzeme bilgisi ve temiz işçilik
                  anlayışıyla ilerler.
                </p>

                <div className="mt-9">
                  <PremiumLinkButton href="/company/production" dark>
                    Daha Fazla
                  </PremiumLinkButton>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-[#9b8364]/30 lg:block" />

              <div className="grid gap-20">
                {productionItems.map((item, index) => {
                  const isLeft = index % 2 === 0;

                  return (
                    <m.article
                      key={item.title}
                      initial={{ opacity: 0, y: 45 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={motionTransition}
                      className="relative grid gap-8 lg:grid-cols-2 lg:gap-16"
                    >
                      <div className={isLeft ? "lg:order-1" : "lg:order-2"}>
                        <div className="group relative h-[340px] overflow-hidden md:h-[460px]">
                          <NextImage
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(min-width: 1024px) 48vw, 100vw"
                            quality={84}
                            placeholder="blur"
                            className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />

                          <div className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center border border-[#9b8364]/70 bg-[#0d0d0d]/55 backdrop-blur-sm">
                            <span className="text-sm font-medium tracking-[0.2em] text-[#9b8364]">
                              0{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`relative flex items-center ${
                          isLeft ? "lg:order-2" : "lg:order-1"
                        }`}
                      >
                        <div
                          className={`absolute top-1/2 hidden h-5 w-5 -translate-y-1/2 border border-[#9b8364] bg-[#0d0d0d] lg:block ${
                            isLeft ? "lg:-left-[42px]" : "lg:-right-[42px]"
                          }`}
                        />

                        <div className="border-t border-[#9b8364]/45 pt-8 lg:border-t-0 lg:pt-0">
                          <span className="text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                            Process 0{index + 1}
                          </span>

                          <h3 className="mt-5 text-4xl font-light leading-tight tracking-[-0.04em] text-white md:text-5xl">
                            {item.title}
                          </h3>

                          <p className="mt-6 max-w-xl text-base leading-8 text-white/60 md:text-lg">
                            {item.text}
                          </p>

                          <div className="mt-8 flex items-center gap-4">
                            <span className="h-px w-20 bg-[#9b8364]" />
                            <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/35">
                              Controlled Production
                            </span>
                          </div>
                        </div>
                      </div>
                    </m.article>
                  );
                })}
              </div>
            </div>

            <div className="mt-28 grid gap-4 border-y border-[#9b8364]/25 py-8 md:grid-cols-3">
              {productionFeatures.map((item, index) => (
                <m.div
                  key={item}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { duration: 0.6, delay: index * 0.08 }
                  }
                  className="flex items-center gap-5 border-[#9b8364]/20 py-5 md:border-r md:last:border-r-0"
                >
                  <span className="text-sm font-medium text-[#9b8364]">
                    0{index + 1}
                  </span>

                  <p className="text-base leading-7 text-white/70 md:text-lg">
                    {item}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={missionRef}
          className="relative mt-48 px-6 py-28 text-[#0f2535] lg:px-10 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <m.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-140px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                }
                className="max-w-3xl"
              >
                <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                  <m.span
                    initial={{ width: 0 }}
                    whileInView={{ width: 40 }}
                    viewport={{ once: true }}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.8, delay: 0.2 }
                    }
                    className="h-px bg-[#9b8364]"
                  />
                  Vizyon & Misyon
                </span>

                <h2 className="text-4xl font-light leading-[1.08] tracking-[-0.04em] text-[#0f2535] md:text-6xl">
                  Kalıcı işler üretmek için{" "}
                  <span className="font-serif italic text-[#9b8364]">
                    bugünün detayına
                  </span>{" "}
                  odaklanıyoruz.
                </h2>
              </m.div>

              <m.div
                initial={{ opacity: 0, x: 35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-140px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.8, delay: 0.18 }
                }
                className="lg:pb-2"
              >
                <PremiumLinkButton href="/company/vision-mission">
                  Daha Fazla
                </PremiumLinkButton>
              </m.div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {visionMissionItems.map((item, index) => (
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
                  viewport={{ once: true, margin: "-120px" }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.9,
                          delay: index * 0.14,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  className="group relative min-h-[420px] overflow-hidden border border-[#e5ded4] bg-white p-8 md:p-12"
                >
                  <NextImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    quality={84}
                    placeholder="blur"
                    className="scale-110 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-white/0 transition-all duration-700 group-hover:bg-[#0f2535]/70" />

                  <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-end">
                    <div className="mb-8 h-px w-24 bg-[#9b8364] transition-all duration-500 group-hover:w-36 group-hover:bg-[#d8c7ad]" />

                    <h3 className="text-3xl font-light tracking-[-0.03em] text-[#0f2535] transition-all duration-500 group-hover:-translate-y-2 group-hover:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-6 text-base leading-8 text-[#4b5b66] transition-all duration-500 group-hover:-translate-y-2 group-hover:text-white/80 md:text-lg">
                      {item.text}
                    </p>

                    <span className="mt-10 translate-y-4 text-xs font-medium uppercase tracking-[0.35em] text-[#d8c7ad] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      Aryap Interior & Furniture
                    </span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </LazyMotion>
  );
};

export default memo(CompanyPage);