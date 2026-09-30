/**
 * BABYGURL CROCHET — SHOP CATALOGUE ENGINE
 * Category tabs, multi-criteria filtering, responsive sorting,
 * subtle craft states (Ready to Ship, Made to Order, Sold Out), and cart integration.
 */

// Full Shop Products Catalog with ₹ Pricing and Craft States
const SHOP_PRODUCTS = [
  {
    id: 'crochet-tulip-bouquet',
    title: 'Crochet Tulip Bouquet',
    category: 'Bouquets',
    categories: ['Flowers', 'Bouquets'],
    price: 799,
    originalPrice: 899,
    state: 'Ready to Ship',
    stateType: 'badge-state-ready',
    color: 'dusty-rose',
    colorName: 'Dusty Rose & Cream',
    image: 'assets/images/tulips.jpg',
    rating: 5.0,
    reviewsCount: 68,
    popularity: 98,
    dateAdded: '2026-09-20',
    description: 'Trio of hand-sculpted everlasting tulips in soft dusty rose and cream, swaddled in natural kraft paper.'
  },
  {
    id: 'crochet-daisy-bouquet',
    title: 'Crochet Daisy Bouquet',
    category: 'Bouquets',
    categories: ['Flowers', 'Bouquets'],
    price: 699,
    originalPrice: 799,
    state: 'Made to Order',
    stateType: 'badge-state-order',
    color: 'cream-blush',
    colorName: 'Cream & Blush Blossom',
    image: 'assets/images/bouquet.jpg',
    rating: 4.9,
    reviewsCount: 46,
    popularity: 92,
    dateAdded: '2026-09-18',
    description: 'Delicate cream daisies with soft blush roses tied with raw-edge cream linen ribbon.'
  },
  {
    id: 'mini-crochet-bear',
    title: 'Mini Crochet Bear',
    category: 'Amigurumi',
    categories: ['Amigurumi'],
    price: 499,
    originalPrice: null,
    state: 'Ready to Ship',
    stateType: 'badge-state-ready',
    color: 'honey-gold',
    colorName: 'Warm Honey Caramel',
    image: 'assets/images/bear.jpg',
    rating: 5.0,
    reviewsCount: 54,
    popularity: 95,
    dateAdded: '2026-09-25',
    description: 'Pocket-sized teddy bear in warm honey caramel cotton yarn wearing a tiny cream bow tie.'
  },
  {
    id: 'crochet-sunflower',
    title: 'Crochet Sunflower',
    category: 'Home Decor',
    categories: ['Home Decor', 'Flowers'],
    price: 349,
    originalPrice: null,
    state: 'Ready to Ship',
    stateType: 'badge-state-ready',
    color: 'honey-gold',
    colorName: 'Golden Honey Yellow',
    image: 'assets/images/sunflower.jpg',
    rating: 4.9,
    reviewsCount: 42,
    popularity: 88,
    dateAdded: '2026-09-15',
    description: 'Cheerful everlasting sunflower with spiral textured cocoa center and golden honey petals.'
  },
  {
    id: 'flower-keychain',
    title: 'Flower Keychain',
    category: 'Keychains',
    categories: ['Keychains', 'Accessories'],
    price: 199,
    originalPrice: null,
    state: 'Ready to Ship',
    stateType: 'badge-state-ready',
    color: 'cream-blush',
    colorName: 'Blush & Vanilla',
    image: 'assets/images/keychain.jpg',
    rating: 4.8,
    reviewsCount: 89,
    popularity: 94,
    dateAdded: '2026-09-22',
    description: 'Layered crochet daisy charm with cream and blush petals and antique brass swivel clasp.'
  },
  {
    id: 'mini-mushroom-plushie',
    title: 'Mini Mushroom Plushie',
    category: 'Amigurumi',
    categories: ['Amigurumi', 'Home Decor'],
    price: 399,
    originalPrice: null,
    state: 'Made to Order',
    stateType: 'badge-state-order',
    color: 'dusty-rose',
    colorName: 'Dusty Rose Cap',
    image: 'assets/images/mushroom.jpg',
    rating: 4.8,
    reviewsCount: 31,
    popularity: 82,
    dateAdded: '2026-09-12',
    description: 'Whimsical desk companion with soft dusty rose cap and raised hand-stitched cream spots.'
  },
  {
    id: 'crochet-daisy-bag',
    title: 'Crochet Daisy Bag',
    category: 'Bags',
    categories: ['Bags', 'Accessories'],
    price: 999,
    originalPrice: 1199,
    state: 'Made to Order',
    stateType: 'badge-state-order',
    color: 'cream-blush',
    colorName: 'Meadow Rose & Cream',
    image: 'assets/images/tote.jpg',
    rating: 5.0,
    reviewsCount: 34,
    popularity: 96,
    dateAdded: '2026-09-26',
    description: 'Hand-joined floral granny square shoulder tote lined with organic unbleached cotton canvas.'
  },
  {
    id: 'crochet-heart-keychain',
    title: 'Crochet Heart Keychain',
    category: 'Keychains',
    categories: ['Keychains', 'Accessories'],
    price: 249,
    originalPrice: null,
    state: 'Ready to Ship',
    stateType: 'badge-state-ready',
    color: 'dusty-rose',
    colorName: 'Dusty Rose Heart',
    image: 'assets/images/heart_keychain.jpg',
    rating: 5.0,
    reviewsCount: 67,
    popularity: 91,
    dateAdded: '2026-09-28',
    description: 'Charming plush heart charm in dusty rose yarn with wooden bead and antique brass ring.'
  },
  {
    id: 'hazel-bunny-plushie',
    title: 'Hazel the Heirloom Bunny',
    category: 'Amigurumi',
    categories: ['Amigurumi'],
    price: 899,
    originalPrice: null,
    state: 'Sold Out',
    stateType: 'badge-state-sold',
    color: 'dusty-rose',
    colorName: 'Dusty Rose Overalls',
    image: 'assets/images/bunny.jpg',
    rating: 5.0,
    reviewsCount: 41,
    popularity: 85,
    dateAdded: '2026-09-10',
    description: 'Heirloom floppy-eared bunny with hand-knit dusty rose overalls and natural wooden buttons.'
  },
  {
    id: 'heirloom-gift-set',
    title: 'Heirloom Keepsake Gift Set',
    category: 'Gift Sets',
    categories: ['Gift Sets', 'Accessories'],
    price: 1299,
    originalPrice: 1450,
    state: 'Customizable',
    stateType: 'badge-state-order',
    color: 'dusty-rose',
    colorName: 'Curated Artisan Box',
    image: 'assets/images/giftbox.jpg',
    rating: 4.9,
    reviewsCount: 22,
    popularity: 90,
    dateAdded: '2026-09-24',
    description: 'Artisan gift parcel wrapped in kraft paper, raw linen ribbon, dried lavender, and custom keepsake tag.'
  }
];

