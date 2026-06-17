"use client";

import Link from "next/link";
import React, { memo, useEffect, useState, type ReactNode } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

type MapLink = {
  name: string;
  href: string;
};

type InfoItemProps = {
  title: string;
  value: string;
};

type InputProps = {
  label: string;
  placeholder: string;
  type?: string;
};

type AnimatedTextLinkProps = {
  href: string;
  children: ReactNode;
};

const mapLinks: MapLink[] = [
  {
    name: "Google Maps",
    href: "https://www.google.com/maps/place/Aryap+Ah%C5%9Fap+%26+Dekorasyon/@37.9286502,32.5534841,17z/data=!3m1!4b1!4m6!3m5!1s0x14d09110bf2910ed:0x76a96a20905a5717!8m2!3d37.9286502!4d32.556059!16s%2Fg%2F11vsvsj9zn?entry=ttu&g_ep=EgoyMDI2MDQyOS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Yandex Maps",
    href: "https://yandex.com.tr/maps/org/aryap_ahsap_dekorasyon/135181495560/?ll=32.555718%2C37.928474&mode=search&sctx=ZAAAAAgAEAAaKAoSCTHuBtFa7FFAEQndJXFWfkRAEhIJyuGTTiSYmj8ROZz51RwgiD8iBgABAgMEBSgKOABAwqYBSAFqAnRynQHNzMw9oAEAqAEAvQEFBpmJwgEBAIICIGHFn2thbiBtYWhhbGxlc2kgc2FuY2FrdGFyIHNva2FrigIAkgIAmgIMZGVza3RvcC1tYXBz&sll=32.456787%2C37.866102&sspn=0.005771%2C0.002739&text=a%C5%9Fkan%20mahallesi%20sancaktar%20sokak&utm_source=share&z=17.14",
  },
  {
    name: "Apple Maps",
    href: "https://maps.apple.com/place?place-id=IA591477556DE2978&address=Milenyum+Cd.+71%2C+42210+Karatay+Konya%2C+T%C3%BCrkiye&coordinate=37.928582%2C32.555918&name=Aryap+Ah%C5%9Fap+Dekorasyon&_provider=9902",
  },
];

const fadeUpTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

const fadeUpDelayedTransition: Transition = {
  duration: 0.6,
  delay: 0.1,
  ease: [0.22, 1, 0.36, 1],
};

const mapEmbedSrc =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.0762024188025!2d32.556059!3d37.9286502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d09110bf2910ed%3A0x76a96a20905a5717!2sAryap%20Ah%C5%9Fap%20%26%20Dekorasyon!5e0!3m2!1str!2str!4v1777909158037!5m2!1str!2str";

const AnimatedTextLink = memo(({ href, children }: AnimatedTextLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium tracking-[-0.02em] text-[#0f2535] sm:text-base"
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-500 ease-out group-hover:-translate-y-full">
          {children}
        </span>
      </span>

      <FiArrowUpRight className="text-sm opacity-45 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a>
  );
});

AnimatedTextLink.displayName = "AnimatedTextLink";

const InfoItem = memo(({ title, value }: InfoItemProps) => {
  return (
    <div className="group">
      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#0f2535]/45">
        {title}
      </p>

      <div className="inline-block">
        <p className="text-lg font-medium tracking-[-0.02em] transition-transform duration-300 group-hover:translate-x-1 sm:text-xl">
          {value}
        </p>

        <div className="mt-2 h-px w-0 bg-[#0f2535] transition-all duration-500 group-hover:w-full" />
      </div>
    </div>
  );
});

InfoItem.displayName = "InfoItem";

