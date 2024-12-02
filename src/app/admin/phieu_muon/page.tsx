'use client';

import { useState, useEffect } from 'react';
import { PhieuMuon, Sach, SelectedBook } from '../../type';
import { Search } from 'lucide-react';

const API_URL = 'http://localhost:8888/phieumons';
const SACH_API_URL = 'http://localhost:8888/sach';

export default function PhieuMuonPage() {
  const [data, setData] = useState<PhieuMuon[]>([]);
  const [books, setBooks] = useState<Sach[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Sach[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<SelectedBook[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState<PhieuMuon>({
    ngay_muon: '',
    so_sachmuon: 0,
    thoi_han: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showBookSelector, setShowBookSelector] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [phieuMuonRes, sachRes] = await Promise.all([
        fetch(API_URL),
        fetch(SACH_API_URL)
      ]);
      
      if (!phieuMuonRes.ok || !sachRes.ok) throw new Error('HTTP error!');
      
      const [phieuMuonData, sachData] = await Promise.all([
        phieuMuonRes.json(),
        sachRes.json()
      ]);
      
      setData(phieuMuonData);
      setBooks(sachData);
      setFilteredBooks(sachData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book => 
      book.tieude.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'so_sachmuon' || name === 'thoi_han' ? parseInt(value) : value });
  };

  const handleBookSelect = (book: Sach) => {
    if (selectedBooks.length < form.so_sachmuon) {
      setSelectedBooks([...selectedBooks, { id: book.id, tieude: book.tieude }]);
    }
  };

  const handleRemoveBook = (bookId: number) => {
    setSelectedBooks(selectedBooks.filter(book => book.id !== bookId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBooks.length !== form.so_sachmuon) {
      alert('Số lượng sách chọn phải bằng số sách mượn!');
      return;
    }

    const url = isEditing ? `${API_URL}/${form.id}` : API_URL;
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          selectedBooks: selectedBooks.map(book => book.id)
        }),
      });
      
      if (!response.ok) throw new Error('Failed to submit data');
      
      fetchData();
      setForm({ ngay_muon: '', so_sachmuon: 0, thoi_han: 0 });
      setSelectedBooks([]);
      setIsEditing(false);
      setShowBookSelector(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete data');
      fetchData(); // Refresh the table
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: PhieuMuon) => {
    setForm(item);
    setIsEditing(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý Phiếu Mượn</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ngày Mượn</label>
          <input
            type="date"
            name="ngay_muon"
            value={form.ngay_muon}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Số Sách Mượn</label>
          <input
            type="number"
            name="so_sachmuon"
            value={form.so_sachmuon}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Thời Hạn (ngày)</label>
          <input
            type="number"
            name="thoi_han"
            value={form.thoi_han}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Book Selection Section */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowBookSelector(!showBookSelector)}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Chọn Sách
          </button>

          {/* Selected Books Display */}
          <div className="mt-4">
            <h3 className="font-bold mb-2">Sách đã chọn:</h3>
            <div className="space-y-2">
              {selectedBooks.map((book) => (
                <div key={book.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{book.tieude}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveBook(book.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Cập Nhật' : 'Thêm'}
        </button>
      </form>

      {/* Book Selector Modal */}
      {showBookSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sách..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border rounded p-2 pl-10"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="border p-4 rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => handleBookSelect(book)}
                >
                  <h3 className="font-bold">{book.tieude}</h3>
                  <p className="text-sm text-gray-600">ISBN: {book.isbn}</p>
                  <p className="text-sm text-gray-600">{book.mota}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowBookSelector(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Ngày Mượn</th>
              <th className="border border-gray-300 px-4 py-2">Số Sách Mượn</th>
              <th className="border border-gray-300 px-4 py-2">Thời Hạn</th>
              <th className="border border-gray-300 px-4 py-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.ngay_muon}</td>
                <td className="border border-gray-300 px-4 py-2">{item.so_sachmuon}</td>
                <td className="border border-gray-300 px-4 py-2">{item.thoi_han}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded">
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(item.id!)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

