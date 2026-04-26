/* ================================================
   T SHOP — Responsive JavaScript
   Mobile-First Interactions & Responsive Features
   ================================================ */

// ===== STATE MANAGEMENT =====
let state = {
  currentPage: 'home',
  cart: [],
  wishlist: [],
  currentUser: null,
  products: [],
  filteredProducts: [],
  currentFilter: 'All',
  currentSort: 'featured',
  heroSlideIndex: 0,
  isMenuOpen: false,
  isMobileMenuOpen: false,
  isCartOpen: false,
  isUserMenuOpen: false,
};

// ===== SAMPLE PRODUCTS DATA =====
const sampleProducts = [
  { id: 1, name: 'Premium Wireless Headphones', category: 'Electronics', price: 199.99, originalPrice: 299.99, rating: 4.8, reviews: 245, image: 'https://via.placeholder.com/300x300?text=Headphones', badge: 'hot', description: 'High-quality sound with noise cancellation' },
  { id: 2, name: 'Luxury Watch', category: 'Fashion', price: 499.99, originalPrice: 699.99, rating: 4.9, reviews: 189, image: 'https://via.placeholder.com/300x300?text=Watch', badge: 'new', description: 'Swiss-made luxury timepiece' },
  { id: 3, name: 'Designer Sunglasses', category: 'Fashion', price: 249.99, originalPrice: 399.99, rating: 4.7, reviews: 156, image: 'https://via.placeholder.com/300x300?text=Sunglasses', badge: 'discount', description: 'UV protection with premium frames' },
  { id: 4, name: 'Smart Home Hub', category: 'Electronics', price: 129.99, originalPrice: 199.99, rating: 4.6, reviews: 312, image: 'https://via.placeholder.com/300x300?text=SmartHub', description: 'Control all your smart devices' },
  { id: 5, name: 'Premium Bedding Set', category: 'Home & Garden', price: 159.99, originalPrice: 249.99, rating: 4.8, reviews: 423, image: 'https://via.placeholder.com/300x300?text=Bedding', badge: 'hot', description: 'Luxurious Egyptian cotton' },
  { id: 6, name: 'Yoga Mat Premium', category: 'Sports', price: 79.99, originalPrice: 129.99, rating: 4.7, reviews: 267, image: 'https://via.placeholder.com/300x300?text=YogaMat', description: 'Non-slip eco-friendly material' },
  { id: 7, name: 'Coffee Table Book', category: 'Books', price: 49.99, originalPrice: 79.99, rating: 4.9, reviews: 134, image: 'https://via.placeholder.com/300x300?text=Book', badge: 'new', description: 'Stunning photography collection' },
  { id: 8, name: 'Luxury Perfume', category: 'Beauty', price: 89.99, originalPrice: 149.99, rating: 4.8, reviews: 298, image: 'https://via.placeholder.com/300x300?text=Perfume', description: 'Exotic fragrance blend' },
  { id: 9, name: 'Board Game Collection', category: 'Toys', price: 59.99, originalPrice: 99.99, rating: 4.6, reviews: 178, image: 'https://via.placeholder.com/300x300?text=BoardGame', description: 'Family entertainment set' },
  { id: 10, name: 'Gourmet Chocolate', category: 'Food', price: 39.99, originalPrice: 69.99, rating: 4.9, reviews: 456, image: 'https://via.placeholder.com/300x300?text=Chocolate', badge: 'hot', description: 'Artisanal Belgian chocolate' },
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  state.products = sampleProducts;
  state.filteredProducts = sampleProducts;
  
  loadFromLocalStorage();
  setupEventListeners();
  renderHomePage();
  setupParticleCanvas();
  hidePreloader();
  setupCustomCursor();
  updateBadges();
  
  // Responsive adjustments
  window.addEventListener('resize', handleWindowResize);
  handleWindowResize();
}

// ===== LOCAL STORAGE =====
function loadFromLocalStorage() {
  const savedCart = localStorage.getItem('tshop_cart');
  const savedWishlist = localStorage.getItem('tshop_wishlist');
  const savedUser = localStorage.getItem('tshop_user');
  
  if (savedCart) state.cart = JSON.parse(savedCart);
  if (savedWishlist) state.wishlist = JSON.parse(savedWishlist);
  if (savedUser) state.currentUser = JSON.parse(savedUser);
}

