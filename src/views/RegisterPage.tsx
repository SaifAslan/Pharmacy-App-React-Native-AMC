import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import AppButtons from "../components/AppButtons";
import AuthenticationFormContainer from "../components/AuthenticationFormContainer";
import SharedStyles from "../Styles/SharedStyles";

const RegisterPage = () => {
  return (
    <View style={styles.loginEmailContainer}>
      <AuthenticationFormContainer>
        <Text style={styles.title}>register your information</Text>
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Forename"
          textContentType="givenName"
          style={SharedStyles.AppInput}
        />
          <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Family name"
          textContentType="familyName"
          style={SharedStyles.AppInput}
        />
          <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Mobile number"
          textContentType="telephoneNumber"
          style={SharedStyles.AppInput}
        />
          <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Email address"
          textContentType="emailAddress"
          style={SharedStyles.AppInput}
        />
          <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Password"
          textContentType="password"
          style={SharedStyles.AppInput}
        />
           <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Re-enter password"
          textContentType="password"
          style={SharedStyles.AppInput}
        />
        <View style={styles.ButtonsContainer}>
          <AppButtons
            ViewStyle={{
              ...styles.ButtonTextContainer,
              backgroundColor: "#fff",
            }}
            TextStyle={styles.ButtonContinue}
            PressableStyle={styles.Buttons}
            onPress={() => {
              console.log("pressed");
            }}
            buttonText="Register"
          />
        </View>
     
      </AuthenticationFormContainer>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  loginEmailContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 21,
    textTransform: "uppercase",
    marginBottom: 20,
    width: "100%",
  },
  emailInput: {
    backgroundColor: "#6FB98F",
    height: 46,
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  ButtonsContainer: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  Buttons: {
    width: "100%",
  },
  ButtonTextContainer: {
    borderRadius: 5,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  ButtonContinue: {
    color: "#000",
    textTransform: "uppercase",
    fontSize: 21,
    fontWeight: "500",
  },
});
