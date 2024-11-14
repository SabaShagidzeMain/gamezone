"use client";
import { useState, useEffect } from "react";

const GamesSearchSort = ({ selectedConsole = "all" }) => {
  const [platform, setPlatform] = useState(selectedConsole);
  const [sort, setSort] = useState("release_date");

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <select value={platform} onChange={handlePlatformChange}>
        <option value="all">All</option>
        <option value="ps5">PS5</option>
        <option value="ps4">PS4</option>
        <option value="xbox">Xbox</option>
        <option value="nintendo">Nintendo</option>
        <option value="vr">VR</option>
      </select>

      <select value={sort} onChange={handleSortChange}>
        <option value="release_date">Release Date</option>
        <option value="genre">Genre</option>
      </select>
    </div>
  );
};

export default GamesSearchSort;
