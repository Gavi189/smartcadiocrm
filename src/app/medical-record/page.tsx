"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Check,
  Clock,
  FileEdit,
  Save,
  Sparkles,
  Stethoscope,
  Brain,
  AlertCircle,
} from "lucide-react";
import { Button } from "../_components/ui/button";
import { Card } from "../_components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";
import { useToast } from "../hooks/use-toast";
import {
  MedicalHistory,
  VitalSigns,
  DiagnosticHypothesis,
} from "../_types/patients";
import MedicalRecordEditor from "../_components/medical/MedicalRecordEditor";
import EvolutionHistory from "../_components/medical/EvolutionHistory";
import MedicalHistorySection from "../_components/medical/MedicalHistorySection";
import VitalSignsSection from "../_components/medical/VitalSignsSection";
import PatientInfo from "../_components/medical/PatientInfo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../_components/ui/dialog";

// Mock response when API is not available
const MOCK_AI_RESPONSES = {
  diagnostic: `Considerando os dados da paciente Maria Silva, 64 anos, com hipótese diagnóstica de Angina instável (I20.0), e histórico de hipertensão, diabetes tipo 2 e revascularização miocárdica prévia:

Diagnósticos Diferenciais:
1. Infarto agudo do miocárdio sem supradesnivelamento do segmento ST
2. Síndrome de Takotsubo (cardiomiopatia induzida por estresse)
3. Dissecção aórtica
4. Embolia pulmonar
5. Pericardite aguda

Perguntas adicionais importantes:
- Caracterização da dor: início, duração, fatores de alívio ou piora
- Presença de sintomas associados: dispneia, náuseas, sudorese
- Eventos recentes de estresse emocional ou físico
- Adesão ao tratamento de comorbidades
- Resultados de exames cardíacos anteriores`,

  treatment: `Plano de Conduta para Maria Silva (64 anos) - Hipótese: Angina instável

EXAMES RECOMENDADOS:
- ECG de 12 derivações imediato
- Enzimas cardíacas seriadas (troponina, CK-MB)
- Ecocardiograma transtorácico
- Teste ergométrico ou cintilografia miocárdica após estabilização
- Perfil lipídico completo e HbA1c

MEDICAÇÕES:
- AAS 100mg/dia (considerar clopidogrel devido à alergia a AAS)
- Beta-bloqueador (metoprolol 50mg 2x/dia)
- Estatina de alta potência (rosuvastatina 20mg/dia)
- Ajustar medicações para diabetes e hipertensão conforme controle atual

ORIENTAÇÕES:
- Repouso nas próximas 24-48h
- Dieta hipossódica e pobre em carboidratos refinados
- Controle rigoroso da glicemia
- Retorno em 7 dias com resultados dos exames
- Procurar emergência se dor persistir ou piorar`,
};

