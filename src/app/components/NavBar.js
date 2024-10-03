import React from 'react';
import Link  from 'next/link';

function Navbar() {
  return (
    <div className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Library Website
        </Link>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/collections" className="text-gray-600 hover:text-gray-900">
              Collections
            </Link>
          </li>
          <li>
            <Link href="/research" className="text-gray-600 hover:text-gray-900">
              Research
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;