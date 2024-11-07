'use client'

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export default function BookReader() {
  const [searchQuery, setSearchQuery] = useState("")
  const [bookData, setBookData] = useState([])
  const [category, setCategory] = useState("")
  const searchParams = useSearchParams()

  useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setCategory(categoryParam)
      setSearchQuery(categoryParam)
      handleSearch(categoryParam)
    }
  }, [searchParams])

  const handleSearch = async (query = searchQuery) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&filter=free-ebooks&key=API_KEY`
      );
      setBookData(response.data.items || []);
    } catch (error) {
      console.error("Error fetching books:", error.message)
    }
  }

  const handleReadBook = (book) => {
    const previewLink = book.volumeInfo.previewLink
    if (previewLink) {
      window.open(previewLink, "_blank")
    }
  }

  return (
    <>
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
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-grow"
          />
          <Button onClick={() => handleSearch()}>Search</Button>
        </div>
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
                  {book.volumeInfo.previewLink ? (
                    <Button
                      onClick={() => handleReadBook(book)}
                      className="w-full"
                    >
                      Read Book <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button disabled className="w-full">
                      Preview Not Available
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}