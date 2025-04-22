document.addEventListener('DOMContentLoaded', function() {
    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('section');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate__fadeInUp');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter une première fois au chargement
    
    // Navigation fluide
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Mise à jour de l'année dans le footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Gestion du formulaire
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const submitButton = this.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('form-message');
            
            try {
                submitButton.disabled = true;
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = 'تم إرسال رسالتك بنجاح!';
                    this.reset();
                } else {
                    throw new Error('حدث خطأ في الإرسال');
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.textContent = error.message;
            } finally {
                submitButton.disabled = false;
                formMessage.style.display = 'block';
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }
        });
    }
}); 