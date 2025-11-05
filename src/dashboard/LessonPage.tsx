import React, { useEffect, useState } from "react";
import { LessonSidebar } from "./lesson/LessonSidebar";
import { LuNotebookPen } from "react-icons/lu";
import YouTube, { type YouTubeProps } from "react-youtube";
import NotesSection from "./lesson/NotesSection";
import Breadcrumb from "../ult/breadcrumb/Breadcrumb";
import { useLocation, useNavigate } from "react-router";
import type { Enrollment, EnrollmentLesson } from "../ult/types/types";
import { useCompleteLessonMutation, useGetCourseContentQuery } from "../features/enrollments/enrollmentsApi";
import { showErrorToast, showSuccessToast } from "../ult/toast/toast";
import Loader from "../ult/loader/Loader";

//for breadcrumb
const breadcrumbItems = [
  { label: "My Dashboard", href: "/dashboard" },
  { label: "Lesson" },
];

const LessonPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const enrollment = (location.state as { enrollment: Enrollment })?.enrollment;

  // Redirect if no enrollment data
  useEffect(() => {
    if (!enrollment) {
      navigate("/dashboard");
    }
  }, [enrollment, navigate]);

  // Get course content
  const { data: courseContent, isLoading, error } = useGetCourseContentQuery(
    enrollment?._id || "",
    { skip: !enrollment?._id }
  );
  
  const [completeLesson] = useCompleteLessonMutation();
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<EnrollmentLesson | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Set current lesson when course content loads
  useEffect(() => {
    if (enrollment?.allLessons && enrollment.currentLesson) {
      // Find the current lesson from all lessons
      const lesson = enrollment.allLessons.find(
        (lesson: EnrollmentLesson) => lesson.lessonId === enrollment.currentLesson
      );
      
      if (lesson) {
        setCurrentLesson(lesson);
        setCurrentVideoId(lesson.videoId); // Use the actual videoId from enrollment
        
        // Find the index of the current lesson
        const index = enrollment.allLessons.findIndex(
          (l: EnrollmentLesson) => l.lessonId === enrollment.currentLesson
        );
        if (index !== -1) {
          setCurrentVideoIndex(index);
        }
      } else if (enrollment.allLessons.length > 0) {
        // Fallback to first lesson
        const firstLesson = enrollment.allLessons[0];
        setCurrentLesson(firstLesson);
        setCurrentVideoId(firstLesson.videoId);
        setCurrentVideoIndex(0);
      }
    }
  }, [enrollment]);

  const handleLessonComplete = async (lessonId: string) => {
    if (!enrollment?._id) return;

    try {
      // Find the current lesson and next lesson
      const currentIndex = enrollment.allLessons.findIndex(
        (lesson: EnrollmentLesson) => lesson.lessonId === lessonId
      );
      const nextLesson = enrollment.allLessons[currentIndex + 1];

      await completeLesson({
        enrollmentId: enrollment._id,
        data: {
          lessonId,
          nextLessonId: nextLesson?.lessonId,
          currentDay: currentLesson?.dayId
        }
      }).unwrap();

      showSuccessToast("Lesson completed!");
      
      // Update current lesson to next one
      if (nextLesson) {
        setCurrentLesson(nextLesson);
        setCurrentVideoId(nextLesson.videoId);
        setCurrentVideoIndex(currentIndex + 1);
      }
    } catch (error) {
      showErrorToast("Failed to mark lesson as completed");
    }
  };

  const handleLessonSelect = (lesson: EnrollmentLesson, index: number) => {
    setCurrentLesson(lesson);
    setCurrentVideoId(lesson.videoId);
    setCurrentVideoIndex(index);
  };

  // Next Navigation Handlers
  const goToNextVideo = () => {
    if (enrollment?.allLessons && currentVideoIndex < enrollment.allLessons.length - 1) {
      const nextIndex = currentVideoIndex + 1;
      const nextLesson = enrollment.allLessons[nextIndex];
      setCurrentVideoIndex(nextIndex);
      setCurrentLesson(nextLesson);
      setCurrentVideoId(nextLesson.videoId);
    }
  };

  // Prev Navigation Handlers
  const goToPrevVideo = () => {
    if (currentVideoIndex > 0 && enrollment?.allLessons) {
      const prevIndex = currentVideoIndex - 1;
      const prevLesson = enrollment.allLessons[prevIndex];
      setCurrentVideoIndex(prevIndex);
      setCurrentLesson(prevLesson);
      setCurrentVideoId(prevLesson.videoId);
    }
  };

  // Direct Video Selection Handler
  const goToVideo = (index: number) => {
    if (enrollment?.allLessons && index >= 0 && index < enrollment.allLessons.length) {
      const lesson = enrollment.allLessons[index];
      setCurrentVideoIndex(index);
      setCurrentLesson(lesson);
      setCurrentVideoId(lesson.videoId);
    }
  };


  // YouTube Player Options
  const opts: YouTubeProps['opts'] = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Prepare course videos data from enrollment lessons
  const courseVideos = enrollment?.allLessons?.map((lesson: EnrollmentLesson, index: number) => ({
    id: lesson.videoId, // Use actual videoId from enrollment
    lessonId: lesson.lessonId,
    title: lesson.title,
    duration: lesson.duration,
    type: lesson.type,
    dayId: lesson.dayId,
    dayTitle: lesson.dayTitle,
    isCompleted: enrollment.completedLessons?.includes(lesson.lessonId)
  })) || [];

  if (!enrollment) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">No Course Selected</h2>
          <p className="text-gray-600 mb-4">Please select a course from your dashboard.</p>
          <button 
            onClick={() => navigate("/dashboard")}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center text-red-600">
          Error loading course content!
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col">
        {/* Title */}
        <div className="">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-garamond text-2xl font-semibold text-zinc-600">
            {currentLesson?.title || enrollment.courseTitle}
          </h1>
        </div>
        <div className="h-[1px] w-full bg-gray-500/20 my-3" />

        {/* Content Area */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-10 mt-2">
          {/* Left Section */}
          <section className="lg:col-span-2">
            {/* Video */}
            <div className="bg-zinc-800 overflow-hidden mb-6 rounded">
              <div className="w-full rounded">
                {currentVideoId ? (
                  <YouTube
                    videoId={currentVideoId || "ESnrn1kAD4E"}
                    opts={opts}
                    className="w-full rounded"
                    onError={(e) => {
                      console.error("YouTube player error:", e);
                      showErrorToast("Failed to load video. Please check the video ID.");
                    }}
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-800 flex items-center justify-center rounded">
                    <p className="text-white text-lg">Video not available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Lesson Actions */}
            <div className="flex mb-6 justify-between items-center">
              <div>
                {currentLesson && !enrollment.completedLessons?.includes(currentLesson.lessonId) && (
                  <button
                    onClick={() => handleLessonComplete(currentLesson.lessonId)}
                    className="bg-yellow-400 hover:bg-green-600 text-white px-6 py-2 text-sm shadow transition-smooth cursor-pointer "
                  >
                    Mark as Complete
                  </button>
                )}
                {currentLesson && enrollment.completedLessons?.includes(currentLesson.lessonId) && (
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={goToPrevVideo}
                  disabled={currentVideoIndex === 0}
                  className={`px-6 py-2 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth ${
                    currentVideoIndex === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "border border-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-white/70"
                  }`}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={goToNextVideo}
                  disabled={currentVideoIndex === courseVideos.length - 1}
                  className={`px-6 py-2 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth ${
                    currentVideoIndex === courseVideos.length - 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-white/70"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>

            {/* Lesson Info */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-semibold text-zinc-700 mb-2">About this lesson</h3>
              <p className="text-zinc-600">
                {currentLesson ? 
                  `This lesson is part of ${currentLesson.dayTitle} and covers ${currentLesson.title}.` 
                  : "Lesson information not available."
                }
              </p>
            </div>

            {/* Notes Section */}
            <div className="flex items-center gap-2 text-zinc-600 font-semibold text-lg mb-2">
              <LuNotebookPen className="text-teal-500" />
              <h3>Notes</h3>
            </div>
            <div className="h-[1px] w-full bg-gray-500/20 my-3" />
            <NotesSection />
          </section>

          {/* Right Sidebar */}
          <aside className="hidden md:block bg-zinc-800 border-l border-gray-300 overflow-y-auto lg:col-span-1 rounded">
            <LessonSidebar
              courseVideos={courseVideos}
              currentVideoIndex={currentVideoIndex}
              goToVideo={goToVideo}
              enrollment={enrollment}
            />
          </aside>
        </main>
      </div>
    </section>
  );
};

export default LessonPage;