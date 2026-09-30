/**
 * BABYGURL CROCHET — CUSTOMER ACCOUNT ENGINE
 * Tabbed navigation, persistent authentication state, orders tracking,
 * wishlist-to-cart migration, custom requests quote approval, and address management.
 */

const AUTH_USER_KEY = 'babygurl_auth_user';
const WISHLIST_STORAGE_KEY = 'babygurl_wishlist';
const CART_STORAGE_KEY = 'babygurl_cart';

// Default Seed User
const DEFAULT_USER = {
  name: 'Maya Sharma',
  email: 'maya.sharma@example.com',
  phone: '+91 98765 43210',
  avatar: 'M',
  isLoggedIn: true
};

// Seed Wishlist Data
const DEFAULT_WISHLIST = [
  {
    id: 'crochet-tulip-bouquet',
    title: 'Crochet Tulip Bouquet',
    price: 799,
    originalPrice: 899,
    image: 'assets/images/tulips.jpg',
    availability: 'Made to Order',
    priceDrop: true
  },
  {
    id: 'mini-mushroom-plushie',
    title: 'Mini Mushroom Plushie',
    price: 399,
    originalPrice: null,
    image: 'assets/images/mushroom.jpg',
    availability: 'Ready to Ship',
    priceDrop: false
  },
  {
    id: 'crochet-daisy-bag',
    title: 'Crochet Daisy Bag',
    price: 999,
    originalPrice: null,
    image: 'assets/images/tote.jpg',
    availability: 'Currently unavailable',
    priceDrop: false
  }
];

let currentUser = null;
let userWishlist = [];

document.addEventListener('DOMContentLoaded', () => {
  initAuthState();
  initNavEvents();
  renderWishlist();
});

// --- AUTHENTICATION STATE ---
function initAuthState() {
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    if (stored) {
      currentUser = JSON.parse(stored);
    } else {
      currentUser = { ...DEFAULT_USER };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
    }

    const storedWish = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (storedWish) {
      userWishlist = JSON.parse(storedWish);
    } else {
      userWishlist = [...DEFAULT_WISHLIST];
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(userWishlist));
    }
  } catch (err) {
    currentUser = { ...DEFAULT_USER };
    userWishlist = [...DEFAULT_WISHLIST];
  }

  updateAuthDisplay();
}

function updateAuthDisplay() {
  const authContainer = document.getElementById('account-auth-container');
  const appLayout = document.getElementById('account-app-layout');
  const greetingName = document.getElementById('dash-greeting-name');
  const userSidebarName = document.getElementById('sidebar-user-name');
  const userSidebarEmail = document.getElementById('sidebar-user-email');
  const userAvatar = document.getElementById('sidebar-user-avatar');

  if (currentUser && currentUser.isLoggedIn) {
    if (authContainer) authContainer.style.display = 'none';
    if (appLayout) appLayout.style.display = 'grid';
    document.body.classList.add('account-logged-in');

    if (greetingName) greetingName.textContent = currentUser.name.split(' ')[0];
    if (userSidebarName) userSidebarName.textContent = currentUser.name;
    if (userSidebarEmail) userSidebarEmail.textContent = currentUser.email;
    if (userAvatar) userAvatar.textContent = currentUser.avatar || currentUser.name.charAt(0);
  } else {
    if (authContainer) authContainer.style.display = 'block';
    if (appLayout) appLayout.style.display = 'none';
    document.body.classList.remove('account-logged-in');
  }

  updateWishlistBadge();
}

