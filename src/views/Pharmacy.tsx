import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { IPharmacy, IPharmacyDetails, IReview } from "../interfaces/pharmacy";
//@ts-ignore
import { apiUrl } from "@env";
import AppButtons from "../components/AppButtons";
import useLocationUrl from "../utils/useLocationUrl";
import ReviewCard from "../components/ReviewCard";
import { RouteProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<{ params: { pharmacy: IPharmacy } }, "params">;
}

const Pharmacy: React.FC<Props> = ({ route }:Props) => {
  const [pharmacyDetails, setPharmacyDetails] = useState<
    IPharmacyDetails | undefined
  >();

  const locationUrl = useLocationUrl(
    route.params?.pharmacy.location.lat,
    route.params?.pharmacy.location.lng,
    route.params?.pharmacy.name
  );

  useEffect(() => {
    fetchPharmacyData();
  }, [route.params?.pharmacy?.place_id]);

  const fetchPharmacyData = (): void => {
    axios
      .get(apiUrl + `api/pharmacy?placeid=${route.params.pharmacy.place_id}`)
      .then((response) => {
        setPharmacyDetails(response.data);
        return response.data;
      })
      .catch((error) => Alert.alert(error.response.data.message));
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.header,
        }}
      ></View>
      <View style={styles.iconContainer}>
        <Image
          style={{
            ...styles.icon,
          }}
          // source={{ uri: route.params.pharmacy.icon }}
          source={require("../assets/images/pharmacy.png")}
        />
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.statusAndRate}>
          <Text
            style={
              route.params?.pharmacy?.opem_now
                ? {
                    ...styles.infoTextOpen,
                    color: "#6FB98F",
                  }
                : styles.infoTextOpen
            }
          >
            {route.params?.pharmacy?.opem_now !== undefined
              ? route.params.pharmacy.opem_now
                ? "open"
                : "closed"
              : ""}
          </Text>

          {pharmacyDetails?.rating !== undefined && (
            <Text style={styles.infoTextRaiting}>
              {"⭐️ " + pharmacyDetails.rating}
            </Text>
          )}
        </View>
        <Text numberOfLines={2} style={styles.name}>
          {route.params?.pharmacy?.name}
        </Text>
        <View style={styles.addressAndLocation}>
          <Text numberOfLines={2} style={styles.address}>
            {pharmacyDetails?.formatted_address}
          </Text>
          <AppButtons
            ViewStyle={styles.buttonStyle}
            onPress={() => Linking.openURL(locationUrl)}
            PressableStyle={{}}
            Content={
              <View style={styles.routeIcon}>
                <Image
                  source={require("../assets/images/Road_alt_light.png")}
                />
                <Text style={styles.routeIconText}>set route</Text>
              </View>
            }
          />
        </View>
        {pharmacyDetails?.international_phone_number && (
          <View style={styles.addressAndLocation}>
            <Text style={styles.address}>
              {pharmacyDetails?.international_phone_number}
            </Text>
            <AppButtons
              ViewStyle={styles.buttonStyle}
              onPress={() =>
                Linking.openURL(
                  `tel:+441213592731
                  )}`
                )
              }
              PressableStyle={{}}
              Content={
                <View style={styles.routeIcon}>
                  <Image source={require("../assets/images/Phone.png")} />
                  <Text style={styles.routeIconText}>call</Text>
                </View>
              }
            />
          </View>
        )}
        <View style={styles.wheelChairAndDelivery}>
          {pharmacyDetails?.wheelchair_accessible_entrance && (
            <View style={styles.disabilityEnterance}>
              <Image
                source={require("../assets/images/physical-disability-03.png")}
              />
              <Text style={styles.disabilityEnteranceText}>Enterance</Text>
            </View>
          )}
          {pharmacyDetails?.delivery && (
            <View style={styles.disabilityEnterance}>
              <Image
                style={{ marginEnd: 6 }}
                source={require("../assets/images/delivery-pill.png")}
              />
              <Text style={styles.disabilityEnteranceText}>Delivery</Text>
            </View>
          )}
        </View>
        {pharmacyDetails?.reviews && (
          <View style={styles.reviewsMainContainer}>
            <View style={styles.reviewsHeaderContainer}>
              <Text style={styles.reviewsHeader}>
                Reviews{" (" + pharmacyDetails?.reviews?.length + ")"}
              </Text>
            </View>
            <FlatList
              style={styles.reviewsList}
              data={pharmacyDetails.reviews || []}
              renderItem={(itemData: ListRenderItemInfo<IReview>) => {
                return <ReviewCard review={itemData.item} />;
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default Pharmacy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#6FB98F",
  },
  header: {
    width: "100%",
    height: 232,
    backgroundColor: "#6FB98F",
  },
  iconContainer: {
    top: 100,
    left: 0,
    right: 0,
    borderRadius: 100,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  icon: {
    borderRadius: 100,
    width: 164,
    height: 164,
    // transform:[{scale:0.5}]
    backgroundColor: "white",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#021C1E",
    width: "100%",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
    alignItems: "center",
  },
  statusAndRate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoTextOpen: {
    fontSize: 14,
    color: "#FF0000",
    textTransform: "uppercase",
  },
  infoTextRaiting: {
    fontSize: 14,
    color: "white",
    textTransform: "uppercase",
  },
  name: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  addressAndLocation: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 28,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: "white",
    flex: 5,
  },
  buttonStyle: {
    flex: 1,
  },
  routeIcon: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
  },
  routeIconText: {
    fontSize: 12,
    textTransform: "capitalize",
    fontWeight: "400",
    color: "white",
  },
  wheelChairAndDelivery: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 20,
  },
  disabilityEnterance: {
    flexDirection: "row",
    alignItems: "center",
    marginEnd: 14,
  },
  disabilityEnteranceText: {
    fontSize: 16,
    color: "#6FB98F",
  },
  reviewsMainContainer: {
    width: "100%",
    flex: 1,
  },
  reviewsHeaderContainer: {
    borderBottomColor: "#6FB98F",
    borderBottomWidth: 2,
    alignSelf: "flex-start",
  },
  reviewsHeader: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
    marginBottom: 10,
    paddingEnd: 7,
  },
  reviewsList: {
    width: "100%",
  },
});
