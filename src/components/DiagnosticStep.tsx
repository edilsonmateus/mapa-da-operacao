import React from "react";
import { Step } from "../lib/diagnostic-data";
import { OptionCard } from "./OptionCard";
import { motion } from "framer-motion";

type DiagnosticStepProps = {
  step: Step;
  selectedValues: string[];
  onChange: (values: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
};

export const DiagnosticStep: React.FC<DiagnosticStepProps> = ({
  step,
  selectedValues,
  onChange,
  onNext,
  onBack,
  isFirst,
}) => {
  const handleToggle = (optionId: string) => {
    if (selectedValues.includes(optionId)) {
      onChange(selectedValues.filter(val => val !== optionId));
    } else {
      onChange([...selectedValues, optionId]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <h2 className="text-2xl md:text-3xl font-light text-violet-955 mb-6 tracking-tight">
        {step.title}
      </h2>

      {step.options && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {step.options.map(option => (
            <motion.div key={option.id} variants={itemVariants} className="h-full">
              <OptionCard
                label={option.label}
                description={option.description}
                selected={selectedValues.includes(option.id)}
                onClick={() => handleToggle(option.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="flex justify-between items-center border-t border-violet-100/50 pt-6 mt-4">
        <button
          onClick={onBack}
          disabled={isFirst}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
            isFirst
              ? "text-violet-300 cursor-not-allowed"
              : "text-violet-700 hover:bg-white/60 active:scale-95"
          }`}
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