function switchAuthTab(tabType) {
  const loginBtn = document.getElementById('tab-btn-login');
  const signupBtn = document.getElementById('tab-btn-signup');
  const loginPanel = document.getElementById('auth-panel-login');
  const signupPanel = document.getElementById('auth-panel-signup');

  if (tabType === 'login') {
    loginBtn?.classList.add('active');
    signupBtn?.classList.remove('active');
    loginPanel?.classList.add('active');
    signupPanel?.classList.remove('active');
  } else {
    loginBtn?.classList.remove('active');
    signupBtn?.classList.add('active');
    loginPanel?.classList.remove('active');
    signupPanel?.classList.add('active');
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById('login-email')?.value.trim();
  const name = emailInput ? emailInput.split('@')[0] : 'Maya Sharma';

  currentUser = {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email: emailInput || 'maya@example.com',
    phone: '+91 98765 43210',
    avatar: name.charAt(0).toUpperCase(),
    isLoggedIn: true
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
  updateAuthDisplay();
  switchAccountView('dashboard');
  showAccountToast(`Welcome back, ${currentUser.name} ♡`);
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('signup-name')?.value.trim() || 'Handmade Friend';
  const emailInput = document.getElementById('signup-email')?.value.trim() || 'friend@example.com';
  const phoneInput = document.getElementById('signup-phone')?.value.trim() || '+91 98765 43210';

  currentUser = {
    name: nameInput,
    email: emailInput,
    phone: phoneInput,
    avatar: nameInput.charAt(0).toUpperCase(),
    isLoggedIn: true
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
  updateAuthDisplay();
  switchAccountView('dashboard');
  showAccountToast(`Welcome to the BabyGurl family, ${currentUser.name} ♡`);
}

function logoutUser() {
  if (currentUser) {
    currentUser.isLoggedIn = false;
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(currentUser));
  }
  updateAuthDisplay();
  showAccountToast('Signed out gently. See you soon ♡');
}

// --- VIEW NAVIGATION (Desktop Sidebar + Mobile Bottom Tabs) ---
function initNavEvents() {
  const desktopBtns = document.querySelectorAll('.account-nav-btn[data-view]');
  desktopBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchAccountView(view);
    });
  });

  const mobBtns = document.querySelectorAll('.mob-tab-btn[data-view]');
  mobBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-view');
      switchAccountView(view);
    });
  });
}

function switchAccountView(viewName) {
  // Update desktop sidebar buttons
  document.querySelectorAll('.account-nav-btn[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  // Update mobile bottom tab buttons
  document.querySelectorAll('.mob-tab-btn[data-view]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  // Hide all panels, show target
  document.querySelectorAll('.account-view-panel').forEach(panel => {
    panel.classList.remove('active');
  });

  const targetPanel = document.getElementById(`view-panel-${viewName}`);
  if (targetPanel) {
    targetPanel.classList.add('active');
  }

  // Scroll smoothly to panel header
  const mainWrap = document.getElementById('account-main-content');
  if (mainWrap) {
    window.scrollTo({ top: mainWrap.offsetTop - 70, behavior: 'smooth' });
  }
}

// --- WISHLIST MANAGEMENT ---
function renderWishlist() {
  const grid = document.getElementById('wishlist-grid-container');
  const emptyBox = document.getElementById('wishlist-empty-box');

  if (!grid) return;

  if (userWishlist.length === 0) {
    grid.style.display = 'none';
    if (emptyBox) emptyBox.style.display = 'block';
    updateWishlistBadge();
    return;
  }

  grid.style.display = 'grid';
  if (emptyBox) emptyBox.style.display = 'none';

  grid.innerHTML = userWishlist.map((item, idx) => {
    const isUnavailable = item.availability === 'Currently unavailable';

    return `
      <article class="wishlist-item-card" data-id="${item.id}">
        <div class="wishlist-item-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <button type="button" class="wishlist-remove-btn" onclick="removeFromWishlist(${idx})" aria-label="Remove from wishlist">✕</button>
          ${item.priceDrop ? `<span class="price-drop-badge">₹100 Price Drop!</span>` : ''}
        </div>
        <div class="wishlist-card-body">
          <h3 class="wishlist-card-title">${item.title}</h3>
          <div class="wishlist-card-price">
            ₹${item.price.toLocaleString('en-IN')}
            ${item.originalPrice ? `<span style="font-size: 0.75rem; color: var(--color-dark-subtle); text-decoration: line-through; margin-left: 4px;">₹${item.originalPrice}</span>` : ''}
          </div>
          <span style="font-size: 0.72rem; color: ${isUnavailable ? 'var(--color-error)' : 'var(--color-primary)'}; margin-bottom: 12px; font-weight: var(--weight-medium);">
            ● ${item.availability}
          </span>
          <button type="button" class="btn ${isUnavailable ? 'btn-secondary' : 'btn-primary'} btn-sm" 
                  ${isUnavailable ? 'disabled style="opacity: 0.6; cursor: not-allowed;"' : `onclick="moveWishlistToCart(${idx})"`}>
            ${isUnavailable ? 'Currently Unavailable' : 'Move to Basket ♡'}
          </button>
        </div>
      </article>
    `;
  }).join('');

  updateWishlistBadge();
}

function removeFromWishlist(index) {
  if (!userWishlist[index]) return;
  const title = userWishlist[index].title;
  userWishlist.splice(index, 1);
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(userWishlist));
  renderWishlist();
  showAccountToast(`Removed "${title}" from wishlist`);
}

function moveWishlistToCart(index) {
  if (!userWishlist[index]) return;
  const item = userWishlist[index];

  // Add to Cart
  try {
    let cart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        title: item.title,
        variant: 'Handmade Standard',
        price: item.price,
        quantity: 1,
        image: item.image
      });
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (err) {
    console.error(err);
  }

  // Remove from Wishlist
  userWishlist.splice(index, 1);
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(userWishlist));

  renderWishlist();
  showAccountToast(`Moved "${item.title}" to your basket ♡`);
}

