import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useSwipeable } from "react-swipeable";
import VideoReel from "../components/VideoReel";
import videoData from "../jsondata/videodata.json";
import "./Video.css";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import { TfiCommentAlt } from "react-icons/tfi";
import { GoHeartFill } from "react-icons/go";

const Video = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<"up" | "down" | null>(
    null
  );
  const [isLiked, setIsLiked] = useState(false);
  const [isLikedAnimation, setIsLikedAnimation] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const handleSwipe = (direction: string) => {
    if (direction === "UP" && currentIndex < videoData.length - 1) {
      setSwipeDirection("up");
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else if (direction === "DOWN" && currentIndex > 0) {
      setSwipeDirection("down");
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe("UP"),
    onSwipedDown: () => handleSwipe("DOWN"),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  const handleLike = () => {
    setIsLiked(!isLiked);
    setIsLikedAnimation(true);
    setTimeout(() => setIsLikedAnimation(false), 1300);
  };

  return (
    <IonPage>
      <IonContent {...swipeHandlers} fullscreen className="main_container">
        {videoData.map((video, index) => (
          <div
            key={video.id}
            className={`video-container ${
              index === currentIndex
                ? swipeDirection === "up"
                  ? "slide-in-from-bottom"
                  : "slide-in-from-top"
                : swipeDirection === "up"
                ? "slide-out-to-top"
                : "slide-out-to-bottom"
            }`}
            style={{
              display: index === currentIndex ? "block" : "none",
              height: "100vh",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <VideoReel videoUrl={video.url} isActive={index === currentIndex} />
            {/* Right-hand side buttons */}
            <div className="right_btns">
              <div className="btn_container">
                {isLiked ? (
                  <IoMdHeart
                    size={40}
                    className="heart_liked"
                    onClick={() => setIsLiked(!isLiked)}
                    color="red"
                  />
                ) : (
                  <IoIosHeartEmpty
                    size={40}
                    className="heart_unliked"
                    onClick={handleLike}
                    color="white"
                  />
                )}
                <span className="text">{video.likes}</span>
              </div>
              <div className="btn_container">
                <TfiCommentAlt
                  size={30}
                  className="heart_unliked"
                  color="white"
                />
                <span className="text">{video.comments}</span>
              </div>
              <div className="btn_container">
                <PiShareFatLight
                  size={30}
                  className="heart_unliked"
                  color="white"
                />
                <span className="text">{video.shares}</span>
              </div>
            </div>
            {/* Left description section */}
            <div
              className="desc_container_normal"
              onClick={() => setIsDescExpanded(!isDescExpanded)}
            >
              <div className="icon_creator_container">
                <img src={video["vid-icon"]} alt="icon" width={40} />
                <span className="creator_name">{video["vid-creator"]}</span>
              </div>
              <div className="title">{video["vid-title"]}</div>
              {isDescExpanded ? (
                <div className="desc">{video["vid-desc"]}</div>
              ) : (
                <div className="desc_short">{video["vid-desc-short"]}</div>
              )}
            </div>
            {/* Liked overlay section */}
            <div
              className={
                isLikedAnimation ? `liked_overlay` : `liked_overlay_hidden`
              }
            >
              <GoHeartFill color="red" size={80} className="liked_heart" />
            </div>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Video;
