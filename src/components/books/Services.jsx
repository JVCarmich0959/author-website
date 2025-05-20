// src/components/books/Services.jsx
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import BookModelContainer from "./computer/BookModelContainer";
import "./services.css";

const textVariants = {
  initial: { x: -100, y: -100, opacity: 0 },
  animate:   { x: 0,    y: 0,    opacity: 1, transition: { duration: 1 } },
};

const listVariants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 1, staggerChildren: 0.2 } },
};

const services = [
  {
    id:       1,
    icon:     "/signed-book-icon.svg",
    title:    "Signed Copies",
    desc:     "Order a personalized, signed edition of my latest novel.",
    linkText: "Shop Now",
    link:     "/shop",
  },
  {
    id:       2,
    icon:     "/patreon-icon.svg",
    title:    "Patreon Exclusives",
    desc:     "Gain early access to chapters, bonus tales & world-building secrets.",
    linkText: "Join Patreon",
    link:     "https://patreon.com/melissamichaels",
  },
  {
    id:       3,
    icon:     "/newsletter-icon.svg",
    title:    "Newsletter Perks",
    desc:     "Behind-the-scenes notes & micro-stories sent straight to your inbox.",
    linkText: "Subscribe",
    link:     "#contact",
  },
];

export default function Services() {
  const [current, setCurrent] = useState(1);
  const ref = useRef();
  const inView = useInView(ref, { margin: "-200px" });

  return (
    <section className="services" ref={ref}>
      {/* LEFT COLUMN */}
      <div className="sSection left">
        <motion.h1
          className="sTitle"
          variants={textVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          Arcane Offerings
          <br/>
          of the Bloodborne Realm
        </motion.h1>
        <motion.p
          className="sSubtitle"
          variants={textVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          Choose your path and unlock exclusive content, signed copies, and more.
        </motion.p>

        <motion.div
          className="serviceList"
          variants={listVariants}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {services.map((s) => (
            <motion.div
              key={s.id}
              className={`service ${current === s.id ? "active" : ""}`}
              variants={listVariants}
              onClick={() => setCurrent(s.id)}
            >
              <div className="serviceIcon">
                <img src={s.icon} alt={s.title} />
              </div>
              <div className="serviceInfo">
                <h2>{s.title}</h2>
                <p>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="sSection right">
        {current === 1 && (
          <motion.div
            className="serviceDetail"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <BookModelContainer />
            <Link to={services[0].link} className="detailLink">
              {services[0].linkText}
            </Link>
          </motion.div>
        )}

        {current === 2 && (
          <motion.div
            className="serviceDetail"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a
              href={services[1].link}
              target="_blank"
              rel="noreferrer"
              className="detailLink"
            >
              {services[1].linkText}
            </a>
          </motion.div>
        )}

        {current === 3 && (
          <motion.div
            className="serviceDetail"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <a href={services[2].link} className="detailLink">
              {services[2].linkText}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
