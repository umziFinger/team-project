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
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { GlobalContext } from '~/App';

export default function WeightPage() {

  const [weightsData, setWeightsData] = React.useState([0,0,0,0,0])
  const {diary, user}:any = React.useContext(GlobalContext)

  let weights:any = []

  React.useEffect(()=> {
    diary.map((el:any) => (weights.push(Number(el.weight))))
    setWeightsData(weights)

  },[])

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
        data: [10,40,30,35,25,55,33,66,44],
        color: (opacity = 0) => `rgba(0,0,0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    // legend: ["your weight"] // optional
  };

  return (
    <View style={{flex: 1,alignItems: 'center'}}>
      <LineChart  
        style={{
          marginTop:25
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
