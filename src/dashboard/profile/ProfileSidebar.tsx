import { CiTrophy } from "react-icons/ci"
import { FaAward } from "react-icons/fa";
import { IoIosTrendingUp } from "react-icons/io"
import type { Achievement } from "../UserDashboard";
import type { Enrollment } from "../../ult/types/types";

interface ProfileSidebarProps {
  enrollments: Enrollment[];
}

const ProfileSidebar = ({ enrollments }: ProfileSidebarProps) => {
  
  // Calculate achievements from enrollment data
  const calculateAchievements = (): Achievement[] => {
    const achievements: Achievement[] = [];
    const now = new Date();
    
    // Calculate stats from all enrollments
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(c => c.progress === 100).length;
    const completedLessons = enrollments.reduce((sum, course) => sum + (course.completedLessons?.length || 0), 0);
    const enrolledDate = enrollments[0]?.enrolledAt ? new Date(enrollments[0].enrolledAt) : now;
    const daysSinceEnrollment = Math.floor((now.getTime() - enrolledDate.getTime()) / (1000 * 60 * 60 * 24));

    // Achievement 1: First Steps
    if (completedLessons >= 1) {
      achievements.push({
        id: "first_steps",
        title: "First Steps",
        description: "Completed your first lesson",
        earnedDate: enrolledDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    // Achievement 2: Course Explorer
    if (totalCourses >= 2) {
      achievements.push({
        id: "course_explorer",
        title: "Course Explorer",
        description: `Enrolled in ${totalCourses} courses`,
        earnedDate: now.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    // Achievement 3: Lesson Master
    if (completedLessons >= 10) {
      achievements.push({
        id: "lesson_master",
        title: "Lesson Master",
        description: `Completed ${completedLessons} lessons`,
        earnedDate: now.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    // Achievement 4: Consistency Champion
    if (daysSinceEnrollment >= 7 && completedLessons >= 5) {
      achievements.push({
        id: "consistency_champ",
        title: "Consistency Champion",
        description: "Active learning for 7+ days",
        earnedDate: now.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    // Achievement 5: Project Builder
    const hasProjectCourse = enrollments.some(course => 
      course.courseTitle?.toLowerCase().includes('project') || 
      course.curriculum?.some(section => section.title?.toLowerCase().includes('project'))
    );
    if (hasProjectCourse) {
      achievements.push({
        id: "project_builder",
        title: "Project Builder",
        description: "Working on real-world projects",
        earnedDate: now.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    // Achievement 6: Backend Beginner (Node.js specific)
    const hasBackendCourse = enrollments.some(course => 
      course.courseTitle?.toLowerCase().includes('node') || 
      course.courseTitle?.toLowerCase().includes('backend')
    );
    if (hasBackendCourse && completedLessons >= 5) {
      achievements.push({
        id: "backend_beginner",
        title: "Backend Beginner",
        description: "Started backend development journey",
        earnedDate: now.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    // Achievement 7: Course Completer
    if (completedCourses >= 1) {
      achievements.push({
        id: "course_completer",
        title: "Course Completer",
        description: `Finished ${completedCourses} course${completedCourses > 1 ? 's' : ''}`,
        earnedDate: now.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    // Achievement 8: Fast Learner
    if (completedLessons >= 20 && daysSinceEnrollment <= 30) {
      achievements.push({
        id: "fast_learner",
        title: "Fast Learner",
        description: "Completed 20+ lessons in first month",
        earnedDate: now.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      });
    }

    return achievements;
  };

  // Calculate learning streak
  const calculateStreak = (): number => {
    if (!enrollments.length) return 0;
    
    const today = new Date();
    let streak = 0;
    
    // Simple streak calculation based on recent activity
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();
      checkDate.setDate(today.getDate() - i);
      
      const hadActivity = enrollments.some(course => {
        const lastAccessed = new Date(course.lastAccessedAt);
        return lastAccessed.toDateString() === checkDate.toDateString();
      });
      
      if (hadActivity) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const achievements = calculateAchievements();
  const learningStreak = calculateStreak();

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Achievements */}
      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-blue-600/20">
        <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
          <CiTrophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
          Achievements ({achievements.length})
        </h2>
        <div className="space-y-3">
          {achievements.length > 0 ? (
            achievements.map((achievement) => (
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
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-400 text-sm">No achievements yet</p>
              <p className="text-gray-500 text-xs mt-1">Start learning to earn achievements!</p>
            </div>
          )}
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
            {learningStreak}
          </div>
          <p className="text-zinc-400 text-sm">Days in a row</p>
          <p className="text-gray-500 text-xs mt-2">
            {learningStreak >= 7 ? "🔥 You're on fire! Keep it up!" : 
             learningStreak >= 3 ? "Great consistency! Keep going!" : 
             "Start your learning streak today!"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;