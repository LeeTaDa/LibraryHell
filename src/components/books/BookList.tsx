import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import BookImage from "./BookImage";
import BookPdfLink from "./BookPdfLink";

export default function BookList({ books, onDeleteBook }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Image URL</TableHead>
          <TableHead>PDF Link</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map((book) => (
          <TableRow key={book.id}>
            <TableCell>{book.id}</TableCell>
            <TableCell>{book.ten_sach}</TableCell>
            <TableCell>
              <BookImage src={book.url_anh} alt={book.ten_sach} />
            </TableCell>
            <TableCell>
              <BookPdfLink url={book.url_file} />
            </TableCell>
            <TableCell>
              <Button
                variant="destructive"
                onClick={() => onDeleteBook(book.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}