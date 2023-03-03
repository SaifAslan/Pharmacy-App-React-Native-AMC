import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import { IPharmacy } from "../interfaces/pharmacy";
import { useAppSelector } from "../redux/hooks";
import { calculateDistance } from "../utils/calculateDistance";
import useLocationUrl from "../utils/useLocationUrl";
import AppButtons from "./AppButtons";

interface Props {
  pharmacy: IPharmacy;
  activePharmacy: number;
}

type RootStackParamList = {
  Pharmacy: { pharmacy: IPharmacy };
};

const PharmacyCard = ({  pharmacy,activePharmacy }: Props) => {
  const userLocation = useAppSelector((state) => state.userLocation);
  const locationUrl = useLocationUrl(
    pharmacy.location.lat,
    pharmacy.location.lng
  );
  const navigation = useNavigation();

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
        <Text numberOfLines={1} style={styles.name}>{pharmacy.name}</Text>
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
          onPress={() => navigation.navigate("Pharmacy", { pharmacy })}
          PressableStyle={{}}
          Content={<Text style={styles.viewText}>View</Text>}
        />
        <AppButtons
          ViewStyle={{}}
          onPress={() => Linking.openURL(locationUrl)}
          PressableStyle={{}}
          Content={
            <Image
              style={styles.image}
              source={require("../assets/images/Road_alt_light.png")}
            />
          }
        />
      </View>
    </View>
  );
};

export default PharmacyCard;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    flexDirection: "row",
    height:60
  },
  leftContainer: {
    flex: 4,
  },
  name: {
    fontSize: 16,
    color: "white",
  },
  infoContainer: {
    marginTop: 10,
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
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingEnd: 14,
    paddingStart: 36,
  },
  image: {
    // width: 100,
    // height: 100,
    // borderRadius: 50,
    // marginVertical: 10,
  },
  viewText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6FB98F",
  },
});
