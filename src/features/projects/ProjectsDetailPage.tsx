"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiLayers,
  FiX,
} from "react-icons/fi";

import project1 from "@/assets/hero1.webp";
import project2 from "@/assets/hero2.webp";
import project3 from "@/assets/hero3.webp";
import project4 from "@/assets/hero4.webp";
import project5 from "@/assets/hero5.webp";
import project6 from "@/assets/hero6.webp";
import detailsBg from "@/assets/details.png";

const project7 = project1;
const project8 = project2;

type ProjectStatus = "Tamamlandı" | "Devam Ediyor" | "Teslim Sürecinde";

type ProjectItem = {
  id: number;
  name: string;
  company: string;
  category: string;
  status: ProjectStatus;
  image: StaticImageData;
  cover: StaticImageData;
  gallery: StaticImageData[];
  location: string;
  year: string;
  area: string;
  summary: string;
  longDescription: string;
  works: string;
  details: string[];
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
    cover: project1,
    gallery: [project1, project2, project3, project4],
    location: "Konya",
    year: "2025",
    area: "Yaşam Alanı",
    summary:
      "Modern villa yaşam alanı için özel ölçü mobilya, ahşap yüzey kaplama ve dekoratif üretim süreçleri yürütüldü.",
    longDescription:
      "Bu projede salon, giriş holü ve yaşam alanlarında sıcak, dengeli ve fonksiyonel bir iç mekân üretim süreci yürütüldü. Özel ölçü mobilyalar, duvar paneli uygulamaları, dekoratif ahşap yüzeyler ve mekânın genel karakterini güçlendiren tamamlayıcı detaylar birlikte ele alındı. Üretim sürecinde hem estetik bütünlük hem de uzun ömürlü kullanım hedeflendi.",
    works:
      "Salon, giriş holü ve yaşam alanlarında özel ölçü mobilya, duvar paneli, ahşap yüzey kaplama ve dekoratif tamamlayıcı üretimler yapıldı.",
    details: [
      "Özel ölçü TV ünitesi ve depolama alanları üretildi.",
      "Salon ve hol bölümünde ahşap duvar paneli uygulandı.",
      "Dekoratif yüzey kaplamaları projeye uygun şekilde hazırlandı.",
      "Mekânın genel malzeme diliyle uyumlu yüzey bitişleri yapıldı.",
    ],
  },
  {
    id: 2,
    name: "Özel Ölçü Mutfak Uygulaması",
    company: "Luna Residence",
    category: "Mutfak",
    status: "Devam Ediyor",
    image: project2,
    cover: project2,
    gallery: [project2, project5, project6, project1],
    location: "Konya",
    year: "2025",
    area: "Mutfak",
    summary:
      "Fonksiyonel depolama, sade yüzey dili ve özel ölçü üretim yaklaşımıyla hazırlanan mutfak projesi.",
    longDescription:
      "Mutfak alanında günlük kullanım konforunu artıracak dolap sistemleri, ada mutfak modülü, lake kapaklar, yüksek depolama çözümleri ve bütünleşik raf detayları planlandı. Proje, yoğun kullanıma uygun dayanıklı üretim anlayışıyla şekillendirildi.",
    works:
      "Ada mutfak modülü, yüksek dolap sistemleri, lake kapaklar, tezgâh altı depolama çözümleri ve bütünleşik raf detayları hazırlanıyor.",
    details: [
      "Ada mutfak modülü tasarlandı ve üretime alındı.",
      "Lake kapak ve yüksek dolap sistemleri hazırlandı.",
      "Tezgâh altı depolama çözümleri geliştirildi.",
      "Raf ve kapak detayları projeye göre düzenlendi.",
    ],
  },
  {
    id: 3,
    name: "Mermer Dokulu Banyo Ünitesi",
    company: "Nova Homes",
    category: "Banyo",
    status: "Tamamlandı",
    image: project3,
    cover: project3,
    gallery: [project3, project4, project8, project2],
    location: "Konya",
    year: "2024",
    area: "Banyo",
    summary:
      "Neme dayanıklı yüzeyler ve özel ölçü depolama çözümleriyle hazırlanan banyo mobilyası uygulaması.",
    longDescription:
      "Banyo projesinde lavabo altı dolap, uzun depolama modülleri, ayna çevresi ahşap detaylar ve neme dayanıklı yüzey kaplamaları uygulandı. Alanın sınırlı ölçüleri dikkate alınarak hem depolama kapasitesi artırıldı hem de temiz bir görünüm hedeflendi.",
    works:
      "Lavabo altı dolap, neme dayanıklı yüzey kaplama, ayna çevresi ahşap detaylar ve özel ölçü banyo depolama çözümleri uygulandı.",
    details: [
      "Lavabo altı özel ölçü dolap üretildi.",
      "Neme dayanıklı kapak ve yüzey malzemeleri kullanıldı.",
      "Ayna çevresi dekoratif ahşap detaylarla tamamlandı.",
      "Dar alan kullanımına uygun depolama çözümleri üretildi.",
    ],
  },
  {
    id: 4,
    name: "Masif Ahşap Kapı Serisi",
    company: "Kaya İnşaat",
    category: "Ahşap Kapı",
    status: "Teslim Sürecinde",
    image: project4,
    cover: project4,
    gallery: [project4, project1, project7, project5],
    location: "Konya",
    year: "2025",
    area: "Kapı & Pervaz",
    summary:
      "İç mekân geçişleri için özel ölçü masif yüzeyli kapı ve pervaz üretimi.",
    longDescription:
      "Proje kapsamında iç mekân kapıları için özel ölçü üretim süreci yürütüldü. Kapı yüzeyleri, pervaz detayları, boya uygulamaları ve montaj öncesi kalite kontrolleri tamamlandı. Amaç, yapının genel iç mekân diliyle uyumlu ve uzun ömürlü bir kapı serisi oluşturmaktı.",
    works:
      "İç mekân kapıları için özel ölçü ahşap yüzey, pervaz üretimi, boya uygulaması ve montaj öncesi son kalite kontrolleri tamamlandı.",
    details: [
      "Özel ölçü kapı kanatları üretildi.",
      "Pervaz ve tamamlayıcı geçiş elemanları hazırlandı.",
      "Boya ve yüzey koruma işlemleri uygulandı.",
      "Montaj öncesi kalite kontrol yapıldı.",
    ],
  },
  {
    id: 5,
    name: "Butik Otel Dekorasyon Projesi",
    company: "Mira Boutique Hotel",
    category: "Dekorasyon",
    status: "Devam Ediyor",
    image: project5,
    cover: project5,
    gallery: [project5, project3, project2, project6],
    location: "Kapadokya",
    year: "2025",
    area: "Otel Dekorasyonu",
    summary:
      "Butik otel atmosferini güçlendiren özel üretim oda başlıkları, çıta ve raf sistemleri.",
    longDescription:
      "Butik otel dekorasyon projesinde oda başlıkları, dekoratif duvar çıtaları, lobi tamamlayıcıları, ahşap raf sistemleri ve özel üretim mobilyalar planlandı. Proje, konaklama alanlarında sıcak, kaliteli ve karakterli bir atmosfer oluşturmak amacıyla tasarlandı.",
    works:
      "Oda başlıkları, dekoratif duvar çıtaları, lobi tamamlayıcıları, ahşap raf sistemleri ve özel üretim mobilyalar hazırlanıyor.",
    details: [
      "Oda başlığı ve dekoratif panel üretimleri hazırlandı.",
      "Lobi alanı için tamamlayıcı mobilyalar tasarlandı.",
      "Duvar çıtaları ve ahşap raf sistemleri üretildi.",
      "Otel konseptine uygun yüzey detayları geliştirildi.",
    ],
  },
  {
    id: 6,
    name: "Kurumsal Ofis Mobilyaları",
    company: "Arden Group",
    category: "İş Yerleri",
    status: "Tamamlandı",
    image: project6,
    cover: project6,
    gallery: [project6, project1, project4, project8],
    location: "Ankara",
    year: "2024",
    area: "Ofis",
    summary:
      "Kurumsal çalışma alanları için yönetici odası, toplantı masası ve depolama çözümleri.",
    longDescription:
      "Kurumsal ofis projesinde yönetici odası, toplantı masası, karşılama bankosu, çalışma alanları ve ofis içi depolama sistemleri üretildi. Firma kimliğine uygun sade, güçlü ve uzun ömürlü bir mobilya dili oluşturuldu.",
    works:
      "Yönetici odası, toplantı masası, karşılama bankosu, çalışma alanları ve ofis içi depolama çözümleri üretildi.",
    details: [
      "Yönetici odası mobilyaları üretildi.",
      "Toplantı masası ve karşılama bankosu hazırlandı.",
      "Çalışma alanlarına uygun depolama çözümleri geliştirildi.",
      "Kurumsal kimliğe uygun yüzey seçimleri yapıldı.",
    ],
  },
  {
    id: 7,
    name: "Sıcak Tonlu İç Mekân Kurgusu",
    company: "Eksen Mimarlık",
    category: "İç Mekan Tasarımı",
    status: "Tamamlandı",
    image: project7,
    cover: project7,
    gallery: [project7, project2, project4, project5],
    location: "Konya",
    year: "2024",
    area: "İç Mekân",
    summary:
      "Sıcak tonlu yüzeyler ve özel ölçü mobilyalarla bütünlüklü bir iç mekân kurgusu oluşturuldu.",
    longDescription:
      "Projede TV ünitesi, duvar paneli, gizli depolama alanları, raf sistemleri ve mekân bütünlüğünü destekleyen ahşap detaylar uygulandı. Sade çizgilerle sıcak malzeme etkisi bir araya getirilerek dengeli bir iç mekân dili oluşturuldu.",
    works:
      "TV ünitesi, duvar paneli, gizli depolama alanları, raf sistemleri ve mekân bütünlüğünü destekleyen ahşap detaylar uygulandı.",
    details: [
      "TV ünitesi ve raf sistemleri üretildi.",
      "Duvar paneli uygulaması yapıldı.",
      "Gizli depolama alanları planlandı.",
      "Sıcak tonlu yüzey bitişleri uygulandı.",
    ],
  },
  {
    id: 8,
    name: "Minimal Mutfak Yenileme",
    company: "Vera Loft",
    category: "Mutfak",
    status: "Teslim Sürecinde",
    image: project8,
    cover: project8,
    gallery: [project8, project1, project3, project6],
    location: "Konya",
    year: "2025",
    area: "Mutfak",
    summary:
      "Minimal çizgiler ve fonksiyonel depolama çözümleriyle yenilenen mutfak uygulaması.",
    longDescription:
      "Minimal mutfak yenileme projesinde mat yüzey mutfak kapakları, yüksek dolap düzeni, raf sistemi ve fonksiyonel depolama çözümleri teslim aşamasına getirildi. Proje, sade görünüm ve günlük kullanım kolaylığı üzerine kuruldu.",
    works:
      "Mat yüzey mutfak kapakları, yüksek dolap düzeni, raf sistemi ve fonksiyonel depolama çözümleri teslim aşamasına getirildi.",
    details: [
      "Mat yüzey kapaklar üretildi.",
      "Yüksek dolap sistemi planlandı.",
      "Raf düzeni oluşturuldu.",
      "Fonksiyonel depolama çözümleri uygulandı.",
    ],
  },
  {
    id: 9,
    name: "Ahşap Kaplama Ofis Duvarı",
    company: "Linea Office",
    category: "İş Yerleri",
    status: "Devam Ediyor",
    image: project1,
    cover: project1,
    gallery: [project1, project6, project5, project4],
    location: "Ankara",
    year: "2025",
    area: "Ofis",
    summary:
      "Kurumsal ofis alanında marka kimliğini destekleyen ahşap duvar kaplama çalışması.",
    longDescription:
      "Karşılama alanı, toplantı odası duvar kaplamaları, dekoratif raf sistemi ve marka kimliğine uygun ahşap yüzey çalışmaları devam ediyor. Projede kurumsal atmosferi güçlendiren sade ve kaliteli bir yüzey dili hedefleniyor.",
    works:
      "Karşılama alanı, toplantı odası duvar kaplamaları, dekoratif raf sistemi ve marka kimliğine uygun ahşap yüzey çalışmaları devam ediyor.",
    details: [
      "Karşılama alanı için ahşap yüzey çalışması yapıldı.",
      "Toplantı odası duvar kaplamaları planlandı.",
      "Dekoratif raf sistemi hazırlandı.",
      "Marka kimliğine uygun malzeme seçimi yapıldı.",
    ],
  },
  {
    id: 10,
    name: "Country Stil Mutfak Tasarımı",
    company: "Mavi Evler",
    category: "Mutfak",
    status: "Tamamlandı",
    image: project2,
    cover: project2,
    gallery: [project2, project8, project3, project1],
    location: "Konya",
    year: "2024",
    area: "Mutfak",
    summary:
      "Doğal tonlar ve country stil detaylarla hazırlanan özel ölçü mutfak tasarımı.",
    longDescription:
      "Country stil mutfak tasarımında profil kapaklar, ada tezgâhı, açık raf düzeni, dekoratif çıta detayları ve doğal tonlu yüzey bitişleri uygulandı. Proje, sıcak ve geleneksel bir mutfak atmosferi oluşturmak üzere tasarlandı.",
    works:
      "Profil kapaklar, ada tezgâhı, açık raf düzeni, dekoratif çıta detayları ve doğal tonlu yüzey bitişleri uygulandı.",
    details: [
      "Profil kapak üretimi yapıldı.",
      "Ada tezgâhı ve açık raf düzeni oluşturuldu.",
      "Dekoratif çıta detayları uygulandı.",
      "Doğal tonlu yüzey bitişleri tamamlandı.",
    ],
  },
  {
    id: 11,
    name: "Dekoratif Oturma Alanı",
    company: "Riva Homes",
    category: "Dekorasyon",
    status: "Teslim Sürecinde",
    image: project3,
    cover: project3,
    gallery: [project3, project5, project7, project4],
    location: "Konya",
    year: "2025",
    area: "Oturma Alanı",
    summary:
      "Oturma alanında niş uygulamaları ve dekoratif ahşap panellerle tamamlayıcı bir kurgu oluşturuldu.",
    longDescription:
      "Oturma alanında niş uygulamaları, ahşap raflar, TV duvarı tamamlayıcıları ve özel ölçü dekoratif paneller teslim aşamasına alındı. Proje, sade dekoratif detaylarla mekânın karakterini güçlendirmeyi hedefliyor.",
    works:
      "Oturma alanında niş uygulamaları, ahşap raflar, TV duvarı tamamlayıcıları ve özel ölçü dekoratif paneller teslim aşamasına alındı.",
    details: [
      "Niş uygulamaları planlandı.",
      "Ahşap raf sistemleri üretildi.",
      "TV duvarı tamamlayıcıları hazırlandı.",
      "Özel ölçü dekoratif paneller uygulandı.",
    ],
  },
  {
    id: 12,
    name: "Banyo Depolama Çözümü",
    company: "Zen Yapı",
    category: "Banyo",
    status: "Tamamlandı",
    image: project4,
    cover: project4,
    gallery: [project4, project3, project8, project6],
    location: "Konya",
    year: "2024",
    area: "Banyo",
    summary:
      "Banyo alanında uzun ömürlü kullanım için özel ölçü depolama ve yüzey çözümleri uygulandı.",
    longDescription:
      "Lavabo altı depolama, uzun kolon dolap, neme dayanıklı kapak yüzeyleri ve banyo içi tamamlayıcı mobilyalar üretildi. Projede dar alan kullanımını güçlendiren sade ve dayanıklı çözümler tercih edildi.",
    works:
      "Lavabo altı depolama, uzun kolon dolap, neme dayanıklı kapak yüzeyleri ve banyo içi tamamlayıcı mobilyalar üretildi.",
    details: [
      "Lavabo altı depolama alanı üretildi.",
      "Uzun kolon dolap tasarlandı.",
      "Neme dayanıklı kapak yüzeyleri uygulandı.",
      "Banyo içi tamamlayıcı mobilyalar hazırlandı.",
    ],
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

export default function ProjectDetailPage() {
  const params = useParams<{ projectId: string }>();

  const projectId = params.projectId;

  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const project = useMemo(() => {
    return projects.find((item) => String(item.id) === String(projectId));
  }, [projectId]);

  useEffect(() => {
    setActiveImage(0);
    setLightboxIndex(0);
    setIsLightboxOpen(false);
  }, [projectId]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isLightboxOpen]);

  useEffect(() => {
    if (!isLightboxOpen || !project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          const next = prev === project.gallery.length - 1 ? 0 : prev + 1;
          setActiveImage(next);
          return next;
        });
      }

      if (event.key === "ArrowLeft") {
        setLightboxIndex((prev) => {
          const next = prev === 0 ? project.gallery.length - 1 : prev - 1;
          setActiveImage(next);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, project]);

  if (!project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-6 text-[#0f2535]">
        <div className="max-w-xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.34em] text-[#9b8364]">
            Proje Bulunamadı
          </p>

          <h1 className="mt-5 text-4xl font-light tracking-[-0.05em] md:text-6xl">
            Aradığınız proje bulunamadı.
          </h1>

          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-[#0f2535]"
          >
            <FiArrowLeft />
            Projelere Dön
          </Link>
        </div>
      </main>
    );
  }

  const StatusIcon = statusStyles[project.status].icon;

  const nextImage = () => {
    setActiveImage((prev) =>
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setActiveImage((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setActiveImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const goToLightboxImage = (direction: "prev" | "next") => {
    setLightboxIndex((prev) => {
      const next =
        direction === "next"
          ? prev === project.gallery.length - 1
            ? 0
            : prev + 1
          : prev === 0
            ? project.gallery.length - 1
            : prev - 1;

      setActiveImage(next);
      return next;
    });
  };

  const selectLightboxImage = (index: number) => {
    setLightboxIndex(index);
    setActiveImage(index);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f5f0] text-[#0f2535]">
      <style jsx global>{`
        .aryap-project-detail-hero-gradient {
          background: linear-gradient(
            90deg,
            #0d0d0d 0%,
            rgba(13, 13, 13, 0.74) 46%,
            rgba(13, 13, 13, 0.22) 100%
          );
        }

        .aryap-project-detail-hero-grid {
          display: grid;
          gap: 3rem;
        }

        @media (min-width: 1024px) {
          .aryap-project-detail-hero-grid {
            grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
            align-items: end;
          }
        }

        .aryap-project-detail-gallery-grid {
          display: grid;
          gap: 3rem;
        }

        @media (min-width: 1024px) {
          .aryap-project-detail-gallery-grid {
            grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
            align-items: flex-start;
          }
        }

        .aryap-project-detail-image-overlay {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.36),
            rgba(0, 0, 0, 0.02) 52%
          );
        }

        .aryap-project-detail-bg-image {
          background-image: var(--project-detail-bg);
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          background-attachment: fixed;
        }

        @media (max-width: 1023px) {
          .aryap-project-detail-bg-image {
            background-attachment: scroll;
          }
        }

        .aryap-project-detail-bg-radial {
          background: linear-gradient(
            90deg,
            rgba(13, 13, 13, 0.78) 0%,
            rgba(13, 13, 13, 0.48) 50%,
            rgba(13, 13, 13, 0.7) 100%
          );
        }

        .aryap-project-detail-bg-bottom {
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.45),
            transparent
          );
        }

        .aryap-project-detail-work-grid {
          display: grid;
          gap: 3.5rem;
        }

        @media (min-width: 1024px) {
          .aryap-project-detail-work-grid {
            grid-template-columns: minmax(0, 0.78fr) minmax(0, 1.22fr);
            gap: 5rem;
          }
        }

        .aryap-project-detail-work-row {
          display: grid;
          gap: 1.25rem;
        }

        @media (min-width: 768px) {
          .aryap-project-detail-work-row {
            grid-template-columns: 72px minmax(0, 1fr);
            align-items: flex-start;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-6 pb-24 pt-40 text-white sm:px-8 lg:px-10 lg:pb-28 lg:pt-48">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={project.cover.src}
            width={project.cover.width}
            height={project.cover.height}
            alt=""
            draggable={false}
            loading="eager"
            decoding="async"
            className="h-full w-full object-cover opacity-40"
          />

          <div className="absolute inset-0 bg-[#0d0d0d]/50" />
          <div className="aryap-project-detail-hero-gradient absolute inset-0" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/projects"
            className="mb-10 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-white/58 transition-colors duration-300 hover:text-[#d8c7ad]"
          >
            <FiArrowLeft />
            Projelere Dön
          </Link>

          <div className="aryap-project-detail-hero-grid">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-medium ${
                    statusStyles[project.status].className
                  }`}
                >
                  <StatusIcon />
                  {project.status}
                </span>

                <span className="rounded-md bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-white/72 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              <h1 className="max-w-5xl text-5xl font-light leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
                {project.name}
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/72 md:text-lg">
                {project.summary}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.9,
                delay: 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden rounded-xl bg-white/[0.12] p-6 shadow-[0_28px_100px_rgba(0,0,0,0.28)] ring-1 ring-white/12 backdrop-blur-2xl"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#d8c7ad]">
                Proje Bilgileri
              </p>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/12">
                {[
                  ["Firma", project.company],
                  ["Lokasyon", project.location],
                  ["Yıl", project.year],
                  ["Alan", project.area],
                ].map(([label, value]) => (
                  <div key={label} className="bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">
                      {label}
                    </p>

                    <p className="mt-2 text-sm font-medium text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GALLERY + DESCRIPTION */}
      <section className="bg-[#f7f5f0] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="aryap-project-detail-gallery-grid">
            <motion.div
              initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative overflow-hidden rounded-xl bg-[#0d0d0d] shadow-[0_28px_90px_rgba(15,37,53,0.14)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={project.gallery[activeImage].src}
                      width={project.gallery[activeImage].width}
                      height={project.gallery[activeImage].height}
                      alt={`${project.name} görsel ${activeImage + 1}`}
                      draggable={false}
                      onClick={() => openLightbox(activeImage)}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full w-full cursor-zoom-in object-cover"
                    />
                  </AnimatePresence>

                  <div className="aryap-project-detail-image-overlay pointer-events-none absolute inset-0" />

                  <div className="absolute bottom-5 left-5 text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">
                    {String(activeImage + 1).padStart(2, "0")} /{" "}
                    {String(project.gallery.length).padStart(2, "0")}
                  </div>

                  <div className="absolute bottom-5 right-5 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={prevImage}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-white/90 text-[#0f2535] transition-all duration-300 hover:bg-[#0f2535] hover:text-white"
                    >
                      <FiArrowLeft />
                    </button>

                    <button
                      type="button"
                      onClick={nextImage}
                      className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md bg-white/90 text-[#0f2535] transition-all duration-300 hover:bg-[#0f2535] hover:text-white"
                    >
                      <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-3">
                {project.gallery.map((image, index) => {
                  const isActive = activeImage === index;

                  return (
                    <button
                      key={`${project.id}-${index}`}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      onDoubleClick={() => openLightbox(index)}
                      className={`relative aspect-[16/10] cursor-pointer overflow-hidden rounded-md transition-all duration-300 ${
                        isActive
                          ? "ring-2 ring-[#0f2535] ring-offset-2 ring-offset-[#f7f5f0]"
                          : "opacity-65 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.src}
                        width={image.width}
                        height={image.height}
                        alt=""
                        draggable={false}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-xl bg-white p-7 shadow-[0_24px_80px_rgba(15,37,53,0.07)] md:p-8"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#9b8364]">
                Proje Açıklaması
              </p>

              <h2 className="mt-5 text-3xl font-light leading-[1.06] tracking-[-0.045em] text-[#0f2535] md:text-4xl">
                Tasarım, üretim ve uygulama süreci.
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#4b5b66] md:text-[15px] md:leading-8">
                {project.longDescription}
              </p>

              <div className="mt-8 h-px w-full bg-[#e5ded4]" />

              <div className="mt-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0f2535]/42">
                  Kısa Kapsam
                </p>

                <p className="mt-4 text-sm leading-7 text-[#4b5b66] md:text-[15px] md:leading-8">
                  {project.works}
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/92 px-4 py-6 text-white backdrop-blur-md sm:px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0f2535] md:right-8 md:top-8"
            >
              <FiX className="text-xl" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToLightboxImage("prev");
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0f2535] md:left-8 md:h-14 md:w-14"
            >
              <FiArrowLeft className="text-xl" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                goToLightboxImage("next");
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-md border border-white/15 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-[#0f2535] md:right-8 md:h-14 md:w-14"
            >
              <FiArrowRight className="text-xl" />
            </button>

            <motion.div
              className="relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={lightboxIndex}
                    src={project.gallery[lightboxIndex].src}
                    width={project.gallery[lightboxIndex].width}
                    height={project.gallery[lightboxIndex].height}
                    alt={`${project.name} büyük görsel ${lightboxIndex + 1}`}
                    draggable={false}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="max-h-[76vh] max-w-full rounded-lg object-contain shadow-[0_35px_120px_rgba(0,0,0,0.45)]"
                  />
                </AnimatePresence>
              </div>

              <div className="mt-6 flex w-full max-w-4xl flex-col items-center gap-5">
                <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.28em] text-white/50">
                  <span>{String(lightboxIndex + 1).padStart(2, "0")}</span>
                  <span className="h-px w-16 bg-white/20" />
                  <span>{String(project.gallery.length).padStart(2, "0")}</span>
                </div>

                <div className="flex max-w-full gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {project.gallery.map((image, index) => {
                    const isActive = lightboxIndex === index;

                    return (
                      <button
                        key={`lightbox-${project.id}-${index}`}
                        type="button"
                        onClick={() => selectLightboxImage(index)}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md transition-all duration-300 md:h-20 md:w-32 ${
                          isActive
                            ? "opacity-100 ring-2 ring-[#d8c7ad]"
                            : "opacity-45 hover:opacity-90"
                        }`}
                      >
                        <img
                          src={image.src}
                          width={image.width}
                          height={image.height}
                          alt=""
                          draggable={false}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILS */}
      <section className="relative overflow-hidden bg-[#0d0d0d] px-6 py-20 text-white sm:px-8 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="aryap-project-detail-bg-image absolute inset-0 opacity-[0.26]"
            style={
              {
                "--project-detail-bg": `url(${detailsBg.src})`,
              } as CSSProperties
            }
          />

          <div className="absolute inset-0 bg-[#0d0d0d]/54" />
          <div className="aryap-project-detail-bg-radial absolute inset-0" />
          <div className="aryap-project-detail-bg-bottom absolute inset-0" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="aryap-project-detail-work-grid">
            <motion.div
              initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-28 lg:h-fit"
            >
              <span className="mb-6 inline-flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.34em] text-[#d8c7ad]">
                <span className="h-px w-12 bg-[#d8c7ad]" />
                Yapılan İşler
              </span>

              <h2 className="max-w-xl text-4xl font-light leading-[1.04] tracking-[-0.055em] text-white md:text-6xl">
                Projenin üretim kapsamı.
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-white/62 md:text-[15px] md:leading-8">
                Proje kapsamında yapılan uygulamalar; ölçü, malzeme, üretim ve
                montaj süreçleri dikkate alınarak bütünlüklü bir yaklaşımla ele
                alındı.
              </p>

              <div className="mt-10 grid max-w-md grid-cols-2 border-y border-white/14">
                <div className="py-5 pr-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#d8c7ad]">
                    Alan
                  </p>

                  <p className="mt-3 text-lg font-light tracking-[-0.035em] text-white/88">
                    {project.area}
                  </p>
                </div>

                <div className="border-l border-white/14 py-5 pl-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#d8c7ad]">
                    Yıl
                  </p>

                  <p className="mt-3 text-lg font-light tracking-[-0.035em] text-white/88">
                    {project.year}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{
                duration: 0.75,
                delay: 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="border-t border-white/16">
                {project.details.map((detail) => (
                  <motion.div
                    key={detail}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group relative border-b border-white/16 py-7 md:py-8"
                  >
                    <div className="aryap-project-detail-work-row">
                      <div className="pt-3">
                        <span className="block h-px w-10 bg-[#d8c7ad]/60 transition-all duration-500 group-hover:w-14 group-hover:bg-[#d8c7ad]" />
                      </div>

                      <p className="max-w-3xl text-base font-light leading-8 text-white/78 transition-colors duration-500 group-hover:text-white md:text-lg md:leading-9">
                        {detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-white/14" />

                <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/38">
                  Aryap Üretim
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f5f0] px-6 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl border-t border-[#ded6c8] pt-12">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-[#9b8364]">
                Diğer Projeler
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-light leading-[1.06] tracking-[-0.05em] text-[#0f2535] md:text-6xl">
                Diğer üretim çalışmalarını inceleyin.
              </h2>
            </div>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] text-[#0f2535]"
            >
              <span className="relative overflow-hidden pb-1">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full">
                  Projelere Dön
                </span>

                <span className="absolute left-0 top-full block transition-transform duration-500 group-hover:-translate-y-full">
                  Tümünü Gör
                </span>

                <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0f2535] transition-transform duration-500 group-hover:scale-x-100" />
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-[#0f2535]/20 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#0f2535]">
                <FiArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}