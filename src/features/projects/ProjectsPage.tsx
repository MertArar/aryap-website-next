"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiLayers,
} from "react-icons/fi";
import type { IconType } from "react-icons";

import project1 from "@/assets/hero1.webp";
import project2 from "@/assets/hero2.webp";
import project3 from "@/assets/hero3.webp";
import project4 from "@/assets/hero4.webp";
import project5 from "@/assets/hero5.webp";
import project6 from "@/assets/hero6.webp";

const PROJECTS_PER_PAGE = 10;

const PROJECTS_FILTER_HASH = "projects-filter";
const PROJECTS_FILTER_SCROLL_EVENT = "aryapProjectsScrollToFilter";
const PROJECTS_FILTER_STORAGE_KEY = "aryapProjectsShouldScrollToFilter";

const tabs = [
  "Tümü",
  "İç Mekan Tasarımı",
  "Mutfak",
  "Banyo",
  "Ahşap Kapı",
  "Dekorasyon",
  "İş Yerleri",
] as const;

type ProjectCategory = (typeof tabs)[number];

type ProjectStatus = "Tamamlandı" | "Devam Ediyor" | "Teslim Sürecinde";

type ProjectItem = {
  id: number;
  name: string;
  company: string;
  category: Exclude<ProjectCategory, "Tümü">;
  status: ProjectStatus;
  image: StaticImageData;
  works: string;
};

type StatusStyle = {
  icon: IconType;
  className: string;
};

const projects: ProjectItem[] = [
  {
    id: 1,
    name: "Modern Villa Yaşam Alanı",
    company: "Aryap Concept",
    category: "İç Mekan Tasarımı",
    status: "Tamamlandı",
    image: project1,
    works:
      "Salon, giriş holü ve yaşam alanlarında özel ölçü mobilya, duvar paneli, ahşap yüzey kaplama ve dekoratif tamamlayıcı üretimler yapıldı.",
  },
  {
    id: 2,
    name: "Özel Ölçü Mutfak Uygulaması",
    company: "Luna Residence",
    category: "Mutfak",
    status: "Devam Ediyor",
    image: project2,
    works:
      "Ada mutfak modülü, yüksek dolap sistemleri, lake kapaklar, tezgâh altı depolama çözümleri ve bütünleşik raf detayları hazırlanıyor.",
  },
  {
    id: 3,
    name: "Mermer Dokulu Banyo Ünitesi",
    company: "Nova Homes",
    category: "Banyo",
    status: "Tamamlandı",
    image: project3,
    works:
      "Lavabo altı dolap, neme dayanıklı yüzey kaplama, ayna çevresi ahşap detaylar ve özel ölçü banyo depolama çözümleri uygulandı.",
  },
  {
    id: 4,
    name: "Masif Ahşap Kapı Serisi",
    company: "Kaya İnşaat",
    category: "Ahşap Kapı",
    status: "Teslim Sürecinde",
    image: project4,
    works:
      "İç mekân kapıları için özel ölçü ahşap yüzey, pervaz üretimi, boya uygulaması ve montaj öncesi son kalite kontrolleri tamamlandı.",
  },
  {
    id: 5,
    name: "Butik Otel Dekorasyon Projesi",
    company: "Mira Boutique Hotel",
    category: "Dekorasyon",
    status: "Devam Ediyor",
    image: project5,
    works:
      "Oda başlıkları, dekoratif duvar çıtaları, lobi tamamlayıcıları, ahşap raf sistemleri ve özel üretim mobilyalar hazırlanıyor.",
  },
  {
    id: 6,
    name: "Kurumsal Ofis Mobilyaları",
    company: "Arden Group",
    category: "İş Yerleri",
    status: "Tamamlandı",
    image: project6,
    works:
      "Yönetici odası, toplantı masası, karşılama bankosu, çalışma alanları ve ofis içi depolama çözümleri üretildi.",
  },
  {
    id: 7,
    name: "Sıcak Tonlu İç Mekân Kurgusu",
    company: "Eksen Mimarlık",
    category: "İç Mekan Tasarımı",
    status: "Tamamlandı",
    image: project1,
    works:
      "TV ünitesi, duvar paneli, gizli depolama alanları, raf sistemleri ve mekân bütünlüğünü destekleyen ahşap detaylar uygulandı.",
  },
  {
    id: 8,
    name: "Minimal Mutfak Yenileme",
    company: "Vera Loft",
    category: "Mutfak",
    status: "Teslim Sürecinde",
    image: project2,
    works:
      "Mat yüzey mutfak kapakları, yüksek dolap düzeni, raf sistemi ve fonksiyonel depolama çözümleri teslim aşamasına getirildi.",
  },
  {
    id: 9,
    name: "Ahşap Kaplama Ofis Duvarı",
    company: "Linea Office",
    category: "İş Yerleri",
    status: "Devam Ediyor",
    image: project1,
    works:
      "Karşılama alanı, toplantı odası duvar kaplamaları, dekoratif raf sistemi ve marka kimliğine uygun ahşap yüzey çalışmaları devam ediyor.",
  },
  {
    id: 10,
    name: "Country Stil Mutfak Tasarımı",
    company: "Mavi Evler",
    category: "Mutfak",
    status: "Tamamlandı",
    image: project2,
    works:
      "Profil kapaklar, ada tezgâhı, açık raf düzeni, dekoratif çıta detayları ve doğal tonlu yüzey bitişleri uygulandı.",
  },
  {
    id: 11,
    name: "Dekoratif Oturma Alanı",
    company: "Riva Homes",
    category: "Dekorasyon",
    status: "Teslim Sürecinde",
    image: project3,
    works:
      "Oturma alanında niş uygulamaları, ahşap raflar, TV duvarı tamamlayıcıları ve özel ölçü dekoratif paneller teslim aşamasına alındı.",
  },
  {
    id: 12,
    name: "Banyo Depolama Çözümü",
    company: "Zen Yapı",
    category: "Banyo",
    status: "Tamamlandı",
    image: project4,
    works:
      "Lavabo altı depolama, uzun kolon dolap, neme dayanıklı kapak yüzeyleri ve banyo içi tamamlayıcı mobilyalar üretildi.",
  },
];

