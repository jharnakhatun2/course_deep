type DateCardProps = {
  date: string; // ISO string, e.g. "2025-07-01"
};

const DateCard: React.FC<DateCardProps> = ({ date }) => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
  const year = d.getFullYear();

  return (
    <div className="absolute left-3 top-3 flex flex-col items-center border border-white/30 shadow-lg px-4 py-2 w-16 backdrop-blur-lg bg-white">
      <div className="text-2xl">{day}</div>
      <div className="border-t w-6 my-2" />
      <div className="text-sm font-medium">{month}</div>
      <div className="text-xs text-gray-500">{year}</div>
    </div>
  );
};

export default DateCard;
