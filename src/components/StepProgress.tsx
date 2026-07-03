import React from "react";

type StepProgressProps = {
  current: number;
  total: number;
};

export const StepProgress: React.FC<StepProgressProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center text-[10px] font-bold text-violet-900/60 uppercase tracking-widest mb-2.5">
        <span>Progresso da Jornada</span>
        <span className="bg-white/60 px-2 py-0.5 rounded-full border border-violet-100/40 text-violet-750">
          Etapa {current} de {total}
        </span>
      </div>
      <div className="w-full h-2 bg-white/40 border border-violet-100/30 rounded-full overflow-hidden backdrop-blur-sm p-0.5">
        <div
          className="h-full bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
