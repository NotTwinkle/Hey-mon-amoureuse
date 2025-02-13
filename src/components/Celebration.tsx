import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { FloatingElements } from "./floatinghearts";

const celebrationGifs = [
  { src: "https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif" }, // Hearts floating
  {
    src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG13czYxcndwaXM2bnBlNm9zN3p3bzVuOGViamIyc2xyYnA3emtncCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lTQF0ODLLjhza/giphy.gif",
  }, // Love bears
  { src: "https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif" }, // Valentine hearts
  {
    src: "https://media.giphy.com/media/D4hiJ8Oo1xOwUDOzyJ/giphy.gif?cid=790b7611tmws61rwpis6npe6os7zwo5n8ebjb2slrbp7zkgp&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  }, // Heart balloons
  { src: "https://media.giphy.com/media/3o7TKoWXm3okO1kgHC/giphy.gif" }, // Love animation
  { src: "https://media.giphy.com/media/l0HU2sYgCZh3HiKnS/giphy.gif" }, // Heart explosion
];

export const Celebration = () => {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="text-center px-4"
    >
      <h1 className="text-4xl md:text-6xl mb-8 text-red-500 font-serif">
        Merci d’être ma Valentine! 💖
      </h1>
      <FloatingElements />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {celebrationGifs.map((gif, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2 }}
            className="aspect-square bg-valentine-pink rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={gif.src}
              alt="Valentine celebration"
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
