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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('uploadForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const fileInput = document.getElementById('file');
        const titleInput = document.getElementById('title');
        const deptInput = document.getElementById('dept');

        const file = fileInput.files[0];
        const title = titleInput.value;
        const dept = deptInput.value;

        if (file && title && dept) {
            // For demonstration purposes, file compression is not implemented here
            // You can use a JavaScript library to compress PDF files if needed
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('dept', dept);

            fetch('/upload', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                alert('File uploaded successfully!');
                console.log(result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        } else {
            alert('Please fill in all fields.');
        }
    });
});