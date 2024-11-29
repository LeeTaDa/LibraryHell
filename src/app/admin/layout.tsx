"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Sidebar } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ id: number; username: string; name?: string; role: string } | null>(null);
  const router = useRouter();

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-4">
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
            <div className="text-gray-600">Not logged in</div>
          )}
        </div>
        
        {children}
      </main>
    </div>
  );
}
