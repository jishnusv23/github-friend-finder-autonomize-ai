import React from "react";
import Button from "../ui/Button/Button";
import "./Headers.css";

const Headers = () => {
  return (
    <div className="headers">
      <h1>GitHub-Friend-Finder</h1>
      <Button
        onClick={() => console.log("kfjd")}
        style={{ backgroundColor: "white", color: "black" }}
        text="Users"
      />
    </div>
  );
};

export default Headers;
