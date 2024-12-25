import { ReactElement } from "react";

import GlobalSearchBoxComponent from "@/components/global-search-box/global-search-box.component";

import TabibLog from "@/assets/logo/TabibPic.png";

import styles from "./page.module.css";
import Image from "next/image";

export default function Home(): ReactElement {
  return (
    <div className={styles.home}>
      <h1>
        <Image className={styles.logo} src={TabibLog} alt="tabib" />
        طبیب
      </h1>
      <GlobalSearchBoxComponent />
      <div className={styles.history}>
        <div className={styles.title}>آخرین جستجوهای شما</div>
        <ul>
          <li>ارتوپد</li>
          <li>قلب و عروق</li>
        </ul>
      </div>
    </div>
  );
}
