import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { usersAPI } from "../services/api";

function ProfileCard() {
  const { user, updateProfile } = useAuth();
  const [isPublic, setIsPublic] = useState(user?.isPublic || true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleVisibilityToggle = async () => {
    try {
      setIsUpdating(true);
      await updateProfile({ isPublic: !isPublic });
      setIsPublic(!isPublic);
    } catch (error) {
      console.error('Failed to update profile visibility:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    return (
      <div className="card p-4 shadow-sm mb-4">
        <div className="text-center">
          <p>Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4 shadow-sm mb-4">
      <h5>Profile</h5>
      <div className="d-flex align-items-center">
        <img src="https://via.placeholder.com/80" className="rounded-circle me-3" alt="Profile" />
        <div>
          <h5 className="mb-0">{user.name}</h5>
          <small className="text-muted">📍 {user.location || 'Location not set'}</small>
          {user.bio && <p className="text-muted mb-0 mt-1">{user.bio}</p>}
        </div>
      </div>
      <div className="mt-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <p className="mb-0"><strong>Profile Visibility</strong></p>
            <small>{isPublic ? 'Your profile is public' : 'Your profile is private'}</small>
          </div>
          <div className="form-check form-switch">
            <input 
              className="form-check-input" 
              type="checkbox" 
              checked={isPublic}
              onChange={handleVisibilityToggle}
              disabled={isUpdating}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0"><strong>Rating</strong></p>
            <small>⭐ {user.rating || '0.00'} ({user.totalSwaps || 0} swaps)</small>
          </div>
        </div>
      </div>
      <button className="btn btn-success btn-sm mt-3">Available for Skill Swaps</button>
    </div>
  );
}

export default ProfileCard;
