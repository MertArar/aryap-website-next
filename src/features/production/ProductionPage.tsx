"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiArrowUpRight } from "react-icons/fi";

import productionCta from "@/assets/productioncta.webp";

import cuttingMachine from "@/assets/m1.webp";
import cncMachine from "@/assets/cnc.webp";
import pvcMachine from "@/assets/pvc.webp";
import moldingMachine from "@/assets/woodmachine.webp";
import paintMachine from "@/assets/painting.webp";

type MachineItem = {
  title: string;
  tag: string;
  image: StaticImageData;
  intro: string;
  details: string[];
};

type ProductionStep = {
  title: string;
  text: string;
};

const machines: MachineItem[] = [
  {
    title: "Kesim Makinesi",
    tag: "01 / Ölçülendirme",
    image: cuttingMachine,
    intro: "Üretimin ilk adımında malzemeyi projeye uygun ölçülere hazırlar.",
    details: [
      "Ahşap levha ve panellerin hassas ölçülerde kesilmesini sağlar.",
      "Sonraki üretim aşamaları için düzgün ve temiz yüzey hazırlar.",
      "Malzeme kaybını azaltarak daha kontrollü bir üretim süreci oluşturur.",
    ],
  },
  {
    title: "CNC İşleme",
    tag: "02 / Hassas Form",
    image: cncMachine,
    intro: "Ahşap yüzeylerde özel form, kanal, delik ve detay işlemleri yapar.",
    details: [
      "Projeye özel desen, kanal ve teknik işleme detaylarını uygular.",
      "Tekrarlanabilir ve standart üretim kalitesi sağlar.",
      "Özel ölçülü mobilya ve dekoratif yüzeylerde yüksek hassasiyet sunar.",
    ],
  },
  {
    title: "PVC Kaplama",
    tag: "03 / Kenar Bitişi",
    image: pvcMachine,
    intro:
      "Mobilya parçalarının kenarlarını korur ve temiz bir görünüm kazandırır.",
    details: [
      "Kesilen parçaların kenar yüzeylerini darbe ve aşınmaya karşı güçlendirir.",
      "Renk ve malzeme uyumuna göre bütünlüklü bir bitiş sağlar.",
      "Mobilya parçalarında daha dayanıklı ve estetik bir sonuç oluşturur.",
    ],
  },
  {
    title: "Pervaz Üretimi",
    tag: "04 / Tamamlayıcı Üretim",
    image: moldingMachine,
    intro:
      "Kapı, duvar ve iç mekân geçişlerinde tamamlayıcı ahşap parçalar üretir.",
    details: [
      "Projeye uygun profil, form ve ölçüde pervaz üretimi yapılır.",
      "İç mekân geçişlerinde estetik bütünlüğü destekler.",
      "Kapı ve duvar birleşimlerinde temiz ve dengeli detaylar oluşturur.",
    ],
  },
  {
    title: "Ahşap Boya Kaplama",
    tag: "05 / Yüzey Kalitesi",
    image: paintMachine,
    intro:
      "Ahşap yüzeyin korunmasını ve istenen görsel karaktere ulaşmasını sağlar.",
    details: [
      "Ahşap yüzeylerde renk, doku ve koruma katmanı oluşturur.",
      "Mat, yarı mat veya özel yüzey bitişleri uygulanabilir.",
      "Son ürünün uzun ömürlü, temiz ve kaliteli görünmesini sağlar.",
    ],
  },
];

