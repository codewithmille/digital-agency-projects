"use client";

import { useState } from "react";

const facebookPageUrl =
  "https://www.facebook.com/profile.php?id=61576539856703&rdid=IcwVe9kv1TzufruC&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18FhecL6Ap#";

const highlights = [
  { tag: "01", title: "Up to 4 guests", detail: "Designed for couples, small families, and quick city escapes." },
  { tag: "02", title: "1-bedroom comfort", detail: "A cozy condo setup with a polished hotel-like mood." },
  { tag: "03", title: "Pool-view balcony", detail: "Bright sightlines and a more relaxed staycation atmosphere." },
  { tag: "04", title: "Near the MOA area", detail: "Easy access to shopping, dining, and Pasay city stops." },
  { tag: "05", title: "Wi-Fi and smart TV", detail: "Ready for streaming, rest, and work-lite downtime." },
  { tag: "06", title: "Resort-side energy", detail: "A clean, modern vibe inspired by social-first property posts." },
];

const galleryCards = [
  {
    title: "Pool-view balcony",
    copy: "Morning light, open air, and a resort-adjacent mood that makes the unit feel like a real reset.",
    className: "min-h-[24rem] sm:col-span-2 lg:col-span-2",
    background:
      "radial-gradient(circle at 18% 15%, rgba(255,255,255,0.45), transparent 28%), linear-gradient(160deg, rgba(12,43,46,0.2), rgba(12,43,46,0.62)), linear-gradient(135deg, #b6d7d4 0%, #6f9f9f 45%, #1f5258 100%)",
  },
  {
    title: "Calm bedroom palette",
    copy: "Soft neutrals and clean finishes for a restful overnight feel.",
    className: "min-h-[18rem]",
    background:
      "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.48), transparent 28%), linear-gradient(155deg, rgba(242,228,211,0.92), rgba(202,177,136,0.65)), linear-gradient(135deg, #f4e7d5 0%, #d3b58c 100%)",
  },
  {
    title: "Cozy lounge zone",
    copy: "A polished corner for movie nights, coffee breaks, or slow mornings.",
    className: "min-h-[18rem]",
    background:
      "radial-gradient(circle at 80% 10%, rgba(255,255,255,0.42), transparent 24%), linear-gradient(155deg, rgba(11,55,58,0.18), rgba(11,55,58,0.62)), linear-gradient(135deg, #9bc6c4 0%, #486b72 100%)",
  },
];

const amenityGroups = [
  {
    title: "Sleep easy",
    items: ["Air-conditioned bedroom", "Fresh linens and soft textures", "Comfort-focused layout"],
  },
  {
    title: "Live comfortably",
    items: ["Smart TV setup", "Fast Wi-Fi for downtime or remote tasks", "Relaxed seating area"],
  },
  {
    title: "Eat in or snack late",
    items: ["Kitchen essentials", "Dining nook for simple meals", "Convenient condo-style setup"],
  },
  {
    title: "Refresh quickly",
    items: ["Private bathroom", "Hot shower feel", "Everyday stay basics"],
  },
  {
    title: "Enjoy the building",
    items: ["Pool-facing atmosphere", "Secure residential setting", "Elevator-access convenience"],
  },
  {
    title: "Move around easily",
    items: ["Pasay location advantage", "Near the MOA area", "Accessible for short city plans"],
  },
];

const locationFacts = [
  "Pasay City / Shore 3 Residences area",
  "Good fit for weekend staycations and event-based stays",
  "Close to shopping, dining, and everyday conveniences",
  "A practical base for rest between city errands or plans",
];

