"use client";

import { useEffect, useState } from "react";
import { removeGuest } from "@/actions/waitlist.actions";

export default function GracePeriodTimer({ calledAt, guestId }) {
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    if (!calledAt) return;
    const calledTime = new Date(calledAt).getTime();
    const now = new Date().getTime();
    const elapsedSeconds = Math.floor((now - calledTime) / 1000);
    const initialTimeLeft = Math.max(0, 120 - elapsedSeconds);
    setTimeLeft(initialTimeLeft);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          removeGuest(guestId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [calledAt, guestId]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <span className="ml-1">
      ({minutes}:{seconds < 10 ? `0${seconds}` : seconds})
    </span>
  );
}
