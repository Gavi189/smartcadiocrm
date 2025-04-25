"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Substituímos useNavigate por useRouter
import { Heart, ArrowLeft } from "lucide-react";
import { Button } from "../_components/ui/button"; // Ajustado o caminho para consistência
import { Input } from "../_components/ui/input";
import { Label } from "../_components/ui/label";
import { Checkbox } from "../_components/ui/checkbox";
import { useToast } from "../hooks/use-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Senhas não conferem",
        description: "Por favor, verifique se as senhas são idênticas",
        variant: "destructive",
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: "Termos não aceitos",
        description: "É necessário aceitar os termos de uso para continuar",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulando registro
    setTimeout(() => {
      toast({
        title: "Conta criada com sucesso",
        description: "Bem-vindo ao SmartCardioCRM!",
      });
      router.push("/login"); // Redireciona para a página de login após o registro
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 py-10">
      <div className="p-8 bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <Heart
            className="h-12 w-12 text-cardio-600"
            fill="#0077ff"
            strokeWidth={1.5}
          />
          <h1 className="text-3xl font-bold text-gradient-cardio mt-4">
            SmartCardioCRM
          </h1>
          <p className="text-muted-foreground mt-2 text-center">
            Crie sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-1">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <Label htmlFor="terms" className="text-sm font-normal">
              Eu aceito os
              <Button
                variant="secondary"
                size={"sm"}
                className="border-none underline-offset-4 hover:underline"
              >
                termos de uso
              </Button>
              e
              <Button
                variant="secondary"
                size={"sm"}
                className="border-none underline-offset-4 hover:underline"
              >
                política de privacidade
              </Button>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-cardio"
            disabled={isLoading}
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </Button>

          <div className="text-center mt-4">
            <Button
              variant="secondary"
              className="border-none underline-offset-4 hover:underline"
              onClick={() => router.push("/login")} // Ajustado para /login
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
