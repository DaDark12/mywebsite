// app.js - UI interactions, scroll triggers, and email prefill handlers

document.addEventListener('DOMContentLoaded', () => {

  // 1) IntersectionObserver for scroll reveals
  const revealEls = document.querySelectorAll('.scroll-reveal-init');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-reveal-active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  // 2) Hover-panel reveal (What We Do)
  const hoverPanel = document.querySelector('.hover-panel');
  const revealHover = () => {
    if (!hoverPanel) return;
    if (window.scrollY > window.innerHeight * 0.35) {
      hoverPanel.classList.add('visible');
      window.removeEventListener('scroll', revealHover);
    }
  };
  window.addEventListener('scroll', revealHover);
  revealHover();

  // 3) Smooth scroll for nav anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      // allow normal behavior if link is e.g. '#'
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;
      const offset = 80; // navbar offset
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // 4) Gmail compose open (prefilled) + mailto fallback
  const gmailBtn = document.getElementById('open-gmail-btn');
  const mailtoBtn = document.getElementById('open-mailto-btn');

  const recipient = 'hacknow133@gmail.com';
  const subject = encodeURIComponent('Inquiry from PROJEC7v1s10n Website');
  const fallbackBody = encodeURIComponent('Hi PROJEC7v1s10n team,\n\nI would like to discuss...');

  const openGmailCompose = (to = recipient, subj = '', body = '') => {
    // Gmail web compose link
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subj}&body=${body}`;
    window.open(composeUrl, '_blank');
  };

  const openMailClient = (to = recipient, subj = '', body = '') => {
    const mailto = `mailto:${encodeURIComponent(to)}?subject=${subj}&body=${body}`;
    window.location.href = mailto;
  };

  if (gmailBtn) {
    gmailBtn.addEventListener('click', () => openGmailCompose(recipient, subject, fallbackBody));
  }
  if (mailtoBtn) {
    mailtoBtn.addEventListener('click', () => openMailClient(recipient, subject, fallbackBody));
  }

  // 5) Prefill Gmail from form content
  const prefillBtn = document.getElementById('prefill-gmail-from-form');
  const contactForm = document.getElementById('contact-form');

  prefillBtn && prefillBtn.addEventListener('click', () => {
    const name = document.getElementById('form-name').value || '[No name provided]';
    const email = document.getElementById('form-email').value || '[No email provided]';
    const message = document.getElementById('form-message').value || '[No message]';

    const composedBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    openGmailCompose(recipient, encodeURIComponent('Inquiry from PROJEC7v1s10n Website'), composedBody);
  });

  // 6) Optional: intercept form submit to show a quick toast (not preventing default)
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      // small UX nudge: letting user know they've submitted (you can expand this)
      console.log('Form submitted to FormSubmit.co');
    });
  }

  // 7) Mobile menu toggle (tiny)
  const mobileBtn = document.getElementById('mobile-menu-btn');
  mobileBtn && mobileBtn.addEventListener('click', () => {
    alert('Mobile menu: implement as needed (kept minimal for this release).');
  });

});
