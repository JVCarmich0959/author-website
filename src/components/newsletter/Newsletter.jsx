import "./newsletter.css";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { supabase } from "../../lib/supabase";

const listVariant = {
  initial: { x: 100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [submitting, setSubmitting] = useState(false);

  const [already, setAlready] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!value) {
      setStatus("error");
      return;
    }
    setSubmitting(true);
    // edge function saves the subscriber AND sends the confirmation email
    const { data, error } = await supabase.functions.invoke("subscribe", {
      body: { email: value, source: "contact-section" },
    });
    setSubmitting(false);
    if (error || data?.error) {
      console.error("Subscribe failed:", error || data?.error);
      setStatus("error");
    } else {
      setAlready(data?.status === "already_confirmed");
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <div className="cNewsletter">
      <h3 className="cNewsletter-title">Join The Bloodborne Chronicles</h3>
      <p className="cNewsletter-copy">
        Dispatches from editor E. Nocturne — story clues, release news, and the
        occasional giveaway. No spam, unsubscribe anytime.
      </p>
      {status === "success" ? (
        <p className="cNewsletter-success" role="status">
          {already
            ? "You're already confirmed — watch your inbox for the next dispatch."
            : "Almost there — check your inbox and click the confirmation link to finish joining."}
        </p>
      ) : (
        <form className="cNewsletter-form" onSubmit={subscribe}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            required
          />
          <button type="submit" disabled={submitting}>
            {submitting ? "Joining…" : "Count me in"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="cNewsletter-error" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const ref = useRef();
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const data = new FormData(form.current);
    const email = String(data.get("user_email") || "").trim().toLowerCase();
    const message = String(data.get("user_message") || "").trim();
    const name = String(data.get("user_username") || "").trim();

    if (!email || !message) {
      setError(true);
      setSuccess(false);
      return;
    }

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({ name: name || null, email, message });

    if (insertError) {
      console.error("Contact message failed:", insertError);
      setError(true);
      setSuccess(false);
    } else {
      setSuccess(true);
      setError(false);
      form.current.reset();
    }
  };

  const isInView = useInView(ref, { margin: "-200px" });

  return (
    <div className="contact" ref={ref}>
      <div className="contact-intro">
        <p className="contact-eyebrow">Stay in the signal</p>
        <h2 className="contact-heading">Let's keep in touch</h2>
        <p className="contact-lead">
          Questions, event invitations, or just want to say the books found you?
          Drop a line below, or join the reader list for new releases from the
          Bloodborne Chronicles.
        </p>
      </div>

      <div className="contact-grid">
        <NewsletterSignup />

        <div className="cSection">
          {success ? (
            <div className="contact-success" role="status">
              <div className="contact-success-icon" aria-hidden="true">
                ✓
              </div>
              <h3>Message sent</h3>
              <p>
                Thank you — Melissa reads every note personally and will reply by
                email. (No account or login needed.)
              </p>
            </div>
          ) : (
            <motion.form
              ref={form}
              variants={listVariant}
              animate={isInView ? "animate" : "initial"}
              onSubmit={sendEmail}
            >
              <motion.div variants={listVariant} className="formItem">
                <label htmlFor="user_username">Name</label>
                <input
                  id="user_username"
                  type="text"
                  name="user_username"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </motion.div>
              <motion.div variants={listVariant} className="formItem">
                <label htmlFor="user_email">Email</label>
                <input
                  id="user_email"
                  type="email"
                  name="user_email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </motion.div>
              <motion.div variants={listVariant} className="formItem">
                <label htmlFor="user_message">Message</label>
                <textarea
                  id="user_message"
                  rows={8}
                  name="user_message"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </motion.div>
              <motion.button variants={listVariant} className="formButton">
                Send message
              </motion.button>
              {error && (
                <span className="contact-error" role="alert">
                  Please add your email and a message, then try again.
                </span>
              )}
            </motion.form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
