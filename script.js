// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000, // Duration of animation
    once: true,    // Whether animation should happen only once - default
    mirror: false, // Whether elements should animate out while scrolling past them
});

// Initialize Bootstrap Tooltips
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // The custom horizontal scroll logic for the portfolio section has been removed
    // as the design specifies a static grid for "Our Latest Works"

    // If there's a Bootstrap Carousel for the Testimonial/Relations section,
    // ensure it's initialized here if needed, and set interval to false if you
    // want to stop its auto-sliding (the current design doesn't show it auto-sliding)
    // Example:
    // var relationsCarouselElement = document.getElementById('relationsCarousel'); // Assuming an ID for this carousel
    // if (relationsCarouselElement) {
    //     var relationsCarousel = new bootstrap.Carousel(relationsCarouselElement, {
    //         interval: false, // Stop auto-sliding for this carousel
    //         wrap: false      // Prevent looping
    //     });
    // }

});