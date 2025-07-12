import React from "react";


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold text-primary" href="#">SkillSwap</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link active" href="#">Dashboard</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Browse Skills</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Swap Requests</a></li>
          </ul>
          <div className="d-flex align-items-center">
            <span className="me-3 position-relative">
              <i className="bi bi-bell-fill fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
            </span>
            <img src="https://via.placeholder.com/32" className="rounded-circle" alt="User" />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
