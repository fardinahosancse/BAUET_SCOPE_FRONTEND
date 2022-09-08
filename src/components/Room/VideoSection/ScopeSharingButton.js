import React, { useState } from "react";
import Scope_Sharing from "./switchToScreenSharing.svg";
import LocalScopeScreenSharingPreview from "./LocalScopeScreenSharingPreview";
import * as WebRTCHandler from '../../..//utils/webRTCHandler'
const constraints = {
  audio: false,
  video: true,
};

const ScopeSharingButton = () => {
  const [isScopeSharingActive, setisScopeSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScope_Share_ButtonPressed = async () => {
    if (!isScopeSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error  occured when trying  to get access to scope sharing stream"
        );
      }
      if (stream) {
        setScreenSharingStream(stream);
        WebRTCHandler.toggleScreenShare(isScopeSharingActive,stream);
        setisScopeSharingActive(true);
      } 
    }else {
      WebRTCHandler.toggleScreenShare(isScopeSharingActive);
      setisScopeSharingActive(false);
      setScreenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }

   
  };
  return (
    <>
      <div className="video_button_container">
        <img
          src={Scope_Sharing}
          onClick={handleScope_Share_ButtonPressed}
          className="video_button_image"
        />
      </div>
      {isScopeSharingActive && (
        <LocalScopeScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default ScopeSharingButton;
