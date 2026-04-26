/* ================================================
   T SHOP — Complete JavaScript
   WhatsApp Orders | Luxury Animations | Full E-Commerce
   ================================================ */

/* ===== CONSTANTS ===== */
const WHATSAPP_NUMBER = '2348053950665';
const STORE_NAME = 'T SHOP';

const STORAGE_KEYS = {
  USER: 'tshop_user',
  CART: 'tshop_cart',
  WISHLIST: 'tshop_wishlist',
  ORDERS: 'tshop_orders',
  USERS: 'tshop_users'
};

/* ===== STATE ===== */
let currentUser = null;
let cart = [];
let wishlist = [];
let orders = [];
let products = [];
let currentProduct = null;
let reviewRating = 0;
let heroIndex = 0;
let heroTimer = null;
let flashTimerInterval = null;
let minRating = 0;
let maxPriceFilter = 10000;

/* ===== CATEGORIES ===== */
const CATEGORIES = [
  { id: 1, name: 'Electronics', icon: '📱' },
  { id: 2, name: 'Fashion', icon: '👗' },
  { id: 3, name: 'Home & Garden', icon: '🏠' },
  { id: 4, name: 'Sports', icon: '⚽' },
  { id: 5, name: 'Books', icon: '📚' },
  { id: 6, name: 'Beauty', icon: '💄' },
  { id: 7, name: 'Toys', icon: '🧸' },
  { id: 8, name: 'Food', icon: '🍕' }
];

