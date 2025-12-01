document.addEventListener('DOMContentLoaded', () => {
    let blockIndex = 1; // Start at 1 because header is 0
    let referenceIndex = 0;

    const contentBlocksContainer = document.getElementById('content-blocks-container');
    const referencesContainer = document.getElementById('references-container');
    const createBlogForm = document.getElementById('create-blog-form');

    // Helper function to upload an image
    async function uploadImage(file, previewImgElement, hiddenInputElement, deleteButtonElement, fileInputElement) {
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('/api/blogs/blog/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const imageUrl = response.data.imageUrl;
            previewImgElement.src = imageUrl;
            hiddenInputElement.value = imageUrl;
            // Ensure the container is shown
            const previewContainer = previewImgElement.closest('.block-image-preview-container') || previewImgElement.parentElement;
            if (previewContainer) {
                previewContainer.style.display = 'block';
            }
            fileInputElement.style.display = 'none'; // Hide file input
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Error uploading the image.');
            fileInputElement.value = ''; // Clear file input
        }
    }

    // Helper function to delete an image
    async function deleteImage(imageUrl, previewImgElement, hiddenInputElement, deleteButtonElement, fileInputElement) {
        if (!imageUrl) return;

        try {
            await axios.delete('/api/blogs/blog/images', { data: { imageUrl } });
            previewImgElement.src = '';
            hiddenInputElement.value = '';
            // Ensure the container is hidden
            const previewContainer = previewImgElement.closest('.block-image-preview-container') || previewImgElement.parentElement;
            if (previewContainer) {
                previewContainer.style.display = 'none';
            }
            fileInputElement.style.display = 'block'; // Show file input
            fileInputElement.value = ''; // Clear file input
        } catch (error) {
            console.error('Error deleting image:', error);
            alert('Error deleting the image.');
        }
    }

    // --- Card Image Handling ---
    const cardImageUpload = document.getElementById('card-image-upload');
    const cardImagePreview = document.getElementById('card-image-preview');
    const cardImgUrlHidden = document.getElementById('card-img-url-hidden');
    const cardImageDeleteBtn = document.getElementById('card-image-delete');

    cardImageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        uploadImage(file, cardImagePreview, cardImgUrlHidden, cardImageDeleteBtn, cardImageUpload);
    });

    cardImageDeleteBtn.addEventListener('click', () => {
        const imageUrl = cardImgUrlHidden.value;
        deleteImage(imageUrl, cardImagePreview, cardImgUrlHidden, cardImageDeleteBtn, cardImageUpload);
    });

    // --- Dynamic Block Buttons ---
    document.getElementById('add-pure-content').addEventListener('click', () => addBlock('Pure_content'));
    document.getElementById('add-pure-image').addEventListener('click', () => addBlock('Pure_image'));
    document.getElementById('add-img-content').addEventListener('click', () => addBlock('Img_and_content'));
    document.getElementById('add-reference').addEventListener('click', addReference);

    function addBlock(type) {
        const currentBlockIndex = blockIndex++;
        const blockId = `block-${currentBlockIndex}`;
        const blockDiv = document.createElement('div');
        blockDiv.className = 'content-block border rounded p-3 mb-3';
        blockDiv.id = blockId;

        let innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h4>${type.replace('_', ' ')}</h4>
                <button type="button" class="btn-close" aria-label="Close" data-block-id="${blockId}"></button>
            </div>
            <input type="hidden" name="type" value="${type}">
        `;

        switch (type) {
            case 'Pure_content':
                innerHTML += `
                    <div class="mb-3">
                        <label class="form-label">Paragraph</label>
                        <textarea class="form-control" name="blog_paragraphs"></textarea>
                    </div>`;
                break;
            case 'Pure_image':
                innerHTML += `
                    <div class="mb-3">
                        <label class="form-label">Upload Image</label>
                        <input type="file" class="form-control block-image-upload" accept="image/*" data-block-index="${currentBlockIndex}">
                        <input type="hidden" class="block-img-url-hidden" name="img_url" data-block-index="${currentBlockIndex}">
                        <div class="mt-2 block-image-preview-container" style="display: none;" data-block-index="${currentBlockIndex}">
                            <img src="" alt="Image Preview" class="img-thumbnail block-image-preview" style="max-width: 200px; max-height: 200px;" data-block-index="${currentBlockIndex}">
                            <button type="button" class="btn btn-danger btn-sm mt-1 block-image-delete" data-block-index="${currentBlockIndex}">Delete Image</button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Image caption</label>
                        <input type="text" class="form-control" name="img_footer">
                    </div>`;
                break;
            case 'Img_and_content':
                innerHTML += `
                    <div class="mb-3">
                        <label class="form-label">Upload Image</label>
                        <input type="file" class="form-control block-image-upload" accept="image/*" data-block-index="${currentBlockIndex}">
                        <input type="hidden" class="block-img-url-hidden" name="img_url" data-block-index="${currentBlockIndex}">
                        <div class="mt-2 block-image-preview-container" style="display: none;" data-block-index="${currentBlockIndex}">
                            <img src="" alt="Image Preview" class="img-thumbnail block-image-preview" style="max-width: 200px; max-height: 200px;" data-block-index="${currentBlockIndex}">
                            <button type="button" class="btn btn-danger btn-sm mt-1 block-image-delete" data-block-index="${currentBlockIndex}">Delete Image</button>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Image caption</label>
                        <input type="text" class="form-control" name="img_footer">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Paragraph</label>
                        <textarea class="form-control" name="blog_paragraphs"></textarea>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Image orientation</label>
                        <select class="form-select" name="orientation">
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>`;
                break;
        }
        blockDiv.innerHTML = innerHTML;
        contentBlocksContainer.appendChild(blockDiv);

        // Attach event listeners for dynamically added image inputs/buttons
        if (type === 'Pure_image' || type === 'Img_and_content') {
            const newBlock = document.getElementById(blockId);
            const fileInput = newBlock.querySelector(`.block-image-upload[data-block-index="${currentBlockIndex}"]`);
            const previewImg = newBlock.querySelector(`.block-image-preview[data-block-index="${currentBlockIndex}"]`);
            const hiddenInput = newBlock.querySelector(`.block-img-url-hidden[data-block-index="${currentBlockIndex}"]`);
            const deleteBtn = newBlock.querySelector(`.block-image-delete[data-block-index="${currentBlockIndex}"]`);

            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                uploadImage(file, previewImg, hiddenInput, deleteBtn, fileInput);
            });

            deleteBtn.addEventListener('click', () => {
                const imageUrl = hiddenInput.value;
                deleteImage(imageUrl, previewImg, hiddenInput, deleteBtn, fileInput);
            });
        }

        // Attach event listener for block removal button
        blockDiv.querySelector('.btn-close').addEventListener('click', (e) => {
            const targetBlockId = e.target.dataset.blockId;
            document.getElementById(targetBlockId).remove();
        });
    }

    function addReference() {
        const currentReferenceIndex = referenceIndex++;
        const referenceId = `ref-${currentReferenceIndex}`;
        const refDiv = document.createElement('div');
        refDiv.className = 'reference-item border rounded p-3 mb-3';
        refDiv.id = referenceId;
        refDiv.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5>Reference ${currentReferenceIndex + 1}</h5>
                <button type="button" class="btn-close" aria-label="Close" onclick="document.getElementById('${referenceId}').remove();"></button>
            </div>
            <div class="mb-3">
                <label class="form-label">Reference in APA format</label>
                <input type="text" class="form-control" name="blog_reference_apa">
            </div>
            <div class="mb-3">
                <label class="form-label">Reference URL</label>
                <input type="url" class="form-control" name="blog_reference_url">
            </div>
        `;
        referencesContainer.appendChild(refDiv);
    }

    // Form Submission
    createBlogForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const card = {
            title: document.getElementById('card-title').value,
            description: document.getElementById('card-description').value,
            img_url: document.getElementById('card-img-url-hidden').value // Get from hidden input
        };

        const content = { blocks: [] };

        // Process all content blocks
        document.querySelectorAll('#content-blocks-container .content-block').forEach(blockElement => {
            const blockData = {};
            const typeInput = blockElement.querySelector('input[name="type"]');
            if (typeInput) {
                blockData.type = typeInput.value;
            }

            blockElement.querySelectorAll('input:not([type="hidden"]), textarea, select').forEach(input => {
                if (input.name) {
                    if (input.name === 'blog_paragraphs') {
                        blockData[input.name] = [input.value];
                    } else if (input.name !== 'type') { // Exclude the type input as it's handled separately
                        blockData[input.name] = input.value;
                    }
                }
            });
            // Get hidden image URL for image blocks
            const hiddenImgUrlInput = blockElement.querySelector('.block-img-url-hidden');
            if (hiddenImgUrlInput && hiddenImgUrlInput.value) {
                blockData.img_url = hiddenImgUrlInput.value;
            }

            content.blocks.push(blockData);
        });
        
        // Process references and add them as a single block
        const references = [];
        document.querySelectorAll('#references-container .reference-item').forEach(refElement => {
            const refData = {};
            refElement.querySelectorAll('input').forEach(input => {
                if (input.name) refData[input.name] = input.value;
            });
            references.push(refData);
        });

        if (references.length > 0) {
            content.blocks.push({
                type: 'References',
                blog_references: references
            });
        }

        const payload = { card, content };

        try {
            const response = await axios.post('/api/blogs/blog', payload);
            if (response.status === 200 || response.status === 201) {
                window.location.href = '/blog-search';
            }
        } catch (error) {
            console.error('Error creating the blog:', error);
            alert('There was an error creating the blog. Check the console for more details.');
        }
    });
});
