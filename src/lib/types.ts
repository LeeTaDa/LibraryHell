export interface Book {
    id: number;
    tieude: string;
    mota: string;
    urlanh: string;
    urlfile: string;
  }
  
  export type BookFormData = Omit<Book, 'id'>;