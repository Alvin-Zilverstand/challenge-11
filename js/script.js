// Add fade-in animation to all sections
document.addEventListener('DOMContentLoaded', () => {
    const pageSections = document.querySelectorAll('section');
    pageSections.forEach(section => section.classList.add('fade-in'));

    // Car search functionality
    const carSearch = document.getElementById('carSearch');
    const carSelect = document.getElementById('car');
    
    if (carSearch && carSelect) {
        // Set initial dropdown style
        carSelect.size = 10;
        carSelect.style.position = 'absolute';
        carSelect.style.width = '100%';
        carSelect.style.zIndex = '1000';
        carSelect.style.backgroundColor = '#374151';
        carSelect.style.border = '1px solid #4B5563';
        carSelect.style.borderRadius = '0.375rem';
        carSelect.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        carSelect.style.maxHeight = '300px';
        carSelect.style.overflowY = 'auto';

        // Function to close dropdown
        const closeDropdown = () => {
            carSelect.size = 1;
            carSelect.style.position = 'static';
            carSelect.style.width = 'auto';
            carSelect.style.zIndex = 'auto';
            carSelect.style.backgroundColor = '';
            carSelect.style.border = '';
            carSelect.style.borderRadius = '';
            carSelect.style.boxShadow = '';
            carSelect.style.maxHeight = '';
            carSelect.style.overflowY = '';
        };

        carSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            const options = carSelect.querySelectorAll('option');
            const optgroups = carSelect.querySelectorAll('optgroup');
            
            // First hide all options and optgroups
            options.forEach(option => {
                if (option.value !== '') { // Don't hide the placeholder
                    option.style.display = 'none';
                }
            });
            optgroups.forEach(group => {
                group.style.display = 'none';
            });
            
            // If search is empty, show all options
            if (searchTerm === '') {
                options.forEach(option => {
                    option.style.display = '';
                });
                optgroups.forEach(group => {
                    group.style.display = '';
                });
                return;
            }
            
            // Show matching options and their parent optgroups
            let hasMatches = false;
            options.forEach(option => {
                if (option.value !== '') {
                    const optionText = option.text.toLowerCase();
                    if (optionText.includes(searchTerm)) {
                        option.style.display = '';
                        hasMatches = true;
                        // Show the parent optgroup
                        const parentGroup = option.closest('optgroup');
                        if (parentGroup) {
                            parentGroup.style.display = '';
                        }
                    }
                }
            });
            
            // If no matches found, show the "Ander model" option
            if (!hasMatches) {
                const otherModelOption = carSelect.querySelector('option[value="Ander model"]');
                if (otherModelOption) {
                    otherModelOption.style.display = '';
                    const parentGroup = otherModelOption.closest('optgroup');
                    if (parentGroup) {
                        parentGroup.style.display = '';
                    }
                }
            }
        });
        
        // Handle option selection
        carSelect.addEventListener('change', () => {
            carSearch.value = '';
            const options = carSelect.querySelectorAll('option');
            const optgroups = carSelect.querySelectorAll('optgroup');
            options.forEach(option => {
                option.style.display = '';
            });
            optgroups.forEach(group => {
                group.style.display = '';
            });
            closeDropdown();
        });

        // Handle double-click on options
        carSelect.addEventListener('dblclick', (e) => {
            if (e.target.tagName === 'OPTION' && e.target.value !== '') {
                carSelect.value = e.target.value;
                carSearch.value = e.target.text;
                closeDropdown();
            }
        });

        // Close the dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!carSearch.contains(e.target) && !carSelect.contains(e.target)) {
                closeDropdown();
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Get Started button functionality
    const getStartedButtons = document.querySelectorAll('.btn-primary:not([type="submit"])');
    getStartedButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create and show modal
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 fade-in';
            modal.innerHTML = `
                <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4 transform hover:scale-105 transition-all duration-300 border border-red-500 relative">
                    <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 text-transparent bg-clip-text">Boek Je Tuning</h3>
                    <p class="text-gray-300 mb-6">Kies je gewenste dienst:</p>
                    <div class="space-y-4">
                        <button class="w-full btn btn-primary bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300">
                            ECU Tuning
                        </button>
                        <button class="w-full btn btn-primary bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300">
                            Prestatie Onderdelen
                        </button>
                        <button class="w-full btn btn-primary bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 transition-all duration-300">
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

            // DEBUG: Log modal HTML
            console.log('Modal created. innerHTML:', modal.innerHTML);

            // Add click event to close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });

            // Add click events to modal buttons
            const modalButtons = modal.querySelectorAll('.space-y-4 > button');
            // DEBUG: Log number of modal buttons found
            console.log('Modal buttons found:', modalButtons.length);
            modalButtons.forEach(modalBtn => {
                modalBtn.addEventListener('click', () => {
                    const action = modalBtn.textContent.trim();
                    console.log('Modal button clicked:', action); // DEBUG
                    // Scroll to contact form and populate service type
                    const contactForm = document.querySelector('#contact form, #contactForm');
                    const messageField = contactForm.querySelector('#message');
                    messageField.value = `Ik ben geïnteresseerd in: ${action}`;
                    modal.remove();
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
                });
            });
        });
    });

    // Form submission handling
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        const carSelect = contactForm.querySelector('#car');
        carSelect.addEventListener('change', (e) => {
            if (e.target.value === 'Ander model') {
                const customInput = document.createElement('input');
                customInput.type = 'text';
                customInput.className = 'form-control bg-gray-700 border-gray-600 text-white focus:ring-2 focus:ring-red-500 transition-all duration-300 mt-2';
                customInput.placeholder = 'Voer uw voertuigmodel in';
                customInput.id = 'customCar';
                customInput.name = 'customCar';
                
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

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = 'Verzenden...';

            // Hide previous success message if visible
            const successMsg = document.getElementById('contactSuccess');
            if (successMsg) successMsg.classList.add('hidden');

            try {
                const formData = new FormData(contactForm);
                const carModel = carSelect.value === 'Ander model' 
                    ? contactForm.querySelector('#customCar')?.value || 'Niet gespecificeerd'
                    : carSelect.value;
                formData.set('car', carModel);

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show custom confirmation message
                    if (successMsg) successMsg.classList.remove('hidden');
                    contactForm.reset();
                    const existingCustomInput = contactForm.querySelector('#customCar');
                    if (existingCustomInput) {
                        existingCustomInput.remove();
                    }
                } else {
                    throw new Error('Er is iets misgegaan bij het verzenden van het formulier.');
                }
            } catch (error) {
                alert('Er is een fout opgetreden. Probeer het later opnieuw of neem telefonisch contact op.');
                console.error('Form submission error:', error);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
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
