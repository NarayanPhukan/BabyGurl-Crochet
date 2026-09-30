/**
 * BABYGURL CROCHET — COLLECTIONS PAGE INTERACTION ENGINE
 * Interactive Gift Finder, Seasonal Collection Switcher,
 * Add-to-cart micro-interactions, and search/drawer integrations.
 */

// Gift Finder Catalog Data
const GIFT_CATALOG = [
  {
    id: 'crochet-tulip-bouquet',
    title: 'Crochet Tulip Bouquet',
    category: 'Bouquets',
    price: 799,
    image: 'assets/images/tulips.jpg',
    recipients: ['Her', 'Someone Special', 'Myself', 'Family'],
    occasions: ['Birthday', 'Anniversary', 'Just Because', 'Special Occasion'],
    types: ['Flowers', 'Surprise Me'],
    budgetTier: '₹500–₹1,000',
    matchTag: '🌸 Romantic & Everlasting'
  },
  {
    id: 'crochet-daisy-bouquet',
    title: 'Crochet Daisy Bouquet',
    category: 'Bouquets',
    price: 699,
    image: 'assets/images/bouquet.jpg',
    recipients: ['Her', 'Best Friend', 'Family', 'Someone Special'],
    occasions: ['Birthday', 'Graduation', 'Just Because', 'Special Occasion'],
    types: ['Flowers', 'Surprise Me'],
    budgetTier: '₹500–₹1,000',
    matchTag: '🌼 Gentle Cheerfulness'
  },
  {
    id: 'mini-crochet-bear',
    title: 'Mini Crochet Bear',
    category: 'Amigurumi',
    price: 499,
    image: 'assets/images/bear.jpg',
    recipients: ['Best Friend', 'Her', 'Him', 'Myself', 'Family'],
    occasions: ['Birthday', 'Just Because', 'Graduation', 'No Occasion'],
    types: ['Cute Plushie', 'Surprise Me'],
    budgetTier: 'Under ₹500',
    matchTag: '🧸 Pocket Hug Companion'
  },
  {
    id: 'crochet-sunflower',
    title: 'Crochet Sunflower',
    category: 'Home Decor',
    price: 349,
    image: 'assets/images/sunflower.jpg',
    recipients: ['Best Friend', 'Family', 'Myself', 'Her', 'Him'],
    occasions: ['Graduation', 'Birthday', 'Just Because', 'No Occasion'],
    types: ['Flowers', 'Accessory', 'Surprise Me'],
    budgetTier: 'Under ₹500',
    matchTag: '☀️ Sunshine On A Desk'
  },
  {
    id: 'flower-keychain',
    title: 'Flower Keychain Charm',
    category: 'Accessories',
    price: 199,
    image: 'assets/images/keychain.jpg',
    recipients: ['Best Friend', 'Myself', 'Her', 'Family'],
    occasions: ['Just Because', 'Birthday', 'No Occasion'],
    types: ['Accessory', 'Surprise Me'],
    budgetTier: 'Under ₹500',
    matchTag: '🌸 Everyday Sweet Touch'
  },
  {
    id: 'heart-keychains',
    title: 'Twin Heart Keychains',
    category: 'Couple Gifts',
    price: 399,
    image: 'assets/images/heart_keychain.jpg',
    recipients: ['Best Friend', 'Someone Special', 'Her', 'Him'],
    occasions: ['Anniversary', 'Birthday', 'Just Because'],
    types: ['Accessory', 'Something Personalized', 'Surprise Me'],
    budgetTier: 'Under ₹500',
    matchTag: '🫶 Keepsake Connection'
  },
  {
    id: 'custom-pet-replica',
    title: 'Custom Pet Replica Amigurumi',
    category: 'Custom Craft',
    price: 1499,
    image: 'assets/images/pet_plushie.jpg',
    recipients: ['Her', 'Him', 'Best Friend', 'Family', 'Someone Special'],
    occasions: ['Birthday', 'Anniversary', 'Special Occasion'],
    types: ['Something Personalized', 'Cute Plushie', 'Surprise Me'],
    budgetTier: '₹1,000–₹2,000',
    matchTag: '🐾 Hand-Sculpted Heirloom'
  },
  {
    id: 'crochet-daisy-bag',
    title: 'Crochet Daisy Tote Bag',
    category: 'Bags',
    price: 999,
    image: 'assets/images/tote.jpg',
    recipients: ['Her', 'Best Friend', 'Myself'],
    occasions: ['Birthday', 'Graduation', 'Special Occasion'],
    types: ['Accessory', 'Surprise Me'],
    budgetTier: '₹500–₹1,000',
    matchTag: '👜 Slow-Fashion Daily Bag'
  },
  {
    id: 'curated-gift-box',
    title: 'Artisanal Keepsake Gift Box',
    category: 'Gift Sets',
    price: 1899,
    image: 'assets/images/giftbox.jpg',
    recipients: ['Her', 'Someone Special', 'Family', 'Best Friend'],
    occasions: ['Birthday', 'Anniversary', 'Special Occasion'],
    types: ['Something Personalized', 'Surprise Me'],
    budgetTier: '₹1,000–₹2,000',
    matchTag: '🎁 Deluxe Linen Box'
  }
];

