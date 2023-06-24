import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

import { useQuery, gql } from "@apollo/client";

const GET_ITEMS = gql`
  query FindItems {
    findItems {
      id
      name
      price
      imgUrl
    }
  }
`;

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_ITEMS);
  // console.log(error);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="bg-white flex-1">
        <Image
          className="w-full h-36"
          source={{
            uri: "https://img.freepik.com/free-photo/classic-luxury-style-restaurant-with-tables-chairs_140725-9389.jpg?w=900&t=st=1687256728~exp=1687257328~hmac=c2ed26a29cd48d7d1c072c09908534ad48a403662ed475c04b295a6d474414dc",
          }}
        />
        <View className="flex-1 items-center justify-center bg-red-500">
          {/* <Image
            className="w-full h-48 object-contain"
            source={require("../assets/logo.png")}
          /> */}
          {/* <Text className="text-primary-yellow">Home Screen</Text> */}
          {/* <Pressable
            className="bg-primary-yellow py-2 px-3 rounded-md focus:bg-yellow-600"
            onPress={() => {
              navigation.navigate("Menu");
            }}
          >
            <Text className="text-white">Our Menu</Text>
          </Pressable> */}
          <FlatList
            data={data.findItems}
            renderItem={({ item }) => {
              return (
                <View className="px-2 py-3 bg-white my-2 rounded-md shadow-md flex">
                  {/* <Image
                    className="w-full h-36"
                    source={{
                      uri: `${item.imgUrl}`,
                    }}
                  /> */}
                  <Text className="text-cyan-800">{item.name}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
