import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import posts from '../../data/posts.js';
import BlogPost from './BlogPost';
import SEO from '../utility/SEO';
import './blog.css';

export default function BlogPostWrapper() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const foundPost = posts.find((entry) => entry.slug === slug);
        if (!foundPost) {
          setError('Post not found');
          return;
        }
        setPost(foundPost);
      } catch (err) {
        setError('Error loading post');
        console.error('Error finding post:', err);
      } finally {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center blog-shell">
        <div className="text-center blog-card p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-antique-gold)] mx-auto mb-4" />
          <p className="text-lg blog-muted">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center blog-shell px-4">
        <div className="text-center max-w-md mx-auto blog-surface p-8">
          <h1 className="text-6xl font-bold blog-heading mb-4">404</h1>
          <h2 className="text-2xl font-semibold blog-heading mb-4">Blog Post Not Found</h2>
          <p className="blog-muted mb-8">The blog post you&apos;re looking for doesn&apos;t exist or may have been moved.</p>
          <div className="space-x-4">
            <Link to="/blog" className="inline-block px-6 py-3 blog-button">
              Back to Blog
            </Link>
            <Link to="/" className="inline-block px-6 py-3 blog-button--ghost rounded-md border border-[rgba(205,180,139,0.4)]">
              Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen blog-shell">
      <SEO title={`${post.title} - Melissa Michaels`} description={post.excerpt || post.content?.substring(0, 160) || 'Blog post by Melissa Michaels'} />

      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-sm blog-muted">
          <Link to="/" className="hover:text-[var(--color-accent)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[var(--color-accent)] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="blog-heading">{post.title}</span>
        </div>
      </nav>

      <BlogPost post={post} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center border-t blog-divider pt-8">
          <Link to="/blog" className="inline-flex items-center hover:text-[var(--color-accent)] transition-colors">
            ← Back to all posts
          </Link>
          <div className="text-sm blog-muted">Share this post</div>
        </div>
      </div>
    </div>
  );
}
