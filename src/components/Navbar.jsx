import React from 'react';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light w-100">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-primary" href="#">SkillSwap</a>

        <div className="mx-auto">
          <ul className="navbar-nav d-flex flex-row gap-4">
            <li className="nav-item">
              <a
                className="nav-link fw-semibold"
                href="#"
                style={{ color: 'rgb(147, 51, 234)' }}
              >
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Browse Skills</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Swap Requests</a>
            </li>
          </ul>
        </div>

        <div className="d-flex align-items-center">
          <span className="badge bg-danger me-2">3</span>
          <img src="user-profile.png" alt="User" width="30" height="30" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
