import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChapterRail } from "./components/portfolio/ChapterRail";
import { AmbientBackdrop } from "./components/portfolio/AmbientBackdrop";
import { CustomCursor } from "./components/portfolio/CustomCursor";
import { LandingSection } from "./components/portfolio/LandingSection";
import { SkillsGalaxy } from "./components/portfolio/SkillsGalaxy";
import { ProjectUniverse } from "./components/portfolio/ProjectUniverse";
import { DeveloperMind } from "./components/portfolio/DeveloperMind";
import { ContactTerminal } from "./components/portfolio/ContactTerminal";
import { LoadingScreen } from "./components/portfolio/LoadingScreen";
import { usePortfolioData } from "./hooks/usePortfolioData";

const sections = [
  { id: "landing", label: "Arrival", index: "00" },
  { id: "skills", label: "Galaxy", index: "01" },
  { id: "projects", label: "Universe", index: "02" },
  { id: "mind", label: "Mind", index: "03" },
  { id: "contact", label: "Terminal", index: "04" }
];

const App = () => {
  const { portfolio, loading, source } = usePortfolioData();
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
        <LandingSection id="landing" profile={portfolio.profile} stats={portfolio.quickStats} />
        <SkillsGalaxy id="skills" skillGroups={portfolio.skills} />
        <ProjectUniverse id="projects" projects={portfolio.projects} />
        <DeveloperMind id="mind" mindset={portfolio.mindset} />
        <ContactTerminal id="contact" contact={portfolio.contact} />
      </main>
    </div>
  );
};

export default App;
