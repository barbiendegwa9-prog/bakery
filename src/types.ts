export interface Product {
  id: string;
  name: string;
  category: 'Cakes' | 'Artisanal Breads & Pastries' | 'Desserts';
  subcategory: string; // e.g. "Birthday cakes", "Wedding cakes", "croissants", "Artisan bread"
  price: number;
  description: string;
  rating: number;
  ratingCount: number;
  image: string;
  inventory: number;
  isBestSeller?: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  approved: boolean;
}

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  deliveryAddress: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'received' | 'baking' | 'out_for_delivery' | 'delivered';
  paymentMethod: 'M-Pesa' | 'Credit/Debit' | 'Bank Transfer' | 'Cash on Delivery';
  mpesaNumber?: string;
  deliveryDate: string;
  preferredTime: string;
  invoiceGenerated?: boolean;
}

export interface BlogComment {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Baking Tips' | 'New Product Launches' | 'Bakery News' | 'Event Announcements';
  content: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  comments: BlogComment[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
