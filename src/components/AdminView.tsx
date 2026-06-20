import React, { useState } from 'react';
import { TrendingUp, DollarSign, Users, Award, ShoppingBag, Edit3, Trash2, PlusCircle, Check, X, FileText, ChevronRight, BarChart3, Layers, BookOpen, Clock, Star, MessageSquare } from 'lucide-react';
import { Product, Order, Review, BlogPost } from '../types';

interface AdminViewProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onGenerateInvoice: (orderId: string) => void;
  reviews: Review[];
  onApproveReview: (reviewId: string) => void;
  onDeleteReview: (reviewId: string) => void;
  posts: BlogPost[];
  onAddPost: (post: BlogPost) => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (postId: string) => void;
}

export default function AdminView({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  onGenerateInvoice,
  reviews,
  onApproveReview,
  onDeleteReview,
  posts,
  onAddPost,
  onEditPost,
  onDeletePost
}: AdminViewProps) {
  const [adminTab, setAdminTab] = useState<'analytics' | 'products' | 'orders' | 'customers' | 'reviews' | 'blog'>('analytics');

  // Multi-state forms
  // 1. PRODUCT FORM
  const [productForm, setProductForm] = useState<Partial<Product>>({
    id: '', name: '', category: 'Cakes', subcategory: 'Custom cakes', price: 0, description: '', rating: 5, ratingCount: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300', inventory: 10, isBestSeller: false
  });
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);

  // 2. BLOG FORM
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    id: '', title: '', category: 'Baking Tips', excerpt: '', content: '', author: 'Owner Evelyn Rose', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300'
  });
  const [isEditingPost, setIsEditingPost] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);

  // 3. INVOICE OVERLAY
  const [focusedInvoiceOrder, setFocusedInvoiceOrder] = useState<Order | null>(null);

  // MOCK CUSTOMERS & LOYALTY LIST
  const customerDatabase = [
    { email: 'barbiendegwa9@gmail.com', name: 'Barbie Ndegwa', ordersCount: 4, points: 420, tier: 'Platinum' },
    { email: 'juliet@example.com', name: 'Juliet Thompson', ordersCount: 2, points: 180, tier: 'Gold' },
    { email: 'mwangimik@gmail.com', name: 'Michael Mwangi', ordersCount: 3, points: 310, tier: 'Platinum' },
    { email: 'sarahjenk@gmail.com', name: 'Sarah Jenkins', ordersCount: 1, points: 80, tier: 'Bronze' }
  ];

  // ANALYTICS CALCULATIONS
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const averageTicket = orders.length === 0 ? 0 : totalRevenue / orders.length;
  
  // Custom interactive charts SVG drawing values (re-calculates reactively!)
  const daysOfAnalytics = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dailySalesTrends = [350, 480, 520, 410, 680, totalRevenue > 0 ? (totalRevenue * 0.7) : 850, totalRevenue > 0 ? totalRevenue : 1200];

  // Handlers
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingProduct) {
      onEditProduct(productForm as Product);
    } else {
      const newId = `p-${Date.now()}`;
      onAddProduct({ ...productForm, id: newId } as Product);
    }
    setShowProductModal(false);
    setIsEditingProduct(false);
    setProductForm({ id: '', name: '', category: 'Cakes', subcategory: 'Custom cakes', price: 0, description: '', rating: 5, ratingCount: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300', inventory: 10, isBestSeller: false });
  };

  const handleEditProductClick = (prod: Product) => {
    setProductForm(prod);
    setIsEditingProduct(true);
    setShowProductModal(true);
  };

  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditingPost) {
      onEditPost(blogForm as BlogPost);
    } else {
      const newId = `bpost-${Date.now()}`;
      onAddPost({
        ...blogForm,
        id: newId,
        date: new Date().toISOString().split('T')[0],
        comments: []
      } as BlogPost);
    }
    setShowBlogModal(false);
    setIsEditingPost(false);
    setBlogForm({ id: '', title: '', category: 'Baking Tips', excerpt: '', content: '', author: 'Owner Evelyn Rose', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300' });
  };

  const handleEditPostClick = (p: BlogPost) => {
    setBlogForm(p);
    setIsEditingPost(true);
    setShowBlogModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      
      {/* Header Dashboard Banner */}
      <section className="bg-purple-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-md border-b-4 border-purple-500">
        <div className="space-y-1.5">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-purple-300 uppercase bg-purple-900 border border-purple-750 px-2 rounded w-fit block">
            The Baker's Dozen Central Command
          </span>
          <h1 className="font-heading text-3xl font-extrabold font-bold tracking-tight">Lead Executive Control Board</h1>
          <p className="text-xs sm:text-sm text-purple-200">Manage real-time bakery items catalog, live delivery status, customer loyalty scores, and analytics reports.</p>
        </div>

        <div className="bg-purple-900 border border-purple-800 p-4 rounded-xl text-center flex-shrink-0">
          <p className="text-[9px] font-mono tracking-wider text-purple-300 uppercase">Daily Global Revenue</p>
          <p className="text-2xl font-black text-white">Ksh {totalRevenue.toFixed(2)}</p>
        </div>
      </section>

      {/* Primary Navigation Hub (6 elements) */}
      <nav className="grid grid-cols-2 md:grid-cols-6 gap-2 border-b border-gray-150 pb-4">
        {[
          { id: 'analytics', label: '📊 Sales reports', desc: 'Analytics' },
          { id: 'products', label: '🍰 Catalog manager', desc: 'Products' },
          { id: 'orders', label: '📦 Orders desk', desc: 'Pending' },
          { id: 'customers', label: '👥 Client profiles', desc: 'Loyalty' },
          { id: 'reviews', label: '⭐ Evaluations', desc: 'Opinion' },
          { id: 'blog', label: '✍️ Editorial', desc: 'News' }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`admin-tab-nav-${tab.id}`}
            onClick={() => setAdminTab(tab.id as any)}
            className={`p-3.5 rounded-2xl text-left border transition-all duration-300 ${
              adminTab === tab.id
                ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                : 'bg-white border-gray-100 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200'
            }`}
          >
            <p className="text-xs font-mono font-medium tracking-wide text-gray-400 leading-none mb-1 group-hover:text-purple-300">
              {tab.desc}
            </p>
            <span className="text-xs font-extrabold">{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Tabs container content panes */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8" id="admin-main-panel-content">
        
        {/* SUBTAB 1: ANALYTICS DISPLAY */}
        {adminTab === 'analytics' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top metrics grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Estimated Gross Sales', val: `Ksh ${totalRevenue.toFixed(2)}`, desc: 'Today\'s aggregate', color: 'text-purple-600' },
                { label: 'Active Booked Deliveries', val: `${orders.length} orders`, desc: '+12% versus yesterday', color: 'text-blue-600' },
                { label: 'Catalog SKU Count', val: `${products.length} Items`, desc: 'Cakes, Artisanal Breads & Pastries', color: 'text-amber-600' },
                { label: 'Average Loyalty points', val: '247 pts', desc: 'Satisfied Client profiles', color: 'text-emerald-600' }
              ].map((metric, mIdx) => (
                <div key={mIdx} className="bg-gray-55/40 border border-gray-150 p-6 rounded-2xl space-y-1 relative">
                  <span className="text-xs font-bold text-gray-400 block">{metric.label}</span>
                  <span className={`text-2xl font-black ${metric.color} block`}>{metric.val}</span>
                  <span className="text-[10px] text-gray-405 font-mono">{metric.desc}</span>
                </div>
              ))}
            </div>

            {/* Custom SVG line chart (Sales Reports) */}
            <div className="bg-gray-50 border border-gray-150 p-6 rounded-2xl space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-heading font-black text-sm text-gray-950">Daily Sales Statistics Trend Line</h3>
                  <p className="text-[10px] text-gray-400">Week-by-week live validation curves</p>
                </div>
                <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Sales Reports</span>
              </div>

              {/* Chart drawer using pristine responsive SVG lines */}
              <div className="h-64 relative bg-slate-900 rounded-xl p-4 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="700" y2="50" stroke="#101827" strokeWidth="1" />
                  <line x1="0" y1="100" x2="700" y2="100" stroke="#101827" strokeWidth="1" />
                  <line x1="0" y1="150" x2="700" y2="150" stroke="#101827" strokeWidth="1" />

                  {/* Trend Line Path */}
                  <path
                    d={`M 50,${200 - (dailySalesTrends[0]/10)} 
                        L 150,${200 - (dailySalesTrends[1]/10)} 
                        L 250,${200 - (dailySalesTrends[2]/10)} 
                        L 350,${200 - (dailySalesTrends[3]/10)} 
                        L 450,${200 - (dailySalesTrends[4]/10)} 
                        L 550,${200 - (dailySalesTrends[5]/10)} 
                        L 650,${200 - (dailySalesTrends[6]/10)}`}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />

                  {/* Nodes dots plot */}
                  {dailySalesTrends.map((val, idx) => (
                    <circle
                      key={idx}
                      cx={50 + idx * 100}
                      cy={200 - (val / 10)}
                      r="5.5"
                      fill="#a855f7"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  ))}
                </svg>

                {/* Bottom week coordinates text markers */}
                <div className="absolute bottom-1 left-4 right-4 flex justify-between text-[9px] font-mono font-medium text-gray-500">
                  {daysOfAnalytics.map((day, idx) => (
                    <span key={idx}>{day}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular products list panel */}
            <div className="bg-white border border-gray-150 p-6 rounded-2xl">
              <h3 className="font-heading font-black text-sm text-gray-901 mb-4">Popular Products List</h3>
              <div className="divide-y divide-gray-100">
                {products.slice(0, 3).map((prod, idx) => (
                  <div key={prod.id} className="flex justify-between items-center py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-center space-x-3.5">
                      <span className="text-xs font-mono font-black text-purple-700 bg-purple-50 w-6 h-6 rounded-full flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900">{prod.name}</h4>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">{prod.category} • {prod.subcategory}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-black text-gray-950">Ksh {prod.price.toFixed(2)}</p>
                      <p className="text-[9px] text-emerald-600 font-bold tracking-tight">Active best-seller item</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 2: PRODUCTS CATALOG MANAGER */}
        {adminTab === 'products' && (
          <div className="space-y-6 animate-fade-in" id="product-management-panel">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <h2 className="font-heading font-extrabold text-base text-gray-900">The Baker's Dozen Catalog SKU Editor</h2>
                <p className="text-xs text-gray-400">Click Add or select catalog rows to adjust inventories/pricing.</p>
              </div>

              <button
                id="btn-add-sku"
                onClick={() => {
                  setIsEditingProduct(false);
                  setProductForm({
                    id: '', name: '', category: 'Cakes', subcategory: 'Custom cakes', price: 0, description: '', rating: 5, ratingCount: 1, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=300', inventory: 10, isBestSeller: false
                  });
                  setShowProductModal(true);
                }}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center space-x-1.5 uppercase tracking-wider transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Add New SKU Item</span>
              </button>
            </div>

            {/* List Table of products */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-650" id="admin-inventory-table">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-105 font-mono font-bold tracking-wider text-gray-450 uppercase">
                    <th className="p-4">SKU Name</th>
                    <th className="p-4">Category / sub</th>
                    <th className="p-4">Price Tier</th>
                    <th className="p-4">Inventory SKU</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-sans">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-amber-500/5 transition-colors">
                      <td className="p-4 font-bold text-gray-900">{prod.name}</td>
                      <td className="p-4">
                        <span className="text-[10px] font-mono bg-amber-50 px-2 py-0.5 rounded text-amber-800">
                          {prod.category} / {prod.subcategory}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-gray-800">Ksh {prod.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`font-mono font-black ${prod.inventory <= 5 ? 'text-red-700 font-bold' : 'text-gray-700'}`}>
                          {prod.inventory} left
                        </span>
                      </td>
                      <td className="p-4 text-center space-x-3">
                        <button
                          id={`edit-sku-btn-${prod.id}`}
                          onClick={() => handleEditProductClick(prod)}
                          className="text-amber-600 hover:text-amber-800 p-1 rounded-md"
                          title="Edit pricing & stock"
                        >
                          <Edit3 className="h-4.5 w-4.5" />
                        </button>
                        <button
                          id={`delete-sku-btn-${prod.id}`}
                          onClick={() => onDeleteProduct(prod.id)}
                          className="text-gray-400 hover:text-red-500 p-1 rounded-md"
                          title="Delete SKU"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Add/Edit product */}
            {showProductModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-amber-100" id="product-adjustment-modal">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h3 className="font-heading font-black text-base text-gray-950">
                      {isEditingProduct ? 'Modify Active SKU' : 'Establish New SKU'}
                    </h3>
                    <button 
                      onClick={() => setShowProductModal(false)}
                      className="text-gray-400 hover:text-gray-650"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Product Display Title</label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="e.g. Raspberry Vanilla Swirl"
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Category Group</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none bg-white"
                        >
                          <option value="Cakes">Cakes</option>
                          <option value="Artisanal Breads & Pastries">Artisanal Breads & Pastries</option>
                          <option value="Desserts">Desserts</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Subcategory tag</label>
                        <input
                          type="text"
                          required
                          value={productForm.subcategory}
                          onChange={(e) => setProductForm({ ...productForm, subcategory: e.target.value })}
                          placeholder="e.g. croissants"
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Price Tier (Ksh)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={productForm.price}
                          onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Stock Inventory</label>
                        <input
                          type="number"
                          required
                          value={productForm.inventory}
                          onChange={(e) => setProductForm({ ...productForm, inventory: Number(e.target.value) })}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Visual Illustration URL</label>
                      <input
                        type="text"
                        required
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none text-gray-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Short Ingredient/Description</label>
                      <textarea
                        rows={2}
                        required
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        placeholder="Provide details regard sweet lamination layers, flour type etc..."
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={productForm.isBestSeller}
                        onChange={(e) => setProductForm({ ...productForm, isBestSeller: e.target.checked })}
                        className="rounded text-amber-600 focus:ring-amber-500 h-4.5 w-4.5"
                      />
                      <span className="text-xs text-gray-600 font-semibold">Flag as catalog Best-Seller</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-colors"
                    >
                      {isEditingProduct ? 'Update SKU' : 'Add to Catalog'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: ORDERS DESK */}
        {adminTab === 'orders' && (
          <div className="space-y-6 animate-fade-in" id="active-orders-panel">
            <div>
              <h2 className="font-heading font-extrabold text-base text-gray-900">Active Deliveries Control Deck</h2>
              <p className="text-xs text-gray-400">Change status to sync live progress dots. Or compile invoices.</p>
            </div>

            {orders.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-12 italic border border-dashed border-gray-200 rounded-2xl">
                No client orders compiled today. Check catalog and click add to cart!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((o) => (
                  <div key={o.id} className="bg-gray-55/20 border border-gray-150 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start pb-2 border-b border-gray-100">
                        <div>
                          <span className="text-[10px] font-mono text-purple-600 font-bold tracking-widest">{o.id}</span>
                          <h3 className="font-heading font-black text-sm text-gray-950 mt-0.5">{o.customerName}</h3>
                        </div>
                        
                        {/* Selector for updating status */}
                        <select
                          value={o.status}
                          id={`order-status-dropdown-${o.id}`}
                          onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                          className="text-[10px] bg-white border border-gray-250 font-bold px-2 py-1.5 rounded-lg focus:outline-none text-gray-700 cursor-pointer"
                        >
                          <option value="received">Received</option>
                          <option value="baking">Baking</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>

                      {/* Items details list */}
                      <ul className="text-xs pt-3 space-y-1.5">
                        {o.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between font-medium">
                            <span className="truncate max-w-[150px] text-gray-600">
                              {it.product.name} <strong className="text-amber-700">x{it.quantity}</strong>
                            </span>
                            <span>Ksh {(it.product.price * it.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                      <span className="font-mono text-gray-405 italic">Paid via {o.paymentMethod}</span>
                      
                      {/* Action buttons */}
                      <div className="flex space-x-2">
                        <button
                          id={`invoice-btn-${o.id}`}
                          onClick={() => {
                            onGenerateInvoice(o.id);
                            setFocusedInvoiceOrder(o);
                          }}
                          className="flex items-center space-x-1 px-3 py-1.5 border border-amber-200 text-amber-700 hover:bg-amber-50 rounded-lg text-[10px] font-black uppercase transition-colors"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          <span>Invoice</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Invoice compiler visual overlay popup */}
            {focusedInvoiceOrder && (
              <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white border-2 border-gray-800 rounded-3xl max-w-sm w-full p-6 space-y-6 shadow-2xl relative" id="invoice-sheet-popup">
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-600 text-white font-mono font-bold text-[9px] px-3 py-1.5 rounded-full border border-white">
                    VERIFIED BAKER'S DOZEN INVOICE
                  </span>

                  <div className="text-center pt-2">
                    <span className="font-heading font-black text-xl text-gray-950 block">The Baker's Dozen</span>
                    <span className="text-[9px] font-mono text-gray-400 block tracking-widest leading-none mt-1">41 Sweet Street, Nairobi</span>
                    <span className="text-[10px] font-mono text-gray-650 block mt-2">Ref: {focusedInvoiceOrder.id} • Date: {focusedInvoiceOrder.date}</span>
                  </div>

                  {/* Summary list */}
                  <div className="border-y border-dashed border-gray-300 py-3 space-y-2 text-xs">
                    <p className="text-[9px] font-mono text-gray-400">Billed to: <strong className="text-gray-800">{focusedInvoiceOrder.customerName}</strong></p>
                    <p className="text-[9px] font-mono text-gray-400">Ship Address: <strong className="text-gray-800 font-sans leading-none">{focusedInvoiceOrder.deliveryAddress}</strong></p>

                    <div className="pt-2 border-t border-gray-100 divide-y divide-gray-50 text-[11px] space-y-1 text-gray-700">
                      {focusedInvoiceOrder.items.map((it, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1">
                          <span>{it.product.name} (x{it.quantity})</span>
                          <span className="font-mono">Ksh {(it.product.price * it.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing total indicator */}
                  <div className="flex justify-between items-center text-sm font-black text-gray-950 pt-1">
                    <span>Invoice Aggregate Total</span>
                    <span>Ksh {focusedInvoiceOrder.total.toFixed(2)}</span>
                  </div>

                  <div className="text-[9px] text-gray-400 text-center italic leading-relaxed pt-2">
                    Clean food certified safe under state HACCP audits. Thank you for your continued sweet patronage.
                  </div>

                  <button
                    onClick={() => setFocusedInvoiceOrder(null)}
                    className="w-full text-center py-2 border border-gray-20 w-fit rounded-xl hover:bg-gray-50 text-gray-700 text-xs font-bold transition-colors uppercase"
                  >
                    Close Sheet
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 4: CUSTOMERS & LOYALTY */}
        {adminTab === 'customers' && (
          <div className="space-y-6 animate-fade-in" id="customer-profiles-panel">
            <div>
              <h2 className="font-heading font-extrabold text-base text-gray-901">Registered Customers profiles</h2>
              <p className="text-xs text-gray-400">Track purchase history, loyalty programs and specialized custom tiers.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customerDatabase.map((client, idx) => (
                <div key={idx} className="bg-gray-55/20 border border-gray-100 p-5 rounded-2xl flex justify-between items-center gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-heading font-bold text-sm text-gray-950">{client.name}</h3>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        client.tier === 'Platinum' ? 'bg-purple-100 text-purple-800' : 'bg-amber-10	text-amber-800'
                      }`}>
                        {client.tier} tier
                      </span>
                    </div>
                    <p className="text-xs text-gray-405 font-mono">{client.email}</p>
                    <p className="text-xs text-gray-500 font-medium">Completed: <strong>{client.ordersCount} orders</strong> this month.</p>
                  </div>

                  <div className="text-right p-3 bg-white border border-gray-100 rounded-xl">
                    <p className="text-[8px] font-mono tracking-widest text-gray-400 uppercase leading-none">Loyalty Points</p>
                    <p className="text-xl font-black text-purple-700 mt-1">{client.points} pts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 5: REVIEWS VERIFICATION */}
        {adminTab === 'reviews' && (
          <div className="space-y-6 animate-fade-in" id="reviews-analytics-panel">
            <div>
              <h2 className="font-heading font-extrabold text-base text-gray-900">Review Management & Moderation</h2>
              <p className="text-xs text-gray-400">Approve new customer testimonials or delete low hygiene complaints.</p>
            </div>

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-gray-55/20 border border-gray-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1 max-w-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-gray-900">{rev.name}</span>
                      <span className="text-[9px] font-mono text-gray-400">{rev.date}</span>
                      <div className="flex space-x-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-650 italic">"{rev.comment}"</p>
                    {!rev.approved && (
                      <span className="text-[9px] font-mono font-bold text-red-600 bg-red-50 px-1.5 rounded uppercase">Pending Approval</span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {!rev.approved && (
                      <button
                        id={`approve-rev-btn-${rev.id}`}
                        onClick={() => onApproveReview(rev.id)}
                        className="p-1 px-2.5 bg-emerald-600 text-white rounded-lg text-[10px] font-semibold transition-colors flex items-center space-x-1"
                      >
                        <Check className="h-3.5 w-3.5" />
                        <span>Approve</span>
                      </button>
                    )}
                    <button
                      id={`delete-rev-btn-${rev.id}`}
                      onClick={() => onDeleteReview(rev.id)}
                      className="p-1 px-2 border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-505 rounded-lg text-[10px] font-semibold transition-all"
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUBTAB 6: BLOG EDITORIAL PANEL */}
        {adminTab === 'blog' && (
          <div className="space-y-6 animate-fade-in" id="blog-management-panel">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <div>
                <h2 className="font-heading font-extrabold text-base text-gray-901">Editorial Editorial Post Manager</h2>
                <p className="text-xs text-gray-400">Compose new posts, choose category templates, and delete aging articles.</p>
              </div>

              <button
                id="btn-add-blog"
                onClick={() => {
                  setIsEditingPost(false);
                  setBlogForm({
                    id: '', title: '', category: 'Baking Tips', excerpt: '', content: '', author: 'Owner Evelyn Rose', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=300'
                  });
                  setShowBlogModal(true);
                }}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center space-x-1.5 uppercase transition-colors"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Create New Post</span>
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {posts.map((post) => (
                <div key={post.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0 gap-4">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 leading-tight">{post.title}</h3>
                    <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">
                      {post.category} • Written by {post.author} on {post.date}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      id={`edit-post-btn-${post.id}`}
                      onClick={() => handleEditPostClick(post)}
                      className="text-amber-600 hover:text-amber-800 p-1.5 rounded-lg border border-transparent hover:border-amber-100"
                    >
                      <Edit3 className="h-4.5 w-4.5" />
                    </button>
                    <button
                      id={`delete-post-btn-${post.id}`}
                      onClick={() => onDeletePost(post.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 rounded-lg border border-transparent"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Create/Edit Blog modal overlay */}
            {showBlogModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-amber-100" id="blog-adjustment-modal">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h3 className="font-heading font-black text-base text-gray-950">
                      {isEditingPost ? 'Modify Blog Post' : 'Compose News Post'}
                    </h3>
                    <button 
                      onClick={() => setShowBlogModal(false)}
                      className="text-gray-400 hover:text-gray-650"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleBlogSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Article Title</label>
                      <input
                        type="text"
                        required
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        placeholder="e.g. Secret Lamination tricks"
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Category Group</label>
                        <select
                          value={blogForm.category}
                          onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value as any })}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none bg-white font-semibold"
                        >
                          <option value="Baking Tips">Baking Tips</option>
                          <option value="New Product Launches">New Product Launches</option>
                          <option value="Bakery News">Bakery News</option>
                          <option value="Event Announcements">Event Announcements</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Author Name</label>
                        <input
                          type="text"
                          required
                          value={blogForm.author}
                          onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                          className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Short Excerpt Summary</label>
                      <input
                        type="text"
                        required
                        value={blogForm.excerpt}
                        onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                        placeholder="Brief, catchy 1-sentence hook representation"
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Banner Image URL</label>
                      <input
                        type="text"
                        required
                        value={blogForm.image}
                        onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none text-gray-400 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Full Markdown/Text Body</label>
                      <textarea
                        rows={4}
                        required
                        value={blogForm.content}
                        onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                        placeholder="Type paragraphs, use ### for headings, write numbered items..."
                        className="w-full text-xs p-2.5 border border-gray-200 rounded-lg focus:outline-none font-sans"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-colors"
                    >
                      {isEditingPost ? 'Update Editorial' : 'Publish to Feed'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