const statusStyles: Record<ProjectStatus, StatusStyle> = {
  Tamamlandı: {
    icon: FiCheckCircle,
    className: "bg-[#e8f1ec] text-[#1f6b45]",
  },
  "Devam Ediyor": {
    icon: FiClock,
    className: "bg-[#edf3f7] text-[#1E4E6E]",
  },
  "Teslim Sürecinde": {
    icon: FiLayers,
    className: "bg-[#f5eee3] text-[#9b6f33]",
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 42,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

function AutoFitHeroTitle({ children }: { children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);

  const fitText = useCallback(() => {
    const box = boxRef.current;
    const text = textRef.current;

    if (!box || !text) return;

    const boxWidth = box.clientWidth;
    const boxHeight = box.clientHeight;

    if (!boxWidth || !boxHeight) return;

    const maxFontSize = Math.min(Math.max(boxWidth * 0.15, 48), 96);
    const minFontSize = 12;

    text.style.fontSize = `${maxFontSize}px`;
    text.style.lineHeight = "0.98";
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
    let frameId = 0;

    const runFit = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(fitText);
    };

    runFit();

    if (document.fonts?.ready) {
      document.fonts.ready.then(runFit);
    }

    const resizeObserver = new ResizeObserver(runFit);

    if (boxRef.current) {
      resizeObserver.observe(boxRef.current);
    }

    window.addEventListener("resize", runFit);
    window.addEventListener("orientationchange", runFit);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", runFit);
      window.removeEventListener("orientationchange", runFit);
    };
  }, [fitText, children]);

  return (
    <div
      ref={boxRef}
      className="h-[clamp(10rem,28vh,24rem)] w-full max-w-5xl min-w-0 overflow-visible"
    >
      <h1
        ref={textRef}
        className="max-w-5xl font-light leading-[0.98] tracking-[-0.065em] text-white"
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
}

export default function ProjectsPage() {
  const filterRef = useRef<HTMLDivElement | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategoryParam = searchParams.get("category");

  const [activeTab, setActiveTab] = useState<ProjectCategory>("Tümü");
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToFilter = useCallback(
    (behavior: ScrollBehavior = "smooth") => {
      window.setTimeout(() => {
        filterRef.current?.scrollIntoView({
          behavior,
          block: "start",
        });
      }, 80);
    },
    []
  );

  useEffect(() => {
    const handleScrollRequest = () => {
      scrollToFilter("smooth");
    };

    window.addEventListener(PROJECTS_FILTER_SCROLL_EVENT, handleScrollRequest);

    return () => {
      window.removeEventListener(
        PROJECTS_FILTER_SCROLL_EVENT,
        handleScrollRequest
      );
    };
  }, [scrollToFilter]);

  useEffect(() => {
    if (
      selectedCategoryParam &&
      tabs.includes(selectedCategoryParam as ProjectCategory)
    ) {
      setActiveTab(selectedCategoryParam as ProjectCategory);
    } else {
      setActiveTab("Tümü");
    }

    setCurrentPage(1);
  }, [selectedCategoryParam]);

  useEffect(() => {
    const shouldScrollFromHash =
      window.location.hash === `#${PROJECTS_FILTER_HASH}`;

    let shouldScrollFromStorage = false;

    try {
      shouldScrollFromStorage =
        window.sessionStorage.getItem(PROJECTS_FILTER_STORAGE_KEY) === "1";

      if (shouldScrollFromStorage) {
        window.sessionStorage.removeItem(PROJECTS_FILTER_STORAGE_KEY);
      }
    } catch {
      shouldScrollFromStorage = false;
    }

    if (!shouldScrollFromHash && !shouldScrollFromStorage) return;

    const timeoutId = window.setTimeout(() => {
      scrollToFilter("smooth");
    }, 140);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [selectedCategoryParam, scrollToFilter]);

  const filteredProjects = useMemo(() => {
    if (activeTab === "Tümü") return projects;

    return projects.filter((project) => project.category === activeTab);
  }, [activeTab]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const shouldShowPagination = filteredProjects.length > PROJECTS_PER_PAGE;

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    const endIndex = startIndex + PROJECTS_PER_PAGE;

    return filteredProjects.slice(startIndex, endIndex);
  }, [filteredProjects, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const handleTabClick = (tab: ProjectCategory) => {
    setActiveTab(tab);
    setCurrentPage(1);

    if (tab === "Tümü") {
      router.push(pathname, { scroll: false });
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("category", tab);

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;

    setCurrentPage(page);
    scrollToFilter();
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f5f0] text-[#0f2535]">
      <style jsx global>{`
        .aryap-projects-hero-grid {
          display: grid;
          gap: 3.5rem;
        }

        @media (min-width: 1024px) {
          .aryap-projects-hero-grid {
            grid-template-columns: minmax(0, 0.98fr) minmax(0, 1.02fr);
            align-items: end;
          }
        }

        .aryap-projects-hero-gradient {
          background: linear-gradient(
            90deg,
            #0d0d0d 0%,
            rgba(13, 13, 13, 0.82) 42%,
            rgba(13, 13, 13, 0.38) 100%
          );
        }

        .aryap-projects-active-card-radial {
          background: radial-gradient(
            circle at 0% 0%,
            rgba(216, 199, 173, 0.22),
            transparent 34%
          );
        }

        .aryap-projects-active-card-linear {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.12),
            transparent 48%
          );
        }

        .aryap-project-card-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.38),
            rgba(0, 0, 0, 0.02) 54%
          );
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-6 pb-24 pt-40 text-white sm:px-8 lg:px-10 lg:pb-28 lg:pt-48">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={project4.src}
            width={project4.width}
            height={project4.height}
            alt=""
            draggable={false}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-[#0d0d0d]/62" />
          <div className="aryap-projects-hero-gradient absolute inset-0" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="aryap-projects-hero-grid">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="mb-7 inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.38em] text-[#d8c7ad]">
                <span className="h-px w-12 bg-[#d8c7ad]" />
                Proje Arşivi
              </span>

              <AutoFitHeroTitle>
                Mekânlara değer katan{" "}
                <span className="font-serif italic text-[#d8c7ad]">
                  üretim
                </span>{" "}
                izleri.
              </AutoFitHeroTitle>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
                İç mekân tasarımı, mutfak, banyo, ahşap kapı, dekorasyon ve iş
                yeri projelerinde ürettiğimiz işleri kategori ve proje durumuna
                göre inceleyebilirsiniz.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative hidden min-h-[460px] lg:block"
            >
              <div className="absolute right-0 top-0 h-[330px] w-[68%] overflow-hidden rounded-xl shadow-[0_35px_110px_rgba(0,0,0,0.45)]">
                <img
                  src={project1.src}
                  width={project1.width}
                  height={project1.height}
                  alt=""
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/12" />
              </div>

              <div className="absolute bottom-0 left-0 h-[300px] w-[58%] overflow-hidden rounded-xl shadow-[0_35px_110px_rgba(0,0,0,0.38)]">
                <img
                  src={project4.src}
                  width={project4.width}
                  height={project4.height}
                  alt=""
                  draggable={false}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/18" />
              </div>

              {/* ACTIVE ARCHIVE */}
              <div className="absolute bottom-8 right-8 w-[350px] overflow-hidden rounded-xl bg-white/[0.13] shadow-[0_28px_100px_rgba(0,0,0,0.38)] ring-1 ring-white/15 backdrop-blur-2xl">
                <div className="aryap-projects-active-card-radial pointer-events-none absolute inset-0" />
                <div className="aryap-projects-active-card-linear pointer-events-none absolute inset-0" />

                <div className="relative p-6">
                  <div className="mb-6 flex items-center justify-between gap-5">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d8c7ad]">
                        Aktif Arşiv
                      </p>

                      <p className="mt-2 text-sm leading-6 text-white/58">
                        Üretim gücü ve memnuniyet odağı
                      </p>
                    </div>

                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#d8c7ad] ring-1 ring-white/12">
                      <FiLayers />
                    </span>
                  </div>

                  <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-white/12 bg-black/10">
                    <div className="flex min-h-[118px] flex-col items-center justify-center px-4 py-5 text-center">
                      <p className="text-4xl font-light leading-none tracking-[-0.06em] text-white">
                        1000+
                      </p>

                      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/48">
                        Proje
                      </p>
                    </div>

                    <div className="flex min-h-[118px] flex-col items-center justify-center border-l border-white/12 px-4 py-5 text-center">
                      <p className="text-5xl font-light leading-none tracking-[-0.06em] text-white">
                        ∞
                      </p>

                      <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.22em] text-white/48">
                        Müşteri Memnuniyeti
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/14">
                      <div className="h-full w-full bg-[#d8c7ad]" />
                    </div>

                    <span className="text-[10px] uppercase tracking-[0.26em] text-white/48">
                      Güven
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FILTER + PROJECTS */}
      <section className="relative bg-[#fff] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* FILTER */}
          <motion.div
            id={PROJECTS_FILTER_HASH}
            ref={filterRef}
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 scroll-mt-28 text-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-[#9b8364]">
              Proje Kapsamları
            </p>

            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-light tracking-[-0.045em] text-[#0f2535] md:text-5xl">
              Üretim ve uygulama alanlarımızı inceleyin.
            </h2>

            <div className="mx-auto mt-10 flex max-w-6xl justify-center gap-2 overflow-x-auto border-y border-[#ded6c8] py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tabs.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabClick(tab)}
                    className={`relative shrink-0 cursor-pointer rounded-md px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
                      isActive
                        ? "text-[#0f2535]"
                        : "text-[#0f2535]/54 hover:bg-[#e5e1d8] hover:text-[#0f2535]"
                    }`}
                  >
                    <span>{tab}</span>

                    <span
                      className={`absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-[#0f2535] transition-all duration-300 ${
                        isActive ? "w-[calc(100%-2.5rem)]" : "w-0"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* PROJECT GRID */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20"
            >
              {paginatedProjects.map((project, index) => {
                const status = statusStyles[project.status];
                const StatusIcon = status.icon;
                const projectNumber =
                  (currentPage - 1) * PROJECTS_PER_PAGE + index + 1;

                return (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.025,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group overflow-hidden rounded-xl bg-white shadow-[0_28px_90px_rgba(15,37,53,0.07)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_34px_110px_rgba(15,37,53,0.12)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image.src}
                        width={project.image.width}
                        height={project.image.height}
                        alt={project.name}
                        draggable={false}
                        loading={
                          index < 2 && currentPage === 1 ? "eager" : "lazy"
                        }
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      />

                      <div className="aryap-project-card-overlay absolute inset-0" />

                      <div className="absolute left-5 top-5 flex flex-wrap items-center gap-3">
                        <span
                          className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium ${status.className}`}
                        >
                          <StatusIcon className="text-sm" />
                          {project.status}
                        </span>

                        <span className="rounded-md bg-black/38 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>

                      <span className="absolute bottom-5 left-5 text-[11px] font-medium uppercase tracking-[0.32em] text-white/72">
                        {String(projectNumber).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="relative p-7 md:p-8">
                      <div className="mb-5">
                        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#9b8364]">
                          {project.company}
                        </p>
                      </div>

                      <h3 className="max-w-xl text-[1.65rem] font-light leading-[1.08] tracking-[-0.045em] text-[#0f2535] md:text-[2rem]">
                        {project.name}
                      </h3>

                      <div className="mt-5 h-px w-12 bg-[#9b8364] transition-all duration-500 group-hover:w-24" />

                      <div className="mt-5">
                        <p className="text-sm leading-7 text-[#4b5b66] md:text-[15px] md:leading-8">
                          {project.works}
                        </p>
                      </div>

                      <Link
                        href={`/projects/${project.id}`}
                        className="group/link mt-7 inline-flex w-fit items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[#0f2535]"
                      >
                        <span className="relative overflow-hidden pb-1">
                          <span className="block transition-transform duration-500 group-hover/link:-translate-y-full">
                            Projeyi İnceleyin
                          </span>

                          <span className="absolute left-0 top-full block transition-transform duration-500 group-hover/link:-translate-y-full">
                            Detaylara Git
                          </span>

                          <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0f2535] transition-transform duration-500 group-hover/link:scale-x-100" />
                        </span>

                        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#0f2535]/20 transition-all duration-500 group-hover/link:translate-x-1 group-hover/link:border-[#0f2535]">
                          <FiArrowUpRight className="text-xs transition-transform duration-500 group-hover/link:rotate-45" />
                        </span>
                      </Link>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* PAGINATION */}
          {shouldShowPagination && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-20 border-t border-[#ded6c8] pt-10"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-[#0f2535] ring-1 ring-[#ded6c8] transition-all duration-300 hover:bg-[#0f2535] hover:text-white disabled:pointer-events-none disabled:opacity-35"
                  >
                    <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => {
                      const page = index + 1;
                      const isActive = currentPage === page;

                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => goToPage(page)}
                          className={`h-10 min-w-10 cursor-pointer rounded-md px-3 text-sm font-medium transition-all duration-300 ${
                            isActive
                              ? "bg-[#0f2535] text-white"
                              : "text-[#0f2535]/55 hover:bg-[#e5e1d8] hover:text-[#0f2535]"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-[#0f2535] ring-1 ring-[#ded6c8] transition-all duration-300 hover:bg-[#0f2535] hover:text-white disabled:pointer-events-none disabled:opacity-35"
                  >
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="flex w-full max-w-sm items-center gap-4">
                  <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#4b5b66]">
                    {String(currentPage).padStart(2, "0")}
                  </span>

                  <div className="h-px flex-1 overflow-hidden bg-[#ded6c8]">
                    <div
                      className="h-full bg-[#0f2535] transition-all duration-500"
                      style={{
                        width: `${(currentPage / totalPages) * 100}%`,
                      }}
                    />
                  </div>

                  <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#4b5b66]">
                    {String(totalPages).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}