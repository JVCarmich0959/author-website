import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { supabase } from "../../lib/supabase";
import "./hero.css";

export default function NewsletterModal({ href = "#contact" }) {
  const [visible, setVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const formRef = useRef();

  // Scroll listener triggers when 60% down the page
  useEffect(() => {
    const dismissedAt = parseInt(localStorage.getItem("newsletterDismissed"), 10);
    const subscribed = localStorage.getItem("newsletterSubscribed") === "true";

    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    if (subscribed || (dismissedAt && Date.now() - dismissedAt < sevenDays)) return;

    const handleScroll = () => {
      const triggerPoint = window.innerHeight * 0.6;
      if (window.scrollY > triggerPoint && !visible) {
        setVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visible]);

  const handleSignupClick = (e) => {
    e.preventDefault();
    setIsExpanded(true);
  };

  const handleSubmit = async () => {
    if (!email || !name) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const { error } = await supabase
      .from('subscribers')
      .insert({
        email: email.trim().toLowerCase(),
        name: name.trim(),
        source: 'popup',
      });

    // Postgres unique_violation -> already subscribed. Treat as success.
    const alreadySubscribed = error?.code === '23505';

    if (!error || alreadySubscribed) {
      setSubmitStatus('success');
      localStorage.setItem("newsletterSubscribed", "true");
    } else {
      console.error('Newsletter signup failed:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setIsExpanded(false);
    setEmail('');
    setName('');
    setSubmitStatus(null);
  };

  const handleClose = () => {
    localStorage.setItem("newsletterDismissed", Date.now());
    setVisible(false);
    resetForm();
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className={`newsletter-popup ${isExpanded ? 'newsletter-popup-expanded' : ''}`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 100 }}
            role="dialog"
            aria-modal="true"
            aria-label="Newsletter sign-up"
          >
            <div className="newsletter-content">
              {!isExpanded ? (
                <>
                  <p>📜 Join the Bloodborne Bulletin</p>
                  <button
                    onClick={handleSignupClick}
                    className="newsletter-button"
                  >
                    Count me in
                  </button>
                  <button
                    onClick={handleClose}
                    aria-label="Dismiss newsletter prompt"
                    className="newsletter-close"
                  >
                    ×
                  </button>
                </>
              ) : (
                <div className="newsletter-form-container">
                  {submitStatus === 'success' ? (
                    <div className="newsletter-success">
                      <div className="success-icon">✓</div>
                      <h3>Subscription Confirmed</h3>
                      <p>You've successfully joined the newsletter. Thank you!</p>
                    </div>
                  ) : submitStatus === 'error' ? (
                    <div className="newsletter-error">
                      <div className="error-icon">⚠</div>
                      <h3>Submission Failed</h3>
                      <p>There was an error processing your request. Please try again.</p>
                      <button
                        onClick={() => setSubmitStatus(null)}
                        className="newsletter-retry-button"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <div className="newsletter-form" ref={formRef}>
                      <h3>Subscribe to Our Newsletter</h3>
                      <p className="form-description">Get updates, news, and exclusive content delivered to your inbox.</p>

                      <div className="form-field">
                        <label htmlFor="subscriber-name">Name</label>
                        <input
                          type="text"
                          id="subscriber-name"
                          name="user_name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="newsletter-input"
                          required
                        />
                      </div>

                      <div className="form-field">
                        <label htmlFor="subscriber-email">Email Address</label>
                        <input
                          type="email"
                          id="subscriber-email"
                          name="user_email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="newsletter-input"
                          required
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          onClick={() => setIsExpanded(false)}
                          className="newsletter-back-button"
                          disabled={isSubmitting}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !email || !name}
                          className="newsletter-submit-button"
                        >
                          {isSubmitting ? 'Submitting...' : 'Subscribe'}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleClose}
                    aria-label="Close newsletter form"
                    className="newsletter-close"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {import.meta.env.DEV && (
        <div style={{ position: 'fixed', bottom: '10px', left: '10px', zIndex: 9999 }}>
          <button
            onClick={() => {
              localStorage.removeItem("newsletterDismissed");
              localStorage.removeItem("newsletterSubscribed");
              alert("Newsletter state reset. Scroll again to trigger popup.");
            }}
            style={{
              background: "#1B0C00",
              color: "#CDB48B",
              border: "1px solid #8C5431",
              borderRadius: "4px",
              padding: "6px 12px",
              fontSize: "12px",
              cursor: "pointer",
              opacity: 0.6
            }}
          >
            🧪 Reset Newsletter State
          </button>
        </div>
      )}
    </>
  );
}
