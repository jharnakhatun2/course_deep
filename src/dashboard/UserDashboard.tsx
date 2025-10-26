import React, { useState } from 'react';
import { SlCalender } from "react-icons/sl";
import { CiTrophy } from "react-icons/ci";
import { FaAward } from 'react-icons/fa';
import { IoIosCode, IoIosTrendingUp } from 'react-icons/io';
import Hero from './profile/Hero';


export interface Course {
  id: string;
  title: string;
  progress: number;
  duration: string;
  level: string;
  nextLesson: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'events'>('overview');

  

  const courses: Course[] = [
    {
      id: '1',
      title: 'Advanced React & TypeScript',
      progress: 68,
      duration: '12 weeks',
      level: 'Advanced',
      nextLesson: 'Context API Deep Dive'
    },
    {
      id: '2',
      title: 'Full Stack Web Development',
      progress: 45,
      duration: '16 weeks',
      level: 'Intermediate',
      nextLesson: 'RESTful API Design'
    },
    {
      id: '3',
      title: 'Data Structures & Algorithms',
      progress: 92,
      duration: '10 weeks',
      level: 'Advanced',
      nextLesson: 'Dynamic Programming'
    },
    {
      id: '4',
      title: 'Cloud Architecture with AWS',
      progress: 30,
      duration: '14 weeks',
      level: 'Intermediate',
      nextLesson: 'EC2 and Load Balancing'
    }
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'React Performance Workshop',
      date: 'Oct 28, 2025',
      time: '2:00 PM - 4:00 PM',
      type: 'Workshop',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Coding Competition: Algorithm Sprint',
      date: 'Oct 30, 2025',
      time: '10:00 AM - 1:00 PM',
      type: 'Competition',
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Career Panel: Tech Industry Insights',
      date: 'Nov 2, 2025',
      time: '6:00 PM - 7:30 PM',
      type: 'Seminar',
      status: 'upcoming'
    },
    {
      id: '4',
      title: 'TypeScript Best Practices',
      date: 'Oct 25, 2025',
      time: '3:00 PM - 5:00 PM',
      type: 'Workshop',
      status: 'completed'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Fast Learner',
      description: 'Completed 5 courses in 3 months',
      earnedDate: 'Sep 2025'
    },
    {
      id: '2',
      title: 'Code Master',
      description: 'Solved 100+ coding challenges',
      earnedDate: 'Aug 2025'
    },
    {
      id: '3',
      title: 'Community Helper',
      description: 'Helped 50+ fellow students',
      earnedDate: 'Jul 2025'
    }
  ];

 

  return (
    <div className="bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <Hero courses={courses} events={events}/>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap border border-white shadow-sm ${
              activeTab === 'overview'
                ? 'bg-white text-yellow-400'
                : 'bg-white/10 text-zinc-400 hover:bg-white/20 border border-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap border border-white shadow-sm ${
              activeTab === 'courses'
                ? 'bg-white text-yellow-400'
                : 'bg-white/10 text-zinc-400 hover:bg-white/20 '
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap border border-white shadow-sm ${
              activeTab === 'events'
                ? 'bg-white text-yellow-400'
                : 'bg-white/10 text-zinc-400 hover:bg-white/20'
            }`}
          >
            Events
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4 flex items-center gap-2">
                    <IoIosCode className="w-5 h-5 sm:w-6 sm:h-6" />
                    Continue Learning
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {courses.slice(0, 2).map((course) => (
                      <div key={course.id} className="bg-white/30 rounded-lg p-3 sm:p-4 hover:bg-white/60 transition-smooth hover:shadow ">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-yellow-500 font-semibold text-sm sm:text-base truncate">{course.title}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm truncate">Next: {course.nextLesson}</p>
                          </div>
                          <span className="px-2 sm:px-3 py-1 bg-purple-500/30 text-white rounded-full text-xs whitespace-nowrap self-start">
                            {course.level}
                          </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-smooth"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-gray-400">{course.progress}% Complete</span>
                          <span className="text-gray-400">{course.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4 flex items-center gap-2">
                    <SlCalender className="w-5 h-5 sm:w-6 sm:h-6" />
                    Upcoming Events
                  </h2>
                  <div className="space-y-3">
                    {events.filter(e => e.status === 'upcoming').slice(0, 3).map((event) => (
                      <div key={event.id} className="bg-white/30 rounded-lg p-3 sm:p-4 hover:bg-white/60 transition-smooth hover:shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-teal-500 font-semibold mb-1 text-sm sm:text-base">{event.title}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">{event.date} • {event.time}</p>
                          </div>
                          <span className="px-2 sm:px-3 py-1 bg-blue-500/30 text-white rounded-full text-xs whitespace-nowrap self-start">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4">All Courses</h2>
                <div className="space-y-3 sm:space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white/30 rounded-lg p-3 sm:p-4 hover:bg-white/60 transition-smooth hover:shadow">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-yellow-500 font-semibold text-sm sm:text-base truncate">{course.title}</h3>
                          <p className="text-gray-400 text-xs sm:text-sm truncate">Next: {course.nextLesson}</p>
                        </div>
                        <span className="px-2 sm:px-3 py-1 bg-purple-500/30 text-white rounded-full text-xs whitespace-nowrap self-start">
                          {course.level}
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-yellow-50 to-yellow-300 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-400">{course.progress}% Complete</span>
                        <span className="text-gray-400">{course.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
                <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4">All Events</h2>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white/30 rounded-lg p-3 sm:p-4 hover:bg-white/60 transition-smooth hover:shadow">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-teal-500 font-semibold mb-1 text-sm sm:text-base">{event.title}</h3>
                            <p className="text-gray-400 text-xs sm:text-sm">{event.date} • {event.time}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                              event.status === 'upcoming'
                                ? 'bg-blue-500/30 text-white'
                                : event.status === 'ongoing'
                                ? 'bg-green-500/30 text-white'
                                : 'bg-gray-500/30 text-white'
                            }`}>
                              {event.status}
                            </span>
                            <span className="px-2 sm:px-3 py-1 bg-purple-500/30 text-white rounded-full text-xs whitespace-nowrap">
                              {event.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-blue-600/20">
              <h2 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
                <CiTrophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                Achievements
              </h2>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-white/5 rounded-lg p-3 shadow">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <FaAward  className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-blue-500 font-semibold text-xs sm:text-sm truncate">{achievement.title}</h3>
                        <p className="text-gray-400 text-xs">{achievement.description}</p>
                        <p className="text-gray-500 text-xs mt-1">{achievement.earnedDate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-green-400/30">
              <h2 className="text-lg sm:text-xl font-bold text-emerald-600 mb-2 flex items-center gap-2">
                <IoIosTrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                Learning Streak
              </h2>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">23</div>
                <p className="text-zinc-400 text-sm">Days in a row</p>
                <p className="text-gray-500 text-xs mt-2">Keep it up! You're doing great!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;