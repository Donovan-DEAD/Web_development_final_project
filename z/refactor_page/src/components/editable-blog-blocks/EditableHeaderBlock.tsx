"use client";

import React, { useState, useImperativeHandle, forwardRef } from 'react';

export interface HeaderBlockData {
  blog_title: string;
  blog_subtitle: string;
  blog_author: string;
  blog_date: string;
}

export interface EditableHeaderBlockRef {
  getData: () => HeaderBlockData;
}

const EditableHeaderBlock = forwardRef<EditableHeaderBlockRef>((props, ref) => {
  const [blog_title, setBlog_title] = useState('');
  const [blog_subtitle, setBlog_subtitle] = useState('');
  const [blog_author, setBlog_author] = useState('');
  const [blog_date, setBlog_date] = useState('');

  useImperativeHandle(ref, () => ({
    getData: () => ({
      blog_title,
      blog_subtitle,
      blog_author,
      blog_date,
    }),
  }), [blog_title, blog_subtitle, blog_author, blog_date]);

  return (
    <div className="blog-header p-4 border rounded-lg shadow-sm mb-6 bg-white">
      <h2 className="text-2xl font-bold mb-4">Blog Header</h2>
      <div className="mb-4">
        <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="blogTitle"
          type="text"
          placeholder="Blog Title"
          value={blog_title}
          onChange={(e) => setBlog_title(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="blogSubtitle" className="block text-sm font-medium text-gray-700">Subtitle</label>
        <input
          id="blogSubtitle"
          type="text"
          placeholder="Blog Subtitle"
          value={blog_subtitle}
          onChange={(e) => setBlog_subtitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="blogAuthor" className="block text-sm font-medium text-gray-700">Author</label>
        <input
          id="blogAuthor"
          type="text"
          placeholder="Author Name"
          value={blog_author}
          onChange={(e) => setBlog_author(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="blogDate" className="block text-sm font-medium text-gray-700">Publication Date</label>
        <input
          id="blogDate"
          type="date"
          value={blog_date}
          onChange={(e) => setBlog_date(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
});

EditableHeaderBlock.displayName = 'EditableHeaderBlock';

export default EditableHeaderBlock;
