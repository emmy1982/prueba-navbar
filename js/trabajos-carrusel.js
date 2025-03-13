/**
 * Carrusel de Trabajos Realizados
 * 
 * Este script inicializa el carrusel Swiper para la sección de trabajos realizados.
 * Configurado para mostrar múltiples slides en escritorio y solo uno en móvil.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el carrusel de trabajos realizados
    const trabajosCarrusel = new Swiper('.trabajos-carrusel', {
        // Configuración básica
        slidesPerView: 1,             // Por defecto: 1 slide visible (para móviles)
        spaceBetween: 15,             // Espacio entre slides
        loop: true,                   // Carrusel infinito
        grabCursor: true,             // Cursor de "mano" al pasar el ratón
        autoHeight: false,            // Altura fija
        
        // Autoplay opcional (descomentar para activar)
        autoplay: {
            delay: 4000,              // 4 segundos entre slides
            disableOnInteraction: false,
        },
        
        // Paginación
        pagination: {
            el: '.trabajos-pagination',
            clickable: true,
        },
        
        // Navegación
        navigation: {
            nextEl: '.trabajos-next',
            prevEl: '.trabajos-prev',
        },
        
        // Configuración responsive - número de slides según tamaño pantalla
        breakpoints: {
            // >= 576px (tablets pequeñas)
            576: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            // >= 992px (desktop)
            992: {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            // >= 1200px (desktop grande)
            1200: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        },
        
        // Eventos
        on: {
            init: function() {
                console.log('Carrusel de trabajos inicializado');
            }
        }
    });
}); 