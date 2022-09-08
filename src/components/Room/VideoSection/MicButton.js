import React, { useState } from "react";
import SCOPE_MicB from "./mic.svg";
import SCOPE_MicB_OFF from "./micOff.svg";
import * as WebRTCHandler from '../../..//utils/webRTCHandler'

const MicButton = () => {
  const [isMicMuted, setIsMicMuted] = useState(false);

  const handleMicButtonPressed = () => {
    WebRTCHandler.toggleMic(isMicMuted);
    setIsMicMuted(!isMicMuted);
  };

  return (
    <div className="video_button_container">
      <img
        src={isMicMuted ? SCOPE_MicB_OFF : SCOPE_MicB}
        onClick={handleMicButtonPressed}
        className="video_button_image"
      />
    </div>
  );
};

export default MicButton;
