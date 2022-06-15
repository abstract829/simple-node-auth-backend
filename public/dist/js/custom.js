/**
* Template Name: Criptomine - v1.0.0
* Author URL: https://www.templatemonster.com/authors/koolband25/
* Author: Koolband25
* License:  
*/
!(function() {
  "use strict";
  
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
   const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }
/**
   * Easy on scroll event listener 
   */
 const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener)
}

 
  // Back to top button
window.scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  /**
   * Back to top button
   */
   let backtotop = select('.back-to-top')
   if (backtotop) {
     const toggleBacktotop = () => {
       if (window.scrollY > 100) {
         backtotop.classList.add('active')
       } else {
         backtotop.classList.remove('active')
       }
     }
     window.addEventListener('load', toggleBacktotop)
     onscroll(document, toggleBacktotop)
   }
  /**
   * Navbar links active state on scroll
   */
 let navbarlinks = select('#navbar .scrollto', true)
 const navbarlinksActive = () => {
   let position = window.scrollY + 200
   navbarlinks.forEach(navbarlink => {
     if (!navbarlink.hash) return
     let section = select(navbarlink.hash)
     if (!section) return
     if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
       navbarlink.classList.add('active')
     } else {
       navbarlink.classList.remove('active')
     }
   })
 }

 window.addEventListener('load', navbarlinksActive)
 onscroll(document, navbarlinksActive)

  /**
   * Mobile nav toggle
   */
   on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('icofont-listing-box')
    this.classList.toggle('icofont-close-squared-alt')
  })
 
// Initiate venobox (lightbox feature used in portofilo image or videos)
$(window).on('load', function() {
  $('.venobox').venobox({
    ratio: '16x9'
  });
});


 // Clients carousel (uses the Owl Carousel library)
 $(".clients-carousel").owlCarousel({
  autoplay: true,
  dots: true,
  loop: true,
  responsive: {
    0: {
      items: 1
    },
    768: {
      items: 4
    },
    900: {
      items: 5
    }
  }
});

/**
   * Animation on scroll
   */
 window.addEventListener('load', () => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  })
});

})( )