import React from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

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
            {isAuthenticated ? (
              <>
                <span className="me-3 position-relative">
                  <i className="bi bi-bell-fill fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
                </span>
                <div className="dropdown">
                  <button className="btn btn-link dropdown-toggle text-decoration-none" type="button" data-bs-toggle="dropdown">
                    <img src="https://via.placeholder.com/32" className="rounded-circle me-2" alt="User" />
                    {user?.name || 'User'}
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                  </ul>
                </div>
              </>
            ) : (
              <div>
                <a href="/login" className="btn btn-outline-primary me-2">Login</a>
                <a href="/register" className="btn btn-primary">Register</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
