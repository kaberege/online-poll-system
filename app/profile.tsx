import { View, Text, Image, Alert } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import { initializeSession } from "@/store/poll/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { supabase } from "@/lib/supabase";
import { Redirect } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProfileOption from "@/components/ProfileOption";

export default function ProfileScreen() {
  const session = useAppSelector((state) => state.auth.session);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeSession());
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (!session?.user) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 p-4 bg-sky-50">
        <Text className="text-black text-4xl font-semibold mb-6">Profile</Text>
        <View className="bg-teal-600 mb-10 py-6 flex-row items-center rounded-md justify-between px-5">
          <View className="flex-row items-center gap-4">
            <Image
              source={require("@/assets/images/profile2.png")}
              className="w-12 h-12 rounded-full"
            />
            <View>
              <Text className="text-white text-lg font-bold">
                {session.user.email}
              </Text>
              <Text className="text-white text-sm">@poll_user</Text>
            </View>
          </View>
          <Feather name="edit-3" size={24} color="white" />
        </View>
        <View className="bg-white rounded-md p-4 mb-4 space-y-4">
          <ProfileOption
            icon={<FontAwesome6 name="poll" size={24} color="#0601B4" />}
            title="My Polls"
            subtitle="View and manage your polls"
          />
          <ProfileOption
            icon={
              <FontAwesome6 name="check-double" size={24} color="#0601B4" />
            }
            title="Voted Polls"
            subtitle="Polls you have participated in"
          />
          <ProfileOption
            icon={
              <Ionicons name="lock-closed-outline" size={24} color="#0601B4" />
            }
            title="Security Settings"
            subtitle="Update password or enable 2FA"
          />
          <ProfileOption
            icon={<MaterialIcons name="logout" size={24} color="#0601B4" />}
            title="Log Out"
            subtitle="Sign out of your account"
            action={handleLogout}
          />
        </View>
        <Text className="text-black text-xl font-medium mb-4">More</Text>
        <View className="bg-white rounded-md p-4 space-y-4">
          <ProfileOption
            icon={
              <Ionicons
                name="shield-checkmark-outline"
                size={24}
                color="#0601B4"
              />
            }
            title="Two-Factor Authentication"
            subtitle="Add extra protection to your account"
          />
          <ProfileOption
            icon={<FontAwesome6 name="info-circle" size={24} color="#0601B4" />}
            title="About Pollify"
            subtitle="Learn more about the platform"
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
