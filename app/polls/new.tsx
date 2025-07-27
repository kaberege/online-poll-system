import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Pressable, Alert } from "react-native";
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
    console.log(`emptyOptions: ${emptyOptions.length}`);
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
      console.log(error);
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
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <View>
          <Text className="mt-4 text-zinc-800 text-lg font-semibold ">
            Tile
          </Text>
          <TextInput
            placeholder="Type your question here"
            value={question}
            onChangeText={setQuestion}
            className="p-2 rounded-md bg-slate-50 outline-none"
          />
          <Text className="mt-4 mb-2 text-zinc-800 text-base">Options</Text>
          <View>
            {options.map((option, index) => (
              <View
                key={index}
                className="p-2 bg-slate-50 mt-1 rounded-md flex flex-row"
              >
                <TextInput
                  value={option}
                  placeholder={`Option ${index + 1}`}
                  onChangeText={(text) => {
                    const updated = [...options];
                    updated[index] = text;
                    setOptions(updated);
                  }}
                  className=" outline-none flex-1 "
                />
                <Pressable
                  onPress={() => {
                    const updated = [...options];
                    updated.splice(index, 1);
                    setOptions(updated);
                  }}
                >
                  <Feather name="x" size={20} color="red" />
                </Pressable>
              </View>
            ))}
            <Button
              title="Add option"
              onPress={() => setOptions((prev) => [...prev, ""])}
            />
          </View>
          <Button title="Create poll" onPress={createPoll} />
          {error && (
            <Text className="text-center text-red-600 text-xs">{error}</Text>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default NewPoll;
