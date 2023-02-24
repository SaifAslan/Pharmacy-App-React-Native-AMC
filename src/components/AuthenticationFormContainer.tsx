import React from "react";
import {
  View,
  StyleSheet,
} from "react-native";

type Props = {
    children: React.ReactNode,
}

const AuthenticationFormContainer:React.FC<Props> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

export default AuthenticationFormContainer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#021C1E",
    alignItems: "center",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
});
