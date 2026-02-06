import React, { useEffect, useId, useMemo, useState } from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import {
  Heart,
  Share2,
  BookOpen,
  Clock,
  Tag,
  Twitter,
  Facebook,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import AuthorBio from "./AuthorBio";
import "./blog-theme.css";

export default function BlogPost({ post, onLike, likeCount = 0, isLiked = false }) {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);
  const [readingTime, setReadingTime] = useState(0);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const shareMenuId = useId();

  // Calculate reading time
  useEffect(() => {
    if (!post?.body) return;
    const words = post.body.split(/\s+/).filter(Boolean).length;
    const avgWPM = 200;
    setReadingTime(Math.max(1, Math.ceil(words / avgWPM)));
  }, [post?.body]);

  // Track scroll progress (smooth-ish, low overhead)
  useEffect(() => {
    let raf = 0;

    const update = () => {
      const scrollTop = window.scrollY || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Close share menu on Escape
  useEffect(() => {
    if (!shareMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setShareMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shareMenuOpen]);

  if (!post || !post.title) {
    return (
      <main className="blog-shell min-h-[60vh] flex items-center justify-center px-4">
        <div className="blog-surface p-8 max-w-md text-center" role="alert">
          <h1 className="blog-title text-2xl mb-3">Error</h1>
          <p className="blog-muted">Invalid or missing post data.</p>
        </div>
      </main>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);
    setLikes((prev) => (newLiked ? prev + 1 : Math.max(0, prev - 1)));
    onLike?.(newLiked);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopySuccess(true);
      window.setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const shareLinks = useMemo(
    () => [
      {
        name: "Twitter",
        url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        icon: Twitter,
      },
      {
        name: "Facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        icon: Facebook,
      },
      {
        name: "LinkedIn",
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        icon: Linkedin,
      },
    ],
    [encodedTitle, encodedUrl]
  );

  return (
    <div className="blog-shell">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 blog-progress-track z-50"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress)}
      >
        <div
          className="h-full blog-progress-bar transition-[width] duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <article className="max-w-4xl mx-auto blog-surface overflow-hidden" aria-labelledby="post-title">
        {/* Hero Section */}
        {post.featuredImage && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))" }} />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-4 blog-meta mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                <span>{readingTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>{formattedDate}</span>
              </div>
            </div>

            <h1 id="post-title" className="blog-title text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && <p className="blog-muted text-lg leading-relaxed">{post.excerpt}</p>}
          </header>

          {/* Author Bio */}
          <div className="blog-surface p-4 mb-8">
            <AuthorBio />
          </div>

          {/* Main Content */}
          <section className="blog-prose">
            {post.body ? (
              <ReactMarkdown>{post.body}</ReactMarkdown>
            ) : (
              <div className="text-center py-12">
                <p className="blog-muted text-lg">No content available.</p>
              </div>
            )}
          </section>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <section className="mt-8 pt-6 blog-divider">
              <div className="flex items-center gap-2 mb-3 blog-meta">
                <Tag className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm font-medium">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-chip">
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Action Bar */}
          <div className="mt-8 pt-6 blog-divider flex items-center justify-between">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`blog-btn ${liked ? "blog-btn--liked" : ""} flex items-center gap-2`}
              aria-label={liked ? "Unlike post" : "Like post"}
              type="button"
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} aria-hidden="true" />
              <span className="font-medium">{likes}</span>
            </button>

            {/* Share Menu */}
            <div className="relative">
              <button
                onClick={() => setShareMenuOpen((v) => !v)}
                className="blog-btn blog-btn--primary flex items-center gap-2"
                aria-label="Share post"
                aria-expanded={shareMenuOpen}
                aria-controls={shareMenuId}
                type="button"
              >
                <Share2 className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">Share</span>
              </button>

              {shareMenuOpen && (
                <div
                  id={shareMenuId}
                  className="absolute right-0 mt-2 w-56 blog-menu z-50"
                  role="menu"
                >
                  <div className="p-2">
                    {shareLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors"
                        onClick={() => setShareMenuOpen(false)}
                        role="menuitem"
                      >
                        <link.icon className="w-4 h-4" aria-hidden="true" />
                        <span>{link.name}</span>
                      </a>
                    ))}

                    <button
                      onClick={() => {
                        copyToClipboard();
                        setShareMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full text-left"
                      type="button"
                      role="menuitem"
                    >
                      {copySuccess ? (
                        <Check className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <Copy className="w-4 h-4" aria-hidden="true" />
                      )}
                      <span>{copySuccess ? "Copied!" : "Copy Link"}</span>
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
          className="fixed inset-0 z-40"
          onClick={() => setShareMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
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
