document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolioTheme', newTheme);
    });

    const filterButtons = document.querySelectorAll('.btn-filter');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const contactForm = document.getElementById('contactForm');
    const toastNotification = document.getElementById('toastNotification');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showToast("Mensaje enviado correctamente. Me pondré en contacto pronto.");
                    contactForm.reset();
                    const textarea = document.getElementById('mensaje');
                    if(textarea) textarea.style.height = '120px';
                } else {
                    showToast("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.", true);
                }
            } catch (error) {
                showToast("Error de conexión. Revisa tu internet e inténtalo de nuevo.", true);
            }
        });
    }

    function showToast(message, isError = false) {
        toastNotification.textContent = message;
        toastNotification.style.color = isError ? "#ff4444" : "var(--color-primary)";
        toastNotification.style.borderColor = isError ? "#ff4444" : "var(--color-primary)";
        toastNotification.classList.add('show');
        
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 4000);
    }

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    const textarea = document.getElementById('mensaje');

    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    }
});