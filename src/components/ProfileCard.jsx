import React from "react";

function ProfileCard() {
  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5>Profile</h5>
      <div className="d-flex align-items-center">
        <img src="https://via.placeholder.com/80" className="rounded-circle me-3" alt="Profile" />
        <div>
          <h5 className="mb-0">Alex Johnson</h5>
          <small className="text-muted">📍 San Francisco, CA</small>
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-between align-items-center">
        <div>
          <p className="mb-0"><strong>Profile Visibility</strong></p>
          <small>Your profile is public</small>
        </div>
        <div className="form-check form-switch">
          <input className="form-check-input" type="checkbox" defaultChecked />
        </div>
      </div>
      <button className="btn btn-success btn-sm mt-3">Available for Skill Swaps</button>
    </div>
  );
}

export default ProfileCard;
