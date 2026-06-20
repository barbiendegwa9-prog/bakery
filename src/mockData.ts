import { Product, Review, BlogPost } from './types';
import goldenVelvetCake from './assets/images/golden_velvet_cake_1781952965675.jpg';
import strawberryBirthdayCake from './assets/images/strawberry_birthday_cake_1781953379485.jpg';
import elegantWeddingCake from './assets/images/elegant_wedding_cake_1781953396518.jpg';
import chocolateDripCake from './assets/images/chocolate_drip_cake_1781953414053.jpg';
import royalAnniversaryCake from './assets/images/royal_anniversary_cake_1781953428969.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Cakes
  {
    id: 'c1',
    name: 'Strawberry Fields Birthday Cake',
    category: 'Cakes',
    subcategory: 'Birthday cakes',
    price: 3500.00,
    description: 'Double-layered vanilla sponge cake filled with fresh strawberries, vanilla bean whipped cream, and finished with delicate strawberry buttercream swirls.',
    rating: 4.9,
    ratingCount: 124,
    image: strawberryBirthdayCake,
    inventory: 8,
    isBestSeller: true
  },
  {
    id: 'c2',
    name: 'Elegant Three-Tier Wedding Cake',
    category: 'Cakes',
    subcategory: 'Wedding cakes',
    price: 25000.00,
    description: 'A majestic 3-tiered wedding masterpiece, featuring almond sponge layers, rich raspberry coulis, and high-fashion fondant and sugar lace detailing.',
    rating: 5.0,
    ratingCount: 42,
    image: elegantWeddingCake,
    inventory: 3,
    isBestSeller: false
  },
  {
    id: 'c3',
    name: 'Golden Velvet Anniversary Cake',
    category: 'Cakes',
    subcategory: 'Anniversary cakes',
    price: 4800.00,
    description: 'Moist red velvet cake layers with white chocolate cream cheese frosting and luxury edible gold flakes for extraordinary celebrations.',
    rating: 4.8,
    ratingCount: 76,
    image: goldenVelvetCake,
    inventory: 12,
    isBestSeller: true
  },
  {
    id: 'c4',
    name: 'Chocolate Ganache Custom Drip Cake',
    category: 'Cakes',
    subcategory: 'Custom cakes',
    price: 6500.00,
    description: 'A customized, magnificent celebration cake loaded with decadent dark chocolate ganache, custom meringue kisses, and shiny macarons.',
    rating: 4.9,
    ratingCount: 95,
    image: chocolateDripCake,
    inventory: 5,
    isBestSeller: false
  },
  {
    id: 'c5',
    name: 'Royal Ivory Rose Anniversary Cake',
    category: 'Cakes',
    subcategory: 'Anniversary cakes',
    price: 5200.00,
    description: 'An exquisite 2-tiered anniversary masterpiece featuring silk vanilla sponge layers, delicious raspberry creme filling, soft peach sugar rose buds, and silver ribbon wraps.',
    rating: 5.0,
    ratingCount: 38,
    image: royalAnniversaryCake,
    inventory: 6,
    isBestSeller: true
  },

  // 2. Artisanal Breads & Pastries
  {
    id: 'p1',
    name: 'Golden Butter Croissant',
    category: 'Artisanal Breads & Pastries',
    subcategory: 'croissants',
    price: 350.00,
    description: 'Flaky, crescent-shaped pastry made with 100% fine French butter, baked slow and golden-brown for the ultimate morning crunch.',
    rating: 4.9,
    ratingCount: 340,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600',
    inventory: 30,
    isBestSeller: true
  },
  {
    id: 'p2',
    name: 'Gourmet Cinnamon Pecan Danish',
    category: 'Artisanal Breads & Pastries',
    subcategory: 'Danish pastries',
    price: 425.00,
    description: 'Braided soft pastry pastry filled with aromatic premium sweet cinnamon sugar and finished with a scattering of toasted pecan halves.',
    rating: 4.7,
    ratingCount: 112,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    inventory: 20,
    isBestSeller: false
  },
  {
    id: 'p3',
    name: 'Chocolate-Filled Puff Pastry',
    category: 'Artisanal Breads & Pastries',
    subcategory: 'Puff pastries',
    price: 395.00,
    description: 'Light, puff pastry pastry sheets loaded with a molten core of premium Callebaut Belgian dark chocolate.',
    rating: 4.8,
    ratingCount: 180,
    image: 'https://images.unsplash.com/photo-1549778399-f94fd24d61fd?auto=format&fit=crop&q=80&w=600',
    inventory: 25,
    isBestSeller: true
  },

  // 3. Artisanal Breads & Pastries (Breads)
  {
    id: 'b1',
    name: 'Classic White Sandwich Loaf',
    category: 'Artisanal Breads & Pastries',
    subcategory: 'White bread',
    price: 450.00,
    description: 'Freshly baked daily classic sandwich bread, offering a cloud-soft interior crumble with a smooth, golden-buttered paper-thin crust.',
    rating: 4.6,
    ratingCount: 89,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    inventory: 15,
    isBestSeller: false
  },
  {
    id: 'b2',
    name: 'Stone-Ground Honey Brown Bread',
    category: 'Artisanal Breads & Pastries',
    subcategory: 'Brown bread',
    price: 550.00,
    description: 'Whole grain brown loaf sweetened with real organic forest wildflower honey and enriched with rolled oats.',
    rating: 4.7,
    ratingCount: 110,
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=600',
    inventory: 12,
    isBestSeller: false
  },
  {
    id: 'b3',
    name: 'Signature Cranberry Walnut Sourdough',
    category: 'Artisanal Breads & Pastries',
    subcategory: 'Artisan bread',
    price: 720.00,
    description: 'Classic 24-hour slow fermented sourdough bread packed with plump dried cranberries and earthy walnut pieces for a perfect tang and crunch.',
    rating: 4.9,
    ratingCount: 215,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
    inventory: 10,
    isBestSeller: true
  },

  // 4. Desserts
  {
    id: 'd1',
    name: 'New York Creamy Cheesecake',
    category: 'Desserts',
    subcategory: 'cheesecakes',
    price: 2450.00,
    description: 'Dense, rich, and velvety cream cheese cake on a golden buttery graham cracker crust, topped with fresh red forest berry compote.',
    rating: 4.9,
    ratingCount: 154,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=600',
    inventory: 6,
    isBestSeller: true
  },
  {
    id: 'd2',
    name: 'Fudge Choc Chip Brownies (Box of 4)',
    category: 'Desserts',
    subcategory: 'Brownies',
    price: 1200.00,
    description: 'Extremely dense, crackly topped dark chocolate brownies studded with milk and white chocolate chunks.',
    rating: 4.8,
    ratingCount: 230,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600',
    inventory: 14,
    isBestSeller: true
  },
  {
    id: 'd3',
    name: 'Velvety Double Blueberry Muffins',
    category: 'Desserts',
    subcategory: 'Muffins',
    price: 325.00,
    description: 'Perfectly domed muffins loaded to the brim with sweet wild blueberries, topped with sweet cinnamon sugar streusel crunch.',
    rating: 4.7,
    ratingCount: 147,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&q=80&w=600',
    inventory: 18,
    isBestSeller: false
  },
  {
    id: 'd4',
    name: 'Gourmet White Chocolate Macadamia Cookies',
    category: 'Desserts',
    subcategory: 'Cookies',
    price: 850.00,
    description: 'Pack of 6 soft-baked gourmet cookies with buttery macadamia nut crunches and imported creamy white chocolate chips.',
    rating: 4.8,
    ratingCount: 198,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&q=80&w=600',
    inventory: 22,
    isBestSeller: true
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Sarah Jenkins',
    rating: 5,
    comment: 'The best birthday cake I have ever ordered! The Strawberry Fields cake was so light, fresh, and not overly sweet. Everyone at the party raved about it! Highly recommended.',
    date: '2026-06-18',
    approved: true
  },
  {
    id: 'r2',
    name: 'Michael Mwangi',
    rating: 5,
    comment: 'Exceptional service and mouth-watering pastries! The croissants are incredibly authentic, flaky, and buttery. Plus, they arrived warm and ahead of time! Superb certified hygiene standard.',
    date: '2026-06-15',
    approved: true
  },
  {
    id: 'r3',
    name: 'David Carter',
    rating: 5,
    comment: 'Highly authentic artisan breads. Their Honey Brown loaf is a staple for our breakfast table now. Very neat staff, you can tell they focus heavily on food safety standards.',
    date: '2026-06-10',
    approved: true
  },
  {
    id: 'r4',
    name: 'Esther Awori',
    rating: 4,
    comment: 'Delicious muffins and wonderful wedding tasting! The custom cake team helped us choose the perfect flavor combinations. Easy M-Pesa ordering on the phone too.',
    date: '2026-06-03',
    approved: true
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'bpost1',
    title: 'Top 10 Cake Decorating Tips for Beginners',
    category: 'Baking Tips',
    excerpt: 'Turn your simple home-baked cakes into professional visual masterpieces with these 10 easy, vetted decorating tips from our lead pastry designer.',
    content: `Baking a delicious cake is sweet victory, but decorating it beautifully is what makes it a showstopping centerpiece. Whether you're whipping up a cake for a family dinner or preparing a delicate birthday surprise, you don't need years of professional culinary training to achieve an incredible presentation. Here are our top 10 tips to instantly elevate your decorating skills:

1. **Always Chill Your Cake Layers**: Warm cakes are delicate and crumbly. Chilling your sponge layers wrappers in plastic wrap for at least 2 hours makes them firm, preventing unsightly crumbs in your frosting.
2. **Apply a "Crumb Coat" first**: This is the ultimate baker secret. Spread a paper-thin layer of icing around your chilled cake to lock in the loose crumbs, chill for 15 minutes, then apply your flawless top layer of buttercream!
3. **Equip Yourself with a Turntable**: A rotating cake stand allows you to smoothly apply continuous buttercream using your palette knife or icing smoother without awkward hand re-positioning.
4. **Use High-Quality Piping Bags and Steel Nozzles**: Avoid flimsy single-use bags that burst under pressure. Snug-fitting steel tips offer precision lines.
5. **Get the Buttercream Consistency Right**: If your frosting is too stiff, it pulls on the cake; if too soft, it won't hold custom shapes. Perfect icing should hold its peak but remain silky-smooth.
6. **Support Multi-Tier Cakes**: When building multiple stories, always insert wooden dowels or sanitary thick straws to support the heavy weight of the top tiers.
7. **Embrace Natural Decor**: Fresh, food-safe edible flowers, chocolate curls, and glossy fresh berries look organic, modern, and require zero complex piping skills!
8. **Keep Your Spatula Clean & Warm**: Dipping your palette knife in warm water and drying it on a clean cloth before smoothing generates an incredibly glassy professional gloss.
9. **Drape Fondant with Precision**: If utilizing fondant, roll it with cornstarch (never flour!) to prevent sticky tearing.
10. **Practice makes Perfect**: Practice piping shapes and lettering on greaseproof parchment paper first. You can scoop the practice icing right back into your bag!`,
    author: 'Chef Evelyn Rose',
    date: '2026-06-14',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
    comments: [
      { id: 'bc1', author: 'Clara Mensah', text: 'Thank you! The crumb coat tip absolutely saved my daughter\'s birthday cake last night. It looked completely professional!', date: '2026-06-15' },
      { id: 'bc2', author: 'Liam Turner', text: 'Do you recommend Swiss Meringue or standard American Buttercream for fine piping?', date: '2026-06-17' }
    ]
  },
  {
    id: 'bpost2',
    title: 'How We Bake Fresh, Nutritious Bread Daily',
    category: 'Bakery News',
    excerpt: 'Take a sensory step behind the scenes to see how our passionate artisan bakers hand-craft our signature stone-milled sourdough and brown breads every morning.',
    content: `Every single morning, long before the sun kisses the city streets, our bakery is alive with the warm, comforting scent of roasting grains and rising dough. To us, baking bread is not a mechanical assembly line; it is a sacred, time-honored craft. Here is a look inside our daily bread purification, fermentation and baking process:

### 1. Organic Ingredient Selection & Water Quality
Great bread requires only four simple elements: flour, water, salt, and yeast. Because the ingredients are simple, each must be premium. We source top-tier, stone-ground flour from local mills. Our baking water is double-filtered to remove chlorine, preserving the organic sourdough cultures that create our delicious, complex tang.

### 2. The 24-Hour Fermentation Secrets
Unlike commercial supermarket breads filled with industrial preservatives, we never rush the rise. Our signature sourdough loaves undergo a rigorous 24-hour slow, temperature-controlled fermentation. This slow rise breaks down complex starches, rendering our bread remarkably nutritious, comforting, and easily digestible.

### 3. Hand-Shaping & Scoring
Every crusty loaf is sized, weighted, and shaped by hand by our passionate professional bakers. Scoring our dough with a surgical baker razor allows the steam to puff the loaf perfectly, creating that beautiful "ear" and satisfying rustic tear on the final crust.

### 4. Direct Stone Hearth Steam Baking
We bake our loaves at high temperatures in a clay stone-deck oven. Rapid bursts of pure steam on initial containment gelatinize the flour starch, ensuring our loaves develop that crisp, amber, perfectly caramelized crust while remaining incredibly soft, moist, and airy inside!`,
    author: 'Head Baker Robert Duvall',
    date: '2026-06-10',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=600',
    comments: [
      { id: 'bc3', author: 'Felix Kimotho', text: 'Fascinating details on water quality! No wonder your sourdough doesn\'t trigger my gluten sensitivity.', date: '2026-06-11' }
    ]
  },
  {
    id: 'bpost3',
    title: 'Introducing Our New Seasonal Pastry Collection',
    category: 'New Product Launches',
    excerpt: 'Summer blooms are here! Discover our exciting limited-edition lineup of buttery cardamom apricot danishes, mango puffs, and lavender cupcakes.',
    content: `We are thrilled to officially introduce our Summer Seasonal Collection—a vibrant celebration of sweet, sun-kissed fruits, refreshing herbs, and delicate floral scents. Our pastry designers spent months perfecting these recipes:

### Highlights of the Summer Menu:
- **The Golden Apricot Danish**: Premium multi-layered puffy croissant dough topped with rich lemon curd and filled with a glazed local organic summer apricot halves.
- **Sparkling Mango Puff Pastry**: Delicate flaky sweet pastry stuffed with real Alphonso mango jelly and baked caramelized brown with a sugar crystal sugar topping.
- **Lavender-Lemon Cupcakes**: Sweet lavender-infused soft cake crumb with a velvety, tart lemon curd core and airy whipped lemon mousse frosting.

These selections are baked in small, certified batches every day and are only available until the end of August. Swing by or check out our online order menu to request home delivery today!`,
    author: 'Chef Evelyn Rose',
    date: '2026-06-05',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    comments: []
  },
  {
    id: 'bpost4',
    title: 'Choosing the Perfect Wedding Cake: A Complete Guide',
    category: 'Baking Tips',
    excerpt: 'Planning your grand day? Learn how to select the ideal scale, style, flavor pairings, and secure safety delivery for your wedding cake.',
    content: `Your wedding cake is more than just a sweet dessert—it is an elegant visual testament, a high-fashion photo backdrop, and the traditional sweet start of your shared family journey. With hundreds of stylistic shapes and flavor options, selecting your cake can feel overwhelming. Let's make it simple and exciting with our definitive coordination outline:

### 1. Match Your Theme to the Silhouette
Choose a cake style that complements your venue:
- **Rustic/Garden**: "Naked" cakes with minimal outer icing, showcasing warm golden sponge textures adorned with wild lavender, berries, or rosemary sprigs.
- **Glamorous/Ballroom**: Multi-tiered cakes wrapped in silky smooth satin fondant, piped edible pearls, and stunning handmade sugar flower sculptures.
- **Modern/Industrial**: Flat concrete-gray marble textures, clean geometric edges, and shiny metallic gold or silver paint accents.

### 2. Serving Sizing Formula
As a general rule, a 3-tier cake (10", 8", and 6" tiers) generously serves 75 to 100 wedding guests. If coordinating a massive catering event, you can request a smaller gorgeous display cake for your ceremonial cutting, accompanied by large pre-sliced backing sheet cakes kept safe in the kitchen to keep costs low.

### 3. Layer Flavor Pairings
Who says your whole cake must be one flavor? You can alternate layers:
- Tier 1 (Base): Rich almond cake with luxurious black cherry filling (appeals to tradition).
- Tier 2 (Middle): Decadent chocolate cake with salted caramel drip (a crowd-pleasing favorite).
- Tier 3 (Top): Light, zesty lemon elderflower sponge with key-lime curd (refreshing end to the night).

Our specialist team provides personalized, hygienic design consultations and secure temperature-controlled delivery. Give us a call or book your Custom Cake design service directly through our location inquiry form!`,
    author: 'Designer Angela Mercer',
    date: '2026-05-28',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
    comments: [
      { id: 'bc4', author: 'Patricia Cole', text: 'Extremely helpful sizing guide! Booking custom catering consultation tomorrow.', date: '2026-06-04' }
    ]
  }
];

