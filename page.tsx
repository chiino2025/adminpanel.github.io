"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { UserManagement } from "./components/user-management"
import { Settings } from "./components/settings"
import { Button } from "@/components/ui/button"
import { PhoneIcon as WhatsApp, Phone } from 'lucide-react'

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState("listar")

  const renderContent = () => {
    switch (activeSection) {
      case "listar":
      case "crear":
      case "eliminar":
      case "historial":
        return <UserManagement activeTab={activeSection} />
      case "general":
      case "seguridad":
      case "notificaciones":
      case "temas":
        return <Settings activeTab={activeSection} />
      default:
        return <DefaultContent />
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar onSectionChange={setActiveSection} />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6 md:mb-8">
            8 Ball Pool Admin
          </h1>
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

function DefaultContent() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bienvenido al Panel de Administración de 8 Ball Pool</h2>
        <p className="text-gray-600">
          Este panel te permite gestionar usuarios, configurar ajustes y mantener el control de tu aplicación de 8 Ball Pool. 
          Utiliza la barra lateral para navegar entre las diferentes secciones y realizar las tareas necesarias.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Características Principales</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Gestión de usuarios: Añade, elimina y modifica cuentas de usuario.</li>
          <li>Configuración del sistema: Personaliza la experiencia de juego y las opciones de la aplicación.</li>
          <li>Estadísticas en tiempo real: Monitorea el rendimiento y la actividad de los jugadores.</li>
          <li>Soporte técnico: Accede a herramientas para ayudar a los usuarios y resolver problemas.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contacto de Administradores</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Admin Brandon</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => window.open('https://wa.me/5491165703983', '_blank')}>
                <WhatsApp className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open('tel:+5491165703983')}>
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </Button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Admin Steven</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => window.open('https://wa.me/50377470021', '_blank')}>
                <WhatsApp className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open('tel:+50377470021')}>
                <Phone className="mr-2 h-4 w-4" />
                Llamar
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

