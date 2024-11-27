"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserData {
  id: number;
  username: string;
  name?: string;
  role: string;
}

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');
    
    console.log('Checking login status:', { token: !!token, userId, username, userRole });
    
    if (token && userId && username && userRole) {
      setIsLoggedIn(true);
      setUserData({
        id: parseInt(userId),
        username,
        name: username,
        role: userRole,
      });
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    
    window.addEventListener('loginStateChanged', checkLoginStatus);
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('loginStateChanged', checkLoginStatus);
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserData(null);
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
            <li>
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                Admin
              </Link>
            </li>
          </ul>
          <div className="flex items-center space-x-4">
            {isLoggedIn && userData ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${userData.name || userData.username}&background=random`}
                      alt="User avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-gray-600">{userData.name || userData.username}</span>
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuItem onSelect={() => router.push('/user-dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login" className="text-gray-600 hover:text-gray-900">
                  Login
                </Link>
                <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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

