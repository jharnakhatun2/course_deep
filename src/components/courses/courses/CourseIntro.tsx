const CourseIntro = () => {
  return (
    <div>
      <h4 className="font-semibold mb-2 uppercase text-xs text-zinc-500">
        Course Intro
      </h4>
      <div className="h-[1px] w-full bg-gray-500/20 my-3"></div>
      <iframe
        className="w-full h-full"
        src="https://www.youtube-nocookie.com/embed/7IgVGSaQPaw?si=YUIJfP4pMROE3zDE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default CourseIntro;
