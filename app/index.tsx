import { Text, FlatList, Pressable, Alert, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface PollProps {
  id: number;
  question: string;
  options: string[];
}

export default function Index() {
  const [polls, setPolls] = useState<PollProps[] | null>(null);

  const router = useRouter();

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

  function LoginIcon() {
    return (
      <Pressable
        onPress={() => router.push("/profile")}
        style={{ paddingRight: 16 }}
      >
        <Image
          className="w-8 h-8 rounded-full bg-teal-600"
          source={require("@/assets/images/profile2.png")}
        />
      </Pressable>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <Stack.Screen
          options={{
            title: "Polls",
            headerTitleAlign: "center",
            headerRight: () => (
              <Pressable
                onPress={() => router.push("/polls/new")}
                style={{ paddingRight: 16 }}
              >
                <Text className="font-bold text-xl text-zinc-900">+</Text>
              </Pressable>
            ),
            headerLeft: () => <LoginIcon />,
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
