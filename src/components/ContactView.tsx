import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactViewProps {
  onSendMessage: (msg: ContactMessage) => void;
}

export default function ContactView({ onSendMessage }: ContactViewProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [directionAddress, setDirectionAddress] = useState('');
  const [directionsResult, setDirectionsResult] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;

    const newMessage: ContactMessage = {
      id: `MSG-${Date.now()}`,
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      date: new Date().toISOString().split('T')[0]
    };

    onSendMessage(newMessage);
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setSuccess(false);
    }, 4500);
  };

  const handleGetDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!directionAddress.trim()) return;

    setDirectionsResult(`Calculating best sweet transit route from "${directionAddress}" to The Baker's Dozen (41 Sweet Street, Nairobi)... Expected travel time: 14 mins under light congestion. Transit: Head South-East toward Kilimani, pass the local circle.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-fade-in">
      
      {/* Intro section */}
      <section className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase">Interactive Liaison</span>
        <h1 className="font-heading text-4xl font-extrabold text-gray-950 tracking-tight">Connect with The Baker's Dozen</h1>
        <p className="text-gray-500 font-medium text-sm">
          Have an allergy concern, catering reservation, bulk orders list inquiry, or custom cake request? Reach our passionate bakers directly.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Column Left: Contact Details & hours (5 columns) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-amber-500/5 border border-amber-100 p-8 rounded-3xl space-y-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">Direct Contacts</h2>
            <p className="text-xs text-gray-550 leading-relaxed">Stop by during oven draw hours to inspect our hygiene audits catalog or taste sourdough starters.</p>

            <div className="space-y-5 text-sm text-gray-700">
              <a href="tel:+254700000000" className="flex items-start space-x-3.5 group hover:text-amber-700 transition-colors">
                <div className="p-2.5 bg-white border border-amber-100 rounded-lg text-amber-600 group-hover:bg-amber-100 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-400 uppercase">Phone & Orders Desk</p>
                  <p className="font-extrabold">+254 700 000 000</p>
                </div>
              </a>

              <a href="https://wa.me/254700000000" target="_blank" rel="noopener noreferrer" className="flex items-start space-x-3.5 group hover:text-emerald-705 transition-colors">
                <div className="p-2.5 bg-white border border-emerald-100 rounded-lg text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-400 uppercase">WhatsApp Live Chat</p>
                  <p className="font-extrabold text-emerald-700">Message Support Team</p>
                </div>
              </a>

              <a href="mailto:info@sweetdevotion.co.ke" className="flex items-start space-x-3.5 group hover:text-amber-700 transition-colors">
                <div className="p-2.5 bg-white border border-amber-100 rounded-lg text-amber-600 group-hover:bg-amber-100 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-400 uppercase">Email Coordinates</p>
                  <p className="font-extrabold">info@sweetdevotion.co.ke</p>
                </div>
              </a>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-white border border-gray-150 rounded-lg text-gray-600">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-mono font-bold text-gray-400 uppercase">Physical Sourdough Vault</p>
                  <p className="font-semibold text-gray-800">41 Sweet Street, Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business hours info card */}
          <div className="bg-white border border-gray-150 p-8 rounded-3xl space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5.5 w-5.5 text-amber-605" />
              <h3 className="font-heading font-extrabold text-base text-gray-950">Baking Oven Schedule</h3>
            </div>
            
            <div className="divide-y divide-gray-100 text-xs space-y-2 text-gray-650">
              <div className="flex justify-between items-center py-2 first:pt-0">
                <span className="font-bold text-gray-800">Monday - Saturday</span>
                <span className="font-mono text-amber-800">06:30 AM - 08:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-bold text-gray-800">Sunday & Holidays</span>
                <span className="font-mono text-gray-400 text-red-700">07:00 AM - 04:00 PM</span>
              </div>
              <p className="text-[10px] text-gray-405 leading-relaxed pt-2">
                Note: Gluten-free donuts and organic pecan cupcakes are finished at exactly 10:00 AM every working day.
              </p>
            </div>
          </div>
        </div>

        {/* Column Right: Contact Ticket Form (7 columns) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="font-heading text-2xl font-extrabold text-gray-950">Send an Inquiry Ticket</h2>
            <p className="text-xs text-gray-500">Inputs are directly synchronized to our kitchen tablet screen.</p>
          </div>

          {success ? (
            <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-100 space-y-4">
              <div className="h-12 w-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-heading font-black text-emerald-950 text-base">Inquiry Saved Successfully</h3>
              <p className="text-xs text-gray-550 max-w-sm mx-auto leading-relaxed">
                Thank you! Your message has been safely received. Chef Evelyn will respond with personalized metrics immediately.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="contact-inquiry-form">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Juliet"
                    className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl bg-gray-50/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="juliet@example.com"
                    className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Wedding Cake Gluten segregration advice"
                  className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl bg-gray-50/50"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Message Body</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us allergen limits, customized frosting themes, bulk donut flavors list..."
                  className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl bg-gray-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs tracking-widest uppercase flex items-center justify-center space-x-2 transition-all duration-300"
              >
                <Send className="h-4 w-4" />
                <span>Submit Ticket Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Google Maps Simulated Section */}
      <section className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-heading text-2xl font-extrabold text-gray-900">Virtual Clay Hearth Location</h2>
            <p className="text-xs text-gray-500">Interactive custom street coordinate mappings.</p>
          </div>
          
          <form onSubmit={handleGetDirections} className="flex gap-2 max-w-sm w-full">
            <input
              type="text"
              value={directionAddress}
              onChange={(e) => setDirectionAddress(e.target.value)}
              placeholder="Enter your current street..."
              className="text-xs p-2.5 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-lg w-full"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold whitespace-nowrap flex items-center space-x-1"
            >
              <Navigation className="h-3 w-3" />
              <span>Get Directions</span>
            </button>
          </form>
        </div>

        {directionsResult && (
          <div className="p-4 bg-amber-50 text-xs text-amber-900 border border-amber-200 rounded-xl flex items-start space-x-2 animate-fade-in">
            <AlertCircle className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed font-semibold">{directionsResult}</p>
          </div>
        )}

        {/* Custom Stylized Map Box SVG/Grid */}
        <div className="relative h-96 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center bg-slate-900" id="google-maps-mock-canvas">
          {/* Abstract stylized grid representing Nairobi Sweet Street map */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#ffffff" strokeWidth="1" strokeOpacity="0.15">
              {/* Grid block outlines resembling city blocks */}
              <rect x="50" y="50" width="120" height="100" fill="transparent" />
              <rect x="220" y="50" width="180" height="100" fill="transparent" />
              <rect x="50" y="190" width="120" height="150" fill="transparent" />
              <rect x="220" y="190" width="180" height="150" fill="transparent" />
              {/* Roads drawing */}
              <line x1="0" y1="170" x2="1000" y2="170" stroke="#f1f5f9" strokeWidth="4" strokeOpacity="0.5" />
              <line x1="190" y1="0" x2="190" y2="500" stroke="#f1f5f9" strokeWidth="4" strokeOpacity="0.5" />
            </g>
          </svg>

          {/* Central Baker's Dozen Pin */}
          <div className="relative z-10 flex flex-col items-center space-y-2 animate-bounce">
            <div className="h-10 w-10 rounded-full bg-amber-600 border border-white flex items-center justify-center shadow-lg">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-200 text-center">
              <p className="text-[10px] font-black text-gray-900 leading-none">The Baker's Dozen Bakery</p>
              <p className="text-[8px] text-amber-600 font-mono mt-0.5">41 Sweet Street, Nairobi</p>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded text-[8px] font-mono text-gray-400">
            Coordinates: -1.2921° S, 36.8219° E • Live Feed Active
          </div>
        </div>
      </section>

    </div>
  );
}
