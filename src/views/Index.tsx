import { useNetInfo } from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";


export default function Index() {
  const userInfo = useAppSelector((state) => state.userInfo);
  const navigation = useNavigation();
  const netInfo = useNetInfo()
 
  
  useEffect(() => {
    !netInfo.isConnected && navigation.navigate("NotConnected404");
  }, [netInfo.isConnected])
  
  
  useEffect(() => {
    userInfo.accessToken == ""
      ? navigation.navigate("LoginEmail")
      : navigation.navigate("Home");
  }, [userInfo.accessToken]);

  return <></>;
}
