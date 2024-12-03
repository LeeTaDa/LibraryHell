// 'use client'

// import { useState, useEffect } from "react"
// import { useSearchParams } from "next/navigation"
// import axios from "axios"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ExternalLink } from 'lucide-react'
// import { useToast } from "@/components/ui/use-toast"

// export default function BookReader() {
//   const [searchQuery, setSearchQuery] = useState("")
//   const [bookData, setBookData] = useState([])
//   const [category, setCategory] = useState("")
//   const searchParams = useSearchParams()
//   const { toast } = useToast()

//   useEffect(() => {
//     const categoryParam = searchParams.get('category')
//     if (categoryParam) {
//       setCategory(categoryParam)
//       setSearchQuery(categoryParam)
//       handleSearch(categoryParam)
//     }
//   }, [searchParams])

//   const handleSearch = async (query = searchQuery) => {
//     try {
//       const response = await axios.get(
//         `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=free-ebooks&maxResults=40&key=AIzaSyAKoKeJxRYcPHaBfDSojVDf_zrRQ5L7dh8`
//       );
//       setBookData(response.data.items || []);
//       console.log(response.data.items);
//     } catch (error) {
//       console.error("Error fetching books:", error.message)
//       toast({
//         title: "Error",
//         description: "Failed to fetch books. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleBookAccess = async (book) => {
//     try {
//       const pdfInfo = book.accessInfo.pdf;

//       if (pdfInfo?.isAvailable) {
//         const downloadLink = pdfInfo.downloadLink;

//         if (downloadLink) {
//           window.open(downloadLink, "_blank");
//           toast({
//             title: "Success",
//             description: "Opening PDF download link. Complete CAPTCHA if prompted.",
//           });
//           return;
//         }
//       }

//       const previewLink = book.volumeInfo.previewLink;
//       if (previewLink) {
//         window.open(previewLink, "_blank");
//         toast({
//           title: "Success",
//           description: "Opening book preview.",
//         });
//         return;
//       }

//       toast({
//         title: "Not Available",
//         description: "PDF or preview is not available for this book.",
//         variant: "destructive",
//       });
//     } catch (error) {
//       console.error("Error accessing book:", error.message);
//       toast({
//         title: "Error",
//         description: "Failed to access the book. Please try again.",
//         variant: "destructive",
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">
//         {category ? `Books in ${category}` : "Book Research"}
//       </h1>
//       <div className="flex gap-2 mb-6">
//         <Input
//           type="text"
//           placeholder="Search for free books..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//           className="flex-grow"
//         />
//         <Button onClick={() => handleSearch()}>Search</Button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {bookData.map((book) => (
//           <Card key={book.id}>
//             <CardHeader>
//               <CardTitle className="line-clamp-2">
//                 {book.volumeInfo.title}
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p className="text-sm text-muted-foreground mb-2">
//                 {book.volumeInfo.authors?.join(", ")}
//               </p>
//               {book.volumeInfo.imageLinks && (
//                 <img
//                   src={book.volumeInfo.imageLinks.thumbnail}
//                   alt={book.volumeInfo.title}
//                   className="mb-4 mx-auto h-48 object-contain"
//                 />
//               )}
//               <div className="space-y-2">
//                 {book.volumeInfo.description && (
//                   <p className="text-sm text-muted-foreground line-clamp-3">
//                     {book.volumeInfo.description}
//                   </p>
//                 )}
//                 <Button
//                   onClick={() => handleBookAccess(book)}
//                   className="w-full"
//                 >
//                   Read Book <ExternalLink className="ml-2 h-4 w-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { DatabaseBook, GoogleBook } from "@/types/book";
import { AddBookForm } from "@/components/AddBookForm";

