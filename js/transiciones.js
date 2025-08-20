
document.addEventListener("DOMContentLoaded", function() {
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  function checkFadeIn() {
    document.querySelectorAll('.fade-in-left, .fade-in-right').forEach(function(el) {
      if (isInViewport(el)) {
        el.style.opacity = "1";
        el.style.transform = "translateX(0)";
        el.style.animationPlayState = "running";
      }
    });
  }

  window.addEventListener('scroll', checkFadeIn);
  window.addEventListener('resize', checkFadeIn);
  checkFadeIn();
});


$(document).ready(function(){
  var $carousel = $(".mensajes-carousel");
  $carousel.owlCarousel({
    items: 1,
    loop: true,
    margin: 30,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: true,
    nav: true,
    navText: [
      '<span class="carousel-nav-btn"><i class="fa fa-chevron-left"></i></span>',
      '<span class="carousel-nav-btn"><i class="fa fa-chevron-right"></i></span>'
    ]
  });

  // Indicador personalizado
  
  function updateIndicador(event) {
    var current = event.page.index + 1;
    var total = event.page.count;
    $("#mensaje-indicador").text("" + current + " de " + total);
  }
  $carousel.on('changed.owl.carousel', updateIndicador);
  $carousel.on('initialized.owl.carousel', updateIndicador);
});
