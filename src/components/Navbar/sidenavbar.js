//React Router Setup
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "boxicons";

import React, { Component } from 'react';
import "./sidenavbar.css";
import profile_img from "./fardin.png";
import bauet_scope from "./scope.png";
import { useLogout } from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import { useState } from "react";

import Introduction from "../Introduction/Introduction";
import { useAuthContext } from './../../hooks/useAuthContext';



  

function SideNavbar() {
  const { logout, isPending } = useLogout();



  return (
    <div>

    
    <div className="sidebar close">
      <div className="pika_chu">
        <div>
          <div className="bauet">
            <h1>BAUET</h1>
          </div>
          <div className="scope">
            <h1>SCOPE</h1>
          </div>
        </div>
      </div>

      <ul className="nav-links">
        <li >
         <a>
            <i class="bx bx-message-square-dots"></i>
            <span className="link_name">SCOPE CHAT</span>
          
            
          </a>
        </li>

        <li>
          <div className="iocn-link">
            <a href="#">
              <i class="bx bx-video"></i>
              <span className="link_name">SCOPIX</span>
            </a>
          </div>
        </li>

        <li>
          <div className="iocn-link">
            <a href="#">
              <i className="bx bx-book-alt"></i>
              <span className="link_name">Posts</span>
            </a>
          </div>
        </li>
        <li>
          <a href="#">
            <i class="bx bx-cube"></i>
            <span className="link_name">Bauet Box</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="bx bx-rocket"></i>
            <span className="link_name">Career Trajectory</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bx bx-compass"></i>
            <span className="link_name">Explore</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bx bx-history"></i>
            <span className="link_name">History</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i className="bx bx-cog"></i>
            <span className="link_name">Setting</span>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="bx bx-log-out-circle"></i>
            {!isPending && (
              <span className="link_name" onClick={logout}>
                Log out
              </span>
            )}
            {!isPending && (
              <span className="link_name" disabled>
                Logging out
              </span>
            )}
          </a>
        </li>

        <li>
          <div className="profile-details">
            <img src={profile_img} className="fardin_img"></img>
          </div>
        </li>
      </ul>
    </div>

<div className="intro_COMPONENT">
     <Introduction></Introduction>
</div>

    </div>
  );


 


}




export default SideNavbar;
