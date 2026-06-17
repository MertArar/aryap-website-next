"use client";

import NextImage from "next/image";
import Link from "next/link";
import React, { memo, useRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  BsArrowRight,
  BsTelephone,
  BsEnvelope,
  BsGeoAlt,
} from "react-icons/bs";

import contactImg from "@/assets/hero2.webp";

const contactItems = [
  {
    icon: BsTelephone,
    text: "Telefon veya WhatsApp üzerinden bize ulaşabilirsiniz.",
  },
  {
    icon: BsEnvelope,
    text: "Proje detaylarınızı mail yoluyla paylaşabilirsiniz.",
  },
  {
    icon: BsGeoAlt,
    text: "Keşif, tasarım ve uygulama sürecini birlikte ilerletiyoruz.",
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-80%", "80%"]);
  const imageY = shouldReduceMotion ? "0%" : parallaxY;

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative min-h-[860px] w-full overflow-hidden bg-[#0f2535] py-24 sm:min-h-[820px] sm:py-28 lg:h-[82vh] lg:min-h-[660px] lg:py-0"
      >
        <m.div
          className="absolute inset-x-0 -inset-y-[14%] sm:-inset-y-[16%] lg:-inset-y-[12%]"
          style={{ y: imageY }}
          aria-hidden="true"
        >
          <NextImage
            src={contactImg}
            alt=""
            fill
            sizes="100vw"
            quality={86}
            placeholder="blur"
            className="object-cover object-center"
            priority={false}
          />
        </m.div>

        <div className="absolute inset-0 bg-[#0f2535]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2535]/85 via-[#0f2535]/55 to-[#0f2535]/10 lg:from-[#0f2535]/80 lg:via-[#0f2535]/40 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-7xl items-center px-5 sm:px-6 lg:h-full lg:min-h-0 lg:px-10">
          <div className="grid w-full grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div className="text-white">
              <span className="mb-5 inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.34em] text-[#d8c7ad] sm:mb-6 sm:text-xs sm:tracking-[0.4em]">
                <span className="h-px w-10 bg-[#d8c7ad] sm:w-12" />
                İletişim
              </span>

              <h2 className="max-w-5xl text-[clamp(2.35rem,10vw,4.4rem)] font-light leading-[1.04] tracking-[-0.055em] lg:text-7xl">
                Mekânınız için doğru fikri birlikte şekillendirelim.
              </h2>

              <p className="mt-6 max-w-2xl text-[0.95rem] leading-8 text-white/75 sm:mt-8 sm:text-lg">
                İç mekan tasarımı, özel üretim mobilya ve uygulama süreçlerinde
                ihtiyaçlarınızı dinliyor; estetik, fonksiyon ve kalite dengesinde
                size özel çözümler geliştiriyoruz.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#0f2535] sm:px-8 sm:text-sm sm:tracking-[0.18em]"
                >
                  <span className="absolute inset-0 origin-right bg-[#d8c7ad] transition-transform duration-500 ease-out group-hover:scale-x-0" />

                  <span className="absolute inset-0 rounded-md border border-[#d8c7ad]/80 transition-colors duration-500 group-hover:border-white/70" />

                  <span className="relative z-10 flex items-center gap-4 transition-colors duration-500 group-hover:text-white">
                    İLETİŞİME GEÇİN

                    <span className="relative flex h-5 w-8 items-center overflow-hidden">
                      <BsArrowRight className="absolute text-lg transition-[opacity,transform] duration-500 group-hover:translate-x-8 group-hover:opacity-0" />
                      <BsArrowRight className="absolute -translate-x-8 text-lg opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                  </span>
                </Link>

                <span className="text-[11px] uppercase tracking-[0.24em] text-white/50 sm:text-xs sm:tracking-[0.28em]">
                  Tasarım • Üretim • Uygulama
                </span>
              </div>
            </div>

            <div className="relative w-full max-w-xl lg:ml-auto lg:max-w-none">
              <div className="absolute -left-3 -top-3 h-full w-full border border-white/15 sm:-left-5 sm:-top-5" />

              <div className="relative bg-white/10 p-6 backdrop-blur-md sm:p-9">
                <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#d8c7ad] sm:text-xs sm:tracking-[0.32em]">
                  Bize Ulaşın
                </p>

                <h3 className="mt-4 max-w-md text-2xl font-light leading-tight text-white sm:text-3xl">
                  Projeniz için ilk görüşmeyi birlikte planlayalım.
                </h3>

                <div className="mt-7 space-y-4 sm:mt-8 sm:space-y-5">
                  {contactItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.text}
                        className="group flex items-start gap-4 border-t border-white/15 pt-5 text-sm leading-7 text-white/78 sm:text-base"
                      >
                        <Icon className="mt-1 shrink-0 text-[#d8c7ad] transition-transform duration-300 group-hover:scale-110" />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex items-center gap-4 sm:mt-9">
                  <div className="h-px flex-1 bg-white/20" />
                  <span className="text-xs uppercase tracking-[0.28em] text-[#d8c7ad]">
                    Aryap
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default memo(Contact);