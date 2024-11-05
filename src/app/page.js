"use client";
import React from 'react';
import Navbar from '@/components/NavBar';
import Hero from '@/components/Hero';
import Featured from '@/components/Featured';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}

export default App;