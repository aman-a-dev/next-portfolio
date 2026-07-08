import { Intro } from "@/components/common/intro";
import { BookCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main>
      <Intro
        icon={<BookCheck />}
        badge="About"
        heading="About"
        highlight="Me"
        paragraph="Let's me introduce my self briefly."
      />
    </main>
  );
}
