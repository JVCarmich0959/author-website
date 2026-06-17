import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, mapPost } from '../../lib/supabase';
import BlogPost from './BlogPost';
import Comments from './Comments';
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
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: 'var(--color-accent)' }}
          ></div>
          <p className="text-lg opacity-80">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="blog-panel text-center max-w-md mx-auto px-8 py-10">
          <h1 className="text-6xl mb-4">404</h1>
          <h2 className="text-2xl mb-4">Blog Post Not Found</h2>
          <p className="opacity-80 mb-8">
            The dispatch you're looking for doesn't exist or may have been moved.
          </p>
          <div className="space-x-4">
            <Link to="/blog" className="blog-btn inline-block px-6 py-3 rounded-lg">
              Back to Blog
            </Link>
            <Link to="/" className="blog-btn inline-block px-6 py-3 rounded-lg">
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
        <div className="blog-meta flex items-center space-x-2">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span className="opacity-70 truncate max-w-[50vw]">{post.title}</span>
        </div>
      </nav>

      <BlogPost post={post} />

      <div className="max-w-4xl mx-auto px-4">
        <Comments slug={post.slug} />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center border-t border-[rgba(205,180,139,0.16)] pt-8">
          <Link to="/blog" className="inline-flex items-center">
            ← Back to all dispatches
          </Link>
        </div>
      </div>
    </div>
  );
}
