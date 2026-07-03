export type Option = {
  id: string;
  label: string;
  description?: string;
};

export type Step = {
  id: string;
  title: string;
  subtitle?: string;
  type: "multi-select" | "single-select" | "text" | "contact" | "welcome" | "breathing" | "result";
  field: string;
  options?: Option[];
  placeholder?: string;
};

export const DIAGNOSTIC_STEPS: Step[] = [
  {
    id: "operationTypes",
    title: "Qual cenário mais se parece com sua operação?",
    type: "multi-select",
    field: "operationTypes",
    options: [
      { id: "Operacao ativa", label: "Operação ativa", description: "Chamadas, cobrança, vendas, recuperação ou contato proativo com clientes." },
      { id: "Operacao receptiva", label: "Operação receptiva", description: "Clientes entram em contato com sua empresa por voz, texto ou canais digitais." },
      { id: "Operacao hibrida", label: "Operação híbrida", description: "Ativo e receptivo acontecem dentro da mesma operação." },
      { id: "Cobranca", label: "Cobrança", description: "Localização, negociação, recuperação de crédito ou régua de cobrança." },
      { id: "Vendas", label: "Vendas", description: "Prospecção, qualificação, conversão ou relacionamento comercial." },
      { id: "Atendimento ao cliente", label: "Atendimento ao cliente", description: "Suporte, dúvidas, solicitações, SAC ou relacionamento." },
      { id: "Retencao", label: "Retenção", description: "Redução de cancelamentos, recuperação de clientes ou defesa de carteira." },
      { id: "Suporte tecnico", label: "Suporte técnico", description: "Atendimento técnico, triagem, abertura de chamados ou acompanhamento." },
      { id: "Backoffice", label: "Backoffice", description: "Tarefas internas, validações, processos manuais ou integração entre áreas." },
      { id: "Ainda estou entendendo", label: "Ainda estou entendendo", description: "Quero ajuda para organizar o cenário antes de escolher uma solução." }
    ]
  },
  {
    id: "currentStructure",
    title: "Hoje sua empresa já utiliza alguma dessas estruturas?",
    type: "multi-select",
    field: "currentStructure",
    options: [
      { id: "CRM", label: "CRM", description: "Gestão de relacionamento com clientes (ex: Salesforce, Hubspot, PipeRun)." },
      { id: "Discador", label: "Discador", description: "Sistema automático ou manual de discagem de chamadas." },
      { id: "Telefonia / SIP / tronco", label: "Telefonia / SIP / tronco", description: "Conexões de telefonia IP ou canais de voz dedicados." },
      { id: "WhatsApp Business API", label: "WhatsApp Business API", description: "API oficial para mensagens profissionais em escala." },
      { id: "URA", label: "URA", description: "Unidade de Resposta Audível (atendimento telefônico automático/menu)." },
      { id: "Chatbot", label: "Chatbot", description: "Robôs de texto para atendimento automático em canais digitais." },
      { id: "Agente virtual", label: "Agente virtual", description: "Assistentes conversacionais inteligentes de voz ou texto." },
      { id: "Speech Analytics", label: "Speech Analytics", description: "Análise automatizada de voz e transcrição de chamadas." },
      { id: "WFM / gestao de escala", label: "WFM / gestão de escala", description: "Gestão de força de trabalho, escalas e dimensionamento." },
      { id: "Sistema proprio", label: "Sistema próprio", description: "Plataformas ou sistemas legados desenvolvidos internamente." },
      { id: "Integracoes via API", label: "Integrações via API", description: "Conexões diretas de dados entre diferentes softwares." },
      { id: "Nao possuimos estrutura ainda", label: "Não possuímos estrutura ainda", description: "Iniciando a estruturação dos sistemas operacionais agora." }
    ]
  },
  {
    id: "pains",
    title: "Qual problema você quer resolver primeiro?",
    type: "multi-select",
    field: "pains",
    options: [
      { id: "Baixa taxa de atendimento", label: "Baixa taxa de atendimento", description: "Muitas chamadas efetuadas, mas poucas atendidas pelos clientes." },
      { id: "Chamadas bloqueadas ou marcadas como spam", label: "Chamadas bloqueadas ou marcadas como spam", description: "Números identificados como spam ou bloqueados pelos celulares." },
      { id: "Alto custo operacional", label: "Alto custo operacional", description: "Gastos elevados com telefonia, infraestrutura ou licenças." },
      { id: "Filas longas", label: "Filas longas", description: "Clientes esperando muito tempo para falar com um atendente." },
      { id: "Baixa produtividade dos operadores", label: "Baixa produtividade dos operadores", description: "Tempo ocioso alto ou poucos contatos efetivos por operador." },
      { id: "Dificuldade para localizar clientes", label: "Dificuldade para localizar clientes", description: "Dados defasados ou ligações que não chegam à pessoa certa." },
      { id: "Falta de visibilidade sobre indicadores", label: "Falta de visibilidade sobre indicadores", description: "Dificuldade para acompanhar métricas e relatórios em tempo real." },
      { id: "Atendimento fora do horario comercial", label: "Atendimento fora do horário comercial", description: "Perda de contatos ou transbordo à noite, fins de semana ou feriados." },
      { id: "Falta de integracao entre sistemas", label: "Falta de integração entre sistemas", description: "Operadores precisando copiar e colar dados entre telas diferentes." },
      { id: "Baixa conversao", label: "Baixa conversão", description: "Muitos contatos iniciados, mas poucas vendas ou negociações fechadas." },
      { id: "Muitas tarefas manuais", label: "Muitas tarefas manuais", description: "Excesso de trabalho repetitivo e processos burocráticos." },
      { id: "Dificuldade para escalar operacao", label: "Dificuldade para escalar operação", description: "Complexidade para aumentar o time ou a capacidade de atendimento." },
      { id: "Outro", label: "Outro", description: "Outras dores específicas do cenário operacional atual." }
    ]
  },
  {
    id: "goals",
    title: "O que você espera alcançar com uma nova solução?",
    type: "multi-select",
    field: "goals",
    options: [
      { id: "Aumentar taxa de atendimento", label: "Aumentar taxa de atendimento" },
      { id: "Aumentar conversao", label: "Aumentar conversão" },
      { id: "Reduzir custo", label: "Reduzir custo" },
      { id: "Automatizar atendimento", label: "Automatizar atendimento" },
      { id: "Automatizar cobranca", label: "Automatizar cobrança" },
      { id: "Melhorar experiencia do cliente", label: "Melhorar experiência do cliente" },
      { id: "Reduzir filas", label: "Reduzir filas" },
      { id: "Integrar sistemas", label: "Integrar sistemas" },
      { id: "Substituir uma ferramenta atual", label: "Substituir uma ferramenta atual" },
      { id: "Criar operacao do zero", label: "Criar operação do zero" },
      { id: "Fazer um piloto/teste comparativo", label: "Fazer um piloto/teste comparativo" },
      { id: "Escalar uma operacao existente", label: "Escalar uma operação existente" }
    ]
  },
  {
    id: "initialScale",
    title: "Qual o tamanho inicial da operação?",
    type: "multi-select", // O modelo de dados pede string[], permitindo multi ou single. Mantemos flexível conforme o modelo
    field: "initialScale",
    options: [
      { id: "1 a 5 atendentes", label: "1 a 5 atendentes" },
      { id: "6 a 20 atendentes", label: "6 a 20 atendentes" },
      { id: "21 a 50 atendentes", label: "21 a 50 atendentes" },
      { id: "51 a 100 atendentes", label: "51 a 100 atendentes" },
      { id: "101 a 500 atendentes", label: "101 a 500 atendentes" },
      { id: "Mais de 500 atendentes", label: "Mais de 500 atendentes" },
      { id: "Ainda nao sei", label: "Ainda não sei" }
    ]
  },
  {
    id: "dailyVolume",
    title: "Qual o volume aproximado de interações ou chamadas por dia?",
    type: "multi-select",
    field: "dailyVolume",
    options: [
      { id: "Ate 500", label: "Até 500" },
      { id: "500 a 2.000", label: "500 a 2.000" },
      { id: "2.000 a 10.000", label: "2.000 a 10.000" },
      { id: "10.000 a 50.000", label: "10.000 a 50.000" },
      { id: "Mais de 50.000", label: "Mais de 50.000" },
      { id: "Ainda nao sei", label: "Ainda não sei" }
    ]
  },
  {
    id: "integrations",
    title: "A solução precisa conversar com algum sistema atual?",
    type: "multi-select",
    field: "integrations",
    options: [
      { id: "CRM", label: "CRM" },
      { id: "ERP", label: "ERP" },
      { id: "Sistema de cobranca", label: "Sistema de cobrança" },
      { id: "Sistema proprio", label: "Sistema próprio" },
      { id: "WhatsApp", label: "WhatsApp" },
      { id: "Telefonia atual", label: "Telefonia atual" },
      { id: "Banco de dados", label: "Banco de dados" },
      { id: "API", label: "API" },
      { id: "Nao precisa integrar agora", label: "Não precisa integrar agora" },
      { id: "Ainda nao sei", label: "Ainda não sei" }
    ]
  }
];