// Shop Application State
const shopState = {
  currentCategory: 'All',
  selectedCraftStates: new Set(),
  selectedPriceRange: 'all',
  selectedColor: 'all',
  selectedSort: 'featured',
  inStockOnly: false,
  wishlist: new Set(['crochet-tulip-bouquet', 'mini-crochet-bear']),
  cart: [
    {
      id: 'crochet-tulip-bouquet',
      title: 'Crochet Tulip Bouquet',
      price: 799,
      quantity: 1,
      image: 'assets/images/tulips.jpg'
    }
  ]
};

// Initialize Shop Page
document.addEventListener('DOMContentLoaded', () => {
  initCategoryTabs();
  initFilterListeners();
  renderShopProducts();
  renderShopCart();
  updateCartBadgeCount();
});

// Category Tabs Navigation
function initCategoryTabs() {
  const tabs = document.querySelectorAll('.category-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      shopState.currentCategory = tab.getAttribute('data-cat') || 'All';
      renderShopProducts();
    });
  });
}

// Filter and Sort Listeners
function initFilterListeners() {
  // Sort select
  const sortSelect = document.getElementById('shop-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      shopState.selectedSort = e.target.value;
      renderShopProducts();
    });
  }

  // Craft state checkboxes
  document.querySelectorAll('input[name="filter_craft_state"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      if (e.target.checked) {
        shopState.selectedCraftStates.add(e.target.value);
      } else {
        shopState.selectedCraftStates.delete(e.target.value);
      }
      renderShopProducts();
    });
  });

  // Price range radios
  document.querySelectorAll('input[name="filter_price"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      shopState.selectedPriceRange = e.target.value;
      renderShopProducts();
    });
  });

  // Colorway radios
  document.querySelectorAll('input[name="filter_color"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      shopState.selectedColor = e.target.value;
      renderShopProducts();
    });
  });

  // In-stock availability checkbox
  const inStockCheckbox = document.getElementById('filter-in-stock-only');
  if (inStockCheckbox) {
    inStockCheckbox.addEventListener('change', (e) => {
      shopState.inStockOnly = e.target.checked;
      renderShopProducts();
    });
  }
}

