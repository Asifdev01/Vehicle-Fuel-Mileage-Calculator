import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const CORAL = "#f96e6eff";
const CORAL_DEEP = "#e14d4d";
const CORAL_DARK = "#f96e6eff";
const RESULT_COLOR = "#000000";
const BG = "#fff5f5";

export default function FuelCalculator() {
    const router = useRouter();

    const [mileage, setMileage] = useState('');
    const [distance, setDistance] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [cost, setCost] = useState(null);

    const mileageRef = useRef();
    const distanceRef = useRef();
    const fuelPriceRef = useRef();

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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: BG }}
        >
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 150 }}
            >

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

            <View style={styles.inputContainer}>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Vehicle Mileage</Text>
                    <View style={styles.inputWithSuffix}>
                        <TextInput
                            ref={mileageRef}
                            style={styles.inputBare}
                            placeholder="e.g. 14.44"
                            placeholderTextColor="#f2c9c9ff"
                            keyboardType="numeric"
                            value={mileage}
                            onChangeText={setMileage}
                            returnKeyType="next"
                            onSubmitEditing={() => distanceRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.suffix}>km/l</Text>
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Distance</Text>
                    <View style={styles.inputWithSuffix}>
                        <TextInput
                            ref={distanceRef}
                            style={styles.inputBare}
                            placeholder="e.g. 24"
                            placeholderTextColor="#f2c9c9ff"
                            keyboardType="numeric"
                            value={distance}
                            onChangeText={setDistance}
                            returnKeyType="next"
                            onSubmitEditing={() => fuelPriceRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.suffix}>km</Text>
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Price Per Litre</Text>
                    <View style={styles.inputWithSuffix}>
                        <TextInput
                            ref={fuelPriceRef}
                            style={styles.inputBare}
                            placeholder="e.g. 106.4"
                            placeholderTextColor="#f2c9c9ff"
                            keyboardType="numeric"
                            value={fuelPrice}
                            onChangeText={setFuelPrice}
                            returnKeyType="done"
                            onSubmitEditing={fuelCost}
                        />
                        <Text style={styles.suffix}>₹/L</Text>
                    </View>
                </View>

                {cost !== null && (
                    <View style={styles.resultCard}>
                        <View style={styles.resultTag}>
                            <Text style={styles.resultTagText}>ESTIMATE</Text>
                        </View>

                        <Text style={styles.resultBigValue}>₹ {cost}</Text>
                        <Text style={styles.resultBigUnit}>Total Fuel Cost</Text>

                        <View style={styles.resultDivider} />

                        <View style={styles.resultSummaryRow}>
                            <View style={styles.resultSummaryItem}>
                                <Text style={styles.resultSummaryValue}>{distance}</Text>
                                <Text style={styles.resultSummaryLabel}>km</Text>
                            </View>
                            <View style={styles.resultSummaryDot} />
                            <View style={styles.resultSummaryItem}>
                                <Text style={styles.resultSummaryValue}>{mileage}</Text>
                                <Text style={styles.resultSummaryLabel}>km/l</Text>
                            </View>
                            <View style={styles.resultSummaryDot} />
                            <View style={styles.resultSummaryItem}>
                                <Text style={styles.resultSummaryValue}>₹{fuelPrice}</Text>
                                <Text style={styles.resultSummaryLabel}>per litre</Text>
                            </View>
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.button} onPress={fuelCost} activeOpacity={0.85}>
                    <Text style={styles.buttonText}>Calculate Fuel</Text>
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
        paddingHorizontal: 22,
    },

    header: {
        paddingTop: 85,
        paddingBottom: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,

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
        textAlign: "center",
    },
    headerIcon: {
        fontSize: 35, fontWeight: "600", textAlign: "center", justifyContent: "center", alignItems: "center",
        marginTop: -10,
    },
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
        fontSize: 17,
        fontWeight: "700",
        color: CORAL_DARK,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#fee2e2",
        borderRadius: 15,
        backgroundColor: "#fff",
    },

    inputWithSuffix: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#fee2e2",
        borderRadius: 15,
        paddingHorizontal: 15,
        backgroundColor: "#f0ebebff",
        height: 50,
    },

    inputBare: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: CORAL_DARK,
        paddingVertical: 8,
    },

    suffix: {
        fontSize: 16,
        fontWeight: "600",
        color: "#c27d7d",
        marginLeft: 8,
    },

    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 28,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 4,
        shadowColor: CORAL_DEEP,
        shadowOpacity: 0.10,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
        borderWidth: 1.5,
        borderColor: '#fee2e2',
    },
    resultTag: {
        backgroundColor: '#fee2e2',
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    resultTagText: {
        fontSize: 11,
        fontWeight: '700',
        color: CORAL_DEEP,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    resultBigValue: {
        fontSize: 52,
        fontWeight: '800',
        color: '#1a1033',
        letterSpacing: -1,
        lineHeight: 56,
    },
    resultBigUnit: {
        fontSize: 15,
        fontWeight: '600',
        color: '#c27d7d',
        marginBottom: 6,
    },
    resultDivider: {
        width: '85%',
        height: 1,
        backgroundColor: '#fee2e2',
        marginVertical: 14,
    },
    resultSummaryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
    },
    resultSummaryItem: {
        alignItems: 'center',
    },
    resultSummaryValue: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1a1033',
    },
    resultSummaryLabel: {
        fontSize: 11,
        fontWeight: '600',
        color: '#c27d7d',
        marginTop: 2,
    },
    resultSummaryDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: CORAL_DARK,
    },

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