import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import RejectedList from "./components/rejectedList/RejectedList";
import ShortListed from "./components/shortlist/ShortListed";
import CandidateContextProvider from "./context/CandidateContext";

function App() {
  return (
    <Router>
      <div className="App">
        <CandidateContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shortListed" element={<ShortListed />} />
            <Route path="/rejected" element={<RejectedList />} />
            <Route path="/candidate/:id" element={<Profile />} />
          </Routes>
        </CandidateContextProvider>
      </div>
    </Router>
  );
}

export default App;
