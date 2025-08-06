import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connect";
import Guest from "@/lib/models/Guest";

export async function GET() {
  try {
    await dbConnect();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const guests = await Guest.find({
      createdAt: { $gte: today, $lt: tomorrow },
    }).lean();

    const added = guests.length;
    const seated = guests.filter((g) => g.status === "SEATED").length;
    const removed = guests.filter((g) => g.status === "REMOVED").length;

    const seatedGuests = guests.filter((g) => g.status === "SEATED");
    const totalWaitTime = seatedGuests.reduce((sum, guest) => {
      return sum + (new Date(guest.seatedAt) - new Date(guest.createdAt));
    }, 0);
    const avgWait =
      seatedGuests.length > 0
        ? Math.round(totalWaitTime / seatedGuests.length / 60000)
        : 0;

    const removalRate = added > 0 ? Math.round((removed / added) * 100) : 0;

    const partySizeBreakdown = {
      "1-2": guests.filter((g) => g.partySize <= 2).length,
      "3-4": guests.filter((g) => g.partySize >= 3 && g.partySize <= 4).length,
      "5+": guests.filter((g) => g.partySize >= 5).length,
    };

    return NextResponse.json({
      added,
      seated,
      removed,
      avgWait,
      removalRate,
      partySizeBreakdown,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
