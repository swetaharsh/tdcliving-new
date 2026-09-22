/* TDC Living – Homepage Interactions */

// ===== MOBILE NAV =====
const hamburger=document.querySelector('.tdc-site-header__menu');
const mobileNav=document.querySelector('#tdc-mobile-nav');

function openMobileNav(){
if(!hamburger||!mobileNav)return;
mobileNav.hidden=false;
hamburger.classList.add('active');
hamburger.setAttribute('aria-expanded','true');
hamburger.setAttribute('aria-label','Close menu');
document.body.style.overflow='hidden';
}

function closeMobileNav(){
if(!hamburger||!mobileNav)return;
mobileNav.hidden=true;
hamburger.classList.remove('active');
hamburger.setAttribute('aria-expanded','false');
hamburger.setAttribute('aria-label','Open menu');
document.body.style.overflow='';
}

function toggleMobileNav(){
const isOpen=hamburger.getAttribute('aria-expanded')==='true';
isOpen?closeMobileNav():openMobileNav();
}

if(hamburger) hamburger.addEventListener('click',toggleMobileNav);

if(mobileNav){
mobileNav.querySelectorAll('a').forEach(link=>{
link.addEventListener('click',closeMobileNav);
});
}

document.addEventListener('keydown',event=>{
if(event.key==='Escape'&&mobileNav&&!mobileNav.hidden) closeMobileNav();
});

window.addEventListener('resize',()=>{
if(window.innerWidth>900) closeMobileNav();
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-question');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all
    faqItems.forEach((other) => {
      other.classList.remove('open');
      const otherBtn = other.querySelector('.faq-question');
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Keyboard support
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});

// ===== TESTIMONIAL CAROUSEL =====
const testimonials = [
  {
    quote: '"My stay went very well. The condo is very well equipped and clean, with a perfect location in the heart of the city. Tony is always available and responsive. Thank you!"',
    name: 'Solène',
    location: '',
  },
  {
    quote: '"I had an unforgettable stay at the Tour des Canadiens for my first visit to Montreal. The studio, fully equipped, lacks nothing: very bright, with stunning views of the city center. The service is really tailor-made: Tony and Brigitte respond in less than 10 minutes, are very attentive, responsive and take great care of their guests."',
    name: 'Margaux',
    location: '',
  },
  {
    quote: '"I had a great stay in this condo! The apartment is very clean, well-equipped and perfectly located in Montreal. Communication with Tony was quick and easy, always available and attentive. I felt really at ease, like I was at home. I highly recommend this accommodation and will gladly return there on my next visit to Montreal."',
    name: 'Lucie',
    location: '',
  },
];

let currentTestimonial = 0;
const testimonialCard = document.getElementById('testimonialCard');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

function updateTestimonial(index) {
  const t = testimonials[index];
  if (!testimonialCard || !t) return;

  const quoteEl = testimonialCard.querySelector('.testimonial-quote');
  const nameEl = testimonialCard.querySelector('.testimonial-name');
  const locationEl = testimonialCard.querySelector('.testimonial-location');

  if (quoteEl) quoteEl.textContent = t.quote;
  if (nameEl) nameEl.textContent = t.name;
  if (locationEl) locationEl.textContent = t.location;
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    updateTestimonial(currentTestimonial);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
  });
}

// Auto-advance testimonials
setInterval(() => {
  if (document.hidden) return;
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  updateTestimonial(currentTestimonial);
}, 6000);

// ===== VIDEO MODAL =====
const resoVideo = document.getElementById('resoVideo');

if (resoVideo) {
  const handleVideoClick = () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 999;
      display: flex; align-items: center; justify-content: center;
    `;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Video player');

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Close video');
    closeBtn.style.cssText = `
      position: absolute; top: 20px; right: 24px; background: none; border: none;
      color: #fff; font-size: 40px; cursor: pointer; line-height: 1; z-index: 1;
    `;

    const message = document.createElement('p');
    message.textContent = 'Video player would open here.';
    message.style.cssText = 'color: #fff; font-size: 20px; font-family: "DM Sans", sans-serif;';

    overlay.appendChild(closeBtn);
    overlay.appendChild(message);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    const close = () => {
      overlay.remove();
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function escHandler(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', escHandler); }
    });
  };

  resoVideo.addEventListener('click', handleVideoClick);
  resoVideo.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleVideoClick(); }
  });
}

// ===== BOOKING FORM SUBMIT =====
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const stay = document.getElementById('stay-type')?.value || '';
    const checkin = document.getElementById('check-in')?.value || '';
    const checkout = document.getElementById('check-out')?.value || '';
    const guests = document.getElementById('guests')?.value || '';

    // In production this would redirect to booking platform
    console.log('Booking request:', { stay, checkin, checkout, guests });

    // Scroll to property sections
    const tdc2 = document.getElementById('tdc2');
    if (tdc2) tdc2.scrollIntoView({ behavior: 'smooth' });
  });
}

// ===== DESTINATION CAROUSEL – DRAG SCROLL =====
const carousel = document.getElementById('destCarousel');
if (carousel) {
  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.style.cursor = 'grabbing';
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.style.cursor = '';
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.style.cursor = '';
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });
}

// ===== STICKY HEADER ON SCROLL =====
const header = document.querySelector('.site-header');
if (header) {
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    if (current > 80) {
      header.style.position = 'fixed';
      header.style.background = 'rgba(0,0,0,0.50)';
      header.style.backdropFilter = 'blur(8px)';
      header.style.webkitBackdropFilter = 'blur(8px)';
    } else {
      header.style.position = 'absolute';
      header.style.background = 'transparent';
      header.style.backdropFilter = 'none';
      header.style.webkitBackdropFilter = 'none';
    }

    lastScroll = current;
  }, { passive: true });
}
