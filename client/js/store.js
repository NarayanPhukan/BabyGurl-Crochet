/**
 * BABYGURL CROCHET — STOREFRONT INTERACTION ENGINE
 * Standalone handmade ecommerce interactions, cart drawer, custom orders, wishlist.
 */

// Product Catalog Data
const PRODUCTS = [
  {
    id: 'crochet-tulip-bouquet',
    title: 'Crochet Tulip Bouquet',
    subtitle: 'Hand-wrapped in rustic kraft & twine',
    category: 'Flowers',
    categoryLabel: 'Crochet Flowers',
    price: 42.00,
    originalPrice: 48.00,
    badge: 'Bestseller',
    badgeType: 'badge-rose',
    image: 'assets/images/tulips.jpg',
    leadTime: 'Crafted in 2-3 days',
    yarn: '100% Combed Milk Cotton',
    hookSize: '2.25mm Ergonomic Bamboo',
    rating: 5.0,
    reviewsCount: 68,
    description: 'A charming trio of hand-sculpted crochet tulips in soft dusty rose, cream, and blush peach. Gently swaddled in natural kraft paper with jute twine and a wooden keepsake tag.',
    options: ['Dusty Rose & Cream', 'Sunset Peach & Cream', 'Custom Trio']
  },
  {
    id: 'mini-crochet-bear',
    title: 'Mini Crochet Bear',
    subtitle: 'In honey caramel yarn with cream bow tie',
    category: 'Amigurumi',
    categoryLabel: 'Amigurumi',
    price: 38.00,
    originalPrice: null,
    badge: 'Customer Favorite',
    badgeType: 'badge-gold',
    image: 'assets/images/bear.jpg',
    leadTime: 'Crafted in 3-5 days',
    yarn: 'Super-soft Organic Baby Cotton',
    hookSize: '2.0mm Clover Micro',
    rating: 4.9,
    reviewsCount: 52,
    description: 'An adorable pocket-sized crochet teddy bear hand-stitched in warm honey caramel cotton yarn. Finished with a tiny hand-crocheted cream bow tie and heirloom details.',
    options: ['Honey Caramel Bear', 'Warm Oatmeal Bear', 'Cocoa Brown Bear']
  },
  {
    id: 'crochet-sunflower',
    title: 'Crochet Sunflower',
    subtitle: 'Golden petals with spiral textured center',
    category: 'Home Decor',
    categoryLabel: 'Home Decor',
    price: 36.00,
    originalPrice: null,
    badge: 'Everlasting Stem',
    badgeType: 'badge-sage',
    image: 'assets/images/sunflower.jpg',
    leadTime: 'Ready to ship',
    yarn: 'Mercerized Cotton & Botanical Wire',
    hookSize: '2.5mm Tulip Etimo Gold',
    rating: 5.0,
    reviewsCount: 45,
    description: 'A vibrant, everlasting crochet sunflower with rich warm brown spiral center and golden honey petals. Perfect for brightening up windowsills and workbenches with zero care needed.',
    options: ['Single Long Stem (12")', 'Pair with Ceramic Bud Vase', 'Mini Posy (3 Stems)']
  },
  {
    id: 'flower-keychain',
    title: 'Flower Keychain',
    subtitle: 'Antique brass clip with crochet petals',
    category: 'Accessories',
    categoryLabel: 'Accessories',
    price: 18.00,
    originalPrice: null,
    badge: 'Handy Keepsake',
    badgeType: 'badge-linen',
    image: 'assets/images/keychain.jpg',
    leadTime: 'Ready to ship',
    yarn: 'Fine 5-ply Combed Cotton',
    hookSize: '1.75mm Lace Hook',
    rating: 4.9,
    reviewsCount: 89,
    description: 'A delicate layered crochet daisy charm with cream and blush petals, paired with an antique brass swivel lobster clasp. Lightweight, tactile, and sweet for keys or bag handles.',
    options: ['Blush & Cream Daisy', 'Muted Rose Blossom', 'Golden Honey Bud']
  },
  {
    id: 'crochet-daisy-bag',
    title: 'Crochet Daisy Bag',
    subtitle: 'Floral granny square shoulder tote',
    category: 'Bags',
    categoryLabel: 'Bags',
    price: 76.00,
    originalPrice: 88.00,
    badge: 'Studio Signature',
    badgeType: 'badge-rose',
    image: 'assets/images/tote.jpg',
    leadTime: 'Crafted in 5-7 days',
    yarn: 'Sturdy Mercerized Cotton Blend',
    hookSize: '3.5mm Ergonomic Hook',
    rating: 5.0,
    reviewsCount: 34,
    description: 'Our iconic shoulder tote assembled from 13 dimensional flower granny squares in cream, soft blush, and muted honey gold. Fully lined with unbleached organic cotton canvas.',
    options: ['Meadow Rose Palette', 'Vintage Honey & Cream', 'Sage & Blossom']
  },
  {
    id: 'mini-mushroom-plushie',
    title: 'Mini Mushroom Plushie',
    subtitle: 'Dusty rose cap with raised cream spots',
    category: 'Amigurumi',
    categoryLabel: 'Amigurumi',
    price: 28.00,
    originalPrice: null,
    badge: 'Whimsical Pick',
    badgeType: 'badge-gold',
    image: 'assets/images/mushroom.jpg',
    leadTime: 'Crafted in 2-3 days',
    yarn: 'Hypoallergenic Combed Cotton',
    hookSize: '2.0mm Micro Hook',
    rating: 4.8,
    reviewsCount: 41,
    description: 'A cozy miniature toadstool plushie amigurumi with a gentle dusty rose cap, delicate raised cream dots, and a chubby cream stem. Sits comfortably on desks and shelves.',
    options: ['Dusty Rose Toadstool', 'Honey Ochre Cap', 'Muted Sage Cap']
  },
  {
    id: 'sweet-blush-bouquet',
    title: 'The Sweet Blush Bouquet',
    subtitle: 'Hand-tied with raw edge cream linen',
    category: 'Gift Sets',
    categoryLabel: 'Gift Sets',
    price: 68.00,
    originalPrice: 78.00,
    badge: 'Heirloom Bundle',
    badgeType: 'badge-rose',
    image: 'assets/images/bouquet.jpg',
    leadTime: 'Crafted in 3-5 days',
    yarn: '100% Combed Milk Cotton & Linen',
    hookSize: '2.5mm Tulip Etimo Gold',
    rating: 4.9,
    reviewsCount: 42,
    description: 'A breathtaking bouquet of everlasting blooms featuring dusty pink heirloom roses, cheerful cream daisies, and fragrant lavender sprigs. Hand-stitched petal by petal.',
    options: ['Classic Blush & Daisy', 'Muted Rose Romance', 'Sunlit Meadow Pastels']
  },
  {
    id: 'hazel-bunny-plushie',
    title: 'Hazel the Heirloom Bunny',
    subtitle: 'With dusty rose overalls & wooden buttons',
    category: 'Amigurumi',
    categoryLabel: 'Amigurumi',
    price: 54.00,
    originalPrice: null,
    badge: 'Handmade to Order',
    badgeType: 'badge-gold',
    image: 'assets/images/bunny.jpg',
    leadTime: 'Crafted in 5-7 days',
    yarn: 'Super-soft Organic Baby Cotton',
    hookSize: '2.25mm Clover Soft Touch',
    rating: 5.0,
    reviewsCount: 38,
    description: 'Hazel is a lovingly crafted floppy-eared bunny with custom knit overalls in dusty rose, fastened with two tiny natural wooden buttons. Stuffed with hypoallergenic organic cloud fiberfill.',
    options: ['Dusty Rose Overalls', 'Oatmeal Tweed Overalls', 'Sage Green Overalls']
  }
];

