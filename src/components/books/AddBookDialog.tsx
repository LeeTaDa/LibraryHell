"use client";

import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddBookDialog({ onBookAdded }) {
  const [open, setOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    ten_sach: "",
    url_anh: "",
    url_file: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8888/sachs", newBook);
      setNewBook({ ten_sach: "", url_anh: "", url_file: "" });
      setOpen(false);
      if (onBookAdded) onBookAdded();
    } catch (error) {
      console.error("Error adding new book:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Book</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ten_sach">Title</Label>
            <Input
              id="ten_sach"
              name="ten_sach"
              value={newBook.ten_sach}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url_anh">Image URL</Label>
            <Input
              id="url_anh"
              name="url_anh"
              value={newBook.url_anh}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url_file">PDF URL</Label>
            <Input
              id="url_file"
              name="url_file"
              value={newBook.url_file}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Add Book
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}