"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/app/_lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  ClipboardList,
  Cog,
  Heart,
  Home,
  LogOut,
  Menu,
  Users,
  FileText,
  FlaskConical,
} from "lucide-react";
import { Button } from "./button";

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  path: string;
  isCollapsed: boolean;
  isActive: boolean;
};

const SidebarItem = ({
  icon: Icon,
  label,
  path,
  isCollapsed,
  isActive,
}: SidebarItemProps) => {
  return (
    <Link href={path}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-2 px-3",
          isActive
            ? "bg-cardio-100 text-cardio-700 font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Icon size={20} />
        {!isCollapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Pacientes", path: "/patients" },
    { icon: ClipboardList, label: "Prontuário", path: "/medical-record" },
    { icon: Heart, label: "Risco Cardíaco", path: "/risk-calculator" },
    { icon: CalendarDays, label: "Agenda", path: "/schedule" },
    { icon: FileText, label: "Receituário", path: "/prescription" },
    { icon: FlaskConical, label: "Exames", path: "/exams" },
    { icon: Cog, label: "Configurações", path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "bg-white h-auto flex flex-col border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="font-bold text-xl text-gradient-cardio flex items-center gap-2">
            <Heart fill="#2563eb" size={24} />
            <span>SmartCardio</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto text-text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-1 px-2 text-blue-700">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isCollapsed={collapsed}
            isActive={pathname === item.path}
          />
        ))}
      </div>

      <div className="mt-auto mb-4 px-2">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 px-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut size={20} />
            {!collapsed && <span>Sair</span>}
          </Button>
        </Link>
      </div>
    </aside>
  );
}
