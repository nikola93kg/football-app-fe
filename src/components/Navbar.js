import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import "../styles/Navbar.css";
import { playMusic, pauseMusic } from "../redux/actions/musicActions";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.music.playing);
  const location = useLocation();

  const [isActive, setIsActive] = useState(false);
  const [isTeamsDropdownActive, setIsTeamsDropdownActive] = useState(false);
  const [isRefereesDropdownActive, setIsRefereesDropdownActive] = useState(false);

  const toggleMusic = () => {
    if (playing) {
      dispatch(pauseMusic());
    } else {
      dispatch(playMusic());
    }
  }

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo2} alt="Logo" />
        </Link>
      </div>
      <button className="navbar-toggle" onClick={() => setIsActive(!isActive)}>
        ☰
      </button>
      <ul className={`navbar-links ${isActive ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setIsActive(false)}>
            Home
          </Link>
        </li>
        <li className="dropdown" onMouseEnter={() => setIsTeamsDropdownActive(true)} onMouseLeave={() => setIsTeamsDropdownActive(false)} >
          <Link to="/teams" onClick={() => setIsActive(false)}>
            Teams
          </Link>
          {isTeamsDropdownActive && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/add-team" onClick={() => {setIsActive(false); setIsTeamsDropdownActive(false); }} >
                  Add Team
                </Link>
              </li>
              <li>
                <Link to="/edit-team" onClick={() => {setIsActive(false); setIsTeamsDropdownActive(false); }} >
                  Edit / Delete Team
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="dropdown" onMouseEnter={() => setIsRefereesDropdownActive(true)} onMouseLeave={() => setIsRefereesDropdownActive(false)} >
          <Link to="/referees" onClick={() => setIsActive(false)}>
            Referees
          </Link>
          {isRefereesDropdownActive && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/add-referee" onClick={() => {setIsActive(false); setIsRefereesDropdownActive(false); }} >
                  Add Referee
                </Link>
              </li>
              <li>
                <Link to="/edit-referee" onClick={() => {setIsActive(false); setIsRefereesDropdownActive(false); }} >
                  Edit / Delete Referee
                </Link>
              </li>
            </ul>
          )}
        </li>
        {isHomePage && (
        <button onClick={toggleMusic} className="music-toggle-btn">
          {playing ? "Pause" : "Play"}
        </button>
      )}
      </ul>
    </nav>
  )
}

export default Navbar;
