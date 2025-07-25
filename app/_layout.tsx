import { Stack } from "expo-router";
import "@/global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Polls" }} />
      <Stack.Screen name="polls/[id]" options={{ title: "Poll voting" }} />
      <Stack.Screen name="polls/new" options={{ title: "Create poll" }} />
    </Stack>
  );
}
