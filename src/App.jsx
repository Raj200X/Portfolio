import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChapterRail } from "./components/portfolio/ChapterRail";
import { AmbientBackdrop } from "./components/portfolio/AmbientBackdrop";
import { CustomCursor } from "./components/portfolio/CustomCursor";
import { LandingSection } from "./components/portfolio/LandingSection";
import { AboutSection } from "./components/portfolio/AboutSection";
import { SkillsGalaxy } from "./components/portfolio/SkillsGalaxy";
import { ProjectUniverse } from "./components/portfolio/ProjectUniverse";
import { CredentialsSection } from "./components/portfolio/CredentialsSection";
import { ContactTerminal } from "./components/portfolio/ContactTerminal";
import { LoadingScreen } from "./components/portfolio/LoadingScreen";
import { usePortfolioData } from "./hooks/usePortfolioData";

const sections = [
  { id: "landing", label: "Home", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "skills", label: "Skills", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "credentials", label: "Education", index: "04" },
  { id: "contact", label: "Contact", index: "05" }
];

const App = () => {
  const { portfolio, loading } = usePortfolioData();
  const [activeSection, setActiveSection] = useState("landing");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth;
      const y = event.clientY / window.innerHeight;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -30% 0px",
        threshold: [0.2, 0.35, 0.5, 0.75]
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [loading]);

  if (loading || !portfolio) {
    return <LoadingScreen />;
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-void text-white">
      <CustomCursor />
      <AmbientBackdrop mousePosition={mousePosition} />
      <ChapterRail sections={sections} activeSection={activeSection} profile={portfolio.profile} />

      <main className="relative z-10">
        <LandingSection id="landing" profile={portfolio.profile} />
        <AboutSection id="about" profile={portfolio.profile} />
        <SkillsGalaxy id="skills" skillGroups={portfolio.skills} />
        <ProjectUniverse id="projects" projects={portfolio.projects} />
        <CredentialsSection id="credentials" credentials={portfolio.credentials} />
        <ContactTerminal id="contact" contact={portfolio.contact} />
      </main>
    </div>
  );
};

export default App;
