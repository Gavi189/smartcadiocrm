"use client";

import { useEffect } from "react";
import { Input } from "../ui/input";
import { VitalSigns } from "../../_types/patients";

interface VitalSignsSectionProps {
  vitalSigns: VitalSigns;
  setVitalSigns: React.Dispatch<React.SetStateAction<VitalSigns>>;
}

export default function VitalSignsSection({
  vitalSigns,
  setVitalSigns,
}: VitalSignsSectionProps) {
  useEffect(() => {
    if (vitalSigns.weight && vitalSigns.height) {
      const heightInMeters = vitalSigns.height / 100;
      const bmi = vitalSigns.weight / (heightInMeters * heightInMeters);
      setVitalSigns((prev) => ({ ...prev, bmi: parseFloat(bmi.toFixed(1)) }));
    }
  }, [vitalSigns.weight, vitalSigns.height, setVitalSigns]);

  return (
    <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Sinais Vitais</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Peso (kg)
          </label>
          <Input
            type="number"
            placeholder="Ex: 70.5"
            value={vitalSigns.weight || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                weight: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Altura (cm)
          </label>
          <Input
            type="number"
            placeholder="Ex: 175"
            value={vitalSigns.height || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                height: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            IMC (kg/m²)
          </label>
          <Input
            type="number"
            value={vitalSigns.bmi || ""}
            disabled
            className="w-full p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Circunferência Abdominal (cm)
          </label>
          <Input
            type="number"
            placeholder="Ex: 85"
            value={vitalSigns.waistCircumference || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                waistCircumference: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Frequência Cardíaca (bpm)
          </label>
          <Input
            type="number"
            placeholder="Ex: 72"
            value={vitalSigns.heartRate || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                heartRate: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Frequência Respiratória (irpm)
          </label>
          <Input
            type="number"
            placeholder="Ex: 16"
            value={vitalSigns.respiratoryRate || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                respiratoryRate: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Temperatura Corporal (°C)
          </label>
          <Input
            type="number"
            placeholder="Ex: 36.5"
            value={vitalSigns.temperature || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                temperature: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Pressão Arterial (mmHg)
          </label>
          <Input
            type="text"
            placeholder="Ex: 120/80"
            value={vitalSigns.bloodPressure || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                bloodPressure: e.target.value,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Saturação de O₂ (%)
          </label>
          <Input
            type="number"
            placeholder="Ex: 98"
            value={vitalSigns.oxygenSaturation || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                oxygenSaturation: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Glicemia Capilar (mg/dL)
          </label>
          <Input
            type="number"
            placeholder="Ex: 95"
            value={vitalSigns.bloodGlucose || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                bloodGlucose: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Escala de Dor (0-10)
          </label>
          <Input
            type="number"
            placeholder="Ex: 3"
            min="0"
            max="10"
            value={vitalSigns.painScore || ""}
            onChange={(e) =>
              setVitalSigns((prev) => ({
                ...prev,
                painScore: parseFloat(e.target.value) || undefined,
              }))
            }
            className="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
}
