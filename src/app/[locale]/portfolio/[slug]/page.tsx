import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { projectsData } from "@/data/projects";
import { ArrowLeft, Calendar, Layers, Wrench } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    projectsData.forEach((project) => {
      params.push({ locale, slug: project.slug });
    });
  });

  return params;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "portfolio" });
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isAr = locale === "ar";
  const title = isAr ? project.titleAr : project.title;
  const description = isAr ? project.descriptionAr : project.description;
  const overview = isAr ? project.overviewAr : project.overview;
  const challenge = isAr ? project.challengeAr : project.challenge;
  const concept = isAr ? project.conceptAr : project.concept;
  const category = isAr ? project.categoryAr : project.category;
  const banner = project.heroImage || project.thumbnail;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        {/* Back button */}
        <Link
          href={`/${locale}#portfolio`}
          className="btn-interactive inline-flex items-center gap-2 text-xs font-bold text-[#F05A1A] hover:text-[#D94A10] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rtl:-scale-x-100" />
          <span>{t("back")}</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#F05A1A14] text-[#D94A10] border border-[#F05A1A]/30">
              {category}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#74767E]">
              <Calendar className="w-3.5 h-3.5 text-[#F05A1A]" />
              <span>{project.year}</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[#222325]">
            {title}
          </h1>

          <p className="text-base md:text-xl text-[#62646A] leading-relaxed max-w-3xl font-medium">
            {description}
          </p>
        </div>

        {/* Large banner: the uploaded image, or a placeholder until one is added */}
        {banner ? (
          <div className="w-full rounded-3xl overflow-hidden border border-[#E4E5E7] shadow-xs bg-[#F7F7F7] flex justify-center">
            {/* Shown whole at its own shape (no cropping) */}
            <Image
              src={banner}
              alt={title}
              width={1600}
              height={1000}
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        ) : (
        <div className="w-full aspect-[21/9] rounded-3xl bg-[#F7F7F7] border border-[#E4E5E7] flex flex-col items-center justify-center p-8 gap-3 shadow-xs">
          <div className="w-20 h-20 rounded-2xl bg-white border border-[#E4E5E7] flex items-center justify-center text-[#F05A1A] shadow-xs">
            <Layers className="w-10 h-10" />
          </div>
          <span className="text-xs font-mono font-bold text-[#74767E] tracking-widest uppercase">
            {title}
          </span>
        </div>
        )}

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-6">
          {/* Main Copy */}
          <div className="md:col-span-8 space-y-8">
            <div className="bg-[#F7F7F7] p-8 rounded-3xl border border-[#E4E5E7] space-y-3 shadow-xs">
              <h2 className="text-xl font-bold text-[#F05A1A]">
                {t("overview")}
              </h2>
              <p className="text-sm text-[#62646A] leading-relaxed font-medium">{overview}</p>
            </div>

            <div className="bg-[#F7F7F7] p-8 rounded-3xl border border-[#E4E5E7] space-y-3 shadow-xs">
              <h2 className="text-xl font-bold text-[#222325]">{t("challenge")}</h2>
              <p className="text-sm text-[#62646A] leading-relaxed font-medium">{challenge}</p>
            </div>

            <div className="bg-[#F7F7F7] p-8 rounded-3xl border border-[#E4E5E7] space-y-3 shadow-xs">
              <h2 className="text-xl font-bold text-[#222325]">{t("concept")}</h2>
              <p className="text-sm text-[#62646A] leading-relaxed font-medium">{concept}</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-[#F7F7F7] p-6 rounded-3xl border border-[#E4E5E7] space-y-6 shadow-xs">
              <h3 className="text-base font-bold text-[#222325] flex items-center gap-2 border-b border-[#E4E5E7] pb-3">
                <Wrench className="w-4 h-4 text-[#F05A1A]" />
                <span>{t("tools")}</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-[#222325] border border-[#E4E5E7] shadow-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
