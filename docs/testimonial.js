document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".testimonial-btn");
    const prevButton = document.querySelector(".previous");
    const nextButton = document.querySelector(".next");
    const columns = document.querySelectorAll(".testimonials-column");

    let currentIndex = 0;

    // Function to show testimonials
    const showTestimonial = (index) => {
        columns.forEach((column, i) => {
            column.style.display = index === i ? "flex" : "none";
        });

        buttons.forEach((btn, i) => {
            btn.classList.toggle("active", index === i);
        });
    };

    // Show initial testimonial
    showTestimonial(currentIndex);

    // Event listeners for previous and next buttons
    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + columns.length) % columns.length;
        showTestimonial(currentIndex);
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % columns.length;
        showTestimonial(currentIndex);
    });

    // Event listener for testimonial buttons
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
});