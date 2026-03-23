import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { Image as ExpoImage } from "expo-image";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getTrips } from "../../hooks/useTripHistory";
import i18n from "../../translation";


interface Route {
  label: string;
  sub: string;
  icon: string;
  path: string;
  color: string;
  image: any;
  dark?: boolean;
  imgScale?: number;
}

const ROUTES: Route[] = [
  { label: i18n.t("mileageCalculator"), sub: i18n.t("trackYourKm"), icon: "⛽", path: "/calculators/MileageCalculator", color: "#c4b5fd", image: require("../../assets/images/img1.png") },
  { label: i18n.t("fuelCalculator"), sub: i18n.t("estimateTripCost"), icon: "⛽", path: "/calculators/FuelCalculator", color: "#f96e6eff", image: require("../../assets/images/img2.png") },
  { label: i18n.t("rangeCalculator"), sub: i18n.t("howFarCanYouGo"), icon: "📍", path: "/calculators/RangeCalculator", color: "#a29bb1ff", dark: true, image: require("../../assets/images/img3.png"), imgScale: 0.65 },
];

export default function Home() {
  const router = useRouter();
  const [recentTrips, setRecentTrips] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadRecentTrips();
    }, [])
  );

  const loadRecentTrips = async () => {
    const data = await getTrips();
    setRecentTrips(data.slice(0, 3)); // Only top 3
  };
  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{i18n.t("welcomeRider")}</Text>
            <Text style={styles.subGreeting}>{i18n.t("makeYourDriveEasy")}</Text>
          </View>
          <View style={styles.avatar}>
            <ExpoImage source={require("../../assets/images/helmet-svg.svg")} style={styles.avatarImage} contentFit="contain" />
          </View>
        </View>

        {/* ── Calculator Banners ── */}
        <View style={{ gap: 16 }}>
          {ROUTES.map((route) => (
            <Pressable
              key={route.path}
              onPress={() => router.push(route.path as any)}
              style={({ pressed }) => [
                styles.heroBanner,
                { backgroundColor: route.color },
                pressed && styles.heroBannerPressed,
              ]}
            >
              <Image
                source={route.image}
                style={[styles.heroImage, route.imgScale ? { transform: [{ scale: route.imgScale }] } : undefined]}
                resizeMode="contain"
              />
              <View style={styles.heroTextBlock}>
                <Text style={[styles.heroTitle, route.dark && { color: "#fff" }]}>
                  {route.label.split(" ").join("\n")}
                </Text>
                <Text style={[styles.heroSub, route.dark && { color: "rgba(255,255,255,0.65)" }]}>
                  {route.sub}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {/* ── Recent Calculations ── */}
        <View style={styles.recentSection}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>{i18n.t("recentCalculations")}</Text>
            {recentTrips.length > 0 && (
              <Pressable onPress={() => router.push("/history")}>
                <Text style={styles.seeAll}>{i18n.t("seeHistory")}</Text>
              </Pressable>
            )}
          </View>

          {recentTrips.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="leaf-outline" size={24} color="#c4b5fd" />
              <Text style={styles.emptyText}>{i18n.t("noTripsSaved")}</Text>
            </View>
          ) : (
            <View style={styles.recentList}>
              {recentTrips.map((trip) => (
                <View key={trip.id} style={styles.recentCard}>
                  <View style={[styles.recentTypeDot, { backgroundColor: '#7c3aed' }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recentMileage}>{trip.mileage} <Text style={{ fontSize: 10 }}>{i18n.t("kmPerLitre")}</Text></Text>
                    <Text style={styles.recentDate}>{trip.date}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.recentCost}>₹{trip.tripCost}</Text>
                    <Text style={styles.recentDist}>{trip.distance} {i18n.t("km")}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const PURPLE = "#c4b5fd";       // soft lavender accent
const PURPLE_DEEP = "#7c3aed";  // deep violet for dark card
const BG = "#f3f0fa";           // creamy lavender background

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingBottom: 110, // Space for custom tab bar
  },

  /* ── Header ── */
  header: {
    paddingTop: 80,
    paddingBottom: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1a1033",
    letterSpacing: -0.3,
  },
  subGreeting: {
    fontSize: 13,
    color: "#9588b8",
    marginTop: 3,
    fontWeight: "400",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7c3aed",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  avatarImage: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  avatarText: { fontSize: 20 },

  /* ── Hero Banner ── */
  heroBanner: {
    backgroundColor: PURPLE,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    height: 140,
    marginBottom: 0,
  },
  heroBannerPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  heroImage: {
    width: 230,
    height: 240,
    alignSelf: "flex-end",
    marginBottom: -50,
    marginLeft: -40,
  },
  heroTextBlock: {
    flex: 1,
    marginLeft: -8,
    paddingRight: 20,
    justifyContent: "center",
    gap: 5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2d1b69",
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  heroSub: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(45,27,105,0.65)",
  },
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  card: {
    borderRadius: 24,
    overflow: "hidden",
  },
  recentSection: {
    marginTop: 32,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1033",
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "700",
    color: "#7c3aed",
  },
  emptyCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#7c3aed",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  emptyText: {
    fontSize: 13,
    color: "#9588b8",
    fontWeight: "500",
  },
  recentList: {
    gap: 12,
  },
  recentCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#7c3aed",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  recentTypeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  recentMileage: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1a1033",
  },
  recentDate: {
    fontSize: 11,
    color: "#9588b8",
    fontWeight: "500",
    marginTop: 2,
  },
  recentCost: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1a1033",
  },
  recentDist: {
    fontSize: 11,
    color: "#9588b8",
    fontWeight: "600",
    marginTop: 2,
  },
});