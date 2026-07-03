import React from "react";
import { DiagnosticPayload } from "../lib/types";
import { motion } from "framer-motion";

type ResultScreenProps = {
  payload: DiagnosticPayload;
  onReset: () => void;
};

export const ResultScreen: React.FC<ResultScreenProps> = ({ payload, onReset }) => {
  const { leadIntelligence, diagnostic, contact } = payload;
  
  // Limitar sugestões a 5 na tela final (conforme regra)
  const displaySolutions = leadIntelligence.suggestedSolutions.slice(0, 5);

  // SVG parameters for circular score ring (similar to the meditation ring)
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (leadIntelligence.score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full text-left max-w-3xl mx-auto py-2"
    >
      <div className="border-b border-violet-100/50 pb-6 mb-8 text-center sm:text-left">
        <span className="px-4 py-1.5 bg-violet-600/10 text-violet-750 text-xs font-semibold rounded-full uppercase tracking-widest">
          Diagnóstico Concluído
        </span>
        <h1 className="text-3xl md:text-4xl font-light text-violet-955 mt-4 tracking-tight">
          Seu diagnóstico inicial está pronto.
        </h1>
        <p className="text-sm text-violet-900/60 mt-2 font-light">
          Análise consultiva personalizada para <span className="font-semibold text-violet-950">{contact.name}</span> ({contact.company})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card - SVG Circular Gauge */}
        <div className="md:col-span-1 glass-panel rounded-3xl p-6 text-center flex flex-col justify-center items-center relative overflow-hidden">
          <span className="text-[10px] font-bold text-violet-900/50 uppercase tracking-widest mb-4">
            Maturidade Estimada
          </span>
          
          {/* SVG Circular Progress Gauge */}
          <div className="relative w-36 h-36 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-violet-100/40 fill-transparent"
                strokeWidth={strokeWidth}
              />
              {/* Animated Progress circle */}
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-violet-500 fill-transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-extralight text-violet-950 tracking-tighter">
                {leadIntelligence.score}
              </span>
              <span className="text-[10px] font-semibold text-violet-400 tracking-wider">
                DE 100
              </span>
            </div>
          </div>

          <span className="px-3.5 py-1.5 bg-violet-600/10 text-violet-750 text-xs font-semibold rounded-full shadow-sm">
            Prioridade {leadIntelligence.priority} &bull; {leadIntelligence.temperature}
          </span>
        </div>

        {/* Diagnostico Inicial narrative */}
        <div className="md:col-span-2 glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-violet-900/50 uppercase tracking-widest mb-3">
              Cenário Identificado
            </h3>
            <p className="text-sm md:text-[15px] text-violet-950 font-light leading-relaxed">
              Pelo que você informou, sua operação parece estar em um cenário de melhoria de performance operacional. 
              Os principais pontos de atenção estão ligados a <span className="font-medium">{diagnostic.pains.join(", ").toLowerCase() || "otimização geral"}</span>, 
              com foco em atingir objetivos como <span className="font-medium text-violet-850">{diagnostic.goals.map(g => g.toLowerCase()).join(" e ")}</span>.
            </p>
          </div>

          <div className="border-t border-violet-100/50 pt-5 mt-6">
            <h4 className="text-xs font-bold text-violet-900/50 uppercase tracking-widest mb-2">
              Próximo Passo Recomendado
            </h4>
            <p className="text-xs text-violet-900/70 leading-relaxed font-light">
              Recomendamos uma conversa técnico-comercial para validar arquitetura atual, volume, integrações, indicadores e critérios de sucesso.
            </p>
          </div>
        </div>
      </div>

      {/* Cadeia de Diagnostico Expandida */}
      <div className="glass-panel rounded-3xl p-6 mb-8">
        <h3 className="text-xs font-bold text-violet-900/50 uppercase tracking-widest mb-4">
          Cadeia de Diagnóstico Operacional (Expandida)
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {diagnostic.operationTypes.map((op, i) => (
            <span key={op} className="bg-white/60 border border-violet-100/40 px-3.5 py-1.5 rounded-full text-xs font-medium text-violet-900">{op}</span>
          ))}
          {diagnostic.currentStructure.length > 0 && <span className="text-violet-300 font-light">&rarr;</span>}
          {diagnostic.currentStructure.map(st => (
            <span key={st} className="bg-white/60 border border-violet-100/40 px-3.5 py-1.5 rounded-full text-xs font-medium text-violet-900">{st}</span>
          ))}
          {diagnostic.pains.length > 0 && <span className="text-violet-300 font-light">&rarr;</span>}
          {diagnostic.pains.map(pn => (
            <span key={pn} className="bg-red-50/70 border border-red-100/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-red-700">{pn}</span>
          ))}
          {diagnostic.goals.length > 0 && <span className="text-violet-300 font-light">&rarr;</span>}
          {diagnostic.goals.map(gl => (
            <span key={gl} className="bg-blue-50/70 border border-blue-100/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-blue-700">{gl}</span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Caminhos prováveis */}
        <div className="glass-panel rounded-3xl p-6">
          <h3 className="text-xs font-bold text-violet-900/50 uppercase tracking-widest mb-4">
            Caminhos Prováveis (Soluções Comunikime)
          </h3>
          <ul className="space-y-3.5">
            {displaySolutions.map((sol, index) => (
              <li key={sol} className="flex items-center gap-3.5 text-sm text-violet-950 font-light">
                <span className="w-6 h-6 rounded-full bg-violet-600/10 flex items-center justify-center text-xs font-semibold text-violet-750 shrink-0">
                  {index + 1}
                </span>
                {sol}
              </li>
            ))}
          </ul>
        </div>

        {/* Resumo SDR (Interno) */}
        <div className="glass-panel rounded-3xl p-6 bg-white/20">
          <h3 className="text-xs font-bold text-violet-900/60 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
            Painel SDR (Inteligência Comercial)
          </h3>
          <p className="text-[10px] text-violet-900/55 mb-4 italic font-light">
            Resumo interno estruturado para o time comercial da Comunikime.
          </p>
          <div className="space-y-4">
            <div>
              <span className="text-[9px] font-bold text-violet-900/40 uppercase tracking-widest">Ação Recomendada:</span>
              <p className="text-xs text-violet-950 mt-1 font-light leading-relaxed">{leadIntelligence.sdrNextAction}</p>
            </div>
            <div>
              <span className="text-[9px] font-bold text-violet-900/40 uppercase tracking-widest">Perguntas Pendentes:</span>
              <ul className="list-disc list-inside text-xs text-violet-950 mt-1.5 space-y-1 font-light leading-relaxed">
                {leadIntelligence.pendingQuestions.slice(0, 3).map(q => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center border-t border-violet-100/50 pt-8">
        <a
          href="https://wa.me/5511999999999?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20sobre%20o%20diagn%C3%B3stico%20da%20minha%20opera%C3%A7%C3%A3o"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-4 text-white rounded-full transition-all duration-300 font-semibold text-base shadow-lg shadow-violet-600/15 hover:shadow-violet-600/25 hover:scale-[1.02] text-center w-full sm:w-auto"
          style={{ backgroundColor: '#8E75FF' }}
        >
          Agendar conversa com especialista
        </a>
        <button
          onClick={onReset}
          className="px-6 py-4 bg-white/50 hover:bg-white/80 border border-violet-100/60 hover:border-violet-200 text-violet-900 rounded-full transition-all duration-300 text-sm font-medium w-full sm:w-auto text-center hover:scale-[1.02]"
        >
          Refazer Diagnóstico
        </button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-[11px] text-violet-900/40 font-light">
          Nota: O payload estruturado final foi impresso no console do navegador para validação técnica da Fase 3.
        </p>
      </div>
    </motion.div>
  );
};
