/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Mail, 
  Instagram, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Menu as MenuIcon, 
  X,
  Award,
  Star,
  Utensils
} from 'lucide-react';

const MIKA_IMAGES = {
  hero: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1920",
  chef: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&q=80&w=800",
  interior: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
  dish1: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800",
  dish2: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&q=80&w=800",
  dish3: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800",
};

const MENU_DATA = {
  Snacks: [
    { name: "Mika house bread", desc: "sourdough, focaccia, five-seed rye, tomato sofrito, green zhoug", price: "AED 40" },
    { name: "Wood-fired corn ribs", desc: "chili butter, lime", price: "AED 40" },
    { name: "Yellowfin tuna crudo", desc: "pasta fritta, green apple, furikake, wasabi mayo", price: "AED 45" },
    { name: "Green herb falafel", desc: "tahini, za'atar", price: "AED 35" },
    { name: "Prawn cocktail tartlet", desc: "baby gem, marie rose", price: "AED 40" },
    { name: "Cod croquettes", desc: "squid ink mayo, parmesan", price: "AED 40" },
    { name: "Chicken liver pâté", desc: "brown toast, plum marmalade", price: "AED 50" },
    { name: "House-made truffle parmesan fries", desc: "aioli", price: "AED 45" },
  ],
  Raw: [
    { name: "Steak tartare", desc: "gochujang, rye cracker, egg yolk", price: "AED 75" },
    { name: "Wild bass carpaccio", desc: "nuoc cham, lemongrass, roasted peanuts, chili, lime", price: "AED 65" },
    { name: "Yellowfin tuna carpaccio", desc: "aji amarillo, sicilian olive oil, meyer lemon", price: "AED 60" },
    { name: "House cured salmon", desc: "grapefruit, dill, cornichons, pink pepper", price: "AED 60" },
  ],
  "Small Plates": [
    { name: "Red chicory salad", desc: "green apple, balsamic dressing, walnuts, roquefort", price: "AED 60" },
    { name: "Baby gem", desc: "cucumber, dill, confit garlic dressing", price: "AED 60" },
    { name: "Tomato salad", desc: "whipped feta, caper leaves, citrus vinegar", price: "AED 65" },
    { name: "Burrata", desc: "cucumber, coriander + coriander gazpacho", price: "AED 65" },
    { name: "Cider poached mussels", desc: "roasted datterini, aioli, basil", price: "AED 60" },
    { name: "Roasted piquilo peppers", desc: "anchovies, chili", price: "AED 65" },
    { name: "Fried feta cheese", desc: "filo pastry, wild herb honey, white sesame seed", price: "AED 55" },
    { name: "Golden calamari", desc: "togarashi, curry leaf, lemongrass aioli", price: "AED 55" },
    { name: "Pan-fried scallops in the half shell", desc: "nduja butter, salsa verde, pangrattato", price: "AED 120" },
    { name: "Wood grilled flatbread", desc: "King Crab AED 70 / Stracciatella AED 65", price: "" },
  ],
  "Medium Plates": [
    { name: "Chargrilled lamb skewers", desc: "harissa, tahini", price: "AED 70" },
    { name: "Spiced squid & roasted tomato en papillote", desc: "chickpeas, feta, taggiasche olives", price: "AED 85" },
    { name: "Lemon ricotta tortellini", desc: "brown butter, sage, toasted walnuts", price: "AED 95" },
    { name: "Conchiglie pasta", desc: "beef cheek ragù, roasted tomato sauce, gremolata", price: "AED 95" },
    { name: "Hand-rolled potato gnocchi", desc: "lamb ragù, pecorino", price: "AED 95" },
    { name: "Mushroom risotto", desc: "tarragon, truffle", price: "AED 95" },
    { name: "Pan fried red shrimp", desc: "garlic, coriander, white wine", price: "AED 120" },
    { name: "Poached salmon fillet", desc: "clams, dashi beurre blanc, trout roe", price: "AED 120" },
    { name: "Confit duck leg", desc: "house-made waffle, fried egg, honey dressing", price: "AED 110" },
    { name: "Chicken schnitzel supreme", desc: "lemon, caper butter sauce", price: "AED 110" },
    { name: "Whole butterflied sea bass", desc: "spinach, lemon", price: "AED 145" },
    { name: "Octopus", desc: "smoked labneh, garlic punched potatoes, crispy sage", price: "AED 110" },
    { name: "Peri peri baby chicken", desc: "bomba rice, salsa verde", price: "AED 145" },
    { name: "Bavette steak cooked medium rare", desc: "wild garlic aligot, beef jus", price: "AED 125" },
    { name: "Dry aged wagyu ribeye MB5+ 400g", desc: "PX peppercorn jus, house-made chips", price: "AED 245" },
  ],
  Desserts: [
    { name: "Mika cheesecake", desc: "cardamom + pistachio crumb", price: "AED 50" },
    { name: "Nonna's tiramisu", desc: "coffee, mascarpone", price: "AED 60" },
    { name: "Warm chocolate tart", desc: "vanilla ice cream", price: "AED 60" },
    { name: "Coal torched lemon meringue", desc: "lemon curd, Italian meringue", price: "AED 50" },
    { name: "Passion fruit", desc: "coconut sorbet", price: "AED 60" },
    { name: "Cheese plate", desc: "aged parmesan, brie de meaux, roquefort, quince, rye cracker", price: "AED 80" },
    { name: "House-made ice-cream of the day", desc: "", price: "AED 40" },
  ],
  "After Dinner": [
    { name: "Skinos mastiha", desc: "", price: "AED 45" },
    { name: "Housemade limoncello", desc: "", price: "AED 40" },
  ]
};

