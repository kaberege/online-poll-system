import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface ProfileOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const ProfileOption: React.FC<ProfileOptionProps> = ({
  icon,
  title,
  subtitle,
}) => {
  return (
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
  );
};

export default ProfileOption;
