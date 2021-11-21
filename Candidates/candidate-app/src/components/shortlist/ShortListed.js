import React, { useState, useEffect, useContext } from "react";
import { CandidateContext } from "../../context/CandidateContext";
import CandidateCard from "../home/CandidateCard";
import { Link } from "react-router-dom";

export default function ShortListed() {
  const { shortListedCandidates, candidates } = useContext(CandidateContext);
  const [filteredCandidatesList, setFilteredCandidatesList] = useState([]);

  useEffect(() => {
    getCandidateList();
  }, [candidates]);

  const getCandidateList = () => {
    let data = candidates;
    data = data.filter((item) => shortListedCandidates.includes(item.id));
    setFilteredCandidatesList(data);
  };

  const renderCandidateList = () => {
    return filteredCandidatesList.length === 0 ? (
      <div className="nodata">
        {" "}
        <img
          src="http://www.demo.getsetads.com/uploads/3560no_data_getset.png"
          alt="no data"
        />{" "}
      </div>
    ) : (
      filteredCandidatesList.map((item) => (
        <CandidateCard key={item.id} info={item} />
      ))
    );
  };

  if (candidates.length === 0) return <p>Loading....</p>;
  else {
    return (
      <div>
        <div className="nav-bar">
          <h2>Shortlisted Candidates</h2>
          <Link to="/">
            <p>Home</p>
          </Link>
        </div>

        <div className="candidate-main">{renderCandidateList()}</div>
      </div>
    );
  }
}
