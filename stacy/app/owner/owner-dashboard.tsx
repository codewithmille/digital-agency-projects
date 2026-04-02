"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  availableImageOptions,
  cloneSiteContent,
  defaultSiteContent,
  loadSiteContent,
  resetSiteContent,
  saveSiteContent,
  type CategoryItem,
  type FeatureItem,
  type HeroStat,
  type SiteContent,
  type SlideItem,
  type StepItem,
  type TestimonialItem,
} from "@/app/lib/site-content";

const ownerSections = [
  {
    id: "slideshow",
    label: "Posts",
    description: "Products and links",
  },
  {
    id: "brand-links",
    label: "Brand",
    description: "Identity and links",
  },
  {
    id: "hero",
    label: "Hero",
    description: "Headline and CTA",
  },
  {
    id: "features",
    label: "Features",
    description: "Trust cards",
  },
  {
    id: "categories",
    label: "Categories",
    description: "Collection cards",
  },
  {
    id: "story",
    label: "Story",
    description: "Steps and reviews",
  },
  {
    id: "cta-footer",
    label: "CTA",
    description: "Footer and ending CTA",
  },
  {
    id: "password",
    label: "Setup",
    description: "Connection status",
  },
] as const;

function createEmptySlide(): SlideItem {
  return {
    title: "",
    tag: "New post",
    image: "",
    url: "",
  };
}

function createSampleSlides() {
  return defaultSiteContent.slides.slice(0, 6).map((slide) => ({
    ...slide,
    id: undefined,
  }));
}

function collectSiteContentBlobs(content: SiteContent): string[] {
  const blobs: string[] = [];
  if (content.brand.logoPath.includes(".blob.vercel-storage.com")) {
    blobs.push(content.brand.logoPath);
  }
  content.categories.forEach((cat) => {
    if (cat.image.includes(".blob.vercel-storage.com")) {
      blobs.push(cat.image);
    }
  });
  return blobs;
}