// Seasonal Collections Data
const SEASONAL_DATA = {
  'valentines': [
    {
      title: 'Crochet Tulip Bouquet',
      subtitle: 'Soft dusty rose everlasting blooms',
      price: '₹799',
      image: 'assets/images/tulips.jpg',
      badge: 'Valentine Signature'
    },
    {
      title: 'Twin Heart Keychains',
      subtitle: 'Matching keepsake for two hearts',
      price: '₹399',
      image: 'assets/images/heart_keychain.jpg',
      badge: 'Couple Favorite'
    },
    {
      title: 'Crochet Daisy Bouquet',
      subtitle: 'Blush roses & tender daisies',
      price: '₹699',
      image: 'assets/images/bouquet.jpg',
      badge: 'Hand-Tied'
    },
    {
      title: 'Deluxe Keepsake Gift Box',
      subtitle: 'Wrapped in linen ribbon & dried florals',
      price: '₹1,899',
      image: 'assets/images/giftbox.jpg',
      badge: 'Gift Ready'
    }
  ],
  'mothers-day': [
    {
      title: 'Crochet Daisy Bouquet',
      subtitle: 'Gentle warmth that stays forever',
      price: '₹699',
      image: 'assets/images/bouquet.jpg',
      badge: 'Mom’s Favorite'
    },
    {
      title: 'Crochet Sunflower',
      subtitle: 'Bright sunny desk companion',
      price: '₹349',
      image: 'assets/images/sunflower.jpg',
      badge: 'Radiant Warmth'
    },
    {
      title: 'Crochet Daisy Tote Bag',
      subtitle: 'Combed cotton weekend market bag',
      price: '₹999',
      image: 'assets/images/tote.jpg',
      badge: 'Everyday Practical'
    },
    {
      title: 'Crochet Tulip Trio',
      subtitle: 'Pastel lilac & cream stems',
      price: '₹799',
      image: 'assets/images/tulips.jpg',
      badge: 'Evergreen'
    }
  ],
  'diwali': [
    {
      title: 'Golden Sunflower Pot',
      subtitle: 'Festive honey gold home accent',
      price: '₹549',
      image: 'assets/images/sunflower.jpg',
      badge: 'Festive Cheer'
    },
    {
      title: 'Artisanal Gift Hamper',
      subtitle: 'Packed in sustainable kraft box',
      price: '₹1,899',
      image: 'assets/images/giftbox.jpg',
      badge: 'Festive Gifting'
    },
    {
      title: 'Mini Honey Bear',
      subtitle: 'Dressed in tiny festive bow',
      price: '₹499',
      image: 'assets/images/bear.jpg',
      badge: 'Sweet Surprise'
    },
    {
      title: 'Mixed Autumn Bloom Bouquet',
      subtitle: 'Rich terracotta & golden blossoms',
      price: '₹899',
      image: 'assets/images/bouquet.jpg',
      badge: 'Warm Ambiance'
    }
  ],
  'christmas': [
    {
      title: 'Mini Caramel Bear',
      subtitle: 'Cozy winter cuddle amigurumi',
      price: '₹499',
      image: 'assets/images/bear.jpg',
      badge: 'Winter Cozy'
    },
    {
      title: 'Mini Mushroom Plushie',
      subtitle: 'Whimsical forest floor creature',
      price: '₹399',
      image: 'assets/images/mushroom.jpg',
      badge: 'Fairytale Gift'
    },
    {
      title: 'Everlasting White Tulip Bouquet',
      subtitle: 'Winter snow white & soft cream petals',
      price: '₹799',
      image: 'assets/images/tulips.jpg',
      badge: 'Pure Elegance'
    },
    {
      title: 'Festive Studio Keepsake Box',
      subtitle: 'Handwritten calligraphy wooden tag',
      price: '₹1,899',
      image: 'assets/images/giftbox.jpg',
      badge: 'Under The Tree'
    }
  ],
  'birthday': [
    {
      title: 'Crochet Daisy Bouquet',
      subtitle: 'Joyful everlasting celebration bunch',
      price: '₹699',
      image: 'assets/images/bouquet.jpg',
      badge: 'Birthday Bloom'
    },
    {
      title: 'Mini Bear with Bowtie',
      subtitle: 'Ready to bring big birthday smiles',
      price: '₹499',
      image: 'assets/images/bear.jpg',
      badge: 'Crowd Favorite'
    },
    {
      title: 'Flower Keychain Charm',
      subtitle: 'Sweet pocket birthday trinket',
      price: '₹199',
      image: 'assets/images/keychain.jpg',
      badge: 'Budget Friendly'
    },
    {
      title: 'Custom Pet Replica',
      subtitle: 'The most unforgettable birthday gift',
      price: '₹1,499',
      image: 'assets/images/pet_plushie.jpg',
      badge: 'Bespoke Keepsake'
    }
  ],
  'wedding': [
    {
      title: 'Mini Couple Dolls',
      subtitle: 'Custom outfits matching wedding couple',
      price: '₹1,299',
      image: 'assets/images/bear.jpg',
      badge: 'Wedding Keepsake'
    },
    {
      title: 'Bridal Tulip & Rose Bouquet',
      subtitle: 'Bouquet that remains fresh for decades',
      price: '₹1,199',
      image: 'assets/images/tulips.jpg',
      badge: 'Forever Keepsake'
    },
    {
      title: 'Twin Heart Keychains',
      subtitle: 'Engraved with couple anniversary date',
      price: '₹399',
      image: 'assets/images/heart_keychain.jpg',
      badge: 'Wedding Favor'
    },
    {
      title: 'Deluxe Linen Gift Box',
      subtitle: 'Includes calligraphy vows and wood card',
      price: '₹1,899',
      image: 'assets/images/giftbox.jpg',
      badge: 'Luxury Box'
    }
  ]
};

