"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, ExternalLink } from "lucide-react";

export function Contact() {
  const t = useTranslations("contact");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-32 bg-transparent border-t border-[#E4DDD2] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-8 h-[2px] bg-[#F05A1A]"></span>
            <span className="text-[#F05A1A] text-[11px] font-extrabold tracking-[0.2em] uppercase">
              {t("badge")}
            </span>
            <span className="w-8 h-[2px] bg-[#F05A1A]"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#17140F] tracking-tight">
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-[#5C564E] max-w-xl mt-4 font-medium">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Info & Social Profiles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel lg:col-span-5 flex flex-col justify-between gap-8 p-8 md:p-10"
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-[#17140F] mb-4">
                  {t("workTogether")}
                </h3>
                <p className="text-sm text-[#5C564E] leading-relaxed font-medium">
                  {t("workTogetherDesc")}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#E4DDD2]">
                {/* WhatsApp & Phone */}
                <div className="glass-card flex items-center gap-4 p-4 hover:border-[#F05A1A] transition-colors group">
                  <div className="p-3.5 rounded-2xl bg-[#F05A1A]/10 text-[#F05A1A] group-hover:bg-orange-grad group-hover:text-white shrink-0 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#8F877C] block uppercase tracking-wider mb-1">{t("phone")}</span>
                    <a
                      href="https://wa.me/966538937618"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#17140F] group-hover:text-[#F05A1A] transition-colors"
                      dir="ltr"
                    >
                      +966 53 893 7618
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="glass-card flex items-center gap-4 p-4 hover:border-[#F05A1A] transition-colors group">
                  <div className="p-3.5 rounded-2xl bg-[#F05A1A]/10 text-[#F05A1A] group-hover:bg-orange-grad group-hover:text-white shrink-0 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#8F877C] block uppercase tracking-wider mb-1">{t("email")}</span>
                    <a
                      href="mailto:mdnasim8088@gmail.com"
                      className="text-sm font-bold text-[#17140F] group-hover:text-[#F05A1A] transition-colors"
                      dir="ltr"
                    >
                      mdnasim8088@gmail.com
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="glass-card flex items-center gap-4 p-4 group">
                  <div className="p-3.5 rounded-2xl bg-[#F05A1A]/10 text-[#F05A1A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#8F877C] block uppercase tracking-wider mb-1">{t("location")}</span>
                    <span className="text-sm font-bold text-[#17140F]">
                      {t("locationVal")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Profiles Grid */}
              <div className="pt-6">
                <span className="text-[11px] font-bold text-[#8F877C] block mb-4 uppercase tracking-wider">
                  Social & Portfolio Profiles
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {/* Behance Link */}
                  <a
                    href="https://www.behance.net/mdtusardotcom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card flex items-center justify-between p-4 hover:border-[#F05A1A] hover:bg-[#F05A1A]/5 text-[13px] font-bold text-[#17140F] hover:text-[#F05A1A] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="px-1.5 py-0.5 rounded-md bg-[#F05A1A]/10 text-[#F05A1A] group-hover:bg-orange-grad group-hover:text-white font-black text-xs transition-colors">Bē</span>
                      <span>Behance</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8F877C] group-hover:text-[#F05A1A] transition-colors" />
                  </a>

                  {/* LinkedIn Link */}
                  <a
                    href="https://www.linkedin.com/in/md-tusar-ahammad-nasim-27a011355/?isSelfProfile=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card flex items-center justify-between p-4 hover:border-[#F05A1A] hover:bg-[#F05A1A]/5 text-[13px] font-bold text-[#17140F] hover:text-[#F05A1A] transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#5C564E] group-hover:text-[#F05A1A] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      <span>LinkedIn</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8F877C] group-hover:text-[#F05A1A] transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#E4DDD2] text-xs text-[#8F877C] font-medium">
              <span>{t("responseNotice")}</span>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel lg:col-span-7 p-8 md:p-12"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
                <div className="w-16 h-16 rounded-full bg-[#F05A1A]/10 text-[#F05A1A] flex items-center justify-center border border-[#F05A1A]/30 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#17140F]">{t("successTitle")}</h3>
                <p className="text-sm text-[#5C564E] max-w-sm font-medium">
                  {t("successDesc")}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="group/field space-y-2.5">
                    <label className="text-[11px] font-bold text-[#5C564E] group-focus-within/field:text-[#F05A1A] uppercase tracking-wider pl-1 transition-colors">{t("nameLabel")}</label>
                    <div className="field-frame">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("namePlaceholder")}
                        className="glass-field w-full px-5 py-4 text-sm text-[#17140F] font-medium"
                      />
                    </div>
                  </div>

                  <div className="group/field space-y-2.5">
                    <label className="text-[11px] font-bold text-[#5C564E] group-focus-within/field:text-[#F05A1A] uppercase tracking-wider pl-1 transition-colors">{t("emailLabel")}</label>
                    <div className="field-frame">
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("emailPlaceholder")}
                        className="glass-field w-full px-5 py-4 text-sm text-[#17140F] font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="group/field space-y-2.5">
                  <label className="text-[11px] font-bold text-[#5C564E] group-focus-within/field:text-[#F05A1A] uppercase tracking-wider pl-1 transition-colors">{t("subjectLabel")}</label>
                  <div className="field-frame">
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t("subjectPlaceholder")}
                      className="glass-field w-full px-5 py-4 text-sm text-[#17140F] font-medium"
                    />
                  </div>
                </div>

                <div className="group/field space-y-2.5">
                  <label className="text-[11px] font-bold text-[#5C564E] group-focus-within/field:text-[#F05A1A] uppercase tracking-wider pl-1 transition-colors">{t("messageLabel")}</label>
                  <div className="field-frame">
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t("messagePlaceholder")}
                      className="glass-field block w-full px-5 py-4 text-sm text-[#17140F] resize-none font-medium"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-4 rounded-[16px] font-bold text-sm tracking-wide text-white bg-orange-grad hover:brightness-110 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4 shadow-[0_4px_14px_rgba(240,90,26,0.25)]"
                >
                  <Send className="w-4 h-4 rtl:-scale-x-100" />
                  <span>{t("sendButton")}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