export default function OwnerDashboard() {
  const [hydrated, setHydrated] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(cloneSiteContent());
  const [status, setStatus] = useState("");
  const [mongodbConfigured, setMongodbConfigured] = useState(false);
  const [blobConfigured, setBlobConfigured] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [focusedSection, setFocusedSection] =
    useState<(typeof ownerSections)[number]["id"]>("slideshow");

  useEffect(() => {
    let cancelled = false;

    async function hydrateDashboard() {
      setContent(loadSiteContent());

      try {
        const response = await fetch("/api/owner/session", {
          method: "GET",
          cache: "no-store",
        });
        const data = (await response.json()) as {
          authenticated?: boolean;
          mongodbConfigured?: boolean;
          blobConfigured?: boolean;
        };

        if (cancelled) return;

        setAuthenticated(Boolean(data.authenticated));
        setMongodbConfigured(Boolean(data.mongodbConfigured));
        setBlobConfigured(Boolean(data.blobConfigured));

        if (data.authenticated && data.mongodbConfigured) {
          const postsResponse = await fetch("/api/owner/posts", {
            method: "GET",
            cache: "no-store",
          });

          if (postsResponse.ok) {
            const postsData = (await postsResponse.json()) as {
              slides?: SlideItem[];
            };

            if (!cancelled && Array.isArray(postsData.slides)) {
              setContent((current) => ({
                ...current,
                slides: postsData.slides ?? [],
              }));
            }
          }
        }
      } catch {
        if (!cancelled) {
          setStatus("Could not reach the owner backend. Check your setup.");
        }
      } finally {
        if (!cancelled) {
          setHydrated(true);
        }
      }
    }

    void hydrateDashboard();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setSelectedSlideIndex((current) => {
      if (content.slides.length === 0) return 0;
      return Math.min(current, content.slides.length - 1);
    });
  }, [content.slides.length]);

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

  function addSlide() {
    if (content.slides.length >= 20) {
      setStatus("Maximum of 20 posts allowed to avoid storage over-usage.");
      return;
    }

    setContent((current) => ({
      ...current,
      slides: [createEmptySlide(), ...current.slides],
    }));
    setSelectedSlideIndex(0);
    setFocusedSection("slideshow");
    setStatus("New owner post added. Fill it in, then save.");
  }

  function loadSampleSlides() {
    setContent((current) => ({
      ...current,
      slides: createSampleSlides().slice(0, 20),
    }));
    setSelectedSlideIndex(0);
    setFocusedSection("slideshow");
    setStatus("Sample posts loaded (max 20). Review them, then save.");
  }

  function removeSlide(index: number) {
    setContent((current) => {
      if (current.slides.length <= 1) {
        return current;
      }

      const nextSlides = current.slides.filter(
        (_, slideIndex) => slideIndex !== index,
      );

      setSelectedSlideIndex((selected) => {
        if (selected > index) return selected - 1;
        if (selected === index) return Math.max(0, selected - 1);
        return selected;
      });

      return {
        ...current,
        slides: nextSlides,
      };
    });
    setStatus("Owner post removed from the slideshow draft.");
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

  async function fetchOwnerSlides() {
    const response = await fetch("/api/owner/posts", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 401) {
        setAuthenticated(false);
      }

      throw new Error("Could not load owner posts.");
    }

    const data = (await response.json()) as { slides?: SlideItem[] };

    setContent((current) => ({
      ...current,
      slides: Array.isArray(data.slides) ? data.slides : [],
    }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/owner/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as {
        authenticated?: boolean;
        mongodbConfigured?: boolean;
        blobConfigured?: boolean;
        message?: string;
      };

      if (!response.ok || !data.authenticated) {
        setStatus(data.message || "Wrong password. Try again.");
        return;
      }

      setAuthenticated(true);
      setPassword("");
      setMongodbConfigured(Boolean(data.mongodbConfigured));
      setBlobConfigured(Boolean(data.blobConfigured));

      if (data.mongodbConfigured) {
        await fetchOwnerSlides();
      }

      setStatus("Owner access unlocked.");
    } catch {
      setStatus("Could not log in. Check the server setup and try again.");
    }
  }

  async function handleSave() {
    setIsSaving(true);

    try {
      // Cleanup site-content blobs (Logo, Categories)
      const oldContent = loadSiteContent();
      const oldBlobs = collectSiteContentBlobs(oldContent);
      const newBlobs = new Set(collectSiteContentBlobs(content));
      const orphanedBlobs = oldBlobs.filter((url) => !newBlobs.has(url));

      if (orphanedBlobs.length > 0 && blobConfigured) {
        void fetch("/api/owner/cleanup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urls: orphanedBlobs }),
        }).catch(() => {
          // Silent cleanup failure is fine locally
        });
      }

      saveSiteContent(content);

      if (mongodbConfigured) {
        const response = await fetch("/api/owner/posts", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slides: content.slides }),
        });
        const data = (await response.json()) as {
          slides?: SlideItem[];
          message?: string;
        };

        if (!response.ok) {
          if (response.status === 401) {
            setAuthenticated(false);
          }

          setStatus(data.message || "Could not sync owner posts.");
          return;
        }

        setContent((current) => ({
          ...current,
          slides: Array.isArray(data.slides) ? data.slides : current.slides,
        }));
      }

      setStatus(
        mongodbConfigured
          ? "Text changes saved locally and owner posts synced online."
          : "Text changes saved locally. Add MongoDB to sync owner posts online.",
      );
    } catch {
      setStatus("Could not save changes right now.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleReset() {
    if (!window.confirm("Reset all homepage content back to the default design?")) {
      return;
    }

    const resetContent = cloneSiteContent(defaultSiteContent);

    resetSiteContent();

    try {
      if (mongodbConfigured) {
        const response = await fetch("/api/owner/posts", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slides: resetContent.slides }),
        });
        const data = (await response.json()) as {
          slides?: SlideItem[];
          message?: string;
        };

        if (!response.ok) {
          throw new Error(data.message || "Could not reset owner posts.");
        }

        setContent({
          ...resetContent,
          slides: Array.isArray(data.slides) ? data.slides : resetContent.slides,
        });
      } else {
        setContent(resetContent);
      }

      setStatus("Homepage content reset to defaults.");
    } catch {
      setContent(resetContent);
      setStatus("Local content reset, but online posts could not be updated.");
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/owner/session", {
        method: "DELETE",
      });
    } catch {
      // Even if the request fails, clear the local dashboard state.
    }

    setAuthenticated(false);
    setStatus("Logged out.");
  }

  function focusSection(sectionId: (typeof ownerSections)[number]["id"]) {
    setFocusedSection(sectionId);

    window.requestAnimationFrame(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  const completedSlides = content.slides.filter(
    (slide) => slide.title.trim() && slide.image.trim(),
  ).length;
  const sectionStats: Record<(typeof ownerSections)[number]["id"], string> = {
    slideshow: `${content.slides.length} posts`,
    "brand-links": "Links + logo",
    hero: `${content.hero.stats.length} stats`,
    features: `${content.features.length} cards`,
    categories: `${content.categories.length} categories`,
    story: `${content.testimonials.length} testimonials`,
    "cta-footer": "Footer ready",
    password: mongodbConfigured ? "Connected" : "Needs setup",
  };
  const focusedSectionMeta =
    ownerSections.find((section) => section.id === focusedSection) ??
    ownerSections[0];
  const selectedSlide = content.slides[selectedSlideIndex];
  const selectedCategory = content.categories[selectedCategoryIndex];

  const categoryLayoutOptions = [
    { label: "Small / Square", value: "xl:col-span-4" },
    { label: "Medium / Wide", value: "xl:col-span-12 xl:row-span-1" },
    { label: "Large / Featured", value: "xl:col-span-7 xl:row-span-2" },
    { label: "Accent / Narrow", value: "xl:col-span-5" },
    { label: "Tall / Column", value: "xl:col-span-4 xl:row-span-2" },
    { label: "Extra Wide", value: "xl:col-span-8" },
  ];

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
            This dashboard now uses server login for owner posts. Homepage text
            settings still save in this browser, while slideshow posts save
            online through MongoDB and Vercel Blob.
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
              Set <span className="font-semibold">OWNER_PASSWORD</span> in your
              environment. If you do not set one, the fallback password is{" "}
              <span className="font-semibold">stacy-owner-2026</span>.
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

      <section className="glass-card p-6 sm:p-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8f5f67]">
              Management Suite
            </p>
            <h1 className="mt-3 font-display text-5xl tracking-tight text-[#2d1d21] sm:text-6xl">
              Owner Dashboard
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5f4b4f]">
              Experience a streamlined way to manage your brand presence. Start with {" "}
              <span className="font-semibold text-[#2d1d21]">Posts</span> to update your slideshow, or navigate to specific sections to refine your story.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="premium-button"
            >
              {isSaving ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  Saving...
                </span>
              ) : (
                "Save changes"
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSaving}
              className="premium-button-outline"
            >
              Reset defaults
            </button>
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#ead0d3] bg-[#fff7f5]/80 px-6 text-sm font-bold text-[#2d1d21] backdrop-blur transition-all hover:bg-white hover:-translate-y-1 hover:shadow-lg"
            >
              Preview site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex min-h-12 items-center justify-center rounded-full px-4 text-sm font-bold text-[#8f5f67] transition-colors hover:text-[#2d1d21]"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
          <div className="glass-pill flex items-center gap-2 px-4 py-2">
            <span className={`h-2 w-2 rounded-full ${mongodbConfigured ? "bg-emerald-500" : "bg-rose-400 animate-pulse"}`} />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#8f5f67]">
              MongoDB: {mongodbConfigured ? "Connected" : "Setup Required"}
            </span>
          </div>
          <div className="glass-pill flex items-center gap-2 px-4 py-2">
            <span className={`h-2 w-2 rounded-full ${blobConfigured ? "bg-emerald-500" : "bg-[#8f5f67]"}`} />
            <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#8f5f67]">
              Vercel Blob: {blobConfigured ? "Active" : "Standard"}
            </span>
          </div>
          <span className="ml-2 text-[#5f4b4f]/60 font-medium italic">
            {status || "Ready to ship changes."}
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          <StatusPill
            label="Current focus"
            value={focusedSectionMeta.label}
          />
          <StatusPill
            label="Total Posts"
            value={`${content.slides.length}`}
          />
          <StatusPill
            label="Ready to go"
            value={`${completedSlides}`}
          />
          <StatusPill
            label="Health Score"
            value={mongodbConfigured ? "High" : "Local Only"}
          />
        </div>
      </section>

      <div className="mt-12 flex flex-col gap-10">
        <nav className="glass-card flex flex-wrap gap-2 p-2 sm:rounded-full">
          {ownerSections.map((section, index) => (
            <button
              key={section.id}
              type="button"
              onClick={() => focusSection(section.id)}
              className={`relative flex-1 min-w-[120px] rounded-full px-6 py-4 text-center transition-all duration-500 ${
                focusedSection === section.id
                  ? "bg-[#2d1d21] text-white shadow-xl shadow-[#2d1d21]/20 -translate-y-1"
                  : "text-[#5f4b4f] hover:bg-white/60"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className={`text-[0.6rem] font-black uppercase tracking-widest opacity-60 ${focusedSection === section.id ? "text-white/70" : "text-[#8f5f67]"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold">{section.label}</span>
              </div>
            </button>
          ))}
        </nav>

        <div className="grid gap-8">
          <section className="rounded-[2rem] border border-white/70 bg-white/78 p-5 shadow-[0_24px_70px_-44px_rgba(124,76,88,0.3)] backdrop-blur sm:p-6">
            <div className="grid gap-3 sm:grid-cols-4">
              <MiniMetric label="Section" value={focusedSectionMeta.label} />
              <MiniMetric label="Posts" value={`${content.slides.length}`} />
              <MiniMetric
                label="Ready"
                value={`${completedSlides}/${content.slides.length}`}
              />
              <MiniMetric label="Save" value={isSaving ? "Saving" : "Ready"} />
            </div>
          </section>

          {focusedSection === "brand-links" ? (
          <EditorCard
            id="brand-links"
            title="Brand and links"
            description="Shop name, announcement, logo, and social links."
            active={focusedSection === "brand-links"}
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
                uploadEndpoint="/api/owner/upload"
                uploadEnabled={blobConfigured}
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
          ) : null}

        {focusedSection === "hero" ? (
        <EditorCard
          id="hero"
          title="Hero"
          description="Headline, intro copy, hero buttons, pills, and stat cards."
          active={focusedSection === "hero"}
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
        ) : null}

        {focusedSection === "slideshow" ? (
        <EditorCard
          id="slideshow"
          title="Owner posts slideshow"
          description="Add products here. Every saved item appears in the homepage slideshow."
          active={focusedSection === "slideshow"}
        >
          <div className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-[2rem] border border-[#f1dfda] bg-white/40 p-6 backdrop-blur-sm">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8f5f67]">
                  Inventory Control
                </p>
                <p className="mt-2 text-base text-[#5f4b4f]">
                  Manage your active slideshow products.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="glass-pill bg-white/80 px-5 py-3 shadow-sm">
                  <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#8f5f67]">
                    Active Posts
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-[#2d1d21]">
                    {completedSlides}/{content.slides.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={loadSampleSlides}
                  className="premium-button-outline px-5 py-3"
                >
                  Load Samples
                </button>
                <button
                  type="button"
                  onClick={addSlide}
                  disabled={content.slides.length >= 20}
                  className="premium-button px-5 py-3 disabled:opacity-50 disabled:translate-y-0"
                >
                  {content.slides.length >= 20 ? "Limit Reached" : "Add New Post"}
                </button>
              </div>
            </div>
            {!mongodbConfigured ? (
              <div className="rounded-[1.5rem] border border-[#f2d6d9] bg-rose-50/50 p-5 text-sm leading-relaxed text-[#8f5f67]">
                <span className="font-bold uppercase tracking-wider">Note:</span> MongoDB is not configured. Your posts will be saved to local storage only until a connection is established.
              </div>
            ) : null}
            {content.slides.length === 0 ? (
              <div className="glass-card border-dashed border-[#e2bec4] bg-transparent py-16 text-center">
                <p className="text-lg font-medium text-[#5f4b4f]">No posts in your slideshow yet.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={addSlide}
                    disabled={content.slides.length >= 20}
                    className="premium-button disabled:opacity-50"
                  >
                    {content.slides.length >= 20 ? "Limit Reached" : "Create First Post"}
                  </button>
                  <button type="button" onClick={loadSampleSlides} className="premium-button-outline">Load Examples</button>
                </div>
              </div>
            ) : null}
            {content.slides.length > 0 ? (
              <div className="grid gap-8 xl:grid-cols-[22rem_minmax(0,1fr)]">
                <div className="glass-card bg-white/40 p-5">
                  <div className="flex items-center justify-between border-b border-[#f1dfda] pb-5">
                    <div>
                      <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#8f5f67]">
                        Collection
                      </p>
                      <p className="text-sm font-bold text-[#2d1d21]">
                        {content.slides.length} Total Items
                      </p>
                    </div>
                    <span className="glass-pill bg-white px-3 py-1 text-[0.55rem] font-black text-[#8f5f67]">
                      Live List
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                    {content.slides.map((slide, index) => (
                      <button
                        key={slide.id ?? `${slide.title}-${index}`}
                        type="button"
                        onClick={() => setSelectedSlideIndex(index)}
                        className={`group relative overflow-hidden rounded-[1.5rem] border p-4 text-left transition-all duration-300 ${
                          selectedSlideIndex === index
                            ? "border-[#d7a7b0] bg-white shadow-xl shadow-[#7c4c58]/10"
                            : "border-transparent bg-white/40 hover:bg-white/80 hover:border-[#ead0d3]"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[#ead5d8] bg-white transition-transform duration-500 group-hover:scale-105">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                slide.image ||
                                defaultSiteContent.slides[index % defaultSiteContent.slides.length]
                                  ?.image ||
                                content.brand.logoPath
                              }
                              alt={slide.title || `Post ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                            {selectedSlideIndex === index && (
                              <div className="absolute inset-0 bg-[#2d1d21]/10 backdrop-blur-[1px] flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-white animate-ping" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-[0.55rem] font-black uppercase tracking-[0.15em] text-[#8f5f67]">
                                Item {String(index + 1).padStart(2, "0")}
                              </p>
                              {selectedSlideIndex === index && (
                                <span className="text-[0.5rem] font-black uppercase text-[#2d1d21]">Active</span>
                              )}
                            </div>
                            <p className="mt-2 truncate text-base font-bold text-[#2d1d21]">
                              {slide.title.trim() || "New Product Listing"}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <PostMetaPill
                                active={Boolean(slide.image.trim())}
                                label="Visual"
                              />
                              <PostMetaPill
                                active={Boolean(slide.url?.trim())}
                                label="Direct Link"
                              />
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedSlide ? (
                  <div className="glass-card bg-white p-8">
                    <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#f1dfda] pb-8">
                      <div>
                        <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#8f5f67]">
                          Editor Selection
                        </p>
                        <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#2d1d21]">
                          {selectedSlide.title.trim() || `Draft Item ${selectedSlideIndex + 1}`}
                        </h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSlideIndex((current) => Math.max(0, current - 1))
                          }
                          disabled={selectedSlideIndex === 0}
                          className="premium-button-outline min-h-12 px-6 disabled:opacity-30 disabled:translate-y-0"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedSlideIndex((current) =>
                              Math.min(content.slides.length - 1, current + 1),
                            )
                          }
                          disabled={selectedSlideIndex === content.slides.length - 1}
                          className="premium-button-outline min-h-12 px-6 disabled:opacity-30 disabled:translate-y-0"
                        >
                          Next
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSlide(selectedSlideIndex)}
                          disabled={content.slides.length <= 1}
                          className="inline-flex h-12 items-center justify-center rounded-full px-4 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors disabled:opacity-30"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                      <div className="space-y-6">
                        <div className="glass-card overflow-hidden border-[#ead5d8] bg-white p-3 shadow-xl">
                          <p className="mb-3 text-[0.55rem] font-black uppercase tracking-widest text-[#8f5f67] px-2 text-center">
                            Interface Preview
                          </p>
                          <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-[#ead5d8] bg-[#fff7f5]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                selectedSlide.image ||
                                defaultSiteContent.slides[
                                  selectedSlideIndex % defaultSiteContent.slides.length
                                ]?.image ||
                                content.brand.logoPath
                              }
                              alt={selectedSlide.title || `Post ${selectedSlideIndex + 1}`}
                              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                          </div>
                          <div className="mt-5 rounded-2xl bg-[#fffaf8] p-5 border border-[#f1dfda]">
                            <p className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#8f5f67]">
                              {selectedSlide.tag.trim() || "No Tag Assigned"}
                            </p>
                            <p className="mt-3 font-display text-2xl font-bold leading-tight text-[#2d1d21]">
                              {selectedSlide.title.trim() || "Add a title..."}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          <TextField
                            label="Title"
                            value={selectedSlide.title}
                            onChange={(value) =>
                              updateSlide(selectedSlideIndex, "title", value)
                            }
                          />
                          <TextField
                            label="Tag"
                            value={selectedSlide.tag}
                            onChange={(value) =>
                              updateSlide(selectedSlideIndex, "tag", value)
                            }
                          />
                        </div>
                        <ImageField
                          label="Image path"
                          value={selectedSlide.image}
                          onChange={(value) =>
                            updateSlide(selectedSlideIndex, "image", value)
                          }
                          suggestions={availableImageOptions}
                          uploadEndpoint="/api/owner/upload"
                          uploadEnabled={blobConfigured}
                          hint={
                            blobConfigured
                              ? "Upload to Vercel Blob or paste any public image URL."
                              : "Blob is not configured yet, so use a public image URL for now."
                          }
                        />
                        <TextField
                          label="Post link"
                          value={selectedSlide.url || ""}
                          onChange={(value) =>
                            updateSlide(selectedSlideIndex, "url", value)
                          }
                          placeholder="https://www.facebook.com/your-post-link"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </EditorCard>
        ) : null}

        {focusedSection === "features" ? (
        <EditorCard
          id="features"
          title="Features"
          description="Trust cards under the hero."
          active={focusedSection === "features"}
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
        ) : null}

        {focusedSection === "categories" ? (
          <EditorCard
            id="categories"
            title="Category Collections"
            description="Organize your shop drops into high-impact visual categories. Each card can have its own size and layout."
            active={focusedSection === "categories"}
          >
            <div className="grid gap-8 xl:grid-cols-[22rem_minmax(0,1fr)]">
              {/* Left Pane: Category List */}
              <div className="glass-card bg-white/40 p-5">
                <div className="flex items-center justify-between border-b border-[#f1dfda] pb-5">
                  <div>
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#8f5f67]">
                      Structure
                    </p>
                    <p className="text-sm font-bold text-[#2d1d21]">
                      {content.categories.length} Active Rows
                    </p>
                  </div>
                  <span className="glass-pill bg-white px-3 py-1 text-[0.55rem] font-black text-[#8f5f67]">
                    Live Grid
                  </span>
                </div>

                <div className="mt-6 grid gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                  {content.categories.map((category, index) => (
                    <button
                      key={`${category.title}-${index}`}
                      type="button"
                      onClick={() => setSelectedCategoryIndex(index)}
                      className={`group relative overflow-hidden rounded-[1.5rem] border p-4 text-left transition-all duration-300 ${
                        selectedCategoryIndex === index
                          ? "border-[#d7a7b0] bg-white shadow-xl shadow-[#7c4c58]/10"
                          : "border-transparent bg-white/40 hover:bg-white/80 hover:border-[#ead0d3]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[#ead5d8] bg-white">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={
                              category.image ||
                              defaultSiteContent.categories[index % defaultSiteContent.categories.length]?.image ||
                              content.brand.logoPath
                            }
                            alt={category.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.55rem] font-black uppercase tracking-[0.15em] text-[#8f5f67]">
                            Slot {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1 truncate text-base font-bold text-[#2d1d21]">
                            {category.title || "Untitled Category"}
                          </p>
                          <p className="mt-1 truncate text-[0.65rem] text-[#8f5f67]/70">
                            {category.badge || "No badge"} • {category.price || "No price"}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Pane: Category Editor */}
              {selectedCategory && (
                <div className="glass-card bg-white p-8">
                  <div className="flex flex-wrap items-center justify-between gap-6 border-b border-[#f1dfda] pb-8">
                    <div>
                      <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#8f5f67]">
                        Category Designer
                      </p>
                      <h3 className="mt-2 font-display text-4xl font-bold tracking-tight text-[#2d1d21]">
                        {selectedCategory.title || `Entry ${selectedCategoryIndex + 1}`}
                      </h3>
                    </div>
                  </div>

                  <div className="mt-10 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
                    <div className="space-y-8">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <TextField
                          label="Section Title"
                          value={selectedCategory.title}
                          onChange={(value) => updateCategory(selectedCategoryIndex, "title", value)}
                        />
                        <TextField
                          label="Status Badge"
                          value={selectedCategory.badge}
                          onChange={(value) => updateCategory(selectedCategoryIndex, "badge", value)}
                        />
                        <TextField
                          label="Pricing Label"
                          value={selectedCategory.price}
                          onChange={(value) => updateCategory(selectedCategoryIndex, "price", value)}
                        />
                        <label className="group block">
                          <span className="text-xs font-bold uppercase tracking-widest text-[#8f5f67] transition-colors group-focus-within:text-[#2d1d21]">
                            Visual Layout
                          </span>
                          <select
                            value={selectedCategory.layout}
                            onChange={(e) => updateCategory(selectedCategoryIndex, "layout", e.target.value)}
                            className="glass-input mt-2.5 w-full appearance-none bg-white cursor-pointer"
                          >
                            {categoryLayoutOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>

                      <TextAreaField
                        label="Category Description"
                        value={selectedCategory.text}
                        onChange={(value) => updateCategory(selectedCategoryIndex, "text", value)}
                        rows={3}
                      />

                      <ImageField
                        label="Featured Asset"
                        value={selectedCategory.image}
                        onChange={(value) => updateCategory(selectedCategoryIndex, "image", value)}
                        suggestions={availableImageOptions}
                        uploadEndpoint="/api/owner/upload"
                        uploadEnabled={blobConfigured}
                        hint="Choose a high-impact photo to represent this collection."
                      />
                    </div>

                    <div className="space-y-6">
                      <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#8f5f67] text-center">
                        Drop Card Preview
                      </p>
                      <div className="sticky top-8">
                        <div className="group relative overflow-hidden rounded-[2.2rem] border border-[#ead5d8] bg-white p-3 shadow-2xl transition-all duration-500 hover:-translate-y-2">
                          <div className="relative h-[400px] overflow-hidden rounded-[1.8rem]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                selectedCategory.image ||
                                defaultSiteContent.categories[selectedCategoryIndex % defaultSiteContent.categories.length]?.image ||
                                content.brand.logoPath
                              }
                              alt="Preview"
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2d1d21]/80 via-transparent to-transparent" />
                            <div className="absolute left-4 top-4 flex items-center gap-2">
                              <span className="glass-pill bg-white px-3 py-1 text-[0.6rem] font-black uppercase tracking-[0.2em] text-[#8f5f67] shadow-lg">
                                {selectedCategory.badge || "Live Drop"}
                              </span>
                            </div>
                            <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/20 bg-white/10 p-4 text-white shadow-xl backdrop-blur-md">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <p className="font-display text-2xl leading-none">
                                    {selectedCategory.title || "Collection Name"}
                                  </p>
                                  <p className="mt-2 text-[0.75rem] text-white/80 line-clamp-1">
                                    {selectedCategory.text || "Category description goes here..."}
                                  </p>
                                </div>
                                <span className="glass-pill bg-[#2d1d21] px-3 py-1 text-[0.6rem] font-black text-white shadow-lg">
                                  {selectedCategory.price || "See Deals"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className="mt-6 text-center text-xs font-medium text-[#8f5f67]/60 italic">
                          This is exactly how shoppers will see this collection card.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </EditorCard>
        ) : null}

        {focusedSection === "story" ? (
        <EditorCard
          id="story"
          title="How it works, testimonials, and trust"
          description="Story steps, testimonials, and trust content."
          active={focusedSection === "story"}
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
        ) : null}

        {focusedSection === "cta-footer" ? (
        <EditorCard
          id="cta-footer"
          title="Final CTA and footer"
          description="Final call-to-action and footer copy."
          active={focusedSection === "cta-footer"}
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
        ) : null}

        {focusedSection === "password" ? (
        <EditorCard
          id="password"
          title="Deployment setup"
          description="Owner auth and storage setup."
          active={focusedSection === "password"}
        >
          <div className="grid gap-4 text-sm leading-7 text-[#625054]">
            <div className="rounded-[1.6rem] border border-[#f1dfda] bg-[#fffaf8] p-4">
              <p className="font-semibold text-[#2d1d21]">Required env vars</p>
              <p className="mt-2">
                <span className="font-semibold">MONGODB_URI</span> for your Atlas
                connection string
              </p>
              <p>
                <span className="font-semibold">MONGODB_DB</span> for the database
                name you want to use
              </p>
              <p>
                <span className="font-semibold">BLOB_READ_WRITE_TOKEN</span> or{" "}
                <span className="font-semibold">STACY_READ_WRITE_TOKEN</span> for
                Vercel Blob uploads
              </p>
              <p>
                <span className="font-semibold">OWNER_PASSWORD</span> for the owner
                login password
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-[#f1dfda] bg-[#fffaf8] p-4">
              <p className="font-semibold text-[#2d1d21]">Current status</p>
              <p className="mt-2">MongoDB: {mongodbConfigured ? "Ready" : "Missing"}</p>
              <p>Vercel Blob: {blobConfigured ? "Ready" : "Missing"}</p>
            </div>
          </div>
        </EditorCard>
        ) : null}
        </div>
      </div>
    </main>
  );
}

function EditorCard({
  id,
  title,
  description,
  active,
  children,
}: {
  id?: string;
  title: string;
  description: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 glass-card p-6 transition-all duration-500 sm:p-12 ${
        active
          ? "border-[#dca6b1]/50 bg-white shadow-2xl"
          : "opacity-40 grayscale blur-[2px] pointer-events-none scale-[0.98]"
      }`}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4">
            <h2 className="font-display text-4xl tracking-tight text-[#2d1d21] sm:text-5xl">
              {title}
            </h2>
            {active && (
              <span className="glass-pill bg-[#2d1d21] px-4 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.2em] text-white shadow-lg">
                Live Session
              </span>
            )}
          </div>
          <p className="mt-4 text-base leading-relaxed text-[#5f4b4f] sm:text-lg">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-10 border-t border-[#f1dfda] pt-10">{children}</div>
    </section>
  );
}

function MiniMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="glass-pill flex flex-col items-center justify-center p-4">
      <p className="text-[0.6rem] font-black uppercase tracking-widest text-[#8f5f67] opacity-60">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold text-[#2d1d21]">
        {value}
      </p>
    </div>
  );
}

function PostMetaPill({
  active,
  label,
}: {
  active: boolean;
  label: string;
}) {
  return (
    <span
      className={`glass-pill px-3 py-1 text-[0.55rem] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
        active
          ? "bg-[#2d1d21] text-white shadow-md"
          : "border-[#e3c6cb]/50 text-[#8f5f67]/60"
      }`}
    >
      {label}
    </span>
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
    <label className="group block">
      <span className="text-xs font-bold uppercase tracking-widest text-[#8f5f67] transition-colors group-focus-within:text-[#2d1d21]">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        list={listId}
        className="glass-input mt-2.5 w-full"
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
    <label className="group block">
      <span className="text-xs font-bold uppercase tracking-widest text-[#8f5f67] transition-colors group-focus-within:text-[#2d1d21]">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="glass-input mt-2.5 w-full resize-none"
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
    <div className="glass-card flex flex-col items-start p-5 py-6">
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#8f5f67] opacity-70">
        {label}
      </p>
      <p className="mt-3 font-display text-4xl font-bold tracking-tight text-[#2d1d21]">{value}</p>
    </div>
  );
}

function ImageField({
  label,
  value,
  onChange,
  hint,
  suggestions = availableImageOptions,
  uploadEndpoint,
  uploadEnabled = true,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  suggestions?: readonly string[];
  uploadEndpoint?: string;
  uploadEnabled?: boolean;
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
      if (uploadEndpoint && uploadEnabled) {
        const formData = new FormData();

        formData.set("file", file);

        const response = await fetch(uploadEndpoint, {
          method: "PUT",
          body: formData,
        });
        const data = (await response.json()) as {
          url?: string;
          message?: string;
        };

        if (!response.ok || !data.url) {
          throw new Error(data.message || "Upload failed");
        }

        onChange(data.url);
      } else {
        const dataUrl = await fileToUsableImage(file);
        onChange(dataUrl);
      }
    } catch {
      setError("Could not read that image. Try another file.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  const compactSuggestions = suggestions.slice(0, 4);

  return (
    <div className="glass-card bg-white/40 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-[#2d1d21]">{label}</p>
          {hint ? <p className="mt-1.5 text-xs font-medium text-[#8f5f67] leading-relaxed">{hint}</p> : null}
        </div>
        {value.startsWith("data:image/") || value.includes(".blob.vercel-storage.com") ? (
          <span className="glass-pill bg-[#2d1d21] px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-white shadow-lg">
            Asset Live
          </span>
        ) : null}
      </div>

      {value ? (
        <div className="group relative mt-6 aspect-video overflow-hidden rounded-2xl border border-[#ead5d8] bg-white shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt={label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <label
          htmlFor={inputId}
          className={`glass-pill inline-flex min-h-12 items-center justify-center px-6 text-sm font-bold transition-all duration-300 ${
            uploadEndpoint && !uploadEnabled
              ? "cursor-not-allowed bg-rose-50 text-rose-300 border-rose-100"
              : "cursor-pointer bg-[#2d1d21] text-white shadow-xl shadow-[#2d1d21]/20 hover:-translate-y-1 hover:shadow-2xl"
          }`}
        >
          {isUploading ? (
             <span className="flex items-center gap-2">
               <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white" />
               Syncing...
             </span>
          ) : "Upload Media"}
        </label>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploadEndpoint ? !uploadEnabled : false}
          className="sr-only"
        />
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="premium-button-outline px-6 min-h-12"
          >
            Reset
          </button>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {compactSuggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onChange(suggestion)}
            className="glass-pill px-3 py-1.5 text-[0.65rem] font-bold text-[#8f5f67] bg-white/60 hover:bg-white hover:text-[#2d1d21] hover:border-[#c68b97] transition-all"
          >
            {suggestion.split("/").pop()}
          </button>
        ))}
      </div>

      <label className="mt-6 block border-t border-[#f1dfda] pt-6">
        <span className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#8f5f67]">
          Manual Source URL
        </span>
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          list="owner-image-options"
          className="glass-input mt-3 w-full"
          placeholder="https://..."
        />
      </label>

      {error ? (
        <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs font-bold text-rose-500 border border-rose-100">
          {error}
        </div>
      ) : null}
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
