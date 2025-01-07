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