"use client";

import NextImage from "next/image";
import Link from "next/link";
import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import aryaplogo from "@/assets/AryapLogoBeyaz.png";
import artechLogo from "@/assets/artechlogo.png";

type FooterLinkItem = {
  label: string;
  path: string;
};

type LinkItemProps = {
  children: ReactNode;
  href: string;
};

type SectionTitleProps = {
  children: ReactNode;
  href: string;
};

const footerHeadline =
  "Mekânın karakterini tasarım, üretim ve detay belirler.";

const projectPath = (category: string) =>
  `/projects?category=${encodeURIComponent(category)}`;

const solutionPath = (service: string) =>
  `/solutions?service=${encodeURIComponent(service)}#hizmet-alanlari`;

const corporate: FooterLinkItem[] = [
  {
    label: "Hakkımızda",
    path: "/company/about",
  },
  {
    label: "Üretim",
    path: "/company/production",
  },
  {
    label: "Vizyon & Misyon",
    path: "/company/vision-mission",
  },
];

const projects: FooterLinkItem[] = [
  {
    label: "İç Mekan Tasarımı",
    path: projectPath("İç Mekan Tasarımı"),
  },
  {
    label: "Mutfak",
    path: projectPath("Mutfak"),
  },
  {
    label: "Banyo",
    path: projectPath("Banyo"),
  },
  {
    label: "Ahşap Kapı",
    path: projectPath("Ahşap Kapı"),
  },
  {
    label: "Dekorasyon",
    path: projectPath("Dekorasyon"),
  },
  {
    label: "İş Yerleri",
    path: projectPath("İş Yerleri"),
  },
];

const solutions: FooterLinkItem[] = [
  {
    label: "Özel Üretim",
    path: solutionPath("ozel-uretim"),
  },
  {
    label: "İç Mimari",
    path: solutionPath("ic-mimari"),
  },
  {
    label: "Mobilya Tasarımı",
    path: solutionPath("mobilya-tasarimi"),
  },
];

const LinkItem = memo(({ children, href }: LinkItemProps) => {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-8 border-b border-white/10 py-4 text-sm text-white/65 transition-all duration-500 hover:border-white/35 hover:text-white"
    >
      <span className="transition-transform duration-500 group-hover:translate-x-2">
        {children}
      </span>

      <FiArrowUpRight className="text-white/25 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-45 group-hover:text-white" />
    </Link>
  );
});

LinkItem.displayName = "LinkItem";

const SectionTitle = memo(({ children, href }: SectionTitleProps) => {
  return (
    <Link
      href={href}
      className="group mb-7 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-white/35 transition-all duration-300 hover:text-white"
    >
      {children}
      <span className="mt-1 block h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
    </Link>
  );
});

SectionTitle.displayName = "SectionTitle";

