import { useState, useEffect, useRef, useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  Mountain, Waves, Landmark, UtensilsCrossed, ShoppingBag, PawPrint, Trees,
  Sun, Moon, MapPin, Calendar, Users, Wallet, Plane, Car, Train, Bus,
  CloudSun, CloudRain, Cloud, CloudLightning, Snowflake, Star, Heart,
  Share2, Download, X, Menu, ChevronDown, ChevronRight, Search, Globe,
  LogIn, User, Upload, Check, ArrowRight, Sparkles, Bot, Send, Quote,
  Clock, DollarSign, Ship, Compass, Camera, BadgeCheck, ThumbsUp,
  Mail, Phone, MapPinned, Trash2, Link2, MessageCircle, Video, Rss,
} from "lucide-react";

/* ----------------------------------------------------------------------
   DATA
---------------------------------------------------------------------- */

const T = {
  en: {
    nav: ["Home", "Plan a Trip", "Destinations", "Packages", "Map", "Blog", "Reviews", "FAQ", "Contact"],
    heroTitle: "Plan Your Dream Journey with AI",
    heroSub: "Tell us your vibe — our AI travel planner builds a day-by-day itinerary with hotels, food, transport and costs, in seconds.",
    planTrip: "Plan a Trip",
    explore: "Explore Destinations",
  },
  es: {
    nav: ["Inicio", "Planear Viaje", "Destinos", "Paquetes", "Mapa", "Blog", "Reseñas", "Preguntas", "Contacto"],
    heroTitle: "Planifica el Viaje de tus Sueños con IA",
    heroSub: "Cuéntanos tu estilo — nuestra IA crea un itinerario día a día con hoteles, comida, transporte y costos, en segundos.",
    planTrip: "Planear Viaje",
    explore: "Explorar Destinos",
  },
  fr: {
    nav: ["Accueil", "Planifier", "Destinations", "Forfaits", "Carte", "Blog", "Avis", "FAQ", "Contact"],
    heroTitle: "Planifiez le Voyage de vos Rêves avec l'IA",
    heroSub: "Partagez vos envies — notre IA crée un itinéraire jour par jour avec hôtels, repas, transport et budget, en quelques secondes.",
    planTrip: "Planifier un Voyage",
    explore: "Explorer les Destinations",
  },
};

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1800&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80&auto=format&fit=crop",
];

const INTERESTS = [
  { id: "adventure", label: "Adventure", icon: Mountain, color: "from-orange-500 to-rose-500" },
  { id: "nature", label: "Nature", icon: Trees, color: "from-emerald-500 to-green-600" },
  { id: "beaches", label: "Beaches", icon: Waves, color: "from-sky-400 to-blue-600" },
  { id: "culture", label: "Culture", icon: Landmark, color: "from-purple-500 to-indigo-600" },
  { id: "food", label: "Food", icon: UtensilsCrossed, color: "from-amber-500 to-orange-600" },
  { id: "shopping", label: "Shopping", icon: ShoppingBag, color: "from-pink-500 to-fuchsia-600" },
  { id: "wildlife", label: "Wildlife", icon: PawPrint, color: "from-lime-500 to-emerald-600" },
];

const TRANSPORTS = [
  { id: "flight", label: "Flight", icon: Plane },
  { id: "train", label: "Train", icon: Train },
  { id: "car", label: "Car Rental", icon: Car },
  { id: "bus", label: "Bus / Coach", icon: Bus },
  { id: "cruise", label: "Cruise", icon: Ship },
];

const DESTINATIONS = [
  { name: "Santorini", country: "Greece", price: 1450, rating: 4.9, tags: ["beaches", "culture", "food"],
    img: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=900&q=80&auto=format&fit=crop",
    coords: { lat: 36.3932, lng: 25.4615 },
    blurb: "Whitewashed cliffs, blue domes and unbeatable sunsets over the Aegean." },
  { name: "Kyoto", country: "Japan", price: 1690, rating: 4.8, tags: ["culture", "food", "nature"],
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80&auto=format&fit=crop",
    coords: { lat: 35.0116, lng: 135.7681 },
    blurb: "Ancient temples, bamboo groves and the best seasonal cuisine in Japan." },
  { name: "Swiss Alps", country: "Switzerland", price: 2100, rating: 4.9, tags: ["adventure", "nature"],
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=80&auto=format&fit=crop",
    coords: { lat: 46.5588, lng: 7.8909 },
    blurb: "Jaw-dropping peaks, glacier hikes and storybook mountain villages." },
  { name: "Bali", country: "Indonesia", price: 1120, rating: 4.7, tags: ["beaches", "nature", "culture"],
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80&auto=format&fit=crop",
    coords: { lat: -8.3405, lng: 115.0920 },
    blurb: "Rice terraces, temple ceremonies and surf breaks on every coast." },
  { name: "Dubai", country: "UAE", price: 1850, rating: 4.6, tags: ["shopping", "culture", "adventure"],
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop",
    coords: { lat: 25.2048, lng: 55.2708 },
    blurb: "Desert dunes, record-breaking towers and world-class shopping." },
  { name: "Serengeti", country: "Tanzania", price: 2600, rating: 4.9, tags: ["wildlife", "nature", "adventure"],
    img: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=900&q=80&auto=format&fit=crop",
    coords: { lat: -2.3333, lng: 34.8333 },
    blurb: "The great migration, endless plains and unforgettable safaris." },
  { name: "Machu Picchu", country: "Peru", price: 1580, rating: 4.9, tags: ["adventure", "culture", "nature"],
    img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=900&q=80&auto=format&fit=crop",
    coords: { lat: -13.1631, lng: -72.5450 },
    blurb: "Lost city in the clouds, reached via legendary Andean trails." },
  { name: "Paris", country: "France", price: 1390, rating: 4.7, tags: ["culture", "food", "shopping"],
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80&auto=format&fit=crop",
    coords: { lat: 48.8566, lng: 2.3522 },
    blurb: "Iconic boulevards, world-class museums and unmatched patisserie." },
];

const PACKAGES = [
  { name: "Romantic Getaway", days: 5, price: 1699, tag: "Couples", color: "from-rose-500 to-orange-400", desc: "Private sunset cruises, candlelit dinners and boutique stays." },
  { name: "Family Adventure", days: 7, price: 2299, tag: "Family", color: "from-emerald-500 to-teal-500", desc: "Theme parks, wildlife encounters and kid-friendly resorts." },
  { name: "Backpacker Explorer", days: 10, price: 990, tag: "Budget", color: "from-blue-500 to-indigo-500", desc: "Hostels, street food and off-the-beaten-path adventures." },
  { name: "Luxury Escape", days: 6, price: 4200, tag: "Premium", color: "from-purple-600 to-fuchsia-500", desc: "Five-star suites, private guides and Michelin dining." },
];

