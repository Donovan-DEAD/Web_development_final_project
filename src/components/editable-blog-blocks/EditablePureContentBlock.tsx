"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';

export interface PureContentBlockData {
  blog_paragraphs: string[];
}

export interface EditablePureContentBlockRef {
  getData: () => PureContentBlockData;
  addParagraph: () => void;
  removeParagraph: (index: number) => void;
  updateParagraph: (index: number, value: string) => void;
}

const EditablePureContentBlock = forwardRef<EditablePureContentBlockRef>((props, ref) => {
  const [blog_paragraphs, setBlog_paragraphs] = useState<string[]>(['']);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      blog_paragraphs: blog_paragraphs, // Filter out empty paragraphs
    }),
    addParagraph,
    removeParagraph,
    updateParagraph,
  }), [blog_paragraphs]);

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
    <div className="pure-content-editor p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Content Paragraphs</h2>
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
            disabled={blog_paragraphs.length === 1 && index === 0} // Disable remove if only one paragraph
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

EditablePureContentBlock.displayName = 'EditablePureContentBlock';

export default EditablePureContentBlock;