// Filter and Sort Computation
function getFilteredAndSortedProducts() {
  let list = [...SHOP_PRODUCTS];

  // 1. Category Filter
  if (shopState.currentCategory !== 'All') {
    list = list.filter(p => p.categories.includes(shopState.currentCategory));
  }

  // 2. Craft States Filter (Ready to Ship, Made to Order, Customizable)
  if (shopState.selectedCraftStates.size > 0) {
    list = list.filter(p => shopState.selectedCraftStates.has(p.state));
  }

  // 3. In-Stock Only Filter
  if (shopState.inStockOnly) {
    list = list.filter(p => p.state !== 'Sold Out');
  }

  // 4. Price Filter
  if (shopState.selectedPriceRange === 'under-300') {
    list = list.filter(p => p.price < 300);
  } else if (shopState.selectedPriceRange === '300-500') {
    list = list.filter(p => p.price >= 300 && p.price <= 500);
  } else if (shopState.selectedPriceRange === '500-800') {
    list = list.filter(p => p.price > 500 && p.price <= 800);
  } else if (shopState.selectedPriceRange === '800-plus') {
    list = list.filter(p => p.price > 800);
  }

  // 5. Color Filter
  if (shopState.selectedColor !== 'all') {
    list = list.filter(p => p.color === shopState.selectedColor);
  }

  // 6. Sort
  switch (shopState.selectedSort) {
    case 'price-low':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      list.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
    case 'popular':
      list.sort((a, b) => b.popularity - a.popularity);
      break;
    case 'featured':
    default:
      // Featured maintains boutique curated order
      break;
  }

  return list;
}

