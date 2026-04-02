"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { SVGProps } from "react";
import {
  SITE_CONTENT_EVENT,
  cloneSiteContent,
  loadSiteContent,
  type SlideItem,
  type SiteContent,
} from "@/app/lib/site-content";

// ─── Constants ─────────────────────────────────────────────────────────────

const PRODUCTS_PER_BATCH = 6;

// ─── Root Component ────────────────────────────────────────────────────────

export default function HomeClient({
  initialSlides,
}: {
  initialSlides: SlideItem[];
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<SiteContent>(() => cloneSiteContent());
  const [slides, setSlides] = useState<SlideItem[]>(() =>
    initialSlides.length > 0 ? initialSlides : cloneSiteContent().slides,
  );
  const [currentBatch, setCurrentBatch] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);

  const fallbackContent = cloneSiteContent();
  const activeSlides = slides.length > 0 ? slides : fallbackContent.slides;
  const slidePages = chunkSlides(activeSlides, PRODUCTS_PER_BATCH);
  const safeCurrentBatch = slidePages.length
    ? Math.min(currentBatch, slidePages.length - 1)
    : 0;
  const activePage = slidePages[safeCurrentBatch] ?? slidePages[0] ?? [];
  const heroCard = activePage[0] ?? activeSlides[0];
  const brandLogo = content.brand.logoPath || fallbackContent.brand.logoPath;
  const activeBatchTitle =
    heroCard?.title?.trim() || `Batch ${safeCurrentBatch + 1}`;
  const activeBatchTag = heroCard?.tag?.trim() || "New post";
  const activeBatchUrl = heroCard?.url?.trim() || content.links.facebookUrl;
  const activeBatchCount = activePage.length;

  // Sync content from localStorage
  useEffect(() => {
    const syncContent = () => setContent(loadSiteContent());
    syncContent();
    window.addEventListener("storage", syncContent);
    window.addEventListener(SITE_CONTENT_EVENT, syncContent);
    return () => {
      window.removeEventListener("storage", syncContent);
      window.removeEventListener(SITE_CONTENT_EVENT, syncContent);
    };
  }, []);

  // Fetch slides from API
  useEffect(() => {
    let cancelled = false;
    async function syncSlides() {
      try {
        const response = await fetch("/api/posts", { method: "GET", cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as { slides?: SlideItem[] };
        if (!cancelled && Array.isArray(data.slides) && data.slides.length > 0) {
          setSlides(data.slides);
        }
      } catch { /* Keep server-rendered posts if API is unavailable */ }
    }
    void syncSlides();
    return () => { cancelled = true; };
  }, []);

  // Navbar scroll detection
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero stagger
      gsap.from(
        "[data-hero-badge],[data-hero-title],[data-hero-copy],[data-hero-actions],[data-hero-pills],[data-hero-stats]",
        { y: 30, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.09 }
      );
      gsap.from("[data-hero-card]", {
        y: 36, opacity: 0, scale: 0.97, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.18,
      });

      // Floating decor blobs
      gsap.to("[data-float='slow']", { y: 16, repeat: -1, yoyo: true, duration: 3, ease: "sine.inOut" });
      gsap.to("[data-float='medium']", { y: -14, repeat: -1, yoyo: true, duration: 2.5, ease: "sine.inOut" });

      // Scroll-triggered sections
      gsap.utils.toArray<HTMLElement>("[data-animate='section-heading']").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 84%" },
          y: 28, opacity: 0, duration: 0.75, ease: "power3.out",
        });
      });
      gsap.utils.toArray<HTMLElement>("[data-animate='card']").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          y: 22, opacity: 0, duration: 0.6, ease: "power3.out", delay: (i % 4) * 0.06,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance batch
  useEffect(() => {
    if (slidePages.length <= 1) return;
    const interval = window.setInterval(() => {
      setCurrentBatch((prev) => (prev + 1) % slidePages.length);
    }, 3500);
    return () => window.clearInterval(interval);
  }, [slidePages.length]);

  // Animate batch transition
  useEffect(() => {
    if (!slideRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(
      slideRef.current,
      { opacity: 0.5, scale: 0.983, y: 12 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, [currentBatch]);

  return (
    <main ref={rootRef} className="overflow-hidden">

      {/* ─── NAV ─────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-400 ${
          navScrolled
            ? "bg-[rgba(250,247,244,0.88)] backdrop-blur-xl border-b border-[#e8d5c0]/60 shadow-[0_8px_32px_-16px_rgba(74,45,31,0.18)]"
            : "bg-transparent"
        }`}
      >
        <div className="section-wrapper flex h-[4.25rem] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#deccba] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <Image src={brandLogo} alt={content.brand.name} fill unoptimized className="object-cover" />
            </div>
            <span className="font-display text-xl font-bold text-[#1c1310] tracking-tight">
              {content.brand.name}
            </span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6">
            {[
              { label: "New Drops", href: "#features" },
              { label: "Categories", href: "#collection" },
              { label: "How It Works", href: "#process" },
              { label: "Reviews", href: "#reviews" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-[#5c3d2a] hover:text-[#1c1310] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex badge-brand">
              {content.brand.announcement}
            </span>
            <a
              href={content.links.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-white"
              style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
            >
              <ShopBagIcon className="h-4 w-4" style={{ color: "#fff", WebkitTextFillColor: "#fff" }} />
              <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>Shop Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="relative pt-[4.25rem] overflow-hidden">
        {/* Background glow orbs */}
        <div className="glow-orb h-[32rem] w-[32rem] -top-24 -left-20 bg-[#d4847a]/20" />
        <div className="glow-orb h-[28rem] w-[28rem] top-0 right-[-8rem] bg-[#c4956a]/16" />
        <div className="glow-orb h-[22rem] w-[22rem] bottom-10 left-[20%] bg-[#e8a090]/12" />

        <div className="section-wrapper pt-10 pb-8 lg:pt-16 lg:pb-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">

            {/* Left – Copy */}
            <div className="max-w-[38rem]">
              <span
                data-hero-badge
                className="inline-flex items-center gap-2 rounded-full border border-[#deccba] bg-[#f5ede3] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7a4f35]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#c4956a] animate-pulse" />
                {content.hero.badge}
              </span>

              <h1
                data-hero-title
                className="mt-5 font-display font-extrabold text-[#1c1310] leading-[0.95] tracking-[-0.04em]"
                style={{ fontSize: "clamp(2.8rem, 6vw, 4.8rem)" }}
              >
                {content.hero.title}
              </h1>

              <p
                data-hero-copy
                className="mt-5 text-[1.05rem] leading-[1.85] text-[#5c3d2a]"
              >
                {content.hero.description}
              </p>

              {/* CTAs */}
              <div data-hero-actions className="mt-7 flex flex-wrap gap-3">
                <a
                  href={content.links.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}
                >
                  <ShopBagIcon className="h-4 w-4" style={{ color: "#fff", WebkitTextFillColor: "#fff" }} />
                  <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff" }}>{content.hero.primaryCta}</span>
                  <ChevronRightIcon className="h-4 w-4" style={{ color: "#fff", WebkitTextFillColor: "#fff" }} />
                </a>
                <a
                  href={content.links.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }}
                >
                  <MessengerIcon className="h-4 w-4" style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }} />
                  <span style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }}>{content.hero.secondaryCta}</span>
                </a>
              </div>

              {/* Pills */}
              <div data-hero-pills className="mt-5 flex flex-wrap gap-2">
                {content.hero.pills.map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-[#deccba] bg-white/70 px-3.5 py-1.5 text-[0.78rem] font-medium text-[#5c3d2a] backdrop-blur"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div data-hero-stats className="mt-6 grid grid-cols-3 gap-3">
                {content.hero.stats.map((stat) => (
                  <HeroStat key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>

            {/* Right – Product Carousel Card */}
            <div data-hero-card className="relative">
              {/* Decorative floating chips */}
              <div
                data-float="slow"
                className="absolute -top-6 -right-4 z-10 hidden rounded-[1.2rem] border border-[#deccba] bg-white/90 px-4 py-3 shadow-lg backdrop-blur lg:block"
              >
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#7a4f35]">Products live</p>
                <p className="font-display text-2xl font-bold text-[#1c1310]">{activeSlides.length}</p>
              </div>
              <div
                data-float="medium"
                className="absolute -bottom-5 -left-5 z-10 hidden rounded-[1.2rem] border border-[#deccba] bg-[#f5ede3]/90 px-4 py-3 shadow-lg backdrop-blur lg:block"
              >
                <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-[#7a4f35]">Est.</p>
                <p className="font-display text-2xl font-bold text-[#1c1310]">2020</p>
              </div>

              {/* Main card */}
              <div className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-white/80 p-4 shadow-[0_40px_100px_-50px_rgba(74,45,31,0.52)] backdrop-blur sm:p-5">
                {/* Card header */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="badge-live" style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#e8a090] animate-pulse" />
                      <span style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>{activeBatchTag}</span>
                    </span>
                    <span className="rounded-full border border-[#deccba] bg-[#f5ede3] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#7a4f35]">
                      Batch {safeCurrentBatch + 1}
                    </span>
                  </div>
                  {activeBatchUrl ? (
                    <a
                      href={activeBatchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#1c1310] px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5"
                      style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
                    >
                      <span style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>Open post</span>
                      <ChevronRightIcon className="h-3.5 w-3.5" style={{ color: "#fff", WebkitTextFillColor: "#fff" }} />
                    </a>
                  ) : null}
                </div>

                <p className="mb-3 font-display text-[1.65rem] font-bold leading-none text-[#1c1310]">
                  {activeBatchTitle}
                </p>
                <p className="mb-4 text-sm text-[#6e4d3a]">
                  Showing {activeBatchCount} of {activeSlides.length} items · tap any to view on Facebook
                </p>

                {/* Image grid */}
                <div ref={slideRef} className="rounded-[1.8rem] border border-white/80 bg-[#faf7f4]/60 p-3">
                  <div className="grid min-h-[22rem] grid-cols-2 gap-3 sm:grid-cols-3">
                    {activePage.map((slide, index) => {
                      const slideImage =
                        slide.image ||
                        fallbackContent.slides[index % fallbackContent.slides.length]?.image ||
                        brandLogo;
                      const slideTitle = slide.title.trim() || `Post ${index + 1}`;
                      const slideUrl = slide.url?.trim() || content.links.facebookUrl;
                      const isFeatured = index === 0;
                      const tileClass = isFeatured ? "col-span-2 row-span-2 sm:col-span-2" : "";

                      const tile = (
                        <>
                          <Image
                            src={slideImage}
                            alt={slideTitle}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(min-width: 1024px) 14rem, 48vw"
                          />
                          <div
                            className={`absolute inset-0 ${
                              isFeatured
                                ? "bg-gradient-to-t from-[#1c1310]/65 via-[#1c1310]/15 to-transparent"
                                : "bg-gradient-to-t from-[#1c1310]/42 via-transparent to-transparent"
                            }`}
                          />
                          <div className="absolute left-3 top-3">
                            <span className="rounded-full bg-white/92 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#7a4f35]">
                              {slide.tag?.trim() || "Find"}
                            </span>
                          </div>
                          {isFeatured && (
                            <div className="absolute inset-x-3 bottom-3 rounded-[1rem] border border-white/25 bg-white/14 p-3 text-white backdrop-blur-md">
                              <p className="font-display text-lg font-semibold leading-tight">{slideTitle}</p>
                            </div>
                          )}
                        </>
                      );

                      return slideUrl ? (
                        <a
                          key={`${slide.id ?? slideImage}-${index}`}
                          href={slideUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group relative min-h-[8rem] overflow-hidden rounded-[1.3rem] ${tileClass}`}
                        >
                          {tile}
                        </a>
                      ) : (
                        <div
                          key={`${slide.id ?? slideImage}-${index}`}
                          className={`group relative min-h-[8rem] overflow-hidden rounded-[1.3rem] ${tileClass}`}
                        >
                          {tile}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Batch nav dots */}
                <div className="mt-4 flex items-center justify-between gap-2">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#8a6a5a]">
                    Tap tile → open Facebook post
                  </p>
                  <div className="flex items-center gap-1.5">
                    {slidePages.map((_, idx) => (
                      <button
                        key={`page-${idx}`}
                        type="button"
                        onClick={() => setCurrentBatch(idx)}
                        aria-label={`Batch ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          safeCurrentBatch === idx
                            ? "w-6 bg-[#1c1310]"
                            : "w-2 bg-[#deccba] hover:bg-[#c4956a]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ───────────────────────────────────────────── */}
      <div className="border-y border-[#e8d5c0]/70 bg-[#f5ede3]/60 backdrop-blur">
        <div className="section-wrapper py-3.5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
            {[
              { icon: "🏷️", text: "Affordable Finds" },
              { icon: "✅", text: "Legit Seller" },
              { icon: "⚡", text: "Fast Replies" },
              { icon: "📦", text: "COD Available" },
              { icon: "🎁", text: "Bundle Deals" },
              { icon: "🔄", text: "Weekly Drops" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm font-medium text-[#5c3d2a]">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── PRODUCT MARQUEE ─────────────────────────────────────── */}
      <section id="features" className="section-wrapper py-14 lg:py-18 scroll-mt-20">
        <div data-animate="section-heading" className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <EyebrowLabel>New Drops</EyebrowLabel>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#1c1310] sm:text-5xl">
              Fresh finds, always dropping.
            </h2>
          </div>
          <a
            href={content.links.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline hidden sm:inline-flex"
            style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }}
          >
            <span style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }}>View all on Facebook</span>
            <ChevronRightIcon className="h-4 w-4" style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }} />
          </a>
        </div>

        <div className="space-y-4">
          <ProductMarquee
            slides={activeSlides}
            brandLogo={brandLogo}
            fallbackSlides={fallbackContent.slides}
            fallbackLink={content.links.facebookUrl}
          />
          <ProductMarquee
            slides={rotateSlides(activeSlides, Math.max(1, Math.floor(activeSlides.length / 2)))}
            brandLogo={brandLogo}
            fallbackSlides={fallbackContent.slides}
            fallbackLink={content.links.facebookUrl}
            reverse
          />
        </div>
      </section>

      {/* ─── CATEGORY GRID ───────────────────────────────────────── */}
      <section id="collection" className="scroll-mt-20">
        <div className="section-wrapper py-14 lg:py-18">
          <div data-animate="section-heading" className="mb-8">
            <EyebrowLabel>Shop by Category</EyebrowLabel>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#1c1310] sm:text-5xl">
              Find your next favorite piece.
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#6b4d3a]">
              From casual tops to statement jackets — curated drops organized so you can spot what you need instantly.
            </p>
          </div>

          <div className="grid gap-4 xl:grid-cols-12 xl:auto-rows-[14rem]">
            {content.categories.map((category, index) => {
              const catImage =
                category.image ||
                fallbackContent.categories[index]?.image ||
                brandLogo;

              const gradientPairs = [
                "from-[#e8a090]/40 to-[#f5ede3]/60",
                "from-[#c4956a]/35 to-[#f5ede3]/55",
                "from-[#d4847a]/35 to-[#faf0ea]/60",
                "from-[#7a4f35]/25 to-[#f0e4d8]/55",
                "from-[#e8d5c0]/50 to-[#fff8f2]/70",
              ];

              return (
                <article
                  key={`${category.title}-${index}`}
                  data-animate="card"
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_24px_64px_-40px_rgba(74,45,31,0.42)] transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_32px_80px_-36px_rgba(74,45,31,0.55)] ${category.layout}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradientPairs[index % gradientPairs.length]} opacity-90`} />
                  <div className="relative h-full overflow-hidden rounded-[1.6rem] m-3">
                    <Image
                      src={catImage}
                      alt={`${category.title} thrift finds`}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-600 group-hover:scale-108"
                      sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1310]/70 via-[#1c1310]/18 to-transparent" />

                    {/* Top badges */}
                    <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                      <span className="rounded-full bg-white/93 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#7a4f35] shadow-sm">
                        {category.badge}
                      </span>
                    </div>

                    {/* Bottom content */}
                    <div className="absolute inset-x-3.5 bottom-3.5 rounded-[1.25rem] border border-white/25 bg-white/14 p-4 text-white backdrop-blur-md">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <p className="font-display text-2xl font-bold leading-tight">{category.title}</p>
                          <p className="mt-1 text-[0.82rem] text-white/78 leading-snug">{category.text}</p>
                        </div>
                        <span className="shrink-0 rounded-full border border-white/35 bg-[#1c1310]/80 px-3 py-1 text-[0.7rem] font-bold text-white backdrop-blur">
                          {category.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────── */}
      <section id="process" className="scroll-mt-20">
        <div className="section-wrapper py-14 lg:py-18">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
            {/* Left – text */}
            <div>
              <div data-animate="section-heading">
                <EyebrowLabel>How It Works</EyebrowLabel>
                <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#1c1310] sm:text-5xl">
                  Simple steps to claim your haul.
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[#6b4d3a]">
                  Shop the way you already do on Facebook — fast, familiar, and fuss-free.
                </p>
              </div>

              <div
                data-animate="card"
                className="mt-7 overflow-hidden rounded-[2rem] border border-[#e8d5c0] bg-[linear-gradient(135deg,#f5ede3_0%,#faf0e8_100%)] p-6"
                style={{ boxShadow: "0 28px 70px -40px rgba(74,45,31,0.4)" }}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#7a4f35]">Built for mobile shoppers</p>
                <p className="mt-2 font-display text-2xl font-bold text-[#1c1310]">
                  Browse → Reserve → Checkout
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#6b4d3a]">
                  Every step is designed so that shoppers coming from Facebook can complete their claim in seconds.
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="badge-brand">No account needed</span>
                  <span className="badge-brand">Fast reply</span>
                </div>
              </div>
            </div>

            {/* Right – Steps */}
            <div className="space-y-4">
              {content.steps.map((step, index) => (
                <article
                  key={`${step.title}-${index}`}
                  data-animate="card"
                  className="relative overflow-hidden rounded-[1.8rem] border border-white/75 bg-white/80 p-5 backdrop-blur"
                  style={{ boxShadow: "0 22px 60px -38px rgba(74,45,31,0.38)" }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] bg-[#1c1310] shadow-lg">
                      <span className="font-display text-lg font-bold text-white" style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#1c1310]">{step.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#6b4d3a]">{step.text}</p>
                    </div>
                  </div>
                  {/* Step connector */}
                  {index < content.steps.length - 1 && (
                    <div className="absolute left-[2.4rem] -bottom-4 h-4 w-px bg-gradient-to-b from-[#deccba] to-transparent" />
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ────────────────────────────────────────── */}
      <section id="reviews" className="scroll-mt-20">
        <div className="section-wrapper py-14 lg:py-18">
          <div data-animate="section-heading" className="mb-10 text-center mx-auto max-w-2xl">
            <EyebrowLabel>Customer Love</EyebrowLabel>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#1c1310] sm:text-5xl">
              Happy shoppers, real finds.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#6b4d3a]">
              Curated picks, fast replies, and honest quality — straight from people who've already claimed their haul.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Testimonials */}
            <div className="space-y-4">
              {content.testimonials.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  data-animate="card"
                  className="rounded-[1.8rem] border border-[#e8d5c0] bg-[linear-gradient(155deg,#ffffff_0%,#faf0e8_100%)] p-6"
                  style={{ boxShadow: "0 18px 50px -34px rgba(74,45,31,0.35)" }}
                >
                  <div className="flex gap-1 text-[#d4847a]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <HeartIcon key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#5c3d2a]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#f5ede3] border border-[#deccba] flex items-center justify-center text-xs font-bold text-[#7a4f35]">
                      {item.name.charAt(0)}
                    </div>
                    <p className="text-sm font-semibold text-[#1c1310]">{item.name}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Trust signals + CTA */}
            <div className="space-y-4">
              <div
                data-animate="card"
                className="rounded-[1.8rem] border border-[#e8d5c0] bg-[linear-gradient(155deg,#fdf8f4_0%,#f5ede3_100%)] p-6"
                style={{ boxShadow: "0 18px 50px -34px rgba(74,45,31,0.35)" }}
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#7a4f35]">Why buyers trust us</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-[#1c1310]">
                  Stylish finds with less guesswork.
                </h3>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {content.trust.map((item) => (
                    <div
                      key={item}
                      data-animate="card"
                      className="flex items-center gap-3 rounded-[1.2rem] border border-white/80 bg-white/82 px-4 py-3"
                      style={{ boxShadow: "0 12px 32px -22px rgba(74,45,31,0.28)" }}
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5ede3]">
                        <CheckCircleIcon className="h-5 w-5 text-[#7a4f35]" />
                      </div>
                      <p className="text-sm font-semibold text-[#1c1310]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div
                data-animate="card"
                className="overflow-hidden rounded-[1.8rem] bg-[#1c1310] p-6 text-white"
                style={{ boxShadow: "0 28px 64px -32px rgba(28,19,16,0.65)" }}
              >
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#d4847a]/25 blur-3xl pointer-events-none" />
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-[#e8a090]">
                  Shopper favorite
                </p>
                <p className="mt-2 font-display text-2xl font-bold" style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>
                  Fast claims on fresh drops.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/80" style={{ color: "rgba(255,255,255,0.82)", WebkitTextFillColor: "rgba(255,255,255,0.82)" }}>
                  Follow the page and message fast — the best pieces go within hours.
                </p>
                <a
                  href={content.links.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/14 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                  style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
                >
                  <span style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>See latest drops</span>
                  <ChevronRightIcon className="h-4 w-4" style={{ color: "#fff", WebkitTextFillColor: "#fff" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────── */}
      <section id="contact" className="section-wrapper py-14 lg:py-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1c1310] px-8 py-12 text-white lg:px-14 lg:py-16"
          style={{ boxShadow: "0 40px 110px -50px rgba(28,19,16,0.8)" }}
        >
          {/* Glow blobs */}
          <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-[#d4847a]/30 blur-3xl pointer-events-none" />
          <div className="absolute right-0 top-8 h-72 w-72 rounded-full bg-[#c4956a]/18 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 h-40 w-64 -translate-x-1/2 rounded-full bg-[#e8a090]/15 blur-3xl pointer-events-none" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#e8a090]">
                {content.cta.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
                style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
              >
                {content.cta.title}
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/78"
                style={{ color: "rgba(255,255,255,0.78)", WebkitTextFillColor: "rgba(255,255,255,0.78)" }}
              >
                {content.cta.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href={content.links.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] min-w-[12rem] items-center justify-center gap-2.5 rounded-full bg-white px-7 text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fdf0e8] active:scale-95"
                style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310", boxShadow: "0 18px 42px -22px rgba(255,255,255,0.3)" }}
              >
                <ShopBagIcon className="h-4 w-4" style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }} />
                <span style={{ color: "#1c1310", WebkitTextFillColor: "#1c1310" }}>{content.cta.primaryCta}</span>
              </a>
              <a
                href={content.links.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3.25rem] min-w-[11rem] items-center justify-center gap-2.5 rounded-full border border-white/30 bg-white/12 px-7 text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/18 active:scale-95"
                style={{ color: "#fff", WebkitTextFillColor: "#fff" }}
              >
                <MessengerIcon className="h-4 w-4" style={{ color: "#fff", WebkitTextFillColor: "#fff" }} />
                <span style={{ color: "#fff", WebkitTextFillColor: "#fff" }}>{content.cta.secondaryCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ──────────────────────────────────────────────── */}
      <footer className="section-wrapper pb-10 pt-4">
        <div className="divider-fade mb-7" />
        <div className="flex flex-col gap-8 rounded-[2rem] border border-[#e8d5c0]/70 bg-white/65 px-6 py-7 backdrop-blur sm:flex-row sm:items-end sm:justify-between"
          style={{ boxShadow: "0 20px 55px -36px rgba(74,45,31,0.3)" }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-[#deccba] shadow-sm">
                <Image src={brandLogo} alt={content.brand.name} width={48} height={48} unoptimized className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-[#1c1310]">{content.brand.name}</p>
                <p className="text-xs text-[#7a5a48]">{content.brand.tagline}</p>
              </div>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#7a5a48]">
              {content.footer.text}
            </p>
            <p className="mt-2 text-xs text-[#a88f80]">Naga City, Camarines Sur · Est. 2020</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 sm:items-end">
            <a
              href={content.links.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1c1310] hover:text-[#7a4f35] transition-colors"
            >
              <FacebookIcon className="h-4 w-4" />
              <span>Stacy Thrifts on Facebook</span>
            </a>
            <a
              href={content.links.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#6b4d3a] hover:text-[#1c1310] transition-colors"
            >
              Message via Messenger
            </a>
            <Link href="/owner" className="text-sm font-semibold text-[#7a4f35] hover:text-[#1c1310] transition-colors">
              {content.footer.ownerLinkLabel}
            </Link>
            <p className="text-xs text-[#a88f80]">© {new Date().getFullYear()} Stacy Thrifts. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function chunkSlides(slides: SlideItem[], size: number) {
  if (slides.length === 0) return [];
  const pages: SlideItem[][] = [];
  for (let i = 0; i < slides.length; i += size) {
    pages.push(slides.slice(i, i + size));
  }
  return pages;
}

function rotateSlides(slides: SlideItem[], offset: number) {
  if (slides.length === 0) return [];
  const safe = offset % slides.length;
  return [...slides.slice(safe), ...slides.slice(0, safe)];
}

// ─── Product Marquee ───────────────────────────────────────────────────────

function ProductMarquee({
  slides,
  brandLogo,
  fallbackSlides,
  fallbackLink,
  reverse,
}: {
  slides: SlideItem[];
  brandLogo: string;
  fallbackSlides: SlideItem[];
  fallbackLink: string;
  reverse?: boolean;
}) {
  const source = slides.length > 0 ? slides : fallbackSlides;
  const loop = [...source, ...source];

  return (
    <div
      data-animate="card"
      className="overflow-hidden rounded-[2rem] border border-white/72 bg-white/68 p-3.5 backdrop-blur"
      style={{ boxShadow: "0 24px 70px -40px rgba(74,45,31,0.35)" }}
    >
      <div className={`marquee-track ${reverse ? "marquee-track--reverse" : "marquee-track--forward"}`}>
        {loop.map((slide, index) => {
          const img =
            slide.image ||
            fallbackSlides[index % fallbackSlides.length]?.image ||
            brandLogo;
          const title = slide.title.trim() || `Post ${index + 1}`;
          const url = slide.url?.trim() || fallbackLink;

          const card = (
            <>
              <div className="relative h-[13rem] overflow-hidden rounded-[1.35rem]">
                <Image
                  src={img}
                  alt={title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-106"
                  sizes="240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1310]/55 via-transparent to-transparent" />
                <div className="absolute left-2.5 top-2.5">
                  <span className="rounded-full bg-white/93 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#7a4f35]">
                    {slide.tag?.trim() || "Find"}
                  </span>
                </div>
                <div className="absolute inset-x-2.5 bottom-2.5 rounded-[0.95rem] border border-white/25 bg-white/16 p-2.5 text-white backdrop-blur-md">
                  <p className="font-display text-base font-semibold leading-tight">{title}</p>
                </div>
              </div>
            </>
          );

          if (url) {
            return (
              <a
                key={`${slide.id ?? img}-${index}-${reverse ? "r" : "f"}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group marquee-card"
              >
                {card}
              </a>
            );
          }

          return (
            <div
              key={`${slide.id ?? img}-${index}-${reverse ? "r" : "f"}`}
              className="group marquee-card"
            >
              {card}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Small Components ──────────────────────────────────────────────────────

function EyebrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-[#7a4f35]">
      <span className="h-px w-5 bg-[#c4956a] rounded-full" />
      {children}
    </p>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div
      className="rounded-[1.4rem] border border-[#e8d5c0] bg-white/80 px-4 py-4 backdrop-blur"
      style={{ boxShadow: "0 16px 42px -28px rgba(74,45,31,0.32)" }}
    >
      <p className="stat-value font-display text-3xl font-bold">{value}</p>
      <p className="mt-1.5 text-[0.78rem] leading-snug text-[#6b4d3a]">{label}</p>
    </div>
  );
}

// ─── Icon Components ───────────────────────────────────────────────────────

function ShopBagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function MessengerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 18.5V20l2.8-1.4H12c4.4 0 8-2.9 8-6.8S16.4 5 12 5 4 7.9 4 11.8c0 2.5 1.4 4.7 3.6 5.9" />
      <path d="m12 10.1.7-.8a1.8 1.8 0 0 1 2.6 0c.8.8.8 2 0 2.8L12 15l-3.3-2.9a2 2 0 0 1 0-2.8 1.8 1.8 0 0 1 2.6 0l.7.8Z" />
    </svg>
  );
}

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function CheckCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 20.4-1.2-1C5.2 14.2 2 11.3 2 7.8A4.8 4.8 0 0 1 6.8 3c2 0 3.2 1.1 4.2 2.4C12 4.1 13.2 3 15.2 3A4.8 4.8 0 0 1 20 7.8c0 3.5-3.2 6.4-8.8 11.6l-1.2 1Z" />
    </svg>
  );
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
