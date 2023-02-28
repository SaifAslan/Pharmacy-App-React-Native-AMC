import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Map from "../components/Map";

export const Home = () => {
  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.pharmaciesContainer}>
        <Text>hi</Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pharmaciesContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: "100%",
  },
});
