/**
 * BABYGURL CROCHET — CART INTERACTION ENGINE
 * Real-time quantity adjustments, persistent storage, coupon validation,
 * gift packaging options, empty state management, and cross-sell additions.
 */

const CART_STORAGE_KEY = 'babygurl_cart';
const COUPON_STORAGE_KEY = 'babygurl_coupon';
const GIFT_STORAGE_KEY = 'babygurl_gift_opt';

// Default Seed Item if cart is empty on first visit
const DEFAULT_CART_SEED = [
  {
    id: 'crochet-tulip-bouquet',
    title: 'Crochet Tulip Bouquet',
    variant: 'Pink • Medium (5 Stems)',
    customNote: 'Optional note: Pastel ribbon preference ♡',
    price: 799,
    quantity: 1,
    image: 'assets/images/tulips.jpg'
  }
];

let cartItems = [];
let appliedCoupon = null;

document.addEventListener('DOMContentLoaded', () => {
  loadCartState();
  initGiftToggle();
  initCouponAccordion();
  renderCart();
});

function loadCartState() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      cartItems = JSON.parse(stored);
    } else {
      cartItems = [...DEFAULT_CART_SEED];
      saveCartState();
    }

    const storedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
    if (storedCoupon) {
      appliedCoupon = JSON.parse(storedCoupon);
    }
  } catch (err) {
    console.error('Error loading cart state:', err);
    cartItems = [...DEFAULT_CART_SEED];
  }
}

function saveCartState() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  updateHeaderCartBadge();
}

function updateHeaderCartBadge() {
  const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  document.querySelectorAll('.cart-badge-count').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// --- RENDER CART & CALCULATIONS ---
function renderCart() {
  const itemsContainer = document.getElementById('cart-items-list');
  const emptyState = document.getElementById('cart-empty-state');
  const layoutGrid = document.getElementById('cart-layout-grid');

  if (!itemsContainer) return;

  if (cartItems.length === 0) {
    if (layoutGrid) layoutGrid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    updateHeaderCartBadge();
    return;
  }

  if (layoutGrid) layoutGrid.style.display = 'grid';
  if (emptyState) emptyState.style.display = 'none';

  // Render Items List
  itemsContainer.innerHTML = cartItems.map((item, idx) => `
    <article class="cart-card-item" data-id="${item.id}">
      <div class="cart-item-media">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>

      <div class="cart-item-info">
        <h3 class="cart-item-title">
          <a href="product-details.html">${item.title}</a>
        </h3>
        <span class="cart-item-variant">${item.variant || 'Handmade Standard'}</span>
        ${item.customNote ? `<span class="cart-item-custom-note">${item.customNote}</span>` : ''}

        <div class="cart-item-controls">
          <div class="qty-stepper" style="padding: 2px;">
            <button type="button" class="qty-btn" onclick="adjustCartQty(${idx}, -1)" aria-label="Decrease quantity">−</button>
            <span class="qty-value" style="font-size: 0.82rem; min-width: 26px;">${item.quantity}</span>
            <button type="button" class="qty-btn" onclick="adjustCartQty(${idx}, 1)" aria-label="Increase quantity">+</button>
          </div>

          <button type="button" class="cart-item-action-link" onclick="removeCartItem(${idx})">
            Remove
          </button>
          <button type="button" class="cart-item-action-link" onclick="saveForLater(${idx})">
            Save for later ♡
          </button>
        </div>
      </div>

      <div class="cart-item-price-col">
        <span class="cart-item-total-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
        ${item.quantity > 1 ? `<span class="cart-item-unit-price">₹${item.price.toLocaleString('en-IN')} each</span>` : ''}
      </div>
    </article>
  `).join('');

  updateCartSummary();
  updateHeaderCartBadge();
}

function updateCartSummary() {
  const subtotalEl = document.getElementById('summary-subtotal-val');
  const discountRow = document.getElementById('summary-discount-row');
  const discountVal = document.getElementById('summary-discount-val');
  const totalEl = document.getElementById('summary-total-val');
  const perkText = document.getElementById('cart-perk-text');
  const perkFill = document.getElementById('cart-perk-fill');

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  // Perk Meter (₹1,000 threshold for free studio gift wrap)
  const freeThreshold = 1000;
  if (perkText && perkFill) {
    const diff = freeThreshold - subtotal;
    if (diff <= 0) {
      perkText.innerHTML = `🎉 You unlocked <strong>Free Studio Gift Wrap & Insured Packing!</strong>`;
      perkFill.style.width = '100%';
    } else {
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      perkText.innerHTML = `Add <strong>₹${diff.toLocaleString('en-IN')}</strong> more for Free Studio Gift Wrap`;
      perkFill.style.width = `${pct}%`;
    }
  }

  // Discount Calculation
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else if (appliedCoupon.type === 'flat') {
      discountAmount = appliedCoupon.value;
    }
  }

  if (discountRow && discountVal) {
    if (discountAmount > 0) {
      discountRow.style.display = 'flex';
      discountVal.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount);
  if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;
}

// --- ITEM ACTIONS ---
function adjustCartQty(index, delta) {
  if (!cartItems[index]) return;

  cartItems[index].quantity += delta;
  if (cartItems[index].quantity <= 0) {
    removeCartItem(index);
    return;
  }

  saveCartState();
  renderCart();
  showCartToast("Updated basket quantity");
}

function removeCartItem(index) {
  if (!cartItems[index]) return;
  const removedTitle = cartItems[index].title;
  cartItems.splice(index, 1);
  saveCartState();
  renderCart();
  showCartToast(`Removed "${removedTitle}" from basket`);
}

function saveForLater(index) {
  if (!cartItems[index]) return;
  const title = cartItems[index].title;
  cartItems.splice(index, 1);
  saveCartState();
  renderCart();
  showCartToast(`Saved "${title}" for later ♡`);
}

// --- COUPON DISCOUNT SYSTEM ---
function initCouponAccordion() {
  const applyBtn = document.getElementById('btn-apply-coupon');
  const input = document.getElementById('coupon-input-field');

  if (applyBtn && input) {
    applyBtn.addEventListener('click', () => {
      const code = input.value.trim().toUpperCase();
      applyCouponCode(code);
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyCouponCode(input.value.trim().toUpperCase());
      }
    });
  }
}

