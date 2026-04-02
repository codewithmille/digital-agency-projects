"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const facebookPageUrl =
  "https://www.facebook.com/profile.php?id=61576539856703&rdid=IcwVe9kv1TzufruC&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18FhecL6Ap#";

const units = [
  {
    id: "sun",
    name: "SUN UNIT",
    location: "Shore 3 Residences, Pasay",
    type: "1BR Cozy Family Suite",
    beds: "1 Queen size bed, Sofabed & Extra mattress",
    image: "/647368398_122168859200884661_1681419431149675664_n.jpg",
    features: "Balcony with Pool View, Wood-patterned cabinets",
    poolAccess: "9:00 AM to 6:00 PM",
    theme: "radial-gradient(circle at 18% 15%, rgba(255,255,255,0.45), transparent 28%), linear-gradient(160deg, rgba(74,45,31,0.2), rgba(74,45,31,0.62)), linear-gradient(135deg, #e8d5c0 0%, #c4956a 45%, #7a4f35 100%)"
  },
  {
    id: "moon",
    name: "MOON UNIT",
    location: "Shore 3 Residences, Pasay",
    type: "1BR Modern Family Suite",
    beds: "1 Queen size bed (Floating bed), Sofabed & Extra mattress",
    image: "/646180216_122168859248884661_7153451485966443587_n.jpg",
    features: "Balcony with Pool View, Dining & Bar area",
    poolAccess: "9:00 AM to 6:00 PM",
    theme: "radial-gradient(circle at 80% 10%, rgba(255,255,255,0.42), transparent 24%), linear-gradient(155deg, rgba(11,55,58,0.18), rgba(11,55,58,0.62)), linear-gradient(135deg, #9bc6c4 0%, #486b72 100%)"
  },
  {
    id: "ocean",
    name: "OCEAN UNIT",
    location: "Shore 2 Residences, Pasay",
    type: "Hotel-Style Superior Twin Unit",
    beds: "2 Full double size beds",
    image: "/646786744_122169153062884661_5594773207592275920_n.jpg",
    features: "Balcony view + peek at building facade, Clean hotel type look",
    poolAccess: "6:00 AM to 10:00 PM",
    theme: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.48), transparent 28%), linear-gradient(155deg, rgba(30,81,87,0.12), rgba(30,81,87,0.65)), linear-gradient(135deg, #f4e7d5 0%, #d3b58c 100%)"
  },
  {
    id: "sky",
    name: "SKY UNIT",
    location: "Shore 2 Residences, Pasay",
    type: "Hotel-Inspired Suite",
    beds: "1 Full double bed, Sofabed & Extra mattress",
    image: "/646209864_122169153080884661_7059641420686070995_n.jpg",
    features: "Spacious Balcony with City & Pool View, Enclosed sleeping area",
    poolAccess: "6:00 AM to 10:00 PM",
    theme: "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.45), transparent 30%), linear-gradient(160deg, rgba(15,48,52,0.18), rgba(15,48,52,0.7)), linear-gradient(135deg, #93c0be 0%, #476d74 40%, #16363b 100%)"
  }
];

const highlights = [
  { tag: "01", title: "Shore 2 & 3 Residences", detail: "Four unique units to choose from in the most convenient areas of Pasay." },
  { tag: "02", title: "Double-sized comfort", detail: "Ocean Unit features two full double size beds, perfect for groups." },
  { tag: "03", title: "Resort-side vibes", pool: "Shore 3 (9AM-6PM) or Shore 2 (6AM-10PM) pool access." },
  { tag: "04", title: "Smart Entertainment", detail: "Free Netflix, Fast Wifi, and Board Games for a fun stay." },
];

const amenityGroups = [
  {
    title: "Premium Tech",
    items: ["Free Netflix & Fast Wifi", "Board Games & Mini Karaoke", "Smart TV setups in all units"],
  },
  {
    title: "Sleep & Care",
    items: ["Queen or Double Bed setups", "Extra mattress always available", "Private Bathroom w/ Hair blower"],
  },
  {
    title: "Functional Living",
    items: ["Fully Functional Kitchen", "Refrigerator & Microwave", "Washing Machine in select units"],
  },
  {
    title: "Building Perks",
    items: ["Spacious Pool-View Balconies", "Near Alfamart & Laundry Station", "Accessible to BDO & Pay Parking"],
  },
];

