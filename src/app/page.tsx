"use client";

import { useState } from "react";
import { DIAGNOSTIC_STEPS } from "@/lib/diagnostic-data";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BreathingScreen } from "@/components/BreathingScreen";
import { DiagnosticChain } from "@/components/DiagnosticChain";
import { DiagnosticStep } from "@/components/DiagnosticStep";
import { StepProgress } from "@/components/StepProgress";
import { FreeTextStep } from "@/components/FreeTextStep";
import { ContactStep } from "@/components/ContactStep";
import { ResultScreen } from "@/components/ResultScreen";
import { calculateLeadScore } from "@/lib/scoring";
import { mapSuggestedSolutions } from "@/lib/solution-mapping";
import { generateSdrSummary } from "@/lib/summary-generator";
import { DiagnosticPayload } from "@/lib/types";

type FlowStage = "welcome" | "breathing" | "diagnostic" | "free-text" | "contact" | "result";

export default function Home() {
  const [stage, setStage] = useState<FlowStage>("welcome");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo.png");

  // Form states
  const [answers, setAnswers] = useState({
    operationTypes: [] as string[],
    currentStructure: [] as string[],
    pains: [] as string[],
    goals: [] as string[],
    initialScale: [] as string[],
    dailyVolume: [] as string[],
    integrations: [] as string[],
    freeText: "",
  });

  const [contact, setContact] = useState<DiagnosticPayload["contact"]>({
    name: "",
    company: "",
    role: "",
    email: "",
    whatsapp: "",
    website: "",
    consent: false,
  });

  const [resultPayload, setResultPayload] = useState<DiagnosticPayload | null>(null);

  // Remotely control diagnostic chain removal
  const handleRemoveChainItem = (field: string, val: string) => {
    setAnswers(prev => {
      const key = field as keyof typeof prev;
      if (Array.isArray(prev[key])) {
        return {
          ...prev,
          [key]: (prev[key] as string[]).filter(v => v !== val)
        };
      }
      return prev;
    });
  };

  const handleStartWithCalm = () => {
    setStage("breathing");
  };

  const handleSkipToDiagnostic = () => {
    setStage("diagnostic");
    setCurrentStepIndex(0);
  };

  const handleBreathingComplete = () => {
    setStage("diagnostic");
    setCurrentStepIndex(0);
  };

  const handleStepChange = (values: string[]) => {
    const currentStep = DIAGNOSTIC_STEPS[currentStepIndex];
    setAnswers(prev => ({
      ...prev,
      [currentStep.field]: values
    }));
  };

  const handleNextStep = () => {
    if (currentStepIndex < DIAGNOSTIC_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setStage("free-text");
    }
  };

  const handleBackStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      setStage("welcome");
    }
  };

  const handleFreeTextNext = () => {
    setStage("contact");
  };

  const handleFreeTextBack = () => {
    setStage("diagnostic");
    setCurrentStepIndex(DIAGNOSTIC_STEPS.length - 1);
  };

  const handleContactBack = () => {
    setStage("free-text");
  };

  const handleContactSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Calcular inteligência comercial localmente
      const scoringResult = calculateLeadScore(contact, answers);
      const suggestedSolutions = mapSuggestedSolutions(answers);
      const summaryResult = generateSdrSummary(answers);

      const payload: DiagnosticPayload = {
        contact,
        diagnostic: answers,
        leadIntelligence: {
          score: scoringResult.score,
          temperature: scoringResult.temperature,
          priority: scoringResult.priority,
          suggestedSolutions,
          scenarioSummary: summaryResult.scenarioSummary,
          sdrNextAction: summaryResult.sdrNextAction,
          pendingQuestions: summaryResult.pendingQuestions,
        },
        metadata: {
          source: "Mapa da Operacao",
          submittedAt: new Date().toISOString(),
          version: "0.1.0"
        }
      };

      // Exibir payload estruturado no console para validação da Fase 3
      console.log("=== MAPA DA OPERAÇÃO: PAYLOAD FINAL ===", payload);

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Erro desconhecido no servidor.");
      }

      setResultPayload(payload);
      setStage("result");
    } catch (error: any) {
      console.error("Erro no processamento do diagnóstico", error);
      alert(`Não foi possível enviar o seu diagnóstico: ${error.message || "Conexão mal sucedida"}. Suas respostas continuam salvas, por favor tente novamente.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setAnswers({
      operationTypes: [],
      currentStructure: [],
      pains: [],
      goals: [],
      initialScale: [],
      dailyVolume: [],
      integrations: [],
      freeText: "",
    });
    setContact({
      name: "",
      company: "",
      role: "",
      email: "",
      whatsapp: "",
      website: "",
      consent: false,
    });
    setResultPayload(null);
    setStage("welcome");
  };

  // Calcular número total de passos navegáveis (steps + text + contact)
  const totalJourneySteps = DIAGNOSTIC_STEPS.length + 2; 
  const currentJourneyIndex = stage === "diagnostic" 
    ? currentStepIndex + 1 
    : stage === "free-text" 
      ? DIAGNOSTIC_STEPS.length + 1 
      : DIAGNOSTIC_STEPS.length + 2;

  return (
    <div className="flex flex-col min-h-screen font-sans text-violet-955 bg-transparent relative overflow-hidden">
      {/* Dynamic ambient float spheres (Royal Blue & Violet) */}
      <div className="absolute top-[10%] left-[-15%] w-[38rem] h-[38rem] rounded-full bg-blue-600/35 blur-[120px] pointer-events-none z-0 orb-1" />
      <div className="absolute bottom-[10%] right-[-15%] w-[38rem] h-[38rem] rounded-full bg-violet-500/35 blur-[120px] pointer-events-none z-0 orb-2" />

      <header className="border-b border-violet-100/40 py-5 px-6 backdrop-blur-md bg-white/10 relative z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Comunikime"
                className="h-10 w-auto object-contain"
                onError={() => {
                  if (logoUrl === "/logo.png") {
                    setLogoUrl("/logo.svg");
                  } else {
                    setLogoUrl("");
                  }
                }}
              />
            ) : (
              <span className="text-lg font-bold tracking-tight text-violet-955">
                Comunikime
              </span>
            )}
            <span className="text-xs px-2.5 py-0.5 rounded bg-violet-600/10 text-violet-750 font-mono">
              Mapa da Operação
            </span>
          </div>
          {stage !== "welcome" && stage !== "breathing" && stage !== "result" && (
            <button
              onClick={handleReset}
              className="text-xs text-violet-400 hover:text-violet-700 transition-colors font-medium"
            >
              Reiniciar
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-10 flex flex-col justify-center relative z-10">
        {stage === "welcome" && (
          <WelcomeScreen
            onStartWithCalm={handleStartWithCalm}
            onSkipToDiagnostic={handleSkipToDiagnostic}
          />
        )}

        {stage === "breathing" && (
          <BreathingScreen onComplete={handleBreathingComplete} />
        )}

        {(stage === "diagnostic" || stage === "free-text" || stage === "contact") && (
          <div className="w-full">
            {/* Cadeia de Diagnóstico visível durante o preenchimento */}
            <DiagnosticChain
              selectedAnswers={answers}
              onRemoveItem={handleRemoveChainItem}
            />

            <StepProgress
              current={currentJourneyIndex}
              total={totalJourneySteps}
            />

            <div className="py-4">
              {stage === "diagnostic" && (
                <DiagnosticStep
                  step={DIAGNOSTIC_STEPS[currentStepIndex]}
                  selectedValues={answers[DIAGNOSTIC_STEPS[currentStepIndex].field as keyof typeof answers] as string[]}
                  onChange={handleStepChange}
                  onNext={handleNextStep}
                  onBack={handleBackStep}
                  isFirst={currentStepIndex === 0}
                />
              )}

              {stage === "free-text" && (
                <FreeTextStep
                  value={answers.freeText}
                  onChange={(val) => setAnswers(prev => ({ ...prev, freeText: val }))}
                  onNext={handleFreeTextNext}
                  onBack={handleFreeTextBack}
                />
              )}

              {stage === "contact" && (
                <ContactStep
                  value={contact}
                  onChange={setContact}
                  onNext={handleContactSubmit}
                  onBack={handleContactBack}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>
          </div>
        )}

        {stage === "result" && resultPayload && (
          <ResultScreen payload={resultPayload} onReset={handleReset} />
        )}
      </main>

      <footer className="border-t border-violet-100/40 py-6 px-6 text-center text-xs text-violet-400/80 relative z-10">
        &copy; {new Date().getFullYear()} Comunikime. Todos os direitos reservados.
      </footer>
    </div>
  );
}
