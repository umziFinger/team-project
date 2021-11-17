import * as React from 'react';
import {Text, View} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";

export default function WeightPage() {
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };
  const screenWidth = 400
  // const screenWidth = Dimensions.get("window").width;
  const data = {
    labels: [],
    datasets: [
      {
        data: [23, 45, 28, 80, 99, 43],
        color: (opacity = 0) => `rgba(0,0,0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["your weight"] // optional
  };

  return (
    <View style={{flex: 1,alignItems: 'center'}}>
      <LineChart  
        style={{
          marginTop:30, 
          marginRight:30, 
          elevation:4, 
          backgroundColor:'white',
          borderRadius: 5
        }}
        fromZero={true}
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
}
