import io from "socket.io-client";
import { setRoomId, setParticipants } from "../store/actions";
import store from "../store/store";
import * as WebRTCHandler from "./webRTCHandler";
import { useAuthContext } from './../hooks/useAuthContext';

const BAUET_SCOPE_SERVER = "https://bauetscope-server.herokuapp.com/";

let socket = null;

export const connectWithSocketIOServer = () => {
  socket = io(BAUET_SCOPE_SERVER);
  socket.on("connect", () => {
    console.log("Successfully Connected to the bauet scope socket io server");
    console.log(BAUET_SCOPE_SERVER.id);
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
    console.log(roomId);
  });
  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });
  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    WebRTCHandler.prepareNewPeerConnection(connUserSocketId, false);


   socket.emit('conn-init',{connUserSocketId:connUserSocketId});


  });

  socket.on('conn-signal', (data) => {
    
    WebRTCHandler.handleSignalingData(data);
  });


socket.on('conn-init', (data) => {
    
    const {connUserSocketId} =data;
    WebRTCHandler.prepareNewPeerConnection(connUserSocketId,true)
  });


};

export const create_BAUET_SCOPE_ROOM = (identity) => {
  //EMIT  AN EVENT  TO SERVER  THAT WE WOULD LIKE TO  CREATE NEW ROOM
  const data = {
    identity,
  };
  socket.emit("create-new-room", data);
};

export const join_BAUET_SCOPE_ROOM = (identity, roomId) => {
  const data = {
    roomId,
    identity,
  };
  socket.emit("join-room", data);
};

export const signalPeerData = (data) => {
  socket.emit("conn-signal", data);
};
