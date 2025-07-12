import React from 'react';
import './ProfileCard.css';

const ProfileCard = () => {
  return (
    <div className="card shadow-sm border-0 mb-4 p-4" style={{ maxWidth: '720px' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0 fw-semibold">Profile</h5>
        <button className="btn btn-outline-secondary btn-sm">
          <i className="bi bi-pencil-fill me-1"></i> Edit
        </button>
      </div>

      <div className="d-flex align-items-center mb-4">
        <div className="position-relative me-3">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="rounded-circle"
            width="80"
            height="80"
          />
          <button className="btn btn-light rounded-circle position-absolute bottom-0 end-0 p-1 shadow-sm">
            <i className="bi bi-camera-fill"></i>
          </button>
        </div>
        <div>
          <h6 className="mb-1 fw-bold">Alex Johnson</h6>
          <div className="text-muted">
            <i className="bi bi-geo-alt-fill me-1"></i> San Francisco, CA
          </div>
        </div>
      </div>

      <div className="p-3 rounded bg-light d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <i className="bi bi-globe-americas text-success me-2"></i>
          <div>
            <strong className="d-block">Profile Visibility</strong>
            <small className="text-muted">Your profile is public</small>
          </div>
        </div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" id="visibilitySwitch" defaultChecked />
        </div>
      </div>

      <div className="text-center">
        <span className="badge bg-light text-success border border-success px-3 py-2">
          Available for Skill Swaps
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
