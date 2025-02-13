import React, { useState, useEffect } from "react";
import { FloatingElements } from "./floatinghearts";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Celebration } from "./Celebration"; // Import the celebration component

interface EnvelopeProps {
  // onResponse can be added if needed
  onClick: () => void;
}

const Envelope: React.FC<EnvelopeProps> = () => {
  const [isFlapped, setIsFlapped] = useState(false);
  const [audio] = useState(new Audio("/photo/music.mp3"));
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(-1); // Start with -1 for initial delay
  const [showProposal, setShowProposal] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false); // New state for celebration

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audio.play();
        audio.loop = true;
      } catch (err) {
        console.log("Audio autoplay was prevented by browser");
      }
    };
    playAudio();

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    if (isFlapped) {
      const interval = setInterval(() => {
        setCurrentPhotoIndex((prevIndex) => {
          if (prevIndex === 4) {
            clearInterval(interval); // Stop the slideshow at the last item
            return prevIndex;
          }
          return prevIndex + 1;
        });
      }, 2000);

      // Initial delay before starting the slideshow
      setTimeout(() => {
        setCurrentPhotoIndex(0);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isFlapped]);

  // When the envelope is clicked, the envelope moves down while the paper moves up
  const handleEnvelopeClick = () => {
    setIsFlapped(true);
  };

  const handleNoHover = () => {
    setNoButtonPosition({
      x: Math.random() * 200 - 100,
      y: Math.random() * 200 - 100,
    });
  };

  const handleYesClick = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setShowHeart(true);
    }, 2000);

    setTimeout(() => {
      setIsFlapped(false);
      setShowCelebration(true); // Show celebration after closing envelope
    }, 1000);
  };

  const items = [
    { type: "photo", id: 1, src: "/photo/1.jpeg" },
    { type: "photo", id: 2, src: "/photo/2.jpeg" },
    { type: "photo", id: 3, src: "/photo/3.jpeg" },
    { type: "photo", id: 4, src: "/photo/4.jpeg" },
    { type: "letter" },
  ];

  // Render Celebration if showCelebration is true
  if (showCelebration) {
    return <Celebration />;
  }

  return (
    <div className="container h-screen grid place-items-center">
      <FloatingElements />
      <motion.div
        className={`envelope-wrapper bg-[#f5edd1] shadow-lg relative ${
          isFlapped ? "flap" : ""
        }`}
        onClick={!isFlapped ? handleEnvelopeClick : undefined}
        style={{ transformOrigin: "center", scale: 1, zIndex: 10 }}
        animate={isFlapped ? { y: 150, opacity: showHeart ? 0 : 1 } : { y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="envelope relative w-[300px] h-[230px]">
          <motion.div
            className="letter absolute right-[10%] bottom-0 w-[80%] h-[90%] bg-white text-center shadow-md p-5"
            initial={{
              y: 0,
              opacity: 1,
              height: 220,
            }}
            animate={
              isFlapped
                ? {
                    y: -150, // paper pops upward
                    opacity: 1,
                    height: showProposal ? 210 : 210,
                  }
                : {}
            }
            transition={{ duration: 0.8 }}
          >
            {isFlapped && (
              <div
                style={{
                  transform: "scale(0.8)",
                  transformOrigin: "top center",
                  marginTop: "-10px",
                }}
                className="text font-sans text-gray-700 text-left text-sm"
              >
                <motion.div
                  className="letter-content relative w-full h-[200px] mb-4"
                  initial="hidden"
                  animate="visible"
                >
                  {!showProposal && (
                    <motion.div
                      key="love-letter"
                      className="letter-content relative"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      style={{ marginTop: "30px" }}
                    >
                      <p
                        className="romantic-text text-l text-gray-700 leading-relaxed mb-8 w-full"
                        style={{
                          textAlign: "justify",
                          whiteSpace: "normal",
                          marginTop: "-30px",
                        }}
                      >
                        Heyy ma Laurence
                        <br />
                        <br />
                        La fameuse Saint-Valentin arrive et je veux te faire
                        plaisir. Ça fait un moment que J’ai pas vu ton jolie
                        visage ça va me rendre heureux.
                      </p>
                      <button
                        onClick={() => setShowProposal(true)}
                        className="rounded-full w-10 h-10 bg-red-500 text-white flex items-center justify-center mx-auto"
                        aria-label="Skip letter and go to proposal"
                        style={{ marginTop: "-20px" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </motion.div>
                  )}

                  {/* Proposal content with buttons appears last */}
                  {showProposal && (
                    <motion.div
                      key="proposal"
                      className="letter-content relative"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8 }}
                      style={{ marginTop: "40px" }}
                    >
                      <h1 className="heading-text text-2xl font-bold text-romantic-red mb-10 text-center">
                        Veux-tu être ma Valentine?
                      </h1>
                      <div
                        className="flex justify-center gap-6"
                        style={{ marginTop: "-10px" }}
                      >
                        <button
                          onClick={handleYesClick}
                          className="px-3 py-1 bg-romantic-red text-white rounded-lg romantic-text text-xl hover:bg-romantic-red/90 transition-colors"
                        >
                          Yes
                        </button>
                        <motion.button
                          animate={noButtonPosition}
                          onHoverStart={handleNoHover}
                          className="px-3 py-1 bg-gray-300 text-gray-500 rounded-lg romantic-text text-xl hover:bg-gray-400"
                        >
                          No
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                  {showHeart && (
                    <motion.div
                      className="fixed inset-0 flex items-center justify-center bg-white z-100"
                      initial={{ scale: 0 }}
                      animate={{ scale: 50 }}
                      transition={{ duration: 1 }}
                    >
                      <div className="w-16 h-16 bg-red-500 rounded-full relative">
                        <div className="absolute top-0 left-0 w-16 h-16 bg-red-500 rounded-full transform rotate-45"></div>
                        <div className="absolute top-0 left-0 w-16 h-16 bg-red-500 rounded-full transform -rotate-45"></div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
        <motion.div
          className="heart absolute"
          animate={{
            rotate: isFlapped ? 90 : 45,
            scale: isFlapped ? 1.2 : 1,
          }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
      </motion.div>

      <style>{`
        .envelope-wrapper > .envelope::before {
          content: "";
          position: absolute;
          top: 0;
          z-index: 2;
          border-top: 130px solid #ecdeb8;
          border-right: 150px solid transparent;
          border-left: 150px solid transparent;
          transform-origin: top;
          transition: all 0.5s ease-in-out 0.7s;
        }

        .envelope-wrapper > .envelope::after {
          content: "";
          position: absolute;
          z-index: 2;
          width: 0px;
          height: 0px;
          border-top: 130px solid transparent;
          border-right: 150px solid #e6cfa7;
          border-bottom: 100px solid #e6cfa7;
          border-left: 150px solid #e6cfa7;
        }

        .heart {
          width: 50px;
          height: 50px;
          background: rgb(255, 0, 0);
          position: absolute;
          top: 250px;
          right: 130px;
          transform: translate(-50px, 0) rotate(45deg);
          transition: transform 0.5s ease-in-out 1s;
          z-index: 4;
        }

        .heart:before, 
        .heart:after {
          content: "";
          position: absolute;
          width: 50px;
          height: 50px;
          background-color: rgb(255, 0, 0);
          border-radius: 50%;
        }

        .heart:before {
          top: -25px;
          left: 0;
        }

        .heart:after {
          left: 25px;
          top: 0;
        }

        .flap > .envelope:before {
          transform: rotateX(180deg);
          z-index: 0;
        }

        .flap > .envelope > .letter {
          bottom: 100px;
          transition-delay: 1s;
        }

        .envelope > .letter {
          transition: all 1s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Envelope;