// App State
const state = {
  cart: [
    {
      productId: 'sweet-blush-bouquet',
      title: 'The Sweet Blush Bouquet',
      variant: 'Classic Blush & Daisy',
      price: 68.00,
      quantity: 1,
      image: 'assets/images/bouquet.jpg'
    }
  ],
  wishlist: new Set(['sweet-blush-bouquet', 'hazel-bunny-plushie']),
  currentCategory: 'All',
  freeShippingThreshold: 75.00
};

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initCart();
  renderProducts();
  renderWishlist();
  setupEventListeners();
  updateCartBadge();
});

// Simple View Routing
function initRouter() {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateTo(hash, false);

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '') || 'home';
    navigateTo(newHash, false);
  });
}

function navigateTo(viewName, updateHash = true) {
  if (updateHash) {
    window.location.hash = viewName;
  }

  // Handle parameterized routes like "product?id=xxx"
  let cleanView = viewName;
  let paramId = null;

  if (viewName.startsWith('product/')) {
    cleanView = 'product';
    paramId = viewName.split('/')[1];
  }

  const views = document.querySelectorAll('.view-container');
  views.forEach(view => {
    if (view.id === `view-${cleanView}`) {
      view.style.display = 'block';
    } else {
      view.style.display = 'none';
    }
  });

  // Update nav links active state
  document.querySelectorAll('.nav-link, .mobile-bottom-item').forEach(link => {
    const target = link.getAttribute('data-nav');
    if (target === cleanView || (cleanView === 'product' && target === 'shop')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  if (cleanView === 'product' && paramId) {
    loadProductDetail(paramId);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Products Grid in Home & Shop views
function renderProducts(category = 'All') {
  const container = document.getElementById('products-grid');
  const shopContainer = document.getElementById('shop-products-grid');
  
  const filtered = category === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === category);

  const html = filtered.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-media">
        <span class="badge ${product.badgeType} product-card-badge">${product.badge}</span>
        <button class="product-card-wishlist ${state.wishlist.has(product.id) ? 'active' : ''}" 
                data-wishlist-id="${product.id}" 
                aria-label="Save ${product.title} to wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${state.wishlist.has(product.id) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
        <img class="product-card-img" src="${product.image}" alt="${product.title}" loading="lazy">
        <div class="product-card-quickview">
          <button class="btn btn-secondary btn-sm" style="width: 100%;" onclick="openProductQuickview('${product.id}')">
            Quick Look
          </button>
        </div>
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.categoryLabel}</div>
        <h3 class="product-card-title">
          <a href="product-details.html">${product.title}</a>
        </h3>
        <div class="product-card-yarn-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>
          <span>${product.yarn}</span>
        </div>
        <div class="product-card-footer">
          <div class="product-card-price">
            $${product.price.toFixed(2)}
            ${product.originalPrice ? `<span class="product-card-price-original">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="btn btn-primary btn-sm" onclick="quickAddToCart('${product.id}')">
            Add to Basket
          </button>
        </div>
      </div>
    </article>
  `).join('');

  if (container) container.innerHTML = html;
  if (shopContainer) shopContainer.innerHTML = html;
}

// Product Detail View
function loadProductDetail(productId) {
  const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
  const container = document.getElementById('view-product');
  if (!container) return;

  container.innerHTML = `
    <div class="container" style="padding-top: var(--space-xl);">
      <nav aria-label="Breadcrumb" style="margin-bottom: var(--space-lg); font-size: var(--text-xs); color: var(--color-dark-muted);">
        <a href="#home">Home</a> &nbsp;/&nbsp; <a href="#shop">Shop</a> &nbsp;/&nbsp; <span>${product.title}</span>
      </nav>

      <div class="pdp-grid">
        <div class="pdp-gallery">
          <div class="pdp-main-image">
            <img id="pdp-current-img" src="${product.image}" alt="${product.title}">
          </div>
          <div class="pdp-thumbnails">
            <div class="pdp-thumb active" onclick="setMainImage('${product.image}', this)">
              <img src="${product.image}" alt="Primary view">
            </div>
            <div class="pdp-thumb" onclick="setMainImage('assets/images/tulips.jpg', this)">
              <img src="assets/images/tulips.jpg" alt="Detail view">
            </div>
            <div class="pdp-thumb" onclick="setMainImage('assets/images/bouquet.jpg', this)">
              <img src="assets/images/bouquet.jpg" alt="Packaging view">
            </div>
          </div>
        </div>

        <div class="pdp-info">
          <div>
            <span class="badge ${product.badgeType}" style="margin-bottom: 8px;">${product.badge}</span>
            <h1 class="heading-1">${product.title}</h1>
            <p class="subheading-editorial">${product.subtitle}</p>
          </div>

          <div style="display: flex; align-items: center; gap: 12px; margin-top: -6px;">
            <div style="color: var(--color-accent); font-size: 0.95rem;">★★★★★</div>
            <span class="text-subtle">${product.rating} (${product.reviewsCount} customer love notes)</span>
          </div>

          <div style="font-size: var(--text-2xl); font-weight: var(--weight-bold); color: var(--color-dark);">
            $${product.price.toFixed(2)}
            ${product.originalPrice ? `<span class="product-card-price-original" style="font-size: var(--text-lg);">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>

          <p class="body-lead">${product.description}</p>

          <div class="pdp-specs-table">
            <div class="pdp-spec-item">
              <span class="pdp-spec-label">Artisan Material</span>
              <span class="pdp-spec-val">${product.yarn}</span>
            </div>
            <div class="pdp-spec-item">
              <span class="pdp-spec-label">Crochet Gauge</span>
              <span class="pdp-spec-val">${product.hookSize}</span>
            </div>
            <div class="pdp-spec-item">
              <span class="pdp-spec-label">Making Time</span>
              <span class="pdp-spec-val">${product.leadTime}</span>
            </div>
            <div class="pdp-spec-item">
              <span class="pdp-spec-label">Unboxing</span>
              <span class="pdp-spec-val">Tissue, ribbon & care card</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Select Colorway / Variant</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              ${product.options.map((opt, i) => `
                <button type="button" class="btn btn-secondary btn-sm variant-pill ${i === 0 ? 'active' : ''}" 
                        onclick="selectVariant(this, '${opt}')">
                  ${opt}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="pdp-gift-note">Free Handwritten Gift Tag Note (Optional)</label>
            <input type="text" id="pdp-gift-note" class="form-input" placeholder="e.g. Happy 25th Birthday Chloe! Love, Maya ♡">
          </div>

          <div style="display: flex; gap: 12px; align-items: center; margin-top: var(--space-xs);">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="adjustPdpQty(-1)">−</button>
              <span id="pdp-qty" class="qty-value">1</span>
              <button class="qty-btn" onclick="adjustPdpQty(1)">+</button>
            </div>
            <button class="btn btn-primary btn-lg" style="flex-grow: 1;" onclick="addPdpToCart('${product.id}')">
              Add to Basket • $${product.price.toFixed(2)}
            </button>
            <button class="btn-icon" onclick="toggleWishlist('${product.id}')" aria-label="Save to Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${state.wishlist.has(product.id) ? 'var(--color-primary)' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>

          <div style="margin-top: var(--space-lg); border-top: 1px solid var(--border-card); padding-top: var(--space-md);">
            <details class="accordion-item" open>
              <summary>
                <span>Crochet Care & Longevity</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </summary>
              <div class="accordion-content">
                To keep your crochet flowers and keepsakes looking vibrant forever, keep them away from prolonged direct harsh sunlight to preserve yarn dye. Dust lightly with a soft makeup brush or gentle hairdryer on cool setting. Never machine wash blooms.
              </div>
            </details>
            <details class="accordion-item">
              <summary>
                <span>Packaging & Heirloom Unboxing</span>
                <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
              </summary>
              <div class="accordion-content">
                Every BabyGurl Crochet order arrives ready for gifting. Hand-swaddled in crinkled botanical tissue paper, tied with raw-edge cream linen ribbon, and finished with a stamped wooden heart tag.
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setMainImage(src, thumbEl) {
  const main = document.getElementById('pdp-current-img');
  if (main) main.src = src;
  document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
  if (thumbEl) thumbEl.classList.add('active');
}

let pdpSelectedVariant = '';
function selectVariant(btn, variant) {
  document.querySelectorAll('.variant-pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  pdpSelectedVariant = variant;
}

let pdpQuantity = 1;
function adjustPdpQty(delta) {
  pdpQuantity = Math.max(1, pdpQuantity + delta);
  const qtyEl = document.getElementById('pdp-qty');
  if (qtyEl) qtyEl.textContent = pdpQuantity;
}

function addPdpToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const variant = pdpSelectedVariant || product.options[0];
  addToCart(product, pdpQuantity, variant);
  openCartDrawer();
  showToast(`Added ${product.title} to your basket 🌸`);
}

function quickAddToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, 1, product.options[0]);
  openCartDrawer();
  showToast(`Added ${product.title} to your basket 🌸`);
}

// Cart Management
function initCart() {
  renderCart();
}

function addToCart(product, quantity = 1, variant = '') {
  const existing = state.cart.find(item => item.productId === product.id && item.variant === variant);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      productId: product.id,
      title: product.title,
      variant: variant || (product.options ? product.options[0] : 'Handmade Bespoke'),
      price: product.price,
      quantity: quantity,
      image: product.image
    });
  }
  updateCartBadge();
  renderCart();
}

function updateCartQuantity(index, delta) {
  if (state.cart[index]) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
      state.cart.splice(index, 1);
    }
  }
  updateCartBadge();
  renderCart();
}

function removeFromCart(index) {
  state.cart.splice(index, 1);
  updateCartBadge();
  renderCart();
  showToast("Item removed from basket");
}

function getSubtotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateCartBadge() {
  const count = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge-count').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderCart() {
  const cartList = document.getElementById('cart-items-container');
  const cartSubtotal = document.getElementById('cart-subtotal-val');
  const shippingMeterText = document.getElementById('shipping-meter-text');
  const shippingMeterBar = document.getElementById('shipping-meter-bar');

  if (!cartList) return;

  const subtotal = getSubtotal();
  if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

  // Shipping meter logic
  if (shippingMeterText && shippingMeterBar) {
    const diff = state.freeShippingThreshold - subtotal;
    if (diff <= 0) {
      shippingMeterText.innerHTML = `<span>🎉 You unlocked <strong>Free Studio Gift Wrap & Shipping!</strong></span>`;
      shippingMeterBar.style.width = '100%';
    } else {
      const pct = Math.min(100, Math.round((subtotal / state.freeShippingThreshold) * 100));
      shippingMeterText.innerHTML = `<span>Add <strong>$${diff.toFixed(2)}</strong> for Free Studio Gift Wrap</span> <span>${pct}%</span>`;
      shippingMeterBar.style.width = `${pct}%`;
    }
  }

  if (state.cart.length === 0) {
    cartList.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: var(--color-dark-muted);">
        <svg style="margin: 0 auto 16px; color: var(--color-secondary-border);" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
        <p class="font-editorial" style="font-size: var(--text-lg); margin-bottom: 6px;">Your basket is empty</p>
        <p class="text-subtle" style="margin-bottom: 20px;">Discover cozy handmade pieces crafted with love.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCartDrawer(); navigateTo('shop');">
          Explore Shop
        </button>
      </div>
    `;
    return;
  }

  cartList.innerHTML = state.cart.map((item, index) => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-variant">${item.variant}</span>
        <div class="cart-item-footer">
          <div class="qty-stepper" style="padding: 2px;">
            <button class="qty-btn" style="width: 24px; height: 24px;" onclick="updateCartQuantity(${index}, -1)">−</button>
            <span class="qty-value" style="font-size: 0.8rem; min-width: 24px;">${item.quantity}</span>
            <button class="qty-btn" style="width: 24px; height: 24px;" onclick="updateCartQuantity(${index}, 1)">+</button>
          </div>
          <span style="font-weight: var(--weight-semibold); font-size: var(--text-sm);">$${(item.price * item.quantity).toFixed(2)}</span>
          <button style="color: var(--color-dark-subtle); font-size: 0.75rem; text-decoration: underline;" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Drawer Controls (Native <dialog>)
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && !drawer.open) {
    drawer.showModal();
  }
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && drawer.open) {
    drawer.close();
  }
}

// Quick View Modal
function openProductQuickview(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const modal = document.getElementById('quickview-modal');
  const body = document.getElementById('quickview-body');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
      <div style="border-radius: var(--radius-lg); overflow: hidden; background: var(--bg-surface-warm);">
        <img src="${product.image}" alt="${product.title}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span class="badge ${product.badgeType}" style="margin-bottom: 8px;">${product.badge}</span>
        <h3 class="heading-2" style="margin-bottom: 6px;">${product.title}</h3>
        <p class="subheading-editorial" style="margin-bottom: 12px;">${product.subtitle}</p>
        <div style="font-size: var(--text-xl); font-weight: var(--weight-bold); margin-bottom: 12px;">
          $${product.price.toFixed(2)}
        </div>
        <p style="font-size: var(--text-sm); color: var(--color-dark-muted); line-height: var(--leading-relaxed); margin-bottom: 16px;">
          ${product.description}
        </p>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary" onclick="quickAddToCart('${product.id}'); document.getElementById('quickview-modal').close();">
            Add to Basket
          </button>
          <a href="#product/${product.id}" class="btn btn-secondary" onclick="document.getElementById('quickview-modal').close();">
            Full Details
          </a>
        </div>
      </div>
    </div>
  `;

  modal.showModal();
}

// Wishlist Functionality
function toggleWishlist(productId) {
  if (state.wishlist.has(productId)) {
    state.wishlist.delete(productId);
    showToast("Removed from wishlist ♡");
  } else {
    state.wishlist.add(productId);
    showToast("Saved to your wishlist ♥");
  }
  renderProducts();
  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById('wishlist-products-grid');
  if (!container) return;

  const savedProducts = PRODUCTS.filter(p => state.wishlist.has(p.id));
  if (savedProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 64px 16px; color: var(--color-dark-muted);">
        <svg style="margin: 0 auto 16px; color: var(--color-secondary-border);" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
        </svg>
        <h3 class="heading-2">Your wishlist is waiting</h3>
        <p class="text-subtle" style="margin-top: 6px; margin-bottom: 20px;">Tap the heart on any handmade crochet creation to save it for later.</p>
        <a href="#shop" class="btn btn-primary">Browse All Pieces</a>
      </div>
    `;
    return;
  }

  container.innerHTML = savedProducts.map(product => `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-media">
        <span class="badge ${product.badgeType} product-card-badge">${product.badge}</span>
        <button class="product-card-wishlist active" onclick="toggleWishlist('${product.id}')" aria-label="Remove from wishlist">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
          </svg>
        </button>
        <img class="product-card-img" src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.categoryLabel}</div>
        <h3 class="product-card-title"><a href="#product/${product.id}">${product.title}</a></h3>
        <div class="product-card-footer">
          <div class="product-card-price">$${product.price.toFixed(2)}</div>
          <button class="btn btn-primary btn-sm" onclick="quickAddToCart('${product.id}')">Move to Basket</button>
        </div>
      </div>
    </article>
  `).join('');
}

// Toast Notifications
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast-icon">🌸</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Trigger enter animation
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Order Tracking Simulation
function handleOrderTrack(e) {
  e.preventDefault();
  const input = document.getElementById('track-order-input').value.trim();
  const resultBox = document.getElementById('track-result-box');
  if (!resultBox) return;

  resultBox.style.display = 'block';
  resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Custom Order Submitter
function handleCustomOrderSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.querySelector('[name="customer_name"]').value;
  showToast(`Thank you, ${name}! Your bespoke request has been sent to the studio 🧶`);
  form.reset();
  setTimeout(() => {
    navigateTo('home');
  }, 1600);
}

// Event Listeners setup
function setupEventListeners() {
  // Category tabs filter
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category');
      state.currentCategory = cat;
      renderProducts(cat);
    });
  });

  // Modal backdrop click close
  const drawer = document.getElementById('cart-drawer');
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      const rect = drawer.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) drawer.close();
    });
  }

  const quickModal = document.getElementById('quickview-modal');
  if (quickModal) {
    quickModal.addEventListener('click', (e) => {
      const rect = quickModal.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) quickModal.close();
    });
  }
}
