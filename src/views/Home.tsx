import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, Text, View } from "react-native";
import Map from "../components/Map";
import PharmacyCard from "../components/PharmacyCard";
import { IPharmacy } from "../interfaces/pharmacy";
import { useAppSelector } from "../redux/hooks";

export const Home = () => {
  const pharmacies = useAppSelector((state) => state.pharmacies);
  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Nearby pharmacies</Text>
        <FlatList
          data={pharmacies}
          style={styles.pharmaciesContainer}
          renderItem={(itemData:ListRenderItemInfo<IPharmacy>) => {
            return (
              <PharmacyCard pharmacy={itemData.item}/>
            )
            
          }}
          keyExtractor={item => item.place_id}

        />
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
  bottomContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#021C1E",
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  title: {
    color: "white",
    fontSize: 21,
    fontWeight: "400",
  },
  pharmaciesContainer: {
    flex: 1,
    width: "100%",
  },
});
