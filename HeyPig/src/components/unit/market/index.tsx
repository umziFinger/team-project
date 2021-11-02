import * as React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  DiaryView: {
    height: 100,
    width: 350,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'center',
    paddingHorizontal: 30,
    elevation: 3,
  },

  DiaryImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function MarketScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <View>
          {new Array(10).fill(1).map((el, i) => (
            <View key={i} style={styles.DiaryView}></View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
