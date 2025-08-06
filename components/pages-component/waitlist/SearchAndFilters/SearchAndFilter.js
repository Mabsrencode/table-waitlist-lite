"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchAndFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "";
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedValue, setDebouncedValue] = useState(searchValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedValue) {
      params.set("search", debouncedValue);
    } else {
      params.delete("search");
    }

    router.push(`/waitlist?${params.toString()}`);
  }, [debouncedValue, router, searchParams]);

  const handleStatusChange = (status) => {
    const params = new URLSearchParams(searchParams);

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    if (searchValue) {
      params.set("search", searchValue);
    }

    router.push(`/waitlist?${params.toString()}`);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search by name..."
              value={searchValue}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handleStatusChange("")}
            className={`px-3 py-1 text-sm rounded ${
              !currentStatus
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleStatusChange("WAITING")}
            className={`px-3 py-1 text-sm rounded ${
              currentStatus === "WAITING"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Waiting
          </button>
          <button
            onClick={() => handleStatusChange("CALLED")}
            className={`px-3 py-1 text-sm rounded ${
              currentStatus === "CALLED"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Called
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
