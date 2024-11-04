import React, { useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { useSwipeable } from "react-swipeable";
import VideoReel from "../components/VideoReel";
import videoData from "../jsondata/videodata.json";
import "./Video.css";

// icons
import { IoMdHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import { TfiCommentAlt } from "react-icons/tfi";

const Video = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const handleSwipe = (direction) => {
    if (direction === "UP" && currentIndex < videoData.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      console.log("Swiped up - Index:", currentIndex + 1);
    } else if (direction === "DOWN" && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      console.log("Swiped down - Index:", currentIndex - 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => handleSwipe("UP"),
    onSwipedDown: () => handleSwipe("DOWN"),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <IonPage>
      <IonContent {...swipeHandlers} fullscreen>
        {videoData.map((video, index) => (
          <div key={video.id}>
            <div
              style={{
                display: index === currentIndex ? "block" : "none",
                height: "100vh",
                width: "100%",
                overflow: "hidden",
              }}
            >
              <VideoReel
                key={video.id} // Unique key for each video
                videoUrl={video.url}
                isActive={index === currentIndex}
              />
              {/* right hand side buttons section start */}
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
                      onClick={() => setIsLiked(!isLiked)}
                      color="white"
                    />
                  )}
                  <span className="text">3.6k</span>
                </div>

                <div className="btn_container">
                  <TfiCommentAlt
                    size={30}
                    className="heart_unliked"
                    color="white"
                  />
                  <span className="text">350</span>
                </div>
                <div className="btn_container">
                  <PiShareFatLight
                    size={30}
                    className="heart_unliked"
                    color="white"
                  />
                  <span className="text">1k</span>
                </div>
              </div>
              {/* right hand side buttons section end */}

              {/* left description section start */}
              <div
                className="desc_container_normal"
                onClick={() => {
                  setIsDescExpanded(!isDescExpanded);
                }}
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
              {/* left description section end */}
            </div>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Video;