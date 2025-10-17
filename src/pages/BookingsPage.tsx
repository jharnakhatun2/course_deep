import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetUserBookingsQuery } from "../features/bookings/bookingsApi";
import BookingFilters from "../components/bookings/BookingFilters";
import BookingList from "../components/bookings/BookingList";

const BookingsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'cancelled'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');
  
  const userEmail = localStorage.getItem('userEmail');
  const { data: bookings = [], isLoading, error } = useGetUserBookingsQuery(userEmail || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-4">Failed to load your bookings.</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600 mt-2">Manage your events and courses</p>
        </div>

        {/* Filters and Sorting */}
        <BookingFilters
          filter={filter}
          sortBy={sortBy}
          onFilterChange={setFilter}
          onSortChange={setSortBy}
          bookingCount={bookings.length}
        />

        {/* Bookings List */}
        <BookingList
          bookings={bookings}
          filter={filter}
          sortBy={sortBy}
        />

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-600 mb-6">Start by exploring our events and courses!</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/events')}
                className="bg-yellow-500 text-white px-6 py-3 rounded hover:bg-yellow-600 transition-colors"
              >
                Browse Events
              </button>
              <button 
                onClick={() => navigate('/courses')}
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors"
              >
                Browse Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;