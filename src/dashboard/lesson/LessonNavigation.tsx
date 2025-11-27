interface LessonNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalVideos: number;
  onComplete?: () => void;
  isCompleted?: boolean | null;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  onPrev,
  onNext,
  currentIndex,
  totalVideos,
  onComplete,
  isCompleted
}) => {
  return (
    <div className="flex mb-6 justify-between items-center">
      <div className="hidden sm:block">
        {onComplete && !isCompleted && (
          <button
            onClick={onComplete}
            className="bg-yellow-400 hover:bg-green-600 text-white px-6 py-2 text-sm shadow transition-smooth cursor-pointer"
          >
            Mark as Complete
          </button>
        )}
        {isCompleted && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Completed
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`px-6 py-2 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth ${
            currentIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "border border-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-white/70"
          }`}
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex === totalVideos - 1}
          className={`px-6 py-2 cursor-pointer font-semibold uppercase text-sm shadow transition-smooth ${
            currentIndex === totalVideos - 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-white/70"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LessonNavigation;