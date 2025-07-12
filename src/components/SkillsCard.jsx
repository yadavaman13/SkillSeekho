import React from "react";

function SkillsCard() {
  return (
    <div className="d-flex gap-4 flex-wrap">
      <div className="card p-3 shadow-sm flex-fill">
        <h6 className="text-success">Skills I Offer</h6>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <span className="badge bg-success-subtle text-success">React Development</span>
          <span className="badge bg-success-subtle text-success">UI/UX Design</span>
          <span className="badge bg-success-subtle text-success">Photography</span>
        </div>
      </div>

      <div className="card p-3 shadow-sm flex-fill">
        <h6 className="text-primary">Skills I Want</h6>
        <div className="d-flex flex-wrap gap-2 mt-2">
          <span className="badge bg-primary-subtle text-primary">Python</span>
          <span className="badge bg-primary-subtle text-primary">Data Science</span>
          <span className="badge bg-primary-subtle text-primary">Spanish</span>
        </div>
      </div>
    </div>
  );
}

export default SkillsCard;
