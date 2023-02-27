import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import LoginEmail from "./src/views/LoginEmail";
import LoginPassword from "./src/views/LoginPassword";
import RegisterPage from "./src/views/RegisterPage";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Home from "./src/views/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="LoginEmail" component={LoginEmail} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="Home" component={Home} />

          {/* <Stack.Screen name="CSR" component={CSR} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
