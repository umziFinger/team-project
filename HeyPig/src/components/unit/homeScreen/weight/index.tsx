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

export default function WeightPage() {

  const [weightsData, setWeightsData] = React.useState([])


  const user:any = auth().currentUser  
  let weights:any = []
  React.useEffect(() => {
    {user?.email === null
      ?
        firestore()
          .collection('Users')
          .doc(String(user?.uid))
          .collection('Diary')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              doc.data()
            })
          })
  
      :
        firestore()
          .collection('Users')
          .doc(String(user?.email))
          .collection('Diary')
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              weights.push(Number(doc.data().weight))
            })
            setWeightsData(weights)
          })
          
    }
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
