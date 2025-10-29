import { CiClock2, CiMail, CiMapPin} from "react-icons/ci";
import {  FaBookOpen } from 'react-icons/fa';
import { FiCheckCircle } from 'react-icons/fi';
import { SlCalender } from "react-icons/sl";
import type { FC } from "react";
import type { Booking, Course } from "../../ult/types/types";

const userProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@mls.edu',
    location: 'San Francisco, CA',
    memberSince: 'January 2024',
    avatar: 'AJ'
  };


  interface HeroProps{
    courses: Course[]
    events?: Booking[];
  }

const Hero:FC<HeroProps> = ({courses, events}) => {

     const stats = {
    totalCourses: courses.length,
    completedCourses: courses.filter(c => c.progress === 100).length,
    upcomingEvents: events?.filter(e => e.status === 'upcoming').length,
    hoursLearned: 187
  };

  return (
    <div className="sm:flex gap-10">
        {/* Header */}
                <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-4 sm:p-5 md:p-6 mb-4 md:mb-6 border border-white sm:w-[800px]">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
                      {userProfile.avatar}
                    </div>
                    <div className="text-center sm:text-left flex-1">
                      <h1 className="text-2xl sm:text-3xl font-bold text-zinc-500">{userProfile.name}</h1>
                      <div className="flex flex-col text-zinc-500 text-xs sm:text-sm">
                        <span className="flex items-center gap-1">
                          <CiMail className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="break-all">{userProfile.email}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <CiMapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                          {userProfile.location}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs sm:text-sm mt-1">Member since {userProfile.memberSince}</p>
                    </div>
                  </div>
                </div>
        
                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 md:mb-6 w-full">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 border border-blue-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <FaBookOpen  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
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
                      <SlCalender  className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                      <span className="text-2xl sm:text-3xl font-bold text-white">{stats.upcomingEvents}</span>
                    </div>
                    <p className="text-purple-500 text-xs sm:text-sm">Upcoming Events</p>
                  </div>
        
                  <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 border border-orange-400/30">
                    <div className="flex items-center justify-between mb-2">
                      <CiClock2 className="w-6 h-6 sm:w-8 sm:h-8 text-orange-400" />
                      <span className="text-2xl sm:text-3xl font-bold text-white">{stats.hoursLearned}</span>
                    </div>
                    <p className="text-orange-500 text-xs sm:text-sm">Hours Learned</p>
                  </div>
                </div>
    </div>
  )
}

export default Hero