"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Image from 'next/image'; // Assuming Image component is used for display

export interface PureImageBlockData {
  img_url: string;
  img_footer: string;
}

export interface EditablePureImageBlockRef {
  getData: () => PureImageBlockData;
  // TODO: Add methods for image upload handling if needed later
}

const EditablePureImageBlock = forwardRef<EditablePureImageBlockRef>((props, ref) => {
  const [img_url, setImg_url] = useState('');
  const [img_footer, setImg_footer] = useState('');

  useImperativeHandle(ref, () => ({
    getData: () => ({
      img_url,
      img_footer,
    }),
  }), [img_url, img_footer]);

  return (
    <div className="pure-image-editor p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Image Block</h2>
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          id="imageUrl"
          type="text"
          placeholder="e.g., https://example.com/image.jpg"
          value={img_url}
          onChange={(e) => setImg_url(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
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