function saveToLocalStorage() {
  localStorage.setItem('tshop_cart', JSON.stringify(state.cart));
  localStorage.setItem('tshop_wishlist', JSON.stringify(state.wishlist));
  if (state.currentUser) localStorage.setItem('tshop_user', JSON.stringify(state.currentUser));
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Close modals on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  // Close menus on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu') && !e.target.closest('.nav-btn') && state.isUserMenuOpen) {
      toggleUserMenu();
    }
  });
}

// ===== RESPONSIVE HANDLING =====
function handleWindowResize() {
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  
  // Close mobile menu on resize to desktop
  if (!isMobile && state.isMobileMenuOpen) {
    toggleMobileMenu();
  }
  
  // Adjust sidebar visibility
  const sidebar = document.getElementById('sidebar');
  if (sidebar) {
    if (window.innerWidth < 1024) {
      sidebar.style.display = 'none';
    } else {
      sidebar.style.display = 'block';
    }
  }
}

// ===== PRELOADER =====
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 2000);
}

// ===== PARTICLE CANVAS =====
function setupParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particles = [];
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }
    
    draw() {
      ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== CUSTOM CURSOR =====
function setupCustomCursor() {
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  
  if (!cursorDot || !cursorRing) return;
  
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
    cursorRing.style.left = mouseX + 'px';
    cursorRing.style.top = mouseY + 'px';
  });
  
  // Add hover effect to interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.classList.contains('product-card')) {
      cursorRing.classList.add('hovered');
    }
  });
  
  document.addEventListener('mouseout', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.classList.contains('product-card')) {
      cursorRing.classList.remove('hovered');
    }
  });
}

// ===== NAVIGATION =====
function goHome() {
  state.currentPage = 'home';
  showPage('homePage');
  window.scrollTo(0, 0);
}

function goToAllProducts() {
  state.currentPage = 'allProducts';
  state.filteredProducts = state.products;
  renderAllProductsPage();
  showPage('allProductsPage');
  window.scrollTo(0, 0);
}

function goToProfile() {
  if (!state.currentUser) {
    openLoginModal();
    return;
  }
  state.currentPage = 'profile';
  renderProfilePage();
  showPage('profilePage');
  window.scrollTo(0, 0);
  toggleUserMenu();
}

function goToOrders() {
  if (!state.currentUser) {
    openLoginModal();
    return;
  }
  state.currentPage = 'orders';
  renderOrdersPage();
  showPage('ordersPage');
  window.scrollTo(0, 0);
  toggleUserMenu();
}

function goToCart() {
  state.currentPage = 'cart';
  renderCartPage();
  showPage('cartPage');
  window.scrollTo(0, 0);
  toggleCart();
}

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
  });
  document.getElementById(pageId).style.display = 'block';
}

// ===== HAMBURGER MENU =====
function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  
  state.isMobileMenuOpen = !state.isMobileMenuOpen;
  
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  document.body.style.overflow = state.isMobileMenuOpen ? 'hidden' : 'auto';
}

// ===== USER MENU =====
function toggleUserMenu() {
  const userMenu = document.getElementById('userMenu');
  state.isUserMenuOpen = !state.isUserMenuOpen;
  userMenu.classList.toggle('active');
}

function updateUserMenu() {
  const userMenuGuest = document.getElementById('userMenuGuest');
  const userMenuLoggedIn = document.getElementById('userMenuLoggedIn');
  
  if (state.currentUser) {
    userMenuGuest.style.display = 'none';
    userMenuLoggedIn.style.display = 'block';
    
    document.getElementById('userDisplayName').textContent = state.currentUser.name;
    document.getElementById('userDisplayEmail').textContent = state.currentUser.email;
    document.getElementById('userAvatarSm').textContent = state.currentUser.name.charAt(0).toUpperCase();
  } else {
    userMenuGuest.style.display = 'block';
    userMenuLoggedIn.style.display = 'none';
  }
}

