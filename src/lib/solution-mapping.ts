import { DiagnosticPayload } from "./types";

export function mapSuggestedSolutions(diagnostic: DiagnosticPayload["diagnostic"]): string[] {
  const suggestions: string[] = [];

  const pains = diagnostic.pains || [];
  const operations = diagnostic.operationTypes || [];
  const integrations = diagnostic.integrations || [];

  // Caso 1 - Operacao ativa com baixa taxa ou spam
  const hasSpamOrLowRatePain = pains.some(p =>
    ["Baixa taxa de atendimento", "Chamadas bloqueadas ou marcadas como spam"].includes(p)
  );
  const hasActiveOrBillingOrSalesOp = operations.some(op =>
    ["Operacao ativa", "Cobranca", "Vendas"].includes(op)
  );
  if (hasSpamOrLowRatePain && hasActiveOrBillingOrSalesOp) {
    suggestions.push(
      "Discador com telecom",
      "Piloto comparativo de performance",
      "Analise de taxa de atendimento",
      "Estrategia de chamadas por DDD/regiao"
    );
  }

  // Caso 2 - Operacao receptiva ou filas
  const hasQueueOrHoursPain = pains.some(p =>
    ["Filas longas", "Atendimento fora do horario comercial"].includes(p)
  );
  const hasReceptiveOrSupportOp = operations.some(op =>
    ["Operacao receptiva", "Atendimento ao cliente"].includes(op)
  );
  if (hasQueueOrHoursPain || hasReceptiveOrSupportOp) {
    suggestions.push(
      "URA",
      "Agente virtual",
      "Omnichannel",
      "Automacao de triagem"
    );
  }

  // Caso 3 - Backoffice, API e integracao
  const hasManualOrIntegrationPain = pains.some(p =>
    ["Muitas tarefas manuais", "Falta de integracao entre sistemas"].includes(p)
  );
  const hasSystemIntegrationNeeded = integrations.some(i =>
    ["API", "Sistema proprio", "ERP"].includes(i)
  );
  if (hasManualOrIntegrationPain || hasSystemIntegrationNeeded) {
    suggestions.push(
      "RPA",
      "Integracao via API",
      "Automacao de backoffice",
      "Orquestracao de processos"
    );
  }

  // Caso 4 - Indicadores
  const hasIndicatorsPain = pains.some(p =>
    ["Falta de visibilidade sobre indicadores"].includes(p)
  );
  if (hasIndicatorsPain) {
    suggestions.push(
      "Speech Analytics",
      "Dashboards operacionais",
      "Monitoria de qualidade",
      "Indicadores de performance"
    );
  }

  // Caso 5 - Cobranca
  const hasBillingOp = operations.some(op =>
    ["Cobranca"].includes(op)
  );
  if (hasBillingOp) {
    suggestions.push(
      "Discador",
      "Agente virtual",
      "Regua automatizada",
      "WhatsApp Business API",
      "Integracao com CRM/cobranca"
    );
  }

  // Fallback defaults if no specific solutions mapped
  if (suggestions.length === 0) {
    suggestions.push(
      "Conversa de diagnóstico",
      "Planejamento de canais de atendimento"
    );
  }

  // Remover duplicatas
  return Array.from(new Set(suggestions));
}
