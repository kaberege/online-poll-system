import { useState } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const NewPoll = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);

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
          <Button title="Create poll" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default NewPoll;
