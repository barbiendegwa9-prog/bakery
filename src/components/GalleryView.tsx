import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, X, ChevronRight, ChevronLeft, RefreshCw, Eye } from 'lucide-react';

interface GalleryImage {
  url: string;
  category: string;
  title: string;
}

interface GalleryViewProps {
  images: GalleryImage[];
}

export default function GalleryView({ images }: GalleryViewProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'cakes' | 'pastries' | 'bread' | 'events' | 'behind the scenes'>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState(1);

  // Grouped Categories
  const categories: ('All' | 'cakes' | 'pastries' | 'bread' | 'events' | 'behind the scenes')[] = [
    'All', 'cakes', 'pastries', 'bread', 'events', 'behind the scenes'
  ];

  // Filtering images
  const filteredImages = images.filter((img) => {
    return activeCategory === 'All' || img.category === activeCategory;
  });

  const handleOpenLightbox = (imgUrl: string) => {
    const rawIdx = images.findIndex((img) => img.url === imgUrl);
    if (rawIdx !== -1) {
      setLightboxIndex(rawIdx);
      setZoomScale(1); // Reset zoom
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
    setZoomScale(1);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    setZoomScale(1);
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomScale(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fade-in">
      
      {/* Search Header layout */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase font-bold">Behind the Flour</span>
        <h1 className="font-heading text-4xl font-extrabold text-gray-950 tracking-tight">Oven Artistry Photo Gallery</h1>
        <p className="text-gray-500 font-medium text-sm">
          A visual feast of our signature tiers, fresh golden pastry crusts, clay-hearth sourdough loaves, and direct sanitization habits.
        </p>
      </section>

      {/* Categories tag filter list */}
      <div className="flex flex-wrap justify-center gap-1.5" id="gallery-categories-selectors">
        {categories.map((cat) => (
          <button
            key={cat}
            id={`gallery-cat-${cat.replace(/\s+/g, '-')}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                : 'text-gray-600 bg-white border-gray-150 hover:bg-amber-50 hover:text-amber-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Photo Grid list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" id="gallery-photo-grid">
        {filteredImages.map((img, idx) => (
          <div
            key={idx}
            className="group relative h-64 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-gray-100 border border-gray-100 cursor-pointer"
            onClick={() => handleOpenLightbox(img.url)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            
            {/* Visual Hover Overlay with Eye zoom icons */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
              <span className="text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-950/40 w-fit px-2 py-0.5 rounded border border-amber-850/50 mb-1">
                {img.category}
              </span>
              <h3 className="text-white font-heading font-extrabold text-sm truncate">
                {img.title}
              </h3>
              <div className="flex items-center space-x-1.5 text-xs text-gray-300 mt-2">
                <Maximize className="h-4 w-4" />
                <span>Zoom Lightbox</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal display with zooming overlays */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/95 flex flex-col justify-between p-4 z-50 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
          id="gallery-lightbox-modal"
        >
          {/* Top Control menu */}
          <div className="flex justify-between items-center text-white p-4">
            <div>
              <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-black leading-none">
                {images[lightboxIndex].category}
              </p>
              <h4 className="font-heading font-black text-sm mt-1">
                {images[lightboxIndex].title}
              </h4>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleZoomIn}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <button 
                onClick={handleZoomOut}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button 
                onClick={handleResetZoom}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                title="Reset Zoom"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <span className="text-gray-600">|</span>
              <button 
                onClick={() => setLightboxIndex(null)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Active Image viewing pane */}
          <div className="flex-grow flex items-center justify-center relative overflow-hidden">
            {/* Left carousel node */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 z-20 focus:outline-none transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Rendered main image with zoom multipliers applied */}
            <div className="max-w-3xl max-h-[70vh] w-full flex items-center justify-center relative">
              <img
                src={images[lightboxIndex].url}
                alt={images[lightboxIndex].title}
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking exact image
                className="max-h-[70vh] max-w-full object-contain rounded-lg transition-transform duration-200 shadow-2xl border-2 border-white/5"
                style={{ transform: `scale(${zoomScale})` }}
              />
            </div>

            {/* Right carousel node */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10 z-20 focus:outline-none transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Footer/Navigation summary indexes */}
          <div className="text-center text-xs text-gray-500 font-mono pb-4 flex flex-col sm:flex-row justify-between items-center px-4">
            <p>Use Chevron arrows to carousel. Pinch/click zoom tools above to inspect pastry crust glaze details.</p>
            <p className="mt-2 sm:mt-0 font-bold text-gray-400">
              Image {lightboxIndex + 1} of {images.length}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
