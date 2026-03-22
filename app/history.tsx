import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { clearHistory, getTrips } from '../hooks/useTripHistory';

export default function HistoryScreen() {
  const router = useRouter();
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    const data = await getTrips();
    setTrips(data);
  };

  const handleClear = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to delete all saved trips?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            setTrips([]);
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.tripCard}>
      <View style={styles.tripHeader}>
        <View style={styles.tripTypeTag}>
          <Text style={styles.tripTypeLabel}>Mileage Trip</Text>
        </View>
        <Text style={styles.tripDate}>{item.date}</Text>
      </View>

      <View style={styles.tripMetrics}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{item.mileage}</Text>
          <Text style={styles.metricLabel}>km/L</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>₹{item.tripCost}</Text>
          <Text style={styles.metricLabel}>Cost</Text>
        </View>
        <View style={styles.metricDivider} />
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{item.distance}</Text>
          <Text style={styles.metricLabel}>km</Text>
        </View>
      </View>

      <View style={styles.tripFooter}>
        <Text style={styles.tripFooterText}>
          {item.fuel}L @ ₹{item.fuelPrice}/L • ₹{item.costPerKm}/km
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1a1033" />
        </TouchableOpacity>
        <Text style={styles.title}>All History</Text>
        {trips.length > 0 && (
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="receipt-outline" size={32} color="#c4b5fd" />
            </View>
            <Text style={styles.emptyTitle}>No history yet</Text>
            <Text style={styles.emptySub}>Your saved calculations will appear here</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f0fa' },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7c3aed',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#1a1033', flex: 1, marginLeft: 16 },
  clearText: { fontSize: 14, fontWeight: '600', color: '#ef4444' },
  listContent: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 40 },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#7c3aed',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  tripHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  tripTypeTag: { backgroundColor: '#f3f0fa', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  tripTypeLabel: { fontSize: 10, fontWeight: '700', color: '#7c3aed', textTransform: 'uppercase' },
  tripDate: { fontSize: 12, color: '#9588b8', fontWeight: '500' },
  tripMetrics: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  metricItem: { alignItems: 'center', flex: 1 },
  metricValue: { fontSize: 18, fontWeight: '800', color: '#1a1033' },
  metricLabel: { fontSize: 11, fontWeight: '600', color: '#9588b8', marginTop: 2 },
  metricDivider: { width: 1, height: 24, backgroundColor: '#f0ecf7' },
  tripFooter: { borderTopWidth: 1, borderTopColor: '#f0ecf7', paddingTop: 12 },
  tripFooterText: { fontSize: 11, color: '#9588b8', textAlign: 'center', fontWeight: '500' },
  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyIconCircle: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#1a1033' },
  emptySub: { fontSize: 14, color: '#9588b8', marginTop: 4 },
});
