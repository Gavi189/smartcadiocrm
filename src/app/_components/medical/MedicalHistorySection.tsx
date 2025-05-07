"use client";

import {
  Heart,
  Pill,
  Activity,
  Cigarette,
  Users,
  Syringe,
  UserRound,
  Gift,
} from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { MedicalHistory } from "../../_types/patients";

interface MedicalHistorySectionProps {
  history: MedicalHistory;
  setHistory: React.Dispatch<React.SetStateAction<MedicalHistory>>;
}

export default function MedicalHistorySection({
  history,
  setHistory,
}: MedicalHistorySectionProps) {
  return (
    <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">
        História Patológica Pregressa (HPP)
      </h3>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="comorbidities">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Heart className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Comorbidades</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <Textarea
              placeholder="Ex: Hipertensão, Diabetes tipo 2, Dislipidemia"
              value={history.comorbidities?.join(", ") || ""}
              onChange={(e) =>
                setHistory((prev) => ({
                  ...prev,
                  comorbidities: e.target.value.split(", "),
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[100px] text-gray-700 placeholder-gray-400"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="surgeries">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Pill className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                Cirurgias Realizadas
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <Textarea
              placeholder="Ex: Revascularização miocárdica (2015)"
              value={history.surgeries?.join(", ") || ""}
              onChange={(e) =>
                setHistory((prev) => ({
                  ...prev,
                  surgeries: e.target.value.split(", "),
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[100px] text-gray-700 placeholder-gray-400"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="allergies">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Alergias</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <Textarea
              placeholder="Ex: Alergia a AAS (ácido acetilsalicílico)"
              value={history.allergies || ""}
              onChange={(e) =>
                setHistory((prev) => ({
                  ...prev,
                  allergies: e.target.value,
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[100px] text-gray-700 placeholder-gray-400"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="habits">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Hábitos de Vida</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Atividade física:
                </label>
                <Input
                  placeholder="Ex: Sim (caminhada 3x/semana)"
                  value={history.physicalActivity || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      physicalActivity: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Sono:
                </label>
                <Input
                  placeholder="Ex: Regular, 7h por noite"
                  value={history.sleep || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      sleep: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Alimentação:
                </label>
                <Input
                  placeholder="Ex: Pobre em fibras, rica em sódio"
                  value={history.diet || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      diet: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sports">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                Prática de Esportes
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <Input
              placeholder="Ex: Futebol recreativo 1x por semana"
              value={history.sports || ""}
              onChange={(e) =>
                setHistory((prev) => ({
                  ...prev,
                  sports: e.target.value,
                }))
              }
              className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="substances">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Cigarette className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                Uso de Substâncias
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Tabaco:
                </label>
                <Input
                  placeholder="Ex: 10 cigarros/dia há 15 anos (ativo)"
                  value={history.tobacco || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      tobacco: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Álcool:
                </label>
                <Input
                  placeholder="Ex: Socialmente"
                  value={history.alcohol || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      alcohol: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Drogas ilícitas:
                </label>
                <Input
                  placeholder="Ex: Nega uso"
                  value={history.illicitDrugs || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      illicitDrugs: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="family">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                Histórico Familiar
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <Textarea
              placeholder="Ex: Pai com infarto agudo do miocárdio aos 60 anos"
              value={history.familyHistory?.join("\n") || ""}
              onChange={(e) =>
                setHistory((prev) => ({
                  ...prev,
                  familyHistory: e.target.value.split("\n"),
                }))
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[120px] text-gray-700 placeholder-gray-400"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="vaccines">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Syringe className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                História Vacinal
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  COVID-19:
                </label>
                <Input
                  placeholder="Ex: 3 doses"
                  value={history.vaccineHistory?.covid || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      vaccineHistory: {
                        ...prev.vaccineHistory,
                        covid: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Influenza:
                </label>
                <Input
                  placeholder="Ex: Atualizada"
                  value={history.vaccineHistory?.influenza || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      vaccineHistory: {
                        ...prev.vaccineHistory,
                        influenza: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Pneumocócica:
                </label>
                <Input
                  placeholder="Ex: Pendente"
                  value={history.vaccineHistory?.pneumococcal || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      vaccineHistory: {
                        ...prev.vaccineHistory,
                        pneumococcal: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gynecological">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <UserRound className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                História Ginecológica
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Gestações:
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 2"
                  value={history.gynecologicalHistory?.pregnancies || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      gynecologicalHistory: {
                        ...prev.gynecologicalHistory,
                        pregnancies: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Abortos:
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 0"
                  value={history.gynecologicalHistory?.abortions || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      gynecologicalHistory: {
                        ...prev.gynecologicalHistory,
                        abortions: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Menarca (idade):
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 12"
                  value={history.gynecologicalHistory?.menarche || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      gynecologicalHistory: {
                        ...prev.gynecologicalHistory,
                        menarche: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Menopausa (idade):
                </label>
                <Input
                  type="number"
                  placeholder="Ex: 50"
                  value={history.gynecologicalHistory?.menopause || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      gynecologicalHistory: {
                        ...prev.gynecologicalHistory,
                        menopause: parseInt(e.target.value) || 0,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Ciclo menstrual:
                </label>
                <Input
                  placeholder="Ex: Regular (28/5 dias)"
                  value={history.gynecologicalHistory?.menstrualCycle || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      gynecologicalHistory: {
                        ...prev.gynecologicalHistory,
                        menstrualCycle: e.target.value,
                      },
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="other">
          <AccordionTrigger className="text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 rounded-md">
            <div className="flex items-center gap-2 py-2">
              <Gift className="h-5 w-5 text-blue-600" />
              <span className="text-gray-700 font-medium">
                Outras Informações
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Histórico de internações hospitalares:
                </label>
                <Textarea
                  placeholder="Ex: 2020 - Pneumonia (10 dias)"
                  value={history.hospitalizations?.join("\n") || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      hospitalizations: e.target.value.split("\n"),
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[120px] text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Doenças infectocontagiosas prévias:
                </label>
                <Textarea
                  placeholder="Ex: Dengue (2018), COVID-19 (2021)"
                  value={history.infectiousDiseases?.join("\n") || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      infectiousDiseases: e.target.value.split("\n"),
                    }))
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[120px] text-gray-700 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Exposição ocupacional ou ambiental:
                </label>
                <Input
                  placeholder="Ex: Trabalho com amianto por 5 anos"
                  value={history.occupationalExposure || ""}
                  onChange={(e) =>
                    setHistory((prev) => ({
                      ...prev,
                      occupationalExposure: e.target.value,
                    }))
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
