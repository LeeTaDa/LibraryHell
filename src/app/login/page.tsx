"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  accessToken: string;
  id: number;
  username: string;
  role: string;
}

interface UserData {
  id: number;
  username: string;
  name?: string;
  role: string;
}

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
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

      return {
        id: response.data.id,
        username: response.data.username,
        name: response.data.name || response.data.username,
        role: response.data.role,
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post<LoginResponse>('http://localhost:8888/login', formData);
      
      if (response.data && response.data.accessToken) {
        const token = response.data.accessToken;
        const userId = response.data.id.toString();
        
        // Fetch user data
        const userData = await fetchUserData(userId, token);

        // Store all necessary data in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', userData.username);
        localStorage.setItem('userRole', userData.role);
        
        console.log('Stored user data:', userData);

        setMessage('Login successful!');
        
        // Trigger a custom event to notify NavBar
        window.dispatchEvent(new Event('loginStateChanged'));
        
        // Authorize based on role
        if (userData.role === 'ROLE_ADMIN') {
          router.push('/admin');
        } else {
          router.push('/');
        }
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

  // ... rest of the component remains the same
}

export default Login;

