import { useState } from 'react';
import {
  FaUsers,
  FaBookOpen,
  FaDollarSign,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useGetUsersQuery } from '../../features/auth/authApi';
import AllUsers from './AllUsers';

interface Course {
  id: number;
  title: string;
  instructor: string;
  students: number;
  revenue: number;
  status: 'active' | 'draft';
}

const Admin = () => {
  const { data: users} = useGetUsersQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'courses' | 'users'>('courses');

  // Mock data
  const stats = [
    { label: 'Total Users', value: '2,847', icon: FaUsers, change: '+12.5%', color: 'bg-blue-500' },
    { label: 'Active Courses', value: '156', icon: FaBookOpen, change: '+8.2%', color: 'bg-green-500' },
    { label: 'Total Revenue', value: '$48,392', icon: FaDollarSign, change: '+23.1%', color: 'bg-purple-500' },
  ];

  const courses: Course[] = [
    { id: 1, title: 'Advanced React Patterns', instructor: 'Sarah Johnson', students: 234, revenue: 9360, status: 'active' },
    { id: 2, title: 'TypeScript Masterclass', instructor: 'Mike Chen', students: 189, revenue: 7560, status: 'active' },
    { id: 3, title: 'UI/UX Design Fundamentals', instructor: 'Emma Wilson', students: 312, revenue: 12480, status: 'active' },
    { id: 4, title: 'Node.js Backend Development', instructor: 'David Lee', students: 156, revenue: 6240, status: 'draft' },
    { id: 5, title: 'Python for Data Science', instructor: 'Lisa Anderson', students: 278, revenue: 11120, status: 'active' },
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="sm:flex items-center justify-between">
            <div>
              <h1 className="text-xl text-zinc-800">Dashboard</h1>
              <p className="text-zinc-400">Manage your courses and users</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button className="px-4 py-2 text-xs sm:text-sm font-medium text-zinc-700 bg-white border border-zinc-100 hover:border-zinc-50 hover:bg-zinc-50 cursor-pointer shadow-lg hover:shadow transition-smooth">
                Export Data
              </button>
              <button className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 border border-yellow-500 hover:border-yellow-400 cursor-pointer shadow-lg hover:shadow transition-smooth">
                Add New Course
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded shadow-sm p-6 border border-zinc-100">
              <div className="flex items-center justify-between">
                <div className='space-y-1'>
                  <p className="text-sm font-medium text-zinc-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-zinc-900 ">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <div className={`${stat.color} p-2 rounded`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded shadow-sm border border-zinc-100">
          {/* Tabs and Search */}
          <div className="border-b border-zinc-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors cursor-pointer ${
                    activeTab === 'courses'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Courses
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    activeTab === 'users'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Users
                </button>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm border border-zinc-200 rounded focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
                <button className="p-2 border border-zinc-200 rounded-lg hover:bg-zinc-50 cursor-pointer">
                  <FaFilter className="w-4 h-4 text-zinc-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Courses Table */}
          {activeTab === 'courses' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Instructor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredCourses.map((course) => (
                    <tr key={course.id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-zinc-900">{course.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">{course.instructor}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900">{course.students}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-900">${course.revenue.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          course.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-zinc-100 text-zinc-800'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button className="p-1 hover:bg-zinc-100 rounded">
                          <FiMoreVertical className="w-4 h-4 text-zinc-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Users Table */}
          {activeTab === 'users' && (
            <AllUsers filteredUsers={filteredUsers} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;