import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";

const poll = {
  question: "React Native vs Flutter",
  options: ["React Native FTW", "Flutter", "SwiftUI"],
};

const PollDetails = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View className="p-2">
          <Text className="text-sm font-medium text-zinc-900">
            {poll.question}
          </Text>
          <View className="flex flex-col gap-2">
            {poll.options.map((option, index) => (
              <View
                key={index}
                className=" p-2 bg-zinc-200 flex flex-row gap-1  rounded-md cursor-pointer hover:bg-zinc-400 transition-colors"
              >
                <Feather name="check-circle" size={18} color="gray" />
                <Text className="text-zinc-700 text-xs ">{option}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PollDetails;
