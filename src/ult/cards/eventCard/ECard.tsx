import type { FC } from "react";
import Button from "../../button/Button";
import type { Event } from "../../types/types";
import { useNavigate } from "react-router";
import { useAuth } from "../../../hook/useAuth";
import Loader from "../../loader/Loader";

interface ECardProps {
  event: Event;
}

const ECard: FC<ECardProps> = ({ event }) => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

   // Function to extract date parts from ISO date string
  const getDateParts = (dateString: string) => {
    const date = new Date(dateString);
    
    return {
      day: date.getDate().toString(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      weekday: date.toLocaleDateString('en-US', { weekday: 'long' })
    };
  };

  const dateParts = getDateParts(event.date);

  const handleRegisterClick = () => {
    if (!user?.email) {
      navigate("/login", { state: { from: `/events/${event._id}` } });
      return;
    }
    navigate(`/events/${event._id}`);
  };

  if (loading) return <Loader />;

  return (
    <div
      key={event._id}
      className="flex flex-col lg:flex-row-reverse lg:items-center justify-between border p-3 border-gray-400/15 my-5"
    >
      {/* Image Section */}
      <div className="flex flex-1 justify-center lg:justify-end">
        <img
          src={event.image}
          alt={event.title}
          className="w-full rounded object-cover inline-block border border-white/90 mb-3 lg:mb-0"
        />
      </div>

      {/* Details Section */}
      <div className="lg:flex items-center flex-3">
        {/* Date Section */}
        <div className="flex-1 text-left">
          <div className="flex items-baseline-last">
            <div className="text-5xl text-yellow-500">{dateParts.day}</div>
            <div className="uppercase text-gray-400 font-light text-sm ml-1">
              {dateParts.month}
            </div>
          </div>
          <div className="uppercase text-xl text-zinc-400 font-light">
            {dateParts.weekday}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-2 text-left">
          <h3 className="w-full text-xl text-zinc-800 font-poppins py-3 lg:py-1">
            {event.title}
          </h3>
          <p className="text-zinc-500">
            {event.time} | {event.location}
          </p>
          <Button
            onClick={handleRegisterClick}
            className="mt-5 w-full sm:w-1/4 text-center bg-zinc-100 hover:bg-zinc-300 text-zinc-800 hover:text-white border border-gray-300"
          >
            REGISTER
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ECard;
