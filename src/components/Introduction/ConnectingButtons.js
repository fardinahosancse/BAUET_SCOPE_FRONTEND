import React from "react";
import ConnectingButton from "./ConnectingButton";
import { useNavigate } from 'react-router-dom';



const ConnectingButtons = () => {
  let navigate = useNavigate();

  const pushToJoinRoomPage = () => {
    navigate('/JoinRoom');
  };

  const pushToJoinRoomPageAsHost = () => {
    navigate('/JoinRoom?host=true');
  };

  return (
    <div className="connecting_buttons_container">
      <ConnectingButton
        buttonText="Join a Scope  meeting"
        onClickHandler={pushToJoinRoomPage}
      />
      <ConnectingButton
        createRoomButton
        buttonText="Host a Scope meeting"
        onClickHandler={pushToJoinRoomPageAsHost}
      />
    </div>
  );
};

export default ConnectingButtons;
