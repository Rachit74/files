document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');

    toggleButton.addEventListener('click', function() {
        navbarLinks.classList.toggle('show');
    });
});

function closeFlashMessage(button) {
    // Find the parent flash message and fade it out
    var flashMessage = button.parentElement;
    flashMessage.style.opacity = 0;
    setTimeout(function() {
        flashMessage.remove();
    }, 500); // Match the CSS animation duration
};


document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const titleInput = document.getElementById('titleInput');
    const deptInput = document.getElementById('deptInput');

    const file = fileInput.files[0];
    const title = titleInput.value;
    const dept = deptInput.value;

    if (file && title && dept) {
        // Here you could use a library to compress the PDF if available
        // For now, we'll just send the file as-is

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('dept', dept);

        fetch('/upload', {
            method: 'POST',
            body: formData
        }).then(response => response.text())
          .then(result => alert(result))
          .catch(error => console.error('Error:', error));
    }
});