const FeatureCourse = () => {
  return (
    <div className="flex flex-col w-full lg:max-w-lg p-6 space-y-6 overflow-hidden bg-white/20 text-gray-900 border border-white backdrop-blur-2xl">
      <div>
        <div className="w-full h-60 sm:h-80 md:h-96 mb-4 ">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/7IgVGSaQPaw?si=YUIJfP4pMROE3zDE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <h2 className="mb-1 text-lg sm:text-xl font-semibold">
          The Complete Machine Learning Roadmap
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Go from zero to a machine learning engineer in 12 months. This
          step-by-step roadmap covers the essential skills you must learn to
          become a machine learning engineer in 2025
        </p>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="space-x-2">{/* Buttons */}</div>
        <div className="flex space-x-2 text-sm text-gray-600">
          {/* Comments + Likes */}
        </div>
      </div>
    </div>
  );
};

export default FeatureCourse;
