import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  Image,
} from "react-native";
import AppButtons from "../components/AppButtons";
import AuthenticationFormContainer from "../components/AuthenticationFormContainer";
import SharedStyles from "../Styles/SharedStyles";
//@ts-ignore
import { apiUrl } from "@env";
import validator from "validator";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { addEmail } from "../redux/features/userInfoSlice";

type RootStackParamList = {
  RegisterPage: undefined;
  LoginPassword: {email: string};
  LoginEmail: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const LoginEmail = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
//  const userInfo = useAppSelector((state) => state.userInfo);
 
  const [email, setEmail] = useState<string>("");

  const handleCheckEmail = () => {
    if (validator.isEmail(email)) {
      axios
        .post(apiUrl + "authentication/login-check-email", { email: email })
        .then((response) => {
          console.log(response.data.message);
          dispatch(addEmail(email));
          navigation.navigate("LoginPassword",{email});
        })
        .catch((error) => console.log(error));
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
          onChangeText={(text) => setEmail(text)}
        />
        <View style={styles.ButtonsContainer}>
          <AppButtons
            ViewStyle={{
              ...styles.ButtonTextContainer,
              backgroundColor: "#fff",
            }}
            TextStyle={styles.ButtonRegister}
            PressableStyle={styles.Buttons}
            onPress={() => {
              navigation.navigate("RegisterPage");
            }}
            buttonText="Register"
          />
          <AppButtons
            ViewStyle={{
              ...styles.ButtonTextContainer,
              backgroundColor: "#000",
            }}
            TextStyle={styles.ButtonContinue}
            PressableStyle={styles.Buttons}
            onPress={() => {
              handleCheckEmail();

              // navigation.navigate("LoginPassword")}
            }}
            buttonText="Continue"
          />
        </View>
        <Image
          style={styles.logoStyle}
          source={require("../assets/images/167-1673721_controlled-drugs-cabinets-hdl-icon-logo-pharmacy-logo-1.png")}
        />
      </AuthenticationFormContainer>
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
