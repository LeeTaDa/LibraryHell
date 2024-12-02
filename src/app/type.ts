export interface PhieuMuon {
  id?: number;
  ngay_muon: string;
  so_sachmuon: number;
  thoi_han: number;
}

export interface Sach {
  id: number;
  isbn: string;
  tieude: string;
  mota: string;
  sotrang: number;
  urlanh: string;
  urlfile: string;
}

export interface SelectedBook {
  id: number;
  tieude: string;
}

export interface PhieuTra {
  id?: number;
  phieumuon_id: number;
  ngay_tra: string;
}
