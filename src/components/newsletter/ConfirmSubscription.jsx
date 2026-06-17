import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import SEO from "../utility/SEO";

export default function ConfirmSubscription() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState("loading"); // loading | success | invalid | error

  useEffect(() => {
    let active = true;
    if (!token) {
      setStatus("invalid");
      return;
    }
    (async () => {
      const { data, error } = await supabase.rpc("confirm_subscription", { token });
      if (!active) return;
      if (error) setStatus("error");
      else setStatus(data ? "success" : "invalid");
    })();
    return () => {
      active = false;
    };
  }, [token]);

  const content = {
    loading: {
      title: "Confirming…",
      body: "Hold tight while we verify your link.",
    },
    success: {
      title: "You're in",
      body: "Your subscription to The Bloodborne Chronicles is confirmed. Watch your inbox for dispatches from editor E. Nocturne.",
    },
    invalid: {
      title: "Link expired or invalid",
      body: "This confirmation link didn't match anything. It may have already been used — try subscribing again from the site.",
    },
    error: {
      title: "Something went wrong",
      body: "We couldn't confirm your subscription right now. Please try the link again in a moment.",
    },
  }[status];

  return (
    <section className="max-w-xl mx-auto px-4 py-20 text-center">
      <SEO title="Confirm your subscription — Melissa Michaels" />
      <div className="blog-panel" style={{ padding: "2.5rem 2rem" }}>
        <p className="blog-meta mb-2">The Bloodborne Chronicles</p>
        <h1 className="text-3xl mb-1">{content.title}</h1>
        <hr className="blog-rule mx-auto" aria-hidden="true" style={{ margin: "0.5rem auto 1.25rem" }} />
        <p className="opacity-85 leading-relaxed mb-8">{content.body}</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/blog" className="blog-btn px-6 py-3 rounded-lg">
            Read the blog
          </Link>
          <Link to="/" className="blog-btn px-6 py-3 rounded-lg">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
