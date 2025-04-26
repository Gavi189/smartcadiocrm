"use client";

import { ActivitySquare, Grid3X3, Heart } from "lucide-react";
import { Button } from "./_components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Cabeçalho */}
      <header className="w-full py-4 px-6 md:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart
            className="h-8 w-8 text-primary"
            fill="none"
            strokeWidth={1.5}
          />
          <h1 className=" text-2xl font-bold">
            <span className="text-gradient-cardio ">SmartCardioCRM</span>
          </h1>
        </div>
        <Link href="/login">
          <Button variant="secondary" className="rounded-md px-6 py-2 text-lg">
            Entrar
          </Button>
        </Link>
      </header>

      {/* Seção Hero */}
      <section className="w-full px-6 md:px-8 py-24 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Transforme o cuidado
          <br />
          cardiológico com IA
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-16">
          Prontuário eletrônico inteligente para clínicas cardiológicas,
          potencializado por inteligência artificial para aprimorar diagnósticos
          e resultados dos pacientes.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button variant="secondary" className="rounded-md px-8 py-3 text-lg">
            Acessar o Sistema
          </Button>
          <Button className="rounded-md px-8 py-3 text-lg">
            Solicitar Demonstração
          </Button>
        </div>
      </section>

      {/* Seção de Recursos */}
      <section className="w-full px-6 md:px-8 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="section-card p-8 rounded-md shadow-xs text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
              <Grid3X3 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Editor Inteligente</h3>
            <p className="text-base text-muted-foreground">
              Editor de evolução médica com sugestões de IA para diagnósticos e
              condutas.
            </p>
          </div>
          <div className="section-card p-8 rounded-md shadow-xs text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
              <ActivitySquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Calculadoras de Risco
            </h3>
            <p className="text-base text-muted-foreground">
              Avaliação precisa do risco cardiovascular com múltiplos modelos.
            </p>
          </div>
          <div className="section-card p-8 rounded-md shadow-xs text-center">
            <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Receituário Inteligente
            </h3>
            <p className="text-base text-muted-foreground">
              Sugestões personalizadas de medicamentos baseadas em diretrizes
              atualizadas.
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="w-full py-6 px-6 md:px-8 text-center text-muted-foreground text-base">
        © 2025 SmartCardioCRM. Todos os direitos reservados.
      </footer>
    </div>
  );
}
