document.addEventListener('DOMContentLoaded', () => {
    const giftBoxWrapper = document.getElementById('gift-box-wrapper');
    const individualMessageContainer = document.getElementById('individual-message');
    const shortMessageText = document.getElementById('short-message-text');
    const finalMessageContainer = document.getElementById('final-message');
    const longMessageText = document.getElementById('long-message-text');
    const backgroundMusic = document.getElementById('background-music');
    const photoRowContainer = document.getElementById('photo-row');
    const heartParticlesOverlay = document.querySelector('.heart-particles-overlay');
    const musicToggleButton = document.getElementById('music-toggle-button');
    
    let isBoxOpen = false;
    const photoCount = 6;
    const initialDelay = 1000; 
    const messageDuration = 3500; 

    // Mensajes individuales (limpios)
    const shortMessages = [
        "1. Eres hermosa incluso cuando no te bañas.", 
        "2. Tus pedos huelen a flores, lo juro.",
        "3. ¡Tú eres la más sodio-radio-potasio de todas!",
        "4. Eres la mujer más perfecta que existe.",
        "5. No hay esfuerzo que no valga la pena por ti.",
        "6. Claro que no hay nada malo contigo, eres increíble."
    ];

    // Mensaje final (sin cursiva)
    const finalSpanishPhrase = "Entre todas las estrellas, sé que no te has dado cuenta, pero tú eres una de ellas; la más hermosa y brillante de ellas.";


    // --- FUNCIÓN DE MÚSICA Y UTILIDADES ---

    function playMusic() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.warn("La reproducción de música fue bloqueada.");
            });
        }
    }

    function typeWriterEffect(element, text, duration, callback) { /* ... función completa ... */ }
    function createHeartParticle() { /* ... función completa ... */ }

    // Generar partículas
    const numParticles = 40; 
    for (let i = 0; i < numParticles; i++) {
        createHeartParticle();
    }


    // --- FUNCIÓN PRINCIPAL DE ANIMACIÓN SECUENCIAL ---
    function startPhotoSequence() {
        let currentPhotoIndex = 0;
        
        const photoWidth = 170; 
        const totalRowWidth = photoCount * photoWidth;
        const initialTranslateX = -(totalRowWidth / 2) + (photoWidth / 2); 

        const sequenceLoop = () => {
            if (currentPhotoIndex >= photoCount) {
                // TERMINÓ LA SECUENCIA: Mostrar el mensaje final y ocultar el botón de música
                individualMessageContainer.style.opacity = '0';
                musicToggleButton.classList.remove('show-btn');
                musicToggleButton.classList.add('hidden-btn');
                
                setTimeout(() => {
                    finalMessageContainer.style.opacity = '1';
                    typeWriterEffect(longMessageText, finalSpanishPhrase, 6);
                }, 1000);
                return; 
            }

            // 1. Crear y preparar la foto
            const photoItem = document.createElement('div');
            photoItem.classList.add('photo-item');
            
            const img = document.createElement('img');
            img.src = `cara ${currentPhotoIndex + 1}.jpg`;
            img.alt = `Foto ${currentPhotoIndex + 1}`;
            photoItem.appendChild(img);

            photoRowContainer.appendChild(photoItem);

            // 2. Mover la foto a su posición centrada
            const targetX = initialTranslateX + (currentPhotoIndex * photoWidth); 
            
            setTimeout(() => {
                photoItem.style.opacity = '1';
                photoItem.style.transform = `translateX(${targetX}px)`; 
                
                // 3. Mostrar mensaje individual
                shortMessageText.textContent = shortMessages[currentPhotoIndex];
                individualMessageContainer.style.opacity = '1';

                // 4. Preparar el siguiente paso
                currentPhotoIndex++;
                
                // Ocultar mensaje y pasar a la siguiente foto
                setTimeout(() => {
                    individualMessageContainer.style.opacity = '0';
                    setTimeout(sequenceLoop, 500); 
                }, messageDuration);

            }, 50); 
        };

        sequenceLoop();
    }


    // --- LISTENER PRINCIPAL (CLIC EN EL CUBO) ---
    giftBoxWrapper.addEventListener('click', () => {
        if (!isBoxOpen) {
            playMusic(); 
            
            // 1. Apertura de la caja (animación CSS)
            giftBoxWrapper.classList.add('opened'); 
            isBoxOpen = true;

            // 2. Ocultar la caja para que no estorbe a la vista
            setTimeout(() => {
                giftBoxWrapper.style.opacity = '0';
                giftBoxWrapper.style.pointerEvents = 'none';
            }, 1500); 

            // 3. Iniciar el desfile de fotos y mensajes
            setTimeout(startPhotoSequence, 1500); 
        }
    });

    // --- FALLBACK Y ACTIVACIÓN DE MÚSICA ---
    const musicActivationHandler = () => {
        playMusic();
        if (!backgroundMusic.paused) { 
            document.removeEventListener('touchstart', musicActivationHandler);
            document.removeEventListener('mousedown', musicActivationHandler);
        } else {
            // Si la música sigue pausada (fue bloqueada), mostramos el botón
            setTimeout(() => {
                musicToggleButton.classList.remove('hidden-btn');
                musicToggleButton.classList.add('show-btn');
            }, 2500); // Dar tiempo para que el cubo se abra antes de mostrar el botón
        }
    };

    const musicManualToggle = () => {
        playMusic();
        musicToggleButton.classList.remove('show-btn');
        musicToggleButton.classList.add('hidden-btn');
    };

    // Listeners al inicio
    document.addEventListener('touchstart', musicActivationHandler, { once: true });
    document.addEventListener('mousedown', musicActivationHandler, { once: true });
    
    // Listener del botón manual
    musicToggleButton.addEventListener('click', musicManualToggle);
});
