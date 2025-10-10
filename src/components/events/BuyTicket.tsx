import Countdown from "react-countdown";
import Button from "../../ult/button/Button";

const BuyTicket = () => {
  const targetDate = new Date("2026-12-25T08:00:00");

  return (
    <div className="mt-8 bg-gray-900 text-white p-6 flex flex-col md:flex-row items-center justify-between">
      <Countdown
        date={targetDate}
        renderer={({ hours, minutes, seconds, completed }) => {
          if (completed) {
            return <span className="text-yellow-400 font-semibold">Event Started!</span>;
          } else {
            return (
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{hours}</div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{minutes}</div>
                  <div className="text-xs text-gray-400">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">{seconds}</div>
                  <div className="text-xs text-gray-400">Seconds</div>
                </div>
              </div>
            );
          }
        }}
      />

      <div className="mt-4 md:mt-0">
        <Button
            onClick={() => alert("Ticket booking coming soon!")}
            className="bg-zinc-100 hover:bg-zinc-300 text-zinc-800 hover:text-teal-600"
          >
           Buy Tickets
          </Button>
       
      </div>
    </div>
  );
};

export default BuyTicket;
