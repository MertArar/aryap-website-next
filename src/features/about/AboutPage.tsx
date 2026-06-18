"use client";

import React, { memo } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

import AboutHero from "./AboutHero";
import CompanyIntro from "./CompanyIntro";
import ProjectMap from "./ProjectMap";
import ProjectWorldMap from "./ProjectWorldMap";

const AboutPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-white text-[#0f2535] [overflow-x:clip]">
        <AboutHero />
        <CompanyIntro />
        <ProjectMap />
        <ProjectWorldMap />
      </main>
    </LazyMotion>
  );
};

export default memo(AboutPage);