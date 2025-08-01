import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";
import { Link, Redirect, useRouter } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeSession } from "@/store/poll/authSlice";

export default function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  async function signUp() {
    if (!email || !password || !confirm) {
      return Alert.alert("All fields are required.");
    }
    if (password !== confirm) {
      return Alert.alert("Passwords do not match.");
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({ email, password });

    if (session) router.push("/login");

    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert("Please check your inbox for email verification!");

    setLoading(false);
  }

  if (session?.user) return <Redirect href="/profile" />;

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white px-6 py-10">
        <Text className="text-3xl font-bold text-zinc-900 mb-2">
          Create your account
        </Text>
        <Text className="text-sm text-zinc-500 mb-8">
          Enter your email and password to create an account.
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
            placeholder="••••••••"
            className="flex-1"
          />
          <FontAwesome name="eye-slash" size={20} color="#7E7B7B" />
        </View>

        <Text className="text-sm mb-2 text-zinc-600">Confirm Password</Text>
        <View className="flex-row items-center border border-zinc-300 rounded-md px-3 py-3 bg-gray-50 mb-4">
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            placeholder="••••••••"
            className="flex-1"
          />
          <FontAwesome name="eye-slash" size={20} color="#7E7B7B" />
        </View>

        <TouchableOpacity
          className="bg-teal-600 rounded-md py-3 items-center"
          onPress={signUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">Create</Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-base text-gray-500">
            Already have an account?
          </Text>
          <Link href="/login">
            <Text className="text-base font-semibold text-yellow-500">
              Sign in
            </Text>
          </Link>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
