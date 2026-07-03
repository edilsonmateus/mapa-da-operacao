import { DiagnosticPayload } from "./types";

export type ScoringResult = {
  score: number;
  temperature: "Quente" | "Morno" | "Nutricao" | "Baixa prioridade";
  priority: "A" | "B" | "C" | "D";
};

export function calculateLeadScore(
  contact: DiagnosticPayload["contact"],
  diagnostic: DiagnosticPayload["diagnostic"]
): ScoringResult {
  let score = 0;

  // 1. Dados de contato completos: +10
  const hasBasicContact = !!(contact.name && contact.company && contact.email && contact.consent);
  if (hasBasicContact) {
    score += 10;
  }

  // 2. Empresa e site informados: +10
  if (contact.company && contact.website && contact.website.trim() !== "") {
    score += 10;
  }

  // 3. Dor clara selecionada: +20
  if (diagnostic.pains && diagnostic.pains.length > 0) {
    score += 20;
  }

  // 4. Operacao ativa, receptiva ou hibrida em andamento: +15
  const hasCoreOperation = diagnostic.operationTypes?.some(type =>
    ["Operacao ativa", "Operacao receptiva", "Operacao hibrida"].includes(type)
  );
  if (hasCoreOperation) {
    score += 15;
  }

  // 5. Estrutura atual como CRM, discador, telefonia, WhatsApp API ou sistema proprio: +15
  const hasCoreStructure = diagnostic.currentStructure?.some(struct =>
    ["CRM", "Discador", "Telefonia / SIP / tronco", "WhatsApp Business API", "Sistema proprio"].includes(struct)
  );
  if (hasCoreStructure) {
    score += 15;
  }

  // 6. Indicou piloto, substituicao, escala ou urgencia operacional: +15
  const hasUrgencyGoal = diagnostic.goals?.some(goal =>
    ["Fazer um piloto/teste comparativo", "Substituir uma ferramenta atual", "Escalar uma operacao existente"].includes(goal)
  );
  if (hasUrgencyGoal) {
    score += 15;
  }

  // 7. Mais de 20 atendentes ou alto volume diario: +15
  const hasLargeScale = diagnostic.initialScale?.some(scale =>
    ["21 a 50 atendentes", "51 a 100 atendentes", "101 a 500 atendentes", "Mais de 500 atendentes"].includes(scale)
  );
  const hasHighVolume = diagnostic.dailyVolume?.some(vol =>
    ["2.000 a 10.000", "10.000 a 50.000", "Mais de 50.000"].includes(vol)
  );
  if (hasLargeScale || hasHighVolume) {
    score += 15;
  }

  // Normalizar score para o teto de 100
  if (score > 100) {
    score = 100;
  }

  // Classificação
  let temperature: ScoringResult["temperature"] = "Baixa prioridade";
  let priority: ScoringResult["priority"] = "D";

  if (score >= 80) {
    temperature = "Quente";
    priority = "A";
  } else if (score >= 60) {
    temperature = "Morno";
    priority = "B";
  } else if (score >= 40) {
    temperature = "Nutricao";
    priority = "C";
  } else {
    temperature = "Baixa prioridade";
    priority = "D";
  }

  return {
    score,
    temperature,
    priority
  };
}
