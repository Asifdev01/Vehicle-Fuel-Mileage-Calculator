import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { saveTrip } from '../../hooks/useTripHistory';

const PURPLE = "#c4b5fd";
const PURPLE_DEEP = "#7c3aed";
const PURPLE_DARK = "#c4b5fd";
const RESULT_COLOR = "#000000";
const BG = "#f3f0fa";

export default function MileageCalculator() {
    const router = useRouter();

    const [distance, setDistance] = useState('');
    const [fuel, setFuel] = useState('');
    const [fuelPrice, setFuelPrice] = useState('');
    const [refilAmount, setRefilAmount] = useState('');
    const [result, setResult] = useState(null);
    const [saved, setSaved] = useState(false);

    const distanceRef = useRef();
    const fuelRef = useRef();
    const fuelPriceRef = useRef();
    const refilAmountRef = useRef();
    const scrollRef = useRef();

    const handleReset = () => {
        setDistance('');
        setFuel('');
        setFuelPrice('');
        setRefilAmount('');
        setResult(null);
        setSaved(false);
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

        const mileage = d / f;
        const lPer100 = (f / d) * 100;
        const tripCost = f * p;
        const costPerKm = tripCost / d;

        setResult({
            mileage: mileage.toFixed(2),
            lPer100: lPer100.toFixed(2),
            tripCost: tripCost.toFixed(2),
            costPerKm: costPerKm.toFixed(2),
            distance: d,
            fuel: f,
            fuelPrice: p,
        });

        setTimeout(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
        }, 150);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1, backgroundColor: BG }}
        >
            <ScrollView
                ref={scrollRef}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{ paddingBottom: 250 }}
            >
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

                <Text style={styles.sectionLabel}>DISTANCE INPUT</Text>

                <View style={styles.content}>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Distance Travelled</Text>
                        <View style={styles.inputWithSuffix}>
                            <TextInput
                                ref={distanceRef}
                                style={styles.inputBare}
                                placeholder="e.g. 100"
                                placeholderTextColor="#e0dbf4ff"
                                keyboardType="numeric"
                                value={distance}
                                onChangeText={setDistance}
                                returnKeyType="next"
                                onSubmitEditing={() => fuelRef.current?.focus()}
                                blurOnSubmit={false}
                            />
                            <Text style={styles.suffix}>km</Text>
                        </View>
                    </View>

                    <View style={styles.inputWrapper2}>
                        <View style={styles.inputWrapper3}>
                            <Text style={styles.inputLabel}>Fuel Used</Text>
                            <View style={styles.inputWithSuffix}>
                                <TextInput
                                    ref={fuelRef}
                                    style={styles.inputBare}
                                    placeholder="e.g. 10"
                                    placeholderTextColor="#e0dbf4ff"
                                    keyboardType="numeric"
                                    value={fuel}
                                    onChangeText={setFuel}
                                    returnKeyType="next"
                                    onSubmitEditing={() => fuelPriceRef.current?.focus()}
                                    blurOnSubmit={false}
                                />
                                <Text style={styles.suffix}>L</Text>
                            </View>
                        </View>
                        <View style={styles.inputWrapper3}>
                            <Text style={styles.inputLabel}>Fuel Price</Text>
                            <View style={styles.inputWithSuffix}>
                                <TextInput
                                    ref={fuelPriceRef}
                                    style={styles.inputBare}
                                    placeholder="e.g. 106.4"
                                    placeholderTextColor="#e0dbf4ff"
                                    keyboardType="numeric"
                                    value={fuelPrice}
                                    onChangeText={setFuelPrice}
                                    returnKeyType="next"
                                    onSubmitEditing={() => refilAmountRef.current?.focus()}
                                    blurOnSubmit={false}
                                />
                                <Text style={styles.suffix}>₹</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Total Refil Amount</Text>
                        <View style={styles.inputWithSuffix}>
                            <TextInput
                                ref={refilAmountRef}
                                style={styles.inputBare}
                                placeholder="e.g. 500"
                                placeholderTextColor="#e0dbf4ff"
                                keyboardType="numeric"
                                value={refilAmount}
                                onChangeText={setRefilAmount}
                                returnKeyType="done"
                                onSubmitEditing={calculateMilage}
                            />
                            <Text style={styles.suffix}>₹</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={calculateMilage} activeOpacity={0.85}>
                        <Text style={styles.buttonText}>Calculate Mileage</Text>
                    </TouchableOpacity>

                    {result !== null && (
                        <View style={styles.resultCard}>
                            <View style={styles.resultTag}>
                                <Text style={styles.resultTagText}>Mileage</Text>
                            </View>

                            <Text style={styles.resultBigValue}>{result.mileage}</Text>
                            <Text style={styles.resultBigUnit}>km / litre</Text>

                            <View style={styles.resultSecondary}>
                                <Text style={styles.resultSecondaryText}>{result.lPer100} L / 100 km</Text>
                            </View>

                            <View style={styles.resultDivider} />

                            <Text style={styles.resultCostLabel}>TRIP COST</Text>
                            <Text style={styles.resultCostValue}>₹ {result.tripCost}</Text>
                            <Text style={styles.resultCostSub}>₹ {result.costPerKm} / km</Text>

                            <View style={styles.resultDivider} />

                            <View style={styles.resultSummaryRow}>
                                <View style={styles.resultSummaryItem}>
                                    <Text style={styles.resultSummaryValue}>{result.distance}</Text>
                                    <Text style={styles.resultSummaryLabel}>km</Text>
                                </View>
                                <View style={styles.resultSummaryDot} />
                                <View style={styles.resultSummaryItem}>
                                    <Text style={styles.resultSummaryValue}>{result.fuel}</Text>
                                    <Text style={styles.resultSummaryLabel}>litres</Text>
                                </View>
                                <View style={styles.resultSummaryDot} />
                                <View style={styles.resultSummaryItem}>
                                    <Text style={styles.resultSummaryValue}>₹{result.fuelPrice}</Text>
                                    <Text style={styles.resultSummaryLabel}>per litre</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                style={[styles.saveButton, saved && styles.saveButtonDone]}
                                activeOpacity={0.8}
                                disabled={saved}
                                onPress={async () => {
                                    await saveTrip(result);
                                    setSaved(true);
                                    Alert.alert('Saved!', 'Trip has been saved to history.');
                                }}
                            >
                                <Text style={styles.saveButtonText}>
                                    {saved ? '✓ Trip Saved' : 'Save Trip to History'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

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

    header: {
        paddingTop: 85,
        paddingBottom: 24,
        paddingHorizontal: 22,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,

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
    headerIcon: {
        fontSize: 35, fontWeight: "600", textAlign: "center", justifyContent: "center", alignItems: "center",
        marginTop: -10,
    },
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

    sectionLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#9588b8",
        letterSpacing: 1.4,
        paddingHorizontal: 22,
        marginBottom: 16,
    },

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

    inputWrapper3: {
        flex: 1,
        flexDirection: "column",
        gap: 6,
    },


    inputWrapper2: {
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingVertical: 18,
        paddingHorizontal: 18,
        shadowColor: "#7c3aed",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        gap: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        fontSize: 17,
        fontWeight: "700",
        color: PURPLE_DARK,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#ede9fe",
        borderRadius: 15,
        backgroundColor: "#9c9898ff",
    },

    inputWithSuffix: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ede9fe",
        borderRadius: 15,
        paddingHorizontal: 15,
        backgroundColor: "#f0ebebff",
        height: 50, // More compact height
    },

    inputBare: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: PURPLE_DARK,
        paddingVertical: 8,
    },

    suffix: {
        fontSize: 16,
        fontWeight: "600",
        color: "#9588b8",
        marginLeft: 8,
    },

    inputSpaced: {
        marginBottom: 8,
    },

    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 28,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 4,
        shadowColor: '#7c3aed',
        shadowOpacity: 0.10,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
        borderWidth: 1.5,
        borderColor: '#ede9fe',
    },
    resultTag: {
        backgroundColor: '#ede9fe',
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    resultTagText: {
        fontSize: 11,
        fontWeight: '700',
        color: PURPLE_DEEP,
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
        color: '#9588b8',
        marginBottom: 6,
    },
    resultSecondary: {
        backgroundColor: '#f3f0fa',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 10,
        marginBottom: 4,
    },
    resultSecondaryText: {
        fontSize: 13,
        fontWeight: '600',
        color: PURPLE_DEEP,
    },
    resultDivider: {
        width: '85%',
        height: 1,
        backgroundColor: '#f0ecf7',
        marginVertical: 14,
    },
    resultCostLabel: {
        fontSize: 11,
        fontWeight: '700',
        color: '#9588b8',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
    },
    resultCostValue: {
        fontSize: 32,
        fontWeight: '800',
        color: '#1a1033',
        letterSpacing: -0.5,
    },
    resultCostSub: {
        fontSize: 13,
        fontWeight: '600',
        color: '#9588b8',
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
        color: '#9588b8',
        marginTop: 2,
    },
    resultSummaryDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#c4b5fd',
    },
    saveButton: {
        backgroundColor: PURPLE_DEEP,
        borderRadius: 16,
        paddingVertical: 14,
        paddingHorizontal: 32,
        marginTop: 18,
        width: '100%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.3,
    },

    button: {
        backgroundColor: PURPLE_DARK,
        borderRadius: 20,
        paddingVertical: 18,
        alignItems: 'center',
        marginTop: 4,
    },
    buttonText: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});
