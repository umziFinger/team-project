import React, { useContext, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import DraggableFlatList, {
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GlobalContext } from "~/App";


const NUM_ITEMS = 3;
function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

type Item = {
  key: string;
  label: string;
  height: number;
  width: number;
  data: string;
  backgroundColor: string;
};

// const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
//   const backgroundColor = getColor(index);
//   return {
//     key: `item-${index}`,
//     label: "",
//     height: 100,
//     width: 60 + Math.random() * 40,
//     backgroundColor,
//   };
// });


export function Draggable() {

    const {diary, date}:any = useContext(GlobalContext)

    const today = diary.filter((el:any) => el.date===date+1)

    const initialData: Item[] = [
        {
            key: 'b',
            label: '오늘 먹을 음식',
            height: 100,
            width: 60 + Math.random() * 40,
            backgroundColor: '#ffd600',
            data: today[0] ? today[0]?.food : '입력해주세요'
        },
        {
            key: 'c',
            label: '오늘 할 운동',
            height: 100,
            width: 60 + Math.random() * 40,
            backgroundColor: '#ffd600',
            data: today[0] ? today[0]?.exercise : '입력해주세요'
        },
    ]


  const [data, setData] = useState(initialData);

  const renderItem = ({ item, drag, isActive }:any) => {
    return (
        <ScaleDecorator>
            <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={{
                height: 200,
                width: 350,
                margin: 20,
                borderRadius: 10,
                paddingTop: 20,
                paddingLeft: 20,
                elevation: 3,
                backgroundColor: item.backgroundColor,
            }}
            >
            <Text style={styles.text}>{item.label}</Text>
            <View style={{marginLeft: 170, marginTop: 70}}>
                <Text style={{fontSize:17, fontWeight:'bold', margin: 3}}>1. {item.data}</Text>
                <Text style={{fontSize:17, fontWeight:'bold', margin: 3}}>2. 당근주스</Text>
                <Text style={{fontSize:17, fontWeight:'bold', margin: 3}}>3. 사과에이드</Text>
            </View>
            </TouchableOpacity>
        </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => setData(data)}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      dragItemOverflow={true}
      dragHitSlop={{ left: -100, right: -100}}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    position:'absolute',
    fontSize: 20,
    fontFamily:'Yangjin',
    textAlign: "center",
    marginLeft: 20,
    marginTop: 20
  },
});