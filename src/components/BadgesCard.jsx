import React from "react";

const BadgesCard = () => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <h5 className="card-title mb-3">
          <i className="bi bi-award-fill me-2 text-warning"></i>
          Badges
        </h5>

        <div className="mb-2 p-2 rounded bg-light text-danger d-flex align-items-center">
          <i className="bi bi-heart-fill me-2"></i>
          Helpful Hero
        </div>

        <div className="p-2 rounded bg-warning-subtle text-dark d-flex align-items-center">
          <i className="bi bi-lightning-fill me-2"></i>
          Fast Replier
        </div>
      </div>
    </div>
  );
};

export default BadgesCard;
