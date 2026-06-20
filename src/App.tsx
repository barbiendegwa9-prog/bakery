import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import AboutView from './components/AboutView';
import SafetyView from './components/SafetyView';
import GalleryView from './components/GalleryView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import ReviewsView from './components/ReviewsView';
import OrderSystem from './components/OrderSystem';
import DeliverySystem from './components/DeliverySystem';
import AdminView from './components/AdminView';
import BakeryNameIdeas from './components/BakeryNameIdeas';

import { Product, Order, Review, BlogPost, OrderItem, BlogComment, ContactMessage } from './types';
import { INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_BLOG_POSTS, GALLERY_IMAGES } from './mockData';
import { MessageSquare, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [adminMode, setAdminMode] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('');

  // 1. STATE INITIALIZATION (SYNCED TO LOCAL STORAGE FOR ULTIMATE EXCELLENT RESILIENCE!)
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  // Load from local storage or pre-seed defaults
  useEffect(() => {
    // Products
    const cachedProducts = localStorage.getItem('sweet_devotion_products');
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('sweet_devotion_products', JSON.stringify(INITIAL_PRODUCTS));
    }

    // Reviews
    const cachedReviews = localStorage.getItem('sweet_devotion_reviews');
    if (cachedReviews) {
      setReviews(JSON.parse(cachedReviews));
    } else {
      setReviews(INITIAL_REVIEWS);
      localStorage.setItem('sweet_devotion_reviews', JSON.stringify(INITIAL_REVIEWS));
    }

    // Blog posts
    const cachedPosts = localStorage.getItem('sweet_devotion_posts');
    if (cachedPosts) {
      setPosts(JSON.parse(cachedPosts));
    } else {
      setPosts(INITIAL_BLOG_POSTS);
      localStorage.setItem('sweet_devotion_posts', JSON.stringify(INITIAL_BLOG_POSTS));
    }

    // Active order tracking mock preorder seeding
    const cachedOrders = localStorage.getItem('sweet_devotion_orders');
    if (cachedOrders) {
      setOrders(JSON.parse(cachedOrders));
    } else {
      const demoOrder: Order = {
        id: 'SD-C1-DEMO',
        customerName: 'Barbie Ndegwa',
        phone: '+254 712 345 678',
        deliveryAddress: 'Main Gate Suite, Kilimani Ridge, Nairobi',
        items: [
          { product: INITIAL_PRODUCTS[0], quantity: 1 }, // Strawberry Fields birthday cake
          { product: INITIAL_PRODUCTS[3], quantity: 4 }  // Cinnamon danish pastries
        ],
        total: 49.50,
        date: new Date().toISOString().split('T')[0],
        status: 'baking', // baking demo status
        paymentMethod: 'M-Pesa',
        mpesaNumber: '0712345678',
        deliveryDate: new Date().toISOString().split('T')[0],
        preferredTime: 'morning'
      };
      setOrders([demoOrder]);
      localStorage.setItem('sweet_devotion_orders', JSON.stringify([demoOrder]));
    }
  }, []);

  // Save states to local storage on changes
  const updateProductsState = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('sweet_devotion_products', JSON.stringify(updated));
  };

  const updateOrdersState = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem('sweet_devotion_orders', JSON.stringify(updated));
  };

  const updateReviewsState = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem('sweet_devotion_reviews', JSON.stringify(updated));
  };

  const updatePostsState = (updated: BlogPost[]) => {
    setPosts(updated);
    localStorage.setItem('sweet_devotion_posts', JSON.stringify(updated));
  };

  // 2. SHOPPING CART HELPERS
  const handleAddToCart = (product: Product) => {
    const existing = cart.find(it => it.product.id === product.id);
    if (existing) {
      if (existing.quantity >= product.inventory) {
        alert('Cannot order quantity larger than SKU stock levels.');
        return;
      }
      setCart(cart.map(it => it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    setCartOpen(true); // Open panel drawer so users see checkout feedback
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    const item = cart.find(it => it.product.id === productId);
    if (!item) return;

    const targetQuantity = item.quantity + delta;
    if (targetQuantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }

    if (targetQuantity > item.product.inventory) {
      alert('Cannot exceed stock levels limit.');
      return;
    }

    setCart(cart.map(it => it.product.id === productId ? { ...it, quantity: targetQuantity } : it));
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(cart.filter(it => it.product.id !== productId));
  };

  // 3. ADMIN PRODUCT EDIT ACTIONS
  const handleAddProduct = (newProduct: Product) => {
    updateProductsState([...products, newProduct]);
  };

  const handleEditProduct = (edited: Product) => {
    updateProductsState(products.map(p => p.id === edited.id ? edited : p));
  };

  const handleDeleteProduct = (productId: string) => {
    updateProductsState(products.filter(p => p.id !== productId));
  };

  // 4. ADMIN ORDER MUTATORS
  const handlePlaceOrder = (newOrder: Order) => {
    const nextOrdersList = [newOrder, ...orders];
    updateOrdersState(nextOrdersList);

    // Adjust product inventories post-checkout
    const updatedProductsList = products.map((prod) => {
      const orderItem = newOrder.items.find((item) => item.product.id === prod.id);
      if (orderItem) {
        return {
          ...prod,
          inventory: Math.max(0, prod.inventory - orderItem.quantity)
        };
      }
      return prod;
    });
    updateProductsState(updatedProductsList);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    updateOrdersState(orders.map(o => o.id === orderId ? { ...o, status } : o));
  };

  // 5. REVIEW MUTATORS
  const handleAddReview = (newReview: Review) => {
    updateReviewsState([newReview, ...reviews]);
  };

  const handleApproveReview = (reviewId: string) => {
    updateReviewsState(reviews.map(r => r.id === reviewId ? { ...r, approved: true } : r));
  };

  const handleDeleteReview = (reviewId: string) => {
    updateReviewsState(reviews.filter(r => r.id !== reviewId));
  };

  // 6. BLOG EDITOR MUTATORS
  const handleAddPost = (newPost: BlogPost) => {
    updatePostsState([newPost, ...posts]);
  };

  const handleEditPost = (edited: BlogPost) => {
    updatePostsState(posts.map(p => p.id === edited.id ? edited : p));
  };

  const handleDeletePost = (postId: string) => {
    updatePostsState(posts.filter(p => p.id !== postId));
  };

  const handleAddComment = (postId: string, newComment: BlogComment) => {
    const updatedPostsList = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    });
    updatePostsState(updatedPostsList);
  };

  const handleSendMessage = (msg: ContactMessage) => {
    setMessages([msg, ...messages]);
  };

  // Extract products categorized as best-sellers
  const bestSellers = products.filter(p => p.isBestSeller);
  const featuredReviews = reviews.filter(r => r.approved);

  return (
    <div className="min-h-screen bg-neutral-50/30 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-white relative">
      
      {/* Floating WhatsApp Quick chat widget */}
      <a
        href="https://wa.me/254700000000?text=Hi%20Sweet%2520Devotion%21%20I%20would%20love%20to%20place%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-550 hover:bg-emerald-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105 flex items-center justify-center border border-emerald-400 group"
        title="Immediate Chat Support"
        style={{ backgroundColor: '#25D366' }}
      >
        <MessageSquare className="h-6 w-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-semibold text-xs ml-0 group-hover:ml-2 whitespace-nowrap">
          Order on WhatsApp
        </span>
      </a>

      {/* Primary Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        openCart={() => setCartOpen(true)}
        adminMode={adminMode}
        setAdminMode={setAdminMode}
      />

      {/* Main View Render block */}
      <main className="flex-grow">
        {adminMode ? (
          <AdminView
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onGenerateInvoice={() => {}}
            reviews={reviews}
            onApproveReview={handleApproveReview}
            onDeleteReview={handleDeleteReview}
            posts={posts}
            onAddPost={handleAddPost}
            onEditPost={handleEditPost}
            onDeletePost={handleDeletePost}
          />
        ) : (
          <>
            {/* Customer tab conditions */}
            {activeTab === 'home' && (
              <HomeView
                onNavigate={(tab) => {
                  if (tab === 'delivery') {
                    setActiveTab('ideas'); // default to name ideas for any general discovery flow
                  } else {
                    setActiveTab(tab);
                  }
                }}
                bestSellers={bestSellers}
                onAddToCart={handleAddToCart}
                featuredReviews={featuredReviews}
                openDeliveryForm={() => {
                  setActiveTab('safety');
                  // Give scroll target to live tracker widget
                  setTimeout(() => {
                    const scrollElement = document.getElementById('tracking-search-input');
                    if (scrollElement) {
                      scrollElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 200);
                }}
              />
            )}

            {activeTab === 'ideas' && (
              <BakeryNameIdeas />
            )}

            {activeTab === 'menu' && (
              <MenuView
                products={products}
                onAddToCart={handleAddToCart}
                onRequestCatering={() => {}}
              />
            )}

            {activeTab === 'about' && (
              <AboutView />
            )}

            {activeTab === 'safety' && (
              <div className="space-y-12">
                <SafetyView />
                {/* Embedded delivery systems and trackers directly under Food safety context */}
                <div className="border-t border-amber-100/50 py-12 bg-amber-50/5">
                  <DeliverySystem
                    orders={orders}
                    activeTrackingId={activeTrackingId}
                    setActiveTrackingId={setActiveTrackingId}
                  />
                </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <GalleryView images={GALLERY_IMAGES} />
            )}

            {activeTab === 'blog' && (
              <BlogView
                posts={posts}
                onAddComment={handleAddComment}
              />
            )}

            {activeTab === 'contact' && (
              <div className="space-y-12">
                <ContactView onSendMessage={handleSendMessage} />
                
                {/* Embed customer reviews directly on the Contact tab as well */}
                <div className="border-t border-amber-100/30 bg-amber-50/5 py-12">
                  <ReviewsView
                    reviews={reviews}
                    onAddReview={handleAddReview}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Persistent Shopping Cart Drawer overlay */}
      <OrderSystem
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={() => setCart([])}
        onPlaceOrder={handlePlaceOrder}
        onTrackOrder={(id) => {
          setActiveTrackingId(id);
          setActiveTab('safety');
          setTimeout(() => {
            const tr = document.getElementById('delivery-visual-nodes');
            if (tr) tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }}
      />

      {/* Global Footer info details */}
      <Footer
        onNav={(tab) => {
          setAdminMode(false);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSetAdmin={(mode) => {
          setAdminMode(mode);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