const BLOG_POSTS = [
  { title: "7 Underrated Beach Towns to Visit Before Everyone Else Does", cat: "Beaches", img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80&auto=format&fit=crop", read: "6 min read" },
  { title: "A Foodie's Guide to Eating Your Way Through Southeast Asia", cat: "Food", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80&auto=format&fit=crop", read: "8 min read" },
  { title: "Packing Light: The Carry-On-Only Method That Changed My Travels", cat: "Tips", img: "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800&q=80&auto=format&fit=crop", read: "5 min read" },
  { title: "Chasing Waterfalls: The Most Spectacular Falls on Earth", cat: "Nature", img: "https://images.unsplash.com/photo-1467973911527-208c4e60bfe6?w=800&q=80&auto=format&fit=crop", read: "7 min read" },
];

const REVIEWS = [
  { name: "Amara O.", trip: "Santorini, Greece", rating: 5, text: "The AI itinerary nailed our pace perfectly — sunsets, food, and just enough downtime. Best trip planning I've ever done." },
  { name: "Diego R.", trip: "Machu Picchu, Peru", rating: 5, text: "Booked our whole trek route from the itinerary suggestions. Everything from altitude tips to restaurant picks was spot on." },
  { name: "Priya K.", trip: "Kyoto, Japan", rating: 4, text: "Loved the budget calculator — kept our family of four right on target the entire trip." },
  { name: "Lucas M.", trip: "Serengeti, Tanzania", rating: 5, text: "The packing checklist alone saved us. Genuinely felt like a personal travel agent in my pocket." },
];

const FAQS = [
  { q: "How does the AI itinerary generator work?", a: "You tell us your destination, dates, budget, travelers, interests and preferred transport. Our engine matches your interests against curated activity, dining and stay templates for your destination and composes a day-by-day plan with estimated costs." },
  { q: "Can I edit my itinerary after it's generated?", a: "Yes — regenerate as many times as you like by adjusting your inputs, and use the favorites and album tools to personalize your plan further." },
  { q: "Is booking included?", a: "This experience showcases planning, discovery and budgeting tools. Quick-book buttons on destination and package cards simulate the booking flow." },
  { q: "Does this app store my data permanently?", a: "This preview keeps your session (trips, favorites, photos, account) in memory for the current visit. A production version would connect to Firebase or Supabase for persistent storage and real authentication." },
  { q: "Can I use this on mobile?", a: "Absolutely — every section is fully responsive, from the hero down to the itinerary cards and charts." },
];

const CURRENCIES = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 },
  GBP: { symbol: "£", rate: 0.78 },
  JPY: { symbol: "¥", rate: 157.2 },
  INR: { symbol: "₹", rate: 83.4 },
  AUD: { symbol: "A$", rate: 1.5 },
};

const WEATHER_ICONS = [Sun, CloudSun, Cloud, CloudRain, CloudLightning, Snowflake];

const ACTIVITY_POOL = {
  adventure: (d) => [`Guided hiking trek through the highlands near ${d}`, `Zipline and canopy adventure park`, `White-water rafting excursion`, `Sunrise hot-air balloon ride over ${d}`],
  nature: (d) => [`Sunrise walk through ${d}'s botanical gardens`, `Scenic countryside cycling tour`, `Nature reserve and waterfall hike`, `Sunset viewpoint hike above ${d}`],
  beaches: (d) => [`Relaxed beach day with water sports`, `Sunset catamaran cruise along the coast`, `Snorkeling trip to nearby reefs`, `Beachfront yoga and swim session`],
  culture: (d) => [`Guided tour of ${d}'s old town and landmarks`, `Visit to the national museum and art galleries`, `Traditional performance and cultural evening`, `Historic architecture walking tour`],
  food: (d) => [`Street food tasting tour through local markets`, `Hands-on cooking class with regional cuisine`, `Fine dining experience at a top-rated restaurant`, `Local vineyard or brewery tasting`],
  shopping: (d) => [`Shopping spree through ${d}'s famous markets`, `Modern shopping district and boutique crawl`, `Artisan craft market exploration`, `Souvenir hunting in the old quarter`],
  wildlife: (d) => [`Wildlife safari and sanctuary visit`, `Birdwatching tour in a nature park`, `Marine life boat excursion`, `Guided night safari drive`],
};

const HOTEL_NAMES = (d) => [`${d} Grand Hotel`, `${d} Boutique Resort`, `The ${d} Residence`, `${d} Palm Suites`, `${d} Skyline Hotel`];
const RESTAURANT_NAMES = (d) => [`Terrace at ${d}`, `${d} Local Kitchen`, `Spice & Vine`, `The ${d} Bistro`, `Harbor House ${d}`];

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function generateItinerary({ destination, startDate, endDate, budget, travelers, interests, transport }) {
  const dest = destination.trim() || "Your Destination";
  let days = 5;
  if (startDate && endDate) {
    const d1 = new Date(startDate), d2 = new Date(endDate);
    const diff = Math.round((d2 - d1) / 86400000) + 1;
    if (diff > 0 && diff <= 21) days = diff;
  }
  const chosenInterests = interests.length ? interests : INTERESTS.map((i) => i.id);
  const budgetNum = Number(budget) || 1500;
  const perDayBudget = budgetNum / days;
  const seed = hashStr(dest + days + budgetNum);

  const dayPlans = [];
  for (let i = 0; i < days; i++) {
    const interestId = chosenInterests[(seed + i) % chosenInterests.length];
    const pool = ACTIVITY_POOL[interestId](dest);
    const morning = pool[(seed + i) % pool.length];
    const secondInterest = chosenInterests[(seed + i + 1) % chosenInterests.length];
    const pool2 = ACTIVITY_POOL[secondInterest](dest);
    const afternoon = pool2[(seed + i + 2) % pool2.length];
    const foodPool = ACTIVITY_POOL.food(dest);
    const evening = foodPool[(seed + i + 3) % foodPool.length];
    const hotels = HOTEL_NAMES(dest);
    const restaurants = RESTAURANT_NAMES(dest);
    const WIcon = WEATHER_ICONS[(seed + i) % 3];
    const temp = 18 + ((seed + i * 7) % 14);
    const variance = 0.85 + (((seed + i) % 30) / 100);
    dayPlans.push({
      day: i + 1,
      hotel: hotels[(seed + i) % hotels.length],
      restaurant: restaurants[(seed + i) % restaurants.length],
      morning, afternoon, evening,
      weatherIcon: WIcon, temp,
      cost: Math.round(perDayBudget * variance),
    });
  }

  const transportTips = {
    flight: `Book flights to ${dest} 6-8 weeks ahead for the best fares; airport transfer pickup recommended on arrival.`,
    train: `Rail passes covering the ${dest} region can cut inter-city costs by up to 30%.`,
    car: `A rental car gives the most flexibility around ${dest} — book with free cancellation.`,
    bus: `Coach travel is the most budget-friendly way to move between towns near ${dest}.`,
    cruise: `Look for cruise itineraries that dock near ${dest} for a scenic arrival.`,
  };

  const totalCost = dayPlans.reduce((s, d) => s + d.cost, 0);
  const travelersNum = Number(travelers) || 1;

  return {
    destination: dest,
    days: dayPlans,
    totalCost,
    perPerson: Math.round(totalCost / travelersNum),
    travelers: travelersNum,
    transportTip: transportTips[transport] || transportTips.flight,
    tips: [
      `Exchange a small amount of local currency before arrival in ${dest}, then use ATMs for the rest.`,
      `Download offline maps of ${dest} in case of patchy signal.`,
      `Check entry requirements and travel insurance at least 2 weeks before departure.`,
      `Pack layers — mornings and evenings can run cooler than midday.`,
    ],
  };
}

