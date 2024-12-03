import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios'

interface AddBookFormProps {
  onBookAdded: () => void
}

export function AddBookForm({ onBookAdded }: AddBookFormProps) {
  const [title, setTitle] = useState('')
  const [isbn, setIsbn] = useState('')
  const [description, setDescription] = useState('')
  const [pageCount, setPageCount] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://your-api-url/sachs', {
        tieude: title,
        isbn: isbn,
        mota: description,
        sotrang: parseInt(pageCount),
        urlanh: imageUrl,
        urlfile: fileUrl
      })
      
      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Book added successfully",
        })
        onBookAdded()
        // Reset form
        setTitle('')
        setIsbn('')
        setDescription('')
        setPageCount('')
        setImageUrl('')
        setFileUrl('')
      }
    } catch (error) {
      console.error("Error adding book:", error)
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Page Count"
        value={pageCount}
        onChange={(e) => setPageCount(e.target.value)}
        required
      />
      <Input
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Input
        type="url"
        placeholder="File URL"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
      />
      <Button type="submit">Add Book</Button>
    </form>
  )
}

