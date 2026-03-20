import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const PURPLE = "#c4b5fd";
const PURPLE_DEEP = "#7c3aed";
const PURPLE_DARK = "#c4b5fd";
const BG = "#f3f0fa";

export default function MileageCalculator() {
    const router = useRouter();

    const [distance, setDistance] = useState('');
    const [fuel, setFuel] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [refilAmount, setRefilAmount] = useState('');
    const [milage, setMilage] = useState(null);

    const scrollRef = useRef();

    const handleReset = () => {
        setDistance('');
        setFuel('');
        setFuelPrice('');
        setRefilAmount('');
        setMilage(null);
    };

    useFocusEffect(
        useCallback(() => {
            handleReset();
        }, [])
    );

    const calculateMilage = () => {
        const d = parseFloat(distance);
        const f = parseFloat(fuel);
        const p = parseFloat(fuelPrice);
        const r = parseFloat(refilAmount);

        if (isNaN(d) || isNaN(f) || isNaN(p) || isNaN(r) || f <= 0 || p <= 0 || r <= 0) {
            alert("Please enter valid numbers");
            return;
        }

        const result = d / f;
        setMilage(result.toFixed(2));

        setTimeout(() => {
            scrollRef.current?.scrollTo({ animated: true, y: 300 });
        }, 100);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: BG }}
        >
            <ScrollView
                ref={scrollRef}
                style={styles.container}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
            >
                {/* ── Header ── */}
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
                        <TouchableOpacity onPress={() => router.push("/")} style={styles.headerIconBox} activeOpacity={0.7}>
                            <Text style={styles.headerIcon}>←</Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.title}>Mileage Calculator</Text>
                            <Text style={styles.subtitle}>Metric Fuel Tracker</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
                        <Text style={styles.resetText}>Reset</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Section Label ── */}
                <Text style={styles.sectionLabel}>DISTANCE INPUT</Text>

                <View style={styles.content}>

                    {/* Distance */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Distance Travelled (km)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. 100"
                            placeholderTextColor="#c4b5fd"
                            keyboardType="numeric"
                            value={distance}
                            onChangeText={setDistance}
                        />
                    </View>

                    {/* Fuel Used + Fuel Price grouped */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Fuel Used (litres)</Text>
                        <TextInput
                            style={[styles.input, styles.inputSpaced]}
                            placeholder="e.g. 10"
                            placeholderTextColor="#c4b5fd"
                            keyboardType="numeric"
                            value={fuel}
                            onChangeText={setFuel}
                        />
                        <Text style={styles.inputLabel}>Fuel Price (per litre)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. ₹106.4"
                            placeholderTextColor="#c4b5fd"
                            keyboardType="numeric"
                            value={fuelPrice}
                            onChangeText={setFuelPrice}
                        />
                    </View>

                    {/* Refil Amount */}
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Total Refil Amount (₹)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. ₹500"
                            placeholderTextColor="#c4b5fd"
                            keyboardType="numeric"
                            value={refilAmount}
                            onChangeText={setRefilAmount}
                        />
                    </View>

                    {/* Result Card */}
                    {milage !== null && (
                        <View style={styles.resultCard}>
                            <Text style={styles.resultLabel}>Your Mileage</Text>
                            <Text style={styles.resultValue}>{milage} km/l</Text>
                        </View>
                    )}

                    {/* Button */}
                    <TouchableOpacity style={styles.button} onPress={calculateMilage} activeOpacity={0.85}>
                        <Text style={styles.buttonText}>Calculate</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: BG,
    },

    /* ── Header ── */
    header: {
        paddingTop: 64,
        paddingBottom: 24,
        paddingHorizontal: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    resetText: {
        fontSize: 14,
        fontWeight: "600",
        color: PURPLE_DEEP,
    },
    headerIconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#ede9fe",
        alignItems: "center",
        justifyContent: "center",
    },
    headerIcon: { fontSize: 22 },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: PURPLE_DARK,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 13,
        color: "#9588b8",
        marginTop: 2,
        fontWeight: "400",
    },

    /* ── Section Label ── */
    sectionLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9588b8",
        letterSpacing: 1.4,
        paddingHorizontal: 22,
        marginBottom: 16,
    },

    /* ── Content ── */
    content: {
        paddingHorizontal: 22,
        gap: 14,
    },

    inputWrapper: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 18,
        shadowColor: "#7c3aed",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        gap: 6,
    },

    inputLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9588b8",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        marginTop: 8,
    },

    input: {
        fontSize: 22,
        fontWeight: "700",
        color: PURPLE_DARK,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#ede9fe",
    },

    inputSpaced: {
        marginBottom: 8,
    },

    /* ── Result Card ── */
    resultCard: {
        backgroundColor: PURPLE,
        borderRadius: 20,
        paddingVertical: 22,
        paddingHorizontal: 22,
        alignItems: "center",
        gap: 4,
    },
    resultLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "rgba(45,27,105,0.65)",
        letterSpacing: 0.8,
        textTransform: "uppercase",
    },
    resultValue: {
        fontSize: 36,
        fontWeight: "800",
        color: PURPLE_DARK,
        letterSpacing: -0.5,
    },

    /* ── Button ── */
    button: {
        backgroundColor: PURPLE_DARK,
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: "center",
        marginTop: 4,
    },
    buttonText: {
        color: "#ffffffff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
    },
});