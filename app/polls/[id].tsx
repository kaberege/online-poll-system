import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Button } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";

const PollDetails = () => {
  const { id } = useLocalSearchParams();
  const [selected, setSelected] = useState<string>("");
  const polls = useAppSelector((state) =>
    state.polls.find((poll) => poll.id === Number.parseInt(id as string))
  );

  if (!polls) {
    return (
      <View className=" bg-sky-100/50 flex-1 p-4">
        <Text className="text-center text-sm text-zinc-800 mt-20">
          Poll not found
        </Text>
        <Link href="/" className="mt-4 text-center">
          <Text className="text-teal-600 text-xs hover:text-teal-800">
            Back to home
          </Text>
        </Link>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <View className="">
          <Text className="text-sm font-medium text-zinc-900">
            {polls && polls.question}
          </Text>
          <View className="flex flex-col gap-2 mb-4">
            {polls &&
              polls.options.map((option, index) => (
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
          <Button title="Vote" onPress={() => console.log("Voted")} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PollDetails;
