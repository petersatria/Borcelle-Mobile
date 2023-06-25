import { Text, View, Image } from "react-native";
import { useQuery, gql } from "@apollo/client";

const GET_ITEM = gql`
  query FindItemById($itemId: ID!) {
    findItemById(id: $itemId) {
      name
      description
      price
      imgUrl
      Category {
        name
      }
      Ingredients {
        id
        name
      }
      User {
        username
        email
      }
    }
  }
`;

export default function MenuScreen({ route }) {
  const { id: itemId } = route.params;

  const { loading, error, data } = useQuery(GET_ITEM, {
    variables: { itemId },
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error : {error.message}</Text>;

  const item = data.findItemById;

  return (
    <View className="flex-1 mx-4 my-2">
      <Text className="text-primary-yellow text-lg font-bold">{item.name}</Text>
      <Text className="text-black text-sm">{item.Category.name}</Text>
      <Image
        className="w-full h-72 rounded-3xl my-4"
        source={{
          uri: item.imgUrl,
        }}
      />
      <View className="my-2">
        <View className="flex flex-row justify-between">
          <Text className="text-black text-sm font-bold">Details</Text>
          <Text className="text-gray-400 text-xs">
            posted by: {item.User.username || item.User.email}
          </Text>
        </View>
        <Text className="text-black text-sm">{item.description}</Text>
      </View>
      <View className="my-2">
        <Text className="text-black text-sm font-bold">Ingredients</Text>
        <View className="flex flex-row flex-wrap">
          {item.Ingredients &&
            item.Ingredients.map((e, i) => {
              return (
                <View className="m-1">
                  <Text className="text-white text-sm bg-primary-yellow p-2 rounded-sm">
                    {e.name}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
}
