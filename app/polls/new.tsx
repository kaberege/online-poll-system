import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeSession } from "@/store/poll/authSlice";
import { supabase } from "@/lib/supabase";

const NewPoll = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [error, setError] = useState("");

  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();

  // Update auth session state
  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  // Validate question and options before submit poll
  async function createPoll() {
    setError("");

    if (!question) {
      setError("Question should not be empty!");
      return;
    }

    const emptyOptions = options.filter((option) => option === "");
    if (emptyOptions.length > 0) {
      setError("All options must be filled!");
      return;
    }

    const minOptions = options.filter((option) => option !== "");
    if (minOptions.length < 2) {
      setError("Please provide at least 2 valid options!");
      return;
    }
    const { data, error } = await supabase
      .from("polls")
      .insert([{ question, options }])
      .select();

    if (error) {
      setError("Failed to create the poll!");
      Alert.alert("Failed to create the poll!");
      return;
    }

    router.back();
  }

  // Redirect user to the login page if no session/user found
  if (!session?.user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 px-4 py-6">
        <View className="space-y-4">
          <Text className="text-zinc-800 text-2xl font-semibold">
            Create a Poll
          </Text>

          <View className="space-y-2 mt-4">
            <Text className="text-zinc-700 font-medium">Poll Question</Text>
            <TextInput
              placeholder="Type your question here"
              value={question}
              onChangeText={setQuestion}
              className="bg-white rounded-xl px-4 py-3 text-base border border-zinc-300 mt-1"
            />
          </View>

          <View className="space-y-2 mt-2">
            <Text className="text-zinc-700 font-medium mb-1">Options</Text>
            {options.map((option, index) => (
              <View
                key={index}
                className="flex-row items-center bg-white border border-zinc-300 rounded-xl px-3 py-2 mb-1"
              >
                <TextInput
                  value={option}
                  placeholder={`Option ${index + 1}`}
                  onChangeText={(text) => {
                    const updated = [...options];
                    updated[index] = text;
                    setOptions(updated);
                  }}
                  className="flex-1 text-base pr-2"
                />
                <Pressable
                  onPress={() => {
                    const updated = [...options];
                    updated.splice(index, 1);
                    setOptions(updated);
                  }}
                  className="pl-2"
                >
                  <Feather name="x" size={20} color="red" />
                </Pressable>
              </View>
            ))}
            <Pressable
              onPress={() => setOptions((prev) => [...prev, ""])}
              className="mt-2 items-center justify-center rounded-xl bg-teal-500 py-3"
            >
              <Text className="text-white font-medium">+ Add Option</Text>
            </Pressable>
          </View>

          {error && (
            <Text className="text-red-600 text-sm text-center mt-2">
              {error}
            </Text>
          )}

          <Pressable
            onPress={createPoll}
            className="mt-4 items-center justify-center rounded-xl bg-emerald-600 py-4"
          >
            <Text className="text-white font-semibold text-base">
              Create Poll
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default NewPoll;
