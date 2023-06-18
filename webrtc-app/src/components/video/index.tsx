import React, { VideoHTMLAttributes, useEffect, useRef } from "react";

type PropsType = VideoHTMLAttributes<HTMLVideoElement> & {
  srcObject: MediaStream;
};

function Video({ srcObject, ...props }: PropsType) {
  const { id } = props;
  const refVideo = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!refVideo.current) return;
    refVideo.current.srcObject = srcObject;
  }, [srcObject]);

  const handleVideoClick = () => {
    if (!id) return;
    const videoElement = document.getElementById(id);
    if (videoElement?.requestFullscreen) {
      videoElement.requestFullscreen();
    }
  };

  return <video ref={refVideo} onClick={handleVideoClick} {...props} />;
}

export default React.memo(Video);
