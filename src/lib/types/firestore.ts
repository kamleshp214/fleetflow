export interface FirestoreUser {
  uid: string;
  email: string;
  name: string;
  role: 'Manager' | 'Dispatcher' | 'Safety Officer' | 'Financial Analyst';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirestoreDriver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseExpiry: Date;
  status: 'Available' | 'On Trip' | 'Off Duty' | 'Suspended';
  safetyScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirestoreVehicle {
  id: string;
  name: string;
  licensePlate: string;
  maxCapacityKg: number;
  currentOdometer: number;
  status: 'Available' | 'On Trip' | 'In Shop' | 'Out of Service';
  createdAt: Date;
  updatedAt: Date;
}

export interface FirestoreTrip {
  id: string;
  vehicleId: string;
  driverId: string;
  origin: string;
  destination: string;
  cargoWeightKg: number;
  status: 'Draft' | 'Dispatched' | 'Completed' | 'Cancelled';
  startDate?: Date;
  endDate?: Date;
  revenue?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirestoreExpense {
  id: string;
  vehicleId: string;
  tripId?: string;
  type: 'Fuel' | 'Maintenance';
  amount: number;
  date: Date;
  description: string;
  litersLogged?: number;
  createdAt: Date;
  updatedAt: Date;
}
