"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "../_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { Input } from "../_components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../_components/ui/select";
import { Textarea } from "../_components/ui/textarea";
import { Card, CardContent } from "../_components/ui/card";

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  age: z.string().min(1, { message: "Idade é obrigatória" }),
  gender: z.string().min(1, { message: "Gênero é obrigatório" }),
  maritalStatus: z.string().min(1, { message: "Estado civil é obrigatório" }),
  birthplace: z.string().min(1, { message: "Naturalidade é obrigatória" }),
  origin: z.string().min(1, { message: "Procedência é obrigatória" }),
  address: z.string().min(1, { message: "Endereço é obrigatório" }),
  homePhone: z.string().optional(),
  cellPhone: z.string().min(1, { message: "Telefone celular é obrigatório" }),
  profession: z.string().min(1, { message: "Profissão é obrigatória" }),
  religion: z.string().optional(),
  susNumber: z.string().optional(),
  rg: z.string().min(1, { message: "RG é obrigatório" }),
  cpf: z.string().min(11, { message: "CPF deve ter 11 dígitos" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function PatientRegister() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      maritalStatus: "",
      birthplace: "",
      origin: "",
      address: "",
      homePhone: "",
      cellPhone: "",
      profession: "",
      religion: "",
      susNumber: "",
      rg: "",
      cpf: "",
    },
  });

  function onSubmit(data: FormValues) {
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Dados do paciente:", data);
      toast.success("Paciente cadastrado com sucesso!");
      setIsSubmitting(false);
      router.push("/patients");
    }, 1000);
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/patients")}
          className="h-8 w-8"
        >
          <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gradient-cardio mb-1">
            Cadastro de Paciente
          </h1>
          <p className="text-muted-foreground">
            Preencha os dados do novo paciente
          </p>
        </div>
      </div>

      <Card className="card-hover section-card bg-white border-slate-100 mt-6">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Nome completo
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome completo do paciente"
                          {...field}
                          className="border-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Idade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          className="border-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">Sexo</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-slate-200">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="M">Masculino</SelectItem>
                          <SelectItem value="F">Feminino</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maritalStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Estado civil
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-slate-200">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                          <SelectItem value="casado">Casado(a)</SelectItem>
                          <SelectItem value="divorciado">
                            Divorciado(a)
                          </SelectItem>
                          <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthplace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Naturalidade
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Cidade/Estado de nascimento"
                          {...field}
                          className="border-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="origin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Procedente
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Local de procedência"
                          {...field}
                          className="border-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="homePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Telefone residencial
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(00) 0000-0000"
                          {...field}
                          className="border-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cellPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Telefone celular
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(00) 00000-0000"
                          {...field}
                          className="border-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Profissão
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="religion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Religião
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="susNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">
                        Nº do SUS
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">RG</FormLabel>
                      <FormControl>
                        <Input {...field} className="border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground">CPF</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="000.000.000-00"
                          {...field}
                          className="border-slate-200"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">
                      Endereço completo
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Rua, número, complemento, bairro, cidade, estado, CEP"
                        className="resize-none border-slate-200"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/patients")}
                  className="border-slate-200"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-cardio-600 hover:bg-cardio-700 text-white"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Salvando..." : "Salvar Paciente"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
