import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Table Waitlist Lite</h1>
          <div className="flex space-x-4">
            <Link
              href="/waitlist"
              className={`px-3 py-2 rounded-md ${
                pathname === "/waitlist"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Waitlist
            </Link>
            <Link
              href="/seated"
              className={`px-3 py-2 rounded-md ${
                pathname === "/seated"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Seated
            </Link>
            <Link
              href="/stats"
              className={`px-3 py-2 rounded-md ${
                pathname === "/stats"
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Stats
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