// ===== MODALS =====
function openLoginModal() {
  document.getElementById('loginModal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
}

function openSignupModal() {
  closeAllModals();
  document.getElementById('signupModal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  document.getElementById('modalOverlay').classList.remove('active');
}

// ===== AUTHENTICATION =====
function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  if (email && password) {
    state.currentUser = {
      id: Math.random(),
      name: email.split('@')[0],
      email: email,
      joinDate: new Date().toLocaleDateString()
    };
    
    saveToLocalStorage();
    updateUserMenu();
    closeAllModals();
    
    showNotification('Welcome back! 👋', 'success');
  }
}

function handleSignup(e) {
  e.preventDefault();
  
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  
  if (password !== confirm) {
    showNotification('Passwords do not match!', 'error');
    return;
  }
  
  if (name && email && password) {
    state.currentUser = {
      id: Math.random(),
      name: name,
      email: email,
      joinDate: new Date().toLocaleDateString()
    };
    
    saveToLocalStorage();
    updateUserMenu();
    closeAllModals();
    
    showNotification('Account created successfully! ✨', 'success');
  }
}

function logout() {
  state.currentUser = null;
  state.cart = [];
  state.wishlist = [];
  localStorage.removeItem('tshop_user');
  localStorage.removeItem('tshop_cart');
  localStorage.removeItem('tshop_wishlist');
  
  updateUserMenu();
  updateBadges();
  goHome();
  toggleUserMenu();
  
  showNotification('You have been logged out', 'info');
}

// ===== SEARCH & FILTER =====
function performSearch() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  
  if (!searchTerm) {
    state.filteredProducts = state.products;
  } else {
    state.filteredProducts = state.products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  goToAllProducts();
}

function filterByCategory(category) {
  state.currentFilter = category;
  
  if (category === 'All') {
    state.filteredProducts = state.products;
  } else {
    state.filteredProducts = state.products.filter(p => p.category === category);
  }
  
  goToAllProducts();
}

function filterByPrice() {
  const maxPrice = document.getElementById('priceRange').value;
  document.getElementById('priceValue').textContent = maxPrice;
  
  state.filteredProducts = state.products.filter(p => p.price <= maxPrice);
  renderAllProductsPage();
}

function filterByRating(minRating) {
  if (minRating === 0) {
    state.filteredProducts = state.products;
  } else {
    state.filteredProducts = state.products.filter(p => p.rating >= minRating);
  }
  
  renderAllProductsPage();
}

function sortProducts() {
  const sortValue = document.getElementById('sortSelect').value;
  state.currentSort = sortValue;
  
  const sorted = [...state.filteredProducts];
  
  switch (sortValue) {
    case 'price-low':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      sorted.reverse();
      break;
    default:
      break;
  }
  
  state.filteredProducts = sorted;
  renderAllProductsPage();
}

// ===== CART MANAGEMENT =====
function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  state.isCartOpen = !state.isCartOpen;
  cartSidebar.classList.toggle('active');
  
  if (state.isCartOpen) {
    renderCartSidebar();
  }
}

function addToCart(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  
  const existingItem = state.cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    state.cart.push({
      ...product,
      quantity: quantity
    });
  }
  
  saveToLocalStorage();
  updateBadges();
  renderCartSidebar();
  
  showNotification(`${product.name} added to cart! 🛒`, 'success');
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveToLocalStorage();
  updateBadges();
  renderCartSidebar();
  renderCartPage();
}

function updateCartQuantity(productId, quantity) {
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveToLocalStorage();
    updateBadges();
    renderCartSidebar();
    renderCartPage();
  }
}

// ===== WISHLIST MANAGEMENT =====
function toggleWishlist(productId = null) {
  if (productId !== null) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;
    
    const isInWishlist = state.wishlist.some(item => item.id === productId);
    
    if (isInWishlist) {
      state.wishlist = state.wishlist.filter(item => item.id !== productId);
      showNotification('Removed from wishlist ❌', 'info');
    } else {
      state.wishlist.push(product);
      showNotification('Added to wishlist ❤️', 'success');
    }
    
    saveToLocalStorage();
    updateBadges();
  } else {
    state.currentPage = 'wishlist';
    renderWishlistPage();
    showPage('wishlistPage');
    window.scrollTo(0, 0);
  }
}

// ===== HERO SLIDER =====
function slideHero(direction) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  
  slides[state.heroSlideIndex].classList.remove('active');
  if (dots[state.heroSlideIndex]) dots[state.heroSlideIndex].classList.remove('active');
  
  state.heroSlideIndex = (state.heroSlideIndex + direction + slides.length) % slides.length;
  
  slides[state.heroSlideIndex].classList.add('active');
  if (dots[state.heroSlideIndex]) dots[state.heroSlideIndex].classList.add('active');
}

// ===== RENDERING FUNCTIONS =====
function renderHomePage() {
  renderFeaturedProducts();
  renderFlashSaleProducts();
  renderHotDealsProducts();
  renderNewArrivalsProducts();
  setupHeroDots();
  startFlashTimer();
}

function setupHeroDots() {
  const heroDots = document.getElementById('heroDots');
  const slides = document.querySelectorAll('.hero-slide');
  
  heroDots.innerHTML = '';
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
    dot.onclick = () => {
      const direction = index - state.heroSlideIndex;
      slideHero(direction);
    };
    heroDots.appendChild(dot);
  });
}

function renderFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  const featured = state.products.slice(0, 4);
  container.innerHTML = featured.map(p => createProductCard(p)).join('');
}

function renderFlashSaleProducts() {
  const container = document.getElementById('flashSaleProducts');
  const flashSale = state.products.filter(p => p.badge === 'hot').slice(0, 4);
  container.innerHTML = flashSale.map(p => createProductCard(p)).join('');
}

function renderHotDealsProducts() {
  const container = document.getElementById('hotDealsProducts');
  const hotDeals = state.products.filter(p => p.badge === 'discount').slice(0, 4);
  container.innerHTML = hotDeals.map(p => createProductCard(p)).join('');
}

function renderNewArrivalsProducts() {
  const container = document.getElementById('newArrivalsProducts');
  const newArrivals = state.products.filter(p => p.badge === 'new').slice(0, 4);
  container.innerHTML = newArrivals.map(p => createProductCard(p)).join('');
}

function renderAllProductsPage() {
  const container = document.getElementById('allProductsGrid');
  container.innerHTML = state.filteredProducts.map(p => createProductCard(p)).join('');
}

function renderWishlistPage() {
  const container = document.getElementById('wishlistGrid');
  const emptyState = document.getElementById('emptyWishlist');
  
  if (state.wishlist.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    container.innerHTML = state.wishlist.map(p => createProductCard(p)).join('');
    emptyState.style.display = 'none';
  }
}

function renderCartPage() {
  const container = document.getElementById('cartItems');
  const emptyState = document.getElementById('emptyCart');
  
  if (state.cart.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    container.innerHTML = state.cart.map(item => `
      <div class="cart-item-full">
        <div class="cart-item-full-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-full-info">
          <div class="cart-item-full-name">${item.name}</div>
          <div class="cart-item-full-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-full-controls">
            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <input type="number" class="quantity-input" value="${item.quantity}" onchange="updateCartQuantity(${item.id}, this.value)">
            <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑️</button>
          </div>
        </div>
      </div>
    `).join('');
    emptyState.style.display = 'none';
  }
  
  updateCartSummary();
}

function renderCartSidebar() {
  const container = document.getElementById('cartSidebarItems');
  
  if (state.cart.length === 0) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-muted); padding: 20px;">Your cart is empty</p>';
  } else {
    container.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">Qty: ${item.quantity}</div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `).join('');
  }
  
  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cartSidebarTotal').textContent = '$' + total.toFixed(2);
}

