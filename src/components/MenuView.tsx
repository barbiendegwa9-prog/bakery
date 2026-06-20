import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, ShoppingCart, Info, CheckCircle, Gift, Sparkles, X, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface MenuViewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onRequestCatering: (serviceName: string) => void;
}

export default function MenuView({ products, onAddToCart, onRequestCatering }: MenuViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Cakes' | 'Artisanal Breads & Pastries' | 'Desserts'>('All');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');
  const [showOnlyBestsellers, setShowOnlyBestsellers] = useState(false);
  
  // Custom Catering Inquiry popup state
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [cateringForm, setCateringForm] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '',
    notes: ''
  });
  const [cateringSuccess, setCateringSuccess] = useState(false);

  // Category listing
  const categories: ('All' | 'Cakes' | 'Artisanal Breads & Pastries' | 'Desserts')[] = [
    'All', 'Cakes', 'Artisanal Breads & Pastries', 'Desserts'
  ];

  // Filters logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.subcategory.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesBestseller = !showOnlyBestsellers || product.isBestSeller;

    return matchesSearch && matchesCategory && matchesBestseller;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default order
  });

  // Services list
  const services = [
    {
      name: "Event Catering",
      desc: "Delight guests at your gatherings with beautiful assortments of fresh puff pastries, savory croissants, and mini-cupcakes.",
      features: ["Custom buffet design", "Platter configurations", "Servicing setups"]
    },
    {
      name: "Wedding Catering",
      desc: "Craft the wedding menu of your dreams, featuring our high-fashion dessert displays, tiered wedding cakes, and custom tastings.",
      features: ["Complimentary tastings", "Delivery & setup coordination", "Multi-tier structures"]
    },
    {
      name: "Corporate Orders",
      desc: "Excite your team or clients with boxes of fresh morning croissants, honey brown breads, and gourmet cookies for office events.",
      features: ["Flexible recurring subscriptions", "Elegant branding templates", "Guaranteed early arrival"]
    },
    {
      name: "Custom Cake Design",
      desc: "Work directly with Chef Evelyn Rose to design bespoke, gravity-defying cakes shaped and piped tailored for any milestone.",
      features: ["Custom drawing reviews", "Edible real gold wraps", "Exquisite customized flavor palettes"]
    },
    {
      name: "Bulk Orders",
      desc: "Placing a massive holiday orders list? Secure wholesale discounts on artisan breads, cupcakes, and doughnuts.",
      features: ["Volume cost tier pricing", "Assurance testing", "Secure climate transit"]
    }
  ];

  const handleCateringInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setCateringSuccess(true);
    setTimeout(() => {
      setSelectedService(null);
      setCateringSuccess(false);
      setCateringForm({ name: '', phone: '', date: '', guests: '', notes: '' });
    }, 2800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-fade-in">
      
      {/* Search and Filters Header */}
      <section className="bg-white border border-amber-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-heading text-3xl font-extrabold text-gray-950">Delicious Product Catalog</h1>
            <p className="text-sm text-gray-500 mt-1">Search, filter, and order artisan bakery selections baked golden fresh daily.</p>
          </div>
          
          {/* Main search box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="menu-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search cupcakes, artisan sourdough..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-gray-800"
            />
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-amber-50">
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50/50 text-amber-900 border border-amber-100 hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
            {/* Toggle Bestseller widget */}
            <label className="flex items-center space-x-2 cursor-pointer text-xs font-semibold text-gray-600 hover:text-gray-800">
              <input
                type="checkbox"
                checked={showOnlyBestsellers}
                onChange={() => setShowOnlyBestsellers(!showOnlyBestsellers)}
                className="rounded text-amber-600 focus:ring-amber-500 h-4 w-4 border-gray-300"
              />
              <span>Best-Sellers Only</span>
            </label>

            <span className="text-gray-350">|</span>

            {/* Sorter selection */}
            <div className="flex items-center space-x-1">
              <SlidersHorizontal className="h-4 w-4 text-gray-400" />
              <select
                id="menu-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-gray-600 focus:outline-none cursor-pointer hover:text-gray-800"
              >
                <option value="default">Sort by standard</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Products */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-heading text-xl font-bold text-gray-900">
            {activeCategory} Selections ({sortedProducts.length})
          </h2>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')} 
              className="text-xs font-medium text-amber-700 hover:underline"
            >
              Clear search text
            </button>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
            <Info className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-bounce" />
            <p className="text-gray-500 text-sm font-medium">No bakery products found matching your active tags.</p>
            <p className="text-xs text-gray-400 mt-1">Try to adjusting your search text or removing filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                id={`catalog-card-${product.id}`}
                className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative overflow-hidden aspect-square rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-50 shadow-xs flex items-center">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                    <span className="text-xs font-black text-gray-800">{product.rating}</span>
                    <span className="text-[9px] text-gray-400 font-medium ml-1">({product.ratingCount})</span>
                  </div>
                  {product.inventory <= 5 && product.inventory > 0 && (
                    <span className="absolute bottom-3 left-3 bg-red-100 text-red-800 text-[10px] font-bold tracking-tight px-2 py-1 rounded shadow-xs">
                      Only {product.inventory} left
                    </span>
                  )}
                  {product.inventory === 0 && (
                    <span className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                      Sold Out
                    </span>
                  )}
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono tracking-wider font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md uppercase">
                        {product.subcategory}
                      </span>
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-gray-900 mt-2 line-clamp-1 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <span className="text-lg font-black text-gray-950">Ksh {product.price.toFixed(2)}</span>
                    <button
                      id={`catalog-add-${product.id}`}
                      disabled={product.inventory === 0}
                      onClick={() => onAddToCart(product)}
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                        product.inventory === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-xs hover:shadow-amber-600/10'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Catering & Event Services (Our Services section) */}
      <section className="bg-gradient-to-tr from-amber-50/50 to-orange-50/40 rounded-3xl p-8 sm:p-12 border border-amber-100 space-y-10">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase">Artisan Services</span>
          <h2 className="font-heading text-3xl font-extrabold text-gray-950">Events Catering & Bespoke Services</h2>
          <p className="text-gray-600 text-sm">
            Whether wedding bells are ringing, family is gathering, or office stakeholders need high-end snacking, we execute tailored setups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white border border-amber-100/60 p-6 rounded-2xl flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="p-3 bg-amber-50 text-amber-700 rounded-xl w-fit">
                  <Gift className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900">{service.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{service.desc}</p>
                
                <ul className="space-y-1.5 pt-2">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2 text-xs text-gray-700">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                id={`catering-inquiry-${idx}`}
                onClick={() => {
                  setSelectedService(service.name);
                  onRequestCatering(service.name);
                }}
                className="w-full text-center py-2.5 rounded-xl border border-amber-100 hover:border-amber-400 bg-amber-50/20 hover:bg-amber-50 text-amber-700 text-xs font-bold transition-all duration-300"
              >
                Inquire About {service.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Catering Inquiry Modal popup */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-amber-100 max-w-md w-full p-6 space-y-4 shadow-xl" id="catering-modal-popup">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-amber-500 fill-amber-200" />
                <h3 className="font-heading font-extrabold text-lg text-gray-950">Inquire Service</h3>
              </div>
              <button 
                onClick={() => setSelectedService(null)} 
                className="p-1 px-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {cateringSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h4 className="font-heading font-black text-gray-900 text-base">Inquiry Saved Successfully!</h4>
                <p className="text-xs text-gray-500">Chef Evelyn Rose will call or write you within 30 minutes to discuss custom tasting menus.</p>
              </div>
            ) : (
              <form onSubmit={handleCateringInquiry} className="space-y-4">
                <p className="text-xs text-gray-600 bg-amber-50 p-2.5 rounded-lg">
                  You are inquiring details regarding: <strong>{selectedService}</strong>. Complete the form to establish quotes.
                </p>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Catering Contact Name</label>
                  <input
                    type="text"
                    required
                    value={cateringForm.name}
                    onChange={(e) => setCateringForm({...cateringForm, name: e.target.value})}
                    placeholder="e.g. Juliet Thompson"
                    className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={cateringForm.phone}
                      onChange={(e) => setCateringForm({...cateringForm, phone: e.target.value})}
                      placeholder="+254..."
                      className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Event Date</label>
                    <input
                      type="date"
                      required
                      value={cateringForm.date}
                      onChange={(e) => setCateringForm({...cateringForm, date: e.target.value})}
                      className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Estimated Guest Volume</label>
                  <input
                    type="number"
                    required
                    value={cateringForm.guests}
                    onChange={(e) => setCateringForm({...cateringForm, guests: e.target.value})}
                    placeholder="e.g. 50"
                    className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Cake Themes & Custom Notes</label>
                  <textarea
                    rows={3}
                    value={cateringForm.notes}
                    onChange={(e) => setCateringForm({...cateringForm, notes: e.target.value})}
                    placeholder="Describe allergen limits, preferred frosting, custom layers etc..."
                    className="w-full text-sm p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold tracking-widest uppercase transition-colors"
                >
                  Send Consultation Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