const reasonsToChoose = [
  "It looks elevated without feeling stiff or overly formal.",
  "The pool-view positioning gives the stay a stronger getaway feel.",
  "The layout works well for fast, easy inquiries from social traffic.",
  "The overall tone stays warm, polished, and easy to trust.",
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
    <div className="max-w-2xl space-y-4">
      <p className="section-label">{eyebrow}</p>
      <h2 className="text-balance text-4xl leading-tight sm:text-5xl">{title}</h2>
      <p className="max-w-xl text-base leading-8 text-[var(--copy)] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

export default function Home() {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const inquiryMessage = [
    "Hi! I'm interested in booking City Cove Staycation.",
    checkIn ? `Check-in: ${checkIn}` : "Check-in:",
    checkOut ? `Check-out: ${checkOut}` : "Check-out:",
    guests ? `Guests: ${guests}` : "Guests:",
    fullName ? `Name: ${fullName}` : "Name:",
    contact ? `Contact: ${contact}` : "Contact:",
    notes ? `Notes: ${notes}` : "Notes:",
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
    <main className="page-shell overflow-x-hidden">
      <section className="relative px-6 pb-10 pt-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <header className="section-card mb-8 flex flex-col gap-4 rounded-[2rem] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--teal-deep)] text-sm font-semibold tracking-[0.24em] text-white">
                CC
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
                  City Cove Staycation
                </p>
                <p className="text-sm text-[var(--copy)]">
                  Modern pool-view staycation in the Pasay area
                </p>
              </div>
            </div>

            <a
              href="#inquire"
              className="inline-flex w-full items-center justify-center rounded-full border border-[var(--line)] bg-white/90 px-5 py-3 text-sm font-semibold text-[var(--foreground)] shadow-[0_12px_30px_rgba(21,33,39,0.07)] hover:-translate-y-0.5 hover:border-[var(--teal)] hover:text-[var(--teal-deep)] sm:w-auto"
            >
              Check Dates
            </a>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div className="space-y-8">
              <div className="space-y-5">
                <p className="section-label">Staycation Landing Page</p>
                <h1 className="text-balance max-w-4xl text-[clamp(3.4rem,9vw,6.8rem)] leading-[0.95]">
                  Modern staycation calm with a resort-side mood.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--copy)] sm:text-xl">
                  City Cove Staycation is presented here with the same warm, polished energy
                  the Facebook page suggests: bright interiors, pool-view ease, and a condo
                  stay that feels both elevated and easy to book.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#inquire"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--teal-deep)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,81,87,0.28)] hover:-translate-y-0.5 hover:bg-[var(--teal)]"
                >
                  Book or Inquire
                </a>
                <a
                  href="#amenities"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white/70 px-6 py-4 text-sm font-semibold text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--gold)] hover:bg-white"
                >
                  View Amenities
                </a>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="section-card rounded-[1.75rem] p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                    Unit Mood
                  </p>
                  <p className="mt-3 text-2xl leading-tight">Bright, polished, restful</p>
                </div>
                <div className="section-card rounded-[1.75rem] p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                    Best For
                  </p>
                  <p className="mt-3 text-2xl leading-tight">Couples, small groups, quick resets</p>
                </div>
                <div className="section-card rounded-[1.75rem] p-5">
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                    Area Feel
                  </p>
                  <p className="mt-3 text-2xl leading-tight">Pasay convenience with staycation calm</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(184,154,103,0.28)_0%,_rgba(184,154,103,0)_72%)] blur-xl" />
              <div className="absolute -right-8 bottom-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(93,143,145,0.24)_0%,_rgba(93,143,145,0)_74%)] blur-xl" />

              <div className="grid gap-4 sm:grid-cols-2">
                <article
                  className="photo-panel soft-ring rounded-[2rem] p-6 text-white sm:col-span-2"
                  style={{ backgroundImage: galleryCards[0].background }}
                >
                  <div className="flex h-full min-h-[22rem] flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
                        Signature View
                      </span>
                      <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em]">
                        Poolside Mood
                      </span>
                    </div>

                    <div className="max-w-md space-y-4">
                      <p className="text-4xl leading-tight sm:text-5xl">
                        Condo comfort styled to feel like a proper escape.
                      </p>
                      <p className="max-w-sm text-sm leading-7 text-white/82 sm:text-base">
                        The hero area leans into the Facebook-page vibe: airy, polished,
                        and social-ready rather than plain or corporate.
                      </p>
                    </div>
                  </div>
                </article>

                {galleryCards.slice(1).map((card) => (
                  <article
                    key={card.title}
                    className={`photo-panel soft-ring rounded-[1.8rem] p-5 text-white ${card.className}`}
                    style={{ backgroundImage: card.background }}
                  >
                    <div className="flex h-full min-h-[16rem] flex-col justify-end gap-3">
                      <span className="w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em]">
                        Curated scene
                      </span>
                      <h2 className="text-3xl leading-tight">{card.title}</h2>
                      <p className="max-w-xs text-sm leading-6 text-white/82">{card.copy}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="section-card rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
              {highlights.map((item) => (
                <article
                  key={item.tag}
                  className="rounded-[1.5rem] border border-white/60 bg-white/70 p-5"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--gold)]">
                    {item.tag}
                  </p>
                  <h2 className="mt-4 text-2xl leading-tight">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--copy)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="inquire" className="px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <article className="section-card rounded-[2rem] p-7 sm:p-8">
              <p className="section-label">Booking Inquiry</p>
              <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
                Choose your dates and send your booking request with complete details.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--copy)] sm:text-lg">
                Select your preferred stay dates, add your contact details, and review your
                inquiry before continuing to Facebook for confirmation with the host.
              </p>

              <div className="mt-8 grid gap-4">
                {[
                  "Send a complete booking inquiry in just a few taps",
                  "Share your preferred dates and guest count clearly",
                  "Review your message first before opening Facebook",
                  "Availability will be confirmed by the host after inquiry",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-white/60 bg-white/75 px-5 py-4 text-base leading-7 text-[var(--copy)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="section-card rounded-[2rem] p-7 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Check-in
                  </span>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(event) => setCheckIn(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--foreground)] outline-none ring-0"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Check-out
                  </span>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || undefined}
                    onChange={(event) => setCheckOut(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--foreground)] outline-none ring-0"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Guests
                  </span>
                  <select
                    value={guests}
                    onChange={(event) => setGuests(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--foreground)] outline-none ring-0"
                  >
                    {["1", "2", "3", "4"].map((value) => (
                      <option key={value} value={value}>
                        {value} guest{value === "1" ? "" : "s"}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Name
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Your full name"
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)]"
                  />
                </label>
              </div>

              <div className="mt-5 grid gap-5">
                <label className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Contact Number
                  </span>
                  <input
                    type="text"
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    placeholder="09XXXXXXXXX"
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)]"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    Notes
                  </span>
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Add special requests or preferred time."
                    rows={4}
                    className="w-full rounded-[1.2rem] border border-[var(--line)] bg-white px-4 py-3 text-base text-[var(--foreground)] outline-none ring-0 placeholder:text-[var(--muted)]"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleOpenFacebook}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--teal-deep)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(30,81,87,0.28)] hover:-translate-y-0.5 hover:bg-[var(--teal)]"
                >
                  Copy Details & Open Facebook
                </button>
                <button
                  type="button"
                  onClick={handleCopyInquiry}
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-6 py-4 text-sm font-semibold text-[var(--foreground)] hover:-translate-y-0.5 hover:border-[var(--gold)]"
                >
                  Copy Only
                </button>
              </div>

              <p className="mt-4 min-h-6 text-sm leading-6 text-[var(--teal-deep)]">
                {copyStatus || "After clicking, the user still manually pastes and sends the message in Facebook."}
              </p>

              <div className="mt-6 rounded-[1.6rem] border border-[var(--line)] bg-[#fffdfa] p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Your inquiry summary
                </p>
                <pre className="mt-4 whitespace-pre-wrap font-sans text-sm leading-7 text-[var(--copy)]">
                  {inquiryMessage}
                </pre>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="story" className="px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="About The Stay"
            title="A warm web experience shaped from the page's staycation energy."
            description="This first build translates the Facebook-page atmosphere into a proper landing page: less like a template, more like a polished condo feature with premium social-post energy."
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="section-card rounded-[1.75rem] p-6">
              <p className="section-label">What Guests Want Fast</p>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--copy)] sm:text-base">
                <li>Clear pool-view positioning and a modern, cozy feel.</li>
                <li>Proof that the space is practical, clean, and comfortable.</li>
                <li>Quick confidence in the location and building setup.</li>
                <li>One strong inquiry button that feels easy to trust.</li>
              </ul>
            </article>

            <article className="section-card rounded-[1.75rem] p-6">
              <p className="section-label">Brand Direction</p>
              <p className="mt-5 text-base leading-8 text-[var(--copy)]">
                Bright neutrals, sea-glass tones, curved cards, and editorial spacing keep
                the page aligned with a modern staycation listing instead of a generic
                booking template.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Clean luxury", "Pool-view calm", "Social-ready layout"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--foreground)]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Visual Story"
            title="Photo-first sections designed for the same scroll behavior as a strong property post."
            description="Even before real unit photos are added, the layout is structured to support a premium visual narrative: a dominant hero frame, supporting lifestyle scenes, and short captions that sell the mood quickly."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {galleryCards.map((card, index) => (
              <article
                key={card.title}
                className={`photo-panel soft-ring rounded-[2rem] p-6 text-white ${index === 0 ? "lg:col-span-2" : ""}`}
                style={{ backgroundImage: card.background }}
              >
                <div className="flex h-full min-h-[20rem] flex-col justify-between">
                  <span className="w-fit rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em]">
                    Scene {index + 1}
                  </span>
                  <div className="space-y-3">
                    <h2 className="text-4xl leading-tight">{card.title}</h2>
                    <p className="max-w-md text-sm leading-7 text-white/84 sm:text-base">
                      {card.copy}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="amenities" className="px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-10">
          <SectionHeading
            eyebrow="Amenities"
            title="Comfort details arranged to answer booking questions without slowing the page down."
            description="The grid below is structured for easy replacement once you send the final unit details. Right now it already mirrors the type of information guests expect from Facebook and staycation listings."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {amenityGroups.map((group) => (
              <article key={group.title} className="section-card rounded-[1.75rem] p-6">
                <p className="section-label">{group.title}</p>
                <ul className="mt-5 space-y-3 text-base leading-7 text-[var(--copy)]">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-2xl border border-white/50 bg-white/70 px-4 py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="location" className="px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="section-card rounded-[2rem] p-7 sm:p-8">
            <p className="section-label">Location Story</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">
              Built to feel convenient, credible, and easy to inquire about.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--copy)] sm:text-lg">
              The location section keeps the promise simple: modern condo staycation comfort
              in the Pasay area, with MOA-side convenience and a lifestyle-friendly setting.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {["Pasay City", "Near MOA area", "Staycation-ready", "Quick city access"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm text-[var(--foreground)]"
                  >
                    {label}
                  </span>
                )
              )}
            </div>
          </article>

          <article className="section-card rounded-[2rem] p-7 sm:p-8">
            <p className="section-label">Why It Works</p>
            <div className="mt-6 space-y-4">
              {locationFacts.map((fact) => (
                <div
                  key={fact}
                  className="rounded-[1.4rem] border border-white/60 bg-white/75 px-5 py-4 text-base leading-7 text-[var(--copy)]"
                >
                  {fact}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 py-12 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="section-card rounded-[2rem] p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
              <SectionHeading
                eyebrow="Why Guests Choose It"
                title="A trust-building section ready for guest reviews later."
                description="For now, this block sells the experience with concise decision-making points. Once you have review snippets, we can swap these into testimonial cards without changing the layout."
              />

              <div className="grid gap-4">
                {reasonsToChoose.map((reason, index) => (
                  <article
                    key={reason}
                    className="section-card-strong rounded-[1.5rem] px-5 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--teal-deep)] text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <p className="text-base leading-8 text-[var(--copy)]">{reason}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 pt-8 sm:px-8 lg:px-10 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <article className="photo-panel soft-ring rounded-[2.25rem] px-7 py-10 text-white sm:px-10 sm:py-12">
            <div
              className="absolute inset-0 -z-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 28%), linear-gradient(145deg, rgba(15,48,52,0.2), rgba(15,48,52,0.75)), linear-gradient(135deg, #93c0be 0%, #476d74 40%, #16363b 100%)",
              }}
            />

            <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 text-left">
              <p className="section-label !text-white/80">Final Call To Action</p>
              <h2 className="max-w-3xl text-balance text-4xl leading-tight sm:text-5xl md:text-6xl">
                Plan your City Cove stay and send your preferred dates in one tap.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                Choose your preferred schedule, review your inquiry details, then continue to
                Facebook to confirm availability with the host. Simple, direct, and easy for
                guests to follow.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href="#inquire"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-[var(--teal-deep)] hover:-translate-y-0.5 hover:bg-[#f5f3ee]"
                >
                  Check Availability
                </a>
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-white/14"
                >
                  Message on Facebook
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
