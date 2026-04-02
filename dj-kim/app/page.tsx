"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Entrance
      const tl = gsap.timeline();
      
      tl.from("[data-animate='hero-title']", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      })
      .from("[data-animate='hero-sub']", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .from("[data-animate='hero-cta']", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }, "-=0.4");

      // Floating Glows
      gsap.to("[data-animate='glow-1']", {
        x: "20%",
        y: "10%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to("[data-animate='glow-2']", {
        x: "-15%",
        y: "-20%",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Section Reveals
      gsap.utils.toArray<HTMLElement>("[data-animate='section']").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative min-h-screen bg-midnight text-white selection:bg-accent-pink/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          data-animate="glow-1"
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent-pink/10 blur-[120px]" 
        />
        <div 
          data-animate="glow-2"
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/10 blur-[140px]" 
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 sm:px-12 backdrop-blur-md bg-midnight/20 border-b border-white/5">
        <div className="text-xl font-bold tracking-tighter uppercase font-display">
          DJ KIM <span className="text-accent-pink">.</span>
        </div>
        <div className="hidden space-x-10 text-xs font-semibold uppercase tracking-widest sm:flex">
          <a href="#about" className="transition-colors hover:text-accent-pink">About</a>
          <a href="#residencies" className="transition-colors hover:text-accent-cyan">Residencies</a>
          <a href="#gigs" className="transition-colors hover:text-accent-sunset">Gigs</a>
          <a href="#booking" className="px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-midnight transition-all">Book Now</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center min-h-screen text-center px-6 pt-20">
        <div className="section-width z-10">
          <div data-animate="hero-sub" className="inline-block px-4 py-1.5 mb-6 rounded-full glass text-[10px] uppercase font-bold tracking-widest text-accent-cyan border-accent-cyan/20">
            Naga City &middot; Professional DJ &middot; Law
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl mb-8 leading-[0.9] tracking-tighter uppercase overflow-hidden">
            <span data-animate="hero-title" className="block text-glow-pink">The Law of</span>
            <span data-animate="hero-title" className="block outline-text">The Dancefloor</span>
          </h1>
          <p data-animate="hero-sub" className="max-w-2xl mx-auto mb-10 text-base md:text-lg text-text-muted leading-relaxed">
            Bridging the gap between the courtroom and the club. High-energy House, Nu-Disco, and Open Format curation by DJ Kim (iam.no.well).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div data-animate="hero-cta">
              <a href="#booking" className="px-10 py-5 rounded-full bg-accent-pink text-white font-bold uppercase tracking-wider shadow-lg shadow-accent-pink/20 hover:scale-105 active:scale-95 transition-all">
                Book for an Event
              </a>
            </div>
            <div data-animate="hero-cta">
              <a href="#residencies" className="px-10 py-5 rounded-full glass font-bold uppercase tracking-wider hover:bg-white/10 transition-all">
                Explore Residencies
              </a>
            </div>
          </div>
        </div>

        {/* Hero Bottom - Residencies Preview */}
        <div className="absolute bottom-12 left-0 right-0 hidden md:block">
          <div className="flex justify-center items-center gap-12 opacity-40 hover:opacity-100 transition-opacity">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Resident at:</span>
            <span className="text-sm font-display font-medium">CLUB ABOVE NAGA</span>
            <span className="text-xs">&mdash;</span>
            <span className="text-sm font-display font-medium">BEANS & BOTTLES</span>
          </div>
        </div>
      </section>

      {/* The Slashie Identity Section */}
      <section id="about" data-animate="section" className="py-24 md:py-32 section-width">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square rounded-3xl overflow-hidden glass p-2 hover-lift">
             {/* Placeholder for DJ Kim Photo */}
             <div className="w-full h-full rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center group overflow-hidden">
                <span className="text-zinc-700 text-6xl font-display opacity-20 uppercase tracking-tighter">PHOTO</span>
                <div className="absolute inset-0 bg-accent-pink/10 opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-cyan/20 blur-2xl rounded-full" />
          </div>
          <div className="space-y-8">
            <div className="inline-block px-3 py-1 rounded-md bg-accent-pink/10 text-accent-pink text-[10px] font-bold uppercase tracking-widest">
              The Identity
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase leading-tight">
              Lawyer by Day, <br /><span className="text-accent-cyan italic">Curation by Night.</span>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed">
              Kim Noelle (iam.no.well) lives a life of duality. By day, he navigates the complex world of Law; by night, he commands the decks of Naga City's premier venues. This unique perspective brings a deliberate, sophisticated energy to every set.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl glass border-l-2 border-accent-pink">
                <h3 className="text-xl mb-2 text-accent-pink">⚖️ Law</h3>
                <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Professional Pursuit</p>
              </div>
              <div className="p-6 rounded-2xl glass border-l-2 border-accent-cyan">
                <h3 className="text-xl mb-2 text-accent-cyan">💿 DJ</h3>
                <p className="text-xs text-text-muted uppercase tracking-wider font-bold">Musical Curation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Residencies Section */}
      <section id="residencies" data-animate="section" className="py-24 md:py-32 section-width">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl uppercase tracking-tighter">Premier Residencies</h2>
          <p className="text-text-muted max-w-xl mx-auto">Where the energy meets the Law of the Dancefloor. Find DJ Kim at these Naga City hotspots.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass rounded-[2rem] p-10 hover-lift group">
            <div className="w-14 h-14 rounded-2xl bg-accent-pink/20 flex items-center justify-center mb-8 border border-accent-pink/30">
              <span className="text-accent-pink text-2xl font-bold">A</span>
            </div>
            <h3 className="text-3xl mb-4 font-display">CLUB ABOVE</h3>
            <p className="text-text-muted mb-8 leading-relaxed">Naga City's ultimate nightlife destination. Catch high-energy House and Open Format sets during prime weekend nights.</p>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-pink group-hover:translate-x-2 transition-transform">
              Fri &bull; Sat Nights &rarr;
            </div>
          </div>
          <div className="glass rounded-[2rem] p-10 hover-lift group">
            <div className="w-14 h-14 rounded-2xl bg-accent-cyan/20 flex items-center justify-center mb-8 border border-accent-cyan/30">
              <span className="text-accent-cyan text-2xl font-bold">B</span>
            </div>
            <h3 className="text-3xl mb-4 font-display">BEANS & BOTTLES</h3>
            <p className="text-text-muted mb-8 leading-relaxed">Sophisticated sunset sessions and smooth Nu-Disco vibes. Perfect for lounging with a curated musical backdrop.</p>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent-cyan group-hover:translate-x-2 transition-transform">
              Sunset Gigs &rarr;
            </div>
          </div>
        </div>
      </section>

      {/* Signature Sets & Visual Vibe */}
      <section id="gigs" data-animate="section" className="py-24 md:py-32 bg-white/5 backdrop-blur-sm">
        <div className="section-width">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl space-y-4">
              <div className="inline-block px-3 py-1 rounded-md bg-accent-sunset/10 text-accent-sunset text-[10px] font-bold uppercase tracking-widest">
                The Vibe
              </div>
              <h2 className="text-4xl md:text-5xl uppercase tracking-tighter">Signature Sets</h2>
              <p className="text-text-muted">Curation inspired by the horizons of Naga City and the energy of the urban elite.</p>
            </div>
            <div className="hidden md:block">
              <a href="https://www.instagram.com/iam.no.well" target="_blank" className="text-xs font-bold uppercase tracking-widest text-accent-pink hover:text-white transition-colors border-b border-accent-pink/30 pb-2">View Social Feed</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative group aspect-[3/4] rounded-3xl overflow-hidden glass hover-lift">
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('/sunset-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-60" />
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-sunset mb-2">Golden Hour</p>
                <h3 className="text-2xl uppercase">Sunset Gigs</h3>
              </div>
            </div>
            <div className="relative group aspect-[3/4] md:translate-y-12 rounded-3xl overflow-hidden glass hover-lift">
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('/neon-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-60" />
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-pink mb-2">High Energy</p>
                <h3 className="text-2xl uppercase">Rooftop Socials</h3>
              </div>
            </div>
            <div className="relative group aspect-[3/4] rounded-3xl overflow-hidden glass hover-lift">
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/20 to-transparent z-10" />
              <div className="absolute inset-0 bg-[url('/techno-bg.jpg')] bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-60" />
              <div className="absolute bottom-8 left-8 z-20">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-cyan mb-2">Late Night</p>
                <h3 className="text-2xl uppercase">Club Overload</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Footer */}
      <footer id="booking" className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50 z-0" />
        <div className="section-width relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-10 rounded-full glass text-[10px] uppercase font-bold tracking-widest text-accent-sunset border-accent-sunset/20">
            Available for Bookings
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl mb-12 uppercase leading-[0.9] tracking-tighter">
            Command the <br /><span className="text-glow-cyan text-accent-cyan">Floor.</span>
          </h2>
          <div className="space-y-8">
            <a 
              href="https://www.instagram.com/iam.no.well" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-white text-midnight text-lg font-bold uppercase tracking-widest hover:bg-accent-pink hover:text-white transition-all hover:scale-105 active:scale-95"
            >
              Inquire via Instagram DM
            </a>
            <div className="flex justify-center gap-10 text-text-muted pt-8">
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Email</a>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/20 pt-16 font-medium">
              &copy; 2024 DJ KIM &middot; Naga City, Philippines &middot; Designed by Antigravity
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .outline-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </main>
  );
}
