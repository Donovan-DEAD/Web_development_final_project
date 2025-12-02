/**
 * @fileoverview Blog Search Wrapper - Client component for searching and browsing blog posts.
 * Provides a search interface and displays blog posts based on search queries.
 */

"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogCard from "@/components/BlogCard";
import Link from 'next/link';

/**
 * BlogSearchWrapper - Client component for searching blog posts.
 * Manages search query state and fetches blog posts from the search API.
 * Displays results in a grid layout or prompts users to search if no results found.
 * @function BlogSearchWrapper
 * @returns {React.ReactNode} The blog search interface component
 */
export default function BlogSearchWrapper() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Placeholder for user data
  const username = null; // Or fetch from context/session
  const user = null; // Or fetch from context/session

  useEffect(() => {
    const initialSearchTerm = searchParams.get('searchTerm');
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    }
    fetchBlogs(initialSearchTerm || '');
  }, [searchParams]);

  const fetchBlogs = async (term: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog-search?searchTerm=${encodeURIComponent(term)}`);
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        console.error('Failed to fetch blog posts:', response.statusText);
        setBlogPosts([]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setBlogPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/blog-search?searchTerm=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <>
      <div className="blog-search__container">
        <form id="blog-search-form" onSubmit={handleSearchSubmit}>
          <h1 className="blog-search__title">Search Blogs</h1>
          <input
            type="text"
            className="blog-search__search-bar"
            placeholder="Search by title or description..."
            id="searchTerm"
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-search btn-search--md"
            aria-label="Search"
          >
            Search
          </button>
        </form>
      </div>

      <div className="blog-search__grid">
        {loading ? (
          <p>Loading blogs...</p>
        ) : (
          <>
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <BlogCard key={post.blog_id} post={post} />
              ))
            ) : (
              <>
                <p>We couldn't find the blog post you were looking for</p>
                <Link href="/blog-search" passHref>
                  <button className="navbar__utils__login__button">Blogs</button>
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
