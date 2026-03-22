import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <TouchableOpacity style={styles.back} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#1a1033" />
        </TouchableOpacity>

        <Text style={styles.title}>About Us</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Mileage Calculator</Text>
          <Text style={styles.body}>
            We built this app to help everyday riders and drivers keep track of their vehicle's
            fuel efficiency, trip costs, and driving range — all in one clean, beautiful
            interface.
          </Text>

          <Text style={styles.heading}>Our Mission</Text>
          <Text style={styles.body}>
            Making fuel management simple, intuitive, and accessible for everyone. Whether you
            ride a bike or drive a car, we want to help you save money and drive smarter.
          </Text>

          <Text style={styles.heading}>Built With ❤️</Text>
          <Text style={styles.body}>
            Designed and developed with React Native & Expo. Crafted with attention to detail
            and a passion for great user experiences.
          </Text>
        </View>

        <Text style={styles.version}>Version 1.0.2</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f3f0fa' },
  content: { paddingHorizontal: 22, paddingTop: 60, paddingBottom: 40 },
  back: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    shadowColor: '#7c3aed', shadowOpacity: 0.1, shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }, elevation: 3,
  },
  title: { fontSize: 28, fontWeight: '800', color: '#1a1033', marginBottom: 24, letterSpacing: -0.3 },
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 24,
    shadowColor: '#7c3aed', shadowOpacity: 0.08, shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 }, elevation: 4,
  },
  heading: { fontSize: 17, fontWeight: '700', color: '#7c3aed', marginTop: 16, marginBottom: 6 },
  body: { fontSize: 14, color: '#4a3d6b', lineHeight: 22 },
  version: { textAlign: 'center', color: '#c4b5fd', fontSize: 13, fontWeight: '600', marginTop: 30 },
});
