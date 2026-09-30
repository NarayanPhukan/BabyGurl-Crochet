/**
 * BABYGURL CROCHET — CUSTOM CROCHET INTERACTIVE ENGINE
 * Stepper wizard, reference photo drag-and-drop, category auto-selection,
 * dynamic review summary, transparent quote workflow, and friendly success state.
 */

// Custom Request Form State
const customState = {
  currentStep: 1,
  totalSteps: 6,
  idea: '',
  category: '',
  referenceImages: [], // array of { name, dataUrl }
  colors: [],
  customColorText: '',
  size: 'Medium (Standard ~20cm)',
  quantity: 1,
  material: 'Combed Milk Cotton (Ultra Soft)',
  additionalNotes: '',
  budget: '₹1,000–₹2,000',
  requiredDate: '',
  contact: {
    name: '',
    phone: '',
    email: '',
    city: '',
    preferWhatsapp: true
  },
  requestId: null
};

document.addEventListener('DOMContentLoaded', () => {
  initStepper();
  initCategoryCards();
  initImageDropzone();
  initQuantityStepper();
  initDatePicker();
  initGalleryQuickRequests();
  initSwatchesAndPills();
});

// --- STEPPER NAVIGATION ---
function initStepper() {
  const stepBtns = document.querySelectorAll('.stepper-step-btn');
  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStep = parseInt(btn.getAttribute('data-step'), 10);
      if (targetStep < customState.currentStep || validateStep(customState.currentStep)) {
        goToStep(targetStep);
      }
    });
  });
}

function goToStep(stepNumber) {
  if (stepNumber < 1 || stepNumber > customState.totalSteps) return;

  // Save current step data before navigating
  saveCurrentStepData();

  customState.currentStep = stepNumber;

  // Update step panels visibility
  for (let i = 1; i <= customState.totalSteps; i++) {
    const panel = document.getElementById(`step-${i}-panel`);
    if (panel) {
      panel.classList.toggle('active', i === stepNumber);
    }
  }

  // Update Stepper Header Buttons
  const stepBtns = document.querySelectorAll('.stepper-step-btn');
  stepBtns.forEach(btn => {
    const step = parseInt(btn.getAttribute('data-step'), 10);
    btn.classList.toggle('active', step === stepNumber);
    btn.classList.toggle('completed', step < stepNumber);
  });

  // If entering review step (Step 6), build summary
  if (stepNumber === 6) {
    renderReviewSummary();
  }

  // Scroll smoothly to form top on step change
  const formCard = document.getElementById('custom-form-wrapper');
  if (formCard) {
    const yOffset = -80;
    const y = formCard.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function nextStep() {
  if (validateStep(customState.currentStep)) {
    goToStep(customState.currentStep + 1);
  }
}

function prevStep() {
  goToStep(customState.currentStep - 1);
}

// Validation per step
function validateStep(step) {
  if (step === 1) {
    const desc = document.getElementById('custom-idea-desc')?.value.trim();
    if (!desc || desc.length < 5) {
      showCustomToast('Please share a few words about what you would like made ♡');
      document.getElementById('custom-idea-desc')?.focus();
      return false;
    }
  } else if (step === 5) {
    const name = document.getElementById('contact-name')?.value.trim();
    const phone = document.getElementById('contact-phone')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();

    if (!name) {
      showCustomToast('Please let us know your name ♡');
      document.getElementById('contact-name')?.focus();
      return false;
    }
    if (!phone && !email) {
      showCustomToast('Please provide a WhatsApp number or email so we can send your quote ♡');
      document.getElementById('contact-phone')?.focus();
      return false;
    }
  }
  return true;
}

function saveCurrentStepData() {
  // Step 1
  const ideaDesc = document.getElementById('custom-idea-desc')?.value.trim();
  const catVal = document.getElementById('custom-category-select')?.value;
  if (ideaDesc) customState.idea = ideaDesc;
  if (catVal) customState.category = catVal;

  // Step 3
  const customColorInput = document.getElementById('custom-color-text')?.value.trim();
  if (customColorInput) customState.customColorText = customColorInput;

  const notes = document.getElementById('custom-extra-notes')?.value.trim();
  if (notes) customState.additionalNotes = notes;

  // Step 4
  const dateInput = document.getElementById('custom-required-date')?.value;
  if (dateInput) customState.requiredDate = dateInput;

  // Step 5
  customState.contact.name = document.getElementById('contact-name')?.value.trim() || '';
  customState.contact.phone = document.getElementById('contact-phone')?.value.trim() || '';
  customState.contact.email = document.getElementById('contact-email')?.value.trim() || '';
  customState.contact.city = document.getElementById('contact-city')?.value.trim() || '';
  customState.contact.preferWhatsapp = document.getElementById('contact-pref-whatsapp')?.checked ?? true;
}

// --- OPTION PILLS & SWATCHES ---
function initSwatchesAndPills() {
  // Color checkboxes
  const colorInputs = document.querySelectorAll('input[name="preferred-colors"]');
  colorInputs.forEach(input => {
    input.addEventListener('change', () => {
      customState.colors = Array.from(colorInputs).filter(i => i.checked).map(i => i.value);
    });
  });

  // Size Radios
  const sizeInputs = document.querySelectorAll('input[name="preferred-size"]');
  sizeInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) customState.size = input.value;
    });
  });

  // Material Radios
  const matInputs = document.querySelectorAll('input[name="preferred-material"]');
  matInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) customState.material = input.value;
    });
  });

  // Budget Radios
  const budgetInputs = document.querySelectorAll('input[name="preferred-budget"]');
  budgetInputs.forEach(input => {
    input.addEventListener('change', () => {
      if (input.checked) customState.budget = input.value;
    });
  });
}

