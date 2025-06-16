import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import PostPreview from './PostPreview';
import SearchBar from '../utility/SearchBar';
import Pagination from '../utility/Pagination';
import posts from "../../data/posts.js";
import { debounce } from 'lodash';

export default function AuthorBlogPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const perPage = 6;

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

  const filtered = useMemo(() => {
    setIsLoading(true);
    try {
      const result = posts.filter((post) =>
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
  }, [search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <section className="max-w-5xl mx-auto px-4 py-10" aria-labelledby="blog-title">
      <h1 id="blog-title" className="text-4xl font-bold mb-6 text-gray-900">
        Author’s Blog
      </h1>
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