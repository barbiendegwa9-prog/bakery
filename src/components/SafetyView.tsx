import React from 'react';
import { ShieldCheck, Award, UserCheck, Flame, Scale, ThermometerSnowflake, Sparkles, RefreshCw } from 'lucide-react';

export default function SafetyView() {
  const standards = [
    {
      title: "HACCP Compliance",
      desc: "Hazard Analysis Critical Control Point protocols are built directly into our workflow, checking everything from raw flour temperatures to baking outputs."
    },
    {
      title: "Food Grade Ingredients",
      desc: "We exclusively import and utilize 100% food grade certified dry elements, zero synthetic colorings, and no cheap chemical rising agents."
    },
    {
      title: "Daily Equipment Sanitization",
      desc: "Every professional kneading hook, steel mixing bowl, and clay oven hearth goes through high-pressure steam sterilization before and after production shifts."
    },
    {
      title: "Staff Hygiene Training",
      desc: "Our bakers and pastry decorators complete monthly public health safety programs, wearing hygienic hairnets and food-safe gloves."
    },
    {
      title: "Fresh Ingredient Sourcing",
      desc: "Dairy, fruits, and eggs are collected from trusted local pastured farms and parsed within hours to prevent any raw moisture degradation."
    },
    {
      title: "Temperature Controlled",
      desc: "Custom ambient-tuned storage zones hold sensitive organic yeasts, chocolates, and meringues in complete scientific stability."
    }
  ];

  const certifications = [
    {
      authority: "Kenya Ministry of Health",
      title: "Public Health Inspection Compliance",
      badge: "Pass S-004",
      desc: "Consistent grade-A scores in structural cleaning audits, raw water filtration, and worker protective apparel."
    },
    {
      authority: "HACCP Global Board",
      title: "Food Safety Management Certification",
      badge: "ISO 22000 Compliant",
      desc: "Official certification endorsing our zero-contamination risk profiles and safe allergen compartmentalization policies."
    },
    {
      authority: "The Baker's Dozen QA Board",
      title: "Internal Quality Assurance Program",
      badge: "Double-Inspected",
      desc: "Each custom cake structure undergoes a 3-point visual check regarding fondant balance and structural dowel placements."
    }
  ];

  const trustFactors = [
    { title: "Fresh baked every day", icon: <Flame className="h-4 w-4 text-[#c5a059]" /> },
    { title: "Premium ingredients", icon: <Sparkles className="h-4 w-4 text-[#c5a059]" /> },
    { title: "Certified food safety practices", icon: <ShieldCheck className="h-4 w-4 text-[#c5a059]" /> },
    { title: "Professional bakers", icon: <UserCheck className="h-4 w-4 text-[#c5a059]" /> },
    { title: "Secure online ordering", icon: <Scale className="h-4 w-4 text-[#c5a059]" /> },
    { title: "Fast and reliable delivery", icon: <ThermometerSnowflake className="h-4 w-4 text-[#c5a059]" /> },
    { title: "Transparent pricing", icon: <Award className="h-4 w-4 text-[#c5a059]" /> },
    { title: "Excellent customer support", icon: <RefreshCw className="h-4 w-4 text-[#c5a059]" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 bg-[#0c0c0c] text-[#e0e0e0] animate-fade-in">
      
      {/* Introduction text */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 border border-emerald-500/35 bg-emerald-500/5 px-3 py-1.5 rounded-none text-emerald-400 text-xs font-mono uppercase tracking-widest">
          <ShieldCheck className="h-4 w-4 animate-pulse text-emerald-400" />
          <span>Biological Purity Guaranteed</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-light text-white tracking-tight leading-tight">
          Pastry Purification & <br />
          <span className="text-[#c5a059] italic">Food Safety Standards</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed font-light">
          At The Baker's Dozen, we treat clean baking as a scientific art. Because our pastries and breads find places on your family dinner table, we ensure every grain of flour, drop of organic cream, and steel mixing surface is pristine.
        </p>
      </section>

      {/* Standards grid */}
      <section className="space-y-12">
        <div className="border-l-2 border-[#c5a059] pl-5">
          <h2 className="font-serif text-2xl font-normal text-white">Our Operational Standards</h2>
          <p className="text-xs text-gray-500 mt-1 font-sans">Our daily, structural, and chemical guidelines to prevent food hazards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standards.map((standard, idx) => (
            <div key={idx} className="bg-[#111111] border border-white/5 hover:border-emerald-500/35 p-6 rounded-none transition-all duration-300">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#c5a059] uppercase block mb-3">STD 0{idx + 1}</span>
              <h3 className="font-serif text-lg font-normal text-white mb-2">{standard.title}</h3>
              <p className="text-xs text-gray-450 leading-relaxed font-light">{standard.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications and credentials list */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">Independent Verification</span>
          <h2 className="font-serif text-3xl font-light text-white leading-tight">Officially Inspected <br />& Certified</h2>
          <p className="text-gray-450 text-sm leading-relaxed font-light">
            We subject our kitchens to unannounced structural audit assessments by the state and private hygiene inspectors. This guarantees that we operate with maximum transparency, offering our clients clean food they can completely trust.
          </p>
          <div className="bg-[#111111] border border-white/5 p-6 rounded-none flex items-center space-x-4">
            <Award className="h-8 w-8 text-[#c5a059] flex-shrink-0" />
            <div>
              <h4 className="font-serif text-sm font-normal text-white">Double-Sanitized Code</h4>
              <p className="text-xs text-gray-400 leading-relaxed mt-1 font-light">We keep physical logs of high-temperature washouts for inspection anytime.</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {certifications.map((cert, idx) => (
            <div key={idx} className="bg-[#111111] border border-white/5 p-6 rounded-none flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block">{cert.authority}</span>
                <h3 className="font-serif text-base text-white">{cert.title}</h3>
                <p className="text-xs text-gray-450 leading-relaxed mt-1 font-light">{cert.desc}</p>
              </div>
              <span className="bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 text-[10px] font-mono tracking-widest px-3 py-1 rounded-none whitespace-nowrap uppercase">
                {cert.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why Customers Should Trust Us (Section 5) */}
      <section className="bg-[#111111]/80 rounded-none p-8 sm:p-12 border border-white/5">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[10px] uppercase text-[#c5a059] tracking-[0.3em] font-mono leading-none block">The Foundation of Faith</span>
          <h2 className="font-serif text-3xl font-light text-white">Why Customers Trust Us</h2>
          <p className="text-gray-400 text-xs font-light max-w-sm mx-auto">
            Trust is earned through delicious consistency, safe culinary habits, and transparent customer service. Here are the 8 trust pillars we extend to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFactors.map((factor, idx) => (
            <div key={idx} className="bg-[#0c0c0c] border border-white/5 p-5 rounded-none flex items-center space-x-3.5 hover:border-[#c5a059]/40 transition-colors duration-300">
              <div className="p-2.5 bg-[#c5a059]/10 rounded-full border border-[#c5a059]/20 flex-shrink-0">
                {factor.icon}
              </div>
              <span className="text-xs font-semibold text-gray-300 tracking-wide leading-tight">
                {factor.title}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
