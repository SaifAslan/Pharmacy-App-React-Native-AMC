import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import AppButtons from "../components/AppButtons";
import axios from "axios";
import AuthenticationFormContainer from "../components/AuthenticationFormContainer";
import { IUserInfoRegister } from "../interfaces/userInfo";
import SharedStyles from "../Styles/SharedStyles";
//@ts-ignore
import { apiUrl } from "@env";

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  LoginEmail: undefined;
  RegisterPage: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const RegisterPage = ({ navigation }: Props) => {
  const [userRegisteredInfo, setuserRegisteredInfo] =
    useState<IUserInfoRegister>({
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      confirmPassword: "",
    });

  const handleUserRegisteredInfo = (name: string, value: string): void => {
    setuserRegisteredInfo({ ...userRegisteredInfo, [name]: value });
  };

  const passwordsMatch = (): boolean => {
    return userRegisteredInfo.password === userRegisteredInfo.confirmPassword;
  };

  const handleSubmitUser = () => {
    if (passwordsMatch()) {
      axios
        .post(apiUrl + "authentication/create-user", userRegisteredInfo)
        .then((response) => {
          console.info("Please login using your details!");
        })
        .then(() => {
          navigation.navigate("LoginEmail");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("Error", "Passwords don't match");
    }
  };

  return (
    <View style={styles.loginEmailContainer}>
      <AuthenticationFormContainer>
        <Text style={styles.title}>register your information</Text>
        <TextInput
          onChangeText={(value) => handleUserRegisteredInfo("name", value)}
          value={userRegisteredInfo.name}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Forename"
          textContentType="givenName"
          style={SharedStyles.AppInput}
        />
        <TextInput
          onChangeText={(value) => handleUserRegisteredInfo("surname", value)}
          value={userRegisteredInfo.surname}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Family name"
          textContentType="familyName"
          style={SharedStyles.AppInput}
        />
        <TextInput
          onChangeText={(value) => handleUserRegisteredInfo("phone", value)}
          value={userRegisteredInfo.phone}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Mobile number"
          textContentType="telephoneNumber"
          style={SharedStyles.AppInput}
        />
        <TextInput
          onChangeText={(value) => handleUserRegisteredInfo("email", value)}
          value={userRegisteredInfo.email}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Email address"
          textContentType="emailAddress"
          style={SharedStyles.AppInput}
        />
        <TextInput
          onChangeText={(value) => handleUserRegisteredInfo("password", value)}
          value={userRegisteredInfo.password}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="Password"
          textContentType="password"
          style={SharedStyles.AppInput}
        />
        <TextInput
          onChangeText={(value) =>
            handleUserRegisteredInfo("confirmPassword", value)
          }
          value={userRegisteredInfo.confirmPassword}
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
              handleSubmitUser();
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
