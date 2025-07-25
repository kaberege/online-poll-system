import { Text, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PollProps {
  id: number;
  question: string;
  options: string[];
}

export default function Index() {
  const [polls, setPolls] = useState<PollProps[] | null>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log("Fetching....");

      let { data, error } = await supabase.from("polls").select("*");

      if (error) {
        Alert.alert("Error Fetching data!");
      }

      console.log(data);
      setPolls(data);
    };

    fetchPolls();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <Stack.Screen
          options={{
            title: "Polls",
            headerRight: () => (
              <Link href="/polls/new" asChild>
                <Pressable className="px-2 bg-teal-600">
                  <AntDesign name="plus" size={20} color="black" />
                </Pressable>
              </Link>
            ),
          }}
        />
        <FlatList
          data={polls}
          contentContainerStyle={{ gap: 5, flex: 1 }}
          renderItem={({ item }) => (
            <Link
              href={{ pathname: "/polls/[id]", params: { id: item.id } }}
              className="bg-teal-400 text-center"
            >
              <Text className="bg-amber-600">{item.id} Example poll</Text>
            </Link>
          )}
          className=""
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
