"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchAndFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "";
  const currentSearch = searchParams.get("search") || "";
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    const params = new URLSearchParams(searchParams);

    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }

    router.push(`/waitlist?${params.toString()}`);
  };

  const handleStatusChange = (status) => {
    const params = new URLSearchParams(searchParams);

    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.push(`/waitlist?${params.toString()}`);
  };

  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search by name..."
              defaultValue={currentSearch}
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
        </form>

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
