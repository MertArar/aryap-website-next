"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiArrowUpRight,
  FiChevronDown,
  FiGlobe,
  FiInstagram,
  FiMail,
  FiMenu,
  FiX,
} from "react-icons/fi";

import AryapLogoWhite from "@/assets/AryapLogoBeyaz.png";
import AryapLogoDark from "@/assets/AryapLogo.png";

const SCROLL_LIMIT = 45;

const projectPath = (category: string) =>
  `/projects?category=${encodeURIComponent(category)}`;

const NAV_ITEMS = [
  { label: "Kurumsal", path: "/company" },
  { label: "Projeler", path: "/projects" },
  { label: "Çözümler", path: "/solutions" },
  { label: "İletişim", path: "/contact" },
] as const;

const LANGUAGES = ["TR", "EN", "FR", "RU"] as const;

type NavLabel = (typeof NAV_ITEMS)[number]["label"];
type Language = (typeof LANGUAGES)[number];

type DropdownItem = {
  label: string;
  path: string;
};

type HeroHeaderChangeDetail = {
  darkHeader?: boolean;
};

const DROPDOWN_ITEMS: Partial<Record<NavLabel, DropdownItem[]>> = {
  Kurumsal: [
    { label: "Hakkımızda", path: "/company/about" },
    { label: "Üretim", path: "/company/production" },
    { label: "Vizyon & Misyon", path: "/company/vision-mission" },
  ],
  Projeler: [
    { label: "İç Mekan Tasarımı", path: projectPath("İç Mekan Tasarımı") },
    { label: "Mutfak", path: projectPath("Mutfak") },
    { label: "Banyo", path: projectPath("Banyo") },
    { label: "Ahşap Kapı", path: projectPath("Ahşap Kapı") },
    { label: "Dekorasyon", path: projectPath("Dekorasyon") },
    { label: "İş Yerleri", path: projectPath("İş Yerleri") },
  ],
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkHeader, setDarkHeader] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>("TR");

  const scrollFrameRef = useRef<number | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleHeroHeaderChange = (event: Event) => {
      const customEvent = event as CustomEvent<HeroHeaderChangeDetail>;
      const nextDarkHeader = Boolean(customEvent.detail?.darkHeader);

      setDarkHeader((prev) =>
        prev === nextDarkHeader ? prev : nextDarkHeader
      );
    };

    window.addEventListener("heroHeaderChange", handleHeroHeaderChange);

    return () => {
      window.removeEventListener("heroHeaderChange", handleHeroHeaderChange);
    };
  }, []);

  useEffect(() => {
    const updateScrolledState = () => {
      const nextScrolled = window.scrollY > SCROLL_LIMIT;

      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }

      scrollFrameRef.current = null;
    };

    const handleScroll = () => {
      if (scrollFrameRef.current) return;

      scrollFrameRef.current =
        window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };

    if (mediaQuery.matches) setIsOpen(false);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const closeMobileMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const isDarkMode = scrolled || darkHeader;

  const headerLogo: StaticImageData = isDarkMode
    ? AryapLogoDark
    : AryapLogoWhite;

  const headerTextColor = isDarkMode
    ? "text-[#0f2535] hover:text-[#0f2535]/70"
    : "text-white hover:text-white/70";

  const underlineColor = isDarkMode ? "bg-[#0f2535]" : "bg-white";
  const dividerColor = isDarkMode ? "bg-[#0f2535]/35" : "bg-white/35";
  const hamburgerColor = isDarkMode ? "text-[#0f2535]" : "text-white";

  const hamburgerBg = isDarkMode
    ? "bg-[#0f2535]/5 group-hover:bg-[#0f2535]/10"
    : "bg-white/10 group-hover:bg-white/15";

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? "bg-white shadow-[0_14px_45px_rgba(15,37,53,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[height] duration-300 sm:px-8 lg:px-10 ${
          scrolled ? "h-20" : "h-24"
        }`}
      >
        <Link
          href="/"
          className="flex cursor-pointer items-center"
          aria-label="Anasayfaya git"
        >
          <Image
            src={headerLogo}
            alt="Aryap Logo"
            className="h-8 w-auto object-contain transition-opacity duration-300 sm:h-9"
            draggable={false}
            priority
            sizes="150px"
          />
        </Link>

        <div className="hidden items-center gap-12 lg:flex">
          <nav className="flex items-center gap-10">
            {NAV_ITEMS.map((item) => {
              const dropdownItems = DROPDOWN_ITEMS[item.label];
              const hasDropdown = Boolean(dropdownItems);

              return (
                <div
                  key={item.label}
                  className="group relative flex h-24 items-center"
                >
                  <Link
                    href={item.path}
                    className={`group/link relative flex cursor-pointer items-center gap-1.5 text-base font-medium tracking-[0.18em] transition-colors duration-300 ${headerTextColor}`}
                  >
                    {item.label}

                    {hasDropdown && (
                      <FiChevronDown className="text-sm transition-transform duration-300 group-hover:rotate-180" />
                    )}

                    <span
                      className={`absolute -bottom-2 left-0 h-[1px] w-0 transition-[width] duration-300 group-hover/link:w-full ${underlineColor}`}
                    />
                  </Link>

                  {hasDropdown && dropdownItems && (
                    <div className="invisible absolute left-1/2 top-[78px] w-72 -translate-x-1/2 translate-y-4 scale-95 overflow-hidden rounded-3xl bg-white p-3 opacity-0 shadow-[0_24px_70px_rgba(15,37,53,0.16)] transition-[opacity,transform,visibility] duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100">
                      <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />

                      <div className="relative z-10">
                        {dropdownItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.path}
                            className="group/item flex cursor-pointer items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold tracking-[0.08em] text-[#0f2535]/65 transition-[background-color,color] duration-300 hover:bg-[#0f2535] hover:text-white"
                          >
                            <span>{subItem.label}</span>
                            <FiArrowUpRight className="text-base opacity-0 transition-[opacity,transform] duration-300 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 group-hover/item:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-7 pl-2">
            <span
              className={`h-5 w-px transition-colors duration-300 ${dividerColor}`}
            />

            <div className="group relative">
              <button
                type="button"
                className={`flex cursor-pointer items-center gap-2 rounded-full px-1 py-2 text-sm font-semibold tracking-[0.18em] transition-colors duration-300 ${headerTextColor}`}
                aria-label="Dil seçimi"
              >
                <FiGlobe className="text-lg" />
                <span>{selectedLang}</span>
                <FiChevronDown className="text-base transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <div className="invisible absolute right-0 top-9 w-32 translate-y-3 overflow-hidden rounded-2xl bg-white py-2 opacity-0 shadow-[0_18px_50px_rgba(15,37,53,0.16)] transition-[opacity,transform,visibility] duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLang(lang)}
                    className={`flex w-full cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-semibold tracking-[0.16em] transition-colors duration-300 ${
                      selectedLang === lang
                        ? "text-[#0f2535]"
                        : "text-[#0f2535]/45 hover:text-[#0f2535]"
                    }`}
                  >
                    <span>{lang}</span>
                    {selectedLang === lang && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0f2535]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`group relative flex cursor-pointer items-center gap-3 overflow-hidden rounded-full px-4 py-3 transition-colors duration-300 lg:hidden ${hamburgerColor}`}
          aria-label="Menüyü aç"
          aria-expanded={isOpen}
        >
          <span
            className={`absolute inset-0 rounded-full transition-colors duration-300 ${hamburgerBg}`}
          />

          <span className="relative text-[10px] font-semibold uppercase tracking-[0.28em]">
            Menü
          </span>

          <span className="relative flex h-8 w-8 items-center justify-center rounded-full">
            <FiMenu className="text-2xl transition-transform duration-300 group-hover:rotate-90" />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 z-[80] lg:hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-[#07111a]/85 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Menüyü kapat"
        />

        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-[430px] transform-gpu flex-col overflow-hidden bg-[#081521] text-white shadow-[-28px_0_70px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] sm:w-[86%] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%,rgba(255,255,255,0.03))]" />

          <div className="relative z-10 flex items-center justify-between px-5 py-6 sm:px-8">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`inline-flex cursor-pointer items-center transition-[opacity,transform] duration-300 ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-100"
                  : "-translate-y-2 opacity-0 delay-0"
              }`}
              aria-label="Anasayfaya git"
            >
              <Image
                src={AryapLogoWhite}
                alt="Aryap Logo"
                className="h-8 w-auto"
                draggable={false}
                priority
                sizes="150px"
              />
            </Link>

            <button
              type="button"
              onClick={closeMobileMenu}
              className={`group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-[opacity,transform,background-color,color] duration-300 hover:bg-white hover:text-[#0f2535] ${
                isOpen
                  ? "translate-y-0 opacity-100 delay-100"
                  : "-translate-y-2 opacity-0 delay-0"
              }`}
              aria-label="Menüyü kapat"
            >
              <FiX className="text-2xl transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          <nav className="relative z-10 mt-6 flex flex-1 flex-col justify-center px-6 sm:px-8">
            {NAV_ITEMS.map((item, index) => {
              const dropdownItems = DROPDOWN_ITEMS[item.label];

              return (
                <div
                  key={item.label}
                  className={`border-t border-white/10 transition-[opacity,transform] duration-300 last:border-b ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-5 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${120 + index * 55}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.path}
                    onClick={closeMobileMenu}
                    className="group relative flex cursor-pointer items-center justify-between py-5"
                  >
                    <div className="flex items-end gap-5">
                      <span className="mb-2 text-xs font-medium text-white/35">
                        0{index + 1}
                      </span>

                      <span className="text-4xl font-semibold tracking-[-0.06em] text-white transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                        {item.label}
                      </span>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-[background-color,color,transform] duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-[#0f2535]">
                      <FiArrowUpRight className="text-lg" />
                    </span>
                  </Link>

                  {dropdownItems && (
                    <div className="grid gap-2 pb-5 pl-12">
                      {dropdownItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.path}
                          onClick={closeMobileMenu}
                          className="cursor-pointer text-sm font-medium tracking-[0.08em] text-white/45 transition-colors duration-300 hover:text-white"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div
            className={`relative z-10 px-6 pb-8 transition-[opacity,transform] duration-300 sm:px-8 ${
              isOpen
                ? "translate-y-0 opacity-100 delay-300"
                : "translate-y-4 opacity-0 delay-0"
            }`}
          >
            <div className="mb-6 flex flex-wrap gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold tracking-[0.18em] transition-[background-color,color] duration-300 ${
                    selectedLang === lang
                      ? "bg-white text-[#0f2535]"
                      : "bg-white/10 text-white/55 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="grid gap-6">
              <div className="flex items-center justify-between text-white/55">
                <div className="flex items-center gap-4">
                  <a
                    href="mailto:info@aryap.com"
                    className="cursor-pointer transition-colors duration-300 hover:text-white"
                    aria-label="Mail"
                  >
                    <FiMail className="text-xl" />
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer transition-colors duration-300 hover:text-white"
                    aria-label="Instagram"
                  >
                    <FiInstagram className="text-xl" />
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="group inline-flex cursor-pointer items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white"
                >
                  Teklif Al
                  <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
};

export default memo(Header);