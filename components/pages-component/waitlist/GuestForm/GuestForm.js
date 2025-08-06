"use client";

import { useFormState } from "react-dom";
import { addGuest } from "@/actions/waitlist.actions";

const initialState = {
  message: null,
};

export default function GuestForm() {
  const [state, formAction] = useFormState(addGuest, initialState);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Add New Guest</h2>
      <form action={formAction}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="partySize"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Party Size*
          </label>
          <input
            type="number"
            id="partySize"
            name="partySize"
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="isPriority"
            name="isPriority"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="isPriority"
            className="ml-2 block text-sm text-gray-700"
          >
            Priority Seating
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
        >
          Add Guest
        </button>

        {state.message && (
          <p className="mt-2 text-sm text-red-600">{state.message}</p>
        )}
      </form>
    </div>
  );
}
