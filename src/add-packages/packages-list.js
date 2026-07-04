import React, { useEffect, useState } from 'react';
import '../add-packages/add-packages.css'
import axios from 'axios';
import confirmIcon from '../../src/assets/images/confirm.gif'
import loaderIcon from '../../src/assets/images/loader.gif'
import { Link } from 'react-router-dom';


function AddPackages() {

  const [packageData, setPackageData] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: For loading state


  const [city, setCity] = useState();
  const [title, setTitle] = useState([]);
  const [days, setDays] = useState();
  const [price, setPrice] = useState();
  const [hotel_type, setHotel_type] = useState();
  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  const [images, setImages] = useState();
  const [food, setFood] = useState();
  const [transport, setTransport] = useState();
  const [sightseeing, setSightseeing] = useState();
  const [video, setVideo] = useState();
  const [policy, setPolicy] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();


  const formData = new FormData();

  formData.append('city', city);
  formData.append('title', title);
  formData.append('days', days);
  formData.append('price', price);
  formData.append('hotel_type', hotel_type);
  formData.append('number', number);
  formData.append('address', address);
  formData.append('images', images);
  formData.append('food', food);
  formData.append('transport', transport);
  formData.append('sightseeing', sightseeing);
  formData.append('video', video);
  formData.append('policy', policy);
  formData.append('description', description);
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

  console.log(Array.from(formData.entries()), 'formData')

  console.log(title, 'cityyy')

  const addHandler = async () => {

    const loginBTN = document.getElementById('loginBtn');
    loginBTN.disabled = true;

    const loaderIcon = document.querySelector('.loaderIcon');
    loaderIcon.classList.add('iconShow')
    loaderIcon.classList.remove('iconHide')

    const btnText = document.querySelector('#btnText');
    if (btnText) {
      btnText.classList.add('textHide')
    }

    try {
      const addPackageList = await axios.post('https://traveltripo.com/travel-api/admin/add-package.php', formData)
      setPackageData(addPackageList.date)

      // alert("Submitted Data successfully")

      setCity("");
      setTitle("")
      setDays("")
      setPrice("")
      setHotel_type("")
      setNumber("")
      setAddress("")
      setImages("")
      setFood("")
      setTransport("")
      setSightseeing("")
      setVideo("")
      setPolicy("")
      setDescription("")
      setStatus("")

      /* Btn Diabled and loader */
      if (addPackageList) {
        const loginBTN = document.getElementById('loginBtn');
        loginBTN.disabled = false;
        const btnText = document.querySelector('#btnText');
        if (btnText) {
          btnText.classList.remove('textHide')
          btnText.classList.remove('textHide---')
          
        }
      }

      if (addPackageList) {
        const loaderIcon = document.querySelector('.loaderIcon');
        loaderIcon.classList.add('iconHide')
        loaderIcon.classList.remove('iconShow')


      

        const messagePop = document.querySelector('.pop-container')
        messagePop.classList.remove('hide')
        messagePop.classList.add('show')


        
      }

    } catch (error) {
      console.error(error)
    }
  }





  const closeMsgHandler = () => {
    const itemCross = document.querySelector('.pop-container')
    itemCross.classList.remove('show')
  }

  const [packagesData, setPackagesData] = useState([]);
  const [packagesBookingData, setBookingPackagesData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const allBookingCount = async () => {

      try {
        const allPackageResp = await axios.get('https://traveltripo.com/travel-api/admin/all-packages-booking.php')
        setBookingPackagesData(allPackageResp?.data.data)


        const allHotelListResp = await axios.get('https://traveltripo.com/travel-api/admin/all-packages-list.php')
        setPackagesData(allHotelListResp.data.data)
        setLoading(false);
        console.log(allHotelListResp, 'allHotelListResp')
      }
      catch (error) {
        console.error(error)
      }
    }
    allBookingCount()

  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const filteredListings = packagesData.filter(item =>
    item.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  console.log(packagesData, '------')

  const deleteHandler = async (id) => {

    const formData = new FormData()
    formData.append('id', id)


    try {
      const deleteResp = await axios.post('https://traveltripo.com/travel-api/admin/delete-package.php', formData)
      if (deleteResp) {
        alert("Deleted Successfully")
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

          <div class="row g-4 mb-4 mt-2">

            <div class="col-md-6 animate-fadeIn delay-3">
              <div class="card stat-card card-warning text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Total Booking</h5>
                  <p class="card-value">{packagesBookingData?.length}</p>
                  {/* <div class="d-flex align-items-center">
                <span class="badge bg-white text-warning me-2"><i class="fas fa-arrow-down me-1"></i> 1.2%</span>
                <small>vs last month</small>
              </div> */}

                </div>
              </div>
            </div>

         
            <div class="col-md-6 animate-fadeIn delay-3">
              <div class="card stat-card card-info text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Listed Advanture </h5>
                  <p class="card-value">{packagesData?.length}</p>
                  {/* <div class="d-flex align-items-center">
                <span class="badge bg-white text-info me-2"><i class="fas fa-arrow-up me-1"></i> 1.2%</span>
                <small>vs last month</small>
              </div> */}

                </div>
              </div>
            </div>



          </div>


       

          <div class="col-lg-12">
            <div className='card data-card'>
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0">Packages List</h5>
                <Link  to="/add-packages"><button type="submit" class="btn btn-primary float-end add-btn">+ Add</button></Link> 

                <div class="input-group search-box">
                  <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>
                  <input type="text" id="tableSearch" class="form-control border-0" value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name" />              </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover" id="transactionTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>City</th>
                        <th>Title</th>
                        <th>Days</th>
                        <th>Hotel Type</th>
                        <th>Number</th>
                        <th>Address</th>
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
                    ) : 
                    (
                      currentItems?.map((items) =>

                        (

                          <tr>
                            <td>{items.id}</td>
                            <td>{items.city}</td>
                            <td>{items.title}</td>
                            <td>{items.days}</td>
                            <td>{items.hotel_type}</td>
                            <td>{items.number}</td>
                            <td>{items.address}</td>
                            <td>{items.price}</td>
                            <td><span className='status'>{items.status}</span></td>
                            <td className='text-right' class="action-width">

                              <button class="btn btn-sm btn-outline-primary" onClick={() => deleteHandler(items.id)}>
                                <i class="fas fa-delete"></i> Delete
                              </button>
                            </td>
                          </tr>

                        )


                        )
                    )


                    }


                      <td></td>
                      <td>

                      </td>



                    </tbody>
                  </table>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, packagesData.length)} of {packagesData.length} entries
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
              <h1>Packages Added Successfully</h1>

            </div>

          </div>
        </div>
      </div>

    </div>


  );
}

export default AddPackages;
