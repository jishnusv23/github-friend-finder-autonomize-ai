import React, { useState } from "react";
import "./Repositories.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const Repositories = () => {
  const { userRepositories } = useSelector(
    (state: RootState) => state.gitHubData.gitHubState
  );
  console.log(userRepositories);

  return (
    <div className="repositories-comp">
      {userRepositories &&
        userRepositories.map((data: any, index: any) => (
          <div className="repo-row" key={index}>
            {data.name}
          </div>
        ))}
    </div>
  );
};

export default Repositories;
