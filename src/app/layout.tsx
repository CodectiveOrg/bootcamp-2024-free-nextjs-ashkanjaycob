import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";

import HeaderComponent from "@/components/header/header.component";

import "@/styles/typography.css";

import "./globals.css";

import FooterComponent from "@/components/footer/footer.component";
import { DoctorsProvider } from "@/contexts/DoctorsContext";

const vazirmatn = Vazirmatn({
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "طبیب",
  description: "سامانه جامع نوبت دهی آنلاین پزشکان",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body>
        <DoctorsProvider>
          <HeaderComponent />
          <main>{children}</main>
          <p className="tagline">
            نوبت دهی پزشکی، سامانه نوبت دهی اینترنتی بیمارستان و پزشکان
          </p>
          <FooterComponent />
        </DoctorsProvider>
      </body>
    </html>
  );
}