function updateWishlistBadge() {
  const count = userWishlist.length;
  document.querySelectorAll('.wishlist-count-badge').forEach(b => {
    b.textContent = count;
  });
}

// --- ORDER DETAILS VIEW ---
function viewOrderDetails(orderId) {
  switchAccountView('order-detail');
  showAccountToast(`Viewing details for Order ${orderId}`);
}

// --- CUSTOM REQUEST QUOTE ACCEPTANCE ---
function acceptCustomQuote() {
  const quoteStatusBadge = document.getElementById('custom-req-status-pill');
  const quoteBanner = document.getElementById('quote-ready-banner');

  if (quoteStatusBadge) {
    quoteStatusBadge.textContent = '🧶 In Production';
    quoteStatusBadge.className = 'order-status-pill status-being-handmade';
  }

  // Update 8-stage timeline
  const nodeQuote = document.getElementById('node-quote-ready');
  const nodeConfirm = document.getElementById('node-awaiting-confirm');
  const nodeProd = document.getElementById('node-in-prod');

  if (nodeQuote) {
    nodeQuote.className = 'timeline-node done';
    const dot = nodeQuote.querySelector('.timeline-dot');
    if (dot) dot.textContent = '✓';
  }
  if (nodeConfirm) {
    nodeConfirm.className = 'timeline-node done';
    const dot = nodeConfirm.querySelector('.timeline-dot');
    if (dot) dot.textContent = '✓';
  }
  if (nodeProd) {
    nodeProd.className = 'timeline-node active';
    const dot = nodeProd.querySelector('.timeline-dot');
    if (dot) dot.textContent = '🧶';
  }

  if (quoteBanner) {
    quoteBanner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px;">
        <span style="font-size: 2rem;">🧶</span>
        <div>
          <h4 style="font-family: var(--font-editorial); margin: 0 0 4px; color: var(--color-success); font-size: var(--text-lg);">Quote Accepted & In Production!</h4>
          <p style="margin: 0; font-size: var(--text-xs); color: var(--color-dark-muted); line-height: 1.5;">
            Our artisan has selected the combed milk cotton yarns and started crafting Milo. Progress photos will be sent to your WhatsApp and email.
          </p>
        </div>
      </div>
    `;
  }

  showAccountToast("Quote confirmed! Artisan has begun stitching 🧶");
}

// --- DELETE ACCOUNT ---
function confirmDeleteAccount() {
  if (confirm("Are you sure you want to delete your account? All saved addresses, favorites, and order records will be cleared.")) {
    localStorage.removeItem(AUTH_USER_KEY);
    localStorage.removeItem(WISHLIST_STORAGE_KEY);
    currentUser = null;
    updateAuthDisplay();
    switchAuthTab('login');
    showAccountToast("Your account has been safely deleted ♡");
  }
}

// --- SAVED ADDRESSES ---
function setDefaultAddress(addrId) {
  document.querySelectorAll('.address-card-item').forEach(card => {
    card.classList.remove('is-default');
    const badge = card.querySelector('.address-default-badge');
    if (badge) badge.style.display = 'none';
  });

  const target = document.getElementById(`addr-card-${addrId}`);
  if (target) {
    target.classList.add('is-default');
    const badge = target.querySelector('.address-default-badge');
    if (badge) badge.style.display = 'inline-block';
  }

  showAccountToast("Set as primary delivery address");
}

function deleteAddress(addrId) {
  const target = document.getElementById(`addr-card-${addrId}`);
  if (target) {
    target.remove();
    showAccountToast("Delivery address removed");
  }
}

function openAddAddressModal() {
  const modal = document.getElementById('add-address-modal');
  if (modal) modal.showModal();
}

function closeAddAddressModal() {
  const modal = document.getElementById('add-address-modal');
  if (modal) modal.close();
}

function saveNewAddress(e) {
  e.preventDefault();
  closeAddAddressModal();
  showAccountToast("New address saved successfully ♡");
}

// --- TOAST NOTIFICATIONS ---
function showAccountToast(message) {
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
  }, 3200);
}
