// Enhanced script for dynamic UI features

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const contentSections = document.querySelectorAll('.content-section');

    // 1. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position slightly to account for fixed header height if needed
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Dynamic Navbar on Scroll
    const scrollThreshold = 50; // Pixels to scroll before navbar changes
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Scroll-triggered animations for content sections
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible to trigger
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: stop observing after it's visible
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    contentSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Mobile menu toggle (basic example - needs a hamburger icon in HTML)
    // const menuToggle = document.getElementById('mobile-menu-toggle'); // Assuming you add an ID to a hamburger button
    // const navUl = document.querySelector('nav ul');

    // if (menuToggle && navUl) {
    //     menuToggle.addEventListener('click', function() {
    //         navUl.classList.toggle('active');
    //     });
    // }

    console.log('Scholars Rosary website script updated with dynamic UI features.');
});
