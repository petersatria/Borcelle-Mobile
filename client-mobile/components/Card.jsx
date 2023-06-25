import { View, Text, Image } from "react-native";

export default function Card({ item }) {
  return (
    <View className="px-2 py-3 bg-white my-2 rounded-lg shadow-md mx-8 p-0">
      <View className="w-4/6 flex flex-row">
        <Image
          className="rounded-l-lg w-3/6 h-24"
          source={{
            uri: `${item.imgUrl}`,
          }}
        />
        <View className="p-4 justify-between">
          <Text className="text-black font-bold">{item.name}</Text>
          <Text className="text-gray-600 text-xs">IDR {item.price}</Text>
        </View>
      </View>
    </View>
  );
}