function packingList({ interests, days }) {
  const base = ["Passport & travel documents", "Phone charger & adapter", "Reusable water bottle", "Basic first-aid kit", "Toiletries bag", `${Math.min(days, 10)}+ changes of clothing`];
  const map = {
    adventure: ["Hiking boots", "Daypack", "Moisture-wicking layers"],
    nature: ["Insect repellent", "Binoculars", "Sun hat"],
    beaches: ["Swimwear", "Reef-safe sunscreen", "Beach towel"],
    culture: ["Modest attire for temples/sites", "Comfortable walking shoes"],
    food: ["Antacids / digestive aids", "Reusable snack bag"],
    shopping: ["Foldable extra bag", "Packing cubes"],
    wildlife: ["Neutral-colored clothing", "Zoom camera lens"],
  };
  const extra = (interests.length ? interests : Object.keys(map)).flatMap((i) => map[i] || []);
  return [...new Set([...base, ...extra])];
}

/* ----------------------------------------------------------------------
   SMALL UI PRIMITIVES
---------------------------------------------------------------------- */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div className={`backdrop-blur-xl bg-white/70 dark:bg-white/[0.06] border border-white/40 dark:border-white/10 shadow-[0_8px_40px_-12px_rgba(30,41,59,0.25)] rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

function SectionEyebrow({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-orange-500/10 border border-blue-500/20 text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-300 mb-4">
      <Icon size={15} /> {children}
    </div>
  );
}

function ImgWithFallback({ src, alt, className, gradient = "from-blue-500 via-purple-500 to-orange-500" }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className={`bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <Compass className="text-white/70" size={36} />
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setBroken(true)} loading="lazy" />;
}

function StarRow({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"} />
      ))}
    </div>
  );
}

/* ----------------------------------------------------------------------
   MAIN APP
---------------------------------------------------------------------- */

