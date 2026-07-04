import React from 'react';

import '../left-menu/left-menu.css'
import { Link } from 'react-router-dom';

import logoImg from '../assets/images/Small-Logo.png'



const closeHandler=()=>{  
  let navItem = document.querySelector('#sidebar');
  navItem.classList.add('activeHide');
}


function leftMenu() {
  return (
    <div>
      <div class="sidebar activeHide" id="sidebar">
      
        <div class="sidebar-brand">

          <span className='crossIcons' onClick={()=>closeHandler()}>
            <i className='fas fa-close'></i>
          </span>
          
        <img src={logoImg} />
        {/* <h2>LMS</h2> */}

        </div>
        <ul class="sidebar-nav">
          <li class="sidebar-item">
            <Link to="/dashboard" class="sidebar-link active">
              <i class="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li class="sidebar-item">
            <Link  to="/add-city" class="sidebar-link">
              <i class="fas fa-chart-bar"></i>
              <span>City</span>
            </Link>
          </li>
          <li class="sidebar-item">
            <Link  to="/hotel-list" class="sidebar-link">
              <i class="fas fa-file-alt"></i>
              <span>Hotels</span> 
             
            </Link>
          </li>
          <li class="sidebar-item">
            <Link  to="/packages-list" class="sidebar-link">
              <i class="fas fa-chart-bar"></i>
              <span>Packages</span>
            </Link>
          </li>
          <li class="sidebar-item">
            <Link  to="/advanture-list" class="sidebar-link">
              <i class="fas fa-file-alt"></i>
              <span>Advanture</span>
            </Link>
          </li>
         
          {/* <li class="sidebar-item">
            <Link  to="/leads" class="sidebar-link">
              <i class="fas fa-users"></i>
              <span>Leads</span>
            </Link>
          </li> */}
         
          <li class="sidebar-item">
            <Link to="listing" class="sidebar-link">
              <i class="fas fa-list"></i>
              <span>Listing</span>
            </Link>
          </li>

           {/* <li class="sidebar-item">
            <Link to="owners" class="sidebar-link">
              <i class="fas fa-house-user"></i>
              <span>Owners</span>
            </Link>
          </li> */}
          {/* <li class="sidebar-item">
            <Link to="owners" class="sidebar-link">
              <i class="fas fa-paper-plane"></i>
              <span>Send Email</span>
            </Link>
          </li>  */}
        </ul>
      </div>
    </div>
  );
}

export default leftMenu;
