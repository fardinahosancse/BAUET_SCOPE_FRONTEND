
import React from "react";

const LeaveScopeButton = () => {

const handleScopeRoomDisconnection=()=>{
    const siteUrl=window.location.origin;
    window.location.href =siteUrl;
}


  return (
    <div className="video_button_container">
    <button className="video_button_end" onClick={handleScopeRoomDisconnection}>

        Leave Scope
    </button>
    </div>
  );
};

export default LeaveScopeButton;
