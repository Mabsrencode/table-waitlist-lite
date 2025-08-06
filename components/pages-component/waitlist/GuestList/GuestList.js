"use client";

import React from "react";
import useSWR from "swr";
import { callGuest, seatGuest, removeGuest } from "@/actions/waitlist.actions";
import GracePeriodTimer from "../GracePeriodTimer/GracePeriodTimer";
import LoadingSkeleton from "@/components/reusable/LoadingSkeleton/LoadingSkeleton";
import { fetcher } from "@/hooks/useFetch";
const GuestList = ({ searchParams }) => {
  const { search, status } = searchParams;
  const {
    data: guests,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `/api/guests?search=${search || ""}&status=${status || ""}`,
    fetcher,
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );
  const handleAction = async (action, guestId) => {
    try {
      const updatedGuests = guests.map((guest) => {
        if (guest._id === guestId) {
          if (action === "call")
            return { ...guest, status: "CALLED", calledAt: new Date() };
          if (action === "seat")
            return { ...guest, status: "SEATED", seatedAt: new Date() };
          if (action === "remove") return { ...guest, status: "REMOVED" };
        }
        return guest;
      });

      mutate(updatedGuests, false);
      if (action === "call") await callGuest(guestId);
      else if (action === "seat") await seatGuest(guestId);
      else if (action === "remove") await removeGuest(guestId);

      mutate();
    } catch (error) {
      console.error("Error performing action:", error);
      mutate(guests);
    }
  };
  const tableHeaders = ["Name", "Party", "Wait Time", "Status", "Actions"];
  if (error)
    return (
      <div className="text-center text-gray-500 py-4 text-2xl">
        Failed to load guests
      </div>
    );
  if (isLoading) return <LoadingSkeleton />;
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableHeaders.map((e, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {e}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {guests &&
              guests.length > 0 &&
              guests.map((guest) => (
                <tr key={guest._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {guest.name}
                        </div>
                        {guest.phone && (
                          <div className="text-sm text-gray-500">
                            {guest.phone}
                          </div>
                        )}
                      </div>
                      {guest.isPriority && (
                        <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Priority
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {guest.partySize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {guest.quotedWait} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        guest.status === "WAITING"
                          ? "bg-blue-100 text-blue-800"
                          : guest.status === "CALLED"
                          ? "bg-purple-100 text-purple-800"
                          : guest.status === "SEATED"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {guest.status}
                      {guest.status === "CALLED" && guest.calledAt && (
                        <GracePeriodTimer
                          calledAt={guest.calledAt}
                          guestId={guest._id}
                          guestName={guest.name}
                        />
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {guest.status === "WAITING" && (
                      <button
                        onClick={() => handleAction("call", guest._id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        Call
                      </button>
                    )}
                    {guest.status === "CALLED" && (
                      <button
                        onClick={() => handleAction("seat", guest._id)}
                        className="text-green-600 hover:text-green-900 mr-3"
                      >
                        Seat
                      </button>
                    )}
                    <button
                      onClick={() => handleAction("remove", guest._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!guests.length > 0 && (
          <div className="text-center text-gray-500 py-4 text-2xl">
            <p>No guests yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestList;
