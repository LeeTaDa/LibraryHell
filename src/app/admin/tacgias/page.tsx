"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TacGia {
  id: number;
  ten_tacgia: string;
}

export default function TacGiaManagement() {
  const [tacgias, setTacgias] = useState<TacGia[]>([]);
  const [newTacGia, setNewTacGia] = useState({ ten_tacgia: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/tacgias")
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then((data) => setTacgias(data))
      .catch((error) => setError(error.message));
  }, []);

  const addTacGia = () => {
    fetch("http://localhost:8080/tacgias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTacGia),
    })
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then((data) => {
        setTacgias([...tacgias, data]);
        setNewTacGia({ ten_tacgia: "" });
      })
      .catch((error) => setError(error.message));
  };

  const deleteTacGia = (id: number) => {
    fetch(`http://localhost:8080/tacgias/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
        }
        setTacgias(tacgias.filter((tacgia) => tacgia.id !== id));
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">TacGia Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New TacGia</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New TacGia</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Ten TacGia"
              value={newTacGia.ten_tacgia}
              onChange={(e) =>
                setNewTacGia({ ...newTacGia, ten_tacgia: e.target.value })
              }
            />
            <Button onClick={addTacGia}>Add TacGia</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Ten TacGia</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tacgias.map((tacgia) => (
            <TableRow key={tacgia.id}>
              <TableCell>{tacgia.id}</TableCell>
              <TableCell>{tacgia.ten_tacgia}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => deleteTacGia(tacgia.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
