import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, MessageCircle } from 'lucide-react';
import { debounce } from 'lodash';
import PostPreview from './PostPreview';
import DispatchThumb from './DispatchThumb';
import { readingMinutes } from '../../lib/readingTime';
import SEO from '../utility/SEO';
import { supabase, mapPost } from '../../lib/supabase';
import './blog-page.css';

const PER_PAGE = 6;

function BulletinSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const subscribe = async (e) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    // same edge function as the contact-section signup; it saves the
    // subscriber and sends the confirmation email
    const { data, error } = await supabase.functions.invoke('subscribe', {
      body: { email: value, source: 'blog-dispatch' },
    });
    if (error || data?.error) {
      console.error('Subscribe failed:', error || data?.error);
      setStatus('error');
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section className="dispatch-bulletin" aria-label="Newsletter signup">
      <div className="dispatch-bulletin-copy">
        <p className="dispatch-eyebrow dispatch-eyebrow--rust">
          Dispatches from editor E. Nocturne
        </p>
        <h3 className="dispatch-bulletin-title">Get the next field note first</h3>
        <p className="dispatch-bulletin-sub">
          Story clues, release news, and giveaways from inside the Chronicles.
        </p>
      </div>
      {status === 'success' ? (
        <p className="dispatch-bulletin-status" role="status">
          Almost there — check your inbox and click the confirmation link.
        </p>
      ) : (
        <form className="dispatch-bulletin-form" onSubmit={subscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            required
          />
          <button type="submit" className="dispatch-btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Joining…' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="dispatch-bulletin-status dispatch-bulletin-status--error" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}

function FeaturedDispatch({ post, commentCount }) {
  const mins = readingMinutes(post.body);
  const reports =
    typeof commentCount === 'number'
      ? `${commentCount} field report${commentCount === 1 ? '' : 's'}`
      : null;

  return (
    <section className="dispatch-featured-wrap" aria-label="Latest dispatch">
      <div className="dispatch-featured">
        <div className="dispatch-featured-media">
          {post.featuredImage ? (
            <img src={post.featuredImage} alt="" />
          ) : (
            <DispatchThumb slug={post.slug} title={post.title} />
          )}
          <span className="dispatch-featured-badge">Latest dispatch</span>
          <div className="dispatch-featured-bar" aria-hidden="true">
            <span />
          </div>
        </div>
        <div className="dispatch-featured-body">
          {post.tags?.[0] && <p className="dispatch-kicker">{post.tags[0]}</p>}
          <h2 className="dispatch-featured-title">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="dispatch-featured-excerpt">{post.summary}</p>
          <div className="dispatch-meta">
            <span>
              <Clock size={15} aria-hidden="true" />
              {mins} min read
            </span>
            {reports && (
              <span>
                <MessageCircle size={15} aria-hidden="true" />
                {reports}
              </span>
            )}
          </div>
          <Link to={`/blog/${post.slug}`} className="dispatch-btn">
            Read the dispatch →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AuthorBlogPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const [newestFirst, setNewestFirst] = useState(true);
  const [visible, setVisible] = useState(PER_PAGE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [commentCounts, setCommentCounts] = useState(null);

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

  // visible comment tallies per post ("field reports")
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { data, error: fetchError } = await supabase
        .from('comments')
        .select('post_slug')
        .eq('hidden', false);
      if (cancelled || fetchError || !data) return;
      const counts = {};
      for (const row of data) {
        counts[row.post_slug] = (counts[row.post_slug] || 0) + 1;
      }
      setCommentCounts(counts);
    })();

    return () => { cancelled = true; };
  }, []);

  const debouncedSetSearch = useMemo(
    () => debounce((value) => setSearch(value), 300),
    []
  );

  useEffect(() => {
    return () => { debouncedSetSearch.cancel(); };
  }, [debouncedSetSearch]);

  useEffect(() => {
    setVisible(PER_PAGE);
  }, [search, activeTag, newestFirst]);

  const categories = useMemo(() => {
    const counts = new Map();
    for (const post of posts) {
      for (const tag of post.tags || []) {
        counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    const matches = posts.filter((post) =>
      (activeTag === 'all' || (post.tags || []).includes(activeTag)) &&
      (!q ||
        post.title?.toLowerCase().includes(q) ||
        post.summary?.toLowerCase().includes(q) ||
        (post.tags || []).some((tag) => tag.toLowerCase().includes(q)))
    );
    return matches.sort((a, b) =>
      newestFirst
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
  }, [posts, search, activeTag, newestFirst]);

  // the newest post headlines as "Latest dispatch" while no filters are active
  const featured = !search && activeTag === 'all' && posts.length > 0 ? posts[0] : null;
  const gridPosts = featured
    ? filtered.filter((post) => post.slug !== featured.slug)
    : filtered;
  const shown = gridPosts.slice(0, visible);
  const countFor = (post) => (commentCounts ? commentCounts[post.slug] ?? 0 : undefined);

  return (
    <div className="dispatch-page">
      <SEO
        title="The Bloodborne Dispatch — Melissa Michaels"
        description="Field notes on writing, the Bloodborne Chronicles, and the shadows in between — collected from a decade at the keyboard."
      />
      <div className="dispatch-frame">

        <header className="dispatch-masthead">
          <div className="dispatch-masthead-row">
            <div className="dispatch-masthead-title">
              <p className="dispatch-eyebrow">From the desk of Melissa Michaels</p>
              <h1 className="dispatch-title">The Bloodborne Dispatch</h1>
              <hr className="dispatch-rule" aria-hidden="true" />
              <p className="dispatch-tagline">
                Field notes on writing, the Bloodborne Chronicles, and the shadows in
                between — collected from a decade at the keyboard.
              </p>
            </div>
            <label className="dispatch-search">
              <Search size={18} color="rgba(205,180,139,.7)" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search dispatches…"
                aria-label="Search dispatches"
                onChange={(e) => debouncedSetSearch(e.target.value)}
              />
            </label>
          </div>
          <nav className="dispatch-filters" aria-label="Post categories">
            <button
              type="button"
              className={`dispatch-chip ${activeTag === 'all' ? 'dispatch-chip--active' : ''}`}
              onClick={() => setActiveTag('all')}
            >
              All · {posts.length}
            </button>
            {categories.map(([tag, count]) => (
              <button
                key={tag}
                type="button"
                className={`dispatch-chip ${activeTag === tag ? 'dispatch-chip--active' : ''}`}
                onClick={() => setActiveTag(activeTag === tag ? 'all' : tag)}
              >
                {tag} · {count}
              </button>
            ))}
            <button
              type="button"
              className="dispatch-sort"
              onClick={() => setNewestFirst((v) => !v)}
            >
              Sort: {newestFirst ? 'Newest first ▾' : 'Oldest first ▴'}
            </button>
          </nav>
        </header>

        {error && (
          <p className="dispatch-status dispatch-status--error" role="alert">
            {error}
          </p>
        )}

        {isLoading ? (
          <p className="dispatch-status" aria-live="polite">
            Consulting the archives…
          </p>
        ) : (
          <>
            {featured && (
              <FeaturedDispatch post={featured} commentCount={countFor(featured)} />
            )}

            <BulletinSignup />

            <section className="dispatch-grid-wrap" aria-label="All dispatches">
              {shown.length > 0 ? (
                <div className="dispatch-grid" role="list">
                  {shown.map((post) => (
                    <PostPreview key={post.slug} post={post} commentCount={countFor(post)} />
                  ))}
                </div>
              ) : (
                !featured &&
                !error && (
                  <p className="dispatch-status" aria-live="polite">
                    No dispatches match — the shadows are keeping them for now.
                  </p>
                )
              )}
            </section>

            <section className="dispatch-book-wrap" aria-label="Related book">
              <div className="dispatch-book">
                <div className="dispatch-book-cover">
                  <img
                    src={`${import.meta.env.BASE_URL}RR_Cover.jpg`}
                    alt="Raven's Revenge book cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="dispatch-eyebrow dispatch-eyebrow--rust">
                    This dispatch connects to
                  </p>
                  <h3 className="dispatch-book-title">Raven&apos;s Revenge</h3>
                  <p className="dispatch-book-sub">
                    Book One of The Bloodborne Chronicles — where the thermal-vision
                    field notes become the story.
                  </p>
                </div>
                <Link to="/#services" className="dispatch-btn">
                  Read a sample
                </Link>
              </div>
            </section>

            <div className="dispatch-loadmore">
              {gridPosts.length > visible && (
                <button
                  type="button"
                  className="dispatch-btn dispatch-btn--ghost"
                  onClick={() => setVisible((v) => v + PER_PAGE)}
                >
                  Load more dispatches
                </button>
              )}
              <p className="dispatch-loadmore-note">
                Join the discussion — readers leave field reports on every dispatch.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
