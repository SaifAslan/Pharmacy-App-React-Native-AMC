import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
//@ts-ignore
import { apiUrl } from "@env";
import { IPharmacy } from "../interfaces/pharmacy";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { savePharmacies } from "../redux/features/pharmaciesSlice";
import { saveUserLocation } from "../redux/features/userLocationSlice";

export default function Map() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const pharmacies = useAppSelector((state) => state.pharmacies);
  const userLocation = useAppSelector((state) => state.userLocation);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      dispatch(
        saveUserLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        })
      );

      fetchNearbyPharmacies(
        encodeURIComponent(
          location.coords.latitude + "," + location.coords.longitude
        )
      );

      // fetchNearbyPharmacies()
      // setLocation(location);
    })();
  }, []);

  const _map = useRef<MapView | null>(null);

  function fitMapToPolyline(data: IPharmacy[]) {    
    let coords = [];
    for (let i = 0; i < data.length; i++) {
      coords.push({
        latitude: data[i].location.lat,
        longitude: data[i].location.lng,
      });
    }
    //@ts-ignore
    _map.current.fitToCoordinates(coords, {
      edgePadding: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      },
    });
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  }

  const fetchNearbyPharmacies = (location: string): void => {
    axios
      .get(apiUrl + `api/pharmacies?location=${location}`)
      .then((response) => {
        dispatch(savePharmacies(response.data));
        return response.data;
      })
      .then((data) => fitMapToPolyline(data))
      .catch((error) => console.log(error));
  };

  return (
    // <View style={styles.container}>
    <MapView
      ref={_map}
      showsUserLocation={true}
      showsCompass={true}
      style={styles.map}
      initialRegion={{
        latitude: 37.785834,
        longitude: -122.406417,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {pharmacies.map((pharmacy, index) => {
        return (
          <Marker
            key={index}
            image={require("../assets/images/icons8-pharmacy-shop-48-2.png")}
            style={styles.marker}
            coordinate={{
              latitude: pharmacy.location.lat,
              longitude: pharmacy.location.lng,
            }}
          />
        );
      })}
    </MapView>
    // </View>
  );
}
//create our styling code:
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 2, //the container will fill the whole screen.
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: "100%",
    flex: 4,
  },
  marker: {
    transform: [{ scale: 2 }],
  },
});
