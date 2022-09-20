//React Router Setup
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import React,{useEffect} from "react";
import "./App.css";
import { connectWithSocketIOServer } from "./utils/wss";
//Route Pages
import SideNavbar from "./components/Navbar/sidenavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import JoinRoom from "./components/JoinRoom/JoinRoom";
import Room from "./components/Room/Room";
import Introduction from "./components/Introduction/Introduction";

function App() {

useEffect(()=>{
  connectWithSocketIOServer();
},[]);



  return (
    <div className="App">
      <BrowserRouter>
        <div className="containter">
          <Routes>

          <Route exact path="/" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/nav" element={<SideNavbar/>}/>

        
          <Route exact path="/room" element={<Room/>}/>
          <Route exact path="/joinroom" element={<JoinRoom/>}/>\
          <Route exact path="/intro" element={<Introduction/>}/>


          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
