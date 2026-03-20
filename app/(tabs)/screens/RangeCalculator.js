import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SILVER = "#a29bb1ff";
const SILVER_DEEP = "#7c748c";
const SILVER_DARK = "#a29bb1ff";
const BG = "#f0f0f5";

export default function RangeCalculator() {
    const router = useRouter();

    const [fuelQuantity, setFuelQuantity] = useState('');
    const [vehicalMileage, setVehicalMileage] = useState('');
    const [range, setRange] = useState(null);

    const handleReset = () => {
        setFuelQuantity('');
        setVehicalMileage('');
        setRange(null);
    };

    useFocusEffect(
        useCallback(() => {
            handleReset();
        }, [])
    );

    const fuelRange = () => {
        const m = parseFloat(vehicalMileage);
        const f = parseFloat(fuelQuantity);

        if (isNaN(m) || isNaN(f) || m <= 0 || f <= 0) {
            alert("Please enter valid numbers");
            return;
        }

        const result = f * m;
        setRange(result.toFixed(2));
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
                        <Text style={styles.title}>Range Calculator</Text>
                        <Text style={styles.subtitle}>How far can you go?</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>

            {/* ── Inputs ── */}
            <View style={styles.content}>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Fuel Quantity (L)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 3 L"
                        placeholderTextColor="#a29bb1ff"
                        keyboardType="numeric"
                        value={fuelQuantity}
                        onChangeText={setFuelQuantity}
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Vehicle Mileage (km/l)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 34.24"
                        placeholderTextColor="#a29bb1ff"
                        keyboardType="numeric"
                        value={vehicalMileage}
                        onChangeText={setVehicalMileage}
                    />
                </View>

                {/* ── Result Card ── */}
                {range !== null && (
                    <View style={styles.resultCard}>
                        <Text style={styles.resultLabel}>Total Range</Text>
                        <Text style={styles.resultValue}>{range} km</Text>
                    </View>
                )}

                {/* ── Button ── */}
                <TouchableOpacity style={styles.button} onPress={fuelRange} activeOpacity={0.85}>
                    <Text style={styles.buttonText}>Calculate Range</Text>
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
        color: SILVER_DEEP,
    },
    headerIconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#e2e2e8",
        alignItems: "center",
        justifyContent: "center",
    },
    headerIcon: { fontSize: 22 },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: SILVER_DARK,
        letterSpacing: -0.3,
    },
    subtitle: {
        fontSize: 13,
        color: "#7c748c",
        marginTop: 2,
        fontWeight: "400",
    },

    /* ── Content ── */
    content: {
        gap: 14,
    },

    inputWrapper: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 14,
        paddingHorizontal: 18,
        shadowColor: SILVER_DEEP,
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    inputLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#7c748c",
        letterSpacing: 0.8,
        textTransform: "uppercase",
        marginBottom: 6,
    },

    input: {
        fontSize: 22,
        fontWeight: "700",
        color: SILVER_DARK,
        paddingVertical: 4,
    },

    /* ── Result Card ── */
    resultCard: {
        backgroundColor: SILVER,
        borderRadius: 20,
        paddingVertical: 22,
        paddingHorizontal: 22,
        alignItems: "center",
        gap: 4,
    },
    resultLabel: {
        fontSize: 12,
        fontWeight: "700",
        color: "rgba(26,26,43,0.65)",
        letterSpacing: 0.8,
        textTransform: "uppercase",
    },
    resultValue: {
        fontSize: 36,
        fontWeight: "800",
        color: SILVER_DARK,
        letterSpacing: -0.5,
    },

    /* ── Button ── */
    button: {
        backgroundColor: SILVER_DARK,
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: "center",
        marginTop: 4,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 0.3,
    },
});