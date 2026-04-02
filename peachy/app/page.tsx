"use client";

import Image from "next/image";
import { useState } from "react";

const FB_URL =
  "https://www.facebook.com/mspeachyscuisine?rdid=xG7b1RsCaeegJUmS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1As4Q4pDrD";
const IG_URL =
  "https://www.instagram.com/misspeachyscuisine";

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "How to Order", href: "#order" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    icon: "🍽️",
    title: "Home-style Comfort",
    text: "Every dish is cooked with the warmth and generosity of a family kitchen.",
  },
  {
    icon: "🎉",
    title: "Celebration Ready",
    text: "From birthdays to reunions, we handle the food so you can enjoy the moment.",
  },
  {
    icon: "💬",
    title: "Easy Facebook Orders",
    text: "No complicated checkout — just message us and we'll take it from there.",
  },
];

const menuItems = [
  {
    image: "/img/party-tray.png",
    tag: "Best Seller",
    title: "Party Trays",
    description:
      "Generous platters of adobo, pancit, lechon kawali, and more — perfect for big gatherings and celebrations.",
    badge: "Feeds 10–20 pax",
  },
  {
    image: "/img/meal.png",
    tag: "Daily Special",
    title: "Made-to-Order Meals",
    description:
      "Comforting everyday Filipino dishes cooked fresh and packed with love. Great for lunch deliveries and family dinners.",
    badge: "Order by 10 AM",
  },
  {
    image: "/img/hero-food.png",
    tag: "For Events",
    title: "Event Bundles",
    description:
      "Complete food packages designed for milestone celebrations, office parties, and community events.",
    badge: "Custom sizing",
  },
];

const orderSteps = [
  {
    num: "01",
    icon: "📱",
    title: "Visit our Facebook Page",
    text: "Check our latest posts for the current menu, availability, and today's special offers.",
  },
  {
    num: "02",
    icon: "✏️",
    title: "Send Us a Message",
    text: "Tell us what you'd like to order, your preferred date, serving size, and any special requests.",
  },
  {
    num: "03",
    icon: "✅",
    title: "Confirm & Enjoy",
    text: "We'll confirm the details in Messenger, then coordinate pickup or delivery. That's it!",
  },
];

