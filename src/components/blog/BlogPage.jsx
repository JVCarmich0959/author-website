import React, { useState, useMemo, useEffect } from 'react';
import PostPreview from './PostPreview';
import SearchBar from '../utility/SearchBar';
import Pagination from '../utility/Pagination';
import shortStories from "../../data/shortStories.js";
import { supabase, mapPost } from '../../lib/supabase';
import { debounce } from 'lodash';

const PER_PAGE = 6;

export default function AuthorBlogPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('posts')
        .select('slug, title, summary, body, tags, featured_image, author, published_at')
        .not('published_at', 'is', null)
        .lte('published_at', new Date().toISOString())
        .order('published_at', { ascending: false });

      if (cancelled) return;

      if (fetchError) {
        console.error('Failed to fetch posts', fetchError);
        setError('Could not load posts. Please try again later.');
        setPosts([]);
      } else {
        setPosts((data ?? []).map(mapPost));
        setError(null);
      }
      setIsLoading(false);
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const debouncedSetSearch = useMemo(
    () => debounce((value) => {
      setSearch(value);
      setPage(1);
    }, 300),
    []
  );

  useEffect(() => {
    return () => { debouncedSetSearch.cancel(); };
  }, [debouncedSetSearch]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return posts;
    return posts.filter((post) =>
      post.title?.toLowerCase().includes(q) ||
      post.summary?.toLowerCase().includes(q) ||
      (post.tags || []).some((tag) => tag.toLowerCase().includes(q))
    );
  }, [posts, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10" aria-labelledby="blog-title">
      <h1 id="blog-title" className="text-4xl font-bold mb-6 text-gray-900">
        Author's Blog
      </h1>

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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-6" role="list">
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
