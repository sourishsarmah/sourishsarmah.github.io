// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Form submission handling with improved UX
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button');
    const originalText = submitButton.textContent;
    
    // Loading state
    submitButton.textContent = 'Preparing email...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    submitButton.style.cursor = 'wait';

    // Simulate short delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        window.location.href = `mailto:sourishsarmah@gmail.com?subject=Portfolio Contact from ${name}&body=${message}%0D%0A%0D%0AFrom: ${email}`;
        
        // Success state
        submitButton.textContent = 'Email Client Opened!';
        submitButton.style.backgroundColor = 'var(--accent-primary)'; // Use CSS var if possible, else green
        
        setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            submitButton.style.cursor = 'pointer';
            submitButton.style.backgroundColor = '';
        }, 3000);
        
    } catch (error) {
        alert('Error opening email client. Please try again.');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});


// Scroll to Top functionality
const scrollTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Toggle icon between bars and times
    const icon = mobileNavToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileNavToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
}); 
// Set current year in footer
const yearElement = document.getElementById('current-year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Enhanced Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // Observer for sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 }); // Slightly higher threshold

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in');
        sectionObserver.observe(section);
        
        // Dynamic Staggering
        // Timelines & Projects
        const largeItems = section.querySelectorAll('.timeline-item, .project-card');
        largeItems.forEach((item, index) => {
            item.style.setProperty('--delay', `${(index + 1) * 0.2}s`);
        });

        // Skills (Batching or faster stagger)
        const skillItems = section.querySelectorAll('.skill-item');
        skillItems.forEach((item, index) => {
            // Stagger in batches of 10 or just fast sequential
            const delay = 0.1 + (index * 0.05);
            // Cap max delay to prevent waiting too long for last item
            const cappedDelay = Math.min(delay, 1.5); 
            item.style.setProperty('--delay', `${cappedDelay}s`);
        });
    });
});