function renderProfilePage() {
  const container = document.getElementById('profileInfo');
  
  if (!state.currentUser) {
    container.innerHTML = '<p>Please log in to view your profile</p>';
    return;
  }
  
  container.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="width: 80px; height: 80px; background: var(--gold-gradient); border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: var(--black);">
        ${state.currentUser.name.charAt(0).toUpperCase()}
      </div>
      <h3>${state.currentUser.name}</h3>
      <p style="color: var(--text-muted);">${state.currentUser.email}</p>
      <p style="color: var(--text-faint); font-size: 12px;">Member since ${state.currentUser.joinDate}</p>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 24px;">
      <div style="background: var(--dark-3); padding: 16px; border-radius: var(--radius-lg); text-align: center;">
        <div style="font-size: 24px; font-weight: 700; color: var(--gold);">${state.cart.length}</div>
        <div style="font-size: 12px; color: var(--text-muted);">Items in Cart</div>
      </div>
      <div style="background: var(--dark-3); padding: 16px; border-radius: var(--radius-lg); text-align: center;">
        <div style="font-size: 24px; font-weight: 700; color: var(--gold);">${state.wishlist.length}</div>
        <div style="font-size: 12px; color: var(--text-muted);">Wishlist Items</div>
      </div>
    </div>
  `;
}

function renderOrdersPage() {
  const container = document.getElementById('ordersContainer');
  
  // Sample orders
  const orders = [
    { id: 'ORD-001', date: '2024-01-15', total: 499.99, status: 'Delivered', items: 3 },
    { id: 'ORD-002', date: '2024-01-10', total: 299.99, status: 'Shipped', items: 2 },
    { id: 'ORD-003', date: '2024-01-05', total: 199.99, status: 'Processing', items: 1 },
  ];
  
  container.innerHTML = orders.map(order => `
    <div class="order-card">
      <div class="order-header">
        <div>
          <div class="order-id">${order.id}</div>
          <div style="font-size: 12px; color: var(--text-muted);">${order.date}</div>
        </div>
        <div class="order-status">${order.status}</div>
      </div>
      <div class="order-items">${order.items} item(s)</div>
      <div class="order-total">Total: $${order.total.toFixed(2)}</div>
    </div>
  `).join('');
}

function createProductCard(product) {
  const inWishlist = state.wishlist.some(item => item.id === product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  return `
    <div class="product-card" onclick="openProductModal(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        <div class="product-badges">
          ${product.badge === 'new' ? '<div class="badge-new">NEW</div>' : ''}
          ${product.badge === 'hot' ? '<div class="badge-hot">HOT</div>' : ''}
          ${discount > 0 ? `<div class="badge-discount">-${discount}%</div>` : ''}
        </div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
        <div class="product-rating">
          <span>⭐ ${product.rating}</span>
          <span style="color: var(--text-faint);">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
        </div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">Add Cart</button>
          <button class="btn-wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id})" style="color: ${inWishlist ? 'var(--gold)' : 'inherit'}">
            ${inWishlist ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  
  const inWishlist = state.wishlist.some(item => item.id === product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  const modalBody = document.getElementById('productModalBody');
  modalBody.innerHTML = `
    <div class="product-modal-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-modal-info">
      <h3>${product.name}</h3>
      <div class="product-rating">
        <span>⭐ ${product.rating}</span>
        <span style="color: var(--text-muted);">(${product.reviews} reviews)</span>
      </div>
      <div class="product-price">
        <span class="price-current">$${product.price.toFixed(2)}</span>
        <span class="price-original">$${product.originalPrice.toFixed(2)}</span>
      </div>
      <p>${product.description}</p>
      <select style="width: 100%; margin-bottom: 12px;">
        <option>Select Color</option>
        <option>Black</option>
        <option>Gold</option>
        <option>Silver</option>
      </select>
      <div class="quantity-selector">
        <button class="quantity-btn" onclick="updateModalQuantity(-1)">−</button>
        <input type="number" class="quantity-input" id="modalQuantity" value="1" min="1">
        <button class="quantity-btn" onclick="updateModalQuantity(1)">+</button>
      </div>
      <div class="product-modal-actions">
        <button class="btn-gold" onclick="addToCart(${product.id}, parseInt(document.getElementById('modalQuantity').value)); closeAllModals();">Add to Cart</button>
        <button class="btn-outline" onclick="toggleWishlist(${product.id}); event.target.style.color = state.wishlist.some(i => i.id === ${product.id}) ? 'var(--gold)' : 'inherit';" style="color: ${inWishlist ? 'var(--gold)' : 'inherit'}">
          ${inWishlist ? '❤️ Wishlisted' : '🤍 Wishlist'}
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('productModal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
}

function updateModalQuantity(delta) {
  const input = document.getElementById('modalQuantity');
  input.value = Math.max(1, parseInt(input.value) + delta);
}

function updateCartSummary() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  
  document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
  document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
  document.getElementById('tax').textContent = '$' + tax.toFixed(2);
  document.getElementById('total').textContent = '$' + total.toFixed(2);
}

function proceedToCheckout() {
  if (state.cart.length === 0) {
    showNotification('Your cart is empty', 'error');
    return;
  }
  
  if (!state.currentUser) {
    showNotification('Please log in to checkout', 'error');
    openLoginModal();
    return;
  }
  
  state.currentPage = 'checkout';
  showPage('checkoutPage');
  window.scrollTo(0, 0);
  toggleCart();
}

function completeOrder(e) {
  e.preventDefault();
  
  showNotification('Order placed successfully! 🎉', 'success');
  state.cart = [];
  saveToLocalStorage();
  updateBadges();
  
  setTimeout(() => {
    goHome();
  }, 1500);
}

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== FLASH TIMER =====
function startFlashTimer() {
  const timerDisplay = document.getElementById('timerDisplay');
  if (!timerDisplay) return;
  
  setInterval(() => {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59);
    
    const diff = endOfDay - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000);
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  
  if (!email) {
    showNotification('Please enter an email address', 'error');
    return;
  }
  
  showNotification('Thank you for subscribing! 📧', 'success');
  document.getElementById('newsletterEmail').value = '';
}

// ===== UTILITIES =====
function updateBadges() {
  document.getElementById('cartBadge').textContent = state.cart.length;
  document.getElementById('wishlistBadge').textContent = state.wishlist.length;
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 16px 24px;
    background: ${type === 'success' ? '#2E7D32' : type === 'error' ? '#C62828' : '#0277BD'};
    color: white;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}