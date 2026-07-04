import React, { useEffect, useState } from 'react';
import axios from "axios";
import '../add-city/add-city.css'
import loaderIcon from '../../src/assets/images/loader.gif'
import confirmIcon from '../../src/assets/images/confirm.gif'
import { alignPropType } from 'react-bootstrap/esm/types';


function AddCity() {




  const [city, setCity] = useState([])

  const [loading, setLoading] = useState(false)

  const [model, setModel] = useState(false);

  const [itemId, setItemID] = useState()



  // const [status_update, setUpdateData] = useState()

  const [city_update, setCityUpdate] = useState([])
  const [status_update, setStatusUpdate] = useState([])

  const [searchTerm, setSearchTerm] = useState('');

  console.log(city_update, 'cityyy')
  console.log(status_update, 'noeee')



  const [cityData, setCityData] = useState([])

  console.log(cityData, 'cityyyydata')

  const formData = new FormData();

  formData.append('city', city)






  const addHandler = async () => {

    try {




      console.log(city, 'cityyyyyy----11')
      if (city.toString().trim() !== "") {


        /* btn */
        const loginBTN = document.getElementById('loginBtn');
        if (loginBTN.disabled = true) {
          loginBTN.classList.add('btn-container')
        }


        const crossIcon = document.querySelector('.loaderIcon')
        console.log(crossIcon, 'crossIcon---')
        if (crossIcon) {
          crossIcon.classList.remove('iconHide')
        }

        console.log(loginBTN, 'btnnnn')

        /* btn text */
        const btnText = document.getElementById('btnText');
        btnText.classList.remove('showBtnText');
        btnText.classList.add('hideBtnText');

        setLoading(true)


        const response = await axios.post('https://traveltripo.com/travel-api/admin/add-city.php', formData)



        /* Btn Diabled and loader */
        if (response) {
          const loginBTN = document.getElementById('loginBtn');
          loginBTN.disabled = false;

          const btnText = document.getElementById('btnText');
          btnText.classList.add('showBtnText');
          btnText.classList.remove('hideBtnText');

          const messagePop = document.querySelector('.pop-container')

          messagePop.classList.remove('hide')
          messagePop.classList.add('show')

          const crossIcon = document.querySelector('.loaderIcon')
          console.log(crossIcon, 'crossIcon---')
          if (crossIcon) {
            crossIcon.classList.add('iconHide')
          }

        }

        if (response) {
          setLoading(false)
        }




        // const btnText1 = document.getElementById('btnText');
        // btnText1.classList.add('showBtnText');
        // btnText1.classList.remove('hideBtnText');

        setCityData(cityData => [...cityData, { city }])

        console.log(response, 'new respoo-----')

        // alert("Submitted Data successfully")

        const responseList = await axios.get('https://traveltripo.com/travel-api/admin/city_list.php')
        setCityData(responseList.data.data)
        setCity("");

      }
      else {
        alert("Plz Enter City Name")
      }

    }
    catch (err) {
      console.log(err)
    }
  }


  const cityListData = async () => {
    setLoading(true)
    const responseCityList = await axios.get('https://traveltripo.com/travel-api/admin/city_list.php')
    setCityData(responseCityList.data.data)

    if (responseCityList) {
      setLoading(false)
    }
    //   else{
    //     setLoading(false)
    //   }
  }




  useEffect(() => {
    cityListData()
  }, [])


  const updateHandler = async (id) => {
    await axios.get(`https://traveltripo.com/travel-api/admin/update-city.php?id=${id}`)
      .then((response) => {
        return (
          setCityUpdate(response.data?.data.city),
          // setNoteUpdate(response.data?.data.note),
          setItemID(id)

        )
      })

    setModel(true)

  }




  const editHandler = async () => {

    await axios.post(`https://traveltripo.com/travel-api/admin/edit-city.php?id=${itemId}&city=${city_update}&status=${status_update}`)
      .then(res => console.log(res.data)

      )
      .catch(err => console.error(err));
    axios.get('https://traveltripo.com/travel-api/admin/city_list.php')
      .then((response) => setCityData(response.data.data))

    setModel(false)

  };



  const deleteHandler = async (id) => {

    const formData = new FormData()
    formData.append('id', id)

    try {
      await axios.post('https://traveltripo.com/travel-api/admin/delete-city.php', formData)
        .then(data => alert("Do Want To Deleted"))
      setCityData(cityData => [...cityData.filter(items => items.id !== id)])
    }
    catch (err) {
      console.error(err)

    }
    setModel(false)
  };




  const closeHandler = () => {
    setModel(false)
  }

  const closeMsgHandler = () => {
    const itemCross = document.querySelector('.pop-container')
    itemCross.classList.remove('show')
  }


  console.log(model, 'closeeee')


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const filteredListings = cityData.filter(item =>
    item.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredListings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);




  return (
    <div>
      <div class="content pt-5 pt-common">
        <div class="container-fluid mt-5">
          <div class="row g-12 mb-4">
            <div class="col-lg-12">
              <div class="card data-card h-100">
                <div class="card-header">
                  <h5 class="card-title">Add City</h5>
                </div>
                <div class="card-body">
                  <div className='row'>

                    <div class="col-lg-4">
                      <div class="form-floating mb-2 mt-1">
                        <input type="text" class="form-control" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" required="" />
                        <label for="email">Enter City</label>
                      </div>
                    </div>


                    <div class="col-lg-1">
                      <div class="form-floating mb-2 mt-1">
                        <button type="submit" class="btn btn-primary w-100 btn-login" id="loginBtn">
                          <span id="btnText" onClick={addHandler}>Add</span>
                          <img src={loaderIcon} alt="User" className='loaderIcon iconHide' />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <div class="card data-card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0"> City List</h5>
              {/* <div class="input-group search-box">
                <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>

                <input type="text" id="tableSearch" class="form-control border-0" value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name" />              
                  </div> */}
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover" id="transactionTable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>City</th>
                      <th>Staus</th>

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
                          <td><div className="skeleton btn-skeleton"></div></td>
                        </tr>
                      ))

                    ) : (

                      currentItems?.map((items) =>

                      (

                        <tr>
                          <td>{items.id}</td>
                          <td>{items.city}</td>
                          <td>{items.status}</td>
                          <td className='text-right' class="action-width">
                            <button class="btn btn-sm btn-outline-primary" onClick={() => updateHandler(items.id)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <i class="fas fa-eye"></i> Edit
                            </button>
                            &nbsp;
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
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, cityData.length)} of {cityData.length} entries
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
              <h1>City Added Successfully</h1>

            </div>

          </div>
        </div>
      </div>


      <div class="modal fade" className={model ? 'showModel modal' : 'hideModel'} id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className='popup-overlay'></div>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Record</h5>
              <button type="button" class="btn-close" onClick={closeHandler} data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

              <div class="form-floating mb-3">
                <input type="email" class="form-control" required placeholder="name@example.com" onChange={(e) => setCityUpdate(e.target.value)} value={city_update} />
                <label for="floatingInputValue">City</label>
              </div>

              <div class="form-floating">
                <input type="email" class="form-control" required placeholder="name@example.com" onChange={(e) => setStatusUpdate(e.target.value)} value={status_update} />
                <label for="floatingInputValue">Status</label>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={editHandler}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default AddCity;
