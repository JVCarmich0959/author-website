import React, { useState, useMemo, useEffect } from 'react';
import PostPreview from './PostPreview';
import SearchBar from '../utility/SearchBar';
import Pagination from '../utility/Pagination';
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
      <header className="mb-10">
        <p className="blog-meta mb-2">From the desk of Melissa Michaels</p>
        <h1 id="blog-title" className="text-4xl mb-1">
          The Bloodborne Dispatch
        </h1>
        <hr className="blog-rule" aria-hidden="true" />
        <p className="mt-4 opacity-80 max-w-2xl">
          Field notes on writing, the Bloodborne Chronicles, and the shadows in
          between — collected from a decade at the keyboard.
        </p>
      </header>

      <div className="mb-8">
        <SearchBar
          onChange={(value) => debouncedSetSearch(value)}
          aria-label="Search blog posts"
          placeholder="Search posts by title, summary, or tags..."
        />
      </div>

      {error && (
        <p className="text-red-500 text-center mb-6" role="alert">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="text-center opacity-70" aria-live="polite">
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
            <p className="text-center opacity-70 col-span-full mt-12" aria-live="polite">
              No posts found.
            </p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      )}
    </section>
  );
}
