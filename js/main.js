(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });
    
})(jQuery);



// Cuenta regresiva para el 15 de noviembre con flip effect
function updateCountdown() {
    var eventDate = new Date('2025-11-15T00:00:00');
    var now = new Date();
    var diff = eventDate - now;

    if (diff < 0) diff = 0;

    var values = {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
    };

    Object.keys(values).forEach(function(key){
        var el = document.getElementById(key);
        var newVal = values[key].toString().padStart(2, '0');
        if(el.textContent !== newVal){
            el.textContent = newVal;
            el.classList.remove('flip-animate');
            void el.offsetWidth; // trigger reflow
            el.classList.add('flip-animate');
        }
    });
}

setInterval(updateCountdown, 1000);
updateCountdown();



// window.addEventListener('scroll', function() {
//     var scrolled = window.pageYOffset;
//     var header = document.querySelector('.parallax-header');
//     var video = document.querySelector('.parallax-video');
//     var overlay = document.querySelector('.parallax-header .overlay');
//     if(header && video && overlay) {
//         // Parallax efecto suave
//         var offset = scrolled * 0.3;
//         video.style.transform = 'translateY(' + offset + 'px) scale(1.05)';
//         overlay.style.transform = 'translateY(' + offset * 0.7 + 'px)';
//     }
// });

document.querySelector('.parallax-header').addEventListener('mousemove', function(e) {
    var header = this;
    var video = header.querySelector('.parallax-video');
    var overlay = header.querySelector('.overlay');
    var rect = header.getBoundingClientRect();
    var x = e.clientX - rect.left; // posición X dentro del header
    var y = e.clientY - rect.top;  // posición Y dentro del header
    var xPercent = (x / rect.width - 0.5) * 2; // -1 a 1
    var yPercent = (y / rect.height - 0.5) * 2; // -1 a 1

    if(video) {
        video.style.transform = 'translate(' + (xPercent * 30) + 'px, ' + (yPercent * 20) + 'px) scale(1.05)';
    }
    if(overlay) {
        overlay.style.transform = 'translate(' + (xPercent * 10) + 'px, ' + (yPercent * 5) + 'px)';
    }
});
