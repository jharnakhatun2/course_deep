import Button from "../../ult/button/Button";
import { GiProgression } from "react-icons/gi";

const BannerEvent = () => {
  return (
    <div className="bg-yellow-500 text-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-6 sm:space-y-0">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <GiProgression className="w-20 h-20" />
            <div>
              <h2 className="text-3xl font-semibold">
                New Student Join Every Week
              </h2>
              <h3 className="text-xl w-5/6 lg:w-full">
                New courses, interesting posts, popular books and much more!
              </h3>
            </div>
          </div>
          <Button
            url="/courses"
            className="bg-zinc-100 hover:bg-zinc-300 text-zinc-800"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerEvent;
