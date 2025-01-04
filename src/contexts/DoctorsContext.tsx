"use client";

import { createContext, useContext, ReactNode, useState, useMemo } from "react";

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  location: string;
  visitFee: number;
}

// Initial doctors data
const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "دکتر علی محمدی",
    specialty: "قلب و عروق",
    experience: 15,
    location: "تهران",
    visitFee: 250000,
  },
  {
    id: 2,
    name: "دکتر سارا احمدی",
    specialty: "پوست و مو",
    experience: 8,
    location: "شیراز",
    visitFee: 180000,
  },
  {
    id: 3,
    name: "دکتر رضا کریمی",
    specialty: "داخلی",
    experience: 12,
    location: "تهران",
    visitFee: 200000,
  },
  {
    id: 4,
    name: "دکتر مریم حسینی",
    specialty: "کودکان",
    experience: 10,
    location: "مشهد",
    visitFee: 150000,
  },
  {
    id: 5,
    name: "دکتر امیر رضایی",
    specialty: "قلب و عروق",
    experience: 20,
    location: "اصفهان",
    visitFee: 300000,
  },
];

interface DoctorsContextType {
  doctors: Doctor[];
  filterOptions: {
    specialty: string[];
    location: string[];
    experience: { label: string; value: string }[];
    priceRange: { label: string; value: string }[];
  };
  searchDoctors: (query: string, filters: FilterOptions) => Doctor[];
}

interface FilterOptions {
  specialty: string;
  location: string;
  priceRange: string;
  experience: string;
}

const DoctorsContext = createContext<DoctorsContextType | undefined>(undefined);

export function DoctorsProvider({ children }: { children: ReactNode }) {
  const filterOptions = useMemo(
    () => ({
      specialty: [...new Set(doctorsData.map((doctor) => doctor.specialty))],
      location: [...new Set(doctorsData.map((doctor) => doctor.location))],
      experience: [
        { label: "کمتر از ۱۰ سال", value: "0-10" },
        { label: "۱۰ تا ۱۵ سال", value: "10-15" },
        { label: "بیشتر از ۱۵ سال", value: "15+" },
      ],
      priceRange: [
        { label: "کمتر از ۲۰۰,۰۰۰ تومان", value: "0-200000" },
        { label: "۲۰۰,۰۰۰ تا ۲۵۰,۰۰۰ تومان", value: "200000-250000" },
        { label: "بیشتر از ۲۵۰,۰۰۰ تومان", value: "250000+" },
      ],
    }),
    [],
  );

  const searchDoctors = (query: string, filters: FilterOptions) => {
    return doctorsData.filter((doctor) => {
      // Search query filter
      if (query && !doctor.name.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      // Specialty filter
      if (filters.specialty && doctor.specialty !== filters.specialty) {
        return false;
      }

      // Location filter
      if (filters.location && doctor.location !== filters.location) {
        return false;
      }

      // Experience filter
      if (filters.experience) {
        const [min, max] = filters.experience.split("-");
        if (max === "+") {
          if (doctor.experience <= Number(min)) return false;
        } else {
          if (
            doctor.experience < Number(min) ||
            doctor.experience > Number(max)
          )
            return false;
        }
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split("-");
        if (max === "+") {
          if (doctor.visitFee <= Number(min)) return false;
        } else {
          if (doctor.visitFee < Number(min) || doctor.visitFee > Number(max))
            return false;
        }
      }

      return true;
    });
  };

  return (
    <DoctorsContext.Provider
      value={{ doctors: doctorsData, filterOptions, searchDoctors }}
    >
      {children}
    </DoctorsContext.Provider>
  );
}

export function useDoctors() {
  const context = useContext(DoctorsContext);
  if (context === undefined) {
    throw new Error("useDoctors must be used within a DoctorsProvider");
  }
  return context;
}
