import React, { useState, useEffect, useContext } from "react";
import { CandidateContext } from "../../context/CandidateContext";
import CandidateCard from "./CandidateCard";
import { Link } from "react-router-dom";
import "./home.css";
export default function Home() {
  const { candidates } = useContext(CandidateContext);
  const [filteredCandidatesList, setFilteredCandidatesList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setFilteredCandidatesList(candidates);
  }, [candidates]);

  useEffect(() => {
    filterCandidatesList();
  }, [searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filterCandidatesList = () => {
    let data = candidates;
    let value = searchText.toLowerCase();
    data = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.id.toLowerCase().includes(value)
    );
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
          <h2>Candidates Job Portal</h2>
          <input
            className="search-bar"
            type="search"
            placeholder="search candidate..."
            id="csearch"
            name="csearch"
            value={searchText}
            onChange={handleSearch}
          />
          <div className="page-link">
            <Link to={`/shortListed`}>
              <p> ShortListed</p>{" "}
            </Link>
            <Link to={`/rejected`}>
              {" "}
              <p>Rejected </p>
            </Link>
          </div>
        </div>
        <div className="candidate-main">{renderCandidateList()}</div>
      </div>
    );
  }
}
