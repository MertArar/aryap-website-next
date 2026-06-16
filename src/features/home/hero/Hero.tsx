"use client";

import NextImage, { type StaticImageData } from "next/image";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type SyntheticEvent,
} from "react";
import { FiPause, FiPlay, FiArrowUpRight } from "react-icons/fi";

import hero1 from "@/assets/hero1.webp";
import hero2 from "@/assets/hero2.webp";
import hero3 from "@/assets/hero3.webp";
import hero4 from "@/assets/hero4.webp";
import hero5 from "@/assets/hero5.webp";
import hero7 from "@/assets/hero7.webp";

const SLIDE_DURATION = 10000;
const CROSSFADE_DURATION = 850;

type HeroSlide = {
  image: StaticImageData;
  label: string;
  title: string;
  text: string;
  darkHeader: boolean;
};

type HeroHeaderChangeDetail = {
  darkHeader: boolean;
};

type WindowWithIdleCallback = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout?: number }
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

const slides: HeroSlide[] = [
  {
    image: hero1,
    label: "Interior Studio",
    title: "Yaşam alanlarını sade bir zarafetle yeniden tasarlıyoruz.",
    text: "Dekorasyon, iç mimari ve uygulama süreçlerinde mekânınıza uyum sağlayan modern çözümler sunuyoruz.",
    darkHeader: false,
  },
  {
    image: hero2,
    label: "Living Spaces",
    title: "Evinizin atmosferini daha dengeli ve şık hale getirin.",
    text: "Renk, ışık, doku ve mobilya seçimlerini bütüncül bir tasarım yaklaşımıyla bir araya getiriyoruz.",
    darkHeader: false,
  },
  {
    image: hero3,
    label: "Elegant Details",
    title: "Her detay, mekânın karakterini tamamlayan güçlü bir parçadır.",
    text: "Sade ama etkileyici dokunuşlarla yaşam alanlarınıza estetik, konfor ve bütünlük katıyoruz.",
    darkHeader: true,
  },
  {
    image: hero4,
    label: "Custom Projects",
    title: "Size özel dekorasyon projeleriyle özgün alanlar oluşturuyoruz.",
    text: "Konut, ofis ve ticari alanlar için ihtiyaca ve stile uygun profesyonel tasarım çözümleri hazırlıyoruz.",
    darkHeader: false,
  },
  {
    image: hero5,
    label: "Modern Touch",
    title: "Modern çizgilerle sıcak ve davetkâr mekânlar tasarlıyoruz.",
    text: "Fonksiyonel, estetik ve uzun ömürlü tasarım kararlarıyla mekânlarınıza yeni bir kimlik kazandırıyoruz.",
    darkHeader: false,
  },
  {
    image: hero7,
    label: "Modern Touch",
    title: "Modern çizgilerle sıcak ve davetkâr mekânlar tasarlıyoruz.",
    text: "Fonksiyonel, estetik ve uzun ömürlü tasarım kararlarıyla mekânlarınıza yeni bir kimlik kazandırıyoruz.",
    darkHeader: true,
  },
];

