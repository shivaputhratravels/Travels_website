const SHIVAPUTRA_WHATSAPP = "917338939339";

// 1. Page Switcher (Hides all .page containers and opens the selected one)
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active-page');
  });

  // Page Aliases for backwards compatibility
  let actualPageId = pageId;
  if (pageId === 'packages') actualPageId = 'temple-packages';
  if (pageId === 'airport') actualPageId = 'cab-rental';
  if (pageId === 'car-rental') actualPageId = 'tariff';

  const target = document.getElementById('page-' + actualPageId);
  if (target) target.classList.add('active-page');

  // Update Desktop Nav active indicator
  document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
  let activeNavId = 'nav-' + actualPageId;
  if (actualPageId === 'temple-packages' || actualPageId === 'holiday-packages' || actualPageId === 'tirupati-packages' || actualPageId === 'outstation-packages') {
    activeNavId = 'nav-packages';
  }
  const activeNav = document.getElementById(activeNavId);
  if (activeNav) activeNav.classList.add('active');

  // Update Mobile Drawer Nav active indicator
  document.querySelectorAll('.drawer-links a').forEach(link => link.classList.remove('active'));
  let activeDrawerId = 'drawer-' + actualPageId;
  if (actualPageId === 'temple-packages' || actualPageId === 'holiday-packages' || actualPageId === 'tirupati-packages' || actualPageId === 'outstation-packages') {
    activeDrawerId = 'drawer-packages';
  }
  const activeDrawerNav = document.getElementById(activeDrawerId);
  if (activeDrawerNav) activeDrawerNav.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Package Category Switcher
function filterPackages(category) {
  switchTourTab(category);
}

function switchTourTab(category) {
  if (category === 'holiday') {
    showPage('holiday-packages');
  } else if (category === 'tirupati') {
    showPage('tirupati-packages');
  } else if (category === 'outstation') {
    showPage('outstation-packages');
  } else {
    showPage('temple-packages');
  }
}

function handleDrawerSubNav(category) {
  toggleMobileMenu(false);
  switchTourTab(category);
}

// 3. Central WhatsApp Link Dispatcher
function sendToWhatsApp(message) {
  const encodedMsg = encodeURIComponent(message);
  const url = `https://wa.me/${SHIVAPUTRA_WHATSAPP}?text=${encodedMsg}`;
  window.open(url, '_blank');
}

function openDirectWhatsApp(context) {
  sendToWhatsApp(`Hello Shivaputra Travels! I would like to inquire about: ${context}`);
}

// 4. Package Pricing Query Trigger
function enquirePackage(packageName) {
  const msg = `Hello Shivaputra Travels! I am interested in booking the "${packageName}". Please share the pricing details, inclusions, and available vehicle options.`;
  sendToWhatsApp(msg);
}

// 5. Vehicle Pricing Query Trigger
function enquireVehicle(vehicleName) {
  const msg = `Hello Shivaputra Travels! I would like to know the rental tariff and availability for your "${vehicleName}".`;
  sendToWhatsApp(msg);
}

