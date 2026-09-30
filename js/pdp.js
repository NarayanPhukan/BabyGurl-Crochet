/**
 * BABYGURL CROCHET — PRODUCT DETAILS PAGE (PDP) INTERACTION ENGINE
 * Gallery thumbnail switching, touch swipe, zoom lens, visual color & size variants,
 * gift customization, micro-interactions, reviews filter, and sticky purchase bar.
 */

// PDP Gallery Images
const GALLERY_IMAGES = [
  { id: 'view-front', src: 'assets/images/tulips.jpg', label: 'Main front arrangement' },
  { id: 'view-arrangement', src: 'assets/images/bouquet.jpg', label: 'Floral arrangement view' },
  { id: 'view-texture', src: 'assets/images/tulips_texture.jpg', label: 'Close-up showing yarn texture' },
  { id: 'view-lifestyle', src: 'assets/images/sunflower.jpg', label: 'Cozy sunlit lifestyle setting' },
  { id: 'view-packaging', src: 'assets/images/giftbox.jpg', label: 'Artisanal gift box & linen ribbon packaging' }
];

// PDP State
const pdpState = {
  currentImageIndex: 0,
  selectedColor: 'Pink',
  selectedSize: 'Small',
  basePrice: 799,
  currentPrice: 799,
  quantity: 1,
  isWishlisted: false,
  cart: [
    {
      id: 'crochet-tulip-bouquet',
      title: 'Crochet Tulip Bouquet',
      color: 'Pink',
      size: 'Small',
      price: 799,
      quantity: 1,
      image: 'assets/images/tulips.jpg'
    }
  ]
};

// Size price multiplier mapping
const SIZE_CONFIG = {
  'Small': { price: 799, stems: '3 Stems' },
  'Medium': { price: 1199, stems: '5 Stems' },
  'Large': { price: 1599, stems: '7 Stems' }
};

document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initColorSwatches();
  initSizePills();
  initQuantityStepper();
  initSwipeGesture();
  initZoomLens();
  initReviewsFilter();
  renderPdpCart();
  updateCartBadge();
});

// Gallery Navigation & Thumbnail Switching
function initGallery() {
  const thumbs = document.querySelectorAll('.pdp-thumb-btn');
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      setGalleryIndex(index);
    });
  });
}

function setGalleryIndex(index) {
  pdpState.currentImageIndex = index;
  const mainImg = document.getElementById('pdp-active-img');
  const thumbs = document.querySelectorAll('.pdp-thumb-btn');

  if (mainImg && GALLERY_IMAGES[index]) {
    mainImg.style.opacity = '0.5';
    setTimeout(() => {
      mainImg.src = GALLERY_IMAGES[index].src;
      mainImg.alt = GALLERY_IMAGES[index].label;
      mainImg.style.opacity = '1';
    }, 120);
  }

  thumbs.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

// Touch Swipe Gesture for Mobile Gallery
function initSwipeGesture() {
  const frame = document.getElementById('pdp-main-gallery-frame');
  if (!frame) return;

  let touchStartX = 0;
  let touchEndX = 0;

  frame.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  frame.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 40;
    if (touchEndX < touchStartX - threshold) {
      // Swiped Left -> Next image
      const nextIndex = (pdpState.currentImageIndex + 1) % GALLERY_IMAGES.length;
      setGalleryIndex(nextIndex);
    } else if (touchEndX > touchStartX + threshold) {
      // Swiped Right -> Previous image
      const prevIndex = (pdpState.currentImageIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
      setGalleryIndex(prevIndex);
    }
  }
}

// Image Zoom Lens
function initZoomLens() {
  const frame = document.getElementById('pdp-main-gallery-frame');
  if (!frame) return;

  frame.addEventListener('click', () => {
    frame.classList.toggle('is-zoomed');
  });

  frame.addEventListener('mousemove', (e) => {
    if (frame.classList.contains('is-zoomed')) {
      const rect = frame.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const img = frame.querySelector('img');
      if (img) {
        img.style.transformOrigin = `${x}% ${y}%`;
      }
    }
  });

  frame.addEventListener('mouseleave', () => {
    frame.classList.remove('is-zoomed');
    const img = frame.querySelector('img');
    if (img) img.style.transformOrigin = 'center center';
  });
}

// Color Swatches
function initColorSwatches() {
  const swatches = document.querySelectorAll('.pdp-swatch-item');
  const labelVal = document.getElementById('selected-color-label');

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      const color = swatch.getAttribute('data-color') || 'Pink';
      pdpState.selectedColor = color;
      if (labelVal) labelVal.textContent = color;
    });
  });
}

// Size Pills
function initSizePills() {
  const sizeBtns = document.querySelectorAll('.pdp-size-btn');
  const labelVal = document.getElementById('selected-size-label');
  const priceDisplay = document.getElementById('pdp-price-val');
  const stickyPrice = document.getElementById('sticky-price-val');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const size = btn.getAttribute('data-size') || 'Small';
      pdpState.selectedSize = size;
      pdpState.currentPrice = SIZE_CONFIG[size].price;

      if (labelVal) labelVal.textContent = `${size} (${SIZE_CONFIG[size].stems})`;
      if (priceDisplay) priceDisplay.textContent = `₹${pdpState.currentPrice.toLocaleString('en-IN')}`;
      if (stickyPrice) stickyPrice.textContent = `₹${pdpState.currentPrice.toLocaleString('en-IN')}`;
    });
  });
}

// Quantity Stepper
function initQuantityStepper() {
  window.adjustPdpQty = function(delta) {
    pdpState.quantity = Math.max(1, pdpState.quantity + delta);
    const qtyVal = document.getElementById('pdp-qty-val');
    if (qtyVal) qtyVal.textContent = pdpState.quantity;
  };
}