// Gift Finder State
const finderState = {
  recipient: 'Her',
  occasion: 'Birthday',
  giftType: 'Flowers',
  budget: '₹500–₹1,000'
};

document.addEventListener('DOMContentLoaded', () => {
  initGiftFinder();
  initSeasonalTabs();
});

// --- GIFT FINDER ENGINE ---
function initGiftFinder() {
  // Setup pill buttons
  setupFinderButtonGroup('q1-pills', (val) => { finderState.recipient = val; });
  setupFinderButtonGroup('q2-pills', (val) => { finderState.occasion = val; });
  setupFinderButtonGroup('q3-pills', (val) => { finderState.giftType = val; });
  setupFinderButtonGroup('q4-pills', (val) => { finderState.budget = val; });

  const findBtn = document.getElementById('btn-find-my-gift');
  if (findBtn) {
    findBtn.addEventListener('click', runGiftFinder);
  }
}

function setupFinderButtonGroup(containerId, onSelect) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const buttons = container.querySelectorAll('.finder-pill-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const val = btn.getAttribute('data-val');
      if (val) onSelect(val);
    });
  });
}

function runGiftFinder() {
  const resultsBox = document.getElementById('finder-results-box');
  const resultsGrid = document.getElementById('finder-results-grid');
  const resultsSummary = document.getElementById('finder-results-summary');

  if (!resultsBox || !resultsGrid) return;

  // Matching algorithm: scored on recipient, occasion, type, and budget
  const scored = GIFT_CATALOG.map(item => {
    let score = 0;
    if (item.recipients.includes(finderState.recipient)) score += 3;
    if (item.occasions.includes(finderState.occasion)) score += 3;
    if (item.types.includes(finderState.giftType)) score += 4;
    if (finderState.giftType === 'Surprise Me') score += 2;
    if (item.budgetTier === finderState.budget) score += 2;
    return { ...item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.slice(0, 3);

  if (resultsSummary) {
    resultsSummary.innerHTML = `
      Curated recommendations for <strong>${finderState.recipient}</strong>'s 
      <strong>${finderState.occasion}</strong> 
      (${finderState.giftType} • Budget: ${finderState.budget})
    `;
  }

  resultsGrid.innerHTML = topMatches.map(product => `
    <article class="product-card">
      <div class="product-card-media">
        <span class="badge badge-linen product-card-badge">${product.matchTag}</span>
        <img class="product-card-img" src="${product.image}" alt="${product.title}" loading="lazy">
      </div>
      <div class="product-card-body">
        <div class="product-card-category">${product.category}</div>
        <h3 class="product-card-title">
          <a href="product-details.html">${product.title}</a>
        </h3>
        <div class="product-card-footer">
          <div class="product-card-price">₹${product.price.toLocaleString('en-IN')}</div>
          <button type="button" class="btn btn-primary btn-sm" onclick="showCollectionsToast('Added to your little basket ♡')">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  `).join('');

  resultsBox.style.display = 'block';

  // Smooth scroll down to results
  resultsBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showCollectionsToast("Found perfect handmade matches! 🌸");
}

function resetGiftFinder() {
  const resultsBox = document.getElementById('finder-results-box');
  if (resultsBox) resultsBox.style.display = 'none';

  // Reset to first button in each row
  ['q1-pills', 'q2-pills', 'q3-pills', 'q4-pills'].forEach(id => {
    const container = document.getElementById(id);
    if (!container) return;
    const btns = container.querySelectorAll('.finder-pill-btn');
    btns.forEach((b, idx) => b.classList.toggle('active', idx === 0));
  });

  finderState.recipient = 'Her';
  finderState.occasion = 'Birthday';
  finderState.giftType = 'Flowers';
  finderState.budget = 'Under ₹500';

  showCollectionsToast("Gift finder reset. Ready to explore again ♡");
}

// --- SEASONAL COLLECTION SWITCHER ---
function initSeasonalTabs() {
  const tabs = document.querySelectorAll('.seasonal-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const seasonKey = tab.getAttribute('data-season') || 'valentines';
      renderSeasonalProducts(seasonKey);
    });
  });
}

function renderSeasonalProducts(seasonKey) {
  const grid = document.getElementById('seasonal-products-grid');
  if (!grid || !SEASONAL_DATA[seasonKey]) return;

  const products = SEASONAL_DATA[seasonKey];
  grid.style.opacity = '0.5';

  setTimeout(() => {
    grid.innerHTML = products.map(item => `
      <article class="product-card">
        <div class="product-card-media">
          <span class="badge badge-linen product-card-badge">${item.badge}</span>
          <img class="product-card-img" src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="product-card-body">
          <h3 class="product-card-title">
            <a href="product-details.html">${item.title}</a>
          </h3>
          <p class="text-subtle" style="font-size: var(--text-xs); margin: 4px 0 10px;">${item.subtitle}</p>
          <div class="product-card-footer">
            <div class="product-card-price">${item.price}</div>
            <button type="button" class="btn btn-primary btn-sm" onclick="showCollectionsToast('Added to your little basket ♡')">
              Add to Cart
            </button>
          </div>
        </div>
      </article>
    `).join('');
    grid.style.opacity = '1';
  }, 120);
}

// --- TOAST MICRO-INTERACTIONS ---
function showCollectionsToast(message) {
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
