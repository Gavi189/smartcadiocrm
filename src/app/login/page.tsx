"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "../_components/ui/button";
import { Input } from "../_components/ui/input";
import { Label } from "../_components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (email === "demo@smartcardio.com" && password === "123456") {
        router.push("/dashboard");
      } else {
        alert("E-mail ou senha inválidos");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="p-8 bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <Heart
            className="h-12 w-12 text-cardio-600"
            fill="#0077ff"
            strokeWidth={1.5}
          />
          <h1 className="text-gradient-cardio text-3xl font-bold text-gradient-cardio mt-4">
            SmartCardioCRM
          </h1>
          <p className="text-muted-foreground mt-2 text-center">
            Prontuário eletrônico inteligente para cardiologistas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="border-blue-300"
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
              placeholder="******"
              className="border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right">
            <Link href="/recover-password">
              <Button
                variant="link"
                className="border-none underline-offset-4 hover:underline"
              >
                Esqueci minha senha
              </Button>
            </Link>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-center mt-4">
            <span className="text-muted-foreground">Não tem uma conta?</span>{" "}
            <Link href="/register">
              <Button
                variant="link"
                className="border-none underline-offset-4 hover:underline"
              >
                Registre-se
              </Button>
            </Link>
          </div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Demo: demo@smartcardio.com / 123456</p>
          </div>
        </form>
      </div>
    </div>
  );
}
