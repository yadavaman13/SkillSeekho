import React from "react";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import SkillsCard from "./components/SkillsCard";
import BadgesCard from "./components/BadgesCard";
import QuickActionsCard from "./components/QuickActionsCard";

function App() {
  const handleEditOfferSkills = () => {
    alert("Edit 'Skills I Offer'");
  };

  const handleEditWantSkills = () => {
    alert("Edit 'Skills I Want'");
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="row">
          {/* Left Column */}
          <div className="col-lg-8">
            <ProfileCard />

            <SkillsCard
              title="Skills I Offer"
              skills={["Web Development", "Graphic Design", "Video Editing"]}
              onEdit={handleEditOfferSkills}
            />

            <SkillsCard
              title="Skills I Want"
              skills={["UI/UX Design", "React Native", "Photography"]}
              onEdit={handleEditWantSkills}
            />
          </div>

          {/* Right Column */}
          <div className="col-lg-4">
            <BadgesCard />
            <QuickActionsCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