/* ===== SAMPLE PRODUCTS ===== */
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Wireless Headphones Pro', category: 'Electronics', price: 79.99, originalPrice: 129.99, rating: 4.5, reviews: 245, image: 'https://media.wired.com/photos/63e69de969cf98bf35404277/1:1/w_1278,h_1278,c_limit/Best-Wireless-Headphones-Featured-Focal-Bathys-Gear.jpg', description: 'Premium wireless headphones with active noise cancellation. Experience studio-quality sound with 30-hour battery life and ultra-comfortable ear cushions.', seller: 'TechStore', sellerRating: 4.8, specs: ['30-hour battery life', 'Active noise cancellation', 'Bluetooth 5.0', 'Foldable design', 'Built-in mic'], inStock: true, isNew: false, isHot: true },
  { id: 2, name: 'USB-C Fast Charge Cable', category: 'Electronics', price: 12.99, originalPrice: 24.99, rating: 4.8, reviews: 512, image: 'https://images-na.ssl-images-amazon.com/images/I/71bBiH3XgGL.jpg', description: 'Premium braided USB-C cable supporting fast charging up to 100W. Tangle-free and durable for everyday use.', seller: 'ElectroHub', sellerRating: 4.9, specs: ['2-meter length', '100W fast charging', 'Braided nylon', 'USB-C to USB-C'], inStock: true, isNew: false, isHot: false },
  { id: 3, name: 'Portable Power Bank 20000mAh', category: 'Electronics', price: 34.99, originalPrice: 59.99, rating: 4.6, reviews: 389, image: 'https://m.media-amazon.com/images/I/815W+8XpjzL._AC_.jpg', description: 'Massive 20000mAh capacity power bank with dual USB ports and LED display. Charges your phone up to 5 times.', seller: 'PowerTech', sellerRating: 4.7, specs: ['20000mAh capacity', 'Dual USB output', 'LED battery display', 'Fast charging support'], inStock: true, isNew: false, isHot: false },
  { id: 4, name: 'Smart Fitness Watch', category: 'Electronics', price: 199.99, originalPrice: 299.99, rating: 4.7, reviews: 678, image: 'https://i5.walmartimages.com/asr/fd4ac977-2091-48d8-9c42-e4bd76c25860_2.1e08fbcdac48c4ccfbef70130eef5fbf.png', description: 'Advanced smartwatch with GPS, heart rate monitor, and 7-day battery. Track workouts, sleep, and notifications seamlessly.', seller: 'WearTech', sellerRating: 4.8, specs: ['GPS tracking', 'Heart rate monitor', '7-day battery', 'Water resistant 5ATM', 'Sleep tracking'], inStock: true, isNew: true, isHot: true },
  { id: 5, name: 'Ergonomic Wireless Mouse', category: 'Electronics', price: 24.99, originalPrice: 49.99, rating: 4.4, reviews: 156, image: 'https://img.freepik.com/premium-photo/ergonomic-wireless-mouse-modern-workspaces-white-background_960080-15842.jpg?w=2000', description: 'Comfortable ergonomic wireless mouse designed for all-day use. Silent clicks with precision 2400 DPI sensor.', seller: 'ComputerPro', sellerRating: 4.6, specs: ['2.4GHz wireless', '2400 DPI sensor', 'Silent clicks', '12-month battery life'], inStock: true, isNew: false, isHot: false },
  { id: 6, name: 'Premium Cotton T-Shirt', category: 'Fashion', price: 19.99, originalPrice: 39.99, rating: 4.5, reviews: 234, image: 'https://www.nyfifth.com/category/20230922/tultex-602-combed-cotton-t-shirt_Royal.jpg', description: '100% combed cotton t-shirt with a premium feel. Breathable, soft, and perfect for everyday wear.', seller: 'FashionHub', sellerRating: 4.7, specs: ['100% combed cotton', 'Sizes XS-XXL', 'Machine washable', '8 color options'], inStock: true, isNew: false, isHot: false },
  { id: 7, name: 'Classic Slim Denim Jeans', category: 'Fashion', price: 49.99, originalPrice: 89.99, rating: 4.6, reviews: 412, image: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/088/988/155/original/1215237_01.jpg.jpeg?action=crop&width=1800', description: 'Classic slim-fit denim jeans crafted from premium stretch denim. Comfortable, stylish, and built to last.', seller: 'DenimWorld', sellerRating: 4.8, specs: ['Premium stretch denim', 'Slim fit', 'Multiple washes', 'Waist sizes 28-40'], inStock: true, isNew: false, isHot: false },
  { id: 8, name: 'Genuine Leather Jacket', category: 'Fashion', price: 129.99, originalPrice: 199.99, rating: 4.7, reviews: 189, image: 'https://umbleathershop.com/wp-content/uploads/2023/05/Mens-Distressed-Leather-Jacket.jpg', description: 'Premium genuine leather jacket with a distressed finish. Timeless style meets superior craftsmanship.', seller: 'LeatherLux', sellerRating: 4.9, specs: ['100% genuine leather', 'Sizes S-XL', 'Lined interior', 'YKK zippers'], inStock: true, isNew: false, isHot: true },
  { id: 9, name: 'Casual Comfort Sneakers', category: 'Fashion', price: 59.99, originalPrice: 99.99, rating: 4.5, reviews: 567, image: 'https://5.imimg.com/data5/SELLER/Default/2022/11/KE/VX/MV/116453489/white-casual-shoes-for-men-1000x1000.jpg', description: 'Ultra-comfortable casual sneakers with memory foam insoles. Perfect for daily wear with any outfit.', seller: 'ShoeHub', sellerRating: 4.7, specs: ['Memory foam insole', 'Breathable upper', 'Non-slip sole', 'Sizes 36-46'], inStock: true, isNew: true, isHot: false },
  { id: 10, name: 'Floral Summer Dress', category: 'Fashion', price: 39.99, originalPrice: 79.99, rating: 4.6, reviews: 298, image: 'https://img.freepik.com/premium-photo/summer-dress-photography-no-human_1113122-589.jpg', description: 'Light and breezy floral summer dress made from 100% rayon. Perfect for warm weather and casual outings.', seller: 'DressDesigns', sellerRating: 4.8, specs: ['100% rayon', 'Floral print', 'Sizes XS-XL', 'Hand wash recommended'], inStock: true, isNew: false, isHot: false },
  { id: 11, name: 'LED Desk Lamp with USB', category: 'Home & Garden', price: 34.99, originalPrice: 69.99, rating: 4.6, reviews: 345, image: 'https://m.media-amazon.com/images/I/41kfqVzyuaL._AC_SL1200_.jpg', description: 'Modern LED desk lamp with adjustable brightness, color temperature, and a built-in USB charging port.', seller: 'HomeLight', sellerRating: 4.8, specs: ['5 brightness levels', '3 color temperatures', 'USB charging port', 'Touch control', 'Eye-care technology'], inStock: true, isNew: false, isHot: false },
  { id: 12, name: 'Luxury Throw Pillow Set', category: 'Home & Garden', price: 24.99, originalPrice: 44.99, rating: 4.5, reviews: 212, image: 'https://m.media-amazon.com/images/I/81bx7uinZTL._AC_SL1500_.jpg', description: 'Set of 2 premium throw pillows with soft velvet covers. Add elegance to any living space.', seller: 'HomeComfort', sellerRating: 4.7, specs: ['Set of 2', 'Velvet cover', 'Removable & washable', 'Multiple colors'], inStock: true, isNew: false, isHot: false },
  { id: 13, name: 'Ceramic Plant Pot', category: 'Home & Garden', price: 14.99, originalPrice: 29.99, rating: 4.4, reviews: 178, image: 'https://koala.sh/api/image/v2-c4h1w-k4e5u.jpg?width=1216&height=832&dream', description: 'Handcrafted ceramic plant pot with drainage hole and saucer. Adds a modern touch to any room.', seller: 'GardenGreen', sellerRating: 4.6, specs: ['Drainage hole', 'Includes saucer', 'Sizes: S, M, L', 'Frost resistant'], inStock: true, isNew: false, isHot: false },
  { id: 14, name: 'Minimalist Wall Clock', category: 'Home & Garden', price: 29.99, originalPrice: 59.99, rating: 4.7, reviews: 289, image: 'https://i5.walmartimages.com/seo/Black-Wall-Clocks-Battery-Operated-12-inch-Silent-Non-Ticking-Modern-Wall-Clock-for-Living-Room-Bedroom-Kitchen-Office-Decor_1babf987-7bae-4688-bcc2-6fe810cf8d5c.62ab5c67efcc6fb8b903c823d0277cf2.jpeg', description: 'Modern minimalist wall clock with silent sweep movement. No annoying ticking — just clean, quiet timekeeping.', seller: 'TimeStyle', sellerRating: 4.8, specs: ['Silent movement', '12-inch diameter', 'Battery operated', 'Easy mount'], inStock: true, isNew: false, isHot: false },
  { id: 15, name: 'Non-Slip Door Mat', category: 'Home & Garden', price: 19.99, originalPrice: 39.99, rating: 4.5, reviews: 145, image: 'https://i5.walmartimages.com/seo/Sanmadrola-Doormat-Outdoor-Welcome-Mat-Front-Door-24-x47-Floor-Mats-Indoor-Rubber-Backing-Non-Slip-Heavy-Duty-Patio-Entrance-Gray_baed76ee-37e8-425e-87c8-bf5fd31e0c85.4e5338964460a3a1b262833e3f530928.jpeg', description: 'Durable entrance mat with rubber non-slip backing. Weather resistant and easy to clean.', seller: 'HomeEntry', sellerRating: 4.7, specs: ['Non-slip rubber backing', '24"x47"', 'Weather resistant', 'Machine washable'], inStock: true, isNew: false, isHot: false },
  { id: 16, name: 'Non-Slip Yoga Mat', category: 'Sports', price: 24.99, originalPrice: 49.99, rating: 4.6, reviews: 423, image: 'https://www.wikihow.com/images/2/2d/Wash-a-Yoga-Mat-Intro.jpg', description: 'Professional-grade non-slip yoga mat with alignment lines. Extra thick 6mm foam for superior joint protection.', seller: 'FitLife', sellerRating: 4.8, specs: ['6mm thick', 'Alignment lines', 'Carrying strap included', 'Non-toxic materials'], inStock: true, isNew: false, isHot: false },
  { id: 17, name: 'Adjustable Dumbbell Set', category: 'Sports', price: 49.99, originalPrice: 99.99, rating: 4.7, reviews: 567, image: 'https://ecx.images-amazon.com/images/I/817Sl-L8vXS._SL1500_.jpg', description: 'Adjustable dumbbell set from 5-25lbs. Replace 5 sets of weights in one compact design.', seller: 'FitGear', sellerRating: 4.9, specs: ['5-25 lbs adjustable', 'Quick-change mechanism', 'Storage tray included', 'Anti-roll design'], inStock: true, isNew: false, isHot: true },
  { id: 18, name: 'Professional Running Shoes', category: 'Sports', price: 89.99, originalPrice: 149.99, rating: 4.5, reviews: 334, image: 'https://i5.walmartimages.com/seo/Kricely-Men-s-Trail-Running-Shoes-Fashion-Walking-Hiking-Sneakers-Men-Tennis-Cross-Training-Shoe-Outdoor-Snearker-Mens-Casual-Workout-Footwear-Tie-dy_b4edf81c-4a0e-494f-ab8f-5310ea0dc80d.102205b429f8869dc851a8dc5c548ced.jpeg', description: 'Lightweight trail running shoes with superior cushioning and grip. Built for serious runners.', seller: 'SportShoe', sellerRating: 4.7, specs: ['Lightweight mesh upper', 'Cushioned midsole', 'Non-slip outsole', 'Sizes 36-47'], inStock: true, isNew: false, isHot: false },
  { id: 19, name: 'Insulated Sports Bottle', category: 'Sports', price: 19.99, originalPrice: 39.99, rating: 4.6, reviews: 289, image: 'https://i5.walmartimages.com/seo/750ml-Stainless-Steel-Insulated-Sports-Water-Bottle-Large-Capacity-Travel-Tumbler-with-Handle-Outdoor-Hydration-Bottle-for-Gym-Hiking-Dark-Blue_54822d9e-ea33-4a57-9ce7-1565cb9e5782.13384cba3b1da59503797a7fb36ef015.jpeg', description: 'Stainless steel vacuum-insulated water bottle. Keeps drinks cold 24 hours or hot 12 hours.', seller: 'HydroFit', sellerRating: 4.8, specs: ['750ml capacity', 'Double-wall vacuum', 'Leak-proof lid', 'BPA free'], inStock: true, isNew: false, isHot: false },
  { id: 20, name: 'Resistance Band Set', category: 'Sports', price: 14.99, originalPrice: 29.99, rating: 4.5, reviews: 198, image: 'https://m.media-amazon.com/images/I/61RWzNRtO4L._AC_SL1500_.jpg', description: 'Set of 5 resistance bands in different strengths. Perfect for home workouts, stretching, and physical therapy.', seller: 'FitTools', sellerRating: 4.7, specs: ['5 resistance levels', 'Natural latex', 'Storage bag included', 'For all fitness levels'], inStock: true, isNew: false, isHot: false },
  { id: 21, name: 'JavaScript: The Complete Guide', category: 'Books', price: 34.99, originalPrice: 49.99, rating: 4.8, reviews: 567, image: 'https://m.media-amazon.com/images/I/714Bhh248UL._SL1500_.jpg', description: 'The definitive guide to modern JavaScript. From fundamentals to advanced patterns — everything in one book.', seller: 'BookStore', sellerRating: 4.9, specs: ['520 pages', 'Hardcover', 'Latest ES2024 coverage', 'Practice exercises included'], inStock: true, isNew: false, isHot: false },
  { id: 22, name: 'Web Design Fundamentals', category: 'Books', price: 29.99, originalPrice: 44.99, rating: 4.6, reviews: 234, image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1618144361i/57693957.jpg', description: 'Learn web design from scratch with this practical, illustrated guide. Covers HTML, CSS, and UX principles.', seller: 'DesignBooks', sellerRating: 4.8, specs: ['400 pages', 'Paperback', 'Full color illustrations', 'Online resources included'], inStock: true, isNew: false, isHot: false },
  { id: 23, name: 'Modern Business Strategy', category: 'Books', price: 24.99, originalPrice: 39.99, rating: 4.7, reviews: 345, image: 'https://m.media-amazon.com/images/I/61dalmN2-hL._SL1294_.jpg', description: 'A practical framework for building winning business strategies in the digital age. Real case studies, actionable insights.', seller: 'BusinessPub', sellerRating: 4.8, specs: ['350 pages', 'Hardcover', '20+ case studies', 'Strategy templates included'], inStock: true, isNew: false, isHot: false },
  { id: 24, name: 'Bestselling Fiction Novel', category: 'Books', price: 19.99, originalPrice: 29.99, rating: 4.5, reviews: 456, image: 'https://www.barnesandnoble.com/blog/wp-content/uploads/2024/12/ma-fiction.jpeg', description: 'Award-winning fiction novel. A gripping story that will keep you up all night.', seller: 'NovelPress', sellerRating: 4.7, specs: ['450 pages', 'Paperback', 'Award-winning author', 'International bestseller'], inStock: true, isNew: true, isHot: false },
  { id: 25, name: 'Personal Development Mastery', category: 'Books', price: 22.99, originalPrice: 34.99, rating: 4.6, reviews: 289, image: 'https://m.media-amazon.com/images/I/514UYwJsV6L._SL1200_.jpg', description: 'Transform your life with this comprehensive personal development guide. Actionable strategies for success.', seller: 'GrowthBooks', sellerRating: 4.8, specs: ['380 pages', 'Paperback', 'Practical exercises', 'Companion workbook'], inStock: true, isNew: false, isHot: false },
  { id: 26, name: 'Hydrating Face Moisturizer', category: 'Beauty', price: 24.99, originalPrice: 49.99, rating: 4.7, reviews: 512, image: 'https://people.com/thmb/bv6FG6eJ-3lV_RfbCO3hEu6Pf0Q=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(749x0:751x2)/best-face-moisturizers-for-oily-skin-tout-1c5c7446375d4643bcc7c7bdc87cc116.jpg', description: 'Lightweight, non-greasy face moisturizer with hyaluronic acid and vitamin C. Suitable for all skin types.', seller: 'BeautyPro', sellerRating: 4.9, specs: ['50ml', 'Hyaluronic acid formula', 'All skin types', 'SPF 15', 'Dermatologist tested'], inStock: true, isNew: true, isHot: true },
  { id: 27, name: 'Luxury Lipstick Set', category: 'Beauty', price: 19.99, originalPrice: 39.99, rating: 4.6, reviews: 378, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Lipstick+Set', description: 'Set of 5 premium long-lasting matte lipsticks in curated shades. 12-hour wear formula.', seller: 'ColorBeauty', sellerRating: 4.8, specs: ['5 shades', '12-hour wear', 'Matte finish', 'Vitamin E enriched'], inStock: true, isNew: false, isHot: false },
  { id: 28, name: 'Purifying Face Mask', category: 'Beauty', price: 14.99, originalPrice: 29.99, rating: 4.5, reviews: 245, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Face+Mask', description: 'Deep-cleansing peel-off face mask with activated charcoal. Removes blackheads and impurities.', seller: 'SkinCare', sellerRating: 4.7, specs: ['100ml', 'Activated charcoal', 'Suitable for all skin types', 'Cruelty-free'], inStock: true, isNew: false, isHot: false },
  { id: 29, name: 'Sulfate-Free Hair Shampoo', category: 'Beauty', price: 12.99, originalPrice: 24.99, rating: 4.6, reviews: 456, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Shampoo', description: 'Gentle sulfate-free shampoo for all hair types. Infused with argan oil for silky, shiny results.', seller: 'HairCare', sellerRating: 4.8, specs: ['250ml', 'Sulfate & paraben free', 'Argan oil formula', 'All hair types'], inStock: true, isNew: false, isHot: false },
  { id: 30, name: 'Anti-Aging Eye Cream', category: 'Beauty', price: 29.99, originalPrice: 59.99, rating: 4.7, reviews: 334, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Eye+Cream', description: 'Advanced anti-aging eye cream with retinol and peptides. Reduces dark circles and fine lines.', seller: 'PremiumBeauty', sellerRating: 4.9, specs: ['30ml', 'Retinol formula', 'Reduces dark circles', 'Clinically tested'], inStock: true, isNew: false, isHot: false },
  { id: 31, name: 'Colorful Building Blocks Set', category: 'Toys', price: 24.99, originalPrice: 44.99, rating: 4.8, reviews: 567, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Building+Blocks', description: 'Creative building blocks set with 500 pieces. Compatible with all major brick brands. Safe for ages 3+.', seller: 'ToyWorld', sellerRating: 4.9, specs: ['500 pieces', 'Ages 3+', 'Non-toxic materials', 'Storage box included'], inStock: true, isNew: false, isHot: false },
  { id: 32, name: 'Collector Action Figure', category: 'Toys', price: 19.99, originalPrice: 39.99, rating: 4.6, reviews: 289, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Action+Figure', description: 'Highly detailed 12-inch articulated action figure. 20+ points of articulation and collector-grade paint.', seller: 'FigureCollect', sellerRating: 4.8, specs: ['12 inches tall', '20+ articulation points', 'Collector grade', 'Display stand included'], inStock: true, isNew: false, isHot: false },
  { id: 33, name: '1000-Piece Puzzle', category: 'Toys', price: 14.99, originalPrice: 29.99, rating: 4.5, reviews: 178, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Puzzle', description: 'Challenging 1000-piece jigsaw puzzle with premium glossy finish. Great for family game nights.', seller: 'PuzzleHub', sellerRating: 4.7, specs: ['1000 pieces', 'Glossy finish', 'Completed size: 70x50cm', 'Ages 12+'], inStock: true, isNew: false, isHot: false },
  { id: 34, name: 'Family Strategy Board Game', category: 'Toys', price: 34.99, originalPrice: 59.99, rating: 4.7, reviews: 412, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Board+Game', description: 'Award-winning family board game for 2-6 players. Educational, strategic, and hours of fun.', seller: 'GameFun', sellerRating: 4.8, specs: ['2-6 players', 'Ages 8+', 'Play time: 45-90 mins', 'Educational'], inStock: true, isNew: false, isHot: false },
  { id: 35, name: 'Remote Control Robot', category: 'Toys', price: 44.99, originalPrice: 89.99, rating: 4.6, reviews: 234, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=RC+Robot', description: 'Interactive remote control robot with LED lights, sound effects, and programmable moves.', seller: 'RoboToys', sellerRating: 4.8, specs: ['Remote controlled (20m range)', 'LED light-up eyes', 'Sound effects', 'Rechargeable battery'], inStock: true, isNew: true, isHot: false },
  { id: 36, name: 'Premium Organic Coffee', category: 'Food', price: 12.99, originalPrice: 24.99, rating: 4.7, reviews: 456, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Organic+Coffee', description: 'Single-origin organic coffee beans, medium roast. Sourced directly from Ethiopian highlands. Rich, smooth flavor.', seller: 'CoffeeHub', sellerRating: 4.9, specs: ['500g whole beans', 'Organic certified', 'Medium roast', 'Fair trade'], inStock: true, isNew: false, isHot: false },
  { id: 37, name: 'Premium Chocolate Gift Box', category: 'Food', price: 19.99, originalPrice: 39.99, rating: 4.6, reviews: 334, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Chocolate+Box', description: 'Luxury assorted chocolate box with 20 hand-crafted pieces. Perfect for gifting or indulging.', seller: 'ChocoPremium', sellerRating: 4.8, specs: ['20 pieces', 'Assorted flavors', 'Gift box packaging', 'Premium Belgian chocolate'], inStock: true, isNew: false, isHot: false },
  { id: 38, name: 'Raw Organic Honey', category: 'Food', price: 14.99, originalPrice: 29.99, rating: 4.8, reviews: 289, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Organic+Honey', description: 'Pure raw unfiltered organic honey. Cold-extracted to preserve natural enzymes and antioxidants.', seller: 'HoneyFarm', sellerRating: 4.9, specs: ['500ml jar', 'Raw & unfiltered', 'Organic certified', 'Cold-extracted'], inStock: true, isNew: false, isHot: false },
  { id: 39, name: 'Premium Tea Collection', category: 'Food', price: 24.99, originalPrice: 44.99, rating: 4.5, reviews: 212, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Tea+Collection', description: 'Curated collection of 10 premium loose-leaf teas from around the world. Includes green, black, herbal, and white teas.', seller: 'TeaHouse', sellerRating: 4.7, specs: ['10 varieties', '50g each', 'Loose leaf', 'Airtight tins'], inStock: true, isNew: true, isHot: false },
  { id: 40, name: 'Healthy Mixed Nuts Pack', category: 'Food', price: 16.99, originalPrice: 34.99, rating: 4.6, reviews: 178, image: 'https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=Mixed+Nuts', description: 'Premium mixed nuts with almonds, cashews, walnuts, and pistachios. No added salt, no preservatives.', seller: 'SnackHub', sellerRating: 4.8, specs: ['400g', 'No added salt', 'No preservatives', 'Resealable bag'], inStock: true, isNew: false, isHot: false }
];

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  products = SAMPLE_PRODUCTS;
  initPreloader();
  initParticles();
  initCursor();
  initHeroSlider();
  initFlashTimer();
  initScrollEffects();
  renderSidebar();
  displayHomePage();
  updateBadges();
  updateUserMenu();
});

/* ===== PRELOADER ===== */
function initPreloader() {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 2200);
}

/* ===== PARTICLE CANVAS ===== */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);
  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1
    });
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/* ===== CUSTOM CURSOR ===== */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
  function animRing() { rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animRing); }
  animRing();
  document.querySelectorAll('a,button,.product-card,.category-item,.cat-showcase-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
  // Click ripple
  document.addEventListener('click', e => {
    const ripple = document.getElementById('clickRipple');
    if (!ripple) return;
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '80px'; ripple.style.height = '80px';
    ripple.style.marginLeft = '-40px'; ripple.style.marginTop = '-40px';
    ripple.classList.remove('burst');
    void ripple.offsetWidth;
    ripple.classList.add('burst');
    setTimeout(() => ripple.classList.remove('burst'), 500);
  });
}

/* ===== HERO SLIDER ===== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('heroDots');
  if (!slides.length || !dotsContainer) return;
  dotsContainer.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });
  startHeroAuto();
}

function goToSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  slides[heroIndex].classList.remove('active');
  if (dots[heroIndex]) dots[heroIndex].classList.remove('active');
  heroIndex = (index + slides.length) % slides.length;
  slides[heroIndex].classList.add('active');
  if (dots[heroIndex]) dots[heroIndex].classList.add('active');
}

function slideHero(dir) {
  clearInterval(heroTimer);
  goToSlide(heroIndex + dir);
  startHeroAuto();
}

function startHeroAuto() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => goToSlide(heroIndex + 1), 5000);
}

/* ===== FLASH TIMER ===== */
function initFlashTimer() {
  let total = 2 * 3600 + 45 * 60;
  flashTimerInterval = setInterval(() => {
    if (total <= 0) { clearInterval(flashTimerInterval); return; }
    total--;
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const hEl = document.getElementById('timerHours');
    const mEl = document.getElementById('timerMins');
    const sEl = document.getElementById('timerSecs');
    if (hEl) hEl.textContent = String(h).padStart(2, '0');
    if (mEl) mEl.textContent = String(m).padStart(2, '0');
    if (sEl) sEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

/* ===== SCROLL EFFECTS ===== */
function initScrollEffects() {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) navbar.style.background = scrollY > 50 ? 'rgba(3,3,3,0.98)' : 'rgba(5,5,5,0.95)';
    if (backToTop) { backToTop.classList.toggle('show', scrollY > 400); }
  });
  // Intersection observer for cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.why-card,.footer-links-group').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

/* ===== NAVIGATION ===== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  const page = document.getElementById(pageId);
  if (page) { page.style.display = 'block'; window.scrollTo({ top: 0, behavior: 'smooth' }); }
  document.getElementById('userMenu').classList.remove('active');
}

function goHome() { showPage('homePage'); displayHomePage(); }
function goToAllProducts() { showPage('productsPage'); displayAllProducts(); }
function continueShopping() { goToAllProducts(); }
function scrollToSection(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); }

function goToProfile() {
  if (!currentUser) { openLoginModal(); return; }
  showPage('profilePage'); displayProfile();
}
function goToOrders() {
  if (!currentUser) { openLoginModal(); return; }
  showPage('ordersPage'); displayOrders();
}

function goBack() { window.history.back(); }

/* ===== HOME PAGE ===== */
function displayHomePage() {
  renderCategories();
  displayFeaturedProducts();
  displayFlashSaleProducts();
  displayTrendingProducts();
  displayCategoriesShowcase();
}

function renderSidebar() {
  const nav = document.getElementById('categoriesNav');
  if (!nav) return;
  nav.innerHTML = `<button class="category-item active" onclick="filterByCategory('All')">🏠 All Products</button>` +
    CATEGORIES.map(c => `<button class="category-item" onclick="filterByCategory('${c.name}')">${c.icon} ${c.name}</button>`).join('');
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map(c => `
    <div class="cat-showcase-card" onclick="filterByCategory('${c.name}')">
      <span class="cat-icon">${c.icon}</span>
      <span class="cat-label">${c.name}</span>
    </div>`).join('');
}

function displayFeaturedProducts() {
  const el = document.getElementById('featuredProducts');
  if (el) el.innerHTML = products.slice(0, 8).map(createProductCard).join('');
}

function displayFlashSaleProducts() {
  const el = document.getElementById('flashSaleProducts');
  const flashItems = products.filter(p => {
    const disc = ((p.originalPrice - p.price) / p.originalPrice) * 100;
    return disc >= 35;
  }).slice(0, 6);
  if (el) el.innerHTML = flashItems.map(createProductCard).join('');
}

function displayTrendingProducts() {
  const el = document.getElementById('trendingProducts');
  if (el) el.innerHTML = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 8).map(createProductCard).join('');
}

function displayAllProducts() {
  const el = document.getElementById('productsGrid');
  if (el) el.innerHTML = products.map(createProductCard).join('');
  document.getElementById('pageTitle').textContent = 'All Products';
}

/* ===== PRODUCT CARD ===== */
function createProductCard(product) {
  const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const isWishlisted = wishlist.some(w => w.id === product.id);
  const stars = renderStars(product.rating);
  let badges = `<div class="product-badge-wrap"><span class="p-badge off">-${disc}%</span>`;
  if (product.isNew) badges += `<span class="p-badge new-badge">NEW</span>`;
  if (product.isHot) badges += `<span class="p-badge hot">🔥 HOT</span>`;
  badges += `</div>`;
  return `
    <div class="product-card" onclick="viewProduct(${product.id})" data-id="${product.id}">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x400/1a1a1a/C9A84C?text=T+SHOP'">
        ${badges}
        <button class="product-wl-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlistItem(event,${product.id})" title="Wishlist">
          ${isWishlisted ? '♥' : '♡'}
        </button>
      </div>
      <div class="product-info">
        <p class="product-cat-tag">${product.category}</p>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-stars-row"><span class="s-stars">${stars}</span><span>(${product.reviews})</span></div>
        <div class="product-price-row"><span class="pc-price">$${product.price}</span><span class="pc-orig">$${product.originalPrice}</span></div>
        <div class="product-card-actions">
          <button class="btn-card-buy" onclick="quickOrderWhatsApp(event,${product.id})">Order via WA</button>
          <button class="btn-card-cart" onclick="addToCartCard(event,${product.id})">🛒</button>
        </div>
      </div>
    </div>`;
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - half);
}

/* ===== PRODUCT DETAIL ===== */
function viewProduct(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;
  // Animate card click
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (card) {
    card.style.transform = 'scale(0.95)';
    setTimeout(() => { card.style.transform = ''; }, 200);
  }
  showPage('productDetailPage');
  renderProductDetail();
  renderRelatedProducts();
}

function renderProductDetail() {
  const p = currentProduct;
  const disc = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  document.getElementById('mainImage').src = p.image;
  document.getElementById('mainImage').onerror = function() { this.src = 'https://via.placeholder.com/600x600/1a1a1a/C9A84C?text=T+SHOP'; };
  document.getElementById('productName').textContent = p.name;
  document.getElementById('productStars').textContent = renderStars(p.rating);
  document.getElementById('ratingCount').textContent = `${p.rating} (${p.reviews} reviews)`;
  document.getElementById('currentPrice').textContent = `$${p.price}`;
  document.getElementById('originalPrice').textContent = `$${p.originalPrice}`;
  document.getElementById('discount').textContent = `-${disc}%`;
  document.getElementById('productDescription').textContent = p.description;
  document.getElementById('sellerName').textContent = p.seller;
  document.getElementById('sellerRating').textContent = `${p.sellerRating} ⭐`;
  document.getElementById('responseTime').textContent = '< 1 hour';
  document.getElementById('quantity').value = 1;
  document.getElementById('breadcrumbCat').textContent = p.category;
  document.getElementById('breadcrumbProduct').textContent = p.name.substring(0, 30) + (p.name.length > 30 ? '...' : '');

  // Badges
  let badgesHTML = '';
  if (p.isNew) badgesHTML += `<span class="p-badge new-badge">NEW ARRIVAL</span>`;
  if (p.isHot) badgesHTML += `<span class="p-badge hot">🔥 TRENDING</span>`;
  const pdBadges = document.getElementById('productBadgesRow');
  if (pdBadges) pdBadges.innerHTML = badgesHTML;

  // Specs
  document.getElementById('productSpecs').innerHTML = p.specs.map(s => `<li>${s}</li>`).join('');

  // Thumbnails
  document.getElementById('thumbnailImages').innerHTML = `
    <div class="thumb-item active" onclick="setMainImage('${p.image}',this)">
      <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/100/1a1a1a/C9A84C?text=T'">
    </div>`;

  // Wishlist btn
  const wlBtn = document.getElementById('wishlistDetailBtn');
  if (wlBtn) {
    const isWl = wishlist.some(w => w.id === p.id);
    wlBtn.textContent = isWl ? '♥' : '♡';
    wlBtn.classList.toggle('active', isWl);
  }

  // Reviews
  renderProductReviews();
}

function setMainImage(src, thumb) {
  document.getElementById('mainImage').src = src;
  document.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
}

function renderRelatedProducts() {
  const related = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
  const el = document.getElementById('relatedProducts');
  if (el) el.innerHTML = related.map(createProductCard).join('');
}

function renderProductReviews() {
  const staticReviews = [
    { author: 'Chidi O.', rating: 5, text: 'Excellent product! Quality is top-notch. Ordered via WhatsApp and delivery was super fast. Highly recommend T SHOP!', date: '2024-11-20' },
    { author: 'Amaka N.', rating: 4, text: 'Really good quality, came exactly as described. The WhatsApp ordering process is so easy and convenient.', date: '2024-11-15' },
    { author: 'Emeka A.', rating: 5, text: 'Fantastic experience from start to finish. Great product, great price, amazing customer service!', date: '2024-11-10' }
  ];
  const list = document.getElementById('reviewsList');
  if (list) {
    list.innerHTML = staticReviews.map(r => `
      <div class="review-item">
        <div class="review-header">
          <span class="review-author">👤 ${r.author}</span>
          <span class="review-date">${r.date}</span>
        </div>
        <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
        <p class="review-text">${r.text}</p>
      </div>`).join('');
  }
}

function setReviewRating(val) {
  reviewRating = val;
  document.querySelectorAll('.sp-star').forEach((s, i) => s.classList.toggle('active', i < val));
}

function submitReview() {
  const text = document.getElementById('reviewText').value.trim();
  if (!text || reviewRating === 0) { showToast('Please add a rating and write your review.', 'warning'); return; }
  showToast('Review submitted! Thank you 🙏', 'success');
  document.getElementById('reviewText').value = '';
  reviewRating = 0;
  document.querySelectorAll('.sp-star').forEach(s => s.classList.remove('active'));
}

function increaseQuantity() { const i = document.getElementById('quantity'); i.value = Math.min(parseInt(i.value) + 1, 99); }
function decreaseQuantity() { const i = document.getElementById('quantity'); i.value = Math.max(parseInt(i.value) - 1, 1); }

/* ===== WHATSAPP ORDER ===== */
function buildWhatsAppMessage(product, qty) {
  const total = (product.price * qty).toFixed(2);
  const msg = `Hello *${STORE_NAME}*! 👋\n\n` +
    `I would like to order the following:\n\n` +
    `🛍️ *Product:* ${product.name}\n` +
    `📦 *Category:* ${product.category}\n` +
    `🔢 *Quantity:* ${qty}\n` +
    `💰 *Unit Price:* $${product.price}\n` +
    `💵 *Total Amount:* $${total}\n\n` +
    `Please confirm availability and delivery details. Thank you!`;
  return encodeURIComponent(msg);
}

function buildCartWhatsAppMessage() {
  if (!cart.length) return '';
  let msg = `Hello *${STORE_NAME}*! 👋\n\nI would like to order the following items:\n\n`;
  let subtotal = 0;
  cart.forEach((item, i) => {
    const lineTotal = item.price * item.quantity;
    subtotal += lineTotal;
    msg += `${i + 1}. *${item.name}*\n   Qty: ${item.quantity} × $${item.price} = $${lineTotal.toFixed(2)}\n\n`;
  });
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  msg += `━━━━━━━━━━━━━━\n`;
  msg += `💰 *Subtotal:* $${subtotal.toFixed(2)}\n`;
  msg += `🚚 *Shipping:* $${shipping.toFixed(2)}\n`;
  msg += `🧾 *Tax (10%):* $${tax.toFixed(2)}\n`;
  msg += `💵 *TOTAL: $${total.toFixed(2)}*\n\n`;
  msg += `Please confirm availability and delivery details. Thank you!`;
  return encodeURIComponent(msg);
}

function buyNowWhatsApp() {
  if (!currentProduct) return;
  const qty = parseInt(document.getElementById('quantity').value) || 1;
  const msg = buildWhatsAppMessage(currentProduct, qty);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  // Save to orders
  saveOrder([{ ...currentProduct, quantity: qty }]);
  showToast('Opening WhatsApp... 💬', 'success');
}

function quickOrderWhatsApp(e, productId) {
  e.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const msg = buildWhatsAppMessage(product, 1);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  saveOrder([{ ...product, quantity: 1 }]);
  showToast('Opening WhatsApp... 💬', 'success');
}

function orderCartWhatsApp() {
  if (!cart.length) { showToast('Your cart is empty!', 'warning'); return; }
  const msg = buildCartWhatsAppMessage();
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  const orderId = 'ORD-' + Date.now();
  saveOrder([...cart]);
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal + 5 + subtotal * 0.1;
  document.getElementById('orderNumber').textContent = orderId;
  document.getElementById('successMsg').textContent = `Your cart order ($${total.toFixed(2)}) has been sent to WhatsApp!`;
  cart = [];
  saveToStorage();
  updateBadges();
  document.getElementById('successModal').classList.add('active');
}

function saveOrder(items) {
  const userId = currentUser ? currentUser.id : 'guest';
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const order = {
    id: 'ORD-' + Date.now(),
    userId,
    items,
    total: subtotal + 5 + subtotal * 0.1,
    status: 'pending',
    date: new Date().toLocaleDateString('en-GB')
  };
  orders.push(order);
  saveToStorage();
}

/* ===== CART ===== */
function addToCartCard(e, productId) {
  e.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  addProductToCart(product, 1);
}

function addToCartFromDetail() {
  if (!currentProduct) return;
  const qty = parseInt(document.getElementById('quantity').value) || 1;
  addProductToCart(currentProduct, qty);
}

function addProductToCart(product, qty) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) { existing.quantity += qty; } else { cart.push({ ...product, quantity: qty }); }
  saveToStorage();
  updateBadges();
  showToast(`${product.name} added to cart! 🛒`, 'success');
  // Animate badge
  const badge = document.getElementById('cartBadge');
  if (badge) { badge.style.transform = 'scale(1.5)'; setTimeout(() => badge.style.transform = '', 300); }
}

function toggleCart() {
  if (cart.length === 0) { showToast('Your cart is empty!', 'info'); return; }
  showPage('cartPage');
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;
  if (!cart.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">🛒</div><h3>Your cart is empty</h3><p>Discover our amazing products and add them to your cart!</p><button class="btn-gold" onclick="goToAllProducts()">Start Shopping</button></div>`;
    return;
  }
  container.innerHTML = cart.map(item => `
    <div class="cart-item" id="cart-item-${item.id}">
      <div class="cart-img"><img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/100/1a1a1a/C9A84C?text=T'"></div>
      <div>
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-cat">${item.category}</p>
        <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="cart-item-ctrl">
        <div class="cart-qty">
          <button onclick="updateCartQty(${item.id},-1)">−</button>
          <input type="number" value="${item.quantity}" readonly>
          <button onclick="updateCartQty(${item.id},1)">+</button>
        </div>
        <button class="cart-remove" onclick="removeFromCart(${item.id})" title="Remove">🗑️</button>
      </div>
    </div>`).join('');
  updateCartSummary();
}

function updateCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveToStorage();
  renderCart();
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  cart = cart.filter(i => i.id !== productId);
  saveToStorage();
  updateBadges();
  renderCart();
  if (item) showToast(`${item.name} removed from cart`, 'info');
}

function updateCartSummary() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('subtotal', `$${subtotal.toFixed(2)}`);
  set('shipping', `$${shipping.toFixed(2)}`);
  set('tax', `$${tax.toFixed(2)}`);
  set('total', `$${total.toFixed(2)}`);
}

/* ===== WISHLIST ===== */
function toggleWishlist() {
  showPage('wishlistPage');
  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById('wishlistProducts');
  if (!container) return;
  if (!wishlist.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">❤️</div><h3>Your wishlist is empty</h3><p>Save products you love to your wishlist!</p><button class="btn-gold" onclick="goToAllProducts()">Explore Products</button></div>`;
    return;
  }
  container.innerHTML = wishlist.map(createProductCard).join('');
}

function toggleWishlistItem(e, productId) {
  if (e) e.stopPropagation();
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const idx = wishlist.findIndex(w => w.id === productId);
  if (idx > -1) { wishlist.splice(idx, 1); showToast('Removed from wishlist', 'info'); }
  else { wishlist.push(product); showToast(`${product.name} saved to wishlist ❤️`, 'success'); }
  saveToStorage();
  updateBadges();
  // Refresh current page cards
  document.querySelectorAll(`.product-wl-btn`).forEach(btn => {
    const card = btn.closest('.product-card');
    if (!card) return;
    const id = parseInt(card.dataset.id);
    const isWl = wishlist.some(w => w.id === id);
    btn.textContent = isWl ? '♥' : '♡';
    btn.classList.toggle('active', isWl);
  });
  // Update detail btn if open
  const detailWlBtn = document.getElementById('wishlistDetailBtn');
  if (detailWlBtn && currentProduct && currentProduct.id === productId) {
    const isWl = wishlist.some(w => w.id === productId);
    detailWlBtn.textContent = isWl ? '♥' : '♡';
    detailWlBtn.classList.toggle('active', isWl);
  }
}

function toggleProductWishlist() {
  if (!currentProduct) return;
  toggleWishlistItem(null, currentProduct.id);
}

/* ===== FILTERS & SORT ===== */
function filterByCategory(category) {
  showPage('productsPage');
  const catButtons = document.querySelectorAll('.category-item, .cat-bar-inner button');
  catButtons.forEach(b => {
    b.classList.remove('active');
    if (b.textContent.trim().toLowerCase().includes(category.toLowerCase()) || (category === 'All' && b.textContent.includes('All'))) {
      b.classList.add('active');
    }
  });
  let filtered = category === 'All' ? products : products.filter(p => p.category === category);
  filtered = applyFilters(filtered);
  document.getElementById('pageTitle').textContent = category === 'All' ? 'All Products' : category;
  const grid = document.getElementById('productsGrid');
  if (grid) {
    grid.innerHTML = filtered.length ? filtered.map(createProductCard).join('') :
      `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><h3>No products found</h3><p>Try a different category or filter.</p></div>`;
  }
}

function applyFilters(list) {
  return list.filter(p => p.price <= maxPriceFilter && p.rating >= minRating);
}

function filterByPrice() {
  maxPriceFilter = parseInt(document.getElementById('priceRange').value);
  document.getElementById('priceValue').textContent = maxPriceFilter;
  const titleEl = document.getElementById('pageTitle');
  const currentCat = titleEl ? titleEl.textContent : 'All Products';
  filterByCategory(currentCat === 'All Products' ? 'All' : currentCat);
}

function filterByRating(val) {
  minRating = parseFloat(val);
  const titleEl = document.getElementById('pageTitle');
  const currentCat = titleEl ? titleEl.textContent : 'All Products';
  filterByCategory(currentCat === 'All Products' ? 'All' : currentCat);
}

function sortProducts() {
  const val = document.getElementById('sortSelect').value;
  let sorted = [...products];
  switch (val) {
    case 'price-low': sorted.sort((a, b) => a.price - b.price); break;
    case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
    case 'rating': sorted.sort((a, b) => b.rating - a.rating); break;
    case 'popular': sorted.sort((a, b) => b.reviews - a.reviews); break;
    default: sorted.sort((a, b) => b.id - a.id);
  }
  const el = document.getElementById('productsGrid');
  if (el) el.innerHTML = sorted.map(createProductCard).join('');
}

/* ===== SEARCH ===== */
function performSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!query) { showToast('Please enter a search term', 'warning'); return; }
  const results = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query) ||
    p.seller.toLowerCase().includes(query)
  );
  showPage('searchPage');
  document.getElementById('searchTitle').textContent = `Results for "${query}" (${results.length})`;
  const el = document.getElementById('searchResults');
  if (el) {
    el.innerHTML = results.length ? results.map(createProductCard).join('') :
      `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><h3>No results found</h3><p>Try searching for something else.</p></div>`;
  }
  // Populate category filter
  const catFilter = document.getElementById('searchCategoryFilter');
  if (catFilter) {
    const cats = [...new Set(results.map(p => p.category))];
    catFilter.innerHTML = `<option value="">All Categories</option>` + cats.map(c => `<option value="${c}">${c}</option>`).join('');
    catFilter.dataset.results = JSON.stringify(results.map(p => p.id));
  }
}

