import React from "react";
import { motion } from "framer-motion";

type OptionCardProps = {
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
};

export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  description,
  selected,
  onClick,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className={`p-5 rounded-2xl transition-all duration-300 cursor-pointer select-none text-left flex flex-col justify-between h-full ${
        selected ? "glass-panel-active" : "glass-panel"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="font-semibold text-violet-950 text-sm md:text-[15px] tracking-tight leading-snug">
            {label}
          </span>
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center border text-[10px] shrink-0 transition-all duration-300 ${
              selected
                ? "bg-violet-600 border-violet-600 text-white shadow-md shadow-violet-600/20"
                : "border-violet-200 bg-white/40"
            }`}
          >
            {selected && "✓"}
          </div>
        </div>
        {description && (
          <p className="mt-3 text-xs text-violet-900/60 leading-relaxed font-light">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};
