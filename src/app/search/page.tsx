"use client";

import { NextPage } from "next";
import { useState } from "react";
import styles from "./search-page.module.css";
import { useDoctors } from "@/contexts/DoctorsContext";
import Image from "next/image";

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

  const filteredDoctors = searchDoctors(searchQuery, selectedFilters).filter(
    (doctor) => {
      if (selectedFilters.rating) {
        const minRating = parseFloat(selectedFilters.rating);
        return doctor.averageRating >= minRating;
      }
      return true;
    },
  );

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
          placeholder="نام پزشک یا تخصص را جستجو کنید..."
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
            <label>حداقل امتیاز</label>
            <select
              value={selectedFilters.rating}
              onChange={(e) =>
                setSelectedFilters({
                  ...selectedFilters,
                  rating: e.target.value,
                })
              }
            >
              <option value="">همه</option>
              <option value="4.8">۴.۸ و بالاتر ⭐⭐⭐⭐⭐</option>
              <option value="4.5">۴.۵ و بالاتر ⭐⭐⭐⭐½</option>
              <option value="4.0">۴.۰ و بالاتر ⭐⭐⭐⭐</option>
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
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className={styles["result-card"]}>
                <div className={styles["doctor-image"]}>
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={100}
                    height={100}
                    className={styles.avatar}
                  />
                  {doctor.isVerified && (
                    <span className={styles["verified-badge"]}>✓</span>
                  )}
                </div>

                <div className={styles["doctor-info"]}>
                  <h3 className={styles["doctor-name"]}>{doctor.name}</h3>
                  <p className={styles["doctor-brief"]}>{doctor.brief}</p>

                  <div className={styles["rating-container"]}>
                    <span className={styles.rating}>
                      ⭐ {doctor.averageRating}
                    </span>
                    <span className={styles["total-votes"]}>
                      ({doctor.totalVotes} رای)
                    </span>
                  </div>

                  <div className={styles["badges"]}>
                    {doctor.badges.map((badge, index) => (
                      <span key={index} className={styles.badge}>
                        {badge}
                      </span>
                    ))}
                  </div>

                  <p className={styles.address}>{doctor.address}</p>

                  <div className={styles["appointment-info"]}>
                    <span className={styles.availability}>
                      {formatAvailability(doctor.firstAvailableAppointment)}
                    </span>
                    <span className={styles["visit-fee"]}>
                      ویزیت: {doctor.visitFee.toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles["error-card"]}>
              <div className={styles["error-content"]}>
                <span className={styles["error-emoji"]}>🔍</span>
                <h3>پزشکی یافت نشد</h3>
                <p>لطفاً معیارهای جستجو را تغییر دهید</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
