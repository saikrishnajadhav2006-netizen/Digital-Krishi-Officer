"use client";

import React from "react";
import {
  ArrowRight, ArrowUpRight, Leaf, Mic, ScanSearch, CloudSun,
  Sprout, ShieldCheck, Languages, MessageCircle, ImagePlus,
  TrendingUp, Headphones, CheckCircle2, Play, Wheat, Sun,
} from "lucide-react";
import Header from "./Header";

const LandingPage = ({ onStart, t, onLanguageChange }) => {
  const copy = {
    eyebrow: t?.welcome_header || "A smarter growing season starts here",
    titleA: "Better decisions.",
    titleB: "Healthier harvests.",
    subtitle: t?.hero_subtitle || "Practical crop guidance, visual diagnosis and voice-first support—built around the way farmers actually work.",
    cta: t?.start_button || "Talk to your Krishi Officer",
    secondary: "Explore how it works",
    featuresTitle: "One trusted place for your farm questions",
    featuresSubtitle: "From a leaf that looks different to a question you’d rather ask out loud.",
  };

  const features = [
    {
      icon: ScanSearch,
      color: "bg-emerald-100 text-emerald-700",
      title: "Understand crop problems",
      body: "Share a crop photo and get guided, evidence-aware help to investigate pests, disease and plant stress.",
      tag: "PHOTO GUIDANCE",
    },
    {
      icon: Mic,
      color: "bg-sky-100 text-sky-700",
      title: "Ask in your language",
      body: "Use voice or chat to ask questions naturally, without needing to know technical agricultural terms.",
      tag: "VOICE + CHAT",
    },
    {
      icon: Headphones,
      color: "bg-amber-100 text-amber-700",
      title: "Reach a human when needed",
      body: "When the answer is uncertain or you need more help, your case can be prepared for an agricultural officer.",
      tag: "HUMAN SUPPORT",
    },
  ];

  const steps = [
    { n: "01", title: "Tell us what you see", text: "Ask a question, speak naturally, or upload a clear photo of the affected crop." },
    { n: "02", title: "Get practical next steps", text: "Receive understandable guidance and follow-up questions in your preferred language." },
    { n: "03", title: "Escalate when necessary", text: "For uncertain or serious cases, seek confirmation from a qualified local expert." },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf4] text-[#173b2a]">
      <Header onLanguageChange={onLanguageChange} />

      {/* Hero */}
      <section className="relative isolate">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-lime-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-56 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
          <div className="relative z-10 animate-fade-in-up">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.16em] text-emerald-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
              </span>
              {copy.eyebrow}
            </div>
            <h1 className="max-w-2xl text-5xl font-black leading-[1.04] tracking-tight text-[#153b29] sm:text-6xl lg:text-7xl">
              {copy.titleA}
              <span className="mt-2 block bg-gradient-to-r from-emerald-700 via-green-600 to-lime-600 bg-clip-text text-transparent">
                {copy.titleB}
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              {copy.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onStart}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#17633d] px-7 py-4 font-bold text-white shadow-lg shadow-emerald-900/20 transition duration-300 hover:-translate-y-1 hover:bg-[#104b2e] hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-300"
              >
                {copy.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-900/15 bg-white/75 px-7 py-4 font-bold text-[#24543a] transition hover:-translate-y-1 hover:border-emerald-700/40 hover:bg-white"
              >
                <Play size={16} />
                {copy.secondary}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-emerald-700" /> Guidance with clear limitations</span>
              <span className="inline-flex items-center gap-2"><Languages size={17} className="text-emerald-700" /> Designed for local languages</span>
            </div>
          </div>

          {/* Animated crop-assistance visual */}
          <div className="relative mx-auto w-full max-w-xl animate-fade-in-up [animation-delay:180ms]">
            <div className="absolute inset-8 rounded-[3rem] bg-emerald-300/40 blur-3xl" />
            <div className="relative rounded-[2.25rem] border border-white/80 bg-white/75 p-3 shadow-[0_30px_90px_-35px_rgba(22,101,52,.35)] backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#d9efc9] via-[#eff7df] to-[#b9dfb0] p-5 sm:p-7">
                <div className="absolute -right-12 -top-16 h-48 w-48 rounded-full border-[26px] border-white/20" />
                <div className="absolute -bottom-16 -left-10 h-52 w-52 rounded-full border-[30px] border-emerald-700/5" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[.18em] text-emerald-800/70">Farm assistant</p>
                    <p className="mt-1 text-lg font-extrabold text-[#194b31]">Let’s check your crop</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3 text-emerald-800 shadow-sm"><Sprout size={25} /></div>
                </div>

                <div className="relative mt-7 flex min-h-[245px] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/70 bg-gradient-to-b from-[#a6cf83] via-[#d4e7ac] to-[#e7efc8] sm:min-h-[285px]">
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#719b4d]/40 to-transparent" />
                  <div className="absolute left-8 top-8 h-20 w-20 rounded-full bg-yellow-100/60 blur-2xl" />
                  <div className="relative animate-float">
                    <svg viewBox="0 0 260 230" className="h-56 w-60 drop-shadow-xl sm:h-64 sm:w-64" role="img" aria-label="Illustration of a healthy crop plant">
                      <path d="M130 215 C126 170 139 121 132 61" stroke="#397445" strokeWidth="9" fill="none" strokeLinecap="round"/>
                      <path d="M132 153 C91 143 70 115 64 80 C101 83 129 105 132 153Z" fill="#43884b"/>
                      <path d="M134 124 C171 112 190 84 194 51 C161 57 139 79 134 124Z" fill="#2e7540"/>
                      <path d="M132 185 C96 179 78 157 74 132 C105 136 126 153 132 185Z" fill="#5a9b4d"/>
                      <path d="M133 164 C168 155 186 132 190 105 C159 111 138 134 133 164Z" fill="#3e8648"/>
                      <path d="M132 152 L83 93 M134 123 L181 65 M132 184 L89 143 M134 163 L177 116" stroke="#b8d99a" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M128 215 Q103 222 87 216 M130 215 Q151 222 170 214" stroke="#a66b3d" strokeWidth="5" strokeLinecap="round" fill="none"/>
                      <circle cx="194" cy="45" r="16" fill="#fff7c2" opacity=".8"/>
                    </svg>
                  </div>
                  <div className="absolute left-4 top-5 rounded-full border border-white/80 bg-white/85 px-3 py-2 text-xs font-bold text-emerald-800 shadow-sm sm:left-6">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" /> Crop image ready
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl border border-white/80 bg-white/90 px-3 py-2.5 text-xs font-bold text-slate-700 shadow-lg">
                    <ScanSearch size={17} className="text-emerald-700" /> Guided analysis
                  </div>
                  <div className="pointer-events-none absolute inset-4 animate-pulse rounded-[1.2rem] border border-white/50" />
                </div>

                <div className="relative mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-white/80 p-3"><ImagePlus size={18} className="text-emerald-700" /><p className="mt-2 text-[11px] font-bold text-slate-700 sm:text-xs">Photo</p></div>
                  <div className="rounded-2xl bg-white/80 p-3"><MessageCircle size={18} className="text-sky-700" /><p className="mt-2 text-[11px] font-bold text-slate-700 sm:text-xs">Ask</p></div>
                  <div className="rounded-2xl bg-white/80 p-3"><Mic size={18} className="text-amber-700" /><p className="mt-2 text-[11px] font-bold text-slate-700 sm:text-xs">Speak</p></div>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 top-1/3 hidden animate-float items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-xl sm:flex">
              <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800"><Leaf size={20} /></div>
              <div><p className="text-xs font-extrabold text-slate-800">Crop-first guidance</p><p className="mt-0.5 text-[10px] text-slate-500">Simple, clear next steps</p></div>
            </div>
            <div className="absolute -right-2 bottom-12 hidden animate-float items-center gap-3 rounded-2xl border border-white bg-white/95 p-3 shadow-xl [animation-delay:700ms] sm:flex">
              <div className="rounded-xl bg-sky-100 p-2 text-sky-800"><CloudSun size={20} /></div>
              <div><p className="text-xs font-extrabold text-slate-800">Made for the field</p><p className="mt-0.5 text-[10px] text-slate-500">Mobile-friendly experience</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-emerald-900/10 bg-white/70">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-6 sm:px-8 md:grid-cols-4 md:px-12">
          {[
            [Languages, "Local-language first"],
            [Mic, "Voice-friendly access"],
            [ScanSearch, "Image-assisted checks"],
            [ShieldCheck, "Expert escalation"],
          ].map(([Icon, label]) => (
            <div key={label} className="flex items-center justify-center gap-3 text-sm font-bold text-[#315941]">
              <Icon size={19} className="shrink-0 text-emerald-700" /> {label}
            </div>
          ))}
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-28 lg:px-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[.22em] text-emerald-700">Support for real farm questions</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#173b2a] sm:text-4xl">{copy.featuresTitle}</h2>
          <p className="mt-4 leading-7 text-slate-600">{copy.featuresSubtitle}</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map(({ icon: Icon, color, title, body, tag }, index) => (
            <article key={title} className="group rounded-3xl border border-emerald-900/10 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-8" style={{ animationDelay: `${index * 120}ms` }}>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color} transition duration-300 group-hover:scale-110 group-hover:rotate-3`}><Icon size={26} /></div>
              <p className="mt-7 text-[10px] font-extrabold tracking-[.18em] text-emerald-700">{tag}</p>
              <h3 className="mt-2 text-xl font-extrabold text-[#1c422e]">{title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{body}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">Explore support <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative overflow-hidden bg-[#153e2a] py-20 text-white md:py-24">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[.22em] text-lime-300">Simple by design</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Help should feel easy to reach.</h2>
            <p className="mt-4 leading-7 text-emerald-50/75">Start with what you know. The assistant can ask for more details when they matter.</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.n} className="relative border-t border-white/20 pt-6">
                <span className="text-sm font-black tracking-[.18em] text-lime-300">{step.n}</span>
                <h3 className="mt-4 text-xl font-extrabold">{step.title}</h3>
                <p className="mt-3 leading-7 text-emerald-50/70">{step.text}</p>
                {index < steps.length - 1 && <ArrowRight className="absolute right-0 top-7 hidden text-white/30 md:block" size={22} />}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-white/[.07] p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-lime-300/15 p-3 text-lime-200"><Headphones size={26} /></div>
              <div><h3 className="text-lg font-extrabold">Not sure what to type?</h3><p className="mt-1 max-w-xl text-sm leading-6 text-emerald-50/70">Start a chat and use voice input where supported. Phone-call access can be added as a separate service.</p></div>
            </div>
            <button onClick={onStart} className="inline-flex shrink-0 items-center gap-2 rounded-full bg-lime-300 px-6 py-3 font-extrabold text-[#183c29] transition hover:-translate-y-0.5 hover:bg-lime-200">Start asking <ArrowRight size={17} /></button>
          </div>
        </div>
      </section>

      {/* Safety and CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 md:py-24 lg:px-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-gradient-to-br from-[#e4f4d8] via-[#f5fae9] to-[#e0f2e9] p-8 sm:p-12 lg:p-14">
          <div className="absolute -right-10 -top-16 opacity-[.08]"><Wheat size={250} /></div>
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold text-emerald-800"><CheckCircle2 size={15} /> Built to support, not replace, experts</div>
            <h2 className="mt-5 text-3xl font-black leading-tight text-[#173b2a] sm:text-4xl">Your next farming question has a place to start.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">AI-generated guidance can be incomplete or incorrect. Confirm pesticide choices, dosage and safety precautions against approved local guidance and a qualified agricultural officer.</p>
            <button onClick={onStart} className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#17633d] px-7 py-4 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#104b2e]">Get started <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <footer className="border-t border-emerald-900/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-800"><Sprout size={22} /></div>
            <div><p className="font-black tracking-tight text-[#173b2a]">DIGITAL KRISHI OFFICER</p><p className="mt-0.5 text-xs text-slate-500">Practical support for every growing season</p></div>
          </div>
          <p className="max-w-xl text-xs leading-5 text-slate-500">Agricultural guidance is informational. Diagnose carefully, follow product labels, and consult qualified local experts before treatment decisions.</p>
          <p className="text-xs font-semibold text-slate-400">© {new Date().getFullYear()} AGRIVERSE</p>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