// --- QUANTITY STEPPER ---
function initQuantityStepper() {
  window.adjustCustomQty = function(delta) {
    customState.quantity = Math.max(1, customState.quantity + delta);
    const qtyEl = document.getElementById('custom-qty-val');
    if (qtyEl) qtyEl.textContent = customState.quantity;
  };
}

// --- DATE PICKER ---
function initDatePicker() {
  const picker = document.getElementById('custom-required-date');
  if (!picker) return;

  // Set min date to 5 days ahead
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 5);
  picker.min = minDate.toISOString().split('T')[0];

  picker.addEventListener('change', (e) => {
    customState.requiredDate = e.target.value;
  });
}

// --- CATEGORY PRE-SELECTION FROM WHAT CAN WE MAKE GRID ---
function initCategoryCards() {
  const cards = document.querySelectorAll('.custom-cat-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = card.getAttribute('data-category') || 'Plushie';
      selectCustomCategory(cat);
    });
  });
}

function selectCustomCategory(categoryName) {
  customState.category = categoryName;

  const select = document.getElementById('custom-category-select');
  if (select) {
    select.value = categoryName;
  }

  // Go to step 1
  goToStep(1);

  // Focus textarea
  const textarea = document.getElementById('custom-idea-desc');
  if (textarea && !textarea.value) {
    textarea.placeholder = `Tell us what kind of ${categoryName.toLowerCase()} you're imagining... (e.g. colors, character style, special features)`;
    textarea.focus();
  }

  showCustomToast(`Selected category: ${categoryName} ♡`);
}

// --- IMAGE UPLOAD DROPZONE ---
function initImageDropzone() {
  const dropzone = document.getElementById('custom-image-dropzone');
  const fileInput = document.getElementById('custom-file-input');
  if (!dropzone || !fileInput) return;

  dropzone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add('drag-over');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove('drag-over');
    }, false);
  });

  dropzone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
  });

  fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
  });
}

function handleFiles(files) {
  if (!files || files.length === 0) return;

  Array.from(files).forEach(file => {
    if (!file.type.startsWith('image/')) {
      showCustomToast('Please upload an image file (JPG, PNG, or WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      customState.referenceImages.push({
        name: file.name,
        dataUrl: e.target.result
      });
      renderImagePreviews();
      showCustomToast(`Added reference image: ${file.name} ♡`);
    };
    reader.readAsDataURL(file);
  });
}

function renderImagePreviews() {
  const grid = document.getElementById('uploaded-thumbs-grid');
  if (!grid) return;

  if (customState.referenceImages.length === 0) {
    grid.innerHTML = '';
    return;
  }

  grid.innerHTML = customState.referenceImages.map((img, idx) => `
    <div class="upload-thumb-card">
      <img src="${img.dataUrl}" alt="${img.name}">
      <button type="button" class="upload-thumb-remove" onclick="removeUploadedImage(${idx})" aria-label="Remove image">✕</button>
    </div>
  `).join('');
}

