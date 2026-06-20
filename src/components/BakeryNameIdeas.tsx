import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Copy, RefreshCw, Palette, Bookmark, Check, Layers, Tag, Eye, ShieldCheck, Heart, Award, HelpCircle } from 'lucide-react';

interface NameIdea {
  name: string;
  tagline: string;
  theme: string;
  vibes: string[];
  reason: string;
  colors: string[];
  fontStyle: 'serif' | 'sans' | 'mono';
}

const PRESET_IDEAS: NameIdea[] = [
  // Elegant French
  {
    name: "La Chérie Patisserie",
    tagline: "High-fashion French baking, freshly hand-rolled at dawn",
    theme: "French & Elegant",
    vibes: ["luxury", "classical", "authentic"],
    reason: "Evokes romantic Paris alleys, buttery layers, and pristine chocolate glaze.",
    colors: ["#A3704C", "#DFC2A2", "#1C1917"],
    fontStyle: 'serif'
  },
  {
    name: "Atelier du Pain",
    tagline: "The studio where flour becomes art",
    theme: "French & Elegant",
    vibes: ["studio", "artisanal", "refined"],
    reason: "Atelier implies expert handcraft, treating baking as a high art form.",
    colors: ["#1e293b", "#e2e8f0", "#94a3b8"],
    fontStyle: 'sans'
  },
  {
    name: "Maison Royale Cakes",
    tagline: "Sovereign celebration cakes sculpted with exquisite sugar lace",
    theme: "French & Elegant",
    vibes: ["royal", "prestige", "bespoke"],
    reason: "Perfect name for high-end wedding and anniversary cake designers.",
    colors: ["#7c2d12", "#fcd34d", "#fffbeb"],
    fontStyle: 'serif'
  },
  {
    name: "Éclair d'Or",
    tagline: "Golden lightning bolts of sugar, chocolate, and cream",
    theme: "French & Elegant",
    vibes: ["boutique", "fine pastries", "modern"],
    reason: "Éclair means lightning; d'Or means golden, promising absolute perfection.",
    colors: ["#451a03", "#fbbf24", "#78350f"],
    fontStyle: 'serif'
  },

  // Rustic & Warm Hearth
  {
    name: "Stoneground Hearth",
    tagline: "Nutrient-rich, 24-hour slow fermented sourdoughs",
    theme: "Hearth & Rustic",
    vibes: ["slow-bake", "organic", "heritage"],
    reason: "Hearth represents heat, hospitality, and traditional steam-deck clay ovens.",
    colors: ["#c2410c", "#fed7aa", "#451a03"],
    fontStyle: 'serif'
  },
  {
    name: "The Daily Crust",
    tagline: "Drawn from woodfired ovens to hit your table warm",
    theme: "Hearth & Rustic",
    vibes: ["everyday", "warmth", "community"],
    reason: "Strong, memorable name focusing on freshness and reliable high-quality daily bread.",
    colors: ["#7c2d12", "#ffedd5", "#451a03"],
    fontStyle: 'sans'
  },
  {
    name: "Wildflower Sourdough Co.",
    tagline: "Wild yeast, mountain spring water, stoneground grains",
    theme: "Hearth & Rustic",
    vibes: ["natural", "outdoor", "premium"],
    reason: "Inspires thoughts of pure, untouched ingredients and organic baking practices.",
    colors: ["#065f46", "#ecfdf5", "#0f172a"],
    fontStyle: 'serif'
  },

  // Modern & Minimal
  {
    name: "Rise & Fold",
    tagline: "Simple ingredients, exquisite geometry",
    theme: "Modern & Minimal",
    vibes: ["contemporary", "scientific", "precise"],
    reason: "Highlights the clean mechanics and physical proofing stages of professional baking.",
    colors: ["#0f172a", "#f1f5f9", "#334155"],
    fontStyle: 'mono'
  },
  {
    name: "Grist & Grain",
    tagline: "Decolonial flour science paired with sleek pastry design",
    theme: "Modern & Minimal",
    vibes: ["architectural", "industrial", "pure"],
    reason: "Sleek alliteration that appeals to modern, upscale city districts.",
    colors: ["#1c1917", "#f5f5f4", "#78716c"],
    fontStyle: 'sans'
  },
  {
    name: "DOUGH.",
    tagline: "Nothing disguised. Just flour, water, salt, and magic",
    theme: "Modern & Minimal",
    vibes: ["brutalist", "bold", "organic"],
    reason: "The ultimate minimalist name. Extremely confident, stylishly capitalized.",
    colors: ["#000000", "#ffffff", "#737373"],
    fontStyle: 'mono'
  },

  // Playful & Whimsical
  {
    name: "Honeybee Whisk",
    tagline: "Delicate treats and floral sweet drops of joy",
    theme: "Playful & Whimsical",
    vibes: ["cute", "warm", "bestseller"],
    reason: "Invites families and sweet lovers into a cheerful, sunny boutique space.",
    colors: ["#b45309", "#fef3c7", "#f59e0b"],
    fontStyle: 'sans'
  },
  {
    name: "Sweet Devotion",
    tagline: "A divine promise of buttery layers and creamy toppings",
    theme: "Playful & Whimsical",
    vibes: ["romantic", "rich", "indulgent"],
    reason: "Signals absolute dedication to premium, high-quality, unforgettable desserts.",
    colors: ["#821c1a", "#fff1f2", "#db2777"],
    fontStyle: 'serif'
  },
  {
    name: "Cloud Nine Confections",
    tagline: "Macarons and lightweight puff pastries that float in your mouth",
    theme: "Playful & Whimsical",
    vibes: ["fluffy", "heavenly", "festive"],
    reason: "Describes the magical, weightless mouthfeel of professional whipped mousse.",
    colors: ["#be185d", "#fdf2f8", "#ec4899"],
    fontStyle: 'sans'
  },

  // Swahili Heritage / Kenyan Fusion
  {
    name: "TamuTamu Bakehouse",
    tagline: "Twice the sweetness, zero compromise",
    theme: "Kenyan Sourced & Swahili Heritage",
    vibes: ["local", "vibrant", "premium"],
    reason: "Tamu means sweet. This double word is catchy, popular, and promises rich flavor.",
    colors: ["#b45309", "#fffbeb", "#f59e0b"],
    fontStyle: 'serif'
  },
  {
    name: "Pishi Safi Bakers",
    tagline: "Pristine flour meets Kenyan soil & passion",
    theme: "Kenyan Sourced & Swahili Heritage",
    vibes: ["clean", "authentic", "community"],
    reason: "Pishi refers to chef/baking style; Safi means pure and clean.",
    colors: ["#047857", "#ecfdf5", "#064e3b"],
    fontStyle: 'sans'
  },
  {
    name: "Asali & Earth",
    tagline: "Honeys of the Rift Valley blended with stone ground grains",
    theme: "Kenyan Sourced & Swahili Heritage",
    vibes: ["natural", "savanna", "organic"],
    reason: "Asali means honey. Beautiful imagery of golden honey drizzling onto fresh hot bread.",
    colors: ["#a16207", "#fefaf0", "#3f2b05"],
    fontStyle: 'serif'
  }
];

