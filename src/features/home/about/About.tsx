"use client";

import NextImage, { type StaticImageData } from "next/image";
import Link from "next/link";
import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";

import Img from "@/assets/hero2.webp";
import Hero3 from "@/assets/hero3.webp";
import Hero4 from "@/assets/hero4.webp";
import Hero5 from "@/assets/hero5.webp";

type PremiumCard = {
  title: string;
  desc: string;
  image: StaticImageData;
};

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const softEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cardContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.94,
    filter: "blur(14px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

const premiumCards: PremiumCard[] = [
  {
    title: "Özel Tasarım",
    desc: "Her projeye özgü, mekânın kimliğini yansıtan rafine çözümler.",
    image: Hero3,
  },
  {
    title: "Kaliteli Üretim",
    desc: "Malzeme seçiminden işçiliğe kadar her detayda yüksek standart.",
    image: Hero4,
  },
  {
    title: "Anahtar Teslim",
    desc: "Tasarım, üretim ve uygulamada kusursuz bütünlük.",
    image: Hero5,
  },
];

const About = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full overflow-hidden bg-[#fff] text-[#0f2535]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-0 top-0 h-[420px] w-[420px] rounded-full bg-white/70 blur-3xl" />
          <div className="absolute bottom-0 left-[20%] h-[320px] w-[320px] rounded-full bg-white/60 blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <m.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: softEase }}
            viewport={{ once: true, amount: 0.35 }}
            className="relative"
          >
            <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
              <span className="h-px w-10 bg-[#9b8364]" />
              Hakkımızda
            </span>

            <h2 className="max-w-xl text-4xl font-light leading-[1.08] tracking-[-0.04em] text-[#0f2535] sm:text-5xl lg:text-7xl">
              Yaşam alanlarına{" "}
              <span className="font-serif italic text-[#9b8364]">
                zamansız
              </span>{" "}
              bir karakter kazandırıyoruz.
            </h2>

            <p className="mt-8 max-w-xl text-base leading-8 text-[#4b5b66] sm:text-lg">
              Aryap olarak iç mekan, mobilya ve uygulama süreçlerini estetik,
              fonksiyon ve kalite odağında bir araya getiriyoruz. Her projede
              mekanın ruhunu güçlendiren, sade ama etkileyici çözümler üretiriz.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/company"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0f2535] px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#9b8364]"
              >
                Daha Fazla Keşfet
                <BsArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <div className="h-px w-16 bg-[#c9b99f]" />

              <p className="text-sm uppercase tracking-[0.28em] text-[#9b8364]">
                Interior & Furniture
              </p>
            </div>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: softEase }}
            viewport={{ once: true, amount: 0.25 }}
            className="relative"
          >
            <div className="relative ml-auto w-full max-w-[620px]">
              <div className="absolute -left-5 -top-5 h-full w-full rounded-[2rem] border border-[#d8c7ad]" />

              <div className="relative h-[560px] overflow-hidden rounded-[2rem] bg-[#0f2535] shadow-2xl shadow-[#0f2535]/20">
                <NextImage
                  src={Img}
                  alt="Luxury interior design"
                  fill
                  sizes="(min-width: 1024px) 620px, calc(100vw - 48px)"
                  quality={84}
                  placeholder="blur"
                  className="object-cover opacity-90 transition-transform duration-[1400ms] hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f2535]/70 via-[#0f2535]/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7 sm:p-9">
                  <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#d8c7ad]">
                    Signature Approach
                  </p>

                  <h3 className="max-w-md text-2xl font-light leading-tight text-white sm:text-3xl">
                    Malzeme, ışık ve oran dengesini merkeze alan özel
                    tasarımlar.
                  </h3>
                </div>
              </div>

              <m.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                viewport={{ once: true }}
                className="absolute -bottom-30 right-4 w-[250px] rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur-md sm:right-[-35px]"
              >
                <p className="text-5xl font-light tracking-[-0.06em] text-[#0f2535]">
                  35+
                </p>
                <p className="mt-2 text-sm leading-6 text-[#5c6a73]">
                  Yıllık deneyimle modern, sıcak ve rafine yaşam alanları.
                </p>
              </m.div>
            </div>
          </m.div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-28 lg:px-10">
          <m.div
            variants={cardContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-10 sm:grid-cols-3"
          >
            {premiumCards.map((item, index) => (
              <m.div
                key={item.title}
                variants={cardVariants}
                className="group relative min-h-[340px] overflow-hidden rounded-[2rem] border border-[#e5ded4] bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <NextImage
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 390px, (min-width: 640px) 33vw, calc(100vw - 48px)"
                  quality={78}
                  placeholder="blur"
                  className="absolute inset-0 scale-110 object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-100 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-[#0f2535]/0 transition-all duration-700 group-hover:bg-[#0f2535]/65" />

                <span className="relative z-10 text-[80px] font-light leading-none text-[#e9e3da] transition-colors duration-500 group-hover:text-white/20">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 mt-6">
                  <h4 className="text-2xl font-light text-[#0f2535] transition-colors duration-500 group-hover:text-white">
                    {item.title}
                  </h4>

                  <p className="mt-4 text-sm leading-7 text-[#5c6a73] transition-colors duration-500 group-hover:text-white/80">
                    {item.desc}
                  </p>
                </div>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default About;