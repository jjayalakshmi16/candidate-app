import React, { createContext, useState, useEffect } from "react";
export const CandidateContext = createContext();

const CandidateContextProvider = (props) => {
  const [candidates, setCandidates] = useState([]);
  const [shortListedCandidates, setShortListedCandidates] = useState([]);
  const [rejectedCandidates, setRejectedCandidates] = useState([]);

  useEffect(() => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
    )
      .then((res) => res.json())
      .then((response) => {
        setCandidates(response);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShortList = (id) => {
    let existingShortList = shortListedCandidates;
    existingShortList.push(id);
    setShortListedCandidates(existingShortList);
  };

  const handleCandidateReject = (id) => {
    let existingRejectionList = rejectedCandidates;
    existingRejectionList.push(id);
    setRejectedCandidates(existingRejectionList);
  };

  return (
    <CandidateContext.Provider
      value={{
        candidates,
        handleShortList: handleShortList,
        handleCandidateReject: handleCandidateReject,
        shortListedCandidates,
        rejectedCandidates,
      }}
    >
      {props.children}
    </CandidateContext.Provider>
  );
};

export default CandidateContextProvider;