function filterSearchResults() {
  const catFilter = document.getElementById('searchCategoryFilter');
  const cat = catFilter.value;
  const allIds = JSON.parse(catFilter.dataset.results || '[]');
  let filtered = products.filter(p => allIds.includes(p.id));
  if (cat) filtered = filtered.filter(p => p.category === cat);
  const el = document.getElementById('searchResults');
  if (el) el.innerHTML = filtered.map(createProductCard).join('');
}

/* ===== MOBILE MENU ===== */
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const ham = document.getElementById('hamburger');
  const isOpen = menu.classList.toggle('open');
  overlay.classList.toggle('active', isOpen);
  ham.classList.toggle('open', isOpen);
}

/* ===== USER MENU ===== */
function toggleUserMenu() {
  document.getElementById('userMenu').classList.toggle('active');
}

/* ===== AUTH - LOGIN ===== */
function openLoginModal() { document.getElementById('loginModal').classList.add('active'); document.getElementById('userMenu').classList.remove('active'); }
function closeLoginModal() { document.getElementById('loginModal').classList.remove('active'); }
function openSignupModal() { document.getElementById('signupModal').classList.add('active'); document.getElementById('userMenu').classList.remove('active'); }
function closeSignupModal() { document.getElementById('signupModal').classList.remove('active'); }
function switchToSignup() { closeLoginModal(); openSignupModal(); }
function switchToLogin() { closeSignupModal(); openLoginModal(); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function closeModalOutside(e, id) { if (e.target.id === id) closeModal(id); }

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  if (!email || !password) { showToast('Please fill in all fields', 'error'); return; }
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    saveToStorage();
    updateUserMenu();
    closeLoginModal();
    showToast(`Welcome back, ${user.name}! 🎉`, 'success');
  } else {
    showToast('Invalid email or password', 'error');
    document.getElementById('loginPassword').style.borderColor = 'var(--danger)';
    setTimeout(() => document.getElementById('loginPassword').style.borderColor = '', 2000);
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirmPassword').value;
  if (!name || !email || !password || !confirm) { showToast('Please fill in all fields', 'error'); return; }
  if (password.length < 6) { showToast('Password must be at least 6 characters', 'error'); return; }
  if (password !== confirm) { showToast('Passwords do not match', 'error'); return; }
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  if (users.some(u => u.email === email)) { showToast('Email already registered', 'error'); return; }
  const newUser = { id: 'U-' + Date.now(), name, email, password, createdAt: new Date().toLocaleDateString('en-GB') };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  currentUser = newUser;
  saveToStorage();
  updateUserMenu();
  closeSignupModal();
  showToast(`Welcome to T SHOP, ${name}! ✨`, 'success');
}

