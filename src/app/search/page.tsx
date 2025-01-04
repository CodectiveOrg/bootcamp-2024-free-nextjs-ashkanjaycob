"use client";

import { NextPage } from "next";
import { useState } from "react";
import styles from "./search-page.module.css";
import { useDoctors } from "@/contexts/DoctorsContext";

const SearchPage: NextPage = () => {
  const { filterOptions, searchDoctors } = useDoctors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    specialty: "",
    location: "",
    priceRange: "",
    experience: "",
  });

  const filteredDoctors = searchDoctors(searchQuery, selectedFilters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Additional search handling if needed
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

      <div className={styles["search-content"]}>
        <div className={styles["filter-section"]}>
          <h2 className={styles["filter-title"]}>فیلترها</h2>

          <div className={styles["filter-group"]}>
            <label>تخصص</label>
            <select
              value={selectedFilters.specialty}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  specialty: e.target.value,
                })
              }
            >
              <option value="">همه</option>
              {filterOptions.specialty.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label>شهر</label>
            <select
              value={selectedFilters.location}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  location: e.target.value,
                })
              }
            >
              <option value="">همه</option>
              {filterOptions.location.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label>سابقه کار</label>
            <select
              value={selectedFilters.experience}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  experience: e.target.value,
                })
              }
            >
              <option value="">همه</option>
              {filterOptions.experience.map((exp) => (
                <option key={exp.value} value={exp.value}>
                  {exp.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles["filter-group"]}>
            <label>محدوده قیمت</label>
            <select
              value={selectedFilters.priceRange}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  priceRange: e.target.value,
                })
              }
            >
              <option value="">همه</option>
              {filterOptions.priceRange.map((price) => (
                <option key={price.value} value={price.value}>
                  {price.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles["results-section"]}>
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className={styles["result-card"]}>
              <h3>{doctor.name}</h3>
              <p>تخصص: {doctor.specialty}</p>
              <p>شهر: {doctor.location}</p>
              <p>سابقه: {doctor.experience} سال</p>
              <p>ویزیت: {doctor.visitFee.toLocaleString()} تومان</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
