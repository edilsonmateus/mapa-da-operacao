import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type BreathingScreenProps = {
  onComplete: () => void;
};

const BREATHING_PHASES = [
  { text: "Inspire", duration: 3000, isScalingUp: true },
  { text: "Organize o cenário", duration: 3000, isScalingUp: true },
  { text: "Expire", duration: 3000, isScalingUp: false },
  { text: "Vamos começar", duration: 2500, isScalingUp: false }
];

export const BreathingScreen: React.FC<BreathingScreenProps> = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPhase < BREATHING_PHASES.length - 1) {
        setCurrentPhase(prev => prev + 1);
      } else {
        onComplete();
      }
    }, BREATHING_PHASES[currentPhase].duration);

    return () => clearTimeout(timer);
  }, [currentPhase, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-md mx-auto text-center px-4 py-8 relative">
      {/* Dynamic breathing orb with concentric shadows */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        <motion.div
          animate={{
            scale: BREATHING_PHASES[currentPhase].isScalingUp ? [1, 1.2] : [1.2, 0.95],
          }}
          transition={{
            duration: BREATHING_PHASES[currentPhase].duration / 1000,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-200/50 via-indigo-100/50 to-pink-100/50 backdrop-blur-md border border-white/80 shadow-xl shadow-violet-250/20"
        />

        <motion.div
          animate={{
            scale: BREATHING_PHASES[currentPhase].isScalingUp ? [1, 1.1] : [1.1, 1.0],
          }}
          transition={{
            duration: BREATHING_PHASES[currentPhase].duration / 1000,
            ease: "easeInOut",
          }}
          className="absolute w-48 h-48 rounded-full bg-white/70 backdrop-blur-lg flex items-center justify-center shadow-inner"
        />

        {/* Text centered inside orb with fade transition */}
        <div className="z-10 px-4">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPhase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-light text-violet-950 tracking-wide block"
            >
              {BREATHING_PHASES[currentPhase].text}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-violet-800/60 mb-10 font-light"
      >
        Respire fundo para organizar o pensamento...
      </motion.p>

      <button
        onClick={onComplete}
        className="px-8 py-3 bg-white/50 hover:bg-white/80 border border-violet-100/70 hover:border-violet-200 text-violet-900 rounded-full text-sm font-medium transition-all shadow-sm"
      >
        Pular e começar
      </button>
    </div>
  );
};
