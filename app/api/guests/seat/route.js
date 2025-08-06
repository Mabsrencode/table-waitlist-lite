import { NextResponse } from "next/server";
import dbConnect from "@/lib/database/connection";
import Guest from "@/lib/database/models/Guest";

export async function POST(request) {
  try {
    await dbConnect();
    const { guestId } = await request.json();

    const guest = await Guest.findByIdAndUpdate(guestId, {
      status: "SEATED",
      seatedAt: new Date(),
    });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to seat guest" },
      { status: 500 }
    );
  }
}
