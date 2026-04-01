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
  type FeatureItem,
  type SiteContent,
} from "@/app/lib/site-content";

const gradients = [
  "from-[#ffe5e8] via-[#fff8f5] to-[#ffd7ce]",
  "from-[#fff2e8] via-[#fff9f4] to-[#f6d9d1]",
  "from-[#fbe2dd] via-[#fff9f6] to-[#f1e1d4]",
  "from-[#f4e4db] via-[#fffaf8] to-[#ffdfe5]",
  "from-[#ffe7d8] via-[#fff8f3] to-[#f5d7db]",
];

const whiteButtonTextStyle = {
  color: "#ffffff",
  WebkitTextFillColor: "#ffffff",
} as const;

const darkButtonTextStyle = {
  color: "#2d1d21",
  WebkitTextFillColor: "#2d1d21",
} as const;

const featureIcons: Record<FeatureItem["icon"], typeof TagIcon> = {
  tag: TagIcon,
  sparkles: SparklesIcon,
  stack: StackIcon,
  chat: ChatIcon,
};

export default function HomeClient() {
  const rootRef = useRef<HTMLElement | null>(null);
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [content, setContent] = useState<SiteContent>(() => cloneSiteContent());
  const [currentSlide, setCurrentSlide] = useState(0);

  const fallbackContent = cloneSiteContent();
  const slides = content.slides.length > 0 ? content.slides : fallbackContent.slides;
  const safeCurrentSlide = slides.length
    ? Math.min(currentSlide, slides.length - 1)
    : 0;
  const activeSlide = slides[safeCurrentSlide] ?? slides[0];
  const brandLogo = content.brand.logoPath || fallbackContent.brand.logoPath;
  const activeSlideImage =
    activeSlide.image ||
    fallbackContent.slides[safeCurrentSlide]?.image ||
    brandLogo;

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

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(
        "[data-hero-badge], [data-hero-title], [data-hero-copy], [data-hero-actions], [data-hero-pills], [data-hero-stats]",
        {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        },
      );

      gsap.from("[data-hero-card]", {
        y: 34,
        opacity: 0,
        scale: 0.96,
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.15,
      });

      gsap.to("[data-float='slow']", {
        y: 14,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "sine.inOut",
      });

      gsap.to("[data-float='medium']", {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 2.3,
        ease: "sine.inOut",
      });

      gsap.utils
        .toArray<HTMLElement>("[data-animate='section-heading']")
        .forEach((element) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
            y: 26,
            opacity: 0,
            duration: 0.75,
            ease: "power3.out",
          });
        });

      gsap.utils
        .toArray<HTMLElement>("[data-animate='card']")
        .forEach((element, index) => {
          gsap.from(element, {
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
            },
            y: 24,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
            delay: index % 4 === 0 ? 0 : 0.05,
          });
        });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    if (!slideRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      slideRef.current,
      { opacity: 0.55, scale: 0.985, y: 14 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      },
    );
  }, [currentSlide]);

  return (
    <main ref={rootRef} className="overflow-hidden">
      <div className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top_left,rgba(242,186,195,0.34),transparent_38%),radial-gradient(circle_at_top_right,rgba(255,216,202,0.38),transparent_34%)]" />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8 lg:pb-16">
          <section className="relative overflow-hidden rounded-[2.7rem] border border-white/65 bg-[linear-gradient(135deg,#fff8fa_0%,#fff7f1_46%,#fff0eb_100%)] p-4 shadow-[0_40px_110px_-48px_rgba(127,74,87,0.6)] sm:p-6 lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,186,195,0.28),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(255,216,202,0.34),transparent_28%)]" />
            <div className="relative rounded-[2rem] border border-white/75 bg-white/74 px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="overflow-hidden rounded-full border border-[#f1d8dc] bg-white p-1 shadow-sm">
                    <Image
                      src={brandLogo}
                      alt={`${content.brand.name} logo`}
                      width={48}
                      height={48}
                      unoptimized
                      className="h-12 w-12 rounded-full object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <p className="font-display text-xl text-[#7a4f57]">
                      {content.brand.name}
                    </p>
                    <p className="text-sm text-[#6c575b]">{content.brand.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden rounded-full border border-[#f0d9d8] bg-white/85 px-4 py-2 text-sm font-medium text-[#7b6468] sm:inline-flex">
                    {content.brand.announcement}
                  </span>
                  <a
                    href={content.links.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 min-w-[9.75rem] items-center justify-center gap-2 rounded-full bg-[#3a242a] px-6 text-sm font-extrabold leading-none tracking-[0.02em] whitespace-nowrap shadow-[0_18px_38px_-24px_rgba(45,29,33,0.58)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5 hover:bg-[#4a2d35]"
                    style={whiteButtonTextStyle}
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-[#ffd8ca]" />
                    <span className="relative" style={whiteButtonTextStyle}>
                      Shop now
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative mt-6 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
              <div className="max-w-2xl">
                <span
                  data-hero-badge
                  className="inline-flex items-center gap-2 rounded-full border border-[#f2cfd4] bg-white/88 px-4 py-2 text-sm font-semibold text-[#b35c6c] shadow-[0_18px_42px_-28px_rgba(179,92,108,0.35)] backdrop-blur"
                >
                  {content.hero.badge}
                  <span className="text-base">✦</span>
                </span>
                <h1
                  data-hero-title
                  className="mt-5 max-w-3xl font-display text-5xl leading-[0.92] tracking-[-0.04em] text-[#2d1d21] sm:text-[5rem] lg:text-[5.15rem]"
                >
                  {content.hero.title}
                </h1>
                <p
                  data-hero-copy
                  className="mt-4 max-w-xl text-lg leading-8 text-[#5d494d] sm:text-[1.15rem]"
                >
                  {content.hero.description}
                </p>
                <div
                  data-hero-actions
                  className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
                >
                  <a
                    href={content.links.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-14 min-w-[13rem] items-center justify-center gap-3 rounded-full bg-[#2d1d21] px-8 text-[0.98rem] font-bold tracking-[0.01em] whitespace-nowrap shadow-[0_24px_60px_-25px_rgba(45,29,33,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#42292f]"
                    style={whiteButtonTextStyle}
                  >
                    <ShopIcon className="h-4 w-4" style={whiteButtonTextStyle} />
                    <span style={whiteButtonTextStyle}>{content.hero.primaryCta}</span>
                    <ArrowRightIcon
                      className="h-4 w-4"
                      style={whiteButtonTextStyle}
                    />
                  </a>
                  <a
                    href={content.links.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-14 min-w-[11.5rem] items-center justify-center gap-3 rounded-full border border-[#e0b7c0] bg-white px-7 text-[0.98rem] font-bold tracking-[0.01em] whitespace-nowrap shadow-[0_24px_60px_-35px_rgba(124,81,89,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-[#dca6b1] hover:bg-[#fff7f5]"
                    style={darkButtonTextStyle}
                  >
                    <ChatIcon className="h-5 w-5" style={darkButtonTextStyle} />
                    <span style={darkButtonTextStyle}>
                      {content.hero.secondaryCta}
                    </span>
                  </a>
                </div>
                <div data-hero-pills className="mt-6 flex flex-wrap gap-3">
                  {content.hero.pills.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/80 bg-white/78 px-4 py-2 text-sm font-medium text-[#6c575b] shadow-[0_18px_42px_-30px_rgba(117,78,87,0.34)] backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div
                  data-hero-stats
                  className="mt-7 grid max-w-xl gap-4 sm:grid-cols-3"
                >
                  {content.hero.stats.map((stat) => (
                    <Stat
                      key={`${stat.value}-${stat.label}`}
                      value={stat.value}
                      label={stat.label}
                    />
                  ))}
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-[42rem]">
                <div
                  data-hero-card
                  className="rounded-[2.4rem] border border-white/75 bg-white/78 p-4 shadow-[0_36px_100px_-46px_rgba(119,76,88,0.56)] backdrop-blur sm:p-5"
                >
                  <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
                    <div
                      ref={slideRef}
                      className="relative min-h-[27rem] overflow-hidden rounded-[2rem]"
                    >
                      <Image
                        key={activeSlide.image}
                        src={activeSlideImage}
                        alt={activeSlide.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(min-width: 1024px) 28rem, 100vw"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,29,33,0.04)_0%,rgba(45,29,33,0.14)_38%,rgba(45,29,33,0.62)_100%)]" />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#9f6470]">
                          {activeSlide.tag}
                        </span>
                        <span className="rounded-full border border-white/45 bg-white/12 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                          Slide {safeCurrentSlide + 1}
                        </span>
                      </div>
                      <div className="absolute inset-x-4 bottom-4 rounded-[1.6rem] border border-white/30 bg-white/15 p-4 text-white shadow-lg backdrop-blur-md">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                          Stacy Thrifts product slideshow
                        </p>
                        <p className="mt-2 font-display text-3xl leading-none">
                          {activeSlide.title}
                        </p>
                        <p className="mt-2 text-sm text-white/82">
                          Browse all posted products in one swipe-style preview
                          before you message to reserve.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="rounded-[1.6rem] border border-white/75 bg-white/90 px-4 py-3 text-[#6f5d61] shadow-[0_18px_44px_-32px_rgba(45,29,33,0.28)]">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#a36a75]">
                          All products
                        </p>
                        <p className="mt-2 font-display text-3xl text-[#2d1d21]">
                          {slides.length}
                        </p>
                        <p className="mt-1 text-sm">Auto-playing preview</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {slides.map((slide, index) => {
                          const slideImage =
                            slide.image ||
                            fallbackContent.slides[index]?.image ||
                            brandLogo;

                          return (
                          <button
                            key={`${slideImage}-${index}`}
                            type="button"
                            onClick={() => setCurrentSlide(index)}
                            className={`relative h-24 overflow-hidden rounded-[1.2rem] border transition-all duration-300 ${
                              safeCurrentSlide === index
                                ? "border-[#2d1d21] ring-2 ring-[#2d1d21]/20"
                                : "border-white/80 hover:border-[#cfa3ab]"
                            }`}
                            aria-label={`Show ${slide.title}`}
                          >
                            <Image
                              src={slideImage}
                              alt={slide.title}
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="120px"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,29,33,0.02)_0%,rgba(45,29,33,0.46)_100%)]" />
                            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#8f5f67]">
                              {index + 1}
                            </span>
                          </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  data-hero-card
                  data-float="medium"
                  className="absolute -left-4 top-28 rounded-[1.35rem] border border-white/70 bg-white/88 px-4 py-4 text-[#51434a] shadow-[0_24px_56px_-34px_rgba(45,29,33,0.42)] backdrop-blur"
                >
                  <p className="text-sm font-semibold">Shopper reactions</p>
                  <p className="mt-2 text-lg">😍 💖 ✨ 🫶</p>
                  <p className="mt-2 inline-flex rounded-full bg-[#2d1d21] px-3 py-1 text-xs font-semibold text-white">
                    Love these finds
                  </p>
                </div>

                <div
                  data-hero-card
                  data-float="slow"
                  className="absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3 py-2 shadow-[0_18px_42px_-26px_rgba(45,29,33,0.35)] backdrop-blur"
                >
                  {slides.slice(0, 3).map((slide, index) => {
                    const slideImage =
                      slide.image ||
                      fallbackContent.slides[index]?.image ||
                      brandLogo;

                    return (
                    <div
                      key={`${slideImage}-avatar`}
                      className={`relative h-10 w-10 overflow-hidden rounded-full border-2 border-white ${
                        index > 0 ? "-ml-3" : ""
                      }`}
                    >
                      <Image
                        src={slideImage}
                        alt={slide.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    );
                  })}
                  <span className="pl-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b6468]">
                    New favorites
                  </span>
                </div>

                <div
                  data-hero-card
                  className="absolute bottom-10 right-4 rounded-[1.45rem] border border-white/70 bg-[#2d1d21] px-4 py-4 text-white shadow-[0_24px_60px_-34px_rgba(45,29,33,0.62)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f2c6cf]">
                    Bundle deal
                  </p>
                  <p className="mt-2 font-display text-3xl leading-none">
                    3 for less
                  </p>
                  <p className="mt-2 text-sm text-white/78">
                    Cute picks that still fit the budget.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Section
        id="features"
        eyebrow="Why shop with us"
        title="Small-business warmth with a real fashion-brand feel."
        text="The layout gives shoppers clear reasons to trust the shop, browse more, and tap through to Facebook."
      >
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {content.features.map((item) => {
            const Icon = featureIcons[item.icon];

            return (
              <article
                key={item.title}
                data-animate="card"
                className="group rounded-[2rem] border border-white/75 bg-white/75 p-6 shadow-[0_24px_70px_-42px_rgba(124,76,88,0.46)] backdrop-blur transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(145deg,#fff2ed_0%,#f8d9df_100%)] text-[#8f5f67] shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#2d1d21]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#625054]">{item.text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section
        id="collection"
        eyebrow="Featured categories"
        title="A fashion-first category grid that feels like a real drop preview."
        text="Instead of tiny equal cards, the products now sit in an editorial layout that feels closer to how shoppers browse and claim what they love."
        card
      >
        <div className="mt-8 grid gap-5 xl:grid-cols-12 xl:auto-rows-[15rem]">
          {content.categories.map((category, index) => {
            const categoryImage =
              category.image ||
              fallbackContent.categories[index]?.image ||
              brandLogo;

            return (
            <article
              key={`${category.title}-${index}`}
              data-animate="card"
              className={`group relative overflow-hidden rounded-[2.2rem] border border-white/80 bg-white/88 p-3 shadow-[0_28px_80px_-45px_rgba(120,74,84,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_34px_95px_-42px_rgba(120,74,84,0.6)] ${category.layout}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-80`}
              />
              <div className="relative h-full overflow-hidden rounded-[1.8rem]">
                <Image
                  src={categoryImage}
                  alt={`${category.title} sample product`}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 48vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,250,247,0.08)_0%,rgba(45,29,33,0.12)_34%,rgba(45,29,33,0.68)_100%)]" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="inline-flex rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#8f5f67] shadow-sm">
                    {category.badge}
                  </span>
                  <span className="inline-flex rounded-full border border-white/45 bg-white/15 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur">
                    Curated
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/30 bg-white/15 p-4 text-white shadow-lg backdrop-blur-md">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-3xl leading-none">
                        {category.title}
                      </p>
                      <p className="mt-2 text-sm text-white/78">{category.text}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#2d1d21] px-3 py-1 text-xs font-semibold text-white">
                      {category.price}
                    </span>
                  </div>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </Section>

      <section
        id="process"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <Header
              eyebrow="How it works"
              title="Simple steps that match how Facebook buyers already shop."
              text="The process is direct, low-friction, and familiar, which helps first-time visitors convert faster."
            />
            <div className="mt-6 rounded-[2rem] border border-[#f0d9d8] bg-[linear-gradient(160deg,#fffdfa_0%,#fff1eb_100%)] p-6 shadow-[0_28px_70px_-40px_rgba(120,74,84,0.42)]">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f67]">
                Built for mobile
              </p>
              <p className="mt-3 font-display text-3xl text-[#2d1d21]">
                Scroll, reserve, checkout.
              </p>
              <p className="mt-3 text-base leading-7 text-[#5f4b4f]">
                Every section keeps the next action obvious for shoppers coming
                from Facebook and Messenger.
              </p>
            </div>
          </div>
          <div className="grid gap-5">
            {content.steps.map((step, index) => (
              <article
                key={`${step.title}-${index}`}
                data-animate="card"
                className="relative overflow-hidden rounded-[2rem] border border-white/75 bg-white/80 p-6 shadow-[0_24px_70px_-42px_rgba(124,76,88,0.44)] backdrop-blur"
              >
                <div className="absolute inset-y-6 left-[2.65rem] hidden w-px bg-[linear-gradient(180deg,rgba(214,157,168,0)_0%,rgba(214,157,168,0.6)_50%,rgba(214,157,168,0)_100%)] md:block" />
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.3rem] bg-[#2d1d21] font-display text-2xl text-white shadow-lg">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2d1d21]">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#625054]">
                      {step.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="reviews"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2.5rem] border border-white/70 bg-white/75 p-6 shadow-[0_30px_90px_-45px_rgba(127,76,88,0.48)] backdrop-blur sm:p-8">
            <Header
              eyebrow="Social proof"
              title="Trust signals that make the first message easier."
              text="Shoppers want cute finds, but they also want reassurance. This section keeps both front and center."
            />
            <div className="mt-6 grid gap-4">
              {content.testimonials.map((item, index) => (
                <article
                  key={`${item.name}-${index}`}
                  data-animate="card"
                  className="rounded-[1.8rem] border border-[#f2dedb] bg-[linear-gradient(160deg,#fffdfc_0%,#fff3ee_100%)] p-5 shadow-[0_18px_50px_-38px_rgba(118,70,80,0.38)]"
                >
                  <div className="flex gap-1 text-[#d78697]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <HeartIcon key={starIndex} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#5f4b4f]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-[#2d1d21]">
                    {item.name}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-[#f0d9d8] bg-[linear-gradient(180deg,#fff7f3_0%,#fff1ec_100%)] p-6 shadow-[0_30px_90px_-45px_rgba(127,76,88,0.45)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f67]">
              Why buyers trust it
            </p>
            <h2 className="mt-3 font-display text-4xl tracking-tight text-[#2d1d21]">
              Stylish finds with less guesswork.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#5e4a4e]">
              Clear trust cues help visitors move straight to Facebook or
              Messenger with confidence.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {content.trust.map((item) => (
                <div
                  key={item}
                  data-animate="card"
                  className="rounded-[1.6rem] border border-white/75 bg-white/80 px-4 py-4 shadow-[0_18px_45px_-32px_rgba(110,70,79,0.38)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffe8df] text-[#8f5f67]">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                    <p className="font-semibold text-[#2d1d21]">{item}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-[2rem] bg-[#2d1d21] px-5 py-6 text-white shadow-[0_28px_70px_-35px_rgba(45,29,33,0.65)]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#f2c6cf]">
                Shopper favorite
              </p>
              <p className="mt-2 font-display text-3xl">
                Fast claims on fresh drops
              </p>
              <p className="mt-3 text-sm leading-7 text-white/80">
                Keep the next step simple so impulse shoppers do not drop off
                before messaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="relative overflow-hidden rounded-[2.8rem] bg-[#2d1d21] px-6 py-10 text-white shadow-[0_36px_110px_-50px_rgba(45,29,33,0.8)] sm:px-8 lg:px-12 lg:py-14">
          <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-[#d78697]/35 blur-3xl" />
          <div className="absolute right-0 top-10 h-48 w-48 rounded-full bg-[#ffd8ca]/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c6cf]">
                {content.cta.eyebrow}
              </p>
              <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl">
                {content.cta.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                {content.cta.description}
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
              <a
                href={content.links.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 min-w-[13rem] items-center justify-center gap-3 rounded-full bg-white px-7 text-[0.98rem] font-extrabold tracking-[0.01em] whitespace-nowrap shadow-[0_18px_42px_-28px_rgba(255,255,255,0.28)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:bg-[#fff1f4]"
                style={darkButtonTextStyle}
              >
                <ShopIcon className="h-5 w-5" style={darkButtonTextStyle} />
                <span style={darkButtonTextStyle}>{content.cta.primaryCta}</span>
              </a>
              <a
                href={content.links.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 min-w-[11.5rem] items-center justify-center gap-3 rounded-full border border-white/35 bg-white/12 px-7 text-[0.98rem] font-extrabold tracking-[0.01em] whitespace-nowrap shadow-[0_20px_45px_-30px_rgba(0,0,0,0.4)] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15"
                style={whiteButtonTextStyle}
              >
                <ChatIcon className="h-5 w-5" style={whiteButtonTextStyle} />
                <span style={whiteButtonTextStyle}>{content.cta.secondaryCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-2 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-[2rem] border border-white/70 bg-white/70 px-6 py-6 shadow-[0_24px_70px_-45px_rgba(127,76,88,0.45)] backdrop-blur sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="overflow-hidden rounded-full border border-[#f1d8dc] bg-white p-1 shadow-sm">
                <Image
                  src={brandLogo}
                  alt={`${content.brand.name} logo`}
                  width={52}
                  height={52}
                  unoptimized
                  className="h-[3.25rem] w-[3.25rem] rounded-full object-cover"
                />
              </div>
              <p className="font-display text-3xl text-[#2d1d21]">
                {content.brand.name}
              </p>
            </div>
            <p className="mt-2 max-w-md text-sm leading-7 text-[#645055]">
              {content.footer.text}
            </p>
          </div>
          <div className="space-y-2 text-sm text-[#645055] sm:text-right">
            <a
              href={content.links.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-semibold text-[#2d1d21]"
            >
              Facebook shop
            </a>
            <a
              href={content.links.messengerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              Message via Messenger
            </a>
            <Link href="/owner" className="block font-semibold text-[#7a4f57]">
              {content.footer.ownerLinkLabel}
            </Link>
            <p>
              Open for reservations, bundle inquiries, and new drop updates.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  text,
  card,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text: string;
  card?: boolean;
  children: React.ReactNode;
}) {
  const body = (
    <>
      <Header eyebrow={eyebrow} title={title} text={text} />
      {children}
    </>
  );

  return (
    <section
      id={id}
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
    >
      {card ? (
        <div className="rounded-[2.5rem] border border-white/70 bg-white/70 px-5 py-8 shadow-[0_30px_90px_-45px_rgba(127,76,88,0.48)] backdrop-blur sm:px-8 lg:px-10">
          {body}
        </div>
      ) : (
        body
      )}
    </section>
  );
}

function Header({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div data-animate="section-heading" className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f67]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-4xl tracking-tight text-[#2d1d21] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-8 text-[#5f4b4f] sm:text-lg">{text}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.6rem] border border-[#f1dfda] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,245,241,0.9)_100%)] px-4 py-4 shadow-[0_22px_55px_-35px_rgba(118,70,80,0.42)]">
      <p className="font-display text-3xl text-[#2d1d21]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#69555a]">{label}</p>
    </div>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function ShopIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 9.5 4.5 5h15L21 9.5" />
      <path d="M4 10v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M9 14h6" />
    </svg>
  );
}

function SparklesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" />
      <path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" />
      <path d="m5 14 .9 2.1L8 17l-2.1.9L5 20l-.9-2.1L2 17l2.1-.9L5 14Z" />
    </svg>
  );
}

function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 18.5V20l2.8-1.4H12c4.4 0 8-2.9 8-6.8S16.4 5 12 5 4 7.9 4 11.8c0 2.5 1.4 4.7 3.6 5.9" />
      <path d="m12 10.1.7-.8a1.8 1.8 0 0 1 2.6 0c.8.8.8 2 0 2.8L12 15l-3.3-2.9a2 2 0 0 1 0-2.8 1.8 1.8 0 0 1 2.6 0l.7.8Z" />
    </svg>
  );
}

function StackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3 4 7l8 4 8-4-8-4Z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </svg>
  );
}

function TagIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 3H5a2 2 0 0 0-2 2v5l10.6 10.6a2 2 0 0 0 2.8 0l4.2-4.2a2 2 0 0 0 0-2.8L10 3Z" />
      <circle cx="7.5" cy="7.5" r="1.2" />
    </svg>
  );
}

function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m5 12 4.2 4.2L19 6.5" />
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
