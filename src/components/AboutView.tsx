import React from 'react';
import { Target, Compass, Heart, Award, ShieldCheck, Flame } from 'lucide-react';

export default function AboutView() {
  const values = [
    {
      icon: <Award className="h-5 w-5 text-[#c5a059]" />,
      title: "Quality",
      desc: "We make zero compromises. From stone-milled flours to pure European butter, every single element undergoes complete assessment."
    },
    {
      icon: <Flame className="h-5 w-5 text-[#c5a059]" />,
      title: "Freshness",
      desc: "Our kitchens operate 24 hours. Artisanal breads are drawn from steam clay hearths every dawn to hit your butter knife crusty and warm."
    },
    {
      icon: <Heart className="h-5 w-5 text-[#c5a059]" />,
      title: "Customer Satisfaction",
      desc: "Your laughter at the wedding bar, your child's delight on birthday mornings, and healthy morning slices guide everything we bake."
    },
    {
      icon: <Compass className="h-5 w-5 text-[#c5a059]" />,
      title: "Innovation",
      desc: "Blending ancient sourdough fermentation techniques with contemporary low-sugar frosting artistry and organic infusions."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 bg-[#0c0c0c] text-[#e0e0e0] animate-fade-in">
      
      {/* 1. Company Story */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-[10px] tracking-[0.3em] font-mono text-[#c5a059] uppercase block">Est. 2018</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight leading-tight">
            Our Story, Baked With <br />
            <span className="text-[#c5a059] italic">Absolute Devotion</span>
          </h1>
          <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
            Sweet Devotion was born from a modest wood-fired oven in a small rustic kitchen, fueled by a deep, generational passion for classical pastry arts and nutrient-rich crusty breads. What began as a heartfelt weekend experiment of baking traditional artisan croissants for close neighbors quickly blossomed into a celebrated local bakery.
          </p>
          <p className="text-gray-500 font-light leading-relaxed text-xs sm:text-sm">
            Our lead pastry chef, Evelyn Rose, trained in the fine art of baking in European châteaux, brought home the secrets of multi-layered lamination and natural wild sourdough starters. Today, we carry on that rigorous legacy, ensuring that the touch of the artisan hand is never lost, and the smell of toasted sugars remains as authentic as the day we first opened our wooden doors.
          </p>
          <div className="p-4 bg-[#141414] border border-white/5 flex items-center space-x-4 w-fit">
            <span className="text-2xl font-serif italic font-semibold text-[#c5a059]">10,000+</span>
            <span className="text-[10px] text-gray-400 font-medium font-mono uppercase tracking-widest leading-none">Custom Cakes Crafted with Care</span>
          </div>
        </div>

        <div className="lg:col-span-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c5a059] to-amber-700 rounded-none rotate-2 opacity-5"></div>
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
            alt="Artisan kneading raw dough in kitchen"
            className="rounded-none shadow-2xl w-full h-[400px] object-cover border border-white/10 relative z-10"
          />
        </div>
      </section>

      {/* 2. Vision & Mission Section */}
      <section className="bg-[#111111] p-8 sm:p-12 border border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className="space-y-4 md:pr-6 md:border-r md:border-white/5">
            <div className="inline-flex p-3 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 rounded-full">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-2xl font-light text-white">Our Vision</h2>
            <p className="text-gray-400 font-light leading-relaxed text-sm">
              To become the most trusted and loved bakery brand by delivering exceptional baked product and memorable customer experience.
            </p>
            <p className="text-[10px] text-[#c5a059]/70 font-mono tracking-wider">Guiding community laughter and unforgettable milestones.</p>
          </div>

          {/* Mission */}
          <div className="space-y-4">
            <div className="inline-flex p-3 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 rounded-full">
              <Compass className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-2xl font-light text-white">Our Mission</h2>
            <p className="text-gray-400 font-light leading-relaxed text-sm">
              To provide fresh delicious and high-quality bakery product made with passion while maintaining the highest standards of hygiene and customer services.
            </p>
            <p className="text-[10px] text-[#c5a059]/70 font-mono tracking-wider">Ensuring absolute food safety in every organic flour grain we blend.</p>
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase text-[#c5a059] tracking-[0.3em] font-mono block leading-none">The Code We Bake By</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">Our Core Values</h2>
          <p className="text-gray-400 max-w-sm mx-auto text-xs font-light">
            These guiding pillars inspire our team to stand, bake, and serve with pride every day.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="bg-[#111111]/90 border border-white/5 p-6 rounded-none hover:border-[#c5a059]/40 transition-all duration-300 shadow-xl">
              <div className="p-3 bg-[#c5a059]/10 border border-[#c5a059]/20 rounded-full w-fit mb-5">
                {value.icon}
              </div>
              <h3 className="font-serif text-lg font-normal text-white mb-2">{value.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-light">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