function logout() {
  currentUser = null;
  saveToStorage();
  updateUserMenu();
  document.getElementById('userMenu').classList.remove('active');
  showToast('Logged out successfully. See you soon! 👋', 'info');
  goHome();
}

function updateUserMenu() {
  const guest = document.getElementById('userMenuGuest');
  const loggedIn = document.getElementById('userMenuLoggedIn');
  if (!guest || !loggedIn) return;
  if (currentUser) {
    guest.style.display = 'none';
    loggedIn.style.display = 'block';
    const nameEl = document.getElementById('userDisplayName');
    const emailEl = document.getElementById('userDisplayEmail');
    const avatarEl = document.getElementById('userAvatarSm');
    if (nameEl) nameEl.textContent = currentUser.name;
    if (emailEl) emailEl.textContent = currentUser.email;
    if (avatarEl) avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();
  } else {
    guest.style.display = 'block';
    loggedIn.style.display = 'none';
  }
}

/* ===== PROFILE ===== */
function displayProfile() {
  if (!currentUser) return;
  const nameEl = document.getElementById('profileName');
  const emailEl = document.getElementById('profileEmailDisplay');
  const avatarEl = document.getElementById('profileAvatarBig');
  if (nameEl) nameEl.textContent = currentUser.name;
  if (emailEl) emailEl.textContent = currentUser.email;
  if (avatarEl) avatarEl.textContent = currentUser.name.charAt(0).toUpperCase();
  const parts = currentUser.name.split(' ');
  const fn = document.getElementById('firstName');
  const ln = document.getElementById('lastName');
  const pe = document.getElementById('profileEmailInput');
  if (fn) fn.value = parts[0] || '';
  if (ln) ln.value = parts.slice(1).join(' ') || '';
  if (pe) pe.value = currentUser.email;
}

