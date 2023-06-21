import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="bg-white">
        <Image
          className="w-full h-36"
          source={{
            uri: "https://img.freepik.com/free-photo/classic-luxury-style-restaurant-with-tables-chairs_140725-9389.jpg?w=900&t=st=1687256728~exp=1687257328~hmac=c2ed26a29cd48d7d1c072c09908534ad48a403662ed475c04b295a6d474414dc",
          }}
        />
        <View className="flex-1 items-center justify-center bg-white">
          {/* <Image
            className="w-full h-48 object-contain"
            source={require("../assets/logo.png")}
          /> */}
          <Text className="text-primary-yellow">Home Screen</Text>
          <Pressable
            className="bg-primary-yellow py-2 px-3 rounded-md focus:bg-yellow-600"
            onPress={() => {
              navigation.navigate("Menu");
            }}
          >
            <Text className="text-white">Our Menu</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