const MenuTabs = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof MENU_DATA>("Snacks");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-12 border-b border-charcoal/10 pb-4 mb-12">
        {Object.keys(MENU_DATA).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as keyof typeof MENU_DATA)}
            className={`text-xs md:text-sm uppercase tracking-[0.2em] font-bold transition-all relative pb-4 ${
              activeTab === tab ? 'text-gold' : 'text-charcoal/40 hover:text-charcoal'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gold"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-x-20 gap-y-8"
      >
        {MENU_DATA[activeTab].map((item, idx) => (
          <div key={idx} className="flex flex-col border-b border-gold/20 pb-4 group">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg md:text-xl font-serif font-bold text-charcoal group-hover:text-gold transition-colors">
                {item.name}
              </h3>
              <span className="text-gold font-bold text-sm ml-4 shrink-0">{item.price}</span>
            </div>
            {item.desc && (
              <p className="text-charcoal/50 italic text-sm font-light leading-relaxed">
                {item.desc}
              </p>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number, key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-gold selection:text-charcoal bg-charcoal text-ivory">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-4' : 'bg-gradient-to-b from-black/60 to-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-serif tracking-[0.2em] text-gold uppercase hover:opacity-80 transition-opacity font-bold"
          >
            MIKA
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10 text-[11px] uppercase tracking-[0.15em] font-bold">
            {['About', 'Menu', 'Events', 'Contact'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())} 
                className="relative group py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <a 
              href="https://mika.ae/book-a-table/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative group py-1"
            >
              Bookings
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
            <a 
              href="https://mika.ae/book-a-table/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gold text-charcoal px-6 py-3 rounded-sm hover:bg-ivory transition-all duration-300"
            >
              Reserve a Table
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center space-y-8 text-xl uppercase tracking-widest font-serif"
          >
            {['About', 'Menu', 'Events', 'Contact'].map((item) => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())}>{item}</button>
            ))}
            <a 
              href="https://mika.ae/book-a-table/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Bookings
            </a>
            <a 
              href="https://mika.ae/book-a-table/" 
              className="text-gold border border-gold px-8 py-3 rounded-sm"
            >
              Reserve a Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/80 to-charcoal/95 z-10" />
          <img 
            src={MIKA_IMAGES.hero} 
            alt="MIKA Interior" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 text-center px-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <span className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-6 block font-bold text-shadow-lg">
              Modern Mediterranean Fine Dining — Yas Marina, Abu Dhabi
            </span>
            <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-serif mb-5 md:mb-5 leading-[0.9] italic text-ivory text-shadow-lg">
              La Dolce Vita
            </h1>

            {/* Award Badges Strip - Moved into flow for precise spacing */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12 md:mb-14">
              {[
                "Michelin Bib Gourmand",
                "Michelin Service Award",
                "TOADRA 2025"
              ].map((award) => (
                <div key={award} className="bg-gold/10 border border-gold/40 text-gold px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-md">
                  {award}
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="https://mika.ae/book-a-table/" 
                className="bg-gold text-charcoal px-12 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-ivory transition-all w-full sm:w-auto shadow-xl"
              >
                Book Your Table
              </a>
              <button 
                onClick={() => scrollToSection('menu')}
                className="border border-ivory/30 text-ivory px-12 py-5 text-xs uppercase tracking-[0.2em] font-bold hover:bg-ivory hover:text-charcoal transition-all w-full sm:w-auto backdrop-blur-sm"
              >
                Explore the Menu
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-ivory/50 cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-40 bg-ivory text-charcoal relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <FadeInWhenVisible>
            <div className="space-y-8">
              <span className="text-terracotta uppercase tracking-[0.3em] text-xs font-bold">The Story</span>
              <h2 className="text-5xl md:text-7xl font-serif leading-tight text-gold">
                Where Two <br />
                <span className="italic">Worlds Meet</span>
              </h2>
              <p className="text-lg text-charcoal/70 leading-relaxed font-light">
                Mika beautifully blends Middle Eastern influences with its Mediterranean heritage through the lens of Yas Marina. A unique symphony of two cultures, accompanied by seasonal cocktails and hand-selected wines, evoking the essence of la dolce vita — the good life.
              </p>
              
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-xl">🏆</span> Michelin Recognised
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-xl">🌿</span> Seasonal Menu
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-xl">🌊</span> Yas Marina Views
                </div>
              </div>

              <div className="pt-6">
                <button 
                  className="border border-charcoal text-charcoal px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-charcoal hover:text-ivory transition-all"
                >
                  Our Story
                </button>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="relative p-6 border border-charcoal/10">
              <div className="aspect-[4/5] w-full bg-gradient-to-br from-gold/5 to-terracotta/10 shadow-[inset_0_0_50px_rgba(201,168,76,0.2)]" />
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Chef Section */}
      <section className="py-24 md:py-40 bg-charcoal text-center">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInWhenVisible>
            <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Chef-Patron</span>
            <h2 className="text-6xl md:text-8xl font-serif mb-8 text-ivory">Mario Loi</h2>
            <p className="text-lg text-ivory/60 leading-relaxed font-light mb-12">
              With over a decade of culinary experience across the region and recognition in the prestigious MICHELIN Guide, Chef Mario Loi brings artistry and soul to every plate at Mika.
            </p>
            
            <div className="relative h-[1px] w-full bg-gradient-to-r from-transparent via-gold to-transparent my-16">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-charcoal px-4 text-gold text-sm">◆</div>
            </div>

            <blockquote className="text-3xl md:text-5xl font-serif italic text-ivory mb-8">
              "Every dish tells the story of two coastlines."
            </blockquote>
            
            <div className="font-['Dancing_Script'] text-gold text-5xl md:text-6xl mt-8">
              Mario Loi
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 md:py-40 bg-ivory text-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeInWhenVisible>
              <h2 className="text-5xl md:text-7xl font-serif mb-4">Seasonal & Soulful</h2>
              <p className="text-charcoal/60 italic font-light">Our menu changes with the seasons — always fresh, always flavourful.</p>
            </FadeInWhenVisible>
          </div>

          <MenuTabs />

          <div className="mt-20 text-center italic text-charcoal/60">
            <p>Our menu is seasonal. For today's full offerings, call us at <a href="tel:+971564331422" className="text-gold font-bold not-italic hover:underline">+971 56 433 1422</a></p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 md:py-40 bg-charcoal text-ivory">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeInWhenVisible>
              <span className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4 block">Ongoing Events & Experiences</span>
              <h2 className="text-5xl md:text-7xl font-serif">Always Something to Savour</h2>
            </FadeInWhenVisible>
          </div>

          <div className="flex overflow-x-auto pb-12 snap-x snap-mandatory md:grid md:grid-cols-3 gap-8 no-scrollbar">
            {[
              {
                icon: "🍷",
                title: "Wine Flight",
                schedule: "Sunday to Monday, available upon request",
                desc: "An expertly curated flight through our hand-selected wine cellar."
              },
              {
                icon: "🥂",
                title: "Riviera Brunch",
                schedule: "Every Saturday, 1:00PM – 4:00PM",
                desc: "A sun-drenched afternoon of Mediterranean indulgence."
              },
              {
                icon: "☀️",
                title: "Sunday Lunch",
                schedule: "Every Sunday, 12PM – 2:30PM",
                desc: "Chef's 4-course set menu with a glass of house wine or prosecco. AED 190."
              },
              {
                icon: "🌅",
                title: "Angel Hour — Sunset Sessions",
                schedule: "Nightly at sunset",
                desc: "Where golden hour meets our finest aperitivos."
              },
              {
                icon: "💼",
                title: "Business Lunch",
                schedule: "Monday to Friday, 12PM – 3PM",
                desc: "2 courses AED 95 | 3 courses AED 125. The perfect midday reset."
              },
              {
                icon: "🎉",
                title: "Corporate Bookings",
                schedule: "By arrangement",
                desc: "Private dining, bespoke menus, exclusive experiences for your team or clients.",
                cta: { label: "Enquire Now", href: "mailto:reservations@mika.ae" }
              }
            ].map((event, idx) => (
              <FadeInWhenVisible key={idx} delay={idx * 0.1}>
                <div className="bg-[#242424] border-t-[3px] border-gold p-8 h-full flex flex-col snap-center min-w-[300px] md:min-w-0 hover:translate-y-[-10px] transition-transform duration-500">
                  <span className="text-4xl mb-6 block">{event.icon}</span>
                  <h3 className="text-xl font-serif text-ivory mb-2 uppercase tracking-wide">{event.title}</h3>
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold mb-4">{event.schedule}</p>
                  <p className="text-ivory/60 font-light text-sm leading-relaxed mb-8 flex-grow">
                    {event.desc}
                  </p>
                  {event.cta && (
                    <a 
                      href={event.cta.href}
                      className="text-gold text-xs uppercase tracking-widest font-bold border-b border-gold pb-1 self-start hover:text-ivory hover:border-ivory transition-all"
                    >
                      {event.cta.label}
                    </a>
                  )}
                </div>
              </FadeInWhenVisible>
            ))}
          </div>

          <div className="mt-16 text-center">
            <FadeInWhenVisible>
              <button className="border border-ivory/30 text-ivory px-12 py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-ivory hover:text-charcoal transition-all">
                View All Events
              </button>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src={MIKA_IMAGES.interior} 
            alt="MIKA Ambiance" 
            className="w-full h-full object-cover parallax-bg"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
          <FadeInWhenVisible>
            <h2 className="text-5xl md:text-8xl font-serif mb-8 italic text-ivory">
              Candlelit Warmth <br />
              <span className="text-gold">Coastal Luxury</span>
            </h2>
            <p className="text-xl text-ivory/80 font-light leading-relaxed mb-12">
              Experience the vibrant energy of Yas Marina from our terrace or retreat into the intimate, sophisticated warmth of our main dining room.
            </p>
            <a 
              href="mailto:reservations@mika.ae" 
              className="text-gold uppercase tracking-widest text-sm font-bold border-b border-gold pb-2 hover:text-ivory hover:border-ivory transition-all"
            >
              Corporate & Group Bookings
            </a>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Contact & Info Section */}
      <section id="contact" className="py-24 md:py-40 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
          <FadeInWhenVisible>
            <div className="space-y-8">
              <h3 className="text-3xl font-serif italic text-gold">Visit Us</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-terracotta shrink-0" size={20} />
                  <p className="text-ivory/70 font-light">
                    Yas Marina, Yas Island<br />
                    Abu Dhabi, United Arab Emirates
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-terracotta shrink-0" size={20} />
                  <a href="tel:+971564331422" className="text-ivory/70 hover:text-gold transition-colors">+971 56 433 1422</a>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-terracotta shrink-0" size={20} />
                  <a href="mailto:reservations@mika.ae" className="text-ivory/70 hover:text-gold transition-colors">reservations@mika.ae</a>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="space-y-8">
              <h3 className="text-3xl font-serif italic text-gold">Hours</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50 uppercase text-xs tracking-widest">Sun – Thu</span>
                  <span className="text-ivory/80">12:00 PM – 12:00 AM</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50 uppercase text-xs tracking-widest">Fri – Sat</span>
                  <span className="text-ivory/80">12:00 PM – 01:00 AM</span>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center gap-4 mb-4">
                  <Clock className="text-terracotta" size={20} />
                  <span className="text-xs uppercase tracking-widest font-bold">Kitchen closes 1 hour before</span>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4}>
            <div className="space-y-8">
              <h3 className="text-3xl font-serif italic text-gold">Follow the Story</h3>
              <p className="text-ivory/70 font-light">Join our community on Instagram for daily inspirations and seasonal updates.</p>
              <a 
                href="https://instagram.com/mika.abudhabi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-ivory/5 px-6 py-3 rounded-full hover:bg-ivory/10 transition-all"
              >
                <Instagram size={20} className="text-gold" />
                <span className="text-sm tracking-widest uppercase font-bold">@mika.abudhabi</span>
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-ivory/5 bg-charcoal">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-ivory/30 text-xs uppercase tracking-[0.2em]">
            &copy; {new Date().getFullYear()} MIKA Restaurant. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-ivory/30 text-xs uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden flex border-t border-gold/20">
        <a 
          href="tel:+971564331422" 
          className="flex-1 bg-charcoal text-gold py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
        >
          <Phone size={16} /> Call
        </a>
        <a 
          href="https://mika.ae/book-a-table/" 
          className="flex-1 bg-gold text-charcoal py-4 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
