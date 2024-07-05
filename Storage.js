import 'regenerator-runtime/runtime';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize storage
const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});

// Store data for a specific trip
export const storeTripData = async (tripId, data) => {
  try {
    await AsyncStorage.setItem(tripId, JSON.stringify(data));
  } catch (error) {
    console.error('Error storing data: ', error);
  }
};

// Retrieve data for a specific trip
export const getTripData = async (tripId) => {
  try {
    const jsonValue = await AsyncStorage.getItem(tripId);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting data: ', error);
  }
};

// Clear data for a specific trip
export const clearTripData = async (tripId) => {
  try {
    await AsyncStorage.removeItem(tripId);
  } catch (error) {
    console.error('Error clearing data: ', error);
  }
};

// Store the list of trips
export const storeTrips = async (trips) => {
  try {
    await AsyncStorage.setItem('trips', JSON.stringify(trips));
  } catch (error) {
    console.error('Error storing trips: ', error);
  }
};

// Load the list of trips
export const loadTrips = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('trips');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading trips: ', error);
  }
};

// General storage functions using react-native-storage

// Get default or saved vacation data
export const getDefaultData = async () => {
  try {
    const data = await storage.load({ key: 'vacationData', id: '1' });
    return data || { numPpl: 0, numVacationDays: 0, budget: '' };
  } catch (err) {
    console.warn(err.message);
    return { numPpl: 0, numVacationDays: 0, budget: '' };
  }
};

// Store default vacation data
export const storeDefaultData = async (numPpl, numVacationDays, budget) => {
  try {
    await storage.save({
      key: 'vacationData',
      id: '1',
      data: {
        numPpl,
        numVacationDays,
        budget,
      },
      expires: 1000 * 3600 * 24,
    });
  } catch (e) {
    console.log('Error in storeDefaultData');
    console.dir(e);
  }
};

// Clear default vacation data
export const clearDefaultData = async () => {
  try {
    await storage.remove({
      key: 'vacationData',
      id: '1',
    });
    console.log('Default data cleared successfully');
  } catch (e) {
    console.log('Error clearing default data');
    console.dir(e);
  }
};

export default storage;
