import * as React from 'react';
import {Text, TextInput, View} from 'react-native';

export function BoardWrite() {
  return (
    <View>
      <Text>boardwrite</Text>
      <TextInput style={{height: 100, width: 350, backgroundColor: 'white'}} />
    </View>
  );
}
