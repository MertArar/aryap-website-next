"use client";

import NextImage, { type StaticImageData } from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { BsArrowUpRight, BsArrowRight } from "react-icons/bs";

import project1 from "@/assets/hero1.webp";
import project2 from "@/assets/hero2.webp";
import project3 from "@/assets/hero3.webp";
import project4 from "@/assets/hero4.webp";
import project5 from "@/assets/hero5.webp";
import project6 from "@/assets/hero7.webp";

type ProjectItem = {
  name: string;
  label: string;
  year: string;
  image: StaticImageData;
};

const projects: ProjectItem[] = [
  {
    name: "Villa Serenity",
    label: "İç Mekan Tasarımı",
    year: "2026",
    image: project1,
  },
  {
    name: "Modern Kitchen House",
    label: "Mutfak",
    year: "2026",
    image: project2,
  },
  {
    name: "Marble Bath Suite",
    label: "Banyo",
    year: "2025",
    image: project3,
  },
  {
    name: "Oak Door Collection",
    label: "Ahşap Kapı",
    year: "2025",
    image: project4,
  },
  {
    name: "Soft Living Concept",
    label: "Dekorasyon",
    year: "2024",
    image: project5,
  },
  {
    name: "Executive Office",
    label: "İş Yerleri",
    year: "2024",
    image: project6,
  },
];

const smoothTransition: Transition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1],
};

const cardTransitionBase: Transition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1],
};

const Projects = () => {
  const shouldReduceMotion = useReducedMotion();

  const sectionTransition: Transition = shouldReduceMotion
    ? { duration: 0 }
    : smoothTransition;

  const getCardTransition = (index: number): Transition =>
    shouldReduceMotion
      ? { duration: 0 }
      : {
          ...cardTransitionBase,
          delay: index * 0.06,
        };

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative overflow-hidden bg-[#fff] py-28 text-[#0f2535]">
        <div className="pointer-events-none absolute left-[-220px] top-[-160px] h-[560px] w-[560px] rounded-full bg-white/80 blur-3xl" />
        <div className="pointer-events-none absolute right-[-260px] bottom-[-200px] h-[620px] w-[620px] rounded-full bg-[#d8c7ad]/35 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-20 border-b border-[#d8c7ad]/55 pb-12">
            <m.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={sectionTransition}
              viewport={{ once: true, amount: 0.35 }}
              className="grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end"
            >
              <div>
                <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
                  <span className="h-px w-10 bg-[#9b8364]" />
                  Projeler
                </span>

                <h2 className="max-w-4xl text-4xl font-light leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
                  Mekânlara karakter kazandıran seçili uygulamalar.
                </h2>
              </div>

              <div className="lg:pb-2">
                <p className="max-w-md text-base leading-8 text-[#5c6a73] lg:ml-auto">
                  İç mimari, özel üretim ve uygulama süreçlerinde tamamlanan
                  seçili projelerden rafine bir görünüm.
                </p>

                <div className="mt-7 flex items-center gap-4 lg:justify-end">
                  <div className="h-px w-16 bg-[#9b8364]/60" />
                  <span className="text-xs uppercase tracking-[0.3em] text-[#9b8364]">
                    Selected Works
                  </span>
                </div>
              </div>
            </m.div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
            {projects.map((project, index) => (
              <m.article
                key={project.name}
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={getCardTransition(index)}
                viewport={{ once: true, amount: 0.25 }}
                className="group relative overflow-hidden rounded-[1.25rem] bg-[#0f2535] shadow-xl shadow-[#0f2535]/12"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <NextImage
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1280px) 608px, (min-width: 768px) calc(50vw - 40px), calc(100vw - 48px)"
                    quality={84}
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.08]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f2535]/92 via-[#0f2535]/28 to-black/10 transition-opacity duration-700 group-hover:opacity-95" />

                  <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-4 sm:left-7 sm:right-7 sm:top-7">
                    <span className="rounded-md bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
                      {project.label}
                    </span>

                    <span className="rounded-md bg-white/15 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                    <div className="flex items-end justify-between gap-6">
                      <div className="transition-all duration-700 group-hover:-translate-y-2">
                        <h3 className="max-w-lg text-2xl font-light leading-tight tracking-[-0.035em] text-white transition-all duration-700 group-hover:scale-[1.03] sm:text-3xl">
                          {project.name}
                        </h3>

                        <p className="mt-3 max-h-0 max-w-md overflow-hidden text-sm leading-7 text-white/75 opacity-0 transition-all duration-700 group-hover:max-h-20 group-hover:opacity-100">
                          Seçili malzeme, dengeli ışık ve rafine detaylarla
                          tamamlanan özel proje.
                        </p>

                        <div className="mt-4 h-px w-10 bg-[#d8c7ad]/90 transition-all duration-700 group-hover:w-32" />
                      </div>

                      <div className="shrink-0 pb-1">
                        <BsArrowUpRight className="text-3xl text-white transition-all duration-500 group-hover:-translate-y-2 group-hover:translate-x-2 group-hover:text-[#d8c7ad]" />
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/15 to-transparent" />
                  </div>
                </div>
              </m.article>
            ))}
          </div>

          <m.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.75, ease: [0.22, 1, 0.36, 1] }
            }
            viewport={{ once: true }}
            className="mt-18 flex justify-center"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0f2535] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#9b8364]"
            >
              Daha Fazla Proje
              <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default memo(Projects);