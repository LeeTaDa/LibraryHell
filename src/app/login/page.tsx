"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  accessToken: string;
  id: number;
  username: string;
}

interface Role {
  id: number;
  name: string;
}

interface UserData {
  id: number;
  username: string;
  name?: string;
  roles: Role[];
}

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState<{ path: string; shouldRedirect: boolean }>({ 
    path: '', 
    shouldRedirect: false 
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchUserData = async (userId: string, token: string): Promise<UserData> => {
    try {
      const response = await axios.get(`http://localhost:8888/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log('Fetched user data:', response.data);
      return {
        id: response.data.id,
        username: response.data.username,
        name: response.data.name || response.data.username,
        roles: response.data.roles || [],
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (shouldRedirect.shouldRedirect) {
      console.log('Redirecting to:', shouldRedirect.path);
      router.push(shouldRedirect.path);
    }
  }, [shouldRedirect, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setShouldRedirect({ path: '', shouldRedirect: false });

    try {
      console.log('Submitting login form:', formData);
      const response = await axios.post<LoginResponse>('http://localhost:8888/login', formData);
      
      if (response.data && response.data.accessToken) {
        const token = response.data.accessToken;
        const userId = response.data.id.toString();
    
        console.log('Login response:', response.data);
        const userData = await fetchUserData(userId, token);
        
        // Check if user has ROLE_ADMIN in their roles array
        const isAdmin = userData.roles.some(role => role.name === 'ROLE_ADMIN');
        console.log('Is admin:', isAdmin);

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('userRole', isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER');
        
        console.log('Stored user data:', {
          token: token.substring(0, 10) + '...',
          userId,
          username: userData.username,
          roles: userData.roles
        });

        setMessage('Login successful!');
        window.dispatchEvent(new Event('loginStateChanged'));

        // Set redirect path based on admin role
        const redirectPath = isAdmin ? '/admin' : '/';
        console.log('Setting redirect path:', redirectPath);
        
        // Delay the redirect slightly to ensure state updates are complete
        setTimeout(() => {
          setShouldRedirect({ 
            path: redirectPath, 
            shouldRedirect: true 
          });
        }, 100);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'An error occurred during login';
        setMessage(`Login failed: ${errorMessage}`);
        console.error('Login error:', error.response?.data);
      } else {
        setMessage('An unexpected error occurred');
        console.error('Login error:', error);
      }
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            Return to Homepage
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        {message && (
          <p className={`mt-4 text-center ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link href="/signup" className="font-bold text-blue-500 hover:text-blue-800">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

