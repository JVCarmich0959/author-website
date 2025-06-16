import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Heart, Share2, BookOpen, Clock, Tag, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import AuthorBio from './AuthorBio';

export default function BlogPost({ post, onLike, likeCount = 0, isLiked = false }) {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);
  const [readingTime, setReadingTime] = useState(0);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate reading time
  useEffect(() => {
    if (post?.body) {
      const words = post.body.split(/\s+/).length;
      const avgWPM = 200;
      const time = Math.ceil(words / avgWPM);
      setReadingTime(time);
    }
  }, [post?.body]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post || !post.title) {
    return (
      <article className="prose mx-auto p-4 text-center text-red-600" role="alert">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800 font-medium">Error: Invalid or missing post data.</p>
        </div>
      </article>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date not available';

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes(prev => newLiked ? prev + 1 : prev - 1);
    if (onLike) onLike(newLiked);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const shareLinks = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: Twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: 'hover:text-blue-600'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
      color: 'hover:text-blue-700'
    }
  ];

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article
        className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl overflow-hidden"
        aria-labelledby="post-title"
      >
        {/* Hero Section */}
        {post.featuredImage && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <h1 
              id="post-title" 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4"
            >
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Author Bio */}
          <AuthorBio className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl" />

          {/* Main Content */}
          <section className="prose prose-lg dark:prose-invert max-w-none">
            {post.body ? (
              <ReactMarkdown
                components={{
                  h1: ({children}) => <h1 className="text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-medium mt-4 mb-2 text-gray-700 dark:text-gray-200">{children}</h3>,
                  p: ({children}) => <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 dark:bg-blue-900/20 italic">
                      {children}
                    </blockquote>
                  ),
                  code: ({children}) => (
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({children}) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
                      {children}
                    </pre>
                  )
                }}
              >
                {post.body}
              </ReactMarkdown>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No content available.</p>
              </div>
            )}
          </section>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <section className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Action Bar */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                liked 
                  ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
              }`}
              aria-label={liked ? 'Unlike post' : 'Like post'}
            >
              <Heart 
                className={`w-5 h-5 transition-all duration-200 ${liked ? 'fill-current' : ''}`} 
              />
              <span className="font-medium">{likes}</span>
            </button>

            {/* Share Menu */}
            <div className="relative">
              <button
                onClick={() => setShareMenuOpen(!shareMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg transition-colors"
                aria-label="Share post"
              >
                <Share2 className="w-5 h-5" />
                <span className="font-medium">Share</span>
              </button>

              {shareMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="p-2">
                    {shareLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${link.color} hover:bg-gray-50 dark:hover:bg-gray-700`}
                        onClick={() => setShareMenuOpen(false)}
                      >
                        <link.icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </a>
                    ))}
                    <button
                      onClick={() => {
                        copyToClipboard();
                        setShareMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700 w-full text-left"
                    >
                      {copySuccess ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Click outside to close share menu */}
      {shareMenuOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setShareMenuOpen(false)}
        />
      )}
    </>
  );
}

BlogPost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    excerpt: PropTypes.string,
    date: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    featuredImage: PropTypes.string,
  }).isRequired,
  onLike: PropTypes.func,
  likeCount: PropTypes.number,
  isLiked: PropTypes.bool,
};