"use client";

import { NextPage } from "next";
import { useState } from "react";

import styles from "./search-page.module.css";
import { useDoctors } from "@/contexts/DoctorsContext";
import SearchResults from "@/components/search-doctors/SearchResults";
import FilterSelect from "@/components/search-doctors/FilterSelect";

interface ExtendedFilters {
  specialty: string;
  location: string;
  priceRange: string;
  experience: string;
  rating: string;
}

const SearchPage: NextPage = () => {
  const { filterOptions, searchDoctors } = useDoctors();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<ExtendedFilters>({
    specialty: "",
    location: "",
    priceRange: "",
    experience: "",
    rating: "",
  });

  const filteredDoctors = searchDoctors(searchQuery, selectedFilters);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formatAvailability = (time: string) => {
    return time.startsWith("امروز")
      ? "🟢 " + time
      : time.startsWith("فردا")
        ? "🟡 " + time
        : "⚪ " + time;
  };

  return (
    <div className={styles["search-container"]}>
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
          placeholder=" لطفا نام پزشک را جستجو کنید..."
          className={styles.input}
        />

        <div className={styles.divider}></div>
      </form>

      <div className={styles["search-content"]}>
        <div className={styles["filter-section"]}>
          <h2 className={styles["filter-title"]}>فیلترها</h2>

          <FilterSelect
            label="تخصص"
            value={selectedFilters.specialty}
            onChange={(value) =>
              setSelectedFilters({ ...selectedFilters, specialty: value })
            }
            options={filterOptions.specialty}
          />

          <FilterSelect
            label="حداقل امتیاز"
            value={selectedFilters.rating}
            onChange={(value) =>
              setSelectedFilters({ ...selectedFilters, rating: value })
            }
            options={[
              { value: "4.8", label: "۴.۸ و بالاتر ⭐⭐⭐⭐⭐" },
              { value: "4.5", label: "۴.۵ و بالاتر ⭐⭐⭐⭐½" },
              { value: "4.0", label: "۴.۰ و بالاتر ⭐⭐⭐⭐" },
            ]}
          />

          <FilterSelect
            label="شهر"
            value={selectedFilters.location}
            onChange={(value) =>
              setSelectedFilters({ ...selectedFilters, location: value })
            }
            options={filterOptions.location}
          />

          <FilterSelect
            label="سابقه کار"
            value={selectedFilters.experience}
            onChange={(value) =>
              setSelectedFilters({ ...selectedFilters, experience: value })
            }
            options={filterOptions.experience}
          />

          <FilterSelect
            label="محدوده قیمت"
            value={selectedFilters.priceRange}
            onChange={(value) =>
              setSelectedFilters({ ...selectedFilters, priceRange: value })
            }
            options={filterOptions.priceRange}
          />
        </div>

        <SearchResults
          doctors={filteredDoctors}
          formatAvailability={formatAvailability}
        />
      </div>
    </div>
  );
};

export default SearchPage;
