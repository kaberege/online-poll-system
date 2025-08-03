import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  AppState,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeSession } from "@/store/poll/authSlice";

AppState.addEventListener("change", (state) => {
  if (state === "active") supabase.auth.startAutoRefresh();
  else supabase.auth.stopAutoRefresh();
});

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  async function signIn() {
    if (!email || !password) return Alert.alert("All fields are required!");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  if (session?.user) return <Redirect href="/profile" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white px-6 py-10">
        <Text className="text-3xl font-bold text-zinc-900 mb-2">
          Sign in to your
        </Text>
        <Text className="text-3xl font-bold text-zinc-900 mb-2">Account</Text>
        <Text className="text-sm text-zinc-500 mb-8">
          Enter your email and password to sign in.
        </Text>

        <Text className="text-sm mb-2 text-zinc-600">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-zinc-300 rounded-md px-3 py-3 mb-4 bg-gray-50"
        />

        <Text className="text-sm mb-2 text-zinc-600">Password</Text>
        <View className="flex-row items-center border border-zinc-300 rounded-md px-3 py-3 bg-gray-50 mb-4">
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="......."
            className="flex-1"
          />
          <FontAwesome name="eye-slash" size={20} color="#7E7B7B" />
        </View>

        <TouchableOpacity
          className="bg-teal-600 rounded-md py-3 items-center mb-4"
          onPress={signIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Sign in</Text>
          )}
        </TouchableOpacity>

        <Text className="text-right text-teal-600 mb-6">Forgot password?</Text>

        <View className="flex-row justify-center mt-auto">
          <Text className="text-base text-gray-500">
            Don&apos;t have an account?
          </Text>
          <Link href="/join">
            <Text className="text-base font-semibold text-yellow-500">
              Join now
            </Text>
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
