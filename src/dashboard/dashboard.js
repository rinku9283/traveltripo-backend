import React from 'react';
import { useEffect, useState} from 'react';
import '../dashboard/dashboard.css'

function Dashboard() {

  const [hotelData, setHotelData] = useState();

  const [advantureData, setAdvantureData] = useState();

  const [packagesData, setPackagesData] = useState();

  const [listingData, setListingData] = useState();

  const [ownersData, setOwnersData] = useState();

  const [bookingData, setBookngData] = useState();

  const [advanturebookingData, setAdvantureBookingData] = useState();

  const [packagesbookingData, setPackagesBookingData] = useState();


  

  

  useEffect(()=>{

    fetch('https://traveltripo.com/travel-api/admin/all-hotel-list.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setHotelData(data.data))

    fetch('https://traveltripo.com/travel-api/admin/all-advanture-list.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setAdvantureData(data.data))


    fetch('https://traveltripo.com/travel-api/admin/all-packages-list.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setPackagesData(data.data))


    fetch('https://traveltripo.com/travel-api/admin/property_listing.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setListingData(data.data))

    fetch('https://traveltripo.com/travel-api/admin/owners-list.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setOwnersData(data.data))


    fetch('https://traveltripo.com/travel-api/admin/all-hotel-booking.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setBookngData(data.data))

    fetch('https://traveltripo.com/travel-api/admin/all-advanture-booking.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setAdvantureBookingData(data.data))


    fetch('https://traveltripo.com/travel-api/admin/all-packages-booking.php',{
      method:'GET',
    }).then((response)=> response.json())
    .then((data)=> setPackagesBookingData(data.data))


    
  },[])




  return (
    <div>


      <div class="content pt-4">
        <div class="container-fluid mt-5 dash_dtl">
          <div class="row g-4 mb-4 mt-2">
            <div class="col-4 col-md-4 animate-fadeIn delay-3">
              <div class="card stat-card card-info text-white">
                <div class="card-body">
                <i class="fas fa-users card-icon"></i>
                  <h5 class="card-title">Hotels</h5>
                  <p class="card-value">{bookingData?.length}</p>
                  {/* <div class="d-flex align-items-center">
                <span class="badge bg-white text-info me-2"><i class="fas fa-arrow-up me-1"></i> 1.2%</span>
                <small>vs last month</small>
              </div> */}
           
                </div>
              </div>
            </div>

            <div class="col-4 col-xm-4 col-md-4 animate-fadeIn delay-1">
              <div class="card stat-card card-primary text-white">
                <div class="card-body">
                  <i class="fas fa-users card-icon"></i>
                  <h5 class="card-title"> Advanture</h5>
                  <p class="card-value">{advanturebookingData?.length}</p>
                  {/* <div class="d-flex align-items-center">
                <span class="badge bg-white text-primary me-2"><i class="fas fa-arrow-up me-1"></i> 12.5%</span>
                <small>vs last month</small>
              </div> */}
               
                </div>
              </div>
            </div>
            <div class="col-4 col-xm-4 col-md-4 animate-fadeIn delay-2">
              <div class="card stat-card card-success text-white">
                <div class="card-body">
                  <i class="fas fa-users card-icon"></i>
                  {/* <span className='new'>22</span> */}
                  <h5 class="card-title"> Packages</h5>
                  <p class="card-value">{packagesbookingData?.length}</p>
                  {/* <div class="d-flex align-items-center">
                <span class="badge bg-white text-success me-2"><i class="fas fa-arrow-up me-1"></i> 8.3%</span>
                <small>vs last month</small>
              </div> */}
              
                </div>
              </div>
            </div>
           
           
            {/* <div class="col-md-3 animate-fadeIn delay-3">
              <div class="card stat-card card-warning text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Booking <span className='new'>5</span></h5>
                  <p class="card-value">60</p>
                
                </div>
              </div>
            </div> */}

          </div>


          <div class="row g-6">

            <div class="col-lg-12 mt-0">
              <div className='card data-card'>
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="card-title m-0"> Hotel Booking</h5>
                  <div class="input-group search-box search-box-dash">
                    <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>
                    <input type="text" id="tableSearch" onkeyup="searchTable()" class="form-control border-0" placeholder="Search..." />
                  </div>
                </div>
                <div class="card-body px-clear">
                  <div class="table-responsive responsive-auto">
                    <table class="table table-hover" id="transactionTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Check in Time</th>
                          <th>No of Person</th>
                          <th>Amount</th>
                          <th>Status</th>
                         
                        </tr>
                      </thead>

                      <tbody>
                    {bookingData?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.checkin_date	}</td>
                        <td>{item.no_of_person}</td>
                        <td><span className='amount'>{item.amount}</span></td>
                        <td><span className='amount'>{item.status}</span></td>
                        {/* <td className='text-right' class="action-width">
                              <button class="btn btn-sm btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fas fa-eye"></i> Edit
                              </button>
                              &nbsp;
                              <button class="btn btn-sm btn-outline-primary" >
                                <i class="fas fa-delete"></i> Delete
                              </button>
                            </td> */}
                      </tr>
                    ))}
                  </tbody>
                      <tbody>
                    

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
                </div>
              </div>
            </div>

            <div class="col-lg-12 mt-3">
              <div className='card data-card'>
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="card-title m-0"> Advanture Booking</h5>
                  <div class="input-group search-box search-box-dash">
                    <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>
                    <input type="text" id="tableSearch" onkeyup="searchTable()" class="form-control border-0" placeholder="Search..." />
                  </div>
                </div>
                <div class="card-body px-clear">
                  <div class="table-responsive responsive-auto">
                    <table class="table table-hover" id="transactionTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Booking Date</th>
                          <th>No of Person	</th>
                          <th>Amount</th>
                          <th>Status</th>
                       
                        </tr>
                      </thead>

                      <tbody>
                    {advanturebookingData?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.booking_date}</td>
                        <td>{item.no_of_person}</td>
                        <td><span className='amount'>{item.amount}</span></td>
                        <td><span className='amount'>{item.status}</span></td>
                        {/* <td className='text-right' class="action-width">
                              <button class="btn btn-sm btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fas fa-eye"></i> Edit
                              </button>
                              &nbsp;
                              <button class="btn btn-sm btn-outline-primary" >
                                <i class="fas fa-delete"></i> Delete
                              </button>
                            </td> */}
                      </tr>
                    ))}
                  </tbody>
                      <tbody>
                    

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
                </div>
              </div>
            </div>

            <div class="col-lg-12 mt-3">
              <div className='card data-card'>
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="card-title m-0"> Package Booking</h5>
                  <div class="input-group search-box search-box-dash">
                    <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>
                    <input type="text" id="tableSearch" onkeyup="searchTable()" class="form-control border-0" placeholder="Search..." />
                  </div>
                </div>
                <div class="card-body px-clear">
                  <div class="table-responsive responsive-auto">
                    <table class="table table-hover" id="transactionTable">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Booking Date</th>
                          <th>No of Person	</th>
                          <th>Amount</th>
                          <th>Status</th>
                       
                        </tr>
                      </thead>

                      <tbody>
                    {packagesbookingData?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.booking_date}</td>
                        <td>{item.no_of_person}</td>
                        <td><span className='amount'>{item.amount}</span></td>
                        <td><span className='amount'>{item.status}</span></td>
                        {/* <td className='text-right' class="action-width">
                              <button class="btn btn-sm btn-outline-primary"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i class="fas fa-eye"></i> Edit
                              </button>
                              &nbsp;
                              <button class="btn btn-sm btn-outline-primary" >
                                <i class="fas fa-delete"></i> Delete
                              </button>
                            </td> */}
                      </tr>
                    ))}
                  </tbody>
                      <tbody>
                    

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
                </div>
              </div>
            </div>



          </div>

        </div>
      </div>


      {/* <div class="modal fade" id="transactionModal" tabindex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="transactionModalLabel">Transaction Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" class="transaction-detail-img" id="modalCustomerImg" />
              <div class="transaction-detail-item">
                <span class="transaction-detail-label">Transaction ID:</span>
                <span class="transaction-detail-value" id="modalTransactionId">#TRX-7890</span>
              </div>
              <div class="transaction-detail-item">
                <span class="transaction-detail-label">Customer:</span>
                <span class="transaction-detail-value" id="modalCustomerName">Sarah Johnson</span>
              </div>
              <div class="transaction-detail-item">
                <span class="transaction-detail-label">Date:</span>
                <span class="transaction-detail-value" id="modalTransactionDate">2025-04-16</span>
              </div>
              <div class="transaction-detail-item">
                <span class="transaction-detail-label">Amount:</span>
                <span class="transaction-detail-value" id="modalTransactionAmount">$120.00</span>
              </div>
              <div class="transaction-detail-item">
                <span class="transaction-detail-label">Status:</span>
                <span class="transaction-detail-value" id="modalTransactionStatus">
                  <span class="badge bg-success bg-opacity-10 text-success">Completed</span>
                </span>
              </div>
              <div class="transaction-detail-item">
                <span class="transaction-detail-label">Payment Method:</span>
                <span class="transaction-detail-value" id="modalPaymentMethod">Credit Card (VISA)</span>
              </div>
              <div class="transaction-detail-item">
                <span class="transaction-detail-label">Description:</span>
                <span class="transaction-detail-value" id="modalTransactionDesc">Premium Subscription</span>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Print Receipt</button>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
