import React from "react";

function QuickActions() {
  return (
    <div className="card p-3 shadow-sm">
      <h6>Quick Actions</h6>
      <ul className="list-unstyled mt-2">
        <li className="mb-2">
          <strong>🔍 Browse Skills</strong><br />
          <small>Find skills you want to learn</small>
        </li>
        <li className="mb-2">
          <strong>📨 View Requests</strong><br />
          <small>Manage your swap requests</small>
        </li>
        <li>
          <strong>👥 Community</strong><br />
          <small>Connect with other learners</small>
        </li>
      </ul>
    </div>
  );
}

export default QuickActions;
