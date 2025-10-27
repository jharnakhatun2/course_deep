import { CiTrophy } from "react-icons/ci"
import { FaAward } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io"
import type { Achievement } from "../UserDashboard";

const achievements: Achievement[] = [
    {
      id: "1",
      title: "Fast Learner",
      description: "Completed 5 courses in 3 months",
      earnedDate: "Sep 2025",
    },
    {
      id: "2",
      title: "Code Master",
      description: "Solved 100+ coding challenges",
      earnedDate: "Aug 2025",
    },
    {
      id: "3",
      title: "Community Helper",
      description: "Helped 50+ fellow students",
      earnedDate: "Jul 2025",
    },
  ];

const ProfileSidebar = () => {
  return (
    <div className="space-y-4 md:space-y-6">
            {/* Achievements */}
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-blue-600/20">
              <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
                <CiTrophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="bg-white/5 rounded-lg p-3 shadow"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaAward className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-blue-500 font-semibold text-xs sm:text-sm truncate">
                          {achievement.title}
                        </h3>
                        <p className="text-gray-400 text-xs">
                          {achievement.description}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {achievement.earnedDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Streak */}
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-green-400/30">
              <h2 className="text-lg sm:text-xl font-bold text-emerald-600 mb-2 flex items-center gap-2">
                <IoIosTrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                Learning Streak
              </h2>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  23
                </div>
                <p className="text-zinc-400 text-sm">Days in a row</p>
                <p className="text-gray-500 text-xs mt-2">
                  Keep it up! You're doing great!
                </p>
              </div>
            </div>
          </div>
  )
}

export default ProfileSidebar