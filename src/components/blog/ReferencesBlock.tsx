"use client";

import React from 'react';

interface Reference {
  blog_reference_apa: string;
  blog_reference_url: string;
}

interface ReferencesBlockProps {
  block: {
    blog_references: Reference[];
  };
}

const ReferencesBlock: React.FC<ReferencesBlockProps> = ({ block }) => {
  return (
    <div className="references">
      <h3>References</h3>
      <ul>
        {block.blog_references.map((ref, index) => (
          <li key={index}>
            <a href={ref.blog_reference_url} target="_blank" rel="noopener noreferrer">
              {ref.blog_reference_apa}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReferencesBlock;
