document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('.device-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(link => link.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active-section'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section and make it active
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add('active-section');
            
            // Smooth scroll to section
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const settingsCard = this.closest('.sensitivity-settings');
            const deviceName = settingsCard.querySelector('h3').textContent;
            const settings = settingsCard.querySelectorAll('.setting');
            
            let copyText = `Sensibilidad para ${deviceName}:\n\n`;
            
            settings.forEach(setting => {
                const label = setting.querySelector('span:first-child').textContent;
                const value = setting.querySelector('.value').textContent;
                copyText += `${label} ${value}\n`;
            });
            
            // Create a temporary textarea element to copy the text
            const textarea = document.createElement('textarea');
            textarea.value = copyText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            // Show feedback to user
            const originalText = this.textContent;
            this.textContent = '¡Copiado!';
            this.style.backgroundColor = '#00cc00';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
    
    // Form submission
    const suggestionForm = document.getElementById('suggestion-form');
    
    suggestionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
            formDataObj[key] = value;
        });
        
        // In a real application, you would send this data to a server
        // For this example, we'll simulate sending an email
        console.log('Sending form data to sikanoficial@gmail.com:', formDataObj);
        
        // Show success message
        const formContainer = document.querySelector('.form-container');
        const originalContent = formContainer.innerHTML;
        
        formContainer.innerHTML = `
            <div class="success-message">
                <h3>¡Gracias por tu sugerencia!</h3>
                <p>Hemos recibido tu configuración de sensibilidad para ${formDataObj.device}.</p>
                <p>La revisaremos y la añadiremos pronto a nuestra base de datos.</p>
                <button id="back-btn" class="submit-btn">Volver al formulario</button>
            </div>
        `;
        
        // Add event listener to back button
        document.getElementById('back-btn').addEventListener('click', function() {
            formContainer.innerHTML = originalContent;
            
            // Re-initialize form submission
            const newForm = document.getElementById('suggestion-form');
            newForm.addEventListener('submit', suggestionForm.onsubmit);
        });
    });
    
    // Add LED effect to the page
    function createLEDEffect() {
        const container = document.querySelector('.container');
        const led = document.createElement('div');
        led.classList.add('led-effect');
        
        led.style.position = 'absolute';
        led.style.width = '2px';
        led.style.height = '100%';
        led.style.backgroundColor = 'var(--primary-color)';
        led.style.boxShadow = '0 0 10px var(--glow-color), 0 0 20px var(--glow-color)';
        led.style.top = '0';
        led.style.left = Math.random() * 100 + '%';
        led.style.opacity = '0';
        led.style.zIndex = '-1';
        
        container.appendChild(led);
        
        // Animate the LED
        let opacity = 0;
        const duration = Math.random() * 2000 + 1000; // 1-3 seconds
        
        const animate = () => {
            opacity += 0.02;
            led.style.opacity = Math.sin(opacity) * 0.5;
            
            if (opacity < duration / 100) {
                requestAnimationFrame(animate);
            } else {
                container.removeChild(led);
                createLEDEffect();
            }
        };
        
        animate();
    }
    
    // Create multiple LED effects
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createLEDEffect();
        }, i * 500);
    }
    
    // Initialize the page with the first section active
    navLinks[0].classList.add('active');
    sections[0].classList.add('active-section');
});