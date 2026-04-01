export const SITE_CONTENT_STORAGE_KEY = "stacy-site-content-v1";
export const SITE_CONTENT_EVENT = "stacy-site-content-updated";
export const OWNER_SESSION_STORAGE_KEY = "stacy-owner-session-v1";
export const OWNER_PASSWORD_STORAGE_KEY = "stacy-owner-password-v1";
export const DEFAULT_OWNER_PASSWORD = "stacy-owner-2026";

export type HeroStat = {
  value: string;
  label: string;
};

export type FeatureItem = {
  title: string;
  text: string;
  icon: "tag" | "sparkles" | "stack" | "chat";
};

export type CategoryItem = {
  title: string;
  text: string;
  image: string;
  price: string;
  badge: string;
  layout: string;
};

export type SlideItem = {
  title: string;
  tag: string;
  image: string;
};

export type StepItem = {
  title: string;
  text: string;
};

export type TestimonialItem = {
  name: string;
  quote: string;
};

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    logoPath: string;
    announcement: string;
  };
  links: {
    facebookUrl: string;
    messengerUrl: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    pills: string[];
    stats: HeroStat[];
  };
  features: FeatureItem[];
  slides: SlideItem[];
  categories: CategoryItem[];
  steps: StepItem[];
  testimonials: TestimonialItem[];
  trust: string[];
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  footer: {
    text: string;
    ownerLinkLabel: string;
  };
};

export const availableImageOptions = [
  "/stacy-logo.jpg",
  "/img/657576098_1376495067834290_9163013850703279435_n.jpg",
  "/img/657948139_1376493581167772_4042167179065393927_n.jpg",
  "/img/658125919_1376494814500982_8282276342450375921_n.jpg",
  "/img/658132576_1376495107834286_7444600315804004551_n.jpg",
  "/img/658830157_1376495631167567_5484416353753710479_n.jpg",
  "/img/658964028_1376494084501055_3485864027219705420_n.jpg",
  "/img/659250304_1376495377834259_8687871249592187237_n.jpg",
  "/img/661444226_1376494911167639_5021627411567300326_n.jpg",
] as const;

export const defaultSiteContent: SiteContent = {
  brand: {
    name: "Stacy Thrifts",
    tagline: "Stylish ukay finds on Facebook",
    logoPath: "/stacy-logo.jpg",
    announcement: "New drops every week",
  },
  links: {
    facebookUrl:
      "https://www.facebook.com/stacythrifts?mibextid=wwXIfr&rdid=yFKJRsyOBJAiFb8P&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F19pGr94Wd2%2F%3Fmibextid%3DwwXIfr#",
    messengerUrl: "https://m.me/stacythrifts",
  },
  hero: {
    badge: "Fresh Facebook Finds",
    title:
      "Preloved pieces that feel pretty, current, and worth claiming fast.",
    description:
      "Stacy Thrifts brings together curated ukay finds, budget-friendly steals, and soft feminine styling for shoppers who want cute outfits without overspending.",
    primaryCta: "Shop on Facebook",
    secondaryCta: "Message Us",
    pills: [
      "Affordable preloved finds",
      "Curated trendy styles",
      "Bundle deals",
    ],
    stats: [
      { value: "50+", label: "happy shoppers" },
      { value: "Weekly", label: "fresh new drops" },
      { value: "Bundle", label: "deals worth claiming" },
    ],
  },
  features: [
    {
      title: "Affordable preloved finds",
      text: "Pretty pieces, everyday staples, and soft statement looks without the boutique markup.",
      icon: "tag",
    },
    {
      title: "Curated trendy styles",
      text: "Each drop is handpicked to feel current, wearable, and easy to style for real life.",
      icon: "sparkles",
    },
    {
      title: "Bundle deals",
      text: "Reserve more than one item and stretch your budget with easy mix-and-match picks.",
      icon: "stack",
    },
    {
      title: "New drops regularly",
      text: "Fresh finds keep the page exciting, with fast replies when you are ready to claim.",
      icon: "chat",
    },
  ],
  slides: [
    {
      title: "Sweet everyday dress",
      tag: "Dresses",
      image: "/img/657576098_1376495067834290_9163013850703279435_n.jpg",
    },
    {
      title: "Cute daily top",
      tag: "Tops",
      image: "/img/657948139_1376493581167772_4042167179065393927_n.jpg",
    },
    {
      title: "Easy wear bottoms",
      tag: "Pants",
      image: "/img/658125919_1376494814500982_8282276342450375921_n.jpg",
    },
    {
      title: "Layer-ready jacket",
      tag: "Jackets",
      image: "/img/658132576_1376495107834286_7444600315804004551_n.jpg",
    },
    {
      title: "Sulit bundle picks",
      tag: "Bundles",
      image: "/img/658830157_1376495631167567_5484416353753710479_n.jpg",
    },
    {
      title: "Fresh drop favorite",
      tag: "Featured",
      image: "/img/658964028_1376494084501055_3485864027219705420_n.jpg",
    },
    {
      title: "Prettiest neutral set",
      tag: "Trending",
      image: "/img/659250304_1376495377834259_8687871249592187237_n.jpg",
    },
    {
      title: "New arrival steal",
      tag: "New Drop",
      image: "/img/661444226_1376494911167639_5021627411567300326_n.jpg",
    },
  ],
  categories: [
    {
      title: "Dresses",
      text: "Soft florals, date-night minis, and easy everyday silhouettes.",
      image: "/img/657576098_1376495067834290_9163013850703279435_n.jpg",
      price: "From P299",
      badge: "Best seller",
      layout: "xl:col-span-7 xl:row-span-2",
    },
    {
      title: "Tops",
      text: "Baby tees, knit tanks, and cute staples that go with everything.",
      image: "/img/657948139_1376493581167772_4042167179065393927_n.jpg",
      price: "Easy steals",
      badge: "Daily wear",
      layout: "xl:col-span-5",
    },
    {
      title: "Pants",
      text: "Relaxed denim, trousers, and repeat-wear bottoms for daily styling.",
      image: "/img/658125919_1376494814500982_8282276342450375921_n.jpg",
      price: "Fresh drop",
      badge: "Repeat wear",
      layout: "xl:col-span-5",
    },
    {
      title: "Jackets",
      text: "Layering pieces that instantly make simple outfits look styled.",
      image: "/img/658132576_1376495107834286_7444600315804004551_n.jpg",
      price: "Limited pieces",
      badge: "Layering picks",
      layout: "xl:col-span-4",
    },
    {
      title: "Bundle Deals",
      text: "Budget-friendly combos for shoppers who love a full haul.",
      image: "/img/658830157_1376495631167567_5484416353753710479_n.jpg",
      price: "3 for less",
      badge: "Sulit bundle",
      layout: "xl:col-span-8",
    },
  ],
  steps: [
    {
      title: "Browse the latest drops",
      text: "See the newest Facebook posts and shortlist your favorites.",
    },
    {
      title: "Comment or message to reserve",
      text: "Claim the piece before someone else grabs it first.",
    },
    {
      title: "Pay and wait for delivery",
      text: "Confirm your order, settle payment, and get ready for your haul.",
    },
  ],
  testimonials: [
    {
      name: "Mika, repeat buyer",
      quote:
        "Super worth it. The dress looked even better in person and the reply was so quick.",
    },
    {
      name: "Aly, first-time shopper",
      quote:
        "The bundle deals are so sulit. I got three cute pieces for less than a mall top.",
    },
    {
      name: "Trish, campus shopper",
      quote:
        "It feels curated, not random. Easy to browse, easy to reserve, and everything is stylish.",
    },
  ],
  trust: [
    "Affordable prices",
    "Legit seller",
    "Fast replies",
    "Quality thrift finds",
  ],
  cta: {
    eyebrow: "Facebook CTA",
    title: "Ready for your next budget-friendly outfit haul?",
    description:
      "Visit Stacy Thrifts on Facebook, reserve your favorites, and message the shop before the best pieces disappear.",
    primaryCta: "Shop on Facebook",
    secondaryCta: "Message Us",
  },
  footer: {
    text: "Curated preloved fashion for stylish girls who love affordable finds, quick claims, and fresh new drops.",
    ownerLinkLabel: "Owner login",
  },
};

