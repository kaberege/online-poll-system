import { useEffect } from "react";
import {
  Text,
  FlatList,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack, useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPolls } from "@/store/poll/pollSlice";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const polls = useAppSelector((state) => state.polls);

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase.from("polls").select("*");

      if (error) {
        Alert.alert("Error Fetching data!");
      }

      if (data) dispatch(setPolls(data));
    };

    fetchPolls();
  }, [polls]);

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

  if (polls.length < 1) {
    return <ActivityIndicator className="mt-20" color="#0f766e" size="large" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 px-4 py-6">
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
          className="flex-1"
          renderItem={({ item }) => (
            <Link
              href={{ pathname: "/polls/[id]", params: { id: item.id } }}
              className="rounded-xl bg-white shadow-md p-4"
            >
              <Text className="text-lg font-semibold text-zinc-800">
                <Text className="text-xs text-zinc-500">
                  Poll {item.id}:&nbsp;
                </Text>
                <Text className="text-lg font-semibold text-zinc-800">
                  {item.question}
                </Text>
              </Text>
            </Link>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
