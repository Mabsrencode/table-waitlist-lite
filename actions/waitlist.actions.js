"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/database/connection";
import Guest from "@/lib/database/models/Guest";

export async function getGuests(search = "", status = "") {
  try {
    await dbConnect();

    let query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ["WAITING", "CALLED"] };
    }

    if (search) {
      query.$text = { $search: search };
    }

    const guests = await Guest.find(query)
      .sort({ isPriority: -1, createdAt: 1 })
      .lean();

    return guests;
  } catch (error) {
    console.error("Error getting guests:", error);
    throw new Error("Failed to fetch guests");
  }
}

export async function addGuest(formData) {
  try {
    await dbConnect();

    const name = formData.get("name");
    const partySize = Number(formData.get("partySize"));
    const phone = formData.get("phone") || "";
    const isPriority = formData.get("isPriority") === "on";

    if (!name || !partySize) {
      throw new Error("Name and party size are required");
    }

    const waitingCount = await Guest.countDocuments({ status: "WAITING" });
    const position = waitingCount + 1;
    const quotedWait = position * 15 + (partySize >= 5 ? 5 : 0);

    const newGuest = new Guest({
      name,
      partySize,
      phone,
      isPriority,
      status: "WAITING",
      quotedWait,
      position,
    });

    await newGuest.save();
    revalidatePath("/waitlist");

    return { success: true, message: "Guest added successfully" };
  } catch (error) {
    console.error("Error adding guest:", error);
    return {
      success: false,
      message: error.message || "Failed to add guest",
    };
  }
}

export async function callGuest(guestId) {
  try {
    await dbConnect();

    if (!guestId) {
      throw new Error("Guest ID is required");
    }

    await Guest.findByIdAndUpdate(guestId, {
      status: "CALLED",
      calledAt: new Date(),
    });

    revalidatePath("/waitlist");
    return { success: true, message: "Guest called successfully" };
  } catch (error) {
    console.error("Error calling guest:", error);
    return {
      success: false,
      message: error.message || "Failed to call guest",
    };
  }
}

export async function seatGuest(guestId) {
  try {
    await dbConnect();

    if (!guestId) {
      throw new Error("Guest ID is required");
    }

    await Guest.findByIdAndUpdate(guestId, {
      status: "SEATED",
      seatedAt: new Date(),
    });

    revalidatePath("/waitlist");
    revalidatePath("/seated");
    return { success: true, message: "Guest seated successfully" };
  } catch (error) {
    console.error("Error seating guest:", error);
    return {
      success: false,
      message: error.message || "Failed to seat guest",
    };
  }
}

export async function removeGuest(guestId) {
  try {
    await dbConnect();

    if (!guestId) {
      throw new Error("Guest ID is required");
    }

    await Guest.findByIdAndUpdate(guestId, {
      status: "REMOVED",
    });

    revalidatePath("/waitlist");
    return { success: true, message: "Guest removed successfully" };
  } catch (error) {
    console.error("Error removing guest:", error);
    return {
      success: false,
      message: error.message || "Failed to remove guest",
    };
  }
}
