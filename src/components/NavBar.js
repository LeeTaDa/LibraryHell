"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    setUsername('');
    router.push('/');
  };

  return (
    <div className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold cursor-pointer">
          Library Website
        </Link>
        <div className="flex items-center">
          <ul className="flex items-center space-x-4 mr-6">
            <li>
              <Link href="/collections" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/research" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Research
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                About
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                Admin
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">{username}</span>
                <img
                  src={`https://ui-avatars.com/api/?name=${username}&background=random`}
                  alt="User avatar"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                  Login
                </Link>
                <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
