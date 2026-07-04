import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from './header/header';
import Footer from './footer/footer';
import Dashboard from './dashboard/dashboard';
import AddCity from './add-city/add-city';
import AddHotel from './add-hotel/add-hotel';
import Leads from './leads/leads';
import Listing from './listing/listing';
import LeftMenu from './left-menu/left-menu';
import AddPackages from './add-packages/add-packages';
import AddAdvanture from './add-advanture/add-advanture';

import ListHotel from './add-hotel/hotel-list';
import ListPackages from './add-packages/packages-list';
import ListAdvanture from './add-advanture/advanture-list';

import Owners from './owners/owners';
import Register from './register/register';

import Login from '../src/login/login';

function App() {

  // 🔥 FIX: Define the userLogin state
  const [userLogin, setUserLogin] = React.useState(
    localStorage.getItem("userLogin") === "true"
  );

  return (
    <div className="App">
      <Router>

        {userLogin ? (
          <>
            <Header />
            <LeftMenu />

            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-city" element={<AddCity />} />
              <Route path="/add-packages" element={<AddPackages />} />
              <Route path="/add-advanture" element={<AddAdvanture />} />
              <Route path="/add-hotel" element={<AddHotel />} />

              <Route path="/packages-list" element={<ListPackages />} />
              <Route path="/advanture-list" element={<ListAdvanture />} />
              <Route path="/hotel-list" element={<ListHotel />} />
          
              <Route path="/listing" element={<Listing />} />
              <Route path="/owners" element={<Owners />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>


         

            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route  element={<Navigate to="/register" />} />
            <Route path="/login" element={<Login setUserLogin={setUserLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}

      </Router>
    </div>
  );
}

export default App;
