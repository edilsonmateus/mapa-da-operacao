import React from "react";
import { motion } from "framer-motion";

type WelcomeScreenProps = {
  onStartWithCalm: () => void;
  onSkipToDiagnostic: () => void;
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartWithCalm,
  onSkipToDiagnostic,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-2xl mx-auto text-center px-4 py-8 relative">
      {/* Decorative ambient background shape */}
      <div className="absolute w-72 h-72 rounded-full bg-violet-200/40 blur-3xl -top-10 -left-10 pointer-events-none" />
      <div className="absolute w-72 h-72 rounded-full bg-pink-100/40 blur-3xl -bottom-10 -right-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-panel p-8 md:p-12 rounded-[2.5rem] w-full"
      >
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xs uppercase tracking-widest font-semibold px-4 py-1.5 bg-violet-600/10 text-violet-700 rounded-full inline-block mb-6"
        >
          Diagnóstico Inteligente
        </motion.span>

        <h1 className="text-3xl md:text-5xl font-light text-violet-950 mb-6 tracking-tight leading-[1.15]">
          Antes de falar de tecnologia, vamos entender sua operação.
        </h1>
        
        <p className="text-base md:text-lg text-violet-900/70 mb-10 leading-relaxed font-light">
          Sabemos que uma operação sob pressão pode envolver filas, baixa taxa de atendimento, sistemas desconectados, custos altos ou metas difíceis. Respire por alguns segundos. Vamos organizar esse cenário juntos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={onStartWithCalm}
            className="w-full sm:w-auto px-8 py-4 bg-violet-650 hover:bg-violet-700 text-white rounded-full transition-all duration-300 font-medium text-base shadow-lg shadow-violet-600/15 hover:shadow-violet-600/25 hover:scale-[1.02]"
            style={{ backgroundColor: '#8E75FF' }}
          >
            Começar com calma
          </button>
          <button
            onClick={onSkipToDiagnostic}
            className="w-full sm:w-auto px-8 py-4 bg-white/60 hover:bg-white/95 text-violet-950 border border-violet-100 hover:border-violet-200 rounded-full transition-all duration-300 font-medium text-base hover:scale-[1.02]"
          >
            Já sei o que preciso
          </button>
        </div>
      </motion.div>
    </div>
  );
};