// 5.5 Category Tour Packages Switcher for Plan Your Journey
const BOOKING_TOUR_OPTIONS = {
  tirupati: [
    { val: "Chennai to Tirupati 1 Day (All-Inclusive with Food & 300 Tickets)", label: "Chennai to Tirupati 1 Day (Food + 300 Tickets + Transport)" },
    { val: "Chennai to Tirupati and Padmavathi Temple (2 Days / 1 Night Transport Only)", label: "Chennai ➔ Tirupati ➔ Padmavathi (2D/1N Transport Only)" },
    { val: "Chennai to Tirupati - Padmavathi - Srikalahasti (2 Days / 1 Night Transport Only)", label: "Chennai ➔ Tirupati ➔ Padmavathi ➔ Srikalahasti (2D/1N Transport)" },
    { val: "Chennai to Sri Kalahasthi Temple Tour (1 Day / 2 Days)", label: "Chennai to Sri Kalahasthi Tour (1 Day / 2 Days)" }
  ],
  temple: [
    { val: "Grand South Indian Temple Tour (10 Days / 9 Nights)", label: "Grand South Indian Temple Tour (10 Days / 9 Nights) ⭐" },
    { val: "Chennai to Aarupadai Veedu (6 Days)", label: "Chennai to Aarupadai Veedu (6 Days)" },
    { val: "Navagraha Temple Tour (3 Days)", label: "Navagraha Temple Tour (3 Days)" },
    { val: "Thiruvannamalai Girivalam Special (1 Day)", label: "Thiruvannamalai Girivalam Special (1 Day)" },
    { val: "Kanchipuram & Mahabalipuram Temple Tour (1 Day)", label: "Kanchipuram & Mahabalipuram (1 Day)" },
    { val: "Rameshwaram & Madurai Divine Yatra (4 Days)", label: "Rameshwaram & Madurai Yatra (4 Days)" },
    { val: "Chidambaram & Kumbakonam Temple Tour (2 Days)", label: "Chidambaram & Kumbakonam (2 Days)" }
  ],
  holiday: [
    { val: "Ooty & Coonoor Hill Escape (3 Days)", label: "Ooty & Coonoor Hill Escape (3 Days)" },
    { val: "Kodaikanal Queen of Hills (3 Days)", label: "Kodaikanal Queen of Hills (3 Days)" },
    { val: "Pondicherry & ECR Beach Retreat (2 Days)", label: "Pondicherry & ECR Beach Retreat (2 Days)" },
    { val: "Munnar & Alleppey Backwaters (4 Days)", label: "Munnar & Alleppey Backwaters (4 Days)" },
    { val: "Yercaud Hill Station Getaway (2 Days)", label: "Yercaud Hill Station Getaway (2 Days)" },
    { val: "Wayanad Nature & Wildlife Tour (3 Days)", label: "Wayanad Nature & Wildlife Tour (3 Days)" }
  ],
  local: [
    { val: "Chennai Local (5 Hrs / 50 Kms)", label: "Chennai Local (5 Hrs / 50 Kms)" },
    { val: "Chennai Local Full Day (10 Hrs / 100 Kms)", label: "Chennai Local Full Day (10 Hrs / 100 Kms)" },
    { val: "Chennai Airport Transfer (Drop / Pickup)", label: "Chennai Airport Transfer (Drop / Pickup)" },
    { val: "Chennai Central / Egmore Railway Transfer", label: "Chennai Railway Transfer" }
  ],
  outstation: [
    { val: "Custom Outstation Trip (Per Km Basis)", label: "Custom Outstation Trip (Per Km Basis)" },
    { val: "Multi-City Tamil Nadu Tour", label: "Multi-City Tamil Nadu Tour" },
    { val: "Interstate South India Tour", label: "Interstate South India Tour" }
  ]
};

