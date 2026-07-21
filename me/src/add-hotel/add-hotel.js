import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loaderIcon from '../../src/assets/images/loader.gif'
import '../add-hotel/add-hotel.css'
import confirmIcon from '../../src/assets/images/confirm.gif'
import { Link } from 'react-router-dom';
import Doughnut from '../use-chart/use-doughnut';
import Bar from '../use-chart/use-bar';
import Polar from '../use-chart/use-polar';


function AddHotel() {


  const [listings, setListings] = useState([]);

  const [loading, setLoading] = useState(true); // Optional: For loading state

  const [error, setError] = useState(null); // Optional: For error handling

  const [searchTerm, setSearchTerm] = useState('');




  const [property_type, setProperty_Type] = useState();
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
  const [checkin_time, setCheckinTime] = useState();
  
  
  const [food_type, setFoodType] = useState();
  const [breakfast, setBreakfast] = useState();


  const [car_parking, setCar_parking] = useState();
  const [swiming_pool, setSwiming_pool] = useState();
  const [indoor_gym, setIndoor_gym] = useState();

  const [air_condition, setair_condition] = useState();
  const [fridge, setFridge] = useState();
  const [attached_washroom, setAttached_washroom] = useState();
  const [microwave, setMicrowave] = useState();

  const [discription, setDiscription] = useState();
  const [video, setVideo] = useState();
  const [map, setMap] = useState();
  const [policy, setPolicy] = useState();
  const [status, setStatus] = useState();







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
  const itemsPerPage = 5;
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

    formData.append('property_type', property_type);
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
    formData.append('checkin_time', checkin_time);
  
    formData.append('car_parking', car_parking);
    formData.append('swiming_pool', swiming_pool);
    formData.append('indoor_gym', indoor_gym);
  
    formData.append('air_condition', air_condition);
    formData.append('fridge', fridge);
    formData.append('attached_washroom', attached_washroom);
    formData.append('microwave', microwave);

    formData.append('discription', discription);
    formData.append('video', video);
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
      setCheckinTime('');
      setFoodType('');
      setAttached_washroom('');
      setCar_parking('');
      setBreakfast('');
      setMicrowave('');
      setSwiming_pool('');
      setIndoor_gym('');
      setVideo('');
      setMap('');
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
        setCheckinTime('');
        setFoodType('');
        setAttached_washroom('');
        setCar_parking('');
        setBreakfast('');
        setMicrowave('');
        setSwiming_pool('');
        setIndoor_gym('');
        setVideo('');
        setMap('');
        setDiscription('');
        setPolicy('');
       

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
      const deleteRespo = await axios.post('https://traveltripo.com/travel-api/admin/delete-hotel.php', id)

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

          <div class="row g-12 mb-4 mt-4">
            <div class="col-lg-12">
              <div class="card data-card h-100">
                <div className='row'>


                  <div class="col-lg-6">
                    <h5 class="card-title">
                      <Link to="/hotel-list"> <i class="fas fa-arrow-left"></i> </Link>
                      Add Hotels</h5>
                  </div>

                </div>

                <hr />
                <div class="card-body">
                  <form onSubmit={handleSubmit}>

                    <div className='row'>

                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <select class="form-select" onChange={(e) => setProperty_Type(e.target.value)} id="floatingSelect">
                            <option selected>Choose</option>
                            <option value="Hotels">Hotels & Resort</option>
                            {/* <option value="Resorts">Resorts</option>
                            <option value="Camps">Homestay</option>
                            <option value="Camps">Camps</option> */}
                          </select>
                          <label for="floatingSelect">Property Type</label>
                        </div>
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" onChange={(e) => setCity(e.target.value)} id="floatingSelect">
                            <option selected>Choose</option>
                            <option value="Rishikesh">Rishikesh</option>
                            <option value="Mussoorie">Mussoorie</option>
                            <option value="Nanital">Nanital</option>
                            <option value="Manali">Manali</option>
                            <option value="Shimla">Shimla</option>
                            <option value="Goa">Goa</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Kashmir">Kashmir</option>

                          </select>
                          <label for="floatingSelect">City</label>
                        </div>
                      </div>

                      <div class="col-lg-12 mt-4">
                        <div className='mb-2 mt-3'>
                          <b>Contact Details</b>
                        </div>

                        <hr />
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Heading" />
                          <label for="email">Name</label>
                        </div>
                      </div>

                    
                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Description" required="" />
                          <label for="email">Address</label>
                        </div>
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter Description" required="" />
                          <label for="email">Contact Number</label>
                        </div>
                      </div>
                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Description" required="" />
                          <label for="email">Email</label>
                        </div>
                      </div>

                     



                      <div class="col-lg-4">
                        <div class="mb-3">
                          <input
                            className="form-control inputFile"
                            multiple
                            type="file"
                            id="formFile"
                            // value={images} 
                            onChange={(e) => {
                              const files = Array.from(e.target.files);
                              setImages(files); // store File objects, not just names
                            }}
                          />
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div className='mb-2 mt-3'>
                          <b>Hotel Details</b>
                        </div>
                        <hr />
                      </div>


{/* 
                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={room_type} onChange={(e) => setRoom_type(e.target.value)} placeholder="Enter Price" required="" />
                          <label for="email">Bed Type</label>
                        </div>
                      </div> */}

                      <div class="col-lg-4 mb-3">
                        <div class="form-floating">
                          <select class="form-select"  value={room_type} onChange={(e) => setRoom_type(e.target.value)} id="floatingSelect">
                            <option selected>Choose</option>
                            <option value="Standard Room">Standard Room</option>
                            <option value="Deluxe Room">Deluxe Room</option>
                            <option value="Premium Room">Premium Room</option>
                       

                          </select>
                          <label for="floatingSelect">Room Type</label>
                        </div>
                      </div>

                     
                      <div class="col-lg-4 mb-3">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={property_for} onChange={(e) => setProperty_for(e.target.value)}>
                            <option selected>Choose</option>
                            <option value="Couple">Couple</option>
                            <option value="Familiy">Familiy</option>
                            <option value="All">All</option>
                          </select>
                          <label for="floatingSelect">Property For</label>
                        </div>
                      </div>




                      <div class="col-lg-4 mb-3">
                        <div class="form-floating">
                          <select class="form-select" value={landmark} onChange={(e) => setLandmark(e.target.value)} id="floatingSelect">
                            <option selected>Choose</option>
                            <option value="near-bus-stand">Near Bus Stand</option>
                            <option value="near-railway-station">Near Railway Station</option>
                            <option value="near-river">Near River</option>
                            <option value="main-city">Main City</option>


                          </select>
                          <label for="floatingSelect">Near by Landmark</label>
                        </div>
                      </div>





                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Date" required="" />
                          <label for="email">Room Price</label>
                        </div>
                      </div>

{/* 

                      <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Included" required="" />
                          <label for="email">Check in Timing</label>
                        </div>
                      </div> */}

                      
                      <div class="col-lg-4 mb-3">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={checkin_time} onChange={(e) => setCheckinTime(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="12:AM">12:PM to 11:AM</option>
                            <option value="10:AM">10:AM to 9:AM</option>
                            <option value="10:AM">01:PM to 11:AM</option>
                          </select>
                          <label for="floatingSelect">Check in Timing</label>
                        </div>
                      </div>

                      {/* <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={days} onChange={(e) => setDays(e.target.value)} placeholder="Enter Days" required="" />
                          <label for="email">Breakfast</label>
                        </div>
                      </div> */}
                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={food_type} onChange={(e) => setFoodType(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect"> Food Type</label>
                        </div>
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={breakfast} onChange={(e) => setBreakfast(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect">Breakfast</label>
                        </div>
                      </div>

                   


                      <div class="col-lg-12">
                        <div className='mb-2 mt-3'>
                          <b>Hotel Aminities</b>
                        </div>
                        <hr />
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={air_condition} onChange={(e) => setair_condition(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect"> air_condition</label>
                        </div>
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={fridge} onChange={(e) => setFridge(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect"> fridge</label>
                        </div>
                      </div>

                      <div class="col-lg-4 mb-3">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={attached_washroom} onChange={(e) => setAttached_washroom(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect"> attached_washroom</label>
                        </div>
                      </div>

                      <div class="col-lg-4 mb-3">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={microwave} onChange={(e) => setMicrowave(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect"> microwave</label>
                        </div>
                      </div>


                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={car_parking} onChange={(e) => setCar_parking(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect"> Car Parking</label>
                        </div>
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={swiming_pool} onChange={(e) => setSwiming_pool(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect">Swiming Pool</label>
                        </div>
                      </div>

                      <div class="col-lg-4">
                        <div class="form-floating">
                          <select class="form-select" id="floatingSelect" value={indoor_gym} onChange={(e) => setIndoor_gym(e.target.value)}>
                            <option selected>Choose </option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                          <label for="floatingSelect">Indoor Gym</label>
                        </div>
                      </div>


                      {/* <div class="col-lg-4">
                        <div class="form-floating mb-3">
                          <input type="date" class="form-control" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Enter Date" required="" />
                          <label for="email">Date</label>
                        </div>
                      </div> */}

                      <div class="col-lg-12">
                        <div className='mb-2 mt-3'>
                          <b>Important Details</b>
                        </div>
                        <hr />
                      </div>



                      <div class="col-lg-12">
                        <div class="form-floating mb-3">
                          <textarea type="text" class="form-control height-150" value={discription} onChange={(e) => setDiscription(e.target.value)} placeholder="Enter Overview" required="" />
                          <label for="email">Discription</label>


                        </div>
                      </div>


                      <div class="col-lg-12">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={video} onChange={(e) => setVideo(e.target.value)} placeholder="Enter Video" required="" />
                          <label for="email">video</label>


                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="form-floating mb-3">
                          <input type="text" class="form-control" value={map} onChange={(e) => setMap(e.target.value)} placeholder="Enter Map" required="" />
                          <label for="email">Map</label>


                        </div>
                      </div>


                      <div class="col-lg-12">
                        <div class="form-floating mb-3 mt-0">
                          <textarea type="text" class="form-control  height-150" value={policy} onChange={(e) => setPolicy(e.target.value)} placeholder="Enter Overview" required="" />
                          <label for="email">Privacy </label>
                        </div>
                      </div>

                      <div class="col-lg-12">
                        <div class="form-floating mb-3 mt-0">
                          <input type="text" class="form-control" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Enter Status" required="" />                          <label for="email">Status </label>
                        </div>
                      </div>



                      <div class="col-lg-12 mt-3 text-right">
                        <div class="col-lg-1">
                          <div class="form-floating mb-3 textPosition">
                            <button type="submit" onClick={handleSubmit} class="btn btn-primary w-100 btn-login" id="loginBtn">
                              <span id="btnText">Submit</span>
                              <img src={loaderIcon} alt="User" className='loaderIcon iconHide' />

                            </button>
                          </div>
                        </div>
                      </div>


                    </div>
                  </form>
                </div>
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


      {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
      </div> */}
    </div>
  );
}

export default AddHotel;
