import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Home() {

  const [distance, setDistance] = useState('');
  const [fuel, setFuel] = useState('');
  const [milage, setMilage] = useState<string | null>(null);

  const calculateMilage = () => {

    const d = parseFloat(distance);
    const f = parseFloat(fuel);


    if (isNaN(d) || isNaN(f) || f === 0) {
      alert("Please enter valid numbers");
      return;
    }

    const result = d / f;
    setMilage(result.toFixed(2));

  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerIcon}>
          <Text style={styles.headerIconText}>⛽</Text>
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>Mileage Calculator</Text>
          <Text style={styles.subTitle}>Metric Fuel Tracker</Text>
        </View>

      </View>

      <View style={styles.header2}>
        <Text style={styles.title2}>DISTANCE INPUT</Text>
      </View>

      <View style={styles.content}>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Distance Travelled (km)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 100"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Fuel Used (litres)</Text>
          <TextInput
            style={styles.input2}
            placeholder="e.g. 10"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={fuel}
            onChangeText={setFuel}
          />

          <Text style={styles.inputLabel}>Fuel Price (per litre)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 100"
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={fuel}
            onChangeText={setFuel}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Trip Label</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. mumbai to pune"
            placeholderTextColor="#888"
            keyboardType="default"
            value={distance}
            onChangeText={setDistance}
          />
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={calculateMilage}>
          <Text style={styles.buttonText}>Calculate</Text>
        </TouchableOpacity>

        {milage !== null && (
          <Text style={styles.result}>
            Mileage: {milage} km/l
          </Text>
        )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#b1ec6f",
  },

  header: {
    paddingTop: 65,
    paddingBottom: 18,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#2a2a2a",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    paddingLeft: 30,
  },

  header2: {
    paddingTop: 15,
    paddingLeft: 20,
    marginBottom: 10,
  },

  headerIcon: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffffff",
    borderRadius: 50,
    padding: 10,
  },

  headerIconText: {
    fontSize: 22,
  },

  headerText: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 5,
  },

  title2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000ff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000ff",
    letterSpacing: 0.5,
  },

  subTitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "#000000ff",
    letterSpacing: 0.5,
  },

  content: {
    flex: 1,
    alignItems: "center",
    padding: 18,
    paddingTop: 5,
  },

  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    backgroundColor: "#ffffffff",
    borderRadius: 25,
    padding: 10,
    paddingVertical: 25,
  },

  input: {
    width: "90%",
    height: 50,
    borderColor: "#a79696ff",
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 15,
    color: "#000000ff",
  },

  input2: {
    width: "90%",
    height: 50,
    borderColor: "#a79696ff",
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: "#fff",
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000ff",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },

  buttonContainer: {
    width: "95%",
    marginTop: 25,
    paddingVertical: 18,
    backgroundColor: "#174716",
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  result: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

});