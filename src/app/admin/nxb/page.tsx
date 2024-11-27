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

interface NXB {
  id: number;
  ten_nxb: string;
}

export default function NXBManagement() {
  const [nxbs, setNXBs] = useState<NXB[]>([]);
  const [newNXB, setNewNXB] = useState({ ten_nxb: "" });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/nxb")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setNXBs(data))
      .catch((error) => setError(error.message));
  }, []);

  const addNXB = () => {
    fetch("http://localhost:8080/nxb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNXB),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setNXBs([...nxbs, data]);
        setNewNXB({ ten_nxb: "" });
      })
      .catch((error) => setError(error.message));
  };

  const deleteNXB = (id: number) => {
    fetch(`http://localhost:8080/nxb/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setNXBs(nxbs.filter((nxb) => nxb.id !== id));
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">NXB Management</h1>
      {error && <p className="text-red-500">{error}</p>}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New NXB</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New NXB</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Ten NXB"
              value={newNXB.ten_nxb}
              onChange={(e) =>
                setNewNXB({ ...newNXB, ten_nxb: e.target.value })
              }
            />
            <Button onClick={addNXB}>Add NXB</Button>
          </div>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Ten NXB</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {nxbs.map((nxb) => (
            <TableRow key={nxb.id}>
              <TableCell>{nxb.id}</TableCell>
              <TableCell>{nxb.ten_nxb}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => deleteNXB(nxb.id)}>
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
