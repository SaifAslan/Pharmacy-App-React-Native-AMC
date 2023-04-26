import { useNetInfo } from "@react-native-community/netinfo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import AppButtons from "../components/AppButtons";

type RootStackParamList = {
  NotConnected404: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const NotConnected404 = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 341,
          height: 341,
        }}
        resizeMode="contain"
        source={require("../assets/images/No-connection-rafiki.png")}
      />
      <Text style={styles.title}>OOPS!</Text>
      <Text style={styles.body}>
        For most up to date information, Kindly make sure your connected to the
        network then press re-connect
      </Text>
      <AppButtons
        onPress={() => {
          navigation.goBack();
        }}
        PressableStyle={styles.buttonPressable}
        ViewStyle={styles.buttonView}
        Content={<Text style={styles.buttonText}>Go back</Text>}
      />
    </View>
  );
};

export default NotConnected404;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: "10%",
    padding: 20,
  },
  title: {
    fontSize: 23,
    color: "#6FB98F",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 7,
  },
  body: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 33,
  },
  buttonView: {
    borderRadius: 5,
    borderColor: "#6FB98F",
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  buttonText: {
    color: "#6FB98F",
    fontWeight: "normal",
    fontSize: 21,
  },
  buttonPressable: {
    width: "100%",
    height: 46,
  },
});
