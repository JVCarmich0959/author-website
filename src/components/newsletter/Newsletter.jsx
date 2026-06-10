import "./newsletter.css";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { supabase } from "../../lib/supabase";

const listVariant = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

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
      <div className="cSection">
        <motion.form
          ref={form}
          variants={listVariant}
          animate={isInView ? "animate" : "initial"}
          onSubmit={sendEmail}
        >
          <motion.h1 variants={listVariant} className="cTitle">
            Let's keep in touch
          </motion.h1>
          <motion.div variants={listVariant} className="formItem">
            <label>Name</label>
            <input type="text" name="user_username" placeholder="John Doe" />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              placeholder="john@gmail.com"
              required
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label>Message</label>
            <textarea
              rows={10}
              name="user_message"
              placeholder="Write your message..."
              required
            ></textarea>
          </motion.div>
          <motion.button variants={listVariant} className="formButton">
            Send
          </motion.button>
          {success && <span>Your message has been sent!</span>}
          {error && <span>Something went wrong!</span>}
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
