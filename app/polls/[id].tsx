import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const poll = {
  question: "React Native vs Flutter",
  options: ["React Native FTW", "Flutter", "SwiftUI"],
};

const PollDetails = () => {
  const { id } = useLocalSearchParams();
  const [selected, setSelected] = useState<string>("React Native FTW");

  const vote = () => console.warn("Vote", selected);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <View className="">
          <Text className="text-sm font-medium text-zinc-900">
            {poll.question}
          </Text>
          <View className="flex flex-col gap-2 mb-4">
            {poll.options.map((option, index) => (
              <Pressable
                key={index}
                onPress={() => setSelected(option)}
                className=" p-2 bg-zinc-300 flex flex-row gap-1  rounded-md cursor-pointer hover:bg-zinc-400 transition-colors"
              >
                <Feather
                  name={selected === option ? "check-circle" : "circle"}
                  size={18}
                  color={selected === option ? "green" : "gray"}
                />
                <Text className="text-zinc-700 text-xs ">{option}</Text>
              </Pressable>
            ))}
          </View>
          <Button title="Vote" onPress={() => vote} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PollDetails;
