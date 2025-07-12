import React from "react";

const QuickActionsCard = () => {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <i className="bi bi-lightning-fill me-2 text-success"></i>
          Quick Actions
        </h5>
        <button className="btn btn-outline-primary w-100 mb-2">
          <i className="bi bi-pencil-fill me-2"></i>
          Edit Profile
        </button>
        <button className="btn btn-outline-secondary w-100 mb-2">
          <i className="bi bi-plus-circle me-2"></i>
          Add New Skill
        </button>
        <button className="btn btn-outline-danger w-100">
          <i className="bi bi-arrow-repeat me-2"></i>
          Request Swap
        </button>
      </div>
    </div>
  );
};

export default QuickActionsCard;
