// Travel Program Types and Interfaces

export enum DemandStatus {
  PENDING = "PENDING",
  VALIDATED = "VALIDATED", 
  SENT = "SENT"
}

export enum ServiceType {
  GUIDE = "GUIDE",
  TRANSPORT_GUIDE = "TRANSPORT_GUIDE",
  CULTURAL_VISIT = "CULTURAL_VISIT",
  ADVENTURE_ACTIVITY = "ADVENTURE_ACTIVITY",
  WELLNESS = "WELLNESS",
  PHOTOGRAPHY = "PHOTOGRAPHY",
  CULINARY = "CULINARY"
}

export interface City {
  id: string;
  name: string;
  region: string;
  description: string;
  image?: string;
  activities: Activity[];
  hotels: Hotel[];
  transports: Transport[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  cityId: string;
  price: number;
  currency: string;
  duration: string;
  difficulty: 'EASY' | 'MODERATE' | 'HARD';
  category: 'CULTURAL' | 'ADVENTURE' | 'WELLNESS' | 'CULINARY' | 'PHOTOGRAPHY';
}

export interface Service {
  id: string;
  name: string;
  type: ServiceType;
  provider: string;
  price: number;
  currency: string;
  description: string;
}

export interface CitySelection {
  cityId: string;
  startDate: string;
  endDate: string;
  duration: number; // auto-calculated
  activities: string[]; // activity IDs
  hotelId?: string; // admin assigned
  transportId?: string; // admin assigned
  services?: string[]; // admin assigned service IDs
  price?: number; // auto-calculated
}

export interface ClientDemand {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  numberOfTravelers: number;
  tripPeriod: number; // auto-calculated sum of city durations
  cities: CitySelection[];
  status: DemandStatus;
  totalPrice?: number; // auto-calculated
  createdAt: string;
  updatedAt: string;
}

export interface SpecialPackage {
  id: string;
  title: string;
  description: string;
  cities: string[]; // city IDs
  hotels: string[]; // hotel IDs
  activities: string[]; // activity IDs
  services: string[]; // service IDs
  transport: string; // transport ID
  cityDates: { [cityId: string]: { startDate: string; endDate: string; duration: number } };
  basePrice: number; // auto-calculated
  discountPercent: number;
  finalPrice: number; // basePrice - (basePrice * discountPercent/100)
  currency: string;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}