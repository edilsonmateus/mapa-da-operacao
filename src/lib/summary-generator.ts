import { DiagnosticPayload } from "./types";

export type SummaryResult = {
  scenarioSummary: string;
  sdrNextAction: string;
  pendingQuestions: string[];
};

export function generateSdrSummary(diagnostic: DiagnosticPayload["diagnostic"]): SummaryResult {
  const ops = diagnostic.operationTypes?.join(", ") || "não especificado";
  const structure = diagnostic.currentStructure?.join(", ") || "não especificado";
  const painsList = diagnostic.pains || [];
  const painsText = painsList.join(", ") || "não especificado";
  const goalsText = diagnostic.goals?.join(", ") || "não especificado";

  // Build a narrative scenario summary
  let scenarioSummary = `Lead busca melhoria para operação de ${ops}. Informou possuir infraestrutura atual de: ${structure}. `;
  if (painsList.length > 0) {
    scenarioSummary += `A principal dor indicada é: ${painsText}. `;
  }
  if (diagnostic.goals && diagnostic.goals.length > 0) {
    scenarioSummary += `O objetivo com o projeto é: ${goalsText}. `;
  }
  if (diagnostic.freeText && diagnostic.freeText.trim() !== "") {
    scenarioSummary += `Observações do cliente: "${diagnostic.freeText}".`;
  }

  // SDR Action suggestion
  const isUrgent = diagnostic.goals?.some(g =>
    ["Fazer um piloto/teste comparativo", "Substituir uma ferramenta atual"].includes(g)
  ) || painsList.some(p => ["Baixa taxa de atendimento", "Chamadas bloqueadas ou marcadas como spam"].includes(p));

  const sdrNextAction = isUrgent
    ? "Agendar reunião técnico-comercial com urgência para entender volume diário, DDDs do mailing, CRM utilizado, telefonia atual e critérios de sucesso do piloto."
    : "Fazer primeiro contato de qualificação para detalhar as dores de atendimento indicadas, validar integrações necessárias e alinhar expectativas de volumetria.";

  // Pending questions selection based on diagnostic answers
  const pendingQuestions: string[] = [
    "Qual é a taxa de atendimento atual da operação?",
    "Qual o volume diário de interações/chamadas que será testado?",
    "Quais DDDs/regiões concentram o mailing principal?",
  ];

  if (diagnostic.currentStructure?.includes("CRM")) {
    pendingQuestions.push("Qual CRM utilizam hoje e qual o nível de integração necessário?");
  } else {
    pendingQuestions.push("Como controlam as informações dos clientes hoje (planilhas, sistema interno)?");
  }

  if (diagnostic.goals?.includes("Fazer um piloto/teste comparativo")) {
    pendingQuestions.push("O teste será integrado ao CRM ou em ambiente separado?");
    pendingQuestions.push("Qual a duração esperada para o piloto de testes?");
    pendingQuestions.push("Quais métricas definem o sucesso do piloto?");
  }

  pendingQuestions.push("Quem participa da decisão técnica e comercial do projeto?");

  if (diagnostic.currentStructure?.some(s => ["Discador", "Telefonia / SIP / tronco"].includes(s))) {
    pendingQuestions.push("Existe fornecedor de telecom/discador atual a ser substituído?");
  }

  pendingQuestions.push("Existe um prazo desejado para a implantação completa?");

  return {
    scenarioSummary,
    sdrNextAction,
    pendingQuestions
  };
}