export default function MedicalRecord() {
  const [activeTab, setActiveTab] = useState("evolution");
  const [evolContent, setEvolContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [autofilledContent, setAutofilledContent] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const { toast } = useToast();
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const eventSourceRef = useRef<EventSource | null>(null); // Para streaming

  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory>({
    comorbidities: ["Hipertensão", "Diabetes tipo 2"],
    surgeries: ["Revascularização miocárdica (2015)"],
    allergies: "Alergia a AAS (ácido acetilsalicílico)",
    familyHistory: [
      "Pai com infarto agudo do miocárdio aos 60 anos",
      "Mãe com hipertensão arterial sistêmica",
    ],
    vaccineHistory: {
      covid: "3 doses",
      influenza: "Atualizada",
      pneumococcal: "Pendente",
    },
  });

  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({
    weight: 70,
    height: 165,
    bmi: 25.7,
    waistCircumference: 92,
    heartRate: 72,
    respiratoryRate: 16,
    temperature: 36.5,
    bloodPressure: "135/85",
    oxygenSaturation: 98,
    bloodGlucose: 110,
    painScore: 0,
  });

  const [diagnosticHypothesis, setDiagnosticHypothesis] =
    useState<DiagnosticHypothesis>({
      description: "Angina instável",
      icdCode: "I20.0",
    });

  const patient = {
    id: 1,
    name: "Maria Silva",
    age: 64,
    gender: "Feminino",
    cpf: "123.456.789-00",
    phone: "(11) 98765-4321",
    email: "maria.silva@email.com",
    address: "Av. Paulista, 1000, Apto 123, São Paulo - SP",
    insurance: "Bradesco Saúde",
    insuranceNumber: "98765432-10",
    allergies: "Penicilina",
    comorbidities: "Hipertensão Arterial, Diabetes Mellitus tipo 2",
    lastVisit: "24/03/2025",
  };

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000", {
          timeout: 2000,
        });
        if (response.status === 200) {
          setIsBackendAvailable(true);
        } else {
          throw new Error("Unexpected status code");
        }
      } catch (error) {
        console.log(
          "Backend server appears to be offline, using mock data instead",
          error
        );
        setIsBackendAvailable(false);
      }
    };

    checkBackendStatus();

    // Cleanup event source on unmount
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Evolução salva",
        description: "A evolução do paciente foi salva com sucesso.",
      });
    }, 1000);
  };

  const handleAssistenteIA = async () => {
    setAiLoading(true);
    setShowAiAssistant(true);
    setAiResponse("");

    try {
      if (!isBackendAvailable) {
        setTimeout(() => {
          setAiResponse(MOCK_AI_RESPONSES.diagnostic);
          setAutofilledContent(true);
          setAiLoading(false);
        }, 1500);
        return;
      }

      const patientSummary = `${patient.name}, ${patient.age} anos, diagnóstico: ${diagnosticHypothesis.description}`;
      const historySummary = `Histórico: ${
        medicalHistory.comorbidities?.join(", ") || "Nenhum"
      }, ${medicalHistory.surgeries?.join(", ") || "Nenhum"}`;
      const vitalSummary = `PA ${vitalSigns.bloodPressure}, FC ${vitalSigns.heartRate}`;
      const prompt = `Com base em: ${patientSummary}, ${historySummary}, ${vitalSummary}, sugira diagnóstico diferencial e perguntas.`;
      if (prompt.length > 1000) {
        toast({
          title: "Erro",
          description: "O prompt excede o limite de 1000 caracteres.",
          variant: "destructive",
        });
        setAiLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/assistente-ia",
        { messages: [{ role: "user", content: prompt }] },
        {
          timeout: 60000,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data && response.data.response) {
        setAiResponse(response.data.response);
        setAutofilledContent(true);
      } else {
        throw new Error("Resposta inválida da API");
      }
    } catch (error) {
      console.error("Erro na IA:", error);
      let errorMessage = "Falha ao carregar sugestão da IA";
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
          errorMessage =
            "Não foi possível conectar ao servidor. Verifique se o servidor backend está em execução.";
          setAiResponse(MOCK_AI_RESPONSES.diagnostic);
          setAutofilledContent(true);
        } else if (error.response) {
          errorMessage = `Erro ${error.response.status}: ${
            error.response.data?.error || "Erro desconhecido do servidor"
          }`;
          console.log("Detalhes do erro:", error.response.data);
        } else if (error.request) {
          errorMessage =
            "Servidor não respondeu ao pedido. Verifique a conexão.";
        }
      } else if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleSugestaoIA = async () => {
    setAiLoading(true);
    setAiResponse("");

    try {
      if (!isBackendAvailable) {
        setTimeout(() => {
          const mockResponse = MOCK_AI_RESPONSES.treatment;
          setAiResponse(mockResponse);
          setEvolContent((prev) => prev + "\n\n" + mockResponse);
          setAutofilledContent(true);
          setAiLoading(false);
        }, 1500);
        return;
      }

      const patientSummary = `${patient.name}, ${patient.age} anos, diagnóstico: ${diagnosticHypothesis.description}`;
      const historySummary = `Histórico: ${
        medicalHistory.comorbidities?.join(", ") || "Nenhum"
      }, ${medicalHistory.surgeries?.join(", ") || "Nenhum"}`;
      const vitalSummary = `PA ${vitalSigns.bloodPressure}, FC ${vitalSigns.heartRate}`;
      const prompt = `Com base em: ${patientSummary}, ${historySummary}, ${vitalSummary}, sugira plano de conduta com exames, medicações e orientações.`;
      if (prompt.length > 1000) {
        toast({
          title: "Erro",
          description: "O prompt excede o limite de 1000 caracteres.",
          variant: "destructive",
        });
        setAiLoading(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/sugestao-ia",
        { messages: [{ role: "user", content: prompt }] },
        {
          timeout: 20000,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data && response.data.response) {
        setAiResponse(response.data.response);
        setEvolContent((prev) => prev + "\n\n" + response.data.response);
        setAutofilledContent(true);
      } else {
        throw new Error("Resposta inválida da API");
      }
    } catch (error) {
      console.error("Erro na IA:", error);
      let errorMessage = "Falha ao carregar sugestão de conduta";
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNREFUSED" || error.code === "ERR_NETWORK") {
          errorMessage =
            "Não foi possível conectar ao servidor. Verifique se o servidor backend está em execução.";
          const mockResponse = MOCK_AI_RESPONSES.treatment;
          setAiResponse(mockResponse);
          setEvolContent((prev) => prev + "\n\n" + mockResponse);
          setAutofilledContent(true);
        } else if (error.response) {
          errorMessage = `Erro ${error.response.status}: ${
            error.response.data?.error || "Erro desconhecido do servidor"
          }`;
          console.log("Detalhes do erro:", error.response.data);
        } else if (error.request) {
          errorMessage =
            "Servidor não respondeu ao pedido. Verifique a conexão.";
        }
      } else if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!showAiAssistant && dialogTriggerRef.current) {
      dialogTriggerRef.current.focus();
    }
  }, [showAiAssistant]);

  return (
    <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-6">
      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-left: 4px solid #3b82f6;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          animation: spin 1s linear infinite;
          margin-right: 8px;
        }
        .spinner-large {
          width: 50px;
          height: 50px;
          border-width: 6px;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Prontuário Eletrônico
          </h1>
          <p className="text-gray-600 text-sm">
            Registro médico inteligente do paciente
          </p>
        </div>
        <div className="flex gap-2">
          {!isBackendAvailable && (
            <div className="bg-yellow-50 border border-yellow-300 rounded-md p-2 text-xs text-yellow-800 flex items-center mr-2">
              <AlertCircle className="h-4 w-4 mr-1" />
              Usando dados simulados (servidor offline)
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleAssistenteIA}
            disabled={isSaving || aiLoading}
            className="p-2 border border-gray-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center"
            ref={dialogTriggerRef}
          >
            {aiLoading ? (
              <div className="spinner" />
            ) : (
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
            )}
            Assistente IA
          </Button>
          <Button
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center"
            onClick={handleSugestaoIA}
            disabled={isSaving || aiLoading}
          >
            {aiLoading ? (
              <div className="spinner" />
            ) : (
              <Sparkles className="h-5 w-5 mr-2" />
            )}
            Sugestão de IA
          </Button>
          <Button
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Clock className="h-5 w-5 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-2" />
                Salvar Evolução
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 border border-slate-100 rounded-xl shadow-sm">
          <PatientInfo
            patient={patient}
            diagnosticHypothesis={diagnosticHypothesis}
            setDiagnosticHypothesis={setDiagnosticHypothesis}
          />
        </Card>

        <Card className="lg:col-span-2 border border-slate-100 rounded-xl shadow-sm">
          <div className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex items-center justify-between border-b border-gray-200 px-6">
                <TabsList className="h-12">
                  <TabsTrigger
                    value="evolution"
                    className="h-12 px-4 text-gray-700 hover:bg-gray-50 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md transition-all"
                  >
                    <FileEdit className="h-5 w-5 mr-2" />
                    Nova Evolução
                  </TabsTrigger>
                  <TabsTrigger
                    value="history"
                    className="h-12 px-4 text-gray-700 hover:bg-gray-50 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md transition-all"
                  >
                    <Clock className="h-5 w-5 mr-2" />
                    Histórico de Evoluções
                  </TabsTrigger>
                  <TabsTrigger
                    value="medicalHistory"
                    className="h-12 px-4 text-gray-700 hover:bg-gray-50 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md transition-all"
                  >
                    <Stethoscope className="h-5 w-5 mr-2" />
                    História Patológica
                  </TabsTrigger>
                  <TabsTrigger
                    value="vitalSigns"
                    className="h-12 px-4 text-gray-700 hover:bg-gray-50 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-md transition-all"
                  >
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Sinais Vitais
                  </TabsTrigger>
                </TabsList>
                {activeTab === "evolution" && (
                  <div className="text-xs text-gray-600 flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Auto-salvando rascunho
                  </div>
                )}
              </div>
              <div className="p-6">
                <TabsContent value="evolution" className="mt-0">
                  <MedicalRecordEditor
                    content={evolContent}
                    onContentChange={setEvolContent}
                    autofilled={autofilledContent}
                  />
                  {aiResponse && (
                    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                      <p className="text-gray-700">{aiResponse}</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="history" className="mt-0">
                  <EvolutionHistory />
                </TabsContent>
                <TabsContent value="medicalHistory" className="mt-0">
                  <MedicalHistorySection
                    history={medicalHistory}
                    setHistory={setMedicalHistory}
                  />
                </TabsContent>
                <TabsContent value="vitalSigns" className="mt-0">
                  <VitalSignsSection
                    vitalSigns={vitalSigns}
                    setVitalSigns={setVitalSigns}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </Card>
      </div>

      <Dialog open={showAiAssistant} onOpenChange={setShowAiAssistant}>
        <DialogContent className="sm:max-w-lg p-6 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center text-xl font-semibold text-gray-900">
              <Brain className="h-5 w-5 mr-2 text-blue-600" />
              Assistente IA - Sugestões de Diagnóstico
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Resultado da IA baseado nos dados do paciente
              {!isBackendAvailable && " (usando dados simulados)"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {aiLoading ? (
              <div className="flex justify-center">
                <div className="spinner spinner-large" />
              </div>
            ) : aiResponse ? (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-700">{aiResponse}</p>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
