"use client";

import { useParams } from "next/navigation";
import styles from "./doctor-page.module.css";

const DoctorPage = () => {
  const params = useParams();
  const doctorId = params?.id;

  return (
    <div className={styles.container}>
      <h1>صفحه پزشک</h1>
      <p>شناسه پزشک: {doctorId}</p>
    </div>
  );
};

export default DoctorPage;
