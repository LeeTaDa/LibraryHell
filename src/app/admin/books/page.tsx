"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import BookList from "@/components/books/BookList";
import AddBookDialog from "@/components/books/AddBookDialog";
import Pagination from "@/components/books/Pagination";

const ITEMS_PER_PAGE = 10;

export default function BooksManagement() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8888/sachs");
      const formattedBooks = response.data.map(book => ({
        id: book.id,
        ten_sach: book.ten_sach,
        url_anh: book.url_anh,
        url_file: book.url_file
      }));
      setBooks(formattedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8888/sachs/${id}`);
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Pagination calculations
  const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBooks = books.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Books Management</h1>
        <AddBookDialog onBookAdded={fetchBooks} />
      </div>
      <BookList 
        books={currentBooks} 
        onDeleteBook={deleteBook}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}