function setBookingCategory(category, btnElement) {
  if (btnElement) {
    document.querySelectorAll('.book-cat-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
  }
  const selectElem = document.getElementById('home-tour-type');
  if (!selectElem) return;

  const options = BOOKING_TOUR_OPTIONS[category] || BOOKING_TOUR_OPTIONS['temple'];
  const defaultOpt = `<option value="" disabled selected>-- Select Tour Package --</option>`;
  selectElem.innerHTML = defaultOpt + options.map(opt => `<option value="${opt.val}">${opt.label}</option>`).join('');
}

// 6. Plan Your Journey Form Submission
function submitHomeEnquiry() {
  const tour = document.getElementById('home-tour-type').value || "General Package Inquiry";
  const vehicle = document.getElementById('home-vehicle').value || "Vehicle to be suggested";
  const pickup = document.getElementById('home-pickup').value || "Chennai (Doorstep)";
  const date = document.getElementById('home-date').value || "Flexible / Not selected";
  const pax = document.getElementById('home-pax').value || "To be specified";

  const message = `*NEW TRIP ENQUIRY - SHIVAPUTHRA TRAVELS*\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `🛕 *Package / Route:* ${tour}\n` +
                  `🚗 *Vehicle Preference:* ${vehicle}\n` +
                  `📍 *Pickup Location:* ${pickup}\n` +
                  `📅 *Date of Journey:* ${date}\n` +
                  `👥 *Passengers:* ${pax}\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `Please share vehicle availability and the all-inclusive pricing quote.`;

  sendToWhatsApp(message);
}

// 7. Corporate Form Submission
function submitCorporateEnquiry() {
  const company = document.getElementById('corp-company')?.value || "Not specified";
  const person = document.getElementById('corp-name')?.value || "Corporate Representative";
  const email = document.getElementById('corp-email')?.value || "Not specified";
  const phone = document.getElementById('corp-phone')?.value || "Not specified";
  const fleet = document.getElementById('corp-fleet')?.value || "Executive Fleet";
  const req = document.getElementById('corp-req')?.value || "Fleet Rates & Tariff";

  const msg = `*CORPORATE MOBILITY ENQUIRY - SHIVAPUTHRA TRAVELS*\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `🏢 *Company:* ${company}\n` +
              `👤 *Contact Person:* ${person}\n` +
              `✉️ *Work Email:* ${email}\n` +
              `📞 *Phone / WhatsApp:* ${phone}\n` +
              `🚗 *Fleet Required:* ${fleet}\n` +
              `📋 *Requirement Scope:* ${req}\n` +
              `━━━━━━━━━━━━━━━━━━━━━━\n` +
              `Please share your official corporate rate card and GST monthly account credit terms.`;
  sendToWhatsApp(msg);
}

function openDirectWhatsApp(topic) {
  const msg = `Hello Shivaputhra Travels! I am inquiring about "${topic}" for our corporate fleet requirements. Please connect with our team.`;
  sendToWhatsApp(msg);
}

// 7b. Contact Us Form Submission
function handleContactSubmit(event) {
  if (event) event.preventDefault();
  const name = document.getElementById('contact-name')?.value || "Customer";
  const phone = document.getElementById('contact-phone')?.value || "Not specified";
  const service = document.getElementById('contact-service')?.value || "General Query";
  const msgText = document.getElementById('contact-msg')?.value || "No additional message";

  const message = `*CONTACT US INQUIRY - SHIVAPUTHRA TRAVELS*\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `👤 *Name:* ${name}\n` +
                  `📞 *Phone:* ${phone}\n` +
                  `🛕 *Service Interested:* ${service}\n` +
                  `💬 *Message:* ${msgText}\n` +
                  `━━━━━━━━━━━━━━━━━━━━━━\n` +
                  `Please get back to me with trip quote and details.`;

  sendToWhatsApp(message);
}

// 7b. Cab Rental Service Pillar Selection & Form Scroll
function selectCabRentalServiceType(serviceName) {
  const serviceSelect = document.getElementById('rental-service-type') || document.getElementById('airport-service-type');
  if (serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) ||
          serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }
  const formSection = document.getElementById('cab-rental-booking-form-section') || document.getElementById('car-rental-booking-form-section');
  if (formSection) {
    formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formSection.style.transition = 'all 0.4s ease';
    formSection.style.boxShadow = '0 0 0 3px rgba(217, 119, 6, 0.4), 0 20px 40px rgba(0,0,0,0.12)';
    setTimeout(() => {
      formSection.style.boxShadow = '';
    }, 1800);
  }
}

// Aliases for backwards compatibility
function selectRentalServiceType(serviceName) {
  selectCabRentalServiceType(serviceName);
}
function selectAirportServiceType(serviceName) {
  selectCabRentalServiceType(serviceName);
}

// 7c. Airport Booking Legacy Handler (routed to car rental submission)
function submitAirportBookingEnquiry() {
  submitCarRentalEnquiry();
}

