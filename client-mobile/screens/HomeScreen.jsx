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
  TouchableWithoutFeedback,
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

import Card from "../components/Card";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  return (
    <View className="bg-white flex-1">
      <Image
        className="w-full h-36"
        source={{
          uri: "https://img.freepik.com/free-photo/classic-luxury-style-restaurant-with-tables-chairs_140725-9389.jpg?w=900&t=st=1687256728~exp=1687257328~hmac=c2ed26a29cd48d7d1c072c09908534ad48a403662ed475c04b295a6d474414dc",
        }}
      />
      <View className="flex-1 items-center justify-center bg-primary-yellow">
        <FlatList
          className="my-5"
          data={data.findItems}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => navigation.navigate("Detail", { id: item.id })}
              >
                <Card item={item} />
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
}
