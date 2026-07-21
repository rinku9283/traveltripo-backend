import React, { useEffect, useState } from 'react';
import '../login/login.css'
import { useNavigate } from 'react-router-dom';

import cityImg4 from '../assets/images/left-img.avif'


function Login({ setUserLogin }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const navigate = useNavigate();

  // // console.log(formData,'formdata');

  // console.log(Object.fromEntries(formData), 'formdata111')


  // const finalData = formData

  // console.log(finalData, 'finaldata');



  const loginHandler = () => {


    const formData = new FormData();

    formData.append('username', username);
    formData.append('password', password);



    fetch('https://traveltripo.com/travel-api/admin/login.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, "API RESPONSE");

        if (data.success === true) {
          console.log("Login Successfull");
          localStorage.setItem("userLogin", "true");
          setUserLogin(true);
          navigate('/dashboard');
        } else {
          console.log("Login Failed");
          setUsername('');
          setPassword('');
          alert("Invalid username or password");
         
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  const navigateRegister = useNavigate();

  const registerHandler = () => {
    navigateRegister('register')
  }




  return (
    <div>


      <section className='login-container'>


        <div class="col-lg-12">
          <div class="row ">

            <div class="col-lg-6 left-img">
              <span className='leftOverlay'>
                <h1>Welcome To Back</h1>
                <p>Explore India with Travel Tripo’s exciting hotel packages and unforgettable adventure experiences, crafted to bring comfort, thrill, and unforgettable memories.</p>
              </span>
              <img src={cityImg4} />
            </div>

            <div class="col-lg-6 right-login">
              <div class="data-card h-100">

                <h2 class="card-title">Login</h2>
                <p>Welcome Back — Let’s Continue.</p>

                <div className='row'>

                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <input type="text" class="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="User Name" required="" />
                      <label for="email">Username</label>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <input type="text" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required="" />
                      <label for="email">Password</label>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <button type="submit" onClick={() => loginHandler()} class="btn btn-primary w-100 btn-login" id="loginBtn">
                        <span id="btnText">Login</span>
                      </button>
                      <div className='dont-account' >

                        <p>If you dont have account? <a className='aLink' onClick={() => registerHandler()}>Register Here</a></p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>



      </section>


    </div>


  );
}

export default Login;
