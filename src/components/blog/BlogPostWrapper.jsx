import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import posts from '../../../data/posts.js';
import BlogPost from './BlogPost';
import SEO from '../utility/SEO';

export default function BlogPostWrapper() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading delay and find post
    const timer = setTimeout(() => {
      try {
        const foundPost = posts.find((p) => p.slug === slug);
        
        if (!foundPost) {
          setError('Post not found');
        } else {
          setPost(foundPost);
        }
      } catch (err) {
        setError('Error loading post');
        console.error('Error finding post:', err);
      } finally {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist or may have been moved.
          </p>
          <div className="space-x-4">
            <Link 
              to="/blog" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </Link>
            <Link 
              to="/" 
              className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen">
      {/* SEO for individual post */}
      <SEO 
        title={`${post.title} - Melissa Michaels`}
        description={post.excerpt || post.content?.substring(0, 160) || 'Blog post by Melissa Michaels'}
      />
      
      {/* Navigation breadcrumb */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-blue-600 transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gray-800">{post.title}</span>
        </div>
      </nav>

      {/* Blog post content */}
      <BlogPost post={post} />

      {/* Navigation to other posts */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center border-t pt-8">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to all posts
          </Link>
          
          {/* Optional: Add next/previous post navigation */}
          <div className="text-sm text-gray-500">
            Share this post
          </div>
        </div>
      </div>
    </div>
  );
}