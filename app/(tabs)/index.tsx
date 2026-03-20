import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

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
  { label: "Mileage Calculator", sub: "Track your km per litre instantly", icon: "⛽", path: "/screens/MileageCalculator", color: "#c4b5fd", image: require("../../assets/images/img1.png") },
  { label: "Fuel Calculator", sub: "Estimate your trip cost easily", icon: "⛽", path: "/screens/FuelCalculator", color: "#f96e6eff", image: require("../../assets/images/img2.png") },
  { label: "Range Calculator", sub: "How far can you go today?", icon: "📍", path: "/screens/RangeCalculator", color: "#a29bb1ff", dark: true, image: require("../../assets/images/img3.png"), imgScale: 0.65 },
];

export default function Home() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello there 👋</Text>
          <Text style={styles.subGreeting}>Make your drive easy with us</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>⛽</Text>
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


    </View>
  );
}

const PURPLE = "#c4b5fd";       // soft lavender accent
const PURPLE_DEEP = "#7c3aed";  // deep violet for dark card
const BG = "#f3f0fa";           // creamy lavender background

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 22,
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
});