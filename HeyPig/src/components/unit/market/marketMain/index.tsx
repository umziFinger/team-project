import * as React from 'react';
import { Button, Text, View } from "react-native";

export function MarketMain({navigation}) {
    return(
        <View>
            <Text>main</Text>
            <Button title="detail" onPress={() => navigation.navigate('MarketDetail')}/>
            <Button title="write" onPress={() => navigation.navigate('MarketWrite')}/>
        </View>
    )
}