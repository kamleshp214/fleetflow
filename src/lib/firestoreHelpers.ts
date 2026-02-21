import { adminDb } from './firebaseAdmin';
import { 
  FirestoreDriver, 
  FirestoreVehicle, 
  FirestoreTrip, 
  FirestoreExpense 
} from './types/firestore';

// Helper to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: any): Date => {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  return timestamp instanceof Date ? timestamp : new Date(timestamp);
};

// Driver operations
export const createDriver = async (data: Omit<FirestoreDriver, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = adminDb.collection('drivers').doc();
  const driverData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await docRef.set(driverData);
  return { id: docRef.id, ...driverData };
};

export const getDrivers = async () => {
  const snapshot = await adminDb.collection('drivers').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Vehicle operations
export const createVehicle = async (data: Omit<FirestoreVehicle, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = adminDb.collection('vehicles').doc();
  const vehicleData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await docRef.set(vehicleData);
  return { id: docRef.id, ...vehicleData };
};

export const getVehicles = async () => {
  const snapshot = await adminDb.collection('vehicles').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Trip operations
export const createTrip = async (data: Omit<FirestoreTrip, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = adminDb.collection('trips').doc();
  const tripData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await docRef.set(tripData);
  return { id: docRef.id, ...tripData };
};

export const getTrips = async () => {
  const snapshot = await adminDb.collection('trips').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getTripById = async (id: string) => {
  const doc = await adminDb.collection('trips').doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const updateTrip = async (id: string, data: Partial<FirestoreTrip>) => {
  await adminDb.collection('trips').doc(id).update({
    ...data,
    updatedAt: new Date(),
  });
};

// Expense operations
export const createExpense = async (data: Omit<FirestoreExpense, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = adminDb.collection('expenses').doc();
  const expenseData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await docRef.set(expenseData);
  return { id: docRef.id, ...expenseData };
};

export const getExpenses = async () => {
  const snapshot = await adminDb.collection('expenses').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
