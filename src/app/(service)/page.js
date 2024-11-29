import React from "react";
import Layout from "../layout";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      <Featured />
      <Footer />
    </div>
  );
}

export default App;
