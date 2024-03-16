

let button = document.querySelector('.toggleDescription');
let projectDescription = document.getElementById('project-description');

button.addEventListener('click', function () {
    // Remove the button element from the DOM
    button.remove();

    setTimeout(() => {
        projectDescription.classList.remove('hide');
    }, 10);
    // Apply the properties of the description to the parent container

});
