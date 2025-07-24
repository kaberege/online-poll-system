import { Text, View, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
//import Poll from "@/components/poll";

const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function Index() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
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
          className="bg-slate-500 flex-1 p-5"
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