const locationFacts = [
  "Pasay City / Shore 2 & Shore 3 Residences",
  "Near MOA Complex, IKEA, and entertainment hubs",
  "Highly convenient with lobby-level shops",
  "24/7 building security and professional lobby",
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div data-animate="section-heading" className="max-w-2xl space-y-4">
      <p className="section-label">{eyebrow}</p>
      <h2 className="text-balance text-4xl leading-tight sm:text-5xl">{title}</h2>
      <p className="max-w-xl text-base leading-8 text-[var(--copy)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const rootRef = useRef<HTMLElement | null>(null);
  const [selectedUnit, setSelectedUnit] = useState(units[0].id);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero stagger
      gsap.from(
        "[data-hero-label], [data-hero-title], [data-hero-copy], [data-hero-actions], [data-hero-metrics]",
        {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.15,
        }
      );

      gsap.from("[data-hero-panel]", {
        x: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.3,
      });

      // Floating chips
      gsap.to("[data-float='slow']", {
        y: 18,
        repeat: -1,
        yoyo: true,
        duration: 3.5,
        ease: "sine.inOut",
      });
      gsap.to("[data-float='medium']", {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "sine.inOut",
      });

      // Sections
      gsap.utils.toArray<HTMLElement>("[data-animate='section-heading']").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 35,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-animate='card']").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 92%" },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: (i % 4) * 0.1,
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const unitName = units.find(u => u.id === selectedUnit)?.name || "Not specified";

  const inquiryMessage = [
    `Hi! I'm interested in booking City Cove Staycation (${unitName}).`,
    checkIn ? `Check-in: ${checkIn}` : "Check-in:",
    checkOut ? `Check-out: ${checkOut}` : "Check-out:",
    guests ? `Guests: ${guests}` : "Guests:",
    fullName ? `Name: ${fullName}` : "Name:",
    contact ? `Contact: ${contact}` : "Contact:",
    notes ? `Notes: ${notes}` : "Notes:",
    `Preferred Unit: ${unitName}`,
    "Please confirm if these dates are available. Thank you!",
  ].join("\n");

  async function handleCopyInquiry() {
    try {
      await navigator.clipboard.writeText(inquiryMessage);
      setCopyStatus("Inquiry details copied. You can now paste them into Facebook.");
    } catch {
      setCopyStatus("Couldn't copy automatically. Please copy the message manually below.");
    }
  }

  async function handleOpenFacebook() {
    await handleCopyInquiry();
    window.open(facebookPageUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <main ref={rootRef} className="page-shell overflow-x-hidden">
      <section className="relative px-6 pb-10 pt-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <header className="section-card mb-8 flex flex-col gap-4 rounded-[2rem] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--line)]">
                <Image
                  src="/504490173_122111579342884661_8052139087146412847_n.jpg"
                  alt="City Cove Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <p data-hero-label className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                  City Cove Staycation
                </p>
                <p className="text-sm text-[var(--copy)]">
                  Shore 2 & Shore 3 Residences · Pasay City
                </p>
              </div>
            </div>

            <div data-hero-actions className="flex items-center gap-3">
            <a
              href="#inquire"
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--line)] bg-white/90 px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_12px_30px_rgba(21,33,39,0.07)] hover:-translate-y-0.5 hover:border-[var(--teal)] hover:text-[var(--teal-deep)] sm:w-auto"
            >
              Check Unit Availability
            </a>
            </div>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="space-y-8">
              <div className="space-y-5">
                <p data-hero-label className="section-label">Prime MOA Location</p>
                <h1 data-hero-title className="text-balance max-w-4xl text-[clamp(3.4rem,9vw,6.8rem)] leading-[0.95]">
                  Experience a modern resort reset in Pasay.
                </h1>
                <p data-hero-copy className="max-w-2xl text-lg leading-8 text-[var(--copy)] sm:text-xl">
                  Choose from four curated suites: **Sun**, **Moon**, **Ocean**, and **Sky**. 
                  Whether you need Twin beds at Shore 2 or a cozy family suite at Shore 3, 
                  your City Cove staycation is designed for comfort and convenience.
                </p>
              </div>

              <div data-hero-actions className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#units"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--teal-deep)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,81,87,0.28)] hover:-translate-y-0.5 hover:bg-[var(--teal)]"
                >
                  Explore Our Units
                </a>
                <a
                  href="#inquire"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/70 px-6 py-4 text-sm font-semibold text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-white"
                >
                  Book Now
                </a>
              </div>

              <div data-hero-metrics className="grid gap-4 sm:grid-cols-2">
                <div className="section-card rounded-[1.75rem] p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                    Building Options
                  </p>
                  <p className="mt-3 text-2xl leading-tight">Shore 2 & Shore 3 Residences</p>
                </div>
                <div className="section-card rounded-[1.75rem] p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                    Twin Bed Option
                  </p>
                  <p className="mt-3 text-2xl leading-tight">2 full double size beds available</p>
                </div>
              </div>
            </div>

            <div data-hero-panel className="relative">
              <div data-float="slow" className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(184,154,103,0.28)_0%,_rgba(184,154,103,0)_72%)] blur-xl" />
              <div data-float="medium" className="absolute -right-8 bottom-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(93,143,145,0.24)_0%,_rgba(93,143,145,0)_74%)] blur-xl" />

              <article
                className="photo-panel soft-ring relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl"
              >
                <Image 
                  src="/646180216_122168859248884661_7153451485966443587_n.jpg"
                  alt="City Cove Premier Staycation"
                  fill
                  className="object-cover -z-10"
                  priority
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="flex h-full min-h-[28rem] flex-col justify-between">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] backdrop-blur-sm">
                      MOA Complex location
                    </span>
                  </div>

                  <div className="max-w-md space-y-4">
                    <p className="text-4xl leading-tight sm:text-5xl font-bold">
                      Curated Suites for Your City Escape.
                    </p>
                    <p className="max-w-sm text-sm leading-7 text-white/90 sm:text-base">
                      From Twin bed setups to cozy family suites, we have the perfect unit 
                      waiting for your next staycation reset.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="section-card rounded-[2.5rem] p-8 sm:p-10">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {highlights.map((item) => (
                <article
                  key={item.tag}
                  data-animate="card"
                  className="rounded-[1.8rem] border border-white/60 bg-white/70 p-6 flex flex-col justify-between"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                    {item.tag}
                  </p>
                  <div>
                    <h2 className="mt-4 text-2xl font-bold leading-tight">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--copy)]">
                      {item.detail || item.pool}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="units" className="px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="text-center mx-auto max-w-3xl space-y-4">
            <p className="section-label">Our Units</p>
            <h2 className="text-4xl font-bold sm:text-5xl">Select Your Preferred Suite</h2>
            <p className="text-lg text-[var(--copy)]">
              Each unit offers a unique aesthetic and setup tailored to your group's needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {units.map((unit) => (
              <article
                key={unit.id}
                data-animate="card"
                className="section-card group relative flex flex-col overflow-hidden rounded-[2.5rem] p-3 transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                  <Image 
                    src={unit.image}
                    alt={unit.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="rounded-2xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur-md">
                      <p className="text-xs font-semibold uppercase tracking-widest text-white/90">{unit.location}</p>
                      <h3 className="text-2xl font-bold">{unit.name}</h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">Space Type</p>
                        <p className="mt-1 text-sm font-semibold">{unit.type}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">Pool Hours</p>
                        <p className="mt-1 text-sm font-semibold">{unit.poolAccess}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">Accommodation</p>
                      <p className="mt-1 text-sm leading-relaxed">{unit.beds}</p>
                    </div>

                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] font-bold">Highlights</p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--copy)]">{unit.features}</p>
                    </div>
                  </div>

                  <a
                    href="#inquire"
                    onClick={() => setSelectedUnit(unit.id)}
                    className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[var(--teal-deep)] px-6 py-3.5 text-sm font-bold text-[var(--teal-deep)] transition-colors hover:bg-[var(--teal-deep)] hover:text-white"
                  >
                    Select This Unit
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="amenities" className="px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Included Amenities"
            title="Every unit is fully equipped for your comfort and convenience."
            description="Whether it's the MOON UNIT's bar area or the OCEAN UNIT's twin bed setup, we ensure every City Cove stay feels premium and ready-to-enjoy."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {amenityGroups.map((group) => (
              <article key={group.title} data-animate="card" className="section-card rounded-[2rem] p-7">
                <p className="section-label mb-6">{group.title}</p>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/60 px-4 py-4 text-sm font-medium">
                      <span className="h-2 w-2 rounded-full bg-[var(--gold)]" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="inquire" className="px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="section-card rounded-[2.5rem] p-8 sm:p-10">
              <p className="section-label">Booking Inquiry</p>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl font-bold">
                Ready to spend your city escape with us?
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--copy)] sm:text-lg">
                Fill out the details for your chosen unit—**{unitName}**—and we'll help you 
                confirm your stay via Facebook.
              </p>

              <div className="mt-10 grid gap-4">
                {[
                  "Select Check-in and Check-out dates",
                  "Verify your preferred Unit selection",
                  "Review inquiry summary at the bottom",
                  "Confirm availability directly with the host",
                ].map((item, idx) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-[1.4rem] border border-white/60 bg-white/75 px-5 py-4 text-base leading-7 text-[var(--copy)]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--teal-deep)] text-xs text-white font-bold">{idx + 1}</span>
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="section-card rounded-[2.5rem] p-8 sm:p-10">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Preferred Unit</span>
                  <select
                    value={selectedUnit}
                    onChange={(event) => setSelectedUnit(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--foreground)] outline-none ring-0 appearance-none"
                  >
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name} ({unit.location.split(',')[0]})
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Guests</span>
                  <select
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--foreground)] outline-none ring-0"
                  >
                    {["1", "2", "3", "4"].map((value) => (
                      <option key={value} value={value}>
                        {value} guest{value === "1" ? "" : "s"}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Check-in Date</span>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--foreground)] outline-none ring-0"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Check-out Date</span>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || undefined}
                    onChange={(event) => setCheckOut(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--foreground)] outline-none ring-0"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Your Full Name</span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Full Name"
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)]"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Contact Information</span>
                  <input
                    type="text"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder="Phone number or Facebook name"
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)]"
                  />
                </label>

                <label className="space-y-2 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Special Requests / Notes</span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Add special requests or preferred time."
                    rows={3}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3.5 text-base text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)]"
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleOpenFacebook}
                  className="flex-1 inline-flex items-center justify-center rounded-full bg-[var(--teal-deep)] px-8 py-5 text-sm font-bold text-white shadow-[0_18px_40px_rgba(30,81,87,0.28)] hover:-translate-y-0.5 hover:bg-[var(--teal)] transition-all"
                >
                  Copy Details & Message Host
                </button>
              </div>

              <div className="mt-8 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white/50 p-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--muted)] mb-4">Inquiry Summary</p>
                <div className="rounded-2xl border border-white/60 bg-white/80 p-5 font-mono text-xs leading-relaxed text-[var(--copy)] whitespace-pre-wrap">
                  {inquiryMessage}
                </div>
                {copyStatus && (
                  <p className="mt-4 text-xs font-bold text-[var(--teal-deep)] animate-pulse">{copyStatus}</p>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-12 pt-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="section-card flex flex-col gap-8 rounded-[2.5rem] px-8 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--line)]">
                <Image
                  src="/504490173_122111579342884661_8052139087146412847_n.jpg"
                  alt="City Cove Logo"
                  fill
                  className="object-cover"
                />
              </div>
                <h2 className="text-2xl font-bold">City Cove Staycation</h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[var(--copy)]">
                Four curated suites (Sun, Moon, Ocean, Sky) for the perfect city escape. 
                Shore 2 & Shore 3 Residences area · Metro Manila.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <a 
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold hover:text-[var(--teal-deep)] transition-colors"
              >
                Facebook Profile
              </a>
              <p className="text-xs text-[var(--muted)] uppercase tracking-widest">Est. 2024</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
