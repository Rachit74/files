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
    document.getElementById('uploadForm').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const fileInput = document.getElementById('file');
        const titleInput = document.getElementById('title');
        const deptInput = document.getElementById('dept');

        const file = fileInput.files[0];
        const title = titleInput.value;
        const dept = deptInput.value;

        if (file && title && dept) {
            const chunkSize = 1024 * 1024; // 1MB chunks
            const totalChunks = Math.ceil(file.size / chunkSize);

            for (let i = 0; i < totalChunks; i++) {
                const start = i * chunkSize;
                const end = Math.min(start + chunkSize, file.size);
                const chunk = file.slice(start, end);

                const formData = new FormData();
                formData.append('file', chunk);
                formData.append('title', title);
                formData.append('dept', dept);
                formData.append('chunkNumber', i + 1);
                formData.append('totalChunks', totalChunks);

                try {
                    const response = await fetch('/upload', {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        throw new Error('Chunk upload failed');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Failed to upload file.');
                    return;
                }
            }

            alert('File uploaded successfully!');
        } else {
            alert('Please fill in all fields.');
        }
    });
});