import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const APP_VERSION = '1.0.2';

const LANGUAGES = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu'];

export default function SettingsScreen() {
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          'Check out Mileage Calculator – track fuel, costs & range instantly! Download now 🚗⛽',
      });
    } catch (e) {
      Alert.alert('Error', 'Could not share the app.');
    }
  };

  const handleLanguage = () => {
    Alert.alert(
      'Select Language',
      'Choose your preferred language',
      LANGUAGES.map((lang) => ({
        text: lang,
        onPress: () => Alert.alert('Language', `${lang} selected (coming soon)`),
      }))
    );
  };

  const MENU_ITEMS = [
    {
      icon: 'language-outline' as const,
      label: 'Language',
      sub: 'Change app language',
      onPress: handleLanguage,
    },
    {
      icon: 'share-social-outline' as const,
      label: 'Share with Friends',
      sub: 'Spread the word!',
      onPress: handleShare,
    },
    {
      icon: 'information-circle-outline' as const,
      label: 'About Us',
      sub: 'Learn more about us',
      onPress: () => router.push('/about' as any),
    },
    {
      icon: 'shield-checkmark-outline' as const,
      label: 'Privacy Policy',
      sub: 'Read our policy',
      onPress: () => router.push('/privacy' as any),
    },
  ];

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Settings</Text>

        {/* Menu Card */}
        <View style={styles.card}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.row, i < MENU_ITEMS.length - 1 && styles.rowBorder]}
              onPress={item.onPress}
              activeOpacity={0.65}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={22} color="#7c3aed" />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowLabel}>{item.label}</Text>
                <Text style={styles.rowSub}>{item.sub}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#c4b5fd" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Version Footer */}
        <Text style={styles.version}>App Version {APP_VERSION}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f3f0fa',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 80,
    paddingBottom: 130,
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a1033',
    marginBottom: 30,
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0ecf7',
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f3f0fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowText: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1033',
  },
  rowSub: {
    fontSize: 12,
    color: '#9588b8',
    marginTop: 2,
  },
  version: {
    textAlign: 'center',
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 40,
  },
});
