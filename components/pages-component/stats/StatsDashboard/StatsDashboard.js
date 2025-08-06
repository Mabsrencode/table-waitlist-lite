"use client";

import MainLoader from "@/components/reusable/MainLoader/MainLoader";
import { fetcher } from "@/hooks/useFetch";
import useSWR from "swr";

export default function StatsDashboard() {
  const {
    data: stats,
    error,
    isLoading,
  } = useSWR("/api/stats", fetcher, {
    refreshInterval: 60000,
  });

  if (error)
    return (
      <div className="text-center text-gray-500 py-4 text-2xl">
        Failed to load statistics
      </div>
    );
  if (isLoading) return <MainLoader />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Total Added</h3>
          <p className="text-3xl font-bold mt-2">{stats.added}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Seated</h3>
          <p className="text-3xl font-bold mt-2">{stats.seated}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Removed</h3>
          <p className="text-3xl font-bold mt-2">{stats.removed}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">Removal Rate</h3>
          <p className="text-3xl font-bold mt-2">{stats.removalRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">
            Average Wait Time
          </h3>
          <p className="text-3xl font-bold mt-2">{stats.avgWait} minutes</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900">
            Party Size Breakdown
          </h3>
          <div className="mt-4 flex justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {stats.partySizeBreakdown["1-2"]}
              </p>
              <p className="text-sm text-gray-500">1-2 people</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {stats.partySizeBreakdown["3-4"]}
              </p>
              <p className="text-sm text-gray-500">3-4 people</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {stats.partySizeBreakdown["5+"]}
              </p>
              <p className="text-sm text-gray-500">5+ people</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
