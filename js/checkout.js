/**
 * BABYGURL CROCHET — CHECKOUT INTERACTION ENGINE
 * Multi-step wizard, PIN code validation, shipping method calculations,
 * seamless Indian UPI & Card selection, slow-craft order confirmation, and error modal.
 */

const CART_STORAGE_KEY = 'babygurl_cart';
const COUPON_STORAGE_KEY = 'babygurl_coupon';
const GIFT_STORAGE_KEY = 'babygurl_gift_opt';

// Checkout State
const checkoutState = {
  currentStep: 1,
  contact: {
    email: '',
    phone: '',
    createAccount: false
  },
  delivery: {
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: '',
    country: 'India',
    saveAddress: true
  },
  shippingMethod: 'standard', // 'standard' or 'express'
  shippingFee: 49,
  paymentMethod: 'upi',
  upiId: '',
  appliedCoupon: null,
  giftOpt: null,
  cartItems: [],
  orderNumber: null
};

document.addEventListener('DOMContentLoaded', () => {
  loadCheckoutCart();
  initStepNavigation();
  initDeliveryMethodCards();
  initPaymentTabs();
  initUpiAppChips();
  renderOrderSummary();
});

function loadCheckoutCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      checkoutState.cartItems = JSON.parse(stored);
    } else {
      checkoutState.cartItems = [
        {
          id: 'crochet-tulip-bouquet',
          title: 'Crochet Tulip Bouquet',
          variant: 'Pink • Medium (5 Stems)',
          price: 799,
          quantity: 1,
          image: 'assets/images/tulips.jpg'
        }
      ];
    }

    const couponStored = localStorage.getItem(COUPON_STORAGE_KEY);
    if (couponStored) {
      checkoutState.appliedCoupon = JSON.parse(couponStored);
    }

    const giftStored = localStorage.getItem(GIFT_STORAGE_KEY);
    if (giftStored) {
      checkoutState.giftOpt = JSON.parse(giftStored);
    }
  } catch (err) {
    console.error('Error loading checkout cart:', err);
  }
}

// --- STEP NAVIGATION ---
function initStepNavigation() {
  // Stepper Header Buttons
  const stepIndicators = document.querySelectorAll('.step-indicator-item');
  stepIndicators.forEach(ind => {
    ind.addEventListener('click', () => {
      const step = parseInt(ind.getAttribute('data-step'), 10);
      if (step < checkoutState.currentStep) {
        goToCheckoutStep(step);
      }
    });
  });
}

function goToCheckoutStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > 4) return;

  // Validate step if progressing forward
  if (stepNumber > checkoutState.currentStep && !validateCurrentStep(checkoutState.currentStep)) {
    return;
  }

  checkoutState.currentStep = stepNumber;

  // Show Active Panel
  for (let i = 1; i <= 4; i++) {
    const panel = document.getElementById(`checkout-step-${i}`);
    if (panel) {
      panel.classList.toggle('active', i === stepNumber);
    }
  }

  // Update Stepper Badges
  const stepIndicators = document.querySelectorAll('.step-indicator-item');
  stepIndicators.forEach(ind => {
    const step = parseInt(ind.getAttribute('data-step'), 10);
    ind.classList.toggle('active', step === stepNumber);
    ind.classList.toggle('completed', step < stepNumber);
  });

  // If entering confirmation (Step 4), hide summary sidebar
  if (stepNumber === 4) {
    const summaryCol = document.getElementById('checkout-summary-column');
    if (summaryCol) summaryCol.style.display = 'none';
    const tracker = document.getElementById('checkout-steps-tracker');
    if (tracker) tracker.style.display = 'none';
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextCheckoutStep() {
  goToCheckoutStep(checkoutState.currentStep + 1);
}

function prevCheckoutStep() {
  goToCheckoutStep(checkoutState.currentStep - 1);
}

// --- VALIDATION ---
function validateCurrentStep(step) {
  let isValid = true;

  if (step === 1) {
    const email = document.getElementById('checkout-email');
    const phone = document.getElementById('checkout-phone');

    if (!email || !email.value.includes('@') || !email.value.includes('.')) {
      showFieldError(email, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearFieldError(email);
      checkoutState.contact.email = email.value.trim();
    }

    const cleanPhone = phone?.value.replace(/\D/g, '') || '';
    if (cleanPhone.length < 10) {
      showFieldError(phone, 'Please enter a valid 10-digit mobile number');
      isValid = false;
    } else {
      clearFieldError(phone);
      checkoutState.contact.phone = cleanPhone;
    }
  } else if (step === 2) {
    const name = document.getElementById('checkout-name');
    const address = document.getElementById('checkout-address');
    const city = document.getElementById('checkout-city');
    const pincode = document.getElementById('checkout-pincode');

    if (!name || name.value.trim().length < 2) {
      showFieldError(name, 'Please enter your full name');
      isValid = false;
    } else {
      clearFieldError(name);
      checkoutState.delivery.fullName = name.value.trim();
    }

    if (!address || address.value.trim().length < 5) {
      showFieldError(address, 'Please enter house/flat no and street address');
      isValid = false;
    } else {
      clearFieldError(address);
      checkoutState.delivery.address = address.value.trim();
    }

    if (!city || city.value.trim().length < 2) {
      showFieldError(city, 'Please enter your city');
      isValid = false;
    } else {
      clearFieldError(city);
      checkoutState.delivery.city = city.value.trim();
    }

    const pinVal = pincode?.value.trim() || '';
    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!pinRegex.test(pinVal)) {
      showFieldError(pincode, 'Please enter a valid 6-digit Indian PIN code');
      isValid = false;
    } else {
      clearFieldError(pincode);
      checkoutState.delivery.pincode = pinVal;
    }
  }

  return isValid;
}

function showFieldError(input, msg) {
  if (!input) return;
  input.classList.add('has-error');
  const parent = input.closest('.form-field-group');
  const errEl = parent?.querySelector('.field-error-msg');
  if (errEl) {
    errEl.textContent = msg;
    errEl.style.display = 'block';
  }
}

function clearFieldError(input) {
  if (!input) return;
  input.classList.remove('has-error');
  const parent = input.closest('.form-field-group');
  const errEl = parent?.querySelector('.field-error-msg');
  if (errEl) errEl.style.display = 'none';
}

// --- DELIVERY METHOD CARDS ---
function initDeliveryMethodCards() {
  const cards = document.querySelectorAll('.delivery-method-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const method = card.getAttribute('data-method') || 'standard';
      checkoutState.shippingMethod = method;

      const subtotal = checkoutState.cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
      if (method === 'standard') {
        checkoutState.shippingFee = subtotal >= 1000 ? 0 : 49;
      } else {
        checkoutState.shippingFee = 149;
      }

      renderOrderSummary();
    });
  });
}

// --- PAYMENT TABS ---
function initPaymentTabs() {
  const tabs = document.querySelectorAll('.payment-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const payType = tab.getAttribute('data-pay');
      checkoutState.paymentMethod = payType;

      document.querySelectorAll('.payment-subpanel').forEach(p => p.classList.remove('active'));
      const activeSubpanel = document.getElementById(`pay-subpanel-${payType}`);
      if (activeSubpanel) activeSubpanel.classList.add('active');
    });
  });
}

function initUpiAppChips() {
  const chips = document.querySelectorAll('.upi-app-chip');
  const upiInput = document.getElementById('checkout-upi-id');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const app = chip.getAttribute('data-app');
      if (upiInput) {
        upiInput.value = `user@${app.toLowerCase()}`;
        showCheckoutToast(`Selected ${app} UPI`);
      }
    });
  });
}

