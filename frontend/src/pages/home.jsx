import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/navbar";
import HomeVid from "../img/HomeVid.mp4";
import "../pages/home.css";
import LatestProjects from "../components/LatestProjects";
import Recent from "../pages/Home/Recent";
import Awards from "../pages/Home/Awards";
import Description from "./Home/company_description";
import Footer from "../components/Footer/footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (query || "").trim();
    if (!q) {
      navigate("/displayHouses/All");
      return;
    }
    navigate(`/displayHouses/search?q=${encodeURIComponent(q)}`);
  };

  const clearQuery = () => {
    setQuery("");
    // keep user on page; they can submit to view All if needed
  };

  return (
    <div>
      <Navbar />
      <div className="imageContainer">
        <div className="text-container-home">
          <div className="capitalize-text">
            <h1 className="text-on-image">
              Explore
              <br />
              Your Dream Home
              <br />
              With Us
            </h1>
          </div>
        </div>

        <video className="homePageImage" src={HomeVid} autoPlay loop muted playsInline />

        <form className="filterForm" onSubmit={handleSearchSubmit} role="search" aria-label="Property search">
          <div className="searchInputWrap" role="group" aria-label="Search input">
            <div className="searchIcon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" width="18" height="18" aria-hidden="true" focusable="false">
                <path d="M21 21l-4.35-4.35" stroke="#1e88e5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="11" r="6" stroke="#1e88e5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <label className="sr-only" htmlFor="home-search">Search properties</label>
            <input
              id="home-search"
              className="filterInput"
              type="text"
              placeholder="Search by keyword, district or type..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search by keyword, district or type"
              autoComplete="off"
            />

            {query && (
              <button type="button" className="clearBtn" onClick={clearQuery} aria-label="Clear search">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>

          <button className="filterButton" type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path d="M21 21l-4.35-4.35" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="11" cy="11" r="6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Search
          </button>
        </form>
      </div>

      <div className="web_body">
        <div className="latestProjectsContainer">
          <LatestProjects />
          <div className="latestProjectsContainer">
            <Recent />
            <br />
            <Awards />
            <Description />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
