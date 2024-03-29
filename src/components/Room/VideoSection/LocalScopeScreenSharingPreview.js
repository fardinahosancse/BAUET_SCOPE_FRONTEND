import React, { useRef, useEffect} from "react";

const LocalScopeScreenSharingPreview = ({ stream }) => {
  const localPreviewRef = useRef();

  useEffect(() => {
    const video = localPreviewRef.current;
    video.srObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    };
  }, [stream]);

  return (
    <div className='local_screen_share_preview'>
      <video muted autoPlay ref={localPreviewRef}></video>
    </div>
  );
};

export default LocalScopeScreenSharingPreview;

