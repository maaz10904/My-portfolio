const animatedSections = document.querySelectorAll('[data-animate]');
const observerOptions = { threshold: 0.2 };

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

animatedSections.forEach((section) => revealObserver.observe(section));

document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const previewModal = document.getElementById('certPreviewModal');
const previewBody = document.getElementById('previewBody');
const previewCaption = document.getElementById('previewCaption');
const previewClose = document.getElementById('previewClose');
const previewBackdrop = document.getElementById('previewBackdrop');

const openPreview = ({ src, type, title, description }) => {
  if (!previewModal || !previewBody) return;

  previewBody.innerHTML = '';
  const encodedSrc = encodeURI(src);

  if (type === 'pdf') {
    const iframe = document.createElement('iframe');
    iframe.src = encodedSrc;
    iframe.title = title;
    iframe.loading = 'lazy';
    previewBody.appendChild(iframe);
  } else {
    const image = document.createElement('img');
    image.src = encodedSrc;
    image.alt = title;
    previewBody.appendChild(image);
  }

  previewCaption.textContent = `${title} — ${description}`;
  previewModal.classList.add('active');
  previewModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closePreview = () => {
  if (!previewModal || !previewBody) return;
  previewModal.classList.remove('active');
  previewModal.setAttribute('aria-hidden', 'true');
  previewBody.innerHTML = '';
  document.body.style.overflow = '';
};

previewClose?.addEventListener('click', closePreview);
previewBackdrop?.addEventListener('click', closePreview);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePreview();
  }
});

document.querySelectorAll('.cert-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const certSrc = link.dataset.certSrc;
    const certType = link.dataset.certType || 'image';
    const card = link.closest('.cert-card') || link.closest('.card');
    const certTitle = card?.querySelector('h3')?.textContent || 'Certificate Preview';
    const certDesc = card?.querySelector('p')?.textContent || '';

    if (certSrc) {
      event.preventDefault();
      openPreview({ src: certSrc, type: certType, title: certTitle, description: certDesc });
    }
  });
});
