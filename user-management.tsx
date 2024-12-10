"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type User = {
  id: number
  name: string
  email: string
}

export function UserManagement({ activeTab = "listar" }: { activeTab?: string }) {
  const [users, setUsers] = useState<User[]>([])
  const [deletedUsers, setDeletedUsers] = useState<User[]>([])
  const [newUser, setNewUser] = useState({ name: "", email: "" })
  const { toast } = useToast()

  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    const savedDeletedUsers = localStorage.getItem('deletedUsers')
    if (savedUsers) setUsers(JSON.parse(savedUsers))
    if (savedDeletedUsers) setDeletedUsers(JSON.parse(savedDeletedUsers))
  }, [])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('deletedUsers', JSON.stringify(deletedUsers))
  }, [users, deletedUsers])

  const addUser = () => {
    if (newUser.name && newUser.email) {
      const updatedUsers = [...users, { ...newUser, id: Date.now() }]
      setUsers(updatedUsers)
      setNewUser({ name: "", email: "" })
      toast({
        title: "Usuario creado",
        description: "El usuario ha sido añadido exitosamente.",
      })
    }
  }

  const deleteUser = (id: number) => {
    const userToDelete = users.find(user => user.id === id)
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== id))
      setDeletedUsers([...deletedUsers, userToDelete])
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado exitosamente.",
        variant: "destructive",
      })
    }
  }

  const restoreUser = (id: number) => {
    const userToRestore = deletedUsers.find(user => user.id === id)
    if (userToRestore) {
      setDeletedUsers(deletedUsers.filter((user) => user.id !== id))
      setUsers([...users, userToRestore])
      toast({
        title: "Usuario restaurado",
        description: "El usuario ha sido restaurado exitosamente.",
      })
    }
  }

  return (
    <div className="space-y-4">
      {activeTab === "crear" && (
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Nombre"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <Button onClick={addUser} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Añadir Usuario
          </Button>
        </div>
      )}
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger value="listar">Usuarios Activos</TabsTrigger>
          <TabsTrigger value="eliminar">Usuarios Eliminados</TabsTrigger>
        </TabsList>
        <TabsContent value="listar">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Nombre</TableHead>
                  <TableHead className="w-[40%]">Email</TableHead>
                  <TableHead className="w-[20%]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" className="w-full">
                            <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-2xl font-bold text-center mb-2">Confirmar eliminación</AlertDialogTitle>
                            <AlertDialogDescription className="text-center">
                              ¿Estás seguro de que quieres eliminar a este usuario?
                              <p className="mt-2 font-semibold">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex justify-center space-x-4 mt-4">
                            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200">Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteUser(user.id)} className="bg-red-600 hover:bg-red-700">Eliminar</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="eliminar">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Nombre</TableHead>
                  <TableHead className="w-[40%]">Email</TableHead>
                  <TableHead className="w-[20%]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deletedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button onClick={() => restoreUser(user.id)} size="sm" className="w-full">
                        <RefreshCw className="mr-2 h-4 w-4" /> Restaurar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

