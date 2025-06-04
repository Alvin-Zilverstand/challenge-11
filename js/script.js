// Add fade-in animation to all sections
document.addEventListener('DOMContentLoaded', () => {
    const pageSections = document.querySelectorAll('section');
    pageSections.forEach(section => section.classList.add('fade-in'));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Get Started button functionality
    const getStartedButtons = document.querySelectorAll('.btn-primary');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Create and show modal
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in';
            modal.innerHTML = `
                <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 transform hover:scale-105 transition-all duration-300 border border-red-500">
                    <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">Boek Je Tuning</h3>
                    <p class="text-gray-300 mb-6">Kies je gewenste dienst:</p>
                    <div class="space-y-4">
                        <button class="w-full btn btn-primary bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300">
                            ECU Tuning
                        </button>
                        <button class="w-full btn btn-outline-secondary hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600 hover:text-white transition-all duration-300">
                            Prestatie Onderdelen
                        </button>
                        <button class="w-full btn btn-outline-secondary hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600 hover:text-white transition-all duration-300">
                            Maatwerk Pakket
                        </button>
                    </div>
                    <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300" onclick="this.closest('.fixed').remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            `;
            document.body.appendChild(modal);

            // Add click event to close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

            // Add click events to modal buttons
            const modalButtons = modal.querySelectorAll('button:not(:last-child)');
            modalButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const action = button.textContent.trim();
                    // Scroll to contact form and populate service type
                    const contactForm = document.querySelector('#contact form');
                    const messageField = contactForm.querySelector('#message');
                    messageField.value = `Ik ben geïnteresseerd in: ${action}`;
                    modal.remove();
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                });
            });
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        const carSelect = contactForm.querySelector('#car');
        carSelect.addEventListener('change', (e) => {
            if (e.target.value === 'Ander model') {
                const customInput = document.createElement('input');
                customInput.type = 'text';
                customInput.className = 'form-control bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-red-500 transition-all duration-300 mt-2';
                customInput.placeholder = 'Voer uw voertuigmodel in';
                customInput.id = 'customCar';
                
                const existingCustomInput = contactForm.querySelector('#customCar');
                if (!existingCustomInput) {
                    carSelect.parentNode.appendChild(customInput);
                }
            } else {
                const existingCustomInput = contactForm.querySelector('#customCar');
                if (existingCustomInput) {
                    existingCustomInput.remove();
                }
            }
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const carModel = carSelect.value === 'Ander model' 
                ? contactForm.querySelector('#customCar')?.value || 'Niet gespecificeerd'
                : carSelect.value;
            
            alert(`Bedankt voor je interesse! We nemen zo snel mogelijk contact met je op over je ${carModel}.`);
            contactForm.reset();
            const existingCustomInput = contactForm.querySelector('#customCar');
            if (existingCustomInput) {
                existingCustomInput.remove();
            }
        });
    }

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initial call

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .bg-gray-800.rounded-lg');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.3)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Gallery image hover effects
    const galleryItems = document.querySelectorAll('#gallery .col-md-4');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const image = item.querySelector('.aspect-w-16');
            image.style.transform = 'scale(1.05)';
            image.style.transition = 'transform 0.3s ease-in-out';
        });
        item.addEventListener('mouseleave', () => {
            const image = item.querySelector('.aspect-w-16');
            image.style.transform = 'scale(1)';
        });
    });
});
