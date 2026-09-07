'use client';

import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { translations, type Language } from '@/lib/translations';

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('ja');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    topic: '',
    message: '',
  });
  const t = translations[lang];

  const toggleLang = () => {
    setLang(lang === 'ja' ? 'en' : 'ja');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Get reCAPTCHA token
      let recaptchaToken = '';
      if (executeRecaptcha) {
        recaptchaToken = await executeRecaptcha('contact_form');
      }

      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      console.log('Response status:', response.status, response.statusText);

      // レスポンスを一度だけ読み取る
      const data = await response.json().catch(async (parseError) => {
        console.error('Failed to parse JSON response:', parseError);
        const text = await response.text();
        console.error('Response text:', text);
        throw new Error('Failed to parse server response');
      });

      console.log('Response data:', data);

      if (!response.ok) {
        // エラーの詳細を組み立て
        let errorMsg = data.error || `HTTP error! status: ${response.status}`;
        if (data.details) {
          errorMsg += `: ${data.details}`;
        }
        if (data.code) {
          errorMsg += ` (Code: ${data.code})`;
        }
        if (data.hint) {
          errorMsg += ` (Hint: ${data.hint})`;
        }
        throw new Error(errorMsg);
      }

      if (data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          topic: '',
          message: '',
        });
        // 3秒後にメッセージを消す
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (error) {
      setSubmitStatus('error');
      let errorMsg = 'An unknown error occurred';
      
      if (error instanceof Error) {
        errorMsg = error.message;
        console.error('Form submission error (Error object):', {
          message: error.message,
          name: error.name,
          stack: error.stack,
          formData: formData
        });
      } else if (typeof error === 'string') {
        errorMsg = error;
        console.error('Form submission error (String):', error);
      } else if (error && typeof error === 'object') {
        errorMsg = JSON.stringify(error);
        console.error('Form submission error (Object):', error);
      } else {
        console.error('Form submission error (Unknown type):', {
          error,
          type: typeof error,
          formData: formData
        });
      }
      
      setErrorMessage(errorMsg);
      
      // エラーメッセージをアラートでも表示（デバッグ用）
      if (process.env.NODE_ENV === 'development') {
        console.error('Full error details:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const contactTranslations = {
    ja: {
      title: 'お問い合わせ',
      subtitle: 'デモのご依頼、ご質問、パートナーシップなど、下記フォームからお気軽にお問い合わせください。',
      name: 'お名前',
      namePlaceholder: '山田 太郎',
      company: '会社名',
      companyPlaceholder: '株式会社〇〇',
      email: 'メールアドレス',
      emailPlaceholder: 'name@example.com',
      topic: 'お問い合わせ種別',
      topicSelect: '選択してください',
      topicDemo: '製品デモのご依頼',
      topicPricing: '料金・契約に関するご相談',
      topicPartnership: 'パートナーシップのご相談',
      topicOther: 'その他',
      message: 'お問い合わせ内容',
      messagePlaceholder: '現在の運用体制や課題、ご希望の内容などをお書きください。',
      privacy: '送信ボタンを押すことで、プライバシーポリシーに同意したものとみなされます。',
      submit: '送信する',
      submitting: '送信中...',
      success: 'お問い合わせを送信しました。ありがとうございます。',
      error: '送信に失敗しました。もう一度お試しください。',
      note: '',
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Please feel free to contact us using the form below for demo requests, questions, partnerships, and more.',
      name: 'Name',
      namePlaceholder: 'John Doe',
      company: 'Company',
      companyPlaceholder: 'Company Name',
      email: 'Email Address',
      emailPlaceholder: 'name@example.com',
      topic: 'Inquiry Type',
      topicSelect: 'Please select',
      topicDemo: 'Product Demo Request',
      topicPricing: 'Pricing & Contract Inquiry',
      topicPartnership: 'Partnership Inquiry',
      topicOther: 'Other',
      message: 'Message',
      messagePlaceholder: 'Please describe your current situation, challenges, and requirements.',
      privacy: 'By clicking the submit button, you agree to our privacy policy.',
      submit: 'Submit',
      submitting: 'Submitting...',
      success: 'Thank you! Your message has been sent successfully.',
      error: 'Failed to send message. Please try again.',
      note: '',
    },
  };

  const ct = contactTranslations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-30 to-emerald-100">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-16 pt-8 md:px-8 md:pt-14">
        {/* Nav */}
        <header className="relative flex items-center justify-between gap-6">
          <a href="/" className="flex items-center gap-2">
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
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <a href="/#features" className="hover:text-emerald-600 transition-colors">
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
              className="rounded-full border border-emerald-500 bg-emerald-600 px-4 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-emerald-700"
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
                  href="/#features"
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
                  className="mt-2 rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-emerald-700"
                >
                  {t.nav.contact}
                </a>
              </nav>
            </div>
          )}
        </header>

        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
            Contact
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            {ct.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            {ct.subtitle}
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mt-8 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
            {ct.success}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-8 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <p className="font-medium">{ct.error}</p>
            {errorMessage && (
              <p className="mt-2 text-xs text-red-700 break-words">{errorMessage}</p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-slate-700"
              >
                {ct.name}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder={ct.namePlaceholder}
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block text-xs font-medium text-slate-700"
              >
                {ct.company}
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                placeholder={ct.companyPlaceholder}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-700"
            >
              {ct.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder={ct.emailPlaceholder}
            />
          </div>

          <div>
            <label
              htmlFor="topic"
              className="block text-xs font-medium text-slate-700"
            >
              {ct.topic}
            </label>
            <select
              id="topic"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            >
              <option value="">
                {ct.topicSelect}
              </option>
              <option value="demo">{ct.topicDemo}</option>
              <option value="pricing">{ct.topicPricing}</option>
              <option value="partnership">{ct.topicPartnership}</option>
              <option value="other">{ct.topicOther}</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-xs font-medium text-slate-700"
            >
              {ct.message}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-0 transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder={ct.messagePlaceholder}
            />
          </div>

          <div className="flex flex-col gap-3 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
            <p>
              {ct.privacy}
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-2 text-xs font-semibold text-white shadow-md shadow-red-500/30 transition hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? ct.submitting : ct.submit}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
