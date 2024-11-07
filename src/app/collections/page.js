"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const backgroundColors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
  "bg-indigo-200",
  "bg-teal-200",
  "bg-orange-200",
];

const textColors = [
  "text-red-800",
  "text-blue-800",
  "text-green-800",
  "text-yellow-800",
  "text-purple-800",
  "text-pink-800",
  "text-indigo-800",
  "text-teal-800",
  "text-orange-800",
];

export default function BookCategories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/books/v1/volumes?q=subject:&maxResults=40"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        const uniqueCategories = [
          ...new Set(
            data.items.flatMap((item) => item.volumeInfo.categories || [])
          ),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCategories = showAll
    ? filteredCategories
    : filteredCategories.slice(0, 6);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  if (loading) {
    return <div className="text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Book Categories</h1>
        <Input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category, index) => (
            <Link
              key={index}
              href={`/research?category=${encodeURIComponent(
                category
              )}&maxResults=30`}
              className="block"
            >
              <Card
                className={`${
                  backgroundColors[index % backgroundColors.length]
                } transition-transform hover:scale-105 cursor-pointer`}
              >
                <CardHeader>
                  <CardTitle
                    className={`${
                      textColors[index % textColors.length]
                    } font-bold`}
                  >
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-sm ${
                      textColors[index % textColors.length]
                    }`}
                  >
                    Explore books in the {category} category
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        {filteredCategories.length > 6 && (
          <div className="mt-6 text-center">
            <Button
              onClick={toggleShowAll}
              variant="link"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {showAll
                ? "Show less categories"
                : `Show all ${filteredCategories.length} categories`}
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
