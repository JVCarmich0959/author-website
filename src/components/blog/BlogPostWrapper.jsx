import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapPost } from '../../lib/supabase';
import BlogPost from './BlogPost';
import SEO from '../utility/SEO';

export default function BlogPostWrapper() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('slug, title, summary, body, tags, featured_image, author, published_at')
        .eq('slug', slug)
        .not('published_at', 'is', null)
        .lte('published_at', new Date().toISOString())
        .maybeSingle();

      if (cancelled) return;

      if (fetchError) {
        console.error('Error loading post:', fetchError);
        setError('Error loading post');
      } else if (!data) {
        setError('Post not found');
      } else {
        setPost(mapPost(data));
      }
      setLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

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

  return (
    <div className="min-h-screen">
      <SEO
        title={`${post.title} - Melissa Michaels`}
        description={post.summary || post.body?.substring(0, 160) || 'Blog post by Melissa Michaels'}
      />

      <nav className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-800">{post.title}</span>
        </div>
      </nav>

      <BlogPost post={post} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center border-t pt-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
