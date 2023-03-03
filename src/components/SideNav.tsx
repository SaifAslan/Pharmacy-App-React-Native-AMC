import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  showNav: boolean;
  setShowNav: (nav: boolean) => void;
  children: React.ReactNode;
}

const SideNav = ({ showNav, setShowNav, children }: Props) => {
  return (
    <View
      style={
        showNav
          ? { ...styles.mainContainer, ...styles.mainContainerVisible }
          : styles.mainContainer
      }
    >
      <Pressable
        onPress={() => setShowNav(false)}
        style={styles.visibleBackground}
      ></Pressable>
      <View
        style={
          showNav
            ? { ...styles.visibleNavContainer, ...styles.visibleNav }
            : styles.visibleNavContainer
        }
      >
        {children}
      </View>
    </View>
  );
};

export default SideNav;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    position: "absolute",
    zIndex: 2,
    width: "100%",
    display: "none",
  },
  mainContainerVisible: {
    display: "flex",
  },
  visibleBackground: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  visibleNavContainer: {
    height: "100%",
    position: "absolute",
    zIndex: 2,
    width: 220,
    backgroundColor: "black",
    start: -220,
    paddingVertical: 52,
    paddingHorizontal: 22,
  },
  visibleNav: {
    start: 0,
  },
});
