"use client";

import { Card, CardContent } from "../_components/ui/card";
import { patientsData } from "../_data/patients";
import PatientListHeader from "../_components/patients/PatientListHeader";
import PatientCard from "../_components/patients/PatientCard";

export default function PatientsList() {
  return (
    <>
      <PatientListHeader />
      <Card className="card-hover section-card">
        <CardContent className="pt-6">
          <div className="space-y-4">
            {patientsData.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
            {patientsData.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum paciente encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
