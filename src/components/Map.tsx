import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [longitude, setLongitude] = useState<number>(0);
  const [latitude, setLatitude] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLongitude(location.coords.longitude);
      setLatitude(location.coords.latitude);
      // setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    // <View style={styles.container}>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.785834,
        longitude: -122.406417,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      region={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        key={Math.random()}
        image={require("../assets/images/icons8-user-location-48.png")}
        style={styles.marker}
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
      />
      <Marker
        key={Math.random()}
        image={require("../assets/images/icons8-pharmacy-shop-48.png")}
        style={styles.marker}
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
      />
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
