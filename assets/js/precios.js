// precios.js

// Este archivo puede contener cualquier lógica JavaScript interactiva para tu página.
// Por ejemplo, si los botones de "Comenzar" tuvieran alguna funcionalidad.

document.addEventListener('DOMContentLoaded', () => {
    // Código que se ejecuta una vez que el DOM está completamente cargado
    console.log('La página y los planes de precios están listos!');

    // Ejemplo: Añadir un evento click a los botones (si quisieras que hagan algo)
    const buttons = document.querySelectorAll('#pricing-plans-section button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            alert('¡Haz clic en un plan! (Esta es una alerta de ejemplo)');
            // En una aplicación real, aquí iría la lógica para suscribirse, etc.
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('La página y los planes de precios están listos!');

    // Ejemplo: Añadir un evento click a los botones (si quisieras que hagan algo)
    const pricingButtons = document.querySelectorAll('#pricing-plans-section button');
    pricingButtons.forEach(button => {
        button.addEventListener('click', () => {
            // alert('¡Haz clic en un plan! (Esta es una alerta de ejemplo)');
            // En una aplicación real, aquí iría la lógica para suscribirse, etc.
        });
    });

    // --- Lógica para el formulario de contacto ---
    const contactForm = document.querySelector('.contact-form'); // Selecciona tu formulario
    const messageDiv = document.getElementById('message'); // Tu div para mensajes

    if (contactForm && messageDiv) { // Asegúrate de que el formulario y el div existan
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita el envío estándar del formulario y la redirección

            // Limpia mensajes anteriores
            messageDiv.textContent = '';
            messageDiv.className = 'alert-msg'; // Restablece las clases

            const formData = new FormData(contactForm); // Recoge los datos del formulario

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Indica a Formspree que esperas una respuesta JSON
                    }
                });

                if (response.ok) {
                    // Formulario enviado con éxito
                    messageDiv.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
                    messageDiv.classList.add('success'); // Añade una clase para estilos de éxito (puedes definirla en precios.css)
                    contactForm.reset(); // Limpia el formulario
                } else {
                    // Hubo un error en el envío
                    const data = await response.json();
                    if (data.errors) {
                        // Manejo de errores específicos de Formspree (ej. validación)
                        const errorMessages = data.errors.map(error => error.message).join(', ');
                        messageDiv.textContent = `Error: ${errorMessages}`;
                    } else {
                        messageDiv.textContent = 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
                    }
                    messageDiv.classList.add('error'); // Añade una clase para estilos de error (puedes definirla en precios.css)
                }
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                messageDiv.textContent = 'Hubo un error de conexión. Por favor, inténtalo de nuevo.';
                messageDiv.classList.add('error');
            }
        });
    }
});