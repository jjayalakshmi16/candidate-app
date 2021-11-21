import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
export default function CandidateCard({ info }) {
  return (
    <div className="candidate-card">
      <img className="candidate-profile" src={info.Image} alt="image" />
      <div className="candidate-details">
        <Link to={`/candidate/${info.id}`}>
          <p>Candidate ID : {info.id}</p>
        </Link>
        <p>Name : {info.name}</p>
      </div>
    </div>
  );
}
