import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { skillsAPI } from "../services/api";

function SkillsCard() {
  const { user, isAuthenticated } = useAuth();
  const [skills, setSkills] = useState({ offered: [], wanted: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadSkills();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadSkills = async () => {
    try {
      const response = await skillsAPI.getMySkills();
      const allSkills = response.data.skills;
      
      const offered = allSkills.filter(skill => skill.type === 'offered');
      const wanted = allSkills.filter(skill => skill.type === 'wanted');
      
      setSkills({ offered, wanted });
    } catch (error) {
      console.error('Failed to load skills:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="card p-4 shadow-sm mb-4">
        <div className="text-center">
          <p>Please log in to view your skills</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="card p-4 shadow-sm mb-4">
        <div className="text-center">
          <p>Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex gap-4 flex-wrap">
      <div className="card p-3 shadow-sm flex-fill">
        <h6 className="text-success">Skills I Offer</h6>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {skills.offered.length > 0 ? (
            skills.offered.map((skill) => (
              <span key={skill.id} className="badge bg-success-subtle text-success">
                {skill.name}
                {skill.level && <small className="ms-1">({skill.level})</small>}
              </span>
            ))
          ) : (
            <small className="text-muted">No skills offered yet</small>
          )}
        </div>
      </div>

      <div className="card p-3 shadow-sm flex-fill">
        <h6 className="text-primary">Skills I Want</h6>
        <div className="d-flex flex-wrap gap-2 mt-2">
          {skills.wanted.length > 0 ? (
            skills.wanted.map((skill) => (
              <span key={skill.id} className="badge bg-primary-subtle text-primary">
                {skill.name}
                {skill.level && <small className="ms-1">({skill.level})</small>}
              </span>
            ))
          ) : (
            <small className="text-muted">No skills wanted yet</small>
          )}
        </div>
      </div>
    </div>
  );
}

export default SkillsCard;
