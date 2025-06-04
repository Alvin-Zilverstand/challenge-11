// Add fade-in animation to main content
document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('main');
    mainContent.classList.add('fade-in');

    // Add click event to the Learn More button
    const learnMoreBtn = document.querySelector('.btn-primary');
    learnMoreBtn.addEventListener('click', () => {
        alert('Thanks for your interest! This is a demo website.');
    });

    // Add active class to current nav item
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
});
