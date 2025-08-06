import { NextResponse } from "next/server";
import dbConnect from "@/lib/database/connection";
import Guest from "@/lib/database/models/Guest";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const guest = await Guest.findById(params.id).lean();
    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }
    return NextResponse.json(guest);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch guest" },
      { status: 500 }
    );
  }
}
