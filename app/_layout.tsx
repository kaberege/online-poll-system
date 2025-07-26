import { Stack } from "expo-router";
import "@/global.css";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Polls" }} />
        <Stack.Screen name="polls/[id]" options={{ title: "Poll voting" }} />
        <Stack.Screen name="polls/new" options={{ title: "Create poll" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
