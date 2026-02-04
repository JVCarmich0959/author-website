import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostPreview from './PostPreview';
import SearchBar from '../utility/SearchBar';
import Pagination from '../utility/Pagination';
import posts from "../../data/posts.js";
import shortStories from "../../data/shortStories.js";
import { debounce } from 'lodash';

export default function AuthorBlogPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
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

  useEffect(() => {
    const stored = window.localStorage.getItem('authorBlogPosts');
    if (stored) {
      try {
        setLocalPosts(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse local blog posts', err);
      }
    }
  }, []);

  // Debounce search input to prevent excessive filtering
  const debouncedSetSearch = useMemo(
    () => debounce((value) => {
      setSearch(value);
      setPage(1); // Reset to first page on new search
    }, 300),
    []
  );

  // Clean up debounce on component unmount
  useEffect(() => {
    return () => {
      debouncedSetSearch.cancel();
    };
  }, [debouncedSetSearch]);

  const allPosts = useMemo(
    () => [...localPosts, ...posts],
    [localPosts]
  );

  const filtered = useMemo(() => {
    setIsLoading(true);
    try {
      const result = allPosts.filter((post) =>
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.summary?.toLowerCase().includes(search.toLowerCase()) ||
        (post.tags || []).some(tag =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
      );
      setIsLoading(false);
      return result;
    } catch (err) {
      setError('An error occurred while filtering posts.');
      setIsLoading(false);
      return [];
    }
  }, [allPosts, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / perPage);

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

    const slugBase = trimmedTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

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
    <section className="max-w-5xl mx-auto px-4 py-10" aria-labelledby="blog-title">
      <h1 id="blog-title" className="text-4xl font-bold mb-6 text-gray-900">
        Author’s Blog
      </h1>
      <div className="bg-stone-950/90 border border-amber-200/20 text-amber-100 rounded-2xl p-6 mb-10 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Publish a new entry</p>
            <p className="text-sm text-amber-200/80">
              Draft posts here to keep your blog fresh. Posts save to this device and appear immediately.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="px-4 py-2 rounded-lg bg-amber-200 text-stone-900 font-semibold hover:bg-amber-300 transition-colors"
          >
            {showForm ? 'Hide form' : 'Write a post'}
          </button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm">
              Title
              <input
                name="title"
                value={formState.title}
                onChange={handleFormChange}
                className="rounded-lg border border-amber-200/30 bg-stone-900/80 px-3 py-2 text-amber-100"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              Summary
              <input
                name="summary"
                value={formState.summary}
                onChange={handleFormChange}
                className="rounded-lg border border-amber-200/30 bg-stone-900/80 px-3 py-2 text-amber-100"
                placeholder="Short teaser for the post."
              />
            </label>
            <label className="grid gap-2 text-sm">
              Body (Markdown supported)
              <textarea
                name="body"
                value={formState.body}
                onChange={handleFormChange}
                className="min-h-[140px] rounded-lg border border-amber-200/30 bg-stone-900/80 px-3 py-2 text-amber-100"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              Tags (comma separated)
              <input
                name="tags"
                value={formState.tags}
                onChange={handleFormChange}
                className="rounded-lg border border-amber-200/30 bg-stone-900/80 px-3 py-2 text-amber-100"
                placeholder="fantasy, writing, events"
              />
            </label>
            <label className="grid gap-2 text-sm">
              Featured image URL
              <input
                name="featuredImage"
                value={formState.featuredImage}
                onChange={handleFormChange}
                className="rounded-lg border border-amber-200/30 bg-stone-900/80 px-3 py-2 text-amber-100"
                placeholder="https://..."
              />
            </label>
            <button
              type="submit"
              className="w-full md:w-auto px-5 py-2 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 transition-colors"
            >
              Publish post
            </button>
          </form>
        )}
      </div>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Short Stories</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {shortStories.map((story) => (
            <a
              key={story.title}
              href={story.url}
              className="group block rounded-2xl border border-gray-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-sm text-gray-500">{story.type}</p>
              <p className="text-lg font-semibold text-gray-900 group-hover:text-red-700">{story.title}</p>
              <p className="text-sm text-gray-600 mt-2">{story.description}</p>
            </a>
          ))}
        </div>
      </div>
      <SearchBar
        value={search}
        onChange={(e) => debouncedSetSearch(e.target.value)}
        aria-label="Search blog posts"
        placeholder="Search posts by title, summary, or tags..."
        className="mb-8"
      />

      {error && (
        <p className="text-red-600 text-center mb-6" role="alert">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="text-center text-gray-500" aria-live="polite">
          Loading posts...
        </p>
      ) : (
        <div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6"
          role="list"
        >
          {paginated.map((post) => (
            <PostPreview
              key={post.slug}
              post={post}
              className="transition-transform transform hover:scale-105"
            />
          ))}
          {paginated.length === 0 && (
            <p className="text-center text-gray-500 col-span-full mt-12" aria-live="polite">
              No posts found.
            </p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
          className="mt-10"
          aria-label="Blog pagination"
        />
      )}
    </section>
  );
}

AuthorBlogPage.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      summary: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
