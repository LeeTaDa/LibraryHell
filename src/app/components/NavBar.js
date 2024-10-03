import React from 'react';
import Link  from 'next/link';

function Navbar() {
  return (
    <div className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Library Website
        </Link>
        <div className="flex items-center">
          <ul className="flex items-center space-x-4 mr-6">
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
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;