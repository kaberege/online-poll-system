import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, Button, Alert } from "react-native";
import { Link, useLocalSearchParams, Redirect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeSession } from "@/store/poll/authSlice";
import { VoteProps } from "@/types/db";

type NewVote = {
  id?: number;
  option: string;
  poll_id: number;
  user_id: string;
};

const PollDetails = () => {
  const { id } = useLocalSearchParams();
  const [selected, setSelected] = useState<string>("");
  const polls = useAppSelector((state) =>
    state.polls.find((poll) => poll.id === Number.parseInt(id as string))
  );
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();
  const [userVote, setUserVote] = useState<VoteProps | null>(null);

  useEffect(() => {
    dispatch(initializeSession());

    const fetchUserVote = async () => {
      if (!polls || !session?.user.id) {
        return;
      }

      let { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id as string))
        .eq("user_id", session?.user.id)
        .limit(1)
        .single();

      if (error) {
        console.log("Before Alert");
        console.log(error);
        Alert.alert("Error Fetching votes!");
      }

      if (data) {
        setUserVote(data);
        setSelected(data.option);
      }
    };

    fetchUserVote();
  }, []);

  const vote = async () => {
    if (!polls || !session?.user.id) {
      return;
    }

    const newVote: NewVote = {
      option: selected,
      poll_id: polls?.id,
      user_id: session?.user.id,
    };

    if (userVote) {
      newVote.id = userVote.id;
    }

    const { data, error } = await supabase
      .from("votes")
      .upsert([newVote])
      .select()
      .single();

    if (error) {
      Alert.alert("Failed to vote!");
    } else {
      setUserVote(data);
      Alert.alert("Thank you for your vote.");
    }
  };

  if (!session?.user) {
    return <Redirect href="/login" />;
  }

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
          <Button title="Vote" onPress={() => vote()} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PollDetails;
