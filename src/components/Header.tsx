import React, { useState } from 'react';
import { ChefHat, ShoppingBag, Menu, X, Shield, Sparkles, UserCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  adminMode: boolean;
  setAdminMode: (mode: boolean) => void;
}

export default function Header({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  adminMode,
  setAdminMode,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'ideas', label: 'Name Ideas ✨' },
    { id: 'menu', label: 'Menu & Services' },
    { id: 'about', label: 'Our Story' },
    { id: 'safety', label: 'Food Safety' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleTabClick = (tabId: string) => {
    setAdminMode(false);
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group"
            id="header-logo"
          >
            <div className="p-2.5 bg-[#c5a059] rounded-full group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <ChefHat className="h-6 w-6 text-black" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[#c5a059] flex items-center gap-1.5 uppercase">
                BAKERY NAME IDEAS <Sparkles className="h-4 w-4 text-[#c5a059] fill-current" />
              </span>
              <p className="text-[9px] sm:text-[10px] font-mono text-gray-450 tracking-wider uppercase">
                Interactive Food Brand Designer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 ${
                  activeTab === item.id && !adminMode
                    ? 'text-[#c5a059] border-b-2 border-[#c5a059] font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 rounded-md'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center space-x-3">
            {/* Admin Switcher */}
            <button
              id="header-admin-btn"
              onClick={() => {
                setAdminMode(!adminMode);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                adminMode
                  ? 'bg-purple-900 border-purple-500 text-[#e9d5ff] shadow-md'
                  : 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border-white/10'
              }`}
              title="Toggle Bakery Dashboard Control"
            >
              {adminMode ? (
                <>
                  <UserCheck className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin Live</span>
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 text-gray-400 group-hover:text-[#c5a059]" />
                  <span className="hidden sm:inline">Dashboard</span>
                </>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={openCart}
              className="relative p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-300 hover:text-[#c5a059] hover:bg-white/10 transition-all duration-200"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c5a059] text-[#0c0c0c] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              id="header-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0c0c0c]" id="mobile-navigation-drawer">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  activeTab === item.id && !adminMode
                    ? 'bg-[#c5a059] text-black font-bold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-white/10 my-2 pt-2 px-2">
              <button
                id="mobile-admin-switch"
                onClick={() => {
                  setAdminMode(!adminMode);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex items-center justify-center space-x-2 w-full p-3 rounded-xl text-sm font-semibold tracking-wide border ${
                  adminMode
                    ? 'bg-purple-900 text-white border-purple-500'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <Shield className="h-4 w-4" />
                <span>{adminMode ? 'Switch to Customer View' : 'Launch Master Admin Control'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
