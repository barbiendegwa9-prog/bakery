import React, { useState } from 'react';
import { Truck, CheckCircle2, Flame, MapPin, Package, Search, ChevronRight, Clock, Info } from 'lucide-react';
import { Order } from '../types';

interface DeliverySystemProps {
  orders: Order[];
  activeTrackingId: string;
  setActiveTrackingId: (id: string) => void;
}

export default function DeliverySystem({
  orders,
  activeTrackingId,
  setActiveTrackingId,
}: DeliverySystemProps) {
  const [searchInput, setSearchInput] = useState('');
  const [searchError, setSearchError] = useState('');

  const currentOrder = orders.find(o => o.id.toUpperCase() === activeTrackingId.toUpperCase());

  const handleSearchTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const found = orders.find(o => o.id.toUpperCase() === searchInput.trim().toUpperCase());
    if (found) {
      setActiveTrackingId(found.id);
      setSearchError('');
    } else {
      setSearchError('Tracking reference code not found. Try SD-c1-demo or look in the Admin Board orders.');
    }
  };

  // Define tracking progress mapping
  const stages = [
    { key: 'received', label: 'Order Received', icon: <Package className="h-5 w-5" />, desc: 'Chef Evelyn verified raw parameters.' },
    { key: 'baking', label: 'Baking', icon: <Flame className="h-5 w-5" />, desc: 'Dough is inside stone-hearth steam ovens.' },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: <Truck className="h-5 w-5" />, desc: 'Climate-controlled container dispatched.' },
    { key: 'delivered', label: 'Delivered', icon: <CheckCircle2 className="h-5 w-5" />, desc: 'Handed warm treats to customer!' },
  ];

  const getStageIndex = (status: string) => {
    return stages.findIndex(s => s.key === status);
  };

  const activeIndex = currentOrder ? getStageIndex(currentOrder.status) : -1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 animate-fade-in">
      
      {/* Search Header layout */}
      <section className="bg-white border border-amber-100 p-8 rounded-3xl shadow-sm text-center space-y-6">
        <div className="p-3 bg-amber-50 rounded-2xl w-fit mx-auto text-amber-700">
          <Truck className="h-8 w-8 text-amber-600 animate-bounce" />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-heading text-3xl font-extrabold text-gray-950">Live Climate Delivery Tracker</h1>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Input your specialized tracking reference (e.g. <strong>SD-C1-DEMO</strong>) to check the preparation state.
          </p>
        </div>

        <form onSubmit={handleSearchTrack} className="max-w-md mx-auto relative flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              id="tracking-search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="e.g. SD-100234"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-colors"
          >
            Track
          </button>
        </form>

        {searchError && (
          <p className="text-xs text-red-600 font-medium" id="tracking-search-error">{searchError}</p>
        )}
      </section>

      {/* Tracking results detail panel */}
      {currentOrder ? (
        <section className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
          
          {/* Quick metadata bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-[10px] font-mono font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded">Active Order Stream</span>
              <h2 className="font-heading font-black text-lg text-gray-950 mt-1 flex items-center gap-2">
                Order Reference Code: <span className="font-mono text-amber-600">{currentOrder.id}</span>
              </h2>
            </div>
            
            <div className="text-right text-xs">
              <p className="text-gray-400">Reserved for Date:</p>
              <p className="font-bold text-gray-800">
                {currentOrder.deliveryDate} ({currentOrder.preferredTime === 'morning' ? 'Morning Slot' : currentOrder.preferredTime === 'afternoon' ? 'Afternoon Slot' : 'Evening Slot'})
              </p>
            </div>
          </div>

          {/* Visual Step-by-Step Node Tracker */}
          <div className="relative pt-4 pb-8" id="delivery-visual-nodes">
            {/* Visual line */}
            <div className="absolute top-[37px] left-8 sm:left-4 right-4 sm:right-4 h-1 bg-gray-100 -z-10 hidden sm:block">
              <div 
                className="h-full bg-emerald-500 transition-all duration-500" 
                style={{ width: `${(activeIndex / (stages.length - 1)) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
              {stages.map((stage, sIdx) => {
                const isPassed = sIdx <= activeIndex;
                const isCurrent = sIdx === activeIndex;

                return (
                  <div key={stage.key} className="flex sm:flex-col items-start sm:items-center text-left sm:text-center space-y-2 sm:space-y-4 relative">
                    
                    {/* Circle Node indicator */}
                    <div className={`h-11 w-11 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
                      isPassed 
                        ? 'bg-emerald-500 border-emerald-100 text-white shadow-md shadow-emerald-400/20' 
                        : 'bg-white border-gray-200 text-gray-300'
                    } ${isCurrent ? 'animate-pulse scale-105 border-emerald-200' : ''}`}>
                      {stage.icon}
                    </div>

                    <div className="ml-4 sm:ml-0">
                      <h4 className={`text-sm font-bold ${isPassed ? 'text-gray-900 font-extrabold' : 'text-gray-400'}`}>
                        {stage.label}
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed max-w-xs sm:mx-auto mt-1">
                        {stage.desc}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Logistics summary details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-gray-100 bg-gray-50/20 p-5 rounded-2xl">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Recipient Logistics</span>
              </div>
              <div className="text-sm space-y-1">
                <p className="font-extrabold text-gray-905">{currentOrder.customerName}</p>
                <p className="text-gray-600">{currentOrder.phone}</p>
                <p className="text-gray-550 italic leading-relaxed text-xs">{currentOrder.deliveryAddress}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-gray-400">
                <Package className="h-4 w-4 text-gray-400" />
                <span>Selected Items</span>
              </div>
              <div className="divide-y divide-gray-105">
                {currentOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1.5 first:pt-0 last:pb-0">
                    <span className="text-gray-600 line-clamp-1 truncate max-w-[200px]">
                      {it.product.name} <strong className="text-amber-700">x{it.quantity}</strong>
                    </span>
                    <span className="font-mono text-gray-800">Ksh {(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm font-black text-gray-950 pt-2 mt-2">
                  <span>Grand Total Paid</span>
                  <span>Ksh {currentOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

        </section>
      ) : (
        <section className="bg-amber-100/10 border border-amber-200/50 p-6 rounded-3xl flex items-center space-x-4 max-w-2xl mx-auto">
          <Info className="h-6 w-6 text-amber-605 flex-shrink-0" />
          <div className="text-xs text-gray-600 leading-relaxed">
            There is currently no tracked order parsed. Submit an item order through the menu's checkout. To test immediately, paste the pre-loaded coordinate: <strong className="bg-amber-50 text-amber-800 font-mono text-[11px] px-1.5 py-0.5 rounded border border-amber-100">SD-C1-DEMO</strong>.
          </div>
        </section>
      )}

    </div>
  );
}
