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
import NotConnected404 from "./src/views/NotConnected404";

const Stack = createNativeStackNavigator();

export default function App() {
  //devining redux persistent store
  let persistor = persistStore(store);

  return (
    //wrapping the app with redux store to provide access for the store in the app 
    <Provider store={store}>
    {/* wrapping the app with redux persis wrapper to persist the redux data in async storage */}
      <PersistGate loading={null} persistor={persistor}>
        {/* defining and setting up the app navigation */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="LoginEmail" component={LoginEmail} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
            {/* @ts-ignore */}
            <Stack.Screen name="LoginPassword" component={LoginPassword} />
            {/* @ts-ignore */}
            <Stack.Screen name="Pharmacy" component={Pharmacy} />
            <Stack.Screen name="NotConnected404" component={NotConnected404} />
          </Stack.Navigator>
          <Index />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
