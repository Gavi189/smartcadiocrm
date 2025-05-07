"use client";

import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import Link from "next/link";

export default function Header() {
  const [notifications] = useState([
    {
      id: 1,
      message: "Nova consulta agendada - Paciente Maria Silva",
      time: "10 min atrás",
    },
    {
      id: 2,
      message: "Resultado de exame disponível - Paciente João Santos",
      time: "30 min atrás",
    },
    { id: 3, message: "Lembrete: Reunião às 15h", time: "1h atrás" },
  ]);

  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-4 bg-white">
      <div className="w-72">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar paciente, agenda..."
            className="w-full pl-8 rounded-full border-blue-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative ">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full "></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 bg-white border-slate-200"
          >
            <div className="p-2 font-medium text-sm border-b ">
              <span className=" text-base">Notificações</span>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="flex flex-col items-start py-3 cursor-pointer"
                >
                  <div className="font-medium text-sm">
                    {notification.message}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {notification.time}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="p-2 text-center text-xs text-muted-foreground border-t">
              <Button variant="link" className="text-xs text-black">
                Ver todas
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="Dra." />
                <AvatarFallback>DRA</AvatarFallback>
              </Avatar>
              <span>Dra. Paula</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border-slate-200"
          >
            <DropdownMenuItem asChild>
              <Link href="/profile">Meu Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/preferences">Preferências</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/">Sair</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
