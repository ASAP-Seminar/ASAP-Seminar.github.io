// Simple Lazy Loading Script
(function() {
  'use strict';

  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    // Fallback: load all images immediately
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    });
    return;
  }

  // Create intersection observer for lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          // Load the image
          img.src = src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          
          // Stop observing this image
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px', // Start loading 50px before image enters viewport
    threshold: 0.01
  });

  // Observe all lazy images
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

})();
