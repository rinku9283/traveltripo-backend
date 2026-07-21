import React, { useEffect, useState } from 'react';
import '../register/register.css'
import { useNavigate } from 'react-router-dom';

import cityImg4 from '../assets/images/left-img.avif'


function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');




  const navigate = useNavigate();


  const registerHandler = () => {

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('number', number);
    formData.append('address', address);


    fetch('https://traveltripo.com/travel-api/admin/user_register.php', {
      method: 'POST',
      body: formData
    })
      .then((responce) => {
        console.log(responce.json(), 'ressss');
        if (responce.success = true) {
          console.log("Register Successfull")
          navigate('dashboard')
        }
        else {
          console.log("register Failed")
        }

      }

      )

    alert("register Clicked")
    console.log("Name:", name);

  }




  return (
    <div>


      <section className='register-container'>


        <div class="col-lg-12">
          <div class="row ">

            <div class="col-lg-6 left-img">
              <span className='leftOverlay'>
                <h1>Welcome To Back</h1>
                <p>Explore India with Travel Tripo’s exciting hotel packages and unforgettable adventure experiences, crafted to bring comfort, thrill, and unforgettable memories.</p>
              </span>
              <img src={cityImg4} />
            </div>

            <div class="col-lg-6 right-register">
              <div class="data-card h-100">

                <h2 class="card-title">Register Now!</h2>
                <p>Welcome Back — Let’s Continue.</p>

                <div className='row'>

                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <input type="text" class="form-control" onChange={(e) => setName(e.target.value)} placeholder="User Name" required="" />
                      <label for="email">Name</label>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="text" required="" />
                      <label for="email">Email</label>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <input type="text" class="form-control" onChange={(e) => setNumber(e.target.value)} placeholder="text" required="" />
                      <label for="email">Number</label>
                    </div>
                  </div>

                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <input type="text" class="form-control" onChange={(e) => setAddress(e.target.value)} placeholder="text" required="" />
                      <label for="email">Address</label>
                    </div>
                  </div>


                  <div class="col-lg-12">
                    <div class="form-floating mb-2 mt-1">
                      <button type="submit" onClick={() => registerHandler()} class="btn btn-primary w-100 btn-register" id="registerBtn">
                        <span id="btnText">Register</span>
                      </button>
                      <div className='dont-account'>
                        <p>If you have account? <a href='/login'>Login Here</a></p>
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

export default Register;
