import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { sora, manrope, jetbrainsMono, ibmPlexArabic } from "@/styles/fonts";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "ar";
  const fontVars = [sora, manrope, jetbrainsMono, ibmPlexArabic].map((f) => f.variable).join(" ");

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} translate="no" className={fontVars}>
      <body className={`bg-[#F7F4EF] text-[#17140F] antialiased min-h-screen flex flex-col justify-between selection:bg-[#F05A1A] selection:text-white relative`}>
        <AnimatedBackground />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          <main className="flex-grow relative z-10">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