// 7d. Filter Fleet on Car Rental Page
function filterCarRentalFleet(category) {
  const tabBtns = document.querySelectorAll('.car-filter-btn');
  tabBtns.forEach(btn => btn.classList.remove('active'));
  
  const activeBtn = document.getElementById(`car-tab-${category}`);
  if (activeBtn) activeBtn.classList.add('active');

  const cards = document.querySelectorAll('.car-fleet-card-item');
  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// 7e. Cab Rental Form Submission
function submitCarRentalEnquiry() {
  const name = document.getElementById('rental-name')?.value?.trim() || "Customer";
  const phone = document.getElementById('rental-phone')?.value?.trim() || "Not specified";
  const serviceType = document.getElementById('rental-service-type')?.value || "Airport Transfer";
  const vehicle = document.getElementById('rental-vehicle')?.value || "Vehicle Rental";
  const pickup = document.getElementById('rental-pickup')?.value?.trim() || "Not specified";
  const drop = document.getElementById('rental-drop')?.value?.trim() || "Not specified";
  const date = document.getElementById('rental-date')?.value || "Not specified";
  const pickupTime = document.getElementById('rental-pickup-time')?.value || "Not specified";
  const passengers = document.getElementById('rental-passengers')?.value || "Not specified";
  const notes = document.getElementById('rental-notes')?.value?.trim() || "";

  let msg = `*🚗 CAB RENTAL BOOKING ENQUIRY - SHIVAPUTHRA TRAVELS*\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n` +
            `👤 *Customer Name:* ${name}\n` +
            `📞 *WhatsApp / Phone:* ${phone}\n` +
            `🛎️ *Service Type:* ${serviceType}\n` +
            `🚘 *Vehicle Model:* ${vehicle}\n` +
            `📍 *Pickup Location:* ${pickup}\n` +
            `🏁 *Drop / Destination:* ${drop}\n` +
            `📅 *Travel Date:* ${date}\n` +
            `⏰ *Pickup Time:* ${pickupTime}\n` +
            `👥 *Travelers Count:* ${passengers}\n`;

  if (notes) {
    msg += `📝 *Notes / Flight No:* ${notes}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━━\n` +
         `Please share confirmation, vehicle availability, and total tariff quote.`;

  sendToWhatsApp(msg);
}

// 8. Fleet Category Filter
function filterFleet(category, element) {
  document.querySelectorAll('.fleet-tab-btn').forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');

  const items = document.querySelectorAll('.fleet-item');
  items.forEach(item => {
    if (category === 'all') {
      item.style.display = 'flex';
    } else if (item.classList.contains('fleet-' + category)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// 9. Direct Booking Action for Specific Vehicle
function bookFleetVehicle(vehicleName) {
  const msg = `Hello Shivaputra Travels! I would like to book the "${vehicleName}" from your fleet tariff. Please verify availability and share next booking steps.`;
  sendToWhatsApp(msg);
}

// 10. Automatic 1.5-second Hero Background Slider
// Synchronized 3-Second Hero Image & Content Slider with Dot Navigation
let currentSlideIndex = 0;
let slideInterval = null;
const slides = document.querySelectorAll('.hero-slide');
const textBlocks = document.querySelectorAll('.hero-text-block');
const heroDots = document.querySelectorAll('.hero-dot');

function goToSlide(index) {
  if (slides.length === 0 || textBlocks.length === 0) return;
  
  slides[currentSlideIndex].classList.remove('active-slide');
  textBlocks[currentSlideIndex].classList.remove('active-text');
  if (heroDots.length > currentSlideIndex) {
    heroDots[currentSlideIndex].classList.remove('active');
  }

  currentSlideIndex = index;

  slides[currentSlideIndex].classList.add('active-slide');
  textBlocks[currentSlideIndex].classList.add('active-text');
  if (heroDots.length > currentSlideIndex) {
    heroDots[currentSlideIndex].classList.add('active');
  }

  startSlideTimer();
}

function startSlideTimer() {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, 3000); // 3 seconds (3000ms) autoplay
}

if (slides.length > 0 && textBlocks.length > 0) {
  startSlideTimer();
}

// Mobile Side-Drawer Menu Handlers
function toggleMobileMenu(isOpen) {
  const drawer = document.getElementById('side-drawer');
  const overlay = document.getElementById('drawer-overlay');
  if (isOpen) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleMobileSubmenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  const dropdown = document.getElementById('drawer-dropdown-item');
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}

function handleDrawerNav(pageId) {
  toggleMobileMenu(false);
  showPage(pageId);
}

function handleDrawerSubNav(category) {
  toggleMobileMenu(false);
  switchTourTab(category);
}

// Close drawer on Escape key press
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    toggleMobileMenu(false);
  }
});

// 11. Premium Overlapping Testimonial Stack Carousel
let currentStackIndex = 1;
const totalStackCards = 3;
let stackAutoTimer = null;

function updateStackCarousel() {
  const container = document.getElementById('testimonialStackContainer');
  if (!container) return;
  const cards = container.querySelectorAll('.stack-card');
  const dots = document.querySelectorAll('.review-dot');

  cards.forEach((card, idx) => {
    card.classList.remove('card-center', 'card-left', 'card-right', 'card-hidden');

    const diff = (idx - currentStackIndex + totalStackCards) % totalStackCards;

    if (diff === 0) {
      card.classList.add('card-center');
    } else if (diff === 1) {
      card.classList.add('card-right');
    } else if (diff === 2) {
      card.classList.add('card-left');
    } else {
      card.classList.add('card-hidden');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentStackIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function startStackAutoSlide() {
  if (stackAutoTimer) clearInterval(stackAutoTimer);
  stackAutoTimer = setInterval(() => {
    currentStackIndex = (currentStackIndex + 1) % totalStackCards;
    updateStackCarousel();
  }, 4000); // 4 Seconds Auto Slide
}

function nextStackCard() {
  currentStackIndex = (currentStackIndex + 1) % totalStackCards;
  updateStackCarousel();
  startStackAutoSlide();
}

function prevStackCard() {
  currentStackIndex = (currentStackIndex - 1 + totalStackCards) % totalStackCards;
  updateStackCarousel();
  startStackAutoSlide();
}

function goToStackCard(index) {
  currentStackIndex = index;
  updateStackCarousel();
  startStackAutoSlide();
}

let stackTouchStartX = 0;
let stackTouchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
  updateStackCarousel();
  startStackAutoSlide();

  const stackContainer = document.getElementById('testimonialStackContainer');
  if (stackContainer) {
    stackContainer.addEventListener('touchstart', e => {
      stackTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stackContainer.addEventListener('touchend', e => {
      stackTouchEndX = e.changedTouches[0].screenX;
      const diff = stackTouchStartX - stackTouchEndX;
      if (Math.abs(diff) > 35) {
        if (diff > 0) {
          nextStackCard();
        } else {
          prevStackCard();
        }
      }
    }, { passive: true });
  }
});

// Reviews Auto-Moving Carousel Engine
let currentRevIndex = 0;
let currentRevSource = 'all';
let revAutoTimer = null;

function getActiveRevCards() {
  const cards = Array.from(document.querySelectorAll('.review-item-card'));
  if (currentRevSource === 'all') return cards;
  return cards.filter(c => c.getAttribute('data-source') === currentRevSource);
}

function updateRevCarousel() {
  const activeCards = getActiveRevCards();
  const allCards = document.querySelectorAll('.review-item-card');
  
  // Hide all cards first
  allCards.forEach(c => {
    c.classList.remove('active-slide');
    c.style.display = 'none';
  });

  if (activeCards.length === 0) return;

  if (currentRevIndex >= activeCards.length) currentRevIndex = 0;
  if (currentRevIndex < 0) currentRevIndex = activeCards.length - 1;

  const currentCard = activeCards[currentRevIndex];
  if (currentCard) {
    currentCard.style.display = 'block';
    currentCard.classList.add('active-slide');
  }

  // Render dots
  const dotsContainer = document.getElementById('rev-dots-container');
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    activeCards.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = 'rev-dot' + (idx === currentRevIndex ? ' active-dot' : '');
      dot.onclick = () => {
        currentRevIndex = idx;
        updateRevCarousel();
        resetRevTimer();
      };
      dotsContainer.appendChild(dot);
    });
  }

  // Update slide counter text
  const counter = document.getElementById('rev-slide-counter');
  if (counter) {
    counter.innerText = `${currentRevIndex + 1} / ${activeCards.length}`;
  }
}

function nextReviewSlide() {
  currentRevIndex++;
  updateRevCarousel();
}

function prevReviewSlide() {
  currentRevIndex--;
  updateRevCarousel();
}

function startRevTimer() {
  stopRevTimer();
  revAutoTimer = setInterval(() => {
    nextReviewSlide();
  }, 4500);
}

function stopRevTimer() {
  if (revAutoTimer) {
    clearInterval(revAutoTimer);
    revAutoTimer = null;
  }
}

function resetRevTimer() {
  startRevTimer();
}

function filterReviewSource(source) {
  currentRevSource = source;
  currentRevIndex = 0;

  const tabs = document.querySelectorAll('.rev-tab');
  tabs.forEach(t => {
    t.style.borderBottom = '3px solid transparent';
    t.style.color = 'var(--text-muted)';
    t.style.fontWeight = '600';
  });

  const activeTab = document.getElementById('rev-tab-' + source);
  if (activeTab) {
    activeTab.style.borderBottom = '3px solid var(--accent)';
    activeTab.style.color = 'var(--primary)';
    activeTab.style.fontWeight = '700';
  }

  updateRevCarousel();
  resetRevTimer();
}

// Auto-start carousel on page load & initialize mobile touch swipe listeners
document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('rev-carousel-box');
  let touchStartX = 0;
  let touchEndX = 0;

  if (box) {
    box.addEventListener('mouseenter', stopRevTimer);
    box.addEventListener('mouseleave', startRevTimer);

    // Touch swipe support for mobile view
    box.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopRevTimer();
    }, { passive: true });

    box.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startRevTimer();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 35;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextReviewSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevReviewSlide();
    }
  }

  updateRevCarousel();
  startRevTimer();
});

