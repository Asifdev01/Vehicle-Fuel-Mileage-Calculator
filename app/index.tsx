import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const KINETIC_GREEN = '#6b8e23'; // Olive green
const KINETIC_TEXT = '#4a5d00';
const BG_COLOR = '#f8f9fa';

const ONBOARDING_KEY = '@has_seen_onboarding';

export default function OnboardingScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const hasSeen = await AsyncStorage.getItem(ONBOARDING_KEY);
      if (hasSeen === 'true') {
        router.replace('/(tabs)');
      } else {
        setIsChecking(false);
      }
    } catch {
      setIsChecking(false);
    }
  };

  const handleFinish = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    router.replace('/(tabs)');
  };

  const scrollToNext = () => {
    if (currentIndex < 2) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      handleFinish();
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderScreen1 = () => (
    <View style={styles.screenContainer}>

      <View style={styles.card1}>
        <View style={styles.dashboardImagePlaceholder}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1549317336-206569e8475c?auto=format&fit=crop&q=80&w=600' }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.badge1}>
            <Text style={styles.badgeText1}>FUEL EFFICIENCY 100%</Text>
          </View>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.titleBlack}>MILEAGE</Text>
        <Text style={styles.titleGreen}>TRACKER</Text>
        <View style={styles.titleLine} />

        <Text style={styles.descText}>
          High-performance analytics for the modern driver. Monitor every drop, track every mile.
        </Text>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>CORE ENGINE</Text>
            <Text style={styles.statValue}>v2.4.0</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>ACCURACY</Text>
            <Text style={[styles.statValue, { color: '#00bfa5' }]}>99.9%</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={scrollToNext} activeOpacity={0.8}>
        <Text style={styles.primaryBtnText}>START JOURNEY</Text>
        <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );

  const renderScreen2 = () => (
    <View style={styles.screenContainer}>

      <View style={styles.textContainer2}>
        <Text style={styles.subPink}>FUEL EFFICIENCY PRO</Text>
        <Text style={styles.titleBlack}>Range</Text>
        <Text style={styles.titleBlack}>Estimator</Text>

        <View style={styles.dualCardRow}>
          <View style={[styles.miniCard, { backgroundColor: '#f0fdf4' }]}>
            <MaterialCommunityIcons name="speedometer" size={24} color={KINETIC_GREEN} />
            <View style={{ marginTop: 16 }}>
              <Text style={styles.miniCardValue}>420</Text>
              <Text style={styles.miniCardLabel}>EST. MILES</Text>
            </View>
          </View>
          <View style={[styles.miniCard, { backgroundColor: '#fdf2f8' }]}>
            <MaterialCommunityIcons name="battery-charging-80" size={24} color="#db2777" />
            <View style={{ marginTop: 16 }}>
              <Text style={styles.miniCardValue}>82%</Text>
              <Text style={styles.miniCardLabel}>CURRENT{'\n'}CHARGE</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.descText, { marginTop: 24 }]}>
          Precision distance tracking and real-time fuel consumption analysis. Navigate your journey with technical certainty.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={scrollToNext} activeOpacity={0.8}>
        <Text style={styles.primaryBtnText}>START ENGINE</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen3 = () => (
    <View style={styles.screenContainer}>

      <View style={styles.textContainer3}>
        <Text style={[styles.titleBlack, { textAlign: 'center' }]}>FUEL</Text>
        <Text style={[styles.titleGreen, { textAlign: 'center', fontStyle: 'italic', transform: [{ skewX: '-5deg' }] }]}>CALCULATOR</Text>

        <Text style={[styles.descText, { textAlign: 'center', marginTop: 16, paddingHorizontal: 16 }]}>
          Precision tracking for the modern driver. Know your efficiency, master your costs.
        </Text>

        <View style={styles.card3Wrapper}>
          <View style={styles.card3}>
            <View style={styles.fuelIconWrapper}>
              <MaterialCommunityIcons name="gas-station" size={32} color={KINETIC_TEXT} />
            </View>
            <View style={styles.pillGrayShort} />
            <View style={styles.pillGrayLong} />
            <View style={styles.pillPink}>
              <Text style={styles.pillPinkText}>$142.50</Text>
            </View>
          </View>
          <View style={styles.cyanBadge}>
            <Ionicons name="stats-chart" size={18} color="#000" />
            <Ionicons name="search" size={12} color="#000" style={{ position: 'absolute', bottom: 6, right: 6 }} />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={handleFinish} activeOpacity={0.8}>
        <Text style={styles.primaryBtnText}>LET'S GO</Text>
      </TouchableOpacity>

      <View style={styles.bottomStatsRow}>
        <View style={styles.bottomStatItem}>
          <Text style={styles.bottomStatVal}>0%</Text>
          <Text style={styles.bottomStatLbl}>ADS</Text>
        </View>
        <View style={styles.bottomStatDivider} />
        <View style={styles.bottomStatItem}>
          <Text style={styles.bottomStatVal}>100%</Text>
          <Text style={styles.bottomStatLbl}>PRECISION</Text>
        </View>
        <View style={styles.bottomStatDivider} />
        <View style={styles.bottomStatItem}>
          <Text style={styles.bottomStatVal}>1-Tap</Text>
          <Text style={styles.bottomStatLbl}>LOGIC</Text>
        </View>
      </View>

      <Text style={styles.footerText}>AUTOMOTIVE INTELLIGENCE SYSTEM V2.0</Text>
    </View>
  );

  const screens = [
    { key: '1', component: renderScreen1 },
    { key: '2', component: renderScreen2 },
    { key: '3', component: renderScreen3 },
  ];

  if (isChecking) {
    return (
      <View style={{ flex: 1, backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={KINETIC_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.skipBtnAbsolute} onPress={handleFinish} activeOpacity={0.7}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={screens}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => <View style={{ width, height }}>{item.component()}</View>}
      />

      <View style={styles.dotsContainer}>
        {screens.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [6, 24, 6],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: ['#ccc', KINETIC_GREEN, '#ccc'],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[styles.dot, { width: dotWidth, opacity, backgroundColor }]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG_COLOR },
  screenContainer: { flex: 1, paddingHorizontal: 28, paddingTop: 110, paddingBottom: 16 },

  skipBtnAbsolute: {
    position: 'absolute',
    top: 40,
    right: 28,
    zIndex: 99,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
  },

  card1: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    height: 280,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    justifyContent: 'center',
  },
  dashboardImagePlaceholder: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    padding: 16,
  },
  badge1: {
    backgroundColor: '#a3e635', // bright yellow-green
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText1: { fontSize: 12, fontWeight: '800', color: '#1a1a1a' },

  textContainer: { marginTop: 32, flex: 1 },
  titleBlack: { fontSize: 42, fontWeight: '900', color: '#1a1a1a', letterSpacing: -1, lineHeight: 44 },
  titleGreen: { fontSize: 44, fontWeight: '900', color: KINETIC_TEXT, letterSpacing: -1, lineHeight: 46 },
  titleLine: { width: 50, height: 4, backgroundColor: '#0d9488', marginTop: 8, marginBottom: 16 },
  descText: { fontSize: 15, color: '#666', lineHeight: 22 },

  statsRow: { flexDirection: 'row', marginTop: 24, gap: 32 },
  statBox: {},
  statLabel: { fontSize: 10, fontWeight: '700', color: '#999', letterSpacing: 0.5, marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800', color: '#1a1a1a' },

  primaryBtn: {
    backgroundColor: KINETIC_GREEN,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: KINETIC_GREEN,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 1 },

  textContainer2: { flex: 1, marginTop: 80 },
  subPink: { fontSize: 11, fontWeight: '800', color: '#db2777', letterSpacing: 1, marginBottom: 8 },
  dualCardRow: { flexDirection: 'row', gap: 16, marginTop: 24 },
  miniCard: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
    height: 160,
    justifyContent: 'space-between',
  },
  miniCardValue: { fontSize: 28, fontWeight: '900', color: '#1a1a1a', letterSpacing: -1 },
  miniCardLabel: { fontSize: 10, fontWeight: '700', color: '#666', marginTop: 4, letterSpacing: 0.5 },

  textContainer3: { flex: 1, alignItems: 'center', marginTop: 10 },
  card3Wrapper: { marginTop: 40, alignItems: 'center', justifyContent: 'center' },
  card3: {
    backgroundColor: '#fff',
    width: 200,
    height: 220,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    transform: [{ rotate: '-3deg' }],
  },
  fuelIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#bbf7d0',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  pillGrayShort: { width: '50%', height: 10, backgroundColor: '#e5e7eb', borderRadius: 5, marginBottom: 12 },
  pillGrayLong: { width: '90%', height: 10, backgroundColor: '#e5e7eb', borderRadius: 5, marginBottom: 20 },
  pillPink: { backgroundColor: '#fbcfe8', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  pillPinkText: { color: '#be185d', fontWeight: '800', fontSize: 16 },
  cyanBadge: {
    position: 'absolute',
    bottom: -10,
    right: -20,
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#06b6d4',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '8deg' }],
    shadowColor: '#06b6d4',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  bottomStatsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  bottomStatItem: { alignItems: 'center', width: 80 },
  bottomStatVal: { fontSize: 18, fontWeight: '900', color: '#1a1a1a' },
  bottomStatLbl: { fontSize: 10, fontWeight: '700', color: '#999', marginTop: 2 },
  bottomStatDivider: { width: 1, height: 24, backgroundColor: '#e5e7eb', marginHorizontal: 10 },
  footerText: { fontSize: 9, fontWeight: '700', color: '#ccc', textAlign: 'center', letterSpacing: 1, marginBottom: 20 },

  dotsContainer: {
    position: 'absolute',
    bottom: 84, // Sit just above the Start buttons
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});
