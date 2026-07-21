import React, { useEffect, useState } from 'react';
import '../add-advanture/add-advanture.css'
import axios from 'axios';
import confirmIcon from '../../src/assets/images/confirm.gif'
import loaderIcon from '../../src/assets/images/loader.gif'
import { Link } from 'react-router-dom';



function AddAdvanture() {

  const [packageData, setPackageData] = useState([]);
  const [loading, setLoading] = useState(true); // Optional: For loading state


  const [city, setCity] = useState();
  const [advanture_name, setAdvantureName] = useState([]);
  const [price, setPrice] = useState();
  const [advanture_type, setAdvantureType] = useState();
  const [transport, setTransport] = useState();
  const [images, setImages] = useState();

  const [number, setNumber] = useState();
  const [address, setAddress] = useState();
  const [video, setVideo] = useState();


  const [description, setDescription] = useState();
  const [privacy, setPrivacy] = useState();
  const [date, setDate] = useState();
  const [status, setStatus] = useState();


  const formData = new FormData();

  formData.append('city', city);
  formData.append('advanture_name', advanture_name);
  formData.append('price', price);
  formData.append('advanture_type	', advanture_type);
  formData.append('transport', transport);
  formData.append('images', images);

  formData.append('number', number);
  formData.append('address', address);
  formData.append('video', video);

  formData.append('description', description);
  formData.append('privacy', privacy);
  formData.append('date', date);
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

      const addAdvantureResp = await axios.post('https://traveltripo.com/travel-api/admin/add-advanture.php', formData)
      setPackageData(addAdvantureResp.date)

     
      setCity("");
      setAdvantureName("")
      setPrice("")
      setAdvantureType("")
      setTransport("")
      setImages("")
      setNumber("")
      setAddress("")
      setVideo("")
      setDescription("")
      setPrivacy("")
      setDate("")
      setStatus("")
      /* Btn Diabled and loader */
      if (addAdvantureResp) {
        const loginBTN = document.getElementById('loginBtn');
        loginBTN.disabled = false;
        const btnText = document.querySelector('#btnText');
        if (btnText) {
          btnText.classList.remove('textHide')
          btnText.classList.remove('textHide---')

        }
      }

      if (addAdvantureResp) {
        const loaderIcon = document.querySelector('.loaderIcon');
        loaderIcon.classList.add('iconHide')
        loaderIcon.classList.remove('iconShow')




        const messagePop = document.querySelector('.pop-container')
        messagePop.classList.remove('hide')
        messagePop.classList.add('show')



      }
    } catch (error) {
      console.log(error)
    }
  }




  const closeMsgHandler = () => {
    const itemCross = document.querySelector('.pop-container')
    itemCross.classList.remove('show')
  }



  const [advantureData, setAdvantureData] = useState([]);
  const [advantureBookingData, setBookingAdvantureData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const allBookingCount = async () => {
      const allPackageResp = await axios.get('https://traveltripo.com/travel-api/admin/all-advanture-booking.php')
      setBookingAdvantureData(allPackageResp.data.data)

      const allHotelListResp = await axios.get('https://traveltripo.com/travel-api/admin/all-advanture-list.php')
      setAdvantureData(allHotelListResp.data.data)
      setLoading(false);
    }
    allBookingCount()
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const filteredListings = advantureData.filter(item =>
    item.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  console.log(advantureData, '------')

  const deleteHandler = async (id) => {

    const formData = new FormData()
    formData.append('id', id)
    try {
      const allDeleteResp = await axios.get('https://traveltripo.com/travel-api/admin/delete-advanture.php', formData)
      if (allDeleteResp) {
        alert("Deleted Successfully")
      }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div>
      <div class="content pt-5 pt-common">
        <div class="advantureList container-fluid mt-3">

          <div class="row g-4 mb-4 mt-2">


            <div class="col-6 col-md-6 animate-fadeIn delay-3">
              <div class="card stat-card card-warning text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Booking</h5>
                  <p class="card-value">{advantureBookingData?.length}</p>
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
                  <h5 class="card-title">Listed  </h5>
                  <p class="card-value">{advantureData?.length}</p>
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
                <h5 class="card-title mb-0">Advanture List</h5>
                <Link  to="/add-advanture"><button type="submit" class="btn btn-primary float-end add-btn">+ Add</button></Link> 

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
                        <th>advanture_name</th>
                        <th>price</th>
              
                        <th>Number</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        [...Array(5)].map((_, i) => (
                          <tr key={i}>
                            {[...Array(9)].map((_, j) => (
                              <td key={j}>
                                <div className={`skeleton ${j === 11 ? 'btn-skeleton' : ''}`}></div>
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : currentItems?.length > 0 ? (
                        currentItems.map((items) => (
                          <tr key={items.id}>
                            <td>{items.id}</td>
                            <td>{items.city}</td>
                            <td>{items.advanture_name}</td>
                            <td>{items.price}</td>
                         
                            <td>{items.number}</td>
                            <td>{items.address}</td>
                            <td><span className='status'>{items.status}</span></td>
                            <td className="text-right action-width">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => deleteHandler(items.id)}
                              >
                                <i className="fas fa-trash"></i> Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" style={{ textAlign: "center" }}>
                            No data found
                          </td>
                        </tr>
                      )}



                      <td></td>
                      <td>

                      </td>



                    </tbody>
                  </table>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="text-muted">
                    Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, advantureData.length)} of {advantureData.length} entries
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
              <h1>Advanture Added Successfully</h1>

            </div>

          </div>
        </div>
      </div>
    </div>


  );
}

export default AddAdvanture;
