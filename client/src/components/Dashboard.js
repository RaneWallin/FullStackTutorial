import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ border: "1px solid black" }}>
      Dashboard
      <div
        className="fixed-action-btn"
        style={{ marginRight: "30px", marginBottom: "30px" }}
      >
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
