"use client";

import { ReactElement } from "react";

import Image from "next/image";

import errorImage from "@/assets/illustrations/Error.webp";

import styles from "./error.module.css";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props): ReactElement {
  return (
    <div className={styles["error"]}>
      <div className={styles.writings}>
        <div className={styles["status-code"]}>راه به جایی نمیبریم !</div>
        <h1>یک خطای غیرمنتظره رخ داده است.</h1>
        <p>با عرض پوزش، لطفاً با تیم پشتیبانی تماس بگیرید.</p>
        <br />
        <p> 09219029914 | اشکان یعقوبی</p>
      </div>
      <div className={styles.visuals}>
        <Image src={errorImage} alt="" />
      </div>
      <div className={styles.actions}>
        <button onClick={reset}>تلاش مجدد</button>
      </div>
      <div className={styles.trace}>
        <details>
          <summary>لاگ خطا</summary>
          <pre dir="ltr">{error.stack}</pre>
        </details>
      </div>
    </div>
  );
}
