import { NextResponse } from "next/server";
import dbConnect from "@/lib/database/connection";
import Guest from "@/lib/database/models/Guest";

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const status = searchParams.get("status");

    let query = {};

    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ["WAITING", "CALLED"] };
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const guests = await Guest.find(query)
      .sort({ isPriority: -1, createdAt: 1 })
      .lean();

    return NextResponse.json(guests);
  } catch (error) {
    console.error("Error fetching guests:", error);
    return NextResponse.json(
      { error: "Failed to fetch guests" },
      { status: 500 }
    );
  }
}
