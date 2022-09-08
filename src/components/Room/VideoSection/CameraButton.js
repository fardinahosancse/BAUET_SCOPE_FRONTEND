import React, { useState } from "react";
import  SCOPE_Camera from './camera.svg'
import  SCOPE_Camera_Off from './cameraOff.svg'
import * as WebRTCHandler from '../../..//utils/webRTCHandler'
const CameraButton = () => {

  const [isVideoDisabled, setisVideoDisabled] = useState(false);

  const handleCameraButtonPressed = () => {
    WebRTCHandler.toggleCamera(isVideoDisabled);
    setisVideoDisabled(!isVideoDisabled);
  };

  return (
    <div className="video_button_container">
      <img
        src={isVideoDisabled ? SCOPE_Camera : SCOPE_Camera_Off}
        onClick={handleCameraButtonPressed}
        className="video_button_image"
      />
    </div>
  );
};
export default CameraButton;
