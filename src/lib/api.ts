import { Book, BookFormData } from './types';

const API_URL = 'http://localhost:8888/sachs';

export async function getBooks(): Promise<Book[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
}

export async function createBook(book: BookFormData): Promise<Book> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to create book');
  return response.json();
}

export async function updateBook(id: number, book: BookFormData): Promise<Book> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!response.ok) throw new Error('Failed to update book');
  return response.json();
}

export async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete book');
}