// Render Products Grid & Active Chips
function renderShopProducts() {
  const grid = document.getElementById('shop-product-grid');
  const countEl = document.getElementById('shop-count-val');
  const activeChipsBar = document.getElementById('active-filters-bar');

  if (!grid) return;

  const products = getFilteredAndSortedProducts();

  // Update Count
  if (countEl) {
    countEl.textContent = `${products.length} lovely ${products.length === 1 ? 'creation' : 'creations'}`;
  }

  // Update Active Filter Chips
  renderActiveFilterChips(activeChipsBar);

  // Check Empty State
  if (products.length === 0) {
    grid.innerHTML = `
      <div class="shop-empty-state">
        <div class="empty-state-heart">♡</div>
        <h3 class="empty-state-title">Nothing here yet ♡</h3>
        <p class="empty-state-text">Try changing your filters and let's find something lovely.</p>
        <button type="button" class="btn btn-primary btn-md" onclick="clearAllShopFilters()" style="margin-top: 8px;">
          Clear Filters
        </button>
      </div>
    `;
    return;
  }

  // Render Product Cards
  grid.innerHTML = products.map(product => {
    const isSoldOut = product.state === 'Sold Out';
    const isWishlisted = shopState.wishlist.has(product.id);

    return `
      <article class="shop-card ${isSoldOut ? 'is-sold-out' : ''}" data-id="${product.id}">
        <div class="shop-card-media">
          <div class="shop-card-badge-box">
            <span class="badge ${product.stateType}">${product.state}</span>
          </div>

          <button type="button" 
                  class="shop-card-wishlist ${isWishlisted ? 'active' : ''}" 
                  onclick="toggleShopWishlist('${product.id}')"
                  aria-label="${isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
            </svg>
          </button>

          <a href="product-details.html" class="shop-card-img-link" style="display: block; width: 100%; height: 100%; overflow: hidden; border-radius: var(--radius-lg);">
            <img class="shop-card-img" src="${product.image}" alt="${product.title}" loading="lazy">
          </a>
        </div>

        <div class="shop-card-body">
          <span class="shop-card-cat">${product.category}</span>
          <h3 class="shop-card-title">
            <a href="product-details.html" style="color: inherit; text-decoration: none;" title="View details for ${product.title}">
              ${product.title}
            </a>
          </h3>
          
          <div class="shop-card-rating">
            <span>★★★★★</span>
            <span class="rating-count">(${product.rating})</span>
          </div>

          <div class="shop-card-footer">
            <div class="shop-card-price">
              ₹${product.price.toLocaleString('en-IN')}
              ${product.originalPrice ? `<span class="product-card-price-original" style="font-size: 0.78rem;">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>

            ${isSoldOut ? `
              <button type="button" class="btn btn-secondary btn-sm" onclick="joinWaitlist('${product.title}')" style="opacity: 0.85;">
                Waitlist
              </button>
            ` : `
              <button type="button" class="btn btn-primary btn-sm" onclick="addShopItemToCart('${product.id}')">
                Add to Cart
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Active Filter Chips Builder
function renderActiveFilterChips(container) {
  if (!container) return;

  const chips = [];

  if (shopState.currentCategory !== 'All') {
    chips.push({ label: `Category: ${shopState.currentCategory}`, type: 'category' });
  }

  shopState.selectedCraftStates.forEach(state => {
    chips.push({ label: state, type: 'craftState', value: state });
  });

  if (shopState.inStockOnly) {
    chips.push({ label: 'In Stock Only', type: 'inStock' });
  }

  if (shopState.selectedPriceRange !== 'all') {
    const priceLabels = {
      'under-300': 'Under ₹300',
      '300-500': '₹300 – ₹500',
      '500-800': '₹500 – ₹800',
      '800-plus': '₹800+'
    };
    chips.push({ label: priceLabels[shopState.selectedPriceRange], type: 'price' });
  }

  if (shopState.selectedColor !== 'all') {
    const colorLabels = {
      'dusty-rose': 'Dusty Rose',
      'cream-blush': 'Cream & Blush',
      'honey-gold': 'Honey Gold',
      'sage': 'Eucalyptus Sage'
    };
    chips.push({ label: colorLabels[shopState.selectedColor], type: 'color' });
  }

  if (chips.length === 0) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = `
    ${chips.map(chip => `
      <span class="filter-tag-chip">
        <span>${chip.label}</span>
        <button type="button" class="filter-tag-remove" onclick="removeSingleFilter('${chip.type}', '${chip.value || ''}')" aria-label="Remove filter">✕</button>
      </span>
    `).join('')}
    <button type="button" class="filter-clear-all-link" onclick="clearAllShopFilters()">Clear all</button>
  `;
}

function removeSingleFilter(type, value) {
  if (type === 'category') {
    shopState.currentCategory = 'All';
    document.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-cat') === 'All');
    });
  } else if (type === 'craftState') {
    shopState.selectedCraftStates.delete(value);
    document.querySelectorAll(`input[name="filter_craft_state"][value="${value}"]`).forEach(cb => cb.checked = false);
  } else if (type === 'inStock') {
    shopState.inStockOnly = false;
    const inStockCb = document.getElementById('filter-in-stock-only');
    if (inStockCb) inStockCb.checked = false;
  } else if (type === 'price') {
    shopState.selectedPriceRange = 'all';
    const allPriceRadio = document.querySelector('input[name="filter_price"][value="all"]');
    if (allPriceRadio) allPriceRadio.checked = true;
  } else if (type === 'color') {
    shopState.selectedColor = 'all';
    const allColorRadio = document.querySelector('input[name="filter_color"][value="all"]');
    if (allColorRadio) allColorRadio.checked = true;
  }

  renderShopProducts();
}

function clearAllShopFilters() {
  shopState.currentCategory = 'All';
  shopState.selectedCraftStates.clear();
  shopState.selectedPriceRange = 'all';
  shopState.selectedColor = 'all';
  shopState.inStockOnly = false;

  // Reset UI controls
  document.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-cat') === 'All');
  });

  document.querySelectorAll('input[name="filter_craft_state"]').forEach(cb => cb.checked = false);
  document.querySelectorAll('input[name="filter_color"]').forEach(r => r.checked = r.value === 'all');
  document.querySelectorAll('input[name="filter_price"]').forEach(r => r.checked = r.value === 'all');
  
  const inStockCb = document.getElementById('filter-in-stock-only');
  if (inStockCb) inStockCb.checked = false;

  renderShopProducts();
  showToast("All filters cleared ♡");
}

// Wishlist Toggle
function toggleShopWishlist(id) {
  if (shopState.wishlist.has(id)) {
    shopState.wishlist.delete(id);
    showToast("Removed from wishlist ♡");
  } else {
    shopState.wishlist.add(id);
    showToast("Saved to your wishlist ♥");
  }
  renderShopProducts();
}

// Add to Cart
function addShopItemToCart(id) {
  const item = SHOP_PRODUCTS.find(p => p.id === id);
  if (!item) return;

  const existing = shopState.cart.find(c => c.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    shopState.cart.push({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: 1,
      image: item.image
    });
  }

  updateCartBadgeCount();
  renderShopCart();
  openShopCartDrawer();
  showToast(`Added ${item.title} (₹${item.price.toLocaleString('en-IN')}) to your basket 🌸`);
}

function joinWaitlist(title) {
  showToast(`You're on the waitlist for ${title}! We'll notify you when restocked ♡`);
}

// Cart Drawer Management
function openShopCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && !drawer.open) drawer.showModal();
}

function closeShopCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && drawer.open) drawer.close();
}

function updateCartBadgeCount() {
  const count = shopState.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge-count').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderShopCart() {
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const shippingText = document.getElementById('shipping-meter-text');
  const shippingBar = document.getElementById('shipping-meter-bar');

  if (!container) return;

  const subtotal = shopState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotalEl) {
    subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  }

  // Free shipping & gift wrapping meter (Threshold ₹1,000)
  const freeThreshold = 1000;
  if (shippingText && shippingBar) {
    const diff = freeThreshold - subtotal;
    if (diff <= 0) {
      shippingText.innerHTML = `<span>🎉 You unlocked <strong>Free Studio Gift Wrap & Delivery!</strong></span>`;
      shippingBar.style.width = '100%';
    } else {
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      shippingText.innerHTML = `<span>Add <strong>₹${diff.toLocaleString('en-IN')}</strong> for Free Studio Gift Wrap</span> <span>${pct}%</span>`;
      shippingBar.style.width = `${pct}%`;
    }
  }

  if (shopState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: var(--color-dark-muted);">
        <p class="font-editorial" style="font-size: var(--text-lg); margin-bottom: 6px;">Your basket is empty</p>
        <p class="text-subtle" style="margin-bottom: 18px;">Find something lovely to fill it with handmade warmth.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="closeShopCartDrawer()">
          Continue Browsing
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = shopState.cart.map((item, index) => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <div class="cart-item-footer">
          <div class="qty-stepper" style="padding: 2px;">
            <button type="button" class="qty-btn" style="width: 24px; height: 24px;" onclick="adjustShopCartQty(${index}, -1)">−</button>
            <span class="qty-value" style="font-size: 0.8rem; min-width: 24px;">${item.quantity}</span>
            <button type="button" class="qty-btn" style="width: 24px; height: 24px;" onclick="adjustShopCartQty(${index}, 1)">+</button>
          </div>
          <span style="font-weight: var(--weight-semibold); font-size: var(--text-sm);">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
          <button type="button" style="color: var(--color-dark-subtle); font-size: 0.75rem; text-decoration: underline; cursor: pointer;" onclick="removeShopCartItem(${index})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function adjustShopCartQty(index, delta) {
  if (shopState.cart[index]) {
    shopState.cart[index].quantity += delta;
    if (shopState.cart[index].quantity <= 0) {
      shopState.cart.splice(index, 1);
    }
    updateCartBadgeCount();
    renderShopCart();
  }
}

function removeShopCartItem(index) {
  shopState.cart.splice(index, 1);
  updateCartBadgeCount();
  renderShopCart();
  showToast("Item removed from basket");
}

// Mobile Filter Drawer controls
function openMobileFilters() {
  const dialog = document.getElementById('mobile-filter-drawer');
  if (dialog) dialog.showModal();
}

function closeMobileFilters() {
  const dialog = document.getElementById('mobile-filter-drawer');
  if (dialog) dialog.close();
}

// Toast notification helper
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
  toast.innerHTML = `<span class="toast-icon">🌸</span><span>${message}</span>`;
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
