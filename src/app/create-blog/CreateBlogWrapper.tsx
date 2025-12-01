"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Toast from '@/components/Toast';

// Import Editable Block Components and their Ref/Data Interfaces
import EditableHeaderBlock, { EditableHeaderBlockRef, HeaderBlockData } from '@/components/editable-blog-blocks/EditableHeaderBlock';
import EditablePureContentBlock, { EditablePureContentBlockRef, PureContentBlockData } from '@/components/editable-blog-blocks/EditablePureContentBlock';
import EditablePureImageBlock, { EditablePureImageBlockRef, PureImageBlockData } from '@/components/editable-blog-blocks/EditablePureImageBlock';
import EditableImgAndContentBlock, { EditableImgAndContentBlockRef, ImgAndContentBlockData } from '@/components/editable-blog-blocks/EditableImgAndContentBlock';
import EditableReferencesBlock, { EditableReferencesBlockRef, ReferencesBlockData } from '@/components/editable-blog-blocks/EditableReferencesBlock';
import { IUser } from '@/lib/models/user';

// Interfaces for data structure
interface BlogCardData {
  title: string;
  description: string;
  img_url: string; // Public URL of the uploaded image
}

// Define the union type for all possible block refs
type ContentBlockRefType =
  EditableHeaderBlockRef |
  EditablePureContentBlockRef |
  EditablePureImageBlockRef |
  EditableImgAndContentBlockRef |
  EditableReferencesBlockRef;

// Define an interface for tracking blocks and their refs
interface DynamicContentBlock {
  id: string; // Unique ID for React key and ref management
  type: 'Header' | 'PureContent' | 'PureImage' | 'ImgAndContent' | 'References';
  ref: React.RefObject<ContentBlockRefType>;
}

import ClientNavbar from '@/components/ClientNavbar';

interface CreateBlogWrapperProps {
  authenticatedUser: IUser;
}

