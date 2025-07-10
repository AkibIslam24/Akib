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

    // --- Custom Horizontal Scroll for Portfolio Section ---
    const portfolioScrollContainer = document.querySelector('.portfolio-scroll-container');
    const portfolioItems = document.getElementById('portfolioItems');
    const scrollLeftBtn = document.getElementById('portfolioScrollLeft');
    const scrollRightBtn = document.getElementById('portfolioScrollRight');
    const portfolioIndicators = document.getElementById('portfolioIndicators');

    if (portfolioScrollContainer && portfolioItems && scrollLeftBtn && scrollRightBtn && portfolioIndicators) {
        let currentScrollPosition = 0;
        // Get the width of the first item and the gap
        // Assuming g-4 applies a gap, which is 1.5rem * 16px/rem = 24px by default in Bootstrap 5
        const firstItem = portfolioItems.querySelector('.col-lg-4, .col-md-6, .col-10');
        let itemWidth = 0;
        if (firstItem) {
            itemWidth = firstItem.offsetWidth;
            // Get the computed style for 'gap' (column-gap) if g-4 creates it via grid/flex gap
            const rowComputedStyle = window.getComputedStyle(portfolioItems);
            const gapValue = parseFloat(rowComputedStyle.getPropertyValue('column-gap'));
            if (!isNaN(gapValue) && gapValue > 0) {
                 // Add the gap to the item width if it's applied as column-gap on the row
                 // Note: If g-4 applies margin, this needs adjustment. Bootstrap g-classes usually apply gap.
            } else {
                // Fallback for older Bootstrap or custom setup where g-4 might apply margin-right to cols
                // This is a rough estimation for standard Bootstrap g-4 on flex items
                itemWidth += 24; // Approximation for a 1.5rem gap
            }
        } else {
             // Fallback if no items are found for some reason
            itemWidth = window.innerWidth / 3; // A very rough estimate
        }


        const itemsPerView = 3; // On desktop, roughly 3 items are visible
        const scrollAmount = itemWidth * itemsPerView; // Scroll by 3 items at a time

        // Generate indicators based on number of items
        const totalItems = portfolioItems.children.length;
        const totalSlides = Math.ceil(totalItems / itemsPerView); // Number of groups of items

        for (let i = 0; i < totalSlides; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('aria-label', `Go to slide ${i + 1}`);
            if (i === 0) {
                button.classList.add('active');
                button.setAttribute('aria-current', 'true');
            }
            button.addEventListener('click', () => {
                currentScrollPosition = i * scrollAmount;
                portfolioScrollContainer.scrollLeft = currentScrollPosition;
                updateIndicators(i);
                updateButtons(); // Update button state after manual indicator click
            });
            portfolioIndicators.appendChild(button);
        }

        const updateIndicators = (activeIndex) => {
            Array.from(portfolioIndicators.children).forEach((btn, index) => {
                if (index === activeIndex) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-current', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.removeAttribute('aria-current');
                }
            });
        };

        const updateButtons = () => {
            // Disable left button if at the start
            scrollLeftBtn.disabled = portfolioScrollContainer.scrollLeft <= 1; // Small tolerance for floating point
            // Disable right button if at the end
            // Use Math.ceil to account for fractional scroll positions
            scrollRightBtn.disabled = Math.ceil(portfolioScrollContainer.scrollLeft + portfolioScrollContainer.clientWidth) >= portfolioScrollContainer.scrollWidth - 1; // Small tolerance
        };

        // Scroll Left button click
        scrollLeftBtn.addEventListener('click', () => {
            currentScrollPosition = portfolioScrollContainer.scrollLeft - scrollAmount;
            if (currentScrollPosition < 0) currentScrollPosition = 0;
            portfolioScrollContainer.scrollLeft = currentScrollPosition;
            updateButtons();
            updateIndicators(Math.floor(currentScrollPosition / scrollAmount)); // Update indicator based on new position
        });

        // Scroll Right button click
        scrollRightBtn.addEventListener('click', () => {
            currentScrollPosition = portfolioScrollContainer.scrollLeft + scrollAmount;
            const maxScroll = portfolioScrollContainer.scrollWidth - portfolioScrollContainer.clientWidth;
            if (currentScrollPosition > maxScroll) currentScrollPosition = maxScroll;
            portfolioScrollContainer.scrollLeft = currentScrollPosition;
            updateButtons();
            updateIndicators(Math.floor(currentScrollPosition / scrollAmount)); // Update indicator based on new position
        });

        // Update buttons and indicators on initial load and resize
        const handleScrollUpdates = () => {
            updateButtons();
            // This part is for updating indicators based on user's manual scroll (e.g., with mouse wheel)
            // It's a bit more complex to perfectly snap to "slides" on arbitrary scrolls.
            // For now, we'll keep it simple and primarily update on button/indicator clicks.
            // If you need real-time indicator updates on manual scroll, a debounced function
            // to calculate the closest "slide" based on scrollLeft would be needed.
        };

        window.addEventListener('resize', handleScrollUpdates);
        portfolioScrollContainer.addEventListener('scroll', handleScrollUpdates);

        // Initial state
        updateButtons();
        updateIndicators(0); // Set first indicator as active initially
    }
    // --- End Custom Horizontal Scroll ---

});
