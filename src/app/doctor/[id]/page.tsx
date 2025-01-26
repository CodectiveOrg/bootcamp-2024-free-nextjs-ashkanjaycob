"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import styles from "./doctor-page.module.css";
import { useDoctors } from "@/contexts/DoctorsContext";

const DoctorPage = () => {
  const params = useParams();
  const doctorId = params?.id as string;
  const { doctors } = useDoctors();

  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return (
      <div className={styles.container}>
        <h1>پزشک یافت نشد</h1>
        <p>پزشکی با شناسه {doctorId} وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.doctorInfo}>
          <Image
            src={doctor.image}
            alt={doctor.name}
            width={120}
            height={120}
            className={styles.avatar}
          />
          <div className={styles.mainInfo}>
            <h1 className={styles.name}>
              {doctor.name}
              {doctor.isVerified && <span className={styles.verified}>✓</span>}
            </h1>
            <p className={styles.brief}>{doctor.brief}</p>
            <div className={styles.rating}>
              <span>⭐ {doctor.averageRating}</span>
              <span className={styles.votes}>({doctor.totalVotes} رای)</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.section}>
          <h2>اطلاعات تماس</h2>
          <p className={styles.address}>{doctor.address}</p>
        </div>

        <div className={styles.section}>
          <h2>تخصص و تجربه</h2>
          <p>تخصص: {doctor.specialty}</p>
          <p>سابقه کار: {doctor.experience} سال</p>
        </div>

        <div className={styles.section}>
          <h2>هزینه ویزیت</h2>
          <p className={styles.fee}>{doctor.visitFee.toLocaleString()} تومان</p>
        </div>

        <div className={styles.section}>
          <h2>نشان‌ها</h2>
          <div className={styles.badges}>
            {doctor.badges.map((badge, index) => (
              <span key={index} className={styles.badge}>
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2>اولین نوبت خالی</h2>
          <p className={styles.appointment}>
            {doctor.firstAvailableAppointment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
