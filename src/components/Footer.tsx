import React from 'react';
import { ChefHat, Phone, MapPin, Mail, Clock, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNav: (tabId: string) => void;
  onSetAdmin: (mode: boolean) => void;
}

export default function Footer({ onNav, onSetAdmin }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-gray-400 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Certification Statement */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 text-white">
              <span className="p-2.5 bg-[#c5a059] rounded-full flex items-center justify-center">
                <ChefHat className="h-5 w-5 text-black" />
              </span>
              <span className="font-serif text-lg tracking-widest uppercase text-[#c5a059]">Bakery Name Ideas</span>
            </div>
            <p className="text-xs text-gray-450 leading-relaxed font-light">
              Your gourmet master builder for custom bakery brands, artisanal names, high-fashion taglines, and live product packaging mockups.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 text-[10px] font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse"></span>
                <span>Active Concept Creator</span>
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-white font-serif font-normal text-sm tracking-wider uppercase mb-5">Explore</h4>
            <ul className="space-y-2 text-xs font-light text-gray-450">
              <li>
                <button onClick={() => onNav('home')} className="hover:text-[#c5a059] transition-colors cursor-pointer text-left">
                  Home Brand Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNav('ideas')} className="hover:text-[#c5a059] transition-colors cursor-pointer text-left font-semibold text-white">
                  Brand Name & Mockup Generator ✨
                </button>
              </li>
              <li>
                <button onClick={() => onNav('menu')} className="hover:text-[#c5a059] transition-colors cursor-pointer text-left">
                  Bakery Selections & Services
                </button>
              </li>
              <li>
                <button onClick={() => onNav('about')} className="hover:text-[#c5a059] transition-colors cursor-pointer text-left">
                  Company Story & Values
                </button>
              </li>
              <li>
                <button onClick={() => onNav('safety')} className="hover:text-[#c5a059] transition-colors cursor-pointer text-left">
                  Purification & Certifications
                </button>
              </li>
              <li>
                <button onClick={() => onNav('gallery')} className="hover:text-[#c5a059] transition-colors cursor-pointer text-left">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNav('blog')} className="hover:text-[#c5a059] transition-colors cursor-pointer text-left">
                  Tips & Baking Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Operational Information */}
          <div className="space-y-4 text-xs font-light text-gray-450">
            <h4 className="text-white font-serif font-normal text-sm tracking-wider uppercase mb-1">Our Hours</h4>
            <div className="flex items-start space-x-2.5">
              <Clock className="h-4 w-4 text-[#c5a059] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-200">Mon - Sat: 6:30 AM - 8:00 PM</p>
                <p className="text-[10px] text-gray-500">Sunday: 7:00 AM - 4:00 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-2.5 pt-1">
              <MapPin className="h-4 w-4 text-[#c5a059] mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">41 Sweet Street, Bakery Block, Nairobi, Kenya</p>
            </div>
          </div>

          {/* Column 4: Immediate Service Contacts */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-normal text-sm tracking-wider uppercase mb-1">Quick Ordering</h4>
            <div className="space-y-2 text-xs font-light">
              <a href="tel:+254700000000" className="flex items-center space-x-2.5 text-[#c5a059] hover:underline">
                <Phone className="h-4 w-4 text-[#c5a059]" />
                <span>+254 700 000 000</span>
              </a>
              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2.5 text-emerald-450 hover:underline">
                <svg className="w-4 h-4 fill-emerald-500" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.002-4.055l.385.228c1.614.957 3.639 1.463 5.716 1.464 5.613 0 10.177-4.515 10.18-10.07.001-2.695-1.046-5.222-2.949-7.127-1.902-1.903-4.431-2.951-7.135-2.952-5.6 0-10.165 4.516-10.169 10.071-.001 1.83.479 3.621 1.39 5.201l.241.417-1.12 4.093 4.195-1.096z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
              <a href="mailto:info@sweetdevotion.co.ke" className="flex items-center space-x-2.5 text-[#c5a059] hover:underline">
                <Mail className="h-4 w-4 text-[#c5a059]" />
                <span>info@sweetdevotion.co.ke</span>
              </a>
            </div>
            <div className="pt-3 border-t border-white/5">
              <button
                onClick={() => onSetAdmin(true)}
                className="flex items-center space-x-1.5 text-[11px] uppercase tracking-wider text-purple-400 hover:text-purple-300 cursor-pointer"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>Access Dashboard Console</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Socials & Disclaimer */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500">
          <p>© {currentYear} Sweet Devotion Bakery. All rights reserved. Locally sourced, globally certified.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0 font-light text-gray-500">
            <span className="hover:text-[#c5a059] cursor-pointer transition-colors">Facebook</span>
            <span>•</span>
            <span className="hover:text-[#c5a059] cursor-pointer transition-colors">Instagram</span>
            <span>•</span>
            <span className="hover:text-[#c5a059] cursor-pointer transition-colors">TikTok</span>
            <span>•</span>
            <span className="hover:text-[#c5a059] cursor-pointer transition-colors">YouTube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
