import React from "react";
import Button from "../ui/Button/Button";
import "./Headers.css";
import { useNavigate } from "react-router-dom";

const Headers = () => {
  const navigate = useNavigate();

  return (
    <div className="headers" >
      <h1 onClick={() => navigate("/")}>GitHub-Friend-Finder</h1>
      <Button
        style={{ backgroundColor: "white", color: "black" }}
        text="Users"
        onClick={() => navigate("/userslist")}
      />
    </div>
  );
};

export default Headers;