export default function TripPlannerAI() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("en");
  const [navOpen, setNavOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [favorites, setFavorites] = useState(new Set());
  const [bookingDest, setBookingDest] = useState(null);
  const [bookingDone, setBookingDone] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);

  const strings = T[lang];

  useEffect(() => {
    const t = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id) => {
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleFavorite = (name) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const navIds = ["home", "plan", "destinations", "packages", "map", "blog", "reviews", "faq", "contact"];

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1f] text-slate-800 dark:text-slate-100 font-[Inter] transition-colors duration-500 overflow-x-hidden">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
          .font-display { font-family: 'Poppins', sans-serif; }
          @keyframes floaty { 0%,100%{ transform: translateY(0px) } 50%{ transform: translateY(-14px) } }
          .animate-floaty { animation: floaty 6s ease-in-out infinite; }
          @keyframes blob { 0%,100%{ transform: translate(0,0) scale(1);} 33%{ transform: translate(20px,-30px) scale(1.1);} 66%{ transform: translate(-15px,15px) scale(0.95);} }
          .animate-blob { animation: blob 12s infinite ease-in-out; }
          @keyframes shimmer { 0%{ background-position: -400px 0;} 100%{ background-position: 400px 0;} }
          .animate-shimmer { animation: shimmer 1.6s infinite linear; background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%); background-size: 400px 100%; }
          @keyframes fadein { from{opacity:0} to{opacity:1} }
          .animate-fadein { animation: fadein 0.5s ease-out; }
          @keyframes gradientPan { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          .animate-gradientpan { background-size: 200% 200%; animation: gradientPan 8s ease infinite; }
          ::-webkit-scrollbar { width: 10px; }
          ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#3b82f6,#9333ea); border-radius: 8px; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>

        <Navbar
          strings={strings} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang}
          navOpen={navOpen} setNavOpen={setNavOpen} scrollTo={scrollTo} user={user}
          setAuthOpen={setAuthOpen} setAuthMode={setAuthMode} setUser={setUser}
        />

        <Hero strings={strings} heroIdx={heroIdx} scrollTo={scrollTo} />

        <TrustBar />

        <PlanTripSection favorites={favorites} toggleFavorite={toggleFavorite} setBookingDest={setBookingDest} />

        <DestinationsSection favorites={favorites} toggleFavorite={toggleFavorite} setBookingDest={setBookingDest} />

        <PackagesSection setBookingDest={setBookingDest} />

        <ToolsSection />

        <MapSection />

        <BlogSection />

        <ReviewsSection />

        <FaqSection />

        <ContactSection />

        <Footer scrollTo={scrollTo} />

        {authOpen && <AuthModal mode={authMode} setMode={setAuthMode} onClose={() => setAuthOpen(false)} onAuth={(u) => { setUser(u); setAuthOpen(false); }} />}

        {bookingDest && (
          <BookingModal
            dest={bookingDest}
            done={bookingDone}
            onClose={() => { setBookingDest(null); setBookingDone(false); }}
            onConfirm={() => setBookingDone(true)}
          />
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   NAVBAR
---------------------------------------------------------------------- */

function Navbar({ strings, theme, setTheme, lang, setLang, navOpen, setNavOpen, scrollTo, user, setAuthOpen, setAuthMode, setUser }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const ids = ["home", "plan", "destinations", "packages", "map", "blog", "reviews", "faq", "contact"];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-2.5 backdrop-blur-xl border transition-all duration-500 ${scrolled ? "bg-white/80 dark:bg-slate-900/80 border-white/40 dark:border-white/10 shadow-lg" : "bg-white/30 dark:bg-white/5 border-white/20"}`}>
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Compass className="text-white" size={18} />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Trip<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">Genie</span></span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {strings.nav.map((label, i) => (
              <button key={ids[i]} onClick={() => scrollTo(ids[i])} className="px-3 py-2 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 hover:bg-white/60 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 relative group">
              <button className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-sm font-medium hover:bg-white/60 dark:hover:bg-white/10">
                <Globe size={16} /> {lang.toUpperCase()}
              </button>
              <div className="absolute top-full right-0 pt-1 hidden group-hover:block">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-1 w-28 overflow-hidden">
                  {["en", "es", "fr"].map((l) => (
                    <button key={l} onClick={() => setLang(l)} className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 ${lang === l ? "font-bold text-blue-600" : ""}`}>
                      {l === "en" ? "English" : l === "es" ? "Español" : "Français"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/10 transition-colors" aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="hidden sm:flex items-center gap-2 pl-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">{user.name[0].toUpperCase()}</div>
                <button onClick={() => setUser(null)} className="text-xs font-medium text-slate-500 hover:text-rose-500">Sign out</button>
              </div>
            ) : (
              <button onClick={() => { setAuthMode("signin"); setAuthOpen(true); }} className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-500/30 hover:shadow-lg hover:scale-[1.03] transition-all">
                <LogIn size={15} /> Sign In
              </button>
            )}

            <button className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/60 dark:hover:bg-white/10" onClick={() => setNavOpen(!navOpen)}>
              {navOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {navOpen && (
          <div className="lg:hidden mt-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-xl p-3 animate-fadein">
            {strings.nav.map((label, i) => (
              <button key={ids[i]} onClick={() => scrollTo(ids[i])} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-100 dark:hover:bg-white/10">
                {label}
              </button>
            ))}
            {!user && (
              <button onClick={() => { setAuthMode("signin"); setAuthOpen(true); setNavOpen(false); }} className="mt-2 w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <LogIn size={15} /> Sign In
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------------
   HERO
---------------------------------------------------------------------- */

function Hero({ strings, heroIdx, scrollTo }) {
  return (
    <section id="home" className="relative h-screen min-h-[640px] w-full overflow-hidden flex items-center justify-center">
      {HERO_IMAGES.map((src, i) => (
        <ImgWithFallback
          key={src}
          src={src}
          alt="Travel destination"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ${i === heroIdx ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-orange-900/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-10 w-80 h-80 bg-orange-500/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "4s" }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6 animate-floaty">
          <Sparkles size={15} className="text-amber-300" /> Powered by AI Travel Intelligence
        </div>
        <h1 className="font-display font-extrabold text-white text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight drop-shadow-2xl">
          {strings.heroTitle}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          {strings.heroSub}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => scrollTo("plan")} className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-[length:200%_200%] animate-gradientpan shadow-xl shadow-purple-900/40 hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2">
            <Sparkles size={18} /> {strings.planTrip}
          </button>
          <button onClick={() => scrollTo("destinations")} className="w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-semibold text-white bg-white/10 backdrop-blur-md border border-white/40 hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
            <Compass size={18} /> {strings.explore}
          </button>
        </div>

        <div className="mt-14 flex items-center justify-center gap-2">
          {HERO_IMAGES.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === heroIdx ? "w-8 bg-white" : "w-1.5 bg-white/40"}`} />
          ))}
        </div>
      </div>

      <button onClick={() => scrollTo("plan")} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 animate-floaty">
        <ChevronDown size={28} />
      </button>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { n: "180K+", l: "Itineraries Generated" },
    { n: "4.9/5", l: "Average Traveler Rating" },
    { n: "120+", l: "Countries Covered" },
    { n: "24/7", l: "AI Planning Assistant" },
  ];
  return (
    <div className="relative -mt-1 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 py-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="font-display font-extrabold text-white text-xl sm:text-2xl">{s.n}</div>
            <div className="text-white/80 text-xs sm:text-sm">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------
   PLAN A TRIP — AI ITINERARY WIZARD (signature feature)
---------------------------------------------------------------------- */

function PlanTripSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    destination: "", startDate: "", endDate: "", budget: 1800, travelers: 2, interests: [], transport: "flight",
  });
  const [generating, setGenerating] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const [checklist, setChecklist] = useState({});

  const thinkingMsgs = ["Scanning destination highlights…", "Matching your interests…", "Balancing your budget…", "Composing day-by-day plan…", "Adding local tips…"];

  useEffect(() => {
    if (!generating) return;
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % thinkingMsgs.length), 650);
    return () => clearInterval(t);
  }, [generating]);

  const toggleInterest = (id) => {
    setForm((f) => ({ ...f, interests: f.interests.includes(id) ? f.interests.filter((x) => x !== id) : [...f.interests, id] }));
  };

  const canNext = () => {
    if (step === 1) return form.destination.trim().length > 0;
    return true;
  };

  const handleGenerate = () => {
    setGenerating(true);
    setItinerary(null);
    setTimeout(() => {
      const result = generateItinerary(form);
      setItinerary(result);
      const pl = packingList({ interests: form.interests, days: result.days.length });
      const obj = {}; pl.forEach((p) => (obj[p] = false));
      setChecklist(obj);
      setGenerating(false);
      setStep(4);
    }, 2400);
  };

  const progress = ((step - 1) / 3) * 100;

  return (
    <section id="plan" className="relative py-24 px-6 bg-gradient-to-b from-white to-blue-50/50 dark:from-[#0a0f1f] dark:to-[#0c1224]">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-10">
          <SectionEyebrow icon={Bot}>AI Itinerary Composer</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Build your trip in four quick steps</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Answer a few questions and let the AI compose your personalized day-by-day journey.</p>
        </Reveal>

        <Reveal delay={100}>
          <GlassCard className="p-5 sm:p-10">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-10 relative max-w-xl mx-auto">
              <div className="absolute top-4 left-0 right-0 h-1 bg-slate-200 dark:bg-white/10 rounded-full" />
              <div className="absolute top-4 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
              {["Destination", "Details", "Interests", "Result"].map((label, i) => (
                <div key={label} className="relative z-10 flex flex-col items-center gap-2 flex-1">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-500 ${step > i ? "bg-gradient-to-br from-blue-500 to-purple-600 border-transparent text-white" : step === i + 1 ? "bg-white dark:bg-slate-900 border-purple-500 text-purple-600 scale-110" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-400"}`}>
                    {step > i + 1 ? <Check size={16} /> : i + 1}
                  </div>
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 hidden sm:block">{label}</span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <div className="grid sm:grid-cols-2 gap-5 animate-fadein">
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold flex items-center gap-1.5 mb-1.5"><MapPin size={15} className="text-blue-500" /> Destination</label>
                  <input value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="e.g. Santorini, Kyoto, Bali…" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="text-sm font-semibold flex items-center gap-1.5 mb-1.5"><Calendar size={15} className="text-blue-500" /> Start date</label>
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="text-sm font-semibold flex items-center gap-1.5 mb-1.5"><Calendar size={15} className="text-blue-500" /> End date</label>
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid sm:grid-cols-2 gap-8 animate-fadein">
                <div>
                  <label className="text-sm font-semibold flex items-center gap-1.5 mb-3"><Wallet size={15} className="text-blue-500" /> Budget: <span className="text-purple-600 font-bold">${Number(form.budget).toLocaleString()}</span></label>
                  <input type="range" min="300" max="10000" step="100" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full accent-purple-600" />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>$300</span><span>$10,000</span></div>
                </div>
                <div>
                  <label className="text-sm font-semibold flex items-center gap-1.5 mb-3"><Users size={15} className="text-blue-500" /> Travelers: <span className="text-purple-600 font-bold">{form.travelers}</span></label>
                  <input type="range" min="1" max="10" value={form.travelers} onChange={(e) => setForm({ ...form, travelers: e.target.value })} className="w-full accent-purple-600" />
                  <div className="flex justify-between text-xs text-slate-400 mt-1"><span>1</span><span>10</span></div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold flex items-center gap-1.5 mb-3"><Plane size={15} className="text-blue-500" /> Preferred transport</label>
                  <div className="flex flex-wrap gap-2">
                    {TRANSPORTS.map((t) => (
                      <button key={t.id} onClick={() => setForm({ ...form, transport: t.id })} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.transport === t.id ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-md" : "border-slate-200 dark:border-white/10 hover:border-purple-300"}`}>
                        <t.icon size={16} /> {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fadein">
                <label className="text-sm font-semibold flex items-center gap-1.5 mb-4"><Sparkles size={15} className="text-blue-500" /> What do you love? (pick a few)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {INTERESTS.map((it) => {
                    const active = form.interests.includes(it.id);
                    return (
                      <button key={it.id} onClick={() => toggleInterest(it.id)} className={`relative flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 transition-all ${active ? "border-transparent text-white shadow-lg scale-[1.03]" : "border-slate-200 dark:border-white/10 hover:border-purple-300 text-slate-600 dark:text-slate-300"}`}
                        style={active ? {} : {}}>
                        {active && <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${it.color} -z-10`} />}
                        <it.icon size={24} />
                        <span className="text-xs font-semibold">{it.label}</span>
                        {active && <Check size={14} className="absolute top-2 right-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && generating && (
              <div className="flex flex-col items-center justify-center py-16 gap-6 animate-fadein">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 animate-spin [animation-duration:2s]" style={{ maskImage: "radial-gradient(farthest-side, transparent calc(100% - 8px), black calc(100% - 7px))", WebkitMaskImage: "radial-gradient(farthest-side, transparent calc(100% - 8px), black calc(100% - 7px))" }} />
                  <div className="absolute inset-0 flex items-center justify-center"><Sparkles className="text-purple-500 animate-pulse" size={26} /></div>
                </div>
                <p className="font-display font-semibold text-lg">{thinkingMsgs[msgIdx]}</p>
                <div className="w-64 h-2 rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden relative">
                  <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-70" />
                </div>
              </div>
            )}

            {step === 4 && !generating && itinerary && (
              <ItineraryResult itinerary={itinerary} form={form} checklist={checklist} setChecklist={setChecklist} />
            )}

            {step !== 4 && (
              <div className="flex items-center justify-between mt-10">
                <button disabled={step === 1} onClick={() => setStep((s) => s - 1)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-500 disabled:opacity-0 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
                  Back
                </button>
                {step < 3 ? (
                  <button disabled={!canNext()} onClick={() => setStep((s) => s + 1)} className="flex items-center gap-1.5 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button onClick={() => { setStep(4); handleGenerate(); }} className="flex items-center gap-1.5 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all">
                    <Sparkles size={16} /> Generate Itinerary
                  </button>
                )}
              </div>
            )}

            {step === 4 && !generating && itinerary && (
              <div className="flex justify-center mt-8">
                <button onClick={() => { setStep(1); setItinerary(null); }} className="text-sm font-semibold text-purple-600 hover:underline flex items-center gap-1">
                  Plan another trip <ArrowRight size={14} />
                </button>
              </div>
            )}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function ItineraryResult({ itinerary, form, checklist, setChecklist }) {
  const [tab, setTab] = useState("days");
  const chartData = itinerary.days.map((d) => ({ name: `Day ${d.day}`, cost: d.cost }));

  const downloadItinerary = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    const html = `
      <html><head><title>${itinerary.destination} Itinerary</title>
      <style>body{font-family:Arial,sans-serif;padding:32px;color:#1e293b} h1{color:#7c3aed} .day{margin-bottom:20px;padding:16px;border:1px solid #e2e8f0;border-radius:12px} .label{font-weight:bold;color:#2563eb}</style>
      </head><body>
      <h1>${itinerary.destination} — ${itinerary.days.length}-Day AI Itinerary</h1>
      <p><b>Travelers:</b> ${itinerary.travelers} &nbsp; <b>Total estimated cost:</b> $${itinerary.totalCost.toLocaleString()} &nbsp; <b>Per person:</b> $${itinerary.perPerson.toLocaleString()}</p>
      ${itinerary.days.map((d) => `<div class="day"><h3>Day ${d.day}</h3>
        <p><span class="label">Hotel:</span> ${d.hotel}</p>
        <p><span class="label">Morning:</span> ${d.morning}</p>
        <p><span class="label">Afternoon:</span> ${d.afternoon}</p>
        <p><span class="label">Evening:</span> ${d.evening} at ${d.restaurant}</p>
        <p><span class="label">Estimated cost:</span> $${d.cost}</p>
      </div>`).join("")}
      <p><b>Transport tip:</b> ${itinerary.transportTip}</p>
      <script>window.print()</script>
      </body></html>`;
    w.document.write(html);
    w.document.close();
  };

  return (
    <div className="animate-fadein">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display font-bold text-2xl">{itinerary.destination} <span className="text-slate-400 font-normal text-lg">· {itinerary.days.length} days</span></h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">For {itinerary.travelers} traveler{itinerary.travelers > 1 ? "s" : ""} · ~${itinerary.perPerson.toLocaleString()} per person</p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadItinerary} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:shadow-lg transition-shadow">
            <Download size={15} /> Download PDF
          </button>
          <button onClick={() => navigator.clipboard?.writeText(`${itinerary.destination} trip — ${itinerary.days.length} days, ~$${itinerary.totalCost} total. Planned with TripGenie AI.`)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
            <Share2 size={15} /> Share
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {[["days", "Day-by-Day"], ["budget", "Budget"], ["packing", "Packing List"], ["tips", "Tips & Weather"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${tab === id ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "days" && (
        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
          {itinerary.days.map((d, i) => (
            <div key={d.day} className="rounded-2xl border border-slate-200 dark:border-white/10 p-5 bg-white/70 dark:bg-white/[0.03] animate-fadein" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">{d.day}</div>
                  <span className="font-display font-semibold">Day {d.day}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="flex items-center gap-1"><d.weatherIcon size={16} className="text-amber-500" /> {d.temp}°C</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-600"><DollarSign size={14} />{d.cost}</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <p><span className="font-semibold text-blue-600">Stay:</span> {d.hotel}</p>
                <p><span className="font-semibold text-blue-600">Morning:</span> {d.morning}</p>
                <p><span className="font-semibold text-blue-600">Afternoon:</span> {d.afternoon}</p>
                <p><span className="font-semibold text-blue-600">Evening:</span> {d.evening} — <span className="italic">{d.restaurant}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "budget" && (
        <div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(v) => [`$${v}`, "Cost"]} />
                <Bar dataKey="cost" radius={[8, 8, 0, 0]} fill="#7c3aed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm text-slate-500 mt-2">Total estimated trip cost: <span className="font-bold text-purple-600">${itinerary.totalCost.toLocaleString()}</span></p>
        </div>
      )}

      {tab === "packing" && (
        <div className="grid sm:grid-cols-2 gap-2 max-h-[420px] overflow-y-auto pr-1">
          {Object.keys(checklist).map((item) => (
            <label key={item} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5">
              <input type="checkbox" checked={checklist[item]} onChange={() => setChecklist((c) => ({ ...c, [item]: !c[item] }))} className="accent-purple-600 w-4 h-4" />
              <span className={`text-sm ${checklist[item] ? "line-through text-slate-400" : ""}`}>{item}</span>
            </label>
          ))}
        </div>
      )}

      {tab === "tips" && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-sm flex items-start gap-2">
            <Plane size={16} className="text-blue-600 mt-0.5 shrink-0" /> {itinerary.transportTip}
          </div>
          {itinerary.tips.map((t, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-100 dark:border-white/10 text-sm flex items-start gap-2">
              <BadgeCheck size={16} className="text-emerald-500 mt-0.5 shrink-0" /> {t}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------
   DESTINATIONS
---------------------------------------------------------------------- */

function DestinationsSection({ favorites, toggleFavorite, setBookingDest }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? DESTINATIONS : DESTINATIONS.filter((d) => d.tags.includes(filter));

  return (
    <section id="destinations" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-10">
          <SectionEyebrow icon={Compass}>Popular Destinations</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Trending trips, hand-picked by travelers like you</h2>
        </Reveal>

        <Reveal delay={100} className="flex flex-wrap justify-center gap-2 mb-10">
          <button onClick={() => setFilter("all")} className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${filter === "all" ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent" : "border-slate-200 dark:border-white/10"}`}>All</button>
          {INTERESTS.map((it) => (
            <button key={it.id} onClick={() => setFilter(it.id)} className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${filter === it.id ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent" : "border-slate-200 dark:border-white/10 hover:border-purple-300"}`}>
              <it.icon size={14} /> {it.label}
            </button>
          ))}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((d, i) => (
            <Reveal key={d.name} delay={i * 60}>
              <div className="group rounded-3xl overflow-hidden border border-slate-100 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <ImgWithFallback src={d.img} alt={d.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <button onClick={() => toggleFavorite(d.name)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart size={16} className={favorites.has(d.name) ? "fill-rose-500 text-rose-500" : "text-slate-500"} />
                  </button>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-display font-bold text-lg leading-none">{d.name}</p>
                    <p className="text-xs text-white/80">{d.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 h-10">{d.blurb}</p>
                  <div className="flex items-center justify-between mb-4">
                    <StarRow rating={d.rating} />
                    <span className="text-xs text-slate-400">{d.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display font-bold text-lg text-purple-600">${d.price}</span>
                      <span className="text-xs text-slate-400"> / person</span>
                    </div>
                    <button onClick={() => setBookingDest(d)} className="px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md transition-shadow">
                      Quick Book
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------
   PACKAGES
---------------------------------------------------------------------- */

function PackagesSection({ setBookingDest }) {
  return (
    <section id="packages" className="py-24 px-6 bg-gradient-to-b from-transparent to-purple-50/40 dark:to-purple-950/10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionEyebrow icon={ShoppingBag}>Travel Packages</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">All-inclusive packages for every travel style</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="relative rounded-3xl p-6 h-full flex flex-col text-white overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
                <div className="relative z-10 flex flex-col h-full">
                  <span className="self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur text-[11px] font-bold mb-4">{p.tag}</span>
                  <h3 className="font-display font-bold text-xl mb-2">{p.name}</h3>
                  <p className="text-sm text-white/85 flex-1">{p.desc}</p>
                  <div className="flex items-center gap-1.5 text-sm text-white/80 mt-4 mb-1"><Clock size={14} /> {p.days} days</div>
                  <div className="flex items-end justify-between mt-2">
                    <div>
                      <span className="font-display font-extrabold text-2xl">${p.price}</span>
                      <span className="text-xs text-white/70"> /person</span>
                    </div>
                    <button onClick={() => setBookingDest({ name: p.name, country: `${p.days}-day package`, price: p.price, img: null })} className="px-4 py-2 rounded-lg bg-white text-slate-800 text-xs font-bold hover:scale-105 transition-transform">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------
   TOOLS: budget calculator, currency converter, weather, album
---------------------------------------------------------------------- */

function ToolsSection() {
  const [tool, setTool] = useState("budget");
  const tools = [
    { id: "budget", label: "Budget Calculator", icon: Wallet },
    { id: "currency", label: "Currency Converter", icon: DollarSign },
    { id: "weather", label: "Weather Forecast", icon: CloudSun },
    { id: "album", label: "Photo Album", icon: Camera },
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-10">
          <SectionEyebrow icon={Sparkles}>Trip Toolkit</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Everything you need, in one place</h2>
        </Reveal>
        <Reveal delay={100} className="flex flex-wrap justify-center gap-2 mb-8">
          {tools.map((t) => (
            <button key={t.id} onClick={() => setTool(t.id)} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${tool === t.id ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-md" : "border-slate-200 dark:border-white/10 hover:border-purple-300"}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </Reveal>
        <Reveal delay={150}>
          <GlassCard className="p-6 sm:p-10">
            {tool === "budget" && <BudgetCalculator />}
            {tool === "currency" && <CurrencyConverter />}
            {tool === "weather" && <WeatherWidget />}
            {tool === "album" && <PhotoAlbum />}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function BudgetCalculator() {
  const [total, setTotal] = useState(3000);
  const [split, setSplit] = useState({ Accommodation: 35, Food: 20, Transport: 20, Activities: 15, Shopping: 10 });

  const updateSplit = (key, val) => {
    val = Math.max(0, Math.min(100, Number(val)));
    const others = Object.keys(split).filter((k) => k !== key);
    const othersTotal = others.reduce((s, k) => s + split[k], 0);
    const remaining = 100 - val;
    const next = { [key]: val };
    others.forEach((k) => {
      next[k] = othersTotal > 0 ? Math.round((split[k] / othersTotal) * remaining) : Math.round(remaining / others.length);
    });
    setSplit(next);
  };

  const colors = ["#3b82f6", "#f97316", "#10b981", "#9333ea", "#ec4899"];
  const data = Object.entries(split).map(([name, pct], i) => ({ name, value: Math.round((pct / 100) * total), pct, color: colors[i] }));

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      <div>
        <label className="text-sm font-semibold mb-2 block">Total budget: <span className="text-purple-600 font-bold">${Number(total).toLocaleString()}</span></label>
        <input type="range" min="200" max="15000" step="100" value={total} onChange={(e) => setTotal(e.target.value)} className="w-full accent-purple-600 mb-6" />
        <div className="space-y-4">
          {Object.entries(split).map(([key, val], i) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: colors[i] }} /> {key}</span>
                <span className="text-slate-500">{val}% · ${Math.round((val / 100) * total).toLocaleString()}</span>
              </div>
              <input type="range" min="0" max="100" value={val} onChange={(e) => updateSplit(key, e.target.value)} className="w-full accent-purple-600" />
            </div>
          ))}
        </div>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
              {data.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const result = useMemo(() => {
    const usd = amount / CURRENCIES[from].rate;
    return usd * CURRENCIES[to].rate;
  }, [amount, from, to]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end mb-8">
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5" />
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full mt-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm">
            {Object.keys(CURRENCIES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={() => { setFrom(to); setTo(from); }} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center mb-1 hover:rotate-180 transition-transform duration-500">
          <ArrowRight size={16} />
        </button>
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1 block">Converted</label>
          <div className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 font-bold text-purple-600">
            {CURRENCIES[to].symbol}{result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full mt-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm">
            {Object.keys(CURRENCIES).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <p className="text-center text-xs text-slate-400">Rates are illustrative, for planning purposes only.</p>
    </div>
  );
}

function WeatherWidget() {
  const [city, setCity] = useState("Santorini");
  const seed = hashStr(city);
  const days = ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5"];
  return (
    <div>
      <div className="flex gap-2 mb-8 max-w-md mx-auto">
        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Search a city…" className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5" />
        <button className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center"><Search size={18} /></button>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-4">
        {days.map((d, i) => {
          const Icon = WEATHER_ICONS[(seed + i * 3) % WEATHER_ICONS.length];
          const temp = 16 + ((seed + i * 5) % 16);
          return (
            <div key={d} className="flex flex-col items-center gap-2 p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-blue-50 to-white dark:from-white/5 dark:to-transparent border border-slate-100 dark:border-white/10">
              <span className="text-xs font-semibold text-slate-500">{d}</span>
              <Icon size={28} className="text-amber-500" />
              <span className="font-bold">{temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PhotoAlbum() {
  const [photos, setPhotos] = useState([]);
  const inputRef = useRef(null);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const next = files.map((f) => ({ url: URL.createObjectURL(f), name: f.name, id: Math.random().toString(36) }));
    setPhotos((p) => [...next, ...p]);
  };

  const remove = (id) => setPhotos((p) => p.filter((ph) => ph.id !== id));

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 mb-8">
        <button onClick={() => inputRef.current?.click()} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-shadow">
          <Upload size={16} /> Upload trip photos
        </button>
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
        <p className="text-xs text-slate-400">Photos are kept for this session only, to personalize your trip album.</p>
      </div>
      {photos.length === 0 ? (
        <div className="text-center py-10 text-slate-400 flex flex-col items-center gap-2">
          <Camera size={32} />
          <p className="text-sm">Your album is empty — add photos from a past trip to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {photos.map((p) => (
            <div key={p.id} className="relative group rounded-2xl overflow-hidden aspect-square">
              <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
              <button onClick={() => remove(p.id)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------
   MAP
---------------------------------------------------------------------- */

function MapSection() {
  const [active, setActive] = useState(DESTINATIONS[0]);
  const { lat, lng } = active.coords;
  const d = 0.15;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <section id="map" className="py-24 px-6 bg-gradient-to-b from-transparent to-blue-50/40 dark:to-blue-950/10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-10">
          <SectionEyebrow icon={MapPinned}>Interactive Map</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">See exactly where you're headed</h2>
        </Reveal>
        <Reveal delay={100} className="grid lg:grid-cols-[280px_1fr] gap-6">
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide pb-2 lg:pb-0">
            {DESTINATIONS.map((d2) => (
              <button key={d2.name} onClick={() => setActive(d2)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal shrink-0 transition-all ${active.name === d2.name ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md" : "bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-purple-300"}`}>
                <MapPin size={16} className="shrink-0" />
                <div>
                  <div className="text-sm font-semibold">{d2.name}</div>
                  <div className={`text-xs ${active.name === d2.name ? "text-white/80" : "text-slate-400"}`}>{d2.country}</div>
                </div>
              </button>
            ))}
          </div>
          <GlassCard className="overflow-hidden p-2 h-[420px]">
            <iframe title="map" src={src} className="w-full h-full rounded-2xl border-0" loading="lazy" />
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------
   BLOG
---------------------------------------------------------------------- */

function BlogSection() {
  return (
    <section id="blog" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionEyebrow icon={Landmark}>Travel Blog</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Stories and tips from the road</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BLOG_POSTS.map((b, i) => (
            <Reveal key={b.title} delay={i * 70}>
              <article className="group rounded-3xl overflow-hidden border border-slate-100 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                <div className="h-40 overflow-hidden">
                  <ImgWithFallback src={b.img} alt={b.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wide">{b.cat}</span>
                  <h3 className="font-display font-semibold mt-2 mb-3 leading-snug flex-1">{b.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{b.read}</span>
                    <span className="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">Read <ChevronRight size={13} /></span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------
   REVIEWS
---------------------------------------------------------------------- */

function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 px-6 bg-gradient-to-b from-transparent to-orange-50/30 dark:to-orange-950/10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-14">
          <SectionEyebrow icon={ThumbsUp}>Traveler Reviews</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Loved by explorers around the world</h2>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 70}>
              <GlassCard className="p-6 h-full flex flex-col">
                <Quote className="text-purple-300 dark:text-purple-500/50 mb-3" size={26} />
                <p className="text-sm text-slate-600 dark:text-slate-300 flex-1 leading-relaxed">{r.text}</p>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/10">
                  <StarRow rating={r.rating} />
                  <p className="font-display font-semibold mt-2">{r.name}</p>
                  <p className="text-xs text-slate-400">{r.trip}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------
   FAQ
---------------------------------------------------------------------- */

function FaqSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-12">
          <SectionEyebrow icon={Bot}>FAQ</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Frequently asked questions</h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-white dark:bg-white/[0.03]">
                <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold">
                  {f.q}
                  <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 text-purple-500 ${open === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------
   CONTACT
---------------------------------------------------------------------- */

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-12">
          <SectionEyebrow icon={Mail}>Contact</SectionEyebrow>
          <h2 className="font-display font-bold text-3xl sm:text-4xl">Have a question? Let's talk</h2>
        </Reveal>
        <Reveal delay={100}>
          <GlassCard className="grid md:grid-cols-2 overflow-hidden">
            <div className="p-8 sm:p-10 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 text-white flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl mb-3">Get in touch</h3>
                <p className="text-white/85 text-sm leading-relaxed">Our travel specialists and AI concierge are ready to help you plan the perfect trip, day or night.</p>
              </div>
              <div className="space-y-3 mt-8 text-sm">
                <div className="flex items-center gap-3"><Mail size={16} /> hello@tripgenie.ai</div>
                <div className="flex items-center gap-3"><Phone size={16} /> +1 (555) 019-2837</div>
                <div className="flex items-center gap-3"><MapPinned size={16} /> Remote-first, worldwide</div>
              </div>
              <div className="flex gap-3 mt-8">
                {[Link2, MessageCircle, Video, Rss].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors cursor-pointer"><Icon size={15} /></div>
                ))}
              </div>
            </div>
            <form onSubmit={submit} className="p-8 sm:p-10 space-y-4">
              {sent && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-sm font-medium">
                  <Check size={16} /> Message sent! We'll be in touch shortly.
                </div>
              )}
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-500 mb-1 block">Message</label>
                <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-shadow">
                <Send size={16} /> Send message
              </button>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------
   FOOTER
---------------------------------------------------------------------- */

function Footer({ scrollTo }) {
  return (
    <footer className="bg-slate-900 dark:bg-black text-slate-300 py-14 px-6">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 flex items-center justify-center"><Compass className="text-white" size={16} /></div>
            <span className="font-display font-bold text-white">TripGenie</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">AI-powered trip planning that turns your travel dreams into a day-by-day reality.</p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-white mb-4">Explore</h4>
          <div className="space-y-2 text-sm">
            {["Destinations", "Packages", "Map", "Blog"].map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="block text-slate-400 hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-white mb-4">Company</h4>
          <div className="space-y-2 text-sm">
            {["Reviews", "FAQ", "Contact"].map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())} className="block text-slate-400 hover:text-white transition-colors">{l}</button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-white mb-4">Stay inspired</h4>
          <p className="text-sm text-slate-400 mb-3">Get destination ideas in your inbox.</p>
          <div className="flex gap-2">
            <input placeholder="you@email.com" className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/10 text-sm placeholder:text-slate-500 focus:outline-none" />
            <button className="px-3.5 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white shrink-0"><Send size={15} /></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-white/10 text-xs text-slate-500 flex flex-col sm:flex-row justify-between gap-2">
        <span>© {new Date().getFullYear()} TripGenie AI. All rights reserved.</span>
        <span>Made for wanderers, powered by AI.</span>
      </div>
    </footer>
  );
}

/* ----------------------------------------------------------------------
   MODALS: AUTH & BOOKING
---------------------------------------------------------------------- */

function AuthModal({ mode, setMode, onClose, onAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAuth({ name: name || email.split("@")[0] || "Traveler", email });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadein" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"><X size={20} /></button>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4"><User className="text-white" size={22} /></div>
        <h3 className="font-display font-bold text-2xl mb-1">{mode === "signin" ? "Welcome back" : "Create your account"}</h3>
        <p className="text-sm text-slate-500 mb-6">{mode === "signin" ? "Sign in to save trips and favorites." : "Join to start planning with AI."}</p>
        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5" />
          )}
          <input required type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5" />
          <input required type="password" placeholder="Password" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5" />
          <button type="submit" className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-shadow">
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <p className="text-center text-sm text-slate-500 mt-5">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="font-semibold text-purple-600 hover:underline">
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function BookingModal({ dest, done, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadein" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 overflow-hidden relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 dark:bg-black/40 flex items-center justify-center text-slate-600 dark:text-white"><X size={16} /></button>
        {dest.img && (
          <div className="h-40 relative">
            <ImgWithFallback src={dest.img} alt={dest.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="p-7">
          {!done ? (
            <>
              <h3 className="font-display font-bold text-xl mb-1">{dest.name}</h3>
              <p className="text-sm text-slate-500 mb-5">{dest.country}</p>
              <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5">
                <span className="text-sm text-slate-500">Estimated price</span>
                <span className="font-display font-bold text-xl text-purple-600">${dest.price}</span>
              </div>
              <button onClick={onConfirm} className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
                <BadgeCheck size={17} /> Confirm Quick Booking
              </button>
              <p className="text-xs text-center text-slate-400 mt-3">This simulates a booking flow for preview purposes.</p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                <Check className="text-emerald-600" size={28} />
              </div>
              <h3 className="font-display font-bold text-xl mb-1">Booking confirmed!</h3>
              <p className="text-sm text-slate-500">Your spot for {dest.name} is reserved. A confirmation would normally be emailed to you.</p>
              <button onClick={onClose} className="mt-6 px-6 py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600">Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
