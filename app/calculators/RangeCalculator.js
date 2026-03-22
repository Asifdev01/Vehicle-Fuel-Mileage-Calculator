import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

const SILVER = "#a29bb1ff";
const SILVER_DEEP = "#7c748c";
const SILVER_DARK = "#a29bb1ff";
const RESULT_COLOR = "#000000";
const BG = "#f0f0f5";

export default function RangeCalculator() {
    const router = useRouter();

    const [fuelQuantity, setFuelQuantity] = useState('');
    const [vehicalMileage, setVehicalMileage] = useState('');
    const [range, setRange] = useState(null);

    const fuelQuantityRef = useRef();
    const vehicalMileageRef = useRef();

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
                        <Text style={styles.title}>Range Calculator</Text>
                        <Text style={styles.subtitle}>How far can you go?</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.content}>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Fuel Quantity</Text>
                    <View style={styles.inputWithSuffix}>
                        <TextInput
                            ref={fuelQuantityRef}
                            style={styles.inputBare}
                            placeholder="e.g. 3"
                            placeholderTextColor="#dcd9d9ff"
                            keyboardType="numeric"
                            value={fuelQuantity}
                            onChangeText={setFuelQuantity}
                            returnKeyType="next"
                            onSubmitEditing={() => vehicalMileageRef.current?.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.suffix}>L</Text>
                    </View>
                </View>

                <View style={styles.inputWrapper}>
                    <Text style={styles.inputLabel}>Vehicle Mileage</Text>
                    <View style={styles.inputWithSuffix}>
                        <TextInput
                            ref={vehicalMileageRef}
                            style={styles.inputBare}
                            placeholder="e.g. 34.24"
                            placeholderTextColor="#dcd9d9ff"
                            keyboardType="numeric"
                            value={vehicalMileage}
                            onChangeText={setVehicalMileage}
                            returnKeyType="done"
                            onSubmitEditing={fuelRange}
                        />
                        <Text style={styles.suffix}>km/l</Text>
                    </View>
                </View>

                {range !== null && (
                    <View style={styles.resultCard}>
                        <View style={styles.resultTag}>
                            <Text style={styles.resultTagText}>RANGE</Text>
                        </View>

                        <Text style={styles.resultBigValue}>{range}</Text>
                        <Text style={styles.resultBigUnit}>kilometers</Text>

                        <View style={styles.resultDivider} />

                        <View style={styles.resultSummaryRow}>
                            <View style={styles.resultSummaryItem}>
                                <Text style={styles.resultSummaryValue}>{fuelQuantity}</Text>
                                <Text style={styles.resultSummaryLabel}>litres</Text>
                            </View>
                            <View style={styles.resultSummaryDot} />
                            <View style={styles.resultSummaryItem}>
                                <Text style={styles.resultSummaryValue}>{vehicalMileage}</Text>
                                <Text style={styles.resultSummaryLabel}>km/l</Text>
                            </View>
                        </View>
                    </View>
                )}

                <TouchableOpacity style={styles.button} onPress={fuelRange} activeOpacity={0.85}>
                    <Text style={styles.buttonText}>Calculate Range</Text>
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
    headerIcon: {
        fontSize: 35, fontWeight: "600", textAlign: "center", justifyContent: "center", alignItems: "center",
        marginTop: -10,
    },
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
        fontSize: 17,
        fontWeight: "700",
        color: SILVER_DARK,
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#e2e2e8",
        borderRadius: 15,
        backgroundColor: "#fff",
    },

    inputWithSuffix: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#e2e2e8",
        borderRadius: 15,
        paddingHorizontal: 15,
        backgroundColor: "#f0ebebff",
        height: 50,
    },

    inputBare: {
        flex: 1,
        fontSize: 17,
        fontWeight: "700",
        color: SILVER_DARK,
        paddingVertical: 8,
    },

    suffix: {
        fontSize: 16,
        fontWeight: "600",
        color: "#7c748c",
        marginLeft: 8,
    },

    resultCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        paddingVertical: 28,
        paddingHorizontal: 24,
        alignItems: 'center',
        gap: 4,
        shadowColor: SILVER_DEEP,
        shadowOpacity: 0.10,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 6,
        borderWidth: 1.5,
        borderColor: '#e2e2e8',
    },
    resultTag: {
        backgroundColor: '#e2e2e8',
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    resultTagText: {
        fontSize: 11,
        fontWeight: '700',
        color: SILVER_DEEP,
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
        color: '#7c748c',
        marginBottom: 6,
    },
    resultDivider: {
        width: '85%',
        height: 1,
        backgroundColor: '#e2e2e8',
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
        color: '#7c748c',
        marginTop: 2,
    },
    resultSummaryDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: SILVER_DARK,
    },

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