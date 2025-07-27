import React, { useState, useEffect } from "react";
import { Alert, View, Text, Button, AppState, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { initializeSession } from "@/store/poll/authSlice";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  async function signInWithEmail() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else if (!session)
      Alert.alert("Please check your inbox for email verification!");

    setLoading(false);
  }

  if (session?.user) {
    return <Redirect href="/profile" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-sky-100/50 flex-1 p-4">
        <View className="">
          <Text className="text-md text-lg font-medium text-zinc-900">
            Sign in or create acount
          </Text>
          <View className="bg-slate-50 mt-2 rounded-md border border-slate-400 p-2">
            <Text></Text>
            <TextInput
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={"none"}
              className="outline-none"
            />
          </View>
          <View className="bg-slate-50 mt-2 rounded-md border border-slate-400 p-2">
            <Text></Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={"none"}
              className="outline-none"
            />
          </View>
          <View className="mt-4">
            <Button
              title="Sign in"
              disabled={loading}
              onPress={() => signInWithEmail()}
            />
          </View>
          <View className="">
            <Button
              title="Sign up"
              disabled={loading}
              onPress={() => signUpWithEmail()}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
