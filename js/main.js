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
        autoplay: true,
        smartSpeed: 800,
        dots: false,
        loop: ($('.gallery-carousel .item').length > 5), // Solo activa loop si hay más de 5 imágenes
        nav : false,
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
    var eventDate = new Date('2025-11-15T18:00:00');
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


// --- Google Sheets fetch ---

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch('https://angelcr87.github.io/Frankie-Griss/invitados/invitados.json')
  .then(res => res.json())
  .then(data => {
    const invitado = data.find(item => item.id === id);
    if (invitado) {
      document.getElementById('invitado').textContent = invitado.Invitados;
      document.getElementById('cantidad').textContent = invitado.Cantidad;
    // console.log(`Hola ${invitado.Invitados}, ${invitado.Cantidad}`);
    } else {
      document.body.innerHTML = '<h2>Invitación no válida</h2>';
    }
  })
  .catch(err => {
    console.error('Error al cargar el JSON:', err);
    document.body.innerHTML = '<h2>Error al cargar la invitación</h2>';
  });


  // ...existing code...

// Música de fondo en loop
document.addEventListener('DOMContentLoaded', function() {
    // Crea el elemento de audio
    var audio = document.createElement('audio');
    audio.loop = true;
    audio.volume = 0.8;
    audio.id = 'bg-music';
    audio.style.display = 'none';

    // Crea las fuentes de audio
    var sourceMp3 = document.createElement('source');
    sourceMp3.src = 'audio2.mp3';
    sourceMp3.type = 'audio/mpeg';

    var sourceOgg = document.createElement('source');
    sourceOgg.src = 'audio2.ogg';
    sourceOgg.type = 'audio/ogg';

    // Agrega las fuentes al elemento de audio
    audio.appendChild(sourceMp3);
    audio.appendChild(sourceOgg);

    // Agrega el audio al cuerpo del documento
    document.body.appendChild(audio);

    // Precarga el audio
    audio.load();

    // Reproduce al primer clic/tap del usuario
    function startMusic() {
        audio.play().catch(() => {});
        document.removeEventListener('click', startMusic);
        document.removeEventListener('touchstart', startMusic);
    }

    document.addEventListener('click', startMusic, { once: true });
    document.addEventListener('touchstart', startMusic, { once: true });
});

// fetch('https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1NglSzFpoGn0uFzJEsmXXWNrys4-tH6fDQHYKkNM4fk4/gviz/tq?tqx=out:json')
//   .then(res => res.text())
//   .then(text => {
//     const json = JSON.parse(text.substr(47).slice(0, -2));
//     const rows = json.table.rows;
//     rows.forEach(row => {
//       const nombre = row.c[0].v;
//       const mensaje = row.c[1].v;
//       // Aquí puedes generar tu invitación personalizada
//       console.log(`Hola ${nombre}, ${mensaje}`);
//     });
//   });

//star script envitar mensajes

$('#form-mensaje').on('submit', function(e) {
  e.preventDefault();

  const nombre = $('#nombre').val().trim();
  const mensaje = $('#mensaje').val().trim();

  if (!nombre || !mensaje) {
    mostrarModal('Por favor completa ambos campos.');
    return;
  }

  $.ajax({
    url: 'http://localhost:3000/insertar.php',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ nombre, mensaje }),
    headers: {
      'Authorization': 'Basic ' + btoa('admin:Fr@nk&Griss2025')
    },
    success: function(respuesta) {
      mostrarModal('Mensaje recibido con éxito. ¡Gracias por sus buenos deseos ');
      $('#form-mensaje')[0].reset();
      cargarMensajes(); // recarga el carrusel con los nuevos mensajes
    },
    error: function(xhr) {
      const error = xhr.responseJSON?.error || '❌ Error al enviar el mensaje.';
      mostrarModal(error);
    }
  });
});

// Función para mostrar el modal
function mostrarModal(mensaje) {
  $('#modalMensaje').text(mensaje);
  $('#modalRespuesta').modal('show');
}

//end script enviar mensajes

//start script mostrar mensajes

function cargarMensajes() {
  $.ajax({
    url: 'http://localhost:3000/mensajes.php',
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa('admin:Fr@nk&Griss2025')
    },
    success: function(mensajes) {
      const $carousel = $('.mensajes-carousel');
      $carousel.trigger('destroy.owl.carousel'); // limpia carrusel previo
      $carousel.empty(); // limpia contenido

      mensajes.forEach(m => {
        const item = `
          <div class="mensaje-item text-center p-4 rounded">
            <h5 class="font-weight-bold mb-2 text-primary">${escapeHtml(m.nombre)}</h5>
            <p class="mb-0 text-primary">${escapeHtml(m.mensaje)}</p>
          </div>`;
        $carousel.append(item);
      });

      $carousel.owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 800
      });
    },
    error: function() {
      console.error('Error al cargar los mensajes');
    }
  });
}

// Función para evitar inyecciones HTML
function escapeHtml(text) {
  return $('<div>').text(text).html();
}

// Llamar al cargar la página
$(document).ready(function() {
  cargarMensajes();
});

//end script mostrar mensajes
