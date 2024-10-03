import React from 'react';

function Hero() {
  return (
    <section className="bg-blue-500 text-white py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Library Website
        </h1>
        <p className="text-lg mb-8">
          Explore our collections, research resources, and more.
        </p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default Hero;