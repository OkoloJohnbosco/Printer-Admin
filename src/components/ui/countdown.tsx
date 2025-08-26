import { useEffect, useState } from "react";

export default function CountdownTimer({
  duration = 120, // in seconds
  onExpire,
  restartTrigger,
}: {
  duration?: number;
  onExpire?: () => void;
  restartTrigger?: number; // changing this triggers restart
}) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration); // reset timer on trigger change
  }, [restartTrigger, duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) {
        onExpire();
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onExpire]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <span className="text-inherit">
      {minutes}:{seconds}
    </span>
  );
}
