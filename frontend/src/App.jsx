import { useState } from 'react'
import './App.css'
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProfileCard from "./components/ProfileCard";
import SkillsCard from "./components/SkillsCard";
import BadgesCard from "./components/BadgesCard";
import QuickActions from "./components/QuickActions";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8">
            <ProfileCard />
            <SkillsCard />
          </div>
          <div className="col-lg-4">
            <BadgesCard />
            <QuickActions />
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
