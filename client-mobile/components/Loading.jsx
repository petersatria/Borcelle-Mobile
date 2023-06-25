import { View, Text, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View className="bg-white flex-1 items-center justify-center">
      <ActivityIndicator size="large" color="#d2a556" />
      <Text>Loading...</Text>
    </View>
  );
}
