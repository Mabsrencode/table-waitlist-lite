"use client";

import MainLoader from "@/components/reusable/MainLoader/MainLoader";
import { fetcher } from "@/hooks/useFetch";
import useSWR from "swr";

export default function SeatedList() {
  const {
    data: seatedGuests,
    error,
    isLoading,
  } = useSWR("/api/guests?status=SEATED", fetcher);

  if (error)
    return (
      <div className="text-center text-gray-500 py-4 text-2xl">
        Failed to load seated guests
      </div>
    );
  if (isLoading) return <MainLoader />;

  const calculateWaitTime = (createdAt, seatedAt) => {
    const created = new Date(createdAt);
    const seated = new Date(seatedAt);
    return Math.round((seated - created) / 60000);
  };

  return (
    <>
      <h2 className="text-center text-2xl font-semibold">Seated List</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden mt-12">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Party Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seated Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actual Wait
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {seatedGuests.map((guest) => (
                <tr key={guest._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {guest.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {guest.partySize}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(guest.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(guest.seatedAt).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {calculateWaitTime(guest.createdAt, guest.seatedAt)} min
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!seatedGuests.length > 0 && (
          <div className="text-center text-gray-500 py-4 text-2xl">
            <p>No guests yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
