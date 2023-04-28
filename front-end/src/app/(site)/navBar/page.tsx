import React from "react";
import navStyles from "./page.module.css";
import SearchInput from "../components/SearchInput";

export default function NavBar() {
  return (
    <div className={navStyles.wrapper}>
      <div className={navStyles.Bar}>
        <div className={navStyles.BarLeft}>
          <h1>Logo</h1>
        </div>
        <div className={navStyles.BarCenter}>
          <SearchInput />
        </div> 
        <div className={navStyles.BarRight}>
          <h1>DP</h1>
        </div>
      </div>
    </div>
  );
}
