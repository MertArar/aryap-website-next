"use client";

import React, { memo } from "react";
import { m, useReducedMotion, type Transition } from "framer-motion";

import heroPng from "@/assets/hero4.webp";

const labelTransition: Transition = {
  duration: 0.65,
  ease: [0.16, 1, 0.3, 1],
};

const titleTransition: Transition = {
  duration: 0.8,
  delay: 0.05,
  ease: [0.16, 1, 0.3, 1],
};

const textTransition: Transition = {
  duration: 0.75,
  delay: 0.1,
  ease: [0.16, 1, 0.3, 1],
};

const cardTransition: Transition = {
  duration: 0.8,
  delay: 0.08,
  ease: [0.16, 1, 0.3, 1],
};

const AboutHero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0d0d] text-white">
      <div
        className="absolute inset-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url("${heroPng.src}")` }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,0.6))]" />

      <div className="absolute inset-x-0 bottom-0 h-[340px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.006)_24%,rgba(255,255,255,0.018)_42%,rgba(255,255,255,0.038)_58%,rgba(255,255,255,0.07)_72%,rgba(255,255,255,0.13)_84%,rgba(255,255,255,0.24)_92%,rgba(255,255,255,0.46)_97%,#ffffff_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-20 sm:px-8 md:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="grid grid-cols-1 gap-12 border-t border-white/10 pt-10 lg:grid-cols-12 lg:gap-16 lg:pt-14">
          <div className="lg:col-span-7">
            <m.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : labelTransition}
              viewport={{ once: true, amount: 0.35 }}
              className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]"
            >
              <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#d8c7ad]">
                <span className="h-px w-10 bg-[#d8c7ad]" />
                Biz kimiz?
              </span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : titleTransition}
              viewport={{ once: true, amount: 0.35 }}
              className="mt-6 max-w-[760px] text-[36px] font-light leading-[1.02] tracking-[-0.045em] text-white sm:text-[46px] md:text-[58px] lg:text-[68px]"
            >
              Ahşabın doğasını
              <br />
              <span className="font-serif italic text-[#d8c7ad]">
                mekânın karakteriyle
              </span>
              <br />
              buluşturuyoruz.
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : textTransition}
              viewport={{ once: true, amount: 0.35 }}
              className="mt-7 max-w-[620px] text-[15px] leading-7 text-white/68 sm:text-[16px] md:text-[17px]"
            >
              1990’dan bu yana iç mekân, mobilya ve ahşap üretiminde ölçülü,
              rafine ve uzun ömürlü çözümler geliştiriyoruz.
            </m.p>
          </div>

          <div className="lg:col-span-5">
            <m.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : cardTransition}
              viewport={{ once: true, amount: 0.3 }}
              className="flex h-full flex-col justify-between border border-white/10 bg-black/30 p-6 backdrop-blur-[2px] sm:p-8 md:p-10"
            >
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/38">
                  Üretim anlayışımız
                </p>
              </div>

              <div className="mt-10 space-y-8">
                <div className="border-b border-white/10 pb-6">
                  <p className="text-[22px] font-light tracking-[-0.03em] text-white sm:text-[26px]">
                    Malzeme
                  </p>

                  <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-white/62">
                    Ahşabın doğal karakterini koruyan, uzun ömürlü ve dengeli
                    çözümler üretiriz.
                  </p>
                </div>

                <div>
                  <p className="text-[22px] font-light tracking-[-0.03em] text-white sm:text-[26px]">
                    İşçilik
                  </p>

                  <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-white/62">
                    Detay, ölçü ve uygulama kalitesini üretimin merkezinde
                    tutarız.
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutHero);