import React, { useState } from "react";
import { DiagnosticPayload } from "../lib/types";
import { motion } from "framer-motion";

type ContactData = DiagnosticPayload["contact"];

type ContactStepProps = {
  value: ContactData;
  onChange: (value: ContactData) => void;
  onNext: () => void;
  onBack: () => void;
  isSubmitting: boolean;
};

export const ContactStep: React.FC<ContactStepProps> = ({
  value,
  onChange,
  onNext,
  onBack,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!value.name?.trim()) newErrors.name = "Nome é obrigatório";
    if (!value.company?.trim()) newErrors.company = "Empresa é obrigatória";
    
    if (!value.email?.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!value.consent) {
      newErrors.consent = "Você deve concordar com o envio dos dados";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof ContactData, val: any) => {
    onChange({
      ...value,
      [field]: val,
    });
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="w-full text-left"
    >
      <form onSubmit={handleSubmit} className="w-full">
        <h2 className="text-2xl md:text-3xl font-light text-violet-955 mb-2 tracking-tight">
          Para entregar seu diagnóstico inicial, precisamos saber com quem estamos falando.
        </h2>
        <p className="text-sm text-violet-900/60 mb-8 font-light">
          Seus dados estão seguros e serão utilizados para personalizar a análise da sua operação.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          <div>
            <label className="block text-[10px] font-bold text-violet-900/50 uppercase tracking-widest mb-2">
              Nome Completo *
            </label>
            <input
              type="text"
              value={value.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="w-full p-4 glass-input rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-violet-400 text-violet-950 placeholder-violet-900/30"
              placeholder="Seu nome"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-violet-900/50 uppercase tracking-widest mb-2">
              Empresa *
            </label>
            <input
              type="text"
              value={value.company || ""}
              onChange={(e) => handleFieldChange("company", e.target.value)}
              className="w-full p-4 glass-input rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-violet-400 text-violet-950 placeholder-violet-900/30"
              placeholder="Nome da empresa"
            />
            {errors.company && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.company}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-violet-900/50 uppercase tracking-widest mb-2">
              E-mail Corporativo *
            </label>
            <input
              type="email"
              value={value.email || ""}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className="w-full p-4 glass-input rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-violet-400 text-violet-950 placeholder-violet-900/30"
              placeholder="seuemail@empresa.com"
            />
            {errors.email && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-[10px] font-bold text-violet-900/50 uppercase tracking-widest mb-2">
              Cargo / Função
            </label>
            <input
              type="text"
              value={value.role || ""}
              onChange={(e) => handleFieldChange("role", e.target.value)}
              className="w-full p-4 glass-input rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-violet-400 text-violet-950 placeholder-violet-900/30"
              placeholder="Ex: Diretor de Operações"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-violet-900/50 uppercase tracking-widest mb-2">
              WhatsApp / Celular
            </label>
            <input
              type="text"
              value={value.whatsapp || ""}
              onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
              className="w-full p-4 glass-input rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-violet-400 text-violet-950 placeholder-violet-900/30"
              placeholder="(11) 99999-9999"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-violet-900/50 uppercase tracking-widest mb-2">
              Site da Empresa
            </label>
            <input
              type="text"
              value={value.website || ""}
              onChange={(e) => handleFieldChange("website", e.target.value)}
              className="w-full p-4 glass-input rounded-xl text-sm outline-none transition-all focus:ring-1 focus:ring-violet-400 text-violet-950 placeholder-violet-900/30"
              placeholder="empresa.com.br"
            />
          </div>
        </div>

        <div className="mb-8">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value.consent || false}
              onChange={(e) => handleFieldChange("consent", e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-violet-200 text-violet-600 focus:ring-violet-400 focus:ring-offset-0 bg-white/40"
            />
            <span className="text-xs text-violet-900/60 leading-normal font-light">
              Concordo em enviar minhas informações para que a Comunikime analise meu cenário e entre em contato.
            </span>
          </label>
          {errors.consent && <p className="text-xs text-red-500 mt-1.5 font-medium">{errors.consent}</p>}
        </div>

        <div className="flex justify-between items-center border-t border-violet-100/50 pt-6">
          <button
            type="button"
            onClick={onBack}
            disabled={isSubmitting}
            className="px-6 py-3 rounded-full text-sm font-medium text-violet-700 hover:bg-white/60 active:scale-95 transition-all duration-300 disabled:opacity-50"
          >
            Voltar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-violet-650 hover:bg-violet-750 disabled:bg-violet-300 text-white rounded-full text-sm font-medium transition-all duration-300 shadow-md shadow-violet-600/10 hover:shadow-violet-600/20 active:scale-95"
            style={{ backgroundColor: '#8E75FF' }}
          >
            {isSubmitting ? "Enviando..." : "Gerar meu Diagnóstico"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
