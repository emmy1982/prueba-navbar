document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = menuToggle.querySelector('.hamburger');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const menuLinks = fullscreenMenu.querySelectorAll('a');
    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.slide');
    
    // Referencias a los logos
    const logoImg = document.querySelector('.logo img:not(.logo-secondary)');
    const logoSecondary = document.querySelector('.logo-secondary');
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        // Si scroll es mayor a 100px, ocultamos la navbar
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-hidden');
        } else {
            navbar.classList.remove('navbar-hidden');
        }
    }
    
    // Aplicar efecto de scroll al cargar la página
    handleScroll();
    
    // Añadir listener para efecto de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Aseguramos que el logo principal esté visible y el secundario oculto al cargar
    if (logoImg && logoSecondary) {
        logoImg.style.display = 'block';
        logoSecondary.style.display = 'none';
    }
    
    // Función para toggle del menú hamburguesa
    function toggleMenu() {
        hamburger.classList.toggle('active');
        fullscreenMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        
        // Cambiar entre los logos cuando se pulsa el toggle
        if (hamburger.classList.contains('active')) {
            // Cuando el menú está activo, mostramos el logo secundario
            logoImg.style.display = 'none';
            logoSecondary.style.display = 'block';
        } else {
            // Cuando el menú está cerrado, mostramos el logo principal
            logoImg.style.display = 'block';
            logoSecondary.style.display = 'none';
        }
        
        // Aplicar animación a los enlaces del menú
        if (fullscreenMenu.classList.contains('active')) {
            menuLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.transitionDelay = `${0.1 + index * 0.1}s`;
                }, 0);
            });
        } else {
            menuLinks.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        }
    }
    
    // Event listener para el botón de menú
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    // Event listeners para los enlaces del menú
    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Cerrar el menú al hacer clic en un enlace
            toggleMenu();
            
            // Scroll suave para enlaces de anclaje
            const href = this.getAttribute('href');
            if (href.startsWith('#') && href !== '#') {
                event.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop;
                    
                    window.scrollTo({
                        top: offsetTop - 80, // Ajuste para el menú fijo
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Carrusel/Slider automático
    let currentSlide = 0;
    const slideInterval = 5000; // 5 segundos
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Iniciar carrusel automático
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Detener carrusel al pasar el ratón
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideTimer);
    });
    
    // Reanudar carrusel al quitar el ratón
    slider.addEventListener('mouseleave', function() {
        slideTimer = setInterval(nextSlide, slideInterval);
    });
    
    // Ajuste para Safari y dispositivos iOS
    function adjustHeights() {
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isSafari || isIOS) {
            const vh = window.innerHeight;
            slider.style.height = `${vh}px`;
            slides.forEach(slide => {
                slide.style.height = `${vh}px`;
            });
        }
    }
    
    // Ejecutar ajuste de altura al cargar
    adjustHeights();
    
    // Actualizar altura en cambios de orientación y redimensionamiento
    window.addEventListener('resize', adjustHeights);
    window.addEventListener('orientationchange', adjustHeights);
    
    // Marcar enlaces del menú como activos según la sección visible
    function highlightMenu() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.menu a').forEach(link => {
                    link.classList.remove('active');
                });
                
                document.querySelector(`.menu a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }
    
    // Detectar scroll para destacar enlaces del menú
    window.addEventListener('scroll', highlightMenu);
    
    // Función para detectar Safari e iOS
    function detectSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent);
    }
    
    // Aplicar correcciones específicas para Safari
    if (detectSafari()) {
        document.body.classList.add('safari');
    }
    
    // Animaciones para elementos con scroll
    const elements = document.querySelectorAll('.box-scroll, .tituloTop, .box-scale, .titulo-scale, .box-left, .titulo-left, .box-right, .titulo-right, .box-fade, .titulo-fade');
    
    function mostrarElements() {
        const altura = window.innerHeight * 0.8;
    
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
    
            if(elementTop < altura) {
                element.classList.add('show');
            } else {
                element.classList.remove('show');
            }
        });
    }
    
    // Ejecutar animaciones al cargar
    mostrarElements();
    
    // Ejecutar animaciones al hacer scroll
    window.addEventListener('scroll', mostrarElements);

    // Función para inicializar el accordion
    function initAccordion() {
        const accordionItems = document.querySelectorAll('.accordion-item');
        
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            header.addEventListener('click', () => {
                // Cerrar todos los demás elementos
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar estado del elemento actual
                item.classList.toggle('active');
            });
        });
        
        // Abrir el primer elemento por defecto (opcional)
        if (accordionItems.length > 0) {
            accordionItems[0].classList.add('active');
        }
    }

    // Inicializar el accordion
    initAccordion();

    // Función para inicializar el slider de testimonios
    function initTestimonialsSlider() {
        if (document.querySelector('.testimonials')) {
            new Swiper('.testimonials', {
                effect: "slide",
                speed: 800,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },
                loop: true,
                slidesPerView: 1,
                spaceBetween: 30,
                on: {
                    init: function() {
                        console.log('Slider de testimonios inicializado');
                    }
                }
            });
        }
    }

    // Inicializar el slider de testimonios
    initTestimonialsSlider();
    
    // Inicializar el botón de scroll
    initScrollTopButton();
});

// Función para el botón de volver arriba
function initScrollTopButton() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Estilos y animaciones 

const elements = document.querySelectorAll('.box-scroll, .tituloTop , .box-scale, .titulo-scale, .box-left, .titulo-left, .box-right, .titulo-right, .box-fade, .titulo-fade')

function mostrarElements(){
    const altura = window.innerHeight * 0.8

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top

        if(elementTop < altura) {
            element.classList.add('show')
        }else{
            element.classList.remove('show')
        }
    });
}
