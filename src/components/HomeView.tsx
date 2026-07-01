import React from 'react';
import { Sparkles, Calendar, ShieldCheck, Heart, Clock, Award, Star, ArrowRight, ShoppingCart, Truck, ShoppingBag, Send } from 'lucide-react';
import { Product, Review } from '../types';

interface HomeViewProps {
  onNavigate: (tabId: string) => void;
  bestSellers: Product[];
  onAddToCart: (product: Product) => void;
  featuredReviews: Review[];
  openDeliveryForm: () => void;
}

export default function HomeView({
  onNavigate,
  bestSellers,
  onAddToCart,
  featuredReviews,
  openDeliveryForm,
}: HomeViewProps) {
  return (
    <div className="space-y-24 pb-24 bg-transparent text-stone-800 animate-fade-in">
      {/* 1. Attractive Bakery Banner Section */}
      <section className="relative overflow-hidden bg-white border-b border-stone-150 rounded-none mx-0 sm:mx-0 lg:mx-0">
        {/* Decorative ambient elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-[120px] -z-10 translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c5a059]/3 rounded-full blur-[100px] -z-10 -translate-x-10 translate-y-10"></div>
        <div className="absolute top-1/2 left-10 -translate-y-1/2 opacity-[0.03] text-[180px] font-serif select-none pointer-events-none text-stone-900 font-extralight hidden lg:block">
          Artisan
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Text panel */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 border border-[#c5a059]/30 bg-[#c5a059]/5 px-3 py-1.5 rounded-none text-[#c5a059] text-xs font-semibold tracking-[0.2em] uppercase font-mono shadow-sm">
              <Sparkles className="h-4 w-4" />
              <span>We bake with pure passion daily</span>
            </div>
            
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7.5xl font-light text-stone-900 tracking-tight leading-none">
              The Baker's <br />
              <span className="text-[#c5a059] italic">Dozen</span> Bakery
            </h1>
            
            {/* Welcome message */}
            <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Welcome to <strong className="text-[#c5a059] font-medium">The Baker's Dozen</strong>. Step into a world of pure aroma where 13 warm pastries are packed for the price of 12. Explore our exquisite handcrafted menu, order warm deliveries, or try our custom <strong className="text-[#c5a059] font-medium">Bakery Name Idea Designer</strong>.
            </p>

            {/* Call to action buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button
                id="cta-name-ideas"
                onClick={() => onNavigate('ideas')}
                className="bg-[#c5a059] text-black text-xs uppercase tracking-[0.2em] font-extrabold px-8 py-4 hover:bg-[#d4b574] hover:shadow-lg transition-all duration-300 rounded-none cursor-pointer flex items-center space-x-2"
              >
                <Sparkles className="h-4 w-4" />
                <span>Launch Brand Name Generator</span>
              </button>
              
              <button
                id="cta-view-menu"
                onClick={() => onNavigate('menu')}
                className="border border-stone-250 text-stone-800 text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 hover:bg-stone-50 transition-all duration-300 rounded-none cursor-pointer"
              >
                <span>Browse Menu Selections</span>
              </button>

              <button
                id="cta-request-delivery"
                onClick={openDeliveryForm}
                className="bg-[#c5a059]/10 hover:bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/30 text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 transition-all duration-300 rounded-none cursor-pointer"
              >
                <span>Request Delivery</span>
              </button>
            </div>
          </div>

          {/* Graphical/Image display */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center items-center">
            <div className="relative mx-auto max-w-xs shadow-2xl border border-stone-150 p-2 bg-white">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059] to-amber-600 rounded-none rotate-2 scale-[1.01] opacity-5"></div>
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800"
                alt="The Baker's Dozen Signature Strawberry Cake"
                referrerPolicy="no-referrer"
                className="relative rounded-none w-full h-[220px] sm:h-[280px] object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-none border border-stone-150 flex items-center space-x-2.5 shadow-2xl">
                <div className="p-1.5 bg-[#c5a059]/10 rounded-none border border-[#c5a059]/30">
                  <ShieldCheck className="h-5 w-5 text-[#c5a059]" />
                </div>
                <div>
                  <p className="text-[8px] font-mono font-bold text-gray-500 uppercase tracking-widest leading-none">FOOD SAFETY</p>
                  <p className="text-[11px] font-black text-[#c5a059] mt-0.5 font-mono">100% Certified Clean</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature highlights strip bottom of banner */}
        <div className="border-t border-stone-150 bg-[#faf9f6]/80">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap gap-10 justify-around text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#c5a059]/30 rounded-full flex items-center justify-center text-[#c5a059] text-sm">✓</div>
              <div>
                <p className="text-[9px] uppercase text-gray-500 tracking-widest leading-none">Standards</p>
                <p className="text-xs font-bold text-stone-900 mt-1">HACCP Certified</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#c5a059]/30 rounded-full flex items-center justify-center text-[#c5a059] text-sm">★</div>
              <div>
                <p className="text-[9px] uppercase text-gray-500 tracking-widest leading-none">Ingredients</p>
                <p className="text-xs font-bold text-stone-900 mt-1">Premium Organic</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-[#c5a059]/30 rounded-full flex items-center justify-center text-[#c5a059] text-sm">⚡</div>
              <div>
                <p className="text-[9px] uppercase text-gray-500 tracking-widest leading-none">Service</p>
                <p className="text-xs font-bold text-stone-900 mt-1">Express Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] uppercase text-[#c5a059] tracking-[0.3em] font-mono leading-none block">Guest Experience</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-stone-900">Why The Baker's Dozen Sparkles</h2>
          <p className="text-stone-600 max-w-lg mx-auto text-sm">
            Our uncompromised focus on quality, purity, and rigorous clean-room standards makes us Nairobi's favorite bakery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Clock className="h-5 w-5 text-[#c5a059]" />,
              title: "Freshly Baked Daily",
              desc: "We mix, proof, and hearth-bake our products in the crispiest hours before dawn, so you receive only steaming golden selections."
            },
            {
              icon: <Heart className="h-5 w-5 text-[#c5a059]" />,
              title: "Premium Ingredients",
              desc: "Only unbleached flours, rich grass-fed butter, fresh locally harvested eggs, and real organic vanilla bean seeds here."
            },
            {
              icon: <Award className="h-5 w-5 text-[#c5a059]" />,
              title: "HACCP Food Safety",
              desc: "Fully compliant with state organic regulations, daily high-heat steam sanitizations, and rigorous allergy segregation protocols."
            },
            {
              icon: <Truck className="h-5 w-5 text-[#c5a059]" />,
              title: "Fast Delivery",
              desc: "Equipped with certified climate control containers to preserve fragile frosting silhouettes and bread crunch straight to your table."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#111111]/80 border border-white/5 p-6 rounded-none hover:border-[#c5a059]/40 transition-all duration-300">
              <div className="p-3 bg-[#c5a059]/10 rounded-full w-fit mb-5 border border-[#c5a059]/20">
                {item.icon}
              </div>
              <h3 className="font-serif text-lg font-normal text-white mb-2">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best-Selling Products Section */}
      <section className="bg-[#111111]/40 py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-serif italic text-[#c5a059] tracking-widest block mb-1">A Customer Favorite</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">Daily Best-Sellers</h2>
            </div>
            <button
              onClick={() => onNavigate('menu')}
              className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-widest text-[#c5a059] hover:text-[#d4b574] transition-colors"
            >
              <span>Explore full catalog menu</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-neutral-50 rounded-xl border border-gray-200/50 overflow-hidden flex flex-col hover:border-amber-400/40 transition-all duration-300 group shadow-xs"
              >
                <div className="relative overflow-hidden aspect-square flex-shrink-0 rounded-t-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-neutral-100/95 backdrop-blur-md px-2 py-0.5 rounded-md border border-gray-200/30 shadow-xs flex items-center">
                    <Star className="h-3 w-3 text-[#c5a059] fill-[#c5a059] mr-1" />
                    <span className="text-[11px] font-bold text-gray-950">{product.rating}</span>
                  </div>
                  {product.isBestSeller && (
                    <div className="absolute top-2.5 right-2.5 bg-[#c5a059] text-black text-[9px] uppercase font-mono font-black tracking-widest px-1.5 py-0.5 rounded shadow-xs">
                      Bestseller
                    </div>
                  )}
                </div>

                <div className="p-3.5 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/20">
                      {product.subcategory}
                    </span>
                    <h3 className="font-serif font-bold text-sm text-gray-950 mt-2.5 group-hover:text-[#c5a059] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-0.5 line-clamp-1">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-gray-200/50">
                    <span className="text-sm font-serif italic text-[#c5a059] font-bold">Ksh {product.price.toFixed(0)}</span>
                    <button
                      id={`add-to-cart-${product.id}`}
                      onClick={() => onAddToCart(product)}
                      className="p-2 rounded-full bg-[#c5a059]/10 hover:bg-[#c5a059] text-[#c5a059] hover:text-black border border-[#c5a059]/20 hover:border-transparent transition-all duration-300 cursor-pointer"
                      title="Add to cart"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customer Testimonials Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] uppercase text-[#c5a059] tracking-[0.3em] font-mono block">Kind Words</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">Guest Experiences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredReviews.slice(0, 2).map((review) => (
            <div key={review.id} className="bg-[#0a0a0a] border-l-2 border-[#c5a059] p-8 rounded-none flex flex-col justify-between space-y-4 relative border-t border-r border-b border-white/5 shadow-2xl">
              <span className="absolute top-4 right-6 text-7xl font-serif text-[#c5a059]/10 pointer-events-none select-none">“</span>
              <p className="text-gray-300 italic text-sm leading-relaxed relative z-10 font-sans font-light">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div>
                  <h4 className="font-serif font-normal text-sm text-white">{review.name}</h4>
                  <p className="text-[9px] font-mono text-gray-500">{review.date}</p>
                </div>
                <div className="flex space-x-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 text-[#c5a059] fill-[#c5a059]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-[#c5a059] hover:text-[#d4b574] border-b border-[#c5a059] hover:border-[#d4b574] pb-1 cursor-pointer"
          >
            <span>Write your own honest review</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
