import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { IPharmacy } from "../interfaces/pharmacy";
import { calculateDistance } from "../utils/calculateDistance";

interface Props {
  pharmacy: IPharmacy;
}

const PharmacyCard = ({ pharmacy }: Props) => {
  let distance = useMemo(() => calculateDistance(pharmacy.location.lat,pharmacy.location.lng,), [pharmacy.location]) 
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{pharmacy.name}</Text>
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{pharmacy.opem_now?"open":"closed"}</Text>
            <Text style={styles.infoText}>{pharmacy.phone}</Text>
        </View>
      </View>
    </View>
  );
};

export default PharmacyCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    flexDirection: "column",
  },
  leftContainer: {
    flex: 4,
  },
  name: {
    fontSize: 16,
    color: "white",
  },
  infoContainer: {
    
  },
});
