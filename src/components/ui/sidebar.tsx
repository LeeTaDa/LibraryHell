"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart, Book, Users, FileText, Settings, Table, Table2 } from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: BarChart },
  { name: "Books", href: "/admin/books", icon: Book },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Phieu_muon", href: "/admin/phieu_muon", icon: Table},
  { name: "Phieu_tra", href: "/admin/phieu_tra", icon: Table2},
  { name: "Content", href: "/admin/content", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <ul className="space-y-2 py-4">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                pathname === item.href ? "bg-gray-200" : ""
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
