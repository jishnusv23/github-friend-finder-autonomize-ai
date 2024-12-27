import React, { useState } from "react";
import "./Searchbar.css";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import LoadingPopUp from "../../ui/LoadingPopUp/LoadingPopUp";

const Searchbar = () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      {loading && <LoadingPopUp />}
      <div className="searchbar">
        <div className="input-section">
          <Input placeholder="searach " />
          <div className="buttons">
            <Button
              text="Search"
              onClick={() => console.log("Search")}
              style={{ backgroundColor: "green" }}
            />
            <Button
              text="Clear"
              onClick={() => console.log("Clear")}
              style={{ backgroundColor: "red" }}
            />
            <Button
              text="Reset"
              onClick={() => console.log("Reset")}
              style={{ backgroundColor: "orange" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
