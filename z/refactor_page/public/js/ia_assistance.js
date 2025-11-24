document.addEventListener('DOMContentLoaded', () => {
    const aiForm = document.getElementById('ai-form');
    const imageUpload = document.getElementById('image-upload');
    const context = document.getElementById('context');
    const uploadInitialState = document.getElementById('upload-initial-state');
    const uploadFinishedState = document.getElementById('upload-finished-state');
    const fileName = document.getElementById('file-name');
    const toastLiveExample = document.getElementById('liveToast');
    const toastBody = toastLiveExample.querySelector('.toast-body');
    const toast = new bootstrap.Toast(toastLiveExample);

    function showToast(message) {
        toastBody.textContent = message;
        toast.show();
    }

    imageUpload.addEventListener('change', () => {
        if (imageUpload.files.length > 0) {
            const file = imageUpload.files[0];
            const fileSize = file.size;
            const fileType = file.type;
            const maxSize = 10 * 1024 * 1024; // 10 MB

            if (!fileType.startsWith('image/')) {
                showToast('Only image files are allowed!');
                imageUpload.value = ''; // Clear the input
                return;
            }

            if (fileSize > maxSize) {
                showToast('Image exceeds the 10MB size limit.');
                imageUpload.value = ''; // Clear the input
                return;
            }

            fileName.textContent = file.name;
            uploadInitialState.style.display = 'none';
            uploadFinishedState.style.display = 'flex';
        }
    });

    aiForm.addEventListener('submit', (e) => {
        const submitButton = aiForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Esperando por respuesta...';
    });
});
