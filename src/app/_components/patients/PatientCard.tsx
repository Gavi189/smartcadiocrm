"use client";

import { Patient } from "../../_types/patients";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Clock, FileText } from "lucide-react";

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const getStatusClass = (value: string, type: string) => {
    if (type === "bp") {
      const systolic = parseInt(value.split("/")[0]);
      if (systolic >= 140) return "text-red-600";
      if (systolic >= 120) return "text-yellow-600";
      return "text-green-600";
    }

    if (type === "hr") {
      const hr = parseInt(value);
      if (hr > 100) return "text-red-600";
      if (hr < 60) return "text-yellow-600";
      return "text-green-600";
    }

    if (type === "spo2") {
      const spo2 = parseInt(value);
      if (spo2 < 95) return "text-red-600";
      return "text-green-600";
    }

    if (type === "temp") {
      const temp = parseFloat(value);
      if (temp > 37.5) return "text-red-600";
      if (temp < 36.0) return "text-yellow-600";
      return "text-green-600";
    }

    return "text-green-600";
  };

  const getStatusText = (type: string, className: string) => {
    if (className === "text-red-600") return "Elevada";
    if (className === "text-yellow-600") return "Atenção";
    return "Normal";
  };

  const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
      case "Baixo":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Médio":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "Alto":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const vitalSigns = {
    bloodPressure:
      patient.risk === "Alto"
        ? "140/90"
        : patient.risk === "Médio"
        ? "130/85"
        : "120/80",
    heartRate:
      patient.risk === "Alto" ? "88" : patient.risk === "Médio" ? "78" : "68",
    oxygenSaturation: patient.risk === "Alto" ? "97" : "99",
    temperature: patient.risk === "Alto" ? "36.5" : "36.2",
  };

  const diagnosticHypotheses = [
    patient.risk === "Alto"
      ? "Doença Arterial Coronariana"
      : patient.risk === "Médio"
      ? "Hipertensão"
      : "Checkup de rotina",
  ];

  const bpClass = getStatusClass(vitalSigns.bloodPressure, "bp");
  const hrClass = getStatusClass(vitalSigns.heartRate, "hr");
  const spo2Class = getStatusClass(vitalSigns.oxygenSaturation, "spo2");
  const tempClass = getStatusClass(vitalSigns.temperature, "temp");

  return (
    <Card className="w-full mb-4 hover:shadow-md transition-all bg-white border-slate-100">
      <CardContent className="p-0">
        <div className="flex flex-col">
          {/* Patient header */}
          <div className="flex items-center p-4 border-b border-slate-100">
            <Avatar className="h-9 w-9 mr-3">
              <AvatarFallback>{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-base text-blue-700">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {patient.age} anos •{" "}
                    {patient.gender === "M" ? "Masculino" : "Feminino"}
                    {patient.id && ` • Prontuário #${patient.id}`}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 border-slate-200"
                >
                  Ver Histórico Completo
                </Button>
              </div>
            </div>
          </div>

          {/* Vital signs */}
          <div className="grid grid-cols-4 gap-px bg-muted/20">
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Pressão Arterial</span>
                <span className={bpClass}>{getStatusText("bp", bpClass)}</span>
              </p>
              <p className="text-lg font-semibold text-foreground">
                {vitalSigns.bloodPressure}{" "}
                <span className="text-xs font-normal">mmHg</span>
              </p>
            </div>
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Frequência Cardíaca</span>
                <span className={hrClass}>{getStatusText("hr", hrClass)}</span>
              </p>
              <p className="text-lg font-semibold text-foreground">
                {vitalSigns.heartRate}{" "}
                <span className="text-xs font-normal">bpm</span>
              </p>
            </div>
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Saturação O²</span>
                <span className={spo2Class}>
                  {getStatusText("spo2", spo2Class)}
                </span>
              </p>
              <p className="text-lg font-semibold text-foreground">
                {vitalSigns.oxygenSaturation}{" "}
                <span className="text-xs font-normal">%</span>
              </p>
            </div>
            <div className="bg-white p-3">
              <p className="text-xs text-muted-foreground mb-1 flex justify-between">
                <span>Temperatura</span>
                <span className={tempClass}>
                  {getStatusText("temp", tempClass)}
                </span>
              </p>
              <p className="text-lg font-semibold text-foreground">
                {vitalSigns.temperature}{" "}
                <span className="text-xs font-normal">°C</span>
              </p>
            </div>
          </div>

          {/* Diagnostic hypothesis and last visit */}
          <div className="grid grid-cols-2">
            <div className="p-3 border-r border-slate-100">
              <h4 className="text-sm font-medium mb-2 text-foreground">
                Hipótese Diagnóstica
              </h4>
              <div className="space-y-2">
                {diagnosticHypotheses.map((diagnosis, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-800 hover:bg-blue-100"
                    >
                      {diagnosis}
                    </Badge>
                    {patient.risk === "Alto" && index === 0 && (
                      <Badge
                        variant="outline"
                        className="bg-red-100 text-red-800 hover:bg-red-100"
                      >
                        +1
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3">
              <h4 className="text-sm font-medium mb-2 text-foreground">
                Última Consulta
              </h4>
              <div className="text-sm text-muted-foreground">
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="h-3 w-3" />
                  <span>{patient.lastVisit}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>10:30 - Consulta de rotina</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk and actions */}
          <div className="flex justify-between items-center p-3 bg-muted/40">
            <Badge
              variant="secondary"
              className={getRiskBadgeClass(patient.risk)}
            >
              Risco {patient.risk}
            </Badge>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 border-slate-200"
              >
                Prontuário
              </Button>
              <Button
                size="sm"
                className="h-8 bg-cardio-600 hover:bg-cardio-700 text-white"
              >
                Agendar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