export const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800', category: 'cakes', title: 'Strawberry Birthday Swirls' },
  { url: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=800', category: 'cakes', title: 'Elegant Floral Wedding Tier' },
  { url: 'https://images.unsplash.com/photo-1562266648-a535129d5cd0?auto=format&fit=crop&q=80&w=800', category: 'cakes', title: 'Ruby Velvet Gold Flakes Cupcake' },
  { url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800', category: 'cakes', title: 'Drip Chocolate Masterpiece' },

  { url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800', category: 'pastries', title: 'Buttery Golden Croissants' },
  { url: 'https://images.unsplash.com/photo-1549778399-f94fd24d61fd?auto=format&fit=crop&q=80&w=800', category: 'pastries', title: 'Warm Chocolate Pastry Puff' },
  { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800', category: 'pastries', title: 'Cinnamon Spiced danish' },

  { url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800', category: 'bread', title: 'Artisan Cranberry Sourdough Boule' },
  { url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800', category: 'bread', title: 'Oat Honey Grain Brown Loaf' },
  { url: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800', category: 'bread', title: 'Soft Hand-Rolled Challah Crust' },

  { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800', category: 'events', title: 'Custom Corporate Pastry Catering' },
  { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800', category: 'events', title: 'Bespoke Dessert Wedding Bar' },

  { url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800', category: 'behind the scenes', title: 'Daily Sanitized Kitchen Prep' },
  { url: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=800', category: 'behind the scenes', title: 'Hand-kneading Sourdough Starters' }
];
