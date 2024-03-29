import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
  Alert,
} from "react-native";
import AppButtons from "../components/AppButtons";
import AuthenticationFormContainer from "../components/AuthenticationFormContainer";
import SharedStyles from "../Styles/SharedStyles";
//@ts-ignore
import { apiUrl } from "@env";
import validator from "validator";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addEmail } from "../redux/features/userInfoSlice";
import Map from "../components/Map";

type RootStackParamList = {
  RegisterPage: undefined;
  LoginPassword: { email: string };
  LoginEmail: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginEmail = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");


  const handleCheckEmail = () => { 
    //This handler function is to first check that the email is valid then it posts
    //the email to the backend
    if (validator.isEmail(email)) {
      axios
        .post(apiUrl + "authentication/login-check-email", { email: email })
        .then((response) => {
          //when the email is valid then save in the redux store then direct to
          //the password screen with the email is a prop
          dispatch(addEmail(email));
          navigation.navigate("LoginPassword", { email });
        })
        .catch((error) => {
          Alert.alert(error.response.data.message);
        });
    } else {
      alert("Please enter a valid email");
    }
  };

  return (
    <View style={styles.loginEmailContainer}>
      <AuthenticationFormContainer>
        <Text style={styles.title}>enter your login information</Text>
        <TextInput
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="example@mail.com"
          style={SharedStyles.AppInput}
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <View style={styles.ButtonsContainer}>
          <AppButtons
            ViewStyle={{
              ...styles.ButtonTextContainer,
              backgroundColor: "#fff",
            }}
            PressableStyle={styles.Buttons}
            onPress={() => {
              navigation.navigate("RegisterPage");
            }}
            Content={<Text style={styles.ButtonRegister}>Register</Text>}
          />

          <AppButtons
            ViewStyle={{
              ...styles.ButtonTextContainer,
              backgroundColor: "#000",
            }}
            PressableStyle={styles.Buttons}
            onPress={() => {
              handleCheckEmail();
            }}
            Content={<Text style={styles.ButtonContinue}>Continue</Text>}
          />
        </View>
        <Image
          style={styles.logoStyle}
          source={require("../assets/images/167-1673721_controlled-drugs-cabinets-hdl-icon-logo-pharmacy-logo-1.png")}
        />
      </AuthenticationFormContainer>
      {/* <Map /> */}
    </View>
  );
};

export default LoginEmail;

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
    width: "48%",
  },
  ButtonTextContainer: {
    borderRadius: 5,
    height: 46,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  ButtonRegister: {
    color: "#021C1E",
    textTransform: "uppercase",
    fontSize: 21,
    fontWeight: "400",
  },
  ButtonContinue: {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 21,
    fontWeight: "500",
  },
  logoStyle: {
    width: "44%",
    // height: 100,
    marginVertical: 30,
    resizeMode: "contain",
  },
});
