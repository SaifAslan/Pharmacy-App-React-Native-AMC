import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  LoginEmail: undefined;
  NotConnected404: undefined;
};

type ProfileProps = NativeStackNavigationProp<RootStackParamList, "Home">;
export default function Index() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const navigation = useNavigation<ProfileProps>();
  const netInfo = useNetInfo();

  useEffect(() => {
    // make sure the app is connected to the network otherwise it will direct to 404 page
    !netInfo.isConnected && navigation.navigate("NotConnected404");
  }, [netInfo.isConnected]);

  useEffect(() => {
    // make sure the user is logged in otherwise it will direct to Login
    userInfo.accessToken == ""
      ? navigation.navigate("LoginEmail")
      : navigation.navigate("Home");
  }, [userInfo.accessToken]);

  return <></>;
}