function showProfileTab(tab, btn) {
  document.querySelectorAll('.ptab').forEach(t => t.style.display = 'none');
  document.querySelectorAll('.pnav').forEach(b => b.classList.remove('active'));
  const el = document.getElementById(tab + 'Tab');
  if (el) el.style.display = 'flex';
  if (btn) btn.classList.add('active');
}

function saveProfile() {
  if (!currentUser) return;
  const fn = document.getElementById('firstName').value.trim();
  const ln = document.getElementById('lastName').value.trim();
  if (!fn) { showToast('First name is required', 'error'); return; }
  currentUser.name = `${fn} ${ln}`.trim();
  saveToStorage();
  updateUserMenu();
  displayProfile();
  showToast('Profile updated successfully! ✅', 'success');
}

/* ===== ORDERS ===== */
function displayOrders() {
  if (!currentUser) return;
  const userOrders = orders.filter(o => o.userId === currentUser.id);
  const container = document.getElementById('ordersList');
  if (!container) return;
  if (!userOrders.length) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">📦</div><h3>No orders yet</h3><p>Start shopping and your orders will appear here!</p><button class="btn-gold" onclick="goToAllProducts()">Shop Now</button></div>`;
    return;
  }
  const statusMap = { pending: 'status-pending', processing: 'status-processing', shipped: 'status-shipped', delivered: 'status-delivered' };
  container.innerHTML = userOrders.reverse().map(order => `
    <div class="order-card">
      <div class="order-head">
        <div><div class="order-id">${order.id}</div><div class="order-date">📅 ${order.date}</div></div>
        <span class="order-status-badge ${statusMap[order.status] || 'status-pending'}">${order.status.toUpperCase()}</span>
      </div>
      <div class="order-items-list">
        ${order.items.slice(0, 3).map(item => `
          <div class="order-item-row">
            <div class="order-item-img"><img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60/1a1a1a/C9A84C?text=T'"></div>
            <div><p class="order-item-name">${item.name}</p><p class="order-item-qty">Qty: ${item.quantity}</p></div>
          </div>`).join('')}
        ${order.items.length > 3 ? `<p style="color:var(--text-muted);font-size:12px">+${order.items.length - 3} more items</p>` : ''}
      </div>
      <div class="order-foot">
        <div><p class="order-total-lbl">Total Paid</p><p class="order-total-val">$${order.total.toFixed(2)}</p></div>
        <button class="reorder-btn" onclick="reorderWhatsApp(${JSON.stringify(order.id).replace(/"/g, "'")})">Reorder via WA 💬</button>
      </div>
    </div>`).join('');
}

