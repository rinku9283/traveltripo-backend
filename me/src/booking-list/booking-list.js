import React, { useEffect, useState } from 'react';
import '../add-advanture/add-advanture.css'


function AddAdvanture() {

  const [packageData, setPackageData] = useState([]);

  const [city, setCity] = useState();
  const [advanture_name, setAdvantureName] = useState([]);
  const [price, setPrice] = useState();
  const [advanture_type, setAdvantureType] = useState();
  const [transport, setTransport] = useState();
  const [images, setImages] = useState();
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
  formData.append('description', description);
  formData.append('privacy', privacy);
  formData.append('date', date);
  formData.append('status', status);
  
  console.log(Array.from(formData.entries()),'formData')



  const addHandler = () => {

    fetch('https://traveltripo.com/travel-api/admin/add-advanture.php', {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((date) => setPackageData(date, 'dattt'))

    alert("Submitted Data successfully")
    setCity("");
    setAdvantureName("")
    setPrice("")
    setAdvantureType("")
    setTransport("")
    setImages("")
    setDescription("")
    setPrivacy("")
    setDate("")
    setStatus("")
  }

 



  const fileNames = [];

  if (images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      const file = images[i];
      formData.append('images[]', file, file.name); // Send the file with its name
      fileNames.push(file.name); // Save the name separately
    }
  }

  formData.append('images', JSON.stringify(fileNames)); // Send file names as JSON string


  return (
    <div>
      <div class="content pt-5 pt-common">
        <div class="container-fluid mt-5">



          <div class="row g-12 mb-4">
            <div class="col-lg-12">
              <div class="card data-card h-100">
                <div class="card-header">
                  <h5 class="card-title">Add Advanture</h5>
                </div>
                <div class="card-body">
                  <div className='row'>

                    <div class="col-lg-4">
                      <div class="form-floating">
                        <select class="form-select mb-3" value={city} onChange={(e) => setCity(e.target.value)} id="floatingSelect">
                          <option selected>Choose</option>
                          <option value="Boys">Rishikesh</option>
                          <option value="Girls">Shimla</option>
                          <option value="All">Manali</option>
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
                      <div class="form-floating mb-2">
                        <input type="text" class="form-control" value={advanture_type} onChange={(e) => setAdvantureType(e.target.value)} placeholder="Enter Type of Advanture" required="" />
                        <label for="email">Advanture Type</label>
                      </div>
                    </div>


                    <div class="col-lg-4">
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


                      <div class="col-lg-12 mt-3">
                      <div class="form-floating mb-3">
                        <textarea type="text" class="form-control height-150" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter Overview"></textarea><label for="email">Discription</label>
                      </div>
                     
                      </div>

                  


                      <div class="col-lg-12 mt-3">
                      <div class="form-floating mb-3">
                        <textarea type="text" class="form-control height-150" value={privacy} onChange={(e) => setPrivacy(e.target.value)} placeholder="Enter Overview"></textarea><label for="email">Privacy Discription</label>
                      </div>
                     
                      </div>


                      <div class="col-lg-4">
                      <div class="form-floating mb-3">
                        <input type="date" class="form-control" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Enter Date" required="" />
                        <label for="email">Date</label>
                      </div>
                    </div>

                   

                    <div class="col-lg-4">
                      <div class="form-floating">
                        <select class="form-select" value={status}  onChange={(e) => setStatus(e.target.value)} id="floatingSelect">
                          <option selected>Choose </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                        </select>
                        <label for="floatingSelect"> Status</label>
                      </div>
                    </div>

                    


                    <div class="col-lg-1">
                      <div class="form-floating mb-2 mt-1">
                        <button type="submit" class="btn btn-primary w-100 btn-login" id="loginBtn">
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


    </div>


  );
}

export default AddAdvanture;
