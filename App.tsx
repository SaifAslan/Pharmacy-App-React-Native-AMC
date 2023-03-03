import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginEmail from "./src/views/LoginEmail";
import LoginPassword from "./src/views/LoginPassword";
import RegisterPage from "./src/views/RegisterPage";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import Home from "./src/views/Home";
import Index from "./src/views/Index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Pharmacy from "./src/views/Pharmacy";
import UserProfile from "./src/views/UserProfile";

const Stack = createNativeStackNavigator();

export default function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="UserProfile" component={UserProfile} />

            <Stack.Screen name="Home" component={Home} />

            <Stack.Screen name="LoginEmail" component={LoginEmail} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
            <Stack.Screen name="LoginPassword" component={LoginPassword} />
            <Stack.Screen name="Pharmacy" component={Pharmacy} />
          </Stack.Navigator>
          <Index />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