const faqs = [
  {
    q: "How do I place an order?",
    a: "Simply visit our Facebook page and send us a message! We'll guide you through the menu, quantities, and scheduling.",
  },
  {
    q: "Do you accept advance orders for events?",
    a: "Yes! We highly recommend booking at least 3–5 days ahead for party trays and event bundles to ensure availability.",
  },
  {
    q: "Can I customize my order?",
    a: "Absolutely. Message us your preferences — portion size, dish choices, dietary needs — and we'll do our best to accommodate.",
  },
  {
    q: "Do you offer delivery?",
    a: "Yes, within the area. Message us your location and we'll confirm delivery availability and any applicable fees.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main id="top" className="relative overflow-x-hidden" style={{ fontFamily: "var(--font-body)" }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,250,244,0.92)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(120,50,20,0.10)",
        boxShadow: "0 2px 24px rgba(120,50,20,0.07)"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          {/* Logo */}
          <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #c85e2f, #e07a48)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0, boxShadow: "0 4px 14px rgba(200,94,47,0.35)"
            }}>🍑</div>
            <div>
              <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--color-ink)", lineHeight: 1.1, letterSpacing: "-0.01em" }}>Ms. Peachy&apos;s</p>
              <p style={{ fontSize: 11, color: "var(--color-ink-soft)", letterSpacing: "0.14em", textTransform: "uppercase", lineHeight: 1 }}>Cuisine</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: 14, fontWeight: 500, color: "var(--color-ink-soft)", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--color-ink-soft)")}
              >{l.label}</a>
            ))}
            <a href={FB_URL} target="_blank" rel="noreferrer" style={{
              background: "linear-gradient(135deg, #c85e2f, #e07a48)",
              color: "#fff", border: "none", borderRadius: 50,
              padding: "10px 24px", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.04em", cursor: "pointer", textDecoration: "none",
              boxShadow: "0 4px 18px rgba(200,94,47,0.32)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,94,47,0.42)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 18px rgba(200,94,47,0.32)"; }}
            >Order Now</a>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6 }} className="mobile-burger" aria-label="Menu">
            <div style={{ width: 22, height: 2, background: "var(--color-ink)", borderRadius: 2, marginBottom: 5, transition: "all 0.2s" }} />
            <div style={{ width: 22, height: 2, background: "var(--color-ink)", borderRadius: 2, marginBottom: 5 }} />
            <div style={{ width: 16, height: 2, background: "var(--color-ink)", borderRadius: 2 }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid rgba(120,50,20,0.10)", background: "rgba(255,250,244,0.98)", padding: "16px 24px 20px" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "10px 0", fontSize: 15, fontWeight: 500, color: "var(--color-ink-soft)", borderBottom: "1px solid rgba(120,50,20,0.06)" }}>{l.label}</a>
            ))}
            <a href={FB_URL} target="_blank" rel="noreferrer" style={{ display: "block", marginTop: 12, textAlign: "center", background: "linear-gradient(135deg, #c85e2f, #e07a48)", color: "#fff", borderRadius: 50, padding: "12px 24px", fontWeight: 600, fontSize: 14 }}>Order on Facebook</a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 24px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
        {/* Left */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,94,47,0.10)", border: "1px solid rgba(200,94,47,0.22)", borderRadius: 50, padding: "6px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 13 }}>🍑</span>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)" }}>Ms. Peachy&apos;s Cuisine</span>
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 5vw, 3.8rem)", lineHeight: 1.1, color: "var(--color-ink)", marginBottom: 20, fontWeight: 700 }}>
            Comfort food that brings everyone{" "}
            <em style={{ color: "var(--color-accent)", fontStyle: "italic" }}>together.</em>
          </h1>

          <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--color-ink-soft)", maxWidth: 480, marginBottom: 36 }}>
            From everyday family meals to big celebration party trays — Ms. Peachy&apos;s Cuisine delivers warm, generous Filipino food straight to your table.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href={FB_URL} target="_blank" rel="noreferrer" style={{
              background: "linear-gradient(135deg, #c85e2f, #e07a48)", color: "#fff",
              borderRadius: 50, padding: "14px 32px", fontSize: 14, fontWeight: 600,
              letterSpacing: "0.04em", textDecoration: "none",
              boxShadow: "0 8px 28px rgba(200,94,47,0.38)",
              transition: "transform 0.2s, box-shadow 0.2s", display: "inline-block"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(200,94,47,0.48)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,94,47,0.38)"; }}
            >
              🍽️ Order on Facebook
            </a>
            <a href="#menu" style={{
              border: "2px solid rgba(120,50,20,0.18)", borderRadius: 50, padding: "13px 28px",
              fontSize: 14, fontWeight: 600, color: "var(--color-ink)", textDecoration: "none",
              background: "rgba(255,255,255,0.8)", transition: "all 0.2s", display: "inline-block"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = "rgba(200,94,47,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.borderColor = "rgba(120,50,20,0.18)"; }}
            >
              View Menu ↓
            </a>
          </div>

          {/* Social proof strip */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(120,50,20,0.10)" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--color-ink)", lineHeight: 1 }}>500+</p>
              <p style={{ fontSize: 11, color: "var(--color-ink-muted)", letterSpacing: "0.08em", marginTop: 4 }}>Happy Customers</p>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(120,50,20,0.12)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--color-ink)", lineHeight: 1 }}>5★</p>
              <p style={{ fontSize: 11, color: "var(--color-ink-muted)", letterSpacing: "0.08em", marginTop: 4 }}>Facebook Rating</p>
            </div>
            <div style={{ width: 1, height: 36, background: "rgba(120,50,20,0.12)" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--color-ink)", lineHeight: 1 }}>24h</p>
              <p style={{ fontSize: 11, color: "var(--color-ink-muted)", letterSpacing: "0.08em", marginTop: 4 }}>Fast Response</p>
            </div>
          </div>
        </div>

        {/* Right — hero image */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -16,
            background: "radial-gradient(ellipse at 60% 40%, rgba(255,160,100,0.22), transparent 70%)",
            borderRadius: "50%", filter: "blur(40px)", zIndex: 0
          }} />
          <div style={{
            position: "relative", zIndex: 1,
            borderRadius: "2rem", overflow: "hidden",
            boxShadow: "var(--shadow-hero)",
            border: "4px solid rgba(255,255,255,0.85)"
          }}>
            <Image src="/img/hero-food.png" alt="Delicious Filipino food spread by Ms. Peachy's Cuisine" width={600} height={480} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} priority />
          </div>
          {/* Floating badge */}
          <div style={{
            position: "absolute", bottom: 24, left: -20, zIndex: 2,
            background: "#fff", borderRadius: "1.2rem",
            padding: "12px 20px",
            boxShadow: "0 12px 40px rgba(120,50,20,0.18)",
            border: "1px solid rgba(120,50,20,0.08)"
          }}>
            <p style={{ fontSize: 11, color: "var(--color-accent)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Now Accepting</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-ink)", marginTop: 2 }}>Party Tray Orders 🎉</p>
          </div>
        </div>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section style={{ maxWidth: 1200, margin: "72px auto 0", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="features-grid">
          {features.map((f) => (
            <div key={f.title} style={{
              background: "#fff", borderRadius: "1.6rem",
              border: "1px solid rgba(120,50,20,0.10)",
              padding: "28px 24px",
              boxShadow: "var(--shadow-card)",
              transition: "transform 0.25s, box-shadow 0.25s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card-hover)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card)"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 17, color: "var(--color-ink)", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-ink-soft)" }}>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MENU SECTION ── */}
      <section id="menu" style={{ maxWidth: 1200, margin: "88px auto 0", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 14 }}>Our Specialties</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "var(--color-ink)", lineHeight: 1.2 }}>
            Something delicious for every occasion
          </h2>
          <p style={{ marginTop: 12, fontSize: 16, color: "var(--color-ink-soft)", maxWidth: 520, margin: "12px auto 0" }}>
            Generous portions, home-style cooking, and dishes crafted for sharing.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.title} style={{
              background: "#fff",
              borderRadius: "2rem",
              border: "1px solid rgba(120,50,20,0.10)",
              overflow: "hidden",
              boxShadow: "var(--shadow-card)",
              transition: "transform 0.25s, box-shadow 0.25s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card-hover)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "var(--shadow-card)"; }}
            >
              <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
                <div style={{
                  position: "absolute", top: 14, left: 14,
                  background: "linear-gradient(135deg, #c85e2f, #e07a48)",
                  color: "#fff", borderRadius: 50,
                  padding: "4px 14px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em"
                }}>{item.tag}</div>
              </div>
              <div style={{ padding: "22px 22px 24px" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--color-ink)", marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--color-ink-soft)", marginBottom: 16 }}>{item.description}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    background: "rgba(200,94,47,0.08)", color: "var(--color-accent)",
                    borderRadius: 50, padding: "4px 14px", fontSize: 12, fontWeight: 600, border: "1px solid rgba(200,94,47,0.18)"
                  }}>{item.badge}</span>
                  <a href={FB_URL} target="_blank" rel="noreferrer" style={{ fontSize: 13, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none" }}>Order →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW TO ORDER ── */}
      <section id="order" style={{ margin: "88px 0 0", background: "linear-gradient(170deg, #1e0e07 0%, #3a1a0a 100%)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-peach)", marginBottom: 14 }}>Simple Process</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
              Ordering is as easy as saying
              <em style={{ color: "var(--color-peach-light)", fontStyle: "italic" }}> "Isa pa!"</em>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }} className="steps-grid">
            {orderSteps.map((step, i) => (
              <div key={step.title} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: "1.8rem", padding: "30px 26px",
                backdropFilter: "blur(10px)",
                transition: "background 0.25s"
              }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.10)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.06)"}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg, #c85e2f, #e07a48)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0, fontWeight: 700, color: "#fff",
                    boxShadow: "0 6px 20px rgba(200,94,47,0.40)"
                  }}>{step.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,220,180,0.55)" }}>{step.num}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,224,196,0.80)" }}>{step.text}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <a href={FB_URL} target="_blank" rel="noreferrer" style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #c85e2f, #e07a48)",
              color: "#fff", borderRadius: 50, padding: "16px 40px",
              fontWeight: 600, fontSize: 15, letterSpacing: "0.04em",
              boxShadow: "0 10px 36px rgba(200,94,47,0.45)", textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 50px rgba(200,94,47,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 10px 36px rgba(200,94,47,0.45)"; }}
            >
              Start Your Order on Facebook 🍽️
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ maxWidth: 760, margin: "88px auto 0", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 14 }}>FAQ</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 700, color: "var(--color-ink)" }}>
            Common questions, quick answers
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((item, i) => (
            <div key={i} style={{
              background: "#fff", borderRadius: "1.4rem",
              border: "1px solid rgba(120,50,20,0.10)",
              overflow: "hidden", boxShadow: "0 4px 20px rgba(120,50,20,0.06)"
            }}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "20px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left"
              }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: "var(--color-ink)" }}>{item.q}</span>
                <span style={{ fontSize: 20, color: "var(--color-accent)", transition: "transform 0.2s", transform: openFaq === i ? "rotate(45deg)" : "none", flexShrink: 0, marginLeft: 12 }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--color-ink-soft)" }}>{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section id="contact" style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 24px" }}>
        <div style={{
          borderRadius: "2.4rem",
          background: "linear-gradient(135deg, #7d2e14 0%, #b84b25 50%, #d97038 100%)",
          padding: "60px 48px",
          boxShadow: "0 32px 90px rgba(120,50,20,0.25)",
          display: "flex", flexDirection: "column", gap: 32, alignItems: "center", textAlign: "center"
        }} className="cta-inner">
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,220,190,0.80)", marginBottom: 16 }}>Ready to Order?</p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, maxWidth: 600 }}>
              Let&apos;s make your next meal or celebration memorable.
            </h2>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.7, color: "rgba(255,235,220,0.88)", maxWidth: 480, margin: "16px auto 0" }}>
              Message us on Facebook or Instagram and we&apos;ll help you plan the perfect food experience.
            </p>
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <a href={FB_URL} target="_blank" rel="noreferrer" style={{
              background: "#fff", color: "var(--color-accent-deep)",
              borderRadius: 50, padding: "15px 34px", fontWeight: 700, fontSize: 14,
              letterSpacing: "0.04em", textDecoration: "none",
              boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
              transition: "transform 0.2s", display: "inline-block"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
              onMouseLeave={e => e.currentTarget.style.transform = ""}
            >📘 Facebook Page</a>
            <a href={IG_URL} target="_blank" rel="noreferrer" style={{
              border: "2px solid rgba(255,255,255,0.40)", color: "#fff",
              borderRadius: 50, padding: "14px 34px", fontWeight: 600, fontSize: 14,
              letterSpacing: "0.04em", textDecoration: "none",
              transition: "all 0.2s", display: "inline-block"
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.65)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = "rgba(255,255,255,0.40)"; }}
            >📸 Instagram</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ margin: "64px 0 0", borderTop: "1px solid rgba(120,50,20,0.10)", background: "rgba(255,250,244,0.6)", padding: "40px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #c85e2f, #e07a48)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18
            }}>🍑</div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--color-ink)" }}>Ms. Peachy&apos;s Cuisine</p>
          </div>

          <nav style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: 13, color: "var(--color-ink-muted)", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--color-accent)"}
                onMouseLeave={e => e.currentTarget.style.color = "var(--color-ink-muted)"}
              >{l.label}</a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 14 }}>
            <a href={FB_URL} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 7,
              fontSize: 13, fontWeight: 600, color: "#1877f2",
              background: "rgba(24,119,242,0.08)", border: "1px solid rgba(24,119,242,0.20)",
              borderRadius: 50, padding: "8px 18px", textDecoration: "none", transition: "all 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(24,119,242,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(24,119,242,0.08)"}
            >📘 Facebook</a>
            <a href={IG_URL} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 7,
              fontSize: 13, fontWeight: 600, color: "#e1306c",
              background: "rgba(225,48,108,0.08)", border: "1px solid rgba(225,48,108,0.20)",
              borderRadius: 50, padding: "8px 18px", textDecoration: "none", transition: "all 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(225,48,108,0.14)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(225,48,108,0.08)"}
            >📸 Instagram</a>
          </div>

          <p style={{ fontSize: 12, color: "var(--color-ink-muted)" }}>
            © {new Date().getFullYear()} Ms. Peachy&apos;s Cuisine · All rights reserved
          </p>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .menu-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          .mobile-burger { display: flex !important; flex-direction: column; }
          .cta-inner { padding: 40px 24px !important; }
        }
        @media (min-width: 600px) and (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2,1fr) !important; }
          .steps-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </main>
  );
}
