import React, { useEffect } from "react";
import { LessonSidebar } from "./lesson/LessonSidebar";
import { LuNotebookPen } from "react-icons/lu";
import Breadcrumb from "../ult/breadcrumb/Breadcrumb";
import { useLocation, useNavigate } from "react-router";
import type { Enrollment } from "../ult/types/types";
import { useCompleteLessonMutation } from "../features/enrollments/enrollmentsApi";
import { showErrorToast, showSuccessToast } from "../ult/toast/toast";
import Loader from "../ult/loader/Loader";
import NotesSection from "./lesson/NotesSection";
import { useLessonNavigation } from "./lesson/useLessonNavigation";
import VideoPlayer from "./lesson/VideoPlayer";
import LessonNavigation from "./lesson/LessonNavigation";
import LessonInfo from "./lesson/LessonInfo";

const breadcrumbItems = [
  { label: "My Dashboard", href: "/dashboard" },
  { label: "Lesson" },
];

const LessonPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const enrollment = (location.state as { enrollment: Enrollment })?.enrollment;
  
  const [completeLesson, { isLoading, error }] = useCompleteLessonMutation();
  
  const {
    currentVideoId,
    currentLesson,
    currentVideoIndex,
    initializeLesson,
    goToVideo,
    goToNextVideo,
    goToPrevVideo
  } = useLessonNavigation(enrollment?.allLessons, enrollment?.currentLesson || undefined);

  // Redirect if no enrollment data
  useEffect(() => {
    if (!enrollment) {
      navigate("/dashboard");
    }
  }, [enrollment, navigate]);

  // Initialize lesson navigation
  useEffect(() => {
    if (enrollment?.allLessons) {
      initializeLesson();
    }
  }, [enrollment?.allLessons, initializeLesson]);

  const handleLessonComplete = async (lessonId: string) => {
    if (!enrollment?._id || !currentLesson) return;

    try {
      const currentIndex = enrollment.allLessons.findIndex(
        (lesson) => lesson.lessonId === lessonId
      );
      const nextLesson = enrollment.allLessons[currentIndex + 1];

      await completeLesson({
        enrollmentId: enrollment._id,
        data: {
          lessonId,
          nextLessonId: nextLesson?.lessonId,
          currentDay: currentLesson.dayId
        }
      }).unwrap();

      showSuccessToast("Lesson completed!");
      
      if (nextLesson) {
        goToVideo(currentIndex + 1);
      }
    } catch (error) {
      showErrorToast("Failed to mark lesson as completed");
    }
  };

  // Memoized course videos data
  const courseVideos = React.useMemo(() => 
    enrollment?.allLessons?.map((lesson) => ({
      id: lesson.videoId,
      lessonId: lesson.lessonId,
      title: lesson.title,
      duration: lesson.duration,
      type: lesson.type,
      dayId: lesson.dayId,
      dayTitle: lesson.dayTitle,
      isCompleted: enrollment.completedLessons?.includes(lesson.lessonId)
    })) || [], 
    [enrollment]
  );

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

  const isLessonCompleted = currentLesson && 
    enrollment.completedLessons?.includes(currentLesson.lessonId);

  return (
    <section className="bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12 flex flex-col">
        {/* Title */}
        <div className="">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-garamond text-xl sm:text-3xl font-semibold text-zinc-600">
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
              <VideoPlayer videoId={currentVideoId} />
            </div>

            {/* Lesson Navigation */}
            <LessonNavigation
              onPrev={goToPrevVideo}
              onNext={goToNextVideo}
              currentIndex={currentVideoIndex}
              totalVideos={courseVideos.length}
              onComplete={currentLesson ? () => handleLessonComplete(currentLesson.lessonId) : undefined}
              isCompleted={isLessonCompleted}
            />

            {/* Lesson Info */}
            <LessonInfo currentLesson={currentLesson} />

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