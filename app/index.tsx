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
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPolls } from "@/store/poll/pollSlice";

export default function Index() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const polls = useAppSelector((state) => state.polls);

  useEffect(() => {
    const fetchPolls = async () => {
      console.log("Fetching....");

      let { data, error } = await supabase.from("polls").select("*");

      if (error) {
        Alert.alert("Error Fetching data!");
      }

      //console.log(data);
      if (data) dispatch(setPolls(data));
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

  if (!polls) {
    return <ActivityIndicator className="mt-20" />;
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
              <Text className="bg-amber-600">
                {item.id} {item.question}
              </Text>
            </Link>
          )}
          className=""
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
