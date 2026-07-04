import React from 'react';
import '../leads/leads.css'


function leads() {
  return (
    <div>
      <div class="content pt-5 pt-common">
        <div class="container-fluid mt-3">

          {/* <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="mb-0">Dashboard To Vijay</h1>
      <div>
        <button class="btn btn-sm btn-primary"><i class="fas fa-plus me-1"></i> Add New</button>
      </div>
    </div> */}

          <div class="row g-4 mb-4 mt-2">

            <div class="col animate-fadeIn delay-3">
              <div class="card stat-card card-warning text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Total Leads</h5>
                  <p class="card-value">6,0000</p>
                  {/* <div class="d-flex align-items-center">
                    <span class="badge bg-white text-warning me-2"><i class="fas fa-arrow-down me-1"></i> 1.2%</span>
                    <small>vs last month</small>
                  </div> */}
                </div>
              </div>
            </div>

            <div class="col animate-fadeIn delay-3">
              <div class="card stat-card card-info text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Total Leads</h5>
                  <p class="card-value">900</p>
                  {/* <div class="d-flex align-items-center">
                    <span class="badge bg-white text-info me-2"><i class="fas fa-arrow-up me-1"></i> 1.2%</span>
                    <small>vs last month</small>
                  </div> */}
                </div>
              </div>
            </div>

            <div class="col animate-fadeIn delay-3">
              <div class="card stat-card card-gray text-white">
                <div class="card-body">
                  <i class="fas fa-chart-line card-icon"></i>
                  <h5 class="card-title">Open Leads</h5>
                  <p class="card-value">20</p>
                  {/* <div class="d-flex align-items-center">
                    <span class="badge bg-white text-info me-2"><i class="fas fa-arrow-up me-1"></i> 1.2%</span>
                    <small>vs last month</small>
                  </div> */}
                </div>
              </div>
            </div>

            <div class="col animate-fadeIn delay-1">
              <div class="card stat-card card-blue text-white">
                <div class="card-body">
                  <i class="fas fa-users card-icon"></i>
                  <h5 class="card-title"> Not Convert</h5>
                  <p class="card-value">34 </p>
                  {/* <div class="d-flex align-items-center">
                    <span class="badge bg-white text-primary me-2"><i class="fas fa-arrow-up me-1"></i> 12.5%</span>
                    <small>vs last month</small>
                  </div> */}
                </div>
              </div>
            </div>

            <div class="col animate-fadeIn delay-2">
              <div class="card stat-card card-success text-white">
                <div class="card-body">
                  <i class="fas fa-dollar-sign card-icon"></i>
                  <h5 class="card-title">Convert</h5>
                  <p class="card-value">50</p>
                  {/* <div class="d-flex align-items-center">
                    <span class="badge bg-white text-success me-2"><i class="fas fa-arrow-up me-1"></i> 8.3%</span>
                    <small>vs last month</small>
                  </div> */}
                </div>
              </div>
            </div>

          </div>

        
             
          

          <div class="card data-card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="card-title mb-0"> All Leads</h5>
              <div class="input-group search-box">
                <span class="input-group-text bg-transparent border-0"><i class="fas fa-search"></i></span>
                <input type="text" id="tableSearch" onkeyup="searchTable()" class="form-control border-0" placeholder="Search by name" />
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover" id="transactionTable">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Property Type</th>
                      <th>City</th>
                      <th>Booking Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>

                        Vijay

                      </td>
                      <td>Hotels</td>
                      <td>Manali</td>
                      <td>4000</td>
                      <td>2-12-2025</td>


                      <td><span class="badge bg-success bg-opacity-10 text-success">Converted</span></td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#transactionModal" data-transaction-id="7890">
                          <i class="fas fa-eye"></i> View
                        </button>
                        <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#transactionModal" data-transaction-id="7890">
                          <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#transactionModal" data-transaction-id="7890">
                          <i class="fas fa-delete"></i> Delete
                        </button>
                      </td>

                    </tr>


                  </tbody>
                </table>
              </div>
              <div class="d-flex justify-content-between align-items-center mt-3">
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
              </div>
            </div>
          </div>

        </div>  
        <button class="btn btn-sm btn-primary add-more-leads">
                <i class="fas fa-plus me-1"></i>
            </button>
      </div>
    
    </div>
    
  );
}

export default leads;
