import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import Image from 'next/image';

export interface PureImageBlockData {
  img_url: string;
  img_footer: string;
}

export interface EditablePureImageBlockRef {
  getData: () => PureImageBlockData;
}

interface EditablePureImageBlockProps {
  uploadImage: (file: File) => Promise<string | null>;
  setToastMessage: (message: string | null) => void;
}

const EditablePureImageBlock = forwardRef<EditablePureImageBlockRef, EditablePureImageBlockProps>(({ uploadImage, setToastMessage }, ref) => {
  const [img_url, setImg_url] = useState('');
  const [img_footer, setImg_footer] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      img_url,
      img_footer,
    }),
  }), [img_url, img_footer]);

  const handleImageFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLoading(true);
      setToastMessage('Uploading image...');
      const imageUrl = await uploadImage(file);
      setLoading(false);

      if (imageUrl) {
        setImg_url(imageUrl);
        setToastMessage('Image uploaded successfully!');
      } else {
        setToastMessage('Error uploading the image.');
        // Clear the file input if upload failed
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  const handleDeleteImage = () => {
    setImg_url('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="pure-image-editor p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Image Block</h2>
      <div className="mb-4">
        <label htmlFor="image-upload-block" className="block text-sm font-medium text-gray-700">Upload Image</label>
        <input
          id="image-upload-block"
          type="file"
          accept="image/*"
          onChange={handleImageFileChange}
          ref={fileInputRef}
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          disabled={loading}
        />
        {loading && <p className="text-blue-500 mt-2">Uploading...</p>}
      </div>
      
      {img_url && (
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL (Generated)</label>
          <input
            id="imageUrl"
            type="text"
            value={img_url}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button type="button" onClick={handleDeleteImage} className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
            Delete Image
          </button>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="imageFooter" className="block text-sm font-medium text-gray-700">Image Footer (Alt Text / Caption)</label>
        <input
          id="imageFooter"
          type="text"
          placeholder="Caption for the image"
          value={img_footer}
          onChange={(e) => setImg_footer(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      {img_url && (
        <div className="mt-4">
          <p className="block text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
          <Image src={img_url} alt={img_footer || "Image Preview"} width={500} height={300} layout="responsive" objectFit="contain" className="rounded-md" />
        </div>
      )}
    </div>
  );
});

EditablePureImageBlock.displayName = 'EditablePureImageBlock';

export default EditablePureImageBlock;
