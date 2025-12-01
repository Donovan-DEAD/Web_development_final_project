// This is a Server Component, responsible for fetching data and rendering the page.

import Navbar from "@/components/ClientNavbar";
import HeaderBlock from "@/components/blog/HeaderBlock";
import ImgAndContentBlock from "@/components/blog/ImgAndContentBlock";
import PureContentBlock from "@/components/blog/PureContentBlock";
import PureImageBlock from "@/components/blog/PureImageBlock";
import ReferencesBlock from "@/components/blog/ReferencesBlock";
import { notFound } from 'next/navigation';

// Define types for blog data based on your Mongoose models
interface BlogBlock {
  type: string;
  _id: string; // Add _id for key prop
  [key: string]: any; // Allow any other properties
}

interface BlogContentData {
  _id: string;
  author_id: string;
  blog_blocks: BlogBlock[];
}

interface BlogPostPageProps {
  params: {
    blogId: string;
  };
}

import { getCurrentUser } from "@/lib/server-auth";
import { IUser } from "@/lib/models/user";

// ... (keep existing imports)

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const newParams = await params
  const blogId = newParams.blogId;
  // Fetch user data
  const user: IUser | null = await getCurrentUser();
  const username = user ? user.name : null;
  const userPerms = user ? { permsLabel: user.perms } : null;

  let blogData: BlogContentData | null = null;
  let error: string | null = null;

  try {
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${blogId}`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blog/${blogId}`, { cache: 'no-store' }); // Adjust base URL as needed
    if (!response.ok) {
      if (response.status === 404) {
        notFound(); // Renders Next.js 404 page
      }
      throw new Error(`Failed to fetch blog post: ${response.statusText}`);
    }
    blogData = await response.json();
  } catch (err: any) {
    console.error('Error fetching blog data:', err);
    error = err.message || 'Error loading blog.';
  }

  if (!blogData || error) {
    // This part should ideally not be reached if notFound() is called for 404
    // but useful for generic fetch errors.
    return (
      <>
        <Navbar username={username} currentPage="blogpost" user={userPerms} />
        <main className="blog-content-wrapper">
          <div className="container">
            <p className="no-content">{error || 'Blog post content not available.'}</p>
            <a href="/blog-search">Go back to search</a>
          </div>
        </main>
      </>
    );
  }

  // Find the header block to get title/description for page metadata if needed
  const headerBlock = blogData.blog_blocks.find(block => block.type === 'Header');
  const pageTitle = headerBlock?.blog_title || 'Blog Post';
  const pageDescription = headerBlock?.blog_subtitle || 'Blog Post'; // Assuming subtitle is description

  return (
    <>
      <Navbar username={username} currentPage="blogpost" user={userPerms} />


      {/* Blog Header Section */}
      <section className="blog-header">
        <div className="container">
          <h1>{pageTitle}</h1>
          <h3>{pageDescription}</h3>
          {/* Removed dynamic author/date from original EJS as it's not in the main blog.blog_blocks[0] */}
          {/* You might need to fetch BlogMeta separately or include author/date in BlogContent for this */}
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="blog-content-wrapper">
        <div className="container">
          <div className="blog-content">
            {blogData.blog_blocks.map((block) => {
              switch (block.type) {
                case 'Header':
                  return <HeaderBlock key={block._id} block={block} />;
                case 'Img_and_content':
                  return <ImgAndContentBlock key={block._id} block={block} />;
                case 'Pure_content':
                  return <PureContentBlock key={block._id} block={block} />;
                case 'Pure_image':
                  return <PureImageBlock key={block._id} block={block} />;
                case 'References':
                  return <ReferencesBlock key={block._id} block={block} />;
                default:
                  return null; // Or render an unknown block component
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// Optional: If you want to use generateStaticParams for SSG, implement it here.
// export async function generateStaticParams() {
//   // Fetch all blog IDs to pre-render pages at build time
//   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs`); // Assuming an API to list all blogs
//   const blogs = await response.json();
//   return blogs.map((blog: { _id: string }) => ({
//     blogId: blog._id,
//   }));
// }
