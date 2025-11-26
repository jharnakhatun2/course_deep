import { useState, useRef } from 'react';
import {
  FaUsers,
  FaBookOpen,
  FaDollarSign,
  FaSearch,
  FaFilter,
  FaFilePdf,
} from "react-icons/fa";
import { useGetUsersQuery } from '../../features/auth/authApi';
import { useGetEnrollmentsQuery } from '../../features/enrollments/enrollmentsApi';
import AllUsers from './AllUsers';
import Loader from '../../ult/loader/Loader';
import { FiHome } from 'react-icons/fi';
import { 
  exportComprehensiveAdminPDF 
} from '../../ult/pdf/pdfExporter';

const Admin = () => {
  const { data: users, isLoading: usersLoading } = useGetUsersQuery();
  const { data: enrollments, isLoading: enrollmentsLoading } = useGetEnrollmentsQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'courses' | 'users'>('courses');
  const [isExporting, setIsExporting] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  if (usersLoading || enrollmentsLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Pre-calculate values
  const totalUsers = users?.length || 0;
  const activeEnrollments = enrollments?.filter(e => e.status === 'active').length || 0;

  // Fixed total revenue calculation
  const totalRevenue = enrollments?.reduce((total: number, e: any) => {
    const price = typeof e.coursePrice === 'string'
      ? parseFloat(e.coursePrice)
      : e.coursePrice;
    return total + (price || 0);
  }, 0) || 0;

  //stats data
  const stats = [
    {
      label: 'Total Users',
      value: totalUsers.toString(),
      icon: FaUsers,
      change: '+12.5%',
      color: 'bg-blue-500'
    },
    {
      label: 'Active Enrollments',
      value: activeEnrollments.toString(),
      icon: FaBookOpen,
      change: '+8.2%',
      color: 'bg-green-500'
    },
    {
      label: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: FaDollarSign,
      change: '+23.1%',
      color: 'bg-purple-500'
    },
  ];

  // Enrollment
  const filteredEnrollments = enrollments?.filter(enrollment =>
    enrollment.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.instructorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    enrollment.userName?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Users
  const filteredUsers = users?.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Single comprehensive export handler
  const handleComprehensiveExport = () => {
    setIsExporting(true);
    try {
      exportComprehensiveAdminPDF(stats, enrollments || [], users || []);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-100">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="sm:flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-zinc-700 flex items-center gap-3">
                <FiHome className="w-6 h-6" />
                Dashboard
              </h1>
              <p className="text-zinc-500 font-light">Manage your enrollments and users</p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button 
                onClick={handleComprehensiveExport}
                disabled={isExporting}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-green-600 hover:bg-green-500 border border-green-600 hover:border-green-500 cursor-pointer shadow-lg hover:shadow transition-smooth flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaFilePdf className="w-4 h-4" />
                {isExporting ? 'Exporting...' : 'Export Full Report'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of your component remains the same */}
      <div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-6">
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

        {/* Main Content - Your existing tables and tabs remain the same */}
        <div className="bg-white rounded shadow-sm border border-zinc-100">
          {/* Tabs and Search */}
          <div className="border-b border-zinc-200 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`px-4 py-2 text-sm font-medium rounded transition-colors cursor-pointer ${activeTab === 'courses'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                >
                  Enrollments ({filteredEnrollments.length})
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === 'users'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'text-zinc-600 hover:bg-zinc-50'
                    }`}
                >
                  Users ({filteredUsers.length})
                </button>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab === 'courses' ? 'enrollments' : 'users'}...`}
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

          {/* Enrollments Table */}
          {activeTab === 'courses' && (
            <div ref={tableRef} className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 border-b border-zinc-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Instructor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Enrolled Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredEnrollments.map((enrollment) => (
                    <tr key={enrollment._id} className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-zinc-900">{enrollment.courseTitle}</div>
                        <div className="text-sm text-zinc-500 truncate max-w-xs">
                          {enrollment.courseDescription?.slice(0, 30) + "..."}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{enrollment.userName}</div>
                          <div className="text-sm text-zinc-500">{enrollment.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">{enrollment.instructorName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-zinc-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${enrollment.progress}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-zinc-600">{enrollment.progress}%</span>
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">
                          {enrollment.completedLessons?.length}/{enrollment.allLessons?.length} lessons
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${enrollment.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : enrollment.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-zinc-100 text-zinc-800'
                          }`}>
                          {enrollment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-zinc-600">
                          {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredEnrollments.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-zinc-400 text-sm">No enrollments found</div>
                </div>
              )}
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