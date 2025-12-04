'use client';

import { useState } from 'react';

interface Domain {
  name: string;
  price: number;
  category: string;
  description: string;
  extension: string;
}

const domains: Domain[] = [
  {
    name: 'tech',
    price: 50000,
    category: 'テクノロジー',
    description: 'テクノロジー関連のビジネスに最適なドメイン',
    extension: '.com',
  },
  {
    name: 'innovation',
    price: 75000,
    category: 'ビジネス',
    description: '革新的なビジネスを始める方に',
    extension: '.com',
  },
  {
    name: 'startup',
    price: 60000,
    category: 'スタートアップ',
    description: 'スタートアップ企業にぴったりのドメイン',
    extension: '.com',
  },
  {
    name: 'digital',
    price: 45000,
    category: 'デジタル',
    description: 'デジタルマーケティングやオンラインビジネス向け',
    extension: '.com',
  },
  {
    name: 'creative',
    price: 55000,
    category: 'クリエイティブ',
    description: 'クリエイティブなプロジェクトに最適',
    extension: '.com',
  },
  {
    name: 'future',
    price: 80000,
    category: 'ビジネス',
    description: '未来志向のビジネスを表現',
    extension: '.com',
  },
];

export default function DomainSalesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('すべて');

  const categories = ['すべて', ...Array.from(new Set(domains.map(d => d.category)))];

  const filteredDomains = domains.filter(domain => {
    const matchesSearch = domain.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'すべて' || domain.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <main className="mx-auto min-h-screen max-w-7xl px-6 pb-16 pt-8 md:px-10 lg:px-16 lg:pt-10">
        {/* Header */}
        <header className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 ring-1 ring-sky-500/30">
              <span className="text-lg font-semibold text-sky-400">D</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-wide text-slate-100">
                domeichi
              </p>
              <p className="text-xs text-slate-400">
                プレミアムドメインの販売
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <a href="#domains" className="hover:text-sky-300">
              ドメイン一覧
            </a>
            <a href="#features" className="hover:text-sky-300">
              特徴
            </a>
            <a href="#contact" className="hover:text-sky-300">
              お問い合わせ
            </a>
            <a
              href="#contact"
              className="rounded-full border border-slate-700 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-100 shadow-sm shadow-slate-900/60 transition hover:border-sky-500/80 hover:bg-slate-900 hover:text-sky-100"
            >
              購入のお問い合わせ
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="mt-16 md:mt-20">
          <div className="text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/5 px-3 py-1 text-xs font-medium text-sky-200 shadow-sm shadow-sky-900/50">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              プレミアムドメインを販売中
            </p>

            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
              あなたのビジネスに
              <span className="relative mx-2 inline-block">
                最適なドメイン
                <span className="absolute inset-x-0 bottom-1 h-2 rounded-full bg-sky-500/40 blur-sm" />
              </span>
              を見つけましょう
            </h1>

            <p className="mt-6 mx-auto max-w-2xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
              高品質なプレミアムドメインを厳選してご提供しています。
              ブランド価値を高めるドメイン名で、ビジネスの成功をサポートします。
            </p>

            {/* Search Bar */}
            <div className="mt-8 mx-auto max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ドメイン名で検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-6 py-4 text-sm text-slate-100 placeholder:text-slate-500 shadow-sm shadow-slate-900/50 transition focus:border-sky-500/60 focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  selectedCategory === category
                    ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/40'
                    : 'border border-slate-700 bg-slate-900/60 text-slate-300 hover:border-sky-500/60 hover:bg-slate-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Domain List */}
        <section id="domains" className="mt-12">
          <h2 className="text-2xl font-semibold text-slate-50 mb-6">
            販売中のドメイン ({filteredDomains.length}件)
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDomains.map((domain) => (
              <div
                key={domain.name}
                className="group rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_40px_120px_rgba(15,23,42,0.9)] backdrop-blur-xl transition hover:border-sky-500/40 hover:shadow-[0_40px_120px_rgba(56,189,248,0.2)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-sky-400 group-hover:text-sky-300 transition">
                      {domain.name}
                      <span className="text-slate-400">{domain.extension}</span>
                    </h3>
                    <p className="mt-1 text-xs text-sky-200/60">{domain.category}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-4 line-clamp-2">
                  {domain.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <div>
                    <p className="text-xs text-slate-400">価格</p>
                    <p className="text-2xl font-bold text-slate-50">
                      {formatPrice(domain.price)}
                    </p>
                  </div>
                  <a
                    href={`#contact?domain=${domain.name}${domain.extension}`}
                    className="rounded-full bg-sky-500 px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
                  >
                    お問い合わせ
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredDomains.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">検索条件に一致するドメインが見つかりませんでした。</p>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="mt-20 border-t border-slate-800/80 pt-12 text-sm text-slate-200"
        >
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:order-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-400">
                なぜ選ぶべきか
              </p>
              <h2 className="mt-3 text-lg font-semibold text-slate-50">
                プレミアムドメインでブランド価値を高めましょう
              </h2>
            </div>
            <div className="space-y-4 text-sm text-slate-300 md:order-1 md:col-span-2 md:text-[13px]">
              <p>
                厳選された高品質なドメイン名は、あなたのビジネスの信頼性とブランド価値を
                向上させます。短く覚えやすいドメイン名で、顧客の記憶に残る存在になりましょう。
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold text-sky-300">
                    信頼性の向上
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    プロフェッショナルなドメイン名は、ビジネスの信頼性を高め、
                    顧客との関係構築をサポートします。
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold text-sky-300">
                    SEO効果
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    適切なドメイン名は検索エンジン最適化に有利に働き、
                    より多くの顧客にリーチできます。
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs font-semibold text-sky-300">
                    ブランド価値
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    短く覚えやすいドメイン名は、ブランド認知度を高め、
                    長期的なビジネス成長を促進します。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="mt-16 rounded-3xl border border-sky-500/40 bg-gradient-to-r from-sky-500/20 via-sky-500/5 to-indigo-500/10 px-6 py-6 text-sm text-slate-100 shadow-[0_24px_80px_rgba(15,23,42,0.9)] md:px-10 md:py-7"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                お問い合わせ
              </p>
              <p className="mt-2 text-sm font-medium md:text-base">
                ドメインの購入やご質問がございましたら、お気軽にお問い合わせください。
              </p>
              <p className="mt-1 text-xs text-sky-100/80">
                購入希望のドメイン名とご連絡先をお知らせいただければ、迅速に対応いたします。
              </p>
            </div>
            <a
              href="mailto:contact@example.com?subject=ドメイン購入のお問い合わせ"
              className="inline-flex items-center justify-center rounded-full bg-slate-950/80 px-5 py-2.5 text-xs font-semibold text-sky-100 ring-1 ring-sky-300/70 shadow-lg shadow-sky-900/60 transition hover:bg-slate-950 hover:text-sky-50"
            >
              お問い合わせする
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