// Seed word components for interactive name generator
const GENERATOR_PARTS = {
  decorations: ["La", "The Signature", "Maison", "Atelier", "The Daily", "Little", "Golden", "Wild", "Rustic", "Chef's"],
  keywords: ["Crumb", "Hearth", "Whisk", "Dough", "Sourdough", "Glaze", "Loaf", "Oven", "Brioche", "Pishi", "Asali", "Tamu", "Flour", "Clover", "Bloom"],
  types: ["Bakehouse", "Patisserie", "Atelier", "Confections", "Hearth & Co.", "Boutique", "Cakery", "Bread Lab", "Studio", "Bakers"]
};

// Seed taglines templates
const TAGLINE_TEMPLATES = [
  "Artisanal culinary alchemy, drawn fresh daily.",
  "Drawn from steam clay hearths every dawn to hit your butter knife warm.",
  "Every layer a masterwork of patience, butter, and pristine flour.",
  "Decolonial grain science meets gorgeous pastry mechanics.",
  "Indulgent classic celebrations made with 100% fine organic cream.",
  "Sweet moments of local pride, baked meticulously by hand."
];

export default function BakeryNameIdeas() {
  const [activeTheme, setActiveTheme] = useState<string>('All');
  const [customKeyword, setCustomKeyword] = useState<string>('');
  const [vibePreference, setVibePreference] = useState<'classic' | 'rustic' | 'minimal' | 'whimsical' | 'safi'>('classic');
  const [generatedNames, setGeneratedNames] = useState<NameIdea[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<NameIdea>(PRESET_IDEAS[0]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [savedBrands, setSavedBrands] = useState<NameIdea[]>([]);
  const [brandColorIndex, setBrandColorIndex] = useState<number>(0);
  const [mockupView, setMockupView] = useState<'all' | 'box' | 'cup' | 'sign'>('all');

  // Load saved brands from localStorage 
  useEffect(() => {
    const cached = localStorage.getItem('bakery_name_ideas_saved');
    if (cached) {
      setSavedBrands(JSON.parse(cached));
    }
  }, []);

  const saveToLocalStorage = (list: NameIdea[]) => {
    setSavedBrands(list);
    localStorage.setItem('bakery_name_ideas_saved', JSON.stringify(list));
  };

  // Generate name logic
  const handleGenerate = () => {
    const list: NameIdea[] = [];
    const count = 6;
    
    for (let i = 0; i < count; i++) {
      let name = '';
      let tagline = TAGLINE_TEMPLATES[Math.floor(Math.random() * TAGLINE_TEMPLATES.length)];
      let theme = 'Modern & Minimal';
      let fontStyle: 'serif' | 'sans' | 'mono' = 'sans';
      let colors = ["#1e293b", "#e2e8f0", "#334155"];

      const dec = GENERATOR_PARTS.decorations[Math.floor(Math.random() * GENERATOR_PARTS.decorations.length)];
      const type = GENERATOR_PARTS.types[Math.floor(Math.random() * GENERATOR_PARTS.types.length)];
      
      let baseWord = customKeyword.trim() 
        ? customKeyword.charAt(0).toUpperCase() + customKeyword.slice(1)
        : GENERATOR_PARTS.keywords[Math.floor(Math.random() * GENERATOR_PARTS.keywords.length)];

      if (vibePreference === 'classic') {
        name = `${dec} ${baseWord} Patisserie`;
        theme = 'French & Elegant';
        fontStyle = 'serif';
        colors = ["#A3704C", "#DFC2A2", "#1C1917"];
        tagline = `Elegant French pastry & custom sugarcraft.`;
      } else if (vibePreference === 'rustic') {
        name = `${baseWord} Hearth & Bread`;
        theme = 'Hearth & Rustic';
        fontStyle = 'serif';
        colors = ["#c2410c", "#fed7aa", "#451a03"];
        tagline = `Sourdoughs baked daily in stone-deck clay hearths.`;
      } else if (vibePreference === 'minimal') {
        name = `${baseWord.toUpperCase()} ${type.toUpperCase()}`;
        theme = 'Modern & Minimal';
        fontStyle = 'mono';
        colors = ["#000000", "#f5f5f4", "#737373"];
        tagline = `Geometric flour mechanics. Pure crusty devotion.`;
      } else if (vibePreference === 'whimsical') {
        name = `Sweet ${baseWord} Whisk`;
        theme = 'Playful & Whimsical';
        fontStyle = 'sans';
        colors = ["#be185d", "#fff1f2", "#ec4899"];
        tagline = `Joyous, cloud-soft desserts to brighten your afternoons.`;
      } else {
        // Swahili fusion
        const swahiliWords = ["Tamu", "Asali", "Mkate", "Safi", "Pendo", "Bora"];
        const swItem = swahiliWords[Math.floor(Math.random() * swahiliWords.length)];
        name = `Maison ${baseWord} ${swItem}`;
        theme = 'Kenyan Sourced & Swahili Heritage';
        fontStyle = 'serif';
        colors = ["#b45309", "#fffbeb", "#f59e0b"];
        tagline = `Kenyan stoneground artisan heritage.`;
      }

      list.push({
        name,
        tagline,
        theme,
        vibes: ["creative", vibePreference, "authentic"],
        reason: "Dynamically crafted based on selected professional bakery structures.",
        colors,
        fontStyle
      });
    }

    setGeneratedNames(list);
    // Set the first one as default selected brand for preview
    if (list.length > 0) {
      setSelectedBrand(list[0]);
    }
  };

  // Run on mount to seed first results
  useEffect(() => {
    handleGenerate();
  }, [vibePreference]);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleBookmark = (brand: NameIdea) => {
    const standsOut = savedBrands.find(b => b.name === brand.name);
    if (standsOut) {
      const filtered = savedBrands.filter(b => b.name !== brand.name);
      saveToLocalStorage(filtered);
    } else {
      const updated = [brand, ...savedBrands];
      saveToLocalStorage(updated);
    }
  };

  const themes = ['All', 'French & Elegant', 'Hearth & Rustic', 'Modern & Minimal', 'Playful & Whimsical', 'Kenyan Sourced & Swahili Heritage'];
  const filteredPresets = activeTheme === 'All' 
    ? PRESET_IDEAS 
    : PRESET_IDEAS.filter(item => item.theme === activeTheme);

  // Custom Colors
  const CUSTOM_PALETTES = [
    { name: "Sourdough Kraft", text: "text-[#c5a059]", bg: "bg-[#c5a059]/10", border: "border-[#c5a059]/30", hex: "#c5a059", borderHex: "rgba(197, 160, 89, 0.3)" },
    { name: "Emerald Mint Tea", text: "text-emerald-400", bg: "bg-emerald-950/40", border: "border-emerald-500/30", hex: "#10b981", borderHex: "rgba(16, 185, 129, 0.3)" },
    { name: "Royal Copper", text: "text-amber-500", bg: "bg-amber-950/40", border: "border-amber-500/30", hex: "#f59e0b", borderHex: "rgba(245, 158, 11, 0.3)" },
    { name: "Raspberry Meringue", text: "text-rose-400", bg: "bg-rose-950/40", border: "border-rose-500/30", hex: "#fb7185", borderHex: "rgba(251, 113, 133, 0.3)" },
    { name: "Slate Charcoal", text: "text-slate-300", bg: "bg-slate-900", border: "border-slate-700", hex: "#cbd5e1", borderHex: "rgba(203, 213, 225, 0.3)" }
  ];

  return (
    <div className="bg-[#0b0b0b] text-[#eaeaea] min-h-screen py-16 px-4 sm:px-6 lg:px-8 space-y-20">
      {/* 1. Header Banner & Intro */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 border border-[#c5a059]/30 bg-[#c5a059]/5 px-3 py-1.5 rounded-none text-[#c5a059] text-xs font-semibold tracking-[0.2em] uppercase font-mono">
          <Sparkles className="h-4 w-4" />
          <span>Interactive Brand Inspiration Workbench</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl text-white tracking-tight leading-none font-light">
          Bakery Name Ideas <br />
          <span className="text-[#c5a059] italic">& Mockup Designer</span>
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
          Embarking on a new culinary venture in Nairobi or beyond? Explore our gourmet selection of hand-crafted branding concepts, mix and match high-fashion baking vocabulary, and instantly visualise names on high-fidelity custom packaging.
        </p>
      </section>

      {/* 2. Brand Visualizer Studio (Split Screen Layout) */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="visualizer-studio">
        {/* LHS: Controls & Mashup Room */}
        <div className="lg:col-span-5 bg-[#121212] border border-white/5 p-6 rounded-none flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="border-b border-white/5 pb-4 flex justify-between items-center">
              <div>
                <h3 className="font-serif text-lg text-white font-medium">1. Brand Customizer</h3>
                <p className="text-[10px] text-gray-500 font-mono tracking-wide">SHAPE YOUR BAKERY'S SOUL</p>
              </div>
              <Palette className="h-5 w-5 text-[#c5a059]" />
            </div>

            {/* Custom Keyword Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase flex items-center justify-between">
                <span>Add Your Name / Focus Keyword</span>
                <span className="text-gray-600 italic">Optional</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Barbie, Nairobi, Scone..."
                  value={customKeyword}
                  onChange={(e) => setCustomKeyword(e.target.value)}
                  className="w-full text-xs p-3.5 border border-white/10 rounded-none bg-black text-white focus:outline-none focus:border-[#c5a059] font-mono tracking-wide"
                />
                <button
                  onClick={handleGenerate}
                  className="bg-[#c5a059] hover:bg-[#d4b574] text-black px-4 flex items-center justify-center transition-colors rounded-none"
                  title="Regenerate with custom word"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Vibe Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">
                Select Aesthetic Vibe Tier
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'classic', label: 'French Elegance' },
                  { id: 'rustic', label: 'Warm Hearth & Sourdough' },
                  { id: 'minimal', label: 'Modern Minimalist' },
                  { id: 'whimsical', label: 'Playful & Cute' },
                  { id: 'safi', label: 'Kenyan Swahili Fusion' }
                ].map((vb) => (
                  <button
                    key={vb.id}
                    onClick={() => {
                      setVibePreference(vb.id as any);
                    }}
                    className={`p-3.5 text-left text-xs uppercase tracking-wider font-bold transition-all border ${
                      vibePreference === vb.id
                        ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059]'
                        : 'border-white/5 bg-[#151515] text-gray-450 hover:bg-[#1a1a1a] hover:border-white/15'
                    }`}
                  >
                    {vb.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Brand Highlight Colors */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">
                Mockup Palette Accents
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {CUSTOM_PALETTES.map((pal, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBrandColorIndex(idx)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded-full flex items-center space-x-1.5 transition-all ${
                      brandColorIndex === idx 
                        ? `${pal.bg} ${pal.border} ${pal.text} scale-105 font-bold`
                        : "border-white/5 text-gray-400 hover:bg-white/5"
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.hex }}></span>
                    <span>{pal.name.split(" ")[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 space-y-3">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>Generating based on 300+ professional patterns.</span>
            </div>
          </div>
        </div>

        {/* RHS: Dynamic Packaging Mockup Workspace */}
        <div className="lg:col-span-7 bg-[#101010] border border-white/5 p-6 rounded-none flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#c5a059]/2 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="space-y-4">
            <div className="flex flex-wrap justify-between items-center border-b border-white/5 pb-4">
              <div>
                <h3 className="font-serif text-lg text-white font-medium">
                  2. Dynamic Packaging & Signage Mockup
                </h3>
                <p className="text-[10px] text-gray-500 font-mono tracking-wide uppercase">
                  Rendering: <span className="text-[#c5a059] font-bold">{selectedBrand.name}</span>
                </p>
              </div>
              
              <div className="flex space-x-1 border border-white/10 p-0.5 bg-black/40">
                {(['all', 'box', 'cup', 'sign'] as const).map((view) => (
                  <button
                    key={view}
                    onClick={() => setMockupView(view)}
                    className={`px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest transition-all ${
                      mockupView === view 
                        ? 'bg-[#c5a059] text-black font-extrabold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Live Renderer Screen */}
            <div className="bg-[#0e0e0e] border border-white/10 p-4 sm:p-6 rounded-none flex flex-col items-center justify-center min-h-[380px] relative">
              
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Mockup 1: Custom Luxury Cake / Pastry Box */}
                {(mockupView === 'all' || mockupView === 'box') && (
                  <div className="border border-white/5 bg-[#121212] p-6 space-y-4 text-center relative flex flex-col justify-between items-center h-[340px] shadow-xl">
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-500 uppercase tracking-widest">A. GOURMET CAKE BOX</div>
                    
                    {/* Golden Circle Seal Emblem */}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border transition-all mt-4"
                         style={{ borderColor: CUSTOM_PALETTES[brandColorIndex].borderHex, backgroundColor: `${CUSTOM_PALETTES[brandColorIndex].hex}10` }}>
                      <Award className="h-5 w-5" style={{ color: CUSTOM_PALETTES[brandColorIndex].hex }} />
                    </div>

                    <div className="space-y-2 w-full px-2">
                      <p 
                        className={`text-xl font-bold tracking-widest text-white leading-tight uppercase ${
                          selectedBrand.fontStyle === 'serif' ? 'font-serif' : selectedBrand.fontStyle === 'mono' ? 'font-mono text-base' : 'font-sans'
                        }`}
                        style={{ color: '#fff' }}
                      >
                        {selectedBrand.name}
                      </p>
                      
                      {/* Brand separator strip */}
                      <div className="w-16 h-[1.5px] mx-auto bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"></div>

                      <p className="text-[9px] italic text-[#ccc] font-serif leading-tight max-w-[170px] mx-auto">
                        "{selectedBrand.tagline}"
                      </p>
                    </div>

                    <div className="w-full text-[8px] font-mono text-gray-500 uppercase tracking-[0.2em] space-y-1 mt-2">
                      <div className="flex justify-between border-t border-white/5 pt-2">
                        <span>NET WT. / TIERS</span>
                        <span className="text-white">COSMIC SPEC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>EST. NAIROBI</span>
                        <span className="text-[#c5a059]">2026</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mockup 2: Premium Kraft Takeaway Coffee Cup */}
                {(mockupView === 'all' || mockupView === 'cup') && (
                  <div className="border border-white/5 bg-[#141414] p-6 text-center flex flex-col justify-between items-center h-[340px] shadow-xl relative">
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-500 uppercase tracking-widest">B. BEVERAGE SLEEVE</div>
                    
                    {/* Simulated Cup Shape representation */}
                    <div className="w-28 h-32 bg-[#1b1b1b] border border-white/10 rounded-b-3xl relative mt-8 flex flex-col justify-center items-center p-3">
                      {/* Kraft sleeve wrap */}
                      <div className="absolute w-full top-6 bottom-8 bg-[#252525] border-y border-white/10 flex flex-col items-center justify-center py-2 px-1 text-center shadow-md">
                        <span className="text-[7px] font-mono tracking-widest text-[#c5a059] uppercase block mb-1">CRAFT HOT PRESSED</span>
                        <p className={`text-[11px] font-bold tracking-wider text-white uppercase truncate w-24 ${
                          selectedBrand.fontStyle === 'serif' ? 'font-serif' : selectedBrand.fontStyle === 'mono' ? 'font-mono' : 'font-sans'
                        }`}>
                          {selectedBrand.name}
                        </p>
                        <div className="text-[5px] text-gray-400 mt-0.5 uppercase tracking-widest">Locally Crafted</div>
                      </div>
                    </div>

                    <div className="w-full text-[8px] font-mono text-gray-500 uppercase tracking-wider space-y-1">
                      <div className="flex justify-between border-t border-white/5 pt-2">
                        <span>PAPER BASE</span>
                        <span className="text-emerald-500">100% RECYCLABLE</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mockup 3: Storefront Wooden Hanging Sign */}
                {(mockupView === 'all' || mockupView === 'sign') && (
                  <div className="border border-white/5 bg-[#111111] p-6 text-center flex flex-col justify-between items-center h-[340px] shadow-xl relative col-span-1 md:col-span-2">
                    <div className="absolute top-2 left-2 text-[8px] font-mono text-gray-500 uppercase tracking-widest">C. OUTDOOR LANTERN SIGN</div>
                    
                    {/* Hanging chains */}
                    <div className="flex space-x-12 absolute top-0">
                      <div className="w-[1.5px] h-8 bg-zinc-650"></div>
                      <div className="w-[1.5px] h-8 bg-zinc-650"></div>
                    </div>

                    {/* Dark Wood Board */}
                    <div className="w-full max-w-sm border border-zinc-750 bg-[#161616] py-12 px-6 rounded-none mt-8 shadow-2xl flex flex-col items-center justify-center space-y-3 relative">
                      {/* Accent glow on sign border */}
                      <div className="absolute inset-0 border-[3px] opacity-20 pointer-events-none" style={{ borderColor: CUSTOM_PALETTES[brandColorIndex].hex }}></div>
                      
                      <div className="flex items-center space-x-1 justify-center">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CUSTOM_PALETTES[brandColorIndex].hex }}></span>
                        <p className="text-[7px] font-mono tracking-[0.3em] text-gray-400 uppercase">PREMIUM ARTISAN HUB</p>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CUSTOM_PALETTES[brandColorIndex].hex }}></span>
                      </div>

                      <h4 className={`text-2xl font-black text-white uppercase tracking-widest ${
                        selectedBrand.fontStyle === 'serif' ? 'font-serif' : selectedBrand.fontStyle === 'mono' ? 'font-mono' : 'font-sans'
                      }`}>
                        {selectedBrand.name}
                      </h4>

                      <p className="text-[9px] font-sans tracking-widest text-[#aaa] max-w-xs mx-auto leading-relaxed">
                        {selectedBrand.tagline}
                      </p>

                      <div className="text-[7px] font-mono text-[#c5a059] tracking-widest uppercase">
                        ★ SWEEPING FLAVOR SECRETS ★
                      </div>
                    </div>

                    <p className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                      Double-sided metal bracket sign specification with led backline casing.
                    </p>
                  </div>
                )}

              </div>

            </div>
          </div>

          {/* Bottom controls of mockup viewer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4">
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={() => toggleBookmark(selectedBrand)}
                className={`py-2 px-4 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
                  savedBrands.find(b => b.name === selectedBrand.name)
                    ? 'border-pink-500/40 bg-pink-500/10 text-pink-400'
                    : 'border-white/10 bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Heart className="h-4 w-4 fill-current" />
                <span>
                  {savedBrands.find(b => b.name === selectedBrand.name) ? 'Saved' : 'Save Concept'}
                </span>
              </button>

              <button
                onClick={() => handleCopy(selectedBrand.name, 999)}
                className="py-2 px-4 flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {copiedIndex === 999 ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Name</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-gray-550 font-mono">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>BRAND READINESS: APPROVED FOR NAIROBI COMMERCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mashup Sandbox Room (Interactive Word Bento) */}
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-white/5 pb-4">
          <h2 className="font-serif text-2xl text-white font-light">
            Interactive Word Mashup Sandbox
          </h2>
          <p className="text-xs text-gray-500">
            Combine premium prefix, baking focal terms, and high-quality endings to form your own unique names instantly!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#0f0f0f] border border-white/5 p-6">
          
          {/* Column A: Prefix */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase block">1. Pick Prefix Accent</span>
            <div className="flex flex-wrap gap-2">
              {GENERATOR_PARTS.decorations.map((dec, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedBrand(prev => ({
                      ...prev,
                      name: `${dec} ${prev.name.split(' ').slice(1).join(' ')}` || `${dec} Hearth Bakers`
                    }));
                  }}
                  className="px-3 py-1.5 text-xs font-mono bg-black hover:bg-zinc-900 border border-white/5 hover:border-[#c5a059]/40 text-gray-300 transition-colors"
                >
                  {dec}
                </button>
              ))}
            </div>
          </div>

          {/* Column B: Focal Term */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-[#c5a059] uppercase block">2. Core Baking Term</span>
            <div className="flex flex-wrap gap-2">
              {GENERATOR_PARTS.keywords.map((kw, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const parts = selectedBrand.name.split(' ');
                    const prefix = parts.length > 2 ? parts[0] : 'The';
                    const suffix = parts.length > 2 ? parts[parts.length - 1] : 'Bakehouse';
                    setSelectedBrand(prev => ({
                      ...prev,
                      name: `${prefix} ${kw} ${suffix}`
                    }));
                  }}
                  className="px-3 py-1.5 text-xs font-mono bg-black hover:bg-[#c5a059]/10 border border-[#c5a059]/20 hover:border-[#c5a059] text-white transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>

          {/* Column C: Ending / Suffix */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase block">3. Business Ending</span>
            <div className="flex flex-wrap gap-2">
              {GENERATOR_PARTS.types.map((type, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const parts = selectedBrand.name.split(' ');
                    const main = parts.slice(0, parts.length - 1).join(' ') || 'Golden Crumb';
                    setSelectedBrand(prev => ({
                      ...prev,
                      name: `${main} ${type}`
                    }));
                  }}
                  className="px-3 py-1.5 text-xs font-mono bg-black hover:bg-zinc-900 border border-white/5 hover:border-[#c5a059]/40 text-gray-300 transition-colors"
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Generated list collection area */}
      <section className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-end border-b border-white/5 pb-4">
          <div>
            <h2 className="font-serif text-2xl text-white font-light">Custom Generated Suggestions</h2>
            <p className="text-xs text-gray-500">Pick any option block to instantly load into the visualizer sleeve above</p>
          </div>
          <button
            onClick={handleGenerate}
            className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 active:scale-95 text-white border border-white/10 text-xs uppercase tracking-widest font-bold px-4 py-2.5 transition-all text-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Generate Fresh Ideas</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {generatedNames.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedBrand(item);
                const el = document.getElementById('visualizer-studio');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`border p-6 space-y-4 cursor-pointer transition-all ${
                selectedBrand.name === item.name 
                  ? 'border-[#c5a059] bg-[#c5a059]/5' 
                  : 'border-white/5 bg-[#121212]/30 hover:border-white/15'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#c5a059] border border-[#c5a059]/20 px-2 py-0.5">
                  {item.theme}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(item);
                  }}
                  className="text-gray-500 hover:text-white"
                >
                  <Heart className={`h-4 w-4 ${savedBrands.find(b => b.name === item.name) ? 'fill-[#c5a059] text-[#c5a059]' : ''}`} />
                </button>
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-white tracking-wide uppercase font-serif">
                  {item.name}
                </h4>
                <p className="text-[11px] italic text-[#ccc]">"{item.tagline}"</p>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-500 uppercase font-mono pt-3 border-t border-white/5">
                <span>View Mockup Box & Sign</span>
                <ArrowRight className="h-3.5 w-3.5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Pre-made / Curated Catalog Board */}
      <section className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-end border-b border-white/5 pb-4">
            <div>
              <h2 className="font-serif text-2xl text-white font-light">Curated Masterpiece Concepts</h2>
              <p className="text-xs text-gray-500">Fine, classical brand identities designed by master pastry marketing teams</p>
            </div>
          </div>
          
          {/* Active Preset Filter */}
          <div className="flex flex-wrap gap-2">
            {themes.map((th) => (
              <button
                key={th}
                onClick={() => setActiveTheme(th)}
                className={`px-4 py-2 text-[10px] font-mono tracking-wider uppercase border transition-all ${
                  activeTheme === th
                    ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059] font-bold'
                    : 'border-white/5 bg-transparent text-gray-400 hover:bg-white/5'
                }`}
              >
                {th.split(' & ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPresets.map((item, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedBrand(item);
                const el = document.getElementById('visualizer-studio');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`p-6 bg-[#131313] border flex flex-col justify-between space-y-6 cursor-pointer transition-all group ${
                selectedBrand.name === item.name 
                  ? 'border-[#c5a059]' 
                  : 'border-white/5 hover:border-white/15'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gray-400">
                    {item.theme}
                  </span>
                  
                  <div className="flex space-x-1">
                    {item.colors.map((c, cIdx) => (
                      <span key={cIdx} className="w-2 h-2 rounded-full border border-white/10" style={{ backgroundColor: c }}></span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-serif text-white uppercase group-hover:text-[#c5a059] transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs italic text-[#bbb]">"{item.tagline}"</p>
                </div>

                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  <strong>The Brand Philosophy:</strong> {item.reason}
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-[#c5a059] uppercase border-t border-white/5 pt-3">
                <span>Try this setup in the visualizer studio</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#c5a059] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Saved Concepts Tray Side Tray */}
      {savedBrands.length > 0 && (
        <section className="max-w-7xl mx-auto bg-[#101010] border border-white/5 p-6 space-y-4">
          <div className="border-b border-white/5 pb-2 flex justify-between items-center">
            <div>
              <h3 className="font-serif text-lg text-white font-medium">Your Bookmarked Brand Configurations</h3>
              <p className="text-xs text-gray-500">A personal shortlist of names you are actively considering</p>
            </div>
            
            <button
              onClick={() => saveToLocalStorage([])}
              className="text-[10px] font-mono uppercase text-red-400 hover:text-red-300"
            >
              Clear Shortlist
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {savedBrands.map((brand, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedBrand(brand);
                  const el = document.getElementById('visualizer-studio');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className="p-4 bg-black border border-white/10 hover:border-[#c5a059] transition-colors cursor-pointer text-center space-y-2 relative"
              >
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white uppercase truncate font-serif">{brand.name}</p>
                  <p className="text-[10px] text-gray-400 italic truncate">"{brand.tagline}"</p>
                </div>
                <div className="text-[8px] font-mono uppercase text-gray-650">Theme: {brand.theme.split(' & ')[0]}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Branding FAQ Guide */}
      <section className="bg-[#121212] border border-white/5 p-8 max-w-7xl mx-auto space-y-6">
        <h3 className="font-serif text-xl sm:text-2xl text-white font-light text-center">
          Quick Guide: How to choose a brilliant bakery brand name
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-400 leading-relaxed font-light">
          <div className="space-y-2">
            <span className="text-white font-medium block text-sm">1. Focus on the Mouthfeel</span>
            <p>
              Baking names should trigger culinary expectations. Sourdough implies crisp dark crusts and tang, while Patisserie calls to mind weightless layers of whipped cream or hot golden pastry glaze.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-white font-medium block text-sm">2. Pronunciability beats Complexity</span>
            <p>
              Your name will live on social media, brown grease-resistant bags, and family conversations. Opt for simple syllables and alliteration (e.g., TamuTamu, Grist & Grain) that anyone in Nairobi can request easily.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-white font-medium block text-sm">3. Highlight Sourcing authenticity</span>
            <p>
              Modern sweet enthusiasts appreciate integrity. Adding focus points like "Organic Sourced Flour", "Asali (Honey) Hearth", or Swahili heritage honors local farmers and establishes safe eating compliance instantly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
