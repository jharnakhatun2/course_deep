import { CiClock2, CiMail } from "react-icons/ci";
import { FaBookOpen, FaUser } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { SlCalender } from "react-icons/sl";
import type { FC } from "react";
import type { Booking, Enrollment, User } from "../../ult/types/types";
import { IoTimeOutline } from "react-icons/io5";

interface HeroProps {
  courseEnrollments: Enrollment[]
  events?: Booking[];
  user?: User | null;
}

const Hero: FC<HeroProps> = ({ courseEnrollments, events, user }) => {
  
  // Calculate meaningful stats from your enrollment data
  const calculateStats = () => {
    const totalCourses = courseEnrollments.length;
    const completedCourses = courseEnrollments.filter(c => c.progress === 100).length;
    const upcomingEvents = events?.filter(e => e.status === 'confirmed').length || 0;
    
    // Calculate total lessons across all enrolled courses
    const totalLessons = courseEnrollments.reduce((total, course) => 
      total + (course.allLessons?.length || 0), 0);
    
    // Calculate completed lessons across all courses
    const completedLessons = courseEnrollments.reduce((total, course) => 
      total + (course.completedLessons?.length || 0), 0);
    
    // Calculate average progress across all courses
    const averageProgress = totalCourses > 0 
      ? Math.round(courseEnrollments.reduce((sum, course) => sum + (course.progress || 0), 0) / totalCourses)
      : 0;

    // Calculate current streak (days with activity)
    const today = new Date();
    const recentActivity = courseEnrollments.filter(course => {
      const lastAccessed = new Date(course.lastAccessedAt);
      const diffTime = Math.abs(today.getTime() - lastAccessed.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7; // Active in last 7 days
    }).length;

    return {
      totalCourses,
      completedCourses,
      upcomingEvents,
      totalLessons,
      completedLessons,
      averageProgress,
      activeCourses: recentActivity
    };
  };

  const stats = calculateStats();

  // Choose one of these alternatives for the fourth stat card:

  const statAlternatives = {
    // Option 1: Learning Progress
    progress: {
      value: `${stats.averageProgress}%`,
      label: "Avg Progress",
      icon: "📊",
      color: "from-cyan-500/20 to-cyan-600/20",
      borderColor: "border-cyan-400/30",
      textColor: "text-cyan-500"
    },
    
    // Option 2: Lessons Completed
    lessons: {
      value: stats.completedLessons,
      label: "Lessons Done",
      icon: "📚",
      color: "from-indigo-500/20 to-indigo-600/20",
      borderColor: "border-indigo-400/30", 
      textColor: "text-indigo-500"
    },
    
    // Option 3: Active Learning Streak
    streak: {
      value: stats.activeCourses,
      label: "Active Courses",
      icon: "🔥",
      color: "from-red-500/20 to-red-600/20",
      borderColor: "border-red-400/30",
      textColor: "text-red-500"
    },
    
    // Option 4: Total Lessons
    totalLessons: {
      value: stats.totalLessons,
      label: "Total Lessons",
      icon: "🎯",
      color: "from-emerald-500/20 to-emerald-600/20", 
      borderColor: "border-emerald-400/30",
      textColor: "text-emerald-500"
    }
  };

  // Select which alternative you prefer
  const selectedStat = statAlternatives.progress; // Change to lessons, streak, or totalLessons

  return (
    <div className="sm:flex gap-10 mt-3">
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 mb-4 md:mb-6 border border-white sm:w-[800px]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-500 to-teal-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
            <FaUser />
          </div>
          <div className="text-center sm:text-left flex-1 space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-600">{user?.name}</h1>
            <div className="flex flex-col text-zinc-500 text-sm">
              <span className="flex items-center gap-2">
                <CiMail className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                <span className="break-all">{user?.email}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IoTimeOutline className="w-4 h-4 text-yellow-500" />
              <p className="text-gray-400 text-sm mt-1">Member since {user?.createdAt ? new Date(user.createdAt).toLocaleString("en-US", {month: "long",year: "numeric",}) : "January 2025"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 md:mb-6 w-full">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 border border-blue-400/30">
          <div className="flex items-center justify-between mb-2">
            <FaBookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.totalCourses}</span>
          </div>
          <p className="text-blue-500 text-xs sm:text-sm">Active Courses</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 border border-green-400/30">
          <div className="flex items-center justify-between mb-2">
            <FiCheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.completedCourses}</span>
          </div>
          <p className="text-green-500 text-xs sm:text-sm">Completed</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 border border-purple-400/30">
          <div className="flex items-center justify-between mb-2">
            <SlCalender className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            <span className="text-2xl sm:text-3xl font-bold text-white">{stats.upcomingEvents}</span>
          </div>
          <p className="text-purple-500 text-xs sm:text-sm">Enrolled Events</p>
        </div>

        {/* Replace hoursLearned with one of the alternatives */}
        <div className={`bg-gradient-to-br ${selectedStat.color} backdrop-blur-lg rounded-xl p-4 sm:p-5 border ${selectedStat.borderColor}`}>
          <div className="flex items-center justify-between mb-2">
            <CiClock2 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
            <span className="text-2xl sm:text-3xl font-bold text-white">{selectedStat.value}</span>
          </div>
          <p className={`${selectedStat.textColor} text-xs sm:text-sm`}>{selectedStat.label}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;