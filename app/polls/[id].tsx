import { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  Share,
  Dimensions,
  ScrollView,
} from "react-native";
import { Link, useLocalSearchParams, Redirect } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
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
  const [votesByOption, setVotesByOption] = useState<Record<string, number>>(
    {}
  );
  const [userVote, setUserVote] = useState<VoteProps | null>(null);
  const [totalVotes, setTotalVotes] = useState<number>(0);

  const polls = useAppSelector((state) =>
    state.polls.find((poll) => poll.id === Number(id))
  );
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeSession());
    fetchUserVote();
    fetchVotesByOption();
  }, []);

  const fetchUserVote = async () => {
    if (!polls || !session?.user.id) return;

    const { data, error } = await supabase
      .from("votes")
      .select("*")
      .eq("poll_id", Number(id))
      .eq("user_id", session?.user.id)
      .limit(1)
      .single();

    if (data) {
      setUserVote(data);
      setSelected(data.option);
    }
  };

  const fetchVotesByOption = async () => {
    const { data, error } = await supabase
      .from("votes")
      .select("*")
      .eq("poll_id", Number(id));

    if (error) {
      console.log(error);
      Alert.alert("Failed to fetch results");
      return;
    }

    const counts: Record<string, number> = {};
    data.forEach((row) => {
      counts[row.option] = (counts[row.option] || 0) + 1;
    });

    setVotesByOption(counts);
    setTotalVotes(data.length);
  };

  const vote = async () => {
    if (!polls || !session?.user.id || !selected) return;

    const newVote: NewVote = {
      option: selected,
      poll_id: polls.id,
      user_id: session.user.id,
    };
    if (userVote) newVote.id = userVote.id;

    const { data, error } = await supabase
      .from("votes")
      .upsert([newVote])
      .select()
      .single();

    if (error) {
      Alert.alert("Failed to vote!");
    } else {
      setUserVote(data);
      setSelected(data.option);
      fetchVotesByOption();
      Alert.alert("Thank you for your vote.");
    }
  };

  const sharePoll = async () => {
    const url = `https://${process.env.EXPO_PUBLIC_BASE_REACT_NATIVE_URL}/polls/${polls?.id}`;
    try {
      await Share.share({
        message: `Check out this poll: ${polls?.question}\n${url}`,
      });
    } catch (error) {
      Alert.alert("Failed to share poll.");
    }
  };

  if (!session?.user) return <Redirect href="/login" />;

  if (!polls) {
    return (
      <View className="flex-1 justify-center items-center bg-sky-100/50 p-4">
        <Text className="text-center text-sm text-zinc-800">
          Poll not found
        </Text>
        <Link href="/" className="mt-4">
          <Text className="text-teal-600 text-xs">← Back to home</Text>
        </Link>
      </View>
    );
  }

  const chartData = Object.entries(votesByOption).map(([option, count], i) => ({
    name: option,
    population: count,
    color: ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#a855f7"][i % 5],
    legendFontColor: "#374151",
    legendFontSize: 12,
  }));

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <ScrollView className="space-y-6">
          <View>
            <Text className="text-xl font-bold text-zinc-900 mb-2">
              {polls.question}
            </Text>

            {polls.options.map((option, index) => {
              const votes = votesByOption[option] || 0;
              const percent =
                totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : "0";

              return (
                <Pressable
                  key={index}
                  onPress={() => setSelected(option)}
                  className={`p-3 rounded-md border ${
                    selected === option
                      ? "bg-teal-300/30 border-teal-600"
                      : "bg-white border-zinc-300"
                  } flex-row items-center justify-between mb-2`}
                >
                  <View className="flex-row items-center space-x-2">
                    <Feather
                      name={selected === option ? "check-circle" : "circle"}
                      size={20}
                      color={selected === option ? "green" : "gray"}
                    />
                    <Text className="text-zinc-800">{option}</Text>
                  </View>
                  <Text className="text-sm text-zinc-600">
                    {votes} votes ({percent}%)
                  </Text>
                </Pressable>
              );
            })}

            <View className="flex flex-row justify-between flex-wrap gap-2 my-4">
              {" "}
              <TouchableOpacity
                disabled={!selected}
                className="bg-blue-500 py-2 px-3 rounded-md mt-4"
                onPress={vote}
              >
                <Text className="text-white text-center font-bold">Vote</Text>
              </TouchableOpacity>
              {session?.user.id && (
                <TouchableOpacity
                  className="bg-green-500 py-2 px-3 rounded-md mt-4"
                  onPress={sharePoll}
                >
                  <Text className="text-white text-center font-semibold">
                    Share Poll Link
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {Object.keys(votesByOption).length > 0 && (
            <PieChart
              data={chartData}
              width={Dimensions.get("window").width - 32}
              height={220}
              chartConfig={{
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                color: (opacity = 1) => `rgba(51, 65, 85, ${opacity})`,
              }}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"8"}
              absolute
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PollDetails;