// Car Rental Fleet Category Filter
function filterCarRentalFleet(cat) {
  const btns = document.querySelectorAll('.car-filter-btn');
  btns.forEach(btn => btn.classList.remove('active'));

  const activeBtn = document.getElementById('car-tab-' + cat);
  if (activeBtn) activeBtn.classList.add('active');

  const cards = document.querySelectorAll('.car-fleet-card-item');
  cards.forEach(card => {
    if (cat === 'all' || card.dataset.category === cat) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* =========================================================
   MANDATORY ENTRY ENQUIRY MODAL CONTROLLER
   ========================================================= */

function closeEntryModal() {
  const overlay = document.getElementById('mandatory-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
    sessionStorage.setItem('shivaputhra_initial_enquiry_done', 'true');
  }
}

function initMandatoryEntryModal() {
  const overlay = document.getElementById('mandatory-modal-overlay');
  const card = document.getElementById('mandatory-modal-card');
  const dateInput = document.getElementById('entry-date');

  if (!overlay || !card) return;

  // Set minimum travel date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }

  // Check if visitor has already submitted or closed during this session
  const hasSubmitted = sessionStorage.getItem('shivaputhra_initial_enquiry_done');
  
  if (!hasSubmitted) {
    // Show modal immediately on page load
    setTimeout(() => {
      overlay.classList.add('active');
      document.body.classList.add('modal-open');
    }, 250);
  }

  // Allow clicking outside on backdrop to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeEntryModal();
    }
  });

  // Allow Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeEntryModal();
    }
  });

  // Remove field error highlight on user typing / selection
  const formInputs = overlay.querySelectorAll('input, select');
  formInputs.forEach(input => {
    input.addEventListener('input', () => clearFieldError(input));
    input.addEventListener('change', () => clearFieldError(input));
  });
}

