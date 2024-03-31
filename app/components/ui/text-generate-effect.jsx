"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export const TextGenerateEffect = ({ words, className }) => {
  const controls = useAnimation();
  let wordsArray = words.split(" ");

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: { delay: i * 0.2 },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words]); // dépendances pour useEffect

  return (
    <div className={className}>
      <div className="mt-4">
        <div className="text-2xl leading-snug tracking-wide">
          {wordsArray.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              custom={i} // custom prop pour useAnimation
              initial={{ opacity: 0 }}
              animate={controls} // controls pour gérer l'animation
              className="inline-block mr-2" // inline-block et margin pour espacer les mots
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};
