'use client';

import { useState, useEffect } from 'react';
import { PhieuTra, PhieuMuon } from '../../../types/type';

const PHIEU_TRA_API_URL = 'http://localhost:8888/phieutras';
const PHIEU_MUON_API_URL = 'http://localhost:8888/phieumons';

export default function PhieuTraPage() {
  const [data, setData] = useState<PhieuTra[]>([]);
  const [phieuMuonList, setPhieuMuonList] = useState<PhieuMuon[]>([]);
  const [form, setForm] = useState<PhieuTra>({
    phieumuon_id: 0,
    ngay_tra: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [phieuTraRes, phieuMuonRes] = await Promise.all([
        fetch(PHIEU_TRA_API_URL),
        fetch(PHIEU_MUON_API_URL)
      ]);
      
      if (!phieuTraRes.ok || !phieuMuonRes.ok) throw new Error('HTTP error!');
      
      const [phieuTraData, phieuMuonData] = await Promise.all([
        phieuTraRes.json(),
        phieuMuonRes.json()
      ]);
      
      setData(phieuTraData);
      setPhieuMuonList(phieuMuonData);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'phieumuon_id' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? `${PHIEU_TRA_API_URL}/${form.id}` : PHIEU_TRA_API_URL;
    const method = isEditing ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      if (!response.ok) throw new Error('Failed to submit data');
      
      fetchData();
      setForm({ phieumuon_id: 0, ngay_tra: '' });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${PHIEU_TRA_API_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete data');
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (item: PhieuTra) => {
    setForm(item);
    setIsEditing(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Quản lý Phiếu Trả</h1>

      <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="phieumuon_id" className="block text-gray-700 text-sm font-bold mb-2">
            Phiếu Mượn ID
          </label>
          <select
            id="phieumuon_id"
            name="phieumuon_id"
            value={form.phieumuon_id}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Chọn Phiếu Mượn</option>
            {phieuMuonList.map((phieuMuon) => (
              <option key={phieuMuon.id} value={phieuMuon.id}>
                {`ID: ${phieuMuon.id} - Ngày mượn: ${phieuMuon.ngay_muon}`}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="ngay_tra" className="block text-gray-700 text-sm font-bold mb-2">
            Ngày Trả
          </label>
          <input
            type="date"
            id="ngay_tra"
            name="ngay_tra"
            value={form.ngay_tra}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Cập Nhật' : 'Thêm'}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Phiếu Mượn ID</th>
              <th className="border border-gray-300 px-4 py-2">Ngày Trả</th>
              <th className="border border-gray-300 px-4 py-2">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.phieumuon_id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.ngay_tra}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
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