export default function BookReader() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookData, setBookData] = useState<GoogleBook[]>([]);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
      setSearchQuery(categoryParam);
      handleSearch(categoryParam);
    }
  }, [searchParams]);

  const API_KEY = "AIzaSyAKoKeJxRYcPHaBfDSojVDf_zrRQ5L7dh8";

  const findMatchingGoogleBook = async (
    databaseBook: DatabaseBook
  ): Promise<GoogleBook | null> => {
    try {
      // Search by ISBN first if available
      if (databaseBook.isbn) {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${databaseBook.isbn}&key=${API_KEY}`
        );
        if (response.data.items?.length > 0) {
          return response.data.items[0];
        }
      }

      // If no ISBN match, search by title
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(
          databaseBook.tieude
        )}&key=${API_KEY}`
      );
      if (response.data.items?.length > 0) {
        return response.data.items[0];
      }

      return null;
    } catch (error) {
      console.error("Error finding matching Google Book:", error);
      return null;
    }
  };

  const handleSearch = async (query = searchQuery) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&filter=free-ebooks&maxResults=40&key=${API_KEY}`
      );
      setBookData(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookAccess = async (book: GoogleBook, databaseUrl?: string) => {
    try {
      // Check if there's a URL in the database
      if (databaseUrl) {
        window.open(databaseUrl, "_blank");
        toast({
          title: "Opening Book",
          description:
            "Accessing the book file from your database. Complete CAPTCHA if prompted.",
        });
        return;
      }

      // Check Google Books for a PDF link
      const pdfInfo = book.accessInfo.pdf;
      if (pdfInfo?.isAvailable && pdfInfo.downloadLink) {
        window.open(pdfInfo.downloadLink, "_blank");
        toast({
          title: "Opening PDF",
          description:
            "Downloading the book's PDF file. Complete CAPTCHA if prompted.",
        });
        return;
      }

      // Fall back to preview link
      const previewLink = book.volumeInfo.previewLink;
      if (previewLink) {
        window.open(previewLink, "_blank");
        toast({
          title: "Opening Preview",
          description:
            "Accessing the book preview. Download may require CAPTCHA verification.",
        });
        return;
      }

      // Notify if no links are available
      toast({
        title: "Not Available",
        description:
          "No downloadable file or preview is available for this book.",
        variant: "destructive",
      });
    } catch (error) {
      console.error("Error accessing book:", error);
      toast({
        title: "Error",
        description: "Failed to access the book. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDatabaseBook = async (databaseBook: DatabaseBook) => {
    try {
      // Find matching Google Book
      const googleBook = await findMatchingGoogleBook(databaseBook);

      if (googleBook) {
        // Use database URL for PDF if available
        await handleBookAccess(googleBook, databaseBook.urlfile);
      } else {
        // If no Google Book match, just use database URL
        window.open(databaseBook.urlfile, "_blank");
        toast({
          title: "Success",
          description:
            "Opening PDF from database. Complete CAPTCHA if prompted.",
        });
      }
    } catch (error) {
      console.error("Error handling database book:", error);
      toast({
        title: "Error",
        description: "Failed to access the book. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addBookToDatabase = async (book: GoogleBook) => {
    try {
      const payload = {
        tieude: book.volumeInfo.title,
        isbn:
          book.volumeInfo.industryIdentifiers?.find(
            (id) => id.type === "ISBN_13"
          )?.identifier || "",
        mota: book.volumeInfo.description || "",
        sotrang: book.volumeInfo.pageCount || 0,
        urlanh: book.volumeInfo.imageLinks?.thumbnail || "",
        urlfile:
          book.accessInfo.pdf?.downloadLink ||
          book.volumeInfo.previewLink ||
          "",
      };

      const response = await axios.post("http://localhost:8888/sachs", payload);

      if (response.status === 201) {
        toast({
          title: "Success",
          description: "Book added to your database successfully",
        });
      } else {
        toast({
          title: "Unexpected Response",
          description: `Received status ${response.status}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding book to database:", error);
      toast({
        title: "Error",
        description: "Failed to add book to your database. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBookAdded = () => {
    setShowAddForm(false);
    handleSearch();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        {category ? `Books in ${category}` : "Book Research"}
      </h1>
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search for free books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-grow"
        />
        <Button onClick={() => handleSearch()} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      <div className="mb-6">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "Hide Add Book Form" : "Add New Book"}
        </Button>
      </div>
      {showAddForm && <AddBookForm onBookAdded={handleBookAdded} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookData.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <CardTitle className="line-clamp-2">
                {book.volumeInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {book.volumeInfo.authors?.join(", ")}
              </p>
              {book.volumeInfo.imageLinks && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="mb-4 mx-auto h-48 object-contain"
                />
              )}
              <div className="space-y-2">
                {book.volumeInfo.description && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {book.volumeInfo.description}
                  </p>
                )}
                <Button
                  onClick={() => handleBookAccess(book)}
                  className="w-full mb-2"
                >
                  Read Book <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  onClick={() => addBookToDatabase(book)}
                  className="w-full"
                  variant="outline"
                >
                  Add to Database
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
