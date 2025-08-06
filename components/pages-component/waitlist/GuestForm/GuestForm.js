"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addGuest } from "@/actions/waitlist.actions";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  partySize: z.number().min(1, "Party size must be at least 1"),
  phone: z.string().optional(),
  isPriority: z.boolean().default(false),
});

export default function GuestForm() {
  const { mutate } = useSWRConfig();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      isPriority: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("partySize", data.partySize.toString());
      if (data.phone) formData.append("phone", data.phone);
      formData.append("isPriority", data.isPriority ? "on" : "");

      await addGuest(formData);
      reset();
      mutate(() => true);
      toast.success("Successfully adding a Guest");
    } catch (error) {
      mutate(() => true);
      toast.error("Something went wrong");
      console.error("Error adding guest:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Add New Guest</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name*
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="partySize"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Party Size*
          </label>
          <input
            id="partySize"
            type="number"
            {...register("partySize", { valueAsNumber: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.partySize && (
            <p className="mt-1 text-sm text-red-600">
              {errors.partySize.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone (Optional)
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="isPriority"
            type="checkbox"
            {...register("isPriority")}
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
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Guest"}
        </button>
      </form>
    </div>
  );
}
