import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, CreditCard, Landmark, Truck, Wallet, CheckCircle, ArrowRight, Sparkles, AlertCircle, Phone } from 'lucide-react';
import { Product, OrderItem, Order } from '../types';

interface OrderSystemProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: OrderItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  onTrackOrder: (orderId: string) => void;
}

export default function OrderSystem({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onPlaceOrder,
  onTrackOrder
}: OrderSystemProps) {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'completed'>('cart');
  const [shippingForm, setShippingForm] = useState({
    name: '',
    phone: '',
    address: '',
    deliveryDate: '',
    preferredTime: 'morning', // morning, afternoon, evening
  });

  const [paymentMethod, setPaymentMethod] = useState<'M-Pesa' | 'Credit/Debit' | 'Bank Transfer' | 'Cash on Delivery'>('M-Pesa');
  
  // Specific payment processing states (M-pesa and card simulated)
  const [mpesaNo, setMpesaNo] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [successOrderId, setSuccessOrderId] = useState('');

  if (!isOpen) return null;

  // Calculators
  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = subtotal > 3500 ? 0 : 500.00; // Free delivery above 3500 Ksh
  const total = subtotal + deliveryFee;

  const handleNextStep = () => {
    if (checkoutStep === 'cart') {
      if (cartItems.length === 0) return;
      setCheckoutStep('shipping');
    } else if (checkoutStep === 'shipping') {
      if (!shippingForm.name || !shippingForm.phone || !shippingForm.address || !shippingForm.deliveryDate) {
        alert('Please complete all delivery details.');
        return;
      }
      setCheckoutStep('payment');
    }
  };

  const executeCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === 'M-Pesa') {
      setProcessingStatus('Connecting to Safaricom API...');
      setTimeout(() => {
        setProcessingStatus('STK Push Prompt dispatched to your phone...');
      }, 1500);
      setTimeout(() => {
        setProcessingStatus('Validating M-Pesa receipt...');
      }, 3500);
    } else if (paymentMethod === 'Credit/Debit') {
      setProcessingStatus('Verifying secure SSL parameters...');
      setTimeout(() => {
        setProcessingStatus('Authorizing payment with bank gateway...');
      }, 1500);
    } else {
      setProcessingStatus('Registering baking reservation...');
    }

    setTimeout(() => {
      const generatedId = `SD-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: generatedId,
        customerName: shippingForm.name,
        phone: shippingForm.phone,
        deliveryAddress: shippingForm.address,
        items: [...cartItems],
        total: total,
        date: new Date().toISOString().split('T')[0],
        status: 'received',
        paymentMethod: paymentMethod,
        mpesaNumber: paymentMethod === 'M-Pesa' ? mpesaNo : undefined,
        deliveryDate: shippingForm.deliveryDate,
        preferredTime: shippingForm.preferredTime,
      };

      onPlaceOrder(newOrder);
      setSuccessOrderId(generatedId);
      setIsProcessing(false);
      setCheckoutStep('completed');
      onClearCart();
    }, 5000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
      <div className="bg-white w-full max-w-lg h-full shadow-2xl flex flex-col justify-between" id="order-cart-drawer">
        
        {/* Header Block */}
        <div className="p-6 border-b border-amber-100 flex justify-between items-center bg-amber-50/20">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5.5 w-5.5 text-amber-600" />
            <h2 className="font-heading font-black text-xl text-gray-900">
              {checkoutStep === 'cart' && 'Your Shopping Basket'}
              {checkoutStep === 'shipping' && 'Delivery Request details'}
              {checkoutStep === 'payment' && 'Secure Checkout'}
              {checkoutStep === 'completed' && 'Order Placed!'}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 px-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Step Indicator Panel */}
        {checkoutStep !== 'completed' && (
          <div className="px-6 py-3 bg-amber-500/5 border-b border-amber-100/30 flex justify-between text-xs font-mono font-bold tracking-wider text-gray-400">
            <span className={checkoutStep === 'cart' ? 'text-amber-700 underline' : ''}>01. Cart</span>
            <span className={checkoutStep === 'shipping' ? 'text-amber-700 underline' : ''}>02. Delivery</span>
            <span className={checkoutStep === 'payment' ? 'text-amber-700 underline' : ''}>03. Pay</span>
          </div>
        )}

        {/* Dynamic Body Content */}
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {/* STEP 1: CART OVERVIEW */}
          {checkoutStep === 'cart' && (
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                  <ShoppingCart className="h-14 w-14 text-amber-200 mx-auto" />
                  <p className="text-gray-500 font-semibold text-sm">Your basket is currently empty.</p>
                  <p className="text-xs text-gray-400">Browse our product catalog to select fresh treats.</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl border border-amber-400 text-amber-700 text-xs font-bold hover:bg-amber-50 transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="flex py-4 first:pt-0 last:pb-0 justify-between items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-amber-100"
                      />
                      <div className="flex-grow min-w-0">
                        <span className="text-[9px] font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded tracking-wide uppercase">
                          {item.product.subcategory}
                        </span>
                        <h4 className="font-heading font-extrabold text-sm text-gray-900 truncate mt-1">{item.product.name}</h4>
                        <p className="text-xs text-gray-500">Ksh {item.product.price.toFixed(2)} each</p>
                      </div>
                      
                      {/* Quantity switcher */}
                      <div className="flex items-center space-x-2 border border-gray-150 rounded-lg bg-gray-50/50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="px-2 py-1 text-gray-500 hover:text-amber-600 text-sm font-bold"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="px-2 py-1 text-gray-500 hover:text-amber-600 text-sm font-bold"
                          disabled={item.quantity >= item.product.inventory}
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors"
                        title="Remove product"
                      >
                        <Trash2 className="h-4.5 w-4.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: SHIPPING FORM */}
          {checkoutStep === 'shipping' && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-black text-amber-600 bg-amber-50 px-2 py-1 rounded">Delivery Logistics Form</span>
              
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Customer Name</label>
                <input
                  type="text"
                  required
                  value={shippingForm.name}
                  onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                  placeholder="e.g. Juliet Thompson"
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={shippingForm.phone}
                  onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                  placeholder="+254 712 345 678"
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Delivery Location Address</label>
                <textarea
                  required
                  rows={2}
                  value={shippingForm.address}
                  onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  placeholder="e.g. Apartment 4B, Kilimani Ridge Road, Nairobi"
                  className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Preferred Delivery Date</label>
                  <input
                    type="date"
                    required
                    value={shippingForm.deliveryDate}
                    onChange={(e) => setShippingForm({ ...shippingForm, deliveryDate: e.target.value })}
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 text-gray-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Preferred Time Slot</label>
                  <select
                    value={shippingForm.preferredTime}
                    onChange={(e) => setShippingForm({ ...shippingForm, preferredTime: e.target.value as any })}
                    className="w-full text-sm p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="morning">Morning (6:30 AM - 11:30 AM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="evening">Evening (4:30 PM - 7:30 PM)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT SCREEN */}
          {checkoutStep === 'payment' && (
            <div className="space-y-6">
              {isProcessing ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <h4 className="font-heading font-black text-sm text-gray-950">Processing Secure Authorization</h4>
                  <p className="text-xs text-gray-500 font-mono italic animate-pulse">{processingStatus}</p>
                </div>
              ) : (
                <form onSubmit={executeCheckout} className="space-y-4">
                  <label className="text-[10px] font-mono tracking-wider font-extrabold text-gray-400 uppercase">Select Payment Method</label>
                  <div className="grid grid-cols-2 gap-3" id="payment-method-selector">
                    {[
                      { id: 'M-Pesa', icon: <Phone className="h-4.5 w-4.5 text-emerald-600" />, desc: 'Lipa na M-Pesa' },
                      { id: 'Credit/Debit', icon: <CreditCard className="h-4.5 w-4.5 text-blue-600" />, desc: 'Visa & Master' },
                      { id: 'Bank Transfer', icon: <Landmark className="h-4.5 w-4.5 text-orange-600" />, desc: 'EFT Wire' },
                      { id: 'Cash on Delivery', icon: <Truck className="h-4.5 w-4.5 text-amber-600" />, desc: 'At Your Door' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-4 rounded-xl border flex flex-col items-start gap-2 text-left transition-all duration-200 ${
                          paymentMethod === m.id
                            ? 'border-amber-500 bg-amber-50/20 shadow-xs'
                            : 'border-gray-150 hover:bg-gray-50'
                        }`}
                      >
                        {m.icon}
                        <div>
                          <p className="text-xs font-bold text-gray-900 leading-tight">{m.id}</p>
                          <p className="text-[10px] text-gray-400">{m.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Payment conditional options */}
                  {paymentMethod === 'M-Pesa' && (
                    <div className="bg-emerald-50/25 border border-emerald-100 p-4 rounded-xl space-y-3">
                      <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold">
                        <Wallet className="h-4.5 w-4.5 text-emerald-600" />
                        <span>M-Pesa STK Push Transfer</span>
                      </div>
                      <p className="text-[11px] text-emerald-700/80 leading-relaxed">
                        An automatic Safaricom STK Push pop-up will launch on your mobile phone upon checkout. Simply enter your M-Pesa PIN inside the prompt to confirm.
                      </p>
                      <input
                        type="tel"
                        required
                        value={mpesaNo}
                        onChange={(e) => setMpesaNo(e.target.value)}
                        placeholder="Enter Safaricom Number (e.g. 0712345678)"
                        className="w-full text-xs p-2.5 bg-white border border-emerald-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-gray-700"
                      />
                    </div>
                  )}

                  {paymentMethod === 'Credit/Debit' && (
                    <div className="bg-blue-50/10 border border-blue-100 p-4 rounded-xl space-y-3">
                      <div className="flex items-center space-x-2 text-blue-800 text-xs font-bold">
                        <CreditCard className="h-4.5 w-4.5 text-blue-600" />
                        <span>Secure Card Payment</span>
                      </div>
                      <input
                        type="text"
                        required
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        placeholder="16-Digit Card Number"
                        className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          required
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none"
                        />
                        <input
                          type="text"
                          required
                          value={cardDetails.cvc}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                          placeholder="CVC"
                          className="w-full text-xs p-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'Bank Transfer' && (
                    <div className="bg-orange-50/20 border border-orange-100 p-4 rounded-xl text-xs space-y-2 text-orange-850">
                      <p><strong>Bank Wire Instructions:</strong></p>
                      <ul className="list-disc pl-4 space-y-1 font-mono text-[10px] text-gray-600">
                        <li>Bank: The Baker's Dozen Trust Bank</li>
                        <li>Account No: 120-456-789-0</li>
                        <li>Reference: Your Shipping Name</li>
                      </ul>
                      <p className="text-[10px] text-gray-400">Order processing will wait for payment confirmation.</p>
                    </div>
                  )}

                  {paymentMethod === 'Cash on Delivery' && (
                    <div className="bg-amber-50/30 border border-amber-100 p-4 rounded-xl flex items-center space-x-2 text-gray-700 text-xs">
                      <AlertCircle className="h-4.5 w-4.5 text-amber-600 flex-shrink-0" />
                      <span>Bring precise change for the dispatcher at your doorstep.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs tracking-widest uppercase transition-all duration-300"
                  >
                    Confirm & Authorized Payment (Ksh {total.toFixed(2)})
                  </button>
                </form>
              )}
            </div>
          )}

          {/* STEP 4: COMPLETED COMPLETED */}
          {checkoutStep === 'completed' && (
            <div className="text-center py-12 space-y-4">
              <div className="h-16 w-16 bg-emerald-100 ring-4 ring-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="h-8 w-8" />
              </div>
              <p className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase">Transaction Confirmed</p>
              <h3 className="font-heading font-black text-2xl text-gray-900">Delicious Treats Reserved!</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                Thank you for your purchase. We are starting cooking preparation immediately. Your active tracking code is:
              </p>
              <div className="bg-gray-100 border border-gray-200 py-3.5 rounded-xl text-lg font-mono font-black text-gray-800 flex items-center justify-center space-x-2 w-fit mx-auto px-6">
                <span>{successOrderId}</span>
              </div>
              <p className="text-[10px] text-emerald-700/80 leading-relaxed max-w-sm mx-auto italic font-medium">
                Our automatic server sent an invoice/estimated delivery alert to {shippingForm.phone} via WhatsApp. Let's trace it!
              </p>
              <div className="pt-6">
                <button
                  onClick={() => {
                    onTrackOrder(successOrderId);
                    onClose();
                  }}
                  className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-xl mx-auto text-xs font-black uppercase tracking-wider"
                >
                  <span>Launch Live Delivery Tracker</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer pricing totals block (static if checkout isn't finished) */}
        {checkoutStep !== 'completed' && checkoutStep !== 'payment' && (
          <div className="p-6 border-t border-amber-100 bg-amber-50/15 space-y-4">
            <div className="space-y-1.5 text-sm text-gray-650">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span>Ksh {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Clean Transit Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700 uppercase">FREE</strong> : `Ksh ${deliveryFee.toFixed(2)}`}</span>
              </div>
              {subtotal > 0 && subtotal < 3500 && (
                <p className="text-[10px] text-amber-700/80 leading-none">
                  Add <strong>Ksh {(3500 - subtotal).toFixed(2)}</strong> more to unlock FREE climate delivery!
                </p>
              )}
              <div className="flex justify-between text-base font-black text-gray-950 pt-2 border-t border-gray-200">
                <span>Estimated Total Due</span>
                <span>Ksh {total.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' && (
              <button
                disabled={cartItems.length === 0}
                onClick={handleNextStep}
                className={`w-full py-3.5 rounded-xl flex items-center justify-center space-x-2 text-xs font-extrabold tracking-widest uppercase transition-colors ${
                  cartItems.length === 0
                    ? 'bg-gray-150 text-gray-400 cursor-not-allowed'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                <span>Navigate to Delivery</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
            )}

            {checkoutStep === 'shipping' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="py-3.5 border border-amber-250 text-amber-700 bg-white rounded-xl text-xs font-extrabold transition-colors uppercase tracking-wider"
                >
                  Back to Basket
                </button>
                <button
                  onClick={handleNextStep}
                  className="py-1 px-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 uppercase tracking-wider"
                >
                  <span>Select Payment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
