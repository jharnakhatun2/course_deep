interface LessonInfoProps {
  currentLesson: any;
}

const LessonInfo: React.FC<LessonInfoProps> = ({ currentLesson }) => {
  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-zinc-600 mb-2">About this lesson</h3>
      <p className="text-zinc-500 text-sm">
        {currentLesson ? 
          `This lesson is part of ${currentLesson.dayTitle} and covers ${currentLesson.title}.` 
          : "Lesson information not available."
        }
      </p>
    </div>
  );
};

export default LessonInfo;