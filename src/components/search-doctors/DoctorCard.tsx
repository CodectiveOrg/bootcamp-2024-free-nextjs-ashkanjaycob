import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "@/app/search/search-page.module.css";
import { Doctor } from "@/types/Doctor";
import Button from "@/components/ui/Button";

interface DoctorCardProps {
  doctor: Doctor;
  formatAvailability: (time: string) => string;
}

const DoctorCard = ({ doctor, formatAvailability }: DoctorCardProps) => {
  const router = useRouter();

  const handleAppointment = () => {
    console.log(doctor);
    router.push(`/doctor/${doctor.id}`);
  };

  return (
    <div className={styles["result-card"]}>
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
          <span className={styles.rating}>⭐ {doctor.averageRating}</span>
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
          <Button variant="primary" size="medium" onClick={handleAppointment}>
            دریافت نوبت
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
