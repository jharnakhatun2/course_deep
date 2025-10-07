import { useEffect, useState } from "react";

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

const formatTwo = (n: number) => String(n).padStart(2, "0");

const BuyTicket = () => {
  const targetDate = new Date("2017-03-01T08:00:00");

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function update() {
      const now = new Date();
      const diff = Math.max(0, targetDate.getTime() - now.getTime());
      const seconds = Math.floor(diff / 1000);
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = Math.floor(seconds % 60);
      setTimeLeft({ hours: hrs, minutes: mins, seconds: secs });
    }

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="mt-8 bg-gray-900 text-white p-6 rounded-md flex flex-col md:flex-row items-center justify-between">
      <div className="flex gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {formatTwo(timeLeft.hours)}
          </div>
          <div className="text-xs text-gray-400">Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {formatTwo(timeLeft.minutes)}
          </div>
          <div className="text-xs text-gray-400">Minutes</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {formatTwo(timeLeft.seconds)}
          </div>
          <div className="text-xs text-gray-400">Seconds</div>
        </div>
      </div>

      <div className="mt-4 md:mt-0">
        <button className="bg-white text-gray-900 px-4 py-2 rounded shadow hover:opacity-90">
          Buy Tickets
        </button>
      </div>
    </div>
  );
};

export default BuyTicket;
