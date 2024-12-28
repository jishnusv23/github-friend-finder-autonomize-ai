import React from "react";
import "./NotFound.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <button className="back-button" onClick={() => navigate("/")}>
        Go Back to Home
      </button>
    </div>
  );
};

export default NotFound;
