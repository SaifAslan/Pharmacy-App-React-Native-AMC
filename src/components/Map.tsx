import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Alert,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
//@ts-ignore
import { apiUrl } from "@env";
import { IPharmacy } from "../interfaces/pharmacy";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { savePharmacies } from "../redux/features/pharmaciesSlice";
import { saveUserLocation } from "../redux/features/userLocationSlice";

interface Props {
  activePharmacy: number;
  setActivePharmacy: (activePharmacy: number) => void;
}

export default function Map({ activePharmacy, setActivePharmacy }: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const _map = useRef<MapView>();
  const dispatch = useAppDispatch();
  const pharmacies = useAppSelector((state) => state.pharmacies);
  const userLocation = useAppSelector((state) => state.userLocation);

  const handleUpdateActivePharmacy = (index: number) => {
    setActivePharmacy(index);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy:
          Platform.OS === "android"
            ? Location.Accuracy.Low
            : Location.Accuracy.Lowest,
      });

      dispatch(
        saveUserLocation({
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        })
      );

      fetchNearbyPharmaciesCB(location);
    })();
  }, []);

  useEffect(() => {
    pharmacies.length > 0 && fitMapToPolyline(pharmacies);
  }, [pharmacies]);

  const fetchNearbyPharmaciesCB = useCallback(
    (location: {}) => {
      fetchNearbyPharmacies(
        encodeURIComponent(
          //@ts-ignore
          location.coords.latitude + "," + location.coords.longitude
        )
      );
    },
    [userLocation.latitude || userLocation.longitude]
  );

  function fitMapToPolyline(data: IPharmacy[]) {
    let coords = [];
    for (let i = 0; i < data.length; i++) {
      coords.push({
        latitude: data[i].location.lat,
        longitude: data[i].location.lng,
      });
    }
    //@ts-ignore
    coords.length > 0 &&
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
      .catch((error) => Alert.alert(error.response.data.message));
  };

  return (
    <MapView
    //@ts-ignore
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
          <Pressable
            key={index}
            onPress={() => handleUpdateActivePharmacy(index)}
          >
            <Marker
              image={
                activePharmacy == index
                  ? require("../assets/images/icons8-pharmacy-shop-48-active.png")
                  : require("../assets/images/icons8-pharmacy-shop-48-2.png")
              }
              style={{
                ...styles.marker,
                transform:
                  activePharmacy == index ? [{ scale: 2.5 }] : [{ scale: 2 }],
              }}
              coordinate={{
                latitude: pharmacy.location.lat,
                longitude: pharmacy.location.lng,
              }}
            />
          </Pressable>
        );
      })}
    </MapView>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 2, //the container will fill the whole screen.
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    flex: 4,
  },
  marker: {
  },
});
