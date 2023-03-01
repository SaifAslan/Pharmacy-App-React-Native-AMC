import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IPharmacy } from "../interfaces/pharmacy";
import { useAppSelector } from "../redux/hooks";
import { calculateDistance } from "../utils/calculateDistance";
import AppButtons from "./AppButtons";

interface Props {
  pharmacy: IPharmacy;
}

const PharmacyCard = ({ pharmacy }: Props) => {
  const userLocation = useAppSelector((state) => state.userLocation);

  let distance = useMemo(
    () =>
      calculateDistance(
        pharmacy.location.lat,
        pharmacy.location.lng,
        userLocation.latitude,
        userLocation.longitude
      ),
    [pharmacy.location]
  );
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{pharmacy.name}</Text>
        <View style={styles.infoContainer}>
          <Text
            style={
              pharmacy.opem_now
                ? {
                    ...styles.infoTextOpen,
                    color: "#6FB98F",
                  }
                : styles.infoTextOpen
            }
          >
            {pharmacy.opem_now ? "open" : "closed"}
          </Text>
          <Text style={styles.infoTextDistance}>{"~ " + distance + " mi"}</Text>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <AppButtons
          ViewStyle={{}}
          onPress={() => console.log("pressed")}
          PressableStyle={{}}
        >
          <Text>hi</Text>
        </AppButtons>
      </View>
    </View>
  );
};

export default PharmacyCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    flexDirection: "row",
  },
  leftContainer: {
    flex: 4,
  },
  name: {
    fontSize: 16,
    color: "white",
  },
  infoContainer: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoTextOpen: {
    fontSize: 14,
    color: "#FF0000",
    textTransform: "uppercase",
  },
  infoTextDistance: {
    fontSize: 14,
    color: "#FF5C00",
  },
  rightContainer: {
    flex: 3,
  },
});
