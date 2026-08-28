document.addEventListener('DOMContentLoaded', () => {
  // Page Transition Fade In
  document.body.classList.add('page-fade-in');

  // Navigation Scroll Effect
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init on page load

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Toggle body scroll
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Intersection Observer for Fade-In and Slide-Up Scroll Reveals
  const revealElements = document.querySelectorAll('.teaching-card, .dream-card, .book-card, .video-card, .why-wrapper, .founder-hero-content, .founder-bio-content, .journey-nav-card, .thapovanam-row, .nr-highlight-card, .mv-card, .contact-detail-card');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  };

  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    revealObserver.observe(el);
  });

  // Video Lightbox Modal logic
  const videoCards = document.querySelectorAll('.video-card');
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoFrame');
  const closeModal = document.getElementById('closeModal');

  if (videoModal && videoFrame && closeModal) {
    videoCards.forEach(card => {
      card.addEventListener('click', () => {
        const videoId = card.getAttribute('data-video-id');
        if (videoId) {
          videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
          videoModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      videoModal.classList.remove('active');
      videoFrame.src = '';
      document.body.style.overflow = '';
    };

    closeModal.addEventListener('click', closeLightbox);
    
    // Close modal on click outside content
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) {
        closeLightbox();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});
