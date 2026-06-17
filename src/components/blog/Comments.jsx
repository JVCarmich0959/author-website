import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabase";

function formatDate(ts) {
  try {
    return new Date(ts).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Comments({ slug }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const honeypot = useRef(""); // bots fill this hidden field; humans never see it

  useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const { data } = await supabase
        .from("comments")
        .select("id, author_name, body, created_at")
        .eq("post_slug", slug)
        .eq("hidden", false)
        .order("created_at", { ascending: true });
      if (active) {
        setComments(data ?? []);
        setLoading(false);
      }
    })();

    // live: append new comments as they arrive (RLS only delivers visible ones)
    const channel = supabase
      .channel(`comments:${slug}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `post_slug=eq.${slug}`,
        },
        (payload) => {
          setComments((prev) =>
            prev.some((c) => c.id === payload.new.id)
              ? prev
              : [...prev, payload.new]
          );
        }
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [slug]);

  const submit = async (e) => {
    e.preventDefault();
    if (honeypot.current) return; // silently drop bots

    const n = name.trim();
    const b = body.trim();
    if (!n || !b) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const { data, error } = await supabase
      .from("comments")
      .insert({ post_slug: slug, author_name: n, body: b })
      .select("id, author_name, body, created_at")
      .single();

    if (error) {
      console.error("Comment failed:", error);
      setStatus("error");
      return;
    }

    setComments((prev) =>
      prev.some((c) => c.id === data.id) ? prev : [...prev, data]
    );
    setBody("");
    setStatus("idle");
  };

  return (
    <section className="comments" aria-labelledby="comments-title">
      <h2 id="comments-title" className="comments-title">
        Comments{comments.length ? ` (${comments.length})` : ""}
      </h2>
      <hr className="blog-rule" aria-hidden="true" />

      {loading ? (
        <p className="opacity-70 mt-6">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="opacity-70 mt-6">
          No comments yet — be the first to break the silence.
        </p>
      ) : (
        <ul className="comments-list">
          {comments.map((c) => (
            <li key={c.id} className="comment blog-panel">
              <div className="comment-head">
                <span className="comment-author">{c.author_name}</span>
                <span className="blog-meta">{formatDate(c.created_at)}</span>
              </div>
              <p className="comment-body">{c.body}</p>
            </li>
          ))}
        </ul>
      )}

      <form className="comment-form blog-panel" onSubmit={submit}>
        <h3 className="comment-form-title">Leave a comment</h3>
        <input
          type="text"
          className="blog-input"
          placeholder="Your name"
          value={name}
          maxLength={80}
          onChange={(e) => setName(e.target.value)}
          aria-label="Your name"
          required
        />
        <textarea
          className="blog-input"
          placeholder="Share your thoughts…"
          rows={4}
          value={body}
          maxLength={2000}
          onChange={(e) => setBody(e.target.value)}
          aria-label="Your comment"
          required
        />
        {/* honeypot: hidden from humans, tempting to bots */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="comment-hp"
          onChange={(e) => {
            honeypot.current = e.target.value;
          }}
        />
        <div className="comment-form-actions">
          <button
            type="submit"
            className="blog-btn"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Posting…" : "Post comment"}
          </button>
          {status === "error" && (
            <span className="comment-error" role="alert">
              Please add your name and a comment.
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
