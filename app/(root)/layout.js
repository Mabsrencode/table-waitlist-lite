"use client";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/common/Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" toastOptions={{ duration: 5000 }} />
      <Navbar />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
