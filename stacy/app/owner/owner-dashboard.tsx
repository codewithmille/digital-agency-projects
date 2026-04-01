"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  availableImageOptions,
  cloneSiteContent,
  defaultSiteContent,
  getOwnerPassword,
  isOwnerSessionActive,
  loadSiteContent,
  resetSiteContent,
  saveOwnerPassword,
  saveSiteContent,
  setOwnerSessionActive,
  type CategoryItem,
  type FeatureItem,
  type HeroStat,
  type SiteContent,
  type SlideItem,
  type StepItem,
  type TestimonialItem,
} from "@/app/lib/site-content";

const ownerSections = [
  { id: "brand-links", label: "Brand" },
  { id: "hero", label: "Hero" },
  { id: "slideshow", label: "Slides" },
  { id: "features", label: "Features" },
  { id: "categories", label: "Categories" },
  { id: "story", label: "Story" },
  { id: "cta-footer", label: "CTA" },
  { id: "password", label: "Password" },
] as const;

export default function OwnerDashboard() {
  const [hydrated, setHydrated] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(cloneSiteContent());
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("");
  const [focusedSection, setFocusedSection] =
    useState<(typeof ownerSections)[number]["id"]>("brand-links");
  const [showAllSections, setShowAllSections] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setContent(loadSiteContent());
      setAuthenticated(isOwnerSessionActive());
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function updateBrand<K extends keyof SiteContent["brand"]>(
    key: K,
    value: SiteContent["brand"][K],
  ) {
    setContent((current) => ({
      ...current,
      brand: {
        ...current.brand,
        [key]: value,
      },
    }));
  }

  function updateLinks<K extends keyof SiteContent["links"]>(
    key: K,
    value: SiteContent["links"][K],
  ) {
    setContent((current) => ({
      ...current,
      links: {
        ...current.links,
        [key]: value,
      },
    }));
  }

  function updateHero<K extends keyof SiteContent["hero"]>(
    key: K,
    value: SiteContent["hero"][K],
  ) {
    setContent((current) => ({
      ...current,
      hero: {
        ...current.hero,
        [key]: value,
      },
    }));
  }

  function updateCta<K extends keyof SiteContent["cta"]>(
    key: K,
    value: SiteContent["cta"][K],
  ) {
    setContent((current) => ({
      ...current,
      cta: {
        ...current.cta,
        [key]: value,
      },
    }));
  }

  function updateFooter<K extends keyof SiteContent["footer"]>(
    key: K,
    value: SiteContent["footer"][K],
  ) {
    setContent((current) => ({
      ...current,
      footer: {
        ...current.footer,
        [key]: value,
      },
    }));
  }

  function updateHeroPill(index: number, value: string) {
    setContent((current) => {
      const pills = [...current.hero.pills];
      pills[index] = value;
      return {
        ...current,
        hero: {
          ...current.hero,
          pills,
        },
      };
    });
  }

  function updateHeroStat(
    index: number,
    key: keyof HeroStat,
    value: string,
  ) {
    setContent((current) => {
      const stats = [...current.hero.stats];
      stats[index] = {
        ...stats[index],
        [key]: value,
      };
      return {
        ...current,
        hero: {
          ...current.hero,
          stats,
        },
      };
    });
  }

  function updateFeature(
    index: number,
    key: keyof Omit<FeatureItem, "icon">,
    value: string,
  ) {
    setContent((current) => {
      const features = [...current.features];
      features[index] = {
        ...features[index],
        [key]: value,
      };
      return {
        ...current,
        features,
      };
    });
  }

  function updateSlide(index: number, key: keyof SlideItem, value: string) {
    setContent((current) => {
      const slides = [...current.slides];
      slides[index] = {
        ...slides[index],
        [key]: value,
      };
      return {
        ...current,
        slides,
      };
    });
  }

  function updateCategory(
    index: number,
    key: keyof CategoryItem,
    value: string,
  ) {
    setContent((current) => {
      const categories = [...current.categories];
      categories[index] = {
        ...categories[index],
        [key]: value,
      };
      return {
        ...current,
        categories,
      };
    });
  }

  function updateStep(index: number, key: keyof StepItem, value: string) {
    setContent((current) => {
      const steps = [...current.steps];
      steps[index] = {
        ...steps[index],
        [key]: value,
      };
      return {
        ...current,
        steps,
      };
    });
  }

  function updateTestimonial(
    index: number,
    key: keyof TestimonialItem,
    value: string,
  ) {
    setContent((current) => {
      const testimonials = [...current.testimonials];
      testimonials[index] = {
        ...testimonials[index],
        [key]: value,
      };
      return {
        ...current,
        testimonials,
      };
    });
  }

  function updateTrust(index: number, value: string) {
    setContent((current) => {
      const trust = [...current.trust];
      trust[index] = value;
      return {
        ...current,
        trust,
      };
    });
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== getOwnerPassword()) {
      setStatus("Wrong password. Try again.");
      return;
    }

    setOwnerSessionActive(true);
    setAuthenticated(true);
    setPassword("");
    setStatus("Owner access unlocked.");
  }

  function handleSave() {
    saveSiteContent(content);
    setStatus("Changes saved. Open the homepage preview to see them.");
  }

  function handleReset() {
    if (!window.confirm("Reset all homepage content back to the default design?")) {
      return;
    }

    resetSiteContent();
    setContent(cloneSiteContent(defaultSiteContent));
    setStatus("Homepage content reset to defaults.");
  }

  function handleLogout() {
    setOwnerSessionActive(false);
    setAuthenticated(false);
    setStatus("Logged out.");
  }

  function handlePasswordChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword.trim().length < 6) {
      setStatus("Use at least 6 characters for the owner password.");
      return;
    }

    saveOwnerPassword(newPassword.trim());
    setNewPassword("");
    setStatus("Owner password updated.");
  }

  function focusSection(sectionId: (typeof ownerSections)[number]["id"]) {
    setFocusedSection(sectionId);
    setShowAllSections(false);

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  if (!hydrated) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-[0_24px_70px_-42px_rgba(124,76,88,0.35)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-[#8f5f67]">
            Owner route
          </p>
          <p className="mt-4 font-display text-4xl text-[#2d1d21]">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.2rem] border border-white/70 bg-white/82 p-8 shadow-[0_28px_80px_-46px_rgba(124,76,88,0.4)] backdrop-blur sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f67]">
            Owner login
          </p>
          <h1 className="mt-3 font-display text-5xl tracking-tight text-[#2d1d21]">
            Customize the Stacy Thrifts homepage
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#5f4b4f] sm:text-lg">
            This dashboard lets the owner update homepage text and switch image
            paths without editing code. Changes save in this browser only.
          </p>

          <form
            onSubmit={handleLogin}
            className="mt-8 max-w-xl rounded-[1.8rem] border border-[#f0d9d8] bg-[linear-gradient(180deg,#fffdfa_0%,#fff3ee_100%)] p-6 shadow-[0_18px_52px_-38px_rgba(118,70,80,0.35)]"
          >
            <label className="block text-sm font-semibold text-[#2d1d21]">
              Owner password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-[#e9cfd1] bg-white px-4 py-3 text-base text-[#2d1d21] outline-none transition focus:border-[#b86f7c] focus:ring-2 focus:ring-[#f2cfd4]"
              placeholder="Enter owner password"
            />
            <p className="mt-3 text-sm text-[#6a565a]">
              Default password: <span className="font-semibold">stacy-owner-2026</span>
            </p>
            <button
              type="submit"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#2d1d21] px-6 text-sm font-bold text-white shadow-[0_18px_42px_-26px_rgba(45,29,33,0.5)] transition hover:-translate-y-0.5"
            >
              Login as owner
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4 text-sm text-[#6a565a]">
            <Link href="/" className="font-semibold text-[#2d1d21]">
              Back to homepage
            </Link>
            {status ? <span>{status}</span> : null}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <datalist id="owner-image-options">
        {availableImageOptions.map((image) => (
          <option key={image} value={image} />
        ))}
      </datalist>

      <section className="rounded-[2.4rem] border border-white/70 bg-white/82 p-6 shadow-[0_30px_90px_-48px_rgba(124,76,88,0.42)] backdrop-blur sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8f5f67]">
              Owner dashboard
            </p>
            <h1 className="mt-3 font-display text-5xl tracking-tight text-[#2d1d21]">
              Edit homepage content and images
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#5f4b4f] sm:text-lg">
              Save updates here, then preview the homepage. Image fields accept
              public paths like <span className="font-semibold">/img/...</span>.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#2d1d21] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e2bec4] bg-white px-6 text-sm font-bold text-[#2d1d21] transition hover:-translate-y-0.5"
            >
              Reset defaults
            </button>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e2bec4] bg-[#fff7f5] px-6 text-sm font-bold text-[#2d1d21] transition hover:-translate-y-0.5"
            >
              Preview homepage
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-transparent px-4 text-sm font-semibold text-[#6c575b]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-[#6a565a]">
          <span>{status || "Use the sections below to customize the landing page."}</span>
          <span>Upload images directly or pick from your existing public images.</span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex flex-wrap gap-2">
            {ownerSections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => focusSection(section.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  focusedSection === section.id && !showAllSections
                    ? "bg-[#2d1d21] text-white shadow-[0_16px_34px_-22px_rgba(45,29,33,0.55)]"
                    : "border border-[#ead0d3] bg-[#fff7f5] text-[#5b4549] hover:border-[#c68b97] hover:text-[#2d1d21]"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowAllSections((current) => !current)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#e2bec4] bg-white px-4 text-sm font-semibold text-[#2d1d21] transition hover:-translate-y-0.5"
          >
            {showAllSections ? "Focus one section" : "Show all sections"}
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatusPill
            label="Now editing"
            value={
              ownerSections.find((section) => section.id === focusedSection)?.label ??
              "Brand"
            }
          />
          <StatusPill label="Sections" value={String(ownerSections.length)} />
          <StatusPill
            label="View mode"
            value={showAllSections ? "All open" : "Focused"}
          />
        </div>
      </section>

      <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_21rem] xl:items-start">
        <div className="grid gap-8">
          <EditorCard
            id="brand-links"
            title="Brand and links"
            description="Update your shop name, top announcement, logo, and social links."
            active={focusedSection === "brand-links"}
            collapsed={!showAllSections && focusedSection !== "brand-links"}
            onOpen={() => focusSection("brand-links")}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Brand name"
                value={content.brand.name}
                onChange={(value) => updateBrand("name", value)}
              />
              <TextField
                label="Tagline"
                value={content.brand.tagline}
                onChange={(value) => updateBrand("tagline", value)}
              />
              <TextField
                label="Top announcement"
                value={content.brand.announcement}
                onChange={(value) => updateBrand("announcement", value)}
              />
              <ImageField
                label="Logo path"
                value={content.brand.logoPath}
                onChange={(value) => updateBrand("logoPath", value)}
                suggestions={availableImageOptions}
                hint="Upload a new logo or keep using a public image path."
              />
              <TextField
                label="Facebook URL"
                value={content.links.facebookUrl}
                onChange={(value) => updateLinks("facebookUrl", value)}
              />
              <TextField
                label="Messenger URL"
                value={content.links.messengerUrl}
                onChange={(value) => updateLinks("messengerUrl", value)}
              />
            </div>
          </EditorCard>

        <EditorCard
          id="hero"
          title="Hero"
          description="Control the main headline, intro copy, hero buttons, pills, and stat cards."
          active={focusedSection === "hero"}
          collapsed={!showAllSections && focusedSection !== "hero"}
          onOpen={() => focusSection("hero")}
        >
          <div className="grid gap-4">
            <TextField
              label="Hero badge"
              value={content.hero.badge}
              onChange={(value) => updateHero("badge", value)}
            />
            <TextAreaField
              label="Hero headline"
              value={content.hero.title}
              onChange={(value) => updateHero("title", value)}
              rows={3}
            />
            <TextAreaField
              label="Hero description"
              value={content.hero.description}
              onChange={(value) => updateHero("description", value)}
              rows={4}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Primary CTA label"
                value={content.hero.primaryCta}
                onChange={(value) => updateHero("primaryCta", value)}
              />
              <TextField
                label="Secondary CTA label"
                value={content.hero.secondaryCta}
                onChange={(value) => updateHero("secondaryCta", value)}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.hero.pills.map((pill, index) => (
                <TextField
                  key={`${pill}-${index}`}
                  label={`Hero pill ${index + 1}`}
                  value={pill}
                  onChange={(value) => updateHeroPill(index, value)}
                />
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {content.hero.stats.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="rounded-[1.4rem] border border-[#f1dfda] bg-[#fffaf8] p-4"
                >
                  <TextField
                    label={`Stat ${index + 1} value`}
                    value={stat.value}
                    onChange={(value) => updateHeroStat(index, "value", value)}
                  />
                  <div className="mt-3">
                    <TextField
                      label={`Stat ${index + 1} label`}
                      value={stat.label}
                      onChange={(value) => updateHeroStat(index, "label", value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </EditorCard>

        <EditorCard
          id="slideshow"
          title="Product slideshow"
          description="Change every hero slide title, tag, and image, with direct uploads."
          active={focusedSection === "slideshow"}
          collapsed={!showAllSections && focusedSection !== "slideshow"}
          onOpen={() => focusSection("slideshow")}
        >
          <div className="grid gap-4">
            {content.slides.map((slide, index) => (
              <div
                key={`${slide.title}-${index}`}
                className="rounded-[1.6rem] border border-[#f1dfda] bg-[#fffaf8] p-4"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8f5f67]">
                  Slide {index + 1}
                </p>
                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  <TextField
                    label="Title"
                    value={slide.title}
                    onChange={(value) => updateSlide(index, "title", value)}
                  />
                  <TextField
                    label="Tag"
                    value={slide.tag}
                    onChange={(value) => updateSlide(index, "tag", value)}
                  />
                  <ImageField
                    label="Image path"
                    value={slide.image}
                    onChange={(value) => updateSlide(index, "image", value)}
                    suggestions={availableImageOptions}
                  />
                </div>
              </div>
            ))}
          </div>
        </EditorCard>

        <EditorCard
          id="features"
          title="Features"
          description="Edit the short trust cards under the hero. Icons stay matched to each card position."
          active={focusedSection === "features"}
          collapsed={!showAllSections && focusedSection !== "features"}
          onOpen={() => focusSection("features")}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {content.features.map((feature, index) => (
              <div
                key={`${feature.title}-${index}`}
                className="rounded-[1.6rem] border border-[#f1dfda] bg-[#fffaf8] p-4"
              >
                <TextField
                  label={`Feature ${index + 1} title`}
                  value={feature.title}
                  onChange={(value) => updateFeature(index, "title", value)}
                />
                <div className="mt-3">
                  <TextAreaField
                    label={`Feature ${index + 1} text`}
                    value={feature.text}
                    onChange={(value) => updateFeature(index, "text", value)}
                    rows={4}
                  />
                </div>
              </div>
            ))}
          </div>
        </EditorCard>

        <EditorCard
          id="categories"
          title="Categories"
          description="Adjust the featured product grid card copy, price label, badge, and image."
          active={focusedSection === "categories"}
          collapsed={!showAllSections && focusedSection !== "categories"}
          onOpen={() => focusSection("categories")}
        >
          <div className="grid gap-4">
            {content.categories.map((category, index) => (
              <div
                key={`${category.title}-${index}`}
                className="rounded-[1.6rem] border border-[#f1dfda] bg-[#fffaf8] p-4"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8f5f67]">
                  Category {index + 1}
                </p>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <TextField
                    label="Title"
                    value={category.title}
                    onChange={(value) => updateCategory(index, "title", value)}
                  />
                  <TextField
                    label="Badge"
                    value={category.badge}
                    onChange={(value) => updateCategory(index, "badge", value)}
                  />
                  <TextField
                    label="Price label"
                    value={category.price}
                    onChange={(value) => updateCategory(index, "price", value)}
                  />
                  <ImageField
                    label="Image path"
                    value={category.image}
                    onChange={(value) => updateCategory(index, "image", value)}
                    suggestions={availableImageOptions}
                  />
                </div>
                <div className="mt-3">
                  <TextAreaField
                    label="Description"
                    value={category.text}
                    onChange={(value) => updateCategory(index, "text", value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </EditorCard>

        <EditorCard
          id="story"
          title="How it works, testimonials, and trust"
          description="These sections help first-time buyers feel safe before they message."
          active={focusedSection === "story"}
          collapsed={!showAllSections && focusedSection !== "story"}
          onOpen={() => focusSection("story")}
        >
          <div className="grid gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8f5f67]">
                Steps
              </p>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                {content.steps.map((step, index) => (
                  <div
                    key={`${step.title}-${index}`}
                    className="rounded-[1.6rem] border border-[#f1dfda] bg-[#fffaf8] p-4"
                  >
                    <TextField
                      label={`Step ${index + 1} title`}
                      value={step.title}
                      onChange={(value) => updateStep(index, "title", value)}
                    />
                    <div className="mt-3">
                      <TextAreaField
                        label={`Step ${index + 1} text`}
                        value={step.text}
                        onChange={(value) => updateStep(index, "text", value)}
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8f5f67]">
                Testimonials
              </p>
              <div className="mt-3 grid gap-4 md:grid-cols-3">
                {content.testimonials.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="rounded-[1.6rem] border border-[#f1dfda] bg-[#fffaf8] p-4"
                  >
                    <TextField
                      label={`Testimonial ${index + 1} name`}
                      value={item.name}
                      onChange={(value) =>
                        updateTestimonial(index, "name", value)
                      }
                    />
                    <div className="mt-3">
                      <TextAreaField
                        label={`Testimonial ${index + 1} quote`}
                        value={item.quote}
                        onChange={(value) =>
                          updateTestimonial(index, "quote", value)
                        }
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#8f5f67]">
                Trust chips
              </p>
              <div className="mt-3 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {content.trust.map((item, index) => (
                  <TextField
                    key={`${item}-${index}`}
                    label={`Trust item ${index + 1}`}
                    value={item}
                    onChange={(value) => updateTrust(index, value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </EditorCard>

        <EditorCard
          id="cta-footer"
          title="Final CTA and footer"
          description="Tweak the last section shoppers see before they tap through."
          active={focusedSection === "cta-footer"}
          collapsed={!showAllSections && focusedSection !== "cta-footer"}
          onOpen={() => focusSection("cta-footer")}
        >
          <div className="grid gap-4">
            <TextField
              label="CTA eyebrow"
              value={content.cta.eyebrow}
              onChange={(value) => updateCta("eyebrow", value)}
            />
            <TextAreaField
              label="CTA title"
              value={content.cta.title}
              onChange={(value) => updateCta("title", value)}
              rows={3}
            />
            <TextAreaField
              label="CTA description"
              value={content.cta.description}
              onChange={(value) => updateCta("description", value)}
              rows={4}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="CTA primary button"
                value={content.cta.primaryCta}
                onChange={(value) => updateCta("primaryCta", value)}
              />
              <TextField
                label="CTA secondary button"
                value={content.cta.secondaryCta}
                onChange={(value) => updateCta("secondaryCta", value)}
              />
            </div>
            <TextAreaField
              label="Footer text"
              value={content.footer.text}
              onChange={(value) => updateFooter("text", value)}
              rows={3}
            />
            <TextField
              label="Footer owner link label"
              value={content.footer.ownerLinkLabel}
              onChange={(value) => updateFooter("ownerLinkLabel", value)}
            />
          </div>
        </EditorCard>

        <EditorCard
          id="password"
          title="Owner password"
          description="This is only a lightweight browser-only gate. For a real deployed admin panel, use proper server auth."
          active={focusedSection === "password"}
          collapsed={!showAllSections && focusedSection !== "password"}
          onOpen={() => focusSection("password")}
        >
          <form onSubmit={handlePasswordChange} className="max-w-xl">
            <TextField
              label="New owner password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Choose a new password"
            />
            <button
              type="submit"
              className="mt-4 inline-flex min-h-12 items-center justify-center rounded-full bg-[#2d1d21] px-6 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Update password
            </button>
          </form>
        </EditorCard>
        </div>

        <aside className="xl:sticky xl:top-6 xl:self-start">
          <div className="space-y-5 rounded-[2rem] border border-white/70 bg-white/82 p-5 shadow-[0_24px_70px_-44px_rgba(124,76,88,0.32)] backdrop-blur">
            <div className="overflow-hidden rounded-[1.7rem] border border-[#f0d9d8] bg-[linear-gradient(160deg,#fffdfa_0%,#fff2ec_100%)] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8f5f67]">
                Live snapshot
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-14 w-14 overflow-hidden rounded-full border border-[#f0d9d8] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.brand.logoPath}
                    alt={`${content.brand.name} logo`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-2xl text-[#2d1d21]">
                    {content.brand.name}
                  </p>
                  <p className="text-sm text-[#6a565a]">{content.brand.tagline}</p>
                </div>
              </div>
              <div className="mt-4 overflow-hidden rounded-[1.3rem] border border-white/70 bg-white/70 p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.slides[0]?.image || content.brand.logoPath}
                  alt={content.slides[0]?.title || content.brand.name}
                  className="h-36 w-full rounded-[1rem] object-cover"
                />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#8f5f67]">
                  Homepage hero
                </p>
                <p className="mt-2 font-display text-2xl leading-tight text-[#2d1d21]">
                  {content.hero.title}
                </p>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-[#f0d9d8] bg-white/88 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8f5f67]">
                Quick jump
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {ownerSections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => focusSection(section.id)}
                    className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                      focusedSection === section.id && !showAllSections
                        ? "bg-[#2d1d21] text-white"
                        : "border border-[#ead0d3] bg-[#fff7f5] text-[#5b4549] hover:border-[#c68b97] hover:text-[#2d1d21]"
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-[#f0d9d8] bg-white/88 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8f5f67]">
                Upload tips
              </p>
              <div className="mt-3 space-y-3 text-sm leading-7 text-[#625054]">
                <p>Uploads are saved in this browser as embedded image data.</p>
                <p>Large images can fill local storage, so product photos work best when kept under a few MB.</p>
                <p>You can still paste a public path like <span className="font-semibold">/img/photo.jpg</span> if you prefer.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

function EditorCard({
  id,
  title,
  description,
  active,
  collapsed,
  onOpen,
  children,
}: {
  id?: string;
  title: string;
  description: string;
  active?: boolean;
  collapsed?: boolean;
  onOpen?: () => void;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 rounded-[2rem] border bg-white/80 p-6 shadow-[0_24px_70px_-44px_rgba(124,76,88,0.34)] backdrop-blur transition-all sm:p-8 ${
        active
          ? "border-[#dca6b1] shadow-[0_28px_80px_-42px_rgba(124,76,88,0.45)]"
          : "border-white/70"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8f5f67]">
            {title}
          </p>
          <p className="mt-3 max-w-3xl text-base leading-8 text-[#5f4b4f]">
            {description}
          </p>
        </div>
        {collapsed && onOpen ? (
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#2d1d21] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Open section
          </button>
        ) : null}
      </div>
      {!collapsed ? <div className="mt-6">{children}</div> : null}
    </section>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  listId,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  listId?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#2d1d21]">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        list={listId}
        className="mt-2 w-full rounded-2xl border border-[#e9cfd1] bg-white px-4 py-3 text-base text-[#2d1d21] outline-none transition focus:border-[#b86f7c] focus:ring-2 focus:ring-[#f2cfd4]"
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-[#2d1d21]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="mt-2 w-full rounded-[1.4rem] border border-[#e9cfd1] bg-white px-4 py-3 text-base text-[#2d1d21] outline-none transition focus:border-[#b86f7c] focus:ring-2 focus:ring-[#f2cfd4]"
      />
    </label>
  );
}

function StatusPill({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.4rem] border border-[#f0d9d8] bg-[linear-gradient(180deg,#fffdfc_0%,#fff5f1_100%)] px-4 py-4 shadow-[0_16px_40px_-34px_rgba(118,70,80,0.32)]">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#8f5f67]">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl text-[#2d1d21]">{value}</p>
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  hint,
  suggestions = availableImageOptions,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  suggestions?: readonly string[];
}) {
  const inputId = useId();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const dataUrl = await fileToUsableImage(file);
      onChange(dataUrl);
    } catch {
      setError("Could not read that image. Try another file.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  const compactSuggestions = suggestions.slice(0, 4);

  return (
    <div className="rounded-[1.4rem] border border-[#f1dfda] bg-[#fffaf8] p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#2d1d21]">{label}</p>
          {hint ? <p className="mt-1 text-xs text-[#6a565a]">{hint}</p> : null}
        </div>
        {value.startsWith("data:image/") ? (
          <span className="rounded-full bg-[#2d1d21] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white">
            Uploaded
          </span>
        ) : null}
      </div>

      {value ? (
        <div className="mt-4 overflow-hidden rounded-[1.2rem] border border-[#ead5d8] bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="h-40 w-full object-cover" />
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        <label
          htmlFor={inputId}
          className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-[#2d1d21] px-4 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          {isUploading ? "Uploading..." : "Upload image"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="sr-only"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#e2bec4] bg-white px-4 text-sm font-semibold text-[#2d1d21] transition hover:-translate-y-0.5"
          >
            Clear
          </button>
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {compactSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onChange(suggestion)}
            className="rounded-full border border-[#ead0d3] bg-white px-3 py-2 text-xs font-semibold text-[#5b4549] transition hover:border-[#c68b97]"
          >
            {suggestion.split("/").pop()}
          </button>
        ))}
      </div>

      <label className="mt-4 block">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f5f67]">
          Manual path or pasted URL
        </span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          list="owner-image-options"
          className="mt-2 w-full rounded-2xl border border-[#e9cfd1] bg-white px-4 py-3 text-base text-[#2d1d21] outline-none transition focus:border-[#b86f7c] focus:ring-2 focus:ring-[#f2cfd4]"
        />
      </label>

      {error ? <p className="mt-2 text-sm text-[#b23b51]">{error}</p> : null}
    </div>
  );
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function fileToUsableImage(file: File) {
  const raw = await readFileAsDataUrl(file);

  if (
    file.type === "image/svg+xml" ||
    file.type === "image/gif" ||
    typeof window === "undefined"
  ) {
    return raw;
  }

  return resizeImageDataUrl(raw, file.type);
}

function resizeImageDataUrl(dataUrl: string, mimeType: string) {
  return new Promise<string>((resolve, reject) => {
    const image = new window.Image();

    image.onload = () => {
      const maxDimension = 1600;
      const scale = Math.min(
        1,
        maxDimension / Math.max(image.width, image.height),
      );
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject(new Error("Canvas not available"));
        return;
      }

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);

      const outputType =
        mimeType === "image/png" || mimeType === "image/webp"
          ? mimeType
          : "image/jpeg";

      resolve(canvas.toDataURL(outputType, 0.88));
    };

    image.onerror = () => reject(new Error("Image load failed"));
    image.src = dataUrl;
  });
}
