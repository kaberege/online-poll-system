import React from "react";
import { View, Text, ScrollView } from "react-native";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { type PollResultsProps } from "@/types";

const PollResults: React.FC<PollResultsProps> = ({
  barChartData,
  totalVotes,
}) => {
  return (
    <View className="bg-white rounded-lg shadow-md p-4 mt-4">
      <Text className="text-lg font-semibold text-zinc-800 mb-2">
        Poll Results
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <VictoryChart
          horizontal
          theme={VictoryTheme.material}
          domainPadding={{ x: [20, 20], y: 30 }}
          padding={{ left: 100, right: 50, top: 20, bottom: 50 }}
        >
          <VictoryBar
            data={barChartData.map((d) => ({
              ...d,
              label: `${((d.y / totalVotes) * 100).toFixed(1)}%`,
            }))}
            labels={({ datum }) => datum.label}
            style={{
              data: {
                fill: "#0ea5e9",
                width: 20,
              },
              labels: {
                fill: "#1e293b",
                fontSize: 10,
                padding: 6,
              },
            }}
          />
        </VictoryChart>
      </ScrollView>
      <Text className="text-sm text-zinc-600 mt-4">
        Total Votes: {totalVotes}
      </Text>
    </View>
  );
};

export default PollResults;
