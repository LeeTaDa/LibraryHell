'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const borrowData = [
  { month: "Jan", books: 120 },
  { month: "Feb", books: 150 },
  { month: "Mar", books: 180 },
  { month: "Apr", books: 200 },
  { month: "May", books: 250 },
  { month: "Jun", books: 280 },
]

const downloadData = [
  { month: "Jan", ebooks: 300 },
  { month: "Feb", ebooks: 400 },
  { month: "Mar", ebooks: 500 },
  { month: "Apr", ebooks: 600 },
  { month: "May", ebooks: 700 },
  { month: "Jun", ebooks: 800 },
]

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Books</CardTitle>
          <CardDescription>Number of books in the library</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">5,230</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
          <CardDescription>Users with active borrowings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">1,423</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Books Borrowed</CardTitle>
          <CardDescription>Total borrowed this month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">280</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>E-books Downloaded</CardTitle>
          <CardDescription>Total downloads this month</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">800</p>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Books Borrowed (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={borrowData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="books" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>E-books Downloaded (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={downloadData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="ebooks" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}