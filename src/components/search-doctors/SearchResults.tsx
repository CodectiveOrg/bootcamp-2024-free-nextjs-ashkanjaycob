import styles from "@/app/search/search-page.module.css";
import DoctorCard from "./DoctorCard";
import { Doctor } from "@/types/Doctor";

interface SearchResultsProps {
  doctors: Doctor[];
  formatAvailability: (time: string) => string;
}

const SearchResults = ({ doctors, formatAvailability }: SearchResultsProps) => {
  if (doctors.length === 0) {
    return (
      <div className={styles["error-card"]}>
        <div className={styles["error-content"]}>
          <span className={styles["error-emoji"]}>🔍</span>
          <h3>پزشکی یافت نشد</h3>
          <p>لطفاً معیارهای جستجو را تغییر دهید</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles["results-section"]}>
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          formatAvailability={formatAvailability}
        />
      ))}
    </div>
  );
};

export default SearchResults;
