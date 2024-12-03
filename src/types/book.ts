export interface DatabaseBook {
    id: number
    isbn: string
    mota: string
    sotrang: number
    tieude: string
    urlanh: string
    urlfile: string
  }
  
  export interface GoogleBook {
    id: string
    volumeInfo: {
      industryIdentifiers: any
      pageCount: number
      title: string
      authors?: string[]
      description?: string
      imageLinks?: {
        thumbnail: string
      }
      previewLink?: string
    }
    accessInfo: {
      pdf?: {
        isAvailable: boolean
        downloadLink?: string
      }
    }
  }
  
  