import Hero from "@/components/layout/hero";
import Bio from "@/components/layout/bio";
import Projects from "@/components/layout/projects";
import Skills from "@/components/layout/skills";
// import PC from "@/components/model/PC";

export default function HomePage() {
  return (
    <main>
      {/*<PC />*/}
      <Hero />
      <Bio />
      <Projects />
      <Skills />
    </main>
  );
}
