import React from "react";
import { motion } from "framer-motion";

type FreeTextStepProps = {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export const FreeTextStep: React.FC<FreeTextStepProps> = ({
  value,
  onChange,
  onNext,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <h2 className="text-2xl md:text-3xl font-light text-violet-955 mb-2 tracking-tight">
        Agora conte com suas palavras o que está acontecendo.
      </h2>
      <p className="text-sm text-violet-900/60 mb-6 font-light">
        Esse espaço é importante. As opções anteriores ajudam a organizar o diagnóstico, mas o contexto real da sua operação pode revelar o melhor caminho. (Opcional)
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Exemplo: Temos um mailing bom, mas a taxa de atendimento caiu. Usamos telefonia atual, porém suspeitamos de bloqueios ou marcação como spam. Queremos testar outro modelo antes de escalar."
        className="w-full h-44 p-5 glass-input rounded-2xl outline-none text-violet-950 text-sm md:text-base leading-relaxed placeholder-violet-900/35 transition-all duration-300 focus:ring-1 focus:ring-violet-400 focus:shadow-md focus:shadow-violet-200/20"
      />

      <div className="flex justify-between items-center border-t border-violet-100/50 pt-6 mt-6">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-full text-sm font-medium text-violet-700 hover:bg-white/60 active:scale-95 transition-all duration-300"
        >
          Voltar
        </button>

        <button
          onClick={onNext}
          className="px-8 py-3 bg-violet-650 hover:bg-violet-750 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-md shadow-violet-600/10 hover:shadow-violet-600/20 active:scale-95"
          style={{ backgroundColor: '#8E75FF' }}
        >
          Continuar
        </button>
      </div>
    </motion.div>
  );
};
