import React, {useState, useEffect} from "react";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

const FluidPlayer = ({video, img}) => {
  const [videoPath, setVideoPath] = useState('')
  console.log(videoPath);
  useEffect(()=>{
    setVideoPath(video)
  }, [video])
  return (
    <div className="mx-auto" >
      <Video
        // autoPlay
        loop
        // muted
        style={{height:'480px'}}
        controls={["PlayPause", "Seek", "Volume", "Fullscreen"]}
        poster={img}
      >
        <source src={videoPath} type="video/mp4" />

      </Video>
    </div>
  );
};

export default FluidPlayer;
