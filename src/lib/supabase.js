import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. ' +
    'Newsletter signups and blog fetches will fail until these are set.'
  );
}

// createClient throws on an empty URL, which would crash the whole app at
// import time. Fall back to a placeholder client so the site still renders;
// its requests fail at the network layer and surface through the existing
// { data, error } handling in components.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  key || 'placeholder-key'
);

// Convert a posts row from DB shape to the shape the existing
// PostPreview / BlogPost components expect.
export function mapPost(row) {
  if (!row) return null;
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary ?? '',
    excerpt: row.summary ?? '',
    body: row.body ?? '',
    tags: row.tags ?? [],
    featuredImage: row.featured_image ?? '',
    date: row.published_at,
    author: row.author,
  };
}
