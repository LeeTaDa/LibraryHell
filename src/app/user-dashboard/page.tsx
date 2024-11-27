'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { UserProfile } from "./user-profile"
import { PasswordChangeForm } from "./password-change-form"

interface UserData {
  id: number;
  username: string;
  name?: string;
  email: string;
  enabled: boolean;
  phoneNumber: string | null;
  roles: string[];
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (!token || !userId) {
          console.log('Missing token or userId');
          return;
        }

        const response = await axios.get(`http://localhost:8888/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.data) {
          console.error('No data received from server');
          return;
        }

        // Validate the response data
        const userData = {
          id: Number(response.data.id),
          username: String(response.data.username),
          name: response.data.name ? String(response.data.name) : undefined,
          email: String(response.data.email),
          enabled: Boolean(response.data.enabled),
          phoneNumber: response.data.phoneNumber ? String(response.data.phoneNumber) : null,
          roles: Array.isArray(response.data.roles) ? response.data.roles.map(String) : 
                 (response.data.roles ? [String(response.data.roles)] : []),
        };

        setUserData(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          console.error('Access forbidden - token might be invalid or expired');
          // Handle logout or token refresh here
        }
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">User Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <UserProfile user={userData} />
        <PasswordChangeForm />
      </div>
    </div>
  )
}