const Input = memo(({ label, placeholder, type = "text" }: InputProps) => {
  return (
    <div>
      <label className="mb-3 block text-xs uppercase tracking-[0.25em] text-[#0f2535]/50">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-b border-[#0f2535]/20 bg-transparent py-4 text-[#0f2535] outline-none transition-all placeholder:text-[#0f2535]/30 focus:border-[#0f2535]"
      />
    </div>
  );
});

Input.displayName = "Input";

const ContactPage = () => {
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : fadeUpTransition;

  const motionDelayedTransition = shouldReduceMotion
    ? { duration: 0 }
    : fadeUpDelayedTransition;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("heroHeaderChange", {
        detail: { darkHeader: true },
      })
    );

    return () => {
      window.dispatchEvent(
        new CustomEvent("heroHeaderChange", {
          detail: { darkHeader: false },
        })
      );
    };
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-[#FAFDFF] text-[#0f2535]">
        <section className="mx-auto max-w-7xl px-6 pb-16 pt-32 sm:px-10">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTransition}
            className="max-w-3xl"
          >
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#0f2535]/50">
              İletişim
            </p>

            <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Projeniz için <br /> ilk adımı atalım.
            </h1>
          </m.div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
          <div className="relative grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="absolute bottom-2 left-[41.666%] top-2 hidden w-px bg-gradient-to-b from-transparent via-[#0f2535]/15 to-transparent lg:block" />

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={motionTransition}
              className="lg:col-span-5 lg:pr-10"
            >
              <div className="mb-12">
                <p className="text-md mb-4 uppercase tracking-[0.3em] text-[#0f2535]/45">
                  İletişim Bilgileri
                </p>
              </div>

              <div className="space-y-10">
                <InfoItem
                  title="Adres"
                  value="Fevzi Çakmak Mah. Milenyum Cad. ASPAK Sanayi Sitesi. D:2, No:73. Karatay / Konya"
                />

                <InfoItem title="Telefon" value="+90 532 671 13 18" />

                <InfoItem title="E-posta" value="info@aryap.com" />

                <div>
                  <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#0f2535]/45">
                    Yol Tarifi Al
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    {mapLinks.map((item) => (
                      <AnimatedTextLink key={item.name} href={item.href}>
                        {item.name}
                      </AnimatedTextLink>
                    ))}
                  </div>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={motionDelayedTransition}
              className="lg:col-span-7 lg:pl-6"
            >
              <form className="space-y-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                  <Input label="Ad Soyad" placeholder="Adınız" />
                  <Input label="Telefon" placeholder="+90" type="tel" />
                  <Input
                    label="E-posta"
                    placeholder="mail@adresiniz.com"
                    type="email"
                  />
                  <Input label="Konu" placeholder="Proje / Teklif" />
                </div>

                <div>
                  <label className="mb-4 block text-xs uppercase tracking-[0.25em] text-[#0f2535]/50">
                    Mesajınız
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Projenizden kısaca bahsedin..."
                    className="w-full border-b border-[#0f2535]/20 bg-transparent py-4 text-[#0f2535] outline-none transition-all placeholder:text-[#0f2535]/30 focus:border-[#0f2535]"
                  />
                </div>

                <div className="flex flex-col gap-7 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <label className="group flex max-w-[470px] cursor-pointer select-none items-center gap-3">
                    <input
                      type="checkbox"
                      checked={kvkkAccepted}
                      onChange={() => setKvkkAccepted((current) => !current)}
                      className="sr-only"
                    />

                    <span
                      className={`relative flex h-[18px] w-[18px] shrink-0 items-center justify-center border transition-all duration-300 ${
                        kvkkAccepted
                          ? "border-[#0f2535] bg-[#0f2535]"
                          : "border-[#0f2535]/45 bg-[#FAFDFF] group-hover:border-[#0f2535]"
                      }`}
                    >
                      <span
                        className={`absolute left-[5px] top-[2px] h-[10px] w-[6px] rotate-45 border-b-2 border-r-2 border-white transition-all duration-300 ease-out ${
                          kvkkAccepted
                            ? "scale-100 opacity-100"
                            : "scale-50 opacity-0"
                        }`}
                      />
                    </span>

                    <span className="text-xs leading-5 text-[#0f2535]/60 sm:text-[13px]">
                      {!kvkkAccepted ? (
                        "Gizlilik Metni"
                      ) : (
                        <>
                          <Link
                            href="/kvkk"
                            onClick={(event) => event.stopPropagation()}
                            className="text-[#8B5E3C] transition-colors duration-300 hover:text-[#0f2535]"
                          >
                            Kişisel verilerin gizliliğini aydınlatma metnini
                          </Link>
                          <br className="hidden sm:block" />
                          okudum onaylıyorum.
                        </>
                      )}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!kvkkAccepted}
                    className={`group relative inline-flex items-center justify-end gap-4 pb-3 text-xs uppercase tracking-[0.24em] transition-all duration-300 ${
                      kvkkAccepted
                        ? "cursor-pointer text-[#0f2535]"
                        : "cursor-not-allowed text-[#0f2535]/30"
                    }`}
                  >
                    <span className="relative overflow-hidden">
                      <span
                        className={`block transition-transform duration-500 ease-out ${
                          kvkkAccepted ? "group-hover:-translate-y-full" : ""
                        }`}
                      >
                        Mesaj Gönder
                      </span>

                      <span
                        className={`absolute left-0 top-full block transition-transform duration-500 ease-out ${
                          kvkkAccepted ? "group-hover:-translate-y-full" : ""
                        }`}
                      >
                        Gönder
                      </span>
                    </span>

                    <span className="relative flex items-center">
                      <span
                        className={`h-px w-10 transition-all duration-500 ${
                          kvkkAccepted
                            ? "bg-[#0f2535]/35 group-hover:w-16 group-hover:bg-[#0f2535]"
                            : "bg-[#0f2535]/15"
                        }`}
                      />

                      <span
                        className={`ml-3 flex h-7 w-7 items-center justify-center border transition-all duration-500 ${
                          kvkkAccepted
                            ? "border-[#0f2535]/25 group-hover:translate-x-1 group-hover:border-[#0f2535]"
                            : "border-[#0f2535]/15"
                        }`}
                      >
                        <FiArrowUpRight
                          className={`text-sm transition-transform duration-500 ${
                            kvkkAccepted ? "group-hover:rotate-45" : ""
                          }`}
                        />
                      </span>
                    </span>

                    <span
                      className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#0f2535] transition-transform duration-500 ${
                        kvkkAccepted ? "group-hover:scale-x-100" : ""
                      }`}
                    />
                  </button>
                </div>
              </form>
            </m.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-10">
          <div className="h-[420px] w-full overflow-hidden border border-[#0f2535]/10">
            <iframe
              title="Aryap Konum"
              src={mapEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full grayscale-[20%] transition-all duration-500 hover:grayscale-0"
            />
          </div>
        </section>
      </main>
    </LazyMotion>
  );
};

export default ContactPage;