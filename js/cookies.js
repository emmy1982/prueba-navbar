/**
 * Gestión de cookies con temática de construcción
 * Para Obras y Reformas Emilio Mochon
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const cookiesBanner = document.getElementById('cookies-banner');
    const cookiesAccept = document.getElementById('cookies-accept');
    const cookiesReject = document.getElementById('cookies-reject');
    const cookiesCustomize = document.getElementById('cookies-customize');
    const cookiesOptions = document.querySelector('.cookies-options');
    
    // Checkboxes de tipos de cookies
    const cookieAnalytics = document.getElementById('cookie-analytics');
    const cookieMarketing = document.getElementById('cookie-marketing');
    
    // Botón para guardar preferencias personalizadas
    const cookiesSave = document.getElementById('cookies-save');
    
    // Comprobar si ya se han establecido preferencias
    const savedPreferences = getSavedPreferences();
    
    // Mostrar el banner si no hay preferencias guardadas
    if (!savedPreferences) {
        // Pequeño retraso para mejorar la experiencia de usuario
        setTimeout(() => {
            cookiesBanner.classList.add('show');
            // Efecto de "martilleo" para el icono
            animateIcon();
        }, 1500);
    }
    
    // Eventos para los botones
    cookiesAccept.addEventListener('click', function() {
        acceptAllCookies();
        closeBanner();
        showThankYouMessage('¡Gracias! Has aceptado todas las cookies. Disfruta de tu experiencia de construcción digital.');
    });
    
    cookiesReject.addEventListener('click', function() {
        rejectAllCookies();
        closeBanner();
        showThankYouMessage('Solo se utilizarán cookies esenciales. Tu experiencia puede verse limitada.');
    });
    
    cookiesCustomize.addEventListener('click', function() {
        // Mostrar opciones personalizadas
        if (cookiesOptions.classList.contains('show')) {
            cookiesOptions.classList.remove('show');
            cookiesCustomize.textContent = 'Personalizar';
        } else {
            cookiesOptions.classList.add('show');
            cookiesCustomize.textContent = 'Ocultar opciones';
            
            // Aplicar las preferencias guardadas si existen
            if (savedPreferences) {
                cookieAnalytics.checked = savedPreferences.analytics;
                cookieMarketing.checked = savedPreferences.marketing;
            }
        }
    });
    
    // Evento para guardar preferencias personalizadas
    cookiesSave.addEventListener('click', function() {
        saveCustomPreferences();
        cookiesOptions.classList.remove('show');
        cookiesCustomize.textContent = 'Personalizar';
        closeBanner();
        showThankYouMessage('Preferencias de cookies guardadas correctamente. ¡Gracias!');
    });
    
    // Función para guardar preferencias
    function savePreferences(preferences) {
        localStorage.setItem('cookiePreferences', JSON.stringify({
            accepted: true,
            date: new Date().toISOString(),
            preferences: preferences
        }));
    }
    
    // Función para obtener preferencias guardadas
    function getSavedPreferences() {
        const data = localStorage.getItem('cookiePreferences');
        return data ? JSON.parse(data) : null;
    }
    
    // Función para aceptar todas las cookies
    function acceptAllCookies() {
        const preferences = {
            essential: true,
            analytics: true,
            marketing: true
        };
        savePreferences(preferences);
        activateCookies(preferences);
    }
    
    // Función para rechazar cookies opcionales
    function rejectAllCookies() {
        const preferences = {
            essential: true,
            analytics: false,
            marketing: false
        };
        savePreferences(preferences);
        activateCookies(preferences);
    }
    
    // Función para guardar preferencias personalizadas
    function saveCustomPreferences() {
        const preferences = {
            essential: true,
            analytics: cookieAnalytics.checked,
            marketing: cookieMarketing.checked
        };
        savePreferences(preferences);
        activateCookies(preferences);
    }
    
    // Función para cerrar el banner
    function closeBanner() {
        cookiesBanner.classList.remove('show');
        cookiesBanner.style.transform = 'translateY(100%)';
    }
    
    // Función para activar las cookies según preferencias
    function activateCookies(preferences) {
        console.log('Activando cookies con las siguientes preferencias:', preferences);
        
        // Activar cookies esenciales (siempre están activas)
        // Implementación real depende de los servicios que uses
        
        // Activar Analytics si está permitido
        if (preferences.analytics) {
            // Aquí irían las llamadas para activar Google Analytics u otros servicios de analítica
            console.log('Cookies analíticas activadas');
        }
        
        // Activar Marketing si está permitido
        if (preferences.marketing) {
            // Aquí irían las llamadas para activar cookies de marketing/publicidad
            console.log('Cookies de marketing activadas');
        }
    }
    
    // Función para mostrar mensaje de agradecimiento
    function showThankYouMessage(message) {
        const thankYouDiv = document.createElement('div');
        thankYouDiv.className = 'thank-you-message';
        thankYouDiv.innerHTML = `
            <div class="thank-you-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(thankYouDiv);
        
        setTimeout(() => {
            thankYouDiv.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            thankYouDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(thankYouDiv);
            }, 500);
        }, 3000);
    }
    
    // Función para animar el icono de casco de construcción
    function animateIcon() {
        const icon = document.querySelector('.cookies-icon i');
        if (icon) {
            icon.style.animation = 'hammer 2s ease-in-out infinite';
        }
    }
    
    // Estilo para el mensaje de agradecimiento
    const style = document.createElement('style');
    style.textContent = `
        .thank-you-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #1d3557;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
            max-width: 300px;
        }
        
        .thank-you-content {
            display: flex;
            align-items: center;
        }
        
        .thank-you-content i {
            color: #4ecdc4;
            font-size: 24px;
            margin-right: 10px;
        }
        
        .thank-you-content p {
            margin: 0;
            font-size: 14px;
            line-height: 1.4;
        }
    `;
    document.head.appendChild(style);
}); 