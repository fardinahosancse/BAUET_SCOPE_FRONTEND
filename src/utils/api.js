import axios from 'axios'

const  bauetServerAPI = 'https://bauetscope-server.herokuapp.com/api'



export const getRoomExists = async(roomId) =>{
    const response = await axios.get(`${bauetServerAPI}/room-exists/${roomId}`);
    return response.data;
  };

  export const getTURNCredentials = async () => {
    const response = await axios.get(`${bauetServerAPI}/get-turn-credentials`);
    return response.data;
  }; 