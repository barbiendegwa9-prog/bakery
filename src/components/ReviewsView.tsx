import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, Heart, User, CheckCircle2 } from 'lucide-react';
import { Review } from '../types';

interface ReviewsViewProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsView({ reviews, onAddReview }: ReviewsViewProps) {
  const [form, setForm] = useState({ name: '', comment: '', rating: 5 });
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [starFilter, setStarFilter] = useState<number | 'All'>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    const newReview: Review = {
      id: `REV-${Date.now()}`,
      name: form.name,
      rating: form.rating,
      comment: form.comment,
      date: new Date().toISOString().split('T')[0],
      approved: true, // Auto-approve during testing so user sees results instantly
    };

    onAddReview(newReview);
    setSuccess(true);
    setForm({ name: '', comment: '', rating: 5 });

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  // Filter reviews
  const displayedReviews = reviews.filter((r) => {
    const matchesApproval = r.approved;
    const matchesStars = starFilter === 'All' || r.rating === starFilter;
    return matchesApproval && matchesStars;
  });

  // Calculate aggregates
  const totalReviews = reviews.filter(r => r.approved).length;
  const averageRating = totalReviews === 0 
    ? 0 
    : (reviews.filter(r => r.approved).reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20 animate-fade-in">
      
      {/* Intro panel & Aggregations */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-amber-50/20 p-8 sm:p-12 rounded-3xl border border-amber-100">
        <div className="lg:col-span-4 text-center lg:text-left space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-600 uppercase">Evaluations Audit</span>
          <h1 className="font-heading text-4xl font-extrabold text-gray-950">Customer Reviews</h1>
          <p className="text-gray-500 font-medium">Read honest summaries from our local client family.</p>
        </div>

        {/* Big metrics displays */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
          <div className="bg-white p-6 rounded-2xl border border-amber-100/50 text-center">
            <span className="text-4xl font-black text-gray-950">{averageRating}</span>
            <div className="flex justify-center my-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < Math.round(Number(averageRating)) ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <p className="text-[10px] font-mono uppercase text-gray-400">Average Satisfaction Score</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100/50 text-center flex flex-col justify-center">
            <span className="text-4xl font-black text-gray-950">{totalReviews}</span>
            <p className="text-[10px] font-mono uppercase text-gray-400 mt-2">Verified Reviews Published</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-amber-100/50 text-center flex flex-col justify-center">
            <span className="text-4xl font-black text-emerald-600">100%</span>
            <p className="text-[10px] font-mono uppercase text-gray-400 mt-2">Hygiene Inspection Score</p>
          </div>
        </div>
      </section>

      {/* Main split: Reviews listing & submit form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Listing column (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <h2 className="font-heading text-lg font-bold text-gray-900">Verified Testimonials ({displayedReviews.length})</h2>
            
            {/* Quick Star Filter */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-gray-400">Filter:</span>
              <select
                value={starFilter}
                onChange={(e) => setStarFilter(e.target.value === 'All' ? 'All' : Number(e.target.value))}
                className="bg-transparent font-semibold text-amber-700 focus:outline-none cursor-pointer"
                id="review-star-filter"
              >
                <option value="All">All Stars</option>
                <option value="5">5 Star reviews</option>
                <option value="4">4 Star reviews</option>
                <option value="3">3 Star reviews</option>
              </select>
            </div>
          </div>

          {displayedReviews.length === 0 ? (
            <div className="text-center py-16 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <MessageSquare className="h-8 w-8 text-gray-300 mx-auto mb-2 animate-bounce" />
              <p className="text-xs text-gray-400">No approved reviews match the filtered stars query.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {displayedReviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-gray-150 p-6 rounded-2xl shadow-xs space-y-3 relative group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="h-9 w-9 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center font-bold text-sm border border-amber-100">
                        {rev.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-sm text-gray-900 flex items-center gap-1">
                          {rev.name}
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 fill-emerald-100" title="Verified Customer" />
                        </h4>
                        <span className="text-[9px] font-mono text-gray-400">{rev.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-100'}`} />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-gray-750 italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submission form column (5 columns) */}
        <div className="lg:col-span-5 bg-white border border-gray-100 p-8 rounded-3xl shadow-sm space-y-6 h-fit sticky top-28">
          <div className="space-y-1">
            <h2 className="font-heading text-xl font-bold text-gray-905">Write a Review</h2>
            <p className="text-xs text-gray-500">Provide your rating and feedback to help other dessert lovers.</p>
          </div>

          {success ? (
            <div className="p-6 bg-emerald-50 text-center rounded-2xl border border-emerald-100 space-y-3 text-emerald-950">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-heading font-black text-sm">Review Saved!</h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                Thank you! Your feedback has been logged and published. We appreciate your words!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" id="review-submission-form">
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Customer Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Juliet"
                  className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl"
                />
              </div>

              {/* Star selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase block">Selected Star Rating</label>
                <div className="flex space-x-1.5 pt-1.5" id="rating-stars-selection">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 rounded text-amber-500 focus:outline-none hover:scale-110 transition-transform"
                    >
                      <Star 
                        className={`h-7 w-7 transition-all ${
                          star <= (hoverRating ?? form.rating) 
                            ? 'text-amber-500 fill-amber-500 animate-pulse' 
                            : 'text-gray-200'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Review Feedback Message</label>
                <textarea
                  required
                  rows={3}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  placeholder="Tell us about the cake, lamination textures, delivery, or hygiene compliance..."
                  className="w-full text-sm p-3 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs tracking-widest uppercase rounded-xl transition-all duration-300"
              >
                Publish Feedback
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
