import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, Alert } from "react-native";
import AuthenticationFormContainer from "../components/AuthenticationFormContainer";
import axios from "axios";
import AppButtons from "../components/AppButtons";
import SharedStyles from "../Styles/SharedStyles";
//@ts-ignore
import { apiUrl } from "@env";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/userInfoSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  LoginPassword: { email: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "LoginPassword">;

const LoginPassword = ({ route, navigation }: Props) => {
  const { email } = route.params;
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>({ email, password: "" });

  const passwordValidator = () => {
    return loginInfo.password.length < 8 ? false : true;
  };

  const handleLogin = () => {
    if (!passwordValidator()) {
      return Alert.prompt("Error", "Password must be at least 8 characters");
    }

    axios
      .post(apiUrl + "authentication/login", {
        email: loginInfo.email,
        password: loginInfo.password?.toString(),
      })
      .then((response) => {
        if (response.status === 200) {
          //when the email and password are valid then save the user information in the
          //redux store then direct to the home screen
          dispatch(
            login({
              name: response.data.user.name,
              email: response.data.user.email,
              accessToken: response.data.accessToken,
              phone: response.data.user.phone,
              surname: response.data.user.surname,
            })
          );
          navigation.push("Home");
        } else {
          // this to handle the validation errors
          Alert.alert("Error", response.data.message);
        }
      })
      .catch((error) => Alert.alert(error.response.data.message));
  };

  return (
    <View style={styles.loginEmailContainer}>
      <AuthenticationFormContainer>
        <Text style={styles.title}>enter your password</Text>
        <TextInput
          secureTextEntry={true}
          placeholderTextColor="rgba(255, 255, 255, 0.7)"
          placeholder="password"
          textContentType="password"
          value={loginInfo.password}
          onChangeText={(text) => {
            setLoginInfo({ ...loginInfo, password: text });
          }}
          style={SharedStyles.AppInput}
        />
        <View style={styles.ButtonsContainer}>
          <AppButtons
            ViewStyle={{
              ...styles.ButtonTextContainer,
              backgroundColor: "#000",
            }}
            PressableStyle={styles.Buttons}
            onPress={handleLogin}
            Content={<Text style={styles.ButtonContinue}>Continue</Text>}
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

export default LoginPassword;

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
