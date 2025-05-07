"use client";

import { Plus, CalendarClock } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { DiagnosticHypothesis } from "../../_types/patients";

interface PatientInfoProps {
  patient: {
    id: number;
    name: string;
    age: number;
    gender: string;
    cpf: string;
    phone: string;
    email: string;
    address: string;
    insurance: string;
    insuranceNumber: string;
    allergies: string;
    comorbidities: string;
    lastVisit: string;
  };
  diagnosticHypothesis: DiagnosticHypothesis;
  setDiagnosticHypothesis: React.Dispatch<
    React.SetStateAction<DiagnosticHypothesis>
  >;
}

export default function PatientInfo({
  patient,
  diagnosticHypothesis,
  setDiagnosticHypothesis,
}: PatientInfoProps) {
  return (
    <>
      <CardHeader className="p-6 pb-2 bg-white">
        <CardTitle className="flex items-center text-xl font-semibold text-gray-900">
          <div className="h-5 w-5 mr-2" />{" "}
          {/* Placeholder div, assuming an icon might be added */}
          Informações do Paciente
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-4 bg-white">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {patient.name}
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {patient.age} anos, {patient.gender}
              </p>
            </div>
            <div className="text-sm flex items-center text-gray-700">
              <CalendarClock className="h-5 w-5 mr-2 text-blue-600" />
              <span>Última Consulta: {patient.lastVisit}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">CPF:</span>
              <span className="text-gray-700">{patient.cpf}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Telefone:</span>
              <span className="text-gray-700">{patient.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-700 truncate max-w-[200px]">
                {patient.email}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Convênio:</span>
              <span className="text-gray-700">{patient.insurance}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 font-medium">Nº Carteirinha:</span>
              <span className="text-gray-700">{patient.insuranceNumber}</span>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium text-gray-600 mb-1">
              Hipótese Diagnóstica:
            </p>
            <div className="flex flex-col space-y-3">
              <Input
                placeholder="Ex: Angina instável"
                value={diagnosticHypothesis.description}
                onChange={(e) =>
                  setDiagnosticHypothesis((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
              />
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600">
                  CID-10:
                </span>
                <Input
                  className="w-24 p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
                  placeholder="Ex: I20.0"
                  value={diagnosticHypothesis.icdCode}
                  onChange={(e) =>
                    setDiagnosticHypothesis((prev) => ({
                      ...prev,
                      icdCode: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Alergias:</p>
            <p className="text-sm bg-red-50 text-red-800 p-3 rounded-lg">
              {patient.allergies}
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Comorbidades:
            </p>
            <p className="text-sm bg-blue-50 text-blue-800 p-3 rounded-lg">
              {patient.comorbidities}
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full p-2 border border-gray-300 rounded-lg text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-all flex items-center justify-center"
          >
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Ver Detalhes Completos
          </Button>
        </div>
      </CardContent>
    </>
  );
}
