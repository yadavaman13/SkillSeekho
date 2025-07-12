import React from "react";

function BadgesCard() {
  return (
    <div className="card p-3 shadow-sm mb-4">
      <h6>Badges</h6>
      <div className="mt-2">
        <span className="badge bg-danger-subtle text-danger me-2">❤️ Helpful Hero</span>
        <span className="badge bg-warning-subtle text-warning">⚡ Fast Replier</span>
      </div>
    </div>
  );
}

export default BadgesCard;
