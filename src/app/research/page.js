'use client'

import { useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function BookReader() {
  const [searchQuery, setSearchQuery] = useState('')
  const [bookData, setBookData] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&filter=free-ebooks&key=AIzaSyAKoKeJxRYcPHaBfDSojVDf_zrRQ5L7dh8`
      )
      setBookData(response.data.items || [])
    } catch (error) {
      console.error("Error fetching books:", error.message)
    }
  }

  const handleReadBook = (book) => {
    setSelectedBook(book)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Reader</h1>
      <div className="flex gap-2 mb-6">
        <Input
          type="text"
          placeholder="Search for books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      {selectedBook ? (
        <div className="mb-6">
          <Button onClick={() => setSelectedBook(null)} className="mb-4">Back to Results</Button>
          <iframe
            src={selectedBook.accessInfo.webReaderLink}
            width="100%"
            height="600px"
            title={selectedBook.volumeInfo.title}
          ></iframe>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookData.map((book) => (
            <Card key={book.id}>
              <CardHeader>
                <CardTitle>{book.volumeInfo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {book.volumeInfo.authors?.join(', ')}
                </p>
                {book.volumeInfo.imageLinks && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className="mb-4 mx-auto"
                  />
                )}
                <Button onClick={() => handleReadBook(book)} className="w-full">
                  Read Book
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}