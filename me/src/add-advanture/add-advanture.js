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
        <div class="container-fluid mt-3">

         


          <div class="row g-12 mb-4 mt-4">
            <div class="col-lg-12">
              <div class="card data-card h-100">
                <div>
                  <h5 class="card-title"> <Link to="/advanture-list"> <i class="fas fa-arrow-left"></i> </Link>
                    Add Advanture</h5>
                  <hr />
                </div>
                <div class="card-body">
                  <div className='row'>

                    <div class="col-lg-4">
                      <div class="form-floating">
                        <select class="form-select mb-3" value={city} onChange={(e) => setCity(e.target.value)} id="floatingSelect">
                          <option selected>Choose</option>
                          <option value="Rishikesh">Rishikesh</option>
                          <option value="Manali">Manali</option>
                          <option value="Shimla">Shimla</option>
                          <option value="Mussoorie">Mussoorie</option>
                          <option value="Nanital">Nanital</option>
                          <option value="Goa">Goa</option>
                          <option value="Kerala">Kerala</option>
                        </select>
                        <label for="floatingSelect">Choose City</label>
                      </div>
                    </div>

                    <div class="col-lg-4">
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" value={advanture_name} onChange={(e) => setAdvantureName(e.target.value)} placeholder="Enter city" required="" />
                        <label for="email">Advanture Name</label>
                      </div>
                    </div>


                    <div class="col-lg-4">
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Price" required="" />
                        <label for="email">Price</label>
                      </div>
                    </div>



                    <div class="col-lg-4">
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" value={advanture_type} onChange={(e) => setAdvantureType(e.target.value)} placeholder="Enter Type of Advanture" required="" />
                        <label for="email">Advanture Type</label>
                      </div>
                    </div>


                    <div class="col-lg-4 mb-3">
                      <div class="form-floating">
                        <select class="form-select" value={transport} onChange={(e) => setTransport(e.target.value)} id="floatingSelect">
                          <option selected>Choose </option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        <label for="floatingSelect"> Trasport (Included or Not)</label>
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



                    <div class="col-lg-4">
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" value={number} onChange={(e) => setNumber(e.target.value)} placeholder="Enter Price" required="" />
                        <label for="email">Number</label>
                      </div>
                    </div>

                    <div class="col-lg-4">
                      <div class="form-floating mb-3">
                        <input type="text" class="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Price" required="" />
                        <label for="email">Address</label>
                      </div>
                    </div>


                    <div class="col-lg-4">
                      <div class="form-floating mb-0">
                        <input type="text" class="form-control" value={video} onChange={(e) => setVideo(e.target.value)} placeholder="Enter Price" required="" />
                        <label for="email">Video</label>
                      </div>
                    </div>





                    <div class="col-lg-12 mt-3 mb-3">
                      <div class="form-floating mb-0">
                        <textarea type="text" class="form-control height-150" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Overview"></textarea><label for="email">Discription</label>
                      </div>

                    </div>




                  



                    <div class="col-lg-1">
                      <div class="form-floating textPosition mb-2 mt-1">
                        <button type="submit" class="btn btn-primary w-100 btn-login" id="loginBtn">
                          <img src={loaderIcon} alt="User" className='loaderIcon iconHide' />

                          <span id="btnText" onClick={addHandler}>Add</span>
                        </button>
                      </div>
                    </div>

                  </div>
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
