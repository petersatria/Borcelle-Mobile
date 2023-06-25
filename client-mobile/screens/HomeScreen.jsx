import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  Image,
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
      Category {
        name
      }
    }
    findCategories {
      id
      name
    }
  }
`;

import Card from "../components/Card";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_ITEMS);
  const [filteredData, setFilteredData] = useState();

  const onPressHandler = (value) => {
    if (value) {
      let filter = data?.findItems.filter((e) => e.Category.name === value);
      setFilteredData(filter);
    } else {
      setFilteredData(data?.findItems);
    }
  };

  useEffect(() => {
    setFilteredData(data?.findItems);
  }, [data]);

  if (loading) return <Loading />;
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
        <View className="flex flex-row flex-wrap mt-5 mx-9">
          <Pressable className="m-1" onPress={() => onPressHandler("")}>
            <Text className="text-black text-sm bg-white p-2 rounded-sm">
              All
            </Text>
          </Pressable>
          {data.findCategories &&
            data.findCategories.map((e, i) => {
              return (
                <Pressable
                  className="m-1"
                  key={i}
                  onPress={() => onPressHandler(e.name)}
                  style={({ pressed }) => [
                    {
                      transform: pressed ? [{ scale: 1.25 }] : "",
                      marginVertical: pressed ? 15 : 0,
                    },
                  ]}
                >
                  <Text className="text-black text-sm bg-white p-2 rounded-sm">
                    {e.name}
                  </Text>
                </Pressable>
              );
            })}
        </View>
        <FlatList
          className="my-5"
          data={filteredData}
          renderItem={({ item }) => {
            return (
              <Pressable
                key={item.id}
                onPress={() => navigation.navigate("Detail", { id: item.id })}
                style={({ pressed }) => [
                  {
                    transform: pressed ? [{ scale: 1.15 }] : "",
                    marginVertical: pressed ? 15 : 0,
                  },
                ]}
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
