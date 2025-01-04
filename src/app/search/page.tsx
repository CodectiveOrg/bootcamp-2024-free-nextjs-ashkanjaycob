"use client";

import { NextPage } from "next";
import { useState } from "react";
import styles from "./search-page.module.css";

const SearchPage: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className={styles["search-container"]}>
      <h1 className="text-2xl font-bold mb-6">جست و جو</h1>

      <form onSubmit={handleSearch} className={styles["search-form"]}>
        <div className={styles.prefix}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="جستجو کنید..."
          className={styles.input}
          dir="rtl"
        />

        <div className={styles.divider}></div>

        <div className={styles.suffix}>
          <button type="submit">جستجو</button>
        </div>
      </form>
    </div>
  );
};

export default SearchPage;
