import NextImage, { type StaticImageData } from "next/image";
import React, { memo } from "react";

import partner1 from "@/assets/partner1.svg";
import partner2 from "@/assets/partner2.png";
import partner3 from "@/assets/partner3.png";
import partner4 from "@/assets/partner4.png";
import partner5 from "@/assets/partner5.png";
import partner6 from "@/assets/partner6.jpg";
import partner7 from "@/assets/partner7.png";
import partner8 from "@/assets/partner8.png";
import partner9 from "@/assets/partner9.svg";
import partner10 from "@/assets/partner10.png";
import partner11 from "@/assets/partner11.jpg";
import partner12 from "@/assets/partner12.svg";

type PartnerLogo = {
  image: StaticImageData | string;
  alt: string;
};

const partners: PartnerLogo[] = [
  { image: partner1, alt: "Partner 1" },
  { image: partner2, alt: "Partner 2" },
  { image: partner3, alt: "Partner 3" },
  { image: partner4, alt: "Partner 4" },
  { image: partner5, alt: "Partner 5" },
  { image: partner6, alt: "Partner 6" },
  { image: partner7, alt: "Partner 7" },
  { image: partner8, alt: "Partner 8" },
  { image: partner9, alt: "Partner 9" },
  { image: partner10, alt: "Partner 10" },
  { image: partner11, alt: "Partner 11" },
  { image: partner12, alt: "Partner 12" },
];

const marqueePartners = [...partners, ...partners];

const Partners = () => {
  return (
    <section className="relative overflow-hidden bg-[#fff] py-24 text-[#0f2535]">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="mb-5 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-[#9b8364]">
              <span className="h-px w-10 bg-[#9b8364]" />
              Referanslarımız
            </span>

            <h2 className="max-w-3xl text-4xl font-light leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Güçlü iş birlikleriyle daha rafine çözümler.
            </h2>
          </div>

          <p className="max-w-md text-base leading-8 text-[#5c6a73]">
            Tasarım, üretim ve uygulama süreçlerinde kaliteyi destekleyen seçili
            markalarla birlikte çalışıyoruz.
          </p>
        </div>

        <div className="relative overflow-hidden border-y border-[#fff]/55 py-8">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[#fff] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[#fff] to-transparent" />

          <div className="partner-marquee flex w-max items-center gap-14 will-change-transform">
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.alt}-${index}`}
                className="group flex h-28 w-44 shrink-0 cursor-pointer items-center justify-center"
              >
                <div className="relative h-16 w-[150px]">
                  <NextImage
                    src={partner.image}
                    alt={partner.alt}
                    fill
                    sizes="150px"
                    quality={78}
                    className="object-contain grayscale opacity-45 transition-all duration-500 group-hover:-translate-y-1 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes partnerMarquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .partner-marquee {
            animation: partnerMarquee 22s linear infinite;
          }

          .partner-marquee:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .partner-marquee {
              animation: none !important;
              transform: translateX(0) !important;
            }
          }
        `}
      </style>
    </section>
  );
};

export default memo(Partners);