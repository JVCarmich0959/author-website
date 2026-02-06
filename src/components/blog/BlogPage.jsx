import React, { useState, useMemo, useEffect } from 'react';
import PostPreview from './PostPreview';
import SearchBar from '../utility/SearchBar';
import Pagination from '../utility/Pagination';
import posts from '../../data/posts.js';
import shortStories from '../../data/shortStories.js';
import { debounce } from 'lodash';
import './blog.css';

export default function AuthorBlogPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [localPosts, setLocalPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState({
    title: '',
    summary: '',
    body: '',
    tags: '',
    featuredImage: '',
  });
  const perPage = 6;

  const localDraftsEnabled = import.meta.env.DEV && import.meta.env.VITE_ENABLE_LOCAL_DRAFTS === 'true';

  useEffect(() => {
    if (!localDraftsEnabled) {
      return;
    }

    const stored = window.localStorage.getItem('authorBlogPosts');
    if (!stored) {
      return;
    }

    try {
      setLocalPosts(JSON.parse(stored));
    } catch (err) {
      console.error('Failed to parse local blog posts', err);
      setError('Unable to load local drafts.');
    }
  }, [localDraftsEnabled]);

  const debouncedSetSearch = useMemo(
    () =>
      debounce((value) => {
        setSearch(value);
        setPage(1);
      }, 300),
    []
  );

  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const allPosts = useMemo(() => (localDraftsEnabled ? [...localPosts, ...posts] : posts), [localDraftsEnabled, localPosts]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      return allPosts;
    }

    return allPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(term) ||
        post.summary?.toLowerCase().includes(term) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(term))
    );
  }, [allPosts, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const publishedShortStories = useMemo(
    () =>
      shortStories.filter((story) => {
        try {
          const parsed = new URL(story.url);
          return parsed.hostname !== 'example.com';
        } catch {
          return false;
        }
      }),
    []
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = formState.title.trim();
    const trimmedBody = formState.body.trim();

    if (!trimmedTitle || !trimmedBody) {
      setError('Please provide a title and body before publishing.');
      return;
    }

    const slugBase = trimmedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newPost = {
      slug: `${slugBase}-${Date.now()}`,
      title: trimmedTitle,
      summary: formState.summary.trim(),
      excerpt: formState.summary.trim(),
      body: trimmedBody,
      tags: formState.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      featuredImage: formState.featuredImage.trim(),
      date: new Date().toISOString(),
      author: 'Melissa Michaels',
    };

    const updatedPosts = [newPost, ...localPosts];
    setLocalPosts(updatedPosts);
    window.localStorage.setItem('authorBlogPosts', JSON.stringify(updatedPosts));
    setFormState({ title: '', summary: '', body: '', tags: '', featuredImage: '' });
    setShowForm(false);
    setError(null);
    setPage(1);
  };

  return (
    <section className="blog-shell max-w-5xl mx-auto px-4 py-10" aria-labelledby="blog-title">
      <h1 id="blog-title" className="text-4xl font-bold mb-6 blog-heading">
        Author’s Blog
      </h1>

      {localDraftsEnabled && (
        <div className="blog-surface p-6 mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-semibold blog-heading">Publish a new entry</p>
              <p className="text-sm blog-muted">Draft posts here for local preview. Entries are stored on this device only.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowForm((prev) => !prev)}
              className="px-4 py-2 font-semibold blog-button"
            >
              {showForm ? 'Hide form' : 'Write a post'}
            </button>
          </div>
          {showForm && (
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <label className="grid gap-2 text-sm">
                Title
                <input name="title" value={formState.title} onChange={handleFormChange} className="blog-input" required />
              </label>
              <label className="grid gap-2 text-sm">
                Summary
                <input
                  name="summary"
                  value={formState.summary}
                  onChange={handleFormChange}
                  className="blog-input"
                  placeholder="Short teaser for the post."
                />
              </label>
              <label className="grid gap-2 text-sm">
                Body (Markdown supported)
                <textarea name="body" value={formState.body} onChange={handleFormChange} className="blog-input min-h-[140px]" required />
              </label>
              <label className="grid gap-2 text-sm">
                Tags (comma separated)
                <input
                  name="tags"
                  value={formState.tags}
                  onChange={handleFormChange}
                  className="blog-input"
                  placeholder="fantasy, writing, events"
                />
              </label>
              <label className="grid gap-2 text-sm">
                Featured image URL
                <input
                  name="featuredImage"
                  value={formState.featuredImage}
                  onChange={handleFormChange}
                  className="blog-input"
                  placeholder="https://..."
                />
              </label>
              <button type="submit" className="w-full md:w-auto px-5 py-2 font-semibold blog-button">
                Publish post
              </button>
            </form>
          )}
        </div>
      )}

      {publishedShortStories.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold blog-heading mb-4">Short Stories</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {publishedShortStories.map((story) => (
              <a
                key={story.title}
                href={story.url}
                className="blog-card block p-5"
                target="_blank"
                rel="noreferrer"
              >
                <p className="text-sm blog-muted">{story.type}</p>
                <p className="text-lg font-semibold blog-heading">{story.title}</p>
                <p className="text-sm mt-2">{story.description}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      <SearchBar
        value={search}
        onChange={(event) => debouncedSetSearch(event.target.value)}
        aria-label="Search blog posts"
        placeholder="Search posts by title, summary, or tags..."
        className="mb-8"
      />

      {error && (
        <p className="text-red-400 text-center mb-6" role="alert">
          {error}
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6" role="list">
        {paginated.map((post) => (
          <PostPreview key={post.slug} post={post} className="h-full" />
        ))}
        {paginated.length === 0 && (
          <p className="text-center blog-muted col-span-full mt-12" aria-live="polite">
            No posts found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} className="mt-10" />
      )}
    </section>
  );
}
