'use client';

import { useState } from 'react';
import { translations, type Language } from '@/lib/translations';

export default function Home() {
  const [lang, setLang] = useState<Language>('ja');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const toggleLang = () => {
    setLang(lang === 'ja' ? 'en' : 'ja');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-8 md:px-10 lg:px-16 lg:pt-10">
        {/* Nav */}
        <header className="relative flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 ring-1 ring-emerald-500/20">
              <span className="text-lg font-semibold text-emerald-600">A</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide text-slate-900">
                AMI
              </p>
              <p className="text-xs text-slate-600">
                {t.nav.subtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a href="#features" className="hover:text-emerald-600 transition-colors">
              {t.nav.services}
            </a>
            <a href="/contact" className="hover:text-emerald-600 transition-colors">
              {t.nav.contact}
            </a>
            <button
              onClick={toggleLang}
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-slate-50"
              aria-label="Toggle language"
            >
              {lang === 'ja' ? 'EN' : '日本語'}
            </button>
            <a
              href="/contact"
              className="rounded-full border border-slate-300 bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="flex flex-col items-center justify-center gap-1.5 rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-all ${
                mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-all ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 rounded-full bg-current transition-all ${
                mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-full rounded-lg border border-slate-200 bg-white shadow-lg md:hidden">
              <nav className="flex flex-col p-4">
                <a
                  href="#features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-emerald-600"
                >
                  {t.nav.services}
                </a>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-emerald-600"
                >
                  {t.nav.contact}
                </a>
                <button
                  onClick={() => {
                    toggleLang();
                  }}
                  className="mt-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-emerald-500 hover:bg-slate-50"
                >
                  {lang === 'ja' ? 'English (EN)' : '日本語 (JA)'}
                </button>
                <a
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {t.nav.contact}
                </a>
              </nav>
            </div>
          )}
        </header>

        {/* Hero */}
        <section className="mt-16 grid flex-1 gap-12 md:mt-20 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-medium text-red-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              {t.hero.badge}
            </p>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              {lang === 'ja' ? (
                <>
                  {t.hero.title}
                  <span className="relative mx-2 inline-block text-emerald-600">
                    {t.hero.titleHighlight}
                    <span className="absolute inset-x-0 bottom-1 h-2 rounded-full bg-emerald-200 blur-sm" />
                  </span>
                  {t.hero.titleEnd}
                </>
              ) : (
                <>
                  {t.hero.title}
                  <span className="relative mx-2 inline-block text-emerald-600">
                    {t.hero.titleHighlight}
                    <span className="absolute inset-x-0 bottom-1 h-2 rounded-full bg-emerald-200 blur-sm" />
                  </span>
                  {t.hero.titleEnd}
                </>
              )}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-base">
              {t.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 transition hover:bg-red-700"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-emerald-500 hover:bg-slate-50"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-slate-200 ring-1 ring-slate-300" />
                <span>{t.hero.trust1}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-slate-200 ring-1 ring-slate-300" />
                <span>{t.hero.trust2}</span>
              </div>
            </div>
          </div>

          {/* Right panel / preview card */}
          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-700">
                <p className="font-medium">{t.preview.title}</p>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  {t.preview.status}
                </span>
              </div>

              <div className="mt-4 grid gap-4 text-xs text-slate-700">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-600">{t.preview.clinics}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{t.preview.clinicsValue}</p>
                    <p className="mt-1 text-[11px] text-emerald-600">{t.preview.clinicsChange}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-600">{t.preview.aiAccuracy}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{t.preview.aiAccuracyValue}</p>
                    <p className="mt-1 text-[11px] text-emerald-600">
                      {t.preview.aiAccuracyLabel}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] text-slate-600">{t.preview.speed}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{t.preview.speedValue}</p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      {t.preview.speedLabel}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <p>{t.preview.services}</p>
                    <p>{t.preview.achievements}</p>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      { label: t.preview.service1, value: "50+", tone: "emerald" },
                      { label: t.preview.service2, value: "30+", tone: "emerald" },
                      { label: t.preview.service3, value: "150+", tone: "emerald" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-2"
                      >
                        <p className="truncate text-xs text-slate-700">
                          {item.label}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full w-full bg-emerald-500" />
                          </div>
                          <p className="text-xs font-medium text-emerald-600">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-[1.2fr_1fr] gap-3 text-[11px]">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-slate-600">{t.preview.facilities}</p>
                    <ul className="mt-2 space-y-1.5">
                      <li className="flex items-center justify-between gap-2">
                        <span className="truncate text-slate-700">
                          {t.preview.medicalClinic}
                        </span>
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                          120+
                        </span>
                      </li>
                      <li className="flex items-center justify-between gap-2">
                        <span className="truncate text-slate-700">
                          {t.preview.imagingClinic}
                        </span>
                        <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                          25+
                        </span>
                      </li>
                      <li className="flex items-center justify-between gap-2">
                        <span className="truncate text-slate-700">
                          {t.preview.hospital}
                        </span>
                        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                          15+
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <p className="text-slate-600">{t.preview.servicesProvided}</p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">{t.preview.softwareDev}</span>
                        <span className="text-emerald-600">✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">{t.preview.aiSystem}</span>
                        <span className="text-emerald-600">✓</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-700">{t.preview.consulting}</span>
                        <span className="text-emerald-600">✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mt-20 border-t border-slate-200 pt-12 text-sm text-slate-700"
        >
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
                {t.features.label}
              </p>
              <h2 className="mt-3 text-lg font-semibold text-slate-900">
                {t.features.title}
              </h2>
            </div>
            <div className="space-y-4 text-sm text-slate-600 md:order-1 md:col-span-2 md:text-[13px]">
              <p>
                {t.features.description}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-emerald-600">
                    {t.features.service1Title}
                  </p>
                  <p className="mt-2 text-xs text-slate-600">
                    {t.features.service1Desc}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-emerald-600">
                    {t.features.service2Title}
                  </p>
                  <p className="mt-2 text-xs text-slate-600">
                    {t.features.service2Desc}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-emerald-600">
                    {t.features.service3Title}
                  </p>
                  <p className="mt-2 text-xs text-slate-600">
                    {t.features.service3Desc}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold text-emerald-600">
                    {t.features.service4Title}
                  </p>
                  <p className="mt-2 text-xs text-slate-600">
                    {t.features.service4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section
          id="demo"
          className="mt-16 rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-emerald-50/50 to-emerald-100/30 px-6 py-6 text-sm text-slate-900 shadow-lg md:px-10 md:py-7"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                {t.cta.label}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900 md:text-base">
                {t.cta.title}
              </p>
              <p className="mt-1 text-xs text-slate-600">
                {t.cta.description}
              </p>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:bg-slate-800"
            >
              {t.cta.button}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