function removeUploadedImage(index) {
  customState.referenceImages.splice(index, 1);
  renderImagePreviews();
  showCustomToast('Reference image removed');
}

// --- GALLERY QUICK REQUEST BUTTONS ---
function initGalleryQuickRequests() {
  const btns = document.querySelectorAll('.btn-request-similar');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || 'Custom Creation';
      const cat = btn.getAttribute('data-category') || 'Plushie';

      customState.category = cat;
      const select = document.getElementById('custom-category-select');
      if (select) select.value = cat;

      const textarea = document.getElementById('custom-idea-desc');
      if (textarea) {
        textarea.value = `I would love a custom piece inspired by "${title}". Specific details: `;
      }

      goToStep(1);
      showCustomToast(`Loaded inspiration for "${title}" ♡`);
    });
  });
}

// --- REVIEW SUMMARY RENDER ---
function renderReviewSummary() {
  saveCurrentStepData();

  const container = document.getElementById('review-summary-container');
  if (!container) return;

  const colorSummary = [
    ...(customState.colors || []),
    customState.customColorText
  ].filter(Boolean).join(', ') || 'Natural yarn maker palette';

  const dateFormatted = customState.requiredDate 
    ? new Date(customState.requiredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : 'No strict deadline (Flexible)';

  container.innerHTML = `
    <div class="review-row">
      <div class="review-row-label">What to make:</div>
      <div class="review-row-value">${customState.category || 'Custom Crochet'}</div>
    </div>
    <div class="review-row">
      <div class="review-row-label">Your Vision:</div>
      <div class="review-row-value" style="font-weight: var(--weight-normal);">${customState.idea || 'Described in request'}</div>
    </div>
    <div class="review-row">
      <div class="review-row-label">Reference Images:</div>
      <div class="review-row-value">${customState.referenceImages.length} inspiration photo(s) attached</div>
    </div>
    <div class="review-row">
      <div class="review-row-label">Colors & Yarn:</div>
      <div class="review-row-value">${colorSummary} • ${customState.material}</div>
    </div>
    <div class="review-row">
      <div class="review-row-label">Size & Quantity:</div>
      <div class="review-row-value">${customState.size} • Qty: ${customState.quantity}</div>
    </div>
    <div class="review-row">
      <div class="review-row-label">Target Budget:</div>
      <div class="review-row-value">${customState.budget}</div>
    </div>
    <div class="review-row">
      <div class="review-row-label">Needed By:</div>
      <div class="review-row-value">${dateFormatted}</div>
    </div>
    <div class="review-row">
      <div class="review-row-label">Contact For Quote:</div>
      <div class="review-row-value">${customState.contact.name || 'Friend of BabyGurl'} (${customState.contact.phone || customState.contact.email || 'Email'})</div>
    </div>
  `;
}

// --- SUBMIT CUSTOM REQUEST ---
function submitCustomRequest(e) {
  if (e) e.preventDefault();

  saveCurrentStepData();

  // Generate reference number
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  customState.requestId = `BGC-CUST-${randomNum}`;

  // Hide the form wrapper card
  const formWrapper = document.getElementById('custom-form-wrapper');
  if (formWrapper) formWrapper.style.display = 'none';

  // Show the success card
  const successCard = document.getElementById('custom-success-card');
  if (successCard) {
    successCard.style.display = 'block';

    const idEl = document.getElementById('success-request-id');
    if (idEl) idEl.textContent = customState.requestId;

    const contactEl = document.getElementById('success-contact-info');
    if (contactEl) {
      contactEl.textContent = customState.contact.phone || customState.contact.email || 'your contact details';
    }

    // Scroll to success screen
    window.scrollTo({
      top: successCard.getBoundingClientRect().top + window.pageYOffset - 60,
      behavior: 'smooth'
    });
  }

  showCustomToast("Your idea is on its way ♡");
}

// --- STATUS TRACKER DIALOG ---
function openStatusModal() {
  const modal = document.getElementById('custom-status-modal');
  if (modal) {
    const idEl = document.getElementById('modal-status-request-id');
    if (idEl) idEl.textContent = customState.requestId || 'BGC-CUST-8492';
    modal.showModal();
  }
}

function closeStatusModal() {
  const modal = document.getElementById('custom-status-modal');
  if (modal) modal.close();
}

// --- TOAST NOTIFICATIONS ---
function showCustomToast(message) {
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
