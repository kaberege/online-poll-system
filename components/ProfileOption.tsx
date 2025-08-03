import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { type ProfileOptionProps } from "@/types";

const ProfileOption: React.FC<ProfileOptionProps> = ({
  icon,
  title,
  subtitle,
  action,
}) => {
  return (
    <Pressable onPress={action}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="w-12 h-12 bg-[#0601B4]/10 items-center justify-center rounded-full">
            {icon}
          </View>
          <View>
            <Text className="text-lg font-medium">{title}</Text>
            <Text className="text-sm text-gray-500">{subtitle}</Text>
          </View>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={28} color="black" />
      </View>
    </Pressable>
  );
};

export default ProfileOption;
