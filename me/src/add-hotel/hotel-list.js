import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loaderIcon from '../../src/assets/images/loader.gif'
import '../add-hotel/add-hotel.css'
import confirmIcon from '../../src/assets/images/confirm.gif'
import { Link } from 'react-router-dom';


function AddHotel() {


  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true); // Optional: For loading state

  const [error, setError] = useState(null); // Optional: For error handling

  const [searchTerm, setSearchTerm] = useState('');




  const [propery_type, setProperty_Type] = useState();
  const [city, setCity] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();

  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [images, setImages] = useState();
  const [room_type, setRoom_type] = useState();

  const [property_for, setProperty_for] = useState();
  const [landmark, setLandmark] = useState();
  const [price, setPrice] = useState();
  const [days, setDays] = useState();
  const [include, setInclude] = useState();

  const [car_parking, setCar_parking] = useState();
  const [swiming_pool, setSwiming_pool] = useState();
  const [indoor_gym, setIndoor_gym] = useState();
  const [date, setDate] = useState();

  const [air_condition, setair_condition] = useState();
  const [fridge, setFridge] = useState();
  const [attached_washroom, setAttached_washroom] = useState();
  const [microwave, setMicrowave] = useState();

  const [discription, setDiscription] = useState();
  const [map, setMap] = useState();
  const [policy, setPolicy] = useState();
  const [status, setStatus] = useState('yes');






  useEffect(() => {
    const packageList = async () => {

      try {
        const responseList = await axios.get('https://traveltripo.com//travel-api/admin/package-list.php')

        setListings(responseList.data.data);
        setLoading(false);
      }
      catch (error) {
        setError(error.message);
        setLoading(false);
      };
    }
    packageList()
  }, []);




  const [hotelData, setHotelData] = useState([]);
  const [hotelBookingData, setBookingHotelData] = useState([]);


  useEffect(() => {
    const allBookingCount = async () => {
      const allBookingResp = await axios.get('https://traveltripo.com/travel-api/admin/all-hotel-booking.php')
      setBookingHotelData(allBookingResp?.data.data)

      const allHotelListResp = await axios.get('https://traveltripo.com/travel-api/admin/all-hotel-list.php')
      setHotelData(allHotelListResp?.data.data)
    }
    allBookingCount()
  }, [])


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const filteredListings = hotelData.filter(item =>
    item.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const handleSubmit = async (e) => {
    e.preventDefault();


    const loginBTN = document.getElementById('loginBtn');
    loginBTN.disabled = true;

    const loaderIcon = document.querySelector('.loaderIcon');
    loaderIcon.classList.add('iconShow')
    loaderIcon.classList.remove('iconHide')

    const btnText = document.querySelector('#btnText');
    if (btnText) {
      btnText.classList.add('textHide')
    }



    const formData = new FormData();

    formData.append('propery_type', propery_type);
    formData.append('city', city);
    formData.append('name', name);
    formData.append('address', address);
    formData.append('number', number);
    formData.append('email', email);
    formData.append('images', images);
    formData.append('room_type', room_type);
    formData.append('property_for', property_for);
    formData.append('landmark', landmark);
    formData.append('price', price);
    formData.append('days', days);
    formData.append('include', include);
    formData.append('car_parking', car_parking);
    formData.append('swiming_pool', swiming_pool);
    formData.append('indoor_gym', indoor_gym);
    formData.append('date', date);

    formData.append('air_condition', air_condition);
    formData.append('fridge', fridge);
    formData.append('attached_washroom', attached_washroom);
    formData.append('microwave', microwave);

    formData.append('discription', discription);
    formData.append('map', map);
    formData.append('policy', policy);
    formData.append('status', status);

    const fileNames = [];

    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const file = images[i];
        formData.append('images[]', file, file.name); // Send the file with its name
        fileNames.push(file.name); // Save the name separately
      }
    }

    formData.append('images', JSON.stringify(fileNames)); // Send file names as JSON string
    console.log(fileNames, 'imggg url---')

    const obj = Object.fromEntries(formData.entries());
    console.log(obj);


    try {


      const addHotelResp = await axios.post('https://traveltripo.com//travel-api/admin/add-hotel.php', formData)
      console.log(addHotelResp, 'hotellll---')

      /* Btn Diabled and loader */
      if (addHotelResp) {
        const loginBTN = document.getElementById('loginBtn');
        loginBTN.disabled = false;
      }

      if (addHotelResp) {
        const loaderIcon = document.querySelector('.loaderIcon');
        loaderIcon.classList.add('iconHide')
        loaderIcon.classList.remove('iconShow')

        const messagePop = document.querySelector('.pop-container')
        messagePop.classList.remove('hide')
        messagePop.classList.add('show')


        const btnText = document.querySelector('#btnText');
        if (btnText) {
          btnText.classList.remove('textHide')
        }
      }



      // alert("Property is Listed Successfully");

      setProperty_Type('');
      setName('');
      setAddress('');
      setNumber('');
      setEmail('');
      setImages('');
      setRoom_type('');
      setProperty_for('');
      setLandmark('');
      setPrice('');
      setDays('');
      setInclude('');
      setCar_parking('');
      setSwiming_pool('');
      setIndoor_gym('');
      setDate('');
      setDiscription('');
      setPolicy('');
      setStatus('');

      if (addHotelResp?.data) {

        setProperty_Type('');
        setName('');
        setAddress('');
        setNumber('');
        setEmail('');
        setImages('');
        setRoom_type('');
        setProperty_for('');
        setLandmark('');
        setPrice('');
        setDays('');
        setInclude('');
        setCar_parking('');
        setSwiming_pool('');
        setIndoor_gym('');
        setDate('');
        setDiscription('');
        setPolicy('');
        setStatus('');

      }
      // setHotelData(hotelData => [...hotelData, {propery_type}])
    }
    catch (error) {
      console.error("Upload error:", error);
      alert("Something went wrong. Please try again.");
    };
  };

  const closeMsgHandler = () => {
    const itemCross = document.querySelector('.pop-container')
    itemCross.classList.remove('show')
  }


  const deleteHandler = async (id) => {
    const formData = new FormData()
    formData.append('id', id)
    try {
      const deleteRespo = await axios.post('https://traveltripo.com/travel-api/admin/delete-hotel.php', formData)

      if (deleteRespo) {
        alert("Do Want To Deleted")
      }
      else {
        alert("Something went wrong. Please try again.");
      }
    }
    catch (error) {
      console.error(error)
    };
  };



  return (
    <div>
      <div class="content pt-5 pt-common">
        <div class="container-fluid mt-3">


          <div class="row g-4 mb-2 mt-2">

            <div class="col-6 col-md-6 animate-fadeIn delay-3">
              <div class="card stat-card card-warning text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Today Booking</h5>
                  <p class="card-value">{hotelBookingData?.length}</p>
                  {/* <div class="d-flex align-items-center">
                <span class="badge bg-white text-warning me-2"><i class="fas fa-arrow-down me-1"></i> 1.2%</span>
                <small>vs last month</small>
              </div> */}

                </div>
              </div>
            </div>

         
            <div class="col-6 col-md-6 animate-fadeIn delay-3">
              <div class="card stat-card card-info text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Hotels Listed</h5>
                  <p class="card-value">{hotelData?.length}</p>
                  {/* <div class="d-flex align-items-center">
                <span class="badge bg-white text-info me-2"><i class="fas fa-arrow-up me-1"></i> 1.2%</span>
                <small>vs last month</small>
              </div> */}

                </div>
              </div>
            </div>

          </div>

      

          <div class="card data-card mt-4">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0"> Hotel List</h5>
              <div class="input-group search-box">
                <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>
                <input type="text" id="tableSearch" class="form-control border-0" value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name" />
              </div>
              <Link  to="/add-hotel"><button type="submit" class="btn btn-primary float-end add-btn">+ Add</button></Link> 
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover" id="transactionTable">
                  <thead>
                    <tr>
                      <th>ID</th>
                   
                      <th>City</th>
                      <th>Address</th>
                      <th> Number</th>
                      <th>Email</th>
                      <th>Room</th>
                      <th>Property?</th>
                      <th>Near</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      [...Array(5)].map((_, i) => (
                        <tr key={i}>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton"></div></td>
                          <td><div className="skeleton btn-skeleton"></div></td>
                        </tr>
                      ))

                    ) : (
                      currentItems?.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                      
                          <td>{item.city}</td>
                          <td>{item.address}</td>

                          <td>{item.number}</td>
                          <td>{item.email}</td>

                          <td>{item.room_type}</td>
                          <td>{item.property_for}</td>
                          <td>{item.landmark}</td>
                          <td>{item.price}</td>
                          <td><span className='status'>{item.status}</span></td>
                          <td className='text-right' class="action-width">
                            {/* <button class="btn btn-sm btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                                          <i class="fas fa-eye"></i> Edit
                                        </button>
                                        &nbsp; */}
                            <button class="btn btn-sm btn-outline-primary" onClick={() => deleteHandler(item.id)}>
                              <i class="fas fa-delete"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* <div class="d-flex justify-content-between align-items-center mt-3">
                <div class="text-muted">Showing 1 to 4 of 24 entries</div>
                <nav>
                  <ul class="pagination pagination-sm mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                  </ul>
                </nav>
              </div> */}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, listings.length)} of {listings.length} entries
                </div>
                <nav>
                  <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                      <button className="page-link" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <li key={i + 1} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                        <button onClick={() => paginate(i + 1)} className="page-link">
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                      <button className="page-link" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className="modal  pop-container hide" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className='popup-overlay'></div>
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-body">
              <button type="button" class="btn-close" onClick={closeMsgHandler} data-bs-dismiss="modal" aria-label="Close"></button>

              <div>
                <img src={confirmIcon} />
              </div>
              <h1>Hotel Added Successfully</h1>

            </div>

          </div>
        </div>
      </div>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className='popup-overlay'></div>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Record</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">


              <div className='row'>


                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Property Type</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Address</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Number</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Email</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Propert For?</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Landmark</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Price</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Include</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Parking </label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">City</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Pool</label>
                  </div>
                </div>

                <div className='col-lg-3'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">GYM</label>
                  </div>
                </div>

                <div className='col-lg-6'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Discription</label>
                  </div>
                </div>



                <div className='col-lg-6'>
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" required placeholder="name@example.com" />
                    <label for="floatingInputValue">Policy</label>
                  </div>
                </div>




              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddHotel;
