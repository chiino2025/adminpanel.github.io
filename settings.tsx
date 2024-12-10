"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Settings({ activeTab = "general" }: { activeTab?: string }) {
  const [notifications, setNotifications] = useState(true)
  const [theme, setTheme] = useState("light")
  const [twoFactor, setTwoFactor] = useState(false)
  const { toast } = useToast()

  const saveSettings = () => {
    toast({
      title: "Configuración guardada",
      description: "Tus preferencias han sido actualizadas.",
    })
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
      <Tabs defaultValue={activeTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="temas">Temas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <h2 className="text-2xl font-semibold mb-4">Configuración General</h2>
          {/* Añade aquí las opciones generales */}
        </TabsContent>
        
        <TabsContent value="seguridad">
          <h2 className="text-2xl font-semibold mb-4">Seguridad</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="twoFactor"
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
            <Label htmlFor="twoFactor">Activar autenticación de dos factores</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="notificaciones">
          <h2 className="text-2xl font-semibold mb-4">Notificaciones</h2>
          <div className="flex items-center space-x-2">
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
            <Label htmlFor="notifications">Activar notificaciones</Label>
          </div>
        </TabsContent>
        
        <TabsContent value="temas">
          <h2 className="text-2xl font-semibold mb-4">Tema</h2>
          <RadioGroup value={theme} onValueChange={setTheme} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light">Claro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark">Oscuro</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="system" id="system" />
              <Label htmlFor="system">Sistema</Label>
            </div>
          </RadioGroup>
        </TabsContent>
      </Tabs>
      
      <Button onClick={saveSettings} className="mt-6">Guardar configuración</Button>
    </div>
  )
}