function applyCouponCode(code) {
  if (!code) {
    showCartToast('Please enter a coupon code');
    return;
  }

  const VALID_COUPONS = {
    'SWEET10': { type: 'percent', value: 10, label: '10% Handmade Welcome' },
    'HANDMADE50': { type: 'flat', value: 50, label: '₹50 Off Slow Craft' },
    'BABYGURL': { type: 'percent', value: 15, label: '15% Studio VIP Love' }
  };

  if (VALID_COUPONS[code]) {
    appliedCoupon = { code, ...VALID_COUPONS[code] };
    localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
    updateCartSummary();
    showCartToast(`Coupon "${code}" applied: ${appliedCoupon.label} 🎉`);
    const statusEl = document.getElementById('coupon-status-msg');
    if (statusEl) {
      statusEl.textContent = `Applied: ${code} (${appliedCoupon.label})`;
      statusEl.style.display = 'block';
    }
  } else {
    showCartToast(`Coupon "${code}" is invalid or expired`);
  }
}

// --- GIFT MESSAGE TOGGLE ---
function initGiftToggle() {
  const toggle = document.getElementById('gift-opt-toggle');
  const details = document.getElementById('gift-details-expand');
  const messageInput = document.getElementById('gift-message-input');
  const hidePriceCheck = document.getElementById('gift-hide-price-check');

  if (toggle && details) {
    toggle.addEventListener('change', () => {
      const isChecked = toggle.checked;
      details.classList.toggle('is-active', isChecked);
      saveGiftPreferences();
      if (isChecked) {
        showCartToast("Gift packaging & handwritten note enabled 🎁");
      }
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', saveGiftPreferences);
  }
  if (hidePriceCheck) {
    hidePriceCheck.addEventListener('change', saveGiftPreferences);
  }
}

function saveGiftPreferences() {
  const toggle = document.getElementById('gift-opt-toggle');
  const messageInput = document.getElementById('gift-message-input');
  const hidePriceCheck = document.getElementById('gift-hide-price-check');

  const giftData = {
    isGift: toggle?.checked ?? false,
    message: messageInput?.value.trim() ?? '',
    hidePrice: hidePriceCheck?.checked ?? false
  };

  localStorage.setItem(GIFT_STORAGE_KEY, JSON.stringify(giftData));
}

// --- QUICK CROSS-SELL ADD TO BASKET ---
function addCrossSellToBasket(product) {
  const existing = cartItems.find(i => i.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({
      id: product.id,
      title: product.title,
      variant: product.variant || 'Handmade Standard',
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }

  saveCartState();
  renderCart();
  showCartToast(`Added ${product.title} to your little basket ♡`);
}

// --- TOAST MICRO-INTERACTION ---
function showCartToast(message) {
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
    setTimeout(() => toast.remove(), 280);
  }, 3000);
}