const Footer = () => {
  const headlineBoxRef = useRef<HTMLDivElement | null>(null);
  const headlineTextRef = useRef<HTMLParagraphElement | null>(null);

  const fitHeadline = useCallback(() => {
    const box = headlineBoxRef.current;
    const text = headlineTextRef.current;

    if (!box || !text) return;

    const boxWidth = box.clientWidth;
    const boxHeight = box.clientHeight;

    if (!boxWidth || !boxHeight) return;

    const maxFontSize = Math.min(Math.max(boxWidth * 0.14, 36), 72);
    const minFontSize = 8;

    text.style.fontSize = `${maxFontSize}px`;
    text.style.lineHeight = "1.05";
    text.style.whiteSpace = "normal";
    text.style.wordBreak = "normal";
    text.style.overflowWrap = "normal";
    text.style.hyphens = "none";

    let low = minFontSize;
    let high = maxFontSize;
    let best = minFontSize;

    for (let i = 0; i < 40; i += 1) {
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
        if (isMounted) fitHeadline();
      });
    };

    runFit();

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) runFit();
      });
    }

    const resizeObserver = new ResizeObserver(runFit);

    if (headlineBoxRef.current) {
      resizeObserver.observe(headlineBoxRef.current);
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
  }, [fitHeadline]);

  return (
    <footer className="relative overflow-hidden bg-[#0d0d0d] text-white">
      <div className="pointer-events-none absolute -left-8 top-8 select-none text-[28vw] font-black uppercase leading-none tracking-[-0.12em] text-white/[0.025]">
        Aryap
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
          <div className="min-w-0">
            <Link href="/" className="block w-32">
              <NextImage
                src={aryaplogo}
                alt="Aryap Logo"
                className="h-auto w-full object-contain"
                draggable={false}
                sizes="128px"
                priority={false}
              />
            </Link>

            <div
              ref={headlineBoxRef}
              className="mt-12 flex h-[clamp(8rem,15vw,17rem)] w-full max-w-xl min-w-0 items-start overflow-hidden"
            >
              <p
                ref={headlineTextRef}
                className="block w-full max-w-full min-w-0 font-semibold leading-[1.05] tracking-[-0.04em]"
                style={{
                  fontSize: "72px",
                  whiteSpace: "normal",
                  wordBreak: "normal",
                  overflowWrap: "normal",
                  hyphens: "none",
                }}
              >
                {footerHeadline}
              </p>
            </div>
          </div>

          <div className="max-w-xl lg:ml-auto">
            <p className="text-sm uppercase tracking-[0.35em] text-white/35">
              İç mimari • Ahşap • Mobilya • Uygulama
            </p>

            <p className="mt-6 text-base leading-8 text-white/55">
              Aryap; yaşam alanları, iş yerleri ve özel üretim projelerde
              estetik çizgiyi fonksiyonel üretim kalitesiyle buluşturur.
            </p>
          </div>
        </div>

        <div className="mt-24 grid gap-y-16 border-t border-white/10 pt-16 md:grid-cols-2 md:gap-x-20 lg:grid-cols-4 lg:gap-x-24 xl:gap-x-28">
          <div>
            <SectionTitle href="/company">Kurumsal</SectionTitle>

            {corporate.map((item) => (
              <LinkItem key={item.label} href={item.path}>
                {item.label}
              </LinkItem>
            ))}
          </div>

          <div>
            <SectionTitle href="/projects">Projeler</SectionTitle>

            {projects.map((item) => (
              <LinkItem key={item.label} href={item.path}>
                {item.label}
              </LinkItem>
            ))}
          </div>

          <div>
            <SectionTitle href="/solutions">Çözümler</SectionTitle>

            {solutions.map((item) => (
              <LinkItem key={item.label} href={item.path}>
                {item.label}
              </LinkItem>
            ))}
          </div>

          <div>
            <SectionTitle href="/contact">İletişim</SectionTitle>

            <div className="space-y-7 text-sm text-white/65">
              <div>
                <p className="mb-2 text-white/35">Mail</p>

                <a
                  href="mailto:info@aryap.com"
                  className="transition-colors duration-300 hover:text-white"
                >
                  info@aryap.com
                </a>
              </div>

              <div>
                <p className="mb-2 text-white/35">Telefon</p>

                <a
                  href="tel:+905326711318"
                  className="transition-colors duration-300 hover:text-white"
                >
                  +90 532 671 13 18
                </a>
              </div>

              <div>
                <p className="mb-2 text-white/35">Adres</p>

                <p className="leading-7">
                  Fevzi Çakmak Mah. Milenyum Cad. ASPAK Sanayi Sitesi D:2 No:73
                  Karatay / Konya
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/aryap.ahsap/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center text-xl text-white/45 transition-colors duration-300 hover:text-white"
              aria-label="Instagram"
            >
              <span className="absolute bottom-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />

              <FaInstagram className="cursor-pointer transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
            </a>

            <a
              href="https://www.linkedin.com/company/aryap-yap%C4%B1-tasar%C4%B1m/"
              target="_blank"
              rel="noreferrer"
              className="group relative flex h-9 w-9 items-center justify-center text-xl text-white/45 transition-colors duration-300 hover:text-white"
              aria-label="LinkedIn"
            >
              <span className="absolute bottom-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />

              <FaLinkedinIn className="cursor-pointer transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-110" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 border-t border-white/10 pt-9 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-white/40">
            <p>© 2026 Aryap. Tüm hakları saklıdır.</p>

            <Link
              href="/kvkk"
              className="transition-colors duration-300 hover:text-white"
            >
              KVKK
            </Link>

            <Link
              href="/cerez-politikasi"
              className="transition-colors duration-300 hover:text-white"
            >
              Çerez Politikası
            </Link>
          </div>

          <a
            href="https://artechyazilim.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3"
          >
            <span className="text-xs text-white/35">Developed by</span>

            <NextImage
              src={artechLogo}
              alt="Artech Software"
              className="h-9 w-auto grayscale opacity-40 transition-all duration-700 group-hover:-translate-y-0.5 group-hover:grayscale-0 group-hover:opacity-100"
              draggable={false}
              sizes="160px"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);