import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero/Hero";
import { Stats } from "@/components/stats/Stats";
import { About } from "@/components/about/About";
import { Skills } from "@/components/skills/Skills";
import { Timeline } from "@/components/experience/Timeline";
import { Services } from "@/components/services/Services";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { CTA } from "@/components/cta/CTA";
import { Contact } from "@/components/contact/Contact";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Stats />
      <About />
      <Skills />
      <Timeline />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Contact />
    </div>
  );
}
