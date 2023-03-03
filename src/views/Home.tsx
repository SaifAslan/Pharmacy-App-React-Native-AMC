import React from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Map from "../components/Map";
import PharmacyCard from "../components/PharmacyCard";
import { IPharmacy } from "../interfaces/pharmacy";
import { useAppSelector } from "../redux/hooks";

export const Home = () => {
  const [activePharmacy, setActivePharmacy] = React.useState(0);
  const pharmacies = useAppSelector((state) => state.pharmacies);
  const flatListRef = React.useRef();

  const handlePharmacyClick = (pharmacyIndex: number) => {
    setActivePharmacy(pharmacyIndex);
  };

  return (
    <View style={styles.container}>
      <Map />
      <View style={styles.bottomContainer}>
        <Text style={styles.title}>Nearby pharmacies</Text>
        <FlatList
          getItemLayout={(data, index) => ({
            length: pharmacies.length,
            offset: 60 * index,
            index,
          })}
          ref={flatListRef}
          data={pharmacies}
          style={styles.pharmaciesContainer}
          renderItem={(itemData: ListRenderItemInfo<IPharmacy>) => {
            return (
              <Pressable onPress={() => handlePharmacyClick(itemData.index)}>
                <PharmacyCard
                  activePharmacy={activePharmacy}
                  scrollToPharmacy={flatListRef.current.scrollToIndex}
                  pharmacy={itemData.item}
                />
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.place_id}
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
