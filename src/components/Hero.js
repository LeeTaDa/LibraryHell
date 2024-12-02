"use client"
import React from 'react';

function Hero() {
  return (
    <section className="text-white py-12 bg-cover bg-center" style={{ backgroundImage: 'url(/imgs/library.jpg)', backgroundSize: 'cover' }}>
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Chào mừng đến với thư viện Đại học Giao Thông Vận Tải
        </h1>
        <p className="text-lg mb-8">
          Khám phá bộ sưu tập và kho sách của chúng tôi.
        </p>
      </div>
    </section>
  );
}

export default Hero;