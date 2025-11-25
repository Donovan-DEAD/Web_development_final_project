"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';

export interface ReferenceData {
  blog_reference_apa: string;
  blog_reference_url: string;
}

export interface ReferencesBlockData {
  blog_references: ReferenceData[];
}

export interface EditableReferencesBlockRef {
  getData: () => ReferencesBlockData;
  addReference: () => void;
  removeReference: (index: number) => void;
  updateReference: (index: number, field: keyof ReferenceData, value: string) => void;
}

const EditableReferencesBlock = forwardRef<EditableReferencesBlockRef>((props, ref) => {
  const [blog_references, setBlog_references] = useState<ReferenceData[]>([{ blog_reference_apa: '', blog_reference_url: '' }]);

  useImperativeHandle(ref, () => ({
    getData: () => ({
      blog_references: blog_references.filter(ref => ref.blog_reference_apa.trim() !== '' && ref.blog_reference_url.trim() !== ''),
    }),
    addReference,
    removeReference,
    updateReference,
  }), [blog_references]);

  const addReference = () => {
    setBlog_references([...blog_references, { blog_reference_apa: '', blog_reference_url: '' }]);
  }

  const removeReference = (index: number) => {
    setBlog_references(blog_references.filter((_, i) => i !== index));
  }

  const updateReference =  (index: number, field: keyof ReferenceData, value: string) => {
    const newReferences = [...blog_references];
    newReferences[index] = { ...newReferences[index], [field]: value };
    setBlog_references(newReferences);
  }

  return (
    <div className="references-editor p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">References</h2>
      {blog_references.map((reference, index) => (
        <div key={index} className="mb-4 p-3 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Reference {index + 1}</h3>
          <div className="mb-2">
            <label htmlFor={`apa-${index}`} className="block text-sm font-medium text-gray-700">APA Format</label>
            <input
              id={`apa-${index}`}
              type="text"
              placeholder="e.g., Author, A. A. (Year). Title of work."
              value={reference.blog_reference_apa}
              onChange={(e) => updateReference(index, 'blog_reference_apa', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-2">
            <label htmlFor={`url-${index}`} className="block text-sm font-medium text-gray-700">URL</label>
            <input
              id={`url-${index}`}
              type="url"
              placeholder="e.g., https://example.com/reference"
              value={reference.blog_reference_url}
              onChange={(e) => updateReference(index, 'blog_reference_url', e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="button"
            onClick={() => removeReference(index)}
            className="mt-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            disabled={blog_references.length === 1 && index === 0} // Disable remove if only one reference
          >
            Remove Reference
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addReference}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Reference
      </button>
    </div>
  );
});

EditableReferencesBlock.displayName = 'EditableReferencesBlock';

export default EditableReferencesBlock;
