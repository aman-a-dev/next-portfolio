import Link from "next/link";
import { Heading } from "@/components/common/intro";
import { Card } from "@/components/ui/card";
import { Tilt } from "@/components/vendor/tilt";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/vendor/scroll-based-velocity";

export default function Bio() {
  return (
    <section
      id="bio"
      className="w-full flex items-center justify-center flex-col mt-34"
    >
      <Heading text="About" highlight="Me" />
      <Tilt>
        <Card className="md:w-1/3 p-3 mb-10 text-center">
          <p>
            Full-stack developer and UI-focused builder passionate about
            creating fast, modern, and user-friendly web applications. Skilled
            in{" "}
            <Link href="/#skills" className="font-black">
              The following (click to see)
            </Link>{" "}
            and creative frontend experiences, with a strong interest in
            AI-powered tools and real-time systems. I enjoy turning ideas into
            clean, functional products that solve real problems.
          </p>
        </Card>
      </Tilt>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <ScrollVelocityContainer className="text-4xl font-bold tracking-[-0.02em] md:text-7xl md:leading-20">
          <ScrollVelocityRow baseVelocity={20} direction={1}>
            Build
          </ScrollVelocityRow>

          <ScrollVelocityRow baseVelocity={20} direction={-1}>
            Test and Deploy
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
        <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
        <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
      </div>
    </section>
  );
}
