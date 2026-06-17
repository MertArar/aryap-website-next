import Hero from "@/features/home/hero/Hero";
import About from "@/features/home/about/About";
import Solutions from "@/features/home/solutions/Solutions";
import Projects from "@/features/home/projects/Projects";
import Contact from "@/features/home/contact/Contact";
import Partners from "@/features/home/partners/Partners";


export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Solutions />
      <Projects />
      <Contact />
      <Partners />
    </main>
  );
}