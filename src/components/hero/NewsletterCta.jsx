// src/components/hero/NewsLetterCta.jsx
import { motion } from "motion/react";
import "./hero.css";

const slideIn = {
    initial: { x: 200, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 2 } },
};


export default function NewsletterCta({ href = "#contact" }) {
    return (
        <motion.a
            href={href}
            variants={slideIn}
            initial="initial"
            animate="animate"
            className="contactLink"
        >
        <motion.div
            className="contactButton"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 2, ease: "linear" }}
        >
                <svg viewBox="0 0 200 200" width="150" height="150">
                    <circle cx="100" cy="100" r="90" fill="var(--blood-red)" />
                    <path
                        id="innerCirclePath"
                        fill="none"
                        d="M100,100 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0"
                    />
                    <text className="circleText">
                        <textPath href="#innerCirclePath">
                            JOIN THE BLOODBORNE BULLETIN
                        </textPath>
                    </text>
                </svg>
                <div className="arrow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="50"
                        height="50"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                    >
                        <line x1="6" y1="18" x2="18" y2="6" />
                        <polyline points="9 6 18 6 18 15" />
                    </svg>
                </div>
            </motion.div>
        </motion.a>
    );
}
