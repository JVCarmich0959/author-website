import React, { useEffect, useState } from 'react';
import PostPreview from './PostPreview';
import matter from 'gray-matter';
import { Buffer } from 'buffer';

const modules = import.meta.glob('../../posts/*.md', { query: '?raw', import: 'default' });
window.Buffer = window.Buffer || Buffer;

async function loadFeatured() {
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const content = await loader();
      const slug = path.split('/').pop().replace(/\.md$/, '');
      const { data } = matter(content);
      return { slug, ...data };
    })
  );
  const sorted = entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  return sorted[0];
}

export default function FeaturedPost() {
  const [post, setPost] = useState();
  useEffect(() => {
    loadFeatured().then(setPost);
  }, []);
  if (!post) return null;
  return (
    <section className="container mx-auto py-12">
      <h2 className="text-2xl mb-4 font-display text-center">Featured Post</h2>
      <PostPreview post={post} />
    </section>
  );
}
