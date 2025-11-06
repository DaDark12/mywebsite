document.addEventListener("DOMContentLoaded", () => {

    // ======== Smooth Scroll Animation ========
    // This uses the Intersection Observer API to add a 'visible' class
    // to elements when they scroll into view.

    const revealElements = document.querySelectorAll(".reveal-on-scroll");

    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: "0px",
        threshold: 0.1 // 10% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // Optional: Stop observing after it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe each element
    revealElements.forEach(el => {
        observer.observe(el);
    });

    // ======== Navbar Link Smooth Scroll (Redundant if html {scroll-behavior: smooth} works) ========
    // This is a fallback if the CSS-based smooth scroll isn't enough.
    // CSS is generally preferred.
    
    // const navLinks = document.querySelectorAll('.nav-link');
    // navLinks.forEach(link => {
    //     link.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         const targetId = e.currentTarget.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'start'
    //             });
    //         }
    //     });
    // });
});
