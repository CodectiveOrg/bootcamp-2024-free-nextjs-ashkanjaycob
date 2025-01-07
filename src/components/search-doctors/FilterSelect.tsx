import styles from "@/app/search/search-page.module.css";

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[] | { value: string; label: string }[];
  label: string;
  placeholder?: string;
}

const FilterSelect = ({
  value,
  onChange,
  options,
  label,
  placeholder = "همه",
}: FilterSelectProps) => {
  return (
    <div className={styles["filter-group"]}>
      <label>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => {
          const isObject = typeof option === "object";
          const value = isObject ? (option as { value: string }).value : option;
          const label = isObject ? (option as { label: string }).label : option;

          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FilterSelect;
