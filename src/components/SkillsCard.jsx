import React from "react";

const SkillsCard = ({ title, skills, onEdit }) => {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">
            <i className="bi bi-lightbulb-fill me-2 text-primary"></i>
            {title}
          </h5>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={onEdit}
          >
            <i className="bi bi-pencil me-1"></i>
            Edit
          </button>
        </div>

        <div className="d-flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="badge bg-secondary p-2">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
