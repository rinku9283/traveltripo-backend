import React from 'react';
import { useEffect, useState } from 'react';
import '../owners/owners.css'


function Owners() {

  const [listingData, setListinglData] = useState();


  useEffect(() => {

    fetch('https://traveltripo.com/travel-api/admin/owner_list.php', {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => setListinglData(data.data))

  }, [])


  return (
    <div>
      <div class="content pt-5 pt-common">
        <div class="container-fluid mt-5">
          {/* <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Dashboard To Vijay</h1>
      <div>
        <button class="btn btn-sm btn-outline-primary me-2"><i class="fas fa-download me-1"></i> Export</button>
        <button class="btn btn-sm btn-primary"><i class="fas fa-plus me-1"></i> Add New</button>
      </div>
    </div> */}


          <div class="col-lg-12 mt-3">
            <div className='card data-card'>
              <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="card-title mb-0"> Owners</h5>
                <div class="input-group search-box">
                  <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>
                  <input type="text" id="tableSearch" onkeyup="searchTable()" class="form-control border-0" placeholder="Search..." />
                </div>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table table-hover" id="transactionTable">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email </th>
                        <th>Mobile</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {listingData?.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.mobile}</td>
                          <td>{item.message}</td>
                          <td>{item.status}</td>
                          <td className='text-right' class="action-width">
                            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                              <i class="fas fa-eye"></i> Edit
                            </button>
                            &nbsp;
                            <button class="btn btn-sm btn-outline-primary" >
                              <i class="fas fa-delete"></i> Delete
                            </button>
                          </td>
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
  );
}

export default Owners;
