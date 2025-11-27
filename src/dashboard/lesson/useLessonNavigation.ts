import { useState, useCallback } from "react";
import type { EnrollmentLesson } from "../../ult/types/types";


export const useLessonNavigation = (allLessons: EnrollmentLesson[] = [], currentLessonId?: string) => {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<EnrollmentLesson | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const initializeLesson = useCallback(() => {
    if (!allLessons.length) return;

    if (currentLessonId) {
      const lesson = allLessons.find(lesson => lesson.lessonId === currentLessonId);
      if (lesson) {
        setCurrentLesson(lesson);
        setCurrentVideoId(lesson.videoId);
        const index = allLessons.findIndex(l => l.lessonId === currentLessonId);
        setCurrentVideoIndex(index !== -1 ? index : 0);
        return;
      }
    }

    // Fallback to first lesson
    const firstLesson = allLessons[0];
    setCurrentLesson(firstLesson);
    setCurrentVideoId(firstLesson.videoId);
    setCurrentVideoIndex(0);
  }, [allLessons, currentLessonId]);

  const goToVideo = useCallback((index: number) => {
    if (index >= 0 && index < allLessons.length) {
      const lesson = allLessons[index];
      setCurrentVideoIndex(index);
      setCurrentLesson(lesson);
      setCurrentVideoId(lesson.videoId);
    }
  }, [allLessons]);

  const goToNextVideo = useCallback(() => {
    if (currentVideoIndex < allLessons.length - 1) {
      goToVideo(currentVideoIndex + 1);
    }
  }, [currentVideoIndex, allLessons.length, goToVideo]);

  const goToPrevVideo = useCallback(() => {
    if (currentVideoIndex > 0) {
      goToVideo(currentVideoIndex - 1);
    }
  }, [currentVideoIndex, goToVideo]);

  return {
    currentVideoId,
    currentLesson,
    currentVideoIndex,
    initializeLesson,
    goToVideo,
    goToNextVideo,
    goToPrevVideo,
    setCurrentLesson,
    setCurrentVideoId
  };
};