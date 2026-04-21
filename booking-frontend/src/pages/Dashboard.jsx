import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Navigate import karein
import { Plane, Bell, User, LogOut, Search, MapPin, Calendar } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate(); // 2. Navigate initialize karein

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Agar token save kiya hai toh use remove karein
    navigate('/login'); // Login page par redirect karein
  };

  // Flight Data Array
  const flightDeals = [
    { city: "Ho Chi Minh City", country: "Vietnam", price: "24,370", img: "https://unsplash.com" },
    { city: "Kuala Lumpur", country: "Malaysia", price: "24,551", img: "https://unsplash.com" },
    { city: "Singapore", country: "Singapore", price: "18,200", img: "https://unsplash.com" }
  ];

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      {/* --- NAVBAR --- */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center fw-bold text-primary" href="#">
            <div className="bg-primary p-1 rounded-2 me-2 d-flex align-items-center">
              <Plane size={20} color="white" />
            </div>
            Flyhigh
          </a>
          
          <div className="collapse navbar-collapse justify-content-center">
            <ul className="navbar-nav mb-2 mb-lg-0 fw-semibold">
              <li className="nav-item"><a className="nav-link active text-primary" href="#">Flights</a></li>
              <li className="nav-item"><a className="nav-link px-3" href="#">Hotels</a></li>
              <li className="nav-item"><a className="nav-link px-3" href="#">Car Hire</a></li>
              <li className="nav-item"><a className="nav-link px-3" href="#">Deals</a></li>
            </ul>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Bell size={20} className="text-secondary cursor-pointer" />
            <div className="vr d-none d-md-block"></div>
            <div className="d-flex align-items-center border rounded-pill px-3 py-1 bg-light">
              <User size={18} className="me-2 text-primary" />
              <span className="small fw-bold">Account</span>
            </div>
            {/* LOGOUT ICON LINKED HERE */}
            <LogOut 
              size={20} 
              className="text-danger cursor-pointer" 
              onClick={handleLogout} 
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      </nav>

      {/* --- HERO / SEARCH SECTION --- */}
      <div className="container mt-5">
        <div className="bg-dark p-5 rounded-4 shadow-lg text-white mb-5">
          <h2 className="fw-bold mb-4">Find your next adventure</h2>
          <div className="row g-2 bg-white p-2 rounded-3">
            <div className="col-md-3">
              <div className="input-group text-dark">
                <span className="input-group-text bg-white border-0"><MapPin size={18} className="text-muted"/></span>
                <input type="text" className="form-control border-0 shadow-none" placeholder="From" />
              </div>
            </div>
            <div className="col-md-3 border-start">
              <div className="input-group text-dark">
                <span className="input-group-text bg-white border-0"><MapPin size={18} className="text-muted"/></span>
                <input type="text" className="form-control border-0 shadow-none" placeholder="To" />
              </div>
            </div>
            <div className="col-md-3 border-start">
              <div className="input-group text-dark">
                <span className="input-group-text bg-white border-0"><Calendar size={18} className="text-muted"/></span>
                <input type="text" className="form-control border-0 shadow-none" placeholder="Depart" />
              </div>
            </div>
            <div className="col-md-3">
              <button className="btn btn-primary w-100 py-2 fw-bold rounded-2">
                <Search size={18} className="me-2" /> Search
              </button>
            </div>
          </div>
        </div>

        {/* --- CARDS SECTION --- */}
        <div className="row">
            <h4 className="fw-bold mb-4">Recommended for you</h4>
            {flightDeals.map((deal, index) => (
              <div key={index} className="col-md-4 mb-4">
                  <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                      <img src={deal.img} className="card-img-top" height="200" alt={deal.city} style={{objectFit: 'cover'}}/>
                      <div className="card-body">
                          <h5 className="card-title fw-bold">{deal.city}</h5>
                          <p className="text-muted small mb-3">{deal.country}</p>
                          <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                              <span className="text-primary fw-bold fs-5">₹ {deal.price}</span>
                              <button className="btn btn-outline-primary btn-sm rounded-pill px-4">View</button>
                          </div>
                      </div>
                  </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