const productionSteps: ProductionStep[] = [
  {
    title: "Malzeme Okuma",
    text: "Üretim başlamadan önce kullanılacak malzemenin ölçüsü, yüzey karakteri ve projedeki konumu değerlendirilir.",
  },
  {
    title: "Hassas Ölçülendirme",
    text: "Kesim ve CNC aşamaları, parçanın sonraki işlemlerde formunu kaybetmemesi için kontrollü toleranslarla ilerler.",
  },
  {
    title: "Kenar ve Yüzey Bitişi",
    text: "PVC kaplama, boya ve yüzey işlemleri yalnızca estetik için değil; uzun ömürlü kullanım için de planlanır.",
  },
  {
    title: "Son Kontrol",
    text: "Üretim hattından çıkan her parça; ölçü, yüzey, birleşim ve genel görünüm açısından teslim öncesi kontrol edilir.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 46,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function ProductionPage() {
  const [activeStep, setActiveStep] = useState<number | null>(0);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0d0d0d] text-[#1b1712]">
      <style jsx global>{`
        .aryap-production-hero-bg {
          background-image: var(--production-hero-bg);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          background-attachment: fixed;
        }

        @media (max-width: 1023px) {
          .aryap-production-hero-bg {
            background-attachment: scroll;
          }
        }

        .aryap-production-hero-grid {
          display: grid;
          gap: 4rem;
        }

        @media (min-width: 1024px) {
          .aryap-production-hero-grid {
            grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
            align-items: flex-start;
          }
        }

        .aryap-production-hero-dark-gradient {
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.56) 0%,
            rgba(0, 0, 0, 0.4) 45%,
            rgba(0, 0, 0, 0.22) 100%
          );
        }

        .aryap-production-hero-bottom-blend {
          background: linear-gradient(
            to bottom,
            rgba(13, 13, 13, 0) 0%,
            rgba(13, 13, 13, 0.14) 24%,
            rgba(13, 13, 13, 0.32) 48%,
            rgba(13, 13, 13, 0.62) 72%,
            #0d0d0d 100%
          );
        }

        .aryap-machines-heading-grid {
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .aryap-machines-heading-grid {
            grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
            align-items: end;
          }
        }

        .aryap-machine-inner-grid {
          display: grid;
          min-height: 620px;
          align-items: center;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .aryap-machine-inner-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 3rem;
          }

          .aryap-machine-inner-grid-reverse > :first-child {
            order: 2;
          }
        }

        .aryap-machine-detail-row {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr);
          gap: 1rem;
        }
      `}</style>

      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#0d0d0d] px-6 pb-56 pt-56 text-white sm:px-8 sm:pt-56 lg:px-10 lg:pb-64 lg:pt-60">
        {/* HERO BACKGROUND IMAGE - PARALLAX */}
        <div
          className="aryap-production-hero-bg pointer-events-none absolute inset-0"
          style={
            {
              "--production-hero-bg": `url(${productionCta.src})`,
            } as CSSProperties
          }
        />

        {/* BLACK IMAGE EFFECT */}
        <div className="pointer-events-none absolute inset-0 bg-black/38" />
        <div className="aryap-production-hero-dark-gradient pointer-events-none absolute inset-0" />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-12%] top-[-24%] h-[560px] w-[560px] rounded-full bg-[#9b8364]/16 blur-[120px]" />
          <div className="absolute bottom-[-18%] left-[-10%] h-[460px] w-[460px] rounded-full bg-[#d8c7ad]/14 blur-[120px]" />
        </div>

        <div className="aryap-production-hero-bottom-blend pointer-events-none absolute bottom-0 left-0 h-[430px] w-full" />

        <div className="relative mx-auto max-w-7xl">
          <div className="aryap-production-hero-grid">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <h1 className="max-w-5xl text-4xl font-light leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Üretimi yalnızca makineyle değil,{" "}
                <span className="font-serif italic text-[#d8c7ad]">
                  süreç disipliniyle
                </span>{" "}
                yönetiyoruz.
              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-7 text-white/72 md:text-base md:leading-8">
                Kesimden yüzey bitişine kadar her adım; ölçü, malzeme, form ve
                işçilik dengesini koruyacak şekilde planlanır. Amaç yalnızca
                üretmek değil, her parçayı projeye doğru karakterle
                hazırlamaktır.
              </p>

              <div className="mt-11 grid gap-4 sm:grid-cols-3">
                {[
                  ["01", "Planlı üretim akışı"],
                  ["02", "Ölçü ve yüzey kontrolü"],
                  ["03", "Projeye özel işçilik"],
                ].map(([number, label]) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -6 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative overflow-hidden rounded-[1.7rem] bg-white/18 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-500 hover:bg-white/26 hover:shadow-[0_34px_100px_rgba(0,0,0,0.28)]"
                  >
                    <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#1E4E6E]/0 blur-2xl transition-all duration-700 group-hover:bg-[#1E4E6E]/35" />

                    <span className="pointer-events-none absolute bottom-4 left-5 right-5 h-px origin-left scale-x-0 bg-[#d8c7ad]/70 transition-transform duration-700 group-hover:scale-x-100" />

                    <p className="relative text-2xl font-light tracking-[-0.055em] text-white transition-colors duration-500 group-hover:text-[#d8c7ad]">
                      {number}
                    </p>

                    <p className="relative mt-3 text-xs leading-6 text-white/70 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* HERO ACCORDION */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.9,
                delay: 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-[2.4rem] bg-white/20 p-5 shadow-[0_34px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6">
                <div className="pointer-events-none absolute right-[-20%] top-[-18%] h-72 w-72 rounded-full bg-[#d8c7ad]/18 blur-[90px]" />
                <div className="pointer-events-none absolute bottom-[-22%] left-[-18%] h-72 w-72 rounded-full bg-black/20 blur-[90px]" />

                <div className="relative mb-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d8c7ad]">
                    Üretim Mantığı
                  </p>

                  <h2 className="mt-4 max-w-md text-2xl font-light leading-tight tracking-[-0.045em] text-white sm:text-3xl">
                    Bir parçanın atölyedeki yolculuğu
                  </h2>
                </div>

                <div className="relative space-y-3">
                  {productionSteps.map((step, index) => {
                    const isActive = activeStep === index;

                    return (
                      <div
                        key={step.title}
                        className={`overflow-hidden rounded-[1.35rem] transition-all duration-500 ${
                          isActive
                            ? "bg-white/96 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                            : "bg-white/18 hover:bg-white/26"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setActiveStep(isActive ? null : index)}
                          className="flex w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-left"
                        >
                          <span className="flex items-center gap-4">
                            <span
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium transition-colors duration-500 ${
                                isActive
                                  ? "bg-[#1E4E6E] text-white shadow-[0_14px_38px_rgba(30,78,110,0.34)]"
                                  : "bg-white/18 text-[#d8c7ad]"
                              }`}
                            >
                              0{index + 1}
                            </span>

                            <span
                              className={`text-sm font-medium tracking-[-0.02em] transition-colors duration-500 ${
                                isActive ? "text-[#1b1712]" : "text-white"
                              }`}
                            >
                              {step.title}
                            </span>
                          </span>

                          <FiChevronDown
                            className={`shrink-0 transition-all duration-500 ${
                              isActive
                                ? "rotate-180 text-[#1E4E6E]"
                                : "text-[#d8c7ad]"
                            }`}
                            size={20}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.45,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pl-[72px]">
                                <p className="max-w-md text-xs leading-6 text-[#62584d] md:text-sm md:leading-7">
                                  {step.text}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MACHINES */}
      <section className="relative bg-[#0d0d0d] px-6 py-28 text-white sm:px-8 lg:px-10 lg:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-[-18%] top-[15%] h-[520px] w-[520px] rounded-full bg-[#9b8364]/10 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[-20%] h-[600px] w-[600px] rounded-full bg-[#d8c7ad]/5 blur-[140px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="aryap-machines-heading-grid mb-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#9b8364]">
                Makine Parkuru
              </p>

              <h2 className="mt-5 max-w-2xl text-4xl font-light leading-tight tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                Her aşama kendi karakterine sahip.
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-8 text-white/55 md:text-lg">
              Üretim hattı yalnızca makinelerin sıralanmasından oluşmaz. Her
              adım, önceki aşamanın doğruluğunu koruyacak ve sonraki aşamaya
              daha temiz bir zemin hazırlayacak şekilde kurgulanır.
            </p>
          </div>

          <div className="space-y-10 lg:space-y-14">
            {machines.map((machine, index) => {
              const reverse = index % 2 === 1;

              return (
                <motion.article
                  key={machine.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.035] shadow-[0_34px_120px_rgba(0,0,0,0.32)] backdrop-blur-xl md:rounded-[2.5rem]"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(216,199,173,0.12),transparent_34%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
                  </div>

                  <span
                    className={`pointer-events-none absolute top-8 z-0 text-[120px] font-light leading-none tracking-[-0.09em] text-white/[0.035] md:text-[180px] lg:top-10 lg:text-[230px] ${
                      reverse ? "right-8" : "left-8"
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <div
                    className={`aryap-machine-inner-grid relative z-10 p-6 sm:p-8 lg:p-10 xl:p-12 ${
                      reverse ? "aryap-machine-inner-grid-reverse" : ""
                    }`}
                  >
                    {/* IMAGE */}
                    <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[1.6rem] bg-gradient-to-br from-white/[0.08] via-white/[0.035] to-transparent p-6 md:min-h-[440px] lg:min-h-[520px]">
                      <div className="pointer-events-none absolute inset-x-10 bottom-10 h-24 rounded-full bg-black/45 blur-3xl" />

                      <div className="pointer-events-none absolute left-8 top-8 rounded-full border border-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
                        {machine.tag.split("/")[0]}
                      </div>

                      <motion.img
                        src={machine.image.src}
                        width={machine.image.width}
                        height={machine.image.height}
                        alt={machine.title}
                        draggable={false}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="relative z-10 max-h-[300px] w-full object-contain drop-shadow-[0_55px_50px_rgba(0,0,0,0.65)] transition-transform duration-700 group-hover:scale-[1.035] md:max-h-[400px] lg:max-h-[500px]"
                        initial={{ y: 10 }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="px-1 py-2 lg:px-4">
                      <div className="inline-flex rounded-full border border-[#d8c7ad]/20 bg-[#d8c7ad]/10 px-4 py-2">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8c7ad]">
                          {machine.tag}
                        </span>
                      </div>

                      <h3 className="mt-7 max-w-2xl text-4xl font-light leading-[0.98] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
                        {machine.title}
                      </h3>

                      <p className="mt-6 max-w-xl text-base leading-8 text-white/58 md:text-lg">
                        {machine.intro}
                      </p>

                      <motion.div
                        initial={{
                          opacity: 0,
                          x: reverse ? -28 : 28,
                          filter: "blur(8px)",
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                          filter: "blur(0px)",
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                          duration: 0.65,
                          delay: 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="mt-9 grid gap-3"
                      >
                        {machine.details.map((detail, detailIndex) => (
                          <div
                            key={detail}
                            className="aryap-machine-detail-row group/item rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4 transition-all duration-500 hover:border-[#d8c7ad]/30 hover:bg-[#d8c7ad]/[0.055]"
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-[#d8c7ad] transition-colors duration-500 group-hover/item:bg-[#d8c7ad]/15">
                              0{detailIndex + 1}
                            </span>

                            <p className="self-center text-sm leading-7 text-white/60 md:text-[15px]">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS CTA */}
      <section className="bg-white px-6 py-28 text-[#0f2535] lg:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl border-t border-[#e5ded4] pt-14">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <motion.div
              initial={{
                opacity: 0,
                x: -70,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                <span className="h-px w-10 bg-[#9b8364]" />
                Projeler
              </span>

              <h2 className="max-w-3xl text-4xl font-light leading-[1.06] tracking-[-0.045em] text-[#0f2535] md:text-6xl">
                Üretimden çıkan
                <br />
                projelerimizi inceleyin.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-[#4b5b66] md:text-lg">
                Ahşap üretimi, iç mekân uygulamaları ve özel ölçü çözümlerinde
                tamamladığımız işleri daha yakından görebilirsiniz.
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 70,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.8,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href="/projects"
                className="group relative inline-flex cursor-pointer items-center justify-end gap-4 pb-3 text-xs uppercase tracking-[0.24em] text-[#0f2535] transition-all duration-300"
              >
                <span className="relative overflow-hidden">
                  <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                    Projelerimizi İnceleyin
                  </span>

                  <span className="absolute left-0 top-full block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                    Projelere Git
                  </span>
                </span>

                <span className="relative flex items-center">
                  <span className="h-px w-10 bg-[#0f2535]/35 transition-all duration-500 group-hover:w-16 group-hover:bg-[#0f2535]" />

                  <span className="ml-3 flex h-7 w-7 items-center justify-center border border-[#0f2535]/25 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#0f2535]">
                    <FiArrowUpRight className="text-sm transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </span>

                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0f2535] transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}