// Purchase Actions & Micro-interactions
function handleAddToCart() {
  const giftMsg = document.getElementById('pdp-gift-msg')?.value.trim() || '';
  const note = document.getElementById('pdp-order-note')?.value.trim() || '';

  pdpState.cart.push({
    id: `crochet-tulip-${Date.now()}`,
    title: 'Crochet Tulip Bouquet',
    color: pdpState.selectedColor,
    size: pdpState.selectedSize,
    price: pdpState.currentPrice,
    quantity: pdpState.quantity,
    giftMessage: giftMsg,
    customNote: note,
    image: 'assets/images/tulips.jpg'
  });

  updateCartBadge();
  renderPdpCart();
  openCartDrawer();

  // Subtle micro-interaction requested
  showPdpToast("Added to your little basket ♡");
}

function handleBuyNow() {
  handleAddToCart();
  showPdpToast("Directing to secure checkout... 🌸");
}

// Wishlist Toggle
function togglePdpWishlist() {
  pdpState.isWishlisted = !pdpState.isWishlisted;
  const btn = document.getElementById('pdp-wishlist-btn');
  const icon = document.getElementById('pdp-wishlist-icon');

  if (btn) btn.classList.toggle('active', pdpState.isWishlisted);
  if (icon) {
    icon.setAttribute('fill', pdpState.isWishlisted ? 'currentColor' : 'none');
  }

  // Subtle micro-interaction requested
  if (pdpState.isWishlisted) {
    showPdpToast("Saved for later ♡");
  } else {
    showPdpToast("Removed from wishlist");
  }
}

// Reviews Filter
function initReviewsFilter() {
  const pills = document.querySelectorAll('.review-filter-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const rating = pill.getAttribute('data-rating') || 'all';
      filterReviewsList(rating);
    });
  });
}

function filterReviewsList(rating) {
  const cards = document.querySelectorAll('.review-detail-card');
  cards.forEach(card => {
    const cardRating = card.getAttribute('data-stars');
    if (rating === 'all' || cardRating === rating) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Write Review Modal
function openWriteReviewModal() {
  const modal = document.getElementById('write-review-modal');
  if (modal) modal.showModal();
}

function closeWriteReviewModal() {
  const modal = document.getElementById('write-review-modal');
  if (modal) modal.close();
}

function submitReviewForm(e) {
  e.preventDefault();
  closeWriteReviewModal();
  showPdpToast("Thank you for sharing your love note! ♡");
  e.target.reset();
}

// Cart Drawer
function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && !drawer.open) drawer.showModal();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer && drawer.open) drawer.close();
}

function updateCartBadge() {
  const count = pdpState.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-badge-count').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

function renderPdpCart() {
  const list = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal-val');
  const meterText = document.getElementById('shipping-meter-text');
  const meterBar = document.getElementById('shipping-meter-bar');

  if (!list) return;

  const subtotal = pdpState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  const freeThreshold = 1000;
  if (meterText && meterBar) {
    const diff = freeThreshold - subtotal;
    if (diff <= 0) {
      meterText.innerHTML = `<span>🎉 You unlocked <strong>Free Studio Gift Wrap & Delivery!</strong></span>`;
      meterBar.style.width = '100%';
    } else {
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      meterText.innerHTML = `<span>Add <strong>₹${diff.toLocaleString('en-IN')}</strong> for Free Studio Gift Wrap</span> <span>${pct}%</span>`;
      meterBar.style.width = `${pct}%`;
    }
  }

  if (pdpState.cart.length === 0) {
    list.innerHTML = `
      <div style="text-align: center; padding: 48px 16px; color: var(--color-dark-muted);">
        <p class="font-editorial" style="font-size: var(--text-lg); margin-bottom: 6px;">Your basket is empty</p>
        <p class="text-subtle" style="margin-bottom: 18px;">Find something lovely to fill it with handmade warmth.</p>
        <button type="button" class="btn btn-primary btn-sm" onclick="closeCartDrawer()">
          Continue Browsing
        </button>
      </div>
    `;
    return;
  }

  list.innerHTML = pdpState.cart.map((item, index) => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.title}" class="cart-item-thumb">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.title}</h4>
        <span class="cart-item-variant">${item.color || 'Pink'} • ${item.size || 'Small'}</span>
        <div class="cart-item-footer">
          <div class="qty-stepper" style="padding: 2px;">
            <button type="button" class="qty-btn" style="width: 24px; height: 24px;" onclick="adjustPdpCartItemQty(${index}, -1)">−</button>
            <span class="qty-value" style="font-size: 0.8rem; min-width: 24px;">${item.quantity}</span>
            <button type="button" class="qty-btn" style="width: 24px; height: 24px;" onclick="adjustPdpCartItemQty(${index}, 1)">+</button>
          </div>
          <span style="font-weight: var(--weight-semibold); font-size: var(--text-sm);">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
          <button type="button" style="color: var(--color-dark-subtle); font-size: 0.75rem; text-decoration: underline; cursor: pointer;" onclick="removePdpCartItem(${index})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function adjustPdpCartItemQty(index, delta) {
  if (pdpState.cart[index]) {
    pdpState.cart[index].quantity += delta;
    if (pdpState.cart[index].quantity <= 0) {
      pdpState.cart.splice(index, 1);
    }
    updateCartBadge();
    renderPdpCart();
  }
}

function removePdpCartItem(index) {
  pdpState.cart.splice(index, 1);
  updateCartBadge();
  renderPdpCart();
  showPdpToast("Item removed from basket");
}

// Micro-interaction Toast
function showPdpToast(message) {
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
