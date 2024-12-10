"use client"

import { useState } from "react"
import { ChevronDown, Users, Settings, HelpCircle, Menu } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

export function Sidebar({ onSectionChange }: { onSectionChange: (section: string) => void }) {
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (menu: string) => {
    setOpenMenus((prevMenus) =>
      prevMenus.includes(menu)
        ? prevMenus.filter((item) => item !== menu)
        : [...prevMenus, menu]
    )
  }

  const MenuItem = ({ icon: Icon, label, subItems }: { icon: any; label: string; subItems?: string[] }) => (
    <div className="relative">
      <button
        className="flex items-center p-2 w-full text-sm md:text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100"
        onClick={() => {
          toggleMenu(label)
          if (subItems) {
            onSectionChange(subItems[0].toLowerCase())
          } else {
            onSectionChange(label.toLowerCase())
          }
        }}
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-500 transition duration-75" />
        <span className="ml-3">{label}</span>
        {subItems && (
          <ChevronDown
            className={cn(
              "w-4 h-4 md:w-5 md:h-5 ml-auto transition-transform duration-200",
              openMenus.includes(label) ? "transform rotate-180" : ""
            )}
          />
        )}
      </button>
      {subItems && openMenus.includes(label) && (
        <ul className="py-2 space-y-1 pl-11">
          {subItems.map((subItem) => (
            <li key={subItem}>
              <button
                className="flex items-center p-2 w-full text-sm font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                onClick={() => onSectionChange(subItem.toLowerCase())}
              >
                {subItem}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-center md:justify-start mb-5 p-2">
        <span className="self-center text-xl font-semibold whitespace-nowrap">YoSoyChino Studio</span>
      </div>
      <ul className="space-y-2">
        <MenuItem icon={Users} label="Usuarios" subItems={["Listar", "Crear", "Eliminar", "Historial"]} />
        <MenuItem icon={Settings} label="Configuración" subItems={["General", "Seguridad", "Notificaciones", "Temas"]} />
        <MenuItem icon={HelpCircle} label="Ayuda" subItems={["FAQ", "Soporte", "Tutoriales"]} />
      </ul>
    </>
  )

  return (
    <>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded h-full">
          <SidebarContent />
        </div>
      </aside>
    </>
  )
}