function clearFieldError(inputElem) {
  if (!inputElem) return;
  const wrapper = inputElem.closest('.input-icon-wrapper');
  if (wrapper) wrapper.classList.remove('has-error');
  const errText = document.getElementById('err-' + inputElem.id) || (inputElem.id === 'entry-drop-time' ? document.getElementById('err-entry-pickup-time') : null);
  if (errText) errText.classList.remove('visible');
}

function shakeMandatoryModal() {
  const card = document.getElementById('mandatory-modal-card');
  const alertBanner = document.getElementById('mandatory-alert-banner');
  if (!card) return;

  card.classList.remove('card-shake');
  // Trigger reflow
  void card.offsetWidth;
  card.classList.add('card-shake');

  if (alertBanner) {
    alertBanner.classList.add('visible');
  }

  setTimeout(() => {
    card.classList.remove('card-shake');
  }, 600);
}

function formatTime12Hr(timeStr) {
  if (!timeStr) return '';
  const parts = timeStr.split(':');
  if (parts.length < 2) return timeStr;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedHours = hours < 10 ? '0' + hours : hours;
  return `${formattedHours}:${minutes} ${ampm}`;
}

function handleMandatoryEnquiry(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById('entry-name');
  const phoneInput = document.getElementById('entry-phone');
  const serviceTypeInput = document.getElementById('entry-service-type');
  const vehicleCategoryInput = document.getElementById('entry-vehicle-category');
  const travelersInput = document.getElementById('entry-travelers');
  const sourceInput = document.getElementById('entry-source');
  const dateInput = document.getElementById('entry-date');
  const pickupTimeInput = document.getElementById('entry-pickup-time');
  const dropTimeInput = document.getElementById('entry-drop-time');
  const notesInput = document.getElementById('entry-notes');

  let isValid = true;
  let firstInvalid = null;

  function markError(inputElem, customMsg, errId) {
    isValid = false;
    if (!firstInvalid && inputElem) firstInvalid = inputElem;
    const wrapper = inputElem ? inputElem.closest('.input-icon-wrapper') : null;
    if (wrapper) wrapper.classList.add('has-error');
    const targetErrId = errId || (inputElem ? 'err-' + inputElem.id : null);
    if (targetErrId) {
      const errText = document.getElementById(targetErrId);
      if (errText) {
        if (customMsg) errText.textContent = customMsg;
        errText.classList.add('visible');
      }
    }
  }

  // 1. Full Name validation
  const nameVal = nameInput ? nameInput.value.trim() : '';
  if (!nameVal || nameVal.length < 2) {
    markError(nameInput, 'Please enter your full name');
  }

  // 2. WhatsApp Number validation (10 digits)
  const phoneVal = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
  if (!phoneVal || phoneVal.length < 10) {
    markError(phoneInput, 'Please enter a valid 10-digit WhatsApp number');
  }

  // 3. Service Type validation
  const serviceTypeVal = serviceTypeInput ? serviceTypeInput.value : '';
  if (!serviceTypeVal) {
    markError(serviceTypeInput, 'Please select a service type');
  }

  // 4. Vehicle Category validation
  const vehicleCategoryVal = vehicleCategoryInput ? vehicleCategoryInput.value : '';
  if (!vehicleCategoryVal) {
    markError(vehicleCategoryInput, 'Please select a vehicle category');
  }

  // 5. Number of Travelers / Car validation
  const travelersVal = travelersInput ? travelersInput.value : '';
  if (!travelersVal) {
    markError(travelersInput, 'Please select number of travelers / car');
  }

  // 6. How Did You Find Us validation
  const sourceVal = sourceInput ? sourceInput.value : '';
  if (!sourceVal) {
    markError(sourceInput, 'Please select how you found our website');
  }

  // 7. Date of Travel validation
  const dateVal = dateInput ? dateInput.value : '';
  if (!dateVal) {
    markError(dateInput, 'Please select date of travel');
  }

  // 8. Pickup Time validation
  const pickupTimeVal = pickupTimeInput ? pickupTimeInput.value : '';
  if (!pickupTimeVal) {
    markError(pickupTimeInput, 'Please select pickup time');
  }

  // 9. Drop Time validation
  const dropTimeVal = dropTimeInput ? dropTimeInput.value : '';
  if (!dropTimeVal) {
    markError(dropTimeInput, 'Please select drop time');
  }

  if (!isValid) {
    shakeMandatoryModal();
    if (firstInvalid) firstInvalid.focus();
    return;
  }

  const notesVal = notesInput ? notesInput.value.trim() : '';

  // Disable button and show progress state
  const submitBtn = document.getElementById('btn-mandatory-submit');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span><i class="fas fa-spinner fa-spin"></i> Submitting & Opening WhatsApp...</span>`;
  }

  // Format rich WhatsApp Enquiry Message
  const whatsappMessage = 
    `*✨ NEW TRIP ENQUIRY - SHIVAPUTHRA TRAVELS ✨*\n` +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 *Customer Name:* ${nameVal}\n` +
    `📱 *WhatsApp Number:* +91 ${phoneVal}\n` +
    `🚖 *Service Type:* ${serviceTypeVal}\n` +
    `🚗 *Vehicle Category:* ${vehicleCategoryVal}\n` +
    `👥 *Number of Travelers / Car:* ${travelersVal}\n` +
    `🌐 *Found Website Via:* ${sourceVal}\n` +
    `📅 *Date of Travel:* ${dateVal}\n` +
    `⏰ *Pickup Time:* ${pickupTimeVal}\n` +
    `⏳ *Drop Time:* ${dropTimeVal}\n` +
    (notesVal ? `💬 *Additional Notes:* ${notesVal}\n` : '') +
    `━━━━━━━━━━━━━━━━━━━━━━\n` +
    `Hello Shivaputhra Travels! Please share vehicle options, tour package itinerary, and best all-inclusive quote for this requirement.`;

  // Save session & lead storage so user is registered
  sessionStorage.setItem('shivaputhra_initial_enquiry_done', 'true');
  try {
    localStorage.setItem('shivaputhra_lead_profile', JSON.stringify({
      name: nameVal,
      phone: phoneVal,
      serviceType: serviceTypeVal,
      vehicleCategory: vehicleCategoryVal,
      travelers: travelersVal,
      source: sourceVal,
      date: dateVal,
      pickupTime: pickupTimeVal,
      dropTime: dropTimeVal,
      notes: notesVal,
      submittedAt: new Date().toISOString()
    }));
  } catch (e) {
    console.warn('LocalStorage save skipped:', e);
  }

  // Show success card in modal
  const formElem = document.getElementById('mandatory-enquiry-form');
  const successElem = document.getElementById('mandatory-success-state');
  const headerElem = document.querySelector('.mandatory-modal-header');
  const trustRow = document.querySelector('.mandatory-trust-row');
  const userNameElem = document.getElementById('success-user-name');

  if (userNameElem) userNameElem.textContent = nameVal;
  if (formElem) formElem.style.display = 'none';
  if (headerElem) headerElem.style.display = 'none';
  if (trustRow) trustRow.style.display = 'none';
  if (successElem) successElem.style.display = 'block';

  // Open WhatsApp in new window and smoothly close modal to unlock website
  setTimeout(() => {
    sendToWhatsApp(whatsappMessage);
    
    // Close modal
    const overlay = document.getElementById('mandatory-modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }, 1400);
}

// Auto-slide Happy Clients Customer Photos Carousel (2-Second Slide Interval)
const happySlideIndices = {
  'temple-clients-slider': 0,
  'holiday-clients-slider': 0
};
const happySlideTimers = {};

function goToHappySlide(sliderId, index) {
  const container = document.getElementById(sliderId);
  if (!container) return;

  const slides = container.querySelectorAll('.happy-slide');
  const dots = container.querySelectorAll('.happy-dot');
  if (slides.length === 0) return;

  let targetIndex = index;
  if (targetIndex >= slides.length) targetIndex = 0;
  if (targetIndex < 0) targetIndex = slides.length - 1;

  happySlideIndices[sliderId] = targetIndex;

  slides.forEach((slide, idx) => {
    if (idx === targetIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === targetIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  resetHappyProgress(container);
}

function manualHappySlide(sliderId, direction) {
  const currentIndex = happySlideIndices[sliderId] || 0;
  goToHappySlide(sliderId, currentIndex + direction);
  resetHappyAutoTimer(sliderId);
}

function resetHappyProgress(container) {
  const progressBar = container.querySelector('.happy-timer-progress');
  if (!progressBar) return;
  
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';
  
  setTimeout(() => {
    progressBar.style.transition = 'width 2s linear';
    progressBar.style.width = '100%';
  }, 20);
}

function resetHappyAutoTimer(sliderId) {
  if (happySlideTimers[sliderId]) {
    clearInterval(happySlideTimers[sliderId]);
  }
  happySlideTimers[sliderId] = setInterval(() => {
    const currentIndex = happySlideIndices[sliderId] || 0;
    goToHappySlide(sliderId, currentIndex + 1);
  }, 2000);
}

function startHappyClientsAutoSlide() {
  const sliders = ['temple-clients-slider', 'holiday-clients-slider'];
  sliders.forEach(sliderId => {
    const container = document.getElementById(sliderId);
    if (container) {
      goToHappySlide(sliderId, 0);
      resetHappyAutoTimer(sliderId);
    }
  });
}

// Auto-initialize when page DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initMandatoryEntryModal();
    startCorpClientAutoSlide();
    startHappyClientsAutoSlide();
  });
} else {
  initMandatoryEntryModal();
  startCorpClientAutoSlide();
  startHappyClientsAutoSlide();
}

// Auto-slide corporate client cards on mobile screens
let corpSlideTimer = null;
let currentCorpSlide = 0;

function startCorpClientAutoSlide() {
  if (corpSlideTimer) clearInterval(corpSlideTimer);
  
  corpSlideTimer = setInterval(() => {
    const slider = document.getElementById('corp-clients-slider');
    if (slider && window.innerWidth <= 768) {
      const cards = slider.querySelectorAll('.corp-client-card');
      if (cards.length > 0) {
        currentCorpSlide = (currentCorpSlide + 1) % cards.length;
        const targetCard = cards[currentCorpSlide];
        
        if (currentCorpSlide === 0) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollTo({
            left: targetCard.offsetLeft - 16,
            behavior: 'smooth'
          });
        }
      }
    }
  }, 2500);
}