export function cloneSiteContent(
  content: SiteContent = defaultSiteContent,
): SiteContent {
  return JSON.parse(JSON.stringify(content)) as SiteContent;
}

export function loadSiteContent(): SiteContent {
  if (typeof window === "undefined") {
    return cloneSiteContent(defaultSiteContent);
  }

  const raw = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);

  if (!raw) {
    return cloneSiteContent(defaultSiteContent);
  }

  try {
    const parsed = JSON.parse(raw) as Partial<SiteContent>;

    return {
      ...cloneSiteContent(defaultSiteContent),
      ...parsed,
      brand: {
        ...defaultSiteContent.brand,
        ...parsed.brand,
      },
      links: {
        ...defaultSiteContent.links,
        ...parsed.links,
      },
      hero: {
        ...defaultSiteContent.hero,
        ...parsed.hero,
        pills: parsed.hero?.pills ?? cloneSiteContent(defaultSiteContent).hero.pills,
        stats: parsed.hero?.stats ?? cloneSiteContent(defaultSiteContent).hero.stats,
      },
      features: parsed.features ?? cloneSiteContent(defaultSiteContent).features,
      slides: parsed.slides ?? cloneSiteContent(defaultSiteContent).slides,
      categories:
        parsed.categories ?? cloneSiteContent(defaultSiteContent).categories,
      steps: parsed.steps ?? cloneSiteContent(defaultSiteContent).steps,
      testimonials:
        parsed.testimonials ?? cloneSiteContent(defaultSiteContent).testimonials,
      trust: parsed.trust ?? cloneSiteContent(defaultSiteContent).trust,
      cta: {
        ...defaultSiteContent.cta,
        ...parsed.cta,
      },
      footer: {
        ...defaultSiteContent.footer,
        ...parsed.footer,
      },
    };
  } catch {
    return cloneSiteContent(defaultSiteContent);
  }
}

export function saveSiteContent(content: SiteContent) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    SITE_CONTENT_STORAGE_KEY,
    JSON.stringify(content),
  );
  window.dispatchEvent(new Event(SITE_CONTENT_EVENT));
}

export function resetSiteContent() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
  window.dispatchEvent(new Event(SITE_CONTENT_EVENT));
}

export function getOwnerPassword() {
  if (typeof window === "undefined") {
    return DEFAULT_OWNER_PASSWORD;
  }

  return (
    window.localStorage.getItem(OWNER_PASSWORD_STORAGE_KEY) ??
    DEFAULT_OWNER_PASSWORD
  );
}

export function saveOwnerPassword(password: string) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(OWNER_PASSWORD_STORAGE_KEY, password);
}

export function isOwnerSessionActive() {
  if (typeof window === "undefined") return false;

  return window.localStorage.getItem(OWNER_SESSION_STORAGE_KEY) === "true";
}

export function setOwnerSessionActive(active: boolean) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    OWNER_SESSION_STORAGE_KEY,
    active ? "true" : "false",
  );
}
