import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar2.css";

const Navbar2 = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav id="navbar2" className={"navbar2"}>
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/cours")}>Mes cours</li>
          <li onClick={() => navigate("/biblio")}>Bibliotéque</li>
          <li onClick={() => navigate("/chatBot")}>ChatBot</li>
        </ul>
      </nav>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
    </>
  );
};

export default Navbar2;
