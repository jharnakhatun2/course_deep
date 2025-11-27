// VideoPlayer.tsx
import YouTube, { type YouTubeProps } from "react-youtube";

interface VideoPlayerProps {
  videoId: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  const opts: YouTubeProps['opts'] = {
    height: "450",
    width: "100%",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  // Handle null case first
  if (videoId === null || videoId === undefined || videoId === '') {
    return (
      <div className="w-full h-96 bg-gray-800 flex items-center justify-center rounded">
        <p className="text-white text-lg">Video not available</p>
      </div>
    );
  }

  // Now videoId is definitely string
  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      className="w-full rounded"
      onError={(e) => {
        console.error("YouTube player error:", e);
      }}
    />
  );
};

export default VideoPlayer;