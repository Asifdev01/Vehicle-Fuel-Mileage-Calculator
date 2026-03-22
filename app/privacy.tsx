import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <TouchableOpacity style={styles.back} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#1a1033" />
        </TouchableOpacity>

        <Text style={styles.title}>Privacy Policy</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>Data Collection</Text>
          <Text style={styles.body}>
            This app does not collect, store, or transmit any personal data. All calculations
            are performed locally on your device.
          </Text>

          <Text style={styles.heading}>Third-Party Services</Text>
          <Text style={styles.body}>
            We do not integrate any third-party analytics, advertising, or tracking services.
            Your usage data stays on your device.
          </Text>

          <Text style={styles.heading}>Permissions</Text>
          <Text style={styles.body}>
            The app does not require any special device permissions. No access to camera,
            location, contacts, or storage is needed.
          </Text>

          <Text style={styles.heading}>Changes to This Policy</Text>
          <Text style={styles.body}>
            We may update this privacy policy from time to time. Any changes will be reflected
            in the app with an updated version number.
          </Text>

          <Text style={styles.heading}>Contact</Text>
          <Text style={styles.body}>
            If you have any questions about this privacy policy, please reach out to us through
            the app store listing.
          </Text>
        </View>

        <Text style={styles.updated}>Last updated: March 2026</Text>
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
  updated: { textAlign: 'center', color: '#c4b5fd', fontSize: 13, fontWeight: '600', marginTop: 30 },
});
