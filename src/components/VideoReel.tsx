import React, { useRef, useEffect, useState } from "react";

const VideoReel: React.FC<{ videoUrl: string; isActive: boolean }> = ({
  videoUrl,
  isActive,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  // todo add follow btn
  // todo add muted functionality
  // const [isMuted, setIsMuted] = useState(false);
  // todo control video playback
  // todo comments section overlay
  // todo handle individual likes

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isActive]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        src={videoUrl}
        loop
        // muted={isMuted}
        className="video-reel"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
        onTimeUpdate={handleTimeUpdate}
      />
      <div
        style={{
          position: "absolute",
          bottom: 3,
          left: 0,
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          width: `${progress}%`,
          transition: "width 0.1s ease",
        }}
      />
    </div>
  );
};

export default VideoReel;
