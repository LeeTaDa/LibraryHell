"use client";

import axios from "axios";
import React, { useState, useRef } from "react";
import { Search } from "react-feather";

const API_URL = "http://localhost:8888/phieumons";
const SACH_API_URL = "http://localhost:8888/sachs";

const App = () => {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBookSelector, setShowBookSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    id: "",
    ma_phieu: "",
    ngay_muon: "",
    so_sachmuon: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const [endDate, setEndDate] = useState("");
  const [phieuMuonRecords, setPhieuMuonRecords] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [phieuMuonRes, sachRes] = await Promise.all([
        axios.get(API_URL),
        axios.get(SACH_API_URL),
      ]);

      setPhieuMuonRecords(phieuMuonRes.data);
      const formattedBooks = sachRes.data.map((book) => ({
        id: book.id,
        tieude: book.ten_sach,
        isbn: book.isbn,
        mota: book.mota,
      }));
      setBooks(formattedBooks);
      setFilteredBooks(formattedBooks);
    } catch (error) {
      setError("Failed to fetch data. Please try again later.");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedBooks.length !== form.so_sachmuon) {
      alert(
        "The number of selected books must match the number of books to borrow!"
      );
      return;
    }

    try {
      const method = isEditing ? "put" : "post";
      const url = isEditing ? `${API_URL}/${form.id}` : API_URL;
      await axios[method](url, {
        ...form,
        selectedBooks: selectedBooks.map((book) => book.id),
      });

      fetchData();
      resetForm();
      setPhieuMuonRecords(await (await axios.get(API_URL)).data);
    } catch (error) {
      setError("Failed to submit data. Please try again later.");
      console.error(error);
    }
  };

  const handleBookSelect = (book) => {
    setSelectedBooks([...selectedBooks, book]);
    setForm({ ...form, so_sachmuon: selectedBooks.length + 1 });
    setShowBookSelector(false);
  };

  const handleRemoveBook = (bookId) => {
    const updatedBooks = selectedBooks.filter((book) => book.id !== bookId);
    setSelectedBooks(updatedBooks);
    setForm({ ...form, so_sachmuon: updatedBooks.length });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "ngay_muon") {
      const selectedDate = new Date(value);
      const calculatedEndDate = new Date(selectedDate);
      calculatedEndDate.setDate(calculatedEndDate.getDate() + 14);
      setEndDate(calculatedEndDate.toISOString().split("T")[0]);
    }
  };

  const resetForm = () => {
    setForm({
      id: "",
      ma_phieu: "",
      ngay_muon: "",
      so_sachmuon: 0,
    });
    setSelectedBooks([]);
    formRef.current.reset();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    const filtered = books.filter((book) =>
      book.tieude.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [searchQuery, books]);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Phiếu Mượn Sách</h1>

      {error && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>
      )}

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="ma_phieu"
          >
            Mã Phiếu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
            id="ma_phieu"
            type="text"
            name="ma_phieu"
            value={phieuMuonRecords.length + 1}
            readOnly
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="ngay_muon"
          >
            Ngày Mượn
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="ngay_muon"
            type="date"
            name="ngay_muon"
            value={form.ngay_muon}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="end_date"
          >
            Hạn Trả
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="end_date"
            type="date"
            name="end_date"
            value={endDate}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="so_sachmuon"
          >
            Số Sách Mượn
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="so_sachmuon"
            type="number"
            name="so_sachmuon"
            value={form.so_sachmuon}
            onChange={handleInputChange}
            required
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
                <div
                  key={book.id}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded"
                >
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

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditing ? "Cập nhật" : "Thêm"}
        </button>
      </form>

      {/* Phieu Muon Records Display */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Danh sách Phiếu Mượn</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phieuMuonRecords.map((record) => (
              <div key={record.id} className="border rounded p-4 shadow">
                <p><strong>Mã Phiếu:</strong> {record.ma_phieu}</p>
                <p><strong>Ngày Mượn:</strong> {new Date(record.ngay_muon).toLocaleDateString()}</p>
                <p><strong>Số Sách Mượn:</strong> {record.so_sachmuon}</p>
              </div>
            ))}
          </div>
        )}
      </div>

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
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <button
              onClick={() => setShowBookSelector(false)}
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            >
              Đóng
            </button>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

