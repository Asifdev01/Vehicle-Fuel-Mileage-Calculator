import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@trip_history';

export async function getTrips() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
}

export async function saveTrip(trip) {
  const trips = await getTrips();
  const entry = {
    id: Date.now().toString(),
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    }),
    ...trip,
  };
  const updated = [entry, ...trips];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export async function clearHistory() {
  await AsyncStorage.removeItem(STORAGE_KEY);
}
