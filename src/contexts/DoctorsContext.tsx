"use client";

import { createContext, useContext, ReactNode, useMemo } from "react";

interface DoctorImage {
  [key: string]: string;
}

const doctorImages: DoctorImage = Array.from({ length: 10 }, (_, i) => {
  const index = i + 1;
  return {
    id: String(index),
    image: `/doctors/doctor${index}.webp`,
  };
}).reduce((acc, { id, image }) => ({ ...acc, [id]: image }), {} as DoctorImage);

export interface Doctor {
  id: string;
  name: string;
  image: string;
  isVerified: boolean;
  averageRating: number;
  totalVotes: number;
  address: string;
  firstAvailableAppointment: string;
  brief: string;
  badges: string[];
  specialty: string;
  experience: number;
  location: string;
  visitFee: number;
}

const doctorsData: Doctor[] = [
  {
    id: "1234567",
    name: "دکتر علی محمدی",
    image: doctorImages["1"],
    isVerified: true,
    averageRating: 4.8,
    totalVotes: 156,
    address: "تهران، خیابان ولیعصر، بالاتر از میدان ونک، ساختمان پزشکان نور",
    firstAvailableAppointment: "فردا صبح",
    brief: "متخصص قلب و عروق، فوق تخصص آنژیوپلاستی",
    badges: ["خوش برخورد", "به موقع"],
    specialty: "قلب و عروق",
    experience: 15,
    location: "تهران",
    visitFee: 250000,
  },
  {
    id: "2345678",
    name: "دکتر سارا احمدی",
    image: doctorImages["2"],
    isVerified: true,
    averageRating: 4.9,
    totalVotes: 203,
    address: "شیراز، خیابان زند، مجتمع پزشکی حکیم",
    firstAvailableAppointment: "امروز عصر",
    brief: "متخصص پوست و مو، زیبایی",
    badges: ["کمترین معطلی", "محبوب بیماران"],
    specialty: "پوست و مو",
    experience: 8,
    location: "شیراز",
    visitFee: 180000,
  },
  {
    id: "3456789",
    name: "دکتر رضا کریمی",
    image: doctorImages["3"],
    isVerified: true,
    averageRating: 4.7,
    totalVotes: 189,
    address: "تهران، خیابان انقلاب، ساختمان پزشکان امید",
    firstAvailableAppointment: "امروز صبح",
    brief: "متخصص داخلی و گوارش",
    badges: ["دقیق و حرفه‌ای", "پاسخگویی عالی"],
    specialty: "داخلی",
    experience: 12,
    location: "تهران",
    visitFee: 220000,
  },
  {
    id: "4567890",
    name: "دکتر مریم حسینی",
    image: doctorImages["4"],
    isVerified: true,
    averageRating: 4.6,
    totalVotes: 132,
    address: "مشهد، بلوار ملک‌آباد، کلینیک پزشکان جوان",
    firstAvailableAppointment: "فردا عصر",
    brief: "متخصص اطفال و نوزادان",
    badges: ["صبور", "مهربان"],
    specialty: "کودکان",
    experience: 10,
    location: "مشهد",
    visitFee: 150000,
  },
  {
    id: "5678901",
    name: "دکتر امیر رضایی",
    image: doctorImages["5"],
    isVerified: true,
    averageRating: 4.9,
    totalVotes: 215,
    address: "اصفهان، خیابان چهار باغ عباسی، ساختمان پزشکان زیتون",
    firstAvailableAppointment: "امروز عصر",
    brief: "متخصص قلب و عروق، فوق تخصص جراحی قلب",
    badges: ["دقیق", "کمترین معطلی"],
    specialty: "قلب و عروق",
    experience: 20,
    location: "اصفهان",
    visitFee: 300000,
  },
  {
    id: "6789012",
    name: "دکتر زهرا صابری",
    image: doctorImages["6"],
    isVerified: true,
    averageRating: 4.8,
    totalVotes: 172,
    address: "تبریز، خیابان آزادی، مجتمع پزشکان سپید",
    firstAvailableAppointment: "فردا صبح",
    brief: "متخصص زنان و زایمان",
    badges: ["محبوب بیماران", "خوش برخورد"],
    specialty: "زنان و زایمان",
    experience: 18,
    location: "تبریز",
    visitFee: 230000,
  },
  {
    id: "7890123",
    name: "دکتر حسن نادری",
    image: doctorImages["7"],
    isVerified: true,
    averageRating: 4.5,
    totalVotes: 95,
    address: "کرج، میدان شهید بهشتی، کلینیک نیکان",
    firstAvailableAppointment: "امروز ظهر",
    brief: "متخصص ارتوپدی، جراحی استخوان و مفاصل",
    badges: ["دقیق", "کمترین معطلی"],
    specialty: "ارتوپدی",
    experience: 14,
    location: "کرج",
    visitFee: 280000,
  },
  {
    id: "8901234",
    name: "دکتر لیلا شریفی",
    image: doctorImages["8"],
    isVerified: true,
    averageRating: 4.7,
    totalVotes: 108,
    address: "اهواز، خیابان امانیه، ساختمان پزشکان سینا",
    firstAvailableAppointment: "پس‌فردا صبح",
    brief: "متخصص چشم، فوق تخصص جراحی قرنیه",
    badges: ["خوش برخورد", "متخصص حرفه‌ای"],
    specialty: "چشم",
    experience: 12,
    location: "اهواز",
    visitFee: 250000,
  },
  {
    id: "9012345",
    name: "دکتر محمد عباسی",
    image: doctorImages["9"],
    isVerified: true,
    averageRating: 4.6,
    totalVotes: 140,
    address: "رشت، خیابان مطهری، کلینیک رازی",
    firstAvailableAppointment: "فردا عصر",
    brief: "متخصص مغز و اعصاب، فوق تخصص جراحی مغز",
    badges: ["پاسخگویی عالی", "به موقع"],
    specialty: "مغز و اعصاب",
    experience: 16,
    location: "رشت",
    visitFee: 270000,
  },
  {
    id: "0123456",
    name: "دکتر فاطمه قاسمی",
    image: doctorImages["10"],
    isVerified: true,
    averageRating: 4.9,
    totalVotes: 187,
    address: "قزوین، خیابان فلسطین، ساختمان پزشکان ارم",
    firstAvailableAppointment: "امروز صبح",
    brief: "متخصص دندانپزشکی زیبایی",
    badges: ["مهارت بالا", "خوش برخورد"],
    specialty: "دندانپزشکی",
    experience: 10,
    location: "قزوین",
    visitFee: 200000,
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
  rating: string;
}

const DoctorsContext = createContext<DoctorsContextType | undefined>(undefined);

export function DoctorsProvider({ children }: { children: ReactNode }) {
  const filterOptions = useMemo(
    () => ({
      specialty: Array.from(
        new Set(doctorsData.map((doctor) => doctor.specialty)),
      ),
      location: Array.from(
        new Set(doctorsData.map((doctor) => doctor.location)),
      ),
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

      // Rating filter
      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        if (doctor.averageRating < minRating) return false;
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
