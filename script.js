const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (document.body.classList.contains('home-page')) {
  const header = document.querySelector('.site-header');
  header?.style.setProperty('background', '#f4f7f1', 'important');
  document.querySelectorAll('.home-page .brand, .home-page .nav a:not(.nav-cta)').forEach((element) => {
    element.style.setProperty('color', '#102d45', 'important');
  });
}

const contactDetails = document.querySelector('.contact-page .contact-details');
if (contactDetails) {
  contactDetails.innerHTML = '<a href="mailto:ceylonflexipack4@gmail.com">ceylonflexipack4@gmail.com</a><a href="tel:+94772278937">077 227 8937</a><a href="tel:+94767678937">076 767 8937</a><span>No. 223, Koshena, Illukhena, Kuliyapitiya</span>';
}

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const quoteForm = document.querySelector('.quote-form');

if (quoteForm) {
  quoteForm.action = 'https://formsubmit.co/ceylonflexipack4@gmail.com';
  quoteForm.method = 'POST';
  [
    ['_subject', 'New Ceylon Flexipack packaging enquiry'],
    ['_captcha', 'false'],
    ['_template', 'table'],
  ].forEach(([name, value]) => {
    const field = document.createElement('input');
    field.type = 'hidden';
    field.name = name;
    field.value = value;
    quoteForm.appendChild(field);
  });
}

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  if (window.location.protocol === 'file:') {
    status.textContent = 'Please open this website through a web server before sending your enquiry.';
    return;
  }
  const formData = new FormData(event.currentTarget);
  const name = formData.get('name') || 'Not provided';
  const product = formData.get('product') || 'Not specified';
  const message = formData.get('message') || 'No additional message';
  status.textContent = `Sending ${product} enquiry for ${name}...`;
  event.currentTarget.submit();
});

if (nav && !nav.querySelector('.home-link')) {
  const homeLink = document.createElement('a');
  homeLink.className = 'home-link';
  homeLink.href = 'index.html';
  homeLink.textContent = 'Home';
  nav.prepend(homeLink);
}

document.querySelectorAll('.product-card').forEach((card) => {
  card.style.setProperty('min-height', '335px', 'important');
  card.querySelector('.product-art')?.style.setProperty('height', '165px', 'important');
});