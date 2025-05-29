import "./newsletter.css";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

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

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.VITE_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
        },
        (error) => {
          console.log(error);
          setError(true);
          setSuccess(false);
        }
      );
  };

  const isInView = useInView(ref, { margin: "-200px" });

  return (
    <div className="contact container mx-auto py-12" ref={ref}>
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
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              name="user_username"
              placeholder="John Doe"
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="user_email"
              placeholder="john@gmail.com"
            />
          </motion.div>
          <motion.div variants={listVariant} className="formItem">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={10}
              name="user_message"
              placeholder="Write your message..."
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
