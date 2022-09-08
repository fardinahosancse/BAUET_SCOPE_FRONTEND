import Peer from "simple-peer";
import { setShowOverlay  } from "../store/actions";
import { store } from "./../store/store";
import * as wss from "./wss";
import { fetchTURNCredentials, getTurnIceServers } from "./turn";

const defaultConstrains = {
  audio: true,
 
  video: {
    width: "480",
    height: "360",
  },
};
let localStream;
export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  await fetchTURNCredentials();

  navigator.mediaDevices
    .getUserMedia(defaultConstrains)
    .then((stream) => {
      console.log("successfuly  recieved  local stream");
      localStream = stream;
      showLocalVideoPreview(localStream);
      store.dispatch(setShowOverlay(false));
      isRoomHost
        ? wss.create_BAUET_SCOPE_ROOM(identity)
        : wss.join_BAUET_SCOPE_ROOM(identity, roomId);
    })
    .catch((err) => {
      console.log("error : when trying to get access to local stream");
      console.log(err);
    });
};



let peers = {};
let streams = [];

const getConfiguration = () => {
  const turnIceServers = getTurnIceServers();

  if (turnIceServers) {
    console.warn("Turn Server credential fetched");
    console.warn(turnIceServers);
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
        ...turnIceServers,
      ],
    };
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};




export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
   
  });

  peers[connUserSocketId].on("signal", (data) => {


    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");
    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });




};



export const handleSignalingData =(data) =>{
    peers[data.connUserSocketId].signal(data.signal);
}

////////////////////////////////// UI Videos //////////////////////////////////
const showLocalVideoPreview = (stream) => {
    const videosContainer = document.getElementById("videos_portal");
    videosContainer.classList.add("videos_portal_styles");
    const videoContainer = document.createElement("div");
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.muted = true;
    videoElement.srcObject = stream;
  
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  
    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);
  };
  
  const addStream = (stream, connUserSocketId) => {
    //display incoming stream
    const videosContainer = document.getElementById("videos_portal");
    const videoContainer = document.createElement("div");
    videoContainer.id = connUserSocketId;
  
    videoContainer.classList.add("video_track_container");
    const videoElement = document.createElement("video");
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.id = `${connUserSocketId}-video`;
  
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  
    videoElement.addEventListener("click", () => {
      if (videoElement.classList.contains("full_screen")) {
        videoElement.classList.remove("full_screen");
      } else {
        videoElement.classList.add("full_screen");
      }
    });
  
    videoContainer.appendChild(videoElement);
    videosContainer.appendChild(videoContainer);
  };


  ////////////////////////////////////Buttons Logic/////////////////////////////////////


///////////////Mic Mute////////////////
  export  const  toggleMic=(isMuted)=>{
localStream.getAudioTracks()[0].enabled = isMuted ?true:false;
  }


//////////////Camera off///////////////
  export  const  toggleCamera=(isDisabled)=>{
    localStream.getVideoTracks()[0].enabled = isDisabled ?true:false;
      }
      export const toggleScreenShare = (
        isScreenSharingActive,
        screenSharingStream = null
      ) => {
        if (isScreenSharingActive) {
          switchVideoTracks(localStream);
        } else {
          switchVideoTracks(screenSharingStream);
        }
      };
      
      const switchVideoTracks = (stream) => {
        for (let socket_id in peers) {
          for (let index in peers[socket_id].streams[0].getTracks()) {
            for (let index2 in stream.getTracks()) {
              if (
                peers[socket_id].streams[0].getTracks()[index].kind ===
                stream.getTracks()[index2].kind
              ) {
                peers[socket_id].replaceTrack(
                  peers[socket_id].streams[0].getTracks()[index],
                  stream.getTracks()[index2],
                  peers[socket_id].streams[0]
                );
                break;
              }
            }
          }
        }
      };
      /////////////////////////////

   