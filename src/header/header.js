import React from 'react';
import { useNavigate } from "react-router-dom";

import userIcon from '../assets/images/user-icon.png'
import '../header/header.css'




function Header() {

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userLogin");
    navigate('/login');  // ✔ MUST have leading slash
  };


  const leftMenuHandler = () => {
    const navItem = document.querySelector('.sidebar');
    navItem.classList.remove('activeHide');
    navItem.classList.add('activeShow');
  }

  const profileHandler = ()=> {
       const userProfile =  document.querySelector('.profile-list').classList.toggle('active')

       if(userProfile === true){
        document.querySelector('.profile-list').classList.add('profileShow')
        document.querySelector('.profile-list').classList.remove('profileHide')
       }
       else{
        document.querySelector('.profile-list').classList.add('profileHide')
        document.querySelector('.profile-list').classList.remove('profileShow')
       }
  }






  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-light bg-white">
        <div class="container-fluid">
          <button class="navbar-toggler d-lg-none" onClick={() => leftMenuHandler()} type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#"></a>

          <div class="user-profile">
            <p className='userImg' onClick={()=>profileHandler()}><img src={userIcon} />Satendra Singh</p>
            <ul className='profile-list  profileHide'>
              <li><a href='#'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="2" />
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="2" />
                </svg>Profile</a></li>
              <li><a href='#'>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="2" />
                  <path d="M21 12H9" stroke="currentColor" stroke-width="2" />
                  <path d="M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2"
                    stroke="currentColor" stroke-width="2" />
                </svg>Logout</a></li>
            </ul>

          </div>

          <div class="d-flex align-items-center d-none">
            <ul class="navbar-nav">
              <li class="nav-item dropdown user-dropdown">
                <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={userIcon} alt="User" class="user-avatar me-2" />
                  <span class="d-md-inline">Satedra Singh</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow">
                  <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Profile</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>

                    <button className="dropdown-item" onClick={logoutHandler}>
                      <i className="fas fa-sign-out-alt me-2"></i> Logout
                    </button>
                  </li>
                  {/* <li><a class="dropdown-item" href="#" onClick={logoutHandler}><i class="fas fa-sign-out-alt me-2"></i>Logout</a></li> */}


                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
