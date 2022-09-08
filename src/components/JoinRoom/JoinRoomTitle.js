import React from "react";

const JoinRoomTitle = ({ isRoomHost }) => {
  const titleText = isRoomHost ? "Host a SCOPE meeting" : "Join a SCOPE meeting";

  return <p className="join_room_title">{titleText}</p>;
};

export default JoinRoomTitle;
