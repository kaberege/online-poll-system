import { View, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { initializeSession } from "@/store/poll/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function ProfileScreen() {
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  console.log(session);

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <View className="">
          <Text className="text-md text-lg font-medium text-zinc-900">
            User id:{session && session.user ? session.user.id : "No session"}
          </Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
