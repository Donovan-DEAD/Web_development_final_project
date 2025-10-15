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

    aiForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Pressed.")

        if (imageUpload.files.length === 0) {
            showToast('Please select an image.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageUpload.files[0]);
        formData.append('context', context.value);

        try {
            // var button = document.getElementsByClassName("ai__assistance__form__container__right__button")[0]
            // console.log(button)
            // button.setAttribute("disabled", true)
            const response = await fetch('/api/ia/', {
                method: 'POST',
                body: formData
            });
            
            // button.setAttribute("disabled", false)

            console.log(response)
            if (!response.ok) {
                const errorData = await response.json();
                showToast(errorData.message || 'Error sending data');
            }
        } catch (error) {
            showToast('Error: ' + error.message);
        }
    });
});
