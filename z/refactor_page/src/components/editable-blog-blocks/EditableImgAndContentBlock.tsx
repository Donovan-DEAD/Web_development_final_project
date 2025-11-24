"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Image from 'next/image';

export interface ImgAndContentBlockData {
  img_url: string;
  img_footer: string;
  blog_paragraphs: string[];
  orientation: 'left' | 'right';
}

export interface EditableImgAndContentBlockRef {
  getData: () => ImgAndContentBlockData;
  addParagraph: () => void;
  removeParagraph: (index: number) => void;
  updateParagraph: (index: number, value: string) => void;
}

const EditableImgAndContentBlock = forwardRef<EditableImgAndContentBlockRef>((props, ref) => {
  const [img_url, setImg_url] = useState('');
  const [img_footer, setImg_footer] = useState('');
  const [blog_paragraphs, setBlog_paragraphs] = useState<string[]>(['']);
  const [orientation, setOrientation] = useState<'left' | 'right'>('left');

  useImperativeHandle(ref, () => ({
    getData: () => ({
      img_url,
      img_footer,
      blog_paragraphs: blog_paragraphs.filter(p => p.trim() !== ''),
      orientation,
    }),
    addParagraph,
    removeParagraph,
    updateParagraph,
  }), [img_url, img_footer, blog_paragraphs, orientation]);

  const addParagraph = () => {
      setBlog_paragraphs([...blog_paragraphs, '']);
  }
  
  const removeParagraph = (index: number) => {
      setBlog_paragraphs(blog_paragraphs.filter((_, i) => i !== index));
  }

  const updateParagraph = (index: number, value: string) => {
      const newParagraphs = [...blog_paragraphs];
      newParagraphs[index] = value;
      setBlog_paragraphs(newParagraphs);
  }

  return (
    <div className="img-and-content-editor p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Image and Content Block</h2>
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
        <div className="mt-4 mb-4">
          <p className="block text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
          <Image src={img_url} alt={img_footer || "Image Preview"} width={500} height={300} layout="responsive" objectFit="contain" className="rounded-md" />
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="orientation" className="block text-sm font-medium text-gray-700">Image Orientation</label>
        <select
          id="orientation"
          value={orientation}
          onChange={(e) => setOrientation(e.target.value as 'left' | 'right')}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>

      <h3 className="text-xl font-bold mb-3">Content Paragraphs</h3>
      {blog_paragraphs.map((paragraph, index) => (
        <div key={index} className="mb-4 flex items-center">
          <textarea
            placeholder={`Paragraph ${index + 1}`}
            value={paragraph}
            onChange={(e) => updateParagraph(index, e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
          />
          <button
            type="button"
            onClick={() => removeParagraph(index)}
            className="ml-2 p-2 text-red-600 hover:text-red-800"
            disabled={blog_paragraphs.length === 1 && index === 0}
          >
            &times;
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addParagraph}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Paragraph
      </button>
    </div>
  );
});

EditableImgAndContentBlock.displayName = 'EditableImgAndContentBlock';

export default EditableImgAndContentBlock;
