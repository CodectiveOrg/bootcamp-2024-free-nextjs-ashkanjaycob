"use client";

import { NextPage } from "next";
import { useState } from "react";

import styles from "./search-page.module.css";
import { useDoctors } from "@/contexts/DoctorsContext";
import SearchResults from "@/components/search-doctors/SearchResults";
import FilterSelect from "@/components/search-doctors/FilterSelect";
import SearchForm from "@/components/search-doctors/SearchForm";

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

  const formatAvailability = (time: string) => {
    return time.startsWith("امروز")
      ? "🟢 " + time
      : time.startsWith("فردا")
        ? "🟡 " + time
        : "⚪ " + time;
  };

  return (
    <div className={styles["search-container"]}>
      <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

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
