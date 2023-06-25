import { View, Text, Image } from "react-native";

export default function Card({ item }) {
  return (
    <View className="px-2 py-3 bg-white my-2 rounded-lg shadow-md mx-8 p-0">
      <View className="w-4/6 flex flex-row">
        <Image
          className="rounded-l-lg w-3/6 h-28"
          source={{
            uri: `${item.imgUrl}`,
          }}
        />
        <View className="p-3 justify-between">
          <Text>
            <View className="py-1 px-2 bg-yellow-100 rounded-md">
              <Text className="text-gray-600 text-xs">
                {item.Category.name}
              </Text>
            </View>
          </Text>
          <Text className="text-black font-bold">{item.name}</Text>
          <Text className="text-gray-600 text-xs">IDR {item.price}</Text>
        </View>
      </View>
    </View>
  );
}
