import React, { useState } from 'react';
import { Search, BookOpen, Clock, User, MessageCircle, Calendar, Share2, CornerDownRight, Send, X, ArrowLeft } from 'lucide-react';
import { BlogPost, BlogComment } from '../types';

interface BlogViewProps {
  posts: BlogPost[];
  onAddComment: (postId: string, comment: BlogComment) => void;
}

export default function BlogView({ posts, onAddComment }: BlogViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Baking Tips' | 'New Product Launches' | 'Bakery News' | 'Event Announcements'>('All');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  // New Comment inputs
  const [commentForm, setCommentForm] = useState({ author: '', text: '' });
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Categories list
  const categories: ('All' | 'Baking Tips' | 'New Product Launches' | 'Bakery News' | 'Event Announcements')[] = [
    'All', 'Baking Tips', 'New Product Launches', 'Bakery News', 'Event Announcements'
  ];

  // Filtering posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const activePost = posts.find((p) => p.id === selectedPostId);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPostId || !commentForm.author || !commentForm.text) return;

    const newComment: BlogComment = {
      id: `COM-${Date.now()}`,
      author: commentForm.author,
      text: commentForm.text,
      date: new Date().toISOString().split('T')[0]
    };

    onAddComment(selectedPostId, newComment);
    setCommentForm({ author: '', text: '' });
    setCommentSuccess(true);
    setTimeout(() => {
      setCommentSuccess(false);
    }, 3000);
  };

  const shareArticle = (platform: string, title: string) => {
    const sharedUrl = window.location.href;
    let url = '';
    if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Read: ' + title)}&url=${encodeURIComponent(sharedUrl)}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharedUrl)}`;
    } else if (platform === 'pinterest') {
      url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(sharedUrl)}&description=${encodeURIComponent(title)}`;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      
      {/* 1. Article detail reading view */}
      {activePost ? (
        <article className="max-w-4xl mx-auto space-y-8 animate-fade-in" id="blog-article-reader">
          {/* Back link */}
          <button
            onClick={() => setSelectedPostId(null)}
            className="flex items-center space-x-2 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors bg-amber-50 px-4 py-2 rounded-xl border border-amber-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Articles Feed</span>
          </button>

          {/* Featured Header */}
          <div className="space-y-4">
            <span className="text-xs font-mono font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
              {activePost.category}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 tracking-tight leading-none">
              {activePost.title}
            </h1>
            
            {/* Metadata ribbon */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-mono pt-2">
              <div className="flex items-center space-x-1.5">
                <User className="h-4 w-4 text-amber-600" />
                <span className="font-bold text-gray-600">{activePost.author}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Published: {activePost.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1.5">
                <MessageCircle className="h-4 w-4 text-gray-400" />
                <span>{activePost.comments.length} Comments logged</span>
              </div>
            </div>
          </div>

          {/* Banner image Display */}
          <img
            src={activePost.image}
            alt={activePost.title}
            className="w-full h-[320px] sm:h-[450px] object-cover rounded-3xl border border-amber-100/50 shadow-md"
          />

          {/* Main content columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Sharing panel (3 columns) */}
            <div className="md:col-span-3 sticky top-28 bg-amber-50/20 border border-amber-100 p-5 rounded-2xl text-center space-y-4">
              <div className="flex items-center justify-center space-x-1.5 text-xs text-amber-800 font-mono font-bold uppercase">
                <Share2 className="h-4 w-4 text-amber-600" />
                <span>Share Post</span>
              </div>
              <div className="flex md:flex-col justify-center gap-3">
                <button
                  onClick={() => shareArticle('twitter', activePost.title)}
                  className="px-4 py-2 border border-gray-200 hover:border-sky-305 text-gray-600 hover:text-sky-600 rounded-xl text-xs font-semibold bg-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>X / Twitter</span>
                </button>
                <button
                  onClick={() => shareArticle('facebook', activePost.title)}
                  className="px-4 py-2 border border-gray-200 hover:border-blue-305 text-gray-600 hover:text-blue-600 rounded-xl text-xs font-semibold bg-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => shareArticle('pinterest', activePost.title)}
                  className="px-4 py-2 border border-gray-200 hover:border-red-305 text-gray-600 hover:text-red-600 rounded-xl text-xs font-semibold bg-white transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Pinterest</span>
                </button>
              </div>
            </div>

            {/* Right side: Article Content text (9 columns) */}
            <div className="md:col-span-9 space-y-8">
              <div className="text-gray-800 text-sm sm:text-base leading-relaxed space-y-6 whitespace-pre-wrap font-sans" id="blog-content-body">
                {activePost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return <h3 key={index} className="text-xl font-bold font-heading text-gray-950 mt-6 mb-2">{paragraph.replace('###', '').trim()}</h3>;
                  }
                  if (paragraph.match(/^\d+\./)) {
                    return <div key={index} className="pl-4 border-l-2 border-amber-200 leading-relaxed py-1 italic bg-amber-50/10 mb-2">{paragraph}</div>;
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>

              {/* Comments Section */}
              <div className="pt-10 border-t border-gray-150 space-y-8" id="blog-comments-container">
                <h3 className="font-heading text-xl font-bold text-gray-950">Article Discussion ({activePost.comments.length})</h3>
                
                {/* Comments List */}
                <div className="space-y-4">
                  {activePost.comments.length === 0 ? (
                    <p className="text-xs text-gray-400 font-medium">No comments posted yet. Be the first to start the chat!</p>
                  ) : (
                    activePost.comments.map((com) => (
                      <div key={com.id} className="flex space-x-3.5 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        <CornerDownRight className="h-5 w-5 text-gray-300 flex-shrink-0 mt-1" />
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-heading font-black text-xs text-gray-901">{com.author}</h4>
                            <span className="text-[9px] font-mono text-gray-400">{com.date}</span>
                          </div>
                          <p className="text-xs text-gray-650 leading-relaxed">{com.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Custom comment input form */}
                <form onSubmit={handlePostComment} className="bg-white border border-amber-50 p-6 rounded-2xl shadow-xs space-y-4" id="post-comment-form">
                  <h4 className="font-heading font-black text-sm text-gray-900">Post an Editorial Comment</h4>
                  
                  {commentSuccess && (
                     <p className="text-xs text-emerald-700 font-bold bg-emerald-50 p-2 rounded">Comment published successfully!</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={commentForm.author}
                        onChange={(e) => setCommentForm({ ...commentForm, author: e.target.value })}
                        placeholder="e.g. Juliet"
                        className="w-full text-xs p-2.5 border border-gray-200 focus:outline-none rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Write Comment Message</label>
                    <textarea
                      required
                      rows={3}
                      value={commentForm.text}
                      onChange={(e) => setCommentForm({ ...commentForm, text: e.target.value })}
                      placeholder="Share your feedback regard Chef Evelyn's article..."
                      className="w-full text-xs p-2.5 border border-gray-200 focus:outline-none rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-black uppercase flex items-center space-x-1.5 transition-colors"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Comment</span>
                  </button>
                </form>

              </div>
            </div>

          </div>
        </article>
      ) : (
        /* 2. Main Blog Post Listing */
        <div className="space-y-12">
          {/* Header block with search text input */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1">
              <h1 className="font-heading text-3xl font-extrabold text-gray-950">Baking Tips, Launches & Bakery News</h1>
              <p className="text-sm text-gray-500">Read baking hacks, recipes, and news blogs synchronized live from our kitchens.</p>
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                id="blog-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search baking tips, recipes..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-xl text-sm"
              />
            </div>
          </div>

          {/* Categories select row */}
          <div className="flex flex-wrap gap-2 pt-2 border-b border-gray-100 pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white border border-gray-150 text-gray-650 hover:bg-amber-55 hover:text-amber-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
              <BookOpen className="h-8 w-8 text-gray-300 mx-auto mb-2 animate-bounce" />
              <p className="text-xs text-gray-400">No baking articles found matching your search term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blog-posts-grid">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  className="bg-white border border-gray-100 rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 group cursor-pointer"
                  onClick={() => {
                    setSelectedPostId(post.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  <div className="space-y-4">
                    {/* Image Aspect ratio box */}
                    <div className="overflow-hidden aspect-video relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                      />
                      <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[9px] font-mono font-black uppercase text-amber-750 tracking-wider border border-amber-50">
                        {post.category}
                      </span>
                    </div>

                    {/* Metadata ribbon */}
                    <div className="px-6 flex items-center space-x-4 text-[10px] font-mono text-gray-400">
                      <div className="flex items-center space-x-1.5">
                        <User className="h-3.5 w-3.5 text-amber-600" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.date}</span>
                      </div>
                    </div>

                    <div className="px-6 space-y-2">
                      <h3 className="font-heading font-extrabold text-base text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 border-t border-gray-50 mt-6 flex justify-between items-center text-xs font-bold text-amber-705 group-hover:text-amber-800 transition-colors">
                    <span>Read Full Article</span>
                    <CornerDownRight className="h-4.5 w-4.5 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
