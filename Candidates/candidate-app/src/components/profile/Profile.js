import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CandidateContext } from "../../context/CandidateContext";
import { Navigate, Link } from "react-router-dom";
import "./profile.css";
export default function Profile(props) {
  const params = useParams();
  const {
    candidates,
    shortListedCandidates,
    rejectedCandidates,
    handleShortList,
    handleCandidateReject,
  } = useContext(CandidateContext);
  const [candidate, setCandidate] = useState({});
  const [isShortListed, setIsShortListed] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    let shortListedList = shortListedCandidates;
    let rejectedList = rejectedCandidates;

    let data = candidates;
    data = data.filter((item) => item.id === params.id);
    setCandidate(data[0]);

    if (shortListedList.includes(params.id)) {
      setIsShortListed(true);
    }
    if (rejectedList.includes(params.id)) {
      setIsRejected(true);
    }
  }, [candidates, shortListedCandidates, rejectedCandidates]);

  const handleCandidateShortList = () => {
    setIsShortListed(true);
    handleShortList(candidate.id);
  };

  const handleCandidateRejection = () => {
    setIsRejected(true);
    handleCandidateReject(candidate.id);
  };

  if (candidates.length === 0) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <div className="nav-bar">
        <h2>Candidate Profile</h2>
        <Link to="/">
          <p>Home</p>
        </Link>
      </div>
      <div className="candidate-main">
        <img
          className="profile-img"
          src={candidate.Image}
          alt="candidate image"
        />
        <div>
          <p>Candidate ID: {candidate.id}</p>
          <p>Name : {candidate.name}</p>
          {isShortListed && (
            <h5 className="shortlist-txt">This candidate is shortlisted!</h5>
          )}
          {isRejected && (
            <h5 className="reject-txt">This candidate is Rejected!</h5>
          )}
          {!isShortListed && !isRejected && (
            <div className="action-container">
              <button
                className="shortlist-btn"
                onClick={handleCandidateShortList}
              >
                Shortlist
              </button>
              <button className="reject-btn" onClick={handleCandidateRejection}>
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
