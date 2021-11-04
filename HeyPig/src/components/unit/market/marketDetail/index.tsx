import {gql, useQuery} from '@apollo/client';
import * as React from 'react';
import { Text, View, Image ,StyleSheet } from "react-native";

const styles = StyleSheet.create({
       Img:{
           width: 400,
           height: 200,
           backgroundColor:'gray',
           
       }
})

export function MarketDetail() {
    return(
        <View>
            <View style={styles.Img}/>
            <Text>name</Text>
            <Text>remark</Text>
            <Text>price</Text>
        </View>
    )
}
