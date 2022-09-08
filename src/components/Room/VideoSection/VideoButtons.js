import React from "react";
import CameraButton from "./CameraButton";
import LeaveScopeButton from "./LeaveScopeButton";
import MicButton from "./MicButton";
import ScopeSharingButton from "./ScopeSharingButton";

const VideoButtons = (props) => {
  return (
    <div className="video_buttons_container">
      <MicButton></MicButton>
      <CameraButton></CameraButton>
      <LeaveScopeButton></LeaveScopeButton>
      <ScopeSharingButton></ScopeSharingButton>
    </div>
  );
};

export default VideoButtons;