// --- ORDER SUMMARY RENDER ---
function renderOrderSummary() {
  const listEl = document.getElementById('checkout-summary-items');
  const subtotalEl = document.getElementById('summary-subtotal');
  const shippingEl = document.getElementById('summary-shipping');
  const discountRow = document.getElementById('summary-discount-row');
  const discountEl = document.getElementById('summary-discount');
  const totalEl = document.getElementById('summary-grand-total');
  const stickyMobileTotal = document.getElementById('mobile-sticky-total-val');

  if (!listEl) return;

  const subtotal = checkoutState.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  // Shipping fee
  if (checkoutState.shippingMethod === 'standard' && subtotal >= 1000) {
    checkoutState.shippingFee = 0;
  }
  if (shippingEl) {
    shippingEl.textContent = checkoutState.shippingFee === 0 ? 'FREE' : `₹${checkoutState.shippingFee}`;
  }

  // Discount
  let discount = 0;
  if (checkoutState.appliedCoupon) {
    if (checkoutState.appliedCoupon.type === 'percent') {
      discount = Math.round((subtotal * checkoutState.appliedCoupon.value) / 100);
    } else if (checkoutState.appliedCoupon.type === 'flat') {
      discount = checkoutState.appliedCoupon.value;
    }
  }

  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-₹${discount.toLocaleString('en-IN')}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  const grandTotal = Math.max(0, subtotal - discount + checkoutState.shippingFee);
  if (totalEl) totalEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
  if (stickyMobileTotal) stickyMobileTotal.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

  // Render Thumbnails in Summary
  listEl.innerHTML = checkoutState.cartItems.map(item => `
    <div class="checkout-item-mini">
      <img src="${item.image}" alt="${item.title}" class="checkout-item-mini-img">
      <div>
        <h4 class="checkout-item-mini-name">${item.title}</h4>
        <div class="checkout-item-mini-meta">${item.variant || 'Handmade'} • Qty: ${item.quantity}</div>
      </div>
      <div class="checkout-item-mini-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
    </div>
  `).join('');
}

// --- PLACE ORDER & CONFIRMATION ---
function placeOrder() {
  const btn = document.getElementById('btn-place-order');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>Handcrafting Order... 🌸</span>`;
  }

  // Simulate payment processing (1.2s)
  setTimeout(() => {
    // Generate Order Reference
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    checkoutState.orderNumber = `BGC-${randomNum}`;

    // Calculate dates
    const prepDate = new Date();
    prepDate.setDate(prepDate.getDate() + 4);
    const delivDate = new Date();
    delivDate.setDate(delivDate.getDate() + 8);

    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const prepStr = prepDate.toLocaleDateString('en-IN', dateOptions);
    const delivStr = delivDate.toLocaleDateString('en-IN', dateOptions);

    // Populate confirmation card
    const orderNumEl = document.getElementById('conf-order-number');
    if (orderNumEl) orderNumEl.textContent = `#${checkoutState.orderNumber}`;

    const prepEl = document.getElementById('conf-prep-date');
    if (prepEl) prepEl.textContent = prepStr;

    const delivEl = document.getElementById('conf-deliv-date');
    if (delivEl) delivEl.textContent = delivStr;

    const addrEl = document.getElementById('conf-address-summary');
    if (addrEl) {
      addrEl.textContent = `${checkoutState.delivery.fullName || 'Beloved Customer'}, ${checkoutState.delivery.address || 'Studio Address'}, ${checkoutState.delivery.city || 'India'} (${checkoutState.delivery.pincode || '400001'})`;
    }

    // Clear cart
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(COUPON_STORAGE_KEY);
    localStorage.removeItem(GIFT_STORAGE_KEY);

    goToCheckoutStep(4);
    showCheckoutToast("Order placed successfully! ♡");
  }, 1200);
}

// --- SIMULATE PAYMENT ERROR (EDGE STATE DEMO) ---
function simulatePaymentError() {
  const modal = document.getElementById('payment-error-modal');
  if (modal) modal.showModal();
}

function closePaymentErrorModal() {
  const modal = document.getElementById('payment-error-modal');
  if (modal) modal.close();
}

// --- TOAST NOTIFICATIONS ---
function showCheckoutToast(message) {
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