function reorderWhatsApp(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  let msg = `Hello *${STORE_NAME}*! 👋\n\nI'd like to reorder from my previous order *${orderId}*:\n\n`;
  order.items.forEach((item, i) => {
    msg += `${i + 1}. *${item.name}* × ${item.quantity}\n`;
  });
  msg += `\nPlease confirm and arrange delivery. Thank you!`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ===== PASSWORD ===== */
function togglePass(id, btn) {
  const input = document.getElementById(id);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? '👁' : '🙈';
}

function checkPasswordStrength(val) {
  const bar = document.getElementById('pwStrength');
  if (!bar) return;
  let strength = 0;
  if (val.length >= 6) strength++;
  if (val.length >= 10) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;
  const colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
  const widths = ['0%', '20%', '40%', '60%', '80%', '100%'];
  bar.style.background = colors[strength] || 'var(--dark-4)';
  bar.style.width = widths[strength];
}

/* ===== BADGES ===== */
function updateBadges() {
  const cartTotal = cart.reduce((s, i) => s + i.quantity, 0);
  const cartBadge = document.getElementById('cartBadge');
  const wishlistBadge = document.getElementById('wishlistBadge');
  if (cartBadge) cartBadge.textContent = cartTotal;
  if (wishlistBadge) wishlistBadge.textContent = wishlist.length;
}

/* ===== TOAST ===== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('out');
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

/* ===== STORAGE ===== */
function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    // NOTE: USERS list is saved separately in handleSignup — never overwritten here
  } catch (e) {
    console.warn('Storage save error:', e);
  }
}
function loadFromStorage() {
  try {
    currentUser = JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || null;
    cart = JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
    wishlist = JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
    orders = JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
    // Users list is stored separately and never wiped
    const savedUsers = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!savedUsers) localStorage.setItem(STORAGE_KEYS.USERS, '[]');
  } catch (e) {
    cart = []; wishlist = []; orders = []; currentUser = null;
  }
}

/* ===== GLOBAL CLICK OUTSIDE ===== */
document.addEventListener('click', e => {
  const userMenu = document.getElementById('userMenu');
  const accountBtn = document.querySelector('.nav-btn:last-child');
  if (userMenu && !userMenu.contains(e.target) && accountBtn && !accountBtn.contains(e.target)) {
    userMenu.classList.remove('active');
  }
});

/* ===== KEYBOARD ===== */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    document.getElementById('userMenu').classList.remove('active');
  }
});