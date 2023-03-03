import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../redux/hooks";

const UserProfile = () => {
  const userInfo = useAppSelector((state) => state.userInfo);

  const user = [
    userInfo.name + " " + userInfo.surname,
    userInfo.email,
    userInfo.phone,
  ];
  

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
          source={
            userInfo.image
              ? { uri: userInfo.image }
              : require("../assets/images/icons8-customer-96.png")
          }
        />
      </View>

      <View style={styles.mainContainer}>
        {user.map((item, index) => {
          return <Text style={styles.text} key={index}>{item}</Text>;
        })}
      </View>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#6FB98F",
  },
  header: {
    width: "100%",
    height: 152,
    backgroundColor: "#6FB98F",
  },
  iconContainer: {
    top: 74,
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
    backgroundColor: "white",
    borderWidth:4,
    borderColor: "#021C1E"
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    padding: 20,
    paddingTop:96
    // alignItems: "center",

  },
  text: {
    color: "#021C1E",
    fontSize: 21,
    // fontWeight: "bold",
    marginBottom:18
  },
});
