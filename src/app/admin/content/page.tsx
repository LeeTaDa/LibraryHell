'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for content
const initialContent = [
  { id: 1, title: "New Books Arrival", type: "News", date: "2023-06-01" },
  { id: 2, title: "Summer Reading List", type: "Blog", date: "2023-05-15" },
  { id: 3, title: "Author Meet and Greet", type: "Event", date: "2023-07-10" },
]

export default function ContentManagement() {
  const [content, setContent] = useState(initialContent)
  const [newContent, setNewContent] = useState({ title: '', type: 'News', date: '', body: '' })

  const addContent = () => {
    setContent([...content, { id: content.length + 1, ...newContent }])
    setNewContent({ title: '', type: 'News', date: '', body: '' })
  }

  const deleteContent = (id: number) => {
    setContent(content.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Content Management</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Content</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Title"
              value={newContent.title}
              onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newContent.type}
              onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}
            >
              <option value="News">News</option>
              <option value="Blog">Blog</option>
              <option value="Event">Event</option>
            </select>
            <Input
              type="date"
              value={newContent.date}
              onChange={(e) => setNewContent({ ...newContent, date: e.target.value })}
            />
            <Textarea
              placeholder="Content body"
              value={newContent.body}
              onChange={(e) => setNewContent({ ...newContent, body: e.target.value })}
            />
            <Button onClick={addContent}>Add Content</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {content.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteContent(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}