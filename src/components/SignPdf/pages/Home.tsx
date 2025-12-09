import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const openSignTool = () => {
    navigate("/editor");
  };

  return (
    <div className="home-container">
      <h1 className="title">PDF Tools</h1>

      <div className="card-list">
        <div className="tool-card" onClick={openSignTool}>
          <h2>Sign PDF</h2>
          <p>Your tool to eSign documents. Click to proceed.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
