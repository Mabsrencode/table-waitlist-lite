"use server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/database/connection";
import Guest from "@/lib/database/models/Guest";

export async function getGuests(search = "", status = "") {
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

  return Guest.find(query).sort({ isPriority: -1, createdAt: 1 }).lean();
}

export async function addGuest(formData) {
  await dbConnect();

  const name = formData.get("name");
  const partySize = Number(formData.get("partySize"));
  const phone = formData.get("phone") || "";
  const isPriority = formData.get("isPriority") === "on";
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
}
export async function callGuest(guestId) {
  await dbConnect();

  await Guest.findByIdAndUpdate(guestId, {
    status: "CALLED",
    calledAt: new Date(),
  });

  revalidatePath("/waitlist");
}

export async function seatGuest(guestId) {
  await dbConnect();

  await Guest.findByIdAndUpdate(guestId, {
    status: "SEATED",
    seatedAt: new Date(),
  });

  revalidatePath("/waitlist");
  revalidatePath("/seated");
}

export async function removeGuest(guestId) {
  await dbConnect();

  await Guest.findByIdAndUpdate(guestId, {
    status: "REMOVED",
  });

  revalidatePath("/waitlist");
}
