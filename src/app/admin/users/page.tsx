'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for users
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Member" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Member" },
]

export default function UsersManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Member' })

  const addUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }])
    setNewUser({ name: '', email: '', role: 'Member' })
  }

  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Users Management</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New User</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <Input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>
            <Button onClick={addUser}>Add User</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteUser(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}