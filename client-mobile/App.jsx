import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import { NativeWindStyleSheet } from "nativewind";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const client = new ApolloClient({
  uri: "https://bf61-182-4-103-183.ngrok-free.app/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Tab.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
    //
    //   <Stack.Navigator>
    //     <Stack.Screen name="Home" component={HomeScreen} />
    //     <Stack.Screen name="Menu" component={MenuScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});
