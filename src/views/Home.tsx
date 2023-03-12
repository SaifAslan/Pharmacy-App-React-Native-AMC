import { useNetInfo } from "@react-native-community/netinfo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButtons from "../components/AppButtons";
import Map from "../components/Map";
import PharmacyCard from "../components/PharmacyCard";
import SideNav from "../components/SideNav";
import { IPharmacy } from "../interfaces/pharmacy";
import { logout } from "../redux/features/userInfoSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type RootStackParamList = {
  RegisterPage: undefined;
  LoginPassword: { email: string };
  LoginEmail: undefined;
  UserProfile: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

export const Home = ({ navigation }: Props) => {
  const [activePharmacy, setActivePharmacy] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const netInfo = useNetInfo();

  const dispatch = useAppDispatch();

  const pharmacies = useAppSelector((state) => state.pharmacies);

  const flatListRef = React.useRef();
  const handlePharmacyClick = (pharmacyIndex: number) => {
    setActivePharmacy(pharmacyIndex);
  };

  useEffect(() => {
    flatListRef?.current?.scrollToIndex({
      index: typeof activePharmacy == "number" ? activePharmacy : 0,
    });
  }, [activePharmacy]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowNav(true)} style={styles.menuIcon}>
        <Image source={require("../assets/images/Menu.png")} />
      </Pressable>
      <SideNav showNav={showNav} setShowNav={setShowNav}>
        <AppButtons
          ViewStyle={{}}
          PressableStyle={{ marginBottom: 14 }}
          onPress={() => navigation.navigate("UserProfile")}
          Content={<Text style={styles.profileText}>Profile</Text>}
        />
        <AppButtons
          ViewStyle={{}}
          PressableStyle={{}}
          onPress={handleLogout}
          Content={<Text style={styles.profileText}>Logout</Text>}
        />
      </SideNav>
      <Map
        activePharmacy={activePharmacy}
        setActivePharmacy={setActivePharmacy}
      />
      <View style={styles.bottomContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>Nearby pharmacies</Text>
       
          {!netInfo.isConnected && (
            <Text
              style={{
                ...styles.title,
                fontSize: 16,
                color: "red",
              }}
            >
               {" OFFLINE"}
            </Text>
          )}
        </View>
        {pharmacies.length > 0 && (
          <FlatList
            getItemLayout={(data, index) => ({
              length: pharmacies.length,
              offset: 60 * index,
              index,
            })}
            ref={flatListRef}
            data={pharmacies}
            style={styles.pharmaciesContainer}
            renderItem={(itemData: ListRenderItemInfo<IPharmacy>) => {
              return (
                <Pressable onPress={() => handlePharmacyClick(itemData.index)}>
                  <PharmacyCard
                    index={itemData.index}
                    activePharmacy={activePharmacy}
                    pharmacy={itemData.item}
                  />
                </Pressable>
              );
            }}
            keyExtractor={(item) => item.place_id}
          />
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 3,
    width: "100%",
    backgroundColor: "#021C1E",
    paddingHorizontal: 13,
    paddingVertical: 17,
  },
  title: {
    color: "white",
    fontSize: 21,
    fontWeight: "400",
    marginBottom: 10,
  },
  pharmaciesContainer: {
    flex: 1,
    width: "100%",
  },
  menuIcon: {
    position: "absolute",
    start: 10,
    top: 40,
    zIndex: 1,
  },
  profileText: {
    color: "#6FB98F",
    fontSize: 30,
  },
});