export default function CreateBlogWrapper({ authenticatedUser }: CreateBlogWrapperProps) {
  const router = useRouter();
  const [cardData, setCardData] = useState<BlogCardData>({ title: '', description: '', img_url: '' });
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const [contentBlockRefs, setContentBlockRefs] = useState<DynamicContentBlock[]>([]); // State to manage dynamic block refs
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const cardImageInputRef = useRef<HTMLInputElement>(null);

  const username = authenticatedUser.name;
  const userPerms = { permsLabel: authenticatedUser.perms };
  const currentPage = router.pathname ? router.pathname.split('/').pop() : '';

  // --- Image Upload Handlers ---
  const handleCardImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCardImageFile(event.target.files[0]);
      setCardData(prev => ({ ...prev, img_url: URL.createObjectURL(event.target.files![0]) })); // Show preview
    } else {
      setCardImageFile(null);
      setCardData(prev => ({ ...prev, img_url: '' }));
    }
  };

  const handleCardImageDelete = () => {
    setCardImageFile(null);
    setCardData(prev => ({ ...prev, img_url: '' }));
    if (cardImageInputRef.current) cardImageInputRef.current.value = ''; // Clear file input
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await fetch('/api/blogs/images', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        return data.imageUrl;
      } else {
        const errorData = await response.json();
        setToastMessage(errorData.message || 'Error uploading image.');
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setToastMessage('Network error uploading image.');
      return null;
    }
  };

  // --- Content Block Management ---
  const addContentBlock = (type: DynamicContentBlock['type']) => {
    const newBlock: DynamicContentBlock = {
      id: Date.now().toString(),
      type,
      ref: React.createRef<ContentBlockRefType>(),
    };
    setContentBlockRefs(prev => [...prev, newBlock]);
  };

  const removeContentBlock = (id: string) => {
    setContentBlockRefs(prev => prev.filter(block => block.id !== id));
  };


  // --- Form Submission ---
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setToastMessage(null);

    // 1. Upload card image if exists
    let finalCardImgUrl = cardData.img_url;
    if (cardImageFile) {
      const imageUrl = await uploadImage(cardImageFile);
      if (imageUrl) {
        finalCardImgUrl = imageUrl;
      } else {
        return; // Stop submission if image upload failed
      }
    } else if (!cardData.img_url) {
      setToastMessage('The main card image is required.');
      return;
    }

    // 2. Collect data from all dynamic content blocks
    const collectedBlocksData: any[] = [];
    let collectedReferencesData: ReferencesBlockData['blog_references'] = [];

    for (const block of contentBlockRefs) {
      if (block.ref.current) {
        const data = block.ref.current.getData();
        if (block.type === 'References') {
          // Special handling for references block
          collectedReferencesData = (data as ReferencesBlockData).blog_references;
        } else {
          collectedBlocksData.push({ type: block.type, ...data });
        }
      }
    }

    // 3. Prepare data for API
    const blogData = {
      card: { ...cardData, img_url: finalCardImgUrl },
      content: {
        blocks: collectedBlocksData,
      },
      references: collectedReferencesData,
    };

    // 4. Submit to API
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        const result = await response.json();
        setToastMessage('Blog created successfully!');
        router.push(`/blog/${result.blogId}`); // Redirect to new blog post
      } else {
        const errorData = await response.json();
        setToastMessage(errorData.message || 'Error creating blog.');
      }
    } catch (error) {
      console.error('Error submitting blog:', error);
      setToastMessage('Network error creating blog.');
    }
  };

  return (
    <>
      <ClientNavbar
        username={username}
        currentPage={currentPage}
        user={userPerms}
      />
      {toastMessage && <Toast message={toastMessage} severity="error" />}

      <main className="container mt-5">
        <h1 className="mb-4">Create New Blog</h1>

        <form id="create-blog-form" onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Card Information */}
          <div className="card mb-4 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">Blog Card Information</h2>
            <div className="mb-4">
              <label htmlFor="card-title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="card-title"
                name="card[title]"
                required
                value={cardData.title}
                onChange={(e) => setCardData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="card-description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                id="card-description"
                name="card[description]"
                required
                value={cardData.description}
                onChange={(e) => setCardData(prev => ({ ...prev, description: e.target.value }))}
              ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="card-image-upload" className="block text-sm font-medium text-gray-700">Upload Main Image</label>
              <input
                type="file"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                id="card-image-upload"
                accept="image/*"
                onChange={handleCardImageChange}
                ref={cardImageInputRef}
              />
              {cardData.img_url && (
                <div className="mt-4 flex items-center space-x-4">
                  <Image
                    id="card-image-preview"
                    src={cardData.img_url}
                    alt="Image Preview"
                    className="rounded-md object-cover"
                    width={100}
                    height={100}
                  />
                  <button type="button" className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={handleCardImageDelete}>
                    Delete Image
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Dynamic Content Blocks */}
          <div className="card mb-4 p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-2xl font-bold mb-4">Blog Content</h2>
            <div id="content-blocks-container" className="space-y-4">
              {contentBlockRefs.map((block, index) => (
                <div key={block.id} className="content-block-wrapper relative p-4 border border-gray-200 rounded-md">
                  {/* Remove Block Button */}
                  <button
                    type="button"
                    onClick={() => removeContentBlock(block.id)}
                    className="absolute top-2 right-2 p-1 text-red-600 hover:text-red-800 text-lg font-bold"
                    aria-label="Remove block"
                  >
                    &times;
                  </button>

                  {block.type === 'Header' && <EditableHeaderBlock ref={block.ref as React.RefObject<EditableHeaderBlockRef>} />}
                  {block.type === 'PureContent' && <EditablePureContentBlock ref={block.ref as React.RefObject<EditablePureContentBlockRef>} />}
                  {block.type === 'PureImage' && <EditablePureImageBlock ref={block.ref as React.RefObject<EditablePureImageBlockRef>} uploadImage={uploadImage} setToastMessage={setToastMessage} />}
                  {block.type === 'ImgAndContent' && <EditableImgAndContentBlock ref={block.ref as React.RefObject<EditableImgAndContentBlockRef>} uploadImage={uploadImage} setToastMessage={setToastMessage} />}
                  {block.type === 'References' && <EditableReferencesBlock ref={block.ref as React.RefObject<EditableReferencesBlockRef>} />}
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" onClick={() => addContentBlock('Header')}>Add Header</button>
              <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" onClick={() => addContentBlock('PureContent')}>Add Paragraph</button>
              <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" onClick={() => addContentBlock('PureImage')}>Add Image</button>
              <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" onClick={() => addContentBlock('ImgAndContent')}>Add Image and Content</button>
              <button type="button" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" onClick={() => addContentBlock('References')}>Add References</button>
            </div>
          </div>

          <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-md text-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full">Create Blog</button>
        </form>
      </main>
    </>
  );
}