const getImageSrc = (image: StaticImageData) => image.src;

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [previousFading, setPreviousFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(true);

  const startTimeRef = useRef(Date.now());
  const pausedProgressRef = useRef(0);
  const scrollFrameRef = useRef<number | null>(null);
  const loadedImagesRef = useRef<Set<string>>(
    new Set([getImageSrc(slides[0].image)])
  );
  const activeImageRef = useRef<string>(getImageSrc(slides[0].image));

  const currentSlide = slides[activeIndex];
  const previousSlide =
    previousIndex !== null ? slides[previousIndex] : null;

  const currentImageSrc = getImageSrc(currentSlide.image);

  useEffect(() => {
    const event = new CustomEvent<HeroHeaderChangeDetail>("heroHeaderChange", {
      detail: {
        darkHeader: currentSlide.darkHeader,
      },
    });

    window.dispatchEvent(event);
  }, [currentSlide.darkHeader]);

  useEffect(() => {
    activeImageRef.current = currentImageSrc;
    setImageLoaded(loadedImagesRef.current.has(currentImageSrc));
  }, [currentImageSrc]);

  useEffect(() => {
    if (previousIndex === null || !imageLoaded) return;

    setPreviousFading(false);

    const animationFrame = window.requestAnimationFrame(() => {
      setPreviousFading(true);
    });

    const timer = window.setTimeout(() => {
      setPreviousIndex(null);
      setPreviousFading(false);
    }, CROSSFADE_DURATION + 80);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(timer);
    };
  }, [previousIndex, imageLoaded, activeIndex]);

  useEffect(() => {
    let firstTimer: ReturnType<typeof setTimeout> | null = null;
    let restTimer: ReturnType<typeof setTimeout> | null = null;
    let idleHandle: number | null = null;
    let cancelled = false;

    const preloadImage = (image: StaticImageData) => {
      const src = getImageSrc(image);

      if (!src || loadedImagesRef.current.has(src)) return;

      const img = new window.Image();
      img.decoding = "async";

      img.onload = async () => {
        try {
          await img.decode();
        } catch {
          // decode desteklenmezse görsel yine normal şekilde yüklenir
        }

        if (cancelled) return;

        loadedImagesRef.current.add(src);

        if (activeImageRef.current === src) {
          setImageLoaded(true);
        }
      };

      img.src = src;
    };

    firstTimer = setTimeout(() => {
      preloadImage(slides[1].image);
    }, 300);

    restTimer = setTimeout(() => {
      const preloadRest = () => {
        slides.forEach((slide, index) => {
          if (index !== 0 && index !== 1) {
            preloadImage(slide.image);
          }
        });
      };

      const idleWindow = window as WindowWithIdleCallback;

      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(preloadRest, {
          timeout: 2500,
        });
      } else {
        preloadRest();
      }
    }, 1200);

    return () => {
      cancelled = true;

      if (firstTimer) clearTimeout(firstTimer);
      if (restTimer) clearTimeout(restTimer);

      const idleWindow = window as WindowWithIdleCallback;

      if (idleHandle && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollFrameRef.current) return;

      scrollFrameRef.current = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        scrollFrameRef.current = null;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  const activateSlide = useCallback(
    (nextIndex: number) => {
      if (nextIndex === activeIndex) return;

      const nextImageSrc = getImageSrc(slides[nextIndex].image);

      setPreviousIndex(activeIndex);
      setPreviousFading(false);

      activeImageRef.current = nextImageSrc;
      setImageLoaded(loadedImagesRef.current.has(nextImageSrc));
      setActiveIndex(nextIndex);
      setProgress(0);

      pausedProgressRef.current = 0;
      startTimeRef.current = Date.now();
    },
    [activeIndex]
  );

  useEffect(() => {
    if (!isPlaying) return;

    startTimeRef.current =
      Date.now() - (pausedProgressRef.current / 100) * SLIDE_DURATION;

    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const nextProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

      setProgress(nextProgress);
      pausedProgressRef.current = nextProgress;

      if (elapsed >= SLIDE_DURATION) {
        const nextIndex = (activeIndex + 1) % slides.length;

        activateSlide(nextIndex);
      }
    }, 100);

    return () => {
      window.clearInterval(interval);
    };
  }, [activeIndex, activateSlide, isPlaying]);

  const handleImageLoad = useCallback(
    async (
      event: SyntheticEvent<HTMLImageElement, Event>,
      imageSrc: string
    ) => {
      try {
        await event.currentTarget.decode();
      } catch {
        // decode hata verirse görsel yine gösterilir
      }

      loadedImagesRef.current.add(imageSrc);

      if (activeImageRef.current !== imageSrc) return;

      setImageLoaded(true);
    },
    []
  );

  const goToSlide = useCallback(
    (index: number) => {
      activateSlide(index);
    },
    [activateSlide]
  );

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const {
    heroScale,
    heroOpacity,
    contentTranslate,
    controlsTranslate,
    frameOpacity,
    frameScale,
    frameBorderColor,
    bottomFadeOpacity,
    contentOpacity,
    controlsOpacity,
  } = useMemo(() => {
    const scrollAmount = Math.min(scrollY, 900);

    return {
      heroScale: 1 - scrollAmount / 9000,
      heroOpacity: 1 - scrollAmount / 1800,
      contentTranslate: scrollAmount / 3.8,
      controlsTranslate: scrollAmount / 5,
      frameOpacity: Math.min(scrollY / 1200, 0.16),
      frameScale: 1 - Math.min(scrollY / 4000, 0.08),
      bottomFadeOpacity: Math.min(scrollY / 650, 1),
      contentOpacity: 1 - Math.min(scrollY / 1100, 0.55),
      controlsOpacity: 1 - Math.min(scrollY / 700, 0.85),
      frameBorderColor: `rgba(255,255,255,${Math.min(scrollY / 1200, 0.16)})`,
    };
  }, [scrollY]);

  const currentImageAnimationStyle: CSSProperties = {
    animation: imageLoaded ? "heroImageZoom 16000ms linear forwards" : "none",
    animationPlayState: isPlaying ? "running" : "paused",
  };

  const previousImageAnimationStyle: CSSProperties = {
    animationPlayState: isPlaying ? "running" : "paused",
  };

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden bg-black">
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `scale(${heroScale})`,
          opacity: heroOpacity,
        }}
      >
        {previousSlide && (
          <div
            className={`absolute inset-0 transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              previousFading ? "opacity-0" : "opacity-100"
            }`}
          >
            <NextImage
              src={previousSlide.image}
              alt=""
              fill
              quality={82}
              sizes="100vw"
              draggable={false}
              aria-hidden="true"
              className="object-cover transform-gpu"
              style={previousImageAnimationStyle}
            />
          </div>
        )}

        <div
          key={`slide-${activeIndex}`}
          className={`absolute inset-0 transition-opacity duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <NextImage
            src={currentSlide.image}
            alt={`Hero slide ${activeIndex + 1}`}
            fill
            priority={activeIndex === 0}
            quality={85}
            sizes="100vw"
            draggable={false}
            placeholder="blur"
            onLoad={(event) => handleImageLoad(event, currentImageSrc)}
            className="object-cover transform-gpu"
            style={currentImageAnimationStyle}
          />
        </div>

        <div
          className={`absolute inset-0 bg-black transition-opacity duration-500 ${
            imageLoaded || previousSlide ? "opacity-0" : "opacity-100"
          }`}
        />

        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-black/0 to-black/35"
        style={{
          opacity: bottomFadeOpacity,
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[72vh] w-[72vw] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] border border-white/0 transition-colors duration-300"
        style={{
          borderColor: frameBorderColor,
          opacity: frameOpacity > 0 ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${frameScale})`,
        }}
      />

      <div
        className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-5 sm:px-8 lg:px-12"
        style={{
          transform: `translateY(-${contentTranslate}px)`,
          opacity: contentOpacity,
        }}
      >
        <div className="max-w-4xl pt-20">
          <div
            key={`label-${activeIndex}`}
            className="mb-7 flex animate-[heroText_.8s_ease_both] items-center gap-4"
          >
            <span className="h-px w-14 bg-white/50" />
            <span className="text-xs font-semibold uppercase tracking-[0.45em] text-white/70">
              {currentSlide.label}
            </span>
          </div>

          <h1
            key={`title-${activeIndex}`}
            className="max-w-5xl animate-[heroText_.95s_ease_both] text-4xl font-semibold leading-[1.03] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {currentSlide.title}
          </h1>

          <p
            key={`text-${activeIndex}`}
            className="mt-7 max-w-2xl animate-[heroText_1.1s_ease_both] text-base leading-8 text-white/80 sm:text-lg"
          >
            {currentSlide.text}
          </p>

          <div
            key={`cta-${activeIndex}`}
            className="mt-10 flex animate-[heroText_1.25s_ease_both] flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/projects"
              className="group inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/85"
            >
              Projeleri İncele
              <FiArrowUpRight className="ml-3 text-lg transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-full bg-white/10 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
            >
              İletişime Geç
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 right-28 z-20 flex items-center gap-8 sm:right-36 lg:right-48 xl:right-56"
        style={{
          transform: `translateY(${controlsTranslate}px)`,
          opacity: controlsOpacity,
        }}
      >
        <div className="flex items-center gap-3">
          {slides.map((_, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                className={`relative h-3 cursor-pointer overflow-hidden rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-16 bg-white/25"
                    : "w-3 bg-white/45 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {isActive && (
                  <span
                    className="absolute left-0 top-0 h-full cursor-pointer rounded-full bg-white transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="relative flex h-12 w-12 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
          aria-label={isPlaying ? "Pause slider" : "Play slider"}
        >
          <span
            className={`absolute transition-all duration-300 ${
              isPlaying
                ? "scale-100 rotate-0 opacity-100"
                : "scale-50 -rotate-90 opacity-0"
            }`}
          >
            <FiPause className="text-xl" />
          </span>

          <span
            className={`absolute transition-all duration-300 ${
              isPlaying
                ? "scale-50 rotate-90 opacity-0"
                : "scale-100 rotate-0 opacity-100"
            }`}
          >
            <FiPlay className="ml-0.5 text-xl" />
          </span>
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes heroText {
              from {
                opacity: 0;
                transform: translateY(28px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes heroImageZoom {
              from {
                transform: scale(1);
              }
              to {
                transform: scale(1.045);
              }
            }
          `,
        }}
      />
    </section>
  );
}

export default Hero;