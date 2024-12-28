import React from "react";
import Button from "../ui/Button/Button";
import "./Headers.css";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate=useNavigate()
  return (
    <div className="headers" onClick={() => navigate("/")}>
      <h1>GitHub-Friend-Finder</h1>
      <Button
        style={{ backgroundColor: "white", color: "black" }}
        text="Users"
      />
    </div>
  );
};

export default Headers;
