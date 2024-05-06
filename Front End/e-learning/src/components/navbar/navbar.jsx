import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const navbar = document.getElementById("navbar");
  const [scrolled, setScrolled] = useState(false);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 5) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <>
      <nav
        id="navbar"
        className={"navbar " + (scrolled ? "scrolled" : "notScrolled")}
      >
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

export default Navbar;
