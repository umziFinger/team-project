import {gql, useQuery} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import * as React from 'react';
import {
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';

const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      writer
      title
      contents
    }
  }
`;

const styles = StyleSheet.create({
  DiaryView: {
    flexDirection: 'row',

    height: 100,
    width: 350,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 30,
    elevation: 3,
  },

  DiaryImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 30,
  },
});

export function MyPageScreen({navigation}) {
  const {data} = useQuery(FETCH_BOARDS);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        <View>
          {data?.fetchBoards.map((el, i) => (
            <View key={i} style={styles.DiaryView}>
              {/* <Image style={styles.DiaryImage} source={require('../../../Assets/images/add.png')} /> */}
              <View>
                <Text>writer:{el.writer}</Text>
                <Text>title:{el.title}</Text>
                <Text>contents:{el.contents}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <Button
        title="detail"
        onPress={() => navigation.navigate('DiaryDetails')}
      />
    </View>
  );
}
