export type DiagnosticPayload = {
  contact: {
    name: string;
    company: string;
    role?: string;
    email: string;
    whatsapp?: string;
    website?: string;
    consent: boolean;
  };

  diagnostic: {
    operationTypes: string[];
    currentStructure: string[];
    pains: string[];
    goals: string[];
    initialScale: string[];
    dailyVolume: string[];
    integrations: string[];
    freeText?: string;
  };

  leadIntelligence: {
    score: number;
    temperature: "Quente" | "Morno" | "Nutricao" | "Baixa prioridade";
    priority: "A" | "B" | "C" | "D";
    suggestedSolutions: string[];
    scenarioSummary: string;
    sdrNextAction: string;
    pendingQuestions: string[];
  };

  metadata: {
    source: "Mapa da Operacao";
    submittedAt: string;
    version: string;
  };
};
