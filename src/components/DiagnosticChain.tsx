import React from "react";
import { DIAGNOSTIC_STEPS } from "../lib/diagnostic-data";
import { motion, AnimatePresence } from "framer-motion";

type DiagnosticChainProps = {
  selectedAnswers: {
    operationTypes: string[];
    currentStructure: string[];
    pains: string[];
    goals: string[];
    initialScale: string[];
    dailyVolume: string[];
    integrations: string[];
  };
  onRemoveItem: (field: string, item: string) => void;
};

export const DiagnosticChain: React.FC<DiagnosticChainProps> = ({
  selectedAnswers,
  onRemoveItem,
}) => {
  // Collect all selections in order of steps
  const nodes: { field: string; val: string; label: string }[] = [];

  DIAGNOSTIC_STEPS.forEach(step => {
    const fieldName = step.field as keyof typeof selectedAnswers;
    const selections = selectedAnswers[fieldName] || [];
    selections.forEach(sel => {
      const option = step.options?.find(opt => opt.id === sel);
      nodes.push({
        field: step.field,
        val: sel,
        label: option ? option.label : sel,
      });
    });
  });

  const count = nodes.length;
  let statusMessage = "Seu diagnóstico ainda está em branco.";
  if (count === 1) {
    statusMessage = "Primeiro sinal identificado.";
  } else if (count > 1) {
    statusMessage = "Sua operação está ganhando forma.";
  }

  return (
    <div className="w-full glass-panel rounded-3xl p-5 mb-8 transition-all duration-300">
      <div className="flex items-center justify-between text-[11px] font-semibold text-violet-900/60 uppercase tracking-widest mb-4">
        <span>Cadeia de Diagnóstico</span>
        <span className="italic normal-case font-light text-violet-850/70">{statusMessage}</span>
      </div>

      {count === 0 ? (
        <div className="text-sm text-violet-900/40 py-1.5 italic font-light">
          Selecione as opções abaixo para começar a formar seu circuito de diagnóstico.
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
          <AnimatePresence>
            {nodes.map((node, idx) => (
              <React.Fragment key={`${node.field}-${node.val}`}>
                {idx > 0 && (
                  <span className="text-violet-300 font-light px-0.5">&rarr;</span>
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: 10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => onRemoveItem(node.field, node.val)}
                  className="flex items-center gap-1.5 bg-white/70 hover:bg-red-50/80 border border-violet-100 hover:border-red-150 px-3.5 py-1.5 rounded-full text-xs font-medium text-violet-955 hover:text-red-700 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 group"
                  title="Clique para remover"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover:bg-red-400 transition-colors" />
                  <span>{node.label}</span>
                  <span className="text-violet-400 group-hover:text-red-500 font-bold ml-0.5 text-sm leading-none">
                    &times;
                  </span>
                </motion.div>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
