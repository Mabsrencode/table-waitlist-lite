"use client";

import { useEffect, useState } from "react";
import { revertToWaiting } from "@/actions/waitlist.actions";
import toast from "react-hot-toast";

export default function GracePeriodTimer({ calledAt, guestId, guestName }) {
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
          showTimeoutToast();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const showTimeoutToast = () => {
      toast.custom(
        (t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"} 
          max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Grace period ended for {guestName}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Please seat the guest or they will return to waiting list
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={async () => {
                  await seatGuest(guestId);
                  toast.dismiss(t.id);
                }}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Seat Now
              </button>
            </div>
          </div>
        ),
        { id: `grace-${guestId}`, duration: 10000, position: "top-center" }
      );

      setTimeout(async () => {
        const exists = await checkGuestStatus(guestId);
        if (exists && exists.status === "CALLED") {
          await revertToWaiting(guestId);
        }
      }, 10000);
    };

    return () => clearInterval(timer);
  }, [calledAt, guestId, guestName]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <span className="ml-1">
      ({minutes}:{seconds < 10 ? `0${seconds}` : seconds})
    </span>
  );
}

async function checkGuestStatus(guestId) {
  const res = await fetch(`/api/guests/${guestId}`);
  if (!res.ok) return null;
  return res.json();
}

async function seatGuest(guestId) {
  const res = await fetch("/api/guests/seat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ guestId }),
  });
  return res.json();
}
