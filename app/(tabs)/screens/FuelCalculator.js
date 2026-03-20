import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const CORAL = "#f96e6eff";
const CORAL_DEEP = "#e14d4d";
const CORAL_DARK = "#f96e6eff";
const BG = "#fff5f5";

export default function FuelCalculator() {
    const router = useRouter();

    const [mileage, setMileage] = useState('');
    const [distance, setDistance] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [cost, setCost] = useState(null);

    const handleReset = () => {
        setMileage('');
        setDistance('');
        setFuelPrice('');
        setCost(null);
    };

    useFocusEffect(
        useCallback(() => {
            handleReset();
        }, [])
    );

    const fuelCost = () => {
        const m = parseFloat(mileage);
        const d = parseFloat(distance);
        const p = parseFloat(fuelPrice);

        if (isNaN(m) || isNaN(d) || isNaN(p) || m <= 0 || d <= 0 || p <= 0) {
            alert("Please enter valid numbers");
            return;
        }

        const result = (d / m) * p;
        setCost(result.toFixed(2));
    };

    return (
        <View style={styles.container}>

            {/* ── Header ── */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 }}>
                    <TouchableOpacity onPress={() => router.push("/")} style={styles.headerIconBox} activeOpacity={0.7}>
                        <Text style={styles.headerIcon}>←</Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.title}>Fuel Calculator</Text>
                        <Text style={styles.subtitle}>Estimate your trip cost</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>

            {/* ── Inputs ── */}
            <View style={styles.inputContainer}>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Vehicle Mileage (km/l)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 14.44"
                        placeholderTextColor="#f96e6eff"
                        keyboardType="numeric"
                        value={mileage}
                        onChangeText={setMileage}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Distance (km)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 24"
                        placeholderTextColor="#f96e6eff"
                        keyboardType="numeric"
                        value={distance}
                        onChangeText={setDistance}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Price Per Litre (₹/L)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. ₹106.4"
                        placeholderTextColor="#f96e6eff"
                        keyboardType="numeric"
                        value={fuelPrice}
                        onChangeText={setFuelPrice}
                    />
                </View>

                {/* ── Result Card ── */}
                {cost !== null && (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Total Fuel Cost</Text>
                        <Text style={styles.resultValue}>₹{cost}</Text>
                    </View>
                )}

                {/* ── Button ── */}
                <TouchableOpacity style={styles.button} onPress={fuelCost} activeOpacity={0.85}>
                    <Text style={styles.buttonText}>Calculate Fuel</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: BG,
        paddingHorizontal: 22,
    },

    /* ── Header ── */
    header: {
        paddingTop: 64,
        paddingBottom: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    resetText: {
        fontSize: 14,
        fontWeight: "600",
        color: CORAL_DEEP,
    },
    headerIconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#fee2e2",
        alignItems: "center",
        justifyContent: "center",
    },
    headerIcon: { fontSize: 22 },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: CORAL_DARK,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 13,
        color: "#c27d7d",
        marginTop: 2,
        fontWeight: "400",
    },

    /* ── Inputs ── */
    inputContainer: {
        gap: 14,
    },

    inputWrapper: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 18,
        shadowColor: CORAL_DEEP,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    inputLabel: {
        fontSize: 12,
        fontWeight: "600",
        color: "#c27d7d",
        letterSpacing: 0.6,
        textTransform: "uppercase",
        marginBottom: 6,
    },

    input: {
        fontSize: 22,
        fontWeight: "700",
        color: CORAL_DARK,
        paddingVertical: 4,
    },

    /* ── Result Card ── */
    resultCard: {
        backgroundColor: CORAL,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 22,
        alignItems: "center",
        gap: 4,
    },
    resultLabel: {
        fontSize: 13,
        fontWeight: "600",
        color: "rgba(51,16,16,0.7)",
        letterSpacing: 0.5,
        textTransform: "uppercase",
    },
    resultValue: {
        fontSize: 34,
        fontWeight: "800",
        color: CORAL_DARK,
        letterSpacing: -0.5,
    },

    /* ── Button ── */
    button: {
        backgroundColor: CORAL_DARK,
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: "center",
        marginTop: 6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
    },
});